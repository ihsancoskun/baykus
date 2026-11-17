import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yurt Dışı Eğitim Danışmanlığı Formu | Baykuş Akademi",
  description: "Fransa üniversiteleri, Campus France, Parcoursup ve yurt dışı eğitim başvuruları için ücretsiz ön değerlendirme formu.",
  alternates: { canonical: "/yurtdisi-egitim-danismanligi-formu" },
};

export default function BasvuruFormuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
