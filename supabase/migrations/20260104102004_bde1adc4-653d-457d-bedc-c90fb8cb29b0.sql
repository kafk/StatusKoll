-- Create team member role enum
CREATE TYPE public.team_role AS ENUM ('owner', 'co_owner', 'partner', 'cleaner');

-- Create team_members table to link users to accounts
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_user_id UUID NOT NULL, -- The main account owner
  member_user_id UUID NOT NULL, -- The invited team member (must have an account)
  member_email TEXT NOT NULL, -- Email for display purposes
  member_name TEXT, -- Optional display name
  role team_role NOT NULL DEFAULT 'partner',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(owner_user_id, member_user_id)
);

-- Create notifications table for in-app notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL, -- The user who should see this notification
  type TEXT NOT NULL DEFAULT 'booking', -- booking, cleaning, payment, etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for team_members
-- Owners can manage their team
CREATE POLICY "Owners can view their team members"
ON public.team_members
FOR SELECT
USING (auth.uid() = owner_user_id);

CREATE POLICY "Owners can add team members"
ON public.team_members
FOR INSERT
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can update their team members"
ON public.team_members
FOR UPDATE
USING (auth.uid() = owner_user_id);

CREATE POLICY "Owners can delete their team members"
ON public.team_members
FOR DELETE
USING (auth.uid() = owner_user_id);

-- Team members can see that they are part of a team
CREATE POLICY "Members can see their membership"
ON public.team_members
FOR SELECT
USING (auth.uid() = member_user_id);

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
ON public.notifications
FOR DELETE
USING (auth.uid() = user_id);

-- System can create notifications (using service role)
CREATE POLICY "System can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);

-- Function to check if user has access to an owner's data
CREATE OR REPLACE FUNCTION public.has_team_access(check_owner_id UUID, check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    check_owner_id = check_user_id -- User is the owner
    OR EXISTS (
      SELECT 1 FROM public.team_members
      WHERE owner_user_id = check_owner_id
      AND member_user_id = check_user_id
    )
$$;

-- Function to check if user is co-owner (full access)
CREATE OR REPLACE FUNCTION public.is_co_owner(check_owner_id UUID, check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    check_owner_id = check_user_id -- User is the owner
    OR EXISTS (
      SELECT 1 FROM public.team_members
      WHERE owner_user_id = check_owner_id
      AND member_user_id = check_user_id
      AND role = 'co_owner'
    )
$$;

-- Update customers RLS to allow co-owners full access
DROP POLICY IF EXISTS "Users can view their own customers" ON public.customers;
CREATE POLICY "Users and co-owners can view customers"
ON public.customers
FOR SELECT
USING (
  public.has_team_access(user_id, auth.uid())
);

DROP POLICY IF EXISTS "Users can create their own customers" ON public.customers;
CREATE POLICY "Users and co-owners can create customers"
ON public.customers
FOR INSERT
WITH CHECK (
  public.is_co_owner(user_id, auth.uid())
);

DROP POLICY IF EXISTS "Users can update their own customers" ON public.customers;
CREATE POLICY "Users and co-owners can update customers"
ON public.customers
FOR UPDATE
USING (public.is_co_owner(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own customers" ON public.customers;
CREATE POLICY "Users and co-owners can delete customers"
ON public.customers
FOR DELETE
USING (public.is_co_owner(user_id, auth.uid()));

-- Update events RLS similarly
DROP POLICY IF EXISTS "Users can view their own events" ON public.events;
CREATE POLICY "Users and team can view events"
ON public.events
FOR SELECT
USING (public.has_team_access(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can create their own events" ON public.events;
CREATE POLICY "Users and co-owners can create events"
ON public.events
FOR INSERT
WITH CHECK (public.is_co_owner(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
CREATE POLICY "Users and co-owners can update events"
ON public.events
FOR UPDATE
USING (public.is_co_owner(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;
CREATE POLICY "Users and co-owners can delete events"
ON public.events
FOR DELETE
USING (public.is_co_owner(user_id, auth.uid()));

-- Update costs RLS (only co-owners, not partners)
DROP POLICY IF EXISTS "Users can view their own costs" ON public.costs;
CREATE POLICY "Users and co-owners can view costs"
ON public.costs
FOR SELECT
USING (public.is_co_owner(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can create their own costs" ON public.costs;
CREATE POLICY "Users and co-owners can create costs"
ON public.costs
FOR INSERT
WITH CHECK (public.is_co_owner(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can update their own costs" ON public.costs;
CREATE POLICY "Users and co-owners can update costs"
ON public.costs
FOR UPDATE
USING (public.is_co_owner(user_id, auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own costs" ON public.costs;
CREATE POLICY "Users and co-owners can delete costs"
ON public.costs
FOR DELETE
USING (public.is_co_owner(user_id, auth.uid()));

-- Add trigger for updated_at on team_members
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();