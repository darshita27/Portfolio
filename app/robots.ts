import type { MetadataRoute } from "next";
import { meta } from "@/app/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",                 allow: "/" },
      { userAgent: "GPTBot",            allow: "/" },
      { userAgent: "OAI-SearchBot",     allow: "/" },
      { userAgent: "ClaudeBot",         allow: "/" },
      { userAgent: "Claude-SearchBot",  allow: "/" },
      { userAgent: "PerplexityBot",     allow: "/" },
      { userAgent: "Google-Extended",   allow: "/" },
    ],
    sitemap: `${meta.siteUrl}/sitemap.xml`,
  };
}
