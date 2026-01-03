-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  amount TEXT NOT NULL,
  guests INTEGER DEFAULT 1,
  platform TEXT DEFAULT 'Direct',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending')),
  cleaning_done BOOLEAN DEFAULT false,
  payment_done BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table for timeline
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('booking', 'cleaning', 'payment')),
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount TEXT,
  note TEXT,
  performed_by TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for now - no auth required)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (can add auth later)
CREATE POLICY "Allow public read access to customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to customers" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to customers" ON public.customers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to customers" ON public.customers FOR DELETE USING (true);

CREATE POLICY "Allow public read access to events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to events" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to events" ON public.events FOR DELETE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();