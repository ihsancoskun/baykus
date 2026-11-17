import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";

export const metadata: Metadata = {
  title: "Çerez Politikası | Baykuş Akademi",
  description: "Baykuş Akademi web sitesi çerez (cookie) kullanımı, analitik çerezler ve tercih yönetimi hakkında bilgilendirme.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default function CerezPolitikasiPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero
        title="Çerez (Cookie) Politikası"
        bgImage="/media/bg/consulting_bg.jpg"
        subtitle="Web sitemizde kullanılan çerez türleri ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgiler."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-14 space-y-6 text-navy-100 leading-relaxed text-base md:text-lg font-light">
          <h2 className="text-2xl md:text-3xl font-serif text-navy">1. Çerez Nedir?</h2>
          <p>
            Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Sitemizin güvenli ve verimli çalışmasını sağlamak amacıyla kullanılmaktadır.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">2. Kullanılan Çerez Türleri</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerinin (form güvenliği, çerez tercihi kaydı) çalışması için gereklidir.</li>
            <li><strong>Analitik ve Performans Çerezleri (Google Analytics 4):</strong> Yalnızca açık onayınız olması halinde, ziyaretçilerin sitemizi nasıl kullandığını anonim olarak analiz etmek ve kullanıcı deneyimini iyileştirmek için kullanılır.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">3. Çerez Tercihlerinin Yönetimi</h2>
          <p>
            Sitemize ilk girişinizde sunulan çerez onay penceresi üzerinden analitik çerezleri kabul edebilir veya reddedebilirsiniz. Ayrıca tarayıcınızın ayarlarından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz.
          </p>
        </article>
      </section>
    </main>
  );
}
