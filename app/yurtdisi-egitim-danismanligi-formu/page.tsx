"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  Languages, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  HelpCircle,
  Building2,
  Phone,
  Mail,
  Award,
  Sparkles,
  FileCheck
} from "lucide-react";

export default function YurtdisiDanismanlikFormuPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Adım 1: Kişisel & İletişim
    adSoyad: "",
    dogumTarihi: "",
    tcKimlikNo: "",
    email: "",
    telefon: "",
    veliAdSoyad: "",
    veliTelefon: "",
    sehir: "",

    // Adım 2: Akademik Geçmiş & Notlar
    okul: "",
    sinif: "11. Sınıf",
    bolum: "Sayısal",
    lise1Ortalama: "",
    lise2Ortalama: "",
    lise3Ortalama: "",

    // Adım 3: Dil Yeterlilikleri
    delfB2Durum: "Gireceğim / Hazırlanıyorum",
    delfB2Notu: "",
    dalfC1Durum: "Yok",
    dalfC1Notu: "",
    dalfC2Durum: "Yok",
    dalfC2Notu: "",
    ieltsDurum: "Yok",
    ieltsNotu: "",
    digerDiller: "",

    // Adım 4: Fransa Tercihleri & Hedefler
    istenenBolumler: "",
    istenenSehirler: "",
    yksDurumu: "YKS'ye de gireceğim",
    bPlani: "",
    ozelOkulBasvurusu: "Danışmanımla Değerlendirelim",
    baskaUlkeler: "Hayır",
    konaklamaTercihi: "Öğrenci Yurdu",
    ekNotlar: "",
    kvkkOnay: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkOnay) {
      alert("Lütfen devam etmek için KVKK ve Aydınlatma Metnini onaylayınız.");
      return;
    }

    setIsSubmitting(true);
    const generatedRefCode = "BYK-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(generatedRefCode);

    try {
      const res = await fetch("/api/danismanlik-basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referenceCode: generatedRefCode
        })
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        console.warn("E-posta gönderim bildirimi:", result.error);
      }
    } catch (err) {
      console.error("Gönderim hatası:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const steps = [
    { id: 1, title: "Kişisel & İletişim", icon: User, desc: "Aday & Veli Bilgileri" },
    { id: 2, title: "Akademik Başarı", icon: GraduationCap, desc: "Okul & Not Ortalamaları" },
    { id: 3, title: "Dil Yeterlilikleri", icon: Languages, desc: "DELF / DALF / IELTS" },
    { id: 4, title: "Fransa Tercihleri", icon: Compass, desc: "Bölümler & Gelecek Planı" },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-navy pb-24">
      {/* Hero Header Section */}
      <section className="relative bg-navy text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Baykuş Akademi • Akademik Değerlendirme
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-white mb-6 leading-tight">
            Yurt Dışı Eğitim & Üniversite Danışmanlığı <br />
            <span className="italic text-red-500 font-light">Ön Değerlendirme Formu</span>
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg font-sans font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Campus France, Sorbonne ve Fransa’nın seçkin Grandes Écoles kabulleri için adayımızın potansiyelini doğru analiz edip size özel stratejik yol haritasını hazırlıyoruz.
          </p>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/70 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>KVKK Güvencesi & Gizlilik</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4 text-gold shrink-0" />
              <span>Campus France & Parcoursup</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Ücretsiz Ön Değerlendirme</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Step Progress Card */}
        {!isSubmitted && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {steps.map((step) => {
                const IconComponent = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      isActive 
                        ? "bg-navy text-white shadow-md ring-2 ring-navy/10" 
                        : isCompleted
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-200 cursor-pointer"
                        : "bg-gray-50/80 text-gray-400 border border-gray-100 cursor-default"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-red-600 text-white"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <IconComponent className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wider font-semibold opacity-75">
                        Adım 0{step.id}
                      </div>
                      <div className="text-xs sm:text-sm font-medium truncate">
                        {step.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Percentage Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <motion.div 
                className="bg-red-600 h-full rounded-full"
                initial={false}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Form Body or Success State */}
        <div className="bg-white rounded-2xl shadow-xl shadow-navy/5 border border-gray-100 p-6 sm:p-10 md:p-12">
          {isSubmitted ? (
            /* Başarı Ekranı */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-200">
                Başvurunuz Alındı
              </div>

              <h2 className="text-3xl font-serif text-navy mb-4">
                Tebrikler, Bilgileriniz Bize Ulaştı!
              </h2>

              <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-6 font-light">
                Sayın <strong className="text-navy font-semibold">{formData.adSoyad}</strong>, yurt dışı eğitim danışmanlığı ön değerlendirme formunuz başarıyla kayıt altına alınmıştır. 
                Uzman danışmanlarımız akademik geçmişinizi inceledikten sonra en geç <strong className="text-navy font-semibold">24 saat içerisinde</strong> tarafınızla iletişime geçecektir.
              </p>

              <div className="bg-[#FDFBF7] border border-gray-200 rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                  Başvuru Referans Kodunuz:
                </div>
                <div className="text-xl font-mono font-bold text-red-600 tracking-wider">
                  {referenceCode}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Lütfen danışmanlarımızla yapacağınız görüşmelerde bu referans kodunu saklayınız.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/905336569983"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-xl font-medium transition shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp'tan Danışmanımıza Yazın
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition"
                >
                  Yeni Bir Form Doldur
                </button>
              </div>
            </motion.div>
          ) : (
            /* Aktif Form Adımları */
            <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext}>
              <AnimatePresence mode="wait">
                {/* ADIM 1: Kişisel & İletişim Bilgileri */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-gray-100 pb-4 mb-6">
                      <h2 className="text-2xl font-serif text-navy">Öğrenci & İletişim Bilgileri</h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
                        Sizinle ve gerektiğinde velinizle sağlıklı iletişim kurabilmemiz için temel bilgilerinizi giriniz.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Öğrenci Adı Soyadı <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="adSoyad"
                          required
                          value={formData.adSoyad}
                          onChange={handleChange}
                          placeholder="Örn: Deniz Yılmaz"
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Doğum Tarihi <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="date"
                          name="dogumTarihi"
                          required
                          value={formData.dogumTarihi}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          T.C. Kimlik Numarası
                        </label>
                        <input
                          type="text"
                          name="tcKimlikNo"
                          maxLength={11}
                          value={formData.tcKimlikNo}
                          onChange={handleChange}
                          placeholder="Örn: 11 Haneli TC Kimlik No"
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                        <span className="text-[11px] text-gray-400">Yalnızca resmi kayıt dosyası oluşturulurken kullanılır.</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          İkamet Edilen Şehir
                        </label>
                        <input
                          type="text"
                          name="sehir"
                          value={formData.sehir}
                          onChange={handleChange}
                          placeholder="Örn: İstanbul, Ankara, İzmir..."
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-red-600" />
                          Öğrenci E-posta Adresi <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ogrenci@gmail.com"
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-red-600" />
                          Öğrenci Telefon / WhatsApp <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telefon"
                          required
                          value={formData.telefon}
                          onChange={handleChange}
                          placeholder="0 5XX XXX XX XX"
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>
                    </div>

                    {/* Veli Bilgileri Bölümü */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-gold" />
                        Veli İletişim Bilgileri (İsteğe Bağlı)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                            Veli Adı Soyadı
                          </label>
                          <input
                            type="text"
                            name="veliAdSoyad"
                            value={formData.veliAdSoyad}
                            onChange={handleChange}
                            placeholder="Örn: Ayşe Yılmaz (Anne)"
                            className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                            Veli Telefon Numarası
                          </label>
                          <input
                            type="tel"
                            name="veliTelefon"
                            value={formData.veliTelefon}
                            onChange={handleChange}
                            placeholder="0 5XX XXX XX XX"
                            className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ADIM 2: Akademik Geçmiş & Not Ortalamaları */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-gray-100 pb-4 mb-6">
                      <h2 className="text-2xl font-serif text-navy">Mevcut Eğitim & Akademik Başarı</h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
                        Fransa üniversiteleri için lise transkripti ve karne ortalamaları kritik öneme sahiptir.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Okuduğu / Mezun Olduğu Okul <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="okul"
                          required
                          value={formData.okul}
                          onChange={handleChange}
                          placeholder="Örn: Saint-Benoît Fransız Lisesi, Galatasaray Lisesi..."
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Sınıf Seviyesi <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="sinif"
                          value={formData.sinif}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        >
                          <option value="9. Sınıf">9. Sınıf</option>
                          <option value="10. Sınıf">10. Sınıf</option>
                          <option value="11. Sınıf">11. Sınıf</option>
                          <option value="12. Sınıf">12. Sınıf</option>
                          <option value="Lise Mezunu">Lise Mezunu</option>
                          <option value="Üniversite Öğrencisi">Üniversite Öğrencisi (Yatay Geçiş)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                        Lise Alan / Branş <span className="text-red-600">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["Sayısal", "Eşit Ağırlık", "Sözel", "Yabancı Dil"].map((b) => (
                          <label
                            key={b}
                            className={`flex items-center justify-center p-3 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition text-center ${
                              formData.bolum === b
                                ? "bg-navy text-white border-navy shadow-sm"
                                : "bg-[#FDFBF7] text-gray-700 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="bolum"
                              value={b}
                              checked={formData.bolum === b}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            {b}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Not Ortalamaları Grubu */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Yıl Sonu Not Ortalamaları (100 Üzerinden)
                        </label>
                        <span className="text-xs text-gray-400">1. Dönem veya Yıl Sonu yaklaşık puan</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">Lise 1 (9. Sınıf) Ortalaması</label>
                          <input
                            type="text"
                            name="lise1Ortalama"
                            value={formData.lise1Ortalama}
                            onChange={handleChange}
                            placeholder="Örn: 86.40"
                            className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">Lise 2 (10. Sınıf) Ortalaması</label>
                          <input
                            type="text"
                            name="lise2Ortalama"
                            value={formData.lise2Ortalama}
                            onChange={handleChange}
                            placeholder="Örn: 89.20"
                            className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">Lise 3 (11. Sınıf) Ortalaması</label>
                          <input
                            type="text"
                            name="lise3Ortalama"
                            value={formData.lise3Ortalama}
                            onChange={handleChange}
                            placeholder="Örn: 91.50"
                            className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                          />
                        </div>
                      </div>

                      <div className="mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>İpucu:</strong> Henüz notu belli olmayan sınıflar için boş bırakabilir veya mevcut son karne/dönem ortalamanızı yazabilirsiniz.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ADIM 3: Dil Yeterlilikleri */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-gray-100 pb-4 mb-6">
                      <h2 className="text-2xl font-serif text-navy">Yabancı Dil Yetkinlikleri</h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
                        Fransız üniversitelerine lisans başvurularında asgari B2 veya C1 düzeyinde dil belgesi gerekmektedir.
                      </p>
                    </div>

                    {/* DELF B2 */}
                    <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-200 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-red-600" />
                          DELF B2 Sınav Durumu
                        </label>
                        <select
                          name="delfB2Durum"
                          value={formData.delfB2Durum}
                          onChange={handleChange}
                          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-navy focus:outline-none focus:border-red-600"
                        >
                          <option value="Aldım / Puanım Var">Aldım / Puanım Var</option>
                          <option value="Gireceğim / Hazırlanıyorum">Gireceğim / Hazırlanıyorum</option>
                          <option value="Yok / Henüz Girmedim">Yok / Henüz Girmedim</option>
                        </select>
                      </div>

                      {formData.delfB2Durum === "Aldım / Puanım Var" && (
                        <div className="pt-2">
                          <label className="text-xs text-gray-600">DELF B2 Puanınız (100 Üzerinden):</label>
                          <input
                            type="text"
                            name="delfB2Notu"
                            value={formData.delfB2Notu}
                            onChange={handleChange}
                            placeholder="Örn: 74/100"
                            className="mt-1 w-full sm:w-1/2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-red-600"
                          />
                        </div>
                      )}
                    </div>

                    {/* DALF C1 & DALF C2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                            DALF C1 Durumu
                          </label>
                          <select
                            name="dalfC1Durum"
                            value={formData.dalfC1Durum}
                            onChange={handleChange}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-navy"
                          >
                            <option value="Yok">Yok</option>
                            <option value="Hazırlanıyorum">Hazırlanıyorum</option>
                            <option value="Aldım">Aldım</option>
                          </select>
                        </div>
                        {formData.dalfC1Durum === "Aldım" && (
                          <input
                            type="text"
                            name="dalfC1Notu"
                            value={formData.dalfC1Notu}
                            onChange={handleChange}
                            placeholder="Puan (Örn: 68/100)"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-navy"
                          />
                        )}
                      </div>

                      <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                            DALF C2 Durumu
                          </label>
                          <select
                            name="dalfC2Durum"
                            value={formData.dalfC2Durum}
                            onChange={handleChange}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-navy"
                          >
                            <option value="Yok">Yok</option>
                            <option value="Hazırlanıyorum">Hazırlanıyorum</option>
                            <option value="Aldım">Aldım</option>
                          </select>
                        </div>
                        {formData.dalfC2Durum === "Aldım" && (
                          <input
                            type="text"
                            name="dalfC2Notu"
                            value={formData.dalfC2Notu}
                            onChange={handleChange}
                            placeholder="Puan (Örn: 65/100)"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-navy"
                          />
                        )}
                      </div>
                    </div>

                    {/* IELTS / İngilizce */}
                    <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-200 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                            İngilizce Sınavı (IELTS / TOEFL)
                          </label>
                          <p className="text-[11px] text-gray-500">İngilizce eğitim veren programlar veya çift diplomalar için</p>
                        </div>
                        <select
                          name="ieltsDurum"
                          value={formData.ieltsDurum}
                          onChange={handleChange}
                          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-navy focus:outline-none focus:border-red-600"
                        >
                          <option value="Yok">Yok / Girilmedi</option>
                          <option value="IELTS Aldım">IELTS Aldım</option>
                          <option value="TOEFL Aldım">TOEFL Aldım</option>
                          <option value="Gireceğim">Gireceğim</option>
                        </select>
                      </div>

                      {(formData.ieltsDurum === "IELTS Aldım" || formData.ieltsDurum === "TOEFL Aldım") && (
                        <div className="pt-2">
                          <input
                            type="text"
                            name="ieltsNotu"
                            value={formData.ieltsNotu}
                            onChange={handleChange}
                            placeholder="Sınav Puanınız (Örn: IELTS 7.0 veya TOEFL 95)"
                            className="w-full sm:w-1/2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-red-600"
                          />
                        </div>
                      )}
                    </div>

                    {/* Varsa Diğer Diller */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                        Varsa Bildiğiniz Diğer Diller & Seviyeleri
                      </label>
                      <input
                        type="text"
                        name="digerDiller"
                        value={formData.digerDiller}
                        onChange={handleChange}
                        placeholder="Örn: İspanyolca (A2), Almanca (B1)..."
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ADIM 4: Fransa Tercihleri & Hedefler */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-gray-100 pb-4 mb-6">
                      <h2 className="text-2xl font-serif text-navy">Fransa Tercihleri & Gelecek Planı</h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
                        Hedeflediğiniz üniversiteler, bölümler ve alternatif kariyer planınız.
                      </p>
                    </div>

                    {/* Bölüm ve Şehir Tercihleri */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Fransa'da Okumak İstediğiniz Bölüm(ler) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="istenenBolumler"
                          required
                          value={formData.istenenBolumler}
                          onChange={handleChange}
                          placeholder="Örn: Hukuk, Ekonomi, Bilgisayar Mühendisliği, Mimarlık, Siyaset Bilimi (Sciences Po)..."
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Özellikle Tercih Ettiğiniz Şehirler
                        </label>
                        <input
                          type="text"
                          name="istenenSehirler"
                          value={formData.istenenSehirler}
                          onChange={handleChange}
                          placeholder="Örn: Paris, Lyon, Bordeaux, Toulouse, Strasbourg, Lille..."
                          className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                        />
                      </div>
                    </div>

                    {/* YKS Hedefi */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                        YKS Sınavına Girecek misiniz? <span className="text-red-600">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["YKS'ye de gireceğim", "Sadece Yurt Dışı / Fransa odaklıyım"].map((opt) => (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium cursor-pointer transition ${
                              formData.yksDurumu === opt
                                ? "bg-navy text-white border-navy shadow-sm"
                                : "bg-[#FDFBF7] text-gray-700 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="yksDurumu"
                              value={opt}
                              checked={formData.yksDurumu === opt}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              formData.yksDurumu === opt ? "border-white bg-red-600" : "border-gray-400"
                            }`}>
                              {formData.yksDurumu === opt && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* B Planı */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                        Varsa B Planınız Nedir?
                      </label>
                      <input
                        type="text"
                        name="bPlani"
                        value={formData.bPlani}
                        onChange={handleChange}
                        placeholder="Örn: Türkiye'de vakıf üniversitesi, Belçika/İtalya alternatifleri, mezuna kalma..."
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition"
                      />
                    </div>

                    {/* 3'lü Seçim Kutuları (Özel Okul, Başka Ülke, Konaklama) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Özel Okul Başvurusu
                        </label>
                        <select
                          name="ozelOkulBasvurusu"
                          value={formData.ozelOkulBasvurusu}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-gray-200 rounded-xl text-xs sm:text-sm text-navy focus:outline-none focus:border-red-600"
                        >
                          <option value="Danışmanımla Değerlendirelim">Danışmanımla Değerlendirelim</option>
                          <option value="Evet (Devlet + Özel)">Evet (Devlet + Özel)</option>
                          <option value="Yalnızca Devlet Üniversiteleri">Yalnızca Devlet Üniversiteleri</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Başka Ülkelere Başvuru
                        </label>
                        <select
                          name="baskaUlkeler"
                          value={formData.baskaUlkeler}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-gray-200 rounded-xl text-xs sm:text-sm text-navy focus:outline-none focus:border-red-600"
                        >
                          <option value="Hayır, Sadece Fransa">Hayır, Sadece Fransa</option>
                          <option value="Evet, Düşünüyoruz">Evet, Düşünüyoruz (İtalya, Belçika, vb.)</option>
                          <option value="Kararsızım">Kararsızım</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                          Konaklama Tercihi
                        </label>
                        <select
                          name="konaklamaTercihi"
                          value={formData.konaklamaTercihi}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-gray-200 rounded-xl text-xs sm:text-sm text-navy focus:outline-none focus:border-red-600"
                        >
                          <option value="Öğrenci Yurdu (CROUS)">Öğrenci Yurdu (CROUS)</option>
                          <option value="Özel Yurt / Rezidans">Özel Yurt / Rezidans</option>
                          <option value="Kiralık Ev / Stüdyo">Kiralık Ev / Stüdyo</option>
                          <option value="Fark Etmez">Fark Etmez</option>
                        </select>
                      </div>
                    </div>

                    {/* Ek Notlar */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-navy">
                        Eklemek İstediğiniz Detaylar veya Sorularınız
                      </label>
                      <textarea
                        rows={3}
                        name="ekNotlar"
                        value={formData.ekNotlar}
                        onChange={handleChange}
                        placeholder="Danışmanlarımızın önceden bilmesini istediğiniz özel durumlar, akademik başarılar, projeler vb..."
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-navy font-sans text-sm transition resize-none"
                      />
                    </div>

                    {/* KVKK Onay Kutusu */}
                    <div className="pt-4 border-t border-gray-100">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="kvkkOnay"
                          checked={formData.kvkkOnay}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300"
                        />
                        <span className="text-xs text-gray-600 leading-relaxed">
                          Paylaştığım kişisel ve akademik bilgilerin, Baykuş Akademi eğitim danışmanlığı süreci kapsamında değerlendirilmesine ve tarafımla iletişime geçilmesine <strong>KVKK Aydınlatma Metni</strong> doğrultusunda onay veriyorum.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Alt Butonları (Önceki - Sonraki - Gönder) */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Önceki Adım
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy hover:bg-navy-100 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition group"
                  >
                    Sonraki Adım
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Başvuruyu Tamamla & Gönder
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Güven ve İletişim Bilgi Rozeti */}
        <div className="mt-8 text-center text-xs text-gray-500 font-light space-y-1">
          <p>
            Herhangi bir sorunuz için bize her zaman ulaşabilirsiniz: 
            <a href="tel:+905336569983" className="font-semibold text-navy ml-1 hover:underline">0 533 656 99 83</a> veya 
            <a href="mailto:baykusakademisi@gmail.com" className="font-semibold text-navy ml-1 hover:underline">baykusakademisi@gmail.com</a>
          </p>
          <p className="text-gray-400">Nişantaşı, Şişli / İstanbul • Baykuş Akademi</p>
        </div>
      </div>
    </main>
  );
}
