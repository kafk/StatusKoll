import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type TeamRole = 'owner' | 'co_owner' | 'partner' | 'cleaner';

export interface TeamMember {
  id: string;
  owner_user_id: string;
  member_user_id: string;
  member_email: string;
  member_name: string | null;
  role: TeamRole;
  created_at: string;
}

export const useTeam = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamMembers = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('owner_user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers((data || []) as TeamMember[]);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [user]);

  const addTeamMember = async (email: string, name: string, role: TeamRole) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      // First check if user exists by looking up their email in auth
      // For now, we'll create a placeholder - the member needs to have an account
      const { data, error } = await supabase
        .from('team_members')
        .insert({
          owner_user_id: user.id,
          member_user_id: user.id, // Placeholder - will be updated when they accept
          member_email: email,
          member_name: name || null,
          role: role,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast.error('Den här personen är redan i ditt team');
          return { error: 'Already exists' };
        }
        throw error;
      }

      toast.success(`${name || email} har lagts till i teamet`);
      await fetchTeamMembers();
      return { data };
    } catch (error) {
      console.error('Error adding team member:', error);
      toast.error('Kunde inte lägga till teammedlem');
      return { error };
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<Pick<TeamMember, 'role' | 'member_name'>>) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Teammedlem uppdaterad');
      await fetchTeamMembers();
    } catch (error) {
      console.error('Error updating team member:', error);
      toast.error('Kunde inte uppdatera teammedlem');
    }
  };

  const removeTeamMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Teammedlem borttagen');
      await fetchTeamMembers();
    } catch (error) {
      console.error('Error removing team member:', error);
      toast.error('Kunde inte ta bort teammedlem');
    }
  };

  const getRoleLabel = (role: TeamRole): string => {
    switch (role) {
      case 'owner': return 'Ägare';
      case 'co_owner': return 'Delägare';
      case 'partner': return 'Partner';
      case 'cleaner': return 'Städare';
      default: return role;
    }
  };

  return {
    teamMembers,
    loading,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    getRoleLabel,
    refetch: fetchTeamMembers,
  };
};
