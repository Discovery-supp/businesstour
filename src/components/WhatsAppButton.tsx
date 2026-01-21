import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  // Numéro WhatsApp configuré via variable d'environnement
  // Format: +243822201758 (sans espaces, avec indicatif pays)
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+243822201758';
  
  // Message par défaut (optionnel)
  const defaultMessage = encodeURIComponent('Bonjour, je souhaite obtenir plus d\'informations sur vos Business Tours.');
  
  // Nettoyer le numéro (garder seulement les chiffres et le +)
  const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
  
  // URL WhatsApp
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group flex items-center justify-center"
      aria-label="Contacter via WhatsApp"
      title="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
