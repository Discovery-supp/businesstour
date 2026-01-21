-- ============================================
-- AJOUT DES CHAMPS MANQUANTS À LA TABLE CONTACTS
-- Exécutez ce script dans Supabase SQL Editor
-- ============================================

-- Ajouter les nouveaux champs à la table contacts
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'partnership_object') THEN
    ALTER TABLE contacts ADD COLUMN partnership_object TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'business_sector') THEN
    ALTER TABLE contacts ADD COLUMN business_sector TEXT;
  END IF;
END $$;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
