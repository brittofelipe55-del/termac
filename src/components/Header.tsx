import React, { useState, useEffect } from 'react';
import { TermacLogo } from './TermacLogo';
import { MessageCircle, Menu, X, PhoneCall, ChevronRight } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/554192730992?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Termac%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'O Caminho', href: '#caminho' },
    { label: 'Encontrar Solução', href: '#encontre-solucao' },
    { label: 'Equipamentos', href: '#equipamentos' },
    { label: 'Curitiba & Região', href: '#regiao' },
    { label: 'Dúvidas Técnicas', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070B]/90 backdrop-blur-xl border-b border-[#078BD0]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group focus:outline-none focus:ring-2 focus:ring-[#078BD0] rounded-lg p-1 transition-transform"
          aria-label="Termac Ar-Condicionados - Página Inicial"
        >
          <TermacLogo size="sm" className="sm:hidden" />
          <TermacLogo size="md" className="hidden sm:flex" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#A7B4C4] hover:text-white transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#078BD0] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button: WhatsApp */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+554192730992"
            className="hidden xl:flex items-center gap-1.5 text-xs text-[#A7B4C4] hover:text-white transition-colors font-mono py-1 px-2.5 rounded-lg border border-[#078BD0]/20 bg-[#0A111C]"
            aria-label="Ligue para Termac: (41) 9273-0992"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#078BD0]" />
            <span>(41) 9273-0992</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(7,139,208,0.4)]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#078BD0] text-white active:scale-95"
            aria-label="Abrir WhatsApp da Termac"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A7B4C4] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#078BD0] rounded-lg"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[62px] bg-[#0A111C]/98 backdrop-blur-2xl border-b border-[#078BD0]/25 shadow-2xl p-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-white hover:text-[#19B8FF] py-2 border-b border-white/5"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#078BD0]" />
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A7B4C4] bg-[#05070B] p-2.5 rounded-lg border border-[#078BD0]/20">
                <PhoneCall className="w-4 h-4 text-[#078BD0]" />
                <span>WhatsApp Comercial: (41) 9273-0992</span>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Solicitar Atendimento no WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
