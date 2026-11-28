import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

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
   TRADING GUIDES
   HOW TO DETECT SCAM BROKERS
========================================================= */

const SLUG = "how-to-detect-scam-brokers";

const CATEGORY = "أدلة التداول";

const CATEGORY_HREF = "/learn-trading";

const HERO_IMAGE =
  "/articles/how-to-detect-scam-brokers.webp";

const ARTICLE = {
  title:
    "كيف تعرف أن شركة التداول نصابة؟ 10 علامات تحذيرية قبل إيداع أموالك",

  seoTitle:
    "كيف تعرف شركة التداول النصابة؟ 10 علامات لكشف الاحتيال",

  shortTitle:
    "كيفية كشف شركات التداول النصابة",

  description:
    "دليل شامل للتعرف على أبرز 10 علامات تكشف شركات التداول النصابة، وكيفية التحقق من تراخيص شركات الفوركس، واكتشاف التراخيص المزورة وحماية أموالك والتصرف عند التعرض للاحتيال المالي.",

  subcategory:
    "أمان التداول والتحقق من الوسطاء",

  author:
    "فريق تحليلات بروكر العرب",

  published:
    "2026-11-28",

  modified:
    "2026-11-28",
};

/* =========================================================
   OFFICIAL SOURCES
========================================================= */

const sources = [
  {
    title:
      "هيئة السلوك المالي البريطانية FCA – الاحتيال في تداول الفوركس",
    url:
      "https://www.fca.org.uk/consumers/forex-trading-scams",
  },
  {
    title:
      "هيئة السلوك المالي البريطانية FCA – الشركات المستنسخة",
    url:
      "https://www.fca.org.uk/consumers/clone-firms-individuals",
  },
  {
    title:
      "هيئة السلوك المالي البريطانية FCA – الاحتيال في التداول الإلكتروني",
    url:
      "https://www.fca.org.uk/consumers/online-trading-scams",
  },
  {
    title:
      "هيئة السلوك المالي البريطانية FCA – قائمة التحذيرات",
    url:
      "https://www.fca.org.uk/consumers/warning-list-unauthorised-firms",
  },
  {
    title:
      "هيئة السلوك المالي البريطانية FCA – احتيال استرداد الأموال",
    url:
      "https://www.fca.org.uk/consumers/recovery-room-scams",
  },
  {
    title:
      "هيئة تداول السلع الآجلة الأمريكية CFTC – الاحتيال في الفوركس",
    url:
      "https://www.cftc.gov/LearnAndProtect/forexfrauds",
  },
  {
    title:
      "هيئة تداول السلع الآجلة الأمريكية CFTC – إرشادات تداول الفوركس",
    url:
      "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html",
  },
  {
    title:
      "هيئة السوق المالية السعودية CMA",
    url:
      "https://cma.org.sa",
  },
  {
    title:
      "سلطة دبي للخدمات المالية DFSA",
    url:
      "https://www.dfsa.ae",
  },
  {
    title:
      "هيئة الأوراق المالية والاستثمارات الأسترالية ASIC",
    url:
      "https://asic.gov.au",
  },
  {
    title:
      "هيئة الأوراق المالية والبورصات القبرصية CySEC",
    url:
      "https://www.cysec.gov.cy",
  },
  {
    title:
      "سوق أبوظبي العالمي ADGM",
    url:
      "https://www.adgm.com",
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
    "كيفية كشف شركات التداول النصابة والتحقق من تراخيص شركات الفوركس والحماية من الاحتيال المالي",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "شركات التداول النصابة",
    "الاحتيال المالي",
    "تراخيص شركات التداول",
    "الفوركس",
    "حماية المستثمر",
    "أمان التداول",
    "شركات الفوركس",
    "استرداد الأموال",
  ],

  keywords: [
    "كيف تعرف أن شركة التداول نصابة",
    "كيف أعرف شركة التداول النصابة",
    "علامات شركات التداول النصابة",
    "كشف شركات التداول النصابة",
    "كيفية التحقق من شركة التداول",
    "شركات الفوركس النصابة",
    "كيف أعرف أن شركة التداول مرخصة",
    "كيفية التأكد من ترخيص شركة التداول",
    "النصب في التداول",
    "الاحتيال في الفوركس",
    "شركات التداول الوهمية",
    "منصات التداول النصابة",
    "شركة التداول ترفض السحب",
    "استرجاع الأموال من شركات التداول النصابة",
    "الإبلاغ عن شركات التداول النصابة",
    "التراخيص المالية المزورة",
    "شركات التداول الموثوقة",
    "أفضل شركات التداول المرخصة",
    "التحقق من تراخيص الفوركس",
  ],

  about: [
    {
      "@type": "Thing",
      name: "Investment Fraud",
    },
    {
      "@type": "Thing",
      name: "Financial Regulation",
    },
    {
      "@type": "Thing",
      name: "Foreign Exchange Market",
    },
    {
      "@type": "Thing",
      name: "Investor Protection",
    },
    {
      "@type": "Organization",
      name: "Financial Conduct Authority",
      url: "https://www.fca.org.uk",
    },
    {
      "@type": "Organization",
      name: "Commodity Futures Trading Commission",
      url: "https://www.cftc.gov",
    },
    {
      "@type": "Organization",
      name: "Capital Market Authority",
      url: "https://cma.org.sa",
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
    id: "quick-answer",
    label: "كيف تعرف شركة التداول النصابة؟",
  },
  {
    id: "how-scam-brokers-work",
    label: "كيف تعمل شركات التداول النصابة؟",
  },
  {
    id: "warning-signs",
    label: "10 علامات تكشف شركات التداول النصابة",
  },
  {
    id: "clone-firms",
    label: "كيف تكتشف التراخيص المستنسخة؟",
  },
  {
    id: "verify-broker-license",
    label: "خطوات التحقق من ترخيص شركة التداول",
  },
  {
    id: "official-regulators",
    label: "الجهات الرقابية وشركات التداول المرخصة",
  },
  {
    id: "broker-comparison",
    label: "الفرق بين الوسيط المرخص والمنصة المشبوهة",
  },
  {
    id: "choose-a-broker",
    label: "كيف تختار شركة تداول مناسبة؟",
  },
  {
    id: "before-deposit",
    label: "قائمة التحقق قبل إيداع الأموال",
  },
  {
    id: "withdrawal-problems",
    label: "هل تأخر السحب دليل على الاحتيال؟",
  },
  {
    id: "what-to-do-if-scammed",
    label: "ماذا تفعل إذا تعرضت للنصب؟",
  },
  {
    id: "recovery-scams",
    label: "احذر الاحتيال باسترداد الأموال",
  },
  {
    id: "editorial-conclusion",
    label: "خلاصة وتوصيات بروكر العرب",
  },
  {
    id: "faq",
    label: "الأسئلة الشائعة",
  },
  {
    id: "sources",
    label: "المصادر والمنهجية",
  },
];

/* =========================================================
   WARNING SIGNS DATA
========================================================= */

const warningSigns = [
  {
    number: "01",
    title: "غياب الترخيص المالي أو تعذر التحقق منه",
    description:
      "تعرض بعض المنصات شهادات تأسيس أو أرقام تسجيل تجارية على أنها تراخيص مالية، رغم أن تسجيل الشركة تجارياً لا يمنحها تلقائياً حق تقديم خدمات الوساطة المالية. يجب أن يكون الترخيص صادراً عن جهة رقابية مختصة وأن يغطي النشاط الذي تعرضه الشركة عليك.",
    example:
      "تخبرك الشركة بأنها مسجلة في دولة أوروبية، لكنها ترفض تقديم رقم الترخيص المالي أو اسم الجهة التي تشرف على نشاطها.",
    action:
      "اطلب الاسم القانوني الكامل ورقم الترخيص، ثم ابحث عنهما بصورة مستقلة في السجل الرسمي للجهة الرقابية.",
  },
  {
    number: "02",
    title: "ضمان الأرباح وتقديم وعود مالية غير واقعية",
    description:
      "لا يستطيع وسيط التداول ضمان نتائج الصفقات في الأسواق المالية. تتغير أسعار العملات والذهب والمؤشرات باستمرار، ولذلك فإن الوعود بتحقيق عوائد ثابتة ومرتفعة دون احتمال للخسارة تتعارض مع طبيعة التداول.",
    example:
      "يعدك مدير الحساب بتحقيق أرباح شهرية تبلغ 20% دون أي مخاطرة، أو يؤكد أنه يستطيع مضاعفة رأس مالك خلال أسابيع.",
    action:
      "لا تحول الأموال بناءً على الوعود الشفهية أو صور الأرباح. توقف عن التعامل إذا استمرت الجهة في تقديم ضمانات غير واقعية.",
  },
  {
    number: "03",
    title: "الضغط النفسي والاستعجال في الإيداع",
    description:
      "يستحق الإلحاح المتكرر على تحويل الأموال اهتماماً خاصاً، خصوصاً عندما يحاول الموظف منعك من قراءة الاتفاقيات أو مراجعة الترخيص أو مقارنة الشركة بالوسطاء الآخرين.",
    example:
      "يخبرك الموظف بأن هناك فرصة استثنائية على الذهب يجب استغلالها خلال ساعة، وأنك ستخسر الفرصة إذا لم تحول الأموال فوراً.",
    action:
      "لا تتخذ قراراً مالياً تحت الضغط. امنح نفسك الوقت الكافي للبحث والتحقق وفهم شروط الخدمة.",
  },
  {
    number: "04",
    title: "طلب تحويل الأموال إلى حسابات شخصية أو مجهولة",
    description:
      "ينبغي أن تكون جهة استلام الأموال مرتبطة بشكل واضح بالكيان القانوني الذي يقدم الخدمة، سواء كانت الشركة نفسها أو مزود دفع معتمداً يمكن التحقق من علاقته بالوسيط. التحويل إلى أفراد مجهولين يجعل تتبع الأموال واستردادها أكثر صعوبة.",
    example:
      "يطلب منك مدير الحساب تحويل الأموال إلى حساب بنكي يحمل اسمه الشخصي، أو إلى محفظة رقمية مجهولة المالك.",
    action:
      "تحقق من اسم المستفيد وقناة الدفع عبر الموقع الرسمي للوسيط. لا تحول الأموال بناءً على تعليمات فردية غير موثقة.",
  },
  {
    number: "05",
    title: "رفض السحب وطلب دفعات إضافية لتحرير الرصيد",
    description:
      "من أبرز مؤشرات الاحتيال اشتراط إرسال مبالغ جديدة إلى الجهة نفسها قبل السماح بسحب الأموال، تحت مسميات مثل ضريبة الأرباح أو رسوم فك التجميد أو تأمين الحساب. يجب التحقق بصورة مستقلة من أي التزام ضريبي أو قانوني مزعوم.",
    example:
      "يظهر في حسابك رصيد قدره 8,000 دولار، لكن الشركة تطلب تحويل 1,500 دولار إضافية قبل تنفيذ طلب السحب.",
    action:
      "لا ترسل أموالاً جديدة بناءً على وعود بتحرير الرصيد. تواصل مع البنك والجهات المختصة للتحقق من الموقف.",
  },
  {
    number: "06",
    title: "وجود منصة تداول أو أرباح لا يمكن التحقق منها",
    description:
      "وجود رسوم بيانية وصفقات وأرقام على شاشة إلكترونية لا يثبت أن الأموال مستثمرة فعلياً. كما أن استخدام منصة تداول معروفة لا يمثل بحد ذاته دليلاً على وجود ترخيص مالي أو سلامة الوسيط.",
    example:
      "تشاهد ارتفاعاً مستمراً في رصيد حسابك، لكنك لا تحصل على كشوف واضحة ولا تتمكن من التحقق من الجهة التي تدير الحساب.",
    action:
      "راجع هوية الوسيط واتفاقية التنفيذ وكشوف الحساب وسياسة السحب. لا تعتبر وجود MT4 أو MT5 بديلاً عن التحقق التنظيمي.",
  },
  {
    number: "07",
    title: "طلب التحكم عن بعد في هاتفك أو جهاز الكمبيوتر",
    description:
      "قد يؤدي منح شخص مجهول صلاحية الوصول إلى جهازك إلى كشف معلوماتك المالية وكلمات المرور وبيانات الدفع، أو تمكينه من إجراء معاملات نيابة عنك دون فهمك الكامل لما يحدث.",
    example:
      "يطلب منك الموظف تثبيت برنامج للتحكم عن بعد بحجة مساعدتك في الإيداع أو تفعيل حساب التداول.",
    action:
      "لا تمنح شخصاً مجهولاً صلاحية التحكم في جهازك، ولا تشارك كلمات المرور أو رموز التحقق البنكية.",
  },
  {
    number: "08",
    title: "انتحال اسم أو ترخيص شركة تداول معروفة",
    description:
      "قد تستخدم جهة غير مصرح لها اسم وشعار ورقم ترخيص شركة مالية حقيقية. لذلك لا يكفي العثور على رقم ترخيص صحيح؛ بل يجب التأكد من أن الموقع والكيان الذي تتعامل معه تابعان لصاحب الترخيص.",
    example:
      "تجد رقم الترخيص في السجل الرسمي، لكن عنوان الموقع الإلكتروني الذي أرسله لك الموظف يختلف عن عنوان الشركة المعتمد.",
    action:
      "طابق الموقع الإلكتروني والاسم القانوني ومعلومات الاتصال مع البيانات الرسمية، وتواصل مع الشركة عبر قنوات مستقلة.",
  },
  {
    number: "09",
    title: "غياب الشفافية في الرسوم والشروط القانونية",
    description:
      "ينبغي أن يكون العميل قادراً على معرفة شروط الخدمة وتكاليف التداول وسياسة السحب وآلية تقديم الشكاوى قبل إيداع الأموال. إخفاء هذه المعلومات يصعّب تقييم الحقوق والالتزامات المرتبطة بالحساب.",
    example:
      "لا تجد اتفاقية عميل أو سياسة سحب واضحة، ويخبرك الموظف بأن التفاصيل ستصبح متاحة بعد تمويل الحساب.",
    action:
      "راجع الوثائق القانونية وشروط الإيداع والسحب والرسوم والمكافآت قبل فتح الحساب أو إرسال الأموال.",
  },
  {
    number: "10",
    title: "اختفاء الدعم وتكرار الشكاوى الجدية",
    description:
      "يستدعي تكرار الشكاوى المتعلقة بحجز الأموال أو تغيير شروط السحب أو اختفاء ممثلي الشركة إجراء مراجعة إضافية، خصوصاً عند وجود تحذيرات رسمية أو مستندات تدعم هذه الشكاوى.",
    example:
      "يتواصل معك مدير الحساب يومياً قبل الإيداع، لكنه يتوقف عن الرد بمجرد أن تطلب سحب رصيدك.",
    action:
      "ابحث عن التحذيرات الرقابية والشكاوى الموثقة. لا تعتمد على تقييم فردي أو عدد النجوم وحده لإصدار حكم نهائي.",
  },
];

/* =========================================================
   REUSABLE ARTICLE TABLE
========================================================= */

function GuideTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="my-7">

      <div className="overflow-x-auto rounded-[16px] border border-[#dce6ef]">

        <table className="w-full min-w-[520px] border-collapse text-center">

          <thead className="bg-[#102747] text-white">

            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-3 py-4 text-[13px] font-bold leading-7 sm:px-5 sm:text-[15px]"
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
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                {row.map((cell, cellIndex) => (

                  <td
                    key={cellIndex}
                    className={`border-t border-[#e3eaf1] px-3 py-4 text-[13px] leading-7 sm:px-5 sm:text-[14px] ${
                      cellIndex === 0
                        ? "font-bold text-[#102747]"
                        : "text-[#475569]"
                    }`}
                  >
                    {cell}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {caption && (
        <p className="mt-3 text-[12px] leading-7 text-[#64748b]">
          {caption}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   QUICK SAFETY SUMMARY
========================================================= */

function QuickSafetyCards() {

  const cards = [
    {
      number: "01",
      title: "تحقق من الترخيص",
      description:
        "راجع الاسم القانوني للشركة في السجل الرقابي الرسمي.",
      color: "#176ac8",
    },
    {
      number: "02",
      title: "لا تصدق ضمان الأرباح",
      description:
        "التداول ينطوي على مخاطر ولا يمكن ضمان نتائج الصفقات.",
      color: "#b45309",
    },
    {
      number: "03",
      title: "تحقق من المستفيد",
      description:
        "لا تحول أموالك إلى حساب شخصي أو جهة مجهولة.",
      color: "#176ac8",
    },
    {
      number: "04",
      title: "احذر رسوم تحرير الرصيد",
      description:
        "لا تدفع مبالغ إضافية بناءً على وعود بالسماح بالسحب.",
      color: "#b91c1c",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.number}
          className="rounded-[16px] border border-[#dce6ef] bg-gradient-to-b from-white to-[#f5f9fd] p-4 text-center sm:p-5"
        >

          <div
            dir="ltr"
            style={{ color: card.color }}
            className="mb-3 text-[30px] font-black sm:text-[36px]"
          >
            {card.number}
          </div>

          <h3 className="mb-3 text-[14px] font-black leading-7 text-[#102747] sm:text-[16px]">
            {card.title}
          </h3>

          <p className="text-[12px] leading-7 text-[#64748b]">
            {card.description}
          </p>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   SCAM PROCESS DIAGRAM
========================================================= */

function ScamProcessDiagram() {

  const stages = [
    {
      title: "التواصل الأول",
      description:
        "إعلان استثماري أو اتصال غير متوقع أو رسالة عبر وسائل التواصل الاجتماعي.",
    },
    {
      title: "ظهور الوعود المالية",
      description:
        "عرض أرباح أو فرص استثمارية ينبغي التحقق من حقيقتها.",
    },
    {
      title: "طلب تحويل الأموال",
      description:
        "مطالبة العميل بالإيداع قبل إتمام التحقق من هوية الجهة.",
    },
    {
      title: "طلبات مالية متكررة",
      description:
        "ظهور مطالبات بإضافة أموال جديدة إلى الحساب.",
    },
    {
      title: "مشكلات استرداد الرصيد",
      description:
        "تعذر السحب أو ظهور رسوم غير متوقعة أو اختفاء التواصل.",
    },
  ];

  return (
    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-7">

      <h3 className="mb-2 text-center text-[20px] font-black text-[#102747] sm:text-[24px]">
        مؤشرات الاحتيال خلال مراحل التعامل مع الوسيط
      </h3>

      <p className="mb-7 text-center text-[13px] leading-7 text-[#64748b]">
        نموذج توعوي للتعرف على علامات الخطر قبل خسارة الأموال
      </p>

      {stages.map((stage, index) => (

        <div key={stage.title}>

          <div
            className={`mx-auto flex max-w-[540px] items-start gap-4 rounded-[13px] border p-4 sm:p-5 ${
              index === stages.length - 1
                ? "border-[#fecaca] bg-[#fff5f5]"
                : "border-[#dce6ef] bg-white"
            }`}
          >

            <div
              dir="ltr"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[16px] font-black text-white ${
                index === stages.length - 1
                  ? "bg-[#b91c1c]"
                  : "bg-[#102747]"
              }`}
            >
              {index + 1}
            </div>

            <div>

              <h4 className="mb-1 text-[16px] font-black text-[#102747]">
                {stage.title}
              </h4>

              <p className="text-[13px] leading-7 text-[#475569]">
                {stage.description}
              </p>

            </div>

          </div>

          {index < stages.length - 1 && (

            <div
              aria-hidden="true"
              className="py-2 text-center text-[25px] font-bold text-[#94a3b8]"
            >
              ↓
            </div>

          )}

        </div>

      ))}

      <figcaption className="mt-5 text-center text-[12px] leading-7 text-[#64748b]">
        إعداد بروكر العرب. قد تظهر مؤشرات الاحتيال في أي
        مرحلة، ولا تتبع جميع الحالات الترتيب نفسه.
      </figcaption>

    </figure>
  );
}

/* =========================================================
   TEN WARNING SIGNS COMPONENT
========================================================= */

function WarningSignsList() {
  return (
    <div className="my-8 space-y-6">

      {warningSigns.map((sign) => (

        <div
          key={sign.number}
          className="overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white"
        >

          <div className="flex items-center gap-4 border-b border-[#dce6ef] bg-[#f7faff] p-4 sm:p-6">

            <div
              dir="ltr"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#102747] text-[20px] font-black text-white"
            >
              {sign.number}
            </div>

            <h3 className="text-[18px] font-black leading-8 text-[#102747] sm:text-[22px]">
              {sign.title}
            </h3>

          </div>

          <div className="space-y-5 p-4 sm:p-6">

            <p className="text-[14px] leading-8 text-[#475569] sm:text-[16px]">
              {sign.description}
            </p>

            <div className="rounded-[12px] border border-[#f0dfbf] bg-[#fffbf3] p-4">

              <div className="mb-2 text-[13px] font-black text-[#967020]">
                مثال توضيحي
              </div>

              <p className="text-[13px] leading-7 text-[#475569] sm:text-[14px]">
                {sign.example}
              </p>

            </div>

            <div className="rounded-[12px] border border-[#dce6ef] bg-[#f2f7fd] p-4">

              <div className="mb-2 text-[13px] font-black text-[#176ac8]">
                ماذا تفعل؟
              </div>

              <p className="text-[13px] leading-7 text-[#475569] sm:text-[14px]">
                {sign.action}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   CLONE FIRM EXAMPLE
========================================================= */

function CloneFirmExample() {

  const examples = [
    {
      title: "البيانات الرسمية في السجل الرقابي",
      website: "broker.example",
      license: "123456",
      email: "support@broker.example",
      color: "#15803d",
      background: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      title: "البيانات التي قدمتها الجهة المشبوهة",
      website: "broker-invest.example",
      license: "123456",
      email: "support@broker-invest.example",
      color: "#b91c1c",
      background: "#fff7f7",
      border: "#fecaca",
    },
  ];

  return (
    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-6">

      <h3 className="mb-2 text-center text-[19px] font-black text-[#102747] sm:text-[23px]">
        لماذا لا يكفي تطابق رقم الترخيص؟
      </h3>

      <p className="mb-6 text-center text-[13px] leading-7 text-[#64748b]">
        مقارنة افتراضية بين بيانات شركة مرخصة وبيانات جهة تنتحل هويتها
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {examples.map((item) => (

          <div
            key={item.title}
            style={{
              backgroundColor: item.background,
              borderColor: item.border,
            }}
            className="rounded-[14px] border p-4 sm:p-5"
          >

            <h4
              style={{ color: item.color }}
              className="mb-5 text-center text-[15px] font-black leading-7"
            >
              {item.title}
            </h4>

            {[
              ["الموقع الإلكتروني", item.website],
              ["رقم الترخيص", item.license],
              ["البريد الإلكتروني", item.email],
            ].map(([label, value]) => (

              <div key={label} className="mb-4">

                <div className="mb-2 text-[12px] font-bold text-[#64748b]">
                  {label}
                </div>

                <div
                  dir="ltr"
                  className="break-all rounded-lg bg-white p-3 text-center text-[13px] font-bold text-[#102747]"
                >
                  {value}
                </div>

              </div>

            ))}

          </div>

        ))}

      </div>

      <div className="mt-5 rounded-[12px] border border-[#f0dfbf] bg-[#fffbf3] p-4 text-center text-[13px] font-bold leading-7 text-[#92400e]">
        رقم الترخيص متطابق، لكن الموقع الإلكتروني والبريد
        مختلفان. لا بد من التأكد من العلاقة بين الموقع
        وصاحب الترخيص الحقيقي.
      </div>

      <figcaption className="mt-4 text-[12px] leading-7 text-[#64748b]">
        جميع الأسماء والعناوين والأرقام في هذا المثال
        افتراضية وتستخدم لأغراض التعليم فقط.
      </figcaption>

    </figure>
  );
}

/* =========================================================
   BROKER ALARAB LICENSE SEARCH
========================================================= */

function LicenseSearchPlacement() {
  return (
    <aside className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-gradient-to-l from-[#102747] to-[#184878] px-5 py-6 sm:px-7">

        <div className="mb-2 text-[12px] font-bold text-[#b9d7f5]">
          أدوات التحقق من شركات التداول
        </div>

        <h3 className="text-[21px] font-black leading-9 text-white sm:text-[26px]">
          تحقق من تراخيص شركات التداول مع بروكر العرب
        </h3>

        <p className="mt-3 text-[13px] leading-7 text-[#dce6ef] sm:text-[14px]">
          استكشف الهيئات الرقابية وتعرف على شركات
          التداول المدرجة بحسب الجهة التنظيمية.
        </p>

      </div>

      <div className="p-5 sm:p-6">

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <Link
            href="/licenses#license-search"
            className="flex min-h-[48px] items-center justify-center rounded-[10px] bg-[#176ac8] px-4 py-3 text-center text-[14px] font-bold text-white hover:bg-[#1058a9]"
          >
            البحث عن تراخيص شركات التداول ←
          </Link>

          <Link
            href="/licenses"
            className="flex min-h-[48px] items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-4 py-3 text-center text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
          >
            تصفح جميع الهيئات الرقابية ←
          </Link>

        </div>

        <p className="mt-4 text-[12px] leading-7 text-[#64748b]">
          توفر قاعدة بيانات بروكر العرب معلومات تساعد
          في دراسة التراخيص ومقارنة الوسطاء. يجب استكمال
          التحقق بالرجوع إلى السجل الرسمي للجهة الرقابية.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   REGULATORY DIRECTORY
========================================================= */

const regulators = [
  {
    code: "FCA",
    name: "هيئة السلوك المالي البريطانية",
    country: "المملكة المتحدة",
    description:
      "تعرف على التنظيم المالي البريطاني والوسطاء المدرجين تحت ترخيص FCA.",
    internalUrl: "/licenses/fca",
    officialUrl: "https://register.fca.org.uk/s/",
  },
  {
    code: "CySEC",
    name: "هيئة الأوراق المالية والبورصات القبرصية",
    country: "قبرص",
    description:
      "راجع متطلبات التنظيم المالي القبرصي وشركات الاستثمار.",
    internalUrl: "/licenses/cysec",
    officialUrl: "https://www.cysec.gov.cy",
  },
  {
    code: "ASIC",
    name: "هيئة الأوراق المالية والاستثمارات الأسترالية",
    country: "أستراليا",
    description:
      "تعرف على تراخيص الخدمات المالية الأسترالية ونطاقها.",
    internalUrl: "/licenses/asic",
    officialUrl: "https://asic.gov.au",
  },
  {
    code: "DFSA",
    name: "سلطة دبي للخدمات المالية",
    country: "الإمارات العربية المتحدة",
    description:
      "اطلع على الشركات المدرجة تحت تنظيم مركز دبي المالي العالمي.",
    internalUrl: "/licenses/dfsa",
    officialUrl: "https://www.dfsa.ae",
  },
  {
    code: "ADGM FSRA",
    name: "سلطة تنظيم الخدمات المالية",
    country: "الإمارات – أبوظبي",
    description:
      "تعرف على التنظيم المالي ضمن سوق أبوظبي العالمي.",
    internalUrl: "/licenses/adgm-fsra",
    officialUrl: "https://www.adgm.com",
  },
  {
    code: "JSC",
    name: "هيئة الأوراق المالية الأردنية",
    country: "الأردن",
    description:
      "اطلع على تنظيم شركات الخدمات المالية والوساطة في الأردن.",
    internalUrl: "/licenses/jsc",
    officialUrl: "https://www.jsc.gov.jo",
  },
  {
    code: "FSCA",
    name: "هيئة تنظيم القطاع المالي",
    country: "جنوب أفريقيا",
    description:
      "راجع معلومات التنظيم المالي والوسطاء المدرجين تحت هذا الترخيص.",
    internalUrl: "/licenses/fsca",
    officialUrl: "https://www.fsca.co.za",
  },
  {
    code: "NFA",
    name: "الرابطة الوطنية للعقود الآجلة",
    country: "الولايات المتحدة",
    description:
      "تعرف على التسجيل التنظيمي لشركات الفوركس والعقود الآجلة.",
    internalUrl: "/licenses/nfa",
    officialUrl: "https://www.nfa.futures.org",
  },
];

function RegulatoryDirectory() {
  return (
    <div className="my-7">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {regulators.map((regulator) => (

          <div
            key={regulator.code}
            className="flex flex-col rounded-[16px] border border-[#dce6ef] bg-[#f7faff] p-5 hover:border-[#176ac8]"
          >

            <div className="mb-4 flex items-center justify-between gap-3">

              <span
                dir="ltr"
                className="rounded-[8px] bg-[#e8f0fb] px-3 py-2 text-[13px] font-black text-[#176ac8]"
              >
                {regulator.code}
              </span>

              <span className="text-[11px] font-medium text-[#64748b]">
                {regulator.country}
              </span>

            </div>

            <Link
              href={regulator.internalUrl}
              className="mb-3 text-[16px] font-black leading-8 text-[#102747] hover:text-[#176ac8]"
            >
              {regulator.name}
            </Link>

            <p className="mb-5 flex-1 text-[13px] leading-7 text-[#475569]">
              {regulator.description}
            </p>

            <div className="flex flex-col gap-2">

              <Link
                href={regulator.internalUrl}
                className="flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#176ac8] px-3 py-2 text-center text-[12px] font-bold text-white hover:bg-[#1058a9]"
              >
                دليل الترخيص والشركات المدرجة ←
              </Link>

              <a
                href={regulator.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[42px] items-center justify-center rounded-[8px] border border-[#dce6ef] bg-white px-3 py-2 text-center text-[12px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
              >
                الموقع الرسمي للجهة ↗
              </a>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-5 text-center">

        <Link
          href="/licenses#license-search"
          className="inline-flex items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-6 py-3 text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
        >
          تصفح جميع التراخيص وشركات التداول ←
        </Link>

      </div>

      <p className="mt-4 text-[12px] leading-7 text-[#64748b]">
        لا يغني دليل التراخيص عن التحقق من السجل
        الرقابي الرسمي وحالة الترخيص والأنشطة المصرح بها.
      </p>

    </div>
  );
}

/* =========================================================
   BROKER TRANSPARENCY TABLE
========================================================= */

function BrokerTransparencyTable() {
  return (
    <GuideTable
      headers={[
        "معيار المقارنة",
        "ممارسات الوسيط الشفاف",
        "مؤشرات تستدعي الاشتباه",
      ]}
      rows={[
        [
          "الترخيص",
          "كيان قانوني وترخيص قابلان للتحقق",
          "ترخيص مجهول أو منتحل",
        ],
        [
          "الأرباح",
          "إفصاح واضح عن احتمال الخسارة",
          "ضمان الأرباح وانعدام المخاطر",
        ],
        [
          "الإيداع",
          "قنوات دفع معتمدة وموثقة",
          "حسابات شخصية أو جهات مجهولة",
        ],
        [
          "السحب",
          "شروط معالجة ورسوم معلنة",
          "طلبات تحويل جديدة لتحرير الرصيد",
        ],
        [
          "اتفاقية العميل",
          "وثائق قانونية متاحة قبل التسجيل",
          "إخفاء الشروط حتى الإيداع",
        ],
        [
          "حماية البيانات",
          "إجراءات تحقق آمنة",
          "طلب كلمات المرور ورموز التحقق",
        ],
        [
          "الدعم والشكاوى",
          "قنوات رسمية قابلة للتتبع",
          "اختفاء التواصل عند طلب السحب",
        ],
        [
          "التسويق",
          "معلومات قابلة للمراجعة",
          "ضغط نفسي ووعود غير واقعية",
        ],
      ]}
      caption="الجدول أداة توعوية للمقارنة، وليس حكماً قانونياً على أي شركة أو ضماناً لسلامة الأموال لدى الوسطاء المرخصين."
    />
  );
}

/* =========================================================
   FEATURED BROKERS – SUPABASE
========================================================= */

const featuredBrokers = [
  {
    slug: "exness",
    name: "Exness",
    description:
      "راجع التراخيص والكيانات القانونية وأنواع الحسابات وشروط الإيداع والسحب.",
  },
  {
    slug: "xm",
    name: "XM",
    description:
      "اطلع على التنظيم المالي والحسابات ومنصات التداول وشروط الخدمة.",
  },
  {
    slug: "xs",
    name: "XS",
    description:
      "تعرف على الكيانات القانونية والتراخيص وأنواع الحسابات وتكاليف التداول.",
  },
  {
    slug: "pepperstone",
    name: "Pepperstone",
    description:
      "راجع التراخيص المالية والحسابات والمنصات والرسوم وشروط التداول.",
  },
];

async function FeaturedBrokerReviews() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("slug, logo, rating")
    .in(
      "slug",
      featuredBrokers.map((broker) => broker.slug)
    )
    .eq("publication_status", "published");

  const brokers = featuredBrokers.flatMap((broker) => {

    const databaseBroker = data?.find(
      (item) => item.slug === broker.slug
    );

    if (!databaseBroker) return [];

    return [
      {
        ...broker,
        ...databaseBroker,
      },
    ];
  });

  if (!brokers.length) return null;

  return (
    <aside className="my-9 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-gradient-to-l from-[#102747] to-[#184878] px-5 py-6 text-center sm:px-7">

        <div className="mb-2 text-[12px] font-bold text-[#b9d7f5]">
          دليل شركات التداول
        </div>

        <h3 className="text-[21px] font-black leading-9 text-white sm:text-[27px]">
          ابحث وقارن قبل اختيار شركة التداول
        </h3>

        <p className="mt-2 text-[13px] leading-7 text-[#dce6ef] sm:text-[14px]">
          اطلع على تقييمات شركات التداول والتراخيص
          والحسابات والرسوم وشروط الخدمة.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-4 sm:p-5">

        {brokers.map((broker) => (

          <div
            key={broker.slug}
            className="flex flex-col rounded-[14px] border border-[#dce6ef] bg-[#f9fbfd] p-3 sm:p-4"
          >

            <div className="flex h-[75px] items-center justify-center overflow-hidden">

              {broker.logo ? (

                <Image
                  src={broker.logo}
                  alt={`شعار شركة ${broker.name}`}
                  width={170}
                  height={60}
                  unoptimized
                  className="h-[55px] w-full object-contain scale-[1.7]"
                />

              ) : (

                <span
                  dir="ltr"
                  className="text-[22px] font-black text-[#102747]"
                >
                  {broker.name}
                </span>

              )}

            </div>

            <h4
              dir="ltr"
              className="mt-2 text-center text-[16px] font-black text-[#102747] sm:text-[18px]"
            >
              {broker.name}
            </h4>

            {broker.rating != null && (

              <div className="mt-3 flex justify-center">

                <span
                  dir="ltr"
                  className="rounded-md bg-[#fff5dc] px-3 py-1.5 text-[13px] font-bold text-[#967020]"
                >
                  ★ {Number(broker.rating).toFixed(2)} / 5
                </span>

              </div>

            )}

            <p className="my-4 flex-1 text-center text-[12px] leading-7 text-[#475569] sm:text-[13px]">
              {broker.description}
            </p>

            <Link
              href={`/brokers/${broker.slug}`}
              className="flex min-h-[44px] items-center justify-center rounded-[9px] bg-[#176ac8] px-2 py-3 text-center text-[12px] font-bold text-white hover:bg-[#1058a9]"
            >
              تقييم الشركة
            </Link>

          </div>

        ))}

      </div>

      <div className="grid grid-cols-1 gap-3 px-5 pb-5 sm:grid-cols-2">

        <Link
          href="/best-brokers"
          className="flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#176ac8] bg-white px-4 py-3 text-center text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
        >
          تصفح أفضل شركات التداول ←
        </Link>

        <Link
          href="/compare"
          className="flex min-h-[46px] items-center justify-center rounded-[9px] bg-[#102747] px-4 py-3 text-center text-[14px] font-bold text-white hover:bg-[#184878]"
        >
          مقارنة شركات التداول ←
        </Link>

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] p-4 text-[11px] leading-7 text-[#64748b] sm:px-6 sm:text-[12px]">
        الشركات المعروضة مختارة من دليل بروكر العرب
        لأغراض البحث والمقارنة، ولا يمثل إدراجها
        ضماناً لسلامة الأموال أو ملاءمتها لجميع
        المتداولين. قد يحصل بروكر العرب على مقابل
        من بعض العلاقات التجارية. تختلف التراخيص
        والخدمات المتاحة بحسب الدولة والكيان القانوني.
      </div>

    </aside>
  );
}

/* =========================================================
   PRE-DEPOSIT CHECKLIST
========================================================= */

function PreDepositChecklist() {

  const items = [
    "تحققت من الاسم القانوني للكيان الذي سأتعاقد معه.",
    "راجعت الترخيص في الموقع الرسمي للجهة الرقابية.",
    "طابقت عنوان الموقع ووسائل التواصل مع البيانات الرسمية.",
    "تحققت من صلاحية الشركة لتقديم الخدمة في دولتي.",
    "بحثت عن التحذيرات الرقابية والشكاوى الموثقة.",
    "قرأت اتفاقية العميل وشروط الإيداع والسحب.",
    "عرفت الرسوم والعمولات وشروط المكافآت إن وجدت.",
    "تحققت من اسم المستفيد وقناة الدفع المعتمدة.",
    "فهمت مخاطر الرافعة المالية واحتمال الخسارة.",
    "لم أقبل وعداً بأرباح مضمونة أو أتعرض للضغط للإيداع.",
  ];

  return (
    <div className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-[#102747] px-5 py-5 text-white sm:px-7">

        <h3 className="text-[20px] font-black sm:text-[24px]">
          قائمة فحص شركة التداول قبل الإيداع
        </h3>

        <p className="mt-2 text-[13px] leading-7 text-[#dce6ef]">
          ضع علامة أمام كل بند بعد التحقق منه بنفسك
        </p>

      </div>

      <div className="divide-y divide-[#e3eaf1]">

        {items.map((item, index) => (

          <label
            key={item}
            className="flex cursor-pointer items-start gap-3 px-4 py-4 hover:bg-[#f7faff] sm:px-6"
          >

            <input
              type="checkbox"
              className="mt-1.5 h-5 w-5 shrink-0 cursor-pointer accent-[#176ac8]"
            />

            <span
              dir="ltr"
              className="mt-1 text-[12px] font-bold text-[#94a3b8]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-[14px] font-medium leading-7 text-[#102747]">
              {item}
            </span>

          </label>

        ))}

      </div>

      <div className="border-t border-[#f0dfbf] bg-[#fffbf3] p-4 text-[13px] leading-7 text-[#92400e] sm:px-6">
        إكمال القائمة لا يعني أن التداول أصبح خالياً
        من المخاطر. إذا تعذر التحقق من هوية الشركة
        أو ترخيصها أو جهة استلام الأموال، فلا تتعجل
        في تمويل الحساب.
      </div>

    </div>
  );
}

/* =========================================================
   FRAUD RESPONSE STEPS
========================================================= */

function FraudResponseSteps() {

  const steps = [
    {
      title: "أوقف التحويلات فوراً",
      description:
        "لا ترسل مبالغ إضافية لتحرير الرصيد أو دفع رسوم استرداد مزعومة.",
    },
    {
      title: "تواصل مع البنك أو مزود الدفع",
      description:
        "أبلغ عن الاشتباه بالاحتيال واستفسر عن إمكانية إيقاف التحويل أو الاعتراض عليه.",
    },
    {
      title: "احتفظ بجميع الأدلة",
      description:
        "احفظ المحادثات والإيصالات وكشوف الحساب وعناوين المواقع وبيانات المستفيدين.",
    },
    {
      title: "أمّن حساباتك وأجهزتك",
      description:
        "أوقف الوصول عن بعد وغيّر كلمات المرور من جهاز آمن وراجع المعاملات البنكية.",
    },
    {
      title: "قدم بلاغاً رسمياً",
      description:
        "تواصل مع الجهة الرقابية والشرطة أو جهة مكافحة الجرائم الإلكترونية المختصة.",
    },
    {
      title: "احذر احتيال الاسترداد",
      description:
        "لا تعتمد على أشخاص مجهولين يضمنون استرجاع أموالك مقابل دفعات مالية.",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

      {steps.map((step, index) => (

        <div
          key={step.title}
          className="flex items-start gap-4 rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5"
        >

          <div
            dir="ltr"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#102747] text-[16px] font-black text-white"
          >
            {index + 1}
          </div>

          <div>

            <h3 className="mb-2 text-[15px] font-black text-[#102747]">
              {step.title}
            </h3>

            <p className="text-[13px] leading-7 text-[#475569]">
              {step.description}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   RELATED BROKER ALARAB RESOURCES
========================================================= */

function RelatedGuides() {

  const guides = [
    {
      title: "أدلة تعلم التداول",
      description:
        "تعرف على أساسيات التداول وإدارة المخاطر واختيار شركات الوساطة.",
      href: "/learn-trading",
    },
    {
      title: "البحث عن تراخيص شركات التداول",
      description:
        "استكشف الجهات الرقابية وشركات التداول المدرجة تحت كل ترخيص.",
      href: "/licenses#license-search",
    },
    {
      title: "أفضل شركات التداول",
      description:
        "قارن الوسطاء وفق احتياجاتك ومعايير التداول المختلفة.",
      href: "/best-brokers",
    },
    {
      title: "كيف نقيّم شركات التداول؟",
      description:
        "اطلع على منهجية بروكر العرب في تقييم التراخيص والحسابات والخدمات.",
      href: "/how-we-review-brokers",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

      {guides.map((guide) => (

        <Link
          key={guide.href}
          href={guide.href}
          className="group rounded-[15px] border border-[#dce6ef] bg-[#f7faff] p-5 hover:border-[#176ac8] hover:bg-white"
        >

          <div className="mb-2 text-[11px] font-bold text-[#176ac8]">
            أدلة وأدوات بروكر العرب
          </div>

          <h3 className="mb-3 text-[17px] font-black leading-8 text-[#102747] group-hover:text-[#176ac8]">
            {guide.title}
          </h3>

          <p className="text-[13px] leading-7 text-[#475569]">
            {guide.description}
          </p>

          <div className="mt-4 text-[13px] font-bold text-[#176ac8]">
            تصفح المزيد ←
          </div>

        </Link>

      ))}

    </div>
  );
}

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "كيف أعرف أن شركة التداول نصابة؟",
    answer:
      "تحقق من الاسم القانوني للشركة وترخيصها في السجل الرسمي للجهة الرقابية، وطابق عنوان الموقع ووسائل التواصل. انتبه إلى الوعود بالأرباح المضمونة والتحويلات إلى حسابات شخصية وطلبات دفع أموال جديدة لتنفيذ السحب.",
  },
  {
    question:
      "كيف أتأكد من أن شركة التداول مرخصة؟",
    answer:
      "اطلب اسم الكيان القانوني ورقم الترخيص، ثم ابحث عنهما مباشرة في السجل الرسمي للجهة الرقابية. تحقق من حالة الترخيص والأنشطة المصرح بها وعلاقة الموقع الإلكتروني بالكيان الذي سيقدم لك الخدمة.",
  },
  {
    question:
      "هل التداول في الفوركس يعتبر نصباً؟",
    answer:
      "الفوركس سوق مالي عالمي لتبادل العملات ولا يعتبر بحد ذاته عملية احتيال. لكن بعض الجهات تستغل اهتمام المستثمرين بالفوركس لتقديم خدمات وهمية. كما أن تداول الفوركس وعقود الفروقات بالرافعة المالية ينطوي على مخاطر مرتفعة حتى مع الوسطاء المرخصين.",
  },
  {
    question:
      "هل وجود منصة MT4 أو MT5 يعني أن الشركة موثوقة؟",
    answer:
      "لا. استخدام منصة تداول معروفة لا يمثل ترخيصاً مالياً ولا ضماناً لسلامة أموال العملاء. يجب التحقق من هوية الوسيط والكيان القانوني والترخيص المرتبط به بصورة مستقلة.",
  },
  {
    question:
      "هل تأخر السحب من شركة التداول دليل على النصب؟",
    answer:
      "ليس بالضرورة. قد يحدث التأخير نتيجة إجراءات التحقق من الهوية أو معالجة المدفوعات أو متطلبات تنظيمية. لكن رفض السحب دون تفسير واضح أو مطالبة العميل بتحويل أموال جديدة لتحرير رصيده يستدعي التحقيق.",
  },
  {
    question:
      "هل يمكن استرجاع الأموال من شركة تداول نصابة؟",
    answer:
      "تعتمد إمكانية الاسترداد على طريقة الدفع والوقت الذي مضى على التحويل والظروف القانونية والمالية للعملية. ينبغي التواصل سريعاً مع البنك أو مزود الدفع والجهات المختصة مع الاحتفاظ بالأدلة، دون توقع ضمان الاسترداد.",
  },
  {
    question:
      "هل الشركات التي تعد بأرباح مضمونة تعتبر نصابة؟",
    answer:
      "ضمان الأرباح في الفوركس وعقود الفروقات يمثل مؤشراً تحذيرياً مهماً. لا يمكن ضمان نتائج الصفقات مسبقاً، ويجب عدم تحويل الأموال بناءً على هذه الوعود.",
  },
  {
    question:
      "هل التسجيل التجاري يعتبر ترخيصاً لشركة التداول؟",
    answer:
      "لا. التسجيل التجاري يثبت تسجيل كيان قانوني، لكنه لا يعني حصوله على تصريح لتقديم خدمات الوساطة المالية أو إدارة أموال المستثمرين. يجب التحقق من الترخيص المالي المطلوب للنشاط المحدد.",
  },
  {
    question:
      "كيف أبلغ عن شركة تداول نصابة؟",
    answer:
      "تواصل مع الجهة الرقابية المختصة والشرطة أو جهة مكافحة الجرائم الإلكترونية في بلدك، وأبلغ البنك أو مزود الدفع بالاشتباه بالاحتيال. قدم الإيصالات والمراسلات والأدلة المرتبطة بالبلاغ.",
  },
  {
    question:
      "هل شركات استرداد الأموال من التداول موثوقة؟",
    answer:
      "توجد جهات قانونية متخصصة في النزاعات المالية، لكن هناك أيضاً عمليات احتيال تستهدف ضحايا النصب. تحقق من هوية الجهة وترخيصها، ولا تعتمد على ضمانات استرداد الأموال أو مطالبات التحويل إلى حسابات شخصية مجهولة.",
  },
  {
    question:
      "هل الترخيص الدولي يعني أن شركة التداول مرخصة في السعودية؟",
    answer:
      "ليس بالضرورة. الترخيص الصادر من جهة رقابية أجنبية لا يعني تلقائياً حصول الشركة على التصاريح المحلية اللازمة لتقديم خدماتها في السعودية. ينبغي مراجعة الأنظمة المحلية والجهات المختصة قبل فتح الحساب.",
  },
  {
    question:
      "كيف أقارن بين شركات التداول المرخصة؟",
    answer:
      "قارن الكيان القانوني ونطاق الترخيص وتكاليف التداول وشروط الإيداع والسحب وأنواع الحسابات وآليات تقديم الشكاوى، مع مراعاة أهلية العملاء المقيمين في دولتك للحصول على الخدمة.",
  },
];

/* =========================================================
   FAQ DISPLAY
========================================================= */

function ArticleFAQ() {
  return (
    <div className="my-7 space-y-3">

      {faqItems.map((item, index) => (

        <details
          key={item.question}
          className="group overflow-hidden rounded-[14px] border border-[#dce6ef] bg-white"
        >

          <summary className="flex cursor-pointer list-none items-center gap-3 bg-[#f7faff] px-4 py-5 font-black leading-8 text-[#102747] sm:px-6">

            <span
              dir="ltr"
              className="shrink-0 text-[12px] font-bold text-[#176ac8]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 text-[14px] sm:text-[16px]">
              {item.question}
            </span>

            <span
              aria-hidden="true"
              className="text-[20px] font-bold text-[#176ac8] transition-transform group-open:rotate-45"
            >
              +
            </span>

          </summary>

          <div className="border-t border-[#dce6ef] px-5 py-5 text-[14px] leading-8 text-[#475569] sm:px-6 sm:text-[15px]">
            {item.answer}
          </div>

        </details>

      ))}

    </div>
  );
}

/* =========================================================
   ARTICLE SOURCES
========================================================= */

function ArticleSources() {
  return (
    <div className="my-7 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      {sources.map((source, index) => (

        <div
          key={source.url}
          className="flex items-start gap-3 border-b border-[#e3eaf1] px-4 py-4 last:border-b-0 sm:px-5"
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
            className="min-w-0 break-words text-[13px] font-bold leading-7 text-[#176ac8] hover:underline sm:text-[15px]"
          >
            {source.title} ↗
          </a>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   MAIN ARTICLE PAGE
========================================================= */

export default async function DetectScamBrokersPage() {

  return (

    <ArticleLayout

      language="ar"

      slug={SLUG}

      title={ARTICLE.title}

      description={ARTICLE.description}

      category={CATEGORY}

      categoryHref={CATEGORY_HREF}

      subcategory={ARTICLE.subcategory}

      articleType="دليل توعوي وإرشادي"

      breadcrumbTitle={ARTICLE.shortTitle}

      author={ARTICLE.author}

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }

      heroImageCaption="دليل بروكر العرب للتعرف على مؤشرات الاحتيال المالي والتحقق من شركات التداول قبل إيداع الأموال."

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            تخيل أن شخصاً يتواصل معك عبر الهاتف،
            ويخبرك بأن هناك فرصة استثمارية استثنائية
            في سوق الذهب أو العملات، وأن بإمكانك
            تحقيق أرباح شهرية كبيرة دون الحاجة
            إلى خبرة سابقة في التداول.

            يرسل لك رابط موقع إلكتروني يبدو
            احترافياً، ويعرض عليك صوراً لأرباح
            عملاء آخرين، ويؤكد أن الشركة
            حاصلة على تراخيص دولية.

          </Paragraph>

          <Paragraph>

            قد تبدو هذه التفاصيل مقنعة في البداية،
            لكن السؤال الأهم هو: هل تتعامل فعلاً
            مع شركة تداول مرخصة، أم مع جهة تستخدم
            مظهر الوسيط المالي للاستيلاء على أموالك؟

          </Paragraph>

          <Paragraph>

            في هذا الدليل، يستعرض فريق تحليلات
            بروكر العرب أبرز{" "}

            <Strong>
              10 علامات تحذيرية لكشف شركات التداول النصابة
            </Strong>

            ، مع شرح عملي لكيفية التحقق من التراخيص
            المالية، واكتشاف الشركات المستنسخة،
            والتصرف الصحيح عند الاشتباه بالتعرض
            للاحتيال.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          SECTION 1 – QUICK ANSWER
      ====================================================== */}

      <ArticleSection
        id="quick-answer"
        eyebrow="دليل سريع لحماية المتداول"
        title="كيف تعرف أن شركة التداول نصابة؟"
      >

        <Paragraph>

          يمكن التعرف على مؤشرات الاحتيال في شركات
          التداول من خلال مراجعة هوية الشركة القانونية،
          والتحقق من تراخيصها المالية، وفحص شروط
          الإيداع والسحب والانتباه إلى الوعود
          والأساليب التسويقية التي تستخدمها.

        </Paragraph>

        <Paragraph>

          لا تحتاج بالضرورة إلى أن تكون خبيراً
          في الأسواق المالية لاكتشاف كثير من هذه
          المؤشرات. ففي حالات عديدة، تبدأ المشكلة
          قبل تنفيذ أول صفقة تداول، عندما يرسل
          العميل أمواله إلى جهة لم يتحقق
          من هويتها بصورة مستقلة.

        </Paragraph>

        <QuickSafetyCards />

        <Paragraph>

          من المهم التمييز بين شركة تداول مرخصة
          تقدم منتجات مالية عالية المخاطر، وبين
          جهة تدعي تقديم خدمات التداول بهدف
          الاستيلاء على أموال العملاء.

          خسارة الأموال في صفقة تداول لا تعني
          تلقائياً أن الوسيط محتال، كما أن تحقيق
          أرباح داخل منصة إلكترونية لا يثبت
          أن الشركة موثوقة.

        </Paragraph>

        <Note
          title="القاعدة الأولى قبل إيداع الأموال"
          tone="blue"
        >

          إذا لم تتمكن من التحقق بصورة مستقلة من
          هوية الشركة والكيان القانوني الذي سيقدم
          لك الخدمة، فلا تعتمد على تأكيدات الموظف
          أو صور التراخيص أو عدد المتابعين
          على وسائل التواصل الاجتماعي.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 2 – HOW SCAM BROKERS WORK
      ====================================================== */}

      <ArticleSection
        id="how-scam-brokers-work"
        eyebrow="فهم أساليب الاحتيال المالي"
        title="كيف تعمل شركات التداول النصابة؟"
      >

        <Paragraph>

          لا تبدأ جميع عمليات الاحتيال بطلب تحويل
          مبلغ مالي كبير. فقد يبدأ التواصل بعرض
          تعليمي مجاني أو فرصة استثمارية بمبلغ
          محدود أو رسالة من شخص يدعي امتلاك
          خبرة واسعة في تداول الذهب والفوركس.

        </Paragraph>

        <Paragraph>

          وتكمن خطورة بعض عمليات الاحتيال في
          أنها لا تبدو مشبوهة منذ اللحظة الأولى.
          فقد يمتلك الموقع تصميماً احترافياً وخدمة
          عملاء نشطة ولوحة حساب تعرض أسعاراً
          ورسومات بيانية وصفقات وأرصدة مالية.

          لكن هذه المظاهر التقنية لا تكفي لإثبات
          أن الأموال محفوظة لدى وسيط مالي حقيقي.

        </Paragraph>

        <ScamProcessDiagram />

        <SubHeading>
          لماذا لا يكفي نجاح عملية السحب الأولى؟
        </SubHeading>

        <Paragraph>

          من الأخطاء الشائعة اعتبار نجاح عملية
          سحب صغيرة دليلاً نهائياً على موثوقية
          الشركة.

          فقد تضمنت تحذيرات الجهات الرقابية
          حالات احتيال تمكن فيها العملاء من
          استرداد مبالغ محدودة في البداية،
          قبل مواجهة صعوبات عند محاولة
          سحب مبالغ أكبر.

        </Paragraph>

        <Paragraph>

          لذلك لا ينبغي أن يكون نجاح عملية سحب
          واحدة بديلاً عن التحقق من الترخيص
          والهوية القانونية للوسيط أو سبباً
          كافياً لزيادة حجم الإيداع.

        </Paragraph>

        <SubHeading>
          هل جميع عمليات الاحتيال المالي متشابهة؟
        </SubHeading>

        <Paragraph>

          تختلف عمليات الاحتيال من حيث الجهة
          التي تتواصل مع العميل وطبيعة الخدمة
          التي تدعي تقديمها. وقد تشمل:

        </Paragraph>

        <ArticleList
          items={[
            "مواقع إلكترونية تدعي أنها شركات وساطة مالية.",
            "جهات تنتحل أسماء وشعارات شركات تداول مرخصة.",
            "أشخاص يقدمون خدمات إدارة حسابات دون التصاريح المطلوبة.",
            "مجموعات توصيات تروج لمنصات لا يمكن التحقق منها.",
            "تطبيقات تعرض أرصدة وأرباحاً لا يمكن إثبات حقيقتها.",
            "جهات تدعي قدرتها على استرداد الأموال المسروقة مقابل دفعات مسبقة.",
          ]}
        />

        <Paragraph>

          تختلف التفاصيل، لكن القاعدة الأساسية
          تبقى واحدة: لا تحول أموالك إلى جهة
          لم تتحقق من هويتها وصلاحيتها القانونية
          لتقديم الخدمة التي تعرضها عليك.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 3 – TEN WARNING SIGNS
      ====================================================== */}

      <ArticleSection
        id="warning-signs"
        eyebrow="العلامات التحذيرية الرئيسية"
        title="10 علامات تكشف شركات التداول النصابة"
      >

        <Paragraph>

          استناداً إلى الإرشادات والتحذيرات الصادرة
          عن الجهات الرقابية المالية، جمع فريق
          تحليلات بروكر العرب عشر علامات عملية
          يمكن استخدامها عند دراسة أي شركة
          فوركس أو منصة تداول إلكترونية.

        </Paragraph>

        <Paragraph>

          لا تمثل كل علامة بمفردها حكماً قانونياً
          نهائياً على الشركة، لكن ظهور مؤشرات
          خطيرة أو اجتماع عدد من الممارسات
          المشبوهة يستدعي التوقف عن تحويل
          الأموال وإجراء تحقق مستقل.

        </Paragraph>

        <WarningSignsList />

        <Note
          title="هل يجب ظهور العلامات العشر كلها؟"
          tone="blue"
        >

          لا. قد تكون علامة واحدة كافية لاتخاذ
          قرار بعدم الإيداع، خصوصاً إذا كانت
          تتعلق بانتحال هوية شركة مرخصة أو
          طلب تحويل الأموال إلى حساب شخصي
          مجهول أو دفع مبالغ إضافية
          لتحرير الرصيد المحتجز.

          ولا يعني غياب هذه العلامات أن الشركة
          آمنة أو أن التداول معها خالٍ من المخاطر.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 4 – CLONE FIRMS
      ====================================================== */}

      <ArticleSection
        id="clone-firms"
        eyebrow="التراخيص المزورة والمستنسخة"
        title="كيف تكتشف شركات التداول التي تنتحل تراخيص الشركات المرخصة؟"
      >

        <Paragraph>

          من أكثر الأخطاء التي يقع فيها المتداول
          عند التحقق من شركة التداول أن يبحث
          عن رقم الترخيص في الموقع الرسمي
          للجهة الرقابية، ثم يطمئن بمجرد
          العثور على الرقم.

          لكن ماذا لو كان الترخيص حقيقياً،
          بينما الموقع الذي تتعامل معه
          ليس تابعاً لصاحب الترخيص؟

        </Paragraph>

        <Paragraph>

          تعرف هذه الممارسة باسم استنساخ
          الشركات، أو{" "}

          <Strong>Clone Firms</Strong>

          ، حيث تنتحل جهة غير مصرح لها
          هوية مؤسسة مالية حقيقية لإقناع
          العملاء بأنها خاضعة للرقابة المالية.

        </Paragraph>

        <CloneFirmExample />

        <Paragraph>

          في المثال السابق، قد يؤدي البحث
          عن رقم الترخيص وحده إلى ظهور
          نتيجة صحيحة في السجل الرسمي.
          إلا أن هذه النتيجة لا تثبت
          أن الموقع الآخر الذي طلب
          منك الإيداع تابع للشركة المرخصة.

        </Paragraph>

        <SubHeading>
          ما البيانات التي يجب مطابقتها؟
        </SubHeading>

        <GuideTable
          headers={[
            "البيان",
            "ما الذي يجب التحقق منه؟",
          ]}
          rows={[
            [
              "الاسم القانوني",
              "الاسم الكامل للشركة صاحبة الترخيص.",
            ],
            [
              "رقم الترخيص",
              "مطابقته مع السجل الرسمي والتحقق من حالته.",
            ],
            [
              "عنوان الموقع",
              "التأكد من أن النطاق الإلكتروني تابع للكيان المرخص.",
            ],
            [
              "البريد الإلكتروني",
              "مطابقة وسيلة التواصل مع القنوات الرسمية.",
            ],
            [
              "رقم الهاتف",
              "استخدام الرقم المنشور في السجل الرسمي عند توفره.",
            ],
            [
              "الخدمات المصرح بها",
              "التأكد من أن الترخيص يغطي النشاط المعروض عليك.",
            ],
            [
              "الكيان المتعاقد",
              "مطابقة اسم الشركة في اتفاقية العميل مع الكيان المرخص.",
            ],
          ]}
        />

        <Paragraph>

          إذا أخبرك شخص بأن معلومات الاتصال
          في السجل الرقابي قديمة، أو طلب منك
          استخدام رقم هاتف آخر، فلا تعتمد
          على تفسيره وحده.

          تواصل مع الجهة الرقابية أو الشركة
          الأصلية عبر قنوات تحصل عليها
          بصورة مستقلة.

        </Paragraph>

        <Note
          title="رقم الترخيص ليس شهادة أمان للموقع الإلكتروني"
          tone="blue"
        >

          العثور على رقم ترخيص صحيح لا يعني
          أن كل موقع يستخدم هذا الرقم مصرح
          له بتقديم الخدمات المالية.

          الهدف من التحقق هو إثبات العلاقة
          بين الموقع والكيان القانوني
          صاحب الترخيص.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 5 – VERIFY BROKER LICENSE
      ====================================================== */}

      <ArticleSection
        id="verify-broker-license"
        eyebrow="التحقق العملي من شركات التداول"
        title="كيفية التأكد من ترخيص شركة التداول خطوة بخطوة"
      >

        <Paragraph>

          يعتبر التحقق من الترخيص المالي من
          أهم الإجراءات التي ينبغي القيام بها
          قبل اختيار وسيط الفوركس أو عقود
          الفروقات. ويمكن تنفيذ هذه العملية
          من خلال الخطوات التالية.

        </Paragraph>

        <SubHeading>
          الخطوة الأولى: تحديد الاسم القانوني للشركة
        </SubHeading>

        <Paragraph>

          ابحث في أسفل الموقع الإلكتروني
          واتفاقية العميل وصفحة التراخيص
          عن الاسم القانوني الكامل للشركة
          التي ستقدم لك الخدمة.

          قد يختلف الاسم التجاري الظاهر
          على الموقع عن اسم الشركة المسجلة
          لدى الجهة الرقابية.

        </Paragraph>

        <SubHeading>
          الخطوة الثانية: تحديد الجهة الرقابية ورقم الترخيص
        </SubHeading>

        <Paragraph>

          تحقق من اسم الهيئة التي تدعي
          الشركة خضوعها لرقابتها ورقم
          الترخيص المرتبط بالكيان.

          لا تخلط بين رقم تسجيل الشركة
          لدى السجل التجاري ورقم تصريح
          مزاولة الخدمات المالية.

          ويمكنك مراجعة{" "}

          <Link
            href="/licenses"
            className="font-bold text-[#176ac8] hover:underline"
          >
            دليل التراخيص المالية
          </Link>

          {" "}في بروكر العرب للتعرف على
          الجهات الرقابية ونطاق اختصاصاتها.

        </Paragraph>

        <SubHeading>
          الخطوة الثالثة: البحث في السجل الرسمي
        </SubHeading>

        <Paragraph>

          ادخل مباشرة إلى الموقع الرسمي
          للجهة الرقابية وابحث عن اسم
          الشركة أو رقم الترخيص.

          افحص حالة الترخيص وما إذا كان
          سارياً أو مقيداً أو ملغى،
          وتحقق من الأنشطة التي يحق
          للشركة ممارستها.

        </Paragraph>

        <LicenseSearchPlacement />

        <SubHeading>
          الخطوة الرابعة: مطابقة وسائل التواصل والموقع
        </SubHeading>

        <Paragraph>

          قارن المعلومات الموجودة في السجل
          الرقابي مع عنوان الموقع الإلكتروني
          والبريد وبيانات الاتصال التي
          قدمتها لك الشركة.

          إذا لم تكن المعلومات متاحة في
          السجل، اطلب تأكيدها عبر
          قنوات مستقلة.

        </Paragraph>

        <SubHeading>
          الخطوة الخامسة: تحديد الكيان الذي سيقدم لك الخدمة
        </SubHeading>

        <Paragraph>

          قد تمتلك مجموعة وساطة مالية واحدة
          عدة شركات قانونية وتراخيص في
          دول مختلفة، وتوزع عملاءها على
          هذه الكيانات وفق محل الإقامة
          ونوع المنتج والخدمة.

          لذلك لا تفترض أنك ستستفيد من
          حماية ترخيص معين لمجرد أن
          المجموعة تعرضه على موقعها.

        </Paragraph>

        <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

          <h3 className="mb-3 text-[20px] font-black text-[#102747] sm:text-[24px]">
            شركة واحدة قد تعمل من خلال عدة كيانات قانونية
          </h3>

          <p className="mb-6 text-[13px] leading-7 text-[#64748b]">
            مثال افتراضي لتوضيح الفرق بين العلامة التجارية
            والكيان الذي يفتح العميل حسابه لديه.
          </p>

          <div className="mx-auto max-w-[400px] rounded-[12px] bg-[#102747] p-5 text-center text-[17px] font-black text-white">
            مجموعة وساطة مالية دولية
          </div>

          <div
            aria-hidden="true"
            className="py-3 text-center text-[25px] font-bold text-[#94a3b8]"
          >
            ↓
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {[
              {
                title: "الكيان الأول",
                location: "المملكة المتحدة",
                license: "FCA",
                href: "/licenses/fca",
              },
              {
                title: "الكيان الثاني",
                location: "أستراليا",
                license: "ASIC",
                href: "/licenses/asic",
              },
              {
                title: "الكيان الثالث",
                location: "قبرص",
                license: "CySEC",
                href: "/licenses/cysec",
              },
            ].map((entity) => (

              <Link
                key={entity.title}
                href={entity.href}
                className="rounded-[12px] border border-[#dce6ef] bg-white p-4 text-center hover:border-[#176ac8]"
              >

                <div className="text-[13px] font-bold text-[#176ac8]">
                  {entity.title}
                </div>

                <h4 className="my-3 text-[16px] font-black text-[#102747]">
                  {entity.location}
                </h4>

                <div
                  dir="ltr"
                  className="text-[23px] font-black text-[#176ac8]"
                >
                  {entity.license}
                </div>

                <p className="mt-3 text-[12px] leading-7 text-[#64748b]">
                  تعرف على الترخيص ←
                </p>

              </Link>

            ))}

          </div>

          <p className="mt-5 text-center text-[12px] leading-7 text-[#64748b]">
            المثال افتراضي. تختلف حقوق العملاء
            ومتطلبات الحماية بحسب الكيان المتعاقد
            معه والأنظمة والمنتجات المطبقة على الحساب.
          </p>

        </div>

        <SubHeading>
          الخطوة السادسة: التحقق من ملاءمة الترخيص لدولتك
        </SubHeading>

        <Paragraph>

          حصول شركة تداول على ترخيص أجنبي
          لا يعني تلقائياً أنها مخولة بتسويق
          خدماتها أو تقديم جميع المنتجات
          المالية في كل دولة.

          تحقق من الأنظمة المحلية التي تنطبق
          على مكان إقامتك ونطاق نشاط الشركة
          وأهلية العملاء للحصول على الخدمات
          المعروضة.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 6 – REGULATORY AUTHORITIES
      ====================================================== */}

      <ArticleSection
        id="official-regulators"
        eyebrow="مصادر التحقق الرسمية"
        title="أين تتحقق من تراخيص شركات التداول؟"
      >

        <Paragraph>

          توفر جهات الرقابة المالية حول العالم
          سجلات عامة للمؤسسات المرخصة، بالإضافة
          إلى قوائم التحذيرات والإجراءات
          التنظيمية.

          ومن خلال دليل التراخيص في بروكر
          العرب، يمكنك التعرف على عدد من
          هذه الجهات وشركات التداول المدرجة
          تحت كل ترخيص قبل متابعة التحقق
          من المصادر الرسمية.

        </Paragraph>

        <RegulatoryDirectory />

        <SubHeading>
          التحقق من شركات التداول في السعودية ودول الخليج
        </SubHeading>

        <Paragraph>

          بالنسبة للمتداولين في السعودية ودول
          الخليج، من المهم التحقق من الأنظمة
          المالية المحلية قبل التعامل مع
          أي شركة تعرض خدمات التداول.

          فالترخيص الدولي للوسيط لا يحل محل
          التصاريح المحلية المطلوبة عندما
          يكون النشاط خاضعاً لها.

        </Paragraph>

        <Paragraph>

          في السعودية يمكن مراجعة{" "}

          <a
            href="https://cma.org.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#176ac8] hover:underline"
          >
            هيئة السوق المالية السعودية CMA
          </a>

          {" "}للاطلاع على المؤسسات المرخص
          لها والتحذيرات المتعلقة بالأنشطة
          غير المصرح بها.

        </Paragraph>

        <Paragraph>

          وفي الإمارات، ينبغي التمييز بين
          الجهات التنظيمية المختلفة ونطاق
          اختصاص كل منها، بما في ذلك{" "}

          <Link
            href="/licenses/dfsa"
            className="font-bold text-[#176ac8] hover:underline"
          >
            سلطة دبي للخدمات المالية DFSA
          </Link>

          {" "}و{" "}

          <Link
            href="/licenses/adgm-fsra"
            className="font-bold text-[#176ac8] hover:underline"
          >
            سلطة تنظيم الخدمات المالية في أبوظبي FSRA
          </Link>

          ، إلى جانب الجهات الاتحادية المختصة.

        </Paragraph>

        <SubHeading>
          هل عدم وجود الشركة في قائمة التحذيرات يعني أنها آمنة؟
        </SubHeading>

        <Paragraph>

          لا. تعكس قوائم التحذيرات الجهات التي
          أصبحت معروفة للسلطات الرقابية أو
          صدرت بشأنها تنبيهات رسمية.

          قد تكون هناك مواقع أو جهات حديثة
          لم يتم اكتشافها أو إصدار تحذير
          بشأنها بعد.

        </Paragraph>

        <Paragraph>

          لذلك يجب البحث عن إثبات إيجابي
          للترخيص والصلاحية القانونية، بدلاً
          من الاكتفاء بعدم وجود اسم الشركة
          في قائمة التحذيرات.

        </Paragraph>

        <a
          href="https://www.fca.org.uk/consumers/warning-list-unauthorised-firms"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-[#176ac8] hover:underline"
        >
          الاطلاع على قائمة التحذيرات الرسمية لدى FCA ↗
        </a>

      </ArticleSection>

      {/* =====================================================
          SECTION 7 – BROKER COMPARISON
      ====================================================== */}

      <ArticleSection
        id="broker-comparison"
        eyebrow="المقارنة العملية"
        title="ما الفرق بين شركة التداول المرخصة والمنصة المشبوهة؟"
      >

        <Paragraph>

          يساعد فهم الفروقات بين الممارسات
          المعتادة لدى الوسطاء الذين يعملون
          بشفافية وبين مؤشرات الاحتيال على
          اتخاذ قرارات أكثر وعياً.

          ولا يتعلق الأمر بشكل الموقع أو حجم
          الإعلانات، بل بقدرة المتداول على
          التحقق من المعلومات القانونية
          والمالية التي تقدمها الشركة.

        </Paragraph>

        <BrokerTransparencyTable />

        <SubHeading>
          هل الترخيص المالي يمنع جميع المشكلات؟
        </SubHeading>

        <Paragraph>

          يوفر الترخيص المالي إطاراً رقابياً
          يخضع له الوسيط وفق القواعد المطبقة
          في الولاية القضائية المعنية.

          وقد يتضمن هذا الإطار متطلبات تتعلق
          برأس المال وحماية أموال العملاء
          والإفصاح عن المخاطر والتعامل مع
          الشكاوى.

        </Paragraph>

        <Paragraph>

          لكن وجود الترخيص لا يعني أن الوسيط
          لن يواجه مشكلات تشغيلية أو شكاوى،
          كما لا يعني أن العميل لن يتعرض
          لخسائر ناتجة عن التداول.

          وتختلف حقوق العملاء وآليات التعويض
          وتسوية النزاعات وفق الجهة الرقابية
          والكيان القانوني وطبيعة المنتج.

        </Paragraph>

        <SubHeading>
          هل الشركات التي تحمل تراخيص خارجية تعتبر نصابة؟
        </SubHeading>

        <Paragraph>

          لا يمكن اعتبار جميع الشركات التي
          تحمل تراخيص من ولايات قضائية
          خارجية شركات احتيالية.

          لكن مستوى الرقابة ومتطلبات حماية
          العملاء وآليات فض النزاعات قد
          يختلف بصورة كبيرة بين الجهات
          التنظيمية.

        </Paragraph>

        <Paragraph>

          يجب تقييم الترخيص بناءً على الجهة
          التي أصدرته وحالته والأنشطة التي
          يغطيها والكيان الذي سيقدم الخدمة
          فعلياً للعميل.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 8 – CHOOSE A BROKER
      ====================================================== */}

      <ArticleSection
        id="choose-a-broker"
        eyebrow="البحث والمقارنة قبل فتح الحساب"
        title="كيف تختار شركة تداول مناسبة وتتجنب الوسطاء المشبوهين؟"
      >

        <Paragraph>

          بعد استبعاد الشركات التي تظهر بشأنها
          مؤشرات احتيال أو لا يمكن التحقق من
          هويتها القانونية، تبدأ مرحلة المقارنة
          بين الوسطاء الذين تتوافق خدماتهم
          مع متطلباتك.

          ولا ينبغي أن تعتمد هذه المقارنة على
          الترخيص وحده أو الحد الأدنى للإيداع
          أو قيمة المكافآت والعروض الترويجية.

        </Paragraph>

        <Paragraph>

          يوفر بروكر العرب صفحات تقييم تفصيلية
          لشركات التداول تتناول التراخيص
          المالية وأنواع الحسابات والمنصات
          والرسوم وشروط الإيداع والسحب.

          ويمكن استخدام هذه المعلومات كنقطة
          بداية للبحث والمقارنة، إلى جانب
          التحقق المستقل من المصادر الرسمية.

        </Paragraph>

        <FeaturedBrokerReviews />

        <SubHeading>
          أهم المعايير عند مقارنة شركات التداول
        </SubHeading>

        <GuideTable
          headers={[
            "المعيار",
            "السؤال الذي يجب أن تطرحه",
          ]}
          rows={[
            [
              "التنظيم المالي",
              "ما الكيان القانوني الذي سيقدم لي الخدمة؟",
            ],
            [
              "حماية أموال العملاء",
              "ما سياسة حفظ أموال العملاء وما الحماية التي تنطبق على حسابي؟",
            ],
            [
              "تكاليف التداول",
              "ما السبريد والعمولات ورسوم التبييت والرسوم الأخرى؟",
            ],
            [
              "الإيداع والسحب",
              "ما وسائل الدفع وشروط معالجة طلبات السحب؟",
            ],
            [
              "أنواع الحسابات",
              "هل تتوافق خصائص الحساب مع خبرتي ورأس مالي؟",
            ],
            [
              "الرافعة المالية",
              "ما المخاطر المرتبطة بالرافعة ومتطلبات الهامش؟",
            ],
            [
              "الشكاوى والدعم",
              "كيف يمكنني تقديم شكوى رسمية؟",
            ],
          ]}
        />

        <Paragraph>

          يساعدك الاطلاع على عدة خيارات في
          تجنب اتخاذ قرار متسرع نتيجة مكالمة
          تسويقية أو إعلان جذاب.

          يمكنك كذلك استخدام{" "}

          <Link
            href="/compare-accounts"
            className="font-bold text-[#176ac8] hover:underline"
          >
            أداة مقارنة حسابات التداول
          </Link>

          {" "}لدراسة الفروقات بين الحسابات
          وتكاليفها وخصائصها قبل اختيار الوسيط.

        </Paragraph>

        <Paragraph>

          ومن المهم تذكر أن انخفاض تكاليف
          التداول أو ارتفاع تقييم الشركة
          لا يلغي ضرورة التحقق من الترخيص
          والكيان القانوني المناسب لدولتك.

        </Paragraph>

        <Link
          href="/how-we-review-brokers"
          className="inline-flex items-center gap-2 font-bold text-[#176ac8] hover:underline"
        >
          اطلع على منهجية بروكر العرب في تقييم شركات التداول ←
        </Link>

      </ArticleSection>

      {/* =====================================================
          SECTION 9 – PRE-DEPOSIT CHECKLIST
      ====================================================== */}

      <ArticleSection
        id="before-deposit"
        eyebrow="قائمة فحص تفاعلية"
        title="10 أمور يجب التحقق منها قبل إيداع الأموال لدى شركة التداول"
      >

        <Paragraph>

          سواء كنت تستعد لفتح أول حساب تداول
          حقيقي أو تفكر في الانتقال إلى وسيط
          جديد، فمن المفيد مراجعة العناصر
          التالية قبل تحويل أي مبلغ مالي.

          يمكنك استخدام القائمة مباشرة ووضع
          علامة أمام كل بند بعد إتمامه.

        </Paragraph>

        <PreDepositChecklist />

        <SubHeading>
          أسئلة يمكنك إرسالها إلى شركة التداول قبل التسجيل
        </SubHeading>

        <Paragraph>

          إذا لم تجد المعلومات المطلوبة
          في الموقع الإلكتروني، يمكنك
          طلبها كتابياً عبر قنوات
          التواصل الرسمية للشركة.

        </Paragraph>

        <div className="my-7 rounded-[16px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

          <div className="mb-3 text-[12px] font-bold text-[#176ac8]">
            نموذج رسالة جاهزة للمتداول
          </div>

          <div className="rounded-[12px] border border-[#dce6ef] bg-white p-5 text-[14px] leading-9 text-[#475569] sm:text-[15px]">

            <p className="mb-3 font-bold text-[#102747]">
              مرحباً،
            </p>

            <p className="mb-4">
              أرغب في الحصول على المعلومات التالية
              قبل فتح حساب تداول لدى شركتكم:
            </p>

            <ol className="list-decimal space-y-2 ps-5">

              <li>
                الاسم القانوني الكامل للكيان الذي سيقدم لي الخدمة.
              </li>

              <li>
                اسم الجهة الرقابية ورقم الترخيص المرتبط بهذا الكيان.
              </li>

              <li>
                رابط السجل الرسمي للتحقق من الترخيص.
              </li>

              <li>
                تأكيد أهلية العملاء المقيمين في دولتي للحصول على الخدمة.
              </li>

              <li>
                نسخة من اتفاقية العميل وشروط الإيداع والسحب والرسوم.
              </li>

              <li>
                آلية تقديم الشكاوى والجهة المختصة بالنظر في النزاعات.
              </li>

            </ol>

            <p className="mt-4">
              مع الشكر.
            </p>

          </div>

        </div>

        <Paragraph>

          الحصول على إجابات واضحة لا يمثل
          إثباتاً نهائياً لموثوقية الشركة،
          لكنه يوفر معلومات يمكن استخدامها
          في عملية التحقق المستقل.

          أما رفض تقديم التفاصيل الأساسية
          أو الضغط عليك للإيداع قبل الإجابة
          فيستحق التوقف وإعادة النظر.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 10 – WITHDRAWAL PROBLEMS
      ====================================================== */}

      <ArticleSection
        id="withdrawal-problems"
        eyebrow="مشكلات الإيداع والسحب"
        title="هل تأخر سحب الأموال يعني أن شركة التداول نصابة؟"
      >

        <Paragraph>

          يعد تأخر السحب من أكثر الأسباب
          التي تدفع المتداولين إلى البحث
          عما إذا كانت شركة التداول التي
          يتعاملون معها نصابة.

          ومع ذلك، ينبغي التمييز بين التأخر
          الناتج عن إجراءات تشغيلية أو
          تنظيمية وبين الممارسات التي
          تشير إلى احتمال الاحتيال.

        </Paragraph>

        <SubHeading>
          أسباب قد تؤدي إلى تأخير مشروع في معالجة السحب
        </SubHeading>

        <ArticleList
          items={[
            "عدم اكتمال إجراءات التحقق من هوية العميل.",
            "طلب مستندات إضافية ضمن متطلبات مكافحة غسل الأموال.",
            "وجود صفقات مفتوحة أو هامش مستخدم يؤثر في الرصيد المتاح.",
            "التحقق من ملكية وسيلة الدفع المستخدمة.",
            "العطلات الرسمية وأوقات معالجة التحويلات البنكية.",
            "وجود مراجعة أمنية مرتبطة بعملية دفع أو تغيير بيانات الحساب.",
          ]}
        />

        <Paragraph>

          ينبغي أن تكون هذه الإجراءات
          متوافقة مع الشروط والقواعد
          المطبقة على الحساب، وأن يستطيع
          العميل الحصول على تفسير واضح
          من الشركة حول سبب التأخير.

        </Paragraph>

        <GuideTable
          headers={[
            "الحالة",
            "التفسير المحتمل",
            "الإجراء المناسب",
          ]}
          rows={[
            [
              "طلب وثيقة هوية إضافية",
              "إجراء تحقق محتمل",
              "استخدم بوابة الشركة الرسمية بعد التحقق من هويتها.",
            ],
            [
              "تأخر التحويل خلال عطلة",
              "تأخير تشغيلي محتمل",
              "راجع مدة المعالجة المعلنة.",
            ],
            [
              "عدم الرد على طلبات السحب",
              "مؤشر يستحق التصعيد",
              "قدم شكوى مكتوبة واحتفظ برقمها.",
            ],
            [
              "طلب إيداع جديد لتحرير الأرباح",
              "مؤشر خطر مرتفع",
              "أوقف التحويلات وتحقق بصورة مستقلة.",
            ],
            [
              "طلب ضريبة إلى حساب شخصي",
              "مؤشر احتيال محتمل",
              "لا تدفع وتواصل مع الجهات المختصة.",
            ],
            [
              "إغلاق الحساب وقطع التواصل",
              "مؤشر يستدعي التحقيق",
              "احفظ الأدلة وقدم بلاغاً.",
            ],
          ]}
        />

        <SubHeading>
          ماذا تفعل إذا رفضت الشركة تنفيذ طلب السحب؟
        </SubHeading>

        <Paragraph>

          اطلب توضيحاً مكتوباً يحدد سبب
          الرفض والمادة أو السياسة التي
          تستند إليها الشركة والإجراءات
          التي يمكنك اتخاذها لمعالجة
          المشكلة.

          إذا لم تحصل على تفسير مقنع،
          استخدم مسار الشكاوى الرسمي
          لدى الشركة والجهة التنظيمية
          المختصة.

        </Paragraph>

        <Note
          title="لا ترسل أموالاً جديدة لتحرير الرصيد"
          tone="blue"
        >

          إذا اشترطت جهة مشبوهة تحويل أموال
          جديدة بحجة دفع ضريبة الأرباح أو
          فك تجميد الحساب، فلا تعتمد على
          وعودها بإعادة الرصيد بعد الدفع.

          تحقق بصورة مستقلة من الأمر مع
          البنك أو الجهة الضريبية أو
          الرقابية المختصة.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 11 – FRAUD RESPONSE
      ====================================================== */}

      <ArticleSection
        id="what-to-do-if-scammed"
        eyebrow="التصرف عند الاشتباه بالاحتيال"
        title="ماذا تفعل إذا تعرضت للنصب من شركة تداول؟"
      >

        <Paragraph>

          إذا كنت تعتقد أنك تعرضت للاحتيال،
          فإن الأولوية هي منع خسائر إضافية
          وحماية حساباتك المالية، ثم
          توثيق ما حدث وإبلاغ الجهات
          المختصة في أقرب وقت ممكن.

        </Paragraph>

        <FraudResponseSteps />

        <SubHeading>
          ما المعلومات التي يجب الاحتفاظ بها؟
        </SubHeading>

        <Paragraph>

          يساعد الاحتفاظ بالأدلة على توضيح
          تسلسل الأحداث وتحديد الجهات
          والأطراف المرتبطة بالتحويلات
          المالية.

          حاول جمع المعلومات التالية
          وحفظها بطريقة آمنة:

        </Paragraph>

        <ArticleList
          items={[
            "الاسم التجاري والاسم القانوني المزعوم للشركة.",
            "عنوان الموقع الإلكتروني وروابط المنصات المستخدمة.",
            "أرقام الهواتف وعناوين البريد الإلكتروني.",
            "نسخ المحادثات والرسائل المتعلقة بالوعود وطلبات الدفع.",
            "إيصالات التحويل البنكي ومعاملات البطاقات.",
            "عناوين المحافظ الرقمية ومعرفات المعاملات عند استخدامها.",
            "كشوف التداول وصور طلبات السحب والردود عليها.",
            "أرقام الشكاوى والتواريخ والمبالغ ذات الصلة.",
          ]}
        />

        <Paragraph>

          لا تنشر بياناتك البنكية أو وثائق
          هويتك على مواقع التواصل الاجتماعي
          بهدف طلب المساعدة، ولا ترسلها
          إلى أشخاص مجهولين يدعون أنهم
          متخصصون في استرداد الأموال.

        </Paragraph>

        <SubHeading>
          هل يمكن استرجاع الأموال من شركات التداول النصابة؟
        </SubHeading>

        <Paragraph>

          تختلف إمكانية استرداد الأموال
          حسب طريقة الدفع وتوقيت اكتشاف
          الاحتيال والجهة التي استلمت
          الأموال والقوانين والإجراءات
          المطبقة في الدول ذات الصلة.

        </Paragraph>

        <GuideTable
          headers={[
            "طريقة الدفع",
            "الإجراء الذي يمكنك الاستفسار عنه",
          ]}
          rows={[
            [
              "البطاقة البنكية",
              "إبلاغ البنك والاستفسار عن إمكانية الاعتراض على العملية.",
            ],
            [
              "التحويل البنكي",
              "طلب إيقاف أو استدعاء التحويل إن كان ذلك ممكناً.",
            ],
            [
              "مزود دفع إلكتروني",
              "فتح بلاغ رسمي ومراجعة سياسة الاعتراض وتسوية النزاعات.",
            ],
            [
              "العملات الرقمية",
              "إبلاغ المنصة والجهات المختصة وتقديم معرفات المعاملات.",
            ],
          ]}
          caption="لا تمثل الإجراءات المذكورة ضماناً لاسترداد الأموال. تختلف الحقوق والمهل وإمكانية عكس المعاملات بحسب الظروف وطريقة الدفع."
        />

        <Paragraph>

          قد يصعب استرداد بعض التحويلات
          بعد تنفيذها، خصوصاً إذا انتقلت
          الأموال بين عدة جهات.

          ومع ذلك، فإن التواصل السريع مع
          البنك أو مزود الدفع والسلطات
          المختصة يساعد على دراسة
          الخيارات المتاحة.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 12 – RECOVERY SCAMS
      ====================================================== */}

      <ArticleSection
        id="recovery-scams"
        eyebrow="احتيال استرداد الأموال"
        title="احذر شركات استرداد الأموال الوهمية بعد التعرض للنصب"
      >

        <Paragraph>

          قد لا تنتهي عملية الاحتيال بعد
          خسارة الأموال لدى منصة تداول
          مشبوهة.

          ففي بعض الحالات، يتلقى المتضرر
          اتصالاً من شخص يدعي أنه محامٍ
          أو ممثل لجهة رقابية أو موظف
          في شركة متخصصة باسترداد الأموال.

        </Paragraph>

        <Paragraph>

          ويعرض عليه المساعدة في استعادة
          أمواله مقابل رسوم أولية أو دفعة
          مالية بحجة تغطية تكاليف قانونية
          أو إدارية.

          وتعرف هذه الممارسات باسم احتيال
          استرداد الأموال، وهي من الأساليب
          التي حذرت منها هيئة السلوك
          المالي البريطانية FCA.

        </Paragraph>

        <div className="my-8 rounded-[18px] border border-[#fecaca] bg-[#fff7f7] p-5 sm:p-7">

          <h3 className="mb-5 text-[21px] font-black leading-9 text-[#102747] sm:text-[25px]">
            لا تجعل محاولة استرداد أموالك سبباً لخسارة أموال إضافية
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {[
              "ادعاء القدرة على استرداد الأموال بنسبة 100%.",
              "طلب تحويل رسوم إلى حساب شخصي مجهول.",
              "ادعاء العمل لصالح جهة رقابية دون إثبات مستقل.",
              "امتلاك معلومات عن خسارتك دون تفسير مصدرها.",
              "طلب كلمات مرور الحسابات أو رموز التحقق.",
              "الضغط عليك للدفع قبل مراجعة الاتفاقية القانونية.",
            ].map((item) => (

              <div
                key={item}
                className="flex items-start gap-3 rounded-[11px] border border-[#fecaca] bg-white p-4"
              >

                <span className="text-[17px] font-black text-[#b91c1c]">
                  !
                </span>

                <span className="text-[13px] font-bold leading-7 text-[#475569]">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        <Paragraph>

          وجود رسوم قانونية لدى محامٍ حقيقي
          لا يعني تلقائياً وجود احتيال.

          لكن ينبغي التحقق من هويته وترخيصه
          واختصاصه واتفاقية الأتعاب، وعدم
          الاعتماد على وعود بضمان
          نتيجة الاسترداد.

        </Paragraph>

        <Paragraph>

          وإذا ادعى شخص أنه يمثل جهة رقابية،
          تواصل مع الجهة نفسها باستخدام
          معلومات الاتصال التي تحصل عليها
          من موقعها الرسمي.

        </Paragraph>

        <a
          href="https://www.fca.org.uk/consumers/recovery-room-scams"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-[#176ac8] hover:underline"
        >
          اقرأ التحذير الرسمي بشأن احتيال استرداد الأموال ↗
        </a>

      </ArticleSection>

      {/* =====================================================
          SECTION 13 – EDITORIAL CONCLUSION
      ====================================================== */}

      <ArticleSection
        id="editorial-conclusion"
        eyebrow="رؤية فريق تحليلات بروكر العرب"
        title="خلاصة بروكر العرب: كيف تحمي أموالك عند اختيار شركة التداول؟"
      >

        <Paragraph>

          لا تبدأ حماية المتداول من خلال
          اختيار استراتيجية تداول ناجحة أو
          البحث عن أفضل توصية على الذهب
          والعملات، بل تبدأ قبل ذلك بكثير،
          عند تحديد الجهة التي سيعهد
          إليها بأمواله.

        </Paragraph>

        <Paragraph>

          إن قضاء وقت إضافي في التحقق
          من ترخيص الوسيط وهويته القانونية
          وشروطه المالية قد يكون أكثر
          أهمية من الاستعجال في الاستفادة
          من فرصة تداول يروج لها
          أحد الأشخاص.

        </Paragraph>

        <Paragraph>

          ومن وجهة نظر فريق تحليلات
          بروكر العرب، ينبغي أن تستند
          عملية اختيار شركة التداول إلى
          أربعة محاور أساسية:

        </Paragraph>

        <div className="my-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {[
            {
              number: "01",
              title: "التحقق المستقل",
              description:
                "مراجعة هوية الشركة وترخيصها لدى الجهات الرسمية دون الاكتفاء بالمعلومات التسويقية.",
            },
            {
              number: "02",
              title: "فهم الشروط المالية",
              description:
                "معرفة التكاليف وسياسات الإيداع والسحب والحقوق والالتزامات قبل فتح الحساب.",
            },
            {
              number: "03",
              title: "المقارنة بين الخيارات",
              description:
                "دراسة الفروقات بين الوسطاء والحسابات والكيانات القانونية دون الاستعجال.",
            },
            {
              number: "04",
              title: "إدارة المخاطر",
              description:
                "فهم طبيعة المنتجات المالية والرافعة المالية وعدم استخدام أموال لا تتحمل خسارتها.",
            },
          ].map((item) => (

            <div
              key={item.number}
              className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] p-5"
            >

              <div
                dir="ltr"
                className="mb-3 text-[26px] font-black text-[#176ac8]"
              >
                {item.number}
              </div>

              <h3 className="mb-2 text-[17px] font-black text-[#102747]">
                {item.title}
              </h3>

              <p className="text-[13px] leading-7 text-[#475569]">
                {item.description}
              </p>

            </div>

          ))}

        </div>

        <Paragraph>

          لا يوجد وسيط مالي يمكنه إلغاء
          مخاطر السوق أو ضمان الأرباح.

          لكن بإمكان المتداول تقليل تعرضه
          لمخاطر الاحتيال من خلال التحقق
          المبكر والبحث المستقل وفهم
          طبيعة العلاقة القانونية والمالية
          التي يدخل فيها عند فتح حساب تداول.

        </Paragraph>

        <RelatedGuides />

        <Note title="تذكر دائماً" tone="blue">

          خسارة فرصة تداول محتملة أقل خطورة
          من تحويل أموالك إلى جهة لا تعرف
          هويتها ولا تستطيع التحقق من
          صلاحيتها لتقديم الخدمة.

          خذ قرارك بناءً على المعلومات
          والوثائق، وليس تحت تأثير الوعود
          أو الضغط التسويقي.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 14 – FAQ
      ====================================================== */}

      <ArticleSection
        id="faq"
        eyebrow="أسئلة وأجوبة"
        title="الأسئلة الشائعة حول شركات التداول النصابة"
      >

        <ArticleFAQ />

      </ArticleSection>

      {/* =====================================================
          SECTION 15 – SOURCES
      ====================================================== */}

      <ArticleSection
        id="sources"
        eyebrow="المنهجية والمراجع الرسمية"
        title="المصادر والمنهجية التحريرية"
      >

        <Paragraph>

          أعد فريق تحليلات بروكر العرب هذا
          الدليل بالاستناد إلى الإرشادات
          والتحذيرات الصادرة عن جهات
          الرقابة المالية، والمتعلقة
          بالاحتيال في الفوركس والتداول
          الإلكتروني وانتحال هوية
          المؤسسات المالية وعمليات
          استرداد الأموال الوهمية.

        </Paragraph>

        <SubHeading>
          منهجية إعداد الدليل
        </SubHeading>

        <ArticleList
          items={[
            "مراجعة التحذيرات المتعلقة بالاحتيال في الفوركس والتداول الإلكتروني.",
            "تحديد المؤشرات المرتبطة بالهوية القانونية والتراخيص وطرق الدفع والسحب.",
            "إعداد أمثلة افتراضية لتوضيح الممارسات التي تستدعي الاشتباه.",
            "توضيح الفرق بين المخاطر الاستثمارية ومؤشرات الاحتيال المالي.",
            "تقديم إجراءات عملية للتحقق المستقل من شركات التداول.",
            "إدراج روابط الجهات الرقابية ومصادر المعلومات الرسمية.",
            "الفصل بين المحتوى التوعوي وعرض الشركات لأغراض البحث والمقارنة.",
          ]}
        />

        <Paragraph>

          الأمثلة والمبالغ والشركات الافتراضية
          المستخدمة في هذا الدليل أعدت لأغراض
          تعليمية، ولا تمثل ادعاءات أو
          اتهامات موجهة إلى شركات أو أشخاص
          محددين.

          كما لا يمثل الدليل قائمة حصرية
          بجميع أساليب الاحتيال المالي،
          إذ قد تتغير هذه الأساليب مع
          تطور الخدمات والتقنيات المالية.

        </Paragraph>

        <SubHeading>
          المصادر الرسمية
        </SubHeading>

        <ArticleSources />

        <div className="mt-7 rounded-[14px] border border-[#e3eaf1] bg-[#f8fafc] p-5 sm:p-6">

          <h3 className="mb-3 text-[15px] font-black text-[#102747]">
            إخلاء المسؤولية
          </h3>

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            يقدم بروكر العرب هذا المحتوى لأغراض
            التوعية المالية والتعليم والبحث،
            ولا يمثل استشارة قانونية أو مالية
            أو حكماً قانونياً على أي جهة.

            لا يمثل إدراج شركة تداول ضمن الموقع
            أو عرض تقييمها ضماناً لسلامة أموال
            العملاء أو توصية باستخدام خدماتها.

            قد تختلف التراخيص والشروط والحقوق
            التنظيمية بحسب الدولة والكيان
            القانوني والمنتج المالي.

            قد يحصل بروكر العرب على مقابل
            من بعض الشراكات التجارية وروابط
            الإحالة، ولا يقدم الموقع خدمات
            تداول مباشرة أو يحتفظ بأموال العملاء.

            ينطوي تداول الفوركس وعقود الفروقات
            على مخاطر مرتفعة قد تؤدي إلى
            خسارة رأس المال.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}