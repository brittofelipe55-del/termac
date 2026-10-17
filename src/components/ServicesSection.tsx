import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  ShieldCheck,
  Wind,
  Gauge,
  Cpu,
  Calculator,
  ShoppingBag,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  // Dimensioning interactive quick simulator inside service 7
  const [simArea, setSimArea] = useState<number>(20);
  const [simSun, setSimSun] = useState<'morning' | 'afternoon'>('afternoon');
  const [simPeople, setSimPeople] = useState<number>(2);

  // Approximate reference calculation (clearly labeled as preliminary reference)
  const calcBase = simArea * 600 + (simSun === 'afternoon' ? 800 : 0) + Math.max(0, simPeople - 1) * 600;
  const estimatedBtu = Math.round(calcBase / 1000) * 1000;

  const createWhatsAppLink = (serviceName: string) => {
    const encoded = encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento para o serviço de ${serviceName} com a Termac.`
    );
    return `https://wa.me/554192730992?text=${encoded}`;
  };

  return (
    <section id="servicos" className="relative py-28 bg-[#05070B] overflow-hidden">
      {/* Background radial blue ambient */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#078BD0]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#078BD0] tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#19B8FF]" />
            <span>Engenharia & Climatização</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            SOLUÇÕES COMPLETAS EM CLIMATIZAÇÃO
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A7B4C4] leading-relaxed">
            Da escolha do equipamento aos cuidados do dia a dia, a Termac ajuda você a encontrar a solução adequada para o seu ambiente.
          </p>
        </div>

        {/* BESPOKE SERVICE COMPOSITIONS */}
        <div className="space-y-12">
          {/* SERVIÇO 01 — INSTALAÇÃO DE AR-CONDICIONADO (Composição Ampla / Hero Showcase) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0A111C] via-[#070B12] to-[#05070B] border border-[#078BD0]/40 p-8 sm:p-12 overflow-hidden shadow-[0_0_50px_rgba(7,139,208,0.15)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#078BD0]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-mono text-[#19B8FF] tracking-wider uppercase mb-3">
                  <span>SERVIÇO 01</span>
                  <span>•</span>
                  <span>PADRÃO RESIDENCIAL & COMERCIAL</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
                  INSTALAÇÃO DE AR-CONDICIONADO
                </h3>
                <p className="text-[#A7B4C4] text-base sm:text-lg leading-relaxed mb-6">
                  Instalação planejada para proporcionar conforto, bom funcionamento e acabamento organizado.
                </p>

                {/* Technical installation checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-white bg-[#05070B]/80 p-3 rounded-xl border border-white/5">
                    <CheckCircle className="w-4 h-4 text-[#19B8FF] shrink-0" />
                    <span>Nivelamento milimétrico da evaporadora</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white bg-[#05070B]/80 p-3 rounded-xl border border-white/5">
                    <CheckCircle className="w-4 h-4 text-[#19B8FF] shrink-0" />
                    <span>Fixação antivibração da condensadora</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white bg-[#05070B]/80 p-3 rounded-xl border border-white/5">
                    <CheckCircle className="w-4 h-4 text-[#19B8FF] shrink-0" />
                    <span>Evacuação com bomba de alto vácuo</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white bg-[#05070B]/80 p-3 rounded-xl border border-white/5">
                    <CheckCircle className="w-4 h-4 text-[#19B8FF] shrink-0" />
                    <span>Acabamento limpo e fiação padronizada</span>
                  </div>
                </div>

                <a
                  href={createWhatsAppLink('Instalação de Ar-Condicionado')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(7,139,208,0.4)]"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Graphic Architectural Representation */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-2xl bg-[#05070B] border border-[#078BD0]/30 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono text-[#078BD0]">
                    <span>SYS_INSTALL_SPEC</span>
                    <span className="text-[#19B8FF]">TMC-ENV-01</span>
                  </div>

                  {/* Visual blueprint schematic */}
                  <div className="my-auto py-4 relative flex flex-col items-center justify-center">
                    <div className="w-4/5 h-14 rounded-lg border-2 border-[#19B8FF]/80 bg-[#078BD0]/20 flex items-center justify-between px-4 relative shadow-[0_0_20px_rgba(25,184,255,0.2)]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#19B8FF] animate-pulse" />
                        <span className="text-[11px] font-mono text-white tracking-widest">UNIDADE EVAPORADORA</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#19B8FF]">21°C</span>
                    </div>

                    {/* Downward airflow animation lines */}
                    <div className="flex justify-around w-3/4 py-3">
                      <div className="w-0.5 h-10 bg-gradient-to-b from-[#19B8FF] to-transparent animate-pulse" />
                      <div className="w-0.5 h-14 bg-gradient-to-b from-[#078BD0] to-transparent animate-pulse delay-100" />
                      <div className="w-0.5 h-14 bg-gradient-to-b from-[#078BD0] to-transparent animate-pulse delay-200" />
                      <div className="w-0.5 h-10 bg-gradient-to-b from-[#19B8FF] to-transparent animate-pulse delay-300" />
                    </div>

                    <div className="text-[10px] font-mono text-[#A7B4C4] text-center">
                      Distribuição uniforme de ar climatizado no ambiente
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#A7B4C4] pt-2 border-t border-white/10">
                    <span>Isolamento térmico</span>
                    <span className="text-white font-mono">100% Hermético</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMN ASYMMETRIC ROW: SERVIÇO 02 (Infraestrutura) & SERVIÇO 03 (Manutenção Preventiva) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SERVIÇO 02 — INFRAESTRUTURA */}
            <div className="rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/50 transition-all p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#078BD0] mb-4">
                  <span>SERVIÇO 02</span>
                  <Layers className="w-4 h-4 text-[#19B8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#19B8FF] transition-colors">
                  INFRAESTRUTURA
                </h3>
                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-6">
                  Preparação dos pontos e da estrutura necessários para a instalação do sistema de climatização.
                </p>

                {/* Technical blueprint block */}
                <div className="bg-[#05070B] rounded-2xl p-5 border border-white/5 font-mono text-xs text-[#A7B4C4] space-y-2 mb-6">
                  <div className="text-[#19B8FF] text-[11px] font-bold pb-2 border-b border-white/10 flex justify-between">
                    <span>ESPECIFICAÇÕES TÉCNICAS</span>
                    <span>DIAGRAMA TUBULAÇÃO</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Tubulação frigorígena:</span>
                    <span className="text-white">Cobre flangeado ou soldado</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Isolamento térmico:</span>
                    <span className="text-white">Blindado elastomérico</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Linha de drenagem:</span>
                    <span className="text-white">Caimento por gravidade</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={createWhatsAppLink('Infraestrutura para Ar-Condicionado')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BD0]" />
                </a>
                <span className="text-[11px] font-mono text-[#A7B4C4]">Obras & Reformas</span>
              </div>
            </div>

            {/* SERVIÇO 03 — MANUTENÇÃO PREVENTIVA */}
            <div className="rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/50 transition-all p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#078BD0] mb-4">
                  <span>SERVIÇO 03</span>
                  <ShieldCheck className="w-4 h-4 text-[#19B8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#19B8FF] transition-colors">
                  MANUTENÇÃO PREVENTIVA
                </h3>
                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-6">
                  Cuidados periódicos para acompanhar o funcionamento do equipamento e ajudar a prevenir problemas.
                </p>

                {/* Checklist Inspection */}
                <div className="bg-[#05070B] rounded-2xl p-5 border border-white/5 space-y-2.5 mb-6 text-xs text-[#A7B4C4]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#078BD0] shrink-0" />
                    <span>Verificação do rendimento térmico e insuflamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#078BD0] shrink-0" />
                    <span>Inspeção de conexões elétricas e sensores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#078BD0] shrink-0" />
                    <span>Checagem do dreno e higienização de serpentina</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={createWhatsAppLink('Manutenção Preventiva')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BD0]" />
                </a>
                <span className="text-[11px] font-mono text-[#A7B4C4]">Cuidado Contínuo</span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN ROW: SERVIÇO 04 (Limpeza de Filtros) & SERVIÇO 05 (Carga de Gás com Diagnóstico Técnico) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SERVIÇO 04 — LIMPEZA DE FILTROS */}
            <div className="rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/50 transition-all p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#078BD0] mb-4">
                  <span>SERVIÇO 04</span>
                  <Wind className="w-4 h-4 text-[#19B8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#19B8FF] transition-colors">
                  LIMPEZA DE FILTROS
                </h3>
                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-6">
                  Limpeza dos filtros para remover a sujeira acumulada e contribuir para uma boa circulação do ar.
                </p>

                {/* Airflow comparison badge */}
                <div className="bg-[#05070B] rounded-2xl p-5 border border-white/5 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A7B4C4]">Circulação com filtro limpo:</span>
                    <span className="text-[#19B8FF] font-mono font-bold">100% Fluxo Livre</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#078BD0] to-[#19B8FF] h-full w-[95%]" />
                  </div>
                  <p className="text-[11px] text-[#A7B4C4] leading-relaxed">
                    A remoção do acúmulo de poeira melhora a troca de calor e preserva os componentes internos da evaporadora.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={createWhatsAppLink('Limpeza de Filtros')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BD0]" />
                </a>
                <span className="text-[11px] font-mono text-[#A7B4C4]">Qualidade do Ar</span>
              </div>
            </div>

            {/* SERVIÇO 05 — CARGA DE GÁS REFRIGERANTE (Enfatizando Avaliação Prévia e Vazamentos) */}
            <div className="rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/50 transition-all p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#078BD0] mb-4">
                  <span>SERVIÇO 05</span>
                  <Gauge className="w-4 h-4 text-[#19B8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#19B8FF] transition-colors">
                  CARGA DE GÁS REFRIGERANTE
                </h3>
                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-4">
                  Avaliação do sistema e atendimento à necessidade de refrigerante conforme as especificações do equipamento.
                </p>

                {/* Important Technical Notice */}
                <div className="bg-[#05070B] rounded-2xl p-4 border border-[#078BD0]/30 mb-6">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#19B8FF] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#A7B4C4] leading-relaxed">
                      <strong className="text-white block mb-0.5">Diagnóstico técnico prévio:</strong>
                      A carga deve ser precedida de avaliação técnica minuciosa, verificando possíveis vazamentos e a causa do problema antes de qualquer aplicação.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={createWhatsAppLink('Carga de Gás Refrigerante')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BD0]" />
                </a>
                <span className="text-[11px] font-mono text-[#A7B4C4]">Sistema Selado</span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN ROW: SERVIÇO 06 (Reparo e Troca) & SERVIÇO 07 (Dimensionamento Interativo) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SERVIÇO 06 — REPARO E TROCA DE PEÇAS */}
            <div className="rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/50 transition-all p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#078BD0] mb-4">
                  <span>SERVIÇO 06</span>
                  <Cpu className="w-4 h-4 text-[#19B8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#19B8FF] transition-colors">
                  REPARO E TROCA DE PEÇAS
                </h3>
                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-6">
                  Diagnóstico técnico e substituição de componentes quando necessário, considerando as condições do equipamento.
                </p>

                {/* Technical components grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-[#A7B4C4] font-mono">
                  <div className="bg-[#05070B] p-2.5 rounded-xl border border-white/5">
                    • Placas Inverter e Potência
                  </div>
                  <div className="bg-[#05070B] p-2.5 rounded-xl border border-white/5">
                    • Motores e Turbinas
                  </div>
                  <div className="bg-[#05070B] p-2.5 rounded-xl border border-white/5">
                    • Sensores de Temperatura
                  </div>
                  <div className="bg-[#05070B] p-2.5 rounded-xl border border-white/5">
                    • Válvulas e Capacitores
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={createWhatsAppLink('Reparo e Troca de Peças')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BD0]" />
                </a>
                <span className="text-[11px] font-mono text-[#A7B4C4]">Diagnóstico Preciso</span>
              </div>
            </div>

            {/* SERVIÇO 07 — DIMENSIONAMENTO TÉRMICO (Com mini simulador de referência) */}
            <div className="rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/50 transition-all p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#078BD0] mb-4">
                  <span>SERVIÇO 07</span>
                  <Calculator className="w-4 h-4 text-[#19B8FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#19B8FF] transition-colors">
                  DIMENSIONAMENTO TÉRMICO
                </h3>
                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-4">
                  Orientação para escolher a capacidade de climatização mais adequada às características do ambiente, considerando área, incidência solar, janelas, ocupação, equipamentos eletrônicos e outras cargas térmicas.
                </p>

                {/* Quick interactive calculator widget for engagement */}
                <div className="bg-[#05070B] p-4 rounded-2xl border border-white/5 mb-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#078BD0]">
                    <span>SIMULADOR DE ESTIMATIVA</span>
                    <span className="text-[10px] text-[#A7B4C4]">Referência inicial</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#A7B4C4]">
                      <span>Área aproximada:</span>
                      <span className="text-white font-mono font-bold">{simArea} m²</span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={60}
                      value={simArea}
                      onChange={(e) => setSimArea(Number(e.target.value))}
                      className="w-full accent-[#078BD0] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#A7B4C4]">Incidência de Sol:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSimSun('morning')}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                          simSun === 'morning' ? 'bg-[#078BD0] text-white' : 'bg-white/5 text-[#A7B4C4]'
                        }`}
                      >
                        Manhã
                      </button>
                      <button
                        type="button"
                        onClick={() => setSimSun('afternoon')}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                          simSun === 'afternoon' ? 'bg-[#078BD0] text-white' : 'bg-white/5 text-[#A7B4C4]'
                        }`}
                      >
                        Tarde
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#A7B4C4]">Estimativa de referência:</span>
                    <span className="font-mono font-bold text-sm text-[#19B8FF]">{estimatedBtu} BTUs</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#A7B4C4] italic">
                  * A escolha final depende da avaliação das características do ambiente.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={`https://wa.me/554192730992?text=${encodeURIComponent(
                    `Olá! Gostaria de uma orientação de dimensionamento para um ambiente de aproximadamente ${simArea}m² com sol da ${
                      simSun === 'afternoon' ? 'tarde' : 'manhã'
                    }.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BD0]" />
                </a>
                <span className="text-[11px] font-mono text-[#A7B4C4]">Avaliação Térmica</span>
              </div>
            </div>
          </div>

          {/* SERVIÇO 08 — VENDA DE AR-CONDICIONADO (Visual de Catálogo de Tecnologia) */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0A111C] via-[#0D1829] to-[#0A111C] border border-[#078BD0]/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#19B8FF] tracking-wider uppercase mb-3">
                  <span>SERVIÇO 08</span>
                  <span>•</span>
                  <span>EQUIPAMENTOS NOVOS</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
                  VENDA DE AR-CONDICIONADO
                </h3>
                <p className="text-[#A7B4C4] text-base leading-relaxed mb-6">
                  Encontre um equipamento adequado às necessidades do seu espaço, com orientação para comparar capacidade e características.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#A7B4C4] mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#05070B] border border-white/10">Capacidades: 9.000 a 30.000+ BTUs</span>
                  <span className="px-3 py-1 rounded-full bg-[#05070B] border border-white/10">Tecnologia Inverter</span>
                  <span className="px-3 py-1 rounded-full bg-[#05070B] border border-white/10">Ciclo Quente/Frio ou Frio</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href="https://wa.me/554192730992?text=Ol%C3%A1%21%20Gostaria%20de%20consultar%20os%20aparelhos%20de%20ar-condicionado%20dispon%C3%ADveis%20na%20Termac."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(7,139,208,0.4)]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Consultar aparelhos disponíveis</span>
                </a>

                <a
                  href={createWhatsAppLink('Venda com Instalação')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-[#A7B4C4] hover:text-white bg-[#05070B] border border-[#078BD0]/30 hover:border-[#078BD0]"
                >
                  <span>Solicitar orçamento</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
