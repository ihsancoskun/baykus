import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim & Nişantaşı Adres | Baykuş Akademi",
  description: "Baykuş Akademi Nişantaşı iletişim bilgileri, adres, telefon (0533 656 99 83) ve eğitim danışmanlığı bilgi formu.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
