"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Phone number from footer: 0 533 656 99 83 -> 905336569983
  const waLink = "https://wa.me/905336569983?text=Merhaba,%20Bayku%C5%9F%20Akademi%20e%C4%9Fitimleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

  return (
    <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[100] flex items-end justify-end scale-[0.8] md:scale-100 origin-bottom-right">
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex items-center justify-center relative"
      >
        {/* Pulsing ring background */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 duration-1000"></div>
        
        {/* Main Button */}
        <motion.div 
          layout
          className="bg-[#25D366] text-white flex items-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] border border-white/20 overflow-hidden"
          style={{ borderRadius: 9999 }}
          initial={{ width: "64px", height: "64px" }}
          animate={{ 
            width: isHovered ? "280px" : "64px", 
            height: "64px"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center justify-center h-full absolute left-0 w-[64px]">
            {/* WhatsApp SVG Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.126.556 4.195 1.614 6.007L.182 23.364l5.485-1.439A11.968 11.968 0 0 0 12.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.021a9.98 9.98 0 0 1-5.09-1.39l-.364-.217-3.782.993.993-3.692-.238-.378A9.973 9.973 0 0 1 2.01 12.031c0-5.525 4.496-10.021 10.021-10.021 5.525 0 10.021 4.496 10.021 10.021 0 5.525-4.496 10.021-10.021 10.021zm5.503-7.514c-.301-.151-1.785-.882-2.062-.983-.277-.101-.479-.151-.68.151-.202.302-.781.983-.957 1.185-.176.202-.353.227-.654.076-1.554-.775-2.656-1.405-3.673-2.919-.176-.262.012-.397.16-.546.134-.134.301-.353.453-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.68-1.638-.932-2.242-.244-.588-.496-.508-.68-.517-.176-.008-.378-.008-.579-.008a1.11 1.11 0 0 0-.806.378c-.277.302-1.058 1.033-1.058 2.52 0 1.487 1.083 2.923 1.234 3.125.151.202 2.128 3.249 5.161 4.56.721.312 1.284.499 1.724.639.722.228 1.38.196 1.897.119.58-.087 1.785-.73 2.037-1.436.252-.705.252-1.31.176-1.436-.076-.126-.277-.202-.579-.353z"/>
            </svg>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="absolute left-[64px] whitespace-nowrap font-medium text-[0.9375rem] tracking-wide font-sans"
              >
                Eğitim Danışmanına Ulaşın
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </a>
    </div>
  );
}
