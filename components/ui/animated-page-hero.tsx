"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedPageHeroProps {
  title: string;
  bgImage: string;
}

export function AnimatedPageHero({ title, bgImage }: AnimatedPageHeroProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with falling animation */}
      <motion.div 
        initial={{ y: "-10%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-navy"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-24"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
          {title}
        </h1>
        <div className="w-16 h-[1px] bg-red-600 mx-auto mb-8"></div>
        <p className="text-lg md:text-xl text-white/80 font-sans font-light max-w-2xl mx-auto">
          Baykuş Akademi'nin vizyonuyla hedeflerinize emin adımlarla ilerleyin.
        </p>
      </motion.div>
    </section>
  );
}
