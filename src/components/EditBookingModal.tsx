import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useUpdateCustomer, Customer } from '@/hooks/useCustomers';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookingDatePicker } from '@/components/ui/booking-date-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

type Platform = 'Airbnb' | 'Booking' | 'VRBO' | 'Direct';

const PLATFORM_COMMISSIONS: Record<Platform, number> = {
  'Airbnb': 0.03,
  'Booking': 0.15,
  'VRBO': 0.08,
  'Direct': 0,
};

const EditBookingModal = ({ isOpen, onClose, customer }: EditBookingModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const updateCustomer = useUpdateCustomer();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const parseAmount = (amount: string): string => {
    return amount.replace('€', '').replace(',', '.').trim();
  };

  const [formData, setFormData] = useState({
    guestName: customer.name,
    phone: customer.phone || '',
    checkIn: customer.check_in,
    checkOut: customer.check_out,
    adults: customer.adults?.toString() || '1',
    children: customer.children?.toString() || '0',
    price: parseAmount(customer.amount),
    platform: (customer.platform || 'Direct') as Platform,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        guestName: customer.name,
        phone: customer.phone || '',
        checkIn: customer.check_in,
        checkOut: customer.check_out,
        adults: customer.adults?.toString() || '1',
        children: customer.children?.toString() || '0',
        price: parseAmount(customer.amount),
        platform: (customer.platform || 'Direct') as Platform,
      });
      setErrors({});
    }
  }, [isOpen, customer]);

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
      await updateCustomer.mutateAsync({
        id: customer.id,
        name: validData.guestName,
        phone: validData.phone || null,
        check_in: validData.checkIn,
        check_out: validData.checkOut,
        amount: `${validData.price}€`,
        adults: validData.adults,
        children: validData.children,
        guests: validData.adults + validData.children,
        platform: formData.platform,
      });

      toast({
        title: t('booking.updated'),
        description: t('booking.updatedFor', { name: validData.guestName }),
      });

      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('booking.updateError'),
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
          <h2 className="font-display text-2xl font-extrabold">{t('booking.edit')}</h2>
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
              {t('booking.platform')}
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm text-left flex items-center justify-between focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                >
                  <span>{formData.platform}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[calc(100%-24px)] bg-card border border-border z-[1100]" align="start">
                {(Object.keys(PLATFORM_COMMISSIONS) as Platform[]).map((platform) => (
                  <DropdownMenuItem
                    key={platform}
                    onClick={() => setFormData({ ...formData, platform })}
                    className="flex justify-between font-mono text-sm cursor-pointer"
                  >
                    <span>{platform}</span>
                    <span className="text-muted-foreground">
                      {(PLATFORM_COMMISSIONS[platform] * 100).toFixed(0)}%
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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

export default EditBookingModal;
