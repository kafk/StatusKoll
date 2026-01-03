import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';
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
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as DbEvent[];
    },
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

// Helper to convert database event to UI format
export const formatEventForUI = (event: DbEvent): RentalEvent => {
  const date = parseISO(event.date);
  
  return {
    id: event.id,
    type: event.type as EventType,
    date: format(date, 'd MMM yyyy'),
    customer: event.description,
    amount: event.amount || undefined,
    note: event.note || undefined,
    performedBy: event.performed_by || undefined,
    transaction: event.transaction_id || undefined,
  };
};
