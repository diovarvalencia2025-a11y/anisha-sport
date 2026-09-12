import React, { useState } from 'react';
import { Zap, Play, ArrowRight, ShieldCheck, Cpu, Flame } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const PinnedStorytelling: React.FC = () => {
  const { navigateTo, playUiSound } = useNavigation();
  const [activeScene, setActiveScene] = useState(0);

  const scenes = [
    {
      id: 'athlete',
      stage: 'ETAPA 01',
      title: 'EL ATLETA EN MOVIMIENTO',
      tagline: 'Disciplina pura forjada en las horas previas al amanecer.',
      desc: 'Antes de las medallas, antes de los reflectores del estadio, solo existe el pulso, la respiración y la constancia diaria.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
      metric: '04:30 AM',
      metricLabel: 'Primera Repetición'
    },
    {
      id: 'product',
      stage: 'ETAPA 02',
      title: 'SEGUNDA PIEL DISEÑADA',
      tagline: 'Cero costuras. Cero fricción. Sinergia biomecánica absoluta.',
      desc: 'Confeccionado con fibras de compresión continua que estabilizan los grupos musculares sin limitar la flexibilidad.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
      metric: '85 GRAMOS',
      metricLabel: 'Masa Aerodinámica'
    },
    {
      id: 'technology',
      stage: 'ETAPA 03',
      title: 'AMORTIGUACIÓN REACTIVA',
      tagline: 'La energía no se destruye. Se canaliza hacia adelante.',
      desc: 'Nuestra mediasuela con tecnología NitroStrata™ absorbe el impacto contra el suelo devolviéndolo en impulso y avance continuo.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
      metric: '89.4%',
      metricLabel: 'Retorno de Energía'
    },
    {
      id: 'performance',
      stage: 'ETAPA 04',
      title: 'CONFIANZA INQUEBRANTABLE',
      tagline: 'Cuando el diseño se une a la voluntad, los récords se superan.',
      desc: 'Comprobado en más de 15.000 kilómetros de pruebas de atletismo en altitud y entrenamientos intensivos de fuerza.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop',
      metric: '15,000 KM',
      metricLabel: 'Validación en Pista'
    },
    {
      id: 'anisha',
      stage: 'ETAPA 05',
      title: 'ANISHA SPORT',
      tagline: 'Muévete sin límites. Hoy, mañana, siempre.',
      desc: 'El estándar definitivo de moda y rendimiento deportivo, creado para quienes buscan superarse cada día.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
      metric: '∞',
      metricLabel: 'Cero Límites'
    }
  ];

  const current = scenes[activeScene];

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase">
            <Cpu size={16} />
            <span>20 // HISTORIA & VISIÓN DE MARCA</span>
          </div>
          <span className="text-xs font-mono text-white/50">
            ESCENA {activeScene + 1} DE {scenes.length}
          </span>
        </div>

        {/* PINNED STAGE CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-surface-border min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-12">
          
          {/* Background image transition */}
          <div className="absolute inset-0 z-0">
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] transition-all duration-700 animate-fadeIn"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
          </div>

          {/* Top scene badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-black uppercase bg-volt text-black shadow-[0_0_15px_#CCFF00]">
              {current.stage}
            </span>
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-right">
              <span className="font-mono font-black text-xl text-volt block leading-none">{current.metric}</span>
              <span className="text-[10px] font-mono text-white/60 uppercase">{current.metricLabel}</span>
            </div>
          </div>

          {/* Center narrative content */}
          <div className="relative z-10 max-w-3xl space-y-4 my-auto py-8">
            <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
              {current.title}
            </h3>
            <p className="text-sm sm:text-lg text-volt font-mono font-semibold">
              {current.tagline}
            </p>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light leading-relaxed">
              {current.desc}
            </p>
          </div>

          {/* Bottom scene switcher tabs */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Timeline Steps */}
            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playUiSound('click');
                    setActiveScene(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all whitespace-nowrap ${
                    activeScene === idx
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.stage}
                </button>
              ))}
            </div>

            {/* Next Step Button */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  playUiSound('whoosh');
                  setActiveScene((prev) => (prev + 1) % scenes.length);
                }}
                className="px-5 py-2.5 rounded-full bg-volt hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <span>{activeScene === scenes.length - 1 ? 'REINICIAR RECORRIDO ↺' : 'SIGUIENTE ETAPA →'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
