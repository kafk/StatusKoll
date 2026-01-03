import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  check_in: string;
  check_out: string;
  amount: string;
  guests: number | null;
  platform: string | null;
  status: string;
  cleaning_done: boolean | null;
  payment_done: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerFormData {
  name: string;
  email?: string;
  check_in: string;
  check_out: string;
  amount: string;
  guests?: number;
  platform?: string;
  status?: 'confirmed' | 'pending';
}

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('check_in', { ascending: false });
      
      if (error) throw error;
      return data as Customer[];
    },
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (customer: CustomerFormData) => {
      const { data, error } = await supabase
        .from('customers')
        .insert([customer])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Customer> & { id: string }) => {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

// Helper to convert database customer to UI format
export const formatCustomerForUI = (customer: Customer) => {
  const checkIn = parseISO(customer.check_in);
  const checkOut = parseISO(customer.check_out);
  
  const now = new Date();
  let filterStatus: 'past' | 'current' | 'future' = 'future';
  if (checkOut < now) {
    filterStatus = 'past';
  } else if (checkIn <= now && checkOut >= now) {
    filterStatus = 'current';
  }

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email || '',
    checkIn: format(checkIn, 'd MMM'),
    checkOut: format(checkOut, 'd MMM'),
    period: `${format(checkIn, 'd MMM')} - ${format(checkOut, 'd MMM yyyy')}`,
    amount: customer.amount,
    guests: customer.guests || 1,
    platform: customer.platform || 'Direct',
    status: customer.status as 'confirmed' | 'pending',
    filterStatus,
    cleaningDone: customer.cleaning_done || false,
    paymentDone: customer.payment_done || false,
    timeline: [],
  };
};
