import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Users, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const destinations = [
    {
      name: t('destinations.turkey'),
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800',
      dates: ['Février', 'Avril', 'Août', 'Novembre'],
    },
    {
      name: t('destinations.dubai'),
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
      dates: ['Mars', 'Mai', 'Juillet', 'Octobre'],
    },
    {
      name: t('destinations.china'),
      image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=800',
      dates: ['Mars', 'Juin', 'Octobre'],
    },
    {
      name: t('destinations.benin'),
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800',
      dates: ['Février', 'Avril', 'Mai', 'Juillet', 'Octobre', 'Novembre'],
    },
  ];

  const services = [
    {
      icon: <Award className="w-8 h-8" />,
      title: t('services.expertise'),
      description: t('services.expertise.desc'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('services.opportunities'),
      description: t('services.opportunities.desc'),
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('services.execution'),
      description: t('services.execution.desc'),
    },
  ];

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="relative bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Conference Group Photo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27]/70 via-gray-900/60 to-[#0a0e27]/70"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-semibold">
                STRATÉGIE CONTINENTALE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <p className="text-base md:text-lg mb-8 text-gray-300 leading-relaxed">
              {t('hero.highlight')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/booking')}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-pink-500/50"
              >
                {t('hero.cta')}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-transparent border-2 border-pink-500 text-white rounded-lg font-semibold text-lg hover:bg-pink-500/10 transition-all"
              >
                {t('hero.contact')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('services.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#0a0e27] p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-lg flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('destinations.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => navigate('/tours')}
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-pink-500 transition-colors">{destination.name}</h3>
                    <p className="text-sm text-gray-300">
                      {destination.dates.join(', ')} 2026
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Globe className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <div className="text-4xl font-bold mb-2 text-white">4</div>
              <p className="text-gray-400">Destinations Mondiales</p>
            </div>
            <div className="p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <div className="text-4xl font-bold mb-2 text-white">500+</div>
              <p className="text-gray-400">Entrepreneurs Connectés</p>
            </div>
            <div className="p-6">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <div className="text-4xl font-bold mb-2 text-white">95%</div>
              <p className="text-gray-400">Taux de Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden min-h-[500px] flex items-center">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/conference-background.jpg)',
            filter: 'blur(2px)',
          }}
        >
          {/* Overlay sombre pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        {/* Contenu */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Prêt à Transformer Votre Vision en Réalité?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Rejoignez des centaines d'entrepreneurs qui ont accéléré leur croissance grâce à nos business tours.
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all inline-flex items-center space-x-2 shadow-lg shadow-pink-500/30"
          >
            <span>Commencer Maintenant</span>
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
