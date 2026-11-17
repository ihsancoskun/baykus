import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Baykuş Akademi",
  description: "Baykuş Akademi 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni ve veri işleme esasları.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero
        title="KVKK Aydınlatma Metni"
        bgImage="/media/bg/consulting_bg.jpg"
        subtitle="6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin güvenliği ve işlenme esasları."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-14 space-y-6 text-navy-100 leading-relaxed text-base md:text-lg font-light">
          <h2 className="text-2xl md:text-3xl font-serif text-navy">1. Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong>Baykuş Akademi</strong> (Sezai Selek Sokak Çağlayan Apartmanı No:17 Daire 8 Kat 3 Nişantaşı, Şişli / İstanbul) tarafından aşağıda açıklanan kapsamda işlenebilecektir.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">2. İşlenen Kişisel Veriler ve İşleme Amaçları</h2>
          <p>
            Web sitemiz üzerindeki iletişim ve yurt dışı eğitim danışmanlığı ön değerlendirme formları aracılığıyla paylaştığınız kimlik (ad, soyad, doğum tarihi), iletişim (telefon numarası, e-posta adresi, şehir), veli iletişim bilgileri ve akademik geçmiş/dil yeterlilik verileriniz:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Yurt dışı üniversite ve lise başvuru süreçlerinin değerlendirilmesi,</li>
            <li>Seviye tespit, ders planlaması ve akademik danışmanlık hizmetlerinin sunulması,</li>
            <li>Tarafınızla ve gerektiğinde velinizle eğitim süreçleri hakkında iletişime geçilmesi,</li>
            <li>İlgili mevzuat uyarınca yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
          <p>amaçlarıyla sınırlı ve ölçülü olarak işlenmektedir.</p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">3. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, açık rızanız olmaksızın üçüncü kişilerle paylaşılmamakta; yalnızca başvuru sürecinin yürütülmesi için zorunlu olan teknik altyapı sağlayıcıları ve kanunen yetkili kamu kurumlarıyla KVKK’nın 8. ve 9. maddelerine uygun olarak paylaşılabilmektedir.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">4. Veri Toplama Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz, web sitemizdeki elektronik formlar, e-posta ve telefon kanalları üzerinden elektronik ortamda; KVKK’nın 5. maddesinde belirtilen “bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması” ve “açık rıza” hukuki sebeplerine dayanılarak toplanmaktadır.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-navy">5. İlgili Kişinin Hakları (KVKK Madde 11)</h2>
          <p>
            KVKK’nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini ve silinmesini talep etme haklarına sahipsiniz. Taleplerinizi <a href="mailto:baykusakademisi@gmail.com" className="text-red-600 underline font-medium">baykusakademisi@gmail.com</a> adresine yazılı olarak iletebilirsiniz.
          </p>
        </article>
      </section>
    </main>
  );
}
