"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function AboutFounder() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="w-full bg-white py-24 relative overflow-hidden">
      {/* Background */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image */}
          <div className="relative group mx-auto lg:mx-0 w-full max-w-md">
            {/* Red accent behind image */}
            <div className="absolute -inset-4 bg-red-600/10 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            
            <div 
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group/video"
              onClick={() => setIsVideoOpen(true)}
            >
              <Image 
                src="/media/2025/11/IMG_7365-2-scaled-1.jpg" 
                alt="Elif Akan"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-navy/20 flex items-center justify-center transition-all duration-500 group-hover/video:bg-navy/40 backdrop-blur-[2px] group-hover/video:backdrop-blur-[4px]">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover/video:scale-110 border border-white/30 text-white hover:bg-red-600 hover:border-red-600">
                  <Play className="w-8 h-8 ml-2 fill-current" />
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-navy text-white p-6 rounded-none border border-navy/20 shadow-xl flex flex-col items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
              <span className="text-4xl font-serif font-bold text-white">40+</span>
              <span className="text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Yıllık Tecrübe</span>
            </div>
          </div>

          {/* Right Column: Content */}
          <div>
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.2em] mb-4">
              KURUCUMUZ
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-semibold text-navy mb-2">
              Elif Akan
            </h3>
            <p className="text-lg font-medium text-navy/60 uppercase tracking-widest mb-8">
              Eğitim Direktörü
            </p>
            
            <div className="space-y-6 text-navy-100 text-lg leading-relaxed">
              <p>
                Eğitime adanmış 40 yıllık benzersiz bir serüven... Baykuş Akademi'nin kurucusu Elif Akan, 
                derin pedagojik bilgi birikimi ve ilham veren vizyonuyla bugüne dek binlerce öğrencinin hayatına dokunmuş; 
                onların Fransa'nın ve dünyanın en elit üniversitelerine uzanan yollarını aydınlatmıştır.
              </p>
              <p>
                "Gerçek eğitim, öğrencinin içindeki gizli potansiyeli keşfetmek ve ona en doğru ufukları çizmektir." felsefesini benimseyen Elif Akan; 
                GSÜ İç Sınavı, DELF/DALF süreçleri ve uluslararası eğitim danışmanlığında yılların süzgecinden geçmiş, kanıtlanmış ve ayrıcalıklı yöntemleriyle fark yaratmaktadır.
              </p>
            </div>

            {/* Signature or Quote Accent */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="font-serif text-2xl italic text-navy/80 font-light">
                "Kalıcı başarı, ancak vizyoner bir rehberlikle gerçeğe dönüşür."
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/50 p-3 rounded-full z-50"
            onClick={(e) => { e.stopPropagation(); setIsVideoOpen(false); }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={`https://www.youtube.com/embed/zhWaaew-EOw?autoplay=1&rel=0`}
              title="Elif Akan Tanıtım Videosu"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
