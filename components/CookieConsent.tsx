"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-BAYKUS2026";

export default function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | "pending">("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("baykus_cookie_consent");
    if (saved === "accepted" || saved === "declined") {
      setConsent(saved);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      const w = window as unknown as {
        gtag?: (cmd: string, act: string, p?: Record<string, unknown>) => void;
      };
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        w.gtag?.("event", "whatsapp_click", { link_url: href });
      } else if (href.startsWith("tel:")) {
        w.gtag?.("event", "phone_click", { phone_number: href.replace("tel:", "") });
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("baykus_cookie_consent", "accepted");
    setConsent("accepted");
  };

  const handleDecline = () => {
    localStorage.setItem("baykus_cookie_consent", "declined");
    setConsent("declined");
  };

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {mounted && consent === "pending" && (
        <div
          role="dialog"
          aria-label="Çerez Onayı"
          className="fixed bottom-4 left-4 right-20 md:left-6 md:right-auto md:max-w-md z-[110] bg-white border border-gray-200 rounded-xl shadow-2xl p-4 sm:p-5 text-navy"
        >
          <p className="text-sm leading-relaxed text-navy/90 mb-3">
            Size daha iyi bir deneyim sunmak ve ziyaretçi trafiğini analiz etmek için çerezler kullanıyoruz. Detaylar için{" "}
            <Link href="/cerez-politikasi" className="text-red-600 underline font-medium">
              Çerez Politikası
            </Link>{" "}
            ve{" "}
            <Link href="/kvkk" className="text-red-600 underline font-medium">
              KVKK Aydınlatma Metni
            </Link>{" "}
            sayfalarımızı inceleyebilirsiniz.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAccept}
              className="min-h-[44px] px-5 py-2.5 bg-navy hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Kabul Et
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="min-h-[44px] px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-navy text-sm font-medium rounded-lg transition-colors"
            >
              Reddet
            </button>
          </div>
        </div>
      )}
    </>
  );
}
