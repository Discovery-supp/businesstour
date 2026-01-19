export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email est requis';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email invalide';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Téléphone est requis';
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 8) {
    return 'Numéro de téléphone invalide';
  }
  return null;
};

export const validatePassport = (passport: string): string | null => {
  if (!passport) return null; // Optional field
  if (passport.length < 6) return 'Numéro de passeport invalide';
  return null;
};

export const validatePassportExpiry = (expiry: string): string | null => {
  if (!expiry) return null; // Optional field
  const expiryDate = new Date(expiry);
  const today = new Date();
  if (expiryDate < today) return 'Le passeport est expiré';
  // Le passeport doit avoir minimum 6 mois de validité
  const sixMonthsFromNow = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000);
  if (expiryDate < sixMonthsFromNow) {
    return 'Le passeport doit avoir minimum 6 mois de validité restante';
  }
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} est requis`;
  }
  return null;
};

export const validateNumber = (value: number, min: number, max: number, fieldName: string): string | null => {
  if (value < min) return `${fieldName} doit être au moins ${min}`;
  if (value > max) return `${fieldName} ne peut pas dépasser ${max}`;
  return null;
};
