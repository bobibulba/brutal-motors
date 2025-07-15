/*
  # Initial Database Schema for Brutal Motors

  1. New Tables
    - `profiles` - User profile information extending Supabase auth
    - `cars` - Car inventory  
    - `appointments` - Test drive appointments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only policies for car management

  3. Sample Data
    - Insert sample cars for demonstration
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name text NOT NULL,
  phone text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  image text NOT NULL,
  mileage integer NOT NULL,
  fuel_type text NOT NULL CHECK (fuel_type IN ('Gasoline', 'Diesel', 'Electric', 'Hybrid')),
  transmission text NOT NULL CHECK (transmission IN ('Manual', 'Automatic')),
  color text NOT NULL,
  description text NOT NULL,
  features text[] DEFAULT '{}',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  car_id uuid REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Cars policies
CREATE POLICY "Anyone can view available cars"
  ON cars FOR SELECT
  TO authenticated
  USING (available = true);

CREATE POLICY "Admins can manage all cars"
  ON cars FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Appointments policies
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update all appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Insert sample cars
INSERT INTO cars (make, model, year, price, image, mileage, fuel_type, transmission, color, description, features) VALUES
('BMW', 'M3', 2023, 75000, 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg', 5000, 'Gasoline', 'Automatic', 'Alpine White', 'The ultimate driving machine with track-bred performance and luxury comfort.', ARRAY['Leather Seats', 'Navigation', 'Sunroof', 'Premium Sound']),
('Mercedes-Benz', 'AMG GT', 2023, 120000, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', 2000, 'Gasoline', 'Automatic', 'Obsidian Black', 'Pure performance meets luxury in this stunning sports car.', ARRAY['Carbon Fiber', 'Track Package', 'Premium Interior', 'Advanced Safety']),
('Audi', 'RS6 Avant', 2023, 110000, 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg', 3000, 'Gasoline', 'Automatic', 'Nardo Gray', 'The perfect blend of practicality and performance in a wagon.', ARRAY['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen', 'Adaptive Suspension']),
('Porsche', '911 Turbo S', 2023, 230000, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', 1000, 'Gasoline', 'Automatic', 'Guards Red', 'The pinnacle of sports car engineering and performance.', ARRAY['Sport Chrono', 'PASM', 'Ceramic Brakes', 'Sport Exhaust']),
('Lamborghini', 'Huracán', 2022, 280000, 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg', 8000, 'Gasoline', 'Automatic', 'Arancio Borealis', 'Italian supercar excellence with breathtaking performance.', ARRAY['Carbon Fiber', 'Alcantara Interior', 'Lifting System', 'Sport Exhaust']),
('Ferrari', 'F8 Tributo', 2022, 320000, 'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg', 6000, 'Gasoline', 'Automatic', 'Rosso Corsa', 'The prancing horse delivers unmatched emotion and performance.', ARRAY['Carbon Fiber', 'Racing Seats', 'Manettino', 'Premium Audio']),
('McLaren', '720S', 2022, 310000, 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg', 4000, 'Gasoline', 'Automatic', 'Papaya Orange', 'British engineering at its finest with Formula 1 technology.', ARRAY['Carbon Tub', 'Active Suspension', 'Pirelli Tires', 'Alcantara']),
('Tesla', 'Model S Plaid', 2023, 130000, 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg', 12000, 'Electric', 'Automatic', 'Pearl White', 'The future of performance with instant torque and cutting-edge tech.', ARRAY['Autopilot', 'Premium Interior', 'Glass Roof', 'Supercharging']);

-- Function to handle profile creation on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, name, phone, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
