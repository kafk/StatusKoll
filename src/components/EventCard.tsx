import { RentalEvent } from '@/types/rental';
import { Calendar, MapPin, CreditCard, Sparkles, User } from 'lucide-react';

interface EventCardProps {
  event: RentalEvent;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const getTypeStyles = () => {
    switch (event.type) {
      case 'cleaning':
        return {
          badge: 'bg-secondary/10 text-secondary border-secondary/20',
          dot: 'bg-secondary',
          icon: Sparkles,
        };
      case 'payment':
        return {
          badge: 'bg-warning/10 text-warning border-warning/20',
          dot: 'bg-warning',
          icon: CreditCard,
        };
      default:
        return {
          badge: 'bg-primary/10 text-primary border-primary/20',
          dot: 'bg-primary',
          icon: Calendar,
        };
    }
  };

  const getTypeLabel = () => {
    switch (event.type) {
      case 'cleaning':
        return 'Städning';
      case 'payment':
        return 'Betalning';
      default:
        return 'Bokning';
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 mb-4 relative shadow-card hover:shadow-card-hover transition-all duration-300 hover:translate-x-1 hover:-translate-y-0.5 animate-fade-in-up"
      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute -left-[30px] top-6 w-4 h-4 rounded-full border-[3px] border-background z-[2] ${styles.dot}`}
      />

      {/* Header with badge and date */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${styles.badge}`}
          >
            <Icon className="w-3 h-3" />
            {getTypeLabel()}
          </span>
        </div>
        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
          {event.date}
        </span>
      </div>

      {/* Customer name - main title */}
      <div className="font-display text-lg font-bold mb-3 flex items-center gap-2">
        <User className="w-4 h-4 text-muted-foreground" />
        {event.customer}
      </div>

      {/* Details grid */}
      <div className="grid gap-2 mt-3">
        {event.period && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Period:</span>
            <span className="text-foreground font-semibold">{event.period}</span>
          </div>
        )}
        {event.source && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Källa:</span>
            <span className="text-foreground font-semibold">{event.source}</span>
          </div>
        )}
        {event.type === 'cleaning' && event.note && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Efter gäst:</span>
            <span className="text-foreground font-semibold">{event.note}</span>
          </div>
        )}
        {event.performedBy && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Utförd av:</span>
            <span className="text-foreground font-semibold">{event.performedBy}</span>
          </div>
        )}
        {event.transaction && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transaktion:</span>
            <span className="text-foreground font-mono text-xs">{event.transaction}</span>
          </div>
        )}
        {event.amount && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Belopp:</span>
            <span className="text-warning font-semibold">{event.amount}</span>
          </div>
        )}
      </div>

      {/* Note for booking type only */}
      {event.note && event.type === 'booking' && (
        <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground italic flex items-start gap-2">
          <span className="text-primary">💬</span>
          {event.note}
        </div>
      )}
    </div>
  );
};

export default EventCard;