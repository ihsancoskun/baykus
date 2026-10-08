import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { AnimatedSection, AnimatedTextBlock, AnimatedImageBlock } from "@/components/ui/animated-block";
import fs from "fs";
import path from "path";

// Function to fetch pages from our JSON database
async function getPages() {
  const filePath = path.join(process.cwd(), "data", "pages.json");
  const jsonData = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(jsonData);
}

// Generate static routes for all 40 pages!
export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const pages = await getPages();
  const course = pages.find((p: any) => p.slug === params.slug);

  if (!course) {
    notFound();
  }

  const cleanTitle = course.title.replace("<![CDATA[", "").replace("]]>", "");
  let cleanContent = course.content.replace("<![CDATA[", "").replace("]]>", "");

  // Determine background image based on slug category (now unused, but kept for signature)
  let bgImage = "/media/bg/exam_bg.jpg";

  // WhatsApp application link with the course name pre-filled
  const waMessage = `Merhaba, ${cleanTitle} eğitimi hakkında bilgi almak ve başvuru yapmak istiyorum.`;
  const waLink = `https://wa.me/905336569983?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      <AnimatedPageHero title={cleanTitle} bgImage={bgImage} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Article Content - High-end Editorial Layout */}
          <article 
            className="w-full lg:w-2/3 bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-14
              [&_h1]:text-4xl [&_h1]:font-serif [&_h1]:text-navy [&_h1]:mb-6
              [&_h2]:text-3xl [&_h2]:font-serif [&_h2]:text-navy [&_h2]:mt-12 [&_h2]:mb-6
              [&_h3]:text-2xl [&_h3]:font-serif [&_h3]:text-navy [&_h3]:mt-10 [&_h3]:mb-4
              [&_p]:text-lg [&_p]:font-sans [&_p]:font-light [&_p]:text-navy-100 [&_p]:leading-relaxed [&_p]:mb-6
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_li]:text-lg [&_li]:font-sans [&_li]:font-light [&_li]:text-navy-100 [&_li]:mb-3
              [&_strong]:font-semibold [&_strong]:text-navy
              [&_img]:w-full [&_img]:max-h-[450px] [&_img]:object-cover [&_img]:rounded-sm [&_img]:shadow-sm [&_img]:my-10"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 flex flex-col items-center text-center">
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">
                Kariyerinizi Planlamaya Başlayın
              </h3>
              <p className="text-gray-600 mb-8">
                {cleanTitle} eğitimimiz hakkında detaylı bilgi almak ve ücretsiz seviye tespit sınavımıza katılmak için bizimle iletişime geçin.
              </p>
              
              <LiquidMetalButton label="Hemen Başvur" href={waLink} target="_blank" />
              
              <div className="mt-8 pt-8 border-t border-gray-100 w-full">
                <p className="text-sm text-gray-500 mb-2">Sorularınız mı var?</p>
                <a href="tel:+905336569983" className="text-xl font-bold text-red-600 hover:text-navy transition-colors">
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
