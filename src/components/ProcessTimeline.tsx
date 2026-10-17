import React from 'react';
import { MessageSquare, Search, Lightbulb, CalendarCheck, ArrowRight } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Você entra em contato.',
      desc: 'Conte sua necessidade e tire suas dúvidas diretamente pelo WhatsApp.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'Entendemos o cenário.',
      desc: 'A Termac recebe as informações e verifica os próximos passos necessários para o seu ambiente.',
      icon: Search,
    },
    {
      num: '03',
      title: 'Você recebe orientação.',
      desc: 'A empresa conversa com você sobre a solução adequada e as condições do serviço.',
      icon: Lightbulb,
    },
    {
      num: '04',
      title: 'Combinamos o atendimento.',
      desc: 'Os detalhes e o agendamento são alinhados diretamente com a equipe.',
      icon: CalendarCheck,
    },
  ];

  return (
    <section className="relative py-28 bg-[#070B12] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#05070B] border border-[#078BD0]/30 text-xs font-mono text-[#078BD0] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#19B8FF]" />
            <span>ETAPAS DE ATENDIMENTO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            DA PRIMEIRA MENSAGEM À SOLUÇÃO.
          </h2>

          <p className="mt-4 text-[#A7B4C4] text-base sm:text-lg">
            Um fluxo transparente e direto para atender você com pontualidade e clareza técnica.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl bg-[#0A111C] border border-white/5 hover:border-[#078BD0]/40 p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(7,139,208,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#078BD0] group-hover:text-[#19B8FF] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#05070B] border border-white/10 flex items-center justify-center text-[#19B8FF] group-hover:border-[#078BD0] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#19B8FF] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#A7B4C4] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] font-mono text-[#078BD0]">
                  <span>Fase {idx + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
