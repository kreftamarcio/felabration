import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// NLP Agent Mock
const parseIntent = (input: string) => {
  const text = input.toLowerCase();
  
  const intent = {
    day: 'Todos os Dias',
    donation: 0,
    vip: false,
    ready: false
  };

  if (text.includes('sexta') || text.includes('23')) intent.day = 'Sexta (23/10)';
  else if (text.includes('sabado') || text.includes('sábado') || text.includes('24')) intent.day = 'Sábado (24/10)';
  else if (text.includes('domingo') || text.includes('25')) intent.day = 'Domingo (25/10)';

  const moneyMatch = text.match(/(?:r\$|reais)?\s*(\d+)\s*(?:reais)?/);
  if (moneyMatch && moneyMatch[1]) {
    intent.donation = parseInt(moneyMatch[1], 10);
  }

  if (text.includes('vip') || text.includes('camarote') || intent.donation >= 100) {
    intent.vip = true;
  }

  // Se o usuário digitou mais que 5 letras, consideramos pronto para gerar
  if (text.length > 5) {
    intent.ready = true;
  }

  return intent;
};

export default function GenerativeTicket() {
  const [input, setInput] = useState('');
  const [intent, setIntent] = useState(parseIntent(''));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntent(parseIntent(input));
    }, 400); // Debounce
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <section className="py-24 bg-fela-surface border-t border-fela-border relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-6xl text-fela-paper mb-4">
            INGRESSO <span className="text-fela-gold">GENERATIVO</span>
          </h2>
          <p className="font-sans text-xl text-fela-muted">
            Sem formulários chatos. Apenas nos diga o que você quer fazer.
            <br />
            <span className="text-sm opacity-70">(Ex: "Quero ir no Sábado, não sou VIP mas vou doar 50 reais pra fortalecer")</span>
          </p>
        </div>

        {/* NLP Input */}
        <div className="w-full max-w-2xl relative mb-16">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-fela-cyan font-mono font-bold">
            &gt;
          </div>
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite aqui..."
            className="w-full bg-fela-pitch border-2 border-fela-border text-fela-paper font-sans text-lg px-10 py-6 focus:outline-none focus:border-fela-cyan shadow-[4px_4px_0_var(--fela-border)] focus:shadow-[4px_4px_0_var(--fela-cyan)] transition-all"
          />
        </div>

        {/* Generative UI Output */}
        <div className="w-full h-80 relative flex justify-center perspective-[1000px]">
          <AnimatePresence mode="wait">
            {!intent.ready ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-fela-border text-fela-muted font-display text-2xl uppercase tracking-widest"
              >
                Aguardando Instruções...
              </motion.div>
            ) : (
              <motion.div 
                key="ticket"
                initial={{ rotateX: 90, opacity: 0, y: 50 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className={`relative w-full max-w-md ${intent.vip ? 'bg-gradient-to-br from-fela-gold to-fela-gold-d' : 'bg-fela-paper'} p-6 brutalist-border shadow-[12px_12px_0_rgba(0,0,0,0.8)] flex flex-col justify-between`}
              >
                {/* Ticket Notch */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-fela-surface border-r border-fela-border" />
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-fela-surface border-l border-fela-border" />

                <div className="flex justify-between items-start border-b-2 border-black/20 pb-4 mb-4">
                  <div>
                    <h3 className="font-display text-4xl text-fela-pitch leading-none">FELABRATION</h3>
                    <p className="font-display text-xl text-fela-pitch opacity-70">FLORIPA 2026</p>
                  </div>
                  {intent.vip && (
                    <span className="bg-fela-pitch text-fela-gold px-3 py-1 font-display text-xl">VIP</span>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="font-sans font-bold text-fela-pitch/70 uppercase text-sm">Acesso</span>
                    <span className="font-display text-xl text-fela-pitch">{intent.day}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans font-bold text-fela-pitch/70 uppercase text-sm">Doação Voluntária</span>
                    <span className="font-display text-xl text-fela-pitch">R$ {intent.donation},00</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-fela-pitch text-fela-paper font-display text-2xl uppercase tracking-widest hover:bg-fela-red transition-colors">
                  CONFIRMAR EMISSÃO
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
