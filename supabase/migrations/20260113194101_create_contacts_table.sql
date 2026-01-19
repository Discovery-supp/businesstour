/*
  # Create Contacts Table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact message
      - `name` (text) - Sender's full name
      - `email` (text) - Sender's email address
      - `phone` (text) - Sender's phone number (optional)
      - `subject` (text) - Message subject/category
      - `message` (text) - Message content
      - `status` (text) - Message status (new, read, replied, archived)
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `contacts` table
    - Add policy for anyone to submit contact messages
    - Add policy for authenticated admins to view messages
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create contact messages
CREATE POLICY "Anyone can create contact messages"
  ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Policy: Authenticated users can view all contact messages
CREATE POLICY "Authenticated users can view all contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update contact status
CREATE POLICY "Authenticated users can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
