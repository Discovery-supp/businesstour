import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Briefcase, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { subscribeNewsletter } from '../lib/supabase';

export function Footer() {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  return (
    <footer className="bg-[#0a0e27] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">Business Tours</span>
            </div>
            <p className="text-sm">{t('footer.about.text')}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              {[
                { path: '/', key: 'home' },
                { path: '/about', key: 'about' },
                { path: '/tours', key: 'tours' },
                { path: '/booking', key: 'booking' },
                { path: '/contact', key: 'contact' },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="hover:text-pink-500 transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-0.5" />
                <span className="text-sm">contact@businesstours.org</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 mt-0.5" />
                <div className="flex flex-col text-sm">
                  <span>+243 822 201 758</span>
                  <span>+243 979 490 002</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span className="text-sm">Global Offices</span>
              </li>
              <li className="flex items-start space-x-2">
                <MessageCircle className="w-5 h-5 mt-0.5 text-[#25D366]" />
                <a
                  href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || '+243822201758').replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[#25D366] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm mb-4">{t('footer.newsletter.text')}</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newsletterEmail) {
                  showNotification('warning', 'Veuillez entrer une adresse email');
                  return;
                }

                setIsSubscribing(true);
                try {
                  await subscribeNewsletter(newsletterEmail);
                  showNotification('success', 'Abonnement réussi! Merci de votre intérêt.');
                  setNewsletterEmail('');
                } catch (error: any) {
                  console.error('Newsletter error:', error);
                  showNotification(
                    'error',
                    error?.message || 'Erreur lors de l\'abonnement. Veuillez réessayer.'
                  );
                } finally {
                  setIsSubscribing(false);
                }
              }}
              className="flex"
            >
              <input
                type="email"
                placeholder="Email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={isSubscribing}
                required
                className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-500 text-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-r-lg transition-all"
              >
                {isSubscribing ? '...' : t('footer.subscribe')}
              </button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Business Tours. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
