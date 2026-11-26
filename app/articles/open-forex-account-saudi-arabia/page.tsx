import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* =========================================================
   BROKER ALARAB
   ARTICLE PAGE — GOLD PRICE CRASHES HISTORY
   Next.js App Router / Server Component
   ========================================================= */

const SITE = "https://brokeralarab.com";

const SLUG = "open-forex-account-saudi-arabia";
const PATH = `/articles/${SLUG}`;
const URL = `${SITE}${PATH}`;

const ARTICLE = {
  title:
  "كيفية فتح حساب فوركس في السعودية – الشروط وخطوات التسجيل",

seoTitle:
  "فتح حساب فوركس في السعودية | الشروط وخطوات التسجيل",

titleMain:
  "كيفية فتح حساب فوركس في السعودية",

titleHighlight:
  "الشروط وخطوات التسجيل",

  description:
    "تعرف على شروط فتح حساب فوركس في السعودية للمواطنين والمقيمين، والمستندات المطلوبة للتوثيق، وخطوات التسجيل والإيداع والتحقق من تراخيص شركات التداول.",

  category: "مقالات وأدلة التداول",
  subcategory: "التداول في السعودية",
  articleType: "دليل فتح حساب",
  breadcrumb: "فتح حساب فوركس في السعودية",
  publisher: "بروكر العرب",

  published: "2026-11-24",
  modified: "2026-11-25",

  heroAlt:
    "دليل فتح حساب تداول الفوركس في السعودية والتحقق من الهوية ومستندات التسجيل",

  heroCaption:
    "صورة توضيحية لدليل تسجيل وتوثيق حسابات تداول الفوركس للمواطنين والمقيمين في السعودية.",
};

const HERO_IMAGE =
  "/articles/open-forex-account-saudi-arabia.webp";

const ARTICLE_READY = true;
const HERO_IMAGE_READY = true;
const ENGLISH_VERSION_READY = true;

const SAUDI_BROKERS_URL =
  "/best-brokers/saudi-arabia";

const ARTICLE_KEYWORDS = [
  "فتح حساب فوركس في السعودية",
  "فتح حساب تداول في السعودية",
  "شروط فتح حساب تداول",
  "فتح حساب تداول للمقيمين في السعودية",
  "فتح حساب فوركس بالهوية الوطنية",
  "توثيق حساب التداول",
  "مستندات فتح حساب فوركس",
  "تراخيص شركات التداول في السعودية",
  "فتح حساب تداول حقيقي",
  "الإيداع والسحب في الفوركس",
];

export const metadata: Metadata = {
  title: ARTICLE.seoTitle,
  description: ARTICLE.description,

  alternates: {
    canonical: URL,

    languages: {
      ar: URL,

      ...(ENGLISH_VERSION_READY
        ? {
            en: `${SITE}/en/articles/${SLUG}`,
          }
        : {}),
    },
  },

  openGraph: {
    type: "article",
    url: URL,

    title: ARTICLE.title,
    description: ARTICLE.description,

    siteName: "Broker Alarab",

    locale: "ar_SA",

    ...(ENGLISH_VERSION_READY
      ? { alternateLocale: ["en_US"] }
      : {}),

    publishedTime: ARTICLE.published,
    modifiedTime: ARTICLE.modified,

    section: ARTICLE.subcategory,

    tags: ARTICLE_KEYWORDS,

    images: HERO_IMAGE_READY
      ? [
          {
            url: `${SITE}${HERO_IMAGE}`,
            width: 1774,
            height: 887,
            alt: ARTICLE.heroAlt,
          },
        ]
      : [],
  },

  twitter: {
    card: HERO_IMAGE_READY
      ? "summary_large_image"
      : "summary",

    title: ARTICLE.seoTitle,
    description: ARTICLE.description,

    images: HERO_IMAGE_READY
      ? [`${SITE}${HERO_IMAGE}`]
      : [],
  },

  robots: {
    index: ARTICLE_READY,
    follow: true,

    googleBot: {
      index: ARTICLE_READY,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};


/* =========================================================
   ARTICLE DATA
   ========================================================= */

const contents = [
  { id: "quick-answer", label: "ملخص فتح الحساب" },
  { id: "legal-status", label: "الوضع القانوني والتراخيص" },
  { id: "requirements", label: "شروط فتح حساب فوركس" },
  { id: "documents", label: "المستندات المطلوبة" },
  { id: "saudi-citizens", label: "فتح حساب للمواطنين" },
  { id: "saudi-residents", label: "فتح حساب للمقيمين" },
  { id: "account-types", label: "اختيار نوع الحساب" },
  { id: "registration-steps", label: "خطوات فتح الحساب" },
  { id: "verification", label: "توثيق حساب التداول" },
  { id: "verification-rejection", label: "أسباب رفض التوثيق" },
  { id: "saudi-top-five", label: "مقارنة شركات التداول" },
  { id: "minimum-deposit", label: "الحد الأدنى للإيداع" },
  { id: "payments", label: "الإيداع والسحب" },
  { id: "islamic-account", label: "حساب التداول الإسلامي" },
  { id: "trading-costs", label: "تكاليف حساب التداول" },
  { id: "security", label: "حماية الحساب والأموال" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "conclusion", label: "الخلاصة" },
  { id: "sources", label: "المصادر والمراجع" },
];

const registrationSteps = [
  {
    title: "التحقق من الترخيص",
    description:
      "تحقق من الاسم القانوني للشركة وصلاحية ترخيصها ونطاق الخدمات المسموح لها بتقديمها في السعودية.",
  },
  {
    title: "مراجعة شروط الحساب",
    description:
      "راجع اتفاقية العميل، وتكاليف التداول، وشروط الإيداع والسحب، والجهة القانونية التي ستحتفظ بحسابك.",
  },
  {
    title: "تسجيل البيانات الشخصية",
    description:
      "أدخل اسمك القانوني ودولة إقامتك وبريدك الإلكتروني ورقم هاتفك بصورة صحيحة.",
  },
  {
    title: "استكمال التحقق من الهوية",
    description:
      "قدّم مستند الهوية وإثبات العنوان إذا كان مطلوباً، وأجب عن أسئلة الملاءمة ومصدر الأموال.",
  },
  {
    title: "اختيار الحساب والمنصة",
    description:
      "راجع نوع الحساب وعملته الأساسية والرافعة المالية وتكاليف التنفيذ قبل اختيار الحساب.",
  },
  {
    title: "مراجعة وسائل الدفع",
    description:
      "بعد التأكد من نظامية الخدمة والموافقة على الحساب، تحقق من وسائل الدفع المصرح بها وشروط استرداد الأموال.",
  },
];

const requiredDocuments = [
  {
    title: "إثبات الهوية",
    detail: "الهوية الوطنية أو جواز السفر أو الإقامة، وفق شروط الجهة المقدمة للخدمة.",
  },
  {
    title: "إثبات العنوان",
    detail: "مستند رسمي مقبول يوضح الاسم وعنوان السكن الفعلي.",
  },
  {
    title: "البريد الإلكتروني",
    detail: "بريد إلكتروني شخصي يمكن الوصول إليه والتحقق منه.",
  },
  {
    title: "رقم الهاتف",
    detail: "رقم هاتف نشط لاستقبال رسائل التحقق عند الحاجة.",
  },
  {
    title: "المعلومات المالية",
    detail: "معلومات المهنة والدخل والخبرة ومصدر الأموال، بحسب متطلبات التحقق.",
  },
  {
    title: "وسيلة الدفع",
    detail: "وسيلة دفع مقبولة باسم صاحب الحساب، عند إجراء العمليات المالية.",
  },
];

const accountTypes = [
  {
    name: "الحساب القياسي",
    nameEn: "Standard Account",
    abbreviation: "STD",
    description:
      "حساب تداول حقيقي تعتمد تكاليفه غالباً على فروق الأسعار، وقد توفره بعض الشركات دون عمولات تداول منفصلة.",
    consideration:
      "تحقق من متوسط السبريد والحد الأدنى للإيداع والعمولات وشروط التنفيذ.",
    href: "/best-brokers/accounts/standard",
    linkLabel: "أفضل شركات حسابات Standard",
  },
  {
    name: "حساب السنت",
    nameEn: "Cent Account",
    abbreviation: "CENT",
    description:
      "حساب تداول حقيقي يُعرض فيه الرصيد عادةً بوحدات السنت، وقد يتيح أحجام عقود أصغر بحسب مواصفات الوسيط.",
    consideration:
      "تحقق من حجم العقد الفعلي والأدوات المالية المتاحة والحد الأدنى لحجم الصفقة.",
    href: "/best-brokers/accounts/cent",
    linkLabel: "أفضل شركات حسابات Cent",
  },
  {
    name: "حساب السبريد الخام",
    nameEn: "Raw Spread Account",
    abbreviation: "RAW",
    description:
      "حساب تداول يوفر عادةً فروق أسعار منخفضة قد تبدأ من صفر نقطة على بعض الأدوات، مقابل عمولات تداول منفصلة.",
    consideration:
      "قارن التكلفة الإجمالية للسبريد والعمولة عند فتح الصفقة وإغلاقها.",
    href: "/best-brokers/accounts/raw-spread",
    linkLabel: "أفضل شركات حسابات Raw Spread",
  },
  {
    name: "حساب ECN",
    nameEn: "ECN Account",
    abbreviation: "ECN",
    description:
      "حساب يرتبط عادةً بنموذج تنفيذ إلكتروني يربط أوامر التداول بشبكة من المشاركين أو مزودي السيولة، وفق آلية التنفيذ التي يعتمدها الوسيط.",
    consideration:
      "تحقق من سياسة التنفيذ ومصادر السيولة والعمولات، فمسمى ECN وحده لا يثبت طبيعة التنفيذ الفعلية.",
    href: null,
    linkLabel: null,
  },
];

const sources = [
  {
    title:
      "هيئة السوق المالية السعودية – مؤسسات السوق المالية المرخص لها",
    url:
      "https://cma.org.sa/Market/AuthorisedPersons/Pages/default.aspx",
  },
  {
    title:
      "البنك المركزي السعودي – الأنشطة المالية غير المرخصة",
    url:
      "https://sama.gov.sa/ar-sa/Supervision/Pages/unlicensed_activities.aspx",
  },
  {
    title:
      "البنك المركزي السعودي – تحذيرات اللجنة الدائمة من نشاط الفوركس غير المرخص",
    url:
      "https://www.sama.gov.sa/ar-sa/MediaCenter/News/Pages/news-590.aspx",
  },
  {
    title:
      "اللجنة الدائمة للتوعية – التحذير من أساليب الاحتيال المرتبطة بالفوركس غير المرخص",
    url:
      "https://www.sama.gov.sa/ar-sa/MediaCenter/News/Pages/news-624.aspx",
  },
  {
    title:
      "اللجنة الحكومية الدائمة – ضرورة التحقق من التراخيص والموافقات النظامية",
    url:
      "https://sama.gov.sa/ar-sa/MediaCenter/News/Pages/news029042018.aspx",
  },
  {
    title:
      "Exness Help Center – مثال على متطلبات مستندات التحقق من الهوية والعنوان",
    url:
      "https://get.exness.help/hc/en-us/articles/17537772392732-Verification-document-requirements",
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
  if (!HERO_IMAGE_READY) {
    return null;
  }

  return (
    <figure className="mt-6 sm:mt-8">

      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">

        <Image
          src={HERO_IMAGE}
          alt={ARTICLE.heroAlt}
          fill
          priority
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />

      </div>

      <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
        {ARTICLE.heroCaption}
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

function ArticleDataTable({
  headers,
  rows,
  caption,
}: {
  headers: [string, string];
  rows: [string, string][];
  caption?: string;
}) {
  return (
    <figure className="!my-6 w-full min-w-0">

      <div className="overflow-hidden rounded-[16px] border border-slate-200 shadow-sm">

        <table className="w-full table-fixed !text-center">

          <colgroup>
            <col className="w-[35%] sm:w-[32%]" />
            <col className="w-[65%] sm:w-[68%]" />
          </colgroup>

          <thead className="bg-[#092443] text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  style={{ textAlign: "center" }}
                  className="!px-2.5 !py-3.5 !text-center !align-middle text-[11px] font-black leading-5 sm:!px-5 sm:!py-4 sm:text-[13px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border-t border-slate-200 ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >

                <th
                  scope="row"
                  style={{ textAlign: "center" }}
                  className="break-words border-l border-slate-200 !px-2.5 !py-3.5 !text-center !align-middle text-[11px] font-black leading-[1.9] text-[#102747] [overflow-wrap:anywhere] sm:!px-5 sm:!py-4 sm:text-[14px]"
                >
                  <div className="w-full !text-center">
                    {row[0]}
                  </div>
                </th>

                <td
                  style={{ textAlign: "center" }}
                  className="break-words !px-2.5 !py-3.5 !text-center !align-middle text-[11px] font-medium leading-[1.95] text-slate-700 [overflow-wrap:anywhere] sm:!px-5 sm:!py-4 sm:text-[14px]"
                >
                  <div className="w-full !text-center">
                    {row[1]}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {caption && (
        <figcaption className="mt-3 !text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
          {caption}
        </figcaption>
      )}

    </figure>
  );
}

function RegistrationSteps() {
  return (
    <div className="!my-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">

      {registrationSteps.map((step, index) => (
        <div
          key={step.title}
          className="relative min-w-0 overflow-hidden rounded-[17px] border border-[#dce6f2] bg-[#f8fbff] p-4 shadow-sm sm:p-5"
        >

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] via-[#38bdf8] to-transparent" />

          <div className="mb-3 flex items-center gap-3">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#176ac8] text-[15px] font-black text-white">

              {String(index + 1).padStart(2, "0")}

            </span>

            <h3 className="text-[14px] font-black leading-6 text-[#102747] sm:text-[16px]">
              {step.title}
            </h3>

          </div>

          <p className="text-[12px] leading-[1.95] text-slate-600 sm:text-[14px]">
            {step.description}
          </p>

        </div>
      ))}

    </div>
  );
}

function RequiredDocuments() {
  return (
    <div className="!my-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
      {requiredDocuments.map((item, index) => (
        <div
          key={item.title}
          className="flex min-w-0 flex-col rounded-[16px] border border-slate-200 bg-[#f8fbff] p-4 shadow-sm sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[#176ac8] sm:h-11 sm:w-11">
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
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="m8 16 2 2 5-5" />
              </svg>
            </span>

            <span className="inline-flex min-w-[42px] items-center justify-center rounded-full bg-[#176ac8] px-2.5 py-1 text-[10px] font-black text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-[14px] font-black leading-7 text-[#102747] sm:text-[16px]">
            {item.title}
          </h3>

          <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function AccountTypesGrid() {
  return (
    <div className="!my-7 grid grid-cols-1 auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4">

      {accountTypes.map((account) => (
        <div
          key={account.nameEn}
          className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[17px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md sm:p-5"
        >

          {/* TOP ACCENT */}

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] via-[#38bdf8] to-transparent" />

          {/* ACCOUNT HEADER */}

          <div className="flex min-w-0 items-center gap-3">

            <div
              dir="ltr"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-blue-100 bg-[#eaf3ff] text-[11px] font-black text-[#176ac8] sm:h-[58px] sm:w-[58px] sm:text-[13px]"
            >
              {account.abbreviation}
            </div>

            <div className="min-w-0 flex-1">

              <h3 className="text-[15px] font-black leading-7 text-[#102747] sm:text-[18px]">
                {account.name}
              </h3>

              <p
                dir="ltr"
                className="mt-0.5 text-right text-[10px] font-bold text-[#176ac8] sm:text-[12px]"
              >
                {account.nameEn}
              </p>

            </div>

          </div>

          {/* ACCOUNT DESCRIPTION */}

          <p className="mt-4 flex-1 text-[13px] leading-[1.95] text-slate-600 sm:text-[14px]">
            {account.description}
          </p>

          {/* IMPORTANT CONSIDERATION */}

          <div className="mt-4 rounded-[11px] border border-blue-100 bg-[#f1f7fe] p-3 sm:p-4">

            <div className="flex items-center gap-2">

              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#176ac8] text-[10px] font-black text-white">
                ✓
              </span>

              <p className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
                ما يجب التحقق منه
              </p>

            </div>

            <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
              {account.consideration}
            </p>

          </div>

          {/* INTERNAL LINK */}

          {account.href && account.linkLabel ? (
            <Link
              href={account.href}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[11px] border border-[#bdd8f5] bg-[#eaf3ff] px-3 py-3 text-center text-[11px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#176ac8] hover:text-white sm:text-[13px]"
            >
              {account.linkLabel}

              <span aria-hidden="true">
                ←
              </span>

            </Link>
          ) : (
            <div className="mt-4 min-h-[44px]" aria-hidden="true" />
          )}

        </div>
      ))}

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

/* =========================================================
   SAUDI BROKERS — DATABASE TYPES
   ========================================================= */

type SaudiArticleBroker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  is_full_review: boolean | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  real_account_url: string | null;
};

type SaudiArticleRanking = {
  id: number;
  rank_position: number;
  country_rating: number | null;
  brokers:
    | SaudiArticleBroker
    | SaudiArticleBroker[]
    | null;
};

function normalizeSaudiBroker(
  value:
    | SaudiArticleBroker
    | SaudiArticleBroker[]
    | null
): SaudiArticleBroker | null {
  if (!value) return null;

  return Array.isArray(value)
    ? value[0] ?? null
    : value;
}

/* =========================================================
   GET SAUDI BROKERS
   Same ranking source as Saudi Arabia country page
   ========================================================= */

async function getSaudiArticleBrokers(): Promise<
  SaudiArticleRanking[]
> {
  const supabase = await createClient();

  const { data: country, error: countryError } =
    await supabase
      .from("country_pages")
      .select("id")
      .eq("slug", "saudi-arabia")
      .eq("ar_enabled", true)
      .maybeSingle();

  if (countryError || !country) {
    console.error(
      "Saudi article country:",
      countryError?.message
    );

    return [];
  }

  const { data, error } = await supabase
    .from("country_broker_rankings")
    .select(`
      id,
      rank_position,
      country_rating,
      brokers (
        id,
        name,
        slug,
        logo,
        rating,
        is_full_review,
        min_deposit,
        platforms,
        regulation,
        regulation_short,
        real_account_url
      )
    `)
    .eq("country_id", country.id)
    .order("rank_position", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Saudi article broker rankings:",
      error.message
    );

    return [];
  }

  const rankings =
    (data || []) as SaudiArticleRanking[];

  return rankings
    .filter((row) => {
      const broker =
        normalizeSaudiBroker(row.brokers);

      return (
        broker?.is_full_review === true &&
        Boolean(broker.slug)
      );
    })
    .slice(0, 5);
}

/* =========================================================
   SAUDI ARTICLE BROKER CARD
   ========================================================= */

function SaudiArticleBrokerCard({
  row,
}: {
  row: SaudiArticleRanking;
}) {
  const broker =
    normalizeSaudiBroker(row.brokers);

  if (!broker || !broker.slug) {
    return null;
  }

  const rating =
    row.country_rating ?? broker.rating;

  const ratingText =
    rating !== null &&
    Number.isFinite(Number(rating))
      ? Number(rating).toFixed(2)
      : "—";

  const deposit =
    broker.min_deposit !== null
      ? `$${broker.min_deposit}`
      : "غير محدد";

  const platforms =
    broker.platforms
      ?.split("|")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 2)
      .join(" • ") || "غير محدد";

  const reviewUrl =
    `/brokers/${broker.slug}`;

  return (
    <div
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md sm:p-5"
    >

      {/* TOP ACCENT */}

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] via-[#38bdf8] to-transparent" />

      {/* BROKER LOGO AND NAME */}

      <div className="flex min-w-0 items-center gap-3">

        <Link
          href={reviewUrl}
          className="relative flex h-[57px] w-[85px] shrink-0 items-center justify-center rounded-[11px] border border-slate-200 bg-white p-2 sm:h-[65px] sm:w-[100px]"
        >

          {broker.logo ? (
            <Image
              src={broker.logo}
              alt={`شعار ${broker.name || "شركة التداول"}`}
              fill
              sizes="100px"
              className="object-contain p-2"
            />
          ) : (
            <span className="text-[13px] font-black text-[#176ac8]">
              {(broker.name || "BA")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          )}

        </Link>

        <div className="min-w-0 flex-1">

          <Link
            href={reviewUrl}
            className="block break-words text-[17px] font-black leading-6 text-[#102747] transition hover:text-[#176ac8] sm:text-[20px]"
          >
            <bdi>
              {broker.name || "شركة التداول"}
            </bdi>
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-2">

            <span
              dir="ltr"
              className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700 sm:text-[12px]"
            >
              <span aria-hidden="true">★</span>

              {ratingText}/5

            </span>

            <span className="text-[10px] font-bold text-slate-500">
              {row.country_rating !== null
                ? "تقييم السعودية"
                : "التقييم العام"}
            </span>

          </div>

        </div>

      </div>

      {/* ACCOUNT DETAILS */}

      <div className="mt-4 grid grid-cols-2 gap-2.5">

        <div className="flex min-w-0 flex-col items-center justify-center rounded-[11px] border border-slate-200 bg-[#f5f8fc] px-2 py-3 text-center">

          <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
            أقل إيداع معروض
          </span>

          <span
            dir="ltr"
            className="mt-1 text-[16px] font-black text-[#102747] sm:text-[18px]"
          >
            {deposit}
          </span>

        </div>

        <div className="flex min-w-0 flex-col items-center justify-center rounded-[11px] border border-slate-200 bg-[#f5f8fc] px-2 py-3 text-center">

          <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
            منصات التداول
          </span>

          <span
            dir="ltr"
            className="mt-1 break-words text-[12px] font-black text-[#102747] sm:text-[14px]"
          >
            {platforms}
          </span>

        </div>

      </div>

      {/* REGISTRATION INFORMATION */}

      <div className="mt-3 flex-1 rounded-[11px] border border-blue-100 bg-[#f1f7fe] p-3">

        <p className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
          شروط فتح الحساب والتوثيق
        </p>

        <p className="mt-1.5 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
          راجع الكيان القانوني المسؤول عن الحساب
          والمستندات المقبولة وشروط التسجيل
          قبل تقديم طلب فتح الحساب.
        </p>

      </div>

      {/* BROKER REVIEW */}

      <div className="mt-4">

        <Link
          href={reviewUrl}
          className="inline-flex min-h-[45px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#176ac8] px-3 py-2.5 text-center text-[12px] font-black text-white transition hover:bg-[#10549f] sm:text-[13px]"
        >
          تقييم الشركة وشروط الحساب
          <span aria-hidden="true">←</span>
        </Link>

      </div>

    </div>
  );
}

/* =========================================================
   SAUDI BROKERS — ARTICLE SECTION
   ========================================================= */

function SaudiBrokerComparison({
  rankings,
}: {
  rankings: SaudiArticleRanking[];
}) {
  const brokers = rankings.slice(0, 3);

  return (
    <aside
      id="saudi-broker-comparison"
      aria-label="شركات التداول وشروط فتح الحساب"
      className="relative !my-7 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:!my-9 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(270deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
              دليل المتداول السعودي
            </span>

            <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
              شركات تداول يمكنك مراجعة شروط حساباتها
            </h2>

            <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">
              تعرف على الشركات الواردة في مقدمة
              تصنيف بروكر العرب للسعودية، وراجع
              شروط حساباتها والتراخيص ومتطلبات التسجيل.
            </p>

          </div>

          <Link
            href={SAUDI_BROKERS_URL}
            className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-[11px] border border-blue-200 bg-white px-4 py-2.5 text-[11px] font-black text-[#176ac8] shadow-sm transition hover:bg-blue-50 sm:text-[12px]"
          >
            عرض المقارنة الكاملة
            <span aria-hidden="true">←</span>
          </Link>

        </div>

      </div>

      {/* BROKER CARDS */}

      {brokers.length > 0 ? (
        <div className="grid grid-cols-1 auto-rows-fr gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-3">

          {brokers.map((row) => (
            <SaudiArticleBrokerCard
              key={row.id}
              row={row}
            />
          ))}

        </div>
      ) : (
        <div className="p-5 text-center text-[13px] text-slate-600">

          <Link
            href={SAUDI_BROKERS_URL}
            className="font-black text-[#176ac8] hover:underline"
          >
            الاطلاع على شركات التداول في السعودية
          </Link>

        </div>
      )}

      {/* DISCLOSURE */}

      <div className="border-t border-[#d7e5f4] bg-white/70 px-4 py-3 sm:px-6">

        <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          تستند الشركات المعروضة إلى ترتيب بروكر العرب
          الخاص بالسعودية، ولا يعني إدراجها حصولها على
          ترخيص محلي. تختلف شروط الحساب والإيداع
          بحسب الكيان القانوني. تحقق من الموافقات
          النظامية قبل التسجيل أو الإيداع. قد يتلقى
          بروكر العرب مقابلاً تجارياً من بعض الشركاء.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   SAUDI TOP FIVE — COMPACT BROKER COMPARISON
   ========================================================= */

function SaudiTopFiveBrokers({
  rankings,
}: {
  rankings: SaudiArticleRanking[];
}) {
  const brokers = rankings.slice(0, 5);

  return (
    <section
      id="saudi-top-five"
      aria-label="مقارنة شركات التداول في السعودية"
      className="relative !my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:!my-12 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(270deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">

          مقارنة شركات التداول

        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">

          مقارنة أبرز شركات التداول في السعودية

        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">

          بعد التعرف على شروط فتح الحساب
          ومتطلبات التوثيق، يمكنك مقارنة
          التقييمات ومنصات التداول والحد
          الأدنى المعلن للإيداع لدى الشركات
          المتقدمة في تصنيف بروكر العرب للسعودية.

        </p>

      </div>

      {/* BROKER LIST */}

      {brokers.length > 0 ? (

        <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-5">

          {brokers.map((row) => {
            const broker =
              normalizeSaudiBroker(row.brokers);

            if (!broker || !broker.slug) {
              return null;
            }

            const rating =
              row.country_rating ?? broker.rating;

            const ratingText =
              rating !== null &&
              Number.isFinite(Number(rating))
                ? `${Number(rating).toFixed(2)}/5`
                : "غير متوفر";

            const deposit =
              broker.min_deposit !== null &&
              Number.isFinite(Number(broker.min_deposit))
                ? `$${broker.min_deposit}`
                : "غير محدد";

            const platforms =
              broker.platforms
                ?.split(/[|,]/)
                .map((item) => item.trim())
                .filter(Boolean)
                .slice(0, 2)
                .join(" • ") || "غير محدد";

            const reviewUrl =
              `/brokers/${broker.slug}`;

            const accountUrl =
              broker.real_account_url?.trim();

            const canOpenAccount =
              Boolean(
                accountUrl &&
                /^https:\/\//i.test(accountUrl)
              );

            return (
              <div
                key={row.id}
                className="group relative grid min-w-0 grid-cols-1 gap-3 overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8fbff] p-3 transition hover:border-blue-300 hover:bg-white hover:shadow-sm xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto] xl:items-center xl:gap-4 sm:p-4"
              >

                {/* BROKER IDENTITY */}

                <div className="flex min-w-0 items-center gap-3">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#eaf3ff] text-[12px] font-black text-[#176ac8]">

                    {String(row.rank_position).padStart(2, "0")}

                  </span>

                  <Link
                    href={reviewUrl}
                    className="relative flex h-[48px] w-[72px] shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-white sm:h-[54px] sm:w-[85px]"
                  >

                    {broker.logo ? (
                      <Image
                        src={broker.logo}
                        alt={`شعار ${broker.name || "شركة التداول"}`}
                        fill
                        sizes="85px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-[12px] font-black text-[#176ac8]">

                        {(broker.name || "BA")
                          .slice(0, 2)
                          .toUpperCase()}

                      </span>
                    )}

                  </Link>

                  <div className="min-w-0 flex-1">

                    <Link
                      href={reviewUrl}
                      className="block break-words text-[14px] font-black leading-6 text-[#102747] transition hover:text-[#176ac8] sm:text-[17px]"
                    >

                      <bdi>
                        {broker.name || "شركة التداول"}
                      </bdi>

                    </Link>

                  </div>

                </div>

                {/* ACCOUNT DETAILS */}

                <div className="grid grid-cols-3 gap-2 xl:contents">

                  {/* RATING */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      {row.country_rating !== null
                        ? "تقييم السعودية"
                        : "التقييم العام"}

                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 inline-flex items-center gap-1 text-[13px] font-black text-amber-700 sm:text-[16px]"
                    >

                      <span aria-hidden="true">
                        ★
                      </span>

                      {ratingText}

                    </span>

                  </div>

                  {/* MINIMUM DEPOSIT */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      أقل إيداع معروض

                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 break-words text-[13px] font-black text-[#102747] sm:text-[16px]"
                    >

                      {deposit}

                    </span>

                  </div>

                  {/* PLATFORMS */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      المنصات

                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 break-words text-[11px] font-black text-[#102747] [overflow-wrap:anywhere] sm:text-[13px]"
                    >

                      {platforms}

                    </span>

                  </div>

                </div>

                {/* BROKER ACTION BUTTONS */}

                <div className="grid grid-cols-2 gap-2 xl:flex xl:items-center">

                  {/* REVIEW BUTTON */}

                  <Link
                    href={reviewUrl}
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border border-[#bdd8f5] bg-white px-3 py-2.5 text-center text-[11px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#eaf3ff] sm:text-[12px]"
                  >

                    تقييم الشركة

                  </Link>

                  {/* OPEN ACCOUNT BUTTON */}

                  {canOpenAccount && accountUrl ? (

                    <a
                      href={accountUrl}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] bg-[#15803d] px-3 py-2.5 text-center text-[11px] font-black text-white transition hover:bg-[#166534] sm:text-[12px]"
                    >

                      فتح حساب

                      <span aria-hidden="true">
                        ↗
                      </span>

                    </a>

                  ) : (

                    <span
                      aria-disabled="true"
                      className="inline-flex min-h-[42px] cursor-not-allowed items-center justify-center whitespace-nowrap rounded-[10px] border border-slate-200 bg-slate-100 px-3 py-2.5 text-center text-[11px] font-bold text-slate-400 sm:text-[12px]"
                    >

                      غير متاح

                    </span>

                  )}

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="p-5 text-center text-[13px] text-slate-600">

          يمكنك مراجعة تصنيف شركات التداول
          من خلال صفحة المقارنة الكاملة.

        </div>

      )}

      {/* FULL COUNTRY COMPARISON */}

      <div className="border-t border-[#d7e5f4] bg-[#f5f9ff] p-3 sm:p-5">

        <Link
          href={SAUDI_BROKERS_URL}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#bdd8f5] bg-white px-4 py-3 text-center text-[12px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#176ac8] hover:text-white sm:text-[14px]"
        >

          عرض المقارنة الكاملة لأفضل شركات التداول في السعودية

          <span aria-hidden="true">
            ←
          </span>

        </Link>

        <p className="mt-3 text-center text-[10px] leading-6 text-slate-500 sm:text-[11px]">

          تستند الشركات المعروضة إلى تصنيف
          بروكر العرب للسعودية. قد تختلف
          متطلبات الإيداع والتسجيل بحسب
          الكيان القانوني ودولة الإقامة.
          لا يمثل التصنيف إثباتاً للترخيص المحلي.
          تحقق من الموافقات النظامية قبل التسجيل.
          قد يتلقى بروكر العرب مقابلاً تجارياً
          عند استخدام بعض روابط فتح الحسابات.

        </p>

      </div>

    </section>
  );
}

/* =========================================================
   RELATED PAGES — INTERNAL LINKS
   ========================================================= */

function ImportantInternalLinks() {
  const links = [
    {
      number: "01",
      href: "/brokers",
      title: "تقييمات شركات التداول",
      description:
        "استعرض مراجعات شركات الفوركس وتقييماتها والتراخيص وتكاليف التداول وشروط الحسابات.",
    },
    {
      number: "02",
      href: "/best-brokers",
      title: "أفضل شركات التداول",
      description:
        "تعرف على تصنيفات شركات التداول بحسب الأسواق المالية وأنواع الحسابات واحتياجات المتداولين.",
    },
    {
      number: "03",
      href: "/best-brokers/saudi-arabia",
      title: "أفضل شركات التداول في السعودية",
      description:
        "اطلع على المقارنة المخصصة للمتداول السعودي وراجع خصائص الوسطاء وشروط الحسابات.",
    },
    {
      number: "04",
      href: "/compare",
      title: "مقارنة شركات التداول",
      description:
        "قارن بين شركات الفوركس من حيث التراخيص والمنصات والتكاليف وشروط التداول.",
    },
    {
      number: "05",
      href: "/compare-accounts",
      title: "مقارنة حسابات التداول",
      description:
        "قارن بين الحسابات القياسية وحسابات السنت والسبريد الخام ومواصفات كل حساب.",
    },
    {
      number: "06",
      href: "/licenses",
      title: "تراخيص شركات التداول",
      description:
        "تعرف على الهيئات الرقابية المالية ونطاق التراخيص ومستويات الحماية التنظيمية.",
    },
  ];

  return (
    <section
      id="related-pages"
      aria-label="صفحات وأدلة تداول ذات صلة"
      className="!my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-sm sm:!my-12 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(270deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-7 sm:py-7">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
          اكتشف المزيد على بروكر العرب
        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
          صفحات مهمة قبل فتح حساب التداول
        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">
          استكشف تقييمات الوسطاء والمقارنات وأنواع الحسابات
          والتراخيص لاتخاذ قرار مبني على معلومات واضحة.
        </p>

      </div>

      {/* INTERNAL LINKS GRID */}

      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-3 lg:p-6">

        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex min-w-0 flex-col overflow-hidden rounded-[15px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:p-5"
          >

            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] to-[#38bdf8]" />

            <div className="flex min-w-0 items-center gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[12px] font-black text-[#176ac8]">

                {item.number}

              </span>

              <h3 className="min-w-0 flex-1 text-[14px] font-black leading-6 text-[#102747] transition group-hover:text-[#176ac8] sm:text-[16px]">

                {item.title}

              </h3>

              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f1f7fe] text-[#176ac8] transition group-hover:bg-[#176ac8] group-hover:text-white"
              >
                ←
              </span>

            </div>

            <p className="mt-3 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">

              {item.description}

            </p>

          </Link>
        ))}

      </div>

    </section>
  );
}

/* =========================================================
   STRUCTURED DATA
   ========================================================= */

function ArticleStructuredData() {
  if (!ARTICLE_READY) {
    return null;
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    "@id": `${URL}#article`,

    headline: ARTICLE.title,
    description: ARTICLE.description,

    url: URL,
    inLanguage: "ar",

    datePublished: ARTICLE.published,
    dateModified: ARTICLE.modified,

    articleSection: ARTICLE.subcategory,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": URL,
    },

    ...(HERO_IMAGE_READY
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE}${HERO_IMAGE}`,
            width: 1774,
            height: 887,
          },
        }
      : {}),

    author: {
      "@type": "Organization",
      name: ARTICLE.publisher,
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

    keywords: ARTICLE_KEYWORDS,

    about: [
      {
        "@type": "Thing",
        name: "Foreign Exchange Trading",
      },
      {
        "@type": "Thing",
        name: "Trading Accounts",
      },
      {
        "@type": "Thing",
        name: "Know Your Customer",
      },
      {
        "@type": "Thing",
        name: "Financial Regulation",
      },
    ],

    spatialCoverage: {
      "@type": "Country",
      name: "Saudi Arabia",
    },

    citation: sources.map((source) => ({
      "@type": "CreativeWork",
      name: source.title,
      url: source.url,
    })),
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
        name: ARTICLE.breadcrumb,
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

export default async function OpenForexAccountSaudiArabiaPage() {
  const saudiBrokers =
    await getSaudiArticleBrokers();

  return (
    <main
      dir="rtl"
      lang="ar"
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >

      <ArticleStructuredData />

      {/* ARTICLE HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">

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

            <span>{ARTICLE.category}</span>

            <span aria-hidden="true">/</span>

            <span className="text-[#145ca8]">
              {ARTICLE.breadcrumb}
            </span>

          </nav>

          {/* CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">

              <span
                aria-hidden="true"
                className="text-[16px]"
              >
                🇸🇦
              </span>

              {ARTICLE.subcategory}

            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
              {ARTICLE.articleType}
            </span>

          </div>

          {/* H1 */}

          <h1 className="mt-5 w-full max-w-full whitespace-normal break-words text-[27px] font-black leading-[1.4] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)]">
  {ARTICLE.titleMain}{" – "}
  <span className="text-[#176ac8]">
    {ARTICLE.titleHighlight}
  </span>
</h1>

          <p className="mt-4 w-full text-[14px] leading-[2] text-slate-600 sm:text-[17px] sm:leading-[1.9]">
            {ARTICLE.description}
          </p>

          {/* AUTHOR AND DATE */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">

            <span>
              إعداد:{" "}
              <strong className="text-[#102747]">
                فريق بروكر العرب
              </strong>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <time dateTime={ARTICLE.modified}>

              آخر تحديث:{" "}

              {new Intl.DateTimeFormat("ar-SA", {
                calendar: "gregory",
                numberingSystem: "latn",
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(ARTICLE.modified))}

            </time>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <span>{ARTICLE.articleType}</span>

          </div>

          <ArticleHeroImage />

        </div>

      </header>

      {/* ARTICLE BODY */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">

        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">

          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

<div className="space-y-4 text-[14px] leading-[2.1] text-slate-700 sm:text-[16px] sm:leading-[2]">

  <Paragraph>
    إذا كنت تبحث عن طريقة فتح حساب فوركس في السعودية،
    سواء كنت مواطناً سعودياً أو مقيماً داخل المملكة،
    فمن المهم التعرف على شروط التسجيل والمستندات
    المطلوبة لتوثيق الحساب، واختيار نوع الحساب
    المناسب، ومراجعة تكاليف التداول ووسائل الإيداع والسحب.
  </Paragraph>

  <Paragraph>
    يقدم لك <Strong>بروكر العرب</Strong> في هذا الدليل
    شرحاً عملياً لمراحل فتح حساب التداول، بدءاً من
    مراجعة شركات الفوركس والتحقق من أهليتها لتقديم
    الخدمة في المملكة، وصولاً إلى التسجيل وتوثيق
    الهوية واختيار الحساب.
  </Paragraph>

</div>

{/* FEATURED SAUDI BROKERS */}

<SaudiBrokerComparison rankings={saudiBrokers} />

{/* TABLE OF CONTENTS */}

<TableOfContents />


           

            {/* QUICK ANSWER */}

            <ArticleSection
              id="quick-answer"
              eyebrow="ملخص الدليل"
              title="كيفية فتح حساب فوركس في السعودية باختصار"
            >

              <Paragraph>
                يتطلب فتح حساب تداول حقيقي عادةً
                التحقق من أهلية الوسيط لتقديم الخدمة،
                واستيفاء شروط السن والإقامة، وتسجيل
                البيانات الشخصية، وتقديم مستندات
                التحقق، ثم اختيار نوع الحساب ومراجعة
                شروطه المالية والتعاقدية.
              </Paragraph>

              <Note
                title="قبل البدء بالتسجيل"
                tone="amber"
              >
                قبول شركة تداول لرقم هاتف سعودي أو
                عنوان داخل المملكة لا يعني أنها مرخصة
                محلياً. يجب التحقق من التراخيص
                والموافقات اللازمة لدى الجهات
                الإشرافية السعودية قبل التعامل معها.
              </Note>

              <ArticleDataTable
                headers={[
                  "المتطلب",
                  "التوضيح",
                ]}
                rows={[
                  [
                    "السن القانوني",
                    "استيفاء الحد الأدنى للسن والأهلية القانونية بحسب الجهة المقدمة للخدمة.",
                  ],
                  [
                    "الإقامة",
                    "الإفصاح عن دولة الإقامة الفعلية والتحقق من أهلية تقديم الخدمة فيها.",
                  ],
                  [
                    "الهوية",
                    "مستند هوية ساري المفعول ومقبول لدى الجهة المختصة.",
                  ],
                  [
                    "إثبات العنوان",
                    "قد يكون مطلوباً للتحقق من عنوان السكن الفعلي.",
                  ],
                  [
                    "الإيداع الأول",
                    "يختلف بحسب الحساب ووسيلة الدفع والجهة القانونية.",
                  ],
                  [
                    "التراخيص",
                    "التحقق من الجهة القانونية ونطاق الترخيص والموافقات اللازمة.",
                  ],
                ]}
                caption="هذه متطلبات عامة وليست شروطاً موحدة لجميع شركات التداول أو موافقة تنظيمية على أي شركة."
              />

            </ArticleSection>

            {/* LEGAL STATUS */}

            <ArticleSection
              id="legal-status"
              eyebrow="التنظيم والرقابة المالية"
              title="هل يمكن فتح حساب فوركس من السعودية؟ وما الوضع القانوني؟"
            >

              <Paragraph>
                من المهم التمييز بين إمكانية الوصول
                التقنية إلى موقع شركة تداول أجنبية،
                وبين حصول الشركة على الموافقات
                النظامية اللازمة لتقديم خدماتها في
                المملكة العربية السعودية.
              </Paragraph>

              <Paragraph>
                حذرت اللجنة الدائمة للتوعية والتحذير
                من نشاط الفوركس غير المرخص المواطنين
                والمقيمين من مخاطر التعامل مع جهات
                غير مرخصة، بما فيها الجهات التي
                تسوق خدماتها من خارج المملكة.
              </Paragraph>

              <Paragraph>
                ويمكن الاطلاع على التحذيرات الرسمية
                من خلال{" "}

                <a
                  href="https://www.sama.gov.sa/ar-sa/MediaCenter/News/Pages/news-590.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  موقع البنك المركزي السعودي
                </a>

                .
              </Paragraph>

              <SubHeading>
                الفرق بين الترخيص الدولي والترخيص المحلي
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "المعيار",
                  "ما الذي يعنيه؟",
                ]}
                rows={[
                  [
                    "الترخيص المحلي",
                    "ترخيص صادر عن جهة سعودية مختصة لممارسة أنشطة محددة ضمن نطاقه.",
                  ],
                  [
                    "الترخيص الدولي",
                    "ترخيص صادر عن جهة رقابية خارج المملكة ولا يمنح تلقائياً حق تقديم الخدمات داخل السعودية.",
                  ],
                  [
                    "قبول العملاء",
                    "إتاحة التسجيل من دولة معينة لا تعد بحد ذاتها إثباتاً للترخيص فيها.",
                  ],
                  [
                    "الجهة القانونية",
                    "الشركة أو الكيان المحدد المذكور في اتفاقية العميل.",
                  ],
                  [
                    "حماية المستثمر",
                    "تعتمد على نوع المنتج والكيان القانوني والأنظمة المطبقة على الحساب.",
                  ],
                ]}
              />

              <Paragraph>
                عند مراجعة شركة تداول تحمل عدة تراخيص،
                لا يكفي الاطلاع على قائمة تراخيص المجموعة
                التجارية. يجب معرفة الكيان الذي ستوقع معه
                اتفاقية الحساب، والجهة الرقابية التي
                تشرف على ذلك الكيان تحديداً.
              </Paragraph>

              <Paragraph>
                ويمكن مراجعة{" "}

                <a
                  href="https://cma.org.sa/Market/AuthorisedPersons/Pages/default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  سجل مؤسسات السوق المالية المرخص لها
                  لدى هيئة السوق المالية السعودية
                </a>

                {" "}والتحقق من نطاق النشاط المصرح به.
              </Paragraph>

              <Note
                title="تنبيه تنظيمي مهم"
                tone="amber"
              >
                لا يمثل هذا الدليل فتوى قانونية أو تصريحاً
                بالتعامل مع شركات الفوركس الأجنبية.
                إذا لم تتمكن من التحقق من أهلية الجهة
                لتقديم الخدمة داخل المملكة، فلا تحول
                إليها الأموال واستفسر من الجهة الرقابية
                السعودية المختصة.
              </Note>

            </ArticleSection>

            {/* ACCOUNT REQUIREMENTS */}

            <ArticleSection
              id="requirements"
              eyebrow="متطلبات التسجيل"
              title="ما هي شروط فتح حساب فوركس في السعودية؟"
            >

              <Paragraph>
                تختلف الشروط التفصيلية لفتح حساب
                تداول بحسب الشركة والكيان القانوني
                ونوع المنتج المالي. ومع ذلك، توجد
                مجموعة من المتطلبات الشائعة لدى
                مقدمي الخدمات المالية.
              </Paragraph>

              <ArticleList
                items={[
                  "استيفاء شروط الأهلية القانونية والحد الأدنى للسن، والذي يكون غالباً 18 عاماً أو أكثر وفق الجهة المقدمة للخدمة.",

                  "الإفصاح عن الجنسية ودولة الإقامة الفعلية دون تقديم معلومات غير صحيحة.",

                  "امتلاك مستندات هوية سارية المفعول.",

                  "توفير بريد إلكتروني ورقم هاتف يمكن التحقق منهما.",

                  "استكمال متطلبات معرفة العميل والتحقق من الهوية KYC.",

                  "تقديم معلومات عن المهنة والدخل ومصدر الأموال عند طلبها.",

                  "استكمال تقييم الخبرة والمعرفة بالمخاطر إذا كان مطلوباً.",

                  "قراءة اتفاقية العميل والإفصاحات المتعلقة بالمخاطر والرسوم.",
                ]}
              />

              <SubHeading>
                هل يشترط وجود خبرة سابقة في الفوركس؟
              </SubHeading>

              <Paragraph>
                لا تتطلب جميع أنواع الحسابات القدر
                نفسه من الخبرة، ولكن بعض الجهات
                المالية تطلب من العميل الإجابة عن
                أسئلة تتعلق بمعرفته بالمنتجات
                المالية والرافعة المالية والمخاطر.
              </Paragraph>

              <Paragraph>
                لا ينبغي تقديم إجابات غير صحيحة بهدف
                تجاوز اختبار الملاءمة، لأن بعض المنتجات
                قد لا تكون مناسبة لمستوى خبرة العميل
                أو وضعه المالي.
              </Paragraph>

            </ArticleSection>

            {/* DOCUMENTS */}

            <ArticleSection
              id="documents"
              eyebrow="الهوية والتحقق"
              title="المستندات المطلوبة لفتح وتوثيق حساب فوركس"
            >

              <Paragraph>
                تتعلق معظم مستندات التسجيل بإثبات
                هوية صاحب الحساب وعنوان إقامته،
                وقد تطلب الجهة المالية معلومات
                إضافية للتحقق من مصدر الأموال أو
                استيفاء متطلبات الامتثال.
              </Paragraph>

              <RequiredDocuments />

              <SubHeading>
                ما المستندات التي يمكن استخدامها لإثبات العنوان؟
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "المستند",
                  "ملاحظات القبول",
                ]}
                rows={[
                  [
                    "كشف حساب بنكي",
                    "قد يقبل إذا كان حديثاً ويظهر الاسم والعنوان المطلوبين.",
                  ],
                  [
                    "فاتورة خدمات",
                    "قد تقبل فاتورة الكهرباء أو المياه أو خدمات أخرى وفق سياسة التحقق.",
                  ],
                  [
                    "العنوان الوطني",
                    "يمكن الاستفسار عن قبول إثبات العنوان الوطني السعودي؛ لا تقبله جميع الجهات بالضرورة.",
                  ],
                  [
                    "مستند حكومي",
                    "قد يقبل إذا كان صادراً عن جهة رسمية ويتضمن البيانات المطلوبة.",
                  ],
                  [
                    "عقد إيجار",
                    "يعتمد قبوله على نوع العقد وشروط الجهة المقدمة للخدمة.",
                  ],
                ]}
                caption="تختلف أنواع المستندات المقبولة والمدة المسموح بها منذ إصدارها، لذلك يجب مراجعة قائمة المستندات الخاصة بالجهة القانونية."
              />

              <Note title="هل يكفي تقديم الهوية فقط؟">
                قد تسمح بعض أنظمة التسجيل ببدء إجراءات
                الحساب باستخدام مستند هوية واحد، بينما
                تتطلب جهات أخرى مستنداً منفصلاً لإثبات
                العنوان أو معلومات إضافية. لا تفترض أن
                اكتمال التسجيل يعني اكتمال التوثيق.
              </Note>

              <Paragraph>
                ومن الأمثلة على آليات التحقق لدى الوسطاء
                ما توضحه صفحة{" "}

                <a
                  href="https://get.exness.help/hc/en-us/articles/17537772392732-Verification-document-requirements"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  متطلبات مستندات التحقق في مركز مساعدة Exness
                </a>

                ، والتي تميز بين إثبات الهوية وإثبات
                العنوان. ويُذكر هذا المصدر لشرح آلية
                التوثيق فقط، وليس لإثبات الترخيص المحلي.
              </Paragraph>

            </ArticleSection>

            {/* SAUDI CITIZENS */}

            <ArticleSection
              id="saudi-citizens"
              eyebrow="المواطن السعودي"
              title="فتح حساب تداول باستخدام الهوية الوطنية السعودية"
            >

              <Paragraph>
                تعد الهوية الوطنية السعودية مستنداً
                رسمياً لإثبات هوية المواطن، وقد تكون
                ضمن المستندات المقبولة لدى الجهات
                المالية التي توفر خدماتها بصورة
                نظامية داخل المملكة.
              </Paragraph>

              <Paragraph>
                ومع ذلك، تختلف آلية قبول الهوية
                والتحقق الإلكتروني بين المؤسسات
                المالية. وقد يُطلب جواز السفر أو
                مستند إضافي بحسب النظام المستخدم
                للتحقق من بيانات العميل.
              </Paragraph>

              <SubHeading>
                نقاط يجب مراجعتها عند التسجيل بالهوية الوطنية
              </SubHeading>

              <ArticleList
                items={[
                  "التأكد من أن الهوية الوطنية سارية المفعول.",

                  "مطابقة الاسم وتاريخ الميلاد للبيانات الرسمية.",

                  "استخدام التهجئة الصحيحة للاسم باللغة الإنجليزية عند الحاجة.",

                  "رفع صور واضحة للمستند المطلوب دون إخفاء بيانات لازمة للتحقق.",

                  "مطابقة اسم صاحب وسيلة الدفع لاسم صاحب حساب التداول.",

                  "تقديم إثبات منفصل للعنوان إذا طلبته الجهة المالية.",
                ]}
              />

              <Note title="اختلاف كتابة الاسم باللغة الإنجليزية">
                قد يؤدي اختلاف تهجئة الاسم بين جواز
                السفر والحساب البنكي وبيانات التسجيل
                إلى طلب مستندات إضافية. يفضل استخدام
                الكتابة الرسمية للاسم كما تظهر في
                المستندات المعتمدة.
              </Note>

            </ArticleSection>

            {/* SAUDI RESIDENTS */}

            <ArticleSection
              id="saudi-residents"
              eyebrow="المقيم داخل المملكة"
              title="كيفية فتح حساب فوركس للمقيمين في السعودية"
            >

              <Paragraph>
                قد تختلف متطلبات فتح الحساب للمقيمين
                عن متطلبات المواطنين، خصوصاً فيما
                يتعلق بالجنسية وتصريح الإقامة
                والمستندات المقبولة لإثبات العنوان.
              </Paragraph>

              <Paragraph>
                يعتمد قبول طلب المقيم على أهليته
                القانونية وشروط المؤسسة المالية
                والقيود المرتبطة بالجنسية والإقامة
                والمنتج المالي المطلوب.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "نوع البيانات",
                  "ما يجب تقديمه أو التحقق منه",
                ]}
                rows={[
                  [
                    "الجنسية",
                    "الجنسية الفعلية كما تظهر في جواز السفر.",
                  ],
                  [
                    "دولة الإقامة",
                    "المملكة العربية السعودية إذا كانت محل الإقامة الفعلي.",
                  ],
                  [
                    "جواز السفر",
                    "جواز سفر ساري المفعول إذا كان مطلوباً.",
                  ],
                  [
                    "الإقامة",
                    "إقامة سعودية سارية إذا كانت ضمن المستندات المطلوبة.",
                  ],
                  [
                    "العنوان",
                    "عنوان السكن الفعلي داخل المملكة.",
                  ],
                  [
                    "الإقامة الضريبية",
                    "الإفصاح عنها وفق الحالة الفعلية ومتطلبات المؤسسة المالية.",
                  ],
                ]}
              />

              <SubHeading>
                هل يمكن التسجيل بجنسية مختلفة عن دولة الإقامة؟
              </SubHeading>

              <Paragraph>
                نعم، قد تسمح أنظمة المؤسسات المالية
                بتسجيل جنسية مختلفة عن دولة الإقامة،
                لكن ذلك لا يعني قبول جميع الجنسيات
                أو السماح بتقديم الخدمة في جميع الدول.
              </Paragraph>

              <Paragraph>
                يجب الإفصاح عن الجنسية والإقامة
                بدقة، وعدم اختيار دولة أخرى بهدف
                تجاوز القيود الجغرافية المفروضة
                على فتح الحسابات.
              </Paragraph>

            </ArticleSection>

            {/* ACCOUNT TYPES */}

            <ArticleSection
              id="account-types"
              eyebrow="اختيار الحساب"
              title="ما نوع حساب الفوركس المناسب قبل التسجيل؟"
            >

              <Paragraph>
                قبل فتح حساب حقيقي، ينبغي التعرف
                على الفروق بين أنواع الحسابات
                المتاحة، لأن اختيار الحساب يؤثر
                على تكاليف التداول وحجم العقود
                ومتطلبات الهامش وشروط التنفيذ.
              </Paragraph>

              <AccountTypesGrid />

              <Paragraph>
                يمكن استخدام{" "}

                <Link
                  href="/compare-accounts"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  أداة مقارنة حسابات التداول
                </Link>

                {" "}للتعرف على الفروق بين الحسابات
                ومراجعة البيانات المتاحة عن السبريد
                والعمولات والحد الأدنى للإيداع.
              </Paragraph>

              <Note title="الفرق بين أنواع الحسابات وخصائصها">

  الحساب التجريبي (Demo Account) هو حساب
  تدريبي يستخدم أموالاً افتراضية، ولا يعد
  نوعاً من حسابات التداول الحقيقي.

  <br />
  <br />

  أما الحساب الإسلامي (Islamic Account)
  فهو خاصية تتعلق بشروط رسوم التبييت،
  وقد تتوفر ضمن الحسابات القياسية أو
  حسابات السنت أو حسابات السبريد الخام
  أو غيرها، بحسب شروط شركة التداول.

  <br />
  <br />

  كذلك فإن مسمى ECN يرتبط عادةً بنموذج
  تنفيذ الأوامر، وقد تتداخل خصائصه مع
  حسابات Raw Spread. لذلك ينبغي مراجعة
  مواصفات الحساب الفعلية وليس الاعتماد
  على مسماه التجاري وحده.

</Note>

            </ArticleSection>

            {/* REGISTRATION STEPS */}

            <ArticleSection
              id="registration-steps"
              eyebrow="دليل التسجيل العملي"
              title="خطوات فتح حساب فوركس في السعودية من البداية إلى التوثيق"
            >

              <Paragraph>
                تختلف واجهة التسجيل بين المنصات،
                لكن الإجراءات العامة تتشابه في
                عدد من المراحل المتعلقة بالبيانات
                الشخصية والتحقق واختيار الحساب.
              </Paragraph>

              <RegistrationSteps />

              <SubHeading>
                الخطوة الأولى: التحقق من الشركة والكيان القانوني
              </SubHeading>

              <Paragraph>
                ابحث عن الاسم القانوني الكامل
                للمؤسسة ورقم الترخيص والجهة الرقابية،
                وقارن هذه المعلومات بالسجلات الرسمية.
                تحقق كذلك من أن نطاق الترخيص يسمح
                بتقديم المنتج المالي المطلوب في
                مكان إقامتك.
              </Paragraph>

              <SubHeading>
                الخطوة الثانية: مراجعة اتفاقية العميل
              </SubHeading>

              <Paragraph>
                توضح الاتفاقية الجهة المتعاقدة
                مع العميل، وآلية حفظ الأموال،
                وسياسة تنفيذ الأوامر، والرسوم،
                وإجراءات تقديم الشكاوى وإغلاق
                الحساب.
              </Paragraph>

              <Paragraph>
                لا تعتمد على المعلومات التسويقية
                وحدها إذا كانت تختلف عن الشروط
                القانونية الواردة في الاتفاقية.
              </Paragraph>

              <SubHeading>
                الخطوة الثالثة: تسجيل البيانات الشخصية
              </SubHeading>

              <Paragraph>
                بعد التحقق من أهلية الجهة لتقديم
                الخدمة، تُستكمل بيانات التسجيل
                المطلوبة، والتي قد تشمل الاسم
                وتاريخ الميلاد والجنسية والإقامة
                والبريد الإلكتروني ورقم الهاتف.
              </Paragraph>

              <SubHeading>
                الخطوة الرابعة: التحقق من الهوية والعنوان
              </SubHeading>

              <Paragraph>
                قد تتضمن هذه المرحلة رفع مستند
                الهوية وتصوير الوجه أو إجراء
                تحقق إلكتروني، وتقديم مستند
                لإثبات عنوان السكن ومعلومات
                عن مصدر الأموال.
              </Paragraph>

              <SubHeading>
                الخطوة الخامسة: اختيار الحساب والمنصة
              </SubHeading>

              <Paragraph>
                تختلف المنصات المتوفرة باختلاف
                المؤسسة المالية، وقد تشمل منصات
                MetaTrader 4 أو MetaTrader 5 أو
                منصات خاصة بالشركة.
              </Paragraph>

              <Paragraph>
                وجود منصة تداول معروفة لا يمثل
                بحد ذاته دليلاً على سلامة الشركة
                أو حصولها على ترخيص محلي.
              </Paragraph>

              <SubHeading>
                الخطوة السادسة: مراجعة جاهزية الحساب
              </SubHeading>

              <Paragraph>
                قبل التفكير في الإيداع، تأكد من
                اكتمال التحقق من الحساب، وفهم
                الشروط المالية، ومعرفة طريقة
                السحب والجهة المستفيدة من الأموال.
              </Paragraph>

            </ArticleSection>

            {/* VERIFICATION */}

            <ArticleSection
              id="verification"
              eyebrow="التحقق من الحساب"
              title="كيفية توثيق حساب تداول الفوركس وما المقصود بـ KYC؟"
            >

              <Paragraph>
                تشير إجراءات معرفة العميل
                (Know Your Customer) إلى مجموعة
                من عمليات التحقق التي تستخدمها
                المؤسسات المالية للتأكد من هوية
                العميل وفهم طبيعة العلاقة المالية.
              </Paragraph>

              <Paragraph>
                قد تتضمن هذه الإجراءات التحقق من
                الهوية والإقامة ومصدر الأموال،
                إلى جانب تقييم بعض المخاطر
                المرتبطة بالحساب أو العمليات
                المالية.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "مرحلة التحقق",
                  "الغرض منها",
                ]}
                rows={[
                  [
                    "التحقق من البريد",
                    "التأكد من إمكانية الوصول إلى البريد الإلكتروني.",
                  ],
                  [
                    "التحقق من الهاتف",
                    "التأكد من إمكانية الوصول إلى رقم الهاتف المسجل.",
                  ],
                  [
                    "إثبات الهوية POI",
                    "التحقق من هوية صاحب الحساب وبياناته القانونية.",
                  ],
                  [
                    "إثبات العنوان POA",
                    "التحقق من محل الإقامة الفعلي عند الحاجة.",
                  ],
                  [
                    "مصدر الأموال",
                    "فهم مصدر الأموال المستخدمة وفق متطلبات الامتثال.",
                  ],
                  [
                    "تقييم الملاءمة",
                    "تقييم معرفة العميل بالمنتجات والمخاطر عند تطبيق هذا المتطلب.",
                  ],
                ]}
              />

              <SubHeading>
                كم يستغرق توثيق حساب الفوركس؟
              </SubHeading>

              <Paragraph>
                لا توجد مدة موحدة لجميع الحسابات.
                قد تكون بعض عمليات التحقق آلية
                وسريعة، بينما تتطلب حالات أخرى
                مراجعة بشرية أو تقديم مستندات
                إضافية.
              </Paragraph>

              <Paragraph>
                تعتمد المدة على جودة المستندات
                ومدى اكتمال البيانات ونظام
                التحقق المستخدم ومتطلبات الجهة
                القانونية.
              </Paragraph>

            </ArticleSection>

            {/* VERIFICATION REJECTION */}

            <ArticleSection
              id="verification-rejection"
              eyebrow="حل مشكلات التسجيل"
              title="لماذا يتم رفض توثيق حساب التداول؟ وكيف تتعامل مع المشكلة؟"
            >

              <Paragraph>
                قد يواجه بعض المتقدمين رسالة تفيد
                برفض المستندات أو عدم اكتمال التحقق.
                ولا يعني ذلك بالضرورة وجود مشكلة
                دائمة في الحساب، فقد يكون السبب
                متعلقاً بجودة المستند أو عدم
                مطابقة البيانات.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "سبب الرفض المحتمل",
                  "الإجراء المناسب",
                ]}
                rows={[
                  [
                    "انتهاء صلاحية الهوية",
                    "تقديم مستند ساري المفعول من الأنواع المقبولة.",
                  ],
                  [
                    "صورة غير واضحة",
                    "إعادة تصوير المستند بصورة واضحة تظهر جميع البيانات المطلوبة.",
                  ],
                  [
                    "عدم تطابق الاسم",
                    "التواصل مع الدعم الرسمي لتصحيح البيانات وتقديم المستندات اللازمة.",
                  ],
                  [
                    "إثبات عنوان غير مقبول",
                    "مراجعة أنواع المستندات المعتمدة لدى الجهة المالية.",
                  ],
                  [
                    "مستند قديم",
                    "تقديم مستند حديث وفق المدة المحددة في شروط التحقق.",
                  ],
                  [
                    "اختلاف دولة الإقامة",
                    "تصحيح بيانات الإقامة الفعلية وتقديم إثبات مناسب.",
                  ],
                  [
                    "قيود تنظيمية أو جغرافية",
                    "عدم محاولة تجاوز القيود والاستفسار عن سبب عدم الأهلية.",
                  ],
                ]}
              />

              <Note
                title="لا تعدل المستندات الرسمية"
                tone="amber"
              >
                يجب عدم تغيير البيانات الموجودة في
                مستندات الهوية أو إثبات العنوان
                باستخدام برامج تعديل الصور. إذا
                كان هناك خطأ في البيانات، يجب
                تصحيحه من خلال الجهة الرسمية أو
                إجراءات الدعم المعتمدة.
              </Note>

            </ArticleSection>

            {/* SAUDI TOP FIVE BROKERS */}

<SaudiTopFiveBrokers rankings={saudiBrokers} />

{/* MINIMUM DEPOSIT */}

            <ArticleSection
              id="minimum-deposit"
              eyebrow="المتطلبات المالية"
              title="كم الحد الأدنى لفتح حساب فوركس في السعودية؟"
            >

              <Paragraph>
                لا يوجد حد أدنى موحد للإيداع ينطبق
                على جميع حسابات الفوركس. تختلف
                المتطلبات بحسب نوع الحساب والوسيط
                والكيان القانوني ووسيلة الدفع
                ودولة الإقامة.
              </Paragraph>

              <Paragraph>
                ومن المهم التمييز بين الحد الأدنى
                للإيداع الأول والحد الأدنى للعملية
                المالية الواحدة، فقد تختلف
                القيمتان حتى داخل الشركة نفسها.
              </Paragraph>

              <SubHeading>
                الفرق بين الحد الأدنى للإيداع ورأس المال المطلوب
              </SubHeading>

              <Paragraph>
                قبول إيداع مبلغ صغير لا يعني أن
                المبلغ يكفي لتحمل مخاطر التداول،
                خصوصاً عند استخدام الرافعة المالية
                أو تداول منتجات ذات تقلبات مرتفعة.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "المصطلح",
                  "التعريف",
                ]}
                rows={[
                  [
                    "الحد الأدنى للإيداع",
                    "أقل مبلغ تقبله الشركة أو وسيلة الدفع وفق الشروط المطبقة.",
                  ],
                  [
                    "الهامش المطلوب",
                    "المبلغ اللازم لفتح مركز تداول والاحتفاظ به وفق شروط الحساب.",
                  ],
                  [
                    "رصيد الحساب",
                    "الأموال المسجلة في الحساب بعد العمليات المنفذة.",
                  ],
                  [
                    "حقوق الملكية Equity",
                    "رصيد الحساب بعد احتساب الأرباح والخسائر العائمة.",
                  ],
                  [
                    "رأس المال المعرض للخطر",
                    "الأموال التي قد يتعرض العميل لخسارتها عند التداول.",
                  ],
                ]}
              />

              <Paragraph>
                لمعرفة كيفية احتساب الهامش المطلوب
                يمكن استخدام{" "}

                <Link
                  href="/tools/margin-calculator"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  حاسبة الهامش
                </Link>

                {" "}المتوفرة على بروكر العرب، مع
                مراعاة أن المتطلبات الفعلية قد
                تختلف بحسب شروط الوسيط والمنتج.
              </Paragraph>

              <Note
                title="الحد الأدنى ليس توصية برأس المال"
                tone="amber"
              >
                الحد الأدنى للإيداع هو شرط تشغيلي،
                وليس مقياساً لملاءمة التداول للعميل
                أو ضماناً للقدرة على تحمل الخسائر.
                لا ينبغي المخاطرة بأموال مخصصة
                للاحتياجات المعيشية أو الالتزامات
                الأساسية.
              </Note>

            </ArticleSection>

            {/* PAYMENTS */}

            <ArticleSection
              id="payments"
              eyebrow="العمليات المالية"
              title="طرق الإيداع والسحب في حسابات الفوركس من السعودية"
            >

              <Paragraph>
                تختلف وسائل الدفع المتاحة بحسب
                المؤسسة المالية والبنك والكيان
                التنظيمي ودولة إقامة العميل.
                وقد تتغير الوسائل المتاحة نتيجة
                تحديثات السياسات المصرفية أو
                متطلبات الامتثال.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "وسيلة الدفع",
                  "ما يجب التحقق منه",
                ]}
                rows={[
                  [
                    "التحويل البنكي",
                    "الاسم القانوني للمستفيد، ومشروعية العملية، والرسوم المصرفية.",
                  ],
                  [
                    "البطاقات البنكية",
                    "قبول العملية من البنك المصدر وشروط استرداد الأموال.",
                  ],
                  [
                    "المحافظ الإلكترونية",
                    "ترخيص مقدم خدمة الدفع وتوفره النظامي وشروط السحب.",
                  ],
                  [
                    "وسائل الدفع المحلية",
                    "توفرها الفعلي داخل الحساب والموافقات المتعلقة باستخدامها.",
                  ],
                ]}
              />

              <SubHeading>
                هل يمكن الإيداع والسحب بالريال السعودي؟
              </SubHeading>

              <Paragraph>
                يعتمد ذلك على العملات التي تدعمها
                المؤسسة المالية ووسيلة الدفع
                المستخدمة. يجب التمييز بين قبول
                دفعة بالريال السعودي وبين إمكانية
                الاحتفاظ برصيد حساب التداول نفسه
                بالريال السعودي.
              </Paragraph>

              <Paragraph>
                إذا كانت العملة الأساسية للحساب
                مختلفة عن عملة وسيلة الدفع،
                فقد تتم عملية تحويل للعملة
                وتُطبق رسوم أو فروق في أسعار
                الصرف بحسب الجهة المسؤولة
                عن التحويل.
              </Paragraph>

              <SubHeading>
                ماذا تفعل إذا رفض البنك السعودي عملية التحويل؟
              </SubHeading>

              <Paragraph>
                إذا رفض البنك عملية دفع أو تحويل،
                ينبغي الاستفسار منه عن السبب
                والتحقق من أهلية الجهة المستفيدة
                ومشروعية العملية، بدلاً من محاولة
                الالتفاف على القيود المصرفية.
              </Paragraph>

              <Note
                title="تحذير من التحويل إلى الحسابات الشخصية"
                tone="amber"
              >
                لا تحول الأموال إلى حساب شخصي
                يقدمه شخص يدعي أنه مدير حساب
                أو وكيل لشركة تداول، ولا تعتمد
                على تعليمات الدفع المرسلة عبر
                قنوات غير رسمية.
              </Note>

            </ArticleSection>

            {/* ISLAMIC ACCOUNT */}

            <ArticleSection
              id="islamic-account"
              eyebrow="الحسابات الإسلامية"
              title="كيفية فتح حساب تداول إسلامي في السعودية"
            >

              <Paragraph>
                يبحث بعض المتداولين في السعودية
                عن حسابات لا تفرض رسوم التبييت
                التقليدية على الصفقات المفتوحة
                لأكثر من يوم، والتي تسوق عادةً
                تحت مسمى الحساب الإسلامي أو
                الحساب الخالي من السواب.
              </Paragraph>

              <Paragraph>
                تختلف شروط هذه الحسابات بين
                الشركات، فقد يكون الإعفاء مرتبطاً
                بدولة الإقامة أو نوع الأداة
                المالية أو مدة الاحتفاظ بالصفقة،
                وقد تفرض بعض الجهات رسوماً بديلة.
              </Paragraph>

              <SubHeading>
                ما الذي يجب التحقق منه في الحساب الإسلامي؟
              </SubHeading>

              <ArticleList
                items={[
                  "الأدوات المالية المشمولة بالإعفاء من رسوم التبييت.",

                  "الفترة التي يستمر خلالها الإعفاء.",

                  "وجود رسوم إدارية أو رسوم احتفاظ بديلة.",

                  "شروط إلغاء الإعفاء أو تعديل حالة الحساب.",

                  "طبيعة العقد المالي وآلية التنفيذ والرافعة المالية.",
                ]}
              />

              <Note title="هل كل حساب Swap-Free متوافق مع الشريعة؟">
                عدم فرض رسوم التبييت وحده لا
                يثبت التوافق الشرعي الكامل للمنتج
                أو المعاملة. يتطلب الحكم الشرعي
                النظر في طبيعة العقد والقبض
                والملكية والرافعة المالية وسائر
                الشروط، والرجوع إلى أهل الاختصاص.
              </Note>

            </ArticleSection>

            {/* TRADING COSTS */}

            <ArticleSection
              id="trading-costs"
              eyebrow="الرسوم والتكاليف"
              title="هل فتح حساب الفوركس مجاني؟ وما تكاليف التداول؟"
            >

              <Paragraph>
                قد تتيح بعض المؤسسات فتح الحساب
                دون رسوم تسجيل مباشرة، لكن هذا
                لا يعني أن التداول أو الاحتفاظ
                بالحساب أو تنفيذ عمليات الدفع
                مجاني بالكامل.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "نوع التكلفة",
                  "التوضيح",
                ]}
                rows={[
                  [
                    "السبريد Spread",
                    "الفرق بين سعري العرض والطلب.",
                  ],
                  [
                    "العمولة",
                    "رسوم قد تفرض على فتح الصفقات أو إغلاقها.",
                  ],
                  [
                    "رسوم التبييت",
                    "تكاليف قد ترتبط بالاحتفاظ بالصفقات بعد وقت محدد.",
                  ],
                  [
                    "تحويل العملات",
                    "تكاليف محتملة عند اختلاف عملة الحساب عن عملة الدفع.",
                  ],
                  [
                    "رسوم الإيداع والسحب",
                    "قد تفرضها المؤسسة أو البنك أو مقدم خدمات الدفع.",
                  ],
                  [
                    "رسوم عدم النشاط",
                    "رسوم قد تطبق بعد فترة من عدم استخدام الحساب، بحسب الاتفاقية.",
                  ],
                ]}
              />

              <Paragraph>
                يمكن التعرف على مفهوم فروق الأسعار
                بصورة أكثر تفصيلاً من خلال{" "}

                <Link
                  href="/learn-trading/spread"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  شرح السبريد في التداول
                </Link>

                {" "}ومراجعة{" "}

                <Link
                  href="/learn-trading/leverage"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  مفهوم الرافعة المالية
                </Link>

                {" "}لفهم طبيعة التكاليف والمخاطر
                المرتبطة بالحساب.
              </Paragraph>

            </ArticleSection>

            {/* SECURITY */}

            <ArticleSection
              id="security"
              eyebrow="الأمان والحماية"
              title="كيف تحمي أموالك وبياناتك عند فتح حساب تداول؟"
            >

              <Paragraph>
                حذرت الجهات السعودية المختصة من
                أساليب احتيال تستخدم فيها أسماء
                شركات مالية ومواقع إلكترونية
                ورسائل تسويقية توحي بأن الجهة
                مرخصة أو قادرة على تحقيق أرباح
                مضمونة.
              </Paragraph>

              <Paragraph>
                ولهذا فإن حماية البيانات الشخصية
                تبدأ من التحقق من هوية المؤسسة
                قبل تقديم مستندات التسجيل أو
                التعامل مع أي ممثل لها.
              </Paragraph>

              <ArticleList
                items={[
                  "التحقق من الاسم القانوني ورقم الترخيص عبر الموقع الرسمي للجهة الرقابية.",

                  "مطابقة النطاق الإلكتروني وبيانات الاتصال مع السجلات الرسمية.",

                  "عدم إرسال الهوية أو جواز السفر عبر حسابات واتساب غير رسمية.",

                  "عدم مشاركة كلمات المرور أو رموز التحقق مع أي شخص.",

                  "استخدام كلمة مرور فريدة وتفعيل المصادقة الثنائية عند توفرها.",

                  "عدم تثبيت برامج التحكم عن بعد استجابة لطلب شخص يدعي أنه موظف لدى الوسيط.",

                  "رفض الوعود التي تتضمن أرباحاً مضمونة أو خالية من المخاطر.",

                  "الاحتفاظ بنسخة من اتفاقية العميل والمراسلات والإيصالات الرسمية.",
                ]}
              />

              <SubHeading>
                أين يمكن الإبلاغ عن الأنشطة غير المرخصة؟
              </SubHeading>

              <Paragraph>
                يمكن الرجوع إلى القنوات الرسمية
                لهيئة السوق المالية والبنك المركزي
                السعودي بحسب طبيعة النشاط والجهة
                المختصة به.
              </Paragraph>

              <Paragraph>
                ويوفر البنك المركزي السعودي صفحة
                خاصة بالتوعية والبلاغات المتعلقة
                بـ{" "}

                <a
                  href="https://sama.gov.sa/ar-sa/Supervision/Pages/unlicensed_activities.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  الأنشطة المالية غير المرخصة
                </a>

                .
              </Paragraph>

              <Note
                title="علامة تحذير مهمة عند طلب سحب الأموال"
                tone="amber"
              >
                إذا طلبت جهة غير موثوقة تحويل مبلغ
                إضافي إلى حساب شخصي بحجة دفع ضريبة
                أو فك تجميد الأرباح أو تفعيل السحب،
                فلا تحول الأموال قبل التحقق من
                الجهة المختصة ومشروعية الطلب.
              </Note>

            </ArticleSection>

            {/* FAQ */}

            <ArticleSection
              id="faq"
              eyebrow="أسئلة المتداول السعودي"
              title="الأسئلة الشائعة حول فتح حساب فوركس في السعودية"
            >

              <div className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-6">

                <FAQItem question="هل يمكن فتح حساب فوركس بالهوية الوطنية السعودية؟">
                  قد تكون الهوية الوطنية مستنداً مقبولاً
                  لدى بعض المؤسسات المالية. يعتمد
                  القبول على سياسة التحقق وأهلية
                  المؤسسة لتقديم الخدمة داخل المملكة،
                  وقد يُطلب جواز السفر أو إثبات
                  عنوان منفصل.
                </FAQItem>

                <FAQItem question="هل يستطيع المقيم في السعودية فتح حساب تداول؟">
                  يعتمد ذلك على الجنسية والإقامة
                  ونوع المنتج المالي وشروط المؤسسة
                  والتراخيص والموافقات اللازمة.
                  قد يُطلب من المقيم تقديم جواز
                  السفر وإقامة سارية وإثبات العنوان.
                </FAQItem>

                <FAQItem question="هل يشترط وجود حساب بنكي سعودي لفتح حساب فوركس؟">
                  ليس بالضرورة لمرحلة التسجيل الأولية،
                  لكن قد تحتاج إلى وسيلة دفع مقبولة
                  باسمك عند إجراء العمليات المالية.
                  تختلف الشروط بحسب المؤسسة والبنك
                  والأنظمة المعمول بها.
                </FAQItem>

                <FAQItem question="هل يمكن فتح حساب فوركس دون إيداع؟">
                  قد تسمح بعض المنصات بالتسجيل
                  وإنشاء حساب تجريبي أو حساب حقيقي
                  قبل تمويله، لكن إمكانية استخدام
                  الحساب الحقيقي تخضع لشروط التحقق
                  والهامش والقيود التنظيمية.
                </FAQItem>

                <FAQItem question="ما الحد الأدنى لعمر المتداول عند فتح الحساب؟">
                  تشترط مؤسسات مالية كثيرة أن يكون
                  عمر العميل 18 عاماً على الأقل،
                  لكن شروط السن والأهلية القانونية
                  قد تختلف بحسب الولاية القضائية
                  والمنتج والمؤسسة.
                </FAQItem>

                <FAQItem question="هل يمكن استخدام العنوان الوطني السعودي لتوثيق حساب التداول؟">
                  يعتمد قبول إثبات العنوان الوطني
                  على سياسة التحقق الخاصة بالمؤسسة.
                  يجب التأكد من قبوله قبل رفع
                  المستند، وقد يُطلب كشف حساب بنكي
                  أو مستند آخر.
                </FAQItem>

                <FAQItem question="كم يستغرق فتح حساب فوركس وتوثيقه؟">
                  تختلف المدة بحسب اكتمال البيانات
                  وجودة المستندات ومتطلبات الامتثال.
                  قد يكون التسجيل الأولي سريعاً،
                  بينما يستغرق التحقق النهائي مدة
                  أطول عند الحاجة إلى مراجعة إضافية.
                </FAQItem>

                <FAQItem question="هل يمكن فتح حساب تداول بالريال السعودي؟">
                  يعتمد ذلك على العملات الأساسية
                  التي تدعمها المؤسسة المالية.
                  قبول الإيداع بالريال السعودي
                  لا يعني بالضرورة توفر حساب
                  تكون عملته الأساسية الريال.
                </FAQItem>

                <FAQItem question="هل الترخيص البريطاني أو الأسترالي يكفي للتداول من السعودية؟">
                  الترخيص الأجنبي لا يمنح تلقائياً
                  حق تقديم الخدمات المالية داخل
                  المملكة. يجب التحقق من الجهة
                  المتعاقدة مع العميل ونطاق
                  ترخيصها والموافقات النظامية
                  اللازمة لدى الجهات السعودية المختصة.
                </FAQItem>

                <FAQItem question="هل توجد رسوم على فتح حساب فوركس؟">
                  تختلف الرسوم بين المؤسسات.
                  حتى إذا كان التسجيل مجانياً،
                  فقد توجد تكاليف مرتبطة بالسبريد
                  والعمولات والتبييت وتحويل
                  العملات والعمليات المالية.
                </FAQItem>

              </div>

            </ArticleSection>

            {/* CONCLUSION */}

            <ArticleSection
              id="conclusion"
              eyebrow="الخلاصة"
              title="ما الذي يجب التأكد منه قبل فتح حساب فوركس في السعودية؟"
            >

              <Paragraph>
                لا يقتصر فتح حساب فوركس في
                السعودية على اختيار منصة التداول
                وإدخال البيانات الشخصية، بل
                يبدأ بالتحقق من أهلية الجهة
                المقدمة للخدمة ونظامية نشاطها،
                وفهم الشروط القانونية والمالية
                المرتبطة بالحساب.
              </Paragraph>

              <Paragraph>
                وينبغي للمواطنين والمقيمين
                التأكد من المستندات المطلوبة
                ومطابقة بيانات الهوية والإقامة
                والعنوان، إلى جانب مراجعة
                سياسة الإيداع والسحب والرسوم
                ومخاطر المنتجات المالية.
              </Paragraph>

              <Paragraph>
                وإذا كنت لا تزال في مرحلة مقارنة
                الوسطاء، يمكنك الاطلاع على{" "}

                <Link
                  href={SAUDI_BROKERS_URL}
                  className="font-black text-[#176ac8] hover:underline"
                >
                  دليل أفضل شركات التداول في السعودية
                </Link>

                {" "}لمراجعة خصائص الشركات،
                مع ضرورة التحقق بصورة مستقلة
                من التراخيص والموافقات المحلية
                قبل اتخاذ أي قرار.
              </Paragraph>

              <Note title="قائمة المراجعة النهائية">

                <ArticleList
                  items={[
                    "التحقق من ترخيص الجهة ونطاق خدماتها المسموح بها.",

                    "معرفة الكيان القانوني المسؤول عن الحساب.",

                    "قراءة اتفاقية العميل وإفصاحات المخاطر.",

                    "التأكد من قبول مستندات الهوية والإقامة.",

                    "معرفة تكاليف الحساب وشروط السحب.",

                    "فهم المخاطر المالية وعدم الاعتماد على وعود الأرباح.",
                  ]}
                />

              </Note>

            </ArticleSection>

            {/* SOURCES */}

            <ArticleSection
              id="sources"
              eyebrow="المراجع والتحقق"
              title="المصادر الرسمية والمراجع المستخدمة في إعداد الدليل"
            >

              <Paragraph>
                استند إعداد هذا الدليل إلى
                التحذيرات والسجلات المنشورة لدى
                الجهات الرقابية السعودية،
                بالإضافة إلى مثال منشور
                لمتطلبات التحقق من الهوية
                والعنوان لدى أحد الوسطاء.
              </Paragraph>

              <Paragraph>
                يميز الدليل بين المتطلبات
                العامة الشائعة وبين الشروط
                الخاصة بكل مؤسسة مالية.
                ولا يفترض أن مستنداً معيناً
                أو وسيلة دفع محددة مقبولة
                لدى جميع الشركات.
              </Paragraph>

              <div className="space-y-3">

                {sources.map((source, index) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] p-3 transition hover:border-blue-300 hover:bg-blue-50 sm:p-4"
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf3ff] text-[11px] font-black text-[#176ac8]">

                      {String(index + 1).padStart(2, "0")}

                    </span>

                    <span className="min-w-0 flex-1 break-words text-[12px] font-bold leading-6 text-[#102747] group-hover:text-[#176ac8] sm:text-[14px]">
                      {source.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[#176ac8]"
                    >
                      ↗
                    </span>

                  </a>
                ))}

              </div>

              <Note title="سياسة تحديث المعلومات">
                قد تتغير الأنظمة والتراخيص ومتطلبات
                التسجيل ووسائل الدفع بمرور الوقت.
                لذلك ينبغي الرجوع إلى السجلات
                الرسمية والشروط الحالية للمؤسسة
                المالية عند اتخاذ أي قرار.
              </Note>

            </ArticleSection>


            {/* RELATED PAGES — INTERNAL LINKS */}

<ImportantInternalLinks />

{/* DISCLAIMER */}

            <div className="mt-8 rounded-[16px] border border-amber-200 bg-[#fffbef] p-4 sm:p-6">

              <h2 className="text-[15px] font-black text-amber-900">
                إخلاء المسؤولية والتحذير من مخاطر التداول
              </h2>

              <p className="mt-2 text-[12px] leading-[2] text-slate-700 sm:text-[14px]">
                هذا المحتوى لأغراض المعلومات
                والتوعية فقط، ولا يمثل استشارة
                مالية أو قانونية أو توصية بفتح
                حساب لدى مؤسسة معينة. ينطوي
                تداول الفوركس والعقود مقابل
                الفروقات باستخدام الرافعة
                المالية على مخاطر مرتفعة
                قد تؤدي إلى خسارة رأس المال.
                يجب التحقق من التراخيص والموافقات
                النظامية قبل التعامل مع أي جهة
                تقدم خدمات التداول.
              </p>

              <p className="mt-3 text-[11px] leading-7 text-slate-600 sm:text-[12px]">
                قد يتلقى بروكر العرب مقابلاً
                تجارياً من بعض الشركاء عند استخدام
                روابط الإحالة الموجودة على الموقع.
                ولا يمثل وجود علاقة تجارية إثباتاً
                للترخيص أو ضماناً لملاءمة المنتج
                المالي للعميل.
              </p>

            </div>

            {/* ARTICLE FOOTER */}

            <footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="text-[13px] font-black text-[#102747]">
                  فريق بروكر العرب
                </div>

                <p className="mt-1 text-[11px] leading-6 text-slate-500">
                  تقييمات شركات التداول والمقارنات
                  والأدلة المالية المتخصصة.
                </p>

              </div>

              <Link
                href="/how-we-review-brokers"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-blue-200 bg-[#f1f7ff] px-5 py-2 text-[12px] font-black text-[#155da9] transition hover:bg-blue-100"
              >
                منهجية تقييم شركات التداول
                <span
                  className="mr-2"
                  aria-hidden="true"
                >
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