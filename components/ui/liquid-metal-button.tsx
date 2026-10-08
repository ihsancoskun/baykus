"use client";

import React from "react";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  viewMode?: "text" | "icon";
  className?: string;
}

export function LiquidMetalButton({
  label = "Keşfet",
  onClick,
  href,
  target,
  viewMode = "text",
  className = "",
}: LiquidMetalButtonProps) {
  const classes = `group relative inline-flex items-center justify-center overflow-hidden bg-transparent text-navy border border-navy/30 rounded-none hover:border-navy transition-colors duration-500 ${
    viewMode === "icon" ? "w-12 h-12" : "px-8 py-4"
  } ${className}`;
  const Tag: any = href ? "a" : "button";
  const linkProps = href
    ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : undefined }
    : { type: "button" as const };
  return (
    <Tag
      onClick={onClick}
      {...linkProps}
      className={classes}
    >
      {/* Background slide-up fill effect */}
      <div className="absolute inset-0 bg-navy translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
      
      {viewMode === "icon" ? (
        <span className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </span>
      ) : (
        <span className="relative z-10 flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-500">
          {label}
        </span>
      )}
    </Tag>
  );
}
