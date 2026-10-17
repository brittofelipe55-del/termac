import React, { useState } from 'react';
import { Compass, Cpu, Wrench, ArrowRight, CheckCircle2, Waves, Sparkles, Layers } from 'lucide-react';

export const NarrativeSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 1,
      number: '01',
      title: 'Entender o ambiente.',
      subtitle: 'Diagnóstico e Carga Térmica',
      description:
        'Cada espaço possui características térmicas exclusivas: incidência solar pelas janelas, metragem quadrada, número de pessoas habituais e equipamentos eletrônicos em operação. Compreender esses fatores é o ponto de partida para o conforto contínuo.',
      highlights: [
        'Análise da orientação solar e aberturas',
        'Avaliação do volume cúbico do cômodo',
        'Identificação de pontos elétricos e drenagem',
      ],
      blueprint: 'DIAGNÓSTICO_TÉRMICO_01',
    },
    {
      id: 2,
      number: '02',
      title: 'Encontrar a solução adequada.',
      subtitle: 'Tecnologia e Capacidade Precisa',
      description:
        'Não basta escolher a maior potência. Um ar-condicionado superdimensionado consome energia em excesso e gera umidade desconfortável, enquanto o subdimensionado não vence o calor. Selecionamos o modelo e a capacidade compatíveis com a sua necessidade.',
      highlights: [
        'Comparação técnica de capacidade em BTUs',
        'Eficiência energética e modelos Inverter',
        'Planejamento de passagens e conexões',
      ],
      blueprint: 'ESPECIFICAÇÃO_SISTEMA_02',
    },
    {
      id: 3,
      number: '03',
      title: 'Instalar, cuidar e manter.',
      subtitle: 'Precisão e Longevidade Operacional',
      description:
        'Uma climatização confiável depende de uma instalação executada com tubulações com isolamento correto, vácuo no sistema frigorífico e fixação segura, acompanhada de manutenção preventiva para manter o ar saudável e o consumo estável.',
      highlights: [
        'Instalação limpa com teste de estanqueidade',
        'Protocolo de vácuo e vedação do circuito',
        'Acompanhamento e higienização periódica',
      ],
      blueprint: 'EXECUÇÃO_LONGEVIDADE_03',
    },
  ];

  return (
    <section id="caminho" className="relative py-28 bg-[#05070B] overflow-hidden">
      {/* Background technical accent glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#078BD0]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#078BD0] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#078BD0]" />
              <span>Narrativa de Engenharia</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              O CAMINHO ATÉ O CONFORTO
            </h2>
          </div>
          <p className="text-base text-[#A7B4C4] max-w-md font-light leading-relaxed">
            Uma abordagem fundamentada em engenharia térmica: da compreensão do seu espaço à tranquilidade no dia a dia.
          </p>
        </div>

        {/* Narrative Stages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stages.map((stage) => {
            const isSelected = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`group relative rounded-3xl p-8 transition-all duration-500 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#0A111C] border-[#078BD0] shadow-[0_0_35px_rgba(7,139,208,0.25)] scale-[1.02]'
                    : 'bg-[#070B12]/80 border-white/5 hover:border-[#078BD0]/40 hover:bg-[#0A111C]/60'
                }`}
              >
                {/* Stage top telemetry */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-4xl sm:text-5xl font-mono font-bold transition-colors ${
                        isSelected ? 'text-[#19B8FF]' : 'text-[#078BD0]/50 group-hover:text-[#078BD0]'
                      }`}
                    >
                      {stage.number}
                    </span>
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-[#05070B] border border-white/10 text-[#A7B4C4]">
                      {stage.blueprint}
                    </span>
                  </div>

                  {/* Icon & Subtitle */}
                  <div className="flex items-center gap-3 mb-3">
                    {stage.id === 1 && (
                      <div className="w-10 h-10 rounded-xl bg-[#078BD0]/15 border border-[#078BD0]/30 flex items-center justify-center text-[#19B8FF]">
                        <Compass className="w-5 h-5" />
                      </div>
                    )}
                    {stage.id === 2 && (
                      <div className="w-10 h-10 rounded-xl bg-[#078BD0]/15 border border-[#078BD0]/30 flex items-center justify-center text-[#19B8FF]">
                        <Cpu className="w-5 h-5" />
                      </div>
                    )}
                    {stage.id === 3 && (
                      <div className="w-10 h-10 rounded-xl bg-[#078BD0]/15 border border-[#078BD0]/30 flex items-center justify-center text-[#19B8FF]">
                        <Wrench className="w-5 h-5" />
                      </div>
                    )}
                    <span className="text-xs font-mono uppercase tracking-wider text-[#078BD0] font-semibold">
                      {stage.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#19B8FF] transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-[#A7B4C4] text-sm leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-6 border-t border-white/5">
                  <div className="space-y-2.5">
                    {stage.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#A7B4C4]">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? 'text-[#19B8FF]' : 'text-[#078BD0]'
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Airflow flow line indicator */}
                  <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#078BD0] pt-4">
                    <span>Fluxo térmico contínuo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
