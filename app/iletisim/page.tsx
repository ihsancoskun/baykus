"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "Telefon",
      details: "0 533 656 99 83",
      href: "tel:+905336569983",
      description: "Hafta içi 09:00 - 18:00 arası arayabilirsiniz."
    },
    {
      icon: <Mail className="w-6 h-6 text-red-500" />,
      title: "E-posta",
      details: "baykusakademi@gmail.com",
      href: "mailto:baykusakademi@gmail.com",
      description: "Sorularınız için 7/24 e-posta gönderebilirsiniz."
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      title: "Adres",
      details: "Sezai Selek Sokak Çağlayan Apartmanı No:17 Daire 8 Kat 3",
      href: "https://maps.google.com/?q=Sezai+Selek+Sok.+Çağlayan+Apt.+Nişantaşı+İstanbul",
      description: "Nişantaşı, Şişli / İstanbul"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero 
        title="İletişim" 
        bgImage="/media/bg/consulting_bg.jpg" 
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, idx) => (
            <motion.a
              href={info.href}
              target={info.title === "Adres" ? "_blank" : undefined}
              rel={info.title === "Adres" ? "noopener noreferrer" : undefined}
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6 }}
              className="bg-white border border-gray-100 p-10 rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/10 group-hover:bg-red-600 transition-colors duration-500" />
              <div className="w-12 h-12 flex items-center justify-center mb-6">
                {info.icon}
              </div>
              <h3 className="text-xl font-serif text-navy mb-2">{info.title}</h3>
              <p className="text-lg font-sans font-medium text-navy/80 mb-3">{info.details}</p>
              <p className="text-sm font-sans font-light text-navy/60">{info.description}</p>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm">
          
          {/* Contact Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">Geleceğinizi Planlayalım</h2>
                <p className="font-sans font-light text-navy-100 leading-relaxed text-lg">
                  Eğitim programlarımız, sınav hazırlıkları veya yurtdışı danışmanlık hizmetlerimiz hakkında detaylı bilgi almak için formu doldurabilirsiniz. Uzman eğitim danışmanlarımız en kısa sürede size dönüş yapacaktır.
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FDFBF7] border border-[#c85a3c]/30 rounded-sm p-8 text-center"
                >
                  <div className="w-16 h-16 bg-[#c85a3c] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-serif text-navy mb-2">Mesajınız Alındı!</h3>
                  <p className="font-sans font-light text-navy-100">Eğitim danışmanlarımız sizinle en kısa sürede iletişime geçecektir. İlginiz için teşekkür ederiz.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-sans font-semibold tracking-widest text-navy uppercase">Adınız Soyadınız</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-4 text-navy font-sans focus:outline-none focus:border-[#c85a3c] transition-colors"
                        placeholder="Örn: Elif Yılmaz"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-sans font-semibold tracking-widest text-navy uppercase">Telefon Numaranız</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-4 text-navy font-sans focus:outline-none focus:border-[#c85a3c] transition-colors"
                        placeholder="Örn: 0555 555 5555"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-sans font-semibold tracking-widest text-navy uppercase">E-posta Adresiniz</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-4 text-navy font-sans focus:outline-none focus:border-[#c85a3c] transition-colors"
                        placeholder="Örn: ornek@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-sans font-semibold tracking-widest text-navy uppercase">İlgilendiğiniz Konu</label>
                      <select 
                        id="subject" 
                        name="subject"
                        required
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-4 text-navy font-sans focus:outline-none focus:border-[#c85a3c] transition-colors appearance-none"
                      >
                        <option value="" disabled>Lütfen seçiniz</option>
                        <option value="delf_dalf">DELF / DALF Sınav Hazırlığı</option>
                        <option value="gsu">GSÜ İç Sınav Hazırlığı</option>
                        <option value="lise">Fransız Liselerine Geçiş</option>
                        <option value="universite">Fransa Üniversite Danışmanlığı</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-sans font-semibold tracking-widest text-navy uppercase">Mesajınız (İsteğe bağlı)</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-sm px-5 py-4 text-navy font-sans focus:outline-none focus:border-[#c85a3c] transition-colors resize-none"
                      placeholder="Belirtmek istediğiniz özel bir durum veya sorunuz varsa buraya yazabilirsiniz..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-[#263147] hover:bg-[#b3855a] transition-colors text-white font-sans text-xs tracking-[0.2em] px-10 py-5 font-semibold uppercase disabled:opacity-70 disabled:pointer-events-none mt-4"
                  >
                    <span>{isSubmitting ? "GÖNDERİLİYOR..." : "MESAJI GÖNDER"}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Map & Visual Section */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden rounded-sm m-2">
            <iframe 
              src="https://maps.google.com/maps?q=Bayku%C5%9F+Akademi+-+Elif+AKAN&t=m&z=16&output=embed"
              className="absolute inset-0 w-full h-full border-0 transition-all duration-500 grayscale opacity-80 hover:grayscale-0 hover:opacity-100" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Elegant Map Overlay */}
            <div className="absolute inset-0 border border-gray-100 pointer-events-none"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
