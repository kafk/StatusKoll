import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useCreateCustomer } from '@/hooks/useCustomers';
import { useCreateEvent } from '@/hooks/useEvents';
import { useCreateCost } from '@/hooks/useCosts';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookingDatePicker } from '@/components/ui/booking-date-picker';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const createCustomer = useCreateCustomer();
  const createEvent = useCreateEvent();
  const createCost = useCreateCost();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '',
    children: '',
    price: '',
    commission: '',
  });

  // Auto-calculate commission (15%) when price changes
  useEffect(() => {
    if (formData.price) {
      const price = parseFloat(formData.price);
      if (!isNaN(price) && price > 0) {
        const calculatedCommission = (price * 0.15).toFixed(2);
        setFormData(prev => ({ ...prev, commission: calculatedCommission }));
      }
    }
  }, [formData.price]);

  // Create validation schema with translated messages
  const getBookingSchema = () => z.object({
    guestName: z.string()
      .trim()
      .min(1, t('validation.guestNameRequired'))
      .max(100, t('validation.guestNameMax')),
    phone: z.string()
      .trim()
      .max(20, t('validation.phoneMax'))
      .optional()
      .or(z.literal('')),
    checkIn: z.string()
      .min(1, t('validation.checkInRequired'))
      .regex(/^\d{4}-\d{2}-\d{2}$/, t('validation.invalidDate')),
    checkOut: z.string()
      .min(1, t('validation.checkOutRequired'))
      .regex(/^\d{4}-\d{2}-\d{2}$/, t('validation.invalidDate')),
    adults: z.string()
      .min(1, t('validation.adultsRequired'))
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(1, t('validation.minAdults')).max(50, t('validation.maxAdults'))),
    children: z.string()
      .transform((val) => val === '' ? 0 : parseInt(val, 10))
      .pipe(z.number().int().min(0, t('validation.negativeChildren')).max(50, t('validation.maxChildren'))),
    price: z.string()
      .min(1, t('validation.priceRequired'))
      .transform((val) => parseFloat(val))
      .pipe(z.number().positive(t('validation.pricePositive')).max(1000000, t('validation.priceMax'))),
    commission: z.string()
      .transform((val) => val === '' ? 0 : parseFloat(val))
      .pipe(z.number().min(0, t('validation.commissionPositive')).max(1000000, t('validation.priceMax'))),
  }).refine((data) => {
    if (data.checkIn && data.checkOut) {
      return new Date(data.checkOut) > new Date(data.checkIn);
    }
    return true;
  }, {
    message: t('validation.checkOutAfterCheckIn'),
    path: ['checkOut'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const bookingSchema = getBookingSchema();
    const result = bookingSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: t('booking.validationError'),
        description: t('booking.checkForm'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    const validData = result.data;

    try {
      const customer = await createCustomer.mutateAsync({
        name: validData.guestName,
        phone: validData.phone || undefined,
        check_in: validData.checkIn,
        check_out: validData.checkOut,
        amount: `${validData.price}€`,
        adults: validData.adults,
        children: validData.children,
        guests: validData.adults + validData.children,
        platform: 'Direct',
        status: 'pending',
      });

      await createEvent.mutateAsync({
        customer_id: customer.id,
        type: 'booking',
        date: validData.checkIn,
        description: validData.guestName,
        amount: `${validData.price}€`,
        note: t('booking.createdDirect'),
      });

      // Create income cost entry (positive - revenue from booking)
      await createCost.mutateAsync({
        name: t('booking.incomeFromBooking', { name: validData.guestName }),
        amount: -validData.price, // Negative = income
        date: validData.checkIn,
        type: 'variable',
        transaction_title: t('booking.bookingIncome'),
        customer_id: customer.id,
      });

      // Create commission cost entry (positive - expense)
      if (validData.commission > 0) {
        await createCost.mutateAsync({
          name: t('booking.commissionCost', { name: validData.guestName }),
          amount: validData.commission,
          date: validData.checkIn,
          type: 'variable',
          transaction_title: t('booking.platformCommission'),
          customer_id: customer.id,
        });
      }

      toast({
        title: t('booking.created'),
        description: t('booking.createdFor', { name: validData.guestName }),
      });

      setFormData({
        guestName: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        adults: '',
        children: '',
        price: '',
        commission: '',
      });
      setErrors({});
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('booking.createError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-foreground/95 z-[1000] flex items-center justify-center p-5 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card border border-border rounded-lg p-6 max-w-[400px] w-full max-h-[90vh] flex flex-col animate-slide-up overflow-hidden">
        <div className="flex justify-between items-center mb-5 shrink-0">
          <h2 className="font-display text-2xl font-extrabold">{t('booking.new')}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-transparent border border-border text-muted-foreground flex items-center justify-center hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto overflow-x-hidden flex-1 pr-2">
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.guestName')}
            </label>
            <input
              type="text"
              placeholder={t('booking.guestNamePlaceholder')}
              maxLength={100}
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.guestName ? 'border-destructive' : 'border-border'}`}
            />
            {errors.guestName && <p className="text-destructive text-xs mt-1">{errors.guestName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.phone')}
            </label>
            <input
              type="tel"
              placeholder={t('booking.phonePlaceholder')}
              maxLength={20}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.phone ? 'border-destructive' : 'border-border'}`}
            />
            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.checkIn')}
            </label>
            <BookingDatePicker
              value={formData.checkIn}
              onChange={(value) => setFormData({ ...formData, checkIn: value })}
              placeholder={t('booking.selectDate')}
              error={!!errors.checkIn}
            />
            {errors.checkIn && <p className="text-destructive text-xs mt-1">{errors.checkIn}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.checkOut')}
            </label>
            <BookingDatePicker
              value={formData.checkOut}
              onChange={(value) => setFormData({ ...formData, checkOut: value })}
              placeholder={t('booking.selectDate')}
              error={!!errors.checkOut}
              minDate={formData.checkIn ? new Date(formData.checkIn) : undefined}
            />
            {errors.checkOut && <p className="text-destructive text-xs mt-1">{errors.checkOut}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.adults')}
            </label>
            <input
              type="number"
              placeholder="2"
              min="1"
              max="50"
              value={formData.adults}
              onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.adults ? 'border-destructive' : 'border-border'}`}
            />
            {errors.adults && <p className="text-destructive text-xs mt-1">{errors.adults}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.children')}
            </label>
            <input
              type="number"
              placeholder="0"
              min="0"
              max="50"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.children ? 'border-destructive' : 'border-border'}`}
            />
            {errors.children && <p className="text-destructive text-xs mt-1">{errors.children}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.price')}
            </label>
            <input
              type="number"
              placeholder="885"
              min="0"
              max="1000000"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.price ? 'border-destructive' : 'border-border'}`}
            />
            {errors.price && <p className="text-destructive text-xs mt-1">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              {t('booking.commission')}
            </label>
            <input
              type="number"
              placeholder="132.75"
              min="0"
              max="1000000"
              step="0.01"
              value={formData.commission}
              onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.commission ? 'border-destructive' : 'border-border'}`}
            />
            <p className="text-muted-foreground text-xs mt-1">{t('booking.commissionHint')}</p>
            {errors.commission && <p className="text-destructive text-xs mt-1">{errors.commission}</p>}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wide bg-transparent border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wide gradient-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,107,74,0.3)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? t('common.saving') : t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
