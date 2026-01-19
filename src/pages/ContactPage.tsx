import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { createContact } from '../lib/supabase';

export function ContactPage() {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      showNotification(
        'success',
        'Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.',
        5000
      );

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Contact error:', error);
      showNotification(
        'error',
        error?.message || 'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans votre projet
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400">contact@businesstours.com</p>
              <p className="text-gray-400">info@businesstours.com</p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Téléphone</h3>
              <p className="text-gray-400">+243 822 201 758</p>
              <p className="text-gray-400">+243 979 490 002</p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bureaux</h3>
              <p className="text-gray-400">Paris, France</p>
              <p className="text-gray-400">Cotonou, Bénin</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sujet *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="info">Informations générales</option>
                      <option value="booking">Réservation</option>
                      <option value="custom">Tour sur-mesure</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/30"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Envoi en cours...' : t('contact.send')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0a0e27] to-gray-900 rounded-xl border border-gray-800 p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Besoin d'un Tour Sur-Mesure?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Nous créons des programmes personnalisés adaptés à vos objectifs spécifiques et à votre secteur d'activité
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg shadow-pink-500/30">
                Demander un Devis
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
