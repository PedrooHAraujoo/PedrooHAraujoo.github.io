import { Shell } from "@/components/Shell";
import { Home } from "@/views/Home";
import { paths } from "@/lib/i18n";
import { personJsonLd, seo } from "@/lib/seo";

export const metadata = seo({ lang: "en", path: paths.home("en"), alternate: paths.home("pt") });

export default function Page() {
  return (
    <Shell lang="en" alternate={paths.home("pt")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd("en")) }} />
      <Home lang="en" />
    </Shell>
  );
}
