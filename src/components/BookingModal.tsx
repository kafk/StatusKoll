import { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useCreateCustomer } from '@/hooks/useCustomers';
import { useCreateEvent } from '@/hooks/useEvents';

// Validation schema for booking form
const bookingSchema = z.object({
  guestName: z.string()
    .trim()
    .min(1, 'Gästens namn krävs')
    .max(100, 'Namnet får vara max 100 tecken'),
  email: z.string()
    .trim()
    .email('Ogiltig e-postadress')
    .max(255, 'E-postadressen får vara max 255 tecken')
    .optional()
    .or(z.literal('')),
  checkIn: z.string()
    .min(1, 'Incheckningsdatum krävs')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ogiltigt datumformat'),
  checkOut: z.string()
    .min(1, 'Utcheckningsdatum krävs')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ogiltigt datumformat'),
  guests: z.string()
    .min(1, 'Antal gäster krävs')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1, 'Minst 1 gäst').max(50, 'Max 50 gäster')),
  price: z.string()
    .min(1, 'Pris krävs')
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive('Priset måste vara positivt').max(1000000, 'Priset är för högt')),
}).refine((data) => {
  if (data.checkIn && data.checkOut) {
    return new Date(data.checkOut) > new Date(data.checkIn);
  }
  return true;
}, {
  message: 'Utcheckning måste vara efter incheckning',
  path: ['checkOut'],
});

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { toast } = useToast();
  const createCustomer = useCreateCustomer();
  const createEvent = useCreateEvent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    price: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
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
        title: 'Valideringsfel',
        description: 'Kontrollera formuläret och försök igen.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    const validData = result.data;

    try {
      // Create customer with validated and sanitized data
      const customer = await createCustomer.mutateAsync({
        name: validData.guestName,
        email: validData.email || undefined,
        check_in: validData.checkIn,
        check_out: validData.checkOut,
        amount: `${validData.price}€`,
        guests: validData.guests,
        platform: 'Direct',
        status: 'pending',
      });

      // Create booking event
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type: 'booking',
        date: validData.checkIn,
        description: validData.guestName,
        amount: `${validData.price}€`,
        note: `Bokning skapad direkt`,
      });

      toast({
        title: 'Bokning skapad!',
        description: `Bokning för ${validData.guestName} har skapats.`,
      });

      setFormData({
        guestName: '',
        email: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        price: '',
      });
      setErrors({});
      onClose();
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte skapa bokningen. Försök igen.',
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
      <div className="bg-card border border-border rounded-lg p-6 max-w-[400px] w-full animate-slide-up">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-display text-2xl font-extrabold">Ny bokning</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-transparent border border-border text-muted-foreground flex items-center justify-center hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Gästens namn
            </label>
            <input
              type="text"
              placeholder="Namn Efternamn"
              maxLength={100}
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.guestName ? 'border-destructive' : 'border-border'}`}
            />
            {errors.guestName && <p className="text-destructive text-xs mt-1">{errors.guestName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              E-post
            </label>
            <input
              type="email"
              placeholder="gast@email.com"
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.email ? 'border-destructive' : 'border-border'}`}
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Incheckning
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all ${errors.checkIn ? 'border-destructive' : 'border-border'}`}
            />
            {errors.checkIn && <p className="text-destructive text-xs mt-1">{errors.checkIn}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Utcheckning
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all ${errors.checkOut ? 'border-destructive' : 'border-border'}`}
            />
            {errors.checkOut && <p className="text-destructive text-xs mt-1">{errors.checkOut}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Antal gäster
            </label>
            <input
              type="number"
              placeholder="2"
              min="1"
              max="50"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className={`w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground ${errors.guests ? 'border-destructive' : 'border-border'}`}
            />
            {errors.guests && <p className="text-destructive text-xs mt-1">{errors.guests}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Pris (€)
            </label>
            <input
              type="number"
              placeholder="150"
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
              Avbryt
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wide gradient-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,107,74,0.3)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Sparar...' : 'Spara'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
