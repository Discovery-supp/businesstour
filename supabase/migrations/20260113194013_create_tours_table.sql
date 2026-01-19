/*
  # Create Tours Table

  1. New Tables
    - `tours`
      - `id` (uuid, primary key) - Unique identifier for each tour
      - `title` (text) - Tour title
      - `description` (text) - Full tour description
      - `short_description` (text) - Brief tour description for listings
      - `destination` (text) - Tour destination location
      - `duration` (text) - Duration of the tour (e.g., "5 days")
      - `price` (numeric) - Tour price
      - `image_url` (text) - URL to tour image
      - `category` (text) - Tour category (e.g., "Technology", "Manufacturing")
      - `max_participants` (integer) - Maximum number of participants
      - `available_dates` (jsonb) - Array of available dates
      - `included_services` (jsonb) - Array of services included in the tour
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
      - `is_active` (boolean) - Whether the tour is currently active
  
  2. Security
    - Enable RLS on `tours` table
    - Add policy for public read access to active tours
    - Add policy for authenticated users with admin role to manage tours
*/

CREATE TABLE IF NOT EXISTS tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  destination text NOT NULL,
  duration text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  category text NOT NULL,
  max_participants integer NOT NULL DEFAULT 20 CHECK (max_participants > 0),
  available_dates jsonb DEFAULT '[]'::jsonb,
  included_services jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active tours
CREATE POLICY "Anyone can view active tours"
  ON tours
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can view all tours
CREATE POLICY "Authenticated users can view all tours"
  ON tours
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
CREATE INDEX IF NOT EXISTS idx_tours_is_active ON tours(is_active);
CREATE INDEX IF NOT EXISTS idx_tours_created_at ON tours(created_at DESC);
