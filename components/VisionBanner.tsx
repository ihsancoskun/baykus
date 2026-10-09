import React from 'react';
import Image from 'next/image';

export default function VisionBanner() {
  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#EAE2D6] py-10 px-6 md:px-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/bg/neo_paris.jpg"
          alt="Neo Paris"
          fill
          className="object-cover object-center opacity-90 mix-blend-multiply"
          priority
        />
        {/* Subtle gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAE2D6]/80 via-transparent to-[#EAE2D6]/40" />
      </div>

      {/* Main Container - Strict Grid Layout */}
      <div className="relative z-10 w-full h-full flex flex-col p-6 md:p-12 pointer-events-none border-[12px] border-[#EAE2D6]">

        {/* Central Content */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl px-4 md:px-12">
          <h1 className="font-serif font-light text-6xl md:text-8xl lg:text-[8.125rem] text-[#263147] leading-[0.85] tracking-tight">
            BAYKUŞ <br />
            AKADEMİ <br />
            L'ÉCOLE DU FUTUR
          </h1>
          
          <h2 className="font-serif text-3xl md:text-5xl text-[#c85a3c] mt-10 mb-6 tracking-wide">
            Paris 2042
          </h2>
          
          <p className="font-serif text-lg md:text-2xl text-[#263147]/90 max-w-md leading-relaxed">
            Kusursuz Fransız ekolüyle harmanlanan vizyon, <br />
            teknoloji ve eşsiz bir geleceğin inşası.
          </p>
          
          <div className="mt-12 pointer-events-auto">
             <button className="bg-[#b3855a] hover:bg-[#8b6540] transition-colors text-white font-sans text-[0.625rem] tracking-[0.2em] px-10 py-4 font-semibold uppercase shadow-xl">
              Geleceği Tasarla
            </button>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="mt-auto flex justify-between items-end w-full px-4 md:px-12 pb-4">
          {/* Bottom Left: Stamp & Date */}
          <div className="flex flex-col gap-6">
            <div className="w-10 h-10 bg-transparent border-[1.5px] border-[#c85a3c] flex items-center justify-center text-[#c85a3c] font-serif text-[0.5625rem] leading-tight text-center">
              BA<br/>1984
            </div>
            
            <div className="font-sans text-[0.625rem] text-[#263147] tracking-[0.1em] uppercase font-semibold flex flex-col gap-1.5">
              <span>Eğitimde 40 Yıllık Mükemmeliyet</span>
              <div className="flex items-center gap-2">
                <span>GELECEĞİN VİZYONU</span>
                <span className="w-4 h-4 rounded-full border border-[#263147] flex items-center justify-center text-[0.625rem]">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT VERTICAL TEXT */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block" style={{ writingMode: 'vertical-rl' }}>
          <span className="font-serif text-[#263147]/80 tracking-[0.5em] text-sm">
            Kendi geleceğini bugünden, zarafetle tasarla.
          </span>
        </div>

        {/* RIGHT FLOATING PILLAR (The vertical box from Neo Mirai) */}
        <div className="absolute right-6 md:right-16 top-32 bg-[#EAE2D6] border border-[#263147]/20 p-6 flex flex-col items-center gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.15)] pointer-events-auto">
          <div className="w-20 h-20 bg-[#263147] rounded-full flex items-center justify-center relative">
            <div className="w-12 h-12 border-t-[1.5px] border-r-[1.5px] border-[#EAE2D6] rounded-tr-full absolute top-2 right-2"></div>
            <div className="w-12 h-12 border-b-[1.5px] border-l-[1.5px] border-[#EAE2D6] rounded-bl-full absolute bottom-2 left-2"></div>
          </div>
          
          <div className="flex flex-row-reverse gap-4 font-serif text-[#263147] tracking-[0.3em] pb-8" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-xl font-light">Baykuş Akademi</span>
            <span className="text-sm opacity-70">Fransızca Eğitim Mükemmeliyeti</span>
          </div>
        </div>

      </div>
    </section>
  );
}
