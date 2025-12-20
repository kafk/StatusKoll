import { useState } from 'react';
import { customers } from '@/data/mockData';
import CustomerListCard from './CustomerListCard';
import CustomerDetail from './CustomerDetail';
import Header from './Header';
import { Customer } from '@/types/rental';

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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

      <h2 className="font-display text-xl font-bold mb-4">Alla kunder</h2>

      <div>
        {customers.map((customer) => (
          <CustomerListCard
            key={customer.id}
            customer={customer}
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
