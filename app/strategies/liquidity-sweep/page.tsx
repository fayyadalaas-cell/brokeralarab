import type { Metadata } from "next";
import type { ReactNode } from "react";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "استراتيجية سحب السيولة Liquidity Sweep في التداول",
  description:
    "شرح استراتيجية سحب السيولة Liquidity Sweep وكيفية تحديد مناطق السيولة، والفرق بين السحب والاختراق الحقيقي، مع أمثلة على الدخول والتأكيد وإدارة المخاطر.",
  keywords: [
    "استراتيجية سحب السيولة",
    "سحب السيولة",
    "Liquidity Sweep",
    "Liquidity Sweep Strategy",
    "Liquidity Grab",
    "Liquidity Grab Strategy",
    "Stop Hunt",
    "Stop Hunting",
    "السيولة في التداول",
    "مناطق السيولة",
    "Buy Side Liquidity",
    "Sell Side Liquidity",
    "Buy-Side Liquidity",
    "Sell-Side Liquidity",
    "Equal Highs",
    "Equal Lows",
    "Smart Money Concepts",
    "SMC Trading",
    "ICT Trading",
    "BOS",
    "CHOCH",
    "Order Block",
    "Fair Value Gap",
    "FVG",
    "استراتيجيات التداول",
    "استراتيجية فوركس",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/strategies/liquidity-sweep",
    languages: {
      ar: "https://brokeralarab.com/strategies/liquidity-sweep",
      en: "https://brokeralarab.com/en/strategies/liquidity-sweep",
    },
  },
 openGraph: {
  title: "استراتيجية سحب السيولة Liquidity Sweep في التداول",
  description:
    "شرح استراتيجية سحب السيولة وكيفية تحديد مناطق السيولة والتمييز بين Liquidity Sweep والاختراق الحقيقي مع أمثلة عملية.",
    url: "https://brokeralarab.com/strategies/liquidity-sweep",
    siteName: "بروكر العرب",
    type: "article",
    locale: "ar_AR",
  },
  twitter: {
  card: "summary_large_image",
  title: "استراتيجية سحب السيولة Liquidity Sweep في التداول",
  description:
    "شرح سحب السيولة ومناطق Buy-Side وSell-Side Liquidity وكيفية قراءة السحب والتأكيد على الشارت.",
},
};

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black tracking-[0.12em] text-[#1E5BB8]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
      {children}
    </div>
  );
}

function ImportantBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-7 rounded-[20px] border border-blue-200 bg-blue-50/50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-black text-[#1E5BB8] shadow-sm">
          i
        </span>

        <div>
          <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
            {title}
          </h3>

          <div className="mt-1.5 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Candle({
  x,
  open,
  close,
  high,
  low,
  bullish,
  width = 20,
}: {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  bullish: boolean;
  width?: number;
}) {
  const top = Math.min(open, close);
  const bodyHeight = Math.max(Math.abs(close - open), 5);

  return (
    <g>
      <line
        x1={x}
        y1={high}
        x2={x}
        y2={low}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2"
      />

      <rect
        x={x - width / 2}
        y={top}
        width={width}
        height={bodyHeight}
        rx="1"
        fill={bullish ? "#ffffff" : "#475569"}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2"
      />
    </g>
  );
}

/* =========================================================
   FAQ DATA — USED IN PART 2
========================================================= */

const faqItems = [
  {
    question: "ما هو سحب السيولة Liquidity Sweep في التداول؟",
    answer:
      "سحب السيولة هو تحرك السعر مؤقتًا فوق مستوى واضح مثل قمة سابقة أو تحت قاع سابق، ثم فشله في الاستقرار خلف المستوى وعودته إلى النطاق السابق. يستخدم المصطلح كثيرًا في Smart Money Concepts وICT.",
  },
  {
    question: "ما الفرق بين Liquidity Sweep وLiquidity Grab؟",
    answer:
      "يستخدم كثير من المتداولين المصطلحين لوصف الحدث نفسه تقريبًا: تجاوز مستوى توجد حوله أوامر متوقعة ثم العودة منه. بعض المدارس تميز بينهما بتفاصيل التنفيذ أو سرعة الحركة، لذلك يجب تحديد التعريف المستخدم في استراتيجية التداول.",
  },
  {
    question: "أين توجد Buy-Side Liquidity؟",
    answer:
      "يبحث المتداولون عادة عن Buy-Side Liquidity فوق القمم السابقة والقمم المتساوية والمستويات العليا الواضحة، حيث قد توجد أوامر وقف للصفقات البيعية وأوامر شراء مرتبطة بالاختراق.",
  },
  {
    question: "أين توجد Sell-Side Liquidity؟",
    answer:
      "يبحث المتداولون عادة عن Sell-Side Liquidity أسفل القيعان السابقة والقيعان المتساوية والمستويات الدنيا الواضحة، حيث قد توجد أوامر وقف للصفقات الشرائية وأوامر بيع مرتبطة بالكسر.",
  },
  {
    question: "هل كل اختراق لقمة أو قاع يعتبر Liquidity Sweep؟",
    answer:
      "لا. تجاوز المستوى وحده غير كافٍ. إذا استقر السعر خلف المستوى واستمر في الاتجاه الجديد فقد يكون الاختراق مقبولًا من السوق بدل أن يكون Sweep. سلوك السعر بعد الاختراق عنصر أساسي في التمييز.",
  },
  {
    question: "هل يجب انتظار CHOCH بعد سحب السيولة؟",
    answer:
      "ليس هناك قاعدة موحدة. بعض الاستراتيجيات تشترط تغيرًا في البنية مثل CHOCH أو MSS، بينما تستخدم استراتيجيات أخرى الإغلاق داخل النطاق أو displacement أو نمط تأكيد مختلف. المهم أن يكون الشرط محددًا وقابلًا للاختبار.",
  },
  {
    question: "هل Equal Highs وEqual Lows تعتبر مناطق سيولة؟",
    answer:
      "في إطار SMC وICT يتم التعامل مع القمم والقيعان المتقاربة أو المتساوية كمناطق محتملة لتجمع الأوامر، ولذلك يراقبها المتداولون عند البحث عن Liquidity Sweep.",
  },
  {
    question: "هل استراتيجية Liquidity Sweep مضمونة؟",
    answer:
      "لا. قد يتجاوز السعر المستوى ويستمر في نفس الاتجاه، وقد يفشل أي تأكيد لاحق. لذلك تحتاج الاستراتيجية إلى قواعد دخول وإبطال وإدارة مخاطر واختبار تاريخي.",
  },
];

/* =========================================================
   STRUCTURED DATA
========================================================= */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
   headline: "استراتيجية سحب السيولة Liquidity Sweep في التداول",
  description:
    "دليل شامل لفهم Liquidity Sweep وLiquidity Grab ومناطق Buy-Side وSell-Side Liquidity والقمم والقيعان المتساوية والفرق بين سحب السيولة والاختراق الحقيقي.",
  inLanguage: "ar",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://brokeralarab.com/strategies/liquidity-sweep",
  },
  author: {
    "@type": "Organization",
    name: "بروكر العرب",
    url: "https://brokeralarab.com",
  },
  publisher: {
    "@type": "Organization",
    name: "بروكر العرب",
    url: "https://brokeralarab.com",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://brokeralarab.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "استراتيجيات التداول",
      item: "https://brokeralarab.com/strategies",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "استراتيجية سحب السيولة",
      item: "https://brokeralarab.com/strategies/liquidity-sweep",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* =========================================================
   PAGE
========================================================= */

export default function LiquiditySweepStrategyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fb] text-slate-900"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <article className="space-y-6 sm:space-y-7">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-l from-[#2563eb] via-[#38bdf8] to-[#2563eb]" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black text-[#1E5BB8]">
                  استراتيجيات التداول
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Smart Money Concepts
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Liquidity
                </span>
              </div>

              <h1 className="mt-6 max-w-[1120px] text-[30px] font-black leading-[1.35] tracking-[-0.025em] text-slate-950 sm:text-[39px] lg:text-[47px]">
  استراتيجية سحب السيولة{" "}
  <span dir="ltr" className="inline-block text-[#1E5BB8]">
    Liquidity Sweep
  </span>{" "}
  في التداول
</h1>

              <p className="mt-5 max-w-[1080px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                سحب السيولة أو{" "}
                <strong dir="ltr">Liquidity Sweep</strong> هو مفهوم يستخدمه
                متداولو حركة السعر وSmart Money Concepts لوصف حالة يتجاوز فيها
                السعر قمة أو قاعًا واضحًا ثم يفشل في الاستقرار خلف المستوى
                ويعود إلى النطاق السابق. فهم هذا السلوك يساعد على قراءة
                الاختراقات الكاذبة، مناطق وقف الخسارة المحتملة، والفرق بين
                سحب السيولة والاختراق الحقيقي.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["01", "مناطق السيولة", "أين يمكن أن تتجمع الأوامر حول القمم والقيعان."],
                  ["02", "Liquidity Sweep", "كيف يتجاوز السعر المستوى ثم يعود داخله."],
                  ["03", "التأكيد", "كيف نقرأ Reclaim وDisplacement وتغير البنية."],
                  ["04", "التنفيذ", "الدخول والإبطال والأهداف وإدارة المخاطر."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h2 className="text-[13px] font-black text-slate-900">
                        {title}
                      </h2>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="الفكرة الأساسية قبل البدء">
                الشارت يوضح أن السعر تجاوز مستوى ثم عاد منه، لكنه لا يكشف
                وحده نية المشاركين في السوق. مصطلحات مثل Stop Hunt أو
                Liquidity Grab هي طريقة لتفسير هذا السلوك ضمن بعض مدارس
                التحليل. لذلك سنركز في هذا الدليل على ما يمكن تحديده وقياسه
                على الرسم البياني.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — WHAT IS LIQUIDITY?
          ================================================= */}

          <section
            id="what-is-liquidity-in-trading"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — السيولة في التداول</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما المقصود بالسيولة في استراتيجية Liquidity Sweep؟
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  كلمة <strong>السيولة</strong> لها معنى واسع في الأسواق
                  المالية، لكنها تستخدم داخل استراتيجيات Smart Money Concepts
                  بصورة أكثر تحديدًا للإشارة إلى مستويات يعتقد المتداولون أن
                  حولها عددًا ملحوظًا من الأوامر.
                </p>

                <p>
                  تخيل قمة سعرية واضحة. المتداول الذي باع قرب القمة قد يضع
                  وقف خسارته فوقها، بينما متداول الاختراق قد يضع أمر شراء فوق
                  المستوى نفسه. لذلك تصبح المنطقة أعلى القمة مستوى مهمًا
                  لمراقبة سلوك السعر.
                </p>

                <p>
                  والعكس يحدث أسفل القيعان: قد توجد أوامر وقف للمتداولين
                  المشترين بالإضافة إلى أوامر بيع من متداولي الكسر. لهذا
                  يركز تحليل السيولة على <strong>أماكن وجود الأوامر المحتملة</strong>{" "}
                  وليس فقط على شكل الشمعة نفسها.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                      BSL
                    </span>

                    <h3 className="text-[15px] font-black text-slate-900">
                      Buy-Side Liquidity
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    تشير عادة إلى السيولة المحتملة الموجودة{" "}
                    <strong>فوق القمم</strong>. تشمل الأمثلة القمم السابقة،
                    Equal Highs، وأعلى نطاقات واضحة يراقبها عدد كبير من
                    المتداولين.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-700 shadow-sm">
                      SSL
                    </span>

                    <h3 className="text-[15px] font-black text-slate-900">
                      Sell-Side Liquidity
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    تشير عادة إلى السيولة المحتملة الموجودة{" "}
                    <strong>أسفل القيعان</strong>. تشمل القيعان السابقة،
                    Equal Lows، وأسفل النطاقات الواضحة التي قد توجد خلفها
                    أوامر وقف أو أوامر كسر.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              02 — BUY SIDE VS SELL SIDE CHART
          ================================================= */}

          <section
            id="buy-side-vs-sell-side-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — أنواع السيولة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما الفرق بين Buy-Side Liquidity وSell-Side Liquidity؟
              </h2>

              <p className="mt-4 max-w-[1100px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                أبسط طريقة لفهمهما هي النظر إلى موقع مستوى السيولة بالنسبة
                للسعر: <strong>Buy-Side Liquidity</strong> تُراقب فوق القمم،
                بينما <strong>Sell-Side Liquidity</strong> تُراقب أسفل القيعان.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 560"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Buy-side liquidity above highs and sell-side liquidity below lows"
                >
                  <defs>
                    <pattern
                      id="liquidityTypesGridAr"
                      width="59"
                      height="56"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 56"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="560" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="560"
                    fill="url(#liquidityTypesGridAr)"
                  />

                  {/* LEFT PANEL */}
                  <rect
                    x="30"
                    y="25"
                    width="545"
                    height="510"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="60"
                    y="66"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                    direction="ltr"
                  >
                    BUY-SIDE LIQUIDITY
                  </text>

                  <text
                    x="60"
                    y="90"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                    direction="ltr"
                  >
                    Liquidity watched above visible highs
                  </text>

                  {/* Buy-side liquidity area */}
                  <rect
                    x="95"
                    y="125"
                    width="415"
                    height="64"
                    rx="9"
                    fill="#dbeafe"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  <text
                    x="112"
                    y="151"
                    fontSize="10"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BUY-SIDE LIQUIDITY
                  </text>

                  <text
                    x="112"
                    y="170"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    STOPS + BREAKOUT ORDERS MAY CLUSTER ABOVE HIGHS
                  </text>

                  <Candle x={135} open={360} close={325} high={308} low={378} bullish />
                  <Candle x={180} open={323} close={282} high={265} low={340} bullish />
                  <Candle x={225} open={280} close={239} high={222} low={297} bullish />
                  <Candle x={270} open={238} close={274} high={216} low={291} bullish={false} />
                  <Candle x={315} open={272} close={236} high={218} low={289} bullish />
                  <Candle x={360} open={235} close={270} high={217} low={287} bullish={false} />
                  <Candle x={405} open={268} close={232} high={215} low={285} bullish />

                  <line
                    x1="245"
                    y1="214"
                    x2="430"
                    y2="214"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <text
                    x="337"
                    y="205"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    VISIBLE HIGHS
                  </text>

                  <line
                    x1="337"
                    y1="189"
                    x2="337"
                    y2="214"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="302"
                    y="475"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    LIQUIDITY IS MONITORED ABOVE THE HIGHS
                  </text>

                  {/* RIGHT PANEL */}
                  <rect
                    x="605"
                    y="25"
                    width="545"
                    height="510"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="635"
                    y="66"
                    fontSize="18"
                    fontWeight="900"
                    fill="#475569"
                    direction="ltr"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  <text
                    x="635"
                    y="90"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                    direction="ltr"
                  >
                    Liquidity watched below visible lows
                  </text>

                  <Candle x={670} open={190} close={225} high={173} low={242} bullish={false} />
                  <Candle x={715} open={227} close={267} high={210} low={284} bullish={false} />
                  <Candle x={760} open={269} close={309} high={252} low={326} bullish={false} />
                  <Candle x={805} open={310} close={274} high={257} low={327} bullish />
                  <Candle x={850} open={276} close={312} high={259} low={329} bullish={false} />
                  <Candle x={895} open={313} close={277} high={260} low={330} bullish />
                  <Candle x={940} open={279} close={315} high={262} low={332} bullish={false} />

                  <line
                    x1="785"
                    y1="334"
                    x2="970"
                    y2="334"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <text
                    x="877"
                    y="354"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    VISIBLE LOWS
                  </text>

                  {/* Sell-side liquidity area */}
                  <rect
                    x="670"
                    y="374"
                    width="415"
                    height="64"
                    rx="9"
                    fill="#eef2f7"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="687"
                    y="400"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  <text
                    x="687"
                    y="419"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    STOPS + BREAKDOWN ORDERS MAY CLUSTER BELOW LOWS
                  </text>

                  <line
                    x1="877"
                    y1="334"
                    x2="877"
                    y2="374"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="877"
                    y="475"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    LIQUIDITY IS MONITORED BELOW THE LOWS
                  </text>
                </svg>
              </div>

              <ImportantBox title="مستوى السيولة ليس إشارة دخول بحد ذاته">
                وجود قمة أو قاع واضح لا يعني أن السعر يجب أن ينعكس عنده أو
                بعد تجاوزه. المستوى يخبرنا فقط بمكان يستحق المراقبة، أما
                قرار التداول فيعتمد على ما يفعله السعر عند الوصول إليه وبعده.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — WHAT IS A LIQUIDITY SWEEP?
          ================================================= */}

          <section
            id="what-is-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Liquidity Sweep</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما هو سحب السيولة Liquidity Sweep وكيف يحدث؟
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يحدث <strong>Liquidity Sweep</strong> عندما يتداول السعر
                  خلف مستوى واضح للسيولة — مثل قمة سابقة أو قاع سابق — ثم
                  يفشل في الحفاظ على التداول خلف ذلك المستوى ويعود إلى
                  النطاق السابق.
                </p>

                <p>
                  الشكل الكلاسيكي قد يظهر على هيئة ذيل شمعة يتجاوز المستوى
                  ثم إغلاق داخله، لكن ليس من الضروري أن يكون كل Sweep شمعة
                  واحدة. بعض النماذج تسمح بعدة شموع قبل حدوث الاسترداد
                  <strong> Reclaim</strong>.
                </p>

                <p>
                  لذلك لا يكفي أن نقول إن السعر لمس مستوى السيولة. التسلسل
                  الأكثر أهمية هو:
                  <strong>
                    {" "}
                    مستوى واضح → تجاوز المستوى → فشل في الاستمرار → عودة
                    داخل النطاق → تأكيد محتمل.
                  </strong>
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["01", "Liquidity Pool", "حدد أولًا القمة أو القاع الذي يمثل مستوى واضحًا."],
                  ["02", "Approach", "يرتفع أو ينخفض السعر باتجاه المستوى."],
                  ["03", "Sweep", "يتجاوز السعر القمة أو القاع."],
                  ["04", "Reclaim", "يفشل السعر في الثبات ويعود داخل المستوى."],
                  ["05", "Confirmation", "يبحث المتداول عن التأكيد المحدد في استراتيجيته."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              04 — BULLISH & BEARISH SWEEP CHART
          ================================================= */}

          <section
            id="bullish-bearish-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — أنواع سحب السيولة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                Bullish Liquidity Sweep وBearish Liquidity Sweep
              </h2>

              <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                في النموذج الصاعد، ينخفض السعر أسفل قاع واضح ويسحب
                Sell-Side Liquidity ثم يستعيد المستوى. وفي النموذج الهابط،
                يتجاوز السعر قمة واضحة ويسحب Buy-Side Liquidity ثم يعود
                أسفلها.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 590"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bullish and bearish liquidity sweep candlestick examples"
                >
                  <defs>
                    <pattern
                      id="sweepTypesGridAr"
                      width="59"
                      height="59"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 59"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="590" fill="#ffffff" />
                  <rect width="1180" height="590" fill="url(#sweepTypesGridAr)" />

                  {/* ===========================
                      LEFT — BULLISH SWEEP
                  ============================ */}

                  <rect
                    x="30"
                    y="25"
                    width="545"
                    height="535"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="60"
                    y="65"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                    direction="ltr"
                  >
                    BULLISH LIQUIDITY SWEEP
                  </text>

                  <text
                    x="60"
                    y="89"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                    direction="ltr"
                  >
                    Sell-side liquidity is swept below a visible low
                  </text>

                  <line
                    x1="90"
                    y1="340"
                    x2="510"
                    y2="340"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="105"
                    y="326"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    PREVIOUS LOW / SELL-SIDE LIQUIDITY
                  </text>

                  <Candle x={115} open={185} close={222} high={168} low={239} bullish={false} />
                  <Candle x={160} open={224} close={263} high={207} low={280} bullish={false} />
                  <Candle x={205} open={265} close={302} high={248} low={319} bullish={false} />
                  <Candle x={250} open={304} close={330} high={287} low={347} bullish={false} />

                  {/* Sweep candle */}
                  <line
                    x1="305"
                    y1="308"
                    x2="305"
                    y2="430"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="294"
                    y="326"
                    width="22"
                    height="37"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="305"
                    cy="401"
                    r="15"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="305"
                    y="405"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    SW
                  </text>

                  <line
                    x1="305"
                    y1="416"
                    x2="305"
                    y2="468"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="305"
                    y="486"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    LIQUIDITY SWEEP
                  </text>

                  {/* Bullish reaction */}
                  <Candle x={355} open={360} close={305} high={287} low={377} bullish width={22} />
                  <Candle x={405} open={303} close={245} high={228} low={320} bullish width={22} />
                  <Candle x={455} open={243} close={185} high={168} low={260} bullish width={22} />
                  <Candle x={505} open={183} close={138} high={121} low={200} bullish width={22} />

                  <rect
                    x="393"
                    y="112"
                    width="135"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="460"
                    y="132"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BULLISH REACTION
                  </text>

                  {/* ===========================
                      RIGHT — BEARISH SWEEP
                  ============================ */}

                  <rect
                    x="605"
                    y="25"
                    width="545"
                    height="535"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="635"
                    y="65"
                    fontSize="18"
                    fontWeight="900"
                    fill="#475569"
                    direction="ltr"
                  >
                    BEARISH LIQUIDITY SWEEP
                  </text>

                  <text
                    x="635"
                    y="89"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                    direction="ltr"
                  >
                    Buy-side liquidity is swept above a visible high
                  </text>

                  <line
                    x1="665"
                    y1="215"
                    x2="1085"
                    y2="215"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="680"
                    y="200"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    PREVIOUS HIGH / BUY-SIDE LIQUIDITY
                  </text>

                  <Candle x={690} open={360} close={320} high={303} low={377} bullish />
                  <Candle x={735} open={318} close={278} high={261} low={335} bullish />
                  <Candle x={780} open={276} close={238} high={221} low={293} bullish />
                  <Candle x={825} open={236} close={218} high={201} low={253} bullish />

                  {/* Sweep candle */}
                  <line
                    x1="880"
                    y1="128"
                    x2="880"
                    y2="251"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="869"
                    y="190"
                    width="22"
                    height="38"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="880"
                    cy="157"
                    r="15"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="880"
                    y="161"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SW
                  </text>

                  <line
                    x1="880"
                    y1="142"
                    x2="880"
                    y2="108"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="880"
                    y="99"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    LIQUIDITY SWEEP
                  </text>

                  {/* Bearish reaction */}
                  <Candle x={930} open={225} close={280} high={208} low={297} bullish={false} width={22} />
                  <Candle x={980} open={282} close={340} high={265} low={357} bullish={false} width={22} />
                  <Candle x={1030} open={342} close={400} high={325} low={417} bullish={false} width={22} />
                  <Candle x={1080} open={402} close={446} high={385} low={463} bullish={false} width={22} />

                  <rect
                    x="960"
                    y="468"
                    width="140"
                    height="31"
                    rx="15.5"
                    fill="#475569"
                  />

                  <text
                    x="1030"
                    y="488"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BEARISH REACTION
                  </text>
                </svg>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      BUY
                    </span>

                    <h3 className="text-[14px] font-black text-slate-900">
                      Bullish Liquidity Sweep
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    السعر يتداول أسفل قاع واضح، ثم يفشل في الاستمرار أسفله
                    ويستعيد المستوى. يبحث المتداول بعد ذلك عن شروط التأكيد
                    الصاعدة المحددة مسبقًا.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-slate-700 shadow-sm">
                      SELL
                    </span>

                    <h3 className="text-[14px] font-black text-slate-900">
                      Bearish Liquidity Sweep
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    السعر يتداول فوق قمة واضحة، ثم يفشل في الاستمرار فوقها
                    ويعود أسفل المستوى. بعدها يمكن تقييم التأكيد الهابط وفق
                    قواعد الاستراتيجية.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              05 — WHERE LIQUIDITY FORMS
          ================================================= */}

          <section
            id="where-liquidity-forms"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — مناطق السيولة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                أين توجد مناطق السيولة التي يراقبها المتداولون؟
              </h2>

              <p className="mt-4 max-w-[1100px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                ليست كل نقطة على الشارت متساوية. تصبح مستويات معينة أكثر
                أهمية عندما تكون واضحة بصريًا ويستطيع عدد كبير من المشاركين
                رؤيتها واستخدامها كنقطة وقف أو دخول أو كسر.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Swing Highs",
                    en: "القمم السابقة",
                    text: "القمة الواضحة قد تصبح مرجعًا لأوامر وقف الصفقات البيعية وأوامر الشراء عند الاختراق.",
                  },
                  {
                    n: "02",
                    title: "Swing Lows",
                    en: "القيعان السابقة",
                    text: "القاع الواضح قد يصبح مرجعًا لوقف الصفقات الشرائية وأوامر البيع عند الكسر.",
                  },
                  {
                    n: "03",
                    title: "Equal Highs",
                    en: "القمم المتساوية",
                    text: "تقارب قمتين أو أكثر يجعل المستوى واضحًا ويزيد اهتمام المتداولين بالمنطقة الموجودة فوقه.",
                  },
                  {
                    n: "04",
                    title: "Equal Lows",
                    en: "القيعان المتساوية",
                    text: "تقارب قاعين أو أكثر يخلق مستوى مرئيًا يراقب المتداولون السيولة المحتملة أسفله.",
                  },
                  {
                    n: "05",
                    title: "Session High / Low",
                    en: "قمم وقيعان الجلسات",
                    text: "يمكن مراقبة أعلى وأدنى نطاقات زمنية أو جلسات محددة عندما تكون جزءًا من قواعد الاستراتيجية.",
                  },
                  {
                    n: "06",
                    title: "Previous Day High / Low",
                    en: "قمة وقاع اليوم السابق",
                    text: "مستويات اليوم السابق من المراجع الشائعة التي يستخدمها بعض المتداولين لتحديد مناطق اهتمام واضحة.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <div>
                        <h3
                          dir="ltr"
                          className="text-left text-[13px] font-black text-slate-900"
                        >
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] font-black text-[#1E5BB8]">
                          {item.en}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="الأوضح لا يعني أنه سينعكس">
                المستوى الواضح قد يجذب اهتمامًا أكبر، لكنه قد يُسحب ثم ينعكس
                السعر، أو يُكسر ويستمر السعر خلفه. لهذا السبب نحتاج إلى
                التمييز بين Liquidity Sweep والاختراق الحقيقي.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — EQUAL HIGHS / LOWS
          ================================================= */}

          <section
            id="equal-highs-equal-lows-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Equal Highs & Equal Lows</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                لماذا تعتبر القمم والقيعان المتساوية مناطق سيولة مهمة؟
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Equal Highs (EQH)</strong> هي قمتان أو أكثر تتكونان
                  عند أسعار متقاربة، بينما <strong>Equal Lows (EQL)</strong>{" "}
                  هي قيعان تتشكل حول المستوى نفسه تقريبًا.
                </p>

                <p>
                  لا يشترط أن تتساوى الأسعار بالنقطة. الأهم أن يظهر المستوى
                  على الشارت كمنطقة واضحة يمكن للمتداولين التعرف عليها
                  بسهولة. في تحليل السيولة، تتم مراقبة المنطقة فوق Equal
                  Highs والمنطقة أسفل Equal Lows بحثًا عن تجاوز ثم رفض محتمل.
                </p>

                <p>
                  التحليل الفني التقليدي قد يصف هذه الأشكال بأنها Double Top
                  أو Double Bottom، بينما يركز نموذج السيولة على سؤال مختلف:
                  <strong> ماذا يحدث إذا تجاوز السعر هذه القمم أو القيعان؟</strong>
                </p>
              </div>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 550"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Equal highs and equal lows as potential liquidity pools"
                >
                  <defs>
                    <pattern
                      id="equalLiquidityGridAr"
                      width="59"
                      height="55"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 55"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="550" fill="#ffffff" />
                  <rect width="1180" height="550" fill="url(#equalLiquidityGridAr)" />

                  {/* LEFT EQH */}
                  <rect
                    x="30"
                    y="25"
                    width="545"
                    height="500"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="60"
                    y="65"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    EQUAL HIGHS (EQH)
                  </text>

                  <text
                    x="60"
                    y="89"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Potential buy-side liquidity above similar highs
                  </text>

                  <rect
                    x="105"
                    y="118"
                    width="390"
                    height="57"
                    rx="8"
                    fill="#dbeafe"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  <text
                    x="122"
                    y="143"
                    fontSize="9"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BUY-SIDE LIQUIDITY
                  </text>

                  <text
                    x="122"
                    y="160"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    ABOVE EQUAL HIGHS
                  </text>

                  <line
                    x1="120"
                    y1="225"
                    x2="500"
                    y2="225"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <Candle x={125} open={370} close={330} high={313} low={387} bullish />
                  <Candle x={170} open={328} close={285} high={268} low={345} bullish />
                  <Candle x={215} open={283} close={244} high={226} low={300} bullish />
                  <Candle x={260} open={246} close={278} high={225} low={295} bullish={false} />

                  <Candle x={315} open={330} close={288} high={271} low={347} bullish />
                  <Candle x={360} open={286} close={247} high={229} low={303} bullish />
                  <Candle x={405} open={249} close={280} high={226} low={297} bullish={false} />

                  <circle cx="260" cy="225" r="6" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="405" cy="226" r="6" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />

                  <text
                    x="332"
                    y="208"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    SIMILAR HIGHS
                  </text>

                  <text
                    x="300"
                    y="458"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    WATCH THE AREA ABOVE THE HIGHS
                  </text>

                  {/* RIGHT EQL */}
                  <rect
                    x="605"
                    y="25"
                    width="545"
                    height="500"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="635"
                    y="65"
                    fontSize="18"
                    fontWeight="900"
                    fill="#475569"
                  >
                    EQUAL LOWS (EQL)
                  </text>

                  <text
                    x="635"
                    y="89"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Potential sell-side liquidity below similar lows
                  </text>

                  <Candle x={675} open={180} close={220} high={163} low={237} bullish={false} />
                  <Candle x={720} open={222} close={263} high={205} low={280} bullish={false} />
                  <Candle x={765} open={265} close={304} high={248} low={321} bullish={false} />
                  <Candle x={810} open={302} close={272} high={255} low={324} bullish />

                  <Candle x={865} open={220} close={260} high={203} low={277} bullish={false} />
                  <Candle x={910} open={262} close={301} high={245} low={318} bullish={false} />
                  <Candle x={955} open={299} close={270} high={253} low={323} bullish />

                  <line
                    x1="660"
                    y1="324"
                    x2="1040"
                    y2="324"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <circle cx="810" cy="324" r="6" fill="#ffffff" stroke="#475569" strokeWidth="2" />
                  <circle cx="955" cy="323" r="6" fill="#ffffff" stroke="#475569" strokeWidth="2" />

                  <text
                    x="882"
                    y="348"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SIMILAR LOWS
                  </text>

                  <rect
                    x="680"
                    y="375"
                    width="390"
                    height="57"
                    rx="8"
                    fill="#eef2f7"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="697"
                    y="400"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  <text
                    x="697"
                    y="417"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    BELOW EQUAL LOWS
                  </text>

                  <text
                    x="875"
                    y="458"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    WATCH THE AREA BELOW THE LOWS
                  </text>
                </svg>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — SWEEP VS BREAKOUT
          ================================================= */}

          <section
            id="liquidity-sweep-vs-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Sweep أم Breakout؟</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما الفرق بين Liquidity Sweep والاختراق الحقيقي؟
              </h2>

              <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                هذه من أهم نقاط الاستراتيجية. في الحالتين يتجاوز السعر
                المستوى، لذلك لا يمكن معرفة النتيجة من لحظة الاختراق وحدها.
                الفرق يظهر في <strong>قبول السعر أو رفضه للمستويات الجديدة</strong>{" "}
                بعد الاختراق.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 570"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Liquidity sweep compared with genuine breakout using candlestick charts"
                >
                  <defs>
                    <pattern
                      id="sweepBreakoutGridAr"
                      width="59"
                      height="57"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 57"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="570" fill="#ffffff" />
                  <rect width="1180" height="570" fill="url(#sweepBreakoutGridAr)" />

                  {/* SWEEP */}
                  <rect
                    x="30"
                    y="25"
                    width="545"
                    height="520"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="60"
                    y="65"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    LIQUIDITY SWEEP
                  </text>

                  <text
                    x="60"
                    y="89"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Price breaks the level but fails to hold above it
                  </text>

                  <line
                    x1="90"
                    y1="250"
                    x2="520"
                    y2="250"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="105"
                    y="235"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    PRIOR HIGH / LIQUIDITY LEVEL
                  </text>

                  <Candle x={120} open={390} close={350} high={333} low={407} bullish />
                  <Candle x={165} open={348} close={305} high={288} low={365} bullish />
                  <Candle x={210} open={303} close={268} high={251} low={320} bullish />

                  {/* Sweep through level and close back below */}
                  <line
                    x1="270"
                    y1="164"
                    x2="270"
                    y2="306"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="258"
                    y="224"
                    width="24"
                    height="52"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth="2"
                  />

                  <circle
                    cx="270"
                    cy="190"
                    r="16"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="270"
                    y="194"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    SW
                  </text>

                  <Candle x={325} open={278} close={320} high={261} low={337} bullish={false} />
                  <Candle x={375} open={322} close={365} high={305} low={382} bullish={false} />
                  <Candle x={425} open={367} close={411} high={350} low={428} bullish={false} />
                  <Candle x={475} open={413} close={449} high={396} low={466} bullish={false} />

                  <rect
                    x="342"
                    y="458"
                    width="155"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="419"
                    y="478"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    REJECTION / RECLAIM
                  </text>

                  {/* BREAKOUT */}
                  <rect
                    x="605"
                    y="25"
                    width="545"
                    height="520"
                    rx="22"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text
                    x="635"
                    y="65"
                    fontSize="18"
                    fontWeight="900"
                    fill="#475569"
                  >
                    GENUINE BREAKOUT
                  </text>

                  <text
                    x="635"
                    y="89"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Price breaks the level and shows acceptance above it
                  </text>

                  <line
                    x1="665"
                    y1="250"
                    x2="1095"
                    y2="250"
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="680"
                    y="235"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    PRIOR HIGH / BREAKOUT LEVEL
                  </text>

                  <Candle x={690} open={390} close={350} high={333} low={407} bullish />
                  <Candle x={735} open={348} close={305} high={288} low={365} bullish />
                  <Candle x={780} open={303} close={266} high={249} low={320} bullish />

                  <Candle x={830} open={264} close={211} high={194} low={281} bullish width={22} />
                  <Candle x={880} open={209} close={166} high={149} low={226} bullish width={22} />
                  <Candle x={930} open={164} close={126} high={109} low={181} bullish width={22} />

                  {/* Retest holding */}
                  <Candle x={980} open={128} close={169} high={111} low={186} bullish={false} />
                  <Candle x={1025} open={171} close={218} high={154} low={235} bullish={false} />
                  <Candle x={1070} open={216} close={175} high={158} low={233} bullish />

                  <circle
                    cx="1070"
                    cy="233"
                    r="13"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="1070"
                    y="237"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="900"
                    fill="#475569"
                  >
                    H
                  </text>

                  <rect
                    x="918"
                    y="458"
                    width="160"
                    height="31"
                    rx="15.5"
                    fill="#475569"
                  />

                  <text
                    x="998"
                    y="478"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    ACCEPTANCE / HOLD
                  </text>
                </svg>
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-right">
                    <thead>
                      <tr className="bg-slate-950 text-white">
                        <th className="px-5 py-4 text-[12px] font-black">
                          العنصر
                        </th>
                        <th className="px-5 py-4 text-[12px] font-black">
                          Liquidity Sweep
                        </th>
                        <th className="px-5 py-4 text-[12px] font-black">
                          Genuine Breakout
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {[
                        [
                          "تجاوز المستوى",
                          "نعم",
                          "نعم",
                        ],
                        [
                          "السلوك بعد الاختراق",
                          "فشل في الاستقرار خلف المستوى",
                          "يظهر قبولًا أو استمرارًا خلف المستوى",
                        ],
                        [
                          "العودة للنطاق",
                          "شائعة ومهمة في تعريف Sweep",
                          "قد يعيد الاختبار لكن المستوى الجديد يصمد",
                        ],
                        [
                          "الاتجاه التالي",
                          "قد يتحرك عكس الاختراق الأول",
                          "قد يستمر في اتجاه الاختراق",
                        ],
                        [
                          "قرار الدخول",
                          "يفضل أن يعتمد على قواعد تأكيد واضحة",
                          "يحتاج أيضًا إلى قواعد تأكيد وإبطال",
                        ],
                      ].map(([feature, sweep, breakout]) => (
                        <tr key={feature} className="bg-white">
                          <td className="px-5 py-4 text-[12px] font-black text-slate-900 sm:text-[13px]">
                            {feature}
                          </td>

                          <td className="px-5 py-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                            {sweep}
                          </td>

                          <td className="px-5 py-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                            {breakout}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ImportantBox title="لا تحكم على الاختراق من أول Tick">
                الـSweep يُعرّف جزئيًا بما يحدث <strong>بعد</strong> تجاوز
                المستوى. لذلك الدخول مباشرة عكس كل اختراق لقمة أو قاع يحول
                الاستراتيجية إلى محاولة تخمين، وليس نموذجًا قابلًا للاختبار.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              08 — LIQUIDITY GRAB / STOP HUNT
          ================================================= */}

          <section
            id="liquidity-grab-stop-hunt"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Liquidity Grab & Stop Hunt</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما الفرق بين Liquidity Sweep وLiquidity Grab وStop Hunt؟
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  ستجد في المحتوى التعليمي مصطلحات{" "}
                  <strong>Liquidity Sweep</strong> و
                  <strong> Liquidity Grab</strong> و
                  <strong> Stop Hunt</strong> و
                  <strong> Stop Run</strong> تستخدم أحيانًا لوصف سلوك متقارب:
                  السعر يتجاوز مستوى واضحًا توجد خلفه أوامر محتملة ثم يفشل في
                  الاستمرار.
                </p>

                <p>
                  بعض المتداولين يفرقون بين Sweep وGrab حسب سرعة الحركة أو
                  عدد الشموع أو شكل الاسترداد، لكن هذه التعريفات ليست موحدة
                  بين جميع مدارس SMC وICT. لذلك من الخطأ بناء استراتيجية على
                  الاسم وحده.
                </p>

                <p>
                  الأفضل عمليًا هو تعريف الحدث بطريقة قابلة للاختبار:
                  <strong>
                    {" "}
                    ما المستوى الذي يجب تجاوزه؟ هل يجب أن تغلق الشمعة داخله؟
                    كم شمعة نسمح بها للاسترداد؟ وما التأكيد المطلوب بعد ذلك؟
                  </strong>
                </p>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Liquidity Sweep",
                    text: "مصطلح شائع لوصف تجاوز مستوى سيولة ثم رفضه أو استرداده بدل الاستمرار خلفه.",
                  },
                  {
                    title: "Liquidity Grab",
                    text: "يستخدم غالبًا كمرادف أو وصف قريب جدًا من Sweep، مع اختلاف التعريف الدقيق بين المتداولين.",
                  },
                  {
                    title: "Stop Hunt",
                    text: "تسمية تركز على فكرة تشغيل أوامر الوقف حول مستوى واضح؛ لكنها لا تثبت وحدها نية طرف محدد في السوق.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3
                      dir="ltr"
                      className="text-left text-[14px] font-black text-slate-900"
                    >
                      {item.title}
                    </h3>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="مصطلح Stop Hunt لا يعني أن السوق استهدف صفقتك شخصيًا">
                ما نستطيع رؤيته على الشارت هو تجاوز مستوى ثم سلوك السعر
                بعده. أما تحديد من نفذ الأوامر ولماذا فيحتاج بيانات أعمق من
                مجرد الرسم السعري. لهذا نستخدم المصطلح هنا كمفهوم تحليلي لا
                كإثبات لنية جهة معينة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — QUALITY OF A SWEEP
          ================================================= */}

          <section
            id="how-to-identify-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — تحديد Liquidity Sweep</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                كيف تحدد Liquidity Sweep على الشارت خطوة بخطوة؟
              </h2>

              <p className="mt-4 max-w-[1100px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                بدل البحث عن أي ذيل طويل على الشارت، ابدأ بالمستوى نفسه ثم
                قيّم ما حدث قبل الاختراق وبعده. هذه الطريقة تقلل من تسمية كل
                حركة عشوائية بأنها سحب سيولة.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  {
                    n: "01",
                    title: "حدد مستوى واضحًا أولًا",
                    text: "ابدأ بقمة أو قاع سابق، Equal Highs/Lows أو مستوى زمني واضح وفق قواعدك. لا تبحث عن Sweep قبل تحديد السيولة التي يُفترض أنه سحبها.",
                  },
                  {
                    n: "02",
                    title: "انتظر تجاوز المستوى",
                    text: "يجب أن يتداول السعر فعلًا خلف المستوى. مجرد الاقتراب أو اللمس دون تجاوزه لا يمثل Sweep وفق التعريف المعتاد.",
                  },
                  {
                    n: "03",
                    title: "راقب فشل الاستمرار",
                    text: "السؤال الأساسي هو هل استطاع السعر بناء تداول مقبول خلف المستوى أم بدأ يفقد الزخم ويعود؟",
                  },
                  {
                    n: "04",
                    title: "راقب Reclaim",
                    text: "العودة داخل النطاق السابق أو الإغلاق مجددًا خلف المستوى في الاتجاه المعاكس من العلامات التي يستخدمها المتداولون لتعريف Sweep.",
                  },
                  {
                    n: "05",
                    title: "ابحث عن Displacement",
                    text: "حركة واضحة بعيدًا عن المستوى بعد السحب يمكن أن تكون دليلًا أقوى من مجرد Wick صغير دون متابعة.",
                  },
                  {
                    n: "06",
                    title: "طبّق شرط التأكيد",
                    text: "قد يكون التأكيد CHOCH أو MSS أو كسر Swing أو FVG أو Order Block، حسب النموذج الذي اختبرته مسبقًا.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Sweep أولًا، التأكيد ثانيًا، الدخول أخيرًا">
                هذه طريقة مفيدة لترتيب التفكير. لا تبدأ من إشارة الدخول ثم
                تحاول لاحقًا العثور على Liquidity Sweep يبرر الصفقة. يجب أن
                يظهر التسلسل بالترتيب المحدد في خطة التداول.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — RECLAIM & DISPLACEMENT
          ================================================= */}

          <section
            id="liquidity-sweep-reclaim-displacement"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Reclaim & Displacement</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                لماذا يعتبر Reclaim وDisplacement مهمين بعد سحب السيولة؟
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  تجاوز مستوى السيولة يخبرك أن السعر وصل إلى المنطقة، لكنه لا
                  يخبرك وحده أن الانعكاس بدأ. لهذا يراقب بعض المتداولين
                  <strong> Reclaim</strong> للمستوى ثم حركة{" "}
                  <strong>Displacement</strong> بعيدًا عنه.
                </p>

                <p>
                  الـReclaim يعني أن السعر عاد إلى الجهة السابقة من المستوى
                  بعد تجاوزه. أما Displacement فيصف حركة اتجاهية واضحة نسبيًا
                  تظهر انفصال السعر عن منطقة السحب.
                </p>

                <p>
                  كلما كانت قواعدك أكثر تحديدًا — مثل الإغلاق داخل النطاق،
                  كسر Swing محدد، أو عدد معين من الشموع — أصبح من الأسهل
                  اختبار الاستراتيجية بدل الاعتماد على الانطباع البصري.
                </p>
              </div>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 560"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Liquidity sweep followed by reclaim and bullish displacement"
                >
                  <defs>
                    <pattern
                      id="reclaimDisplacementGridAr"
                      width="59"
                      height="56"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 56"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="560" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="560"
                    fill="url(#reclaimDisplacementGridAr)"
                  />

                  <text
                    x="65"
                    y="62"
                    fontSize="18"
                    fontWeight="900"
                    fill="#0f172a"
                  >
                    SWEEP → RECLAIM → DISPLACEMENT
                  </text>

                  <text
                    x="65"
                    y="87"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    A simplified bullish liquidity-sweep sequence
                  </text>

                  {/* Liquidity level */}
                  <line
                    x1="90"
                    y1="345"
                    x2="1080"
                    y2="345"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="105"
                    y="329"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    PRIOR LOW / SELL-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={130} open={175} close={215} high={158} low={232} bullish={false} />
                  <Candle x={180} open={217} close={258} high={200} low={275} bullish={false} />
                  <Candle x={230} open={260} close={299} high={243} low={316} bullish={false} />
                  <Candle x={280} open={301} close={331} high={284} low={348} bullish={false} />

                  {/* Sweep */}
                  <line
                    x1="350"
                    y1="314"
                    x2="350"
                    y2="449"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="338"
                    y="330"
                    width="24"
                    height="47"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="350"
                    cy="413"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="350"
                    y="417"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    1
                  </text>

                  <text
                    x="350"
                    y="480"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SWEEP
                  </text>

                  {/* Reclaim */}
                  <Candle x={430} open={375} close={326} high={309} low={392} bullish width={22} />

                  <circle
                    cx="430"
                    cy="326"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="430"
                    y="330"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    2
                  </text>

                  <line
                    x1="430"
                    y1="343"
                    x2="430"
                    y2="445"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="430"
                    y="464"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    RECLAIM
                  </text>

                  {/* Displacement */}
                  <Candle x={510} open={324} close={275} high={258} low={341} bullish width={22} />
                  <Candle x={565} open={273} close={219} high={202} low={290} bullish width={22} />
                  <Candle x={620} open={217} close={163} high={146} low={234} bullish width={22} />
                  <Candle x={675} open={161} close={118} high={101} low={178} bullish width={22} />

                  <circle
                    cx="620"
                    cy="163"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="620"
                    y="167"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    3
                  </text>

                  <rect
                    x="710"
                    y="112"
                    width="160"
                    height="32"
                    rx="16"
                    fill="#2563eb"
                  />

                  <text
                    x="790"
                    y="133"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BULLISH DISPLACEMENT
                  </text>

                  {/* Continuation */}
                  <Candle x={755} open={160} close={197} high={143} low={214} bullish={false} />
                  <Candle x={805} open={195} close={154} high={137} low={212} bullish />
                  <Candle x={855} open={152} close={115} high={98} low={169} bullish />

                  {/* Explanation blocks */}
                  <rect
                    x="885"
                    y="175"
                    width="230"
                    height="218"
                    rx="18"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  <text x="910" y="211" fontSize="11" fontWeight="900" fill="#0f172a">
                    1 — SWEEP
                  </text>
                  <text x="910" y="232" fontSize="9" fontWeight="600" fill="#64748b">
                    Price trades below the prior low
                  </text>

                  <text x="910" y="275" fontSize="11" fontWeight="900" fill="#0f172a">
                    2 — RECLAIM
                  </text>
                  <text x="910" y="296" fontSize="9" fontWeight="600" fill="#64748b">
                    Price returns above the level
                  </text>

                  <text x="910" y="339" fontSize="11" fontWeight="900" fill="#0f172a">
                    3 — DISPLACEMENT
                  </text>
                  <text x="910" y="360" fontSize="9" fontWeight="600" fill="#64748b">
                    Directional move develops away
                  </text>
                </svg>
              </div>

              <ImportantBox title="Displacement أقوى من مجرد ارتداد صغير">
                إذا تجاوز السعر القاع ثم ارتفع عدة نقاط فقط وعاد إليه مباشرة،
                فهذا مختلف عن حركة واضحة تبعد السعر عن المنطقة وتؤثر في
                البنية المحلية. لذلك يجب أن تحدد مسبقًا ما الذي تعتبره
                Displacement صالحًا في استراتيجيتك.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — BOS / CHOCH / MSS
          ================================================= */}

          <section
            id="liquidity-sweep-bos-choch-mss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — Market Structure</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                Liquidity Sweep مع BOS وCHOCH وMSS
              </h2>

              <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                بعد حدوث Sweep، يستخدم بعض المتداولين تغير البنية السعرية
                كفلتر إضافي. الهدف ليس إضافة أكبر عدد ممكن من الاختصارات، بل
                التأكد من أن الحركة بعد السحب أحدثت أثرًا يمكن تعريفه.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  {
                    code: "BOS",
                    title: "Break of Structure",
                    text: "كسر Swing مهم في اتجاه الحركة الهيكلية المستخدمة في النموذج. يستخدم عادة لوصف استمرار أو تأكيد بنيوي بحسب السياق.",
                  },
                  {
                    code: "CH",
                    title: "Change of Character",
                    text: "مصطلح يستخدمه متداولو SMC لوصف كسر مبكر ضد التسلسل السابق، وقد يستخدم كإشارة إلى تغير محتمل في السلوك.",
                  },
                  {
                    code: "MSS",
                    title: "Market Structure Shift",
                    text: "يستخدم لوصف تحول في البنية بعد حدث مثل Sweep وDisplacement، لكن التعريف الدقيق يختلف بين المدارس والمتداولين.",
                  },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.code}
                      </span>

                      <h3
                        dir="ltr"
                        className="text-left text-[14px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="حدد معنى Swing قبل استخدام BOS أو CHOCH">
                إذا كنت تغير تعريف القمة والقاع من صفقة لأخرى، ستستطيع إيجاد
                BOS أو CHOCH تقريبًا في أي مكان بعد رؤية النتيجة. الاختبار
                الجيد يحتاج تعريفًا ثابتًا للـSwing وللكسر المطلوب.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — LIQUIDITY SWEEP + ORDER BLOCK / FVG
          ================================================= */}

          <section
            id="liquidity-sweep-order-block-fvg"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Confluence</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                دمج Liquidity Sweep مع Order Block وFair Value Gap
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  كثير من استراتيجيات SMC لا تستخدم Liquidity Sweep كنقطة
                  دخول مباشرة. بدل ذلك، يكون السحب هو <strong>السياق</strong>،
                  ثم ينتظر المتداول Displacement وتغيرًا في البنية قبل البحث
                  عن منطقة دخول مثل Order Block أو Fair Value Gap.
                </p>

                <p>
                  على سبيل المثال، بعد Sweep أسفل قاع سابق قد تظهر حركة صاعدة
                  قوية تترك FVG أو Bullish Order Block. يمكن عندها أن تصبح
                  العودة إلى هذه المنطقة جزءًا من نموذج الدخول بدل الشراء
                  فور ظهور ذيل أسفل القاع.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Liquidity",
                    text: "حدد مستوى السيولة الذي يجب أن يصل إليه السعر.",
                  },
                  {
                    n: "02",
                    title: "Sweep",
                    text: "انتظر تجاوز المستوى وفشل السعر في الاستمرار.",
                  },
                  {
                    n: "03",
                    title: "Displacement",
                    text: "ابحث عن حركة واضحة وتأكيد بنيوي إذا كان النموذج يشترطه.",
                  },
                  {
                    n: "04",
                    title: "Entry Zone",
                    text: "راقب العودة إلى FVG أو Order Block وفق قواعد التنفيذ.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="زيادة عدد عوامل Confluence لا تضمن صفقة أفضل">
                Sweep + FVG + Order Block + CHOCH قد يعطي نموذجًا أكثر تحديدًا،
                لكنه قد يقلل عدد الفرص أو يؤدي إلى اختيار الإشارات بأثر رجعي.
                اختبر كل فلتر لتعرف هل يحسن النتائج فعلًا أم يجعل الشارت أكثر
                تعقيدًا فقط.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              PART 1 ENDS HERE
              PART 2 CONTINUES INSIDE <article>
          ================================================= */}

                    {/* =================================================
              13 — COMPLETE BULLISH ENTRY MODEL
          ================================================= */}

          <section
            id="bullish-liquidity-sweep-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — نموذج الدخول الصاعد</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                كيفية الدخول بعد Bullish Liquidity Sweep خطوة بخطوة
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                النموذج الصاعد يبدأ عادة بوجود{" "}
                <strong>Sell-Side Liquidity</strong> أسفل قاع واضح. يهبط السعر
                أسفل القاع، ثم يفشل في الاستمرار ويستعيد المستوى. بدل الشراء
                مباشرة أثناء الـSweep، يمكن انتظار حركة صاعدة واضحة وتأكيد
                إضافي قبل البحث عن منطقة دخول.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["01", "حدد السيولة", "قاع سابق أو Equal Lows أو مستوى واضح."],
                  ["02", "انتظر Sweep", "يجب أن يتداول السعر أسفل المستوى."],
                  ["03", "انتظر Reclaim", "يعود السعر فوق المستوى المسحوب."],
                  ["04", "اطلب التأكيد", "Displacement أو MSS وفق قواعدك."],
                  ["05", "خطط للصفقة", "Entry وSL وTP قبل التنفيذ."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 620"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bullish liquidity sweep trading setup with entry stop loss and take profit"
                >
                  <defs>
                    <pattern
                      id="bullishEntryGridAr"
                      width="59"
                      height="62"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 62"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="620" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="620"
                    fill="url(#bullishEntryGridAr)"
                  />

                  <text
                    x="55"
                    y="55"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BULLISH LIQUIDITY SWEEP SETUP
                  </text>

                  <text
                    x="55"
                    y="79"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Sweep sell-side liquidity → reclaim → displacement → pullback
                  </text>

                  {/* Liquidity level */}
                  <line
                    x1="70"
                    y1="370"
                    x2="1110"
                    y2="370"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="84"
                    y="353"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    PREVIOUS LOW / SELL-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={115} open={175} close={215} high={158} low={232} bullish={false} />
                  <Candle x={165} open={217} close={260} high={200} low={277} bullish={false} />
                  <Candle x={215} open={262} close={300} high={245} low={317} bullish={false} />
                  <Candle x={265} open={302} close={340} high={285} low={357} bullish={false} />

                  {/* Sweep candle */}
                  <line
                    x1="330"
                    y1="320"
                    x2="330"
                    y2="475"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="318"
                    y="352"
                    width="24"
                    height="42"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="330"
                    cy="435"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="330"
                    y="439"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    1
                  </text>

                  <text
                    x="330"
                    y="502"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SWEEP
                  </text>

                  {/* Reclaim and displacement */}
                  <Candle x={395} open={392} close={340} high={322} low={409} bullish width={22} />
                  <Candle x={450} open={338} close={288} high={270} low={355} bullish width={22} />
                  <Candle x={505} open={286} close={230} high={212} low={303} bullish width={22} />
                  <Candle x={560} open={228} close={176} high={158} low={245} bullish width={22} />

                  <circle
                    cx="450"
                    cy="288"
                    r="16"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="450"
                    y="292"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    2
                  </text>

                  {/* FVG */}
                  <rect
                    x="495"
                    y="260"
                    width="180"
                    height="53"
                    rx="6"
                    fill="#dbeafe"
                    fillOpacity="0.8"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  <text
                    x="585"
                    y="291"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BULLISH FVG / ENTRY AREA
                  </text>

                  {/* Pullback */}
                  <Candle x={630} open={178} close={215} high={160} low={232} bullish={false} />
                  <Candle x={680} open={217} close={260} high={200} low={277} bullish={false} />

                  {/* Entry */}
                  <line
                    x1="680"
                    y1="285"
                    x2="1060"
                    y2="285"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="895"
                    y="265"
                    width="95"
                    height="29"
                    rx="14.5"
                    fill="#2563eb"
                  />

                  <text
                    x="942"
                    y="284"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    ENTRY
                  </text>

                  {/* Continuation */}
                  <Candle x={735} open={258} close={210} high={192} low={275} bullish width={22} />
                  <Candle x={790} open={208} close={158} high={140} low={225} bullish width={22} />
                  <Candle x={845} open={156} close={115} high={97} low={173} bullish width={22} />

                  {/* TP */}
                  <line
                    x1="680"
                    y1="105"
                    x2="1060"
                    y2="105"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="995"
                    y="88"
                    width="65"
                    height="27"
                    rx="13.5"
                    fill="#2563eb"
                  />

                  <text
                    x="1027"
                    y="106"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    TP
                  </text>

                  <text
                    x="695"
                    y="92"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    OPPOSING BUY-SIDE LIQUIDITY
                  </text>

                  {/* Stop */}
                  <line
                    x1="300"
                    y1="485"
                    x2="1060"
                    y2="485"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="995"
                    y="468"
                    width="65"
                    height="27"
                    rx="13.5"
                    fill="#475569"
                  />

                  <text
                    x="1027"
                    y="486"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    SL
                  </text>

                  <text
                    x="695"
                    y="513"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    INVALIDATION BELOW SWEEP EXTREME
                  </text>

                  {/* Labels */}
                  <rect
                    x="365"
                    y="112"
                    width="142"
                    height="30"
                    rx="15"
                    fill="#0f172a"
                  />

                  <text
                    x="436"
                    y="132"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    RECLAIM + SHIFT
                  </text>
                </svg>
              </div>

              <ImportantBox title="مكان وقف الخسارة يجب أن يعكس إبطال الفكرة">
                في نموذج الشراء، وضع الوقف أسفل مستوى السيولة الأصلي مباشرة قد
                يكون داخل منطقة الـSweep نفسها. أحد الأساليب الشائعة هو
                استخدام أقصى نقطة للسحب كمرجع للإبطال، ثم تعديل حجم الصفقة
                بحيث تبقى المخاطرة الإجمالية ثابتة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — COMPLETE BEARISH ENTRY MODEL
          ================================================= */}

          <section
            id="bearish-liquidity-sweep-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — نموذج الدخول الهابط</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                كيفية الدخول بعد Bearish Liquidity Sweep
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                النموذج الهابط هو الصورة المعاكسة: توجد{" "}
                <strong>Buy-Side Liquidity</strong> فوق قمة واضحة، يتجاوزها
                السعر، ثم يفشل في الحفاظ على التداول فوقها ويعود إلى الأسفل.
                بعد ذلك يمكن انتظار Displacement هابط وتأكيد البنية قبل
                تقييم منطقة الدخول.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 620"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bearish liquidity sweep trading setup with entry stop loss and take profit"
                >
                  <defs>
                    <pattern
                      id="bearishEntryGridAr"
                      width="59"
                      height="62"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 62"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="620" fill="#ffffff" />
                  <rect width="1180" height="620" fill="url(#bearishEntryGridAr)" />

                  <text x="55" y="55" fontSize="18" fontWeight="900" fill="#475569">
                    BEARISH LIQUIDITY SWEEP SETUP
                  </text>

                  <text x="55" y="79" fontSize="10" fontWeight="700" fill="#64748b">
                    Sweep buy-side liquidity → reclaim → displacement → pullback
                  </text>

                  {/* Liquidity */}
                  <line
                    x1="70"
                    y1="235"
                    x2="1110"
                    y2="235"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <text x="84" y="218" fontSize="9" fontWeight="900" fill="#475569">
                    PREVIOUS HIGH / BUY-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={115} open={410} close={370} high={353} low={427} bullish />
                  <Candle x={165} open={368} close={325} high={308} low={385} bullish />
                  <Candle x={215} open={323} close={282} high={265} low={340} bullish />
                  <Candle x={265} open={280} close={247} high={230} low={297} bullish />

                  {/* Sweep */}
                  <line
                    x1="330"
                    y1="125"
                    x2="330"
                    y2="270"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="318"
                    y="215"
                    width="24"
                    height="43"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="330"
                    cy="165"
                    r="17"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="330"
                    y="169"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    1
                  </text>

                  <text
                    x="330"
                    y="108"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SWEEP
                  </text>

                  {/* Reclaim / displacement */}
                  <Candle x={395} open={255} close={305} high={238} low={322} bullish={false} width={22} />
                  <Candle x={450} open={307} close={358} high={290} low={375} bullish={false} width={22} />
                  <Candle x={505} open={360} close={414} high={343} low={431} bullish={false} width={22} />
                  <Candle x={560} open={416} close={462} high={399} low={479} bullish={false} width={22} />

                  <circle
                    cx="450"
                    cy="358"
                    r="16"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="450"
                    y="362"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    2
                  </text>

                  {/* Bearish FVG */}
                  <rect
                    x="495"
                    y="330"
                    width="180"
                    height="54"
                    rx="6"
                    fill="#eef2f7"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="585"
                    y="361"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    BEARISH FVG / ENTRY AREA
                  </text>

                  {/* Pullback */}
                  <Candle x={630} open={460} close={422} high={405} low={477} bullish />
                  <Candle x={680} open={420} close={377} high={360} low={437} bullish />

                  {/* Entry */}
                  <line
                    x1="680"
                    y1="355"
                    x2="1060"
                    y2="355"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="895"
                    y="338"
                    width="95"
                    height="29"
                    rx="14.5"
                    fill="#475569"
                  />

                  <text
                    x="942"
                    y="357"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    ENTRY
                  </text>

                  {/* Continuation */}
                  <Candle x={735} open={380} close={425} high={363} low={442} bullish={false} width={22} />
                  <Candle x={790} open={427} close={474} high={410} low={491} bullish={false} width={22} />
                  <Candle x={845} open={476} close={520} high={459} low={537} bullish={false} width={22} />

                  {/* SL */}
                  <line
                    x1="300"
                    y1="115"
                    x2="1060"
                    y2="115"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="995"
                    y="98"
                    width="65"
                    height="27"
                    rx="13.5"
                    fill="#475569"
                  />

                  <text
                    x="1027"
                    y="116"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    SL
                  </text>

                  {/* TP */}
                  <line
                    x1="680"
                    y1="535"
                    x2="1060"
                    y2="535"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="995"
                    y="518"
                    width="65"
                    height="27"
                    rx="13.5"
                    fill="#2563eb"
                  />

                  <text
                    x="1027"
                    y="536"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    TP
                  </text>

                  <text x="695" y="564" fontSize="9" fontWeight="900" fill="#2563eb">
                    OPPOSING SELL-SIDE LIQUIDITY
                  </text>

                  <rect
                    x="365"
                    y="485"
                    width="160"
                    height="30"
                    rx="15"
                    fill="#0f172a"
                  />

                  <text
                    x="445"
                    y="505"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BEARISH DISPLACEMENT
                  </text>
                </svg>
              </div>
            </div>
          </section>

          {/* =================================================
              15 — ENTRY / SL / TP
          ================================================= */}

          <section
            id="liquidity-sweep-entry-stop-loss-take-profit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Entry, Stop Loss & Take Profit</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                أين يكون الدخول ووقف الخسارة والهدف في استراتيجية سحب السيولة؟
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا توجد نقطة دخول موحدة لكل Liquidity Sweep. المهم هو أن تكون
                قواعد التنفيذ محددة قبل الصفقة. يمكن استخدام الإغلاق بعد
                Reclaim، أو Retest، أو العودة إلى FVG أو Order Block، بينما
                يجب أن يكون وقف الخسارة في مكان يبطل منطق الصفقة بدل وضعه
                عشوائيًا بعدد ثابت من النقاط.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      EN
                    </span>
                    <h3 className="text-[14px] font-black text-slate-900">
                      Entry
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    يمكن أن يكون الدخول بعد Reclaim وتأكيد بنيوي، أو عند
                    Pullback إلى FVG أو Order Block. اختيار النموذج يجب أن
                    يكون ثابتًا أثناء الاختبار.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-slate-700 shadow-sm">
                      SL
                    </span>
                    <h3 className="text-[14px] font-black text-slate-900">
                      Stop Loss
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    أحد المراجع المنطقية هو الطرف الخارجي للـSweep، لأن عودة
                    السعر وتجاوزه مجددًا قد تعني أن فرضية الرفض لم تعد صالحة.
                    يجب مراعاة السبريد والتذبذب وحجم الصفقة.
                  </p>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      TP
                    </span>
                    <h3 className="text-[14px] font-black text-slate-900">
                      Take Profit
                    </h3>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600">
                    يمكن استخدام Swing مقابل، Buy-Side أو Sell-Side Liquidity
                    غير مسحوبة، أو هدف مبني على نسبة العائد إلى المخاطرة.
                    الهدف يجب أن يكون محددًا قبل الدخول.
                  </p>
                </div>
              </div>

              <ImportantBox title="المسافة الأكبر للوقف لا تعني مخاطرة مالية أكبر تلقائيًا">
                إذا كان الوقف الهيكلي أوسع، يمكن تقليل حجم الصفقة للحفاظ على
                نفس مقدار المخاطرة. تغيير مكان الوقف دون تعديل Position Size
                يغير المخاطرة الفعلية على الحساب.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              16 — INTERNAL VS EXTERNAL LIQUIDITY
          ================================================= */}

          <section
            id="internal-external-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Internal vs External Liquidity</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما الفرق بين السيولة الداخلية والسيولة الخارجية؟
              </h2>

              <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                في بعض نماذج SMC وICT، يتم التفريق بين السيولة الموجودة داخل
                نطاق سعري حالي وبين السيولة الموجودة خلف حدوده الرئيسية. هذا
                التقسيم يساعد على تنظيم قراءة الشارت، لكنه يعتمد على كيفية
                تعريفك للنطاق نفسه.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
                  <h3 className="text-[15px] font-black text-slate-900">
                    Internal Liquidity
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600">
                    مستويات أصغر داخل النطاق الأكبر، مثل Swing داخلي أو قمم
                    وقيعان قصيرة المدى. قد يتم سحبها أثناء تحرك السعر داخل
                    الهيكل الرئيسي.
                  </p>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[15px] font-black text-slate-900">
                    External Liquidity
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600">
                    السيولة خلف القمم أو القيعان الرئيسية التي تحدد حدود
                    النطاق أو Swing الأكبر. لذلك تكون عادة أكثر وضوحًا عند
                    تحليل الاتجاه العام.
                  </p>
                </div>
              </div>

              <ImportantBox title="Internal وExternal مفهومان نسبيان">
                القمة التي تعتبر External Liquidity على شارت 5 دقائق قد تكون
                مجرد Swing داخلي عند النظر إلى شارت 4 ساعات. لذلك يجب دائمًا
                ربط المصطلح بالإطار الزمني والبنية التي تحللها.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              17 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="multi-timeframe-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Multi-Timeframe Analysis</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                كيف تستخدم أكثر من إطار زمني مع Liquidity Sweep؟
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                استخدام أكثر من إطار زمني لا يعني فتح كل الشارتات المتاحة.
                الفكرة هي فصل <strong>السياق</strong> عن{" "}
                <strong>التنفيذ</strong>: إطار أكبر لتحديد البنية ومستويات
                السيولة المهمة، وإطار أصغر لمراقبة الـSweep والتأكيد.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    text: "حدد الاتجاه العام، Swing الرئيسية، قمم وقيعان اليوم أو الأسبوع والمناطق التي تستحق المتابعة.",
                  },
                  {
                    n: "02",
                    title: "Setup Timeframe",
                    text: "راقب وصول السعر إلى المستوى وحدوث Sweep أو قبول خلفه. هنا تتشكل فكرة الصفقة.",
                  },
                  {
                    n: "03",
                    title: "Execution Timeframe",
                    text: "إذا كانت قواعدك تسمح، استخدم إطارًا أصغر لتحديد Reclaim أو MSS أو FVG والدخول بدقة أكبر.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3
                        dir="ltr"
                        className="text-left text-[14px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="لا تغيّر الإطار الزمني فقط للعثور على تأكيد">
                إذا لم يظهر النموذج على الإطار المحدد في خطة التداول، الانتقال
                بين 1m و3m و5m و15m حتى يظهر CHOCH مناسب يؤدي بسهولة إلى
                الاختيار بأثر رجعي. حدد الأطر الزمنية قبل بدء الجلسة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              18 — PDH / PDL & SESSION LIQUIDITY
          ================================================= */}

          <section
            id="previous-day-high-low-session-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Session Liquidity</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                استخدام Previous Day High / Low وقمم وقيعان الجلسات
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                بعض متداولي الفوركس اليوميين يستخدمون مستويات زمنية ثابتة
                بدل البحث عن Swing عشوائية. من أشهر الأمثلة{" "}
                <strong>Previous Day High (PDH)</strong> و
                <strong>Previous Day Low (PDL)</strong>، بالإضافة إلى قمم
                وقيعان نطاقات أو جلسات محددة.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 570"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Previous day high and previous day low liquidity sweep example"
                >
                  <defs>
                    <pattern
                      id="sessionLiquidityGridAr"
                      width="59"
                      height="57"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 57"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="570" fill="#ffffff" />
                  <rect width="1180" height="570" fill="url(#sessionLiquidityGridAr)" />

                  <text x="55" y="55" fontSize="18" fontWeight="900" fill="#0f172a">
                    PREVIOUS DAY HIGH & LOW
                  </text>

                  <text x="55" y="79" fontSize="10" fontWeight="700" fill="#64748b">
                    Fixed reference levels can make sweep rules easier to define
                  </text>

                  {/* PDH */}
                  <line
                    x1="75"
                    y1="160"
                    x2="1100"
                    y2="160"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="80"
                    y="128"
                    width="150"
                    height="27"
                    rx="13.5"
                    fill="#2563eb"
                  />

                  <text
                    x="155"
                    y="146"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    PREVIOUS DAY HIGH
                  </text>

                  {/* PDL */}
                  <line
                    x1="75"
                    y1="430"
                    x2="1100"
                    y2="430"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="80"
                    y="437"
                    width="150"
                    height="27"
                    rx="13.5"
                    fill="#475569"
                  />

                  <text
                    x="155"
                    y="455"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    PREVIOUS DAY LOW
                  </text>

                  {/* Range candles */}
                  <Candle x={170} open={310} close={270} high={245} low={330} bullish />
                  <Candle x={220} open={268} close={230} high={205} low={288} bullish />
                  <Candle x={270} open={228} close={260} high={203} low={280} bullish={false} />
                  <Candle x={320} open={258} close={305} high={238} low={325} bullish={false} />
                  <Candle x={370} open={307} close={350} high={287} low={370} bullish={false} />
                  <Candle x={420} open={348} close={390} high={328} low={410} bullish={false} />

                  {/* PDL Sweep */}
                  <line
                    x1="485"
                    y1="368"
                    x2="485"
                    y2="495"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="473"
                    y="405"
                    width="24"
                    height="48"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="485"
                    cy="468"
                    r="16"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="485"
                    y="472"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    SW
                  </text>

                  {/* Reversal */}
                  <Candle x={545} open={450} close={390} high={370} low={467} bullish width={22} />
                  <Candle x={600} open={388} close={330} high={310} low={405} bullish width={22} />
                  <Candle x={655} open={328} close={270} high={250} low={345} bullish width={22} />
                  <Candle x={710} open={268} close={215} high={195} low={285} bullish width={22} />

                  {/* Pullback */}
                  <Candle x={765} open={213} close={250} high={193} low={270} bullish={false} />
                  <Candle x={815} open={248} close={205} high={185} low={268} bullish />

                  {/* Move toward PDH */}
                  <Candle x={865} open={203} close={175} high={155} low={223} bullish />
                  <Candle x={915} open={173} close={140} high={120} low={193} bullish />

                  <rect
                    x="735"
                    y="315"
                    width="265"
                    height="55"
                    rx="15"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                  />

                  <text
                    x="867"
                    y="339"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#0f172a"
                  >
                    PDL SWEPT → PRICE RECLAIMS
                  </text>

                  <text
                    x="867"
                    y="357"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    PDH MAY BECOME A POTENTIAL OPPOSING LIQUIDITY TARGET
                  </text>
                </svg>
              </div>

              <ImportantBox title="الجلسة ليست ضمانًا لحدوث Sweep">
                مستويات PDH وPDL أو قمم وقيعان الجلسات تجعل التحليل أكثر
                تنظيمًا، لكنها لا تضمن أن السعر سيصل إليها أو ينعكس منها.
                كما أن الأخبار والتذبذب والسبريد قد تغير شكل الحركة حول هذه
                المستويات.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — BEST CONDITIONS / FILTERS
          ================================================= */}

          <section
            id="liquidity-sweep-filters"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — فلاتر جودة الإشارة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                ما الذي يجعل Liquidity Sweep أكثر أهمية على الشارت؟
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا يوجد فلتر يجعل الـSweep مضمونًا، لكن يمكن بناء قواعد تقلل
                الإشارات العشوائية. الهدف هو معرفة مسبقًا أي Sweep ستتداول
                وأي Sweep ستتجاهل.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["01", "مستوى واضح", "يجب أن يكون مستوى السيولة قابلًا للتحديد قبل حدوث السحب، وليس بعد رؤية الانعكاس."],
                  ["02", "سياق إطار أكبر", "افهم مكان الصفقة بالنسبة للاتجاه والبنية والسيولة الأكبر."],
                  ["03", "Reclaim واضح", "فشل السعر في قبول التداول خلف المستوى عنصر أساسي في كثير من النماذج."],
                  ["04", "Displacement", "حركة واضحة بعيدًا عن منطقة السحب قد تكون أكثر فائدة من ارتداد صغير ومتردد."],
                  ["05", "Structure Shift", "إذا كان نموذجك يشترطه، يجب تعريف Swing الذي سيتم كسره قبل حدوث الكسر."],
                  ["06", "مساحة نحو الهدف", "حتى النموذج الجيد قد لا يستحق التنفيذ إذا كانت السيولة المقابلة قريبة جدًا من الدخول."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>
                      <h3 className="text-[13px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              20 — WHEN NOT TO TRADE
          ================================================= */}

          <section
            id="when-not-to-trade-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — متى تتجنب الصفقة؟</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                متى يكون تجاهل Liquidity Sweep أفضل من الدخول؟
              </h2>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  {
                    title: "المستوى غير واضح",
                    text: "إذا احتجت إلى تكبير وتصغير الشارت عدة مرات لإقناع نفسك بوجود قمة أو قاع مهم، فقد لا يكون المستوى مناسبًا لقواعدك.",
                  },
                  {
                    title: "السعر يقبل الاختراق",
                    text: "إذا أغلق السعر خلف المستوى وبدأ ببناء هيكل جديد هناك، قد تكون أمام Breakout أو Liquidity Run بدل Sweep.",
                  },
                  {
                    title: "الدخول أصبح بعيدًا",
                    text: "مطاردة السعر بعد Displacement كبير قد تجعل الوقف واسعًا والهدف قريبًا، فتتغير جودة الصفقة حتى لو كان التحليل الأصلي صحيحًا.",
                  },
                  {
                    title: "خبر عالي التأثير",
                    text: "الأحداث الاقتصادية قد تسبب اتساع السبريد والانزلاق وحركات سريعة عبر أكثر من مستوى، لذلك يجب أن تكون قواعد الأخبار جزءًا من الاختبار.",
                  },
                  {
                    title: "لا يوجد إبطال واضح",
                    text: "إذا لم تستطع تحديد المكان الذي تصبح عنده فرضية الصفقة خاطئة، فلا يمكنك حساب المخاطرة بطريقة منضبطة.",
                  },
                  {
                    title: "الهدف قريب جدًا",
                    text: "وجود منطقة سيولة مقابلة مباشرة أمام الدخول قد يجعل العائد المحتمل غير مناسب للمخاطرة المطلوبة.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-[10px] font-black text-white">
                        ×
                      </span>

                      <h3 className="text-[14px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              21 — COMMON MISTAKES
          ================================================= */}

          <section
            id="liquidity-sweep-common-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — الأخطاء الشائعة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                أخطاء شائعة عند تداول استراتيجية سحب السيولة
              </h2>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  ["01", "اعتبار كل Wick سحب سيولة", "الذيل الطويل دون مستوى واضح خلفه قد يكون مجرد تذبذب. حدد Liquidity Pool قبل ظهور الـSweep."],
                  ["02", "الدخول قبل حدوث Sweep", "شراء القاع أو بيع القمة لأنك تتوقع سحب السيولة يعني أنك تدخل قبل تحقق الشرط الأساسي."],
                  ["03", "اعتبار كل Breakout فخًا", "بعض الاختراقات حقيقية ويستمر السعر خلف المستوى. لا تحاول بيع كل High جديد أو شراء كل Low جديد."],
                  ["04", "الدخول أثناء شمعة السحب", "الشمعة لم تنته بعد وقد تستمر بعيدًا خلف المستوى. قواعد الإغلاق أو Reclaim تقلل الغموض."],
                  ["05", "وقف خسارة ضيق عشوائي", "وقف داخل منطقة السحب قد يتم لمسه بتذبذب طبيعي حتى لو بقي السيناريو الهيكلي صالحًا."],
                  ["06", "تجاهل حجم الصفقة", "توسيع Stop Loss مع إبقاء Position Size نفسه يزيد الخسارة المحتملة على الحساب."],
                  ["07", "مطاردة الحركة", "إذا تحرك السعر بعيدًا قبل دخولك، لا يعني ذلك أن عليك الدخول بأي سعر فقط لأن التحليل نجح."],
                  ["08", "إضافة Confluence بعد الصفقة", "البحث بعد الخسارة عن FVG أو CHOCH مختلف يجعل القواعد تتغير باستمرار ويضعف الاختبار."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              22 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="liquidity-sweep-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — إدارة المخاطر</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                إدارة المخاطر عند تداول Liquidity Sweep
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                حتى النموذج الذي يطابق جميع شروطك يمكن أن يفشل. لهذا يجب فصل
                جودة التحليل عن مقدار المال الذي تخاطر به. الهدف من إدارة
                المخاطر هو جعل خسارة صفقة واحدة حدثًا عاديًا ضمن سلسلة كبيرة
                من الصفقات، وليس مشكلة تهدد الحساب.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[780px] border-collapse text-right">
                    <thead>
                      <tr className="bg-slate-950 text-white">
                        <th className="px-5 py-4 text-[12px] font-black">
                          العنصر
                        </th>
                        <th className="px-5 py-4 text-[12px] font-black">
                          القاعدة العملية
                        </th>
                        <th className="px-5 py-4 text-[12px] font-black">
                          لماذا؟
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {[
                        [
                          "المخاطرة لكل صفقة",
                          "حدد نسبة أو مبلغًا ثابتًا مسبقًا",
                          "حتى لا تتحول ثقتك في Setup معين إلى مخاطرة استثنائية.",
                        ],
                        [
                          "Position Size",
                          "احسبه من مسافة الوقف والمخاطرة",
                          "الوقف الأوسع يحتاج عادة حجم مركز أصغر للحفاظ على نفس المخاطرة.",
                        ],
                        [
                          "Stop Loss",
                          "ضعه عند نقطة إبطال منطقية",
                          "الوقف ليس مجرد رقم؛ يجب أن يحدد متى تصبح فكرة الصفقة غير صالحة.",
                        ],
                        [
                          "Reward / Risk",
                          "قيّمه قبل الدخول",
                          "قد يكون Setup جيدًا بصريًا لكن الهدف المتاح قريب جدًا.",
                        ],
                        [
                          "الصفقات المترابطة",
                          "راقب التعرض الكلي",
                          "عدة صفقات على أزواج مترابطة قد تمثل مخاطرة واحدة كبيرة فعليًا.",
                        ],
                      ].map(([item, rule, why]) => (
                        <tr key={item} className="bg-white">
                          <td className="px-5 py-4 text-[12px] font-black text-slate-900 sm:text-[13px]">
                            {item}
                          </td>

                          <td className="px-5 py-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                            {rule}
                          </td>

                          <td className="px-5 py-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                            {why}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ImportantBox title="لا توجد نسبة مخاطرة مثالية للجميع">
                النسبة المناسبة تعتمد على رأس المال، تكرار الصفقات، التقلب،
                تحمل الخسائر ونتائج الاختبار. الأهم أن تكون المخاطرة محددة
                مسبقًا ومتسقة، وألا تزيدها لأن Setup يبدو مثاليًا.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              23 — CHECKLIST
          ================================================= */}

          <section
            id="liquidity-sweep-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — Trading Checklist</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                قائمة فحص Liquidity Sweep قبل الدخول
              </h2>

              <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يمكن تحويل الاستراتيجية إلى Checklist قصيرة تمنع اتخاذ قرار
                مختلف في كل مرة. إذا كانت إحدى النقاط أساسية في خطتك ولم
                تتحقق، فالصفقة ببساطة ليست النموذج الذي اختبرته.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  "هل حددت مستوى السيولة قبل وصول السعر إليه؟",
                  "هل المستوى مهم ضمن الإطار الزمني الذي تتداوله؟",
                  "هل تجاوز السعر المستوى فعلًا؟",
                  "هل فشل السعر في قبول التداول خلف المستوى؟",
                  "هل حدث Reclaim وفق تعريفك؟",
                  "هل ظهر Displacement أو التأكيد المطلوب؟",
                  "هل حدث كسر البنية المحدد في خطتك؟",
                  "هل منطقة الدخول ما زالت صالحة ولم يتحرك السعر بعيدًا؟",
                  "هل Stop Loss موجود عند نقطة إبطال منطقية؟",
                  "هل الهدف واضح قبل الدخول؟",
                  "هل العائد المحتمل مناسب للمخاطرة؟",
                  "هل Position Size يحافظ على مخاطرتك المحددة؟",
                ].map((text, index) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="pt-0.5 text-[12px] font-bold leading-7 text-slate-700 sm:text-[13px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              24 — BACKTESTING
          ================================================= */}

          <section
            id="backtest-liquidity-sweep-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>24 — Backtesting</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                كيف تختبر استراتيجية Liquidity Sweep تاريخيًا؟
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                قبل الحكم على الاستراتيجية من عدة أمثلة ناجحة، حوّل كل مفهوم
                إلى قاعدة يمكن تسجيلها. الاختبار التاريخي لا يضمن نتائج
                مستقبلية، لكنه يكشف ما إذا كانت القواعد واضحة ومتكررة أصلًا.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["01", "حدد السوق", "مثلاً زوج واحد أو مجموعة محددة بدل تغيير الأصل بعد كل خسارة."],
                  ["02", "حدد Timeframe", "استخدم نفس إطار السياق والتنفيذ في كامل العينة."],
                  ["03", "عرّف Liquidity", "اكتب بالضبط ما الذي يعتبر Swing أو Equal High/Low صالحًا."],
                  ["04", "عرّف Sweep", "حدد مقدار التجاوز وشروط Reclaim أو الإغلاق المطلوبة."],
                  ["05", "عرّف Trigger", "حدد MSS أو FVG أو Retest الذي يسمح بالدخول."],
                  ["06", "سجل النتائج", "احتفظ بالدخول والوقف والهدف وR Multiple والسياق والنتيجة."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[22px] border border-slate-200 bg-slate-950 p-5 sm:p-6">
                <h3 className="text-[15px] font-black text-white">
                  بيانات مفيدة لتسجيلها في Journal
                </h3>

                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    "التاريخ والوقت",
                    "الأصل المتداول",
                    "الإطار الزمني",
                    "نوع السيولة",
                    "Bullish / Bearish",
                    "نوع التأكيد",
                    "Entry / SL / TP",
                    "المخاطرة",
                    "R Multiple",
                    "نتيجة الصفقة",
                    "Screenshot قبل الدخول",
                    "Screenshot بعد الإغلاق",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-[11px] font-bold text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="لا تعدل القواعد أثناء نفس عينة الاختبار">
                إذا غيرت تعريف Sweep أو مكان الدخول بعد كل صفقة خاسرة، لن
                تعرف في النهاية أي استراتيجية اختبرتها. أكمل العينة بالقواعد
                نفسها، ثم حلل النتائج وعدّل نسخة جديدة منفصلة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              25 — COMPLETE TRADING PLAN
          ================================================= */}

          <section
            id="liquidity-sweep-trading-plan"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>25 — خطة تداول كاملة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                مثال على بناء خطة Liquidity Sweep قابلة للاختبار
              </h2>

              <p className="mt-4 max-w-[1120px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                المثال التالي ليس إشارة تداول جاهزة، بل نموذج يوضح كيف تتحول
                المفاهيم السابقة إلى سلسلة شروط محددة يمكن اختبارها وتعديلها.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  {
                    n: "01",
                    title: "حدد السياق",
                    text: "اختر الإطار الأكبر وحدد البنية ومستويات السيولة التي ستراقبها قبل بدء التنفيذ.",
                  },
                  {
                    n: "02",
                    title: "حدد Liquidity Pool",
                    text: "مثلاً PDH أو PDL أو Swing واضح أو Equal Highs/Lows وفق تعريف ثابت.",
                  },
                  {
                    n: "03",
                    title: "انتظر Sweep",
                    text: "لا توجد صفقة قبل أن يتجاوز السعر مستوى السيولة المحدد.",
                  },
                  {
                    n: "04",
                    title: "انتظر Reclaim",
                    text: "يجب أن يعود السعر إلى الجهة المطلوبة وفق قاعدة الإغلاق أو الاسترداد التي اخترتها.",
                  },
                  {
                    n: "05",
                    title: "انتظر Confirmation",
                    text: "مثلاً Displacement مع كسر Swing محدد أو MSS وفق النموذج الذي تختبره.",
                  },
                  {
                    n: "06",
                    title: "حدد Entry",
                    text: "يمكن أن يكون Retest أو FVG أو Order Block، لكن لا تغير نوع الدخول من صفقة لأخرى.",
                  },
                  {
                    n: "07",
                    title: "حدد Invalidation",
                    text: "ضع Stop Loss حيث تصبح فرضية Sweep + Reversal غير صالحة.",
                  },
                  {
                    n: "08",
                    title: "حدد Target",
                    text: "اختر السيولة المقابلة أو Swing واضحًا أو نموذج R ثابتًا قبل الضغط على زر التنفيذ.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              26 — FAQ
          ================================================= */}

          <section
            id="liquidity-sweep-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>26 — الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                أسئلة شائعة حول Liquidity Sweep وLiquidity Grab
              </h2>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[12px] font-black leading-6 text-slate-900 sm:text-[14px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="text-[18px] font-bold text-slate-400 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5">
                      <p className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              27 — SUMMARY
          ================================================= */}

          <section
            id="liquidity-sweep-summary"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>27 — الخلاصة</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                خلاصة استراتيجية سحب السيولة Liquidity Sweep
              </h2>

              <div className="mt-4 space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  استراتيجية <strong>Liquidity Sweep</strong> لا تبدأ من
                  شمعة ذات Wick طويل، بل من تحديد مستوى سيولة واضح قبل وصول
                  السعر إليه. بعد ذلك تتم مراقبة ما إذا كان السعر سيقبل
                  التداول خلف المستوى أم سيتجاوزه مؤقتًا ثم يستعيده.
                </p>

                <p>
                  في النموذج الصاعد تتم مراقبة{" "}
                  <strong>Sell-Side Liquidity</strong> أسفل القيعان، بينما
                  يركز النموذج الهابط على{" "}
                  <strong>Buy-Side Liquidity</strong> فوق القمم. ويمكن إضافة
                  Reclaim وDisplacement وMarket Structure Shift وFVG أو Order
                  Block كعوامل تأكيد إذا كانت جزءًا من قواعد محددة ومختبرة.
                </p>

                <p>
                  النقطة الأهم هي أن <strong>السحب ليس ضمانًا للانعكاس</strong>.
                  قد يتحول الاختراق إلى حركة اتجاهية حقيقية، ولهذا تحتاج أي
                  استراتيجية إلى نقطة إبطال، حجم صفقة محسوب، هدف واضح واختبار
                  على عينة كافية قبل استخدامها بأموال حقيقية.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["1", "Mark Liquidity", "حدد القمم والقيعان المهمة أولًا."],
                  ["2", "Wait for Sweep", "لا تتوقع السحب قبل حدوثه."],
                  ["3", "Confirm", "راقب Reclaim والبنية والحركة التالية."],
                  ["4", "Manage Risk", "حدد الإبطال والهدف وحجم الصفقة."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3
                        dir="ltr"
                        className="text-left text-[12px] font-black text-slate-900"
                      >
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[20px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-[11px] font-medium leading-7 text-slate-500 sm:text-[12px]">
                  <strong className="text-slate-700">تنبيه:</strong> هذا
                  المحتوى تعليمي ولا يمثل توصية استثمارية أو إشارة شراء أو
                  بيع. التداول بالرافعة المالية ينطوي على مخاطر، وقد تختلف
                  نتائج أي استراتيجية باختلاف السوق والإطار الزمني والتنفيذ
                  وتكاليف التداول.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="relative overflow-hidden rounded-[30px] border border-slate-800 bg-slate-950 shadow-sm">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black tracking-[0.12em] text-blue-300">
                BROKER ALARAB
              </span>

              <h2 className="mt-5 max-w-[900px] text-[25px] font-black leading-[1.4] text-white sm:text-[32px]">
                تعلم الاستراتيجية، اختبر قواعدها، ثم قارن بيئة التداول المناسبة
              </h2>

              <p className="mt-4 max-w-[900px] text-[13px] font-medium leading-8 text-slate-300 sm:text-[14px]">
                تكلفة السبريد والتنفيذ والانزلاق والرافعة المالية قد تؤثر في
                نتائج الاستراتيجيات قصيرة المدى. يمكنك استخدام أدوات بروكر
                العرب لمقارنة الوسطاء والحسابات وشروط التداول قبل اتخاذ قرارك.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/brokers"
                  className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-[12px] font-black text-white transition hover:bg-[#1d4ed8]"
                >
                  مقارنة الوسطاء
                </a>

                <a
                  href="/strategies"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[12px] font-black text-white transition hover:bg-white/10"
                >
                  جميع استراتيجيات التداول
                </a>

                <a
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[12px] font-black text-white transition hover:bg-white/10"
                >
                  أدوات التداول
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              STRUCTURED DATA
          ================================================= */}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
        </article>
      </div>
    </main>
  );
}