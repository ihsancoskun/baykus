import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // NOTE: do not add `raw`/max-width screens here — Tailwind then disables all `min-[...]` variants
      // (the navbar relies on `min-[860px]`). Use `[@media(min-height:...)]:` arbitrary variants instead.
      fontFamily: {
        sans: ['var(--font-garamond)', 'serif'],
        serif: ['var(--font-garamond)', 'serif'],
        mono: ['var(--font-garamond)', 'serif'],
      },
      colors: {
        'navy': {
          DEFAULT: '#091f6d', // Brand Navy
          100: '#152c7a',
          200: '#1c3385',
        },
        'red': {
          DEFAULT: '#de252a', // Brand Red
          600: '#de252a',
        },
        'cream': {
          DEFAULT: '#f9f9f9',
          100: '#f0f0f0',
        },
        'gold': {
          DEFAULT: '#d4af37',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
