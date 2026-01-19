import { Star, Quote } from 'lucide-react';
import partner1Logo from '../assets/partners/partner1.jpeg';
import partner2Logo from '../assets/partners/partner2.jpeg';

export function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Marie Kouadio',
      company: 'Kouadio Imports',
      position: 'CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      content:
        'Le Business Tour en Turquie a été transformateur pour mon entreprise. J\'ai rencontré des fournisseurs de qualité et établi des partenariats solides qui ont doublé mon chiffre d\'affaires.',
    },
    {
      name: 'Jean-Paul Mensah',
      company: 'Mensah Construction',
      position: 'Directeur Général',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      content:
        'Une expérience exceptionnelle à Dubai. L\'organisation était impeccable et les opportunités d\'affaires concrètes. Je recommande vivement Business Tours.',
    },
    {
      name: 'Fatou Diallo',
      company: 'Diallo Fashion',
      position: 'Fondatrice',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      content:
        'Grâce au tour en Chine, j\'ai trouvé les partenaires manufacturiers parfaits pour ma ligne de vêtements. Le ROI a été immédiat.',
    },
    {
      name: 'Ahmed Traore',
      company: 'Traore Tech Solutions',
      position: 'CTO',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      content:
        'Les ateliers et sessions de networking m\'ont permis de découvrir de nouvelles technologies et de créer des collaborations stratégiques.',
    },
    {
      name: 'Sophie Konate',
      company: 'Konate Cosmetics',
      position: 'Directrice Marketing',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      content:
        'L\'équipe de Business Tours a été professionnelle du début à la fin. Tout était bien planifié et les résultats ont dépassé mes attentes.',
    },
    {
      name: 'Ibrahim Sow',
      company: 'Sow Logistics',
      position: 'PDG',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      content:
        'Une opportunité unique de réseauter avec des entrepreneurs de haut niveau et d\'apprendre des meilleures pratiques internationales.',
    },
  ];

  const partners = [
    { 
      name: 'Organisation Partenaire 1', 
      logo: partner1Logo 
    },
    { 
      name: 'Organisation Partenaire 2', 
      logo: partner2Logo 
    },
  ];

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Témoignages</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Découvrez ce que nos clients disent de leur expérience avec Business Tours
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl border border-gray-800 p-8 hover:border-pink-500 transition-all"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-500"
                  />
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                    <p className="text-sm text-pink-500">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="w-8 h-8 text-pink-500/20 absolute -top-2 -left-2" />
                  <p className="text-gray-300 leading-relaxed pl-6">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos Partenaires
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">
              Nous travaillons avec les meilleures organisations pour vous offrir une expérience exceptionnelle
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-[#0a0e27] rounded-xl border border-gray-800 p-8 flex items-center justify-center hover:border-pink-500 transition-all"
              >
                <div className="text-center w-full">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-white">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Rejoindre Nos Entrepreneurs à Succès?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transformez votre vision en réalité avec nos Business Tours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg shadow-pink-500/30">
              Réserver un Tour
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-pink-500 text-white rounded-lg font-semibold text-lg hover:bg-pink-500/10 transition-all">
              En Savoir Plus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
