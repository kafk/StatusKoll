import { useCustomers } from './useCustomers';
import { useEvents } from './useEvents';

export const useStats = () => {
  const { data: customers } = useCustomers();
  const { data: events } = useEvents();

  const bookings = events?.filter(e => e.type === 'booking').length || 0;
  const cleanings = events?.filter(e => e.type === 'cleaning').length || 0;
  
  // Calculate total revenue from customer amounts
  const revenue = customers?.reduce((total, customer) => {
    const amount = parseFloat(customer.amount.replace('€', '').replace(',', '.')) || 0;
    return total + amount;
  }, 0) || 0;

  return {
    bookings,
    cleanings,
    revenue: `${revenue}€`,
  };
};
