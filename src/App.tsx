/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NarrativeSection } from './components/NarrativeSection';
import { ServicesSection } from './components/ServicesSection';
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
        {/* 1. Hero Section with 3D AC Unit */}
        <HeroSection />

        {/* 2. Narrative: O Caminho até o Conforto */}
        <NarrativeSection />

        {/* 3. Soluções Completas em Climatização (8 Services) */}
        <ServicesSection />

        {/* 4. Interactive Solution Finder */}
        <InteractiveSolutionFinder />

        {/* 5. Venda de Equipamentos */}
        <ProductShowcase />

        {/* 6. Atendimento Local: Curitiba e Região Metropolitana */}
        <ServiceAreaSection />

        {/* 7. Como Funciona o Atendimento (Linha do Tempo) */}
        <ProcessTimeline />

        {/* 8. Seção Educativa: FAQ Editorial */}
        <EducationalFAQ />

        {/* 9. CTA Final de Alta Conversão */}
        <ContactCTA />
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
