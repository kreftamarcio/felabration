import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const AudioReactiveShader = {
  uniforms: {
    uTime: { value: 0 },
    uBass: { value: 0 },
    uTreble: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uBass;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Fluid waves simulation (Ocean + Drum Beat)
      float elevation = sin(modelPosition.x * 2.0 + uTime) * 0.5;
      elevation += sin(modelPosition.y * 3.0 + uTime * 0.5) * 0.5;
      
      // Bass amplifies the wave height (Drum impact)
      elevation *= (1.0 + uBass * 2.0);
      
      modelPosition.z += elevation;
      vElevation = elevation;
      
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uTreble;
    varying vec2 vUv;
    varying float vElevation;

    // Pan-African colors
    vec3 colorGold = vec3(1.0, 0.71, 0.01);
    vec3 colorRed = vec3(0.85, 0.01, 0.16);
    vec3 colorGreen = vec3(0.16, 0.61, 0.56);
    vec3 colorPitch = vec3(0.01, 0.01, 0.01);

    void main() {
      // Mix colors based on elevation and time
      vec3 mix1 = mix(colorPitch, colorGold, (vElevation + 1.0) * 0.5);
      vec3 mix2 = mix(colorRed, colorGreen, sin(uTime * 0.2) * 0.5 + 0.5);
      
      // Treble flashes the colors
      vec3 finalColor = mix(mix1, mix2, uTreble * 1.5 + vUv.y);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const ShaderPlane = ({ analyser }: { analyser: AnalyserNode | null }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const dataArray = useMemo(() => {
    if (!analyser) return new Uint8Array(0);
    return new Uint8Array(analyser.frequencyBinCount);
  }, [analyser]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        // Bass is lower frequencies (0-10 index)
        let bass = 0;
        for(let i=0; i<10; i++) bass += dataArray[i];
        bass = (bass / 10) / 255.0;
        
        // Treble is higher frequencies (50-100 index)
        let treble = 0;
        for(let i=50; i<100; i++) treble += dataArray[i];
        treble = (treble / 50) / 255.0;

        // Smooth transitions
        const currentBass = materialRef.current.uniforms.uBass.value;
        const currentTreble = materialRef.current.uniforms.uTreble.value;
        
        materialRef.current.uniforms.uBass.value = THREE.MathUtils.lerp(currentBass, bass, 0.1);
        materialRef.current.uniforms.uTreble.value = THREE.MathUtils.lerp(currentTreble, treble, 0.1);
      }
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={THREE.UniformsUtils.clone(AudioReactiveShader.uniforms)}
        vertexShader={AudioReactiveShader.vertexShader}
        fragmentShader={AudioReactiveShader.fragmentShader}
        wireframe={false}
      />
    </mesh>
  );
};

export default function HeroEngine() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startAudio = async () => {
    if (audioContext && isPlaying) return;
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ana = ctx.createAnalyser();
      ana.fftSize = 256;
      
      // Mock an oscillator to simulate Afrobeat drums since we don't have a file
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(45, ctx.currentTime); // Bass drum
      
      // Simulate beat
      setInterval(() => {
        gainNode.gain.setValueAtTime(1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      }, 500);

      const highOsc = ctx.createOscillator();
      const highGain = ctx.createGain();
      highOsc.type = 'sine';
      highOsc.frequency.setValueAtTime(4000, ctx.currentTime); // Hi-hats/Shakers
      
      setInterval(() => {
        highGain.gain.setValueAtTime(0.1, ctx.currentTime);
        highGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      }, 125);

      osc.connect(gainNode);
      highOsc.connect(highGain);
      
      gainNode.connect(ana);
      highGain.connect(ana);
      
      // Disconnect from destination to avoid actual annoying sound if not desired
      // but for demonstration we connect to output so they "Feel the Vibe"
      ana.connect(ctx.destination);
      
      osc.start();
      highOsc.start();

      setAudioContext(ctx);
      setAnalyser(ana);
      setIsPlaying(true);
    } catch (e) {
      console.error("Audio Context failed", e);
    }
  };

  return (
    <section className="relative w-full h-screen bg-fela-pitch overflow-hidden flex items-center justify-center">
      {/* Absolute 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <ShaderPlane analyser={analyser} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pointer-events-none">
        
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 brutalist-border bg-fela-surface text-fela-cyan font-bold tracking-widest text-sm uppercase">
          <span className="w-2 h-2 rounded-full bg-fela-cyan animate-[pulse-beat_1s_infinite]"></span>
          23 · 24 · 25 OUTUBRO · FLORIPA
        </div>

        <h1 className="kinetic-text leading-none mb-6">
          FELABRATION<br />FLORIPA
        </h1>
        
        <p className="text-xl md:text-2xl text-fela-paper opacity-90 max-w-2xl mb-12 font-medium font-sans border-l-4 border-fela-gold pl-6 text-left bg-black/40 p-4 backdrop-blur-sm">
          A maior celebração de <span className="text-fela-gold">Afrobeat</span> e <span className="text-fela-red">Resistência</span> no sul do Brasil.
        </p>

        <button 
          onClick={startAudio}
          className="btn-brutal pointer-events-auto"
          aria-label="Ativar experiência de áudio reativa"
        >
          {isPlaying ? 'VIBING NOW 🥁' : 'FEEL THE VIBE ✦'}
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-fela-gold font-display tracking-widest z-10">
        <span className="text-sm">SCROLL</span>
        <span className="animate-bounce mt-2 text-xl">↓</span>
      </div>
    </section>
  );
}
