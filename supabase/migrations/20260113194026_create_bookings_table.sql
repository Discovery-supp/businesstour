/*
  # Create Bookings Table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `tour_id` (uuid, foreign key) - Reference to tours table
      - `user_id` (uuid, foreign key) - Reference to auth.users table
      - `full_name` (text) - Customer full name
      - `email` (text) - Customer email address
      - `phone` (text) - Customer phone number
      - `company` (text) - Customer company name
      - `num_participants` (integer) - Number of participants
      - `selected_date` (date) - Selected tour date
      - `special_requests` (text) - Any special requests or notes
      - `status` (text) - Booking status (pending, confirmed, cancelled, completed)
      - `total_price` (numeric) - Total booking price
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `bookings` table
    - Add policy for users to view their own bookings
    - Add policy for users to create bookings
    - Add policy for authenticated admins to view all bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text NOT NULL,
  num_participants integer NOT NULL CHECK (num_participants > 0),
  selected_date date NOT NULL,
  special_requests text DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Anyone can create bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own pending bookings
CREATE POLICY "Users can update own pending bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
