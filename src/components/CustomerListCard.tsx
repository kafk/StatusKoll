import { Customer } from '@/types/rental';
import { Users, Coins, Globe } from 'lucide-react';

interface CustomerListCardProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerListCard = ({ customer, onClick }: CustomerListCardProps) => {
  // Derive status from the three criteria
  const isComplete = customer.cleaningDone && customer.paymentDone && customer.bookingPaymentReceived;
  
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-5 mb-3 transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="font-display text-lg font-bold mb-1">{customer.name}</div>
          <div className="text-[13px] text-muted-foreground">{customer.period}</div>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${
            isComplete
              ? 'bg-success/15 text-success'
              : 'bg-warning/15 text-warning'
          }`}
        >
          {isComplete ? 'Klar' : 'Pågående'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="flex flex-col items-center">
          <Users className="w-6 h-6 text-primary mb-1" strokeWidth={1.5} />
          <div className="font-display text-base font-bold mb-0.5">{customer.guests}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Gäster</div>
        </div>
        <div className="flex flex-col items-center">
          <Coins className="w-6 h-6 text-warning mb-1" strokeWidth={1.5} />
          <div className="font-display text-base font-bold mb-0.5">{customer.amount}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Pris</div>
        </div>
        <div className="flex flex-col items-center">
          <Globe className="w-6 h-6 text-secondary mb-1" strokeWidth={1.5} />
          <div className="font-display text-base font-bold mb-0.5">{customer.platform}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Plattform</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerListCard;
