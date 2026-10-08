"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-[#263147] hover:text-[#b3855a] transition-colors font-sans text-[11px] tracking-[0.15em] font-medium"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-[#FDFBF7] rounded-sm overflow-hidden border border-[#263147]/5 shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex justify-center items-center space-x-8 px-4 py-2"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-4 p-2 rounded-sm hover:bg-[#263147]/5 transition-colors group">
      <Image
        src={src}
        width={100}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-sm shadow-sm object-cover"
      />
      <div>
        <h4 className="text-[13px] font-medium mb-1 text-[#263147] group-hover:text-[#b3855a] transition-colors">
          {title}
        </h4>
        <p className="text-[#263147]/70 text-[11px] max-w-[14rem] line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="block p-2 rounded-sm text-[#263147] hover:bg-[#263147]/5 hover:text-[#b3855a] transition-colors font-sans text-[11px] tracking-wide"
    >
      {children}
    </Link>
  );
};
