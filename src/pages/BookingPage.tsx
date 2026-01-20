import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Calendar, Users, CreditCard, Plus, X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import {
  validateEmail,
  validatePhone,
  validatePassport,
  validatePassportExpiry,
  validateRequired,
  validateNumber,
} from '../utils/validation';
import { createBooking, BookingInsert } from '../lib/supabase';
import { getStripe, isStripeConfigured, formatAmountForStripe } from '../lib/stripe';
import { PaymentForm } from '../components/PaymentForm';

interface Participant {
  name: string;
  phone: string;
}

export function BookingPage() {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    email: '',
    phone: '',
    country: '',
    destination: '',
    tourType: '',
    selectedTours: [] as Array<{ destination: string; tourType: string; month: string }>,
    month: '',
    numParticipants: 1,
    isGroup: false,
    participationReason: 'networking',
    passportNumber: '',
    passportExpiry: '',
    travelType: 'business',
    wantsExtension: false,
    extensionDays: 0,
  });

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState<BookingInsert | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const destinations = [
    { value: 'turkey', label: 'Turquie', months: ['Février', 'Avril', 'Août', 'Novembre'] },
    { value: 'dubai', label: 'Dubai', months: ['Mars', 'Mai', 'Juillet', 'Octobre'] },
    { value: 'china', label: 'Chine', months: ['Mars', 'Juin', 'Octobre'] },
    { value: 'benin', label: 'Bénin', months: ['Février', 'Avril', 'Mai', 'Juillet', 'Octobre', 'Novembre'] },
  ];

  const tourTypes = [
    { value: 'vip', label: 'VIP', prices: { turkey: 2000, dubai: 1200, china: 2000, benin: 800 } },
    { value: 'standard', label: 'Standard', prices: { turkey: 1700, dubai: 1000, china: 1700, benin: 0 } },
    { value: 'basic', label: 'Basique', prices: { turkey: 1500, dubai: 800, china: 1500, benin: 0 } },
  ];

  const reasons = [
    { value: 'networking', label: 'Réseautage B2B' },
    { value: 'development', label: 'Développement commercial' },
    { value: 'conferences', label: 'Accès aux conférences/ateliers' },
    { value: 'suppliers', label: 'Recherche de fournisseurs' },
    { value: 'other', label: 'Autre' },
  ];

  const addParticipant = () => {
    setParticipants([...participants, { name: '', phone: '' }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const addTour = () => {
    if (formData.destination && formData.tourType && formData.month) {
      const newTour = {
        destination: formData.destination,
        tourType: formData.tourType,
        month: formData.month,
      };
      setFormData({
        ...formData,
        selectedTours: [...formData.selectedTours, newTour],
        destination: '',
        tourType: '',
        month: '',
      });
    }
  };

  const removeTour = (index: number) => {
    setFormData({
      ...formData,
      selectedTours: formData.selectedTours.filter((_, i) => i !== index),
    });
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Calculer le total pour les tours sélectionnés
    if (formData.selectedTours.length > 0) {
      formData.selectedTours.forEach((tour) => {
        const tourType = tourTypes.find((t) => t.value === tour.tourType);
        if (tourType) {
          const price = tourType.prices[tour.destination as keyof typeof tourType.prices] || 0;
          total += price * formData.numParticipants;
        }
      });
    } else {
      // Si aucun tour sélectionné, utiliser le tour en cours de sélection
      if (formData.destination && formData.tourType) {
        const tourType = tourTypes.find((t) => t.value === formData.tourType);
        if (tourType) {
          const price = tourType.prices[formData.destination as keyof typeof tourType.prices] || 0;
          total = price * formData.numParticipants;
        }
      }
    }
    
    return total;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    const companyError = validateRequired(formData.companyName, 'Société');
    if (companyError) newErrors.companyName = companyError;

    const positionError = validateRequired(formData.position, 'Poste');
    if (positionError) newErrors.position = positionError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const countryError = validateRequired(formData.country, 'Pays');
    if (countryError) newErrors.country = countryError;

    // Valider qu'au moins un tour est sélectionné
    if (formData.selectedTours.length === 0) {
      const destinationError = validateRequired(formData.destination, 'Destination');
      if (destinationError) newErrors.destination = destinationError;

      const tourTypeError = validateRequired(formData.tourType, 'Type de tour');
      if (tourTypeError) newErrors.tourType = tourTypeError;

      const monthError = validateRequired(formData.month, 'Mois');
      if (monthError) newErrors.month = monthError;

      if (destinationError || tourTypeError || monthError) {
        newErrors.selectedTours = 'Veuillez sélectionner au moins un tour';
      }
    } else {
      // Si des tours sont déjà sélectionnés, c'est OK
      if (!formData.destination && !formData.tourType && !formData.month) {
        // C'est OK, l'utilisateur peut soumettre avec les tours déjà sélectionnés
      }
    }

    const participantsError = validateNumber(
      formData.numParticipants,
      1,
      50,
      'Nombre de participants'
    );
    if (participantsError) newErrors.numParticipants = participantsError;

    // Validate optional fields
    if (formData.passportNumber) {
      const passportError = validatePassport(formData.passportNumber);
      if (passportError) newErrors.passportNumber = passportError;
    }

    if (formData.passportExpiry) {
      const expiryError = validatePassportExpiry(formData.passportExpiry);
      if (expiryError) newErrors.passportExpiry = expiryError;
    }

    // Validate participants if group
    if (formData.isGroup && participants.length > 0) {
      participants.forEach((participant, index) => {
        if (!participant.name.trim()) {
          newErrors[`participant_${index}_name`] = 'Nom requis';
        }
        if (participant.phone) {
          const participantPhoneError = validatePhone(participant.phone);
          if (participantPhoneError) {
            newErrors[`participant_${index}_phone`] = participantPhoneError;
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('error', 'Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    const totalAmount = calculateTotal();
    
    // Valider qu'au moins un tour est sélectionné
    if (formData.selectedTours.length === 0 && (!formData.destination || !formData.tourType || !formData.month)) {
      showNotification('error', 'Veuillez sélectionner au moins un tour');
      return;
    }
    
    // Utiliser le premier tour sélectionné ou le tour en cours
    const primaryTour = formData.selectedTours.length > 0 
      ? formData.selectedTours[0] 
      : { destination: formData.destination, tourType: formData.tourType, month: formData.month };
    
    const booking: BookingInsert = {
      company_name: formData.companyName,
      position: formData.position,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      destination: primaryTour.destination,
      tour_type: primaryTour.tourType,
      month: primaryTour.month,
      num_participants: formData.numParticipants,
      is_group: formData.isGroup,
      participation_reason: formData.participationReason,
      passport_number: formData.passportNumber || undefined,
      passport_expiry: formData.passportExpiry || undefined,
      travel_type: formData.travelType as 'personal' | 'business',
      total_amount: totalAmount,
      participants: formData.isGroup && participants.length > 0 ? participants : undefined,
      payment_status: 'pending',
    };

    setBookingData(booking);

    // Debug: vérifier la configuration
    console.log('Payment check:', {
      isStripeConfigured,
      totalAmount,
      stripeKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? 'Present' : 'Missing',
    });

    // Si Stripe est configuré et qu'il y a un montant à payer, créer un PaymentIntent côté serveur
    if (isStripeConfigured && totalAmount > 0) {
      try {
        setIsSubmitting(true);
        
        // Déterminer l'URL de base pour les fonctions Netlify
        // En local avec netlify dev: http://localhost:8888
        // En production: URL relative (vide = même origine)
        const functionsBase = import.meta.env.VITE_FUNCTIONS_BASE || '';
        const functionsUrl = `${functionsBase}/.netlify/functions/create-payment-intent`;
        
        console.log('Creating payment intent at:', functionsUrl);
        console.log('Amount to pay (70%):', totalAmount * 0.7);
        
        const response = await fetch(functionsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: formatAmountForStripe(totalAmount * 0.7),
            currency: 'usd',
            metadata: {
              email: booking.email,
              destination: booking.destination,
              tour_type: booking.tour_type,
            },
          }),
        });

        console.log('Payment intent response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Payment intent error:', errorText);
          throw new Error(`Erreur lors de la création du paiement: ${response.status} ${response.statusText}. Vérifiez les logs Netlify.`);
        }

        const data = await response.json();
        console.log('Payment intent data:', { hasClientSecret: !!data?.clientSecret, hasPaymentIntentId: !!data?.paymentIntentId });
        
        if (!data?.clientSecret || !data?.paymentIntentId) {
          console.error('Invalid payment intent response:', data);
          throw new Error('Client secret manquant pour le paiement');
        }

        await createBooking({
          ...booking,
          payment_intent_id: data.paymentIntentId,
          payment_status: 'pending',
        });

        setBookingData({
          ...booking,
          payment_intent_id: data.paymentIntentId,
          payment_status: 'pending',
        });
        setClientSecret(data.clientSecret);
        setShowPayment(true);
        setIsSubmitting(false);
        // Scroll to payment form
        setTimeout(() => {
          const paymentElement = document.getElementById('payment-section');
          paymentElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } catch (error: any) {
        console.error('Payment setup error:', error);
        setClientSecret(null);
        setIsSubmitting(false);
        const errorMessage = error?.message || 'Erreur lors de la création du paiement';
        
        // Ne pas faire de fallback silencieux - demander à l'utilisateur
        showNotification('error', `${errorMessage}. La réservation n'a pas été créée. Veuillez réessayer.`);
        return; // Ne pas sauvegarder si le paiement échoue
      }
    } else {
      // Si Stripe n'est pas configuré ou montant = 0, sauvegarder directement
      if (!isStripeConfigured) {
        console.warn('Stripe not configured - saving booking without payment');
      }
      if (totalAmount === 0) {
        console.warn('Total amount is 0 - saving booking without payment');
      }
      await saveBooking(booking);
    }
  };

  const saveBooking = async (booking: BookingInsert, paymentIntentId?: string) => {
    setIsSubmitting(true);

    try {
      const bookingWithPayment: BookingInsert = {
        ...booking,
        payment_intent_id: paymentIntentId,
        payment_status: paymentIntentId ? 'succeeded' : booking.payment_status,
      };
      await createBooking(bookingWithPayment);

      showNotification(
        'success',
        paymentIntentId
          ? 'Réservation et paiement confirmés avec succès! Vous recevrez un email de confirmation.'
          : 'Réservation soumise avec succès! Nous vous contacterons sous peu.',
        7000
      );

      // Reset form
      setFormData({
        companyName: '',
        position: '',
        email: '',
        phone: '',
        country: '',
        destination: '',
        tourType: '',
        selectedTours: [],
        month: '',
        numParticipants: 1,
        isGroup: false,
        participationReason: 'networking',
        passportNumber: '',
        passportExpiry: '',
        travelType: 'business',
        wantsExtension: false,
        extensionDays: 0,
      });
      setParticipants([]);
      setErrors({});
      setShowPayment(false);
      setBookingData(null);
      setClientSecret(null);
    } catch (error: any) {
      console.error('Booking error:', error);
      const errorMessage = error?.message || 'Une erreur est survenue. Veuillez réessayer.';
      
      if (errorMessage.includes('tables Supabase n\'ont pas été créées')) {
        showNotification(
          'error',
          errorMessage + ' Consultez SETUP_SUPABASE.md pour les instructions.',
          10000
        );
      } else {
        showNotification('error', errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!bookingData) {
      return;
    }

    try {
      console.log('Payment successful, PaymentIntent ID:', paymentIntentId);
      showNotification(
        'success',
        'Réservation et paiement confirmés avec succès! Vous recevrez un email de confirmation.',
        7000
      );

      // Reset form
      setFormData({
        companyName: '',
        position: '',
        email: '',
        phone: '',
        country: '',
        destination: '',
        tourType: '',
        selectedTours: [],
        month: '',
        numParticipants: 1,
        isGroup: false,
        participationReason: 'networking',
        passportNumber: '',
        passportExpiry: '',
        travelType: 'business',
        wantsExtension: false,
        extensionDays: 0,
      });
      setParticipants([]);
      setErrors({});
      setShowPayment(false);
      setBookingData(null);
      setClientSecret(null);
    } catch (error: any) {
      console.error('Payment success error:', error);
      showNotification('error', 'Erreur lors de la confirmation du paiement');
    }
  };

  const handlePaymentError = (error: string) => {
    showNotification('error', error);
  };

  const selectedDestination = destinations.find((d) => d.value === formData.destination);

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('booking.title')}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Réservez votre Business Tour en quelques étapes simples
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-8">
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm font-semibold text-red-400 mb-2">
                  Veuillez corriger les erreurs suivantes :
                </p>
                <ul className="text-sm text-red-300 list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, message]) => (
                    <li key={field}>{message}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-pink-500" />
                {t('booking.personal')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.company')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      if (errors.companyName) {
                        setErrors({ ...errors, companyName: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.companyName ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.position')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => {
                      setFormData({ ...formData, position: e.target.value });
                      if (errors.position) {
                        setErrors({ ...errors, position: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.position ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-400">{errors.position}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) {
                        setErrors({ ...errors, phone: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.phone ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.country')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ ...formData, country: e.target.value });
                      if (errors.country) {
                        setErrors({ ...errors, country: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.country ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-400">{errors.country}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.passport')}
                  </label>
                  <input
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, passportNumber: e.target.value });
                      if (errors.passportNumber) {
                        setErrors({ ...errors, passportNumber: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.passportNumber ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.passportNumber && (
                    <p className="mt-1 text-sm text-red-400">{errors.passportNumber}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.expiry')}
                  </label>
                  <input
                    type="date"
                    value={formData.passportExpiry}
                    onChange={(e) => {
                      setFormData({ ...formData, passportExpiry: e.target.value });
                      if (errors.passportExpiry) {
                        setErrors({ ...errors, passportExpiry: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.passportExpiry ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.passportExpiry && (
                    <p className="mt-1 text-sm text-red-400">{errors.passportExpiry}</p>
                  )}
                  <p className="mt-2 text-xs text-yellow-400">
                    ⚠️ Le passeport doit avoir minimum 6 mois de validité restante
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.travel')} *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-300">
                      <input
                        type="radio"
                        value="personal"
                        checked={formData.travelType === 'personal'}
                        onChange={(e) =>
                          setFormData({ ...formData, travelType: e.target.value })
                        }
                        className="mr-2"
                      />
                      <span>{t('booking.personal.travel')}</span>
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input
                        type="radio"
                        value="business"
                        checked={formData.travelType === 'business'}
                        onChange={(e) =>
                          setFormData({ ...formData, travelType: e.target.value })
                        }
                        className="mr-2"
                      />
                      <span>{t('booking.business.travel')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-pink-500" />
                Détails du Tour
              </h2>

              {/* Tours sélectionnés */}
              {formData.selectedTours.length > 0 && (
                <div className="mb-6 p-4 bg-[#0a0e27] rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Tours Sélectionnés</h3>
                  <div className="space-y-2">
                    {formData.selectedTours.map((tour, index) => {
                      const dest = destinations.find(d => d.value === tour.destination);
                      const type = tourTypes.find(t => t.value === tour.tourType);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700"
                        >
                          <div>
                            <span className="text-white font-medium">
                              {dest?.label} - {type?.label}
                            </span>
                            <span className="text-gray-400 ml-2">({tour.month})</span>
                            {tour.destination === 'china' && (
                              <span className="block text-xs text-blue-400 mt-1">
                                ℹ️ Hébergement: 10 nuits
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTour(index)}
                            className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Destination *
                  </label>
                  <select
                    required
                    value={formData.destination}
                    onChange={(e) => {
                      setFormData({ ...formData, destination: e.target.value, month: '' });
                      if (errors.destination) {
                        setErrors({ ...errors, destination: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.destination ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  >
                    <option value="">Sélectionner une destination</option>
                    {destinations.map((dest) => (
                      <option key={dest.value} value={dest.value}>
                        {dest.label}
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="mt-1 text-sm text-red-400">{errors.destination}</p>
                  )}
                  {formData.destination === 'china' && (
                    <p className="mt-2 text-xs text-blue-400 flex items-start space-x-1">
                      <span>ℹ️</span>
                      <span>Pour la Chine, l'hébergement est de <strong>10 nuits</strong> (au lieu de 7 nuits pour les autres destinations).</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type de Tour *
                  </label>
                  <select
                    required
                    value={formData.tourType}
                    onChange={(e) => {
                      setFormData({ ...formData, tourType: e.target.value });
                      if (errors.tourType) {
                        setErrors({ ...errors, tourType: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.tourType ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  >
                    <option value="">Sélectionner un type</option>
                    {tourTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.tourType && (
                    <p className="mt-1 text-sm text-red-400">{errors.tourType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mois (2026) *
                  </label>
                  <select
                    required
                    value={formData.month}
                    onChange={(e) => {
                      setFormData({ ...formData, month: e.target.value });
                      if (errors.month) {
                        setErrors({ ...errors, month: '' });
                      }
                    }}
                    disabled={!formData.destination}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.month ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:opacity-50`}
                  >
                    <option value="">Sélectionner un mois</option>
                    {selectedDestination?.months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  {errors.month && (
                    <p className="mt-1 text-sm text-red-400">{errors.month}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={addTour}
                    disabled={!formData.destination || !formData.tourType || !formData.month}
                    className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg border border-gray-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter ce Tour</span>
                  </button>
                  <p className="mt-2 text-xs text-gray-400 text-center">
                    Vous pouvez sélectionner plusieurs tours en ajoutant chacun séparément
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.participants')} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.numParticipants}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setFormData({
                        ...formData,
                        numParticipants: value,
                        isGroup: value >= 5,
                      });
                      if (errors.numParticipants) {
                        setErrors({ ...errors, numParticipants: '' });
                      }
                    }}
                    className={`w-full px-4 py-2 bg-[#0a0e27] border ${
                      errors.numParticipants ? 'border-red-500' : 'border-gray-700'
                    } text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  />
                  {errors.numParticipants && (
                    <p className="mt-1 text-sm text-red-400">{errors.numParticipants}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.reason')} *
                  </label>
                  <select
                    required
                    value={formData.participationReason}
                    onChange={(e) =>
                      setFormData({ ...formData, participationReason: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {reasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wantsExtension}
                      onChange={(e) =>
                        setFormData({ ...formData, wantsExtension: e.target.checked, extensionDays: e.target.checked ? formData.extensionDays : 0 })
                      }
                      className="w-5 h-5 rounded border-gray-700 bg-[#0a0e27] text-pink-500 focus:ring-2 focus:ring-pink-500"
                    />
                    <span className="text-sm font-medium text-gray-300">
                      Souhaitez-vous prolonger votre séjour ?
                    </span>
                  </label>
                  {formData.wantsExtension && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pour combien de jours ?
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={formData.extensionDays || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, extensionDays: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Nombre de jours"
                      />
                    </div>
                  )}
                </div>
              </div>

              {formData.isGroup && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Autres Participants (Groupe de 5+)
                    </h3>
                    <button
                      type="button"
                      onClick={addParticipant}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                  {participants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 mb-4 p-4 bg-[#0a0e27] border border-gray-800 rounded-lg"
                    >
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nom du participant"
                      value={participant.name}
                      onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                    {errors[`participant_${index}_name`] && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors[`participant_${index}_name`]}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={participant.phone}
                      onChange={(e) => updateParticipant(index, 'phone', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                    {errors[`participant_${index}_phone`] && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors[`participant_${index}_phone`]}
                      </p>
                    )}
                  </div>
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {calculateTotal() > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-lg border border-pink-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Total Estimé</h3>
                    <p className="text-sm text-gray-400">
                      {formData.numParticipants} participant(s) × $
                      {calculateTotal() / formData.numParticipants}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      ${calculateTotal().toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-pink-500/20">
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-400 text-lg">💰</div>
                    <div>
                      <p className="text-sm font-semibold text-yellow-400 mb-1">
                        Paiement de 70% requis pour confirmer votre réservation
                      </p>
                      <p className="text-xs text-gray-400">
                        Montant à payer maintenant : <span className="font-semibold text-white">${(calculateTotal() * 0.7).toLocaleString()}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Solde restant (30%) : <span className="font-semibold text-white">${(calculateTotal() * 0.3).toLocaleString()}</span> - à payer avant le départ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/30"
            >
              <CreditCard className="w-5 h-5" />
              <span>
                {isSubmitting 
                  ? 'Envoi en cours...' 
                  : isStripeConfigured && calculateTotal() > 0
                  ? 'Continuer vers le Paiement'
                  : t('booking.submit')
                }
              </span>
            </button>
          </form>

          {/* Payment Section */}
          {showPayment && bookingData && calculateTotal() > 0 && isStripeConfigured && (
            <div id="payment-section" className="mt-8 bg-gray-900 rounded-xl border border-gray-800 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-pink-500" />
                  Finaliser le Paiement
                </h2>
                <button
                  onClick={() => {
                    setShowPayment(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
              </div>

              <div className="mb-6 p-4 bg-[#0a0e27] rounded-lg border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Résumé de la Réservation</h3>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><span className="font-medium">Destination:</span> {bookingData.destination}</p>
                  <p><span className="font-medium">Type:</span> {bookingData.tour_type}</p>
                  <p><span className="font-medium">Participants:</span> {bookingData.num_participants}</p>
                  <p><span className="font-medium">Mois:</span> {bookingData.month}</p>
                </div>
              </div>

              {clientSecret ? (
                <Elements
                  stripe={getStripe()}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'night',
                      variables: {
                        colorPrimary: '#ec4899',
                        colorBackground: '#111827',
                        colorText: '#ffffff',
                        colorDanger: '#ef4444',
                        fontFamily: 'system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '8px',
                      },
                    },
                  }}
                >
                  <PaymentForm
                    amount={calculateTotal() * 0.7}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              ) : (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                  Initialisation du paiement en cours...
                </div>
              )}
            </div>
          )}

          {showPayment && !isStripeConfigured && (
            <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-sm">
                ⚠️ Stripe n'est pas configuré. La réservation sera sauvegardée sans paiement en ligne.
                Consultez SETUP_STRIPE.md pour configurer Stripe.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
