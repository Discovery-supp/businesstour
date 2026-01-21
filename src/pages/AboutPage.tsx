import { Users, Target, Award, TrendingUp, Globe2, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 bg-[#0a0e27]">
      <section className="bg-gradient-to-br from-[#0a0e27] via-gray-900 to-[#0a0e27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Nous sommes une équipe d'entrepreneurs passionnés qui croit fermement que l'échange d'expertises, de biens, de technologies et une collaboration pragmatique constituent le levier le plus puissant pour transformer des idées audacieuses en entreprises prospères. Depuis 2023, nous adoptons une démarche d'innovation ouverte et de développement collaboratif, en consolidant un réseau de partenaires et d'experts sur les marchés internationaux et en accompagnant les entrepreneurs dans la concrétisation et l'épanouissement de leurs projets. Nous faisons du voyage d'affaires un vecteur d'impact positif collectif.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-8">Notre Mission</h3>
              <ul className="space-y-3 text-lg text-gray-300 leading-relaxed">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span>Faciliter les échanges d'expertise et les partenariats stratégiques entre acteurs internationaux pour transformer des idées en opportunités concrètes et durables.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span>Offrir des voyages d'affaires structurés qui combinent sourcing, rencontres professionnelles ciblées, visites d'entreprises et participation à des foire et salon d'affaire, afin d'accélérer la prise de décision et la croissance des participants.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span>Créer des opportunités d'affaires tangibles et Collaboration pratique, intégrité dans les échanges, valeur ajoutée mesurable, et impact positif pour les marchés et les communautés impliquées.</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Business Conference"
                className="rounded-xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos Trois Piliers Stratégiques
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center text-pink-500 mb-6 mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Expertise et Transfert de Connaissances
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Sessions de formation, ateliers pratiques, et visites d'entreprises pour apprendre directement
                des meilleures pratiques internationales.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center text-pink-500 mb-6 mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Opportunités et Partenariats
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Facilitation de rencontres B2B, identification de partenaires, investisseurs et fournisseurs,
                et co-élaboration de projets à fort potentiel.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center text-pink-500 mb-6 mx-auto">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Exécution et Suivi
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Accompagnement opérationnel sur le terrain, de la planification à la mise en œuvre, avec des
                indicateurs de performance clairs et un reporting transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Business Networking Event"
                className="rounded-xl border border-gray-800"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-white mb-6">{t('why.title')}</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {t('why.content')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Connaissance approfondie du terrain africain</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Réseau international de partenaires vérifiés</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Méthode opérationnelle axée sur les résultats</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Accompagnement personnalisé et transparent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pour Qui Sont Nos Services?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold text-white mb-2">Entrepreneurs en Démarrage</h3>
              <p className="text-gray-400 text-sm">Accélérez votre croissance</p>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe2 className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold text-white mb-2">PME en Expansion</h3>
              <p className="text-gray-400 text-sm">Développez vos marchés</p>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold text-white mb-2">Investisseurs</h3>
              <p className="text-gray-400 text-sm">Découvrez des opportunités</p>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold text-white mb-2">Diaspora</h3>
              <p className="text-gray-400 text-sm">Reconnectez et investissez</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
