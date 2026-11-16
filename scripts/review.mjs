// Revisão visual: captura a página inteira (depois de rolar, para disparar as
// entradas) e corta em fatias fáceis de olhar. Saída em .capturas/.
// Uso: node scripts/review.mjs <url> <nome> [largura] [altura] [fatia]
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const [url, name, w = "1440", h = "900", slice = "1500"] = process.argv.slice(2);
const width = Number(w);
const height = Number(h);

await mkdir(".capturas", { recursive: true });
const browser = await puppeteer.connect({ browserURL: process.env.BROWSER_URL ?? "http://127.0.0.1:9333", defaultViewport: null });
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += Math.round(height * 0.7)) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await new Promise((r) => setTimeout(r, 140));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 1200));

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
const hidden = await page.evaluate(() => document.querySelectorAll("html.js [data-reveal]:not(.in)").length);
const png = await page.screenshot({ type: "png", fullPage: true });
const meta = await sharp(png).metadata();
const step = Number(slice);
let n = 0;
for (let top = 0; top < meta.height; top += step) {
  n += 1;
  await sharp(png)
    .extract({ left: 0, top, width: meta.width, height: Math.min(step, meta.height - top) })
    .jpeg({ quality: 78 })
    .toFile(`.capturas/${name}-${String(n).padStart(2, "0")}.jpg`);
}
console.log(JSON.stringify({ name, page: `${meta.width}x${meta.height}`, slices: n, overflowX: overflow, notRevealed: hidden, errors }));

await page.close();
await browser.disconnect();
