-- Business Tours Database Schema for Supabase (avec support Stripe)
-- Exécutez ce script si vous avez déjà créé les tables sans les champs de paiement

-- Ajouter les colonnes de paiement à la table bookings (si elles n'existent pas déjà)
DO $$ 
BEGIN
  -- Ajouter payment_intent_id si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'payment_intent_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN payment_intent_id TEXT;
  END IF;

  -- Ajouter payment_status si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'payment_status'
  ) THEN
    ALTER TABLE bookings ADD COLUMN payment_status TEXT DEFAULT 'pending' 
      CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'canceled'));
  END IF;

  -- Ajouter paid_at si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'paid_at'
  ) THEN
    ALTER TABLE bookings ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Créer un index sur payment_intent_id pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_bookings_payment_intent_id ON bookings(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

-- Mettre à jour le statut de la réservation en fonction du paiement
-- (Optionnel : fonction trigger pour mettre à jour automatiquement)
CREATE OR REPLACE FUNCTION update_booking_status_on_payment()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'succeeded' AND NEW.status = 'pending' THEN
    NEW.status := 'confirmed';
    NEW.paid_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger (optionnel)
DROP TRIGGER IF EXISTS trigger_update_booking_status ON bookings;
CREATE TRIGGER trigger_update_booking_status
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  WHEN (NEW.payment_status IS DISTINCT FROM OLD.payment_status)
  EXECUTE FUNCTION update_booking_status_on_payment();
