/*
  # Create Testimonials Table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `full_name` (text) - Person's full name
      - `company` (text) - Company name
      - `position` (text) - Job position/title
      - `content` (text) - Testimonial content
      - `rating` (integer) - Rating from 1 to 5
      - `tour_id` (uuid, foreign key) - Reference to tours table (optional)
      - `avatar_url` (text) - URL to person's avatar image
      - `is_featured` (boolean) - Whether to feature this testimonial
      - `is_approved` (boolean) - Whether testimonial is approved for display
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access to approved testimonials
    - Add policy for authenticated users to create testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text NOT NULL,
  position text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  tour_id uuid REFERENCES tours(id) ON DELETE SET NULL,
  avatar_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view approved testimonials
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials
  FOR SELECT
  USING (is_approved = true);

-- Policy: Authenticated users can view all testimonials
CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Anyone can create testimonials (will need approval)
CREATE POLICY "Anyone can create testimonials"
  ON testimonials
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_is_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_tour_id ON testimonials(tour_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
