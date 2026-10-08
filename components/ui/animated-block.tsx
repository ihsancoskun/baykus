"use client";

import React from "react";
import { motion } from "framer-motion";

// A section with image on one side and text on the other, alternating
export function AnimatedSection({ 
  imageHtml, 
  textHtml, 
  index 
}: { 
  imageHtml: string; 
  textHtml: string; 
  index: number;
}) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col md:flex-row gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Side */}
      <div 
        className="w-full md:w-5/12 shrink-0 [&>img]:rounded-2xl [&>img]:shadow-lg [&>img]:w-full [&>img]:h-auto [&>img]:object-cover [&>img]:max-h-[320px]"
        dangerouslySetInnerHTML={{ __html: imageHtml }}
      />
      {/* Text Side */}
      <div 
        className="w-full md:w-7/12 course-content"
        dangerouslySetInnerHTML={{ __html: textHtml }}
      />
    </motion.div>
  );
}

// A full-width text-only block
export function AnimatedTextBlock({ textHtml }: { textHtml: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="course-content"
      dangerouslySetInnerHTML={{ __html: textHtml }}
    />
  );
}

// A full-width standalone image block (centered)
export function AnimatedImageBlock({ imageHtml }: { imageHtml: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-center [&>img]:rounded-2xl [&>img]:shadow-lg [&>img]:w-full [&>img]:max-w-2xl [&>img]:h-auto [&>img]:object-cover"
      dangerouslySetInnerHTML={{ __html: imageHtml }}
    />
  );
}
