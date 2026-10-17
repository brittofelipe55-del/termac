import React from 'react';
import { ShoppingBag, ArrowUpRight, Compass, ShieldCheck, Thermometer, Layers, Check } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const consultUrl =
    'https://wa.me/554192730992?text=Ol%C3%A1%21%20Gostaria%20de%20consultar%20a%20disponibilidade%2C%20modelos%20e%20condi%C3%A7%C3%B5es%20comerciais%20de%20aparelhos%20de%20ar-condicionado%20com%20a%20Termac.';

  const inquiryTopics = [
    {
      title: 'Capacidade em BTUs',
      desc: 'Orientação entre potências como 9.000, 12.000, 18.000, 24.000 ou 30.000+ BTUs conforme o tamanho do espaço.',
      badge: 'DIMENSIONAMENTO',
    },
    {
      title: 'Tipo de Ambiente',
      desc: 'Aparelhos adequados para quartos residenciais, salas integradas, consultórios ou áreas comerciais.',
      badge: 'APLICAÇÃO',
    },
    {
      title: 'Modelos Disponíveis',
      desc: 'Consulta de modelos Split Hi-Wall, Cassete, Piso-Teto ou Multi-Split com ciclo Frio ou Quente/Frio.',
      badge: 'CATÁLOGO',
    },
    {
      title: 'Orientação para Instalação',
      desc: 'Verificação da tubulação, voltagem da rede e suporte adequado para fixação da condensadora.',
      badge: 'INFRAESTRUTURA',
    },
    {
      title: 'Contratar Venda + Instalação',
      desc: 'Possibilidade de contratar o aparelho juntamente com o serviço completo de instalação pela Termac.',
      badge: 'PACOTE COMPLETO',
    },
  ];

  return (
    <section id="equipamentos" className="relative py-28 bg-[#070B12] overflow-hidden">
      {/* Background cyan atmospheric light */}
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-[#078BD0]/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#05070B] border border-[#078BD0]/30 text-xs font-mono text-[#078BD0] mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-[#19B8FF]" />
            <span>EQUIPAMENTOS DE CLIMATIZAÇÃO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            SEU PRÓXIMO AR-CONDICIONADO COMEÇA AQUI.
          </h2>

          <p className="mt-4 text-[#A7B4C4] text-base sm:text-lg">
            Vamos encontrar um equipamento compatível com o seu ambiente e suas necessidades.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {inquiryTopics.map((topic, i) => (
            <div
              key={topic.title}
              className="rounded-3xl bg-[#0A111C] border border-white/5 hover:border-[#078BD0]/50 p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_30px_rgba(7,139,208,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#19B8FF] bg-[#05070B] px-2.5 py-1 rounded border border-white/10 uppercase">
                    {topic.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#078BD0]/10 flex items-center justify-center text-[#078BD0] group-hover:bg-[#078BD0] group-hover:text-white transition-colors">
                    <Check className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#19B8FF] transition-colors">
                  {topic.title}
                </h3>

                <p className="text-[#A7B4C4] text-sm leading-relaxed mb-4">
                  {topic.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href={`https://wa.me/554192730992?text=${encodeURIComponent(
                    `Olá! Gostaria de consultar informações sobre ${topic.title} para ar-condicionado na Termac.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#078BD0] group-hover:text-[#19B8FF] transition-colors"
                >
                  <span>Consultar este item</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}

          {/* 6th Card: Direct Commercial Action Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#078BD0]/20 via-[#0A111C] to-[#05070B] border border-[#078BD0]/60 p-7 flex flex-col justify-between shadow-[0_0_30px_rgba(7,139,208,0.2)]">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#19B8FF] bg-[#05070B] px-2.5 py-1 rounded border border-[#078BD0]/40 uppercase inline-block mb-4">
                ATENDIMENTO DIRETO
              </span>

              <h3 className="text-xl font-bold text-white mb-2">
                Consultoria Técnica para Compra
              </h3>

              <p className="text-[#A7B4C4] text-sm leading-relaxed mb-6">
                Fale com quem entende de instalação e dimensionamento antes de comprar o seu ar-condicionado.
              </p>
            </div>

            <a
              href={consultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#078BD0] hover:bg-[#19B8FF] transition-colors shadow-lg active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Consultar equipamentos</span>
            </a>
          </div>
        </div>

        {/* Big Highlight Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#05070B] border border-[#078BD0]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
              Prefere consultar todos os modelos e capacidades?
            </h3>
            <p className="text-sm text-[#A7B4C4] mt-1">
              Envie uma mensagem para a nossa equipe e receba a lista de modelos recomendados para a sua necessidade.
            </p>
          </div>

          <a
            href={consultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(7,139,208,0.4)] shrink-0"
          >
            <span>Consultar equipamentos pelo WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
