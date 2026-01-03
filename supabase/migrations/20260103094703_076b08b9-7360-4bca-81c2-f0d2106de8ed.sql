-- Create table for economy costs (fixed and variable)
CREATE TABLE public.costs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('fixed', 'variable')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.costs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth yet)
CREATE POLICY "Allow public read access to costs" 
ON public.costs 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to costs" 
ON public.costs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to costs" 
ON public.costs 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete access to costs" 
ON public.costs 
FOR DELETE 
USING (true);