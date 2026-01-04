-- Add adults and children columns to customers table
ALTER TABLE public.customers 
ADD COLUMN adults integer DEFAULT 1,
ADD COLUMN children integer DEFAULT 0;

-- Update existing guests data: assume all are adults if guests exists
UPDATE public.customers 
SET adults = COALESCE(guests, 1), children = 0 
WHERE adults IS NULL;

-- Add phone column to customers table
ALTER TABLE public.customers 
ADD COLUMN phone text;