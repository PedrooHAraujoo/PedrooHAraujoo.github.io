import type { ReactNode } from "react";
import "../globals.css";
import { Html } from "@/components/Shell";

export default function PtLayout({ children }: { children: ReactNode }) {
  return <Html lang="pt">{children}</Html>;
}
