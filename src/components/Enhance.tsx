"use client";

import { useEffect } from "react";

// Único JavaScript de comportamento do site: revela blocos ao entrar na tela e
// marca o cabeçalho quando a página rola. Sem ele o conteúdo continua visível.
export function Enhance() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const show = (el: Element) => el.classList.add("in");

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              show(e.target);
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      els.forEach((el) => io!.observe(el));
    } else {
      els.forEach(show);
    }

    const header = document.querySelector<HTMLElement>("[data-header]");
    const onScroll = () => header?.toggleAttribute("data-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
