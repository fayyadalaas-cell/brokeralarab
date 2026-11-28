import Link from "next/link";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
  FAQItem,
} from "@/app/components/editorial/ArticleComponents";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   FOREX BROKER NEWS
   CAPITAL.COM – SINGAPORE MAS LICENCE
========================================================= */

const SLUG = "capital-com-singapore-mas-license";

const CATEGORY = "أخبار شركات الفوركس";

const CATEGORY_HREF = "/forex-broker-news";

const HERO_IMAGE =
  "/articles/capital-com-singapore-mas-license.webp";

const ARTICLE = {
  title:
    "كابيتال دوت كوم تحصل على ترخيص MAS في سنغافورة وتتوسع في آسيا",

  seoTitle:
    "كابيتال دوت كوم تحصل على ترخيص MAS في سنغافورة",

  description:
    "حصلت شركة كابيتال دوت كوم (Capital.com) على ترخيص خدمات أسواق رأس المال من سلطة النقد السنغافورية MAS، في أول توسع تنظيمي لها بجنوب شرق آسيا. تعرف على تفاصيل الترخيص وموعد إطلاق خدماتها.",

  shortTitle:
    "كابيتال دوت كوم تحصل على ترخيص سنغافورة",

  subcategory:
    "التراخيص والتنظيمات",

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
      "Capital.com – Global Fintech Group Capital.com Enters Singapore with MAS Licence",
    url:
      "https://capital.com/en-int/press/global-fintech-group-capital-com-enters-singapore-with-mas-licence-its-first-in-sea",
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
    "شركة كابيتال دوت كوم Capital.com تحصل على ترخيص سلطة النقد السنغافورية MAS للتوسع في أسواق جنوب شرق آسيا",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "Capital.com",
    "كابيتال دوت كوم",
    "سنغافورة",
    "MAS",
    "التراخيص المالية",
    "جنوب شرق آسيا",
    "أخبار شركات الفوركس",
  ],

  keywords: [
    "ترخيص Capital.com في سنغافورة",
    "ترخيص كابيتال دوت كوم",
    "أخبار Capital.com",
    "أخبار كابيتال دوت كوم",
    "ترخيص MAS",
    "سلطة النقد السنغافورية",
    "ترخيص شركات التداول في سنغافورة",
    "ترخيص خدمات أسواق رأس المال",
    "شركات التداول في آسيا",
    "التراخيص المالية لشركات الفوركس",
  ],

  about: [
    {
      "@type": "Organization",
      name: "Capital.com",
      url: "https://capital.com",
    },
    {
      "@type": "Organization",
      name: "Monetary Authority of Singapore (MAS)",
      url: "https://www.mas.gov.sg",
    },
    {
      "@type": "Thing",
      name: "Singapore",
    },
    {
      "@type": "Thing",
      name: "Capital Markets Services Licence",
    },
    {
      "@type": "Thing",
      name: "Financial Regulation",
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
    id: "singapore-mas-license",
    label: "تفاصيل ترخيص Capital.com في سنغافورة",
  },
  {
    id: "mas-regulation",
    label: "ما هو ترخيص MAS وما أهميته؟",
  },
  {
    id: "singapore-launch",
    label: "موعد إطلاق خدمات التداول في سنغافورة",
  },
  {
    id: "southeast-asia-expansion",
    label: "أهمية التوسع في جنوب شرق آسيا",
  },
  {
    id: "impact-on-clients",
    label: "ماذا يعني الترخيص للعملاء؟",
  },
  {
    id: "editorial-analysis",
    label: "تحليل بروكر العرب",
  },
  {
    id: "faq",
    label: "الأسئلة الشائعة",
  },
  {
    id: "sources",
    label: "مصادر الخبر",
  },
];

/* =========================================================
   LICENSE DETAILS
========================================================= */

const licenseDetails = [
  {
    label: "شركة التداول",
    value: "Capital.com",
  },
  {
    label: "الكيان القانوني المحلي",
    value: "Capital Com Securities (Singapore) Pte. Ltd.",
  },
  {
    label: "الدولة",
    value: "سنغافورة",
  },
  {
    label: "الجهة الرقابية",
    value: "سلطة النقد السنغافورية (MAS)",
  },
  {
    label: "نوع الترخيص",
    value: "Capital Markets Services Licence (CMS)",
  },
  {
    label: "الأنشطة المشمولة",
    value:
      "التعامل في منتجات أسواق رأس المال، بما فيها الأوراق المالية والمشتقات خارج البورصة",
  },
  {
    label: "تاريخ الإعلان",
    value: "2 نوفمبر 2026",
  },
  {
    label: "بدء استقبال العملاء المتوقع",
    value: "مطلع عام 2027",
  },
];

/* =========================================================
   LICENSE DETAILS TABLE
========================================================= */

function LicenseDetailsTable() {
  return (
    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[38%] px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              الخاصية
            </th>

            <th className="px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              التفاصيل
            </th>

          </tr>

        </thead>

        <tbody>

          {licenseDetails.map((item, index) => (

            <tr
              key={item.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] font-bold leading-7 text-[#102747] sm:px-5 sm:text-[15px]">
                {item.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] leading-7 text-[#475569] sm:px-5 sm:text-[15px]">
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
   NEWS KEY FACTS
========================================================= */

function LicenseKeyFacts() {

  const facts = [
    {
      label: "الجهة الرقابية",
      value: "MAS",
      description: "سلطة النقد السنغافورية",
    },
    {
      label: "نوع الترخيص",
      value: "CMS",
      description: "خدمات أسواق رأس المال",
    },
    {
      label: "تاريخ الإعلان",
      value: "2 نوفمبر",
      description: "2026",
    },
    {
      label: "الإطلاق المتوقع",
      value: "2027",
      description: "مطلع العام",
    },
  ];

  return (

    <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {facts.map((fact) => (

        <div
          key={fact.label}
          className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] px-3 py-5 text-center sm:px-4"
        >

          <div className="mb-3 text-[12px] font-bold text-[#64748b] sm:text-[13px]">
            {fact.label}
          </div>

          <div className="text-[23px] font-black leading-tight text-[#102747] sm:text-[28px]">
            {fact.value}
          </div>

          <div className="mt-2 text-[12px] font-medium leading-6 text-[#64748b] sm:text-[13px]">
            {fact.description}
          </div>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   REGULATORY IMPLICATIONS
========================================================= */

const regulatoryRows = [
  {
    label: "الرقابة على الكيان السنغافوري",
    value:
      "يخضع للإطار التنظيمي المحلي ضمن نطاق الترخيص",
  },
  {
    label: "تسجيل العملاء",
    value:
      "وفق شروط الأهلية ومتطلبات التحقق المحلية",
  },
  {
    label: "حسابات العملاء الحاليين خارج سنغافورة",
    value:
      "لا تنتقل تلقائياً إلى الكيان السنغافوري",
  },
  {
    label: "العمل في دول آسيوية أخرى",
    value:
      "يخضع للمتطلبات التنظيمية لكل دولة",
  },
  {
    label: "مخاطر التداول",
    value:
      "تبقى قائمة رغم حصول الشركة على الترخيص",
  },
];

function RegulatoryImplicationsTable() {

  return (

    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[42%] px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              الجانب التنظيمي
            </th>

            <th className="px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              ماذا يعني للمتداول؟
            </th>

          </tr>

        </thead>

        <tbody>

          {regulatoryRows.map((row, index) => (

            <tr
              key={row.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] font-bold leading-7 text-[#102747] sm:px-5 sm:text-[15px]">
                {row.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] leading-7 text-[#475569] sm:px-5 sm:text-[15px]">
                {row.value}
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
        تقييم شركة Capital.com
      </h3>

      <p className="mb-5 text-[14px] leading-8 text-[#475569] sm:text-[16px]">

        اطلع على مراجعة بروكر العرب لشركة كابيتال دوت
        كوم، وتعرف على تراخيصها المالية والجهات الرقابية
        التي تشرف على كياناتها، بالإضافة إلى منصات
        التداول والأدوات المالية والرسوم وأبرز مزايا
        وعيوب الشركة.

      </p>

      <Link
        href="/brokers/capital-com"
        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1058a9] sm:w-auto sm:text-[15px]"
      >

        اقرأ تقييم Capital.com الكامل

        <span aria-hidden="true">←</span>

      </Link>

    </div>

  );
}

/* =========================================================
   OFFICIAL SOURCES
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

          <div className="min-w-0">

            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-[13px] font-bold leading-7 text-[#176ac8] transition-colors hover:text-[#102747] hover:underline sm:text-[15px]"
            >

              {source.title}

              <span className="ms-2" aria-hidden="true">
                ↗
              </span>

            </a>

            <div className="mt-1 text-[12px] leading-6 text-[#64748b] sm:text-[13px]">
              البيان الصحفي الرسمي – 2 نوفمبر 2026
            </div>

          </div>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   ARTICLE PAGE
========================================================= */

export default function CapitalComSingaporeMASLicensePage() {

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

      heroImageCaption="الصورة: Capital.com – المركز الإعلامي للشركة"

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            أعلنت مجموعة{" "}

            <Link
              href="/brokers/capital-com"
              className="font-bold text-[#176ac8] hover:underline"
            >
              Capital.com
            </Link>

            {" "}في 2 نوفمبر 2026 حصول كيانها المحلي
            في سنغافورة على ترخيص خدمات أسواق رأس
            المال من سلطة النقد السنغافورية (MAS)،
            لتسجل بذلك أول حضور مرخص لها في منطقة
            جنوب شرق آسيا.

          </Paragraph>

          <Paragraph>

            وتمثل الخطوة توسعاً جغرافياً للمجموعة
            ضمن إطار رقابي محلي، في حين تستعد الشركة
            لاستقبال العملاء مطلع عام 2027. فما نطاق
            الترخيص الجديد، وما أهميته بالنسبة للمتداولين
            وصناعة الوساطة المالية؟

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          SECTION 1
          SINGAPORE MAS LICENCE
      ====================================================== */}

      <ArticleSection

        id="singapore-mas-license"

        eyebrow="التراخيص والتنظيمات المالية"

        title="تفاصيل ترخيص Capital.com في سنغافورة"

      >

        <Paragraph>

          حصلت شركة Capital Com Securities (Singapore)
          Pte. Ltd. على ترخيص{" "}

          <Strong>
            Capital Markets Services Licence (CMS)
          </Strong>

          {" "}الذي يشمل التعامل في منتجات أسواق رأس
          المال، بما فيها الأوراق المالية والمشتقات
          المالية المتداولة خارج البورصة (OTC)، وفقاً
          للبيان الرسمي للمجموعة.

        </Paragraph>

        <LicenseKeyFacts />

        <Paragraph>

          ويعد الكيان السنغافوري أول نشاط مرخص
          للمجموعة في جنوب شرق آسيا، ليضاف إلى
          حضورها التنظيمي في أسواق أخرى تشمل
          المملكة المتحدة والاتحاد الأوروبي والشرق
          الأوسط وأفريقيا وأستراليا.

        </Paragraph>

        <LicenseDetailsTable />

        <Note title="نطاق الترخيص الجديد" tone="blue">

          يتعلق الترخيص بالكيان القانوني المسجل في
          سنغافورة، ولا يعني بالضرورة إتاحة جميع
          المنتجات التي تقدمها Capital.com في
          الأسواق الأخرى.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 2
          MAS REGULATION
      ====================================================== */}

      <ArticleSection

        id="mas-regulation"

        eyebrow="فهم التراخيص المالية"

        title="ما هو ترخيص MAS وما أهميته لشركات التداول؟"

      >

        <Paragraph>

          تشير الأحرف MAS إلى سلطة النقد السنغافورية
          (Monetary Authority of Singapore)، وهي
          الجهة المسؤولة عن السياسة النقدية والإشراف
          على القطاع المالي في سنغافورة.

        </Paragraph>

        <Paragraph>

          أما ترخيص خدمات أسواق رأس المال CMS فهو
          ترخيص يتيح للمؤسسة ممارسة الأنشطة المالية
          المحددة ضمن نطاقه، مع الالتزام بالمتطلبات
          التنظيمية المطبقة على تلك الأنشطة.

        </Paragraph>

        <SubHeading>

          لماذا يجب الانتباه إلى نطاق الترخيص؟

        </SubHeading>

        <Paragraph>

          عند تقييم تراخيص شركات التداول، لا يكفي
          معرفة اسم الجهة الرقابية وحده. فمن المهم
          أيضاً التحقق من اسم الكيان القانوني الذي
          يتعاقد معه العميل، ونوع الخدمات المصرح له
          بتقديمها، والقيود المرتبطة بنشاطه.

        </Paragraph>

        <ArticleList

          items={[

            "التحقق من الاسم القانوني للجهة التي تدير حساب التداول.",

            "معرفة الأنشطة المالية المشمولة بالترخيص.",

            "مراجعة الشروط المتعلقة بحماية أموال العملاء.",

            "التعرف على آليات تقديم الشكاوى وتسوية النزاعات.",

            "فهم القيود التنظيمية المرتبطة بالمنتجات والرافعة المالية.",

          ]}

        />

        <Paragraph>

          ويمكن الاطلاع على مزيد من المعلومات حول
          الجهات الرقابية المختلفة من خلال قسم{" "}

          <Link
            href="/licenses"
            className="font-bold text-[#176ac8] hover:underline"
          >
            تراخيص شركات التداول
          </Link>

          {" "}في بروكر العرب.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 3
          SINGAPORE LAUNCH
      ====================================================== */}

      <ArticleSection

        id="singapore-launch"

        eyebrow="إطلاق الخدمات المحلية"

        title="متى تبدأ Capital.com استقبال العملاء في سنغافورة؟"

      >

        <Paragraph>

          تستهدف الشركة بدء تسجيل العملاء مطلع عام
          2027، تحت إدارة توني ليم (Tony Lim)، الذي
          يمتلك خبرة تزيد على 30 عاماً في أسواق رأس
          المال السنغافورية.

        </Paragraph>

        <Paragraph>

          وتشمل الاستعدادات المعلنة التحقق من الهوية
          باستخدام خدمة Singpass MyInfo، واستكمال
          التحقق من العملاء قبل التداول، واعتماد
          المصادقة الثنائية عند تسجيل الدخول.

        </Paragraph>

        <Paragraph>

          ومن المقرر الإعلان عن تفاصيل إضافية
          بشأن المنصة والخدمات المحلية قبل الإطلاق.

        </Paragraph>

        <Note title="هل يمكن فتح حساب لدى الكيان الجديد الآن؟" tone="blue">

          الحصول على الترخيص لا يعني بدء استقبال
          العملاء فوراً. وحتى تاريخ إعداد هذا التقرير،
          يستند موعد الإطلاق المتوقع إلى الخطة
          التي أعلنتها الشركة، وقد يخضع للتغيير.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 4
          SOUTHEAST ASIA EXPANSION
      ====================================================== */}

      <ArticleSection

        id="southeast-asia-expansion"

        eyebrow="صناعة الوساطة المالية"

        title="أهمية توسع Capital.com في جنوب شرق آسيا"

      >

        <Paragraph>

          تتمتع سنغافورة بمكانة بارزة كمركز مالي
          إقليمي، وهو ما يجعل دخول شركات الوساطة
          الدولية إلى هذا السوق خطوة ذات أهمية
          تتجاوز مجرد زيادة الانتشار الجغرافي.

        </Paragraph>

        <Paragraph>

          ومن الناحية التجارية، يتيح تأسيس كيان
          محلي مرخص للوسيط بناء خدمات تتناسب مع
          البيئة التنظيمية واحتياجات المستثمرين
          في السوق المستهدف، بدلاً من الاعتماد
          حصراً على تقديم الخدمات عبر كيانات
          مسجلة في دول أخرى.

        </Paragraph>

        <Paragraph>

          ومع ذلك، فإن وجود كيان مرخص في سنغافورة
          لا يمنح الشركة تلقائياً حق تقديم خدمات
          التداول في جميع دول جنوب شرق آسيا، إذ
          تختلف المتطلبات التنظيمية بين الأسواق
          بحسب الدولة وطبيعة النشاط المالي.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 5
          IMPACT ON CLIENTS
      ====================================================== */}

      <ArticleSection

        id="impact-on-clients"

        eyebrow="ما يهم المتداولين"

        title="ماذا يعني ترخيص MAS لعملاء Capital.com؟"

      >

        <Paragraph>

          تتمثل الأهمية المباشرة للترخيص الجديد في
          تأسيس إطار تنظيمي محلي للخدمات التي
          سيقدمها الكيان السنغافوري للعملاء المؤهلين.

        </Paragraph>

        <Paragraph>

          لكن بالنسبة للمتداولين الذين لديهم حسابات
          قائمة لدى كيانات Capital.com الأخرى،
          فإن الإعلان لا يعني انتقال حساباتهم أو
          تغيير الجهة الرقابية المشرفة عليها بشكل
          تلقائي.

        </Paragraph>

        <RegulatoryImplicationsTable />

        <Paragraph>

          وتنطبق هذه النقطة أيضاً على العملاء في
          السعودية والإمارات والكويت وبقية الأسواق
          العربية. إذ تعتمد الحماية التنظيمية وشروط
          الحساب على الكيان القانوني الذي يقدم
          الخدمة للعميل، وليس على مجموع التراخيص
          التي تمتلكها العلامة التجارية عالمياً.

        </Paragraph>

        <Note title="تنبيه للمخاطر" tone="amber">

          لا يضمن الترخيص الرقابي تحقيق الأرباح
          أو عدم خسارة رأس المال. وتنطوي عقود
          الفروقات والمنتجات ذات الرافعة المالية
          على مخاطر مرتفعة، حتى عند التداول مع
          وسيط خاضع للرقابة المالية.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 6
          BROKER ALARAB EDITORIAL ANALYSIS
      ====================================================== */}

      <ArticleSection

        id="editorial-analysis"

        eyebrow="تحليل بروكر العرب"

        title="كيف نقرأ الترخيص الجديد ضمن استراتيجية Capital.com؟"

      >

        <Paragraph>

          من منظور بروكر العرب، يمثل الحصول على
          ترخيص محلي في سنغافورة خطوة مهمة في
          استراتيجية التوسع الدولي لشركة Capital.com،
          خصوصاً أن دخول الأسواق المالية عبر كيانات
          محلية مرخصة يتطلب استثمارات في البنية
          التشغيلية والامتثال وخدمة العملاء.

        </Paragraph>

        <Paragraph>

          لكن القيمة الفعلية لهذا التوسع ستتضح بعد
          إطلاق الخدمات، عندما يصبح من الممكن تقييم
          المنتجات المتاحة وتكاليف التداول وجودة
          التنفيذ وآليات حماية العملاء لدى الكيان
          الجديد.

        </Paragraph>

        <Paragraph>

          لذلك، فإن الترخيص يعد تطوراً تنظيمياً
          مهماً، لكنه لا يشكل بمفرده أساساً كافياً
          للحكم على جودة خدمات التداول أو مدى
          ملاءمتها لكل مستثمر.

        </Paragraph>

        <BrokerReviewCard />

      </ArticleSection>

      {/* =====================================================
          SECTION 7
          FREQUENTLY ASKED QUESTIONS
      ====================================================== */}

      <ArticleSection

        id="faq"

        eyebrow="أسئلة وأجوبة"

        title="الأسئلة الشائعة حول ترخيص Capital.com في سنغافورة"

      >

        <div className="space-y-3">

          <FAQItem
            question="هل شركة Capital.com مرخصة في سنغافورة؟"
          >

            نعم، أعلنت الشركة في 2 نوفمبر 2026
            حصول كيانها المحلي Capital Com Securities
            (Singapore) Pte. Ltd. على ترخيص خدمات
            أسواق رأس المال من سلطة النقد
            السنغافورية MAS.

          </FAQItem>

          <FAQItem
            question="ما الفرق بين ترخيص MAS وترخيص CMS؟"
          >

            MAS هو اختصار لاسم الجهة الرقابية،
            سلطة النقد السنغافورية، بينما يشير CMS
            إلى نوع الترخيص الممنوح لممارسة أنشطة
            محددة في أسواق رأس المال.

          </FAQItem>

          <FAQItem
            question="هل يشمل الترخيص الجديد عملاء Capital.com في الدول العربية؟"
          >

            لا يشملهم تلقائياً. يعتمد الإطار الرقابي
            المطبق على حساب العميل على الكيان
            القانوني الذي يتعاقد معه ومكان إقامته
            وشروط تقديم الخدمة.

          </FAQItem>

          <FAQItem
            question="متى تطلق Capital.com خدماتها في سنغافورة؟"
          >

            وفقاً للبيان الرسمي، تخطط الشركة لبدء
            استقبال العملاء مطلع عام 2027،
            ولم تحدد في البيان تاريخاً نهائياً
            للإطلاق.

          </FAQItem>

          <FAQItem
            question="هل ترخيص MAS يضمن عدم خسارة أموال التداول؟"
          >

            لا. يحدد الترخيص إطاراً تنظيمياً لممارسة
            الأنشطة المالية، لكنه لا يلغي مخاطر
            السوق أو يضمن رأس المال أو الأرباح.

          </FAQItem>

        </div>

      </ArticleSection>

      {/* =====================================================
          SECTION 8
          OFFICIAL SOURCES
      ====================================================== */}

      <ArticleSection

        id="sources"

        eyebrow="المراجع والتحقق"

        title="مصادر الخبر"

      >

        <Paragraph>

          يستند الجانب الإخباري من هذا التقرير
          إلى البيان الصحفي الرسمي الصادر عن
          Capital.com بتاريخ 2 نوفمبر 2026،
          بينما يمثل تفسير أهمية الترخيص وآثاره
          المحتملة تحليلاً تحريرياً من فريق
          بروكر العرب.

        </Paragraph>

        <ArticleSources />

        <div className="mt-7 rounded-[12px] border border-[#e3eaf1] bg-[#f8fafc] p-4 sm:p-5">

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            <strong className="text-[#102747]">
              إخلاء المسؤولية:
            </strong>

            {" "}أعد فريق تحرير بروكر العرب هذا
            المحتوى لأغراض إخبارية وتثقيفية فقط،
            ولا يمثل توصية استثمارية أو دعوة
            لفتح حساب تداول أو شراء أو بيع أي
            أداة مالية. ويخضع توفر المنتجات
            والخدمات للمتطلبات التنظيمية والجغرافية
            وشروط الكيان القانوني المعني.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */