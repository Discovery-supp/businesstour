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
    name: 'Salons Internationaux de la Cosmétique et de la Beauté - BEAUTYISTANBUL',
    nameEn: 'International Cosmetics and Beauty Fair - BEAUTYISTANBUL',
    location: 'Istanbul, Turquie',
    locationEn: 'Istanbul, Turkey',
    date: 'Du 7 au 9 mai 2026',
    description: 'BEAUTYISTANBUL est l\'un des plus grands salons internationaux de la cosmétique et de la beauté, rassemblant chaque année les acteurs clés du secteur venus du monde entier. L\'événement accueille plus de 16 600 professionnels, dont 8 000 acheteurs B2B qualifiés, ainsi que des exposants issus de 66 pays, confirmant son statut de plateforme commerciale mondiale incontournable. Le salon offre un cadre privilégié pour le réseautage professionnel, la mise en relation directe avec les décideurs, et le développement de partenariats commerciaux durables. Grâce à sa solution digitale O2O (Online to Offline) accessible 24h/24 et 7j/7, BEAUTYISTANBUL prolonge les opportunités d\'affaires avant, pendant et après l\'événement. Istanbul – Turquie, véritable carrefour stratégique entre l\'Europe et l\'Asie, BEAUTYISTANBUL constitue un rendez-vous incontournable pour exposer ses produits, découvrir les dernières innovations du secteur et accélérer la croissance de son business beauté à l\'international.',
    descriptionEn: 'BEAUTYISTANBUL is one of the largest international cosmetics and beauty fairs, bringing together key industry players from around the world each year. The event welcomes over 16,600 professionals, including 8,000 qualified B2B buyers, as well as exhibitors from 66 countries, confirming its status as an essential global commercial platform. The fair offers a privileged setting for professional networking, direct contact with decision-makers, and the development of sustainable business partnerships. Thanks to its O2O (Online to Offline) digital solution accessible 24/7, BEAUTYISTANBUL extends business opportunities before, during, and after the event. Istanbul – Turkey, a true strategic crossroads between Europe and Asia, BEAUTYISTANBUL is a must-attend event to showcase products, discover the latest industry innovations, and accelerate international beauty business growth.',
    image: 'beautyistanbul.jpeg',
    category: 'salon',
    participants: 16600,
    website: 'https://example.com',
  },
  {
    id: '2',
    name: 'Mining Türkiye Fair',
    nameEn: 'Mining Türkiye Fair',
    location: 'Istanbul, Turquie',
    locationEn: 'Istanbul, Turkey',
    date: 'Du 8 au 11 avril 2026',
    description: 'Mining Türkiye Fair est le salon le plus complet de l\'industrie minière dans la région eurasienne. Depuis sa création, il connaît une croissance continue, renforçant chaque année sa position comme plateforme de référence pour les acteurs du secteur minier. Organisé par Tüyap Tüm Fuarcılık Yapım A.Ş., en partenariat avec la Fondation pour le Développement de l\'Industrie Minière de Turquie, l\'événement rassemble l\'ensemble de la chaîne de valeur minière : exploration, extraction, transformation, équipements, technologies, machines lourdes et services spécialisés. L\'édition 2026 réunira plus de 750 exposants et plus de 25 000 professionnels venus de nombreux pays, offrant un cadre idéal pour le réseautage, le partage d\'expertise, la présentation d\'innovations technologiques et la création de partenariats commerciaux et industriels. Tüyap Fair and Congress Center, Istanbul – Turquie.',
    descriptionEn: 'Mining Türkiye Fair is the most comprehensive mining industry fair in the Eurasian region. Since its creation, it has experienced continuous growth, strengthening its position each year as a reference platform for mining sector players. Organized by Tüyap Tüm Fuarcılık Yapım A.Ş., in partnership with the Turkish Mining Industry Development Foundation, the event brings together the entire mining value chain: exploration, extraction, processing, equipment, technologies, heavy machinery and specialized services. The 2026 edition will bring together more than 750 exhibitors and more than 25,000 professionals from many countries, offering an ideal framework for networking, expertise sharing, presentation of technological innovations and creation of commercial and industrial partnerships. Tüyap Fair and Congress Center, Istanbul – Turkey.',
    image: 'mining-turkiye.jpeg',
    category: 'foire',
    participants: 25000,
    website: 'https://example.com',
  },
  {
    id: '3',
    name: 'IFCO – Istanbul Fashion Connection',
    nameEn: 'IFCO – Istanbul Fashion Connection',
    location: 'Istanbul, Turquie',
    locationEn: 'Istanbul, Turkey',
    date: 'Du 4 au 7 février 2026',
    description: 'IFCO – Istanbul Fashion Connection est un salon international majeur dédié à l\'industrie de la mode et du textile, réunissant créateurs, fabricants, marques, acheteurs et distributeurs du monde entier. Il constitue une plateforme stratégique pour découvrir les tendances mondiales, développer des partenariats commerciaux et connecter les acteurs de la mode entre l\'Europe, l\'Asie et le Moyen-Orient. Istanbul – Turquie, véritable carrefour stratégique entre l\'Europe et l\'Asie.',
    descriptionEn: 'IFCO – Istanbul Fashion Connection is a major international fair dedicated to the fashion and textile industry, bringing together creators, manufacturers, brands, buyers and distributors from around the world. It is a strategic platform to discover global trends, develop business partnerships and connect fashion players between Europe, Asia and the Middle East. Istanbul – Turkey, a true strategic crossroads between Europe and Asia.',
    image: 'ifco-istanbul-fashion.jpeg',
    category: 'salon',
    participants: 50000,
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
