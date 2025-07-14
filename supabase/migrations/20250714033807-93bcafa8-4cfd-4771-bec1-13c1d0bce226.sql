-- First, create an admin user account directly in the database
-- This bypasses email confirmation issues
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@admin.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin User", "mobile": "1234567890", "role": "admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create the corresponding profile for the admin user
INSERT INTO public.profiles (id, full_name, mobile, role)
SELECT 
  id, 
  'Admin User',
  '1234567890', 
  'admin'
FROM auth.users 
WHERE email = 'admin@admin.com';

-- Also create a customer user for testing
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'customer@test.com',
  crypt('test123', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Test Customer", "mobile": "9876543210", "role": "customer"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create the corresponding profile for the customer user
INSERT INTO public.profiles (id, full_name, mobile, role)
SELECT 
  id, 
  'Test Customer',
  '9876543210', 
  'customer'
FROM auth.users 
WHERE email = 'customer@test.com';