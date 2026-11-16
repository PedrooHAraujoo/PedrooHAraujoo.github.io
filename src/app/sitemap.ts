import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { projects } from "@/content/projects";
import { paths } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ["pt", "en"] as const;
  const urls = langs.flatMap((lang) => [
    paths.home(lang),
    paths.resume(lang),
    ...projects.map((p) => paths.project(lang, p.slug)),
  ]);
  return urls.map((u) => ({ url: `${SITE_URL}${u}`, changeFrequency: "monthly", priority: u === "/" ? 1 : 0.7 }));
}
