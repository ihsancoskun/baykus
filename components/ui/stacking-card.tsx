'use client';

import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  badge?: string;
  age?: string;
  ctaText?: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  badge?: string;
  age?: string;
  ctaText?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  badge,
  age,
  ctaText = 'Detaylı Bilgi & Randevu',
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-[600px] flex items-center justify-center sticky top-16 px-4'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `${i * 25}px`,
        }}
        className={cn(
          'flex flex-col md:flex-row relative w-full max-w-5xl rounded-3xl p-6 sm:p-8 origin-top shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-white border border-white/15 overflow-hidden gap-6'
        )}
      >
        {/* Glare */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Left: Text */}
        <div className='flex flex-col justify-between w-full md:w-[45%]'>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/20 text-white">
                  {badge}
                </span>
              )}
              {age && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/30 border border-white/10 text-amber-200">
                  {age}
                </span>
              )}
              <span className="ml-auto text-xs uppercase tracking-widest font-mono text-white/50">0{i + 1}</span>
            </div>

            <h2 className='text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-3'>
              {title}
            </h2>
            <p className='text-sm sm:text-base text-white/85 leading-relaxed font-light'>
              {description}
            </p>
          </div>

          <div className='pt-5 mt-4'>
            <a
              href='/iletisim'
              className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white font-bold text-sm hover:bg-neutral-100 transition-all duration-300 shadow-lg group'
              style={{ color: color }}
            >
              <span>{ctaText}</span>
              <svg width='16' height='10' viewBox='0 0 22 12' fill='none' className="group-hover:translate-x-1 transition-transform">
                <path d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z' fill='currentColor' />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className='relative w-full md:w-[55%] h-48 sm:h-60 md:h-auto rounded-2xl overflow-hidden shadow-xl border border-white/15 flex-shrink-0'>
          <motion.div className='w-full h-full' style={{ scale: imageScale }}>
            <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover' />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export interface StackingCardsProps {
  projects: ProjectData[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function StackingCards({ projects, title, subtitle, description, className }: StackingCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div className={cn('bg-[#0b0305] text-white relative', className)} ref={container}>
      {/* Header */}
      {(title || subtitle || description) && (
        <div className='pt-16 pb-10 px-4 max-w-4xl mx-auto text-center'>
          {subtitle && (
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-red-500/30 text-rose-200 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4'>
              <span>✨ {subtitle}</span>
            </div>
          )}
          {title && (
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-4'>
              {title}
            </h2>
          )}
          {description && (
            <p className='text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl mx-auto'>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Cards */}
      <div className='pb-16'>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project.link}
              title={project.title}
              color={project.color}
              description={project.description}
              badge={project.badge}
              age={project.age}
              ctaText={project.ctaText}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}
