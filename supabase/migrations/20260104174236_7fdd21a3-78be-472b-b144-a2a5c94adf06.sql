-- Add booking_payment_received field to track payment received from Booking
ALTER TABLE public.customers 
ADD COLUMN booking_payment_received boolean DEFAULT false;