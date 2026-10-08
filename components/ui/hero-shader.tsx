"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function HeroShader() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Mouse tracking values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 1. Fast follower (Sharp, immediate tracking)
    const fastMouseX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.5 });
    const fastMouseY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.5 });
    
    // 2. Liquid follower (Heavy, slow, lagging behind)
    const liquidMouseX = useSpring(mouseX, { damping: 80, stiffness: 40, mass: 3 });
    const liquidMouseY = useSpring(mouseY, { damping: 80, stiffness: 40, mass: 3 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Track globally so it works anywhere on the screen
            const x = e.clientX - window.innerWidth / 2;
            const y = e.clientY - window.innerHeight / 2;
            mouseX.set(x);
            mouseY.set(y);
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A101D] flex items-center justify-center">
            
            {/* --- The Fluid Aura Background --- */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                
                {/* 1. Base Ambient Glow (Deep Navy/Blue) */}
                <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-700/20 mix-blend-screen filter blur-[120px] opacity-70"></div>
                
                {/* 2. Slow Orbiting Fluid (French Red) */}
                <motion.div 
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                        x: ['-5%', '5%', '-5%'],
                        y: ['-5%', '10%', '-5%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear"
                    }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-[40%_60%_70%_30%] bg-red-600/30 mix-blend-screen filter blur-[120px]"
                />

                {/* 3. Mouse Follower - Fast (Bright Accent) */}
                <motion.div 
                    style={{ x: fastMouseX, y: fastMouseY }}
                    className="absolute top-1/2 left-1/2 -mt-[15vw] -ml-[15vw] w-[30vw] h-[30vw] rounded-full bg-white/10 mix-blend-overlay filter blur-[80px]"
                />

                {/* 4. Mouse Follower - Liquid/Slow (Rich French Blue) */}
                <motion.div 
                    style={{ x: liquidMouseX, y: liquidMouseY }}
                    className="absolute top-1/2 left-1/2 -mt-[25vw] -ml-[25vw] w-[50vw] h-[50vw] rounded-[60%_40%_50%_50%] bg-[#2A4B8C]/40 mix-blend-color-dodge filter blur-[100px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* Film Grain Texture for physical, expensive realism */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.35] mix-blend-overlay"></div>
            </div>

            {/* --- Typography Content --- */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 pointer-events-none">
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-red-400 font-sans tracking-[0.5em] text-xs md:text-sm uppercase mb-8 font-medium"
                >
                    Eğitimde Akışkanlık
                </motion.p>
                
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="text-7xl md:text-9xl lg:text-[11rem] font-serif text-white tracking-tighter leading-none mix-blend-lighten"
                >
                    Baykuş
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-10 text-white/60 max-w-lg font-sans text-sm md:text-base font-light leading-relaxed"
                >
                    Fransa üniversiteleri ve elit liselere giden yolda, 
                    <br className="hidden md:block"/>
                    her öğrencinin hedefine göre şekil alan benzersiz metodoloji.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-12 pointer-events-auto"
                >
                    <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/20 font-sans text-xs tracking-[0.2em] uppercase overflow-hidden rounded-sm hover:border-white/50 transition-all duration-500">
                        {/* Hover glow effect inside button */}
                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        <span className="relative z-10">Keşfetmeye Başla</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
