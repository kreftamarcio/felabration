import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AncestralScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kinetic typography transformations based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  
  // Parallax effect on the photo
  const yImage = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-fela-surface overflow-hidden flex flex-col justify-center py-20 border-t border-fela-border"
    >
      {/* Background Noise Textures (handled by index.css pseudo-elements) */}
      
      {/* Scroll-telling Title 1 */}
      <motion.div 
        style={{ x: x1, opacity }}
        className="whitespace-nowrap font-display text-[clamp(6rem,15vw,20rem)] uppercase leading-[0.8] text-fela-border select-none pl-8"
      >
        FUNMILAYO RANSOME-KUTI
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full my-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Parallax Image / Polaroid */}
        <div className="relative w-full aspect-[3/4] max-w-md mx-auto brutalist-border bg-fela-paper p-4 rotate-[-3deg] z-20 hover:rotate-0 transition-transform duration-500 hover:z-30">
          <div className="w-full h-full bg-fela-pitch overflow-hidden relative">
            <motion.img 
              style={{ y: yImage, scale: scaleImage }}
              src="/assets/culture-art_1776867420642.png" 
              alt="Funmilayo Ransome-Kuti"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 mix-blend-screen opacity-80"
              onError={(e) => {
                // fallback if image not found
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback abstract shape if image missing */}
            <div className="absolute inset-0 bg-fela-pitch flex items-center justify-center -z-10">
               <div className="w-3/4 h-3/4 border border-fela-gold/30 rounded-full animate-[spin-slow_20s_linear_infinite]" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-fela-pitch/80 to-transparent" />
          </div>
          <p className="mt-4 text-center font-display text-fela-pitch text-xl tracking-widest">
            A MÃE DO AFROBEAT
          </p>
        </div>

        {/* Text content with brutalist styling */}
        <div className="space-y-6">
          <div className="inline-block bg-fela-red text-fela-paper font-display px-4 py-2 text-xl tracking-widest shadow-[4px_4px_0_var(--fela-gold)]">
            MEMÓRIA E RAÍZES
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl text-fela-paper leading-none">
            SEM <span className="text-fela-gold">FUNMILAYO</span>,<br />NÃO HAVERIA FELA.
          </h2>
          
          <p className="font-sans text-lg md:text-xl text-fela-muted border-l-4 border-fela-red pl-6 bg-fela-pitch/50 p-4">
            Educadora. A primeira mulher nigeriana a dirigir um carro. Líder ativista panafricana que enfrentou o colonialismo britânico e foi peça-chave da independência da Nigéria.
          </p>

          <p className="font-sans text-lg text-fela-paper bg-fela-surface p-4 brutalist-border">
            Sua coragem, sua voz e sua entrega à libertação das mulheres africanas são as raízes do espírito que move o Felabration Floripa.
          </p>
        </div>
      </div>

      {/* Scroll-telling Title 2 */}
      <motion.div 
        style={{ x: x2, opacity }}
        className="whitespace-nowrap font-display text-[clamp(6rem,15vw,20rem)] uppercase leading-[0.8] text-transparent [-webkit-text-stroke:2px_var(--fela-gold)] opacity-50 select-none pr-8 text-right"
      >
        LÍDER PANAFRICANA
      </motion.div>
    </section>
  );
}
