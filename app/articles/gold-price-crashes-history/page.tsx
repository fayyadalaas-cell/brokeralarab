
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   BROKER ALARAB
   ARTICLE PAGE — GOLD PRICE CRASHES HISTORY
   Next.js App Router / Server Component
   ========================================================= */

const SITE = "https://brokeralarab.com";
const SLUG = "gold-price-crashes-history";
const PATH = `/articles/${SLUG}`;
const URL = `${SITE}${PATH}`;


const ARTICLE = {
  title:
    "أكبر انهيارات الذهب في التاريخ: الخسائر ومدة التعافي",

  seoTitle:
    "أكبر انهيارات الذهب في التاريخ: الخسائر ومدة التعافي",

  description:
    "اكتشف أكبر انهيارات الذهب منذ 1974 حتى 2026، ونسب الخسائر التاريخية وأسباب الهبوط، وكم استغرق الذهب للتعافي واستعادة قممه السابقة.",

  category: "مقالات وتحليلات",
  subcategory: "الذهب والأسواق",
  publisher: "بروكر العرب",
  published: "2026-11-23",
  modified: "2026-11-23",
};


/*
  IMAGE PLACEHOLDER

  The hero image is intentionally disabled.

  When the final image is ready:
  1. Upload it to /public/articles/gold-crashes-hero.webp
  2. Replace the placeholder in ArticleHeroImage below.
  3. Add its URL to openGraph.images and twitter.images.
  4. Add image to the Article JSON-LD.
*/

const HERO_IMAGE =
  "/articles/gold-crashes-hero-updated.webp";

/* =========================================================
   METADATA
   ========================================================= */


export const metadata: Metadata = {
  title: ARTICLE.seoTitle,
  description: ARTICLE.description,

  
alternates: {
  canonical: URL,

  languages: {
    "ar": `${SITE}/articles/gold-price-crashes-history`,
    "en": `${SITE}/en/articles/gold-price-crashes-history`,
  },
},


  openGraph: {
    type: "article",
    url: URL,
    title: ARTICLE.title,
    description: ARTICLE.description,
    siteName: "Broker Alarab",
    locale: "ar_AR",
    publishedTime: ARTICLE.published,
    modifiedTime: ARTICLE.modified,

    images: [
      {
        url: `${SITE}${HERO_IMAGE}`,
        width: 1774,
        height: 887,
        alt: ARTICLE.title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: ARTICLE.seoTitle,
    description: ARTICLE.description,
    images: [`${SITE}${HERO_IMAGE}`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


/* =========================================================
   ARTICLE DATA
   ========================================================= */

type Drawdown = {
  period: string;
  peak: string;
  bottom: string;
  drop: string;
  recovery: string;
  value: number;
};

const drawdowns: Drawdown[] = [
  {
    period: "1980–1999",
    peak: "$850.00",
    bottom: "$252.80",
    drop: "−70.3%",
    recovery: "نحو 28 عاماً",
    value: 70.3,
  },
  {
    period: "1974–1976",
    peak: "$195.25",
    bottom: "$103.50",
    drop: "−47.0%",
    recovery: "نحو 3 سنوات ونصف",
    value: 47,
  },
  {
    period: "2011–2015",
    peak: "$1,895.00",
    bottom: "$1,049.40",
    drop: "−44.6%",
    recovery: "نحو 9 سنوات",
    value: 44.6,
  },
  {
    period: "2008",
    peak: "$1,011.25",
    bottom: "$712.50",
    drop: "−29.5%",
    recovery: "نحو 18 شهراً",
    value: 29.5,
  },
  {
    period: "2020–2022",
    peak: "$2,067.15",
    bottom: "$1,628.75",
    drop: "−21.2%",
    recovery: "نحو 3 سنوات و5 أشهر",
    value: 21.2,
  },
  {
    period: "1978",
    peak: "$242.75",
    bottom: "$193.40",
    drop: "−20.3%",
    recovery: "نحو 3 أشهر",
    value: 20.3,
  },
];

const recoveryMath = [
  ["10%", "11.1%"],
  ["20%", "25.0%"],
  ["30%", "42.9%"],
  ["40%", "66.7%"],
  ["50%", "100%"],
  ["70%", "233.3%"],
];

const contents = [
  { id: "summary", label: "أهم النتائج" },
  { id: "history-table", label: "جدول الانهيارات" },
  { id: "crash-1974", label: "هبوط 1974–1976" },
  { id: "crash-1978", label: "تصحيح 1978" },
  { id: "crash-1980", label: "انهيار 1980" },
  { id: "crash-2008", label: "أزمة 2008" },
  { id: "crash-2011", label: "هبوط 2011–2015" },
  { id: "crash-2020", label: "هبوط 2020–2022" },
  { id: "crash-2026", label: "هبوط 2026" },
  { id: "causes", label: "أسباب انهيارات الذهب" },
  { id: "recovery-math", label: "حساب التعافي" },
  { id: "forecast", label: "هل يمكن التنبؤ؟" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "conclusion", label: "الخلاصة" },
  { id: "methodology", label: "المنهجية والمصادر" },
];

const sources = [
  {
    title:
      "مجلس الذهب العالمي — دراسة الأسواق الهابطة التاريخية",
    url:
      "https://www.gold.org/goldhub/research/whats-a-bear-case-for-gold",
  },
  {
    title:
      "مجلس الذهب العالمي — الملحق التاريخي للدورات الهابطة",
    url:
      "https://www.gold.org/goldhub/research/whats-bear-case-gold-historical-perspective/19836",
  },
  {
    title:
      "مجلس الذهب العالمي — تحليل سوق الذهب أكتوبر 2026",
    url:
      "https://www.gold.org/goldhub/research/gold-market-commentary-october-2026",
  },
  {
    title:
      "جمعية سوق لندن للسبائك — القمة التاريخية ديسمبر 2023",
    url:
      "https://www.lbma.org.uk/articles/lbma-london-gold-price-breaks-all-time-record-as-year-draws-to-a-close",
  },
  {
    title:
      "هيئة الأوراق المالية الأمريكية — إفصاح تاريخي عن أسعار الذهب",
    url:
      "https://www.sec.gov/Archives/edgar/data/1222333/000095012309066100/y02316e10vk.htm",
  },
  {
    title:
      "إفصاح Kinross التاريخي عن أسعار الذهب لدى SEC",
    url:
      "https://www.sec.gov/Archives/edgar/data/701818/000110465926035268/kgc-20251231xex99d1.htm",
  },
  {
    title:
      "رويترز — تراجع الذهب في 20 نوفمبر 2026",
    url:
      "https://www.reuters.com/world/india/gold-set-worst-week-eight-months-firm-dollar-fed-hike-bets-weigh-2026-11-20/",
  },
  {
    title:
      "رويترز — ارتداد الذهب في 23 نوفمبر 2026",
    url:
      "https://www.reuters.com/world/india/gold-rises-14-month-low-markets-await-key-us-inflation-data-2026-11-23/",
  },
];

/* =========================================================
   SHARED ARTICLE DESIGN COMPONENTS
   These can later move to /components/articles/
   ========================================================= */

function ArticleSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-slate-100 py-5 last:border-0 sm:py-7"
    >
      {eyebrow && (
        <span className="mb-2 block text-[11px] font-extrabold text-[#176ac8] sm:text-xs">
          {eyebrow}
        </span>
      )}

      <h2 className="border-r-[4px] border-[#2587e7] pr-3 text-[22px] font-black leading-[1.5] tracking-tight text-[#101d35] sm:pr-4 sm:text-[29px]">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[14px] leading-[2.05] text-slate-700 sm:text-[16px] sm:leading-[2]">
        {children}
      </div>
    </section>
  );
}

function SubHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="!mt-8 text-[17px] font-black leading-[1.7] text-[#102a4a] sm:text-[20px]">
      {children}
    </h3>
  );
}

function Paragraph({
  children,
}: {
  children: ReactNode;
}) {
  return <p>{children}</p>;
}

function Strong({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <strong className="font-black text-[#11294b]">
      {children}
    </strong>
  );
}

function ArticleList({
  items,
}: {
  items: ReactNode[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3"
        >
          <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#2587e7]" />
          <span className="min-w-0 flex-1">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Note({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "amber";
}) {
  const amber = tone === "amber";

  return (
    <aside
      className={`!my-5 rounded-[15px] border p-4 sm:p-5 ${
        amber
          ? "border-amber-200 bg-[#fffbef]"
          : "border-blue-100 bg-[#f1f7fe]"
      }`}
    >
      <div
        className={`text-[13px] font-black sm:text-[15px] ${
          amber ? "text-amber-900" : "text-[#10549f]"
        }`}
      >
        {title}
      </div>

      <div className="mt-2 text-[13px] leading-[2] text-slate-700 sm:text-[14px]">
        {children}
      </div>
    </aside>
  );
}

/* =========================================================
   HERO IMAGE PLACEHOLDER
   ========================================================= */


/* =========================================================
   ARTICLE HERO IMAGE
   Responsive / SEO / Optimized
   ========================================================= */

function ArticleHeroImage() {
  return (
    <figure className="mt-6 sm:mt-8">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">
        <Image
          src={HERO_IMAGE}
          alt="أكبر انهيارات الذهب في التاريخ: سبائك ذهبية ورسم بياني يوضح هبوط أسعار الذهب ثم تعافيها"
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />
      </div>

      <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
        صورة توضيحية لانهيارات الذهب التاريخية وفترات التعافي،
        وليست رسماً بيانياً للأسعار الفعلية.
      </figcaption>
    </figure>
  );
}


/* =========================================================
   TABLE OF CONTENTS
   ========================================================= */


/* =========================================================
   ARTICLE TABLE OF CONTENTS
   Compact / Responsive / SEO-friendly
   ========================================================= */


/* =========================================================
   TABLE OF CONTENTS
   Mobile: compact expandable menu
   Desktop: original 3-column layout
   ========================================================= */

function TableOfContents() {
  return (
    <>
      {/* =========================
          MOBILE ONLY
          ========================= */}

      <nav
        aria-label="فهرس المقال للموبايل"
        className="my-5 sm:hidden"
      >
        <details className="group overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white shadow-sm">

          <summary className="flex min-h-[65px] cursor-pointer list-none items-center gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[#176ac8]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-black text-[#102747]">
                محتويات المقال
              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">
                {contents.length} قسماً • اضغط لاستعراضها
              </span>
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-[#f5f9ff] text-[#176ac8] transition-transform group-open:rotate-180">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>

          <div className="border-t border-slate-100 bg-[#f8fbff] p-2.5">
            <div className="grid grid-cols-2 gap-2">
              {contents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex min-h-[45px] min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-right transition active:bg-blue-50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf3ff] text-[9px] font-black text-[#176ac8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1 text-[10px] font-extrabold leading-4 text-[#243b57]">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </details>
      </nav>

      {/* =========================
          DESKTOP / TABLET
          ========================= */}

      <nav
        aria-label="فهرس محتويات المقال"
        className="my-6 hidden overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:block"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#e5edf6] bg-[linear-gradient(270deg,#f3f8ff_0%,#ffffff_100%)] px-6 py-5">

          <div>
            <h2 className="text-[19px] font-black text-[#102747]">
              محتويات المقال
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              انتقل مباشرة إلى القسم الذي يهمك
            </p>
          </div>

          <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-3 py-1.5 text-[11px] font-black text-[#1765b5]">
            {contents.length} موضوعاً
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5 xl:grid-cols-3">
          {contents.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex min-h-[54px] min-w-0 items-center gap-3 rounded-[12px] border border-[#e8eef6] bg-[#f8fafc] px-3 py-2.5 text-right transition-all duration-200 hover:-translate-y-0.5 hover:border-[#aacdf4] hover:bg-[#edf6ff]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[11px] font-black text-[#176ac8] shadow-sm ring-1 ring-[#e2ebf6] transition group-hover:bg-[#176ac8] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 text-[12px] font-extrabold leading-5 text-[#243b57] group-hover:text-[#176ac8]">
                {item.label}
              </span>

              <span className="text-[#9aacc2] group-hover:text-[#176ac8]">
                ‹
              </span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}



/* =========================================================
   HISTORICAL TABLE
   DESKTOP TABLE + MOBILE CARDS
   ========================================================= */

function HistoricalTable() {
  const rows = [
    ...drawdowns,
    {
      period: "2026 — مستمرة",
      peak: "$5,405.00",
      bottom: "متغير",
      drop: "غير نهائي",
      recovery: "لم يتحقق بعد",
      value: 0,
    },
  ];

  return (
    <div className="!mt-7">
      {/* DESKTOP */}

      <div className="hidden overflow-hidden rounded-[17px] border border-slate-200 shadow-sm md:block">
        <table className="w-full table-fixed text-right">
          <thead className="bg-[#092443] text-white">
            <tr className="text-[12px]">
              <th className="w-[19%] px-4 py-4">
                الفترة
              </th>
              <th className="w-[17%] px-3 py-4 text-center">
                القمة
              </th>
              <th className="w-[17%] px-3 py-4 text-center">
                القاع
              </th>
              <th className="w-[17%] px-3 py-4 text-center">
                الهبوط
              </th>
              <th className="w-[30%] px-3 py-4 text-center">
                التعافي من تاريخ القمة
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.period}
                className={`border-t border-slate-200 ${
                  row.value === 0
                    ? "bg-amber-50"
                    : index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >
                <td className="px-4 py-4 text-[13px] font-black text-[#102747]">
                  {row.period}
                </td>

                <td
                  dir="ltr"
                  className="px-3 py-4 text-center text-[12px] font-bold text-slate-700"
                >
                  {row.peak}
                </td>

                <td
                  dir="ltr"
                  className="px-3 py-4 text-center text-[12px] font-bold text-slate-700"
                >
                  {row.bottom}
                </td>

                <td className="px-3 py-4 text-center">
                  <span
                    dir="ltr"
                    className={`inline-flex rounded-lg px-3 py-1 text-[12px] font-black ${
                      row.value === 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {row.drop}
                  </span>
                </td>

                <td className="px-3 py-4 text-center text-[12px] font-bold text-slate-700">
                  {row.recovery}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE / TABLET */}

      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.period}
            className={`overflow-hidden rounded-[15px] border ${
              row.value === 0
                ? "border-amber-200 bg-amber-50/60"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3.5 py-3">
              <span className="text-[14px] font-black text-[#102747]">
                {row.period}
              </span>

              <span
                dir="ltr"
                className={`rounded-lg px-2.5 py-1 text-[13px] font-black ${
                  row.value === 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {row.drop}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[10px] font-bold text-slate-500">
                  أعلى سعر
                </div>

                <div
                  dir="ltr"
                  className="mt-1 text-right text-[15px] font-black text-slate-900"
                >
                  {row.peak}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[10px] font-bold text-slate-500">
                  أدنى سعر
                </div>

                <div
                  dir={row.value === 0 ? "rtl" : "ltr"}
                  className="mt-1 text-right text-[15px] font-black text-slate-900"
                >
                  {row.bottom}
                </div>
              </div>

              <div className="col-span-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5">
                <div className="text-[10px] font-bold text-slate-500">
                  المدة حتى استعادة القمة
                </div>

                <div className="mt-0.5 text-[13px] font-black text-[#14549b]">
                  {row.recovery}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DRAWDOWN CHART
   ========================================================= */

function DrawdownChart() {
  return (
    <figure className="!mt-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">
      <figcaption className="mb-6">
        <h3 className="text-[17px] font-black text-[#102747] sm:text-[20px]">
          مقارنة عمق انهيارات الذهب
        </h3>

        <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
          نسبة التراجع من القمة إلى القاع — الدورات التاريخية المكتملة.
        </p>
      </figcaption>

      <div className="space-y-4">
        {drawdowns.map((item, index) => (
          <div key={item.period}>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-[11px] font-black text-slate-700 sm:text-[13px]">
                {item.period}
              </span>

              <span
                dir="ltr"
                className={`text-[12px] font-black sm:text-[14px] ${
                  index === 0
                    ? "text-red-700"
                    : "text-[#1766b3]"
                }`}
              >
                {item.drop}
              </span>
            </div>

            <div className="h-[13px] overflow-hidden rounded-full bg-[#eaf0f7] sm:h-[16px]">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-gradient-to-l from-red-500 to-orange-400"
                    : "bg-gradient-to-l from-[#145bb3] to-[#38bdf8]"
                }`}
                style={{
                  width: `${(item.value / 70.3) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
        لم تُدرج موجة 2026 في هذا المخطط لأن قاعها النهائي
        لم يتحدد حتى تاريخ إعداد المقال.
      </p>
    </figure>
  );
}

/* =========================================================
   RECOVERY TABLE
   ========================================================= */

function RecoveryTable() {
  return (
    <div className="!mt-6 overflow-hidden rounded-[15px] border border-slate-200">
      <table className="w-full table-fixed text-center">
        <thead className="bg-[#092443] text-white">
          <tr className="text-[11px] sm:text-[13px]">
            <th className="w-1/2 px-2 py-3.5 font-black sm:px-4">
              نسبة الهبوط
            </th>

            <th className="w-1/2 px-2 py-3.5 font-black sm:px-4">
              الارتفاع المطلوب للتعافي
            </th>
          </tr>
        </thead>

        <tbody>
          {recoveryMath.map((row, index) => (
            <tr
              key={row[0]}
              className={`border-t border-slate-200 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <td
                dir="ltr"
                className="px-2 py-3 text-[13px] font-black text-red-700 sm:text-[15px]"
              >
                {row[0]}
              </td>

              <td
                dir="ltr"
                className="px-2 py-3 text-[13px] font-black text-[#1263b3] sm:text-[15px]"
              >
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   FAQ COMPONENT
   ========================================================= */

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 py-5 first:pt-0 last:border-0 last:pb-0">
      <h3 className="text-[15px] font-black leading-7 text-[#102747] sm:text-[17px]">
        {question}
      </h3>

      <div className="mt-2 text-[13px] leading-[2] text-slate-600 sm:text-[15px]">
        {children}
      </div>
    </div>
  );
}


/* =========================================================
   FEATURED BROKERS — ARTICLE INSERT
   Source: brokers table / Supabase
   Ranking: general published broker rating
   ========================================================= */

type ArticleBroker = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  rating: number | string | null;
  min_deposit: number | string | null;
  islamic_account: boolean | null;
    real_account_url: string | null;
};

async function getArticleGoldBrokers(): Promise<ArticleBroker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
  "id, name, slug, logo, rating, min_deposit, islamic_account, real_account_url"
)
    .eq("publication_status", "published")
    .eq("is_full_review", true)
    .not("rating", "is", null)
    .not("slug", "is", null)
    .order("rating", { ascending: false })
    .limit(4);

  if (error) {
    console.error(
      "Article featured brokers:",
      error.message
    );
    return [];
  }

  return (data ?? []) as ArticleBroker[];
}


function FeaturedBrokerCard({
  broker,
  rank,
}: {
  broker: ArticleBroker;
  rank: number;
}) {
  const rating = Number(broker.rating);

  const ratingText =
    broker.rating !== null &&
    broker.rating !== undefined &&
    Number.isFinite(rating)
      ? rating.toFixed(1)
      : "—";

  const deposit =
    broker.min_deposit !== null &&
    broker.min_deposit !== undefined
      ? `$${broker.min_deposit}`
      : "غير محدد";

  const reviewUrl = `/brokers/${broker.slug}`;

  return (
    <article
      className="group relative min-w-0 overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.09)] sm:rounded-[18px] sm:p-5"
      dir="rtl"
    >
      {/* TOP ACCENT */}

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] via-[#38bdf8] to-transparent" />

      {/* ============================================
          BROKER IDENTITY
          Compact on mobile / Original on desktop
      ============================================ */}

      <div className="flex min-w-0 items-center gap-2.5 px-3 pb-2 pt-3.5 sm:gap-3 sm:p-0">

        {/* LOGO */}

        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-slate-200 bg-white p-1.5 shadow-sm sm:h-[62px] sm:w-[62px] sm:rounded-[14px] sm:p-2">
          {broker.logo ? (
            <img
              src={broker.logo}
              alt={`شعار ${broker.name}`}
              width={50}
              height={50}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-[10px] font-black text-[#176ac8] sm:text-xs">
              {broker.name.slice(0, 2)}
            </span>
          )}
        </div>

        {/* BROKER NAME + RATING */}

        <div className="min-w-0 flex-1">

          <h3 className="min-w-0 break-words text-[15px] font-black leading-5 text-[#102747] sm:text-[19px] sm:leading-6">
            {broker.name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:mt-1.5">

            <span className="text-[10px] font-bold text-slate-500 sm:text-[12px]">
              التقييم العام
            </span>

            <span
              dir="ltr"
              className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700 sm:text-[13px]"
            >
              <span aria-hidden="true">★</span>
              {ratingText}
            </span>

          </div>
        </div>

        {/* RANK */}

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#eaf3ff] text-[11px] font-black text-[#1765b5] sm:h-8 sm:w-8 sm:rounded-[10px] sm:text-[12px]">
          {rank}
        </div>

      </div>

      {/* ============================================
          BROKER METRICS
          Compact on mobile / Original on desktop
      ============================================ */}

      <div className="mx-3 grid grid-cols-2 gap-2 sm:mx-0 sm:mt-4">

        {/* MINIMUM DEPOSIT */}

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            الحد الأدنى للإيداع
          </p>

          <p
            dir={deposit.startsWith("$") ? "ltr" : "rtl"}
            className="mt-0.5 break-words text-right text-[12px] font-black text-[#102747] sm:mt-1 sm:text-[14px]"
          >
            {deposit}
          </p>

        </div>

        {/* ISLAMIC ACCOUNT */}

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            حساب إسلامي
          </p>

          <p
            className={`mt-0.5 text-[12px] font-black sm:mt-1 sm:text-[13px] ${
              broker.islamic_account === true
                ? "text-emerald-700"
                : "text-slate-600"
            }`}
          >
            {broker.islamic_account === true
              ? "متاح"
              : broker.islamic_account === false
              ? "غير متاح"
              : "غير محدد"}
          </p>

        </div>

      </div>

     

      
{/* ============================================
    BROKER ACTION BUTTONS
    REVIEW + OPEN ACCOUNT
============================================ */}

<div className="grid grid-cols-2 gap-2 px-3 pb-3 pt-2.5 sm:mt-4 sm:gap-2.5 sm:px-0 sm:pb-0 sm:pt-0">

  {/* REVIEW BUTTON */}

  <Link
    href={reviewUrl}
    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[12px] bg-[#176ac8] px-2 py-2.5 text-center text-[11px] font-black text-white transition duration-200 hover:bg-[#10549f] sm:text-[13px]"
  >
    تقييم الشركة
    <span aria-hidden="true">←</span>
  </Link>

  {/* OPEN ACCOUNT BUTTON */}

  {broker.real_account_url ? (
    <a
      href={broker.real_account_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[12px] border border-[#bdd8f5] bg-[#eaf3ff] px-2 py-2.5 text-center text-[11px] font-black text-[#155da9] transition duration-200 hover:border-[#80b4ec] hover:bg-[#dcecff] sm:text-[13px]"
    >
      فتح حساب
      <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span
      className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-[12px] border border-slate-200 bg-slate-100 px-2 py-2.5 text-center text-[10px] font-bold text-slate-400 sm:text-[12px]"
    >
      فتح حساب غير متاح
    </span>
  )}

</div>
    </article>
  );
}


function FeaturedGoldBrokers({
  brokers,
}: {
  brokers: ArticleBroker[];
}) {
  if (brokers.length === 0) {
    return null;
  }

  return (
    <aside
      id="featured-gold-brokers"
      aria-label="وسطاء تداول بارزون"
      dir="rtl"
      className="relative my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:my-12 sm:rounded-[24px]"
    >
      {/* Section heading */}

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] px-4 py-6 text-right sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute -left-12 -top-24 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
            مقارنة الوسطاء
          </span>

          <h2 className="mt-3 text-[22px] font-black leading-[1.5] text-white sm:text-[27px]">
            تعرّف على أبرز شركات تداول الذهب
          </h2>

          <p className="mt-2 max-w-[850px] text-[12px] leading-7 text-slate-200 sm:text-[14px] sm:leading-8">
            بعد استعراض تاريخ تقلبات الذهب، يمكنك
            التعرف على مجموعة من شركات التداول المنشورة
            لدى بروكر العرب، ومراجعة تقييماتها وشروط
            حساباتها قبل اختيار الوسيط المناسب.
          </p>
        </div>
      </div>

      {/* Broker cards */}

      <div className="p-3 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {brokers.map((broker, index) => (
            <FeaturedBrokerCard
              key={broker.id}
              broker={broker}
              rank={index + 1}
            />
          ))}
        </div>

        {/* Main category CTA */}

        <div className="mt-5 flex flex-col items-start gap-4 rounded-[15px] border border-blue-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <h3 className="text-[14px] font-black text-[#102747] sm:text-[16px]">
              تريد مقارنة المزيد من شركات تداول الذهب؟
            </h3>

            <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
              اطلع على قائمة الوسطاء ومعلومات الإيداع
              والتراخيص والحسابات وشروط التداول.
            </p>
          </div>

          <Link
            href="/best-brokers/gold"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[12px] border border-[#bfd8f3] bg-[#eaf3ff] px-5 py-3 text-center text-[12px] font-black text-[#145aa5] transition hover:border-blue-400 hover:bg-blue-100 sm:w-auto sm:text-[13px]"
          >
            مقارنة أفضل 10 شركات لتداول الذهب
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          تُعرض الشركات وفق التقييم العام المنشور
          في قاعدة بيانات بروكر العرب. ترتيبها هنا
          لا يمثل تقييماً مستقلاً لتكاليف تداول الذهب،
          وقد تختلف شروط الحساب حسب الدولة والجهة
          التنظيمية.
        </p>
      </div>
    </aside>
  );
}


/* =========================================================
   STRUCTURED DATA
   ========================================================= */

function ArticleStructuredData() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ARTICLE.title,
    description: ARTICLE.description,
    image: {
  "@type": "ImageObject",
  url: `${SITE}${HERO_IMAGE}`,
  width: 1774,
  height: 887,
},
    inLanguage: "ar",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": URL,
    },
    url: URL,
    datePublished: ARTICLE.published,
    dateModified: ARTICLE.modified,
    articleSection: "الذهب والأسواق",
    author: {
      "@type": "Organization",
      name: "بروكر العرب",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: SITE,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Broker Alarab",
      url: SITE,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: ARTICLE.title,
        item: URL,
      },
    ],
  };

  const serialize = (value: unknown) =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(articleJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(breadcrumbJsonLd),
        }}
      />
    </>
  );
}

/* =========================================================
   MAIN ARTICLE PAGE
   ========================================================= */

export default async function GoldPriceCrashesArticlePage() {
  const featuredGoldBrokers = await getArticleGoldBrokers();
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >
      <ArticleStructuredData />

      {/* ===============================================
          HEADER / ARTICLE INTRO
          =============================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">
          {/* BREADCRUMB */}

          <nav
            aria-label="مسار التنقل"
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 sm:text-[12px]"
          >
            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              الرئيسية
            </Link>

            <span aria-hidden="true">/</span>

            <span>مقالات وتحليلات</span>

            <span aria-hidden="true">/</span>

            <span className="text-[#145ca8]">
              انهيارات الذهب
            </span>
          </nav>

          {/* CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">
              الذهب والأسواق
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
              دراسة تاريخية
            </span>
          </div>

          
{/* ARTICLE MAIN TITLE */}


<h1 className="mt-5 w-full text-[27px] font-black leading-[1.4] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)] lg:whitespace-nowrap">
  أكبر انهيارات الذهب في التاريخ:{" "}
  <span className="text-[#176ac8]">
    الخسائر ومدة التعافي
  </span>
</h1>




          {/* DESCRIPTION */}

          

<p className="mt-4 w-full max-w-none text-[14px] leading-[2] text-slate-600 sm:text-[17px] sm:leading-[1.9]">
  تعرف على أكبر موجات هبوط الذهب منذ عام 1974 حتى 2026،
  ونسب الخسائر التاريخية التي سجلها المعدن الأصفر،
  والأسباب الاقتصادية وراء أبرز الانهيارات والأزمات المالية،
  وكم استغرق الذهب للتعافي واستعادة قممه السابقة،
  مع مقارنة شاملة لأعمق الانخفاضات وتأثير أسعار الفائدة
  والدولار والتضخم على حركة أسعار الذهب عبر التاريخ.
</p>



          {/* METADATA */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">
            <span>
              إعداد:{" "}
              <strong className="text-[#102747]">
                فريق تحليلات بروكر العرب
              </strong>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <time dateTime="2026-11-23">
              آخر تحديث: 23 نوفمبر 2026
            </time>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <span>بحث وتحليل تاريخي</span>
          </div>

          {/* HERO IMAGE */}

          <ArticleHeroImage />
        </div>
      </header>

      {/* ===============================================
          ARTICLE BODY
          =============================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">
        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">
          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

            <div className="space-y-5 text-[14px] leading-[2.15] text-slate-700 sm:text-[16px] sm:leading-[2.1]">
              <Paragraph>
                يُنظر إلى الذهب باعتباره أحد أهم الملاذات الآمنة
                في الأسواق المالية، ووسيلة يلجأ إليها المستثمرون
                عند تصاعد التضخم أو الاضطرابات الاقتصادية
                والجيوسياسية. لكن تاريخه يكشف حقيقة مهمة:
                الذهب ليس أصلاً يرتفع باستمرار، وقد تعرض
                لانهيارات حادة فقد خلالها ما يزيد على نصف
                قيمته، واستغرق في بعض الحالات سنوات طويلة،
                بل عقوداً، لاستعادة قممه السابقة.
              </Paragraph>

              <Paragraph>
                فمن هبوط السبعينيات إلى انهيار ما بعد قمة
                1980، ثم الأزمة المالية العالمية عام 2008،
                والتراجع الطويل بين 2011 و2015، شهد الذهب
                دورات متباينة في شدتها ومدتها وأسبابها.
              </Paragraph>

              <Paragraph>
                وفي عام 2026 عاد هذا التاريخ إلى الواجهة
                بعدما تراجع الذهب بقوة من مستويات قياسية
                تجاوزت 5,400 دولار للأونصة، قبل أن يسجل
                أدنى مستوى له منذ نحو 14 شهراً في نوفمبر.
              </Paragraph>

              <Paragraph>
                في هذا التقرير من <Strong>بروكر العرب</Strong>{" "}
                نستعرض أبرز موجات هبوط الذهب منذ 1974،
                ونقارن بين عمق الخسائر ومدة التعافي، ونفسّر
                الظروف الاقتصادية التي صاحبت كل مرحلة،
                مع التمييز بين الأسعار المرجعية في لندن
                والأسعار الفورية المتداولة خلال الجلسات.
              </Paragraph>
            </div>

            <TableOfContents />

            {/* SUMMARY */}

            <ArticleSection
              id="summary"
              eyebrow="ملخص التقرير"
              title="أهم نتائج دراسة انهيارات الذهب"
            >
              <ArticleList
                items={[
                  <>
                    <Strong>1980–1999:</Strong> أعمق انخفاض
                    بين القمة والقاع ضمن الحالات المدروسة،
                    بنحو 70.3%، مع انتظار يقارب 28 عاماً
                    لاستعادة قمة 1980 اسمياً.
                  </>,
                  <>
                    <Strong>1974–1976:</Strong> تراجع
                    الذهب بنحو 47% خلال أقل من عامين.
                  </>,
                  <>
                    <Strong>2011–2015:</Strong> فقد الذهب
                    نحو 44.6% من قيمته، ولم يتجاوز قمته
                    السابقة إلا في 2020.
                  </>,
                  <>
                    <Strong>2008:</Strong> تراجع الذهب
                    بنحو 29.5% خلال الأزمة المالية
                    العالمية، لكنه تعافى خلال نحو 18
                    شهراً من تاريخ القمة.
                  </>,
                  <>
                    <Strong>2020–2022:</Strong> انخفض
                    الذهب بنحو 21.2% قبل أن يتجاوز
                    قمته السابقة في ديسمبر 2023.
                  </>,
                  <>
                    <Strong>2026:</Strong> سجل الذهب
                    هبوطاً حاداً جديداً، وما تزال دورة
                    التعافي مفتوحة حتى تاريخ إعداد التقرير.
                  </>,
                ]}
              />

              <Note title="النتيجة الرئيسية">
                هذه الأرقام تُظهر أن نسبة الخسارة وحدها لا
                تكفي للحكم على مدة التعافي، وأن الظروف النقدية
                والاقتصادية قد تكون أكثر أهمية من حجم
                الانخفاض نفسه.
              </Note>
            </ArticleSection>

            {/* HISTORICAL TABLE */}

            <ArticleSection
              id="history-table"
              eyebrow="الأرقام التاريخية"
              title="جدول أكبر موجات هبوط الذهب منذ 1974"
            >
              <Paragraph>
                يوضح الجدول أبرز دورات الانخفاض بعد قمم
                تاريخية في الذهب، باستخدام أسعار الأونصة
                بالدولار الأمريكي وفق تسعيرة لندن المسائية
                (London PM Fix / LBMA Gold Price PM)،
                باستثناء البيانات اللحظية لعام 2026
                التي سنعرضها بصورة مستقلة.
              </Paragraph>

              <HistoricalTable />

              <Note title="ملاحظة منهجية مهمة">
                يقيس الجدول الهبوط من قمة مرجعية إلى أدنى
                قاع لاحق قبل استعادة القمة، وقد تشمل الدورة
                الواحدة ارتدادات وموجات هبوط فرعية. لذلك
                تختلف هذه الطريقة عن تصنيف الأسواق
                الهابطة المستقلة الذي يستخدمه مجلس الذهب
                العالمي على أساس البيانات الشهرية.
                <br />
                <br />
                مدة التعافي محسوبة تقريبياً من تاريخ
                القمة إلى استعادتها، وليس من تاريخ
                تسجيل القاع. ولا يُقصد بالتعافي هنا
                استعادة القوة الشرائية بعد التضخم.
              </Note>

              <DrawdownChart />
            </ArticleSection>

            {/* 1974 */}

            <ArticleSection
              id="crash-1974"
              eyebrow="الموجة الأولى"
              title="انهيار الذهب بين 1974 و1976: خسارة تقارب 47%"
            >
              <Paragraph>
                بعد انهيار نظام بريتون وودز وانفصال
                الدولار عن الارتباط المباشر بالذهب
                في بداية السبعينيات، شهد المعدن الأصفر
                ارتفاعات قوية مدفوعة بالتضخم واضطرابات
                أسواق الطاقة وتراجع الثقة في العملات
                الورقية.
              </Paragraph>

              <Paragraph>
                وصل سعر الذهب إلى 195.25 دولاراً للأونصة
                في 30 ديسمبر 1974، لكنه تراجع لاحقاً إلى
                103.50 دولارات في 25 أغسطس 1976،
                مسجلاً انخفاضاً يقارب 47%.
              </Paragraph>

              <SubHeading>
                لماذا انهار الذهب في تلك الفترة؟
              </SubHeading>

              <Paragraph>
                ارتبط التراجع بمجموعة من التغيرات
                الاقتصادية، أهمها تحسن القوة النسبية
                للدولار، وارتفاع العوائد الحقيقية،
                وتراجع بعض المخاوف المرتبطة بالتضخم
                والاضطرابات الجيوسياسية.
              </Paragraph>

              <Paragraph>
                وعندما ترتفع العوائد الحقيقية للأصول
                التي تدر فائدة، يصبح الاحتفاظ بالذهب،
                الذي لا يحقق عائداً دورياً، أقل جاذبية
                لبعض المستثمرين.
              </Paragraph>

              <Paragraph>
                ورغم حدة الانخفاض، تجاوز الذهب قمته
                السابقة في عام 1978، قبل أن يبدأ مرحلة
                صعود قوية انتهت ببلوغه مستويات قياسية
                في يناير 1980.
              </Paragraph>
            </ArticleSection>

            {/* 1978 */}

            <ArticleSection
              id="crash-1978"
              eyebrow="الموجة الثانية"
              title="تصحيح الذهب عام 1978: انخفاض سريع وتعافٍ أسرع"
            >
              <Paragraph>
                سجل الذهب قمة عند 242.75 دولاراً للأونصة
                في 30 أكتوبر 1978، قبل أن يتراجع إلى
                193.40 دولاراً خلال نوفمبر، بانخفاض
                يقارب 20.3%.
              </Paragraph>

              <Paragraph>
                وعلى خلاف الانهيارات الطويلة، استعاد
                الذهب قمته السابقة في فبراير 1979،
                خلال فترة تقارب ثلاثة أشهر من
                تاريخ القمة.
              </Paragraph>

              <Paragraph>
                تكمن أهمية هذه المرحلة في أنها حدثت
                ضمن دورة صعود أوسع، ولم تتحول إلى
                اتجاه هابط استمر سنوات.
              </Paragraph>

              <Note title="الدرس التاريخي">
                ليس كل هبوط يتجاوز 20% بدايةً لانهيار
                طويل الأمد. فقد يكون تصحيحاً حاداً داخل
                اتجاه صاعد، لكن لا يمكن معرفة ذلك بصورة
                مؤكدة إلا بعد متابعة حركة السوق اللاحقة.
              </Note>
            </ArticleSection>

            {/* 1980 */}

            <ArticleSection
              id="crash-1980"
              eyebrow="الموجة الثالثة"
              title="انهيار الذهب بعد قمة 1980: الأطول والأعمق"
            >
              <Paragraph>
                يمثل انهيار الذهب بعد قمة يناير 1980
                إحدى أبرز الحالات في التاريخ الحديث
                للمعادن الثمينة.
              </Paragraph>

              <Paragraph>
                ففي 21 يناير 1980 بلغ السعر المرجعي
                للذهب 850 دولاراً للأونصة، مدفوعاً بتضخم
                مرتفع واضطرابات جيوسياسية وتزايد الطلب
                على الملاذات الآمنة.
              </Paragraph>

              <Paragraph>
                لكن الاتجاه تغير بصورة حادة خلال
                السنوات التالية، واستمر الذهب في تسجيل
                تقلبات وموجات هابطة متعاقبة حتى بلغ
                252.80 دولاراً في 20 يوليو 1999.
              </Paragraph>

              <Paragraph>
                وبالمقارنة مع قمة 1980، بلغت الخسارة
                الاسمية نحو <Strong>70.3%</Strong>.
              </Paragraph>

              <SubHeading>
                ما أسباب انهيار الذهب التاريخي بعد 1980؟
              </SubHeading>

              <Paragraph>
                كان التحول في السياسة النقدية الأمريكية
                عاملاً رئيسياً. فقد اتخذ الاحتياطي
                الفيدرالي، بقيادة بول فولكر، إجراءات
                قوية لمحاربة التضخم، شملت رفع أسعار
                الفائدة إلى مستويات مرتفعة للغاية.
              </Paragraph>

              <Paragraph>
                وأدى تراجع التضخم وارتفاع الفائدة
                الحقيقية إلى زيادة تكلفة الفرصة البديلة
                للاحتفاظ بالذهب. كذلك ساعدت قوة الدولار
                والتحولات الاقتصادية والسياسية في الحد
                من جاذبية المعدن خلال أجزاء واسعة
                من تلك الفترة.
              </Paragraph>

              <Paragraph>
                وفي التسعينيات، ساهمت مبيعات بعض
                البنوك المركزية وتحسن الثقة في الأصول
                المالية في استمرار الضغط على الذهب.
              </Paragraph>

              <SubHeading>
                كم استغرق الذهب حتى تعافى من انهيار 1980؟
              </SubHeading>

              <Paragraph>
                لم يتجاوز الذهب قمته الاسمية البالغة
                850 دولاراً مرة أخرى إلا في 3 يناير 2008،
                أي بعد ما يقارب 28 عاماً.
              </Paragraph>

              <Paragraph>
                وهنا يجب التمييز بين نوعين من التعافي:
              </Paragraph>

              <ArticleList
                items={[
                  <>
                    <Strong>التعافي الاسمي:</Strong> عودة
                    سعر الأونصة بالدولار إلى مستوى
                    القمة السابقة.
                  </>,
                  <>
                    <Strong>التعافي الحقيقي:</Strong>{" "}
                    استعادة القوة الشرائية للقيمة
                    الأصلية بعد احتساب التضخم.
                  </>,
                ]}
              />

              <Paragraph>
                لذلك فإن تجاوز 850 دولاراً في 2008
                لا يعني أن مستثمر يناير 1980 استعاد
                القوة الشرائية لاستثماره بالكامل.
              </Paragraph>

              <Paragraph>
                كما أن رقم 70.3% يمثل الهبوط الكلي
                من قمة 1980 إلى قاع 1999، وليس
                انخفاضاً متواصلاً دون أي ارتدادات
                خلال تلك السنوات.
              </Paragraph>
            </ArticleSection>

            {/* 2008 */}

            <ArticleSection
              id="crash-2008"
              eyebrow="الموجة الرابعة"
              title="انهيار الذهب خلال الأزمة المالية العالمية 2008"
            >
              <Paragraph>
                من المفارقات التاريخية أن الذهب،
                رغم اعتباره ملاذاً آمناً، تعرض
                لانخفاض كبير خلال الأزمة المالية
                العالمية.
              </Paragraph>

              <Paragraph>
                بلغ السعر المرجعي للذهب 1,011.25
                دولاراً في 17 مارس 2008، قبل أن
                يتراجع إلى 712.50 دولاراً في
                24 أكتوبر من العام نفسه.
              </Paragraph>

              <Paragraph>
                وبذلك بلغت نسبة الهبوط نحو{" "}
                <Strong>29.5%</Strong>.
              </Paragraph>

              <SubHeading>
                لماذا انخفض الذهب رغم الأزمة المالية؟
              </SubHeading>

              <Paragraph>
                أدت الأزمة إلى موجة واسعة من بيع
                الأصول لتوفير السيولة وتغطية الالتزامات
                والخسائر في محافظ الاستثمار.
              </Paragraph>

              <Paragraph>
                وفي مثل هذه الظروف، قد يبيع
                المستثمرون الذهب ليس لأنهم فقدوا
                الثقة فيه على المدى الطويل، وإنما
                بسبب حاجتهم إلى النقد.
              </Paragraph>

              <Paragraph>
                كما ساهمت التغيرات في الدولار
                وتوقعات النمو والتضخم في زيادة
                تقلب الأسعار.
              </Paragraph>

              <Paragraph>
                لكن الذهب تعافى لاحقاً مع استمرار
                التيسير النقدي وتراجع أسعار الفائدة
                وزيادة المخاوف بشأن النظام المالي،
                ليتجاوز قمته السابقة في سبتمبر 2009.
              </Paragraph>

              <Paragraph>
                وتوضح هذه المرحلة أن الذهب قد يتراجع
                أثناء الأزمات، حتى عندما تكون العوامل
                الاقتصادية طويلة الأجل داعمة له.
              </Paragraph>
            </ArticleSection>

{/* ===============================================
    FEATURED GOLD TRADING BROKERS
    BETWEEN 2008 AND 2011
    =============================================== */}

<FeaturedGoldBrokers brokers={featuredGoldBrokers} />
            {/* 2011 */}

            <ArticleSection
              id="crash-2011"
              eyebrow="الموجة الخامسة"
              title="هبوط الذهب بين 2011 و2015: سنوات من الضغط"
            >
              <Paragraph>
                بعد سنوات من الارتفاعات المرتبطة
                بالأزمة المالية العالمية وتداعياتها،
                بلغ الذهب قمة مرجعية عند 1,895 دولاراً
                في سبتمبر 2011.
              </Paragraph>

              <Paragraph>
                إلا أن السوق دخل مرحلة هبوط طويلة،
                انتهت بوصول السعر إلى 1,049.40
                دولاراً في ديسمبر 2015، بانخفاض
                يقارب <Strong>44.6%</Strong>.
              </Paragraph>

              <SubHeading>
                لماذا استمر تراجع الذهب عدة سنوات؟
              </SubHeading>

              <Paragraph>
                ارتبطت هذه الدورة بتغيرات تدريجية
                في البيئة الاقتصادية العالمية،
                منها تحسن الاقتصاد الأمريكي،
                وزيادة التوقعات بتشديد السياسة
                النقدية، وصعود الدولار، وتراجع
                بعض المخاوف المالية التي دعمت
                الطلب على الذهب خلال السنوات السابقة.
              </Paragraph>

              <Paragraph>
                كما ساهمت التدفقات الخارجة من بعض
                المنتجات الاستثمارية المرتبطة
                بالذهب في زيادة الضغوط البيعية.
              </Paragraph>

              <Paragraph>
                ولم يتجاوز الذهب القمة السابقة
                المسجلة في 2011 إلا خلال يوليو
                2020، أي بعد قرابة تسع سنوات
                من تاريخ القمة.
              </Paragraph>

              <Paragraph>
                وتوضح هذه المرحلة أن السعر قد يحتاج
                إلى فترة طويلة للتعافي حتى عندما
                لا تصل نسبة انخفاضه إلى مستويات
                انهيار 1980.
              </Paragraph>
            </ArticleSection>

            {/* 2020 */}

            <ArticleSection
              id="crash-2020"
              eyebrow="الموجة السادسة"
              title="هبوط الذهب بين 2020 و2022: التضخم والفائدة والدولار"
            >
              <Paragraph>
                شهد الذهب ارتفاعاً قوياً مع انتشار
                جائحة كورونا عام 2020، وسط سياسات
                نقدية استثنائية وقلق واسع بشأن
                الاقتصاد العالمي.
              </Paragraph>

              <Paragraph>
                وفي 6 أغسطس 2020 بلغ السعر المرجعي
                2,067.15 دولاراً للأونصة، قبل أن
                يتراجع إلى 1,628.75 دولاراً في
                3 نوفمبر 2022.
              </Paragraph>

              <Paragraph>
                وبلغ عمق التراجع نحو{" "}
                <Strong>21.2%</Strong>.
              </Paragraph>

              <SubHeading>
                ما الذي ضغط على أسعار الذهب؟
              </SubHeading>

              <Paragraph>
                رغم ارتفاع التضخم خلال تلك الفترة،
                أدى تشديد السياسة النقدية الأمريكية
                وصعود عوائد السندات وقوة الدولار
                إلى الحد من جاذبية الذهب.
              </Paragraph>

              <Paragraph>
                وهذه نقطة مهمة: ارتفاع التضخم لا
                يعني بالضرورة ارتفاع الذهب في كل
                الأوقات؛ لأن اتجاه الفائدة الحقيقية
                وتوقعات السياسة النقدية يلعبان
                دوراً أساسياً في التسعير.
              </Paragraph>

              <Paragraph>
                وفي 28 ديسمبر 2023 تجاوز السعر
                المرجعي المسائي للذهب قمة أغسطس
                2020، مسجلاً 2,078.40 دولاراً
                بحسب جمعية سوق لندن للسبائك.
              </Paragraph>
            </ArticleSection>

            {/* 2026 */}

            <ArticleSection
              id="crash-2026"
              eyebrow="الموجة السابعة — مفتوحة"
              title="هبوط الذهب في 2026: موجة لم يكتمل التعافي منها"
            >
              <Paragraph>
                شهد الذهب خلال عام 2026 دورة شديدة
                التقلب، بعد ارتفاعات قوية قادته
                إلى مستويات تاريخية غير مسبوقة.
              </Paragraph>

              <Paragraph>
                ووفق مجلس الذهب العالمي، بلغ السعر
                المرجعي المسائي في لندن{" "}
                <Strong>5,405 دولارات للأونصة</Strong>{" "}
                يوم 29 يناير 2026.
              </Paragraph>

              <Paragraph>
                لكن السوق تعرض لاحقاً لضغوط بيعية
                متكررة، وازدادت حدة الانخفاضات
                خلال نوفمبر.
              </Paragraph>

              <SubHeading>
                إلى أي مستوى وصل الذهب في نوفمبر 2026؟
              </SubHeading>

              <Paragraph>
                في 20 نوفمبر 2026 انخفض السعر
                الفوري إلى 3,502.49 دولار للأونصة،
                وهو أدنى مستوى له منذ نحو 14 شهراً،
                وفق تقرير رويترز.
              </Paragraph>

              <Paragraph>
                وبمقارنته بالقمة اللحظية القريبة
                من 5,595 دولاراً والمسجلة خلال
                يناير، فإن الهبوط بلغ نحو{" "}
                <Strong>37.4%</Strong>.
              </Paragraph>

              <Note
                title="لماذا تختلف نسبة 2026 عن الجدول التاريخي؟"
                tone="amber"
              >
                لا يجوز مقارنة نسبة 37.4% مباشرة
                بنسب الجدول التاريخي، لأنها محسوبة
                على أساس الأسعار الفورية اللحظية،
                وليس تسعيرة لندن المسائية.
              </Note>

              <Paragraph>
                وفي 23 نوفمبر، سجل الذهب ارتداداً
                ملحوظاً. ووفق تحديث رويترز، ارتفع
                السعر الفوري إلى 3,617.41 دولاراً
                للأونصة عند الساعة 10:36 بتوقيت
                غرينتش، بزيادة تقارب 2.4%.
              </Paragraph>

              <Paragraph>
                وتظل هذه القراءة لقطة زمنية،
                وليست سعراً ثابتاً لليوم بأكمله.
              </Paragraph>

              <SubHeading>
                لماذا تراجع الذهب في نوفمبر 2026؟
              </SubHeading>

              <Paragraph>
                ارتبطت موجة البيع الأخيرة بعدة
                عوامل متزامنة:
              </Paragraph>

              <ArticleList
                items={[
                  "ارتفاع توقعات استمرار السياسة النقدية الأمريكية المتشددة وزيادة احتمالات رفع الفائدة.",
                  "قوة الدولار الأمريكي وارتفاع جاذبية الأصول التي تحقق عائداً.",
                  "اضطرابات أسواق الأسهم، خصوصاً أسهم التكنولوجيا المرتبطة بالذكاء الاصطناعي.",
                  "اضطرار بعض المستثمرين إلى بيع الذهب لتوفير السيولة وتقليص المخاطر.",
                ]}
              />

              <Paragraph>
                وتُظهر التطورات أن الطلب على الذهب
                كملاذ آمن لا يمنعه من التعرض لخسائر
                كبيرة، خصوصاً عندما تصبح الحاجة إلى
                السيولة أو العوائد المرتفعة أكثر
                تأثيراً في قرارات المستثمرين.
              </Paragraph>

              <Paragraph>
                ولا يمكن تحديد القاع النهائي لهذه
                الدورة أو موعد التعافي منها ما دام
                السعر لم يستعد قمته المرجعية السابقة.
              </Paragraph>
            </ArticleSection>

            {/* CAUSES */}

            <ArticleSection
              id="causes"
              eyebrow="تفسير اقتصادي"
              title="ما العوامل المشتركة وراء انهيارات الذهب التاريخية؟"
            >
              <Paragraph>
                بالنظر إلى الدورات السابقة، تظهر
                مجموعة من العوامل المتكررة، وإن
                اختلف تأثيرها من مرحلة إلى أخرى.
              </Paragraph>

              <SubHeading>
                1. ارتفاع أسعار الفائدة الحقيقية
              </SubHeading>

              <Paragraph>
                الذهب لا يحقق فائدة دورية، لذلك
                قد تصبح السندات والأدوات النقدية
                أكثر جاذبية عندما ترتفع عوائدها
                الحقيقية، أي بعد احتساب التضخم.
              </Paragraph>

              <SubHeading>
                2. قوة الدولار الأمريكي
              </SubHeading>

              <Paragraph>
                غالباً ما تتعرض أسعار الذهب لضغوط
                عندما يقوى الدولار، لأن المعدن
                مُسعّر عالمياً بالعملة الأمريكية،
                لكن هذه العلاقة ليست ثابتة في
                جميع الفترات.
              </Paragraph>

              <SubHeading>
                3. تراجع المخاطر الاقتصادية والجيوسياسية
              </SubHeading>

              <Paragraph>
                عندما تتحسن ثقة المستثمرين بالاقتصاد
                والأسواق، قد ينتقل جزء من الأموال
                من الأصول الدفاعية إلى الأسهم أو
                الاستثمارات الأعلى مخاطرة.
              </Paragraph>

              <SubHeading>
                4. البيع القسري لتوفير السيولة
              </SubHeading>

              <Paragraph>
                كما حدث خلال 2008 وبعض فترات 2026،
                قد يبيع المستثمرون الذهب لتغطية
                خسائر أو متطلبات الهامش في أصول أخرى.
              </Paragraph>

              <SubHeading>
                5. تدفقات الصناديق والبنوك المركزية
              </SubHeading>

              <Paragraph>
                يمكن أن تؤثر التغيرات الكبيرة في
                مشتريات أو مبيعات البنوك المركزية،
                وتدفقات صناديق الذهب المتداولة،
                في اتجاه الأسعار، خاصة عندما
                تتزامن مع تغيرات السياسة النقدية.
              </Paragraph>

              <Note title="الخلاصة الاقتصادية">
                لا يوجد عامل واحد يفسر جميع انهيارات
                الذهب؛ بل تتفاعل الفائدة الحقيقية
                والدولار والسيولة والمخاطر والتدفقات
                الاستثمارية بدرجات مختلفة بحسب المرحلة.
              </Note>
            </ArticleSection>

            {/* RECOVERY MATH */}

            <ArticleSection
              id="recovery-math"
              eyebrow="فهم نسب الخسارة"
              title="كم يحتاج الذهب للارتفاع بعد الانهيار حتى يعود إلى سعره السابق؟"
            >
              <Paragraph>
                من الأخطاء الشائعة الاعتقاد بأن
                انخفاض الذهب بنسبة 50% يحتاج إلى
                ارتفاع 50% فقط لتعويض الخسارة.
              </Paragraph>

              <Paragraph>
                الحقيقة أن الخسائر والأرباح
                المئوية تُحسب من قيم أساس مختلفة.
              </Paragraph>

              <RecoveryTable />

              <Paragraph>
                فإذا انخفض سعر الذهب من 2,000
                إلى 1,000 دولار، فإنه يحتاج إلى
                الارتفاع بنسبة 100% من القاع
                ليعود إلى 2,000 دولار.
              </Paragraph>

              <Paragraph>
                وهذا يساعد في تفسير لماذا قد تستغرق
                بعض دورات التعافي سنوات طويلة،
                خصوصاً بعد الانخفاضات العميقة.
              </Paragraph>
            </ArticleSection>

            {/* FORECAST */}

            <ArticleSection
              id="forecast"
              eyebrow="الدروس الاستثمارية"
              title="هل يمكن استخدام تاريخ انهيارات الذهب للتنبؤ بالانهيار القادم؟"
            >
              <Paragraph>
                تساعد دراسة الدورات التاريخية على
                فهم المخاطر وسلوك السوق، لكنها
                لا توفر وسيلة مضمونة لتحديد القمم
                والقيعان المستقبلية.
              </Paragraph>

              <Paragraph>
                فالتراجع البالغ 20% قد يعقبه
                تعافٍ سريع كما حدث في 1978،
                وقد يتحول إلى دورة هبوط أطول
                عندما تتغير الظروف الاقتصادية
                والنقدية.
              </Paragraph>

              <Paragraph>
                كذلك لا يعني وقوع انخفاض تاريخي
                بنسبة 40% أو 70% أن الذهب سيتكرر
                له الانخفاض نفسه في الدورة الحالية.
              </Paragraph>

              <Paragraph>
                لذلك ينبغي التعامل مع هذه الأرقام
                باعتبارها أدوات لفهم المخاطر
                والسيناريوهات، وليس أهدافاً سعرية
                أو توقعات مؤكدة.
              </Paragraph>

              <Paragraph>
                وبالنسبة إلى المتداولين الذين
                يستخدمون الرافعة المالية في تداول
                الذهب عبر عقود الفروقات، تكتسب
                التقلبات أهمية إضافية؛ لأن خسائرهم
                قد تتجاوز نسبة الحركة المباشرة
                في السعر قياساً إلى الهامش المستخدم،
                وقد تؤدي إلى إغلاق مراكزهم قبل
                حدوث أي تعافٍ لاحق.
              </Paragraph>
            </ArticleSection>

            {/* FAQ */}

            <ArticleSection
              id="faq"
              eyebrow="أسئلة يطرحها المتداولون"
              title="الأسئلة الشائعة حول انهيارات الذهب"
            >
              <div className="!mt-6 rounded-[16px] border border-slate-200 bg-[#fcfdff] p-4 sm:p-6">
                <FAQItem question="ما أكبر انهيار للذهب في التاريخ الحديث؟">
                  ضمن الحالات التي استعرضناها، انخفض
                  الذهب بنحو 70.3% من قمته المرجعية
                  عند 850 دولاراً في يناير 1980
                  إلى 252.80 دولاراً في يوليو 1999.
                  ويمثل هذا التراجع انخفاضاً تراكمياً
                  بين قمة وقاع على مدى سنوات، وليس
                  انهياراً متصلاً دون ارتدادات.
                </FAQItem>

                <FAQItem question="كم استغرق الذهب للتعافي بعد انهيار 1980؟">
                  استغرق الذهب نحو 28 عاماً حتى
                  تجاوز قمته الاسمية السابقة
                  في يناير 2008، لكن التعافي
                  الحقيقي بعد احتساب التضخم
                  تطلب مدة أطول.
                </FAQItem>

                <FAQItem question="لماذا انخفض الذهب أثناء الأزمة المالية العالمية عام 2008؟">
                  بسبب عمليات البيع لتوفير السيولة
                  وتغطية الالتزامات والخسائر،
                  إلى جانب تغيرات الدولار والتوقعات
                  الاقتصادية. ثم تعافى مع تطور
                  الأزمة والسياسات النقدية.
                </FAQItem>

                <FAQItem question="هل الذهب استثمار آمن لا يخسر؟">
                  لا. الذهب قد يوفر فوائد تنويعية
                  وتحوطاً في بعض الظروف، لكنه معرض
                  لتقلبات كبيرة وخسائر طويلة الأمد،
                  ولا يضمن حماية رأس المال.
                </FAQItem>

                <FAQItem question="هل انتهى انهيار الذهب في 2026؟">
                  حتى تاريخ 23 نوفمبر 2026،
                  لم يستعد الذهب قمته المرجعية
                  المسجلة في يناير. ولذلك لا يمكن
                  اعتبار دورة التعافي مكتملة
                  أو الجزم بتسجيل القاع النهائي.
                </FAQItem>

                <FAQItem question="هل يؤدي ارتفاع الفائدة دائماً إلى انخفاض الذهب؟">
                  ليس دائماً. يؤثر ارتفاع الفائدة
                  الحقيقية عادةً سلباً في جاذبية الذهب،
                  لكن الأسعار تتأثر أيضاً بالدولار
                  والتضخم والمخاطر الجيوسياسية
                  وطلب البنوك المركزية والمستثمرين.
                </FAQItem>
              </div>
            </ArticleSection>

            {/* CONCLUSION */}

            <ArticleSection
              id="conclusion"
              eyebrow="النتيجة النهائية"
              title="الخلاصة: ماذا تعلمنا أكبر انهيارات الذهب؟"
            >
              <Paragraph>
                يثبت تاريخ الذهب أن صفته كملاذ
                آمن لا تعني غياب المخاطر أو ضمان
                تحقيق عائد إيجابي خلال فترة محددة.
              </Paragraph>

              <Paragraph>
                فمنذ السبعينيات، مر المعدن الأصفر
                بموجات خسارة كبيرة، تفاوتت بين
                تصحيحات استمرت أسابيع أو أشهراً،
                وانخفاضات احتاجت إلى سنوات طويلة
                حتى يستعيد السعر قمته السابقة.
              </Paragraph>

              <Paragraph>
                وقد أظهرت دورة 1980 أن الذهب
                يمكن أن يفقد أكثر من ثلثي قيمته
                الاسمية من قمة إلى قاع، بينما
                أوضحت تجربة 2008 أن الأزمة المالية
                نفسها قد تدفع المستثمرين إلى بيع
                الأصول الآمنة لتوفير السيولة.
              </Paragraph>

              <Paragraph>
                أما تراجعات 2026، فتؤكد أهمية
                متابعة الفائدة الحقيقية والدولار
                والسيولة واتجاهات السوق، وعدم
                افتراض أن الأداء التاريخي
                سيكرر نفسه.
              </Paragraph>

              <Paragraph>
                وفي النهاية، فإن فهم تاريخ
                انهيارات الذهب لا يمنح المتداول
                القدرة على التنبؤ بالمستقبل،
                لكنه يساعده على إدراك حجم المخاطر،
                ووضع تقلبات السوق الحالية في
                سياق تاريخي أوسع.
              </Paragraph>
            </ArticleSection>

            {/* METHODOLOGY */}

            <ArticleSection
              id="methodology"
              eyebrow="الشفافية والتوثيق"
              title="منهجية البحث والمصادر"
            >
              <Paragraph>
                يعتمد هذا التقرير على الأسعار
                الاسمية بالدولار الأمريكي لكل
                أونصة تروي، دون تعديل للتضخم،
                ما لم يُذكر غير ذلك.
              </Paragraph>

              <Paragraph>
                تستند المقارنات التاريخية إلى
                تسعيرة لندن المسائية للذهب، مع
                الاستعانة ببيانات مجلس الذهب
                العالمي وإفصاحات مالية تاريخية
                منشورة لدى هيئة الأوراق المالية
                الأمريكية ومراجع الأسعار.
              </Paragraph>

              <Paragraph>
                وقد جرى الفصل بين أسعار التسعير
                المرجعي وأسعار التداول الفوري
                اللحظية لعام 2026، لأن استخدامهما
                في حساب واحد دون تمييز قد يعطي
                نتائج مضللة.
              </Paragraph>

              <Note title="حدود المنهجية">
                جرى استخدام السلاسل والمراجع
                التاريخية المنشورة للمقارنة بين
                القمم والقيعان. ولا يُعد هذا التقرير
                إعادة حساب مستقلة لكل يوم من
                بيانات LBMA الخام. لذلك يجب
                مراجعة تواريخ التعافي الدقيقة
                قبل اعتماد نسخة نهائية مرجعية.
              </Note>

              <SubHeading>
                المصادر والمراجع الأساسية
              </SubHeading>

              <ol className="!mt-4 space-y-3">
                {sources.map((source, index) => (
                  <li
                    key={source.url}
                    className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 text-[10px] font-black text-blue-700">
                      {index + 1}
                    </span>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 flex-1 break-words text-[12px] font-bold leading-6 text-[#1765b5] underline-offset-4 hover:underline sm:text-[13px]"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ol>
            </ArticleSection>

            {/* DISCLAIMER */}

            <div className="mt-8 rounded-[16px] border border-amber-200 bg-[#fffbef] p-4 sm:p-6">
              <h2 className="text-[15px] font-black text-amber-900">
                إخلاء المسؤولية
              </h2>

              <p className="mt-2 text-[12px] leading-[2] text-slate-700 sm:text-[14px]">
                هذا المحتوى لأغراض المعلومات والتعليم
                فقط، ولا يمثل توصية استثمارية أو دعوة
                إلى شراء الذهب أو بيعه. الأسعار
                التاريخية لا تضمن تكرار الأداء
                مستقبلاً، وقد يتغير وضع موجة
                2026 مع استمرار التداول.
              </p>
            </div>

            {/* ARTICLE FOOTER */}

            <footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[13px] font-black text-[#102747]">
                  بروكر العرب | Broker Alarab
                </div>

                <p className="mt-1 text-[11px] leading-6 text-slate-500">
                  تحليلات ودراسات تعليمية في
                  الأسواق المالية.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-blue-200 bg-[#f1f7ff] px-5 py-2 text-[12px] font-black text-[#155da9] transition hover:bg-blue-100"
              >
                العودة إلى الرئيسية
                <span className="mr-2" aria-hidden="true">
                  ←
                </span>
              </Link>
            </footer>
          </div>
        </article>
      </div>
    </main>
  );
}
