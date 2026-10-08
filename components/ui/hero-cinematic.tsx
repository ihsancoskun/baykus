"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { OWL_IMAGES as RAW_IMAGES } from "@/lib/owl-images";

const coverImage = RAW_IMAGES[3] || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2000";

export default function HeroCinematic() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Native scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Extremely smooth, heavy physics for that "luxurious" weight
    const smoothProgress = useSpring(scrollYProgress, { 
        damping: 50, 
        stiffness: 60,
        mass: 1 
    });

    // 1. The expanding arch (Mask Reveal)
    // Starts as an elegant arch, expands to fill the entire screen perfectly
    const clip1 = "inset(20% 30% 10% 30% round 400px 400px 12px 12px)";
    const clip2 = "inset(0% 0% 0% 0% round 0px 0px 0px 0px)";
    const clipPath = useTransform(smoothProgress, [0, 0.5], [clip1, clip2]);

    // 2. Image Parallax & Scale
    // The image starts slightly zoomed in and scales down as the mask expands
    const imageScale = useTransform(smoothProgress, [0, 0.5], [1.4, 1]);
    const imageY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

    // 3. Background Typography Fade
    const textY = useTransform(smoothProgress, [0, 0.4], [0, -150]);
    const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

    // 4. Foreground Content Reveal
    const contentOpacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
    const contentY = useTransform(smoothProgress, [0.5, 0.7], [100, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[400vh] bg-[#FDFBF7]">
            {/* Sticky viewport */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
                
                {/* Background Typography (Visible at start) */}
                <motion.div 
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute z-0 w-full text-center px-4 flex flex-col items-center justify-center"
                >
                    <p className="text-red-600 font-sans tracking-[0.4em] text-xs md:text-sm uppercase mb-4 font-medium">L'Excellence Française</p>
                    <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-serif text-navy tracking-tighter leading-none">
                        Baykuş
                    </h1>
                </motion.div>

                {/* The Expanding Masked Image */}
                <motion.div 
                    style={{ clipPath }}
                    className="absolute inset-0 z-10 w-full h-full flex items-center justify-center overflow-hidden bg-navy shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
                >
                    <motion.div 
                        style={{ scale: imageScale, y: imageY }}
                        className="w-full h-full relative"
                    >
                        {/* Overlay to darken image slightly when full screen so we can read the white text */}
                        <motion.div 
                            style={{ opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 0.5]) }}
                            className="absolute inset-0 bg-navy z-10"
                        />
                        <img 
                            src={coverImage} 
                            alt="Baykuş Akademi Lüks Vizyon"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Revealing Content over the full screen image */}
                    <motion.div 
                        style={{ opacity: contentOpacity, y: contentY }}
                        className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white mb-8 tracking-tight">
                            Geleceğe Açılan <br/> 
                            <span className="italic font-light text-white/90">Zarif</span> Bir Kapı.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
                            <button className="px-10 py-4 bg-white text-navy font-sans text-xs tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-all duration-500 rounded-sm">
                                Programları Keşfet
                            </button>
                            <button className="px-10 py-4 bg-transparent text-white border border-white/30 font-sans text-xs tracking-[0.2em] uppercase hover:border-white transition-all duration-500 rounded-sm">
                                Bize Ulaşın
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </div>
    );
}
