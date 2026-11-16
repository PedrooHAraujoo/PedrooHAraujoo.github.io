// Gera a imagem de compartilhamento do site (public/og.png, 1200x630) e a capa
// do LinkedIn (linkedin/capa-linkedin.png, 1584x396) com a mesma identidade.
// Uso: Edge aberto com --remote-debugging-port=9333 e `node scripts/brand-images.mjs`
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">`;

const base = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0b0c0f;color:#edebe6;font-family:'Geist',sans-serif;overflow:hidden;position:relative}
.bg{position:absolute;inset:0;background-image:
  radial-gradient(900px 520px at 92% -10%, rgba(255,107,26,.34), transparent 62%),
  radial-gradient(600px 400px at -5% 115%, rgba(255,107,26,.10), transparent 60%),
  linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);
  background-size:auto,auto,66px 66px,66px 66px}
.mono{font-family:'Geist Mono',monospace;letter-spacing:.14em;text-transform:uppercase}
.serif{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#ff6b1a;letter-spacing:-.01em}
.pa{display:grid;place-items:center;border-radius:999px;background:#ff6b1a;color:#0b0c0f;font-family:'Geist Mono',monospace;font-weight:600}
.chip{display:inline-block;border:1px solid rgba(255,255,255,.16);border-radius:999px;font-family:'Geist Mono',monospace;color:#d6d4cf}
`;

const og = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>${base}
body{width:1200px;height:630px}
.in{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;justify-content:space-between}
.who{display:flex;align-items:center;gap:18px;font-size:24px;font-weight:500}
.pa{width:54px;height:54px;font-size:17px}
.mono{font-size:15px;color:#9c9ea6}
h1{font-size:96px;line-height:.97;letter-spacing:-.045em;font-weight:500}
.chips{display:flex;gap:10px;flex-wrap:wrap}
.chip{padding:9px 16px;font-size:16px}
</style></head><body><div class="bg"></div><div class="in">
<div class="top"><div class="who"><span class="pa">PA</span>Pedro Araújo</div><div class="mono">Desenvolvedor Full Stack</div></div>
<h1>Construo software que<br><span class="serif">vai para produção.</span></h1>
<div class="chips">${["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Supabase"].map((x) => `<span class="chip">${x}</span>`).join("")}</div>
</div></body></html>`;

// No LinkedIn a foto de perfil cobre o canto inferior esquerdo da capa:
// o conteúdo fica do centro para a direita.
const banner = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>${base}
body{width:1584px;height:396px}
.in{position:absolute;inset:0;padding:40px 84px 40px 470px;display:flex;flex-direction:column;justify-content:center;gap:18px}
.mono{font-size:15px;color:#ff6b1a}
h1{font-size:66px;line-height:1;letter-spacing:-.045em;font-weight:500}
.chips{display:flex;gap:10px;flex-wrap:wrap}
.chip{padding:8px 15px;font-size:15.5px}
</style></head><body><div class="bg"></div><div class="in">
<div class="mono">Desenvolvedor Full Stack · Aracaju, BR · remoto</div>
<h1>Construo software que<br><span class="serif">vai para produção.</span></h1>
<div class="chips">${["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Supabase", "Stripe"].map((x) => `<span class="chip">${x}</span>`).join("")}</div>
</div></body></html>`;

const browser = await puppeteer.connect({ browserURL: process.env.BROWSER_URL ?? "http://127.0.0.1:9333", defaultViewport: null });
await mkdir("linkedin", { recursive: true });

for (const [html, w, h, out, scale] of [
  [og, 1200, 630, "public/og.png", 1],
  [banner, 1584, 396, "linkedin/capa-linkedin.png", 2],
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type: "png" });
  console.log("ok", out);
  await page.close();
}
await browser.disconnect();
