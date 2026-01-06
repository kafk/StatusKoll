-- Remove the permissive INSERT policy that allows any user to create notifications
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;