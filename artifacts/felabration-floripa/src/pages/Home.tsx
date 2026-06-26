import React from 'react';
import HeroEngine from '@/components/HeroEngine';
import AncestralScroll from '@/components/AncestralScroll';
import AfroMap from '@/components/AfroMap';
import ESGImpact from '@/components/ESGImpact';
import GenerativeTicket from '@/components/GenerativeTicket';

export default function Home() {
  return (
    <main className="bg-fela-pitch min-h-screen text-fela-paper selection:bg-fela-gold selection:text-fela-pitch overflow-hidden">
      
      {/* Global Navigation - Minimal Brutalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 mix-blend-difference pointer-events-none">
        <div className="font-display text-2xl tracking-widest text-fela-paper">
          FELA<span className="text-fela-red">FLORIPA</span>
        </div>
        <div className="flex gap-6 font-sans font-bold text-sm tracking-widest uppercase text-fela-paper">
          <span className="hidden md:block">23-25 Outubro</span>
          <span>Edição 2026</span>
        </div>
      </nav>

      {/* Super-Components Assembly */}
      
      {/* A. Audio-Reactive Hero Engine */}
      <HeroEngine />

      {/* B. Ancestral Scroll-Telling */}
      <AncestralScroll />

      {/* C. Afro-Geographic Map */}
      <AfroMap />

      {/* D. ESG & Social Impact Dashboard */}
      <ESGImpact />

      {/* E. Generative Ticketing & Donation (Agentic Web) */}
      <GenerativeTicket />

      {/* Footer */}
      <footer className="py-12 bg-fela-pitch border-t border-fela-border text-center">
        <p className="font-display text-3xl text-fela-muted mb-4">TODO MUNDO DIZ YEAH YEAH!</p>
        <p className="font-sans text-sm text-fela-border uppercase tracking-widest">
          &copy; 2026 Felabration Floripa. Bota Pra Mexer.
        </p>
      </footer>
      
    </main>
  );
}
