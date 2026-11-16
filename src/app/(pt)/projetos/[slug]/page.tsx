import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Case } from "@/views/Case";
import { getProject, projects } from "@/content/projects";
import { paths } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return seo({
    lang: "pt",
    title: p.title,
    description: p.tagline.pt,
    path: paths.project("pt", slug),
    alternate: paths.project("en", slug),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <Shell lang="pt" alternate={paths.project("en", slug)}>
      <Case lang="pt" project={project} />
    </Shell>
  );
}
