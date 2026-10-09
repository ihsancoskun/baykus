"use client";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { SUCCESS_DATA } from "@/data/mockData";

// Using the exact LinkedIn SVG from the snippet
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip-linkedin-team01)">
      <path
        d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip-linkedin-team01">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

type team = {
  name: string;
  role: string;
  image: string;
  socials: {
    website: string;
    linkedin: string;
  };
}[];

const statCards = [
  {
    value: `${SUCCESS_DATA.francePlacementRate}`,
    label: "Fransa'nın Zirvesine Yerleşme Oranı",
    sub: "Campus France süreçlerinde kusursuz rehberlik",
  },
  {
    value: `${SUCCESS_DATA.totalExams}`,
    label: "DELF / DALF Başarısı",
    sub: "Uluslararası arenada tescillenmiş yetkinlik",
  },
  {
    value: `${SUCCESS_DATA.gsuInternalExamRate}`,
    label: "GSÜ İç Sınavlarında Zirve",
    sub: "Galatasaray Üniversitesi'ne geçişte eşsiz oran",
  },
  {
    value: `${SUCCESS_DATA.yearsOfExperience}`,
    label: "Yıllık Köklü Tecrübe",
    sub: "Kurucumuz Elif Akan'ın vizyonuyla",
  },
];

const Team = () => {
  return (
    <section className="bg-[#fcfcfc] w-full py-14 md:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center gap-8 md:gap-12">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-4"
        >
          <span className="mb-2 md:mb-6 flex items-center justify-center gap-4 text-[0.625rem] font-sans font-semibold tracking-[0.3em] text-navy uppercase">
            <span className="w-8 h-[1px] bg-navy/40"></span>
            Başarılarla Dolu Bir Tarih
            <span className="w-8 h-[1px] bg-navy/40"></span>
          </span>
          <h2 className="text-[1.75rem] leading-tight md:text-5xl font-serif text-navy">
            40 yıllık birikim, kusursuz vizyon ve
            <span className="text-red-600 italic font-light"> kanıtlanmış </span>
            başarılar.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative overflow-hidden rounded-sm bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Top accent */}
              <div className="h-[2px] w-full bg-red-600/10 group-hover:bg-red-600 transition-colors duration-500" />

              <div className="p-4 md:p-8 flex flex-col gap-3 md:gap-4">
                {/* Big stat number */}
                <div>
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-serif text-navy leading-none">
                    {index === 0 || index === 2 ? "%" : ""}{card.value}{index === 1 || index === 3 ? "+" : ""}
                  </span>
                </div>

                <div>
                  <p className="text-[0.8125rem] leading-snug md:text-base font-bold text-navy">{card.label}</p>
                  <p className="text-[0.6875rem] leading-snug md:text-sm text-navy/50 mt-1">{card.sub}</p>
                </div>
              </div>

              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
