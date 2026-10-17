import React, { useState } from 'react';
import { MessageCircle, Check, ArrowRight, Sparkles, Building, Home, Briefcase, HelpCircle } from 'lucide-react';

export const InteractiveSolutionFinder: React.FC = () => {
  const [need, setNeed] = useState<string>('Instalar um ar-condicionado');
  const [environment, setEnvironment] = useState<string>('Residencial');
  const [notes, setNotes] = useState<string>('');

  const needOptions = [
    'Instalar um ar-condicionado',
    'Comprar um equipamento',
    'Fazer manutenção',
    'Resolver um problema',
    'Planejar a infraestrutura',
    'Calcular a capacidade ideal',
  ];

  const envOptions = [
    { label: 'Residencial', icon: Home },
    { label: 'Comercial', icon: Building },
    { label: 'Escritório', icon: Briefcase },
    { label: 'Outro', icon: HelpCircle },
  ];

  const generateWhatsAppUrl = () => {
    let message = `Olá! Realizei a consulta pelo site da Termac:\n\n`;
    message += `• Necessidade: ${need}\n`;
    message += `• Tipo de ambiente: ${environment}\n`;
    if (notes.trim()) {
      message += `• Detalhes adicionais: ${notes.trim()}\n`;
    }
    message += `\nGostaria de receber orientações e um orçamento para o meu ambiente.`;

    return `https://wa.me/554192730992?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="encontre-solucao" className="relative py-28 bg-[#070B12] overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#078BD0]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#05070B] border border-[#078BD0]/30 text-xs font-mono text-[#19B8FF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONSULTOR RÁPIDO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            QUAL É A SOLUÇÃO IDEAL PARA VOCÊ?
          </h2>

          <p className="mt-4 text-[#A7B4C4] text-base sm:text-lg max-w-xl mx-auto">
            Selecione o que procura e gere uma solicitação organizada para conversar diretamente com nossa equipe no WhatsApp.
          </p>
        </div>

        {/* Interactive Form Card */}
        <div className="rounded-3xl bg-[#0A111C] border border-[#078BD0]/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* PERGUNTA 1 */}
          <div className="mb-10">
            <label className="block text-sm font-mono uppercase tracking-wider text-[#19B8FF] mb-4">
              Pergunta 1: O que você precisa?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {needOptions.map((opt) => {
                const isSelected = need === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setNeed(opt)}
                    className={`flex items-center justify-between p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#078BD0] text-white border-[#19B8FF] shadow-[0_0_20px_rgba(7,139,208,0.4)] scale-[1.02]'
                        : 'bg-[#05070B] text-[#A7B4C4] border-white/10 hover:border-[#078BD0]/40 hover:text-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PERGUNTA 2 */}
          <div className="mb-10">
            <label className="block text-sm font-mono uppercase tracking-wider text-[#19B8FF] mb-4">
              Pergunta 2: Qual é o tipo de ambiente?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {envOptions.map(({ label, icon: Icon }) => {
                const isSelected = environment === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setEnvironment(label)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#078BD0] text-white border-[#19B8FF] shadow-[0_0_20px_rgba(7,139,208,0.4)] scale-[1.02]'
                        : 'bg-[#05070B] text-[#A7B4C4] border-white/10 hover:border-[#078BD0]/40 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PERGUNTA 3 (OPCIONAL) */}
          <div className="mb-8">
            <label className="block text-sm font-mono uppercase tracking-wider text-[#19B8FF] mb-2">
              Pergunta 3 (opcional): Conte um pouco sobre sua necessidade
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Sala comercial em Curitiba de aproximadamente 30m², sol da tarde, já possui tubulação passada..."
              rows={3}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-[#5A6E85] focus:outline-none focus:border-[#078BD0] focus:ring-1 focus:ring-[#078BD0] transition-colors resize-none"
            />
          </div>

          {/* Dynamic Summary Preview & Direct WhatsApp Action */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-[#A7B4C4] leading-relaxed">
              <span className="text-white font-medium block mb-1">Avaliação técnica sem compromisso</span>
              A escolha final depende da avaliação das características do ambiente.
            </div>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(7,139,208,0.4)] shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent" />
              <span>Enviar respostas pelo WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
