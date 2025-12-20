import { Customer } from '@/types/rental';
import { useToast } from '@/hooks/use-toast';

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
}

const CustomerDetail = ({ customer, onBack }: CustomerDetailProps) => {
  const { toast } = useToast();

  const handleMarkCleaned = () => {
    toast({
      title: 'Markerad som städad!',
      description: `${customer.name}s bokning är nu markerad som städad.`,
    });
  };

  const handleMarkPaid = () => {
    toast({
      title: 'Markerad som betald!',
      description: `${customer.name}s bokning är nu markerad som betald.`,
    });
  };

  const handleAddActivity = () => {
    toast({
      title: 'Lägg till aktivitet',
      description: 'Denna funktion kommer snart.',
    });
  };

  return (
    <div className="animate-fade-in-up pb-20">
      <button
        onClick={onBack}
        className="bg-card border border-border rounded-xl px-4 py-2.5 text-muted-foreground font-mono text-xs hover:border-primary hover:text-primary transition-all mb-4 inline-block"
      >
        ← Tillbaka till kunder
      </button>

      <h3 className="font-display text-[28px] font-bold gradient-text-secondary mb-6">
        {customer.name}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Incheckning
          </div>
          <div className="font-display text-xl font-bold">{customer.checkIn}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Utcheckning
          </div>
          <div className="font-display text-xl font-bold">{customer.checkOut}</div>
        </div>
        <div className="bg-card border border-primary rounded-2xl p-4 bg-gradient-to-br from-primary/5 to-primary/[0.02]">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Belopp
          </div>
          <div className="font-display text-xl font-bold text-primary">{customer.amount}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Status
          </div>
          <div
            className={`font-display text-xl font-bold ${
              customer.filterStatus === 'past'
                ? 'text-primary'
                : customer.filterStatus === 'current'
                ? 'text-warning'
                : 'text-secondary'
            }`}
          >
            {customer.filterStatus === 'past'
              ? 'Klar'
              : customer.filterStatus === 'current'
              ? 'Pågående'
              : 'Kommande'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleMarkCleaned}
          className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 font-mono text-[11px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all"
        >
          <span className="text-2xl">🧹</span>
          Markera städad
        </button>
        <button
          onClick={handleMarkPaid}
          className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 font-mono text-[11px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all"
        >
          <span className="text-2xl">💳</span>
          Markera betald
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-display text-lg font-bold">Aktivitet</h4>
          <button
            onClick={handleAddActivity}
            className="bg-transparent border border-border rounded-xl px-4 py-2 text-primary font-mono text-[11px] font-bold hover:border-primary hover:bg-primary/10 transition-all"
          >
            + Lägg till
          </button>
        </div>

        <div className="relative pl-[30px]">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />

          {customer.timeline.map((event, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 mb-3 relative"
            >
              <div className="absolute -left-[22px] top-5 w-3 h-3 rounded-full bg-primary border-2 border-background z-[1]" />
              <div className="text-[11px] text-muted-foreground mb-1">{event.date}</div>
              <div className="text-[13px] text-muted-foreground">{event.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
