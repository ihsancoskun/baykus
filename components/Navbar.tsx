"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_DATA = {
  danismanlik: [
    { 
      id: "fransiz-universiteler-basvuru-danismanligi", 
      title: "Fransız Üniversiteleri",
      desc: "Fransa'daki elit üniversitelere kayıt ve başvuru süreçleri yönetimi.",
      image: "/media/2025/06/fransizca-dersi-baykus.jpg"
    },
    { 
      id: "yurtdisi-universiteler-basvuru-danismanligi", 
      title: "Genel Yurtdışı Danışmanlık",
      desc: "Dünyanın en iyi üniversitelerine giden yolu birlikte planlayalım.",
      image: "/media/2025/06/biyoloji-baykus.jpg"
    }
  ],
  sinavlar_akademik: [
    { id: "baccalaureat", title: "Baccalauréat" },
    { id: "brevet", title: "Brevet" },
    { id: "satfrench", title: "SAT (General & French)" },
    { id: "gsicsinavlar", title: "GSÜ İç Sınavları" },
    { id: "fransiz-liselerine-hazirlik", title: "Fransız Liselerine Hazırlık" },
  ],
  sinavlar_dil: [
    { id: "delf-dalf", title: "DELF / DALF" },
    { id: "tcf-anf", title: "TCF ANF" },
    { id: "toefl", title: "TOEFL iBT" },
    { id: "cambridge", title: "Cambridge Check Point" },
    { id: "kpds-hazirlik", title: "YDS / KPDS" },
  ],
  branslar_fr: [
    { id: "fransizca-matematik-dersleri", title: "Matematik" },
    { id: "fransizca-fizik-dersleri", title: "Fizik" },
    { id: "fransizca-kimya-dersleri", title: "Kimya" },
    { id: "fransizca-biyoloji-dersleri", title: "Biyoloji" },
    { id: "fransizca-tarih-dersleri", title: "Tarih" },
    { id: "fransizca-edebiyat-dersleri", title: "Edebiyat" },
  ],
  branslar_en: [
    { id: "ingilizce-matematik-dersleri", title: "Matematik" },
    { id: "ingilizce-fizik-dersleri", title: "Fizik" },
    { id: "ingilizce-kimya-dersleri", title: "Kimya" },
    { id: "ingilizce-biyoloji-dersleri", title: "Biyoloji" },
    { id: "ingilizce-edebiyat-dersleri", title: "Edebiyat" },
  ],
  diller: [
    { id: "fransizca", title: "Fransızca Eğitim" },
    { id: "ingilizce", title: "İngilizce Eğitim" },
    { id: "almanca", title: "Almanca Eğitim" },
    { id: "ispanyolca", title: "İspanyolca Eğitim" },
    { id: "italyanca", title: "İtalyanca Eğitim" },
    { id: "turkishlessons", title: "Turkish Lessons" },
  ]
};

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide the global navbar on the Karl prototype route
  if (pathname === "/vizyon-karl") return null;
  
  return (
    <div className={cn("fixed top-0 inset-x-0 w-full z-50 transition-all duration-500", 
        scrolled ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#263147]/5 py-2" : "bg-transparent py-4",
        className)}>
      <div className="flex items-center justify-between w-full px-8 lg:px-16">
        
        {/* Left Logo Container */}
        <div className="hidden lg:flex items-center w-[200px] shrink-0">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img src="/media/2025/05/image-7.png" alt="Baykuş Akademi" className="h-12 w-auto object-contain" />
            </Link>
        </div>

        {/* Animated Navigation Container */}
        <div className="flex justify-center shrink-0">
          <Menu setActive={setActive}>
            <HoveredLink href="/">ANASAYFA</HoveredLink>

            <MenuItem setActive={setActive} active={active} item="DANIŞMANLIK">
              <div className="text-sm grid grid-cols-1 gap-6 p-4 min-w-[350px] bg-[#FDFBF7]">
                {MENU_DATA.danismanlik.map((item) => (
                  <ProductItem
                    key={item.id}
                    title={item.title}
                    href={`/dersler/${item.id}`}
                    src={item.image}
                    description={item.desc}
                  />
                ))}
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="SINAVLAR">
              <div className="grid grid-cols-2 gap-10 text-sm min-w-[550px] p-4 bg-[#FDFBF7]">
                {/* Akademik Sınavlar */}
                <div>
                  <h4 className="text-[10px] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">Akademik & Lise</h4>
                  <div className="flex flex-col space-y-3">
                    {MENU_DATA.sinavlar_akademik.map((item) => (
                      <HoveredLink key={item.id} href={`/dersler/${item.id}`}>{item.title}</HoveredLink>
                    ))}
                  </div>
                </div>
                {/* Dil Sınavları */}
                <div>
                  <h4 className="text-[10px] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">Uluslararası Dil</h4>
                  <div className="flex flex-col space-y-3">
                    {MENU_DATA.sinavlar_dil.map((item) => (
                      <HoveredLink key={item.id} href={`/dersler/${item.id}`}>{item.title}</HoveredLink>
                    ))}
                  </div>
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="OKUL DESTEK">
              <div className="grid grid-cols-2 gap-10 text-sm min-w-[500px] p-4 bg-[#FDFBF7]">
                {/* Fransızca Müfredat */}
                <div>
                  <h4 className="text-[10px] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">Fransızca Müfredat</h4>
                  <div className="flex flex-col space-y-3">
                    {MENU_DATA.branslar_fr.map((item) => (
                      <HoveredLink key={item.id} href={`/dersler/${item.id}`}>{item.title}</HoveredLink>
                    ))}
                  </div>
                </div>
                {/* İngilizce Müfredat */}
                <div>
                  <h4 className="text-[10px] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">İngilizce Müfredat</h4>
                  <div className="flex flex-col space-y-3">
                    {MENU_DATA.branslar_en.map((item) => (
                      <HoveredLink key={item.id} href={`/dersler/${item.id}`}>{item.title}</HoveredLink>
                    ))}
                  </div>
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="YABANCI DİL">
              <div className="flex flex-col space-y-3 text-sm min-w-[200px] p-4 bg-[#FDFBF7]">
                {MENU_DATA.diller.map((item) => (
                  <HoveredLink key={item.id} href={`/dersler/${item.id}`}>
                    {item.title}
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>

            <HoveredLink href="/dersler/hakkimizda">HAKKIMIZDA</HoveredLink>

          </Menu>
        </div>

        {/* Right Action Button */}
        <div className="hidden lg:flex justify-end w-[200px] shrink-0">
          <Link href="/iletisim" className="px-6 py-2 bg-[#263147] text-white text-[11px] font-sans uppercase tracking-[0.15em] hover:bg-[#b3855a] transition-colors duration-300">
            BİZE ULAŞIN
          </Link>
        </div>

      </div>
    </div>
  );
}
