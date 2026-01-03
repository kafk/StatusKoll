import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Cost {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: 'fixed' | 'variable';
  created_at: string;
  user_id: string | null;
}

export interface CostFormData {
  name: string;
  amount: number;
  date: string;
  type: 'fixed' | 'variable';
}

export const useCosts = () => {
  return useQuery({
    queryKey: ['costs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('costs')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Cost[];
    },
  });
};

export const useCreateCost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (cost: CostFormData) => {
      if (!user) throw new Error('User must be authenticated');
      
      const { data, error } = await supabase
        .from('costs')
        .insert([{ ...cost, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costs'] });
    },
  });
};

export const useDeleteCost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('costs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costs'] });
    },
  });
};
