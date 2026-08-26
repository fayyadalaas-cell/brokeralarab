import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   SWING TRADING STRATEGY
   Broker Alarab
   Path: /strategies/swing-trading
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/swing-trading`;

const PAGE_TITLE =
  "استراتيجية السوينغ Swing Trading: شرح كامل وطريقة التداول";

const PAGE_DESCRIPTION =
  "شرح استراتيجية السوينغ Swing Trading خطوة بخطوة، مع أمثلة توضيحية على Swing High وSwing Low والاتجاه والتصحيح ونقاط الدخول ووقف الخسارة والأهداف.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: `${BASE_URL}/en/strategies/swing-trading`,
      "x-default": `${BASE_URL}/en/strategies/swing-trading`,
    },
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    locale: "ar_AR",
    siteName: "Broker Alarab",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
      {children}
    </span>
  );
}


function ImportantBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-brand-100 bg-brand-50/60 p-4 md:p-5">

      <div className="flex items-start gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-sm font-black text-white">
          !
        </div>

        <div>

          <h3 className="text-[16px] font-black text-slate-950 md:text-[17px]">
            {title}
          </h3>

          <div className="mt-2 text-[14px] leading-7 text-slate-700 md:text-[15px] md:leading-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    q: "ما هي استراتيجية السوينغ Swing Trading؟",
    a: "السوينغ هو أسلوب تداول يهدف إلى الاستفادة من الحركات السعرية المتوسطة نسبيًا بين القمم والقيعان، وغالبًا ما تبقى الصفقة مفتوحة لعدة أيام وقد تمتد إلى أسابيع بحسب السوق والفريم المستخدم.",
  },
  {
    q: "كم تستمر صفقة السوينغ؟",
    a: "لا توجد مدة ثابتة لكل صفقة، لكن تداول السوينغ يرتبط عادةً بحركات تستمر من عدة أيام إلى عدة أسابيع، وليس بفتح وإغلاق الصفقات خلال دقائق كما يحدث في السكالبينغ.",
  },
  {
    q: "ما الفرق بين Swing Trading والسكالبينغ؟",
    a: "السكالبينغ يستهدف تحركات صغيرة جدًا خلال فترات قصيرة ويتطلب متابعة مكثفة، بينما يستهدف السوينغ حركة سعرية أكبر نسبيًا ويعتمد عادةً على فريمات زمنية أعلى وصفقات تستمر مدة أطول.",
  },
  {
    q: "ما أفضل فريم لتداول السوينغ؟",
    a: "يستخدم كثير من متداولي السوينغ فريمات مثل الأربع ساعات واليومي لتحليل الاتجاه والبنية العامة، ويمكن استخدام فريمات أقل لتحسين نقطة الدخول. اختيار الفريم يعتمد على الخطة والسوق ومدة الصفقة المستهدفة.",
  },
  {
    q: "هل Swing Trading مناسب للمبتدئين؟",
    a: "يمكن أن يكون مناسبًا للتعلم لأنه أبطأ من السكالبينغ والتداول اللحظي، لكنه يحتاج إلى فهم الاتجاه وهيكل السوق والدعم والمقاومة وإدارة المخاطر قبل التداول بأموال حقيقية.",
  },
  {
    q: "هل يحتاج السوينغ إلى مؤشرات؟",
    a: "ليس بالضرورة. يمكن بناء استراتيجية سوينغ باستخدام حركة السعر وهيكل السوق والدعم والمقاومة فقط، كما يمكن إضافة أدوات مثل المتوسطات المتحركة وRSI كعوامل مساعدة وليس كبديل عن قراءة السوق.",
  },
  {
    q: "أين يوضع وقف الخسارة في صفقة Swing Trading؟",
    a: "يعتمد ذلك على السيناريو. في صفقة شراء مثلًا قد يكون الوقف أسفل قاع أو منطقة دعم يؤدي كسرها إلى إبطال فكرة الصفقة، مع حساب حجم الصفقة بناءً على المسافة إلى وقف الخسارة.",
  },
];


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function SwingHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div>
          <div className="text-[13px] font-black text-slate-950">
            كيف يفكر متداول السوينغ؟
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            اتجاه ← تصحيح ← منطقة اهتمام ← دخول ← حركة جديدة
          </div>
        </div>

        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600">
          Swing Setup
        </span>

      </div>


      <svg
        viewBox="0 0 720 330"
        className="block w-full"
        role="img"
        aria-label="مثال توضيحي لاستراتيجية السوينغ داخل اتجاه صاعد"
      >

        <rect width="720" height="330" fill="#ffffff" />


        {/* GRID */}
        {[60, 120, 180, 240, 300].map((y) => (
          <line
            key={`hero-h-${y}`}
            x1="35"
            y1={y}
            x2="685"
            y2={y}
            stroke="#eef2f7"
          />
        ))}

        {[100, 200, 300, 400, 500, 600].map((x) => (
          <line
            key={`hero-v-${x}`}
            x1={x}
            y1="30"
            x2={x}
            y2="300"
            stroke="#f8fafc"
          />
        ))}


        {/* PRICE SWINGS */}
        <polyline
          points="
            45,270
            125,190
            185,225
            275,135
            345,185
            445,92
            515,150
            655,52
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* SWING HIGH */}
        <circle
          cx="275"
          cy="135"
          r="7"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="275"
          y="111"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* PULLBACK */}
        <circle
          cx="345"
          cy="185"
          r="7"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="345"
          y="211"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          تصحيح
        </text>


        {/* ENTRY ZONE */}
        <rect
          x="320"
          y="166"
          width="82"
          height="38"
          rx="10"
          fill="#dcfce7"
          fillOpacity="0.7"
          stroke="#22c55e"
          strokeWidth="1.5"
        />

        <text
          x="361"
          y="181"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          منطقة
        </text>

        <text
          x="361"
          y="194"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          اهتمام
        </text>


        {/* NEXT SWING */}
        <circle
          cx="445"
          cy="92"
          r="7"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="445"
          y="68"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          قمة جديدة
        </text>


        {/* TREND */}
        <line
          x1="90"
          y1="285"
          x2="620"
          y2="78"
          stroke="#16a34a"
          strokeWidth="2"
          strokeDasharray="8 6"
        />

        <text
          x="575"
          y="110"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          اتجاه صاعد
        </text>


        {/* BOTTOM SUMMARY */}
        <rect
          x="155"
          y="286"
          width="410"
          height="29"
          rx="14.5"
          fill="#0f172a"
        />

        <text
          x="360"
          y="304"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          لا تحاول اصطياد القاع تمامًا — ابحث عن جزء واضح من الحركة
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO ZOOM
========================================================= */

function SwingHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span className="text-[11px] font-black text-slate-800">
          فكرة Swing Trading
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          Swing
        </span>

      </div>


      <svg
        viewBox="0 0 360 255"
        className="block w-full"
        role="img"
        aria-label="مثال مبسط لاستراتيجية السوينغ على الهاتف"
      >

        <rect width="360" height="255" fill="#ffffff" />


        {[55, 105, 155, 205].map((y) => (
          <line
            key={`mobile-${y}`}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <polyline
          points="
            25,215
            80,160
            125,188
            185,120
            230,153
            330,62
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* HIGH */}
        <circle
          cx="185"
          cy="120"
          r="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <text
          x="185"
          y="99"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          قمة
        </text>


        {/* PULLBACK */}
        <circle
          cx="230"
          cy="153"
          r="6"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        <text
          x="230"
          y="177"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#b45309"
        >
          تصحيح
        </text>


        {/* CONTINUATION */}
        <text
          x="295"
          y="55"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          استمرار
        </text>


        {/* SUMMARY */}
        <rect
          x="55"
          y="218"
          width="250"
          height="25"
          rx="12.5"
          fill="#0f172a"
        />

        <text
          x="180"
          y="234"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#ffffff"
        >
          اتجاه ← تصحيح ← دخول ← Swing جديد
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   SWING HIGH / LOW CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function SwingHighLowChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          Swing High وSwing Low
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          القمم والقيعان التي تتكون أثناء حركة السعر
        </p>

      </div>


      <svg
        viewBox="0 0 760 340"
        className="block w-full"
        role="img"
        aria-label="رسم يوضح Swing High وSwing Low في حركة السعر"
      >

        <rect width="760" height="340" fill="#ffffff" />


        {/* GRID */}
        {[70, 140, 210, 280].map((y) => (
          <line
            key={`swing-grid-${y}`}
            x1="40"
            y1={y}
            x2="720"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* PRICE */}
        <polyline
          points="
            50,265
            135,165
            210,225
            305,115
            390,190
            490,82
            575,155
            700,55
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* SWING HIGH 1 */}
        <circle
          cx="135"
          cy="165"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="135"
          y="138"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* SWING LOW 1 */}
        <circle
          cx="210"
          cy="225"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="210"
          y="254"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Swing Low
        </text>


        {/* SWING HIGH 2 */}
        <circle
          cx="305"
          cy="115"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="305"
          y="88"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* SWING LOW 2 */}
        <circle
          cx="390"
          cy="190"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="390"
          y="219"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Swing Low
        </text>


        {/* HIGHER HIGH */}
        <circle
          cx="490"
          cy="82"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="490"
          y="55"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          قمة أعلى
        </text>


        {/* HIGHER LOW */}
        <circle
          cx="575"
          cy="155"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="575"
          y="184"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          قاع أعلى
        </text>


        {/* EXPLANATION */}
        <rect
          x="175"
          y="290"
          width="410"
          height="30"
          rx="15"
          fill="#f8fafc"
          stroke="#e2e8f0"
        />

        <text
          x="380"
          y="309"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#475569"
        >
          السوينغ هو الحركة بين قمة وقاع مهمين في هيكل السعر
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        {chart}
      </div>


      {/* MOBILE PREVIEW */}
      <a
        href="#swing-high-low-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير رسم Swing High وSwing Low"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            تكبير الرسم
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* MOBILE FULLSCREEN */}
      <div
        id="swing-high-low-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#swing-high-low"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Swing High وSwing Low
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                شاهد كيف تتكون القمم والقيعان أثناء حركة السعر
              </div>

            </div>


            <a
              href="#swing-high-low"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>


          {/* SWIPE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
            </span>

          </div>


          {/* SCROLLABLE CHART */}
          <div
            dir="ltr"
            className="overflow-x-auto overflow-y-auto bg-white"
          >

            <div className="min-w-[820px] p-3">
              <SwingHighLowChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   PULLBACK CHART
========================================================= */

function SwingPullbackChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          مثال: الدخول بعد التصحيح داخل اتجاه صاعد
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          الفكرة ليست شراء أي هبوط — بل انتظار التصحيح عند منطقة منطقية
        </p>

      </div>


      <svg
        viewBox="0 0 760 350"
        className="block w-full"
        role="img"
        aria-label="مثال على استراتيجية Swing Trading باستخدام التصحيح داخل اتجاه صاعد"
      >

        <rect width="760" height="350" fill="#ffffff" />


        {[70, 140, 210, 280].map((y) => (
          <line
            key={`pullback-${y}`}
            x1="40"
            y1={y}
            x2="720"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* SUPPORT ZONE */}
        <rect
          x="315"
          y="205"
          width="190"
          height="55"
          rx="12"
          fill="#ecfdf5"
          stroke="#86efac"
        />

        <text
          x="410"
          y="237"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          منطقة دعم / اهتمام
        </text>


        {/* PRICE */}
        <polyline
          points="
            55,285
            145,205
            220,238
            315,142
            405,225
            470,205
            565,120
            690,70
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PRIOR HIGH */}
        <line
          x1="265"
          y1="142"
          x2="520"
          y2="142"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="7 5"
        />

        <text
          x="278"
          y="128"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          قمة سابقة
        </text>


        {/* PULLBACK */}
        <circle
          cx="405"
          cy="225"
          r="8"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="405"
          y="278"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          Pullback
        </text>


        {/* CONFIRMATION */}
        <circle
          cx="470"
          cy="205"
          r="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="470"
          y="188"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1d4ed8"
        >
          تأكيد
        </text>


        {/* ENTRY */}
        <line
          x1="493"
          y1="202"
          x2="545"
          y2="202"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="550"
          y="206"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          دخول
        </text>


        {/* STOP */}
        <line
          x1="350"
          y1="268"
          x2="475"
          y2="268"
          stroke="#e11d48"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="485"
          y="272"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          وقف محتمل
        </text>


        {/* TARGET */}
        <line
          x1="545"
          y1="105"
          x2="690"
          y2="105"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="620"
          y="92"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1d4ed8"
        >
          هدف / Swing High
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      <div className="hidden md:block">
        {chart}
      </div>


      <a
        href="#swing-pullback-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير مثال الدخول بعد التصحيح"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            تكبير المثال
            <span>↗</span>
          </span>

        </div>

      </a>


      <div
        id="swing-pullback-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#pullback"
          className="absolute inset-0"
          aria-label="إغلاق المثال"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                مثال Swing Pullback
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                الاتجاه ← التصحيح ← التأكيد ← الدخول
              </div>

            </div>


            <a
              href="#pullback"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>


          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
            </span>

          </div>


          <div
            dir="ltr"
            className="overflow-x-auto overflow-y-auto bg-white"
          >

            <div className="min-w-[820px] p-3">
              <SwingPullbackChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function SwingTradingStrategyPage() {

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: "ar",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },

    author: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },

    about: [
      {
        "@type": "Thing",
        name: "Swing Trading",
      },
      {
        "@type": "Thing",
        name: "Swing Trading Strategy",
      },
      {
        "@type": "Thing",
        name: "Forex Swing Trading",
      },
      {
        "@type": "Thing",
        name: "Swing High and Swing Low",
      },
      {
        "@type": "Thing",
        name: "Pullback Trading",
      },
      {
        "@type": "Thing",
        name: "Technical Analysis",
      },
    ],

    keywords: [
  "استراتيجية السوينغ",
  "تداول السوينغ",
  "Swing Trading",
  "Swing Trading Strategy",
  "استراتيجية Swing Trading",
  "السوينغ في الفوركس",
  "Swing Trading Forex",
  "استراتيجية السوينغ للمبتدئين",
  "تعلم Swing Trading",
  "Swing High",
  "Swing Low",
  "Swing High and Swing Low",
  "Pullback Trading",
  "تداول التصحيحات",
  "استراتيجية التصحيح",
  "تداول متوسط المدى",
  "استراتيجيات التداول",
  "استراتيجيات الفوركس",
  "هيكل السوق",
  "إدارة مخاطر السوينغ",
],
  };


  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "استراتيجيات التداول",
        item: `${BASE_URL}/strategies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "استراتيجية السوينغ",
        item: PAGE_URL,
      },
    ],
  };


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50/40 pb-6 text-right md:pb-10"
    >

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-4 pt-3 md:px-6">

        <nav
          aria-label="مسار التنقل"
          className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500"
        >

          <Link
            href="/"
            className="transition hover:text-brand-600"
          >
            الرئيسية
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href="/strategies"
            className="transition hover:text-brand-600"
          >
            استراتيجيات التداول
          </Link>

          <span className="text-slate-300">/</span>

          <span className="text-slate-700">
            Swing Trading
          </span>

        </nav>

      </div>


            {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

        {/* ===================================================
            DESKTOP HERO
        =================================================== */}
        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div
  dir="ltr"
  className="grid min-h-[410px] lg:grid-cols-[0.9fr_1.1fr]"
>

            {/* =================================================
                VISUAL — LEFT
            ================================================= */}
            <div className="flex items-center justify-center border-l-0 border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:border-l-0 lg:border-r lg:p-8">

              <div className="w-full max-w-[560px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

                {/* WINDOW HEADER */}
                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <span
                    dir="ltr"
                    className="text-[10px] font-black text-slate-700"
                  >
                    Swing Trading Model
                  </span>


                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>

                </div>


                {/* CHART */}
                <div className="p-4">
                  <SwingHeroDesktopChart />
                </div>

              </div>

            </div>


            {/* =================================================
                CONTENT — RIGHT
            ================================================= */}
            <div className="flex flex-col justify-center px-8 py-7 text-right lg:px-10 xl:px-12">

              {/* BADGES */}
              <div className="flex flex-wrap justify-start gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span
                  dir="ltr"
                  className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600"
                >
                  Swing Trading
                </span>

              </div>


              {/* TITLE */}
              <h1 className="mt-4 max-w-[880px] text-[34px] font-black leading-[1.22] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">

                استراتيجية السوينغ{" "}

                <span
                  dir="ltr"
                  className="text-brand-600"
                >
                  Swing Trading
                </span>

                : شرح شامل للمبتدئين

              </h1>


              {/* DESCRIPTION */}
              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">

                تعلم كيف يستخدم متداول السوينغ{" "}

                <strong className="font-black text-slate-900">
                  الاتجاه والقمم والقيعان والتصحيحات
                </strong>{" "}

                للبحث عن حركات سعرية قد تستمر عدة أيام أو أسابيع، وكيفية
                تحديد مناطق الدخول ووقف الخسارة والأهداف ضمن خطة تداول واضحة.

              </p>


              {/* TOPICS */}
              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  Swing High & Low
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
                  الاتجاه
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  Pullback
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  إدارة المخاطر
                </span>

              </div>


              {/* META */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 26 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  آخر تحديث: 26 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  وقت القراءة 15–20 دقيقة
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            MOBILE HERO
            SAME STRATEGY STYLE — NO ZOOM
        =================================================== */}
        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            {/* CONTENT */}
            <div className="px-4 pb-2.5 pt-3.5">

              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span
                  dir="ltr"
                  className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600"
                >
                  Swing Trading
                </span>

              </div>


              {/* TITLE */}
              <h1 className="mt-3 text-[26px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">

                استراتيجية السوينغ{" "}

                <span
                  dir="ltr"
                  className="text-brand-600"
                >
                  Swing Trading
                </span>

                : شرح شامل للمبتدئين

              </h1>


              {/* DESCRIPTION */}
              <p className="mt-3 text-[14px] leading-[1.85] text-slate-600">

                تعلم قراءة{" "}

                <strong className="font-black text-slate-900">
                  الاتجاه وSwing High وSwing Low والتصحيحات
                </strong>{" "}

                لبناء صفقات متوسطة المدى بطريقة منظمة وواضحة.

              </p>


              {/* META */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 26 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 دقيقة
                </span>

              </div>

            </div>


            {/* MOBILE CHART — NO ZOOM */}
            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <SwingHeroMobileChart />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-5 sm:px-4 md:px-6 md:py-8 lg:px-8">

        <article className="space-y-5 md:space-y-6">


          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

              <div className="p-4 md:p-7">

                <SectionLabel>
                  قبل أن تبدأ
                </SectionLabel>

                <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                  ما هو Swing Trading ببساطة؟
                </h2>


                <p className="mt-3 text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  السوق نادرًا ما يتحرك في خط مستقيم. حتى داخل الاتجاه الصاعد
                  توجد موجات صعود يتخللها هبوط أو تصحيح، وداخل الاتجاه الهابط
                  تظهر ارتدادات صاعدة قبل أن يستكمل السعر هبوطه.
                </p>


                <p className="mt-3 text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  متداول السوينغ يحاول الاستفادة من إحدى هذه{" "}
                  <strong className="font-black text-slate-900">
                    الموجات السعرية
                  </strong>
                  . فهو لا يحتاج بالضرورة إلى الدخول عند القاع المطلق والخروج
                  عند القمة المطلقة، بل يبحث عن حركة يمكن تعريف بدايتها
                  وإبطالها وهدفها بطريقة منطقية.
                </p>


                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "حدد السياق",
                      text: "هل السوق صاعد، هابط أم يتحرك داخل نطاق؟",
                    },
                    {
                      no: "02",
                      title: "انتظر الحركة",
                      text: "راقب التصحيح أو الاقتراب من منطقة مهمة.",
                    },
                    {
                      no: "03",
                      title: "خطط للصفقة",
                      text: "حدد الدخول والإبطال والهدف قبل المخاطرة.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="rounded-[15px] border border-slate-200 bg-slate-50/60 p-3.5"
                    >

                      <div className="flex items-center gap-2">

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </span>

                        <h3 className="text-[13px] font-black text-slate-950">
                          {item.title}
                        </h3>

                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* SIMPLE CONCEPT */}
              <div className="border-t border-slate-200 bg-slate-50/60 p-4 md:p-6 lg:border-r lg:border-t-0">

                <div className="text-[10px] font-black text-brand-600">
                  الفكرة الأساسية
                </div>

                <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                  أنت لا تتداول كل حركة على الشارت
                </h3>

                <p className="mt-2 text-justify text-[13px] leading-7 text-slate-600">
                  الهدف هو اختيار حركة لها سياق واضح، وليس الدخول في كل صعود
                  أو هبوط صغير. لذلك يكون فهم هيكل السوق أهم من مجرد العثور
                  على شمعة أو مؤشر يعطي إشارة.
                </p>


                <div className="mt-4 space-y-2">

                  {[
                    ["اتجاه واضح", "اعرف أين يتحرك السوق بشكل عام."],
                    ["Swing واضح", "حدد القمم والقيعان المهمة."],
                    ["منطقة منطقية", "انتظر السعر بدل مطاردته."],
                    ["إبطال واضح", "اعرف متى تصبح فكرتك خاطئة."],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />

                      <div>

                        <div className="text-[12px] font-black text-slate-900">
                          {title}
                        </div>

                        <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {text}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              01 — SWING HIGH / SWING LOW
          ================================================= */}

          <section
            id="swing-high-low"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — أساس الاستراتيجية
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما هو Swing High وما هو Swing Low؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لفهم تداول السوينغ يجب أولًا أن ترى حركة السعر كسلسلة من
                القمم والقيعان. عندما يصعد السعر ثم يتراجع تتكون{" "}
                <strong className="font-black text-slate-900">
                  Swing High
                </strong>
                ، وعندما يهبط ثم يرتد إلى الأعلى تتكون{" "}
                <strong className="font-black text-slate-900">
                  Swing Low
                </strong>
                . العلاقة بين هذه القمم والقيعان تساعدك على قراءة الاتجاه
                بدل النظر إلى كل شمعة منفردة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* VISUAL */}
              <SwingHighLowChart />


              {/* EXPLANATION */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-blue-100 bg-blue-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-blue-700">
                    Swing High
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    قمة يتراجع السعر بعدها
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    هي منطقة وصل إليها السعر أثناء الصعود ثم بدأ منها حركة
                    هبوط أو تصحيح. مقارنة القمم الجديدة بالقمم السابقة تساعد
                    على معرفة ما إذا كان الاتجاه يحافظ على قوته أم يضعف.
                  </p>

                </article>


                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Swing Low
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    قاع يرتد السعر منه إلى الأعلى
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    هو قاع محلي تتوقف عنده موجة الهبوط ويبدأ السعر بالصعود.
                    في الاتجاه الصاعد، تكوين قيعان أعلى بشكل متتابع قد يشير
                    إلى استمرار سيطرة المشترين على هيكل السوق.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تعامل كل قمة وقاع صغير على أنه Swing مهم">
                  كلما نزلت إلى فريمات صغيرة ستشاهد عددًا هائلًا من القمم
                  والقيعان. ركز على النقاط التي أحدثت حركة سعرية واضحة أو
                  أثرت في هيكل السوق، بدل وضع علامة على كل انعطاف صغير.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — HOW IT WORKS
          ================================================= */}

          <section
            id="how-it-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — كيف تعمل؟
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تعمل استراتيجية Swing Trading خطوة بخطوة؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                أحد أبسط نماذج السوينغ هو التداول مع الاتجاه بعد حدوث تصحيح.
                بدل شراء السعر بعد أن يكون قد صعد بقوة، ينتظر المتداول عودة
                السعر إلى منطقة منطقية ثم يبحث عن دليل على أن الاتجاه قد
                يستأنف حركته.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* STEPS */}
              <div className="grid gap-3 md:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "حدد الاتجاه",
                    text: "ابدأ من الفريم الأعلى وحدد بنية السوق العامة.",
                  },
                  {
                    no: "02",
                    title: "حدد الـSwing",
                    text: "راقب القمم والقيعان التي تحرك السعر بوضوح.",
                  },
                  {
                    no: "03",
                    title: "انتظر التصحيح",
                    text: "لا تطارد الحركة بعد امتدادها بعيدًا.",
                  },
                  {
                    no: "04",
                    title: "ابحث عن تأكيد",
                    text: "راقب استجابة السعر عند منطقة الاهتمام.",
                  },
                  {
                    no: "05",
                    title: "حدد المخاطرة",
                    text: "ضع الإبطال والهدف قبل تنفيذ الصفقة.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* PULLBACK VISUAL */}
              <div
                id="pullback"
                className="mt-4 scroll-mt-24"
              >
                <SwingPullbackChart />
              </div>


              {/* READ THE EXAMPLE */}
              <div className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    اقرأ المثال
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    لماذا لا ندخل بمجرد أن يبدأ السعر بالهبوط؟
                  </h3>

                  <p className="mt-2 text-justify text-[13px] leading-7 text-slate-600">
                    لأن الهبوط قد يكون مجرد تصحيح داخل الاتجاه، وقد يكون
                    بداية انعكاس حقيقي. لذلك نبدأ بالسياق: هل الاتجاه ما زال
                    صاعدًا؟ هل وصل التصحيح إلى دعم أو منطقة سابقة مهمة؟ وهل
                    ظهر رد فعل يدل على عودة المشترين؟
                  </p>


                  <div className="mt-3 grid gap-2 sm:grid-cols-3">

                    {[
                      ["1", "السياق", "الاتجاه العام ما زال صاعدًا."],
                      ["2", "المكان", "السعر عاد إلى منطقة دعم."],
                      ["3", "التأكيد", "ظهر رد فعل قبل الدخول."],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="rounded-[12px] bg-slate-50 px-3 py-2.5"
                      >

                        <div className="text-[9px] font-black text-brand-600">
                          {no}
                        </div>

                        <div className="mt-0.5 text-[12px] font-black text-slate-950">
                          {title}
                        </div>

                        <div className="mt-1 text-[10px] leading-5 text-slate-500">
                          {text}
                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-amber-700">
                    خطأ شائع
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    مطاردة السعر بعد حركة قوية
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    عندما يصعد السوق بسرعة قد يشعر المتداول أنه سيفوّت
                    الفرصة، فيدخل بعد أن أصبح السعر بعيدًا عن منطقة الإبطال.
                    النتيجة قد تكون وقفًا أوسع أو نسبة عائد إلى مخاطرة أقل.
                    في السوينغ، الصبر على التصحيح جزء من الاستراتيجية نفسها.
                  </p>

                </aside>

              </div>

            </div>

          </section>
                    {/* =================================================
              03 — SWING TRADING SETUPS
          ================================================= */}

          <section
            id="swing-setups"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — نماذج التداول
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أشهر نماذج Swing Trading التي يبحث عنها المتداول
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا توجد طريقة واحدة فقط لتداول السوينغ. الفكرة الأساسية هي
                انتظار حركة سعرية لها سياق واضح، لكن نقطة الدخول قد تأتي بعد
                تصحيح داخل الاتجاه، أو بعد اختراق وإعادة اختبار، أو من منطقة
                دعم أو مقاومة مهمة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    no: "01",
                    label: "مع الاتجاه",
                    title: "Pullback Setup",
                    text: "انتظار تصحيح داخل اتجاه واضح ثم البحث عن استئناف الحركة.",
                  },
                  {
                    no: "02",
                    label: "اختراق",
                    title: "Breakout & Retest",
                    text: "اختراق مستوى مهم ثم العودة إليه قبل استمرار الحركة.",
                  },
                  {
                    no: "03",
                    label: "مستويات",
                    title: "Support / Resistance",
                    text: "استغلال رد فعل السعر عند مناطق دعم أو مقاومة مهمة.",
                  },
                  {
                    no: "04",
                    label: "انعكاس",
                    title: "Reversal Setup",
                    text: "البحث عن تغير حقيقي في البنية بعد ضعف الاتجاه السابق.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </div>

                      <div>
                        <div className="text-[8px] font-black text-brand-600">
                          {item.label}
                        </div>

                        <h3 className="mt-0.5 text-[14px] font-black text-slate-950">
                          {item.title}
                        </h3>
                      </div>

                    </div>

                    <p className="mt-2 text-justify text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  أي نموذج أفضل؟
                </h3>

                <p className="mt-2 text-justify text-[13px] leading-7 text-slate-600">
                  لا يوجد Setup واحد هو الأفضل في جميع الظروف. نموذج
                  Pullback مثلًا يكون أكثر منطقية عندما يكون الاتجاه واضحًا،
                  بينما نموذج Breakout & Retest يحتاج إلى مستوى مهم واختراق
                  فعلي. الأهم أن تختار النموذج الذي يناسب حالة السوق بدل
                  محاولة استخدام نفس المدخل في كل مكان.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — PULLBACK VS REVERSAL
          ================================================= */}

          <section
            id="pullback-vs-reversal"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — التصحيح أم الانعكاس؟
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تفرق بين Pullback وReversal في Swing Trading؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                هذه من أهم النقاط في تداول السوينغ. ليس كل هبوط داخل اتجاه
                صاعد يعني أن الاتجاه انتهى، وليس كل ارتداد داخل اتجاه هابط
                يعني بداية صعود جديد. الفرق يظهر من خلال{" "}
                <strong className="font-black text-slate-900">
                  هيكل السوق والمستويات التي يحافظ عليها السعر أو يكسرها
                </strong>
                .
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[9px] font-black text-emerald-700">
                    Pullback
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    تصحيح مؤقت داخل الاتجاه
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    السعر يتحرك عكس الاتجاه لفترة قصيرة لكنه لا يكسر البنية
                    الرئيسية. في الاتجاه الصاعد مثلًا قد يتراجع السعر ثم
                    يحافظ على قاع أعلى قبل استكمال الصعود.
                  </p>

                  <div className="mt-3 space-y-2">

                    {[
                      "الاتجاه الرئيسي ما زال واضحًا.",
                      "القاع أو القمة الهيكلية المهمة لم تُكسر.",
                      "الحركة العكسية أضعف من الموجة الرئيسية.",
                      "السعر يقترب من دعم أو منطقة اهتمام.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

                        <span className="text-[11px] leading-5 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[9px] font-black text-rose-700">
                    Reversal
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    تغير محتمل في الاتجاه
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    الانعكاس يصبح أكثر احتمالًا عندما يفشل الاتجاه السابق في
                    صنع قمة أو قاع جديد، ثم تبدأ البنية نفسها بالتغير ويكسر
                    السعر مستويات كانت تحافظ على الاتجاه.
                  </p>

                  <div className="mt-3 space-y-2">

                    {[
                      "فشل السعر في استمرار البنية القديمة.",
                      "كسر قاع مهم في الاتجاه الصاعد أو قمة مهمة في الاتجاه الهابط.",
                      "ظهور قمم وقيعان تدعم الاتجاه الجديد.",
                      "تغير واضح في الزخم وسلوك السعر.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />

                        <span className="text-[11px] leading-5 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تفترض الانعكاس لمجرد ظهور شمعة قوية">
                  شمعة هابطة كبيرة داخل اتجاه صاعد لا تعني وحدها أن الاتجاه
                  انعكس. قارنها بهيكل السوق والمستويات المهمة، ثم راقب هل بدأ
                  السعر فعلًا في تكوين قمم وقيعان تدعم الاتجاه الجديد.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — BULLISH / BEARISH SWING
          ================================================= */}

          <section
            id="bullish-bearish-swing"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — اتجاه الصفقة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Swing Trading في الاتجاه الصاعد والهابط
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يمكن تطبيق تداول السوينغ على الاتجاهات الصاعدة والهابطة. الفرق
                هو أنك تبحث في الاتجاه الصاعد عن تصحيح قد يسمح باستمرار
                الحركة لأعلى، بينما تراقب في الاتجاه الهابط ارتدادًا صاعدًا
                قد يوفر فرصة لاستمرار الهبوط.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* BULLISH */}
                <article className="rounded-[20px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <div className="text-[9px] font-black text-emerald-700">
                        Bullish Swing
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        صفقة Swing شراء
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-600 text-[14px] font-black text-white">
                      ↑
                    </div>

                  </div>


                  <div className="mt-4 space-y-2">

                    {[
                      ["السياق", "اتجاه صاعد أو تحول صاعد واضح."],
                      ["الانتظار", "تصحيح نحو دعم أو منطقة اهتمام."],
                      ["التأكيد", "عودة ضغط المشترين."],
                      ["الإبطال", "كسر القاع الذي تعتمد عليه الفكرة."],
                      ["الهدف", "قمة سابقة أو منطقة سعرية منطقية."],
                    ].map(([label, text]) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <span className="min-w-[62px] text-[10px] font-black text-emerald-700">
                          {label}
                        </span>

                        <span className="text-[11px] leading-5 text-slate-600">
                          {text}
                        </span>

                      </div>
                    ))}

                  </div>

                </article>


                {/* BEARISH */}
                <article className="rounded-[20px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <div className="text-[9px] font-black text-rose-700">
                        Bearish Swing
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        صفقة Swing بيع
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-600 text-[14px] font-black text-white">
                      ↓
                    </div>

                  </div>


                  <div className="mt-4 space-y-2">

                    {[
                      ["السياق", "اتجاه هابط أو تحول هابط واضح."],
                      ["الانتظار", "ارتداد نحو مقاومة أو منطقة اهتمام."],
                      ["التأكيد", "عودة ضغط البائعين."],
                      ["الإبطال", "كسر القمة التي تعتمد عليها الفكرة."],
                      ["الهدف", "قاع سابق أو منطقة سعرية منطقية."],
                    ].map(([label, text]) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <span className="min-w-[62px] text-[10px] font-black text-rose-700">
                          {label}
                        </span>

                        <span className="text-[11px] leading-5 text-slate-600">
                          {text}
                        </span>

                      </div>
                    ))}

                  </div>

                </article>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — SUPPORT & RESISTANCE
          ================================================= */}

          <section
            id="swing-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — مناطق الدخول
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تستخدم الدعم والمقاومة في Swing Trading؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الدعم والمقاومة يساعدان متداول السوينغ على تحديد الأماكن التي
                قد تصبح فيها الصفقة أكثر منطقية. لكن المستوى ليس إشارة دخول
                بحد ذاته. الأفضل اعتباره{" "}
                <strong className="font-black text-slate-900">
                  منطقة للمراقبة
                </strong>{" "}
                ثم تقييم رد فعل السعر عند وصوله إليها.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "دعم داخل اتجاه صاعد",
                    text: "انتظر التصحيح إلى دعم ثم راقب هل يحافظ السعر على القاع.",
                  },
                  {
                    no: "02",
                    title: "مقاومة داخل اتجاه هابط",
                    text: "راقب الارتداد إلى مقاومة ثم ظهور ضعف في الحركة الصاعدة.",
                  },
                  {
                    no: "03",
                    title: "تحول الدور",
                    text: "المقاومة المكسورة قد تصبح دعمًا، والدعم المكسور قد يتحول إلى مقاومة.",
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      لا تدخل لمجرد أن السعر لمس الدعم أو المقاومة
                    </h3>

                    <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                      المنطقة تخبرك أين تراقب، وليست أمرًا مباشرًا بالشراء أو
                      البيع. راقب كيف يتصرف السعر داخل المنطقة، وهل هناك
                      رفض أو تغير في الزخم أو استمرار في هيكل الاتجاه.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              07 — BREAKOUT & RETEST
          ================================================= */}

          <section
            id="swing-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — اختراق وإعادة اختبار
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Breakout وRetest في استراتيجية السوينغ
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                من أكثر سيناريوهات السوينغ وضوحًا أن يكسر السعر مستوى مهمًا،
                ثم يعود لاختباره قبل استمرار الحركة. هذه العودة قد تعطي
                المتداول فرصة لتحديد إبطال أقرب بدل الدخول بعد امتداد السعر
                بعيدًا عن المستوى.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  ["01", "مستوى واضح", "حدد مقاومة أو دعمًا له معنى."],
                  ["02", "اختراق", "انتظر خروج السعر وإغلاقه خارج المنطقة."],
                  ["03", "Retest", "راقب عودة السعر للمستوى المكسور."],
                  ["04", "تأكيد", "قيّم رد الفعل قبل الدخول."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {no}
                      </div>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="الاختراق وحده ليس كافيًا">
                  بعض الاختراقات تفشل سريعًا ويعود السعر داخل النطاق السابق.
                  لذلك لا تتعامل مع كل كسر للمستوى كفرصة مؤكدة. راقب الإغلاق
                  وسلوك السعر بعد الاختراق وما إذا كان المستوى الجديد قادرًا
                  على الثبات أثناء إعادة الاختبار.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              08 — COMPLETE SWING EXAMPLE
          ================================================= */}

          <section
            id="swing-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — مثال كامل
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مثال عملي على صفقة Swing Trading من البداية إلى النهاية
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لنفترض أن السوق يتحرك في اتجاه صاعد، ثم بدأ تصحيحًا نحو
                منطقة دعم سابقة. بدل الدخول فورًا، ننتظر رد فعل واضح ثم نبني
                الصفقة بحيث يكون لدينا دخول وإبطال وهدف محدد مسبقًا.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* STEPS */}
              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  ["01", "حدد الاتجاه", "هيكل صاعد."],
                  ["02", "حدد الدعم", "منطقة منطقية."],
                  ["03", "انتظر التصحيح", "لا تطارد السعر."],
                  ["04", "راقب التأكيد", "عودة المشترين."],
                  ["05", "حدد الوقف", "أسفل إبطال الفكرة."],
                  ["06", "حدد الهدف", "قمة أو مستوى منطقي."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {no}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-1.5 text-[9px] leading-5 text-slate-500">
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE STEPS */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "حدد الاتجاه", "هيكل صاعد."],
                  ["02", "حدد الدعم", "منطقة منطقية."],
                  ["03", "انتظر التصحيح", "لا تطارد الحركة."],
                  ["04", "انتظر التأكيد", "عودة المشترين."],
                  ["05", "حدد الوقف", "خلف إبطال الفكرة."],
                  ["06", "حدد الهدف", "مستوى منطقي."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div>
                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>


              {/* TRADE LOGIC */}
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black text-brand-600">
                    منطق الصفقة
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    لماذا أصبحت الفكرة قابلة للدراسة؟
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    لأن القرار لم يعتمد على مؤشر واحد أو شمعة واحدة. الاتجاه
                    صاعد، والتصحيح وصل إلى منطقة دعم، والسعر أظهر رد فعل،
                    ولدينا نقطة واضحة يصبح عندها السيناريو غير صالح.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      ["السياق", "اتجاه صاعد"],
                      ["المكان", "دعم / منطقة اهتمام"],
                      ["التصحيح", "عودة منظمة للسعر"],
                      ["التأكيد", "عودة الزخم الصاعد"],
                      ["الإبطال", "كسر القاع المهم"],
                      ["الهدف", "Swing High أو مقاومة"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                      >
                        <span className="text-[10px] text-slate-500">
                          {label}
                        </span>

                        <span className="text-[11px] font-black text-slate-800">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black text-brand-600">
                    قاعدة عملية
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    لا تحتاج لالتقاط كامل الحركة
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    الهدف من Swing Trading ليس الدخول عند أدنى نقطة والخروج
                    عند أعلى نقطة. يكفي أن تلتقط جزءًا منطقيًا من الحركة ضمن
                    خطة واضحة وقابلة للقياس وإدارة المخاطر.
                  </p>


                  <div className="mt-4 rounded-[14px] border border-brand-100 bg-white p-3">

                    <div className="grid grid-cols-3 gap-2 text-center">

                      <div>
                        <div className="text-[8px] font-black text-brand-600">
                          الدخول
                        </div>

                        <div className="mt-1 text-[10px] font-black text-slate-950">
                          بعد التأكيد
                        </div>
                      </div>

                      <div>
                        <div className="text-[8px] font-black text-rose-600">
                          الوقف
                        </div>

                        <div className="mt-1 text-[10px] font-black text-slate-950">
                          خلف الإبطال
                        </div>
                      </div>

                      <div>
                        <div className="text-[8px] font-black text-emerald-700">
                          الهدف
                        </div>

                        <div className="mt-1 text-[10px] font-black text-slate-950">
                          مستوى منطقي
                        </div>
                      </div>

                    </div>

                  </div>

                </aside>

              </div>

            </div>

          </section>
                    {/* =================================================
              09 — BEST TIMEFRAMES
          ================================================= */}

          <section
            id="timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — الفريمات الزمنية
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل فريمات Swing Trading؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا يوجد فريم واحد مناسب لكل متداول، لكن السوينغ يعتمد عادةً
                على فريمات أعلى من السكالبينغ والتداول اللحظي لأن الهدف هو
                التقاط حركة قد تستمر عدة أيام أو أسابيع. الفريم الأعلى يساعد
                على فهم الاتجاه والهيكل، بينما يمكن استخدام فريم أقل لتحسين
                نقطة الدخول.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    label: "تحليل عام",
                    timeframe: "Daily",
                    text: "مفيد لفهم الاتجاه الأكبر والمستويات الرئيسية.",
                  },
                  {
                    label: "Swing رئيسي",
                    timeframe: "4H",
                    text: "من أكثر الفريمات شيوعًا لقراءة حركة السوينغ.",
                  },
                  {
                    label: "تحسين الدخول",
                    timeframe: "1H",
                    text: "يمكن استخدامه لمراقبة سلوك السعر داخل المنطقة.",
                  },
                  {
                    label: "تفاصيل إضافية",
                    timeframe: "15m",
                    text: "اختياري لتحسين التنفيذ، وليس لتغيير السياق الأكبر.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="text-[9px] font-black text-brand-600">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[18px] font-black text-slate-950">
                      {item.timeframe}
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                <div className="text-[9px] font-black text-brand-600">
                  Multi-Timeframe Analysis
                </div>

                <h3 className="mt-1 text-[17px] font-black text-slate-950">
                  مثال بسيط لاستخدام أكثر من فريم
                </h3>

                <div className="mt-3 grid gap-2 md:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "اليومي",
                      text: "حدد الاتجاه والمناطق الكبيرة.",
                    },
                    {
                      no: "02",
                      title: "4 ساعات",
                      text: "راقب التصحيح والـSwing المحتمل.",
                    },
                    {
                      no: "03",
                      title: "ساعة",
                      text: "ابحث عن تأكيد يساعد على تحسين الدخول.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="flex items-center gap-3 rounded-[12px] bg-slate-50 px-3 py-2.5"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <div>

                        <div className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </div>

                        <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {item.text}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تجعل الفريم الصغير يربك الصورة الكبيرة">
                  كل فريم يحتوي على قمم وقيعان صغيرة قد تبدو مهمة، لكن في
                  Swing Trading يجب أن يبقى السياق الرئيسي واضحًا. استخدم
                  الفريم الأصغر لتحسين الدخول، وليس لتغيير الاتجاه كل بضع
                  شموع.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              10 — INDICATORS
          ================================================= */}

          <section
            id="indicators"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — أدوات مساعدة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أفضل مؤشرات Swing Trading: هل تحتاج مؤشرات أصلًا؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يمكن تداول السوينغ باستخدام حركة السعر وهيكل السوق فقط، لكن
                بعض المتداولين يستخدمون مؤشرات مثل المتوسطات المتحركة وRSI
                كأدوات مساعدة. المهم ألا يتحول المؤشر إلى بديل عن فهم السعر
                والسياق.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4">

                  <div className="text-[9px] font-black text-brand-600">
                    Moving Average
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    المتوسطات المتحركة
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يمكن استخدامها للمساعدة في رؤية الاتجاه العام أو مناطق
                    رجوع السعر، لكن مجرد لمس المتوسط لا يعتبر إشارة دخول
                    مستقلة.
                  </p>

                </article>


                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black text-emerald-700">
                    RSI
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    مؤشر القوة النسبية
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يمكن أن يساعد على تقييم الزخم أو حالات التشبع، لكن القراءة
                    وحدها لا تكفي بدون مستوى وسياق واضح.
                  </p>

                </article>


                <article className="rounded-[18px] border border-amber-100 bg-amber-50/40 p-4">

                  <div className="text-[9px] font-black text-amber-700">
                    Fibonacci
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    مستويات فيبوناتشي
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يستخدمها بعض متداولي السوينغ لمراقبة عمق التصحيح، ويفضل
                    دمجها مع هيكل السوق والدعم والمقاومة بدل استخدامها وحدها.
                  </p>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  الترتيب الأفضل للتحليل
                </h3>

                <div className="mt-3 grid gap-2 sm:grid-cols-4">

                  {[
                    ["1", "السعر"],
                    ["2", "هيكل السوق"],
                    ["3", "المستويات"],
                    ["4", "المؤشر كعامل مساعد"],
                  ].map(([no, text]) => (
                    <div
                      key={no}
                      className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </span>

                      <span className="text-[11px] font-black text-slate-700">
                        {text}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — MARKETS
          ================================================= */}

          <section
            id="markets"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — الأسواق
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                على أي أسواق يمكن تطبيق Swing Trading؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يمكن تطبيق مبادئ السوينغ على أسواق مختلفة طالما توجد حركة
                سعرية وسيولة كافية، لكن سلوك التذبذب وساعات التداول وتكاليف
                الاحتفاظ بالصفقة تختلف من سوق إلى آخر.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "الفوركس",
                    text: "مناسب لتتبع الاتجاهات والحركات التي تمتد عدة أيام.",
                  },
                  {
                    title: "الذهب",
                    text: "يتميز بتذبذب واضح وقد ينتج حركات Swing واسعة.",
                  },
                  {
                    title: "المؤشرات",
                    text: "يمكن متابعة الاتجاهات والتصحيحات على الفريمات الأعلى.",
                  },
                  {
                    title: "الأسهم",
                    text: "السوينغ شائع في الأسهم بسبب الحركات التي تستمر أيامًا أو أسابيع.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  انتبه لتكاليف الاحتفاظ بالصفقات
                </h3>

                <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                  لأن صفقة السوينغ قد تبقى مفتوحة عدة أيام، يجب الانتباه إلى
                  أي رسوم تبييت أو تكاليف تمويل أو فروقات أسعار قد تؤثر على
                  الصفقة بمرور الوقت.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                12 — إدارة المخاطر
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                إدارة المخاطر في Swing Trading
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لأن وقف الخسارة في صفقات السوينغ قد يكون أوسع من السكالبينغ،
                فإن حجم الصفقة يصبح مهمًا جدًا. الهدف ليس جعل الوقف قريبًا
                بأي ثمن، بل وضعه عند مكان منطقي ثم تعديل حجم الصفقة بحيث تبقى
                الخسارة المحتملة ضمن الحد الذي تسمح به خطتك.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">

                {[
                  {
                    label: "المخاطرة",
                    value: "محددة مسبقًا",
                    text: "اعرف الحد الأقصى للخسارة قبل الدخول.",
                  },
                  {
                    label: "الوقف",
                    value: "خلف الإبطال",
                    text: "ضعه حيث تصبح الفكرة غير صالحة.",
                  },
                  {
                    label: "الحجم",
                    value: "حسب الوقف",
                    text: "كلما اتسع الوقف يجب تعديل حجم الصفقة.",
                  },
                  {
                    label: "الهدف",
                    value: "منطقي",
                    text: "قمة أو قاع أو منطقة سعرية واضحة.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4"
                  >

                    <div className="text-[9px] font-black text-slate-500">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[14px] font-black text-slate-950 md:text-[16px]">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black text-brand-600">
                    مثال تعليمي
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    الوقف الأوسع لا يعني مخاطرة أكبر بالضرورة
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    إذا كانت نقطة الإبطال بعيدة نسبيًا، يمكن تقليل حجم الصفقة
                    بدل نقل الوقف إلى مكان غير منطقي فقط لجعله أقرب.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <h3 className="text-[17px] font-black text-slate-950">
                    استخدم حاسبة المخاطر
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    بعد تحديد مستوى الدخول والوقف، استخدم الحاسبة لتقدير حجم
                    الصفقة المناسب لنسبة المخاطرة التي اخترتها.
                  </p>

                  <Link
                    href="/tools/risk-calculator"
                    className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    فتح حاسبة المخاطر
                    <span className="mr-2">←</span>
                  </Link>

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تحرك وقف الخسارة فقط لتجنب الخسارة">
                  إذا وصل السعر إلى المستوى الذي يبطل السيناريو، فإن توسيع
                  الوقف بعد فتح الصفقة يزيد المخاطرة ويغير الخطة الأصلية.
                  تحديد الإبطال قبل الدخول هو جزء أساسي من الانضباط.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              13 — SWING VS DAY TRADING VS SCALPING
          ================================================= */}

          <section
            id="comparison"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                13 — مقارنة الأساليب
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                الفرق بين Swing Trading وDay Trading وScalping
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الفرق الأساسي ليس في كون أحد الأساليب أفضل من الآخر، بل في
                مدة الصفقة، عدد القرارات المطلوبة، الفريمات المستخدمة
                ودرجة المتابعة اليومية.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="overflow-hidden rounded-[18px] border border-slate-200">

                <div className="grid grid-cols-4 bg-slate-900 text-center text-[10px] font-black text-white">
                  <div className="p-3">العنصر</div>
                  <div className="p-3">Swing</div>
                  <div className="p-3">Day Trading</div>
                  <div className="p-3">Scalping</div>
                </div>

                {[
                  ["مدة الصفقة", "أيام–أسابيع", "دقائق–ساعات", "ثوانٍ–دقائق"],
                  ["المتابعة", "متوسطة", "مرتفعة", "مرتفعة جدًا"],
                  ["الفريمات", "1H–Daily", "5m–1H", "1m–5m"],
                  ["عدد الصفقات", "أقل", "متوسط", "كبير"],
                  ["الضغط التنفيذي", "أقل نسبيًا", "متوسط–مرتفع", "مرتفع جدًا"],
                ].map((row, index) => (
                  <div
                    key={row[0]}
                    className={`grid grid-cols-4 text-center text-[10px] text-slate-600 md:text-[11px] ${
                      index !== 4 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {row.map((cell, i) => (
                      <div
                        key={`${row[0]}-${i}`}
                        className={`p-3 ${
                          i === 0 ? "bg-slate-50 font-black text-slate-800" : ""
                        }`}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}

              </div>


              <div className="mt-4">

                <Link
                  href="/strategies/scalping"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-4 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                >
                  اقرأ استراتيجية السكالبينغ
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              14 — PROS & CONS
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                14 — التقييم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مميزات وعيوب Swing Trading
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                السوينغ يناسب بعض المتداولين لأنه لا يحتاج مراقبة الشاشة كل
                دقيقة، لكنه يتطلب صبرًا على الصفقة وقد يعرض المتداول لمخاطر
                الأخبار والحركات التي تحدث أثناء الليل أو نهاية الأسبوع بحسب
                السوق.
              </p>

            </div>


            <div className="grid md:grid-cols-2">

              <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-l md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
                    ✓
                  </div>

                  <h3 className="text-[18px] font-black text-slate-950">
                    المميزات
                  </h3>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100">

                  {[
                    "لا يتطلب متابعة مستمرة للشارت طوال اليوم.",
                    "يسمح باستهداف حركات أكبر نسبيًا من السكالبينغ.",
                    "يمكن استخدام فريمات أعلى تكون فيها البنية أوضح.",
                    "مناسب لمن لا يستطيع التداول بشكل لحظي طوال الوقت.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3 ? "border-b border-green-100/70" : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-[11px] font-black text-green-700">
                        ✓
                      </div>

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px]">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              <div className="p-4 md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rose-50 text-[14px] font-black text-rose-700">
                    ×
                  </div>

                  <h3 className="text-[18px] font-black text-slate-950">
                    العيوب والتحديات
                  </h3>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100">

                  {[
                    "الصفقات قد تبقى مفتوحة أثناء أخبار مهمة أو فجوات سعرية.",
                    "يتطلب الصبر وقد تمر أيام بدون فرصة مناسبة.",
                    "وقف الخسارة قد يكون أوسع من التداول قصير المدى.",
                    "الاحتفاظ بالصفقة قد يضيف رسوم تبييت أو تمويل.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3 ? "border-b border-rose-100/70" : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-black text-rose-700">
                        ×
                      </div>

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px]">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section
            id="beginner-roadmap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                خطة تعلم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تتعلم Swing Trading كمبتدئ؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا تبدأ بعشرات المؤشرات أو الاستراتيجيات في نفس الوقت. تعلم
                أولًا كيف ترى الاتجاه والـSwing High والـSwing Low، ثم انتقل
                إلى التصحيحات والمستويات وإدارة الصفقة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  ["01", "هيكل السوق", "افهم القمم والقيعان والاتجاه."],
                  ["02", "الدعم والمقاومة", "حدد المناطق المهمة."],
                  ["03", "Pullback", "تعلم التمييز بين التصحيح والانعكاس."],
                  ["04", "الدخول والإبطال", "اعرف أين تدخل ومتى تصبح الفكرة خاطئة."],
                  ["05", "إدارة المخاطر", "حدد حجم الصفقة والهدف."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </div>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "هيكل السوق", "قمم وقيعان واتجاه."],
                  ["02", "الدعم والمقاومة", "حدد المناطق المهمة."],
                  ["03", "Pullback", "افهم التصحيح مقابل الانعكاس."],
                  ["04", "الدخول والإبطال", "حدد الخطة قبل التنفيذ."],
                  ["05", "إدارة المخاطر", "الحجم والوقف والهدف."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 4 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div>
                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              FAQ
          ================================================= */}

          <section
            id="faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                الأسئلة الشائعة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أسئلة شائعة عن Swing Trading
              </h2>

            </div>


            <div className="divide-y divide-slate-200">

              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group bg-white"
                >

                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 md:px-6 md:py-4">

                    <h3 className="text-[13px] font-black leading-6 text-slate-950 md:text-[14px]">
                      {item.q}
                    </h3>

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[15px] font-black text-brand-600 transition-transform group-open:rotate-45">
                      +
                    </div>

                  </summary>


                  <div className="px-4 pb-4 md:px-6 md:pb-5">

                    <p className="max-w-5xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      {item.a}
                    </p>

                  </div>

                </details>
              ))}

            </div>

          </section>


          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 md:px-6 md:py-5">

              <div className="text-[9px] font-black text-brand-600">
                مواضيع مرتبطة
              </div>

              <h2 className="mt-1 text-[20px] font-black leading-7 text-slate-950 md:text-[26px]">
                أدلة تساعدك على تطوير استراتيجية السوينغ
              </h2>

            </div>


            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "استراتيجية",
                  title: "Price Action",
                  text: "تعلم قراءة حركة السعر وهيكل السوق.",
                  href: "/strategies/price-action",
                },
                {
                  label: "إدارة المخاطر",
                  title: "وقف الخسارة",
                  text: "تعرف على أهمية تحديد إبطال واضح للصفقة.",
                  href: "/learn-trading/stop-loss",
                },
                {
                  label: "إدارة الصفقة",
                  title: "جني الأرباح",
                  text: "كيفية التفكير في أهداف منطقية للصفقة.",
                  href: "/learn-trading/take-profit",
                },
                {
                  label: "حجم الصفقة",
                  title: "Lot Size",
                  text: "فهم العلاقة بين حجم الصفقة ووقف الخسارة.",
                  href: "/learn-trading/lot",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[17px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    {item.label}
                  </div>

                  <h3 className="mt-1.5 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>

                  <div className="mt-3 text-[11px] font-black text-brand-600">
                    اقرأ الدليل ←
                  </div>

                </Link>
              ))}

            </div>


            <div className="divide-y divide-slate-100 md:hidden">

              {[
                ["استراتيجية", "Price Action", "/strategies/price-action"],
                ["إدارة المخاطر", "وقف الخسارة", "/learn-trading/stop-loss"],
                ["إدارة الصفقة", "جني الأرباح", "/learn-trading/take-profit"],
                ["حجم الصفقة", "Lot Size", "/learn-trading/lot"],
              ].map(([label, title, href]) => (
                <Link
                  key={title}
                  href={href}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >

                  <div>
                    <div className="text-[9px] font-black text-brand-600">
                      {label}
                    </div>

                    <div className="mt-0.5 text-[13px] font-black text-slate-950">
                      {title}
                    </div>
                  </div>

                  <span className="text-[16px] font-black text-brand-600">
                    ←
                  </span>

                </Link>
              ))}

            </div>

          </section>


          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#f3f7fd_0%,#ffffff_60%,#f7faff_100%)] shadow-sm">

            <div className="px-4 py-4 md:flex md:items-center md:justify-between md:gap-8 md:px-7 md:py-5">

              <div className="min-w-0 flex-1">

                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 md:text-[10px]">
                  الخطوة التالية
                </span>

                <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] text-slate-950 md:text-[27px]">
                  اختبر استراتيجية السوينغ قبل التداول الحقيقي
                </h2>

                <p className="mt-2 max-w-4xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  تدرب على تحديد الاتجاه والـSwing High والـSwing Low
                  والتصحيحات على حساب تجريبي، وسجل النتائج قبل استخدام أموال
                  حقيقية.
                </p>

              </div>


              <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0">

                <Link
                  href="/tools"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-center text-[11px] font-black text-brand-600 transition hover:bg-brand-50 md:min-w-[140px]"
                >
                  أدوات التداول
                </Link>

                <Link
                  href="/best-brokers"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-center text-[11px] font-black text-white transition hover:bg-brand-700 md:min-w-[165px]"
                >
                  شركات التداول
                  <span className="mr-2">←</span>
                </Link>

              </div>

            </div>


            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-right md:text-[11px]">
                المحتوى تعليمي ولا يمثل توصية استثمارية أو إشارة تداول.
                التداول بالرافعة المالية ينطوي على مخاطر مرتفعة وقد يؤدي إلى
                خسارة رأس المال.
              </p>

            </div>

          </section>

        </article>

      </div>


      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

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

    </main>
  );
}