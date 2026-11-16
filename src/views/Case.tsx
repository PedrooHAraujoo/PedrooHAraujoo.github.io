import type { Lang } from "@/content/profile";
import { t } from "@/content/profile";
import { projects, type Project } from "@/content/projects";
import { num, paths, ui } from "@/lib/i18n";
import { Cover } from "@/components/Cover";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className}>
    <path d="M3 13 13 3M5.5 3H13v7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Case({ lang, project }: { lang: Lang; project: Project }) {
  const s = ui[lang];
  const p = project;
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];

  const meta = [
    { k: s.role, v: t(p.role, lang) },
    { k: s.period, v: t(p.period, lang) },
    { k: s.status, v: t(p.status, lang) },
  ];

  return (
    <article>
      {/* Cabeçalho */}
      <header className="relative overflow-hidden">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="hero-fade absolute inset-0" aria-hidden="true" />
        <div className="wrap relative pb-14 pt-32 md:pt-40">
          <a href={`${paths.home(lang)}#projetos`} className="link-grow label inline-flex items-center gap-2 text-fog hover:text-chalk">
            <span aria-hidden="true">←</span> {s.back}
          </a>

          <div className="rise mt-10 label flex flex-wrap items-center gap-x-4 gap-y-2 text-fog">
            <span className="text-accent">{p.index}</span>
            <span>{t(p.kicker, lang)}</span>
            <span className="inline-flex items-center gap-2 text-chalk/80">
              {p.live && <span className="live-dot" />}
              {t(p.status, lang)}
            </span>
          </div>

          <h1 className="rise-solid mt-5 text-[clamp(2.8rem,8vw,6.6rem)] font-medium leading-[0.96] tracking-[-0.045em]" style={{ "--d": "90ms" } as React.CSSProperties}>
            {p.title}
          </h1>
          <p className="rise mt-6 max-w-[46ch] text-[1.2rem] leading-relaxed text-chalk/80 md:text-[1.4rem]" style={{ "--d": "180ms" } as React.CSSProperties}>
            {t(p.tagline, lang)}
          </p>

          {p.links.length > 0 && (
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--d": "260ms" } as React.CSSProperties}>
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  {t(l.label, lang)}
                  <Arrow />
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Capa */}
      <div className="relative bg-ink">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-paper" aria-hidden="true" />
        <div className="wrap relative" data-reveal>
          <Cover project={p} lang={lang} priority />
        </div>
      </div>

      {/* Corpo */}
      <div className="bg-paper text-ink">
        <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-7 lg:sticky lg:top-28" data-reveal>
              <dl className="space-y-5 border-t border-ink/10 pt-6">
                {meta.map((m) => (
                  <div key={m.k}>
                    <dt className="label text-[#5b5e66]">{m.k}</dt>
                    <dd className="mt-1.5 text-[1.02rem]">{m.v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="label text-[#5b5e66]">{s.stack}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((x) => (
                      <span key={x} className="chip chip-light">
                        {x}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="space-y-20 lg:col-span-7 lg:col-start-6">
            <section data-reveal>
              <h2 className="label mb-5 text-accent-deep">{s.context}</h2>
              <p className="text-[1.3rem] leading-[1.55] tracking-[-0.01em] md:text-[1.5rem]">{t(p.context, lang)}</p>
            </section>

            <section data-reveal>
              <h2 className="label mb-6 text-accent-deep">{s.numbers}</h2>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.4rem] border border-ink/10 bg-ink/10">
                {p.metrics.map((m) => (
                  <div key={m.value + m.label.pt} className="bg-paper p-6 [&:last-child:nth-child(odd)]:col-span-2">
                    <dt className="sr-only">{t(m.label, lang)}</dt>
                    <dd>
                      <span className="block text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-none tracking-[-0.035em]">{num(m.value, lang)}</span>
                      <span className="mt-3 block text-[0.92rem] leading-snug text-[#3a3c43]">{t(m.label, lang)}</span>
                      {m.source && (
                        <span className="mt-3 block font-mono text-[0.68rem] text-[#7b7e86]">
                          {s.source}: {m.source}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section data-reveal>
              <h2 className="label mb-6 text-accent-deep">{s.built}</h2>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {p.built[lang].map((b) => (
                  <li key={b} className="flex gap-5 py-4 text-[1.05rem] leading-relaxed">
                    <span className="mt-[0.75em] h-px w-5 shrink-0 bg-accent-deep" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {p.extraShot && (
              <figure data-reveal>
                <div className="frame">
                  <img src={p.extraShot.src} alt={t(p.extraShot.alt, lang)} width={1920} height={1200} loading="lazy" decoding="async" />
                </div>
                <figcaption className="mt-3 font-mono text-[0.72rem] text-[#5b5e66]">{t(p.extraShot.alt, lang)}</figcaption>
              </figure>
            )}

            <section>
              <h2 className="label mb-6 text-accent-deep" data-reveal>
                {s.decisions}
              </h2>
              <ol className="space-y-4">
                {p.decisions.map((d, i) => (
                  <li key={d.title.pt} className="rounded-[1.4rem] border border-ink/10 bg-white/55 p-7 md:p-8" data-reveal>
                    <span className="label text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-[1.45rem] font-medium leading-tight tracking-[-0.025em]">{t(d.title, lang)}</h3>
                    <p className="mt-3 leading-relaxed text-[#3a3c43]">{t(d.body, lang)}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-[1.4rem] bg-ink p-7 text-chalk md:p-9" data-reveal>
              <h2 className="label mb-4 text-accent">{s.howBuilt}</h2>
              <p className="text-[1.08rem] leading-relaxed text-chalk/85">{t(p.ai, lang)}</p>
            </section>
          </div>
        </div>
      </div>

      {/* Próximo */}
      <a href={paths.project(lang, next.slug)} className="group block bg-ink-2 transition-colors hover:bg-ink-3">
        <div className="wrap flex items-end justify-between gap-6 py-16 md:py-24">
          <div>
            <p className="label text-fog">{s.next}</p>
            <p className="mt-4 text-[clamp(2rem,6vw,4.6rem)] font-medium leading-none tracking-[-0.04em] transition-colors group-hover:text-accent">
              {next.title}
            </p>
            <p className="mt-3 text-fog">{t(next.kicker, lang)}</p>
          </div>
          <Arrow className="mb-3 h-8 w-8 shrink-0 text-fog transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </a>
    </article>
  );
}
