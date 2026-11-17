"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { trackEvent } from "@/lib/analytics";

const COURSE_OPTIONS = [
  "Fransa'daki Üniversitelere Başvuru Danışmanlığı",
  "Genel Yurt Dışı Üniversite Başvuru Danışmanlığı",
  "DELF / DALF Sınav Hazırlığı",
  "GSÜ İç Sınavı Hazırlığı",
  "Fransız Liselerine Doğrudan Geçiş & Hazırlık Atlama",
  "Fransız Liseleri Pasaj Sınavı Hazırlığı",
  "Baccalauréat Hazırlık Programı",
  "Brevet Hazırlık Programı",
  "TCF / ANF Sınav Hazırlığı",
  "SAT (Genel & Fransızca) Hazırlığı",
  "TOEFL iBT Hazırlığı",
  "Cambridge Check Point Hazırlığı",
  "YDS Fransızca / İngilizce Hazırlığı",
  "Fransızca Müfredat Okul Takviye (Matematik, Fizik, Kimya, Biyoloji, Tarih, Edebiyat)",
  "İngilizce Müfredat Okul Takviye (Matematik, Fizik, Kimya, Biyoloji, Edebiyat)",
  "Genel Fransızca Eğitimi",
  "İngilizce / Almanca / İspanyolca / İtalyanca Eğitimi",
  "Yabancılar İçin Türkçe (Turkish Lessons)",
  "Baykuş Kids (Çocuklar İçin Fransızca)",
  "Diğer / Genel Bilgi",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    kvkkOnay: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.kvkkOnay) {
      alert("Lütfen devam etmek için KVKK Aydınlatma Metnini onaylayınız.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      trackEvent("form_submit", { form_name: "iletisim", subject: formState.subject });
    } catch (err) {
      console.error("İletişim formu gönderim hatası:", err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", phone: "", subject: "", message: "", kvkkOnay: false });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormState((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "Telefon",
      details: "0 533 656 99 83",
      href: "tel:+905336569983",
      description: "Hafta içi ve Cumartesi 09:00 - 19:00 arası arayabilirsiniz.",
    },
    {
      icon: <Mail className="w-6 h-6 text-red-500" />,
      title: "E-posta",
      details: "baykusakademisi@gmail.com",
      href: "mailto:baykusakademisi@gmail.com",
      description: "Form bildirimleri ve sorularınız doğrudan bu adrese iletilir.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      title: "Adres",
      details: "Sezai Selek Sokak Çağlayan Apartmanı No:17 Daire 8 Kat 3",
      href: "https://maps.google.com/?q=Bayku%C5%9F+Akademi+Ni%C5%9Fanta%C5%9F%C4%B1+%C4%B0stanbul",
      description: "Nişantaşı, Şişli / İstanbul",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero
        title="İletişim"
        bgImage="/media/bg/consulting_bg.jpg"
        subtitle="Nişantaşı'ndaki akademimizde yüz yüze görüşmek veya eğitim programlarımız hakkında detaylı bilgi almak için bize ulaşın."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, idx) => (
            <motion.a
              href={info.href}
              target={info.title === "Adres" ? "_blank" : undefined}
              rel={info.title === "Adres" ? "noopener noreferrer" : undefined}
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              className="bg-white border border-gray-100 p-10 rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/10 group-hover:bg-red-600 transition-colors duration-500" />
              <div className="w-12 h-12 flex items-center justify-center mb-6">{info.icon}</div>
              <h2 className="text-xl font-serif text-navy mb-2">{info.title}</h2>
              <p className="text-lg font-sans font-medium text-navy/80 mb-3">{info.details}</p>
              <p className="text-sm font-sans font-light text-navy/60">{info.description}</p>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm">
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">Geleceğinizi Planlayalım</h2>
                <p className="font-sans font-light text-navy-100 leading-relaxed text-base md:text-lg">
                  Eğitim programlarımız, sınav hazırlıkları veya yurt dışı danışmanlık hizmetlerimiz hakkında detaylı bilgi almak için formu doldurabilirsiniz. Gönderdiğiniz mesajlar doğrudan <strong className="font-medium text-navy">baykusakademisi@gmail.com</strong> adresine iletilir.
                </p>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FDFBF7] border border-emerald-200 rounded-xl p-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-navy">Teşekkürler, Mesajınız Alındı!</h3>
                  <p className="font-sans font-light text-navy-100 text-sm md:text-base">
                    Talebiniz başarıyla <strong>baykusakademisi@gmail.com</strong> adresine iletilmiştir. Eğitim danışmanlarımız en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="min-h-[44px] px-6 py-2.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-sans font-semibold tracking-wider text-navy uppercase">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-3.5 text-navy font-sans text-base focus:outline-none focus:border-[#c85a3c] transition-colors"
                        placeholder="Örn: Elif Yılmaz"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-sans font-semibold tracking-wider text-navy uppercase">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-3.5 text-navy font-sans text-base focus:outline-none focus:border-[#c85a3c] transition-colors"
                        placeholder="Örn: 0555 555 5555"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-sans font-semibold tracking-wider text-navy uppercase">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-3.5 text-navy font-sans text-base focus:outline-none focus:border-[#c85a3c] transition-colors"
                        placeholder="Örn: ornek@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-sans font-semibold tracking-wider text-navy uppercase">
                        İlgilendiğiniz Konu *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-4 py-3.5 text-navy font-sans text-base focus:outline-none focus:border-[#c85a3c] transition-colors"
                      >
                        <option value="" disabled>
                          Lütfen eğitim / hizmet seçiniz
                        </option>
                        {COURSE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-sans font-semibold tracking-wider text-navy uppercase">
                      Mesajınız (İsteğe bağlı)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-3.5 text-navy font-sans text-base focus:outline-none focus:border-[#c85a3c] transition-colors resize-none"
                      placeholder="Belirtmek istediğiniz özel bir durum veya sorunuz varsa buraya yazabilirsiniz..."
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="kvkkOnay"
                        required
                        checked={formState.kvkkOnay}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded text-red-600 focus:ring-red-500 border-gray-300"
                      />
                      <span className="text-sm text-navy/80 leading-relaxed">
                        Paylaştığım iletişim bilgilerinin{" "}
                        <Link href="/kvkk" target="_blank" className="text-red-600 underline font-semibold">
                          KVKK Aydınlatma Metni
                        </Link>{" "}
                        ve{" "}
                        <Link href="/gizlilik" target="_blank" className="text-red-600 underline font-semibold">
                          Gizlilik Politikası
                        </Link>{" "}
                        kapsamında işlenmesine ve tarafımla iletişime geçilmesine onay veriyorum. *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formState.kvkkOnay}
                    className="w-full md:w-auto min-h-[48px] bg-[#263147] hover:bg-[#b3855a] transition-colors text-white font-sans text-sm tracking-[0.15em] px-10 py-4 font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    <span>{isSubmitting ? "GÖNDERİLİYOR..." : "MESAJI GÖNDER"}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden rounded-sm m-2">
            <iframe
              title="Baykuş Akademi Nişantaşı Harita Konumu"
              src="https://maps.google.com/maps?q=Bayku%C5%9F+Akademi+Ni%C5%9Fanta%C5%9F%C4%B1+%C4%B0stanbul&t=m&z=16&output=embed"
              className="absolute inset-0 w-full h-full border-0 transition-all duration-500 grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 border border-gray-100 pointer-events-none" />
          </div>
        </div>
      </section>
    </main>
  );
}
