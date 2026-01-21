-- Ajouter la colonne payment_method à la table bookings
-- Cette colonne permet de distinguer les paiements Stripe des paiements en cash

DO $$
BEGIN
  -- Vérifier si la colonne existe déjà
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'bookings' 
    AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE public.bookings 
    ADD COLUMN payment_method TEXT CHECK (payment_method IN ('stripe', 'cash'));
    
    -- Définir une valeur par défaut pour les réservations existantes
    UPDATE public.bookings 
    SET payment_method = 'stripe' 
    WHERE payment_method IS NULL;
    
    RAISE NOTICE 'Colonne payment_method ajoutée avec succès';
  ELSE
    RAISE NOTICE 'La colonne payment_method existe déjà';
  END IF;
END $$;
