import React from 'react';
import SkewCards from '@/components/ui/gradient-card-showcase';

export default function BaykusKids() {
  return (
    <section className="w-full bg-[#0b0305] py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/[0.05] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/[0.05] rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <span className="mb-6 flex items-center justify-center gap-4 text-[10px] font-sans font-semibold tracking-[0.3em] text-red-400 uppercase">
            <span className="w-8 h-[1px] bg-red-400/40"></span>
            Baykuş Kids
            <span className="w-8 h-[1px] bg-red-400/40"></span>
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
            Geleceğin Parlayan Yıldızlarına
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Erken yaşta başlayan kusursuz Fransızca eğitimiyle; çocuklarınıza yalnızca yepyeni bir dil değil, uluslararası ve seçkin bir vizyon armağan ediyoruz.
          </p>
        </div>

        <SkewCards />
      </div>
    </section>
  );
}
