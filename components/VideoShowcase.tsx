"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

const VIDEOS = [
  { id: "z-xHB1Pp9-0", title: "Öğrenci Yorumları 1" },
  { id: "8MYgf73LYS0", title: "Öğrenci Yorumları 2" },
  { id: "x6tdu5t8JuQ", title: "Öğrenci Yorumları 3" },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#030305] py-16 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#060608]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-8 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center justify-center gap-4 text-[0.625rem] font-sans font-semibold tracking-[0.3em] text-white/50 uppercase"
          >
            <span className="w-8 h-[1px] bg-white/20"></span>
            İLHAM VEREN YOLCULUKLAR
            <span className="w-8 h-[1px] bg-white/20"></span>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4 md:mb-6"
          >
            Öğrencilerimizin Başarı Hikayeleri
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed"
          >
            Baykuş Akademi ayrıcalığıyla zirveye ulaşan öğrencilerimizin benzersiz vizyon ve başarı serüvenlerine bizzat tanıklık edin.
          </motion.p>
        </div>

        {/* NETFLIX STYLE SLIDER */}
        <div className="relative w-full group/slider">
          {/* Scrollable Container */}
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-6 pb-8 md:pb-12 pt-4 px-1 sm:px-0 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {VIDEOS.map((video, idx) => (
              <motion.div 
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="relative flex-none w-[44vw] sm:w-[240px] md:w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-xl bg-black group/card border border-white/10 ring-1 ring-white/5 hover:ring-red-500/50 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.05] transition-all duration-300 snap-start origin-center cursor-pointer"
              >
                {/* Thumbnail Image */}
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] transform md:scale-75 group-hover/card:scale-100 transition-all duration-300 border border-red-400/30">
                    <Play className="w-6 h-6 ml-1 text-white fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-bold text-sm leading-tight drop-shadow-md line-clamp-2">{video.title}</h4>
                </div>
              </motion.div>
            ))}
            
            {/* "Tüm Videolar" Card at the end */}
            <motion.a
              href="https://www.youtube.com/@baykusakademinisantasi"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative flex-none w-[44vw] sm:w-[240px] md:w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-center p-4 md:p-6 group/link cursor-pointer hover:bg-white/10 hover:scale-[1.05] transition-all duration-300 snap-start"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-blue-600/20 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover/link:scale-110 group-hover/link:bg-white/20 transition-all duration-300 relative z-10">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="text-base md:text-xl font-bold text-white mb-2 relative z-10">Daha Fazla Video</h4>
              <p className="text-white/60 text-xs md:text-sm relative z-10 group-hover/link:text-white/80 transition-colors">YouTube kanalımızı ziyaret edin →</p>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setActiveVideo(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-red-600 p-3 rounded-full z-50 backdrop-blur-md"
            onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Öğrenci Yorumu"
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
