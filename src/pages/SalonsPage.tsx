import { Calendar, MapPin, Users, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Salon {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  locationEn: string;
  date: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: 'salon' | 'foire';
  participants: number;
  website?: string;
}

const salons: Salon[] = [
  {
    id: '1',
    name: 'Salon International de l\'Industrie',
    nameEn: 'International Industry Fair',
    location: 'Istanbul, Turquie',
    locationEn: 'Istanbul, Turkey',
    date: 'Mars 2026',
    description: 'Le plus grand salon industriel de la région, réunissant des milliers d\'entreprises et d\'investisseurs.',
    descriptionEn: 'The largest industrial fair in the region, bringing together thousands of companies and investors.',
    image: 'https://images.unsplash.com/photo-1587825143138-066a8b3c937b?w=800&h=600&fit=crop',
    category: 'salon',
    participants: 50000,
    website: 'https://example.com',
  },
  {
    id: '2',
    name: 'Foire Internationale de Commerce',
    nameEn: 'International Trade Fair',
    location: 'Dubai, Émirats Arabes Unis',
    locationEn: 'Dubai, United Arab Emirates',
    date: 'Avril 2026',
    description: 'Plateforme majeure pour le commerce international et les opportunités d\'affaires B2B.',
    descriptionEn: 'Major platform for international trade and B2B business opportunities.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    category: 'foire',
    participants: 75000,
    website: 'https://example.com',
  },
  {
    id: '3',
    name: 'Salon de la Technologie et Innovation',
    nameEn: 'Technology and Innovation Fair',
    location: 'Shanghai, Chine',
    locationEn: 'Shanghai, China',
    date: 'Juin 2026',
    description: 'Découvrez les dernières innovations technologiques et rencontrez les leaders de l\'industrie.',
    descriptionEn: 'Discover the latest technological innovations and meet industry leaders.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    category: 'salon',
    participants: 100000,
    website: 'https://example.com',
  },
  {
    id: '4',
    name: 'Foire Internationale des Produits',
    nameEn: 'International Products Fair',
    location: 'Cotonou, Bénin',
    locationEn: 'Cotonou, Benin',
    date: 'Octobre 2026',
    description: 'Événement phare pour les entreprises africaines et internationales.',
    descriptionEn: 'Flagship event for African and international businesses.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
    category: 'foire',
    participants: 30000,
    website: 'https://example.com',
  },
  {
    id: '5',
    name: 'Salon International de l\'Énergie',
    nameEn: 'International Energy Fair',
    location: 'Istanbul, Turquie',
    locationEn: 'Istanbul, Turkey',
    date: 'Novembre 2026',
    description: 'Rencontrez les experts de l\'énergie renouvelable et des technologies vertes.',
    descriptionEn: 'Meet renewable energy and green technology experts.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    category: 'salon',
    participants: 40000,
    website: 'https://example.com',
  },
  {
    id: '6',
    name: 'Foire Internationale de l\'Agroalimentaire',
    nameEn: 'International Food & Agriculture Fair',
    location: 'Dubai, Émirats Arabes Unis',
    locationEn: 'Dubai, United Arab Emirates',
    date: 'Décembre 2026',
    description: 'Le rendez-vous incontournable pour l\'industrie agroalimentaire mondiale.',
    descriptionEn: 'The must-attend event for the global food and agriculture industry.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    category: 'foire',
    participants: 60000,
    website: 'https://example.com',
  },
];

export function SalonsPage() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  return (
    <div className="pt-16 bg-[#0a0e27]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isFrench ? 'Nos Salons et Foires Internationales' : 'Our International Fairs and Exhibitions'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {isFrench
              ? 'Découvrez les plus grands événements B2B internationaux et développez votre réseau d\'affaires à travers le monde.'
              : 'Discover the largest international B2B events and expand your business network worldwide.'}
          </p>
        </div>
      </section>

      {/* Salons Grid */}
      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon) => (
              <div
                key={salon.id}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-pink-500/20 to-purple-600/20 overflow-hidden">
                  <img
                    src={salon.image.startsWith('http') ? salon.image : `/salons/${salon.image}`}
                    alt={isFrench ? salon.name : salon.nameEn}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback si l'image ne charge pas - affiche un placeholder avec gradient
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-placeholder')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-placeholder w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/30 to-purple-600/30';
                        fallback.innerHTML = `
                          <svg class="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        `;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Overlay gradient pour meilleure lisibilité du badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      salon.category === 'salon'
                        ? 'bg-pink-500/80 text-white'
                        : 'bg-purple-500/80 text-white'
                    }`}>
                      {salon.category === 'salon'
                        ? (isFrench ? 'Salon' : 'Fair')
                        : (isFrench ? 'Foire' : 'Exhibition')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {isFrench ? salon.name : salon.nameEn}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                      <span>{isFrench ? salon.location : salon.locationEn}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                      <span>{salon.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-2 text-pink-500" />
                      <span>{salon.participants.toLocaleString()} {isFrench ? 'participants' : 'participants'}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {isFrench ? salon.description : salon.descriptionEn}
                  </p>

                  {salon.website && (
                    <a
                      href={salon.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {isFrench ? 'Site web' : 'Website'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isFrench
              ? 'Participez à nos Business Tours lors de ces événements'
              : 'Join our Business Tours at these events'}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {isFrench
              ? 'Combinez votre participation aux salons avec nos Business Tours exclusifs pour maximiser vos opportunités d\'affaires.'
              : 'Combine your fair participation with our exclusive Business Tours to maximize your business opportunities.'}
          </p>
          <a
            href="/booking"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-pink-500/30"
          >
            {isFrench ? 'Réserver un Business Tour' : 'Book a Business Tour'}
          </a>
        </div>
      </section>
    </div>
  );
}
