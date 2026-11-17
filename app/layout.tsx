import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";

const garamond = EB_Garamond({ subsets: ["latin", "latin-ext"], variable: "--font-garamond" });

export const metadata: Metadata = {
  metadataBase: new URL("https://baykusakademi.com"),
  title: "Baykuş Akademi Nişantaşı | Fransızca & Eğitim Danışmanlığı",
  description:
    "Nişantaşı Baykuş Akademi: 40 yıllık deneyimle DELF/DALF, GSÜ İç Sınavı, Fransız liselerine hazırlık ve Fransa üniversite başvuru danışmanlığı.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://baykusakademi.com",
    siteName: "Baykuş Akademi",
    title: "Baykuş Akademi Nişantaşı | Fransızca & Eğitim Danışmanlığı",
    description:
      "40 yıllık deneyimle DELF/DALF, GSÜ İç Sınavı, Fransız liselerine hazırlık ve Fransa üniversite başvuru danışmanlığı.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baykuş Akademi Nişantaşı - Fransızca Eğitim ve Yurt Dışı Danışmanlık",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baykuş Akademi Nişantaşı | Fransızca & Eğitim Danışmanlığı",
    description:
      "40 yıllık deneyimle DELF/DALF, GSÜ İç Sınavı, Fransız liselerine hazırlık ve Fransa üniversite başvuru danışmanlığı.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "Baykuş Akademi",
  url: "https://baykusakademi.com",
  logo: "https://baykusakademi.com/media/2025/05/image-7.png",
  image: "https://baykusakademi.com/og-image.jpg",
  telephone: "+905336569983",
  email: "baykusakademisi@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sezai Selek Sokak Çağlayan Apartmanı No:17 Daire 8 Kat 3 Nişantaşı",
    addressLocality: "Şişli",
    addressRegion: "İstanbul",
    postalCode: "34365",
    addressCountry: "TR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${garamond.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <WhatsAppButton />
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
