import { Customer } from '@/types/rental';

interface CustomerListCardProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerListCard = ({ customer, onClick }: CustomerListCardProps) => {
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
            customer.status === 'confirmed'
              ? 'bg-success/15 text-success'
              : 'bg-warning/15 text-warning'
          }`}
        >
          {customer.status === 'confirmed' ? 'Confirmed' : 'Pending'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="flex flex-col items-center">
          <div className="text-xl mb-1">🧑‍🤝‍🧑</div>
          <div className="font-display text-base font-bold mb-0.5">{customer.guests}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Gäster</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl mb-1">💰</div>
          <div className="font-display text-base font-bold mb-0.5">{customer.amount}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Pris</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl mb-1">🌐</div>
          <div className="font-display text-base font-bold mb-0.5">{customer.platform}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Plattform</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerListCard;
