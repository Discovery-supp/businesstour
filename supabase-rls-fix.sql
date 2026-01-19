-- Fix RLS policy for contacts
DO $$
BEGIN
  -- Ensure RLS is enabled
  ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

  -- Create insert policy for public if missing
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contacts'
      AND policyname = 'Allow public insert on contacts'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public insert on contacts" ON contacts FOR INSERT WITH CHECK (true)';
  END IF;
END $$;
