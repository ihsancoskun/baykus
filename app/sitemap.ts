import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://baykusakademi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const filePath = path.join(process.cwd(), "data", "pages.json");
  const jsonData = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const pages = JSON.parse(jsonData);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/hizmetlerimiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/baykus-kids`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/yurtdisi-egitim-danismanligi-formu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/kvkk`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/gizlilik`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/cerez-politikasi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const excludedSlugs = new Set(["anasayfa", "iletisim", "kpds-hazirlik"]);

  const dynamicRoutes: MetadataRoute.Sitemap = pages
    .filter((p: { slug: string; content?: string }) => p.content && p.content.trim().length > 0 && !excludedSlugs.has(p.slug))
    .map((p: { slug: string }) => ({
      url: `${BASE_URL}/dersler/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...dynamicRoutes];
}
