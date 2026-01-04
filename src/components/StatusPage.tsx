import { useState } from 'react';
import { useCustomers, formatCustomerForUI } from '@/hooks/useCustomers';
import CustomerCard from './CustomerCard';
import CustomerDetail from './CustomerDetail';
import Header from './Header';
import { Customer, FilterStatus, SortOrder } from '@/types/rental';
import { useLanguage } from '@/contexts/LanguageContext';

const StatusPage = () => {
  const { t } = useLanguage();
  const { data: dbCustomers, isLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [filter, setFilter] = useState<'all' | FilterStatus>('all');
  const [sort, setSort] = useState<SortOrder>('newest');

  const filterButtons = [
    { label: t('common.all'), value: 'all' as const },
    { label: t('status.current'), value: 'current' as const },
    { label: t('status.past'), value: 'past' as const },
    { label: t('status.future'), value: 'future' as const },
  ];

  const sortButtons = [
    { label: t('status.newestFirst'), value: 'newest' as const },
    { label: t('status.oldestFirst'), value: 'oldest' as const },
  ];

  const customers = dbCustomers?.map(formatCustomerForUI) || [];

  const filteredCustomers = customers
    .filter((c) => filter === 'all' || c.filterStatus === filter)
    .sort((a, b) => {
      if (sort === 'newest') {
        return b.period.localeCompare(a.period);
      }
      return a.period.localeCompare(b.period);
    });

  if (selectedCustomer) {
    return (
      <div className="pb-20">
        <Header />
        <CustomerDetail customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Header />

      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[1.5px] text-muted-foreground mb-3">
          {t('status.filterByPeriod')}
        </div>
        <div className="flex gap-2 mb-5">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`flex-1 py-3 rounded-2xl font-mono text-xs font-bold uppercase transition-all shadow-card ${
                filter === btn.value
                  ? 'gradient-primary text-primary-foreground shadow-[0_4px_8px_rgba(255,107,74,0.3)]'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[1.5px] text-muted-foreground mb-3">
          {t('status.sorting')}
        </div>
        <div className="flex gap-2">
          {sortButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setSort(btn.value)}
              className={`flex-1 py-3 rounded-2xl font-mono text-[11px] font-bold uppercase transition-all shadow-card ${
                sort === btn.value
                  ? 'gradient-primary text-primary-foreground shadow-[0_4px_8px_rgba(255,107,74,0.3)]'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="text-center text-muted-foreground py-8">{t('common.loading')}</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">{t('status.noBookings')}</div>
        ) : (
          filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={() => setSelectedCustomer(customer)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StatusPage;
