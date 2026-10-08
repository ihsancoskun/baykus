'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CardData {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  imgSrc: string;
}

const cards: CardData[] = [
  {
    title: 'Fransızca Etkinlik Atölyeleri',
    desc: 'Oyun, sanat ve müzikle harmanlanmış interaktif atölyelerimizde çocuklarımız Fransızcayı yaşayarak, eğlenerek öğreniyorlar.',
    gradientFrom: '#ffbc00', // Yellow
    gradientTo: '#ff0058', // Red/Pink
    imgSrc: '/media/kids-1.png',
  },
  {
    title: 'Çocuklar İçin Özel Müfredat',
    desc: 'Pedagojik yaklaşımlarla hazırlanmış, çocukların yaş ve algı seviyelerine uygun, özel materyallerle desteklenmiş bir eğitim sistemi.',
    gradientFrom: '#03a9f4', // Blue
    gradientTo: '#ff0058', // Pink/Red
    imgSrc: '/media/kids-2.png',
  },
  {
    title: 'Ana Dili Fransızca Olan Eğitmenler',
    desc: 'Sadece dil değil, aynı zamanda Fransız kültürünü de çocuklara aktaran, alanında uzman, deneyimli yerli ve yabancı öğretmen kadrosu.',
    gradientFrom: '#4dff03', // Green
    gradientTo: '#03a9f4', // Blue
    imgSrc: '/media/kids-3.png',
  },
];

export default function SkewCards() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-nowrap sm:flex-wrap sm:justify-center items-stretch overflow-x-auto sm:overflow-visible snap-x snap-mandatory py-4 w-auto sm:w-full gap-4 xl:gap-8 -mx-4 px-6 sm:mx-0 sm:px-0 [scrollbar-width:none]">
        {cards.map(({ title, desc, gradientFrom, gradientTo, imgSrc }, idx) => (
          <div
            key={idx}
            className="group relative shrink-0 w-[78vw] sm:w-[380px] h-[440px] sm:h-[520px] snap-center sm:m-[10px] xl:m-0 transition-all duration-500"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Animated blurs */}
            <span className="pointer-events-none absolute inset-0 z-10">
              <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
            </span>

            {/* Content & Image */}
            <div className="relative z-20 left-0 p-[20px_30px] sm:p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[20px] text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[30px_40px] h-full flex flex-col justify-between border border-white/20 overflow-hidden">
              
              {/* Image Container */}
              <div 
                onClick={() => setSelectedImg(imgSrc)}
                className="relative w-full h-[190px] sm:h-[240px] -mt-2 mb-4 rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-500 block cursor-pointer"
              >
                <img 
                  src={imgSrc} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-grow justify-center">
                <h2 className="text-xl font-bold mb-3 font-serif leading-tight">{title}</h2>
                <p className="text-sm leading-relaxed mb-4 font-light text-white/90 line-clamp-3">{desc}</p>
                <a
                  href="/iletisim"
                  className="inline-block text-xs font-bold text-navy bg-white px-4 py-2.5 rounded-full hover:bg-[#ffcf4d] hover:shadow-md transition-colors w-fit mt-auto"
                >
                  Daha Fazla Bilgi
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full"
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
          >
            <X size={32} />
          </button>
          <div 
            className="relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImg} 
              alt="Enlarged view" 
              className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Tailwind custom utilities for animation and shadows */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
      `}</style>
    </>
  );
}
