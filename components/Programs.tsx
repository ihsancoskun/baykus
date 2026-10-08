"use client";

import { motion } from "framer-motion";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
    alt: "DELF & DALF Hazırlık",
    title: "DELF & DALF HAZIRLIK",
    subtitle: "Uluslararası sertifikalara eksiksiz hazırlanmanız için titizlikle kurgulanmış özel materyaller ve simülasyonlar.",
  },
  {
    src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    alt: "Fransız Liselerine Hazırlık",
    title: "FRANSIZ LİSELERİNE HAZIRLIK",
    subtitle: "Fransız ekolü liselerin giriş sınavları ve akademik müfredatlarına (IB, AP) yönelik ayrıcalıklı destek.",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    alt: "GSÜ İç Sınav Hazırlık",
    title: "GSÜ İÇ SINAV HAZIRLIK",
    subtitle: "Galatasaray Üniversitesi'nin köklü iç sınavına (GSÜÖSYS), uzman kadromuz eşliğinde nokta atışı hazırlık.",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    alt: "Üniversite Danışmanlığı",
    title: "ÜNİVERSİTE DANIŞMANLIĞI",
    subtitle: "Salt sınav başarısının ötesinde; tüm Campus France başvuru sürecinizde yanınızda olan profesyonel rehberlik.",
  },
  {
    src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    alt: "Yaz Okulları",
    title: "YURT DIŞI YAZ OKULLARI",
    subtitle: "Dil becerilerini yerinde mükemmelleştirirken ufkunuzu genişleteceğiniz, gençlere özel elit yaz programları.",
  },
  {
    src: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80",
    alt: "Genel Fransızca",
    title: "GENEL FRANSIZCA",
    subtitle: "Başlangıçtan ileri düzeye, dili tüm zarafetiyle konuşmanızı sağlayacak akıcı ve interaktif bir eğitim yaklaşımı.",
  }
];

export default function Programs() {
  return (
    <section className="w-full bg-[#fcfcfc] py-20 border-t border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <img src="/media/2025/05/baykus-yatay-01.png" alt="Baykuş" className="h-12 w-auto object-contain opacity-80" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy tracking-tight leading-tight mb-4">
            Eğitimde <br/>
            <span className="text-red-600 italic font-light">Eşsiz Mükemmeliyet.</span>
          </h2>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed font-sans font-light">
            Zorlu sınav hazırlıklarından prestijli üniversitelere başvuru süreçlerine dek, akademik hedeflerinizi gerçeğe dönüştürmek için yanınızdayız.
          </p>
        </motion.div>

        {/* Coverflow Carousel Integration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CoverflowCarousel 
            slides={SLIDES} 
            showCaption={true} 
            showPagination={true}
            showNavigation={true}
            cardWidth="clamp(240px, 30vw, 400px)" // Make cards a bit larger so they look grand
            className="pb-10"
            cardClassName="border-[8px] border-white/50 bg-white" // Give cards a thick premium white border like polaroids
          />
        </motion.div>
      </div>
    </section>
  );
}
