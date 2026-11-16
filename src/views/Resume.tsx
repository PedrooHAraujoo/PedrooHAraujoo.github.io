import type { Lang } from "@/content/profile";
import { SITE_URL, certifications, education, experience, languages, profile, t } from "@/content/profile";
import { cvBullets, cvLinks, cvSkills, cvSummary } from "@/content/cv";
import { paths, ui } from "@/lib/i18n";

const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Currículo em coluna única, texto real e títulos de seção convencionais:
// é o formato que os sistemas de triagem (ATS) leem sem erro. O PDF é gerado
// desta página por `npm run cv`.
export function Resume({ lang }: { lang: Lang }) {
  const s = ui[lang];
  // O endereço do portfólio só entra no PDF depois que o site estiver publicado.
  const site = process.env.NEXT_PUBLIC_SITE_URL ? bare(SITE_URL) : "";

  return (
    <div className="min-h-screen bg-ink-2 py-8 print:min-h-0 print:bg-white print:py-0">
      <div className="no-print mx-auto mb-6 flex w-[210mm] max-w-full items-center justify-between gap-4 px-5 min-[840px]:px-0">
        <a href={paths.home(lang)} className="link-grow text-sm text-fog hover:text-chalk">
          ← {s.cvBack}
        </a>
        <a href={paths.pdf(lang)} download className="btn btn-accent !py-2.5">
          {s.downloadPdf}
        </a>
      </div>

      <div className="cv cv-sheet">
        <header>
          <h1>{profile.name}</h1>
          <p className="cv-role">
            {t(profile.role, lang)} · TypeScript · React · Next.js · Node.js · Python · PostgreSQL
          </p>
          <p className="cv-meta" style={{ marginTop: "4pt" }}>
            {t(profile.location, lang)} · {profile.phone} · <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="cv-meta">
            <a href={profile.linkedin}>{profile.linkedinLabel}</a> · <a href={profile.github}>{profile.githubLabel}</a>
            {site && (
              <>
                {" "}
                · <a href={SITE_URL}>{site}</a>
              </>
            )}
          </p>
        </header>

        <section>
          <h2>{s.cvSummary}</h2>
          <p>{t(cvSummary, lang)}</p>
        </section>

        <section>
          <h2>{s.cvSkills}</h2>
          {cvSkills.map((g) => (
            <p key={g.label.pt}>
              <strong>{t(g.label, lang)}:</strong> {lang === "en" ? g.items.replace(" e ", " and ").replace("migrações SQL", "SQL migrations") : g.items}
            </p>
          ))}
        </section>

        <section>
          <h2>{s.cvExperience}</h2>
          {experience.map((job) => {
            const bullets = cvBullets[job.company]?.[lang] ?? job.bullets[lang];
            return (
              <div key={job.company} className="cv-job">
                <div className="cv-row">
                  <h3>
                    {t(job.role, lang)} · {job.company}
                  </h3>
                  <span className="cv-meta">
                    {t(job.period, lang)} · {t(job.place, lang)}
                  </span>
                </div>
                <ul>
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section>
          <h2>{s.cvProjects}</h2>
          <p>
            {cvLinks.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                {t(l.label, lang)}: <a href={l.href}>{bare(l.href)}</a>
              </span>
            ))}
          </p>
        </section>

        <section>
          <h2>{s.cvEducation}</h2>
          <div className="cv-row">
            <h3>
              {t(education.degree, lang)} · {education.school}
            </h3>
            <span className="cv-meta">{t(education.period, lang)}</span>
          </div>
          <p>{t(education.thesis, lang)}</p>
        </section>

        <section>
          <h2>{s.cvCerts}</h2>
          <p>{certifications.map((c) => `${t(c.name, lang)} (${c.issuer}, ${c.year})`).join(" · ")}</p>
        </section>

        <section>
          <h2>{s.cvLanguages}</h2>
          <p>{languages.map((l) => `${t(l.name, lang)}: ${t(l.level, lang)}`).join(" · ")}</p>
        </section>
      </div>
    </div>
  );
}
