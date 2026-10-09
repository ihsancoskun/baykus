"use client";

import { motion, Variants } from "framer-motion";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const services = [
  {
    step: "01",
    title: "Kapsamlı Fransızca Eğitimleri",
    desc: "İlkokuldan lise son sınıfa dek her seviye için özenle tasarlanmış özel ve grup dersleri. Akademik destek ve sınav hazırlığını kusursuzca harmanlayan ayrıcalıklı bir eğitim anlayışı.",
  },
  {
    step: "02",
    title: "Uluslararası Eğitim Danışmanlığı",
    desc: "Fransa, Belçika ve İsviçre'nin prestijli üniversitelerine giden yolda (Campus France, Parcoursup ve diğer platformlar); uçtan uca stratejik rehberlik ve etkileyici portfolyo tasarımı.",
  },
  {
    step: "03",
    title: "DELF / DALF Sınav Uzmanlığı",
    desc: "Uluslararası arenada geçerli Fransızca yeterlilik sınavları için hedefe yönelik yoğun çalışma programları, birebir simülasyonlar ve etkili mülakat stratejileri.",
  },
  {
    step: "04",
    title: "GSÜ İç Sınav Başarısı",
    desc: "Galatasaray Üniversitesi'nin özgün iç sınav sistemine tam uyumlu; 40 yıllık köklü deneyimle zenginleştirilmiş ve kanıtlanmış başarıya sahip özel müfredat.",
  },
];

export default function Services() {
  return (
    <section className="w-full bg-[#fcfcfc] border-y border-gray-100 px-4 py-16 md:px-8 md:py-32 overflow-hidden">
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-24">
        <span className="mb-4 md:mb-6 flex items-center justify-center gap-4 text-[0.625rem] font-sans font-semibold tracking-[0.3em] text-red-600 uppercase">
          <span className="w-8 h-[1px] bg-red-600/40"></span>
          Akademik Danışmanlık ve Eğitim
          <span className="w-8 h-[1px] bg-red-600/40"></span>
        </span>
        <h2 className="text-[1.75rem] md:text-5xl font-serif font-semibold text-navy leading-tight">
          Hedeflerinize Giden Yolda <br className="hidden md:block"/>
          <span className="italic font-light">Eksiksiz ve Prestijli Rehberiniz</span>
        </h2>
        <p className="mt-4 md:mt-6 text-sm md:text-lg text-navy-100/80 leading-relaxed max-w-xl mx-auto">
          Baykuş Akademi'nin 40 yılı aşan vizyoner deneyimiyle, Fransız ekolünün getirdiği akademik disiplin ve zarafeti öğrencilerimize kazandırıyoruz.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative mx-auto max-w-4xl"
      >
        {/* Center Line */}
        <div className="absolute top-0 bottom-0 left-[23px] w-0.5 bg-red-100 sm:left-1/2" />

        {services.map((srv, idx) => (
          <motion.div
            key={idx}
            variants={popIn}
            className="group relative mb-6 flex flex-col items-start justify-between last:mb-0 sm:flex-row sm:items-center md:mb-20"
          >
            {/* Dot */}
            <div className="absolute left-[18px] z-10 h-3.5 w-3.5 -translate-x-[6px] rounded-full border-4 border-white bg-red-600 shadow-md transition-transform duration-500 group-hover:scale-150 sm:left-1/2" />

            {/* Left Content — always show on mobile for even items; on desktop, odd items are invisible spacers */}
            <div className={`w-full pl-12 text-left sm:w-[45%] sm:pl-0 sm:text-right ${idx % 2 !== 0 ? "sm:invisible sm:pointer-events-none hidden sm:block" : ""}`}>
              <div className="rounded-2xl md:rounded-[2rem] border border-gray-100 bg-white p-5 md:p-8 shadow-sm transition-all duration-500 group-hover:border-red-200 group-hover:shadow-xl group-hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="mb-2 md:mb-3 block text-sm font-bold text-red-600">{srv.step}</span>
                <h4 className="text-lg md:text-2xl font-bold text-navy mb-2 md:mb-3">{srv.title}</h4>
                <p className="text-sm md:text-base leading-relaxed text-navy-100">{srv.desc}</p>
              </div>
            </div>

            {/* Right Content — always show on mobile for odd items; on desktop, even items are invisible spacers */}
            <div className={`w-full pl-12 text-left sm:w-[45%] sm:pl-0 ${idx % 2 === 0 ? "sm:invisible sm:pointer-events-none hidden sm:block" : ""}`}>
              <div className="rounded-2xl md:rounded-[2rem] border border-gray-100 bg-white p-5 md:p-8 shadow-sm transition-all duration-500 group-hover:border-red-200 group-hover:shadow-xl group-hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="mb-2 md:mb-3 block text-sm font-bold text-red-600">{srv.step}</span>
                <h4 className="text-lg md:text-2xl font-bold text-navy mb-2 md:mb-3">{srv.title}</h4>
                <p className="text-sm md:text-base leading-relaxed text-navy-100">{srv.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 md:mt-20 flex justify-center"
      >
        <LiquidMetalButton label="Tüm Hizmetlerimizi İnceleyin" />
      </motion.div>
    </section>
  );
}
