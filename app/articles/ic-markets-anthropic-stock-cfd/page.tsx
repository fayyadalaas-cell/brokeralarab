import Link from "next/link";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
} from "@/app/components/editorial/ArticleComponents";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   FOREX BROKER NEWS
   IC MARKETS – ANTHROPIC STOCK CFD
========================================================= */

const SLUG = "ic-markets-anthropic-stock-cfd";

const CATEGORY = "أخبار شركات الفوركس";

const CATEGORY_HREF = "/forex-broker-news";

const HERO_IMAGE =
  "/articles/ic-markets-anthropic-stock-cfd.webp";

const ARTICLE = {
  title: "IC Markets تطلق عقود الفروقات على سهم أنثروبيك",

  seoTitle:
    "IC Markets تطلق عقود الفروقات على سهم أنثروبيك",

  description:
    "أعلنت IC Markets توسيع أدوات التداول بإضافة عقود الفروقات على سهم أنثروبيك عبر منصة MT5 بعد إدراج الشركة في ناسداك. تعرف على تفاصيل الأداة الجديدة ومخاطر تداولها.",

  shortTitle:
    "IC Markets تضيف تداول سهم أنثروبيك",

  subcategory:
    "تحديثات شركات التداول",

  author:
    "فريق تحرير بروكر العرب",

  published:
    "2026-11-27",

  modified:
    "2026-11-27",
};

/* =========================================================
   OFFICIAL SOURCES
========================================================= */

const sources = [
    {
    title:
      "IC – Anthropic Post-IPO Trading",
    url:
      "https://www.ic.com/blog/should-you-trade-anthropic-post-ipo-ic/",
  },
  {
    title:
      "Anthropic – Initial Public Offering Pricing",
    url:
      "https://www.anthropic.com/news/anthropic-prices-initial-public-offering",
  },
  {
    title:
      "Nasdaq – Anthropic Marks its IPO at Nasdaq",
    url:
      "https://www.nasdaq.com/newsroom/anthropic-marks-ipo-at-nasdaq",
  },
  {
    title:
      "SEC – Anthropic IPO Filing",
    url:
      "https://www.sec.gov/Archives/edgar/data/2130357/000162828026075973/ant-20261119.htm",
  },
  {
    title:
      "Reuters – Anthropic Shares Fall Below IPO Price",
    url:
      "https://www.reuters.com/business/anthropic-breaks-below-83-ipo-price-debut-rally-unravels-2026-11-24/",
  },
];

/* =========================================================
   SEO CONFIGURATION
========================================================= */

const ARTICLE_SEO: ArticleSEOConfig = {
  language: "ar",

  slug: SLUG,

  title: ARTICLE.title,

  seoTitle: ARTICLE.seoTitle,

  description: ARTICLE.description,

  category: CATEGORY,

  categoryHref: CATEGORY_HREF,

  categoryName: CATEGORY,

  author: ARTICLE.author,

  published: ARTICLE.published,

  modified: ARTICLE.modified,

  image: HERO_IMAGE,

  imageAlt:
    "إطلاق عقود الفروقات على سهم أنثروبيك لدى IC Markets بعد إدراج الشركة في ناسداك",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "IC Markets",
    "Anthropic",
    "أنثروبيك",
    "عقود الفروقات",
    "ناسداك",
    "أخبار شركات الفوركس",
  ],

  keywords: [
    "أخبار IC Markets",
    "تداول سهم أنثروبيك",
    "عقود الفروقات على الأسهم",
    "اكتتاب أنثروبيك",
    "Anthropic CFD",
    "ANT NASDAQ",
    "أخبار شركات التداول",
  ],

  about: [
    {
      "@type": "Organization",
      name: "IC Markets",
      url: "https://www.icmarkets.com",
    },
    {
      "@type": "Organization",
      name: "Anthropic",
      url: "https://www.anthropic.com",
    },
    {
      "@type": "Organization",
      name: "Nasdaq",
      url: "https://www.nasdaq.com",
    },
    {
      "@type": "Thing",
      name: "Contracts for Difference",
    },
  ],

  sources,
};

export const metadata =
  createArticleMetadata(ARTICLE_SEO);

/* =========================================================
   TABLE OF CONTENTS
========================================================= */

const contents = [
  {
    id: "anthropic-nasdaq-ipo",
    label: "إدراج أنثروبيك في ناسداك",
  },
  {
    id: "trading-instrument",
    label: "تفاصيل أداة التداول الجديدة",
  },
  {
    id: "pre-ipo-vs-stock-cfd",
    label: "الفرق بين التداول قبل الإدراج وبعده",
  },
  {
    id: "market-volatility",
    label: "تقلبات السهم ومخاطر التداول",
  },
  {
    id: "industry-impact",
    label: "أهمية الخبر لصناعة الوساطة المالية",
  },
  {
    id: "sources",
    label: "مصادر الخبر",
  },
];

/* =========================================================
   TRADING INSTRUMENT DATA
========================================================= */

const instrumentDetails = [
  {
    label: "شركة التداول",
    value: "IC Markets",
  },
  {
    label: "الأصل الأساسي",
    value: "سهم Anthropic",
  },
  {
    label: "نوع الأداة",
    value: "عقود الفروقات على الأسهم (CFD)",
  },
  {
    label: "البورصة المرجعية",
    value: "Nasdaq",
  },
  {
    label: "رمز السهم في البورصة",
    value: "ANT",
  },
  {
    label: "رمز التداول لدى IC",
    value: "ANT.NAS-24",
  },
  {
    label: "منصة التداول",
    value: "MetaTrader 5 (MT5)",
  },
  {
    label: "ملكية الأسهم الفعلية",
    value: "لا",
  },
  {
    label: "توفر الأداة",
    value: "وفق الكيان التنظيمي وأهلية العميل",
  },
];

/* =========================================================
   TRADING INSTRUMENT TABLE
========================================================= */

function InstrumentDetailsTable() {
  return (
    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[43%] px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              الخاصية
            </th>

            <th className="px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              التفاصيل
            </th>

          </tr>

        </thead>

        <tbody>

          {instrumentDetails.map((item, index) => (

            <tr
              key={item.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="border-t border-[#e3eaf1] px-3 py-3.5 text-[13px] font-bold text-[#102747] sm:px-5 sm:text-[15px]">
                {item.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-3 py-3.5 text-[13px] leading-7 text-[#475569] sm:px-5 sm:text-[15px]">
                {item.value}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   IPO KEY FIGURES
========================================================= */

function AnthropicIPOFigures() {

  const figures = [
    {
      label: "سعر الطرح الأولي",
      value: "83$",
      description: "لكل سهم",
    },
    {
      label: "رمز السهم",
      value: "ANT",
      description: "بورصة ناسداك",
    },
    {
      label: "عدد الأسهم المطروحة",
      value: "1.127",
      description: "مليار سهم",
    },
    {
      label: "بدء التداول",
      value: "19 نوفمبر",
      description: "2026",
    },
  ];

  return (
    <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {figures.map((figure) => (

        <div
          key={figure.label}
          className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] px-3 py-5 text-center sm:px-4"
        >

                    <div className="mb-3 text-[12px] font-bold text-[#64748b] sm:text-[13px]">
            {figure.label}
          </div>

          <div
            dir="ltr"
            className="text-[24px] font-black leading-tight text-[#102747] sm:text-[30px]"
          >
            {figure.value}
          </div>

          <div className="mt-2 text-[12px] font-medium text-[#64748b] sm:text-[13px]">
            {figure.description}
          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   PRE-IPO VS STOCK CFD
========================================================= */

const comparisonRows = [
  {
    label: "مرجع التسعير",
    before: "القيمة التقديرية للشركة",
    after: "سعر السهم في البورصة",
  },
  {
    label: "وجود سهم مدرج",
    before: "لا",
    after: "نعم",
  },
  {
    label: "شفافية السعر المرجعي",
    before: "محدودة نسبياً",
    after: "أعلى نسبياً",
  },
  {
    label: "ملكية الأسهم الفعلية",
    before: "لا",
    after: "لا",
  },
  {
    label: "مستوى المخاطر",
    before: "مرتفع",
    after: "مرتفع",
  },
];

function PreIPOComparisonTable() {

  return (
    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[30%] px-2 py-4 text-[12px] font-bold sm:px-5 sm:text-[15px]">
              وجه المقارنة
            </th>

            <th className="w-[35%] px-2 py-4 text-[12px] font-bold sm:px-5 sm:text-[15px]">
              قبل الإدراج
            </th>

            <th className="w-[35%] px-2 py-4 text-[12px] font-bold sm:px-5 sm:text-[15px]">
              بعد الإدراج
            </th>

          </tr>

        </thead>

        <tbody>

          {comparisonRows.map((row, index) => (

            <tr
              key={row.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-2 py-4 text-[12px] font-bold leading-6 text-[#102747] sm:px-5 sm:text-[15px]">
                {row.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-2 py-4 text-[12px] leading-6 text-[#475569] sm:px-5 sm:text-[15px]">
                {row.before}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-2 py-4 text-[12px] leading-6 text-[#475569] sm:px-5 sm:text-[15px]">
                {row.after}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   RELATED BROKER REVIEW
========================================================= */

function BrokerReviewCard() {

  return (
    <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

      <div className="mb-3 text-[12px] font-bold text-[#176ac8] sm:text-[13px]">
        تقييم شركة التداول
      </div>

      <h3 className="mb-3 text-[21px] font-black text-[#102747] sm:text-[25px]">
        تعرف على شركة IC Markets
      </h3>

      <p className="mb-5 text-[14px] leading-8 text-[#475569] sm:text-[16px]">

        اطلع على مراجعة بروكر العرب لشركة IC Markets،
        بما يشمل التراخيص والجهات الرقابية وأنواع
        حسابات التداول والرسوم ومنصات التداول،
        بالإضافة إلى أبرز مزايا وعيوب الشركة.

      </p>

      <Link
        href="/brokers/icmarkets"
        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1058a9] sm:w-auto sm:text-[15px]"
      >

        اقرأ تقييم IC Markets الكامل

        <span aria-hidden="true">←</span>

      </Link>

    </div>
  );
}

/* =========================================================
   OFFICIAL SOURCES SECTION
========================================================= */

function ArticleSources() {

  return (
    <div className="my-5 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      {sources.map((source, index) => (

        <div
          key={source.url}
          className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${
            index !== sources.length - 1
              ? "border-b border-[#e3eaf1]"
              : ""
          }`}
        >

          <span
            dir="ltr"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf3fa] text-[12px] font-bold text-[#176ac8]"
          >
            {index + 1}
          </span>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 break-words text-[13px] font-bold leading-7 text-[#176ac8] transition-colors hover:text-[#102747] hover:underline sm:text-[15px]"
          >

            {source.title}

            <span className="ms-2" aria-hidden="true">
              ↗
            </span>

          </a>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   ARTICLE PAGE
========================================================= */

export default function ICMarketsAnthropicStockCFDPage() {

  return (

    <ArticleLayout

      language="ar"

      slug={SLUG}

      title={ARTICLE.title}

      description={ARTICLE.description}

      category={CATEGORY}

      categoryHref={CATEGORY_HREF}

      subcategory={ARTICLE.subcategory}

      articleType="خبر وتحليل"

      breadcrumbTitle={ARTICLE.shortTitle}

      author={ARTICLE.author}

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }

      heroImageCaption="توسع أدوات التداول المرتبطة بأسهم شركات الذكاء الاصطناعي – بروكر العرب"

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            وسعت شركة{" "}

            <Link
              href="/brokers/icmarkets"
              className="font-bold text-[#176ac8] hover:underline"
            >
              IC Markets
            </Link>

            {" "}عروضها من الأدوات المالية بإضافة
            عقود الفروقات المرتبطة بسهم شركة أنثروبيك
            (Anthropic)، المطورة لنماذج الذكاء الاصطناعي
            Claude، عبر منصة MetaTrader 5، عقب إدراج
            أسهم الشركة في بورصة ناسداك الأمريكية.

          </Paragraph>

          <Paragraph>

            وتمثل هذه الخطوة انتقالاً من مرحلة التداول
            على القيمة التقديرية للشركة قبل طرحها العام
            الأولي إلى التداول على أداة مالية تستند إلى
            سعر سهم مدرج في الأسواق العامة، في وقت
            يشهد فيه قطاع الذكاء الاصطناعي اهتماماً
            متزايداً من المستثمرين وشركات الوساطة المالية.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          SECTION 1
          ANTHROPIC NASDAQ IPO
      ====================================================== */}

      <ArticleSection

        id="anthropic-nasdaq-ipo"

        eyebrow="الاكتتابات وأسواق الأسهم"

        title="إدراج أنثروبيك في بورصة ناسداك"

      >

        <Paragraph>

          بدأت أسهم شركة أنثروبيك التداول في بورصة
          ناسداك في 19 نوفمبر 2026، تحت رمز التداول{" "}

          <Strong>ANT</Strong>

          ، وذلك عقب تحديد سعر الطرح العام الأولي
          عند 83 دولاراً للسهم.

        </Paragraph>

        <Paragraph>

          ويعكس إدراج الشركة تزايد اهتمام الأسواق
          المالية بالشركات المتخصصة في تطوير تقنيات
          الذكاء الاصطناعي التوليدي والنماذج اللغوية
          المتقدمة، وهو قطاع أصبح يحظى بأهمية متنامية
          ضمن الاستثمارات العالمية في التكنولوجيا.

        </Paragraph>

        <AnthropicIPOFigures />

        <Paragraph>

          وأتاح الإدراج العام وجود سعر مرجعي معلن
          لسهم الشركة، يمكن لشركات الوساطة الاستناد
          إليه عند تقديم أدوات مالية مشتقة مرتبطة
          بأداء السهم، بما في ذلك عقود الفروقات.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 2
          NEW TRADING INSTRUMENT
      ====================================================== */}

      <ArticleSection

        id="trading-instrument"

        eyebrow="تحديثات منتجات التداول"

        title="تفاصيل أداة التداول الجديدة لدى IC Markets"

      >

        <Paragraph>

          تتيح الأداة الجديدة للمتداولين المؤهلين
          إمكانية التداول على تحركات سعر سهم أنثروبيك
          من خلال عقود الفروقات، دون الحاجة إلى شراء
          السهم الفعلي أو امتلاكه.

        </Paragraph>

        <Paragraph>

          وتندرج الأداة ضمن منتجات عقود الفروقات
          على الأسهم التي يقدمها الوسيط عبر منصة
          MetaTrader 5، وفقاً لشروط التداول والكيان
          التنظيمي الذي يتبع له حساب العميل.

        </Paragraph>

        <InstrumentDetailsTable />

        <Note title="ملاحظة حول مواصفات التداول" tone="blue">

          قد تختلف الرافعة المالية ومتطلبات الهامش
          والعمولات وساعات التداول بحسب الكيان
          التنظيمي ونوع الحساب والدولة التي يقيم
          فيها المتداول. ينبغي مراجعة مواصفات العقد
          الفعلية داخل منصة التداول قبل فتح أي مركز.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 3
          PRE-IPO VS STOCK CFD
      ====================================================== */}

      <ArticleSection

        id="pre-ipo-vs-stock-cfd"

        eyebrow="فهم أدوات التداول"

        title="الفرق بين تداول أنثروبيك قبل الإدراج وبعده"

      >

        <Paragraph>

          يكمن الاختلاف الرئيسي بين أدوات التداول
          قبل الطرح العام الأولي وعقود الفروقات
          على الأسهم المدرجة في طبيعة المرجع
          المستخدم لتسعير الأداة المالية.

        </Paragraph>

        <SubHeading>

          التداول قبل الطرح العام الأولي

        </SubHeading>

        <Paragraph>

          قبل إدراج الشركة في البورصة، لم يكن هناك
          سعر تداول عام ومباشر لسهم أنثروبيك.
          ولذلك كانت الأدوات المالية المرتبطة
          بالشركة تعتمد على آليات تسعير تستند
          إلى تقديرات قيمتها السوقية، وفقاً
          لشروط المنتج الذي يقدمه الوسيط.

        </Paragraph>

        <SubHeading>

          تداول عقود الفروقات بعد الإدراج

        </SubHeading>

        <Paragraph>

          بعد بدء تداول السهم في ناسداك، أصبح
          من الممكن الاستناد إلى سعر السهم في
          السوق العامة كمرجع لتسعير عقود الفروقات،
          مع مراعاة فروق الأسعار وشروط التنفيذ
          ومواصفات العقد لدى الوسيط.

        </Paragraph>

        <PreIPOComparisonTable />

        <Paragraph>

          ورغم ارتفاع مستوى شفافية السعر المرجعي
          بعد الإدراج، فإن ذلك لا يعني بالضرورة
          انخفاض مخاطر التداول، خصوصاً في ظل
          التقلبات التي قد تشهدها الأسهم حديثة
          الإدراج.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 4
          MARKET VOLATILITY
      ====================================================== */}

      <ArticleSection

        id="market-volatility"

        eyebrow="إدارة المخاطر"

        title="تقلبات سهم أنثروبيك ومخاطر التداول"

      >

        <Paragraph>

          قد تشهد أسهم الشركات حديثة الإدراج
          تحركات سعرية حادة خلال جلسات التداول
          الأولى، نتيجة تغير توقعات المستثمرين
          وعمليات جني الأرباح وإعادة تقييم
          القيمة السوقية للشركة.

        </Paragraph>

        <Paragraph>

          وأشارت تقارير رويترز في 24 نوفمبر 2026
          إلى تراجع سهم أنثروبيك دون سعر الطرح
          الأولي البالغ 83 دولاراً، وهو ما يبرز
          طبيعة المخاطر المرتبطة بتداول الأسهم
          حديثة الإدراج.

        </Paragraph>

        <Paragraph>

          وعند التداول باستخدام عقود الفروقات،
          يمكن أن تتضاعف آثار هذه التحركات بسبب
          استخدام الرافعة المالية، مما يجعل
          إدارة المخاطر أمراً أساسياً.

        </Paragraph>

        <ArticleList

          items={[

            "التقلبات السعرية المرتفعة خلال الفترة الأولى بعد الإدراج.",

            "احتمال اتساع فروق الأسعار خلال فترات عدم استقرار الأسواق.",

            "تأثير الرافعة المالية على حجم الأرباح والخسائر المحتملة.",

            "احتمال حدوث انزلاق سعري عند تنفيذ أوامر التداول.",

            "تأثر السهم بنتائج الشركة وتوقعات النمو والمنافسة في قطاع الذكاء الاصطناعي.",

          ]}

        />

        <Note title="تنبيه للمخاطر" tone="amber">

          عقود الفروقات أدوات مالية معقدة تنطوي
          على مخاطر مرتفعة لخسارة رأس المال.
          ولا يعني تداول عقد فروقات مرتبط بسهم
          أنثروبيك امتلاك أسهم فعلية في الشركة
          أو الحصول على حقوق المساهمين.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 5
          BROKER ALARAB EDITORIAL ANALYSIS
      ====================================================== */}

      <ArticleSection

        id="industry-impact"

        eyebrow="تحليل بروكر العرب"

        title="ماذا تعني هذه الخطوة لصناعة الوساطة المالية؟"

      >

        <Paragraph>

          من منظور بروكر العرب، تعكس إضافة
          أدوات تداول مرتبطة بأسهم شركات الذكاء
          الاصطناعي اتجاهاً لدى الوسطاء نحو
          توسيع نطاق المنتجات المالية المتاحة
          للمتداولين، بما يتجاوز أسواق العملات
          والسلع والمؤشرات التقليدية.

        </Paragraph>

        <Paragraph>

          كما تمثل سرعة استجابة شركات التداول
          للأحداث المهمة في أسواق المال أحد
          جوانب المنافسة بين الوسطاء، خصوصاً
          مع تزايد اهتمام المستثمرين بقطاع
          التكنولوجيا والاكتتابات العامة.

        </Paragraph>

        <Paragraph>

          ومع ذلك، فإن تنوع الأدوات المالية
          لا يكفي وحده لتقييم جودة الوسيط.
          إذ تظل قوة التراخيص والشفافية وتكاليف
          التداول وجودة التنفيذ وخدمات العملاء
          من المعايير الأساسية عند اختيار
          شركة التداول المناسبة.

        </Paragraph>

        <BrokerReviewCard />

      </ArticleSection>

      {/* =====================================================
          SECTION 6
          OFFICIAL SOURCES
      ====================================================== */}

      <ArticleSection

        id="sources"

        eyebrow="المراجع والتحقق"

        title="مصادر الخبر"

      >

        <Paragraph>

          استند هذا التقرير إلى المعلومات
          والإفصاحات المنشورة من الجهات المعنية
          والشركات ذات الصلة، بالإضافة إلى
          التغطية المالية لوكالة رويترز.

        </Paragraph>

        <ArticleSources />

        <div className="mt-7 rounded-[12px] border border-[#e3eaf1] bg-[#f8fafc] p-4 sm:p-5">

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            <strong className="text-[#102747]">
              إخلاء المسؤولية:
            </strong>

            {" "}أعد فريق تحرير بروكر العرب هذا
            المحتوى لأغراض إخبارية وتثقيفية.
            ولا يمثل الخبر توصية استثمارية
            أو دعوة لشراء أو بيع أي أداة مالية.
            كما أن توفر منتجات التداول يخضع
            للقيود التنظيمية والجغرافية
            وشروط الوسيط المعني.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */