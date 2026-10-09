
import csv
import time
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE = "https://brokeralarab.com"
HEADERS = {"User-Agent": "BrokerAlarab-OG-Audit/1.0"}

class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "meta":
            return
        a = dict(attrs)
        key = a.get("property") or a.get("name")
        if key:
            self.meta[key.lower()] = a.get("content", "")

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.read(), response.geturl(), response.status

def get_urls(sitemap, visited=None):
    if visited is None:
        visited = set()
    if sitemap in visited:
        return []
    visited.add(sitemap)

    xml, _, _ = fetch(sitemap)
    root = ET.fromstring(xml)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    if root.tag.endswith("sitemapindex"):
        urls = []
        for loc in root.findall(".//s:sitemap/s:loc", ns):
            urls.extend(get_urls(loc.text, visited))
        return urls

    return [
        loc.text.strip()
        for loc in root.findall(".//s:url/s:loc", ns)
        if loc.text
    ]

def check(url):
    try:
        html, final_url, status = fetch(url)
        parser = MetaParser()
        parser.feed(html.decode("utf-8", errors="replace"))

        required = [
            "og:title",
            "og:description",
            "og:url",
            "og:image",
            "twitter:image",
        ]

        missing = [
            tag for tag in required
            if not parser.meta.get(tag, "").strip()
        ]

        return {
            "url": url,
            "status": status,
            "missing": ", ".join(missing),
            "og_image": parser.meta.get("og:image", ""),
            "final_url": final_url,
        }

    except Exception as e:
        return {
            "url": url,
            "status": "ERROR",
            "missing": str(e),
            "og_image": "",
            "final_url": "",
        }

print("Reading sitemap...")
urls = list(dict.fromkeys(get_urls(BASE + "/sitemap.xml")))
print(f"Found {len(urls)} URLs. Starting audit...")

results = []

with ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(check, url): url for url in urls}

    for i, future in enumerate(as_completed(futures), 1):
        results.append(future.result())
        if i % 50 == 0 or i == len(urls):
            print(f"Checked {i}/{len(urls)}")

problems = [
    row for row in results
    if row["missing"] or row["status"] != 200
    or row["final_url"].rstrip("/") != row["url"].rstrip("/")
]

fields = ["url", "status", "missing", "og_image", "final_url"]

with open("og-audit-all.csv", "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(sorted(results, key=lambda x: x["url"]))

with open("og-audit-problems.csv", "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(sorted(problems, key=lambda x: x["url"]))

print()
print("========== AUDIT COMPLETE ==========")
print(f"Total URLs: {len(urls)}")
print(f"Pages needing review: {len(problems)}")
print("Reports:")
print("  og-audit-all.csv")
print("  og-audit-problems.csv")
