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
    lang: "en",
    title: p.title,
    description: p.tagline.en,
    path: paths.project("en", slug),
    alternate: paths.project("pt", slug),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <Shell lang="en" alternate={paths.project("pt", slug)}>
      <Case lang="en" project={project} />
    </Shell>
  );
}
