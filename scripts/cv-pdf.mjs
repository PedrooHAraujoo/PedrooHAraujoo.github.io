// Gera os PDFs do currículo (PT e EN) a partir das páginas /curriculo e
// /en/resume do site já compilado e servido localmente.
//
//   1. npm run build
//   2. sirva a pasta out/ (ex.: npx http-server out -p 3401)
//   3. abra o Edge: msedge --headless=new --remote-debugging-port=9333
//   4. npm run cv
//
// Saída em public/cv/ (entra no próximo build) e em out/cv/ (vale na hora).
import puppeteer from "puppeteer-core";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.env.CV_BASE ?? "http://localhost:3401";
const jobs = [
  { path: "/curriculo/", file: "Pedro-Araujo-Curriculo.pdf", title: "Pedro Henrique Araújo Souza - Currículo" },
  { path: "/en/resume/", file: "Pedro-Araujo-Resume.pdf", title: "Pedro Henrique Araújo Souza - Résumé" },
];

const browser = await puppeteer.connect({ browserURL: process.env.BROWSER_URL ?? "http://127.0.0.1:9333", defaultViewport: null });
await mkdir("public/cv", { recursive: true });
await mkdir("out/cv", { recursive: true });

for (const job of jobs) {
  const page = await browser.newPage();
  await page.goto(BASE + job.path, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMediaType("print");
  await page.evaluate((title) => (document.title = title), job.title);
  const heightMm = await page.evaluate(() => (document.querySelector(".cv-sheet").getBoundingClientRect().height * 25.4) / 96);
  const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true });
  const pages = (Buffer.from(pdf).toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  await writeFile(`public/cv/${job.file}`, pdf);
  await writeFile(`out/cv/${job.file}`, pdf);
  console.log(`${job.file}: ${pages} página(s), folha com ${heightMm.toFixed(0)} mm de 297, ${(pdf.length / 1024).toFixed(0)} KB`);
  await page.close();
}

await browser.disconnect();
