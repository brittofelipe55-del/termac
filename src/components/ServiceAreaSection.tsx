import React, { useState } from 'react';
import { MapPin, Navigation, Send, Search } from 'lucide-react';

export const ServiceAreaSection: React.FC = () => {
  const [locality, setLocality] = useState<string>('');

  const handleConsultRegion = (e: React.FormEvent) => {
    e.preventDefault();
    const query = locality.trim() ? locality.trim() : 'Curitiba e Região Metropolitana';
    const message = `Olá! Gostaria de consultar a disponibilidade de atendimento da Termac para a minha região: ${query}.`;
    const url = `https://wa.me/554192730992?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="regiao" className="relative py-28 bg-[#05070B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#078BD0]/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text & Form Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A111C] border border-[#078BD0]/30 text-xs font-mono text-[#078BD0] mb-4">
              <Navigation className="w-3.5 h-3.5 text-[#19B8FF]" />
              <span>COBERTURA GEOGRÁFICA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-6">
              CURITIBA E REGIÃO METROPOLITANA
            </h2>

            <p className="text-base sm:text-lg text-[#A7B4C4] leading-relaxed mb-8">
              A Termac atende clientes que buscam soluções em climatização em Curitiba e região metropolitana. Entre em contato para consultar disponibilidade de atendimento na sua localidade.
            </p>

            {/* Region Inquiry Input Box */}
            <form onSubmit={handleConsultRegion} className="space-y-4">
              <div>
                <label htmlFor="locality-input" className="block text-xs font-mono uppercase tracking-wider text-[#19B8FF] mb-2">
                  Informe sua cidade ou bairro (opcional):
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#078BD0]" />
                  <input
                    id="locality-input"
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="Ex: Batel, Água Verde, São José dos Pinhais, Colombo..."
                    className="w-full bg-[#0A111C] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-[#5A6E85] focus:outline-none focus:border-[#078BD0] focus:ring-1 focus:ring-[#078BD0] text-sm transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(7,139,208,0.35)]"
              >
                <Send className="w-4 h-4" />
                <span>Consultar atendimento na minha região</span>
              </button>
            </form>
          </div>

          {/* Stylized Vector Radar Map Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#0A111C] border border-[#078BD0]/30 p-8 sm:p-10 overflow-hidden shadow-2xl">
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between text-xs font-mono text-[#A7B4C4] mb-8 pb-4 border-b border-white/10">
                  <span className="flex items-center gap-1.5 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#19B8FF] animate-pulse" />
                    ZONA DE ATENDIMENTO
                  </span>
                  <span className="text-[#078BD0]">PARANÁ • BRASIL</span>
                </div>

                {/* Stylized Node Network Visualizing Curitiba & Metropolitan Surroundings */}
                <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
                  {/* Radar Circles */}
                  <div className="absolute w-[85%] h-[85%] rounded-full border border-[#078BD0]/20 animate-pulse-glow" />
                  <div className="absolute w-[60%] h-[60%] rounded-full border border-[#078BD0]/30" />
                  <div className="absolute w-[35%] h-[35%] rounded-full border border-[#078BD0]/40" />

                  {/* Concentric Coordinate crosshairs */}
                  <div className="absolute inset-x-0 top-1/2 h-px bg-[#078BD0]/20 -translate-y-1/2" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-[#078BD0]/20 -translate-x-1/2" />

                  {/* Node: Curitiba Central */}
                  <div className="relative z-20 flex flex-col items-center">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#078BD0] shadow-[0_0_30px_#19B8FF]">
                      <MapPin className="w-6 h-6 text-white" />
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19B8FF] opacity-50" />
                    </div>
                    <span className="mt-2 text-xs font-bold font-mono tracking-widest text-white uppercase bg-[#05070B] px-2.5 py-0.5 rounded border border-[#078BD0]">
                      CURITIBA
                    </span>
                  </div>

                  {/* Satellite Points (Metropolitan Area Indicators) */}
                  <div className="absolute top-[22%] left-[26%] flex items-center gap-1 text-[11px] font-mono text-[#A7B4C4]">
                    <div className="w-2 h-2 rounded-full bg-[#078BD0]" />
                    <span>Norte RMC</span>
                  </div>

                  <div className="absolute top-[26%] right-[22%] flex items-center gap-1 text-[11px] font-mono text-[#A7B4C4]">
                    <div className="w-2 h-2 rounded-full bg-[#078BD0]" />
                    <span>Leste RMC</span>
                  </div>

                  <div className="absolute bottom-[24%] right-[24%] flex items-center gap-1 text-[11px] font-mono text-[#A7B4C4]">
                    <div className="w-2 h-2 rounded-full bg-[#078BD0]" />
                    <span>Sul RMC</span>
                  </div>

                  <div className="absolute bottom-[26%] left-[22%] flex items-center gap-1 text-[11px] font-mono text-[#A7B4C4]">
                    <div className="w-2 h-2 rounded-full bg-[#078BD0]" />
                    <span>Oeste RMC</span>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs font-mono text-[#A7B4C4]">
                  Consulte a disponibilidade de rota e deslocamento para o seu endereço
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
