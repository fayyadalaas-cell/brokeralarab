import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* =========================================================
   BROKER ALARAB
   ARTICLE PAGE — OPEN FOREX ACCOUNT IN KUWAIT
   Next.js App Router / Server Component
   ========================================================= */

const SITE = "https://brokeralarab.com";

const SLUG = "open-forex-account-kuwait";
const PATH = `/articles/${SLUG}`;
const URL = `${SITE}${PATH}`;

const ARTICLE = {
  title:
    "كيفية فتح حساب فوركس في الكويت – الشروط وخطوات التسجيل",

  seoTitle:
    "فتح حساب فوركس في الكويت | الشروط والمستندات والتسجيل",

  titleMain:
    "كيفية فتح حساب فوركس في الكويت",

  titleHighlight:
    "الشروط وخطوات التسجيل",

  description:
    "دليل فتح حساب فوركس في الكويت للمواطنين والمقيمين، يشمل البطاقة المدنية وتوثيق الحساب وإثبات العنوان والتسجيل ووسائل الدفع بالدينار الكويتي والتحقق من التراخيص.",

  category: "مقالات وأدلة التداول",

  subcategory: "التداول في الكويت",

  articleType: "دليل فتح حساب",

  breadcrumb: "فتح حساب فوركس في الكويت",

  publisher: "بروكر العرب",

  published: "2026-11-25",
  modified: "2026-11-25",

  heroAlt:
    "فتح حساب فوركس في الكويت باستخدام البطاقة المدنية ومستندات التحقق من الهوية والإقامة",

  heroCaption:
    "صورة توضيحية لمتطلبات تسجيل وتوثيق حسابات تداول الفوركس للمواطنين والمقيمين في الكويت.",
};

const HERO_IMAGE =
  "/articles/open-forex-account-kuwait.webp";

const ARTICLE_READY = true;
const HERO_IMAGE_READY = true;
const ENGLISH_VERSION_READY = true;

const KUWAIT_BROKERS_URL =
  "/best-brokers/kuwait";

const ARTICLE_KEYWORDS = [
  "فتح حساب فوركس في الكويت",
  "كيفية فتح حساب تداول في الكويت",
  "شروط فتح حساب تداول في الكويت",
  "فتح حساب فوركس بالبطاقة المدنية",
  "فتح حساب تداول للمقيمين في الكويت",
  "فتح حساب تداول للوافدين في الكويت",
  "توثيق حساب التداول في الكويت",
  "إثبات العنوان لفتح حساب فوركس",
  "فتح حساب تداول بالدينار الكويتي",
  "حساب فوركس بالدينار الكويتي",
  "فتح حساب تداول إسلامي في الكويت",
  "تراخيص شركات التداول في الكويت",
  "الإيداع في حساب الفوركس من الكويت",
  "تطبيق هويتي وتوثيق حساب التداول",
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

    locale: "ar_KW",

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
  {
    id: "before-opening",
    label: "قبل فتح حساب في الكويت",
  },
  {
    id: "local-vs-international",
    label: "التداول المحلي والفوركس الدولي",
  },
  {
    id: "kuwait-regulation",
    label: "الوضع القانوني والتراخيص",
  },
  {
    id: "license-check",
    label: "التحقق من شركة التداول",
  },
  {
    id: "kuwaiti-citizens",
    label: "فتح حساب للمواطن الكويتي",
  },
  {
    id: "kuwait-residents",
    label: "فتح حساب للوافدين والمقيمين",
  },
  {
    id: "civil-id",
    label: "البطاقة المدنية وتطبيق هويتي",
  },
  {
    id: "address-verification",
    label: "إثبات العنوان في الكويت",
  },
  {
    id: "kuwait-top-five",
    label: "مقارنة شروط حسابات 5 شركات",
  },
  {
    id: "account-selection",
    label: "اختيار حساب التداول",
  },
  {
    id: "registration-steps",
    label: "خطوات التسجيل والتوثيق",
  },
  {
    id: "kwd-account",
    label: "الحساب بالدينار أو الدولار",
  },
  {
    id: "kuwait-payments",
    label: "الإيداع عبر البنوك وKNET",
  },
  {
    id: "islamic-account",
    label: "حساب التداول الإسلامي",
  },
  {
    id: "registration-problems",
    label: "مشكلات التسجيل والتوثيق",
  },
  {
    id: "faq",
    label: "الأسئلة الشائعة",
  },
  {
    id: "conclusion",
    label: "الخلاصة",
  },
  {
    id: "sources",
    label: "المصادر الكويتية الرسمية",
  },
];

const registrationSteps = [
  {
    title: "تحديد نوع الاستثمار",

    description:
      "حدد ما إذا كنت تريد الاستثمار في أوراق مالية مدرجة أو تداول العملات والعقود مقابل الفروقات، لأن طبيعة المنتج تحدد متطلبات الترخيص والحساب.",
  },
  {
    title: "فحص الجهة القانونية",

    description:
      "راجع الاسم القانوني للشركة ونطاق الأنشطة المرخصة لها، وتحقق من أهليتها لتقديم الخدمة داخل الكويت.",
  },
  {
    title: "مراجعة البطاقة المدنية",

    description:
      "تأكد من صلاحية البطاقة المدنية ومطابقة الاسم والعنوان لبياناتك الرسمية، خصوصاً إذا كنت قد غيرت عنوان السكن مؤخراً.",
  },
  {
    title: "تحديد الجنسية والإقامة",

    description:
      "أدخل جنسيتك الفعلية وحدد الكويت باعتبارها دولة الإقامة إذا كنت تقيم فيها، وراجع متطلبات التحقق الخاصة بجنسيتك.",
  },
  {
    title: "استكمال التوثيق",

    description:
      "استخدم المستندات المقبولة لدى الجهة المالية، وتحقق من إمكانية استخدام البطاقة المدنية أو جواز السفر أو الهوية الرقمية.",
  },
  {
    title: "مراجعة العملة ووسائل الدفع",

    description:
      "تحقق من عملة الحساب وتكاليف تحويل الدينار الكويتي وشروط الإيداع والسحب قبل إجراء أي معاملة مالية.",
  },
];

const requiredDocuments = [
  {
    title: "البطاقة المدنية الكويتية",

    detail:
      "بطاقة مدنية سارية المفعول للمواطن أو المقيم، إذا كانت ضمن مستندات الهوية المقبولة لدى المؤسسة المالية.",
  },
  {
    title: "جواز السفر",

    detail:
      "قد يُطلب جواز السفر لتأكيد الجنسية والاسم باللغة الإنجليزية، خصوصاً للوافدين المقيمين في الكويت.",
  },
  {
    title: "بيانات الإقامة",

    detail:
      "إثبات الوضع القانوني للإقامة عند الحاجة، وفق متطلبات المؤسسة المالية والجهة الرقابية المختصة.",
  },
  {
    title: "إثبات عنوان السكن",

    detail:
      "مستند حديث ومقبول يطابق بيانات السكن الفعلي في الكويت، وقد يشمل وثائق بنكية أو حكومية.",
  },
  {
    title: "وسيلة دفع شخصية",

    detail:
      "حساب بنكي أو وسيلة دفع باسم مقدم الطلب، وفق شروط المؤسسة المالية والقيود المصرفية المعمول بها.",
  },
  {
    title: "البيانات المهنية والمالية",

    detail:
      "معلومات عن الوظيفة والدخل ومصدر الأموال والخبرة الاستثمارية، إذا طلبتها إجراءات الامتثال.",
  },
];

const accountTypes = [
  {
    name: "الحساب القياسي",

    nameEn: "Standard Account",

    abbreviation: "STD",

    description:
      "حساب حقيقي يعتمد غالباً على السبريد في احتساب تكاليف التداول. قد تختلف شروطه بين الكيانات القانونية التابعة للوسيط نفسه.",

    consideration:
      "راجع التكلفة الإجمالية للحساب، بما فيها تحويل الدينار الكويتي إلى عملة الحساب والحد الأدنى للإيداع.",

    href:
      "/best-brokers/accounts/standard",

    linkLabel:
      "مقارنة شركات حسابات Standard",
  },
  {
    name: "حساب السنت",

    nameEn: "Cent Account",

    abbreviation: "CENT",

    description:
      "حساب تُعرض أرصدته عادة بوحدات السنت، وقد يوفر أحجام عقود مختلفة عن الحسابات القياسية حسب مواصفات الوسيط.",

    consideration:
      "تحقق من حجم العقد الفعلي وعملة الحساب وتوفر هذا النوع للعميل المقيم في الكويت.",

    href:
      "/best-brokers/accounts/cent",

    linkLabel:
      "مقارنة شركات حسابات Cent",
  },
  {
    name: "حساب السبريد الخام",

    nameEn: "Raw Spread Account",

    abbreviation: "RAW",

    description:
      "حساب يوفر عادة فروق أسعار منخفضة مع عمولات تداول منفصلة، وقد يكون له حد إيداع مختلف عن الحساب القياسي.",

    consideration:
      "احسب مجموع العمولة والسبريد ورسوم تحويل العملة بدلاً من الاعتماد على السبريد المعلن وحده.",

    href:
      "/best-brokers/accounts/raw-spread",

    linkLabel:
      "مقارنة شركات حسابات Raw Spread",
  },
  {
    name: "حساب ECN",

    nameEn: "ECN Account",

    abbreviation: "ECN",

    description:
      "مسمى يرتبط عادة بنموذج تنفيذ إلكتروني للأوامر، وقد تتداخل خصائصه مع حسابات السبريد الخام.",

    consideration:
      "راجع آلية التنفيذ والعمولات والكيان القانوني المسؤول عن الحساب، ولا تعتمد على المسمى التسويقي وحده.",

    href: null,

    linkLabel: null,
  },
];

const sources = [
  {
    title:
      "هيئة أسواق المال الكويتية – الشركات المرخص لها",

    url:
      "https://www.cma.gov.kw/ar/web/cma/licensed-companies",
  },
  {
    title:
      "هيئة أسواق المال الكويتية – الجهات المحلية والخليجية غير المرخصة",

    url:
      "https://cma.gov.kw/ar/web/cma/Unlicensed-Companies",
  },
  {
    title:
      "هيئة أسواق المال – تعميم بشأن التحقق من جنسية العملاء وإقامتهم القانونية",

    url:
      "https://cma.gov.kw/en/web/cma/cma-board-releases/resolutions-and-regulations/-/cmaboardreleases/detail/1106237",
  },
  {
    title:
      "بنك الكويت المركزي – الأسئلة الشائعة والتحقق من الجهات المالية",

    url:
      "https://www.cbk.gov.kw/ar/supervision/faq",
  },
  {
    title:
      "الهيئة العامة للمعلومات المدنية – تطبيق هويتي والبطاقة المدنية الرقمية",

    url:
      "https://hawyti.paci.gov.kw/",
  },
  {
    title:
      "الهيئة العامة للمعلومات المدنية – دليل المعاملات وتحديث بيانات البطاقة والعنوان",

    url:
      "https://services.paci.gov.kw/applications-guide",
  },
  {
    title:
      "الهيئة العامة للمعلومات المدنية – الجهات ومزودو الخدمات المرتبطون بتطبيق هويتي",

    url:
      "https://hawyti.paci.gov.kw/Arabic/ServiceProviders.aspx",
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
   KUWAIT BROKERS — DATABASE TYPES
   ========================================================= */

type KuwaitArticleBroker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  is_full_review: boolean | null;
  publication_status: string | null;
  min_deposit: number | null;
  platforms: string | null;
};

type KuwaitArticleRanking = {
  id: number;
  rank_position: number;
  country_rating: number | null;
  brokers:
    | KuwaitArticleBroker
    | KuwaitArticleBroker[]
    | null;
};

function normalizeKuwaitBroker(
  value:
    | KuwaitArticleBroker
    | KuwaitArticleBroker[]
    | null
): KuwaitArticleBroker | null {
  if (!value) return null;

  return Array.isArray(value)
    ? value[0] ?? null
    : value;
}

/* =========================================================
   GET KUWAIT BROKERS
   Dynamic country rankings from Supabase
   ========================================================= */

async function getKuwaitArticleBrokers(): Promise<
  KuwaitArticleRanking[]
> {
  const supabase = await createClient();

  const { data: country, error: countryError } =
    await supabase
      .from("country_pages")
      .select("id")
      .eq("slug", "kuwait")
      .eq("ar_enabled", true)
      .maybeSingle();

  if (countryError || !country) {
    console.error(
      "[Kuwait Article] Country:",
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
        publication_status,
        min_deposit,
        platforms
      )
    `)
    .eq("country_id", country.id)
    .order("rank_position", {
      ascending: true,
    });

  if (error) {
    console.error(
      "[Kuwait Article] Broker rankings:",
      error.message
    );

    return [];
  }

  const rankings =
    (data || []) as KuwaitArticleRanking[];

  const seenBrokerIds = new Set<number>();

  return rankings
    .filter((row) => {
      const broker =
        normalizeKuwaitBroker(row.brokers);

      if (
        !broker ||
        broker.is_full_review !== true ||
        broker.publication_status !== "published" ||
        !broker.slug ||
        seenBrokerIds.has(broker.id)
      ) {
        return false;
      }

      seenBrokerIds.add(broker.id);

      return true;
    })
    .slice(0, 5);
}

/* =========================================================
   KUWAIT BROKER — DISPLAY HELPERS
   ========================================================= */

function getKuwaitBrokerDisplay(
  row: KuwaitArticleRanking
) {
  const broker =
    normalizeKuwaitBroker(row.brokers);

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

  const ratingLabel =
    row.country_rating !== null
      ? "تقييم الكويت"
      : "التقييم العام";

  return {
    broker,
    ratingText,
    ratingLabel,
    deposit,
    platforms,
    reviewUrl,
  };
}

/* =========================================================
   KUWAIT ARTICLE BROKER CARD
   Same original article card design
   ========================================================= */

function KuwaitArticleBrokerCard({
  row,
}: {
  row: KuwaitArticleRanking;
}) {
  const display =
    getKuwaitBrokerDisplay(row);

  if (!display) {
    return null;
  }

  const {
    broker,
    ratingText,
    ratingLabel,
    deposit,
    platforms,
    reviewUrl,
  } = display;

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

              {ratingText}

            </span>

            <span className="text-[10px] font-bold text-slate-500">

              {ratingLabel}

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

          راجع شروط الحسابات والمستندات
          المقبولة والكيان القانوني المسؤول
          عن حساب التداول قبل التسجيل
          من الكويت.

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
   KUWAIT FEATURED BROKERS — TOP THREE
   ========================================================= */

function KuwaitBrokerComparison({
  rankings,
}: {
  rankings: KuwaitArticleRanking[];
}) {
  const brokers =
    rankings.slice(0, 3);

  return (
    <aside
      id="kuwait-broker-comparison"
      aria-label="شركات الفوركس وشروط فتح الحساب في الكويت"
      className="relative !my-7 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:!my-9 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(270deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">

              دليل المتداول الكويتي

            </span>

            <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">

              شركات الفوركس وشروط فتح الحساب في الكويت

            </h2>

            <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">

              تعرف على الشركات المتقدمة في
              تصنيف بروكر العرب للكويت،
              وراجع التقييمات والمنصات
              ومتطلبات فتح حساب التداول.

            </p>

          </div>

          <Link
            href={KUWAIT_BROKERS_URL}
            className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-[11px] border border-blue-200 bg-white px-4 py-2.5 text-[11px] font-black text-[#176ac8] shadow-sm transition hover:bg-blue-50"
          >

            عرض المقارنة الكاملة

            <span aria-hidden="true">←</span>

          </Link>

        </div>

      </div>

      {/* TOP THREE BROKER CARDS */}

      {brokers.length > 0 ? (

        <div className="grid grid-cols-1 auto-rows-fr gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-3">

          {brokers.map((row) => (
            <KuwaitArticleBrokerCard
              key={row.id}
              row={row}
            />
          ))}

        </div>

      ) : (

        <div className="p-5 text-center text-[13px] text-slate-600">

          <Link
            href={KUWAIT_BROKERS_URL}
            className="font-black text-[#176ac8] hover:underline"
          >

            الاطلاع على شركات التداول في الكويت

          </Link>

        </div>

      )}

      {/* DISCLOSURE */}

      <div className="border-t border-[#d7e5f4] bg-white/70 px-4 py-3 sm:px-6">

        <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px]">

          تستند الشركات المعروضة إلى ترتيب
          بروكر العرب الخاص بالكويت، ولا
          يعني إدراجها حصولها على ترخيص محلي.
          قد تختلف شروط الحساب والإيداع
          بحسب الكيان القانوني ودولة الإقامة.
          قد يتلقى بروكر العرب مقابلاً
          تجارياً من بعض الشركاء.

        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   KUWAIT TOP FIVE — COMPACT BROKER COMPARISON
   ========================================================= */

function KuwaitTopFiveBrokers({
  rankings,
}: {
  rankings: KuwaitArticleRanking[];
}) {
  const brokers =
    rankings.slice(0, 5);

  return (
    <section
      id="kuwait-top-five"
      aria-label="مقارنة شروط حسابات شركات الفوركس في الكويت"
      className="relative !my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:!my-12 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(270deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">

          مقارنة حسابات التداول

        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">

          مقارنة شروط حسابات أبرز شركات الفوركس في الكويت

        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">

          بعد التعرف على متطلبات التسجيل
          والبطاقة المدنية وإثبات العنوان،
          يمكنك مقارنة بيانات الحسابات
          لدى الشركات المتقدمة في تصنيف
          بروكر العرب للكويت.

        </p>

      </div>

      {/* BROKER LIST */}

      {brokers.length > 0 ? (

        <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-5">

          {brokers.map((row) => {
            const display =
              getKuwaitBrokerDisplay(row);

            if (!display) {
              return null;
            }

            const {
              broker,
              ratingText,
              ratingLabel,
              deposit,
              platforms,
              reviewUrl,
            } = display;

            return (
              <div
                key={row.id}
                className="group relative grid min-w-0 grid-cols-1 gap-3 overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8fbff] p-3 transition hover:border-blue-300 hover:bg-white hover:shadow-sm lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-4 sm:p-4"
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

                <div className="grid grid-cols-3 gap-2 lg:contents">

                  {/* RATING */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      {ratingLabel}

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

                  {/* DEPOSIT */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">

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

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">

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

                {/* REVIEW BUTTON */}

                <Link
                  href={reviewUrl}
                  className="inline-flex min-h-[42px] w-full shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-4 py-2.5 text-center text-[11px] font-black text-white transition hover:bg-[#10549f] lg:w-auto sm:text-[12px]"
                >

                  تقييم الشركة

                  <span aria-hidden="true">
                    ←
                  </span>

                </Link>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="p-5 text-center text-[13px] text-slate-600">

          يمكنك الاطلاع على تصنيف الشركات
          وشروط حساباتها عبر صفحة المقارنة
          الكاملة في الكويت.

        </div>

      )}

      {/* FULL COUNTRY COMPARISON */}

      <div className="border-t border-[#d7e5f4] bg-[#f5f9ff] p-3 sm:p-5">

        <Link
          href={KUWAIT_BROKERS_URL}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#bdd8f5] bg-white px-4 py-3 text-center text-[12px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#176ac8] hover:text-white sm:text-[14px]"
        >

          عرض المقارنة الكاملة لأفضل شركات التداول في الكويت

          <span aria-hidden="true">
            ←
          </span>

        </Link>

        <p className="mt-3 text-center text-[10px] leading-6 text-slate-500 sm:text-[11px]">

          الترتيب مستمد من تصنيف بروكر العرب
          للكويت. الحد الأدنى المعروض هو من
          بيانات الوسيط العامة وليس بالضرورة
          الحد المطبق على المقيمين في الكويت.
          لا يمثل التصنيف إثباتاً للترخيص المحلي.
          قد يتلقى الموقع مقابلاً تجارياً من بعض الشركاء.

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

    href: KUWAIT_BROKERS_URL,

    title: "أفضل شركات التداول في الكويت",

    description:
      "استعرض تصنيف شركات التداول المخصص للسوق الكويتي وقارن التقييمات والمنصات وشروط الحسابات وتكاليف التداول.",
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
  name: "Kuwait",
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

export default async function OpenForexAccountKuwaitPage() {
  const kuwaitBrokers =
    await getKuwaitArticleBrokers();

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
                🇰🇼
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

    {new Intl.DateTimeFormat("ar-KW", {
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
    إذا كنت تقيم في الكويت وترغب في فتح حساب
    لتداول العملات الأجنبية، فقد تكون لديك
    تساؤلات حول إمكانية التسجيل بالبطاقة
    المدنية، واستخدام تطبيق هويتي في التوثيق،
    وتمويل الحساب بالدينار الكويتي، والفرق
    بين شركات الاستثمار المحلية ومنصات
    الفوركس الدولية.
  </Paragraph>

  <Paragraph>
    تختلف الإجابات بحسب جنسيتك وإقامتك
    ونوع المنتج المالي والجهة التي ستفتح
    الحساب لديها. لذلك أعد فريق{" "}
    <Strong>بروكر العرب</Strong>{" "}
    هذا الدليل لمساعدة المتداول في الكويت
    على فهم متطلبات التسجيل والتحقق من
    الشركات وتجنب المشكلات المرتبطة
    بالمستندات والتحويلات المالية.
  </Paragraph>

</div>

{/* FEATURED KUWAIT BROKERS */}

<KuwaitBrokerComparison rankings={kuwaitBrokers} />

{/* TABLE OF CONTENTS */}

<TableOfContents />

{/* BEFORE OPENING */}

<ArticleSection
  id="before-opening"
  eyebrow="دليل المتداول في الكويت"
  title="ماذا تحتاج قبل فتح حساب فوركس في الكويت؟"
>

  <Paragraph>
    قبل تعبئة نموذج التسجيل لدى أي شركة
    تداول، ينبغي تحديد طبيعة الحساب الذي
    تريد فتحه. فالحساب المخصص للاستثمار
    في الأسهم المدرجة في بورصة الكويت
    يختلف عن الحساب المستخدم لتداول
    أزواج العملات والعقود مقابل الفروقات
    عبر منصات إلكترونية.
  </Paragraph>

  <Paragraph>
    ويحتاج المواطن الكويتي والمقيم الأجنبي
    إلى مراجعة أهلية التسجيل والمستندات
    المطلوبة، بالإضافة إلى التأكد من
    صلاحية الجهة المالية لتقديم الخدمة
    المطلوبة داخل الكويت.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "قبل التسجيل",
      "ما يجب معرفته",
    ]}
    rows={[
      [
        "نوع المنتج المالي",
        "هل ستتداول أوراقاً مالية فعلية أم عقوداً مقابل الفروقات؟",
      ],
      [
        "الجنسية والإقامة",
        "تحديد الجنسية ودولة الإقامة الفعلية بصورة صحيحة.",
      ],
      [
        "البطاقة المدنية",
        "مراجعة صلاحيتها ومطابقة البيانات المسجلة فيها.",
      ],
      [
        "الكيان القانوني",
        "معرفة الشركة التي ستوقع معها اتفاقية فتح الحساب.",
      ],
      [
        "عملة الحساب",
        "التحقق من إمكانية استخدام الدينار الكويتي أو العملات الأجنبية.",
      ],
      [
        "الترخيص",
        "التحقق من نطاق الترخيص والموافقات اللازمة لتقديم النشاط.",
      ],
    ]}
    caption="قائمة أولية للمتطلبات التي ينبغي مراجعتها قبل تقديم طلب فتح حساب تداول من الكويت."
  />

  <Note
    title="وجود الكويت ضمن قائمة دول التسجيل لا يعني الترخيص المحلي"
    tone="amber"
  >
    قبول عنوان أو رقم هاتف كويتي في نموذج
    التسجيل لا يثبت أن الشركة مخولة بتقديم
    خدمات مالية داخل الكويت. يجب التحقق
    من الجهة القانونية ونطاق الأنشطة
    المرخصة لها بصورة مستقلة.
  </Note>

</ArticleSection>

{/* LOCAL VS INTERNATIONAL */}

<ArticleSection
  id="local-vs-international"
  eyebrow="أنواع الخدمات المالية"
  title="الفرق بين فتح حساب تداول محلي في الكويت وحساب الفوركس الدولي"
>

  <Paragraph>
    يستخدم مصطلح حساب التداول في الكويت
    للإشارة إلى خدمات مالية مختلفة.
    فقد يبحث شخص عن حساب لشراء أسهم
    الشركات الكويتية، بينما يقصد آخر
    تداول اليورو مقابل الدولار أو
    الذهب باستخدام العقود مقابل الفروقات.
  </Paragraph>

  <Paragraph>
    لا ينبغي التعامل مع هذه المنتجات
    على أنها خدمة مالية واحدة، لأن
    طبيعة العقد والملكية وآلية التنفيذ
    والمخاطر والمتطلبات التنظيمية
    قد تختلف بصورة جوهرية.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "نوع الحساب أو الخدمة",
      "طبيعة الاستخدام",
    ]}
    rows={[
      [
        "حساب تداول الأسهم المحلية",
        "شراء وبيع الأوراق المالية المدرجة في السوق المحلي وفق الأنظمة المعمول بها.",
      ],
      [
        "حساب الاستثمار الدولي",
        "الوصول إلى أسهم أو أدوات مالية أجنبية وفق صلاحيات الجهة المقدمة للخدمة.",
      ],
      [
        "حساب الفوركس والعقود مقابل الفروقات",
        "التعرض لتحركات أسعار العملات والأصول، وقد يتم باستخدام عقود مشتقة ورافعة مالية.",
      ],
      [
        "حساب لدى شركة صرافة",
        "تحويل العملات أو تقديم خدمات الصرافة ضمن نطاق الترخيص، وليس بالضرورة تقديم تداول الفوركس بالهامش.",
      ],
    ]}
  />

  <SubHeading>
    هل امتلاك ترخيص صرافة يعني السماح بتقديم تداول الفوركس؟
  </SubHeading>

  <Paragraph>
    لا يكفي وجود ترخيص لمزاولة نشاط
    مالي معين للاستنتاج بأن جميع الخدمات
    الاستثمارية الأخرى مشمولة بذلك الترخيص.
    فقد تكون الجهة مخولة بممارسة الصرافة
    أو تحويل الأموال دون أن تكون مخولة
    بتقديم منتجات استثمارية مشتقة.
  </Paragraph>

  <Paragraph>
    لهذا السبب يجب التحقق من النشاط
    المرخص به فعلياً، وليس الاكتفاء
    بالاسم التجاري للشركة أو وجود
    كلمة مالية أو استثمارية ضمن اسمها.
  </Paragraph>

</ArticleSection>

{/* KUWAIT REGULATION */}

<ArticleSection
  id="kuwait-regulation"
  eyebrow="التنظيم المالي في الكويت"
  title="هل يمكن فتح حساب فوركس من الكويت بصورة قانونية؟"
>

  <Paragraph>
    يتطلب تحديد الوضع القانوني لأي
    خدمة تداول معرفة طبيعة المنتج
    المالي والنشاط الذي تمارسه الشركة
    والجهة الرقابية المسؤولة عن ذلك
    النشاط.
  </Paragraph>

  <Paragraph>
    وتعد هيئة أسواق المال الكويتية
    مرجعاً أساسياً للتحقق من الجهات
    المرخص لها بمزاولة أنشطة الأوراق
    المالية، بينما يتولى بنك الكويت
    المركزي الرقابة على المؤسسات
    والأنشطة الواقعة ضمن اختصاصه.
  </Paragraph>

  <SubHeading>
    هيئة أسواق المال الكويتية CMA
  </SubHeading>

  <Paragraph>
    توفر الهيئة معلومات عن الشركات
    المرخص لها والأنشطة المالية التي
    يسمح لها بممارستها. كما توفر
    بيانات تتعلق بالجهات غير المرخصة
    والمواقع التي تقدم أنشطة خاضعة
    للتنظيم دون الحصول على الترخيص اللازم.
  </Paragraph>

  <Paragraph>
    يمكن الرجوع مباشرة إلى{" "}

    <a
      href={sources[0].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      سجل الشركات المرخصة لدى هيئة أسواق المال الكويتية
    </a>

    {" "}لمراجعة المعلومات الرسمية.
  </Paragraph>

  <SubHeading>
    بنك الكويت المركزي CBK
  </SubHeading>

  <Paragraph>
    يشرف بنك الكويت المركزي على
    المؤسسات المالية الداخلة ضمن
    نطاق اختصاصه الرقابي، ويوفر
    معلومات للمستهلكين حول التحقق
    من الجهات المالية والإبلاغ
    عن الأنشطة المشبوهة.
  </Paragraph>

  <Paragraph>
    ولا ينبغي اعتبار وجود علاقة مصرفية
    أو إمكانية إجراء تحويل مالي إلى
    شركة تداول دليلاً كافياً على
    حصولها على الموافقات التنظيمية
    اللازمة لتقديم المنتجات الاستثمارية.
  </Paragraph>

  <Note title="التراخيص الدولية وشروط التعامل من الكويت">

    قد تكون شركة التداول حاصلة على
    ترخيص بريطاني أو أسترالي أو ترخيص
    صادر من جهة رقابية أخرى.

    <br />
    <br />

    لكن الترخيص الأجنبي لا يمنح الشركة
    تلقائياً صلاحية تقديم جميع خدماتها
    داخل الكويت. يجب التحقق من الجهة
    القانونية المسؤولة عن الحساب والنشاط
    المالي المسموح لها بممارسته.

  </Note>

</ArticleSection>

{/* LICENSE CHECK */}

<ArticleSection
  id="license-check"
  eyebrow="التحقق من شركات التداول"
  title="كيف تتأكد من ترخيص شركة الفوركس قبل التسجيل من الكويت؟"
>

  <Paragraph>
    قد يظهر اسم الوسيط في إعلان على
    وسائل التواصل الاجتماعي أو من
    خلال ممثل يدعي تقديم خدمات تداول
    للعملاء داخل الكويت.
  </Paragraph>

  <Paragraph>
    قبل مشاركة البطاقة المدنية أو
    تحويل الأموال، ابدأ بمراجعة
    الاسم القانوني للشركة، وليس
    العلامة التجارية وحدها.
  </Paragraph>

  <ArticleList
    items={[
      "استخرج الاسم القانوني الكامل للشركة من اتفاقية العميل.",
      "حدد الجهة الرقابية ورقم الترخيص المعلن.",
      "ابحث عن الشركة في السجلات الرسمية للجهة المختصة.",
      "راجع الأنشطة والمنتجات المشمولة بالترخيص.",
      "طابق عنوان الموقع الإلكتروني وبيانات الاتصال.",
      "راجع قائمة الجهات غير المرخصة المنشورة لدى هيئة أسواق المال.",
    ]}
  />

  <Paragraph>
    وتوفر هيئة أسواق المال الكويتية{" "}

    <a
      href={sources[1].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      قائمة الجهات والمواقع غير المرخصة
    </a>

    {" "}التي يمكن الاستعانة بها عند
    التحقق من شركة تعرض خدمات مالية
    أو استثمارية داخل الكويت.
  </Paragraph>

  <Note
    title="عدم وجود اسم الشركة في قائمة التحذيرات لا يعني أنها مرخصة"
    tone="amber"
  >
    تستخدم قوائم التحذيرات كوسيلة إضافية
    للتحقق، ولا تمثل سجلاً شاملاً لجميع
    الشركات غير المرخصة. يبقى التحقق
    الإيجابي من الترخيص والنشاط المسموح
    به خطوة أساسية قبل التعامل المالي.
  </Note>

</ArticleSection>

{/* KUWAITI CITIZENS */}

<ArticleSection
  id="kuwaiti-citizens"
  eyebrow="فتح الحساب للمواطن الكويتي"
  title="شروط فتح حساب تداول للمواطنين الكويتيين"
>

  <Paragraph>
    يمتلك المواطن الكويتي عادة بطاقة
    مدنية وجواز سفر وبيانات مصرفية
    محلية يمكن استخدامها ضمن إجراءات
    التحقق، بحسب المستندات التي
    تقبلها المؤسسة المالية.
  </Paragraph>

  <Paragraph>
    وقد تختلف المعلومات المطلوبة
    بين المؤسسات المحلية والشركات
    الدولية، خصوصاً فيما يتعلق
    بطريقة كتابة الاسم باللغة
    الإنجليزية وإثبات عنوان السكن
    والمعلومات المهنية ومصدر الأموال.
  </Paragraph>

  <RequiredDocuments />

  <SubHeading>
    هل يمكن الاكتفاء بالبطاقة المدنية الكويتية؟
  </SubHeading>

  <Paragraph>
    قد تقبل الجهة المالية البطاقة
    المدنية كإثبات للهوية، لكن
    ذلك لا يعني بالضرورة أن البطاقة
    تكفي لاستكمال جميع متطلبات
    التحقق من الحساب.
  </Paragraph>

  <Paragraph>
    فقد يطلب الوسيط جواز السفر أو
    مستنداً منفصلاً لإثبات العنوان،
    أو معلومات إضافية عن العمل
    والدخل والغرض من فتح الحساب.
  </Paragraph>

  <Note title="مطابقة الاسم مع الحساب البنكي">

    قبل التسجيل باللغة الإنجليزية،
    راجع طريقة كتابة اسمك في جواز
    السفر والبطاقة المدنية وبيانات
    الحساب البنكي.

    عند وجود اختلاف بين المستندات،
    استفسر عن طريقة التصحيح المعتمدة
    قبل إجراء أي عملية إيداع أو سحب.

  </Note>

</ArticleSection>

{/* KUWAIT RESIDENTS */}

<ArticleSection
  id="kuwait-residents"
  eyebrow="التداول للوافدين"
  title="كيفية فتح حساب فوركس للمقيمين والأجانب في الكويت"
>

  <Paragraph>
    تضم الكويت مقيمين من جنسيات
    مختلفة، ولذلك لا تتعلق أهلية
    فتح الحساب بالعنوان الكويتي
    وحده، بل قد تتأثر أيضاً بجنسية
    المتقدم ووضع إقامته والمتطلبات
    التنظيمية للمؤسسة المالية.
  </Paragraph>

  <Paragraph>
    وقد أكدت هيئة أسواق المال في
    تعميم موجه للأشخاص المرخص لهم
    أهمية الحصول على بيانات صحيحة
    وكاملة عن جنسية العميل وإقامته
    القانونية في الكويت بالنسبة
    إلى المقيمين.
  </Paragraph>

  <Paragraph>
    يمكن الاطلاع على{" "}

    <a
      href={sources[2].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      التعميم الرسمي المتعلق ببيانات الجنسية والإقامة
    </a>

    {" "}لفهم أهمية هذه المتطلبات
    لدى المؤسسات الخاضعة لإشراف الهيئة.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "البيانات المطلوبة",
      "ما ينبغي للمقيم تقديمه",
    ]}
    rows={[
      [
        "الجنسية",
        "الجنسية الفعلية المسجلة في جواز السفر.",
      ],
      [
        "دولة الإقامة",
        "الكويت إذا كانت محل الإقامة الفعلي للمتقدم.",
      ],
      [
        "البطاقة المدنية",
        "بطاقة سارية المفعول إذا كانت مقبولة في نظام التحقق.",
      ],
      [
        "جواز السفر",
        "جواز سفر ساري عند طلب إثبات الجنسية والهوية.",
      ],
      [
        "الإقامة القانونية",
        "المستندات التي تقبلها المؤسسة لإثبات الوضع القانوني للإقامة.",
      ],
      [
        "المعلومات الضريبية",
        "بيانات الإقامة الضريبية الفعلية وفق ظروف المتقدم.",
      ],
    ]}
  />

  <SubHeading>
    ماذا يحدث إذا انتهت الإقامة أو تغيرت دولة السكن؟
  </SubHeading>

  <Paragraph>
    قد تؤثر التغييرات المتعلقة بالإقامة
    على شروط استمرار الحساب أو
    المستندات المطلوبة للتحقق الدوري.
    وقد تفرض بعض المؤسسات قيوداً
    إضافية عند تغير دولة إقامة العميل.
  </Paragraph>

  <Paragraph>
    إذا انتقلت من الكويت إلى دولة
    أخرى، أو تغير وضع إقامتك،
    تواصل مع المؤسسة المالية لتحديث
    البيانات والتحقق من استمرار
    أهليتك لاستخدام الحساب.
  </Paragraph>

  <Note
    title="لا تستخدم دولة إقامة غير مطابقة لواقعك"
    tone="amber"
  >
    اختلاف الجنسية عن دولة الإقامة
    أمر طبيعي بالنسبة للوافدين.
    لكن تقديم عنوان غير صحيح أو
    اختيار دولة أخرى لتجاوز القيود
    قد يؤدي إلى رفض التوثيق أو
    تقييد الحساب.
  </Note>

</ArticleSection>

{/* CIVIL ID */}

<ArticleSection
  id="civil-id"
  eyebrow="الهوية المدنية والرقمية"
  title="فتح حساب فوركس بالبطاقة المدنية الكويتية وتطبيق هويتي"
>

  <Paragraph>
    تمثل البطاقة المدنية إحدى الوثائق
    الأساسية لإثبات هوية المواطنين
    والمقيمين في الكويت. كما توفر
    الهيئة العامة للمعلومات المدنية
    تطبيق هويتي الذي يقدم نسخة
    رقمية من الهوية المدنية وخدمات
    المصادقة الإلكترونية والتوقيع الرقمي.
  </Paragraph>

  <Paragraph>
    ويمكن معرفة خصائص الخدمة من
    خلال الموقع الرسمي لتطبيق{" "}

    <a
      href={sources[4].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      هويتي Kuwait Mobile ID
    </a>

    .
  </Paragraph>

  <ArticleDataTable
    headers={[
      "طريقة إثبات الهوية",
      "ما يجب معرفته",
    ]}
    rows={[
      [
        "البطاقة المدنية الفعلية",
        "قد تستخدم في التحقق إذا كانت ضمن الوثائق التي تقبلها المؤسسة.",
      ],
      [
        "الهوية الرقمية في هويتي",
        "تعتمد إمكانية استخدامها على آلية التحقق المتاحة لدى الجهة المالية.",
      ],
      [
        "جواز السفر",
        "قد يطلب بديلاً عن البطاقة المدنية أو مستنداً إضافياً.",
      ],
      [
        "التحقق بالوجه",
        "قد تطلب بعض المؤسسات التقاط صورة شخصية للتحقق من صاحب الهوية.",
      ],
    ]}
  />

  <SubHeading>
    هل تقبل شركات الفوركس التوثيق باستخدام تطبيق هويتي؟
  </SubHeading>

  <Paragraph>
    لا يعني توفر هوية مدنية رقمية
    معتمدة في الكويت أن جميع شركات
    التداول الدولية تمتلك تكاملاً
    تقنياً مع التطبيق.
  </Paragraph>

  <Paragraph>
    يمكن مراجعة{" "}

    <a
      href={sources[6].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      قائمة مزودي الخدمات المرتبطين بتطبيق هويتي
    </a>

    {" "}ثم الاستفسار مباشرة من
    المؤسسة المالية عن طرق التوثيق
    التي تدعمها.
  </Paragraph>

  <Note title="الفرق بين الهوية الرقمية والتوثيق لدى الوسيط">

    اعتماد الهوية الرقمية محلياً لا
    يعني بالضرورة قبول صورة ملتقطة
    من التطبيق داخل نظام تحقق دولي.
    يجب الالتزام بنوع المستند وطريقة
    تقديمه التي تحددها المؤسسة.

  </Note>

</ArticleSection>

{/* ADDRESS VERIFICATION */}

<ArticleSection
  id="address-verification"
  eyebrow="عنوان الإقامة في الكويت"
  title="ما المستندات المقبولة لإثبات العنوان عند فتح حساب تداول في الكويت؟"
>

  <Paragraph>
    تختلف طريقة كتابة العناوين في
    الكويت عن بعض الدول الأخرى.
    فقد تتضمن بيانات السكن اسم
    المحافظة والمنطقة ورقم القطعة
    والشارع والمبنى والوحدة السكنية.
  </Paragraph>

  <Paragraph>
    وعند التسجيل في منصة دولية،
    قد يحتاج المتقدم إلى كتابة هذه
    البيانات باللغة الإنجليزية
    بصورة تتوافق مع المستند الذي
    سيستخدمه لإثبات العنوان.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "بيانات العنوان",
      "المقابل في نموذج التسجيل",
    ]}
    rows={[
      [
        "المحافظة",
        "Governorate أو State/Province بحسب النموذج.",
      ],
      [
        "المنطقة",
        "Area أو City بحسب الحقول المتوفرة.",
      ],
      [
        "رقم القطعة",
        "Block.",
      ],
      [
        "الشارع",
        "Street.",
      ],
      [
        "رقم المبنى",
        "Building أو House Number.",
      ],
      [
        "رقم الشقة",
        "Apartment أو Unit Number عند الحاجة.",
      ],
    ]}
    caption="تختلف تسمية الحقول بين منصات التسجيل، ويجب مطابقة البيانات مع العنوان الحقيقي دون اختلاق معلومات غير موجودة."
  />

  <SubHeading>
    المستندات التي يمكن الاستفسار عن قبولها
  </SubHeading>

  <ArticleList
    items={[
      "كشف حساب بنكي حديث يظهر الاسم والعنوان المطلوبين.",
      "وثيقة حكومية تتضمن عنوان الإقامة الفعلي.",
      "البطاقة المدنية إذا كانت مقبولة لإثبات العنوان.",
      "عقد الإيجار إذا كان ضمن المستندات المعتمدة.",
      "فاتورة خدمات باسم مقدم الطلب، وفق شروط المؤسسة.",
    ]}
  />

  <Paragraph>
    إذا تغير عنوانك مؤخراً، يمكنك
    مراجعة الخدمات والإجراءات الرسمية
    لدى{" "}

    <a
      href={sources[5].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      الهيئة العامة للمعلومات المدنية
    </a>

    {" "}بشأن تحديث بيانات السكن
    والبطاقة المدنية.
  </Paragraph>

  <Note title="ماذا لو كانت فاتورة الكهرباء باسم مالك العقار؟">

    قد يواجه بعض المستأجرين والوافدين
    مشكلة عدم توفر فاتورة خدمات
    بأسمائهم. في هذه الحالة، ينبغي
    سؤال الجهة المالية عن البدائل
    المقبولة، مثل كشف الحساب البنكي
    أو وثيقة حكومية أو عقد إيجار
    مستوفٍ للشروط.

  </Note>

</ArticleSection>

{/* KUWAIT TOP FIVE BROKERS */}

<KuwaitTopFiveBrokers rankings={kuwaitBrokers} />

{/* ACCOUNT SELECTION */}

<ArticleSection
  id="account-selection"
  eyebrow="مقارنة الحسابات"
  title="كيف تختار نوع حساب الفوركس المناسب لك في الكويت؟"
>

  <Paragraph>
    لا يرتبط اختيار الحساب بالمبلغ
    المطلوب للإيداع فقط. فقد تؤثر
    عملة الحساب والعمولات وفروق
    الأسعار والرافعة المالية وتكاليف
    تحويل العملات على التكلفة الإجمالية.
  </Paragraph>

  <Paragraph>
    ومن المهم للمتداول الذي يحتفظ
    بأمواله بالدينار الكويتي أن
    يتحقق من العملة التي ستستخدم
    في حساب التداول، بالإضافة إلى
    رسوم تحويل الأموال من الدينار
    وإليه.
  </Paragraph>

  <AccountTypesGrid />

  <Paragraph>
    للمقارنة بين مواصفات الحسابات
    وتكاليفها يمكنك استخدام صفحة{" "}

    <Link
      href="/compare-accounts"
      className="font-bold text-[#176ac8] hover:underline"
    >
      مقارنة حسابات التداول
    </Link>

    {" "}على بروكر العرب.
  </Paragraph>

  <Note title="هل يكفي اختيار الشركة صاحبة أقل إيداع؟">

    لا يمثل الحد الأدنى للإيداع
    مؤشراً كافياً على جودة الحساب
    أو ملاءمته. راجع نوع العقد
    وحجم الصفقة والتكاليف والرافعة
    المالية وشروط السحب قبل اتخاذ
    القرار.

  </Note>

</ArticleSection>

{/* REGISTRATION STEPS */}

<ArticleSection
  id="registration-steps"
  eyebrow="دليل التسجيل العملي"
  title="خطوات فتح حساب تداول فوركس من الكويت"
>

  <Paragraph>
    بعد تحديد نوع الخدمة المالية
    والتحقق من ترخيص الجهة المقدمة
    لها، يمكن مراجعة إجراءات التسجيل
    والمستندات اللازمة قبل البدء
    بفتح الحساب.
  </Paragraph>

  <RegistrationSteps />

  <SubHeading>
    تجهيز المعلومات قبل تعبئة نموذج التسجيل
  </SubHeading>

  <Paragraph>
    احتفظ ببياناتك الرسمية أمامك
    عند تعبئة النموذج، بما في ذلك
    الاسم باللغة الإنجليزية وتاريخ
    الميلاد والجنسية ومعلومات الإقامة
    وعنوان السكن داخل الكويت.
  </Paragraph>

  <Paragraph>
    عند طلب رقم الهاتف، استخدم
    رقمك الفعلي مع مفتاح دولة الكويت
    الدولي +965 إذا كان رقم الهاتف كويتياً.
  </Paragraph>

  <SubHeading>
    مراجعة حالة التحقق قبل تمويل الحساب
  </SubHeading>

  <Paragraph>
    قد تسمح بعض المؤسسات بإنشاء
    ملف للعميل قبل استكمال التحقق.
    لكن إنشاء الملف أو ظهور رقم
    الحساب لا يعني بالضرورة أن
    جميع الخدمات المالية أصبحت متاحة.
  </Paragraph>

  <Paragraph>
    تأكد من حالة التوثيق والقيود
    المتعلقة بالحساب وأهلية استخدام
    وسائل الدفع والسحب قبل إجراء
    أي معاملة مالية.
  </Paragraph>

</ArticleSection>

{/* KWD ACCOUNT */}

<ArticleSection
  id="kwd-account"
  eyebrow="عملة حساب التداول"
  title="هل يمكن فتح حساب فوركس بالدينار الكويتي بدلاً من الدولار؟"
>

  <Paragraph>
    يجب التمييز بين عملة الحساب
    البنكي الذي تستخدمه داخل الكويت
    وعملة الرصيد المسجل في منصة
    التداول.
  </Paragraph>

  <Paragraph>
    فقد يتمكن العميل من الدفع باستخدام
    حساب بنكي بالدينار الكويتي،
    بينما تكون عملة حساب التداول
    الأساسية الدولار الأمريكي أو
    اليورو أو عملة أخرى.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "المصطلح",
      "المقصود به",
    ]}
    rows={[
      [
        "عملة الإيداع",
        "العملة المستخدمة عند إرسال الأموال من البنك أو وسيلة الدفع.",
      ],
      [
        "العملة الأساسية للحساب",
        "العملة التي يسجل بها رصيد حساب التداول.",
      ],
      [
        "عملة الأداة المالية",
        "العملة المستخدمة في تسعير الأداة أو احتساب نتائجها وفق مواصفات العقد.",
      ],
      [
        "تحويل العملات",
        "عملية تحويل الأموال بين الدينار الكويتي وعملة أخرى، وقد تتضمن تكاليف إضافية.",
      ],
    ]}
  />

  <SubHeading>
    مثال توضيحي لتكلفة تحويل الدينار الكويتي
  </SubHeading>

  <Paragraph>
    لنفترض أن شخصاً يريد تحويل
    100 دينار كويتي إلى حساب
    تداول بالدولار الأمريكي.
    إذا كان سعر التحويل الافتراضي
    المستخدم في المثال 3.25 دولار
    لكل دينار، فإن قيمة التحويل
    قبل الرسوم ستكون 325 دولاراً.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "تفاصيل المثال",
      "القيمة الافتراضية",
    ]}
    rows={[
      [
        "المبلغ بالدينار",
        "100 KWD",
      ],
      [
        "سعر التحويل الافتراضي",
        "3.25 USD لكل دينار",
      ],
      [
        "المبلغ قبل الرسوم",
        "325 USD",
      ],
      [
        "رسوم تحويل افتراضية",
        "5 USD",
      ],
      [
        "صافي المبلغ بعد الرسوم",
        "320 USD",
      ],
    ]}
    caption="مثال حسابي للتوضيح فقط، ولا يمثل سعر صرف حقيقياً أو رسوم أي بنك أو شركة تداول."
  />

  <Paragraph>
    وعند السحب إلى حساب بنكي
    بالدينار الكويتي، قد تتم
    عملية تحويل أخرى وفق سعر
    الصرف والرسوم المطبقة وقت
    تنفيذ العملية.
  </Paragraph>

  <Note title="قارن المبلغ النهائي وليس سعر الصرف وحده">

    اطلب معرفة المبلغ الذي سيصل
    فعلياً إلى الحساب بعد احتساب
    رسوم البنك ووسيلة الدفع
    وتحويل العملات، إن وجدت.

  </Note>

</ArticleSection>

{/* KUWAIT PAYMENTS */}

<ArticleSection
  id="kuwait-payments"
  eyebrow="وسائل الدفع المحلية"
  title="هل يمكن إيداع الأموال في حساب الفوركس باستخدام KNET والبنوك الكويتية؟"
>

  <Paragraph>
    يهتم المتداول في الكويت بمعرفة
    إمكانية استخدام وسائل الدفع
    المحلية، مثل بطاقات البنوك
    الكويتية وخدمات KNET والتحويلات
    المصرفية، عند تمويل الحساب
    أو استرداد الأموال.
  </Paragraph>

  <Paragraph>
    لكن توفر وسيلة دفع محلية
    لدى متجر أو مؤسسة داخل
    الكويت لا يعني أنها متاحة
    بالضرورة لدى شركة تداول دولية.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "وسيلة الدفع",
      "ما يجب التحقق منه",
    ]}
    rows={[
      [
        "KNET",
        "التوفر الفعلي لدى الجهة المالية وأهلية استخدامها للعملية المطلوبة.",
      ],
      [
        "بطاقة الخصم المباشر",
        "قبول البطاقة والعملية من البنك المصدر ومقدم الخدمة.",
      ],
      [
        "Visa أو Mastercard",
        "القيود المصرفية وشروط رد الأموال والتحويل بين العملات.",
      ],
      [
        "التحويل البنكي الدولي",
        "اسم المستفيد القانوني والرسوم والموافقات المصرفية اللازمة.",
      ],
    ]}
  />

  <SubHeading>
    هل تظهر وسائل الدفع نفسها لجميع العملاء؟
  </SubHeading>

  <Paragraph>
    قد تختلف وسائل الدفع المتاحة
    بحسب دولة الإقامة والكيان
    القانوني المسؤول عن الحساب
    ومقدم خدمة الدفع ونوع العملية.
  </Paragraph>

  <Paragraph>
    لذلك يجب مراجعة الوسائل المتاحة
    فعلياً داخل الحساب أو الاستفسار
    عنها من المؤسسة المالية، بدلاً
    من الاعتماد على قائمة عامة
    بوسائل الدفع المنشورة لأسواق أخرى.
  </Paragraph>

  <Note
    title="ماذا تفعل إذا رفض البنك عملية الإيداع؟"
    tone="amber"
  >
    تواصل مع البنك لمعرفة سبب
    الرفض والتحقق من مشروعية
    العملية والجهة المستفيدة.
    لا تستخدم حسابات أشخاص آخرين
    أو ترتيبات دفع غير رسمية
    لتجاوز القيود المصرفية.
  </Note>

</ArticleSection>

{/* ISLAMIC ACCOUNT */}

<ArticleSection
  id="islamic-account"
  eyebrow="الحسابات الخالية من السواب"
  title="هل تتوفر حسابات تداول إسلامية للمقيمين في الكويت؟"
>

  <Paragraph>
    توفر بعض المؤسسات حسابات
    أو ترتيبات تداول تسوق تحت
    مسمى الحساب الإسلامي أو
    Swap-Free، وهي ترتبط عادة
    بشروط رسوم التبييت والاحتفاظ
    بالمراكز المفتوحة.
  </Paragraph>

  <Paragraph>
    لكن لا ينبغي افتراض أن الإقامة
    في الكويت تمنح العميل تلقائياً
    حالة الحساب الخالي من السواب.
    فقد تختلف شروط الأهلية وفق
    سياسات المؤسسة المالية ونوع
    الحساب والمنتج المتداول.
  </Paragraph>

  <ArticleList
    items={[
      "هل يتم تفعيل الإعفاء تلقائياً أم يتطلب تقديم طلب؟",
      "هل يشمل الإعفاء جميع الأدوات أم أدوات محددة؟",
      "هل توجد رسوم إدارية بديلة بعد مدة معينة؟",
      "هل يمكن تعديل أو إلغاء حالة الحساب الخالي من السواب؟",
      "ما طبيعة العقد المالي وآلية التنفيذ والملكية والتسوية؟",
    ]}
  />

  <Note title="هل الحساب الخالي من السواب حلال بالضرورة؟">

    إزالة رسوم التبييت وحدها
    لا تكفي لإثبات التوافق مع
    أحكام الشريعة. يتطلب التقييم
    الشرعي دراسة طبيعة العقد
    والملكية والقبض والرافعة
    المالية والشروط الأخرى
    لدى مختص مؤهل.

  </Note>

</ArticleSection>

{/* REGISTRATION PROBLEMS */}

<ArticleSection
  id="registration-problems"
  eyebrow="مشكلات التسجيل الشائعة"
  title="أسباب رفض فتح حساب تداول أو توثيقه من الكويت"
>

  <Paragraph>
    قد ترتبط مشكلات التسجيل
    ببيانات الهوية والإقامة أو
    بطريقة كتابة العنوان أو
    بعدم استيفاء شروط أهلية
    العميل لدى المؤسسة المالية.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "المشكلة المحتملة",
      "الإجراء المناسب",
    ]}
    rows={[
      [
        "انتهاء البطاقة المدنية",
        "تقديم مستند ساري المفعول وفق قائمة الوثائق المقبولة.",
      ],
      [
        "اختلاف الاسم الإنجليزي",
        "مراجعة الاسم في جواز السفر والتواصل مع الدعم لتصحيح البيانات.",
      ],
      [
        "عدم قبول صورة من هويتي",
        "الاستفسار عن إمكانية استخدام البطاقة الفعلية أو جواز السفر.",
      ],
      [
        "تغيير عنوان السكن",
        "تحديث بيانات الإقامة وتقديم مستند حديث يطابق العنوان.",
      ],
      [
        "فاتورة خدمات باسم المالك",
        "طلب قائمة البدائل المقبولة لإثبات عنوان المستأجر.",
      ],
      [
        "اختلاف الجنسية والإقامة",
        "توضيح الجنسية الفعلية والوضع القانوني للإقامة دون تغيير البيانات الحقيقية.",
      ],
      [
        "عدم قبول وسيلة الدفع",
        "مراجعة شروط البنك والمؤسسة المالية والقيود المطبقة.",
      ],
      [
        "عدم أهلية التسجيل",
        "طلب توضيح السبب وعدم محاولة تجاوز القيود التنظيمية أو الجغرافية.",
      ],
    ]}
  />

  <SubHeading>
    كيف تحمي بيانات البطاقة المدنية أثناء التسجيل؟
  </SubHeading>

  <Paragraph>
    تتضمن مستندات الهوية الكويتية
    معلومات شخصية يجب حمايتها.
    لذلك لا ترسلها إلى أشخاص
    يدعون تمثيل شركة مالية
    من خلال قنوات اتصال غير رسمية.
  </Paragraph>

  <ArticleList
    items={[
      "استخدم الموقع الرسمي للجهة المالية بعد التحقق من هويتها وترخيصها.",
      "لا تشارك رمز المصادقة أو كلمة المرور مع أي شخص.",
      "لا توافق على طلب مصادقة في تطبيق هويتي لم تبدأه بنفسك.",
      "لا ترسل الأموال إلى حسابات بنكية شخصية تابعة لأفراد.",
      "احتفظ بنسخ من الاتفاقيات والمراسلات والإيصالات الرسمية.",
    ]}
  />

  <Paragraph>
    ويوفر{" "}

    <a
      href={sources[3].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      بنك الكويت المركزي
    </a>

    {" "}معلومات حول التحقق من
    الجهات المالية ومؤشرات الاحتيال
    وطرق الإبلاغ بحسب الاختصاص الرقابي.
  </Paragraph>

</ArticleSection>

{/* FAQ */}

<ArticleSection
  id="faq"
  eyebrow="أسئلة المتداولين في الكويت"
  title="الأسئلة الشائعة حول فتح حساب فوركس في الكويت"
>

  <div className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-6">

    <FAQItem question="هل يمكن فتح حساب فوركس باستخدام البطاقة المدنية الكويتية؟">

      قد تقبل بعض المؤسسات المالية
      البطاقة المدنية كإثبات للهوية.
      ويعتمد ذلك على شروط التحقق
      وأهلية تقديم الخدمة في الكويت.
      وقد يطلب مستند إضافي مثل جواز
      السفر أو إثبات العنوان.

    </FAQItem>

    <FAQItem question="هل يستطيع الوافد فتح حساب تداول في الكويت؟">

      تعتمد الأهلية على الجنسية
      والإقامة القانونية ونوع الخدمة
      المالية والموافقات التنظيمية.
      وقد يطلب من الوافد تقديم
      جواز السفر والبطاقة المدنية
      ومستندات الإقامة والعنوان.

    </FAQItem>

    <FAQItem question="هل يمكن توثيق حساب الفوركس من خلال تطبيق هويتي؟">

      يوفر هويتي هوية مدنية رقمية
      وخدمات مصادقة إلكترونية.
      لكن قبول التطبيق لدى شركة
      التداول يتوقف على أنظمة
      التحقق والتكامل المتاحة لديها.
      يجب التأكد من دعم هذه الخدمة
      قبل استخدامها.

    </FAQItem>

    <FAQItem question="هل أحتاج إلى حساب بنكي كويتي لفتح حساب فوركس؟">

      قد لا يشترط الحساب البنكي
      المحلي لإنشاء الملف الأولي.
      لكن تنفيذ المعاملات المالية
      قد يتطلب وسيلة دفع مقبولة
      باسم صاحب الحساب ووفق
      الشروط المصرفية والتنظيمية.

    </FAQItem>

    <FAQItem question="هل يمكن استخدام KNET للإيداع في حساب التداول؟">

      لا توفر جميع شركات التداول
      خدمة KNET. يجب التحقق من
      توفرها الفعلي لدى الجهة
      المالية وأهلية استخدامها
      في المعاملة المطلوبة.

    </FAQItem>

    <FAQItem question="هل أستطيع فتح حساب تداول بالدينار الكويتي؟">

      يعتمد ذلك على العملات الأساسية
      التي تدعمها المؤسسة المالية.
      قبول دفعة بالدينار الكويتي
      لا يعني بالضرورة توفر حساب
      تكون عملته الأساسية KWD.

    </FAQItem>

    <FAQItem question="كيف أثبت عنواني إذا كنت أسكن في شقة مستأجرة في الكويت؟">

      استفسر عن المستندات المقبولة
      لدى المؤسسة المالية، فقد
      تشمل كشف حساب بنكي أو وثيقة
      حكومية أو عقد إيجار مستوفياً
      للشروط. يجب أن يتطابق المستند
      مع بيانات السكن الفعلي.

    </FAQItem>

    <FAQItem question="هل ترخيص شركة تداول خارج الكويت يكفي للتعامل معها؟">

      لا يمنح الترخيص الأجنبي
      تلقائياً صلاحية تقديم الخدمات
      المالية داخل الكويت. يجب
      التحقق من نطاق الترخيص
      والكيان القانوني والموافقات
      المحلية اللازمة.

    </FAQItem>

    <FAQItem question="ما الحد الأدنى للإيداع لفتح حساب فوركس من الكويت؟">

      لا يوجد مبلغ موحد لجميع
      الشركات والحسابات. تختلف
      الشروط حسب نوع الحساب
      ووسيلة الدفع والكيان القانوني.
      كما قد تؤثر تكاليف تحويل
      الدينار الكويتي على صافي
      المبلغ المودع.

    </FAQItem>

    <FAQItem question="أين أتحقق من شركات التداول غير المرخصة في الكويت؟">

      يمكنك الرجوع إلى السجلات
      وقوائم التحذيرات المنشورة
      لدى هيئة أسواق المال الكويتية،
      ومراجعة الجهات الرقابية
      الأخرى بحسب طبيعة النشاط.
      عدم وجود الشركة في قائمة
      التحذيرات لا يثبت أنها مرخصة.

    </FAQItem>

  </div>

</ArticleSection>

{/* CONCLUSION */}

<ArticleSection
  id="conclusion"
  eyebrow="الخلاصة"
  title="ما الخطوة التالية قبل فتح حساب فوركس في الكويت؟"
>

  <Paragraph>
    يبدأ فتح الحساب باتخاذ قرار
    واضح بشأن نوع المنتج المالي،
    والتحقق من الجهة المقدمة
    للخدمة وأهليتها التنظيمية.
    ثم تأتي مراجعة البطاقة المدنية
    والإقامة والعنوان وشروط
    الحساب والتحويلات المصرفية.
  </Paragraph>

  <Paragraph>
    ومن المهم عدم الاعتماد على
    إعلان الشركة أو الحد الأدنى
    للإيداع باعتبارهما معيارين
    كافيين للاختيار، بل ينبغي
    فهم الجهة القانونية وطبيعة
    العقد والمخاطر والتكاليف
    الفعلية للحساب.
  </Paragraph>

  <div className="!my-6 overflow-hidden rounded-[17px] border border-[#bdd8f5] bg-[#f1f7fe] p-4 sm:p-6">

    <h3 className="text-[17px] font-black leading-7 text-[#102747] sm:text-[20px]">

      هل ما زلت تقارن بين شركات التداول في الكويت؟

    </h3>

    <p className="mt-2 text-[13px] leading-[1.9] text-slate-600 sm:text-[14px]">

      استعرض تقييمات بروكر العرب
      للشركات المدرجة في تصنيف
      الكويت، وقارن خصائص الحسابات
      والمنصات والتكاليف قبل اختيار
      الشركة التي ترغب في مراجعة
      شروطها بالتفصيل.

    </p>

    <Link
      href={KUWAIT_BROKERS_URL}
      className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#176ac8] px-4 py-3 text-center text-[12px] font-black text-white transition hover:bg-[#10549f] sm:w-auto sm:text-[14px]"
    >

      أفضل شركات التداول في الكويت

      <span aria-hidden="true">
        ←
      </span>

    </Link>

    <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">

      تصنيف تحريري للمقارنة، وليس
      إثباتاً للترخيص المحلي أو
      توصية بفتح حساب لدى جهة معينة.

    </p>

  </div>

</ArticleSection>

{/* SOURCES */}

<ArticleSection
  id="sources"
  eyebrow="المراجع الرسمية"
  title="المصادر الكويتية المستخدمة في إعداد دليل فتح حساب التداول"
>

  <Paragraph>
    يعتمد الجانب المحلي من هذا
    الدليل على المعلومات المنشورة
    لدى هيئة أسواق المال الكويتية
    وبنك الكويت المركزي والهيئة
    العامة للمعلومات المدنية،
    بما يشمل التحقق من التراخيص
    والهوية المدنية والإقامة
    والخدمات الرقمية.
  </Paragraph>

  <Paragraph>
    أما متطلبات الحسابات ووسائل
    الدفع فتختلف بين المؤسسات،
    ولذلك لا يفترض الدليل قبول
    البطاقة المدنية الرقمية أو
    KNET أو الدينار الكويتي لدى
    جميع شركات الفوركس.
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

  <Note title="منهجية تحديث المعلومات">

    قد تتغير تعليمات الجهات الرقابية
    ومتطلبات الهوية ووسائل الدفع
    وشروط قبول العملاء بمرور الوقت.
    ينبغي الرجوع إلى المصادر
    الرسمية والشروط السارية عند
    اتخاذ أي قرار مالي.

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