-- ============================================
-- MISE À JOUR SCHEMA POUR MULTI-TOURS
-- Exécutez ce script dans Supabase SQL Editor
-- ============================================

-- 1. Ajouter les nouveaux champs à la table bookings
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS is_multi_tour BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS tours JSONB,
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS remaining_amount DECIMAL(10, 2) DEFAULT 0;

-- 2. Structure JSONB pour tours:
-- [
--   {
--     "destination": "turkey",
--     "tour_type": "vip",
--     "month": "Février",
--     "price": 2000,
--     "amount_paid": 1400,  -- 70% payé
--     "remaining_amount": 600  -- 30% restant
--   },
--   {
--     "destination": "dubai",
--     "tour_type": "standard",
--     "month": "Mars",
--     "price": 1000,
--     "amount_paid": 700,
--     "remaining_amount": 300
--   }
-- ]

-- 3. Créer un index pour les requêtes sur is_multi_tour
CREATE INDEX IF NOT EXISTS idx_bookings_is_multi_tour ON bookings(is_multi_tour);

-- 4. Créer un index GIN pour les requêtes JSONB sur tours
CREATE INDEX IF NOT EXISTS idx_bookings_tours_gin ON bookings USING GIN (tours);

-- ============================================
-- FIN DU SCRIPT
-- ============================================
