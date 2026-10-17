import React from 'react';
import { AirConditionerScene } from './AirConditionerScene';
import { TermacAirflowBadge } from './TermacLogo';
import { MessageCircle, ArrowDown, MapPin, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const HERO_WHATSAPP_URL =
  'https://wa.me/554192730992?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20pelo%20site%20da%20Termac.';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-radial-vignette bg-tech-grid">
      {/* Volumetric background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#078BD0]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#19B8FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* Decorative ambient blueprint lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#078BD0" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#078BD0" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="0" y1="28%" x2="100%" y2="28%" stroke="#078BD0" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Concept Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <TermacAirflowBadge
            title="ENGENHARIA DO CONFORTO"
            code="CURITIBA & RMC"
            className="mb-4"
          />

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase max-w-5xl leading-[1.05]">
            CONFORTO TÉRMICO.{' '}
            <span className="block text-gradient-blue">SEM COMPLICAÇÃO.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl md:text-2xl text-[#A7B4C4] max-w-3xl font-normal leading-relaxed">
            Instalação, manutenção e venda de ar-condicionado com atendimento em Curitiba e região metropolitana.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={HERO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(7,139,208,0.45)] group"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent group-hover:scale-110 transition-transform" />
              <span>Solicitar orçamento pelo WhatsApp</span>
            </a>

            <a
              href="#servicos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-medium text-[#A7B4C4] hover:text-white bg-[#0A111C]/80 hover:bg-[#0A111C] border border-[#078BD0]/30 hover:border-[#078BD0]/60 transition-all backdrop-blur-md"
            >
              <span>Conhecer nossos serviços</span>
              <ArrowDown className="w-4 h-4 text-[#078BD0]" />
            </a>
          </div>

          {/* Trust points bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#A7B4C4]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#078BD0]" />
              <span>Curitiba e Região Metropolitana</span>
            </div>
            <div className="hidden sm:block text-white/20">•</div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#078BD0]" />
              <span>Atendimento Técnico Especializado</span>
            </div>
            <div className="hidden sm:block text-white/20">•</div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#078BD0]" />
              <span>Dimensionamento e Infraestrutura</span>
            </div>
          </div>
        </div>

        {/* Central 3D Product Interactive Scene */}
        <div className="relative mt-2 sm:mt-4 w-full">
          <AirConditionerScene />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="mt-8 flex flex-col items-center justify-center text-center">
        <a
          href="#caminho"
          className="flex flex-col items-center gap-2 text-xs font-mono text-[#A7B4C4] hover:text-white transition-colors group"
          aria-label="Rolar para a seção O Caminho até o Conforto"
        >
          <span className="tracking-widest uppercase text-[10px] text-[#078BD0]">O caminho até o conforto</span>
          <div className="w-5 h-8 rounded-full border border-[#078BD0]/40 flex items-start justify-center p-1 group-hover:border-[#19B8FF] transition-colors">
            <div className="w-1.5 h-2 bg-[#19B8FF] rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
