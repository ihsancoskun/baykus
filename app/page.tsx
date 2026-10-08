import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Demo from "@/components/demo";
import Services from "@/components/Services";
import AboutFounder from "@/components/AboutFounder";
import Programs from "@/components/Programs";
import VideoShowcase from "@/components/VideoShowcase";
import BaykusKids from "@/components/BaykusKids";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      {/* Morphing Full Screen Hero */}
      <div className="w-full">
        <Demo />
      </div>

      <div className="w-full">
        <Programs />
      </div>

      <div className="w-full">
        <AboutFounder />
      </div>

      <div className="w-full">
        <BentoGrid />
      </div>

      {/* Videos Section */}
      <div className="w-full">
        <VideoShowcase />
      </div>

      {/* Services Section */}
      <div className="w-full">
        <Services />
      </div>

      {/* Baykuş Kids Section */}
      <div className="w-full">
        <BaykusKids />
      </div>
    </main>
  );
}

