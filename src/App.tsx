/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NarrativeSection } from './components/NarrativeSection';
import { ServicesSection } from './components/ServicesSection';
import { RealProjectsGallery } from './components/RealProjectsGallery';
import { InteractiveSolutionFinder } from './components/InteractiveSolutionFinder';
import { EducationalFAQ } from './components/EducationalFAQ';
import { ProductShowcase } from './components/ProductShowcase';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ContactCTA } from './components/ContactCTA';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070B] text-white flex flex-col font-sans selection:bg-[#078BD0]/30 selection:text-[#19B8FF]">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with 3D AC Unit (Immediate critical paint) */}
        <HeroSection />

        {/* 2. Narrative: O Caminho até o Conforto */}
        <div className="section-defer">
          <NarrativeSection />
        </div>

        {/* 3. Soluções Completas em Climatização (8 Services) */}
        <div className="section-defer">
          <ServicesSection />
        </div>

        {/* 4. Galeria de Projetos e Vídeos Reais em Campo */}
        <div className="section-defer">
          <RealProjectsGallery />
        </div>

        {/* 5. Interactive Solution Finder */}
        <div className="section-defer">
          <InteractiveSolutionFinder />
        </div>

        {/* 5. Venda de Equipamentos */}
        <div className="section-defer">
          <ProductShowcase />
        </div>

        {/* 6. Atendimento Local: Curitiba e Região Metropolitana */}
        <div className="section-defer">
          <ServiceAreaSection />
        </div>

        {/* 7. Como Funciona o Atendimento (Linha do Tempo) */}
        <div className="section-defer">
          <ProcessTimeline />
        </div>

        {/* 8. Seção Educativa: FAQ Editorial */}
        <div className="section-defer">
          <EducationalFAQ />
        </div>

        {/* 9. CTA Final de Alta Conversão */}
        <div className="section-defer">
          <ContactCTA />
        </div>
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
