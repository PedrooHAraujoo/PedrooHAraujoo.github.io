import type { Metadata } from "next";
import type { Lang } from "@/content/profile";
import { SITE_URL, profile, t } from "@/content/profile";

type SeoInput = {
  lang: Lang;
  title?: string;
  description?: string;
  /** Caminho desta página e o equivalente no outro idioma. */
  path: string;
  alternate: string;
};

export function seo({ lang, title, description, path, alternate }: SeoInput): Metadata {
  const base = `${profile.shortName} · ${t(profile.role, lang)}`;
  const fullTitle = title ? `${title} · ${profile.shortName}` : base;
  const desc = description ?? t(profile.summary, lang).split(". ").slice(0, 2).join(". ") + ".";
  const pt = lang === "pt" ? path : alternate;
  const en = lang === "en" ? path : alternate;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: desc,
    authors: [{ name: profile.name, url: profile.linkedin }],
    creator: profile.name,
    alternates: {
      canonical: path,
      languages: { "pt-BR": pt, en, "x-default": pt },
    },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description: desc,
      siteName: profile.shortName,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: base }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: ["/og.png"] },
    robots: { index: true, follow: true },
  };
}

export function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t(profile.role, lang),
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Aracaju", addressRegion: "SE", addressCountry: "BR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Tiradentes" },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Supabase"],
  };
}
