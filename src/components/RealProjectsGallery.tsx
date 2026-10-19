import React, { useState, useRef } from 'react';
import { REAL_MEDIA_ITEMS, MediaItem } from '../data/mediaData';
import { Play, Eye, X, MessageCircle, ShieldCheck, Film, Image as ImageIcon, ChevronRight, CheckCircle2 } from 'lucide-react';

export const RealProjectsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalItem, setActiveModalItem] = useState<MediaItem | null>(null);

  const categories = [
    { key: 'todos', label: 'Todos os Projetos', count: REAL_MEDIA_ITEMS.length },
    { key: 'residencial', label: 'Residencial & Splits', count: REAL_MEDIA_ITEMS.filter(m => m.category === 'residencial').length },
    { key: 'comercial', label: 'Comercial & Cassete', count: REAL_MEDIA_ITEMS.filter(m => m.category === 'comercial').length },
    { key: 'manutencao', label: 'Manutenção & Limpeza', count: REAL_MEDIA_ITEMS.filter(m => m.category === 'manutencao').length },
    { key: 'videos', label: 'Vídeos em Campo', count: REAL_MEDIA_ITEMS.filter(m => m.type === 'video').length },
  ];

  const filteredItems = REAL_MEDIA_ITEMS.filter((item) => {
    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'videos') return item.type === 'video';
    return item.category === selectedCategory;
  });

  const getWhatsAppProjectLink = (title: string) => {
    const message = `Olá! Vi o projeto "${title}" no site da Termac e gostaria de um atendimento similar para o meu espaço.`;
    return `https://wa.me/554192730992?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="galeria" className="relative py-28 bg-[#05070B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#078BD0]/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A111C] border border-[#078BD0]/30 text-xs font-mono text-[#19B8FF] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#078BD0]" />
              <span>EXECUÇÃO REAL EM CURITIBA & RMC</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              PROJETOS & INSTALAÇÕES EM CAMPO
            </h2>
          </div>

          <p className="text-base text-[#A7B4C4] max-w-md font-light leading-relaxed">
            Registros reais de nossos técnicos em ação: instalações residenciais de alto padrão, sistemas comerciais, cassetes embutidos e manutenções pesadas.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 touch-manipulation ${
                  isSelected
                    ? 'bg-[#078BD0] text-white shadow-[0_0_20px_rgba(7,139,208,0.5)] scale-[1.02]'
                    : 'bg-[#0A111C] text-[#A7B4C4] hover:text-white hover:bg-[#111A29] border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#05070B] text-[#5A6E85]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-3xl bg-[#0A111C] border border-white/10 hover:border-[#078BD0]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(7,139,208,0.2)] flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full bg-[#05070B] overflow-hidden">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play Badge Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#078BD0] text-white flex items-center justify-center shadow-[0_0_25px_rgba(7,139,208,0.8)] group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5">
                      <Film className="w-3 h-3 text-[#19B8FF]" />
                      <span>VÍDEO REAL</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A111C] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5">
                      <ImageIcon className="w-3 h-3 text-[#19B8FF]" />
                      <span>FOTO DE OBRA</span>
                    </div>
                  </div>
                )}

                {/* Technical Tag on bottom of thumbnail */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#19B8FF] bg-[#05070B]/90 px-2.5 py-1 rounded-lg border border-[#078BD0]/40 backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#19B8FF] transition-colors line-clamp-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A7B4C4] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#078BD0]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver em detalhes</span>
                  </span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proof of Quality Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0A111C] via-[#0D1829] to-[#0A111C] border border-[#078BD0]/40 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
              Quer ver um projeto no seu imóvel residencial ou comercial?
            </h3>
            <p className="text-sm text-[#A7B4C4]">
              Envie fotos do seu espaço no WhatsApp para avaliarmos a melhor disposição técnica e acabamento.
            </p>
          </div>

          <a
            href="https://wa.me/554192730992?text=Ol%C3%A1%21%20Gostaria%20de%20enviar%20fotos%20do%20meu%20espa%C3%A7o%20para%20uma%20avalia%C3%A7%C3%A3o%20de%20ar-condicionado%20com%20a%20Termac."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(7,139,208,0.4)] shrink-0"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent" />
            <span>Enviar Fotos no WhatsApp</span>
          </a>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0A111C] border border-[#078BD0]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#05070B]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#19B8FF] bg-[#078BD0]/20 px-2.5 py-1 rounded border border-[#078BD0]/40">
                  {activeModalItem.tag}
                </span>
                <span className="text-xs font-mono text-[#A7B4C4]">TERMAC_OBRA_{activeModalItem.id.toUpperCase()}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Fechar visualizador"
                className="w-9 h-9 rounded-full bg-[#111A29] hover:bg-[#078BD0] text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Media Content */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[420px] max-h-[58vh]">
              {activeModalItem.type === 'video' ? (
                <video
                  src={activeModalItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full max-h-[58vh] object-contain"
                />
              ) : (
                <img
                  src={activeModalItem.src}
                  alt={activeModalItem.title}
                  className="w-full h-full max-h-[58vh] object-contain"
                />
              )}
            </div>

            {/* Modal Details & WhatsApp CTA */}
            <div className="p-6 bg-[#0A111C] flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
              <div className="text-left w-full sm:max-w-md">
                <h3 className="text-xl font-bold text-white mb-2">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C4] leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              <a
                href={getWhatsAppProjectLink(activeModalItem.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#078BD0] to-[#19B8FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(7,139,208,0.4)] shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Solicitar Serviço Similar</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
