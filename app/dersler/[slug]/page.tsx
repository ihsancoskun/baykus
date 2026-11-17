import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import fs from "fs";
import path from "path";

async function getPages() {
  const filePath = path.join(process.cwd(), "data", "pages.json");
  const jsonData = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(jsonData);
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages
    .filter((page: { slug: string; content?: string }) => page.content && page.content.trim().length > 0 && page.slug !== "kpds-hazirlik")
    .map((page: { slug: string }) => ({
      slug: page.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (params.slug === "kpds-hazirlik") {
    return {
      title: "YDS Hazırlık Nişantaşı | Baykuş Akademi",
      alternates: { canonical: "/dersler/yds-hazirlik" },
    };
  }

  const pages = await getPages();
  const course = pages.find((p: { slug: string }) => p.slug === params.slug);
  if (!course) return {};

  const rawTitle = (course.title || "").replace("<![CDATA[", "").replace("]]>", "").trim();
  const suffix = " | Baykuş Akademi";
  const maxBaseLen = 60 - suffix.length;
  const trimmedBase = rawTitle.length > maxBaseLen ? rawTitle.slice(0, maxBaseLen - 1).trim() : rawTitle;
  const seoTitle = `${trimmedBase}${suffix}`;

  const rawDesc =
    course.subtitle ||
    (course.content || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const seoDesc = rawDesc.length > 152 ? rawDesc.slice(0, 149).trim() + "..." : rawDesc;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `/dersler/${params.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://baykusakademi.com/dersler/${params.slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: rawTitle }],
    },
  };
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  if (params.slug === "kpds-hazirlik") {
    permanentRedirect("/dersler/yds-hazirlik");
  }

  const pages = await getPages();
  const course = pages.find((p: { slug: string }) => p.slug === params.slug);

  if (!course || !course.content || !course.content.trim()) {
    notFound();
  }

  const cleanTitle = course.title.replace("<![CDATA[", "").replace("]]>", "");
  const cleanContent = course.content.replace("<![CDATA[", "").replace("]]>", "");
  const bgImage = "/media/bg/exam_bg.jpg";

  const waMessage = `Merhaba, ${cleanTitle} eğitimi hakkında bilgi almak ve başvuru yapmak istiyorum.`;
  const waLink = `https://wa.me/905336569983?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero title={cleanTitle} bgImage={bgImage} subtitle={course.subtitle} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <article
            className="w-full lg:w-2/3 bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-14
              [&_h2]:text-3xl [&_h2]:font-serif [&_h2]:text-navy [&_h2]:mt-10 [&_h2]:mb-5
              [&_h3]:text-2xl [&_h3]:font-serif [&_h3]:text-navy [&_h3]:mt-8 [&_h3]:mb-4
              [&_p]:text-base [&_p]:md:text-lg [&_p]:font-sans [&_p]:font-light [&_p]:text-navy-100 [&_p]:leading-relaxed [&_p]:mb-6
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_li]:text-base [&_li]:md:text-lg [&_li]:font-sans [&_li]:font-light [&_li]:text-navy-100 [&_li]:mb-3
              [&_strong]:font-semibold [&_strong]:text-navy
              [&_img]:w-full [&_img]:max-h-[450px] [&_img]:object-cover [&_img]:rounded-sm [&_img]:shadow-sm [&_img]:my-10"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 flex flex-col items-center text-center">
              <h2 className="text-2xl font-serif font-bold text-navy mb-4">
                Kariyerinizi Planlamaya Başlayın
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-8">
                {cleanTitle} eğitimimiz hakkında detaylı bilgi almak ve ücretsiz seviye tespit sınavımıza katılmak için bizimle iletişime geçin.
              </p>

              <Link
                href="/yurtdisi-egitim-danismanligi-formu"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3.5 mb-3 bg-red-600 hover:bg-red-700 text-white font-sans text-sm uppercase tracking-wider font-semibold rounded-full shadow-md transition"
              >
                Online Başvuru Formu
              </Link>

              <LiquidMetalButton label="WhatsApp'tan Yazın" href={waLink} target="_blank" />

              <div className="mt-8 pt-8 border-t border-gray-100 w-full">
                <p className="text-sm text-gray-500 mb-2">Sorularınız mı var?</p>
                <a href="tel:+905336569983" className="min-h-[44px] inline-flex items-center justify-center text-xl font-bold text-red-600 hover:text-navy transition-colors">
                  0 533 656 99 83
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
