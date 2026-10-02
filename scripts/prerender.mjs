// Build-time prerender: bakes the rendered app, JSON-LD, llms.txt and sitemap.xml into dist/
// so crawlers and LLMs get the full content without running JavaScript.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const { render, jsonLd, llmsTxt, sitemapXml } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);

const today = new Date().toISOString().slice(0, 10);
const indexPath = path.join(dist, "index.html");
const template = await fs.readFile(indexPath, "utf8");

const ROOT_TAG = '<div id="root"></div>';
if (!template.includes(ROOT_TAG)) throw new Error(`prerender: ${ROOT_TAG} not found in dist/index.html`);

const appHtml = render("/");
// "<" is escaped so the JSON can never close its <script> tag early
const structured = JSON.stringify(jsonLd(today)).replace(/</g, "\\u003c");

const html = template
  .replace(ROOT_TAG, `<div id="root">${appHtml}</div>`)
  .replace("</head>", `  <script type="application/ld+json">${structured}</script>\n  </head>`);

await fs.writeFile(indexPath, html);
await fs.writeFile(path.join(dist, "llms.txt"), llmsTxt());
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemapXml(today));
await fs.rm(serverDir, { recursive: true, force: true });

console.log(`prerender: index.html (${(appHtml.length / 1024).toFixed(1)} KB of markup), llms.txt, sitemap.xml`);
