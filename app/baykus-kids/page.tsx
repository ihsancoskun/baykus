import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";

export const metadata: Metadata = {
  title: "Baykuş Kids Çocuklar İçin Fransızca | Baykuş Akademi",
  description: "Çocuklar için oyun, sanat ve etkileşimli atölyelerle zenginleştirilmiş erken yaş Fransızca eğitim programları.",
  alternates: { canonical: "/baykus-kids" },
};

export default function BaykusKidsPage() {
  const programs = [
    {
      title: "Fransızca Etkinlik Atölyeleri",
      img: "/media/kids-1.png",
      alt: "Baykuş Kids Fransızca etkinlik atölyesinde eğitmen ve çocuklar",
      desc: "Oyun, sanat, hikâye anlatımı ve müzikle harmanlanmış interaktif atölyelerimizde çocuklarımız Fransızcayı doğal bir iletişim aracı olarak eğlenerek öğreniyorlar.",
    },
    {
      title: "Çocuklar İçin Özel Pedagojik Müfredat",
      img: "/media/kids-2.png",
      alt: "Baykuş Kids resimli Fransızca sözlük ve hikaye kitaplarıyla çalışan öğrenciler",
      desc: "Her yaş grubunun bilişsel gelişimine uygun olarak seçilmiş Fransızca çocuk edebiyatı kaynakları, görsel kartlar ve DELF Prim hazırlık materyalleriyle sağlam bir temel oluşturuyoruz.",
    },
    {
      title: "Zengin Fransızca Çocuk Kütüphanesi & Uzman Eğitmenler",
      img: "/media/kids-3.png",
      alt: "Baykuş Akademi çocuk kütüphanesinde Fransızca kitaplarla öğrenciler",
      desc: "Ana dili Fransızca olan ve pedagojik formasyona sahip uzman eğitmen kadromuz eşliğinde, çocuklarımız doğru telaffuz ve Fransız kültürüyle erken yaşta tanışıyor.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero
        title="Baykuş Kids"
        bgImage="/media/bg/language_bg.jpg"
        subtitle="Erken yaşta başlayan kusursuz Fransızca eğitimiyle çocuklarınıza yalnızca yeni bir dil değil, uluslararası bir vizyon kazandırıyoruz."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif text-navy">
            Oyun, Kültür ve Pedagojiyle Doğal Dil Edinimi
          </h2>
          <p className="text-base md:text-lg text-navy-100 font-light leading-relaxed">
            Nişantaşı’ndaki akademimizde çocuklara özel tasarlanmış kütüphanemiz ve interaktif öğrenme ortamımızla, okul öncesi dönemden ilköğretim ve ortaokul kademelerine kadar her yaş grubuna özel programlar sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="relative h-60 w-full overflow-hidden">
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-navy-100 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-navy text-white rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif">
            Çocuğunuz İçin Ücretsiz Tanışma Dersine Katılın
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base font-light">
            Baykuş Kids atölyelerimiz, yaş gruplarımız ve ders saatlerimiz hakkında bilgi almak için bizimle hemen iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="min-h-[44px] inline-flex items-center justify-center px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors"
            >
              İletişime Geçin
            </Link>
            <a
              href="https://wa.me/905336569983?text=Merhaba,%20Bayku%C5%9F%20Kids%20programlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-full transition-colors"
            >
              WhatsApp ile Bilgi Alın
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
