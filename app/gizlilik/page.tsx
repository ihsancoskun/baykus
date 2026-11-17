import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Baykuş Akademi",
  description: "Baykuş Akademi web sitesi gizlilik politikası, kişisel verilerin korunması ve bilgi güvenliği ilkeleri.",
  alternates: { canonical: "/gizlilik" },
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero
        title="Gizlilik Politikası"
        bgImage="/media/bg/consulting_bg.jpg"
        subtitle="Öğrencilerimizin ve velilerimizin bilgi güvenliği ve gizliliği en temel önceliğimizdir."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-14 space-y-6 text-navy-100 leading-relaxed text-base md:text-lg font-light">
          <h2 className="text-2xl md:text-3xl font-serif text-navy">1. Gizlilik İlkemiz</h2>
          <p>
            <strong>Baykuş Akademi</strong> olarak, web sitemizi ziyaret eden kullanıcılarımızın, öğrencilerimizin ve velilerimizin paylaştığı tüm bilgilerin gizliliğini korumayı taahhüt ediyoruz.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">2. Toplanan Bilgiler ve Kullanımı</h2>
          <p>
            İletişim ve danışmanlık başvuru formları üzerinden ilettiğiniz bilgiler yalnızca akademik danışmanlarımız tarafından başvurunuzu değerlendirmek ve size geri dönüş sağlamak amacıyla kullanılır. Bilgileriniz hiçbir koşulda ticari amaçla üçüncü taraflara satılmaz veya kiralanmaz.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">3. Veri Güvenliği</h2>
          <p>
            Web sitemiz üzerinden gerçekleştirilen tüm veri iletişimi SSL (Secure Sockets Layer) şifreleme protokolü ile korunmaktadır. Elektronik formlar üzerinden gönderilen veriler yalnızca yetkili eğitim danışmanlarımızın erişimine açıktır.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">4. İletişim</h2>
          <p>
            Gizlilik politikamızla ilgili her türlü soru ve talebiniz için <a href="mailto:baykusakademisi@gmail.com" className="text-red-600 underline font-medium">baykusakademisi@gmail.com</a> e-posta adresinden veya <a href="tel:+905336569983" className="text-red-600 underline font-medium">0 533 656 99 83</a> numaralı telefondan bizimle iletişime geçebilirsiniz.
          </p>
        </article>
      </section>
    </main>
  );
}
