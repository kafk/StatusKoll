import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { RentalEvent, EventType } from '@/types/rental';
import { useAuth } from './useAuth';

export interface DbEvent {
  id: string;
  customer_id: string | null;
  type: string;
  date: string;
  description: string;
  amount: string | null;
  note: string | null;
  performed_by: string | null;
  transaction_id: string | null;
  created_at: string;
  user_id: string | null;
  customers?: {
    id: string;
    name: string;
    check_in: string;
    check_out: string;
    platform: string | null;
  } | null;
}

export interface EventFormData {
  customer_id?: string;
  type: 'booking' | 'cleaning' | 'payment';
  date: string;
  description: string;
  amount?: string;
  note?: string;
  performed_by?: string;
  transaction_id?: string;
}

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          customers (
            id,
            name,
            check_in,
            check_out,
            platform
          )
        `)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as DbEvent[];
    },
  });
};

export const useCustomerEvents = (customerId: string) => {
  return useQuery({
    queryKey: ['events', 'customer', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('customer_id', customerId)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as DbEvent[];
    },
    enabled: !!customerId,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (event: EventFormData) => {
      if (!user) throw new Error('User must be authenticated');
      
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...event, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export interface EventUpdateData {
  id: string;
  date?: string;
  description?: string;
  amount?: string | null;
  note?: string | null;
  performed_by?: string | null;
  transaction_id?: string | null;
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: EventUpdateData) => {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// Helper to convert database event to UI format
export const formatEventForUI = (event: DbEvent): RentalEvent => {
  const date = parseISO(event.date);
  const customer = event.customers;
  
  let period: string | undefined;
  let source: string | undefined;
  
  if (customer) {
    const checkIn = parseISO(customer.check_in);
    const checkOut = parseISO(customer.check_out);
    period = `${format(checkIn, 'd', { locale: sv })}-${format(checkOut, 'd MMM yyyy', { locale: sv })}`;
    source = customer.platform ? `Via ${customer.platform}` : undefined;
  }
  
  return {
    id: event.id,
    type: event.type as EventType,
    date: format(date, 'd MMM yyyy', { locale: sv }),
    customer: event.description,
    period,
    source,
    amount: event.amount || undefined,
    note: event.note || undefined,
    performedBy: event.performed_by || undefined,
    transaction: event.transaction_id || undefined,
  };
};
