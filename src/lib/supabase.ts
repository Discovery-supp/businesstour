import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface TourDetail {
  destination: string;
  tour_type: string;
  month: string;
  price: number;
  amount_paid: number; // 70% payé
  remaining_amount: number; // 30% restant
}

export interface BookingInsert {
  company_name: string;
  position: string;
  email: string;
  phone: string;
  country: string;
  destination: string; // Tour principal (pour compatibilité)
  tour_type: string; // Tour principal (pour compatibilité)
  month: string; // Tour principal (pour compatibilité)
  num_participants: number;
  is_group: boolean;
  participation_reason: string;
  passport_number?: string;
  passport_expiry?: string;
  travel_type: 'personal' | 'business';
  total_amount: number;
  participants?: Array<{ name: string; phone: string }>;
  payment_intent_id?: string;
  payment_status?: 'pending' | 'succeeded' | 'failed' | 'canceled';
  // Nouveaux champs pour multi-tours
  is_multi_tour?: boolean;
  tours?: TourDetail[]; // Détails de tous les tours
  amount_paid?: number; // Montant total payé (70%)
  remaining_amount?: number; // Montant total restant (30%)
  // Nouveaux champs personnels
  person_name?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  business_sector?: string;
}

export interface ContactInsert {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  partnership_object?: string; // Objet du partenariat
  business_sector?: string; // Secteur d'action
  message: string;
}

// Booking functions
export async function createBooking(booking: BookingInsert) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase n\'est pas configuré. Veuillez configurer les variables d\'environnement.');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.error('Supabase booking error:', error);
    // Check if table doesn't exist
    if (error.message.includes('schema cache') || error.message.includes('does not exist')) {
      throw new Error(
        'Les tables Supabase n\'ont pas été créées. Veuillez exécuter le script SQL dans Supabase (voir supabase-schema.sql)'
      );
    }
    throw new Error(`Erreur lors de la création de la réservation: ${error.message}`);
  }

  return data;
}

// Contact functions
export async function createContact(contact: ContactInsert) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase n\'est pas configuré. Veuillez configurer les variables d\'environnement.');
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert([contact])
    .select()
    .single();

  if (error) {
    console.error('Supabase contact error:', error);
    // Check if table doesn't exist
    if (error.message.includes('schema cache') || error.message.includes('does not exist')) {
      throw new Error(
        'Les tables Supabase n\'ont pas été créées. Veuillez exécuter le script SQL dans Supabase (voir supabase-schema.sql)'
      );
    }
    throw new Error(`Erreur lors de l'envoi du message: ${error.message}`);
  }

  return data;
}

// Newsletter subscription
export async function subscribeNewsletter(email: string) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase n\'est pas configuré. Veuillez configurer les variables d\'environnement.');
  }

  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([{ email }])
    .select()
    .single();

  if (error) {
    // If email already exists, that's okay
    if (error.code === '23505') {
      return { email, message: 'Vous êtes déjà abonné à notre newsletter' };
    }
    // Check if table doesn't exist
    if (error.message.includes('schema cache') || error.message.includes('does not exist')) {
      throw new Error(
        'Les tables Supabase n\'ont pas été créées. Veuillez exécuter le script SQL dans Supabase (voir supabase-schema.sql)'
      );
    }
    console.error('Supabase newsletter error:', error);
    throw new Error(`Erreur lors de l'abonnement: ${error.message}`);
  }

  return data;
}

// Test connection function
export async function testConnection() {
  if (!isSupabaseConfigured) {
    return { success: false, message: 'Supabase non configuré' };
  }

  try {
    const { data, error } = await supabase.from('bookings').select('count').limit(1);
    if (error) {
      return { success: false, message: `Erreur de connexion: ${error.message}` };
    }
    return { success: true, message: 'Connexion réussie' };
  } catch (error: any) {
    return { success: false, message: `Erreur: ${error.message}` };
  }
}
