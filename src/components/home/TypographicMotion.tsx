import React from 'react';

export const TypographicMotion: React.FC = () => {
  return (
    <section className="py-20 bg-background overflow-hidden border-t border-b border-white/5 select-none">
      
      {/* Track 1: Leftward Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden py-3">
        <div className="flex animate-marquee space-x-12">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center space-x-12">
              <span className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-white/10 uppercase tracking-tighter hover:text-white transition-colors duration-500">
                MOVE.
              </span>
              <span className="w-4 h-4 rounded-full bg-volt" />
              <span className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-volt uppercase tracking-tighter">
                RUN.
              </span>
              <span className="w-4 h-4 rounded-full bg-white/20" />
              <span className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-white/10 uppercase tracking-tighter hover:text-white transition-colors duration-500">
                TRAIN.
              </span>
              <span className="w-4 h-4 rounded-full bg-volt" />
              <span className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10 uppercase tracking-tighter">
                PERFORM.
              </span>
              <span className="w-4 h-4 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
