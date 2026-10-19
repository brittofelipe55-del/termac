import React from 'react';
import { TermacLogo } from './TermacLogo';
import { MessageCircle, PhoneCall, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const WHATSAPP_URL = 'https://wa.me/554192730992';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030407] border-t border-[#078BD0]/20 pt-16 pb-12 text-[#A7B4C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <TermacLogo size="md" />
            <p className="text-sm text-[#A7B4C4] leading-relaxed max-w-sm pt-2">
              Engenharia do conforto para o seu ambiente. Instalação, infraestrutura, manutenção, reparação, dimensionamento e venda de aparelhos de ar-condicionado.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#078BD0] pt-2">
              <MapPin className="w-4 h-4 text-[#19B8FF] shrink-0" />
              <span>Atendimento em Curitiba e Região Metropolitana, PR</span>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Soluções em Climatização
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Instalação de Ar-Condicionado
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Infraestrutura & Passagem de Linhas
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Manutenção Preventiva & Limpeza
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Carga de Gás Refrigerante com Diagnóstico
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Reparo Técnico e Troca de Peças
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Dimensionamento Térmico & Carga
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-[#19B8FF] transition-colors font-medium">
                  Portfólio & Vídeos em Campo
                </a>
              </li>
              <li>
                <a href="#equipamentos" className="hover:text-white transition-colors">
                  Venda de Equipamentos Novos
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Contato Comercial
            </h4>

            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-[#19B8FF] transition-colors p-3 rounded-xl bg-[#0A111C] border border-[#078BD0]/30"
              >
                <MessageCircle className="w-4 h-4 text-[#19B8FF]" />
                <span>+55 41 9273-0992</span>
              </a>

              <a
                href="tel:+554192730992"
                className="flex items-center gap-2 text-xs text-[#A7B4C4] hover:text-white transition-colors px-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#078BD0]" />
                <span>Ligação: (41) 9273-0992</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#A7B4C4] hover:text-white transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#078BD0]" />
                <span>Voltar ao topo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5A6E85]">
          <p>© {currentYear} Termac Ar-Condicionados. Todos os direitos reservados.</p>
          <p className="text-[11px] text-[#5A6E85]">
            Curitiba e Região Metropolitana • Paraná, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};
