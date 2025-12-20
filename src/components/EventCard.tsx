import { RentalEvent } from '@/types/rental';

interface EventCardProps {
  event: RentalEvent;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const getTypeStyles = () => {
    switch (event.type) {
      case 'cleaning':
        return {
          badge: 'bg-secondary/10 text-secondary',
          dot: 'bg-secondary',
        };
      case 'payment':
        return {
          badge: 'bg-warning/10 text-warning',
          dot: 'bg-warning',
        };
      default:
        return {
          badge: 'bg-primary/10 text-primary',
          dot: 'bg-primary',
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

  return (
    <div
      className="bg-card border border-border rounded-lg p-5 mb-4 relative shadow-card hover:shadow-card-hover transition-all duration-300 hover:translate-x-1 hover:-translate-y-0.5 animate-fade-in-up"
      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute -left-[30px] top-6 w-4 h-4 rounded-full border-[3px] border-background z-[2] ${styles.dot}`}
      />

      <div className="flex justify-between items-start mb-3">
        <span
          className={`inline-block px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${styles.badge}`}
        >
          {getTypeLabel()}
        </span>
        <span className="text-xs text-muted-foreground">{event.date}</span>
      </div>

      <div className="font-display text-lg font-bold mb-2">{event.customer}</div>

      <div className="grid gap-2 mt-3">
        {event.period && (
          <div className="flex justify-between text-[13px]">
            <span className="text-muted-foreground">Period:</span>
            <span className="text-foreground/70 font-bold">{event.period}</span>
          </div>
        )}
        {event.source && (
          <div className="flex justify-between text-[13px]">
            <span className="text-muted-foreground">Källa:</span>
            <span className="text-foreground/70 font-bold">{event.source}</span>
          </div>
        )}
        {event.performedBy && (
          <>
            <div className="flex justify-between text-[13px]">
              <span className="text-muted-foreground">Efter gäst:</span>
              <span className="text-foreground/70 font-bold">{event.note?.replace('Efter gäst: ', '')}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-muted-foreground">Utförd av:</span>
              <span className="text-foreground/70 font-bold">{event.performedBy}</span>
            </div>
          </>
        )}
        {event.transaction && (
          <div className="flex justify-between text-[13px]">
            <span className="text-muted-foreground">Transaktion:</span>
            <span className="text-foreground/70 font-bold">{event.transaction}</span>
          </div>
        )}
        {event.amount && (
          <div className="flex justify-between text-[13px]">
            <span className="text-muted-foreground">Belopp:</span>
            <span className="text-warning font-display text-base font-bold">
              {event.amount}
            </span>
          </div>
        )}
      </div>

      {event.note && event.type === 'booking' && (
        <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground italic">
          {event.note}
        </div>
      )}
    </div>
  );
};

export default EventCard;
