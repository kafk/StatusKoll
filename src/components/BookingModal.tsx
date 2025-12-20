import { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Bokning skapad!',
      description: `Bokning för ${formData.guestName} har skapats.`,
    });
    setFormData({
      guestName: '',
      email: '',
      checkIn: '',
      checkOut: '',
      guests: '',
      price: '',
    });
    onClose();
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
              required
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              E-post
            </label>
            <input
              type="email"
              placeholder="gast@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Incheckning
            </label>
            <input
              type="date"
              required
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Utcheckning
            </label>
            <input
              type="date"
              required
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Antal gäster
            </label>
            <input
              type="number"
              placeholder="2"
              min="1"
              required
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
              Pris (€)
            </label>
            <input
              type="number"
              placeholder="150"
              min="0"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-3 bg-muted border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wide bg-transparent border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wide gradient-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,107,74,0.3)] transition-all"
            >
              Spara
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
