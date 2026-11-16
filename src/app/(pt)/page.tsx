import { Shell } from "@/components/Shell";
import { Home } from "@/views/Home";
import { paths } from "@/lib/i18n";
import { personJsonLd, seo } from "@/lib/seo";

export const metadata = seo({ lang: "pt", path: paths.home("pt"), alternate: paths.home("en") });

export default function Page() {
  return (
    <Shell lang="pt" alternate={paths.home("en")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd("pt")) }} />
      <Home lang="pt" />
    </Shell>
  );
}
