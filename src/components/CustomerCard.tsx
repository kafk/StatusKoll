import { Customer } from '@/types/rental';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerCard = ({ customer, onClick }: CustomerCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-5 mb-4 transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 cursor-pointer animate-fade-in-up"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="font-display text-xl font-bold mb-1">{customer.name}</div>
          <div className="text-xs text-muted-foreground">{customer.period}</div>
        </div>
        <div className="flex gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${
              customer.cleaningDone ? 'bg-primary' : customer.filterStatus === 'current' ? 'bg-warning' : 'bg-secondary'
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full ${
              customer.paymentDone ? 'bg-primary' : 'bg-secondary'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Belopp
          </div>
          <div className="font-display text-xl font-bold">{customer.amount}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Städ
          </div>
          <div
            className={`text-2xl ${
              customer.cleaningDone
                ? 'text-primary'
                : customer.filterStatus === 'current'
                ? 'text-warning'
                : 'text-secondary'
            }`}
          >
            {customer.cleaningDone ? '✓' : customer.filterStatus === 'current' ? '⏳' : '✗'}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Betalt
          </div>
          <div className={`text-2xl ${customer.paymentDone ? 'text-primary' : 'text-secondary'}`}>
            {customer.paymentDone ? '✓' : '✗'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
