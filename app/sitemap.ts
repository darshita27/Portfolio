import type { MetadataRoute } from "next";
import { meta } from "@/app/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: meta.siteUrl,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
