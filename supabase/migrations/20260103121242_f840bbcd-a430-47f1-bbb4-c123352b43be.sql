-- Add user_id column to customers table
ALTER TABLE public.customers 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to events table
ALTER TABLE public.events 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to costs table
ALTER TABLE public.costs 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing public policies on customers
DROP POLICY IF EXISTS "Allow public delete access to customers" ON public.customers;
DROP POLICY IF EXISTS "Allow public insert access to customers" ON public.customers;
DROP POLICY IF EXISTS "Allow public read access to customers" ON public.customers;
DROP POLICY IF EXISTS "Allow public update access to customers" ON public.customers;

-- Drop existing public policies on events
DROP POLICY IF EXISTS "Allow public delete access to events" ON public.events;
DROP POLICY IF EXISTS "Allow public insert access to events" ON public.events;
DROP POLICY IF EXISTS "Allow public read access to events" ON public.events;
DROP POLICY IF EXISTS "Allow public update access to events" ON public.events;

-- Drop existing public policies on costs
DROP POLICY IF EXISTS "Allow public delete access to costs" ON public.costs;
DROP POLICY IF EXISTS "Allow public insert access to costs" ON public.costs;
DROP POLICY IF EXISTS "Allow public read access to costs" ON public.costs;
DROP POLICY IF EXISTS "Allow public update access to costs" ON public.costs;

-- Create secure RLS policies for customers
CREATE POLICY "Users can view their own customers"
ON public.customers FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own customers"
ON public.customers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers"
ON public.customers FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers"
ON public.customers FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create secure RLS policies for events
CREATE POLICY "Users can view their own events"
ON public.events FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own events"
ON public.events FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
ON public.events FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
ON public.events FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create secure RLS policies for costs
CREATE POLICY "Users can view their own costs"
ON public.costs FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own costs"
ON public.costs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own costs"
ON public.costs FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own costs"
ON public.costs FOR DELETE
TO authenticated
USING (auth.uid() = user_id);