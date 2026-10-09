
import fs from "node:fs";

const BASE = "https://brokeralarab.com";
const REQUIRED = [
  "og:title",
  "og:description",
  "og:url",
  "og:image",
  "twitter:image",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "BrokerAlarab-OG-Audit/1.0" },
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return {
    text: await response.text(),
    finalUrl: response.url,
    status: response.status,
  };
}

async function sitemapUrls(url, visited = new Set()) {
  if (visited.has(url)) return [];
  visited.add(url);

  const { text } = await fetchText(url);
  const locations = [...text.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)]
    .map((match) => match[1].trim().replaceAll("&amp;", "&"));

  if (text.includes("<sitemapindex")) {
    const groups = [];
    for (const location of locations) {
      groups.push(...await sitemapUrls(location, visited));
    }
    return groups;
  }

  return locations;
}

function metaTags(html) {
  const result = {};
  const tags = html.match(/<meta\b[^>]*>/gi) || [];

  for (const tag of tags) {
    const attributes = {};
    const regex = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let match;

    while ((match = regex.exec(tag)) !== null) {
      attributes[match[1].toLowerCase()] =
        match[2] ?? match[3] ?? match[4] ?? "";
    }

    const key = attributes.property || attributes.name;
    if (key) result[key.toLowerCase()] = attributes.content || "";
  }

  return result;
}

async function check(url) {
  try {
    const { text, finalUrl, status } = await fetchText(url);
    const tags = metaTags(text);

    const missing = REQUIRED.filter((key) => !tags[key]?.trim());

    return {
      url,
      status,
      missing: missing.join("; "),
      og_image: tags["og:image"] || "",
      final_url: finalUrl,
    };
  } catch (error) {
    return {
      url,
      status: "ERROR",
      missing: String(error.message || error),
      og_image: "",
      final_url: "",
    };
  }
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function writeCsv(filename, rows) {
  const fields = ["url", "status", "missing", "og_image", "final_url"];
  const lines = [
    fields.join(","),
    ...rows.map((row) => fields.map((key) => csvCell(row[key])).join(",")),
  ];

  fs.writeFileSync(filename, "\uFEFF" + lines.join("\r\n"), "utf8");
}

console.log("Reading sitemap...");

const urls = [...new Set(await sitemapUrls(`${BASE}/sitemap.xml`))];
console.log(`Found ${urls.length} URLs. Starting audit...`);

const results = [];
let next = 0;

async function worker() {
  while (next < urls.length) {
    const index = next++;
    const result = await check(urls[index]);
    results.push(result);

    if (results.length % 50 === 0 || results.length === urls.length) {
      console.log(`Checked ${results.length}/${urls.length}`);
    }

    await sleep(150);
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));

const problems = results.filter(
  (row) =>
    row.missing ||
    row.status !== 200 ||
    row.final_url.replace(/\/$/, "") !== row.url.replace(/\/$/, "")
);

results.sort((a, b) => a.url.localeCompare(b.url));
problems.sort((a, b) => a.url.localeCompare(b.url));

writeCsv("og-audit-all.csv", results);
writeCsv("og-audit-problems.csv", problems);

console.log("\n========== AUDIT COMPLETE ==========");
console.log(`Total URLs: ${urls.length}`);
console.log(`Pages needing review: ${problems.length}`);
console.log("Reports:");
console.log("  og-audit-all.csv");
console.log("  og-audit-problems.csv");
