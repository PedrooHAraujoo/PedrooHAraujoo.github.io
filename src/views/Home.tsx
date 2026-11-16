import type { Lang } from "@/content/profile";
import { certifications, education, experience, keywords, languages, principles, profile, skills, t } from "@/content/profile";
import { projects } from "@/content/projects";
import { num, paths, ui } from "@/lib/i18n";
import { Cover } from "@/components/Cover";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className}>
    <path d="M3 13 13 3M5.5 3H13v7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const proof = [
  { slug: "ambiance", value: "158", pt: "commits numa loja em produção", en: "commits on a store in production" },
  { slug: "solstead", value: "68", pt: "tabelas protegidas por RLS", en: "tables protected by RLS" },
  { slug: "central-logistica", value: "19,7 → 3,6%", pt: "de erro na reconstrução de rotas", en: "route reconstruction error" },
  { slug: "jucara-melo", value: "72 → 90", pt: "no Lighthouse móvel", en: "mobile Lighthouse score" },
];

function SectionHead({
  kicker,
  a,
  b,
  intro,
  dark,
}: {
  kicker: string;
  a: string;
  b: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
      <div className="lg:col-span-8">
        <p className={`label mb-5 flex items-center gap-3 ${dark ? "text-accent" : "text-accent-deep"}`}>
          <span className="h-px w-8 bg-current" />
          {kicker}
        </p>
        <h2 className="text-[clamp(2.2rem,5.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {a} <span className="serif-accent">{b}</span>
        </h2>
      </div>
      {intro && (
        <p className={`lg:col-span-4 text-[1.02rem] leading-relaxed ${dark ? "text-fog" : "text-[#4a4d55]"}`}>{intro}</p>
      )}
    </div>
  );
}

export function Home({ lang }: { lang: Lang }) {
  const s = ui[lang];
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      {/* ---------- Topo ---------- */}
      <section className="relative overflow-hidden">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="hero-fade absolute inset-0" aria-hidden="true" />

        <div className="wrap relative pb-16 pt-36 md:pb-20 md:pt-44">
          <p className="rise inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.8rem] text-chalk/90">
            <span className="live-dot" />
            {t(profile.availability, lang)}
          </p>

          <h1 className="mt-9 text-[clamp(2.7rem,8.2vw,7.2rem)] font-medium leading-[0.96] tracking-[-0.045em]">
            <span className="rise-solid mb-5 block text-[clamp(1.15rem,2.3vw,1.9rem)] font-normal leading-tight tracking-[-0.02em] text-fog" style={{ "--d": "80ms" } as React.CSSProperties}>
              {s.heroLead}
            </span>
            <span className="rise-solid block" style={{ "--d": "180ms" } as React.CSSProperties}>
              {s.heroA}
            </span>
            <span className="rise-solid serif-accent block text-accent" style={{ "--d": "280ms" } as React.CSSProperties}>
              {s.heroB}
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-[58ch] text-[1.08rem] leading-relaxed text-chalk/75 md:text-[1.18rem]"
            style={{ "--d": "380ms" } as React.CSSProperties}
          >
            {s.heroSub}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ "--d": "480ms" } as React.CSSProperties}>
            <a href="#projetos" className="btn btn-accent">
              {s.seeWork}
              <Arrow className="rotate-90" />
            </a>
            <a href={paths.pdf(lang)} className="btn btn-ghost" download>
              {s.downloadPdf}
            </a>
            <span className="mx-1 hidden h-5 w-px bg-white/15 sm:block" />
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer me" className="link-grow inline-flex items-center gap-1.5 px-2 text-sm text-chalk/80 hover:text-chalk">
              LinkedIn <Arrow />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer me" className="link-grow inline-flex items-center gap-1.5 px-2 text-sm text-chalk/80 hover:text-chalk">
              GitHub <Arrow />
            </a>
          </div>

          {/* Prova em números */}
          <div className="mt-20 md:mt-28" data-reveal>
            <p className="label mb-5 text-fog">{s.proofTitle}</p>
            <ul className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
              {proof.map((p, i) => (
                <li key={p.slug} className={`border-b border-white/10 lg:border-b-0 ${i % 2 === 0 ? "border-r" : ""} ${i < 3 ? "lg:border-r" : "lg:border-r-0"} border-white/10`}>
                  <a href={paths.project(lang, p.slug)} className="group block h-full px-1 py-6 pr-4 md:px-6 md:first:pl-0">
                    <span className="block text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-none tracking-[-0.04em] text-chalk transition-colors group-hover:text-accent">
                      {num(p.value, lang)}
                    </span>
                    <span className="mt-3 flex items-start justify-between gap-3 text-[0.86rem] leading-snug text-fog">
                      {p[lang]}
                      <Arrow className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Faixa de tecnologias */}
        <div className="relative border-y border-white/10 bg-ink-2 py-4">
          <div className="marquee-mask overflow-hidden" aria-hidden="true">
            <div className="marquee">
              {[0, 1].map((k) => (
                <ul key={k} className="flex shrink-0 items-center">
                  {keywords.map((w) => (
                    <li key={w} className="label flex items-center gap-8 px-4 text-[0.74rem] text-chalk/70">
                      {w}
                      <span className="h-1 w-1 rounded-full bg-accent" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <p className="sr-only">{keywords.join(", ")}</p>
        </div>
      </section>

      {/* ---------- Projetos ---------- */}
      <section id="projetos" className="bg-paper text-ink">
        <div className="wrap py-24 md:py-32">
          <SectionHead kicker={s.workKicker} a={s.workTitleA} b={s.workTitleB} intro={s.workIntro} />

          <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
            {featured.map((p, i) => (
              <article key={p.slug} className="case-card grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14" data-reveal>
                <a
                  href={paths.project(lang, p.slug)}
                  className={`block lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  aria-label={`${p.title}: ${s.caseStudy}`}
                >
                  <Cover project={p} lang={lang} priority={i === 0} withPhone />
                </a>

                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-[#5b5e66]">
                    <span className="text-accent-deep">{p.index}</span>
                    <span>{t(p.kicker, lang)}</span>
                  </div>
                  <h3 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.035em]">
                    <a href={paths.project(lang, p.slug)} className="hover:text-accent-deep transition-colors">
                      {p.title}
                    </a>
                  </h3>
                  <p className="mt-4 text-[1.06rem] leading-relaxed text-[#3a3c43]">{t(p.tagline, lang)}</p>

                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6">
                    {p.metrics.slice(0, 2).map((m) => (
                      <div key={m.value + m.label.pt}>
                        <dt className="sr-only">{t(m.label, lang)}</dt>
                        <dd>
                          <span className="block text-[1.7rem] font-medium leading-none tracking-[-0.03em]">{num(m.value, lang)}</span>
                          <span className="mt-2 block text-[0.84rem] leading-snug text-[#5b5e66]">{t(m.label, lang)}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-7 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map((x) => (
                      <li key={x} className="chip chip-light">
                        {x}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a href={paths.project(lang, p.slug)} className="btn btn-ink">
                      {s.caseStudy}
                      <Arrow />
                    </a>
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-grow inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        {t(l.label, lang)} <Arrow />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Projetos menores */}
          <div className="mt-28 md:mt-40">
            <p className="label mb-8 flex items-center gap-3 text-accent-deep" data-reveal>
              <span className="h-px w-8 bg-current" />
              {s.moreWork}
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {others.map((p, i) => (
                <a
                  key={p.slug}
                  href={paths.project(lang, p.slug)}
                  className="case-card group block rounded-[1.6rem] border border-ink/10 bg-white/50 p-4 transition-colors hover:border-ink/25 md:p-5"
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                >
                  <Cover project={p} lang={lang} />
                  <div className="px-2 pb-2 pt-6">
                    <div className="label flex items-center gap-4 text-[#5b5e66]">
                      <span className="text-accent-deep">{p.index}</span>
                      <span>{t(p.kicker, lang)}</span>
                    </div>
                    <h3 className="mt-3 flex items-center justify-between gap-4 text-[1.7rem] font-medium tracking-[-0.03em]">
                      {p.title}
                      <Arrow className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-2 leading-relaxed text-[#3a3c43]">{t(p.tagline, lang)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Sobre + stack ---------- */}
      <section id="sobre" className="bg-ink">
        <div className="wrap py-24 md:py-32">
          <SectionHead kicker={s.aboutKicker} a={s.aboutTitleA} b={s.aboutTitleB} dark />

          <div className="mt-14 grid gap-14 lg:grid-cols-12">
            <div className="space-y-6 self-start text-[1.1rem] leading-[1.7] text-chalk/80 lg:sticky lg:top-28 lg:col-span-6" data-reveal>
              {profile.about[lang].map((p, i) => (
                <p key={i} className={i === 0 ? "text-[1.28rem] leading-[1.55] text-chalk" : ""}>
                  {p}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 lg:col-start-8" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <p className="label mb-6 text-fog">{s.stackKicker}</p>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {skills.map((g) => (
                  <div key={g.label.pt} className="grid gap-3 py-5 sm:grid-cols-[8.5rem_1fr]">
                    <dt className="label pt-1 text-fog">{t(g.label, lang)}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {g.items.map((x) => (
                        <span key={x} className="chip chip-dark">
                          {x}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Como trabalho ---------- */}
      <section id="como" className="bg-paper-2 text-ink">
        <div className="wrap py-24 md:py-32">
          <SectionHead kicker={s.howKicker} a={s.howTitleA} b={s.howTitleB} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.6rem] border border-ink/10 bg-ink/10 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title.pt} className="bg-paper p-8 md:p-10" data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                <span className="label text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[1.55rem] font-medium leading-tight tracking-[-0.025em]">{t(p.title, lang)}</h3>
                <p className="mt-3 leading-relaxed text-[#3a3c43]">{t(p.body, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Experiência ---------- */}
      <section id="experiencia" className="bg-ink">
        <div className="wrap py-24 md:py-32">
          <SectionHead kicker={s.expKicker} a={s.expTitleA} b={s.expTitleB} dark />

          <ol className="mt-14 border-t border-white/10">
            {experience.map((job) => (
              <li key={job.company} className="grid gap-4 border-b border-white/10 py-10 lg:grid-cols-12 lg:gap-10" data-reveal>
                <div className="lg:col-span-4">
                  <p className="label text-fog">{t(job.period, lang)}</p>
                  <h3 className="mt-3 text-[1.5rem] font-medium tracking-[-0.025em]">{job.company}</h3>
                  <p className="mt-1 text-chalk/75">{t(job.role, lang)}</p>
                  <p className="mt-1 text-sm text-fog">{t(job.place, lang)}</p>
                </div>
                <div className="lg:col-span-8">
                  <ul className="space-y-3 text-[1.02rem] leading-relaxed text-chalk/80">
                    {job.bullets[lang].map((b) => (
                      <li key={b} className="flex gap-4">
                        <span className="mt-[0.72em] h-px w-4 shrink-0 bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {job.stack && (
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {job.stack.map((x) => (
                        <li key={x} className="chip chip-dark">
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-12 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-5">
              <p className="label mb-5 text-fog">{s.education}</p>
              <h3 className="text-[1.5rem] font-medium tracking-[-0.025em]">{t(education.degree, lang)}</h3>
              <p className="mt-1 text-chalk/75">
                {education.school} · {t(education.period, lang)}
              </p>
              <p className="mt-4 leading-relaxed text-chalk/70">{t(education.thesis, lang)}</p>
            </div>
            <div className="lg:col-span-4">
              <p className="label mb-5 text-fog">{s.certifications}</p>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.name.pt}>
                    <span className="block text-chalk">{t(c.name, lang)}</span>
                    <span className="text-sm text-fog">
                      {c.issuer} · {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <p className="label mb-5 text-fog">{s.languages}</p>
              <ul className="space-y-4">
                {languages.map((l) => (
                  <li key={l.name.pt}>
                    <span className="block text-chalk">{t(l.name, lang)}</span>
                    <span className="text-sm text-fog">{t(l.level, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Contato ---------- */}
      <section id="contato" className="relative overflow-hidden bg-ink-2">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "radial-gradient(50rem 28rem at 50% 115%, rgba(255,107,26,0.26), transparent 65%)" }}
        />
        <div className="wrap relative py-28 md:py-40">
          <p className="label mb-6 flex items-center gap-3 text-accent" data-reveal>
            <span className="h-px w-8 bg-current" />
            {s.contactKicker}
          </p>
          <h2 className="max-w-[16ch] text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em]" data-reveal>
            {s.contactTitleA} <span className="serif-accent text-accent">{s.contactTitleB}</span>
          </h2>
          <p className="mt-8 max-w-[52ch] text-[1.1rem] leading-relaxed text-chalk/75" data-reveal>
            {s.contactBody}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
            <a href={`mailto:${profile.email}`} className="btn btn-accent">
              {s.writeMe}
              <Arrow />
            </a>
            <a href={paths.pdf(lang)} className="btn btn-ghost" download>
              {s.downloadPdf}
            </a>
          </div>

          <ul className="mt-16 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {[
              { k: "E-mail", v: profile.email, href: `mailto:${profile.email}` },
              { k: "LinkedIn", v: "/in/pedrohenriquearaujosouza", href: profile.linkedin },
              { k: "GitHub", v: "PedrooHAraujoo", href: profile.github },
              { k: "WhatsApp", v: profile.phone, href: profile.whatsapp },
            ].map((c) => (
              <li key={c.k} className="bg-ink-2">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer me" : undefined}
                  className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="label flex items-center justify-between text-fog">
                    {c.k}
                    <Arrow className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </span>
                  <span className="break-all text-[0.98rem] text-chalk">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
