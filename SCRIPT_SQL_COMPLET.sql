-- ============================================
-- SCRIPT SQL COMPLET POUR BUSINESS TOURS
-- Copiez TOUT ce fichier dans Supabase SQL Editor
-- ============================================

-- 1. Créer la table bookings (réservations)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  destination TEXT NOT NULL,
  tour_type TEXT NOT NULL,
  month TEXT NOT NULL,
  num_participants INTEGER NOT NULL DEFAULT 1,
  is_group BOOLEAN DEFAULT FALSE,
  participation_reason TEXT NOT NULL,
  passport_number TEXT,
  passport_expiry DATE,
  travel_type TEXT NOT NULL CHECK (travel_type IN ('personal', 'business')),
  total_amount DECIMAL(10, 2) NOT NULL,
  participants JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  -- Champs pour Stripe
  payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'canceled')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Créer la table contacts (messages de contact)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Créer la table newsletter_subscriptions (abonnements)
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- 4. Créer les index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_intent_id ON bookings(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- 5. Activer Row Level Security (RLS) pour la sécurité
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- 6. Créer les politiques de sécurité pour bookings
-- Permettre à tout le monde d'insérer des réservations
CREATE POLICY "Allow public insert on bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Permettre aux utilisateurs authentifiés de lire les réservations
CREATE POLICY "Allow authenticated read on bookings" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

-- 7. Créer les politiques de sécurité pour contacts
-- Permettre à tout le monde d'insérer des messages
CREATE POLICY "Allow public insert on contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- 8. Créer les politiques de sécurité pour newsletter
-- Permettre à tout le monde de s'abonner
CREATE POLICY "Allow public insert on newsletter_subscriptions" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

-- Permettre aux utilisateurs authentifiés de lire les abonnements
CREATE POLICY "Allow authenticated read on newsletter_subscriptions" ON newsletter_subscriptions
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- FIN DU SCRIPT
-- Vous devriez voir "Success. No rows returned"
-- ============================================
