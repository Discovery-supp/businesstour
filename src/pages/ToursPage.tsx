import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ToursPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedTourType, setSelectedTourType] = useState('all');

  const tours = [
    {
      destination: 'Turquie',
      tourType: 'VIP',
      price: 2000,
      inclusions: [
        'Assistance pour les visas Turquie',
        '7 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Rencontres B2B organisées avec plus des fournisseurs présélectionnés',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Visites guidées des usines de premier plan pour une immersion totale dans le processus de fabrication',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Turquie',
      tourType: 'Standard',
      price: 1700,
      inclusions: [
        'Assistance pour les visas',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Turquie',
      tourType: 'Basique',
      price: 1600,
      inclusions: [
        '7 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
      ],
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Dubai',
      tourType: 'VIP',
      price: 1000,
      inclusions: [
        'Assistance pour les visas UAE',
        '7 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Rencontres B2B organisées avec plus des fournisseurs présélectionnés',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Visites guidées des usines de premier plan pour une immersion totale dans le processus de fabrication',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Dubai',
      tourType: 'Standard',
      price: 800,
      inclusions: [
        'Assistance pour les visas',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Dubai',
      tourType: 'Basique',
      price: 700,
      inclusions: [
        '7 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
      ],
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Chine',
      tourType: 'VIP',
      price: 2200,
      inclusions: [
        'Assistance pour les visas Chine',
        '10 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Rencontres B2B organisées avec plus des fournisseurs présélectionnés',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Visites guidées des usines de premier plan pour une immersion totale dans le processus de fabrication',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Chine',
      tourType: 'Standard',
      price: 1800,
      inclusions: [
        'Assistance pour les visas',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Chine',
      tourType: 'Basique',
      price: 1600,
      inclusions: [
        '10 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
      ],
      image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Bénin',
      tourType: 'VIP',
      price: 700,
      inclusions: [
        'Assistance pour les visas',
        '7 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Rencontres B2B organisées avec plus des fournisseurs présélectionnés',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Visites guidées des usines de premier plan pour une immersion totale dans le processus de fabrication',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Bénin',
      tourType: 'Standard',
      price: 600,
      inclusions: [
        'Assistance pour les visas',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Facilitation des commandes (négociation, logistique, transport)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
        'Achat billet d\'avion (optionnel après l\'obtention du visa)',
      ],
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Bénin',
      tourType: 'Basique',
      price: 500,
      inclusions: [
        '7 nuits en hôtel (petits-déjeuners inclus)',
        'Accès aux conférences et ateliers',
        'Transferts aéroport – hôtel – salon',
        'Services de traduction multilingue assurant une communication fluide entre les participants et les acteurs (français-chinois-anglais, etc.)',
        'Soutien professionnel pour la signature de contrats d\'exclusivité avec les fournisseurs, consolidant ainsi des partenariats stratégiques',
      ],
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const filteredTours = tours.filter((tour) => {
    const destinationMatch =
      selectedDestination === 'all' || tour.destination === selectedDestination;
    const tourTypeMatch = selectedTourType === 'all' || tour.tourType === selectedTourType;
    return destinationMatch && tourTypeMatch;
  });

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Tours Business</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Découvrez nos packages adaptés à vos besoins et budgets. Chaque tour est conçu pour
            maximiser vos opportunités de croissance.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-white">Filtrer les Tours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Toutes les destinations</option>
                <option value="Turquie">Turquie</option>
                <option value="Dubai">Dubai</option>
                <option value="Chine">Chine</option>
                <option value="Bénin">Bénin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type de Tour</label>
              <select
                value={selectedTourType}
                onChange={(e) => setSelectedTourType(e.target.value)}
                className="w-full px-4 py-2 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="VIP">VIP</option>
                <option value="Standard">Standard</option>
                <option value="Basique">Basique</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-pink-500 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        tour.tourType === 'VIP'
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                          : tour.tourType === 'Standard'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      }`}
                    >
                      {tour.tourType}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{tour.destination}</h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">${tour.price}</div>
                      <div className="text-sm text-gray-400">par personne</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Inclusions:
                    </h4>
                    <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                      {tour.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-400">{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => navigate('/booking')}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-pink-500/30"
                  >
                    Réserver Maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0e27] rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Calendrier des Tours 2026
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-800">
                    <th className="text-left py-4 px-4 font-semibold text-white">
                      Destination
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-white">
                      Dates Disponibles
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-medium text-white">Turquie</td>
                    <td className="py-4 px-4 text-gray-400">
                      Février, Avril, Août, Novembre
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-medium text-white">Dubai</td>
                    <td className="py-4 px-4 text-gray-400">Mars, Mai, Juillet, Octobre</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-medium text-white">Chine</td>
                    <td className="py-4 px-4 text-gray-400">Mars, Juin, Octobre</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-white">Bénin</td>
                    <td className="py-4 px-4 text-gray-400">
                      Février, Avril, Mai, Juillet, Octobre, Novembre
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
