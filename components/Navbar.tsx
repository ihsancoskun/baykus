"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while it is open
  React.useEffect(() => { setMobileOpen(false); }, [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Hide the global navbar on the Karl prototype route
  if (pathname === "/vizyon-karl") return null;

  const mobileSections: { key: string; title: string; groups: { label?: string; items: { id: string; title: string }[] }[] }[] = [
    { key: "danismanlik", title: "Danışmanlık", groups: [{ items: MENU_DATA.danismanlik }] },
    { key: "sinavlar", title: "Sınavlar", groups: [
      { label: "Akademik & Lise", items: MENU_DATA.sinavlar_akademik },
      { label: "Uluslararası Dil", items: MENU_DATA.sinavlar_dil },
    ] },
    { key: "okul", title: "Okul Destek", groups: [
      { label: "Fransızca Müfredat", items: MENU_DATA.branslar_fr },
      { label: "İngilizce Müfredat", items: MENU_DATA.branslar_en },
    ] },
    { key: "dil", title: "Yabancı Dil", groups: [{ items: MENU_DATA.diller }] },
  ];
  
  return (
    <>
    <div className={cn("fixed top-0 inset-x-0 w-full z-50 transition-all duration-500", 
        scrolled ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#263147]/5 py-2" : "bg-transparent py-3 min-[860px]:py-4",
        className)}>
      {/* Mobile bar: logo + menu toggle */}
      <div className="flex min-[860px]:hidden items-center justify-between w-full px-4">
        <Link href="/" className="flex items-center" aria-label="Baykuş Akademi ana sayfa">
          <img src="/media/2025/05/image-7.png" alt="Baykuş Akademi" className="h-9 w-auto object-contain" />
        </Link>
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label="Menüyü aç"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-sm border border-[#263147]/20 bg-[#FDFBF7]/80 backdrop-blur text-[#263147] text-[0.6875rem] font-sans uppercase tracking-[0.2em]"
        >
          Menü
          <span className="flex flex-col gap-[4px]">
            <span className="block w-4 h-[1.5px] bg-[#263147]" />
            <span className="block w-4 h-[1.5px] bg-[#263147]" />
            <span className="block w-3 h-[1.5px] bg-[#263147] self-end" />
          </span>
        </button>
      </div>

      <div className="hidden min-[860px]:flex items-center justify-between gap-4 w-full px-6 lg:px-8 xl:px-16">
        
        {/* Left Logo Container (flexible so the bar can never overflow) */}
        <div className="hidden lg:flex flex-1 min-w-0 items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img src="/media/2025/05/image-7.png" alt="Baykuş Akademi" className="h-10 xl:h-12 w-auto max-w-full object-contain" />
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
                  <h4 className="text-[0.625rem] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">Akademik & Lise</h4>
                  <div className="flex flex-col space-y-3">
                    {MENU_DATA.sinavlar_akademik.map((item) => (
                      <HoveredLink key={item.id} href={`/dersler/${item.id}`}>{item.title}</HoveredLink>
                    ))}
                  </div>
                </div>
                {/* Dil Sınavları */}
                <div>
                  <h4 className="text-[0.625rem] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">Uluslararası Dil</h4>
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
                  <h4 className="text-[0.625rem] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">Fransızca Müfredat</h4>
                  <div className="flex flex-col space-y-3">
                    {MENU_DATA.branslar_fr.map((item) => (
                      <HoveredLink key={item.id} href={`/dersler/${item.id}`}>{item.title}</HoveredLink>
                    ))}
                  </div>
                </div>
                {/* İngilizce Müfredat */}
                <div>
                  <h4 className="text-[0.625rem] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-4 border-b border-[#263147]/10 pb-2">İngilizce Müfredat</h4>
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

        {/* Right Action Button (column stays as a spacer at lg to keep the menu centered) */}
        <div className="hidden lg:flex flex-1 min-w-0 justify-end">
          <Link href="/iletisim" className="hidden xl:inline-flex whitespace-nowrap px-6 py-2 bg-[#263147] text-white text-[0.6875rem] font-sans uppercase tracking-[0.15em] hover:bg-[#b3855a] transition-colors duration-300">
            BİZE ULAŞIN
          </Link>
        </div>

      </div>
    </div>

    {/* Mobile full-screen menu */}
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] min-[860px]:hidden bg-[#FDFBF7] flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#263147]/10">
            <img src="/media/2025/05/image-7.png" alt="Baykuş Akademi" className="h-9 w-auto object-contain" />
            <button
              id="mobile-menu-close"
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#263147]/20 text-[#263147] text-xl leading-none"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobil menü">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block py-4 border-b border-[#263147]/10 font-serif text-2xl text-[#263147]">Anasayfa</Link>

            {mobileSections.map((section, si) => {
              const isOpen = openSection === section.key;
              return (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * (si + 1) }}
                  className="border-b border-[#263147]/10"
                >
                  <button
                    type="button"
                    id={`mobile-section-${section.key}`}
                    onClick={() => setOpenSection(isOpen ? null : section.key)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-4 font-serif text-2xl text-[#263147] text-left"
                  >
                    {section.title}
                    <span className={cn("text-[#b3855a] text-lg transition-transform duration-300", isOpen && "rotate-45")}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-4">
                          {section.groups.map((group, gi) => (
                            <div key={gi}>
                              {group.label && (
                                <p className="text-[0.625rem] font-serif text-[#b3855a] uppercase tracking-[0.2em] mb-2">{group.label}</p>
                              )}
                              <div className="flex flex-col">
                                {group.items.map((item) => (
                                  <Link
                                    key={item.id}
                                    href={`/dersler/${item.id}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2 text-[0.9375rem] font-sans text-[#263147]/80 hover:text-[#b3855a]"
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            <Link href="/dersler/hakkimizda" onClick={() => setMobileOpen(false)} className="block py-4 border-b border-[#263147]/10 font-serif text-2xl text-[#263147]">Hakkımızda</Link>
          </nav>

          <div className="px-6 pb-8 pt-4">
            <Link href="/iletisim" onClick={() => setMobileOpen(false)} className="block w-full text-center px-6 py-3 bg-[#263147] text-white text-[0.75rem] font-sans uppercase tracking-[0.15em]">
              Bize Ulaşın
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
