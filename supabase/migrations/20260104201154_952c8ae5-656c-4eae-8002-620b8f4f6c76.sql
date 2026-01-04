-- Create a function to link team membership based on email
-- This is called after login to update the member_user_id to the actual user's ID
CREATE OR REPLACE FUNCTION public.link_team_membership()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_email text;
BEGIN
  -- Get the current user's email from auth.users
  SELECT email INTO current_email 
  FROM auth.users 
  WHERE id = auth.uid();
  
  -- Update any team_members records where the email matches
  -- but the member_user_id hasn't been set correctly yet
  UPDATE public.team_members
  SET member_user_id = auth.uid(),
      updated_at = now()
  WHERE LOWER(member_email) = LOWER(current_email)
    AND member_user_id != auth.uid();
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.link_team_membership() TO authenticated;