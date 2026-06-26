import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAP_POINTS = [
  { id: 'mariquinha', x: 50, y: 30, title: 'MORRO DA MARIQUINHA', desc: 'Palco Ancestral. Sexta, 23 Out' },
  { id: 'ufsc', x: 70, y: 60, title: 'UFSC', desc: 'Educação & Debate. Sábado, 24 Out' },
  { id: 'centro', x: 30, y: 50, title: 'CENTRO HISTÓRICO', desc: 'Desfile & Grafite. Sábado, 24 Out' },
  { id: 'ifsc', x: 40, y: 80, title: 'IFSC CONTINENTE', desc: 'Feira Gastronômica. Domingo, 25 Out' },
];

export default function AfroMap() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <section className="w-full py-24 bg-fela-pitch border-t border-fela-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Context */}
        <div className="space-y-8 z-10">
          <h2 className="font-display text-5xl md:text-7xl text-fela-paper leading-none">
            CIRCUITO<br/>
            <span className="text-transparent [-webkit-text-stroke:2px_var(--fela-cyan)]">AFRO-DIASPÓRICO</span>
          </h2>
          <p className="font-sans text-xl text-fela-muted">
            O Felabration ocupa Florianópolis. Do Morro da Mariquinha ao Centro Histórico, o mapa da cidade é redesenhado pela nossa cultura.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {MAP_POINTS.map(point => (
              <div 
                key={`list-${point.id}`}
                className="brutalist-border p-4 bg-fela-surface cursor-pointer hover:bg-fela-cyan/10 transition-colors"
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <div className="w-3 h-3 bg-fela-cyan mb-2" />
                <h3 className="font-display text-xl text-fela-paper">{point.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Vector Map */}
        <div className="relative w-full aspect-square bg-fela-surface brutalist-border overflow-hidden">
          {/* Abstract Grid/Map Background */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--fela-cyan)" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
            {/* Topographic Lines Mock */}
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M 10 90 C 30 80, 20 20, 50 30 C 80 40, 70 80, 90 60" 
              fill="none" 
              stroke="var(--fela-gold)" 
              strokeWidth="0.5" 
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              d="M 0 50 C 40 60, 30 10, 60 20 C 90 30, 80 90, 100 80" 
              fill="none" 
              stroke="var(--fela-red)" 
              strokeWidth="0.5" 
            />
          </svg>

          {/* Interactive Pins */}
          {MAP_POINTS.map(point => {
            const isHovered = hoveredPoint === point.id;
            return (
              <div 
                key={`pin-${point.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Pin Circle */}
                <motion.div 
                  className="w-6 h-6 bg-fela-cyan rounded-none border-2 border-fela-pitch cursor-pointer shadow-[0_0_15px_var(--fela-cyan)]"
                  animate={{ 
                    scale: isHovered ? 1.5 : 1,
                    rotate: isHovered ? 45 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: -60, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 w-48 bg-fela-gold text-fela-pitch p-3 border-2 border-fela-pitch pointer-events-none"
                    >
                      <h4 className="font-display text-lg leading-tight">{point.title}</h4>
                      <p className="font-sans text-xs font-bold mt-1 opacity-80">{point.desc}</p>
                      {/* Triangle Pointer */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-fela-gold" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
