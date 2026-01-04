-- Create a function to check if user is a cleaner for a specific owner
CREATE OR REPLACE FUNCTION public.is_cleaner(check_owner_id uuid, check_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE owner_user_id = check_owner_id
      AND member_user_id = check_user_id
      AND role = 'cleaner'
    )
$$;

-- Add policy for cleaners to view cleaning-related costs
CREATE POLICY "Cleaners can view cleaning costs"
ON public.costs
FOR SELECT
USING (
  is_cleaner(user_id, auth.uid()) 
  AND (type = 'cleaning' OR type = 'städning' OR type ILIKE '%städ%' OR type ILIKE '%clean%')
);