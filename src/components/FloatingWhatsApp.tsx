import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const WHATSAPP_URL =
    'https://wa.me/554192730992?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Termac%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';

  useEffect(() => {
    // Show after scrolling past 200px or 3 seconds
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowTooltip(true);
    }, 3500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0A111C] border border-[#078BD0]/40 text-xs text-white shadow-2xl backdrop-blur-md animate-fadeIn">
          <span>Olá! Converse conosco no WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Fechar mensagem rápida"
            className="text-[#A7B4C4] hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com Termac Ar-Condicionados: (41) 9273-0992"
        className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#078BD0] text-white shadow-[0_4px_25px_rgba(7,139,208,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#19B8FF]/50"
      >
        {/* Radar ambient wave */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19B8FF] opacity-35" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-transparent relative z-10 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};
