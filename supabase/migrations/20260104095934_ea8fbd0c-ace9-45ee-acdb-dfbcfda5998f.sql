-- Add transaction_title column to costs table
ALTER TABLE public.costs ADD COLUMN transaction_title text;

-- Add customer_id column to link costs to customers
ALTER TABLE public.costs ADD COLUMN customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL;