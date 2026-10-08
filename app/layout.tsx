import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const garamond = EB_Garamond({ subsets: ["latin"], variable: '--font-garamond' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Baykuş Akademi | Fransız Zarafeti ile Eğitim",
  description: "Fransız ekolünde 40 yıllık deneyim. DELF/DALF, GSÜ İç Sınav ve Yurtdışı Danışmanlık.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${garamond.variable} ${inter.variable} font-sans`}>
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
