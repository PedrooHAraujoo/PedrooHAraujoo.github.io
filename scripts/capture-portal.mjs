// Captura uma tela do portal da demonstração (login de exemplo, dados fictícios).
// Uso: node scripts/capture-portal.mjs "<texto do botão de login>" [url-depois] [nome-do-arquivo]
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const browser = await puppeteer.connect({
  browserURL: process.env.BROWSER_URL ?? "http://127.0.0.1:9333",
  defaultViewport: null,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto("https://solstead-demo.vercel.app/en/sign-in", { waitUntil: "networkidle2", timeout: 60000 });

const labels = await page.$$eval("button, a", (els) =>
  els.map((e) => (e.innerText || "").trim().replace(/\s+/g, " ")).filter(Boolean),
);
console.log("BOTOES:", JSON.stringify(labels.slice(0, 40)));

const alvo = process.argv[2];
if (alvo) {
  for (const h of await page.$$("button")) {
    const t = await h.evaluate((e) => (e.innerText || "").trim());
    if (t.includes(alvo)) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2", timeout: 60000 }).catch(() => {}),
        h.click(),
      ]);
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 3500));
  console.log("URL:", page.url());
  if (process.argv[3]) {
    await page.goto(process.argv[3], { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    console.log("URL2:", page.url());
  }
  const png = await page.screenshot({ type: "png" });
  const nome = process.argv[4] ?? "solstead-portal";
  const info = await sharp(png).resize({ width: 1920 }).webp({ quality: 82 }).toFile(`public/shots/${nome}.webp`);
  console.log("ok", info.width, info.height, Math.round(info.size / 1024) + " KB");
}

await page.close();
await browser.disconnect();
