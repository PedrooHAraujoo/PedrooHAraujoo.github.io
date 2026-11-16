import type { ReactNode } from "react";
import "../globals.css";
import { Html } from "@/components/Shell";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <Html lang="en">{children}</Html>;
}
