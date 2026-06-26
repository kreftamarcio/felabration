import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATS = [
  { label: 'Pessoas Impactadas', value: '+15.000', color: 'text-fela-gold', border: 'border-fela-gold' },
  { label: 'Artistas & Produtores', value: '+200', color: 'text-fela-red', border: 'border-fela-red' },
  { label: 'Negócios Afro', value: '+50', color: 'text-fela-cyan', border: 'border-fela-cyan' },
];

export default function ESGImpact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const xLeft = useTransform(scrollYProgress, [0, 0.5], ['-50%', '0%']);
  const xRight = useTransform(scrollYProgress, [0, 0.5], ['50%', '0%']);

  return (
    <section ref={containerRef} className="py-32 bg-fela-pitch relative overflow-hidden">
      
      {/* Background SVG Graphic */}
      <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full max-w-4xl animate-[spin-slow_40s_linear_infinite]">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--fela-paper)" strokeWidth="0.5" strokeDasharray="2 4"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--fela-gold)" strokeWidth="1" strokeDasharray="4 8"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="var(--fela-red)" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Scrollytelling Title Area */}
        <motion.div style={{ x: xLeft, opacity }} className="space-y-6">
          <div className="inline-block px-4 py-1 border border-fela-cyan bg-fela-cyan/10 text-fela-cyan font-display tracking-widest">
            ODS DA ONU & ESG
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl text-fela-paper leading-none">
            IMPACTO<br/>
            <span className="text-transparent [-webkit-text-stroke:2px_var(--fela-red)]">Genuíno</span>
          </h2>
          
          <p className="font-sans text-xl text-fela-muted">
            Fugimos de métricas vazias. O Felabration injeta capital diretamente na base da economia negra da região. Geração de renda, trabalho decente e redução das desigualdades.
          </p>
        </motion.div>

        {/* Dynamic Stats Visualization */}
        <div className="relative">
          {/* Vertical axis line */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-fela-gold via-fela-red to-fela-cyan"
          />

          <div className="space-y-12 pl-12">
            {STATS.map((stat, i) => (
              <motion.div 
                key={stat.label}
                style={{ x: xRight, opacity }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 bg-fela-surface border-l-4 ${stat.border} shadow-[8px_8px_0_rgba(0,0,0,0.5)]`}
              >
                {/* Horizontal connector line */}
                <div className={`absolute top-1/2 -left-12 w-12 h-1 ${stat.border.replace('border-', 'bg-')}`} />
                
                <h3 className={`font-display text-5xl md:text-6xl ${stat.color} mb-2`}>
                  {stat.value}
                </h3>
                <p className="font-sans text-lg text-fela-paper uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
