// Captura telas reais dos projetos no ar e grava em public/shots como WebP.
// Uso: abrir o Edge com --headless=new --remote-debugging-port=9333 e rodar
//   node scripts/capture.mjs [nome-do-alvo ...]
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const BROWSER_URL = process.env.BROWSER_URL ?? "http://127.0.0.1:9333";
const OUT = new URL("../public/shots/", import.meta.url);

/** @type {{name:string,url:string,width:number,height:number,dpr:number,outWidth:number,before?:(page:import('puppeteer-core').Page)=>Promise<void>}[]} */
const targets = [
  { name: "ambiance-home", url: "https://ambianceairscents.com/", width: 1440, height: 900, dpr: 2, outWidth: 1920 },
  { name: "ambiance-mobile", url: "https://ambianceairscents.com/", width: 390, height: 844, dpr: 3, outWidth: 780 },
  { name: "jucara-home", url: "https://jucaramelo.com.br/", width: 1440, height: 900, dpr: 2, outWidth: 1920 },
  { name: "jucara-mobile", url: "https://jucaramelo.com.br/", width: 390, height: 844, dpr: 3, outWidth: 780 },
  { name: "solstead-home", url: "https://solstead-demo.vercel.app/en", width: 1440, height: 900, dpr: 2, outWidth: 1920 },
  { name: "araujo-home", url: "https://www.araujosoftware.com.br/", width: 1440, height: 900, dpr: 2, outWidth: 1920 },
];

const wanted = process.argv.slice(2);
const list = wanted.length ? targets.filter((t) => wanted.includes(t.name)) : targets;

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.connect({ browserURL: BROWSER_URL, defaultViewport: null });

for (const t of list) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: t.width, height: t.height, deviceScaleFactor: t.dpr, isMobile: t.width < 600, hasTouch: t.width < 600 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(t.url, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    if (t.before) await t.before(page);
    const png = await page.screenshot({ type: "png" });
    const file = new URL(`${t.name}.webp`, OUT);
    const info = await sharp(png).resize({ width: t.outWidth }).webp({ quality: 82 }).toFile(file.pathname.replace(/^\/([A-Za-z]:)/, "$1"));
    console.log(`${t.name}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.error(`${t.name}: FALHOU - ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.disconnect();
