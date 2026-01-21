import { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.tours': 'Nos Tours',
    'nav.booking': 'Réservation',
    'nav.salons': 'Salons & Foires',
    'nav.testimonials': 'Témoignages',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.login': 'Connexion',
    'nav.portal': 'Mon Espace',
    'hero.title': 'Votre Passerelle Stratégique entre l\'Afrique et les Marchés Mondiaux',
    'hero.subtitle': 'Bienvenue chez Business Tours, votre passerelle stratégique entre l\'Afrique et les marchés mondiaux. Nous facilitons des échanges d\'expertise, des partenariats solides, des visites d\'affaires et des opportunités concrètes pour accélérer votre croissance.',
    'hero.highlight': 'Gagnez du temps et décrochez des accords concrets : voyage direct vers vos partenaires, fournisseurs et usines.',
    'hero.cta': 'Réserver Maintenant',
    'hero.contact': 'Nous Contacter',
    'services.title': 'Nos Services',
    'services.expertise': 'Expertise et Transfert de Connaissances',
    'services.expertise.desc': 'Sessions de formation, ateliers pratiques, et visites d\'entreprises pour apprendre des meilleures pratiques internationales.',
    'services.opportunities': 'Opportunités et Partenariats',
    'services.opportunities.desc': 'Facilitation de rencontres B2B, identification de partenaires, investisseurs et fournisseurs.',
    'services.execution': 'Exécution et Suivi',
    'services.execution.desc': 'Accompagnement opérationnel sur le terrain avec des indicateurs de performance clairs.',
    'destinations.title': 'Nos Destinations',
    'destinations.turkey': 'Turquie',
    'destinations.dubai': 'Dubai',
    'destinations.china': 'Chine',
    'destinations.benin': 'Bénin',
    'tours.vip': 'Tours VIP',
    'tours.standard': 'Tours Standard',
    'tours.basic': 'Tours Basique',
    'tours.from': 'À partir de',
    'tours.view': 'Voir Détails',
    'tours.book': 'Réserver',
    'booking.title': 'Réservation',
    'booking.personal': 'Informations Personnelles',
    'booking.company': 'Société / Organisme',
    'booking.position': 'Poste',
    'booking.email': 'Email Professionnel',
    'booking.phone': 'Téléphone',
    'booking.country': 'Pays',
    'booking.participants': 'Nombre de Participants',
    'booking.reason': 'Objet de Participation',
    'booking.passport': 'N° Passport',
    'booking.expiry': 'Date d\'Expiration',
    'booking.travel': 'Type de Voyage',
    'booking.personal.travel': 'Personnel',
    'booking.business.travel': 'Entreprise',
    'booking.submit': 'Confirmer la Réservation',
    'contact.title': 'Contactez-Nous',
    'contact.name': 'Nom Complet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'footer.about': 'À Propos',
    'footer.about.text': 'Business Tours facilite des échanges d\'expertise et des partenariats entre l\'Afrique et les marchés mondiaux.',
    'footer.links': 'Liens Rapides',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.text': 'Restez informé de nos dernières offres',
    'footer.subscribe': 'S\'abonner',
    'footer.rights': 'Tous droits réservés.',
    'about.title': 'À Propos de Business Tours',
    'about.intro': 'Nous sommes une équipe d\'entrepreneurs passionnés qui croit fermement que l\'échange d\'expertises, de biens, de technologies et une collaboration pragmatique constituent le levier le plus puissant pour transformer des idées audacieuses en entreprises prospères. Depuis 2023, nous adoptons une démarche d\'innovation ouverte et de développement collaboratif, en consolidant un réseau de partenaires et d\'experts sur les marchés internationaux et en accompagnant les entrepreneurs dans la concrétisation et l\'épanouissement de leurs projets. Nous faisons du voyage d\'affaires un vecteur d\'impact positif collectif.',
    'why.title': 'Pourquoi Nous Choisir ?',
    'why.content': 'Parce que nous combinons connaissance du terrain en Afrique, réseau international, et méthode opérationnelle axée sur les performances et le suivi pour des résultats durables.',
    'join.title': 'Rejoignez-Nous',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.tours': 'Our Tours',
    'nav.booking': 'Booking',
    'nav.salons': 'Fairs & Exhibitions',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
     'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.portal': 'My Portal',
    'hero.title': 'Your Strategic Gateway Between Africa and Global Markets',
    'hero.subtitle': 'Welcome to Business Tours, your strategic gateway between Africa and global markets. We facilitate knowledge exchange, solid partnerships, business visits and concrete opportunities to accelerate your growth.',
    'hero.highlight': 'Save time and secure concrete deals: direct travel to your partners, suppliers and factories.',
    'hero.cta': 'Book Now',
    'hero.contact': 'Contact Us',
    'services.title': 'Our Services',
    'services.expertise': 'Expertise and Knowledge Transfer',
    'services.expertise.desc': 'Training sessions, practical workshops, and company visits to learn from international best practices.',
    'services.opportunities': 'Opportunities and Partnerships',
    'services.opportunities.desc': 'B2B meeting facilitation, identification of partners, investors and suppliers.',
    'services.execution': 'Execution and Follow-up',
    'services.execution.desc': 'Operational support in the field with clear performance indicators.',
    'destinations.title': 'Our Destinations',
    'destinations.turkey': 'Turkey',
    'destinations.dubai': 'Dubai',
    'destinations.china': 'China',
    'destinations.benin': 'Benin',
    'tours.vip': 'VIP Tours',
    'tours.standard': 'Standard Tours',
    'tours.basic': 'Basic Tours',
    'tours.from': 'From',
    'tours.view': 'View Details',
    'tours.book': 'Book Now',
    'booking.title': 'Booking',
    'booking.personal': 'Personal Information',
    'booking.company': 'Company / Organization',
    'booking.position': 'Position',
    'booking.email': 'Professional Email',
    'booking.phone': 'Phone',
    'booking.country': 'Country',
    'booking.participants': 'Number of Participants',
    'booking.reason': 'Participation Reason',
    'booking.passport': 'Passport Number',
    'booking.expiry': 'Expiry Date',
    'booking.travel': 'Travel Type',
    'booking.personal.travel': 'Personal',
    'booking.business.travel': 'Business',
    'booking.submit': 'Confirm Booking',
    'contact.title': 'Contact Us',
    'contact.name': 'Full Name',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'footer.about': 'About',
    'footer.about.text': 'Business Tours facilitates knowledge exchange and partnerships between Africa and global markets.',
    'footer.links': 'Quick Links',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.text': 'Stay informed about our latest offers',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'about.title': 'About Business Tours',
    'about.intro': 'We are a team of passionate entrepreneurs who firmly believe that the exchange of expertise and practical collaboration is the most powerful lever to transform bold ideas into prosperous businesses.',
    'why.title': 'Why Choose Us?',
    'why.content': 'Because we combine knowledge of the African terrain, international network, and operational method focused on performance and monitoring for lasting results.',
    'join.title': 'Join Us',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
