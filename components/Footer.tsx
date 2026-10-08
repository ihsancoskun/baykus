"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
} from "lucide-react";

// --- HOVER TEXT EFFECT COMPONENT ---
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 120"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#b3855a" /> {/* gold */}
              <stop offset="25%" stopColor="#d4af37" /> {/* lighter gold */}
              <stop offset="50%" stopColor="#FDFBF7" /> {/* cream */}
              <stop offset="75%" stopColor="#d4af37" /> {/* lighter gold */}
              <stop offset="100%" stopColor="#b3855a" /> {/* gold */}
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      
      {/* Background outline text (faint) */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-white/10 font-serif text-[80px] font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      
      {/* Animated glowing outline */}
      <motion.text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent stroke-[#b3855a] font-serif text-[80px] font-bold dark:stroke-[#b3855a]/60"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        style={{ filter: hovered ? "url(#glow)" : "none" }}
      >
        {text}
      </motion.text>
      
      {/* Filled text masked by hover */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="1.5"
        mask="url(#textMask)"
        className="fill-transparent font-serif text-[80px] font-bold"
        style={{ filter: hovered ? "url(#glow)" : "none" }}
      >
        {text}
      </text>
    </svg>
  );
};

// --- BACKGROUND GRADIENT COMPONENT ---
export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #263147 50%, rgba(179, 133, 90, 0.15) 100%)",
      }}
    />
  );
};

// --- MAIN FOOTER COMPONENT ---
export default function Footer() {
  const footerLinks = [
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkımızda", href: "/dersler/hakkimizda" },
        { label: "Hizmetlerimiz", href: "/" },
        { label: "Kariyer", href: "/iletisim" },
        { label: "İletişim", href: "/iletisim" },
      ],
    },
    {
      title: "Fransızca",
      links: [
        { label: "Fransa'daki Üniversitelere Başvuru", href: "/dersler/fransiz-universiteler-basvuru-danismanligi" },
        { label: "Frankofon Okulların Tüm Branşları", href: "/dersler/fransizca-matematik-dersleri" },
        { label: "Galatasaray Üniversitesi İç Sınavlar", href: "/dersler/gsicsinavlar" },
        { label: "Atölyelerle Fransızca", href: "/iletisim" },
        { label: "Oyunlarla Fransızca", href: "/iletisim" },
        { label: "Mesleki Fransızca", href: "/iletisim" },
      ],
    },
    {
      title: "Yabancı Diller",
      links: [
        { label: "Fransızca", href: "/dersler/fransizca" },
        { label: "İngilizce", href: "/dersler/ingilizce" },
        { label: "Almanca", href: "/dersler/almanca" },
        { label: "İspanyolca", href: "/dersler/ispanyolca" },
        { label: "İtalyanca", href: "/dersler/italyanca" },
        { label: "Türkçe / Turkish for foreigners", href: "/dersler/turkishlessons" },
      ],
    },
    {
      title: "Sınavlar",
      links: [
        { label: "BREVET", href: "/dersler/brevet" },
        { label: "BACCALAUREAT", href: "/dersler/baccalaureat" },
        { label: "DELF, DALF", href: "/dersler/delf-dalf" },
        { label: "GSÜ İÇ SINAVLAR", href: "/dersler/gsicsinavlar" },
        { label: "SAT FRENCH", href: "/dersler/satfrench" },
        { label: "TOEFL, SAT", href: "/dersler/toefl" },
        { label: "CHECK POINT", href: "/dersler/cambridge" },
      ],
    }
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#b3855a] group-hover:text-white transition-colors mt-1" />,
      text: "baykusakademi@gmail.com",
      href: "mailto:baykusakademi@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-[#b3855a] group-hover:text-white transition-colors mt-1" />,
      text: "0 533 656 99 83",
      href: "tel:+905336569983",
    },
    {
      icon: <MapPin size={18} className="text-[#b3855a] group-hover:text-white transition-colors mt-1 shrink-0" />,
      text: "Sezai Selek sokak Çağlayan Apartmanı No:17 Daire 8 Kat 3 Nişantaşı / İstanbul",
      href: "https://maps.google.com/?q=Sezai+Selek+Sok.+Çağlayan+Apt.+Nişantaşı+İstanbul",
      description: "*Amerikan Hastanesi'nin arka sokağı. 'Vet republic' karşısındaki bina. Rumeli Caddesinden geliyorsanız; polen pastanesi'ni görünce hemen o sokaktan sağa sapmanız gerekiyor. Metroyla geliyorsanız Osmanbey durağında inip Nişantaşı/Rumeli caddesi çıkışından çıkmanız gerekiyor."
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.34 2.88 2.88 0 0 1 2.9-3.22c.16 0 .32.02.48.06V10.4a6.33 6.33 0 0 0-5.88 3.28 6.56 6.56 0 0 0 3 8.73 6.99 6.99 0 0 0 8.72-3 6.43 6.43 0 0 0 .68-2.91V8.69a8.36 8.36 0 0 0 6.16 2.76V8.04a5.44 5.44 0 0 1-3.64-1.35z"/></svg>, label: "TikTok", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Youtube size={20} />, label: "YouTube", href: "https://www.youtube.com/@baykusakademinisantasi" },
  ];

  return (
    <footer className="bg-[#263147] relative h-fit rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      <div className="max-w-[90rem] mx-auto px-6 py-12 md:p-20 z-40 relative">
        
        {/* Main Grid: 1 col for Brand/Contact, 4 cols for Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-8 md:pb-12">
          
          {/* Brand & Contact Section (Takes up 4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/media/2025/05/baykus-yatay-01.png" 
                alt="Baykuş Akademi Logo" 
                className="h-16 w-auto object-contain bg-white/5 p-2 rounded-xl border border-white/10" 
              />
            </div>
            
            <p className="text-sm leading-relaxed text-white/70">
              <span className="font-semibold text-red-500 block mb-1">Tek Adres: Nişantaşı</span>
              Kaliteden ödün vermemek için şubemiz yok.
            </p>

            <ul className="space-y-4 text-white/70 pt-2">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex group items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[#b3855a] transition-colors duration-300 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    {item.href ? (
                      <a href={item.href} className="group-hover:text-white transition-colors duration-300 text-sm mt-2">
                        {item.text}
                      </a>
                    ) : (
                      <span className="group-hover:text-white transition-colors duration-300 text-sm mt-2">
                        {item.text}
                      </span>
                    )}
                    {item.description && (
                      <span className="text-xs text-white/40 mt-2 leading-relaxed">
                        {item.description}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer link sections (Takes up remaining 8 cols in a 4-col grid) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-white text-lg font-serif tracking-wide mb-4 md:mb-6 uppercase text-sm border-b border-[#b3855a]/30 pb-2 inline-block">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-white/70 flex flex-col">
                  {section.links.map((link) => (
                    <li key={link.label} className="relative w-fit">
                      <a
                        href={link.href}
                        className="hover:text-[#b3855a] transition-colors duration-300 flex items-center group text-sm"
                      >
                        <span className="w-0 h-[1px] bg-[#b3855a] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-white/50 pb-6 md:pb-16">
          
          {/* Social icons */}
          <div className="flex space-x-3 md:space-x-6 z-50">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#b3855a] hover:text-white hover:border-[#b3855a] transition-all duration-300 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left font-medium tracking-wide z-50">
            &copy; {new Date().getFullYear()} Baykuş Akademi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>

      {/* Text hover effect (Hidden on mobile, large on desktop) */}
      <div className="lg:flex hidden h-[22rem] -mt-28 -mb-20 pointer-events-auto z-10 relative">
        <TextHoverEffect text="BAYKUŞ" className="z-10" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
