import { Shell } from "@/components/Shell";
import { Resume } from "@/views/Resume";
import { paths } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const metadata = seo({ lang: "pt", title: "Currículo", path: paths.resume("pt"), alternate: paths.resume("en") });

export default function Page() {
  return (
    <Shell lang="pt" alternate={paths.resume("en")} bare>
      <Resume lang="pt" />
    </Shell>
  );
}
