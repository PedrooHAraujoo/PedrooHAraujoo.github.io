import type { Lang } from "@/content/profile";
import type { Project } from "@/content/projects";
import { ui } from "@/lib/i18n";
import { ApiFigure, PlateFigure, RouteFigure } from "./Figures";

const host = (href?: string) => (href ? href.replace(/^https?:\/\//, "").replace(/\/$/, "") : "");

export function Cover({
  project,
  lang,
  priority,
  withPhone,
}: {
  project: Project;
  lang: Lang;
  priority?: boolean;
  withPhone?: boolean;
}) {
  const { cover } = project;
  const url = host(project.links[0]?.href);

  if (cover.kind === "figure") {
    return (
      <div className="frame">
        <div className="frame-bar">
          <span className="frame-dot" />
          <span className="frame-dot" />
          <span className="frame-dot" />
          <span className="frame-url">
            {project.title.toLowerCase()} · {ui[lang].figure}
          </span>
        </div>
        {cover.figure === "route" && <RouteFigure lang={lang} />}
        {cover.figure === "api" && <ApiFigure lang={lang} />}
        {cover.figure === "plate" && <PlateFigure lang={lang} />}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="frame">
        <div className="frame-bar">
          <span className="frame-dot" />
          <span className="frame-dot" />
          <span className="frame-dot" />
          <span className="frame-url">{url}</span>
        </div>
        <img
          src={cover.src}
          alt={cover.alt[lang]}
          width={1920}
          height={1200}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {withPhone && cover.mobile && (
        <div className="phone absolute -bottom-8 right-4 hidden w-[19%] min-w-[104px] sm:block lg:-right-6">
          <img src={cover.mobile} alt="" width={780} height={1688} loading="lazy" decoding="async" />
        </div>
      )}
    </div>
  );
}
