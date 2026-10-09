"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { OWL_IMAGES as RAW_IMAGES } from "@/lib/owl-images";

const TOTAL_CARDS = 40;
// Fallback array in case RAW_IMAGES is smaller than TOTAL_CARDS
const IMAGES = Array.from({ length: TOTAL_CARDS }).map((_, i) => RAW_IMAGES[i % RAW_IMAGES.length]);

function TunnelCard({ 
    progress, 
    index, 
    src 
}: { 
    progress: any, 
    index: number, 
    src: string 
}) {
    // 1. Position calculation (Corridor style)
    const { x, y, initialZ } = useMemo(() => {
        // Alternate left and right walls
        const side = index % 2 === 0 ? 1 : -1;
        
        // Push them out to the sides (creates a hollow center)
        const baseX = side * (250 + Math.random() * 450);
        
        // Spread them vertically
        const baseY = (Math.random() - 0.5) * 800;
        
        // Spread them along the Z axis (depth)
        // First cards start close to 0, last cards far in the distance
        const z = - (index * 400) - 500;
        
        return { x: baseX, y: baseY, initialZ: z };
    }, [index]);

    // 2. Map progress to Z movement
    // The camera will travel forward over the full scroll
    const travelDistance = 20000;
    const currentZ = useTransform(progress, [0, 1], [initialZ, initialZ + travelDistance]);

    // 3. Map Z position to visual properties
    // -4000: far away, 0: camera plane, 800: behind camera
    const opacity = useTransform(currentZ, [-4000, -1500, 0, 800], [0, 0.9, 1, 0]);
    
    // Animate blur based on depth of field
    const filter = useTransform(
        currentZ, 
        [-4000, -1000, 0, 800], 
        ["blur(15px)", "blur(2px)", "blur(0px)", "blur(25px)"]
    );
    
    // Slight rotation for elegance
    const rotate = useTransform(
        currentZ, 
        [-4000, 0, 800], 
        [index % 2 === 0 ? -15 : 15, 0, index % 2 === 0 ? 30 : -30]
    );

    // Card dimensions
    const width = 220;
    const height = 300;

    return (
        <motion.div
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -width / 2,
                marginTop: -height / 2,
                x,
                y,
                z: currentZ,
                opacity,
                filter,
                rotate,
                transformStyle: "preserve-3d",
            }}
            className="rounded-xl overflow-hidden shadow-2xl border border-white/10 group"
        >
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-navy/30 mix-blend-overlay z-10 transition-colors duration-700 group-hover:bg-transparent"></div>
            <img 
                src={src} 
                alt={`gallery-${index}`}
                className="w-full h-full object-cover"
                style={{ width, height }}
            />
        </motion.div>
    );
}

export default function HeroTunnel() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Native scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll for luxurious feel
    const smoothProgress = useSpring(scrollYProgress, { 
        damping: 40, 
        stiffness: 70,
        mass: 0.8 
    });

    // Intro typography animations
    const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const textZ = useTransform(smoothProgress, [0, 1], [0, 8000]);

    // Final destination animations
    const finalOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
    const finalScale = useTransform(smoothProgress, [0.85, 1], [0.8, 1]);

    return (
        <div ref={containerRef} className="relative w-full h-[600vh] bg-[#050B14]">
            {/* Sticky viewport */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1200px] bg-[#02050A]">
                
                {/* Background Ambient Lights */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-600/15 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-red-600/10 rounded-full blur-[150px]"></div>
                    {/* Noise texture for premium feel */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>

                {/* The 3D Tunnel Container */}
                <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {IMAGES.map((src, i) => (
                        <TunnelCard 
                            key={i} 
                            progress={smoothProgress} 
                            index={i} 
                            src={src} 
                        />
                    ))}
                </div>

                {/* Typography Lockup (Fixed in center but fades/moves in 3D) */}
                <motion.div 
                    style={{ 
                        opacity: textOpacity,
                        z: textZ,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-auto px-4"
                >
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-red-500 font-sans tracking-[0.3em] text-xs md:text-sm uppercase mb-4"
                    >
                        Fransız Ekolünde 40 Yıl
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-tight"
                    >
                        Eğitimde <br />
                        <span className="italic font-light text-white/80">Sınırları</span> Aşın.
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-16 flex flex-col items-center"
                    >
                        <p className="text-white/40 text-[0.625rem] tracking-widest uppercase mb-4">Kaydırmaya Başlayın</p>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
                    </motion.div>
                </motion.div>

                {/* Final Destination Text (Appears at the end of the scroll) */}
                <motion.div 
                    style={{ 
                        opacity: finalOpacity,
                        scale: finalScale
                    }}
                    className="absolute z-30 flex flex-col items-center justify-center text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Yolculuğa Başlayın</h2>
                    <p className="text-white/60 font-sans mb-8 max-w-md">Galatasaray İç Sınavı, DELF/DALF ve yurtdışı üniversite danışmanlığında uzman kadroyla tanışın.</p>
                    <button className="px-8 py-4 bg-white text-navy font-sans text-sm tracking-wider uppercase hover:bg-red-600 hover:text-white transition-colors duration-500 rounded-sm">
                        Programları İncele
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
