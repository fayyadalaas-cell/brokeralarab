import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   RSI TRADING STRATEGY — ARABIC
   Broker Alarab
   Path: /strategies/rsi
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/rsi`;

const PAGE_TITLE =
  "استراتيجية RSI: شرح مؤشر القوة النسبية وطريقة التداول";

const PAGE_DESCRIPTION =
  "شرح استراتيجية RSI ومؤشر القوة النسبية خطوة بخطوة، مع RSI 14 ومستويات 70 و30 و50، التشبع الشرائي والبيعي، الدايفرجنس، الدخول ووقف الخسارة وإدارة المخاطر.";


/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,

    languages: {
      ar: PAGE_URL,
      en: `${BASE_URL}/en/strategies/rsi`,
      "x-default": `${BASE_URL}/en/strategies/rsi`,
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
    locale: "ar_SA",
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
    q: "ما هو مؤشر RSI؟",
    a: "مؤشر RSI أو Relative Strength Index هو مؤشر زخم يتحرك بين 0 و100 ويقيس سرعة وقوة تغيرات السعر. يستخدمه المتداولون لتقييم الزخم ومناطق التشبع الشرائي والبيعي، ومراقبة الدايفرجنس وبعض إشارات تغير الزخم.",
  },
  {
    q: "ما هي أفضل إعدادات RSI؟",
    a: "الإعداد التقليدي والأكثر شيوعًا هو RSI بفترة 14، مع مستوى 70 للتشبع الشرائي و30 للتشبع البيعي. لكن الإعداد المناسب قد يختلف حسب السوق والإطار الزمني وطريقة التداول، لذلك لا يوجد إعداد واحد مثالي لجميع الحالات.",
  },
  {
    q: "ماذا يعني RSI فوق 70؟",
    a: "وصول RSI فوق 70 يعني تقليديًا أن الزخم الصاعد أصبح قويًا وأن السوق في منطقة تشبع شرائي. لكنه لا يعني أن السعر يجب أن يهبط فورًا، فقد يبقى RSI فوق 70 لفترة أثناء الاتجاه الصاعد القوي.",
  },
  {
    q: "ماذا يعني RSI تحت 30؟",
    a: "وصول RSI تحت 30 يشير تقليديًا إلى حالة تشبع بيعي، لكنه ليس إشارة شراء تلقائية. أثناء الاتجاه الهابط القوي قد يبقى RSI منخفضًا بينما يستمر السعر في الهبوط.",
  },
  {
    q: "ما أهمية مستوى 50 في مؤشر RSI؟",
    a: "مستوى 50 يمثل المنطقة الوسطى للمؤشر ويمكن استخدامه لفهم ميل الزخم. وجود RSI فوق 50 قد يدعم قراءة الزخم الصاعد، بينما وجوده تحت 50 قد يدعم قراءة الزخم الهابط، لكن يجب استخدام ذلك ضمن سياق السعر والاتجاه.",
  },
  {
    q: "ما هو RSI Divergence؟",
    a: "الدايفرجنس أو التباعد يحدث عندما يتحرك السعر ومؤشر RSI بصورة مختلفة. مثلًا قد يصنع السعر قاعًا أدنى بينما يصنع RSI قاعًا أعلى، وهو ما يسمى Bullish Divergence وقد يشير إلى ضعف الزخم الهابط، لكنه لا يضمن انعكاس السعر.",
  },
  {
    q: "هل استراتيجية RSI مناسبة للمبتدئين؟",
    a: "يمكن أن يكون RSI من المؤشرات السهلة نسبيًا للفهم، لكن استخدامه بطريقة صحيحة يتطلب فهم الاتجاه وهيكل السوق والدعم والمقاومة وإدارة المخاطر، وعدم الاعتماد على مستويات 70 و30 وحدها.",
  },
  {
    q: "ما أفضل فريم لاستخدام RSI؟",
    a: "يمكن استخدام RSI على أطر زمنية مختلفة، ولا يوجد فريم واحد هو الأفضل للجميع. الفريم المناسب يعتمد على أسلوب التداول، فالمتداول قصير الأجل يستخدم أطرًا أصغر بينما قد يعتمد متداول السوينغ على 4 ساعات أو اليومي.",
  },
];


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function RSIHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div className="text-left" dir="ltr">

          <div className="text-[13px] font-black text-slate-950">
            How Traders Read RSI
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            Price momentum → RSI zones → context → confirmation
          </div>

        </div>

        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600">
          RSI 14
        </span>

      </div>


      <svg
        viewBox="0 0 720 390"
        className="block w-full"
        role="img"
        aria-label="رسم تعليمي يوضح حركة السعر ومؤشر RSI ومستويات 70 و50 و30"
      >

        <rect width="720" height="390" fill="#ffffff" />


        {/* PRICE AREA */}

        {[55, 105, 155, 205].map((y) => (
          <line
            key={`price-h-${y}`}
            x1="45"
            y1={y}
            x2="675"
            y2={y}
            stroke="#eef2f7"
          />
        ))}

        <text
          x="48"
          y="35"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        <polyline
          points="
            50,190
            110,165
            165,180
            220,125
            280,145
            335,92
            395,112
            455,70
            515,95
            575,62
            665,88
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* DIVIDER */}

        <line
          x1="40"
          y1="225"
          x2="680"
          y2="225"
          stroke="#cbd5e1"
        />


        {/* RSI BACKGROUND ZONES */}

        <rect
          x="45"
          y="248"
          width="630"
          height="30"
          fill="#fff1f2"
        />

        <rect
          x="45"
          y="338"
          width="630"
          height="30"
          fill="#ecfdf5"
        />


        {/* RSI LEVELS */}

        <line
          x1="45"
          y1="278"
          x2="675"
          y2="278"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        <line
          x1="45"
          y1="323"
          x2="675"
          y2="323"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        <line
          x1="45"
          y1="338"
          x2="675"
          y2="338"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />


        {/* LABELS */}

        <text
          x="57"
          y="268"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          70 — Overbought
        </text>

        <text
          x="57"
          y="316"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          50 — Midline
        </text>

        <text
          x="57"
          y="359"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          30 — Oversold
        </text>


        {/* RSI LINE */}

        <polyline
          points="
            50,330
            110,315
            165,326
            220,294
            280,310
            335,270
            395,287
            455,258
            515,285
            575,252
            665,275
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* RSI POINT */}

        <circle
          cx="575"
          cy="252"
          r="6"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="575"
          y="242"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Strong Momentum
        </text>


        {/* SUMMARY */}

        <rect
          x="190"
          y="370"
          width="340"
          height="16"
          rx="8"
          fill="#0f172a"
        />

        <text
          x="360"
          y="381"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="900"
          fill="#ffffff"
        >
          RSI is momentum context — not an automatic buy or sell signal
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO ZOOM
========================================================= */

function RSIHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span
          dir="ltr"
          className="text-[11px] font-black text-slate-800"
        >
          RSI 14
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          Momentum
        </span>

      </div>


      <svg
        viewBox="0 0 360 265"
        className="block w-full"
        role="img"
        aria-label="رسم مبسط لمؤشر RSI على الموبايل"
      >

        <rect width="360" height="265" fill="#ffffff" />


        {/* PRICE */}

        <polyline
          points="
            20,110
            65,90
            105,102
            150,67
            195,82
            240,48
            285,64
            340,39
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <line
          x1="18"
          y1="130"
          x2="342"
          y2="130"
          stroke="#e2e8f0"
        />


        {/* RSI LEVELS */}

        <rect
          x="20"
          y="148"
          width="320"
          height="24"
          fill="#fff1f2"
        />

        <rect
          x="20"
          y="225"
          width="320"
          height="23"
          fill="#ecfdf5"
        />

        <line
          x1="20"
          y1="172"
          x2="340"
          y2="172"
          stroke="#e11d48"
          strokeDasharray="5 4"
        />

        <line
          x1="20"
          y1="210"
          x2="340"
          y2="210"
          stroke="#94a3b8"
          strokeDasharray="5 4"
        />

        <line
          x1="20"
          y1="225"
          x2="340"
          y2="225"
          stroke="#16a34a"
          strokeDasharray="5 4"
        />


        <text
          x="26"
          y="164"
          fontSize="8"
          fontWeight="900"
          fill="#be123c"
        >
          70
        </text>

        <text
          x="26"
          y="204"
          fontSize="8"
          fontWeight="900"
          fill="#64748b"
        >
          50
        </text>

        <text
          x="26"
          y="243"
          fontSize="8"
          fontWeight="900"
          fill="#15803d"
        >
          30
        </text>


        {/* RSI */}

        <polyline
          points="
            40,220
            85,205
            125,216
            170,188
            215,198
            260,165
            300,183
            335,158
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <text
          x="180"
          y="258"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#475569"
        >
          Overbought • Momentum • Oversold
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   RSI 70 / 30 CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function RSIOverboughtOversoldChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          كيف تقرأ مستويات RSI 70 و30؟
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          التشبع الشرائي والبيعي لا يعنيان انعكاس السعر تلقائيًا
        </p>

      </div>


      <svg
        viewBox="0 0 800 400"
        className="block w-full"
        role="img"
        aria-label="مثال يوضح التشبع الشرائي فوق RSI 70 والتشبع البيعي تحت RSI 30"
      >

        <rect width="800" height="400" fill="#ffffff" />


        {/* PRICE GRID */}

        {[60, 110, 160, 210].map((y) => (
          <line
            key={`rsi-price-${y}`}
            x1="45"
            y1={y}
            x2="755"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <text
          x="48"
          y="38"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        {/* PRICE LINE */}

        <polyline
          points="
            50,180
            105,150
            160,170
            215,120
            270,82
            325,105
            380,70
            440,112
            500,150
            560,130
            620,178
            680,205
            750,180
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PRICE LABELS */}

        <circle
          cx="380"
          cy="70"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />

        <text
          x="380"
          y="50"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Strong Rise
        </text>


        <circle
          cx="680"
          cy="205"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="680"
          y="228"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Strong Decline
        </text>


        {/* DIVIDER */}

        <line
          x1="40"
          y1="245"
          x2="760"
          y2="245"
          stroke="#cbd5e1"
        />


        {/* RSI ZONES */}

        <rect
          x="45"
          y="265"
          width="710"
          height="30"
          fill="#fff1f2"
        />

        <rect
          x="45"
          y="350"
          width="710"
          height="30"
          fill="#ecfdf5"
        />


        <line
          x1="45"
          y1="295"
          x2="755"
          y2="295"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="45"
          y1="337"
          x2="755"
          y2="337"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="45"
          y1="350"
          x2="755"
          y2="350"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />


        <text
          x="55"
          y="286"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          RSI 70
        </text>

        <text
          x="55"
          y="331"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          RSI 50
        </text>

        <text
          x="55"
          y="371"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          RSI 30
        </text>


        {/* RSI LINE */}

        <polyline
          points="
            65,342
            120,330
            175,340
            230,310
            285,285
            330,300
            380,275
            440,306
            500,330
            560,320
            620,352
            680,365
            740,345
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* OVERBOUGHT */}

        <circle
          cx="380"
          cy="275"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />

        <text
          x="380"
          y="263"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Overbought
        </text>


        {/* OVERSOLD */}

        <circle
          cx="680"
          cy="365"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="680"
          y="392"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Oversold
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


      {/* MOBILE */}
      <a
        href="#rsi-70-30-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير رسم مستويات RSI 70 و30"
      >

        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            تكبير الرسم
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* FULLSCREEN */}

      <div
        id="rsi-70-30-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#rsi-levels"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                مستويات RSI 70 و30
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                التشبع الشرائي والتشبع البيعي
              </div>

            </div>


            <a
              href="#rsi-levels"
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


          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[860px] p-3">
              <RSIOverboughtOversoldChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   RSI DIVERGENCE CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function RSIDivergenceChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          مثال على Bullish RSI Divergence
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          السعر يصنع قاعًا أدنى بينما RSI يصنع قاعًا أعلى
        </p>

      </div>


      <svg
        viewBox="0 0 800 420"
        className="block w-full"
        role="img"
        aria-label="مثال تعليمي على Bullish RSI Divergence"
      >

        <rect width="800" height="420" fill="#ffffff" />


        {/* PRICE */}

        {[60, 115, 170, 225].map((y) => (
          <line
            key={`div-price-${y}`}
            x1="45"
            y1={y}
            x2="755"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <text
          x="50"
          y="38"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        <polyline
          points="
            60,85
            130,120
            200,100
            280,165
            355,130
            440,205
            520,170
            600,225
            680,170
            745,135
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PRICE LOWS */}

        <circle
          cx="440"
          cy="205"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />

        <circle
          cx="600"
          cy="225"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />


        <line
          x1="440"
          y1="205"
          x2="600"
          y2="225"
          stroke="#e11d48"
          strokeWidth="3"
          strokeDasharray="7 5"
        />


        <text
          x="520"
          y="245"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Price: Lower Low
        </text>


        {/* DIVIDER */}

        <line
          x1="40"
          y1="270"
          x2="760"
          y2="270"
          stroke="#cbd5e1"
        />


        {/* RSI */}

        <text
          x="50"
          y="294"
          fontSize="10"
          fontWeight="900"
          fill="#2563eb"
        >
          RSI
        </text>


        <line
          x1="45"
          y1="320"
          x2="755"
          y2="320"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="6 5"
        />


        <polyline
          points="
            60,330
            130,345
            200,335
            280,365
            355,345
            440,375
            520,350
            600,355
            680,325
            745,310
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* RSI LOWS */}

        <circle
          cx="440"
          cy="375"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <circle
          cx="600"
          cy="355"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />


        <line
          x1="440"
          y1="375"
          x2="600"
          y2="355"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="7 5"
        />


        <text
          x="520"
          y="402"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          RSI: Higher Low
        </text>


        {/* DIVERGENCE LABEL */}

        <rect
          x="615"
          y="280"
          width="130"
          height="30"
          rx="15"
          fill="#ecfdf5"
          stroke="#86efac"
        />

        <text
          x="680"
          y="299"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          Bullish Divergence
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
        href="#rsi-divergence-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير مثال RSI Divergence"
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
        id="rsi-divergence-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#rsi-divergence"
          className="absolute inset-0"
          aria-label="إغلاق المثال"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                RSI Divergence
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                مقارنة حركة السعر مع زخم RSI
              </div>

            </div>


            <a
              href="#rsi-divergence"
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


          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[860px] p-3">
              <RSIDivergenceChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

/* =========================================================
   COMPLETE RSI TRADE EXAMPLE CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function RSITradeExampleChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div>

          <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
            مثال صفقة شراء باستخدام RSI مع الاتجاه
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
            Uptrend → Pullback → RSI 40–50 → Confirmation → Entry
          </p>

        </div>

        <span
          dir="ltr"
          className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600"
        >
          RSI 14
        </span>

      </div>


      <svg
        viewBox="0 0 920 500"
        className="block w-full"
        role="img"
        aria-label="مثال كامل على صفقة RSI في اتجاه صاعد من التصحيح حتى الدخول ووقف الخسارة والهدف"
      >

        <rect width="920" height="500" fill="#ffffff" />


        {/* =================================================
            PRICE AREA
        ================================================= */}

        {[65, 125, 185, 245].map((y) => (
          <line
            key={`trade-price-${y}`}
            x1="55"
            y1={y}
            x2="865"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <text
          x="60"
          y="40"
          fontSize="12"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        {/* SUPPORT ZONE */}

        <rect
          x="435"
          y="205"
          width="185"
          height="38"
          rx="8"
          fill="#eff6ff"
          stroke="#93c5fd"
        />

        <text
          x="527"
          y="229"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Support / Pullback Zone
        </text>


        {/* PRICE PATH */}

        <polyline
          points="
            65,230
            130,195
            190,210
            250,160
            310,180
            375,125
            440,150
            500,190
            555,220
            610,185
            675,140
            735,105
            805,78
            860,95
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* TREND LABEL */}

        <line
          x1="110"
          y1="240"
          x2="370"
          y2="112"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <text
          x="205"
          y="150"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Uptrend
        </text>


        {/* ENTRY */}

        <circle
          cx="610"
          cy="185"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <line
          x1="610"
          y1="185"
          x2="610"
          y2="132"
          stroke="#2563eb"
          strokeWidth="2"
        />

        <rect
          x="566"
          y="100"
          width="88"
          height="30"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="610"
          y="119"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#ffffff"
        >
          ENTRY
        </text>


        {/* STOP LOSS */}

        <line
          x1="455"
          y1="258"
          x2="625"
          y2="258"
          stroke="#e11d48"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <rect
          x="470"
          y="267"
          width="110"
          height="28"
          rx="14"
          fill="#fff1f2"
          stroke="#fecdd3"
        />

        <text
          x="525"
          y="285"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          STOP LOSS
        </text>


        {/* TARGET */}

        <line
          x1="690"
          y1="65"
          x2="855"
          y2="65"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <rect
          x="710"
          y="27"
          width="120"
          height="28"
          rx="14"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="770"
          y="45"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          TARGET
        </text>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <line
          x1="50"
          y1="315"
          x2="870"
          y2="315"
          stroke="#cbd5e1"
        />


        {/* =================================================
            RSI AREA
        ================================================= */}

        <text
          x="60"
          y="340"
          fontSize="12"
          fontWeight="900"
          fill="#2563eb"
        >
          RSI 14
        </text>


        {/* RSI BACKGROUND */}

        <rect
          x="55"
          y="355"
          width="810"
          height="32"
          fill="#fff1f2"
        />

        <rect
          x="55"
          y="445"
          width="810"
          height="32"
          fill="#ecfdf5"
        />


        {/* RSI LEVELS */}

        <line
          x1="55"
          y1="387"
          x2="865"
          y2="387"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="55"
          y1="423"
          x2="865"
          y2="423"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="55"
          y1="445"
          x2="865"
          y2="445"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />


        <text
          x="65"
          y="379"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          70
        </text>

        <text
          x="65"
          y="416"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          50
        </text>

        <text
          x="65"
          y="465"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          30
        </text>


        {/* RSI LINE */}

        <polyline
          points="
            90,425
            150,410
            210,420
            270,398
            330,405
            390,390
            450,410
            505,430
            555,438
            610,418
            670,398
            730,382
            800,370
            850,378
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* RSI PULLBACK POINT */}

        <circle
          cx="555"
          cy="438"
          r="8"
          fill="#ffffff"
          stroke="#f59e0b"
          strokeWidth="4"
        />

        <text
          x="555"
          y="486"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          RSI 40–50 Zone
        </text>


        {/* RSI CONFIRMATION */}

        <circle
          cx="610"
          cy="418"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="4"
        />

        <text
          x="665"
          y="440"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Momentum turns up
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


      {/* MOBILE */}

      <a
        href="#rsi-trade-example-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير مثال صفقة RSI"
      >

        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            تكبير المثال
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* FULLSCREEN MOBILE */}

      <div
        id="rsi-trade-example-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#rsi-example"
          className="absolute inset-0"
          aria-label="إغلاق المثال"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                مثال صفقة RSI كاملة
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                الدخول ووقف الخسارة والهدف
              </div>

            </div>


            <a
              href="#rsi-example"
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
              حرّك الرسم يمينًا ويسارًا لمشاهدة الصفقة بالكامل
            </span>

          </div>


          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[980px] p-3">
              <RSITradeExampleChart fullscreen />
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

export default function RSITradingStrategyPage() {

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

    datePublished: "2026-08-31",
    dateModified: "2026-08-31",

    isAccessibleForFree: true,

    articleSection: "استراتيجيات التداول",

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
        name: "Relative Strength Index",
      },
      {
        "@type": "Thing",
        name: "RSI Trading Strategy",
      },
      {
        "@type": "Thing",
        name: "RSI Indicator",
      },
      {
        "@type": "Thing",
        name: "RSI Divergence",
      },
      {
        "@type": "Thing",
        name: "Overbought and Oversold",
      },
      {
        "@type": "Thing",
        name: "Momentum Trading",
      },
      {
        "@type": "Thing",
        name: "Technical Analysis",
      },
    ],

    keywords: [
      "استراتيجية RSI",
      "مؤشر RSI",
      "شرح RSI",
      "مؤشر القوة النسبية",
      "Relative Strength Index",
      "RSI Trading Strategy",
      "RSI Indicator",
      "RSI 14",
      "إعدادات RSI",
      "طريقة استخدام RSI",
      "استراتيجية RSI للمبتدئين",
      "RSI 70 30",
      "RSI Divergence",
      "الدايفرجنس RSI",
      "التشبع الشرائي",
      "التشبع البيعي",
      "RSI Overbought Oversold",
      "استراتيجية RSI في الفوركس",
      "مؤشر الزخم",
      "التحليل الفني",
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
        name: "استراتيجية RSI",
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

          <span className="text-slate-300">
            /
          </span>

          <Link
            href="/strategies"
            className="transition hover:text-brand-600"
          >
            استراتيجيات التداول
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <span className="text-slate-700">
            استراتيجية RSI
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

        {/* DESKTOP */}

        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div
            dir="ltr"
            className="grid min-h-[410px] lg:grid-cols-[0.9fr_1.1fr]"
          >

            {/* VISUAL — LEFT */}

            <div className="flex items-center justify-center border-r border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[560px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    RSI Trading Model
                  </span>

                </div>


                <div className="p-4">
                  <RSIHeroDesktopChart />
                </div>

              </div>

            </div>


            {/* CONTENT — RIGHT */}

            <div
              dir="rtl"
              className="flex flex-col justify-center px-8 py-7 text-right lg:px-10 xl:px-12"
            >

              <div className="flex flex-wrap justify-start gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span
                  dir="ltr"
                  className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600"
                >
                  RSI Strategy
                </span>

              </div>


              <h1 className="mt-4 max-w-[900px] text-[34px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                استراتيجية RSI: شرح مؤشر القوة النسبية وطريقة التداول
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                تعلم كيفية استخدام{" "}
                <strong className="font-black text-slate-900">
                  مؤشر القوة النسبية RSI
                </strong>{" "}
                لقراءة الزخم، وفهم مستويات 70 و30 و50، واكتشاف
                التشبع الشرائي والبيعي والدايفرجنس، ثم تحويل هذه
                المعلومات إلى خطة تداول واضحة للدخول ووقف الخسارة
                والهدف.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  RSI 14
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  Overbought 70
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
                  Oversold 30
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  RSI Divergence
                </span>

              </div>


              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 31 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  آخر تحديث: 31 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  وقت القراءة: 15–20 دقيقة
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* MOBILE HERO — NO ZOOM */}

        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            <div className="px-4 pb-2.5 pt-3.5">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span
                  dir="ltr"
                  className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600"
                >
                  RSI Strategy
                </span>

              </div>


              <h1 className="mt-3 text-[26px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950">
                استراتيجية RSI: شرح مؤشر القوة النسبية وطريقة التداول
              </h1>


              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                دليل عملي لفهم{" "}
                <strong className="font-black text-slate-900">
                  RSI 14 ومستويات 70 و30 والدايفرجنس
                </strong>{" "}
                وكيفية استخدام المؤشر ضمن استراتيجية تداول متكاملة.
              </p>


              <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 31 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 دقيقة
                </span>

              </div>

            </div>


            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <RSIHeroMobileChart />

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
                  ابدأ من هنا
                </SectionLabel>


                <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                  ما هو مؤشر RSI ببساطة؟
                </h2>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  مؤشر{" "}
                  <strong className="font-black text-slate-900">
                    RSI
                  </strong>{" "}
                  هو اختصار لـ{" "}
                  <strong
                    dir="ltr"
                    className="inline-block font-black text-slate-900"
                  >
                    Relative Strength Index
                  </strong>{" "}
                  أو مؤشر القوة النسبية، وهو أحد مؤشرات الزخم في
                  التحليل الفني. يتحرك المؤشر ضمن نطاق ثابت من
                  <strong className="font-black text-slate-900">
                    {" "}0 إلى 100
                  </strong>
                  ، ويقارن قوة التحركات السعرية الصاعدة الأخيرة بقوة
                  التحركات الهابطة الأخيرة.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  ببساطة، لا يخبرك RSI بأن السعر أصبح «غاليًا» أو
                  «رخيصًا» بشكل مطلق، بل يساعدك على فهم{" "}
                  <strong className="font-black text-slate-900">
                    قوة الزخم الحالي
                  </strong>
                  . عندما ترتفع قراءة RSI فهذا يعني أن التحركات
                  الصاعدة كانت أقوى نسبيًا خلال الفترة المستخدمة في
                  الحساب، وعندما تنخفض القراءة يكون الزخم الهابط أقوى
                  نسبيًا.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  أشهر إعداد للمؤشر هو{" "}
                  <strong
                    dir="ltr"
                    className="inline-block font-black text-slate-900"
                  >
                    RSI 14
                  </strong>
                  ، أي أن الحساب يعتمد على آخر 14 فترة سعرية. فإذا
                  كنت تستخدم الرسم اليومي فهي 14 شمعة يومية، وإذا
                  كنت على فريم الساعة فهي آخر 14 شمعة ساعة.
                </p>


                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "الزخم",
                      text: "يقيس قوة وسرعة تحركات السعر الأخيرة.",
                    },
                    {
                      no: "02",
                      title: "النطاق",
                      text: "يتحرك RSI دائمًا بين 0 و100.",
                    },
                    {
                      no: "03",
                      title: "الإعداد الشائع",
                      text: "RSI 14 مع مستويات 70 و30.",
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


              {/* QUICK REFERENCE */}

              <div className="border-t border-slate-200 bg-slate-50/60 p-4 md:p-6 lg:border-r lg:border-t-0">

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  RSI Quick Guide
                </div>

                <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                  أهم مستويات RSI التي يجب أن تعرفها
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  المستويات ليست أوامر شراء وبيع، لكنها تساعدك على
                  قراءة حالة الزخم ووضع حركة السعر داخل سياق أوضح.
                </p>


                <div className="mt-4 space-y-2">

                  {[
                    {
                      level: "70+",
                      title: "تشبع شرائي",
                      text: "زخم صاعد قوي، وليس أمر بيع تلقائيًا.",
                      tone: "rose",
                    },
                    {
                      level: "50",
                      title: "المنطقة الوسطى",
                      text: "تساعد في تقييم ميل الزخم صعودًا أو هبوطًا.",
                      tone: "slate",
                    },
                    {
                      level: "30-",
                      title: "تشبع بيعي",
                      text: "زخم هابط قوي، وليس أمر شراء تلقائيًا.",
                      tone: "emerald",
                    },
                    {
                      level: "14",
                      title: "الفترة الافتراضية",
                      text: "الإعداد التقليدي الشائع لحساب RSI.",
                      tone: "brand",
                    },
                  ].map((item) => (
                    <div
                      key={item.level}
                      className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span
                        dir="ltr"
                        className="flex h-9 min-w-[44px] items-center justify-center rounded-[9px] bg-brand-50 px-2 text-[11px] font-black text-brand-600"
                      >
                        {item.level}
                      </span>

                      <div>

                        <div className="text-[12px] font-black text-slate-900">
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

            </div>

          </section>


          {/* =================================================
              01 — HOW RSI WORKS
          ================================================= */}

          <section
            id="how-rsi-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — أساسيات المؤشر
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف يعمل مؤشر RSI وكيف يتم حسابه؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الفكرة الأساسية وراء RSI هي مقارنة متوسط المكاسب
                السعرية الأخيرة بمتوسط الخسائر السعرية خلال عدد محدد
                من الفترات. لذلك عندما تصبح المكاسب الأخيرة أقوى
                نسبيًا ترتفع قراءة RSI، وعندما تصبح الخسائر أقوى
                تنخفض القراءة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">

                <div>

                  <h3 className="text-[18px] font-black text-slate-950">
                    معادلة RSI بصورة مبسطة
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    لا تحتاج إلى حساب المؤشر يدويًا أثناء التداول لأن
                    منصات التداول تقوم بذلك تلقائيًا، لكن فهم الفكرة
                    يساعدك على معرفة ما الذي تقيسه القراءة فعلًا.
                  </p>


                  <div
                    dir="ltr"
                    className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 text-center"
                  >

                    <div className="text-[11px] font-black uppercase tracking-wide text-brand-600">
                      Relative Strength
                    </div>

                    <div className="mt-2 text-[18px] font-black text-slate-950 md:text-[22px]">
                      RS = Average Gain ÷ Average Loss
                    </div>

                    <div className="my-3 h-px bg-brand-100" />

                    <div className="text-[18px] font-black text-slate-950 md:text-[22px]">
                      RSI = 100 − [100 ÷ (1 + RS)]
                    </div>

                  </div>

                </div>


                <div className="grid gap-2">

                  {[
                    {
                      no: "01",
                      title: "حدد فترة الحساب",
                      text: "الإعداد التقليدي هو آخر 14 فترة سعرية.",
                    },
                    {
                      no: "02",
                      title: "احسب متوسط المكاسب",
                      text: "يتم قياس متوسط التحركات الصاعدة خلال الفترة.",
                    },
                    {
                      no: "03",
                      title: "احسب متوسط الخسائر",
                      text: "ثم تتم مقارنة التحركات الهابطة بالمكاسب.",
                    },
                    {
                      no: "04",
                      title: "حوّل النتيجة إلى 0–100",
                      text: "فتظهر قراءة RSI التي تراها أسفل الرسم السعري.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="flex items-start gap-3 rounded-[13px] border border-slate-200 bg-slate-50/60 px-3 py-2.5"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {item.no}
                      </span>

                      <div>

                        <h3 className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {item.text}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="RSI لا يقارن الأصل بأصل آخر">
                  رغم أن اسمه «مؤشر القوة النسبية»، فإن RSI لا يعني
                  Relative Strength Comparison بين سهمين أو أصلين.
                  المؤشر يقارن قوة المكاسب والخسائر الأخيرة داخل حركة
                  السعر نفسها.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — RSI 70 / 30
          ================================================= */}

          <section
            id="rsi-levels"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — مستويات RSI
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ماذا يعني RSI فوق 70 وتحت 30؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                القراءة التقليدية لمؤشر RSI تعتبر المنطقة فوق{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  70
                </strong>{" "}
                منطقة تشبع شرائي{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  Overbought
                </strong>
                ، والمنطقة تحت{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  30
                </strong>{" "}
                منطقة تشبع بيعي{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  Oversold
                </strong>
                . لكن فهم معنى هذين المصطلحين أهم بكثير من حفظ الرقمين.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <RSIOverboughtOversoldChart />


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-rose-700"
                  >
                    RSI ABOVE 70
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    ماذا يعني التشبع الشرائي؟
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    يعني أن الزخم الصاعد كان قويًا نسبيًا خلال
                    الفترات الأخيرة. قد يصبح احتمال حدوث تصحيح أو
                    تباطؤ أكثر أهمية للمراقبة، لكن وصول RSI إلى 70 لا
                    يعني أن السعر يجب أن ينعكس فورًا.
                  </p>

                </article>


                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-emerald-700"
                  >
                    RSI BELOW 30
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    ماذا يعني التشبع البيعي؟
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    يعني أن الزخم الهابط كان قويًا نسبيًا. وقد يبدأ
                    المتداول بمراقبة احتمال التباطؤ أو الارتداد، لكن
                    مجرد هبوط RSI تحت 30 لا يكفي وحده لاعتبار السوق
                    فرصة شراء.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="أكبر خطأ في استخدام استراتيجية RSI">
                  لا تستخدم قاعدة «RSI فوق 70 = بيع» و«RSI تحت 30 =
                  شراء» بشكل آلي. في الاتجاه الصاعد القوي قد يبقى RSI
                  في منطقة التشبع الشرائي بينما يواصل السعر تسجيل
                  قمم جديدة، والعكس صحيح أثناء الاتجاه الهابط القوي.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — RSI 50 LEVEL
          ================================================= */}

          <section
            id="rsi-50"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — خط المنتصف
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تستخدم مستوى 50 في مؤشر RSI؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يركز كثير من المبتدئين على 70 و30 وينسون مستوى{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  RSI 50
                </strong>
                . هذا المستوى يمثل منتصف نطاق المؤشر ويمكن استخدامه
                كأداة إضافية لفهم اتجاه الزخم، خصوصًا عندما يتم دمجه
                مع اتجاه السعر وهيكل السوق.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-emerald-700"
                  >
                    RSI &gt; 50
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    الزخم يميل إلى الصعود
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    بقاء RSI فوق مستوى 50 قد يدعم قراءة الاتجاه
                    الصاعد، خصوصًا إذا كان السعر نفسه يصنع قممًا
                    وقيعانًا أعلى. ويمكن أن تصبح عودة RSI باتجاه 50
                    أثناء التصحيح منطقة تستحق المراقبة بدل انتظار
                    هبوطه إلى 30 دائمًا.
                  </p>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-rose-700"
                  >
                    RSI &lt; 50
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    الزخم يميل إلى الهبوط
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    بقاء RSI تحت مستوى 50 قد يدعم قراءة الزخم الهابط،
                    خاصة عندما يتوافق ذلك مع اتجاه هابط في السعر.
                    لذلك لا يجب اختزال RSI في منطقتي 70 و30 فقط.
                  </p>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  مثال عملي على استخدام RSI 50 مع الاتجاه
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  إذا كان السعر في اتجاه صاعد واضح ثم بدأ تصحيحًا،
                  قد يتراجع RSI من مستويات مرتفعة باتجاه 50 أو حتى
                  منطقة 40–50. إذا حافظ السعر على هيكله الصاعد وبدأ
                  الزخم في التحسن مرة أخرى، فقد تكون هذه القراءة أكثر
                  فائدة من انتظار RSI حتى يصل إلى مستوى 30.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — RSI IN TRENDS
          ================================================= */}

          <section
            id="rsi-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — RSI والاتجاه
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف يتصرف RSI في الاتجاه الصاعد والاتجاه الهابط؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                من أهم المفاهيم المتقدمة نسبيًا في RSI أن المؤشر لا
                يتصرف بالطريقة نفسها في جميع ظروف السوق. أثناء
                الاتجاه الصاعد القوي قد يتحرك RSI في نطاق أعلى، بينما
                يميل نطاقه إلى الانخفاض أثناء الاتجاه الهابط. لذلك
                يجب قراءة المؤشر ضمن سياق الاتجاه وليس بمعزل عنه.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* UPTREND */}

                <article className="rounded-[20px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <div
                        dir="ltr"
                        className="text-left text-[9px] font-black uppercase tracking-wide text-emerald-700"
                      >
                        UPTREND RSI RANGE
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        RSI أثناء الاتجاه الصاعد
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-600 text-[14px] font-black text-white">
                      ↑
                    </div>

                  </div>


                  <p className="mt-3 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    في الأسواق الصاعدة قد يميل RSI إلى التحرك في نطاق
                    أعلى، وقد تعمل منطقة 40–50 كمنطقة دعم للزخم في
                    بعض الحالات بدلًا من هبوط المؤشر إلى 30.
                  </p>


                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div
                        dir="ltr"
                        className="text-[16px] font-black text-emerald-700"
                      >
                        40–50
                      </div>

                      <div className="mt-1 text-[9px] text-slate-500">
                        قد تعمل كدعم للزخم
                      </div>

                    </div>

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div
                        dir="ltr"
                        className="text-[16px] font-black text-emerald-700"
                      >
                        70+
                      </div>

                      <div className="mt-1 text-[9px] text-slate-500">
                        قد يتكرر أثناء الاتجاه
                      </div>

                    </div>

                  </div>

                </article>


                {/* DOWNTREND */}

                <article className="rounded-[20px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <div
                        dir="ltr"
                        className="text-left text-[9px] font-black uppercase tracking-wide text-rose-700"
                      >
                        DOWNTREND RSI RANGE
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        RSI أثناء الاتجاه الهابط
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-600 text-[14px] font-black text-white">
                      ↓
                    </div>

                  </div>


                  <p className="mt-3 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    في الاتجاهات الهابطة قد يبقى RSI في نطاق أدنى،
                    ويمكن أن تصبح منطقة 50–60 مقاومة للزخم قبل أن
                    يستأنف المؤشر والسعر الحركة الهابطة.
                  </p>


                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div
                        dir="ltr"
                        className="text-[16px] font-black text-rose-700"
                      >
                        50–60
                      </div>

                      <div className="mt-1 text-[9px] text-slate-500">
                        قد تعمل كمقاومة للزخم
                      </div>

                    </div>

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div
                        dir="ltr"
                        className="text-[16px] font-black text-rose-700"
                      >
                        30-
                      </div>

                      <div className="mt-1 text-[9px] text-slate-500">
                        قد يتكرر أثناء الهبوط
                      </div>

                    </div>

                  </div>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="هذا يغير طريقة استخدام RSI بالكامل">
                  إذا كان السوق في اتجاه صاعد قوي، فإن بيع كل قراءة
                  فوق 70 يعني أنك تحاول باستمرار التداول عكس الاتجاه.
                  الأفضل أن تبدأ من اتجاه السعر وهيكل السوق، ثم تستخدم
                  RSI لفهم الزخم وتحسين توقيت القرار.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — RSI DIVERGENCE
          ================================================= */}

          <section
            id="rsi-divergence"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — RSI Divergence
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما هو الدايفرجنس RSI وكيف تكتشفه؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يحدث{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  RSI Divergence
                </strong>{" "}
                عندما لا يؤكد المؤشر الحركة الجديدة التي يصنعها السعر.
                أي أن السعر يتحرك في اتجاه معين، لكن زخم RSI يبدأ في
                إظهار صورة مختلفة. هذه الحالة قد تشير إلى أن الزخم
                السابق يفقد بعض قوته، لكنها ليست ضمانًا لحدوث انعكاس.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <RSIDivergenceChart />


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* BULLISH */}

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-emerald-700"
                  >
                    BULLISH DIVERGENCE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    الدايفرجنس الإيجابي
                  </h3>

                  <div className="mt-3 space-y-2">

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        السعر
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-rose-700">
                        يصنع قاعًا أدنى Lower Low
                      </div>

                    </div>

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        RSI
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-emerald-700">
                        يصنع قاعًا أعلى Higher Low
                      </div>

                    </div>

                  </div>


                  <p className="mt-3 text-[12px] leading-6 text-slate-600">
                    قد يعني ذلك أن السعر سجل قاعًا جديدًا لكن قوة
                    الزخم الهابط لم تعد بالقوة نفسها، لذلك يبدأ
                    المتداول بمراقبة احتمال انعكاس أو ارتداد صاعد.
                  </p>

                </article>


                {/* BEARISH */}

                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-rose-700"
                  >
                    BEARISH DIVERGENCE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    الدايفرجنس السلبي
                  </h3>

                  <div className="mt-3 space-y-2">

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        السعر
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-emerald-700">
                        يصنع قمة أعلى Higher High
                      </div>

                    </div>

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        RSI
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-rose-700">
                        يصنع قمة أدنى Lower High
                      </div>

                    </div>

                  </div>


                  <p className="mt-3 text-[12px] leading-6 text-slate-600">
                    هنا يواصل السعر تسجيل قمة جديدة بينما يفشل RSI في
                    تسجيل قمة مماثلة، ما قد يشير إلى ضعف الزخم الصاعد
                    ويجعل احتمال التصحيح أو الانعكاس أكثر أهمية
                    للمراقبة.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="الدايفرجنس تحذير وليس إشارة دخول مستقلة">
                  يمكن أن يستمر الدايفرجنس لفترة بينما يواصل السعر
                  الاتجاه نفسه. لذلك لا تدخل الصفقة فقط لأنك رأيت
                  Divergence. انتظر سياقًا سعريًا منطقيًا مثل دعم أو
                  مقاومة أو كسر في هيكل السوق أو إشارة تأكيد أخرى.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — RSI STRATEGY FRAMEWORK
          ================================================= */}

          <section
            id="rsi-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — استراتيجية RSI
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تبني استراتيجية تداول باستخدام RSI خطوة بخطوة؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                أفضل طريقة لاستخدام RSI ليست البحث عن رقم واحد ثم
                الضغط على زر الشراء أو البيع. الاستراتيجية الأقوى
                تبدأ من{" "}
                <strong className="font-black text-slate-900">
                  اتجاه السوق وموقع السعر
                </strong>
                ، ثم تستخدم RSI لتقييم الزخم وتوقيت الدخول ضمن خطة
                واضحة لإدارة المخاطر.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}

              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  {
                    no: "01",
                    title: "حدد الاتجاه",
                    text: "صاعد، هابط أم عرضي؟",
                  },
                  {
                    no: "02",
                    title: "حدد المنطقة",
                    text: "دعم، مقاومة أو Pullback.",
                  },
                  {
                    no: "03",
                    title: "اقرأ RSI",
                    text: "الزخم والمستوى الحالي.",
                  },
                  {
                    no: "04",
                    title: "انتظر التأكيد",
                    text: "لا تدخل بسبب RSI وحده.",
                  },
                  {
                    no: "05",
                    title: "حدد الإبطال",
                    text: "أين تصبح الفكرة خاطئة؟",
                  },
                  {
                    no: "06",
                    title: "خطط للهدف",
                    text: "قبل تنفيذ الصفقة.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[11px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-1.5 text-[9px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}

              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "حدد اتجاه السوق", "ابدأ بالسعر وليس بالمؤشر."],
                  ["02", "حدد منطقة مهمة", "دعم، مقاومة أو تصحيح."],
                  ["03", "اقرأ RSI", "قيّم الزخم ومستوى المؤشر."],
                  ["04", "انتظر التأكيد", "لا تدخل بسبب الرقم فقط."],
                  ["05", "حدد وقف الخسارة", "عند مستوى إبطال منطقي."],
                  ["06", "حدد الهدف", "قبل تنفيذ الصفقة."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </span>

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


              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    استراتيجية مع الاتجاه
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    مثال: استخدام RSI لشراء Pullback في اتجاه صاعد
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    إذا كان السعر في اتجاه صاعد ثم بدأ تصحيحًا نحو
                    منطقة دعم، راقب RSI أثناء التصحيح. بدل اشتراط
                    وصوله إلى 30، يمكن مراقبة منطقة 40–50 ثم البحث عن
                    عودة الزخم الصاعد بالتزامن مع تأكيد من حركة السعر.
                  </p>


                  <div className="mt-3 grid gap-2 sm:grid-cols-3">

                    {[
                      ["1", "Trend", "اتجاه صاعد واضح"],
                      ["2", "RSI", "يتراجع نحو 40–50"],
                      ["3", "Trigger", "عودة الزخم + تأكيد سعري"],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="rounded-[12px] bg-slate-50 px-3 py-2.5"
                      >

                        <div className="text-[9px] font-black text-brand-600">
                          {no}
                        </div>

                        <div
                          dir="ltr"
                          className="mt-0.5 text-left text-[11px] font-black text-slate-950"
                        >
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
                    الفكرة الأساسية
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    السعر أولًا، RSI ثانيًا
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    حدد أولًا ما الذي يفعله السعر: الاتجاه، الدعم،
                    المقاومة وهيكل السوق. بعد ذلك استخدم RSI لمعرفة ما
                    إذا كان الزخم يدعم السيناريو الذي تراه على الرسم
                    السعري أم لا.
                  </p>

                </aside>

              </div>

            </div>

          </section>

                    {/* =================================================
              07 — OVERBOUGHT / OVERSOLD STRATEGY
          ================================================= */}

          <section
            id="rsi-overbought-oversold"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — استراتيجية 70 و30
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية RSI للتشبع الشرائي والبيعي: الطريقة الصحيحة
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                أبسط استراتيجية RSI منتشرة تعتمد على مراقبة وصول المؤشر
                إلى مناطق التشبع الشرائي والبيعي. لكن الاستخدام الصحيح
                لا يعني البيع بمجرد تجاوز{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  RSI 70
                </strong>{" "}
                أو الشراء مباشرةً تحت{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  RSI 30
                </strong>
                . يجب أولًا تقييم اتجاه السوق وموقع السعر ثم انتظار
                دليل يؤكد أن الزخم بدأ يتغير.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* BUY SETUP */}
                <article className="rounded-[20px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div
                        dir="ltr"
                        className="text-left text-[9px] font-black uppercase tracking-wide text-emerald-700"
                      >
                        OVERSOLD BUY SETUP
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        متى يمكن مراقبة فرصة شراء؟
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-600 text-[14px] font-black text-white">
                      ↑
                    </div>

                  </div>


                  <div className="mt-4 space-y-2">

                    {[
                      [
                        "01",
                        "السياق",
                        "السعر يصل إلى دعم أو منطقة طلب أو نهاية تصحيح منطقي.",
                      ],
                      [
                        "02",
                        "RSI",
                        "المؤشر يقترب من 30 أو يدخل منطقة التشبع البيعي.",
                      ],
                      [
                        "03",
                        "التأكيد",
                        "RSI يبدأ بالخروج من التشبع أو يظهر تحسن في الزخم.",
                      ],
                      [
                        "04",
                        "السعر",
                        "ظهور رفض سعري أو تغير في البنية قصيرة المدى.",
                      ],
                      [
                        "05",
                        "الإبطال",
                        "وقف الخسارة خلف المستوى الذي يبطل فكرة الارتداد.",
                      ],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-emerald-600 text-[8px] font-black text-white">
                          {no}
                        </span>

                        <div>

                          <div className="text-[11px] font-black text-slate-950">
                            {title}
                          </div>

                          <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {text}
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </article>


                {/* SELL SETUP */}
                <article className="rounded-[20px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div
                        dir="ltr"
                        className="text-left text-[9px] font-black uppercase tracking-wide text-rose-700"
                      >
                        OVERBOUGHT SELL SETUP
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        متى يمكن مراقبة فرصة بيع؟
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-600 text-[14px] font-black text-white">
                      ↓
                    </div>

                  </div>


                  <div className="mt-4 space-y-2">

                    {[
                      [
                        "01",
                        "السياق",
                        "السعر يصل إلى مقاومة أو منطقة عرض أو نهاية ارتداد.",
                      ],
                      [
                        "02",
                        "RSI",
                        "المؤشر يقترب من 70 أو يدخل منطقة التشبع الشرائي.",
                      ],
                      [
                        "03",
                        "التأكيد",
                        "RSI يبدأ بالتراجع أو يظهر ضعف في الزخم الصاعد.",
                      ],
                      [
                        "04",
                        "السعر",
                        "ظهور رفض أو تغير قصير الأجل يدعم سيناريو الهبوط.",
                      ],
                      [
                        "05",
                        "الإبطال",
                        "الوقف أعلى المستوى الذي يجعل فكرة البيع غير صالحة.",
                      ],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-rose-600 text-[8px] font-black text-white">
                          {no}
                        </span>

                        <div>

                          <div className="text-[11px] font-black text-slate-950">
                            {title}
                          </div>

                          <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {text}
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="يفضل استخدام 70 و30 أكثر في الأسواق العرضية">
                  عندما يتحرك السوق داخل نطاق واضح بين دعم ومقاومة،
                  قد تصبح إشارات التشبع أكثر فائدة لأن السعر يتكرر في
                  الارتداد من أطراف النطاق. أما في الاتجاه القوي، فقد
                  يبقى RSI في التشبع فترة طويلة ويستمر السعر في الاتجاه.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              08 — DIVERGENCE STRATEGY
          ================================================= */}

          <section
            id="rsi-divergence-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — استراتيجية الدايفرجنس
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية RSI Divergence خطوة بخطوة
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                استراتيجية الدايفرجنس تحاول اكتشاف الحالات التي يستمر
                فيها السعر في تسجيل قمة أو قاع جديد، بينما يفشل RSI
                في تأكيد هذه الحركة. الهدف ليس الدخول بمجرد ظهور
                الاختلاف، بل استخدامه كإشارة مبكرة على احتمال ضعف
                الاتجاه ثم انتظار تأكيد من حركة السعر.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "حدد الحركة",
                    text: "ابحث عن قمتين أو قاعين واضحين في السعر.",
                  },
                  {
                    no: "02",
                    title: "قارن RSI",
                    text: "قارن قمم أو قيعان المؤشر بالنقاط نفسها.",
                  },
                  {
                    no: "03",
                    title: "حدد الاختلاف",
                    text: "هل السعر والمؤشر يتحركان بصورة متعارضة؟",
                  },
                  {
                    no: "04",
                    title: "انتظر التأكيد",
                    text: "راقب كسر بنية أو رد فعل سعري واضح.",
                  },
                  {
                    no: "05",
                    title: "خطط للمخاطرة",
                    text: "حدد الإبطال والهدف قبل التنفيذ.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Bullish Divergence Example
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    مثال على دايفرجنس إيجابي
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    يصنع السعر قاعًا أدنى، لكن RSI يصنع قاعًا أعلى.
                    هذا يعني أن السعر انخفض إلى مستوى جديد بينما
                    الزخم الهابط أصبح أضعف نسبيًا. بدل الشراء فورًا،
                    ينتظر المتداول دليلًا مثل كسر قمة قصيرة أو عودة
                    السعر فوق منطقة دعم مهمة.
                  </p>


                  <div className="mt-3 grid gap-2 sm:grid-cols-3">

                    {[
                      ["السعر", "Lower Low"],
                      ["RSI", "Higher Low"],
                      ["النتيجة", "ضعف محتمل للهبوط"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-[11px] bg-slate-50 px-3 py-2.5"
                      >

                        <div className="text-[9px] text-slate-500">
                          {label}
                        </div>

                        <div
                          dir="ltr"
                          className="mt-0.5 text-left text-[11px] font-black text-slate-950"
                        >
                          {value}
                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-amber-700">
                    انتبه
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    الدايفرجنس يمكن أن يستمر قبل الانعكاس
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    قد يظهر Bullish Divergence ويستمر السعر في صنع
                    قيعان جديدة قبل أن يبدأ أي ارتداد حقيقي. لذلك
                    استخدام الدايفرجنس بدون تأكيد من السعر يمكن أن
                    يؤدي إلى الدخول مبكرًا جدًا.
                  </p>

                </aside>

              </div>

            </div>

          </section>


                    {/* =================================================
              09 — COMPLETE RSI TRADE EXAMPLE
          ================================================= */}

          <section
            id="rsi-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — مثال كامل
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مثال عملي على صفقة RSI من التحليل حتى الدخول والهدف
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لنفترض أن السوق في اتجاه صاعد، والسعر بدأ تصحيحًا نحو
                دعم سابق. الهدف هنا ليس انتظار RSI حتى يدخل بالضرورة
                تحت مستوى 30، بل مراقبة ما إذا كان الزخم يهدأ أثناء
                التصحيح ثم يعود ليدعم الاتجاه الأساسي.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* COMPLETE VISUAL EXAMPLE */}

              <RSITradeExampleChart />


              {/* DESKTOP STEPS */}

              <div className="mt-5 hidden md:grid md:grid-cols-6 md:gap-3">

                {[
                  ["01", "الاتجاه", "هيكل صاعد واضح."],
                  ["02", "المنطقة", "دعم أو منطقة Pullback."],
                  ["03", "RSI", "يتراجع نحو 40–50."],
                  ["04", "التأكيد", "الزخم يعود للصعود."],
                  ["05", "الوقف", "أسفل مستوى الإبطال."],
                  ["06", "الهدف", "قمة سابقة أو مقاومة."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[10px] font-black text-white">
                        {no}
                      </span>

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


              {/* MOBILE STEPS */}

              <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "حدد الاتجاه", "هيكل صاعد واضح."],
                  ["02", "حدد الدعم", "منطقة سعرية مهمة."],
                  ["03", "راقب RSI", "تراجع نحو 40–50."],
                  ["04", "انتظر التأكيد", "الزخم يعود للصعود."],
                  ["05", "حدد الوقف", "أسفل مستوى الإبطال."],
                  ["06", "حدد الهدف", "قمة أو مقاومة."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-3 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[10px] font-black text-white">
                      {no}
                    </span>

                    <div>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-slate-500">
                        {text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>


              {/* LOGIC + RULE */}

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[11px] font-black uppercase tracking-wide text-brand-600">
                    منطق الصفقة
                  </div>

                  <h3 className="mt-1.5 text-[18px] font-black text-slate-950 md:text-[19px]">
                    لماذا هذه الصفقة أكثر من مجرد إشارة RSI؟
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                    لأن القرار يعتمد على مجموعة عوامل متوافقة:
                    الاتجاه صاعد، والسعر عاد إلى دعم، وRSI تراجع مع
                    التصحيح بدل الانهيار الكامل، ثم عاد الزخم الصاعد
                    مع ظهور تأكيد من السعر. بهذا يصبح RSI جزءًا من
                    السيناريو وليس السبب الوحيد للدخول.
                  </p>


                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">

                    {[
                      ["الاتجاه", "صاعد"],
                      ["الموقع", "دعم / Pullback"],
                      ["RSI", "40–50 ثم ارتفاع"],
                      ["التأكيد", "عودة ضغط المشترين"],
                      ["الإبطال", "كسر القاع المهم"],
                      ["الهدف", "قمة سابقة / مقاومة"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[12px] border border-slate-100 bg-slate-50/70 px-3.5 py-3"
                      >

                        <span className="text-[12px] text-slate-500">
                          {label}
                        </span>

                        <span className="text-[13px] font-black text-slate-800">
                          {value}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[11px] font-black uppercase tracking-wide text-brand-600">
                    قاعدة مهمة
                  </div>

                  <h3 className="mt-1.5 text-[18px] font-black text-slate-950 md:text-[19px]">
                    لا تبحث عن RSI مثالي
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                    لا يجب أن يصل RSI إلى 30 أو 70 بالضبط حتى تكون
                    هناك فرصة. سلوك المؤشر بالنسبة إلى اتجاه السوق
                    والمستويات السعرية أهم من انتظار رقم محدد بصورة
                    ميكانيكية.
                  </p>


                  <div className="mt-4 rounded-[14px] border border-brand-100 bg-white/80 p-3.5">

                    <div className="text-[12px] font-black text-slate-950">
                      في هذا المثال
                    </div>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                      RSI لم يصل إلى 30، لكنه تراجع مع التصحيح إلى
                      منطقة 40–50 ثم بدأ بالارتفاع بالتزامن مع عودة
                      السعر من الدعم.
                    </p>

                  </div>

                </aside>

              </div>

            </div>

          </section>

          {/* =================================================
              10 — BEST RSI SETTINGS
          ================================================= */}

          <section
            id="rsi-settings"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — إعدادات RSI
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل إعدادات RSI؟ الفرق بين RSI 14 وRSI 9 وRSI 21
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الإعداد الافتراضي الأشهر هو{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  RSI 14
                </strong>
                ، لكنه ليس الإعداد الوحيد الممكن. تقليل عدد الفترات
                يجعل المؤشر أسرع وأكثر حساسية لتحركات السعر، بينما
                زيادة عدد الفترات تجعله أبطأ وأكثر سلاسة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-amber-100 bg-amber-50/40 p-4">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-amber-700"
                  >
                    RSI 9
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    أسرع وأكثر حساسية
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يتحرك بسرعة أكبر مع تغير السعر وقد ينتج عددًا أكبر
                    من إشارات التشبع والتغيرات القصيرة في الزخم، لكنه
                    قد يكون أكثر ضوضاء أيضًا.
                  </p>

                </article>


                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-brand-600"
                  >
                    RSI 14
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    الإعداد التقليدي الأكثر شيوعًا
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يوفر توازنًا بين الحساسية وسلاسة الحركة، ولذلك
                    يعتبر نقطة بداية منطقية للمبتدئ قبل تجربة إعدادات
                    مختلفة.
                  </p>

                </article>


                <article className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div
                    dir="ltr"
                    className="text-left text-[9px] font-black uppercase tracking-wide text-slate-600"
                  >
                    RSI 21
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    أبطأ وأكثر سلاسة
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يقلل بعض الحركات القصيرة والضوضاء، لكنه قد يتأخر
                    أكثر عن التغيرات السريعة في الزخم مقارنة بالإعدادات
                    الأقصر.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تبحث عن إعداد سحري للـRSI">
                  تغيير RSI من 14 إلى 9 أو 21 لا يحول استراتيجية ضعيفة
                  إلى استراتيجية ناجحة. يجب اختبار الإعداد على السوق
                  والفريم وطريقة التداول التي تستخدمها بدل تعديل
                  الأرقام حتى تبدو النتائج التاريخية مثالية.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — BEST TIMEFRAMES
          ================================================= */}

          <section
            id="rsi-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — الفريمات الزمنية
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل فريم لاستخدام مؤشر RSI؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يمكن استخدام RSI على جميع الفريمات تقريبًا، لكن معنى
                الإشارة يتأثر بالفريم وطريقة التداول. كلما صغر الإطار
                الزمني زادت الضوضاء وعدد الإشارات، بينما تكون الحركة
                عادةً أكثر وضوحًا على الفريمات الأعلى.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    timeframe: "5m–15m",
                    label: "تداول قصير",
                    text: "إشارات أكثر وسرعة أعلى، لكن مع ضوضاء أكبر.",
                  },
                  {
                    timeframe: "1H",
                    label: "تداول يومي",
                    text: "يمكن استخدامه مع اتجاه ومستويات واضحة.",
                  },
                  {
                    timeframe: "4H",
                    label: "Swing Trading",
                    text: "مناسب لمراقبة الزخم والتصحيحات المتوسطة.",
                  },
                  {
                    timeframe: "Daily",
                    label: "تحليل أوسع",
                    text: "يساعد في فهم الاتجاه والزخم طويل نسبيًا.",
                  },
                ].map((item) => (
                  <div
                    key={item.timeframe}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="text-[9px] font-black text-brand-600">
                      {item.label}
                    </div>

                    <div
                      dir="ltr"
                      className="mt-1 text-left text-[18px] font-black text-slate-950"
                    >
                      {item.timeframe}
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              12 — RSI + PRICE ACTION
          ================================================= */}

          <section
            id="rsi-price-action"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — دمج المؤشر
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تستخدم RSI مع Price Action والدعم والمقاومة؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                أقوى استخدام عملي لـRSI غالبًا يكون عندما لا يعمل
                منفردًا. يمكن دمجه مع حركة السعر والدعم والمقاومة
                وهيكل السوق بحيث يحدد السعر{" "}
                <strong className="font-black text-slate-900">
                  المكان
                </strong>{" "}
                بينما يساعد RSI في تقييم{" "}
                <strong className="font-black text-slate-900">
                  قوة الزخم
                </strong>
                .
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    no: "01",
                    title: "الاتجاه",
                    text: "حدد السياق من حركة السعر.",
                  },
                  {
                    no: "02",
                    title: "المستوى",
                    text: "انتظر دعمًا أو مقاومة لها معنى.",
                  },
                  {
                    no: "03",
                    title: "RSI",
                    text: "قيّم الزخم عند وصول السعر للمستوى.",
                  },
                  {
                    no: "04",
                    title: "التأكيد",
                    text: "اجمع الزخم مع رد فعل السعر.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
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


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  مثال: دعم + RSI Oversold + تأكيد سعري
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  وصول السعر إلى دعم مهم بالتزامن مع RSI منخفض قد
                  يجعل المنطقة تستحق المراقبة، لكن الإشارة تصبح أقوى
                  عندما يبدأ RSI بالخروج من التشبع ويظهر السعر رفضًا
                  واضحًا أو كسرًا في البنية قصيرة المدى بدل الشراء
                  مباشرة عند أول لمس للدعم.
                </p>

              </div>


              <div className="mt-4">

                <Link
                  href="/strategies/price-action"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-4 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                >
                  اقرأ استراتيجية Price Action
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              13 — FALSE SIGNALS
          ================================================= */}

          <section
            id="rsi-false-signals"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                13 — الإشارات الكاذبة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                لماذا يعطي RSI إشارات خاطئة أحيانًا؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI يقيس الزخم، ولا يعرف وحده أين توجد مستويات الدعم
                والمقاومة أو ما إذا كان السوق في اتجاه قوي. لذلك قد
                تظهر إشارة تبدو جيدة على المؤشر لكنها تكون سيئة عند
                النظر إلى السياق السعري الكامل.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "الاتجاه قوي",
                    text: "RSI يبقى فوق 70 أو تحت 30 لفترة طويلة.",
                  },
                  {
                    title: "لا يوجد مستوى",
                    text: "الإشارة تظهر في منتصف الحركة دون دعم أو مقاومة.",
                  },
                  {
                    title: "الفريم صغير جدًا",
                    text: "الضوضاء تزيد عدد إشارات الزخم المتغيرة بسرعة.",
                  },
                  {
                    title: "الدخول مبكر",
                    text: "الاعتماد على RSI قبل ظهور أي تأكيد من السعر.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <h3 className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="فلترة الإشارات أهم من زيادة عدد المؤشرات">
                  إضافة خمسة مؤشرات أخرى فوق RSI لا تعني بالضرورة
                  نتائج أفضل. من الأفضل أن يكون لديك سياق واضح:
                  اتجاه + مستوى + سلوك سعر + RSI بدل البحث عن مجموعة
                  مؤشرات تعطي الإشارة نفسها.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              14 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                14 — إدارة المخاطر
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                إدارة المخاطر ووقف الخسارة في استراتيجية RSI
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI لا يحدد مقدار المال الذي يجب أن تخاطر به، ولا
                يحدد وحده المكان الصحيح لوقف الخسارة. يجب أن يعتمد
                الوقف على مستوى سعري يؤدي كسره إلى إبطال فكرة الصفقة،
                ثم يتم حساب حجم الصفقة بناءً على المسافة بين الدخول
                والوقف.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">

                {[
                  {
                    label: "المخاطرة",
                    value: "محددة مسبقًا",
                    text: "حدد الحد الأقصى للخسارة.",
                  },
                  {
                    label: "الوقف",
                    value: "خلف الإبطال",
                    text: "ليس عند رقم RSI.",
                  },
                  {
                    label: "الحجم",
                    value: "حسب الوقف",
                    text: "يتغير حسب المسافة.",
                  },
                  {
                    label: "الهدف",
                    value: "سعري",
                    text: "قمة، قاع أو مستوى.",
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
                    مثال
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    لا تضع الوقف لأن RSI عاد فوق 30
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    المؤشر يتغير باستمرار وقد يعبر مستوى 30 أو50 عدة
                    مرات. الأفضل أن يكون وقف الخسارة مرتبطًا بالسعر
                    نفسه، مثل قاع مهم أو مستوى دعم تعتمد عليه فكرة
                    الدخول.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <h3 className="text-[17px] font-black text-slate-950">
                    استخدم حاسبة المخاطر
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    بعد تحديد الدخول ووقف الخسارة، يمكنك حساب حجم
                    الصفقة بما يتناسب مع نسبة المخاطرة التي اخترتها.
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

            </div>

          </section>


          {/* =================================================
              15 — COMMON MISTAKES
          ================================================= */}

          <section
            id="rsi-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                15 — أخطاء شائعة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أخطاء شائعة عند استخدام مؤشر RSI
              </h2>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "بيع كل RSI فوق 70",
                    text: "الاتجاه القوي يمكن أن يبقى في التشبع لفترة طويلة.",
                  },
                  {
                    no: "02",
                    title: "شراء كل RSI تحت 30",
                    text: "السوق الهابط قد يستمر رغم بقاء RSI منخفضًا.",
                  },
                  {
                    no: "03",
                    title: "تجاهل الاتجاه",
                    text: "الإشارة ضد الاتجاه تحتاج حذرًا أكبر.",
                  },
                  {
                    no: "04",
                    title: "الاعتماد على Divergence وحده",
                    text: "الدايفرجنس قد يستمر قبل حدوث الانعكاس.",
                  },
                  {
                    no: "05",
                    title: "تغيير الإعداد باستمرار",
                    text: "اختيار الإعداد بعد رؤية النتيجة يؤدي إلى تضليل الاختبار.",
                  },
                  {
                    no: "06",
                    title: "نسيان إدارة المخاطر",
                    text: "أفضل إشارة فنية يمكن أن تفشل في أي صفقة منفردة.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-rose-50 text-[9px] font-black text-rose-700">
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

            </div>

          </section>


          {/* =================================================
              16 — PROS & CONS
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                16 — التقييم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مميزات وعيوب استراتيجية RSI
              </h2>

            </div>


            <div className="grid md:grid-cols-2">

              {/* PROS */}
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
                    "مؤشر بسيط وسهل القراءة نسبيًا.",
                    "يساعد على فهم قوة الزخم وليس السعر فقط.",
                    "يمكن استخدامه على أسواق وفريمات متعددة.",
                    "يدعم تحليل التشبع والدايفرجنس والاتجاه.",
                    "متوفر بشكل افتراضي في معظم منصات التداول.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 4 ? "border-b border-green-100/70" : ""
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


              {/* CONS */}
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
                    "يمكن أن يبقى في التشبع أثناء الاتجاهات القوية.",
                    "الإشارة وحدها لا تحدد مكان الدخول الصحيح.",
                    "الدايفرجنس قد يظهر قبل الانعكاس بوقت طويل.",
                    "الفريمات الصغيرة قد تنتج إشارات كثيرة ومضللة.",
                    "لا يغني عن تحليل السعر وإدارة المخاطر.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 4 ? "border-b border-rose-100/70" : ""
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                خطة تعلم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تتعلم استراتيجية RSI كمبتدئ؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا تبدأ بمحاولة حفظ عشرات إعدادات RSI أو دمجه مع عدد
                كبير من المؤشرات. ابدأ بفهم ما الذي يقيسه المؤشر،
                ثم تعلم كيف يتغير سلوكه حسب اتجاه السوق، وبعد ذلك
                انتقل إلى التشبع والدايفرجنس وإدارة الصفقة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  ["01", "افهم RSI", "تعرف على 0–100 وRSI 14."],
                  ["02", "تعلم 70 و30", "افهم التشبع دون استخدامه آليًا."],
                  ["03", "راقب الاتجاه", "استخدم مستوى 50 ونطاقات RSI."],
                  ["04", "تعلم Divergence", "قارن السعر بالزخم."],
                  ["05", "اختبر الخطة", "سجل الدخول والوقف والنتيجة."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </span>

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
                  ["01", "افهم RSI", "النطاق والإعداد الأساسي."],
                  ["02", "تعلم 70 و30", "التشبع ليس أمر دخول."],
                  ["03", "افهم الاتجاه", "RSI يتغير حسب حالة السوق."],
                  ["04", "تعلم Divergence", "قارن السعر بالزخم."],
                  ["05", "اختبر الاستراتيجية", "استخدم حسابًا تجريبيًا."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 4 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </span>

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

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أسئلة شائعة عن مؤشر واستراتيجية RSI
              </h2>

              <p className="mt-3 max-w-5xl text-[13px] leading-7 text-slate-600 md:text-[14px]">
                إجابات مختصرة على أكثر الأسئلة المتعلقة بإعدادات RSI،
                ومستويات 70 و30، والدايفرجنس، والفريمات وطريقة
                استخدام المؤشر.
              </p>

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

                    <p className="max-w-5xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
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
                أدلة تساعدك على استخدام RSI بشكل أفضل
              </h2>

            </div>


            {/* DESKTOP */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "استراتيجية",
                  title: "Price Action",
                  text: "تعلم قراءة حركة السعر وهيكل السوق قبل استخدام المؤشرات.",
                  href: "/strategies/price-action",
                },
                {
                  label: "استراتيجية",
                  title: "Swing Trading",
                  text: "تعلم كيفية التداول على الحركات التي تستمر أيامًا أو أسابيع.",
                  href: "/strategies/swing-trading",
                },
                {
                  label: "إدارة المخاطر",
                  title: "وقف الخسارة",
                  text: "تعرف على كيفية تحديد مستوى إبطال واضح للصفقة.",
                  href: "/learn-trading/stop-loss",
                },
                {
                  label: "إدارة الصفقة",
                  title: "جني الأرباح",
                  text: "تعلم كيفية تحديد أهداف منطقية بدل الخروج العشوائي.",
                  href: "/learn-trading/take-profit",
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


            {/* MOBILE */}
            <div className="divide-y divide-slate-100 md:hidden">

              {[
                ["استراتيجية", "Price Action", "/strategies/price-action"],
                ["استراتيجية", "Swing Trading", "/strategies/swing-trading"],
                ["إدارة المخاطر", "وقف الخسارة", "/learn-trading/stop-loss"],
                ["إدارة الصفقة", "جني الأرباح", "/learn-trading/take-profit"],
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
                  اختبر استراتيجية RSI قبل التداول بأموال حقيقية
                </h2>

                <p className="mt-2 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  تدرب على قراءة RSI 14 ومستويات 70 و30 و50،
                  والدايفرجنس، وسلوك المؤشر داخل الاتجاهات المختلفة.
                  سجّل نتائج كل Setup على حساب تجريبي قبل الاعتماد
                  عليها في التداول الحقيقي.
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
                المحتوى تعليمي ولا يمثل توصية استثمارية أو إشارة
                تداول. التداول بالرافعة المالية ينطوي على مخاطر
                مرتفعة وقد يؤدي إلى خسارة رأس المال.
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