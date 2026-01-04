import { useState } from 'react';
import { useCustomers, formatCustomerForUI, Customer as DbCustomer } from '@/hooks/useCustomers';
import CustomerListCard from './CustomerListCard';
import CustomerDetail from './CustomerDetail';
import Header from './Header';
import { Customer } from '@/types/rental';
import { useLanguage } from '@/contexts/LanguageContext';

const CustomersPage = () => {
  const { t } = useLanguage();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const { data: dbCustomers, isLoading } = useCustomers();

  const customers = dbCustomers?.map(formatCustomerForUI) || [];
  
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  const selectedDbCustomer = dbCustomers?.find(c => c.id === selectedCustomerId);

  if (selectedCustomer && selectedDbCustomer) {
    return (
      <div className="pb-20">
        <Header />
        <CustomerDetail 
          customer={selectedCustomer} 
          dbCustomer={selectedDbCustomer}
          onBack={() => setSelectedCustomerId(null)} 
        />
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
              onClick={() => setSelectedCustomerId(customer.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
