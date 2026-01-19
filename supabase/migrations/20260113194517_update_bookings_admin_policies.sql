/*
  # Update Bookings Policies for Admin Access

  1. Changes
    - Drop existing policies on bookings table
    - Add new policy for admins to view all bookings
    - Add new policy for admins to update bookings
    - Keep policy for anyone to create bookings
  
  2. Security
    - Only admins can view all bookings
    - Only admins can update booking status
    - Anyone can still create bookings (for public booking form)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update own pending bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON bookings;

-- Policy: Only admins can view all bookings
CREATE POLICY "Admins can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

-- Policy: Anyone can create bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Policy: Admins can update bookings
CREATE POLICY "Admins can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Policy: Admins can delete bookings
CREATE POLICY "Admins can delete bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));
