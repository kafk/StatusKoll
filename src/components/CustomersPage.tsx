import { useState } from 'react';
import { useCustomers, formatCustomerForUI } from '@/hooks/useCustomers';
import CustomerListCard from './CustomerListCard';
import CustomerDetail from './CustomerDetail';
import Header from './Header';
import { Customer } from '@/types/rental';
import { useLanguage } from '@/contexts/LanguageContext';

const CustomersPage = () => {
  const { t } = useLanguage();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { data: dbCustomers, isLoading } = useCustomers();

  const customers = dbCustomers?.map(formatCustomerForUI) || [];

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

      <h2 className="font-display text-xl font-bold mb-4">{t('customers.all')}</h2>

      <div>
        {isLoading ? (
          <div className="text-muted-foreground text-center py-8">{t('common.loading')}</div>
        ) : customers.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">{t('customers.none')}</div>
        ) : (
          customers.map((customer) => (
            <CustomerListCard
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

export default CustomersPage;
