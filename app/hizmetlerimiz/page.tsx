import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";

export const metadata: Metadata = {
  title: "Eğitim ve Danışmanlık Hizmetlerimiz | Baykuş Akademi",
  description: "DELF/DALF hazırlık, GSÜ İç Sınavı, Fransız liselerine takviye, Baccalauréat ve Fransa üniversite başvuru danışmanlığı hizmetlerimiz.",
  alternates: { canonical: "/hizmetlerimiz" },
};

const SERVICE_GROUPS = [
  {
    category: "Yurt Dışı Eğitim & Üniversite Danışmanlığı",
    items: [
      { title: "Fransa Üniversiteleri Başvuru Danışmanlığı", desc: "Campus France, Parcoursup ve Grandes Écoles süreçlerinde uçtan uca stratejik başvuru yönetimi.", href: "/dersler/fransiz-universiteler-basvuru-danismanligi" },
      { title: "Genel Yurt Dışı Üniversite Danışmanlığı", desc: "Avrupa, İngiltere ve Kuzey Amerika'nın seçkin üniversitelerine kabul ve portfolyo danışmanlığı.", href: "/dersler/yurtdisi-universiteler-basvuru-danismanligi" },
      { title: "Online Ön Değerlendirme Formu", desc: "Akademik profilinizi analiz edip size özel yol haritası oluşturmamız için başvuru formu.", href: "/yurtdisi-egitim-danismanligi-formu" },
    ],
  },
  {
    category: "Uluslararası Dil ve Akademik Sınav Hazırlığı",
    items: [
      { title: "DELF & DALF Hazırlık", desc: "A1'den C2 seviyesine kadar uluslararası geçerliliğe sahip Fransızca yeterlilik diplomalarına hazırlık.", href: "/dersler/delf-dalf" },
      { title: "GSÜ İç Sınavı Hazırlık", desc: "Galatasaray Üniversitesi iç sınavına (GSÜÖSYS) 40 yıllık deneyimle hedef odaklı hazırlık.", href: "/dersler/gsicsinavlar" },
      { title: "Fransız Liseleri İç Sınav & Hazırlık Atlama", desc: "Fransız liselerine doğrudan geçiş, hazırlık atlama ve pasaj sınavlarına özel çalışma programları.", href: "/dersler/fransiz-liselerine-hazirlik" },
      { title: "Baccalauréat & Brevet", desc: "Pierre Loti ve Charles de Gaulle müfredatlarına tam uyumlu Baccalauréat ve Brevet sınav hazırlığı.", href: "/dersler/baccalaureat" },
      { title: "TCF / ANF, SAT, TOEFL, Check Point ve YDS", desc: "Uluslararası ve ulusal dil/akademik sınavlar için birebir simülasyon ve strateji dersleri.", href: "/dersler/sinavlara-hazirlik" },
    ],
  },
  {
    category: "Okul Destek & Yabancı Dil Eğitimleri",
    items: [
      { title: "Fransızca Müfredat Branş Dersleri", desc: "Fransız liseleri öğrencileri için Fransızca Matematik, Fizik, Kimya, Biyoloji, Tarih ve Edebiyat.", href: "/dersler/fransizca-matematik-dersleri" },
      { title: "İngilizce Müfredat Branş Dersleri", desc: "IB, AP ve uluslararası müfredat öğrencileri için İngilizce Matematik, Fizik, Kimya, Biyoloji ve Edebiyat.", href: "/dersler/ingilizce-matematik-dersleri" },
      { title: "Yabancı Dil Programları", desc: "Fransızca, İngilizce, Almanca, İspanyolca, İtalyanca ve yabancılar için Türkçe özel/grup dersleri.", href: "/dersler/fransizca" },
      { title: "Baykuş Kids (Çocuklar İçin Fransızca)", desc: "Erken yaşta oyun, atölye ve özel pedagojik materyallerle Fransızca edinimi.", href: "/baykus-kids" },
    ],
  },
];

export default function HizmetlerimizPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero
        title="Hizmetlerimiz"
        bgImage="/media/bg/exam_bg.jpg"
        subtitle="Fransız ekolünde 40 yıllık deneyimimizle sunduğumuz tüm akademik eğitim, sınav hazırlık ve yurt dışı danışmanlık programlarımız."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {SERVICE_GROUPS.map((group) => (
          <div key={group.category} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-navy border-b border-gray-200 pb-3">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-red-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-navy group-hover:text-red-600 transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-navy-100 font-light leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-600 inline-flex items-center gap-1">
                    Detaylı İncele →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
