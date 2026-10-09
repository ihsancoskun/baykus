import { ArrowRight, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-navy pt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-200/40 via-navy to-navy z-0"></div>
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center justify-center gap-4 text-[0.625rem] font-sans font-semibold tracking-[0.3em] text-gold uppercase mb-8 animate-fade-in-up">
          <span className="w-8 h-[1px] bg-gold/40"></span>
          40 Yıllık Fransız Ekolü Mükemmeliyeti
          <span className="w-8 h-[1px] bg-gold/40"></span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6 tracking-tight">
          Geleceğinizi <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 italic pr-4">
            Fransız Zarafetiyle
          </span>
          <br className="hidden md:block" /> Şekillendirin.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl text-cream-100 max-w-2xl font-light leading-relaxed mb-12">
          DELF/DALF başarılarından Galatasaray Üniversitesi iç sınavlarına ve Fransa'nın en seçkin üniversitelerine uzanan eşsiz akademik yolculuğunuzda, hedeflerinizi gerçeğe dönüştüren rehberiniz.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
          <button className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-gold hover:bg-yellow-500 text-navy px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <span>Eğitimlere Göz At</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300">
            <span>Ücretsiz Danışmanlık</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-cream-100/50">
          <span className="text-xs uppercase tracking-widest mb-2 font-medium">Keşfet</span>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
