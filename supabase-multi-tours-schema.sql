-- ============================================
-- MISE À JOUR SCHEMA POUR MULTI-TOURS
-- Exécutez ce script dans Supabase SQL Editor
-- ============================================

-- 1. Ajouter les nouveaux champs à la table bookings
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'is_multi_tour') THEN
    ALTER TABLE bookings ADD COLUMN is_multi_tour BOOLEAN DEFAULT FALSE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'tours') THEN
    ALTER TABLE bookings ADD COLUMN tours JSONB;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'amount_paid') THEN
    ALTER TABLE bookings ADD COLUMN amount_paid DECIMAL(10, 2) DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'remaining_amount') THEN
    ALTER TABLE bookings ADD COLUMN remaining_amount DECIMAL(10, 2) DEFAULT 0;
  END IF;
END $$;

-- 2. Structure JSONB pour tours (exemple):
-- Le champ tours contiendra un tableau JSON avec les détails de chaque tour
-- Chaque tour aura: destination, tour_type, month, price, amount_paid, remaining_amount

-- 3. Créer un index pour les requêtes sur is_multi_tour
CREATE INDEX IF NOT EXISTS idx_bookings_is_multi_tour ON bookings(is_multi_tour);

-- 4. Créer un index GIN pour les requêtes JSONB sur tours
CREATE INDEX IF NOT EXISTS idx_bookings_tours_gin ON bookings USING GIN (tours);

-- ============================================
-- FIN DU SCRIPT
-- ============================================
