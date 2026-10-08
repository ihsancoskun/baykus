"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "owl" | "bottom-strip" | "interactive";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number; rotateY?: number };
}

const IMG_WIDTH = 120;
const IMG_HEIGHT = 160;

const PROGRAMS = [
    { title: "DELF & DALF HAZIRLIK", desc: "Uluslararası sertifikalara en doğru şekilde hazırlanmanız için özel kaynaklar.", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&q=80" },
    { title: "FRANSIZ LİSELERİNE", desc: "Fransız liselerinin giriş sınavlarına özel programlarla dil becerilerinizi geliştiriyoruz.", img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80" },
    { title: "GSÜ İÇ SINAV HAZIRLIK", desc: "Galatasaray Üniversitesi'nin kendi sınavına yönelik, tecrübeli kadromuzla hazırlık.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" },
    { title: "ÜNİVERSİTE DANIŞMANLIĞI", desc: "Sadece sınav değil, tüm eğitim ve Fransa'ya başvuru sürecinde yanınızdayız.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80" }
];

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={
                phase === "interactive"
                    ? { duration: 0, ease: "linear" }
                    : { duration: 2.2, ease: [0.16, 1, 0.3, 1] } // Heavy, smooth cinematic easing
            }

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: target.rotateY ? target.rotateY : 180 }}
                animate={{ rotateY: target.rotateY || 0 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full bg-white p-[3px] pb-[14px] rounded-[3px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="relative w-full h-full bg-gray-200 overflow-hidden rounded-sm">
                        <img
                            src={src}
                            alt={`hero-${index}`}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-[4px] shadow-sm bg-navy border-[0.25px] border-white/10"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    {index < 4 ? (
                        <>
                            <img src={PROGRAMS[index].img} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/10" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-1.5 pb-2 text-center">
                                <h3 className="text-[10px] font-serif font-bold text-white mb-1 leading-tight">{PROGRAMS[index].title}</h3>
                                <div className="w-6 h-[1px] bg-red-600/50 mb-2 rounded-full" />
                                <p className="text-[8px] font-sans font-light text-gray-300 leading-snug mb-2 px-1 line-clamp-3">{PROGRAMS[index].desc}</p>
                                <div className="mt-2 flex items-center justify-center w-full px-2">
                                    <span className="inline-block w-full text-center bg-navy border border-white/50 text-white text-[8px] py-1 rounded hover:bg-red-600 transition-colors">
                                        İncele
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full opacity-30">
                            <div className="w-2 h-2 rounded-full border border-red-600" />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 32;
const MAX_SCROLL = 3000; // Virtual scroll range

import { OWL_IMAGES as RAW_IMAGES } from "@/lib/owl-images";
const IMAGES = Array.from({ length: TOTAL_IMAGES }).map((_, i) => RAW_IMAGES[i % RAW_IMAGES.length]);

// ============================================================
// RING SHAPE — 32 cards forming a perfect circle
// ============================================================
const OWL_BASE_POSITIONS = Array.from({ length: 32 }).map((_, i) => {
    const angle = (i / 32) * Math.PI * 2;
    return {
        x: Math.cos(angle) * 280,
        y: Math.sin(angle) * 280,
        rot: (angle * 180) / Math.PI + 90,
        s: 1.2
    };
});

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // --- Container Size (measured on the ring area so mobile can size the ring to the free space) ---
    useEffect(() => {
        const el = ringRef.current;
        if (!el) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(el);

        // Initial set
        setContainerSize({
            width: el.offsetWidth,
            height: el.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Native Scroll Logic ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens quickly at the start of scroll
    const morphProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 300, damping: 30 });

    // 2. Scroll Rotation (Shuffling): Minor rotation during transition
    const scrollRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, 180]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 200, damping: 30 });

    // 3. Scatter Progress: Cards fly outwards across the entire short scroll range
    const gridProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    // Dramatically increased stiffness so it snaps back into place immediately when scrolling up
    const smoothGrid = useSpring(gridProgress, { stiffness: 400, damping: 40 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = stickyRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;

            // Normalize -1 to 1
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            // Move +/- 100px
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("owl"), 100);
        const timer2 = setTimeout(() => setIntroPhase("interactive"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
            rotateY: 0,
        }));
    }, []);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [gridValue, setGridValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeGrid = smoothGrid.on("change", setGridValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeGrid();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothGrid, smoothMouseX]);

    return (
        <div ref={containerRef} className="relative w-full h-[130vh] bg-white">
          <div ref={stickyRef} className="sticky top-0 w-full h-[100svh] md:h-screen overflow-hidden bg-white">
            {/* Background decoration */}
            <motion.div 
                className="absolute inset-0 w-full h-full bg-[#FDFBF7] overflow-hidden"
            >
                <motion.div
                    initial={{ y: "-30%", opacity: 0, scale: 1.1 }}
                    animate={{ y: "0%", opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/media/bg/neo_paris.jpg"
                        alt="Paris Background"
                        fill
                        className="object-cover opacity-40 mix-blend-multiply"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/50 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Container */}
            <div className="flex h-full w-full max-w-[100rem] mx-auto flex-col items-stretch md:items-center justify-start md:justify-center gap-3 md:gap-0 px-4 md:px-0 pt-[84px] pb-6 md:p-0 perspective-[1000px] relative">

                {/* Top-Left Slogan Block (eexgroup style) */}
                <motion.div 
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
                    className="order-1 md:order-none relative md:absolute z-30 shrink-0 md:top-32 md:left-12 w-full md:w-auto md:max-w-[40vw] lg:max-w-[28vw] xl:max-w-[22vw] pointer-events-auto text-left"
                >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-navy leading-[1.15] tracking-tight">
                        Fransız Ekolünde <br/>
                        <span className="text-red-600 italic font-light">40 Yıllık</span> Deneyim.
                    </h1>
                    <p className="mt-2 md:mt-4 text-[12px] sm:text-sm text-navy-100 leading-snug md:leading-relaxed font-sans font-light">
                        Öğrencilerimizi sadece sınavlara değil, elit bir geleceğe hazırlıyoruz. DELF/DALF ve yurtdışı danışmanlık hizmetlerimizle ayrıcalıklı bir eğitim ekosistemi.
                    </p>
                    <div className="mt-3 md:mt-6">
                        <Link href="/iletisim" className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 rounded-sm border border-navy text-white font-medium bg-navy hover:bg-red-600 hover:border-red-600 transition-colors duration-300 shadow-sm group text-xs md:text-sm tracking-wide">
                            Baykuş Akademi'yi Keşfet
                            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                    </div>
                </motion.div>

                {/* Bottom-Right Secondary Slogan */}
                <motion.div 
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
                    className="order-3 md:order-none relative md:absolute z-30 shrink-0 md:bottom-24 md:right-12 xl:right-[100px] 2xl:right-[120px] w-full md:w-auto pr-[72px] md:pr-0 md:max-w-[40vw] lg:max-w-[28vw] xl:max-w-[22vw] pointer-events-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-2 md:gap-0 text-left md:text-right"
                >
                    <h2 className="text-[17px] sm:text-2xl lg:text-3xl xl:text-4xl font-serif text-navy leading-[1.15] tracking-tight text-left md:text-right">
                        Geleceğe Açılan <br/> 
                        <span className="text-red-600 italic font-light">Zarif Bir Kapı.</span>
                    </h2>
                    <p className="hidden md:block mt-4 text-sm text-navy/80 leading-relaxed font-sans font-light text-right">
                        Hedefiniz neresi olursa olsun, Avrupa'nın en seçkin üniversitelerine giden bu prestijli yolda Baykuş Akademi hep yanınızda.
                    </p>
                    <div className="shrink-0 md:mt-6">
                        <Link href="/dersler/fransiz-universiteleri-danismanlik" className="inline-flex items-center justify-center whitespace-nowrap px-3 py-2 md:px-6 md:py-3 bg-white/70 md:bg-transparent rounded-sm text-navy font-medium border border-navy/30 hover:border-navy hover:text-white hover:bg-navy transition-colors duration-300 shadow-sm group text-xs md:text-sm tracking-wide">
                            Danışmanlığı İncele
                            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT FLOATING PILLAR (Bookmark) */}
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 100 }}
                    className="absolute hidden xl:flex right-0 top-1/2 -translate-y-1/2 bg-[#EAE2D6] border-y border-l border-[#263147]/20 p-6 flex-col items-center gap-8 shadow-[-20px_0_40px_rgba(0,0,0,0.05)] pointer-events-auto z-40 rounded-l-2xl scale-[0.85] 2xl:scale-100 origin-right"
                >
                    <div className="w-16 h-16 bg-[#263147] rounded-full flex items-center justify-center relative">
                        <div className="w-10 h-10 border-t-[1px] border-r-[1px] border-[#EAE2D6] rounded-tr-full absolute top-1.5 right-1.5"></div>
                        <div className="w-10 h-10 border-b-[1px] border-l-[1px] border-[#EAE2D6] rounded-bl-full absolute bottom-1.5 left-1.5"></div>
                    </div>
                    
                    <div className="flex flex-row-reverse gap-4 font-serif text-[#263147] tracking-[0.3em] pb-4" style={{ writingMode: 'vertical-rl' }}>
                        <span className="text-lg font-light uppercase">Baykuş Akademi</span>
                        <span className="text-xs opacity-70 uppercase">Fransızca Eğitim Mükemmeliyeti</span>
                    </div>
                </motion.div>

                    {/* Main Container */}
                    <div ref={ringRef} className="order-2 md:order-none relative md:absolute md:inset-0 flex-1 min-h-0 flex items-center justify-center w-full md:h-full">

                    {/* Center Logo (Just the transparent logo) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: (introPhase === "owl" || introPhase === "interactive") ? Math.max(0, 1 - gridValue * 2) : 0,
                            scale: (introPhase === "owl" || introPhase === "interactive") ? Math.max(0.9, 1 - gridValue) : 0.9
                        }}
                        transition={
                            introPhase === "interactive"
                                ? { duration: 0, ease: "linear" }
                                : { duration: 1.5, type: "spring", stiffness: 100 }
                        }
                        className="absolute z-10 hidden md:flex flex-col items-center justify-center pointer-events-none will-change-transform"
                        style={{
                            left: "50%",
                            top: "50%",
                            x: "-50%",
                            y: "-50%",
                        }}
                    >
                        <img 
                            src="/media/2025/05/baykus-yatay-01.png" 
                            alt="Baykuş Akademi" 
                            className="w-[120px] sm:w-[240px] md:w-[300px] lg:w-[340px] xl:w-[380px] object-contain drop-shadow-2xl"
                        />
                        <p className="mt-4 text-[9px] sm:text-[10px] md:text-xs text-[#263147]/80 font-sans font-light leading-relaxed max-w-[200px] sm:max-w-[280px] md:max-w-[340px] text-center">
                            Fransızca eğitiminde sınav kazandıran sistem. Fransa Üniversiteleri yurt dışı eğitim danışmanlığı, DELF / DALF, GSÜ İç Sınav, ve Baccalauréat eğitimleri.
                        </p>
                    </motion.div>

                    {/* The Rotating Cards Ring Container */}
                    <motion.div 
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        animate={(introPhase === "owl" || introPhase === "interactive") ? { rotate: 360 } : { rotate: 0 }}
                        transition={(introPhase === "owl" || introPhase === "interactive") ? { duration: 45, repeat: Infinity, ease: "linear" } : { duration: 1 }}
                    >
                        {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, rotateY: 0 };

                        // 1. Intro Phases (Scatter -> Line)
                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 130; // Adjusted for larger images
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1, rotateY: 0 };
                        } else {
                            // 2. Owl Phase & Morph Logic

                            // Responsive Calculations
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // On mobile, shrink cards and fit the whole ring (cards included) inside the free ring area
                            const cardScale = isMobile ? Math.min(0.7, Math.max(0.35, minDimension / 560)) : 1;
                            const cardHalfExtent = (IMG_HEIGHT / 2) * 1.2 * cardScale;

                            // A. Calculate Circle Position
                            // Original massive ring behavior
                            const maxRadius = isMobile ? Math.max(40, minDimension / 2 - cardHalfExtent - 4) : Math.min(containerSize.width * 0.23, containerSize.height * 0.35, 380); 
                            const owlScale = maxRadius / 280;
                            
                            // Keep it perfectly centered as requested
                            const owlCenterX = 0; 
                            const owlCenterY = 0;
                            const basePos = OWL_BASE_POSITIONS[i];
                            
                            target = {
                                x: (basePos.x * owlScale) + owlCenterX,
                                y: (basePos.y * owlScale) + owlCenterY,
                                rotation: basePos.rot,
                                scale: (basePos.s ? basePos.s : 1) * cardScale,
                                opacity: 1,
                                rotateY: 0
                            };

                            // D. Scatter outward and fade (instead of grid)
                            if (gridValue > 0) {
                                // All cards fly outwards and fade
                                const scatterScale = 1 + gridValue * 2; // Grow slightly as they scatter
                                const dx = (basePos.x || (Math.random() - 0.5));
                                const dy = (basePos.y || (Math.random() - 0.5));
                                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                                
                                const flyOutX = target.x + (dx / dist) * 1000 * gridValue;
                                const flyOutY = target.y + (dy / dist) * 1000 * gridValue;
                                
                                target = {
                                    x: lerp(target.x, flyOutX, gridValue),
                                    y: lerp(target.y, flyOutY, gridValue),
                                    rotation: target.rotation + gridValue * 90, // Spin outward
                                    scale: lerp(target.scale, scatterScale, gridValue),
                                    opacity: lerp(1, 0, gridValue),
                                    rotateY: 0
                                };
                            }
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase} 
                                target={target}
                            />
                        );
                    })}
                    </motion.div>
                </div>
            </div>
          </div>
        </div>
    );
}
