import { Shell } from "@/components/Shell";
import { Resume } from "@/views/Resume";
import { paths } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const metadata = seo({ lang: "en", title: "Résumé", path: paths.resume("en"), alternate: paths.resume("pt") });

export default function Page() {
  return (
    <Shell lang="en" alternate={paths.resume("pt")} bare>
      <Resume lang="en" />
    </Shell>
  );
}
