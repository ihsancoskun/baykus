"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bowlby_One } from "next/font/google";

const bowlby = Bowlby_One({ weight: "400", subsets: ["latin"] });

export default function KarlStylePrototype() {
  return (
    <main className="min-h-screen w-full bg-[#ffe600] overflow-hidden relative selection:bg-[#333333] selection:text-[#ffe600]">
      {/* Top Centered Nav */}
      <nav className="absolute top-0 left-0 w-full flex justify-center pt-10 z-50">
        <ul className="flex items-center space-x-2 font-[Arial] text-[0.875rem] text-[#333333] tracking-wide">
          <li>
            <Link href="#" className="px-5 py-2.5 hover:text-black transition-colors block border-b-[20px] border-[#333333]">HOME</Link>
          </li>
          <li>
            <Link href="#" className="px-5 py-2.5 hover:text-black transition-colors block">ABOUT</Link>
          </li>
          <li>
            <Link href="#" className="px-5 py-2.5 hover:text-black transition-colors block">PROGRAMS</Link>
          </li>
          <li>
            <Link href="#" className="px-5 py-2.5 hover:text-black transition-colors block">EXAMS</Link>
          </li>
          <li>
            <Link href="#" className="px-5 py-2.5 hover:text-black transition-colors block">CONTACT</Link>
          </li>
        </ul>
      </nav>

      {/* Floating Statement on Yellow Canvas */}
      <div className={`absolute top-40 right-10 md:right-32 max-w-[600px] z-20 ${bowlby.className}`}>
        <p 
          className="text-[#ffffff] text-[1.875rem] md:text-[3.125rem] leading-[0.80] uppercase"
          style={{ transform: "rotate(-10deg)" }}
        >
          FRANSIZ<br/>
          EKOLÜNDE<br/>
          40 YILLIK<br/>
          DENEYİM
        </p>
      </div>
      
      {/* Real Full-Bleed Illustration */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/bg/karl_hero.jpg"
          alt="Karl Storybook Hero"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Globe focal element & Curved Text */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] z-30 flex justify-center">
        {/* Curved Text on Globe */}
        <svg viewBox="0 0 1000 300" className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-auto overflow-visible pointer-events-none">
          <path
            id="text-path"
            d="M 50 250 Q 500 50 950 250"
            fill="transparent"
          />
          <text className={`fill-[#ffffff] text-[3.125rem] md:text-[4.6875rem] uppercase ${bowlby.className}`} style={{ letterSpacing: "2px" }}>
            <textPath href="#text-path" startOffset="50%" textAnchor="middle">
              BAYKUŞ AKADEMİ
            </textPath>
          </text>
        </svg>

        <svg viewBox="0 0 1000 300" className="absolute top-[65px] md:top-[75px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-auto overflow-visible pointer-events-none">
          <path
            id="text-path-2"
            d="M 50 250 Q 500 50 950 250"
            fill="transparent"
          />
          <text className={`fill-[#ffffff] text-[3.125rem] md:text-[4.6875rem] uppercase ${bowlby.className}`} style={{ letterSpacing: "2px" }}>
            <textPath href="#text-path-2" startOffset="50%" textAnchor="middle">
              GELECEĞİN OKULU
            </textPath>
          </text>
        </svg>
      </div>
    </main>
  );
}
