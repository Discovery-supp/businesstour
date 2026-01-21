-- ============================================
-- AJOUT DES CHAMPS PERSONNELS
-- Exécutez ce script dans Supabase SQL Editor
-- ============================================

-- Ajouter les nouveaux champs à la table bookings
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'person_name') THEN
    ALTER TABLE bookings ADD COLUMN person_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'gender') THEN
    ALTER TABLE bookings ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'business_sector') THEN
    ALTER TABLE bookings ADD COLUMN business_sector TEXT;
  END IF;
END $$;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
