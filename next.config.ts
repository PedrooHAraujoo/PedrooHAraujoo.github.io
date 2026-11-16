import type { NextConfig } from "next";

// Site 100% estático: `next build` gera a pasta `out/`, que roda em qualquer
// hospedagem de arquivos (Vercel, GitHub Pages, Netlify, Cloudflare Pages).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
