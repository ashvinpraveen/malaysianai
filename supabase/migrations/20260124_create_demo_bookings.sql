-- Create the demo_bookings table
CREATE TABLE IF NOT EXISTS public.demo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  use_case TEXT NOT NULL,
  status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (since it's a public demo request form)
CREATE POLICY "Allow public inserts for demo bookings" 
ON public.demo_bookings 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users (admins) to view bookings
CREATE POLICY "Allow authenticated service role to view" 
ON public.demo_bookings 
FOR SELECT 
USING (true);
