import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { TermacLogo } from './TermacLogo';

export const ContactCTA: React.FC = () => {
  const WHATSAPP_URL = 'https://wa.me/554192730992';

  return (
    <section className="relative py-28 bg-[#05070B] overflow-hidden">
      {/* Background radial blue ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#078BD0]/20 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Emblem badge */}
        <div className="flex justify-center mb-8">
          <TermacLogo variant="symbol" size="lg" className="drop-shadow-[0_0_25px_#19B8FF]" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl mx-auto">
          SEU CONFORTO COMEÇA COM UMA CONVERSA.
        </h2>

        <p className="mt-6 text-base sm:text-xl text-[#A7B4C4] max-w-2xl mx-auto leading-relaxed">
          Precisa instalar, manter, reparar ou escolher um ar-condicionado? Fale com a Termac e explique o que você precisa.
        </p>

        {/* Big WhatsApp CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-[#078BD0] via-[#1098e6] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(7,139,208,0.5)] group"
          >
            <MessageCircle className="w-6 h-6 fill-white text-transparent group-hover:scale-110 transition-transform" />
            <span>FALAR COM A TERMAC NO WHATSAPP</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Direct WhatsApp service note */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#A7B4C4]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#078BD0]" />
            Atendimento realizado diretamente pelo WhatsApp
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-white">
            <PhoneCall className="w-3.5 h-3.5 text-[#19B8FF]" />
            +55 41 9273-0992
          </span>
        </div>
      </div>
    </section>
  );
};
