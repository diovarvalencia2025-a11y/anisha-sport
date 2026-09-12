import React from 'react';
import { Activity, Clock, ShieldCheck, Flame } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const metrics = [
    {
      value: '24/7',
      label: 'CONFORT ACTIVO',
      desc: 'Tejidos de regulación térmica y compresión anatómica para todo el día.',
      icon: Clock
    },
    {
      value: '89.4%',
      label: 'RETORNO DE ENERGÍA',
      desc: 'Amortiguación probada que reduce el cansancio en cada paso.',
      icon: Activity
    },
    {
      value: 'CERO',
      label: 'LÍMITES EN TU ESTILO',
      desc: 'Prendas sin costuras molestas que eliminan cualquier punto de roce.',
      icon: Flame
    },
    {
      value: '100%',
      label: 'CALIDAD ASEGURADA',
      desc: 'Selección rigurosa de materiales, acabados y empaques en cada producto.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 bg-surface border-t border-b border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0B0B0B] border border-white/5 space-y-3 hover:border-volt/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-volt">
                  <Icon size={20} />
                </div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                  {m.value}
                </div>
                <div className="font-mono text-xs font-bold tracking-widest text-volt uppercase">
                  {m.label}
                </div>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
