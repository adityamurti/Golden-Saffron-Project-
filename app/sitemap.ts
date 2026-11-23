import type { MetadataRoute } from "next";
import { site } from "@/lib/seo/site";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/reservation", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/location", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/faq", priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: new URL(route.path, site.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
