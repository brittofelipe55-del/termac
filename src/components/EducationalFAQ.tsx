import React, { useState } from 'react';
import { ChevronDown, BookOpen, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

export const EducationalFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Qual é a diferença entre BTUs e potência elétrica?',
      answer:
        'BTU/h indica a capacidade de refrigeração do equipamento. O consumo elétrico depende de fatores como potência, eficiência, tecnologia, condições de uso e instalação.',
      tag: 'CONCEITO TÉRMICO',
    },
    {
      question: 'Como saber quantos BTUs preciso?',
      answer:
        'A capacidade ideal depende da área e das características do ambiente, incluindo incidência solar, janelas, pessoas e equipamentos. Uma avaliação adequada ajuda a evitar escolhas incorretas.',
      tag: 'DIMENSIONAMENTO',
    },
    {
      question: 'Com que frequência devo fazer manutenção?',
      answer:
        'A frequência depende do equipamento, da intensidade de uso, do ambiente e das recomendações do fabricante. Consulte o manual e um profissional para definir os cuidados necessários.',
      tag: 'MANUTENÇÃO',
    },
    {
      question: 'Por que o ar-condicionado pode não gelar direito?',
      answer:
        'As causas podem incluir filtros sujos, configurações inadequadas, problemas de instalação, falhas em componentes ou irregularidades no sistema refrigerante. Um diagnóstico técnico ajuda a identificar a origem.',
      tag: 'DIAGNÓSTICO',
    },
    {
      question: 'É normal precisar completar o gás refrigerante todos os anos?',
      answer:
        'Não se deve considerar a recarga anual uma necessidade automática. Uma eventual redução de refrigerante pode indicar vazamento ou outro problema que precisa ser investigado.',
      tag: 'SISTEMA FRIGORÍFICO',
    },
    {
      question: 'Comprar um ar-condicionado mais potente é sempre melhor?',
      answer:
        'Não. A capacidade deve ser compatível com a carga térmica do ambiente. O dimensionamento inadequado pode comprometer o conforto e a eficiência.',
      tag: 'EFICIÊNCIA',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 bg-[#05070B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#078BD0]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with editorial look */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A111C] border border-[#078BD0]/30 text-xs font-mono text-[#078BD0] mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#19B8FF]" />
            <span>GUIA EDITORIAL TÉCNICO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            MAIS INFORMAÇÃO.<br />
            <span className="text-gradient-blue">MELHORES DECISÕES.</span>
          </h2>

          <p className="mt-4 text-[#A7B4C4] text-base sm:text-lg max-w-xl mx-auto">
            Fundamentos claros e transparentes sobre o funcionamento e o cuidado com o seu equipamento de ar-condicionado.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A111C] border-[#078BD0]/60 shadow-[0_4px_25px_rgba(7,139,208,0.15)]'
                    : 'bg-[#070B12] border-white/5 hover:border-[#078BD0]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-[#078BD0]"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#078BD0] uppercase block">
                      {faq.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#19B8FF] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border ${
                      isOpen
                        ? 'bg-[#078BD0] border-[#19B8FF] text-white rotate-180'
                        : 'bg-[#05070B] border-white/10 text-[#A7B4C4]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-[#A7B4C4] text-base leading-relaxed border-t border-white/5 animate-fadeIn">
                    <p className="bg-[#05070B]/60 p-4 rounded-xl border border-white/5 text-white/90">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Consultation Notice */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#0A111C]/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <HelpCircle className="w-5 h-5 text-[#19B8FF] shrink-0" />
            <span className="text-sm text-[#A7B4C4]">
              Ficou com alguma dúvida sobre o seu ar-condicionado? Converse com um profissional da Termac.
            </span>
          </div>

          <a
            href="https://wa.me/554192730992?text=Ol%C3%A1%21%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20t%C3%A9cnica%20sobre%20meu%20ar-condicionado."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#078BD0] hover:bg-[#19B8FF] transition-colors shrink-0"
          >
            Tirar Dúvida no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
