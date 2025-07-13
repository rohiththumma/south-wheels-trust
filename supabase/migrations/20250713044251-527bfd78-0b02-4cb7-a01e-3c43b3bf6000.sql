
-- Create user profiles table to store additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  mobile TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create cars table for listings
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model_year INTEGER NOT NULL,
  fuel_type TEXT NOT NULL,
  km_driven INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  advance_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  location TEXT NOT NULL,
  condition_notes TEXT,
  images JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for cars
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Create policies for cars (customers can view available cars, admins can manage all)
CREATE POLICY "Anyone can view available cars" 
  ON public.cars 
  FOR SELECT 
  USING (status = 'available' OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can insert cars" 
  ON public.cars 
  FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can update cars" 
  ON public.cars 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can delete cars" 
  ON public.cars 
  FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  amount_paid DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'advance_paid' CHECK (status IN ('advance_paid', 'noc_processing', 'completed', 'cancelled')),
  noc_status TEXT NOT NULL DEFAULT 'pending' CHECK (noc_status IN ('pending', 'in_process', 'ready')),
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = customer_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Admins can update bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Create enquiries table for customer messages
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  admin_reply TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for enquiries
CREATE POLICY "Users can view their own enquiries" 
  ON public.enquiries 
  FOR SELECT 
  USING (auth.uid() = customer_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Users can create enquiries" 
  ON public.enquiries 
  FOR INSERT 
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Admins can update enquiries" 
  ON public.enquiries 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, mobile, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'mobile',
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
