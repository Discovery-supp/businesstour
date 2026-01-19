import { Calendar, ArrowRight } from 'lucide-react';

export function BlogPage() {
  const posts = [
    {
      title: 'Comment Réussir Votre Premier Business Tour en Asie',
      excerpt:
        'Découvrez nos meilleurs conseils pour maximiser votre expérience lors de votre premier voyage d\'affaires en Asie.',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Business Tours Team',
      date: '2026-01-10',
      category: 'Guides',
    },
    {
      title: 'Top 10 des Opportunités d\'Investissement en Afrique',
      excerpt:
        'L\'Afrique regorge d\'opportunités pour les entrepreneurs avisés. Voici notre sélection des secteurs les plus prometteurs.',
      image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Marie Kouadio',
      date: '2026-01-08',
      category: 'Investissement',
    },
    {
      title: 'Les Clés du Networking Réussi lors des Salons Internationaux',
      excerpt:
        'Maîtrisez l\'art du networking professionnel pour créer des connexions durables et profitables.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Jean-Paul Mensah',
      date: '2026-01-05',
      category: 'Networking',
    },
    {
      title: 'Sourcing en Turquie: Guide Complet pour les Importateurs',
      excerpt:
        'Tout ce que vous devez savoir pour sourcer efficacement des produits de qualité en Turquie.',
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Fatou Diallo',
      date: '2026-01-03',
      category: 'Sourcing',
    },
    {
      title: 'Dubai: Hub Incontournable pour le Commerce International',
      excerpt:
        'Pourquoi Dubai est devenu la destination privilégiée des entrepreneurs africains.',
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Ahmed Traore',
      date: '2025-12-28',
      category: 'Destinations',
    },
    {
      title: 'Tendances 2026: L\'Avenir du Commerce Afrique-Chine',
      excerpt:
        'Analyse des nouvelles tendances qui façonnent les relations commerciales entre l\'Afrique et la Chine.',
      image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Sophie Konate',
      date: '2025-12-25',
      category: 'Tendances',
    },
  ];

  const categories = ['Tous', 'Guides', 'Investissement', 'Networking', 'Sourcing', 'Destinations', 'Tendances'];

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Actualités</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Conseils, tendances et actualités du monde des affaires internationales
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-[#0a0e27] hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 text-gray-300 hover:text-white rounded-full font-medium transition-all border border-gray-800 hover:border-transparent"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-pink-500 transition-all group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>
                  <button className="flex items-center space-x-2 text-pink-500 font-semibold group-hover:space-x-3 transition-all">
                    <span>Lire la suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Restez Informé de Nos Dernières Actualités
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Abonnez-vous à notre newsletter pour recevoir nos conseils et opportunités exclusives
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 bg-[#0a0e27] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all whitespace-nowrap shadow-lg shadow-pink-500/30"
            >
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
