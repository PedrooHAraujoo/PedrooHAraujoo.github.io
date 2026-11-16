import type { ReactNode } from "react";
import type { Lang } from "@/content/profile";
import { profile, t } from "@/content/profile";
import { paths, ui } from "@/lib/i18n";
import { fontVars } from "@/app/fonts";
import { Enhance } from "./Enhance";

type ShellProps = {
  lang: Lang;
  children: ReactNode;
  /** Caminho equivalente no outro idioma, para o seletor PT/EN. */
  alternate: string;
  /** Página "limpa" (currículo): sem cabeçalho e rodapé do site. */
  bare?: boolean;
};

export function Html({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"} className={`${fontVars} antialiased`}>
      <head>
        {/* Marca que o JS roda antes da primeira pintura; só então as entradas se escondem. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

export function Shell({ lang, children, alternate, bare }: ShellProps) {
  const s = ui[lang];
  const home = paths.home(lang);

  if (bare) {
    return (
      <>
        {children}
        <Enhance />
      </>
    );
  }

  const nav = [
    { href: `${home}#projetos`, label: s.nav.work },
    { href: `${home}#sobre`, label: s.nav.about },
    { href: `${home}#como`, label: s.nav.how },
    { href: `${home}#experiencia`, label: s.nav.experience },
    { href: `${home}#contato`, label: s.nav.contact },
  ];

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        {s.skip}
      </a>

      <header
        data-header
        className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 border-b border-transparent data-[scrolled]:border-white/10 data-[scrolled]:bg-ink/80 data-[scrolled]:backdrop-blur-md"
      >
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href={home} className="flex items-center gap-3" aria-label={`${profile.initials} ${profile.shortName}`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-mono text-[0.72rem] font-semibold tracking-wider text-ink">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-chalk sm:block">{profile.shortName}</span>
          </a>

          <nav aria-label={lang === "pt" ? "Seções" : "Sections"} className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-grow text-sm text-fog transition-colors hover:text-chalk">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-white/10 p-0.5 font-mono text-[0.68rem] tracking-widest">
              <a
                href={lang === "pt" ? "#conteudo" : alternate}
                hrefLang="pt-BR"
                aria-current={lang === "pt" ? "true" : undefined}
                className={`rounded-full px-2.5 py-1.5 ${lang === "pt" ? "bg-chalk text-ink" : "text-fog hover:text-chalk"}`}
              >
                PT
              </a>
              <a
                href={lang === "en" ? "#conteudo" : alternate}
                hrefLang="en"
                aria-current={lang === "en" ? "true" : undefined}
                className={`rounded-full px-2.5 py-1.5 ${lang === "en" ? "bg-chalk text-ink" : "text-fog hover:text-chalk"}`}
              >
                EN
              </a>
            </div>
            <a href={paths.resume(lang)} className="btn btn-ghost !py-2.5 !px-4 !text-[0.82rem]">
              {s.resume}
            </a>
          </div>
        </div>
      </header>

      <main id="conteudo">{children}</main>

      <footer className="border-t border-white/10 bg-ink">
        <div className="wrap flex flex-col gap-4 py-8 text-sm text-fog md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · {t(profile.location, lang)}
          </p>
          <p className="label !normal-case !tracking-normal text-[0.74rem]">{s.footer}</p>
        </div>
      </footer>

      <Enhance />
    </>
  );
}
