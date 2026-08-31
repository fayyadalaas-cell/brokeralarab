import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   TREND FOLLOWING STRATEGY — ARABIC
   Broker Alarab
   Path: /strategies/trend-following
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/trend-following`;

const PAGE_TITLE =
  "استراتيجية تتبع الاتجاه: شرح Trend Following وطريقة التداول";

const PAGE_DESCRIPTION =
  "شرح استراتيجية تتبع الاتجاه خطوة بخطوة: كيفية تحديد الاتجاه، القمم والقيعان، المتوسطات المتحركة، ADX، الاختراقات، الدخول بعد التصحيح، وقف الخسارة والخروج من الصفقة.";


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
    q: "ما هي استراتيجية تتبع الاتجاه؟",
    a: "استراتيجية تتبع الاتجاه أو Trend Following هي طريقة تداول تهدف إلى الدخول في اتجاه حركة السعر القائمة بدل محاولة توقع القمة أو القاع. يبحث المتداول عن اتجاه صاعد أو هابط واضح ثم يستخدم هيكل السعر أو المتوسطات المتحركة أو الاختراقات أو مؤشرات قوة الاتجاه للمساعدة في تحديد فرص الدخول والخروج.",
  },
  {
    q: "كيف أعرف أن السوق في اتجاه صاعد؟",
    a: "من أبسط الطرق مراقبة هيكل السعر. الاتجاه الصاعد عادةً يتكون من قمم أعلى Higher Highs وقيعان أعلى Higher Lows. كما يمكن استخدام المتوسطات المتحركة أو مؤشر ADX كأدوات إضافية لتأكيد الاتجاه وقوته.",
  },
  {
    q: "كيف أعرف أن السوق في اتجاه هابط؟",
    a: "الاتجاه الهابط عادةً يظهر عندما يصنع السعر قممًا أدنى Lower Highs وقيعانًا أدنى Lower Lows. بقاء السعر تحت متوسطات متحركة مهمة يمكن أن يدعم القراءة الهابطة، لكن يجب دائمًا النظر إلى هيكل السعر نفسه.",
  },
  {
    q: "ما أفضل متوسط متحرك لتحديد الاتجاه؟",
    a: "لا يوجد متوسط واحد مثالي لكل الأسواق والفريمات. المتوسط 20 أو 50 يستخدم غالبًا لمتابعة الاتجاه قصير ومتوسط المدى، بينما المتوسط 200 يستخدم كثيرًا لفهم الاتجاه الأكبر. الأهم هو اختبار المتوسط ضمن استراتيجية واضحة وعدم استخدامه كإشارة مستقلة.",
  },
  {
    q: "ما هو أفضل مؤشر لمعرفة قوة الاتجاه؟",
    a: "مؤشر ADX من أشهر الأدوات المستخدمة لقياس قوة الاتجاه. ارتفاع ADX يشير عادةً إلى ازدياد قوة الحركة الاتجاهية، بينما انخفاضه قد يشير إلى ضعف الاتجاه أو دخول السوق في حالة عرضية. ADX لا يحدد وحده هل الاتجاه صاعد أم هابط.",
  },
  {
    q: "ما هو الدخول بعد التصحيح Pullback؟",
    a: "الدخول بعد التصحيح يعني انتظار تحرك السعر مؤقتًا عكس الاتجاه الرئيسي ثم البحث عن فرصة للانضمام إلى الاتجاه بعد ظهور علامات على انتهاء التصحيح. في الاتجاه الصاعد قد ينتظر المتداول تراجع السعر نحو دعم أو متوسط متحرك ثم عودة المشترين.",
  },
  {
    q: "هل استراتيجية تتبع الاتجاه مناسبة للفوركس؟",
    a: "يمكن استخدام تتبع الاتجاه في الفوركس والأسهم والذهب والمؤشرات والعملات الرقمية وغيرها. نجاحها لا يعتمد على السوق فقط، بل على وجود حركة اتجاهية واضحة وإدارة مخاطر مناسبة وتجنب مطاردة الأسعار بعد امتداد الحركة.",
  },
  {
    q: "ما أكبر عيب في استراتيجية تتبع الاتجاه؟",
    a: "أحد أكبر التحديات هو السوق العرضي، حيث قد يتلقى المتداول عدة إشارات كاذبة واختراقات فاشلة قبل ظهور اتجاه حقيقي. لذلك يستخدم بعض المتداولين أدوات مثل ADX أو تحليل هيكل السعر لتصفية الفترات غير الاتجاهية.",
  },
];


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function TrendHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div dir="ltr" className="text-left">

          <div className="text-[13px] font-black text-slate-950">
            How Trend Following Works
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            Trend → Pullback → Confirmation → Continuation
          </div>

        </div>

        <span
          dir="ltr"
          className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600"
        >
          TREND
        </span>

      </div>


      <svg
        viewBox="0 0 720 390"
        className="block w-full"
        role="img"
        aria-label="رسم تعليمي يوضح استراتيجية تتبع الاتجاه مع القمم والقيعان والتصحيحات"
      >

        <rect width="720" height="390" fill="#ffffff" />


        {/* GRID */}

        {[65, 125, 185, 245, 305].map((y) => (
          <line
            key={`hero-trend-${y}`}
            x1="45"
            y1={y}
            x2="675"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* PRICE */}

        <polyline
          points="
            55,300
            115,250
            165,270
            230,205
            285,230
            350,165
            405,195
            470,125
            525,155
            590,92
            665,112
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* TREND LINE */}

        <line
          x1="65"
          y1="318"
          x2="610"
          y2="98"
          stroke="#2563eb"
          strokeWidth="3"
          strokeDasharray="8 6"
        />


        {/* SWINGS */}

        <circle cx="115" cy="250" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="230" cy="205" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="350" cy="165" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="470" cy="125" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="590" cy="92" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />


        <circle cx="165" cy="270" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="285" cy="230" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="405" cy="195" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="525" cy="155" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />


        {/* LABELS */}

        <text
          x="115"
          y="232"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          HH
        </text>

        <text
          x="165"
          y="292"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          HL
        </text>

        <text
          x="350"
          y="147"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          Higher High
        </text>

        <text
          x="405"
          y="217"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher Low
        </text>


        {/* PULLBACK BOX */}

        <rect
          x="390"
          y="180"
          width="145"
          height="55"
          rx="12"
          fill="#eff6ff"
          stroke="#bfdbfe"
        />

        <text
          x="462"
          y="202"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Pullback
        </text>

        <text
          x="462"
          y="219"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="700"
          fill="#64748b"
        >
          Wait — don't chase
        </text>


        {/* SUMMARY */}

        <rect
          x="165"
          y="343"
          width="390"
          height="28"
          rx="14"
          fill="#0f172a"
        />

        <text
          x="360"
          y="361"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#ffffff"
        >
          Follow the established move instead of predicting the top or bottom
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO ZOOM
========================================================= */

function TrendHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span
          dir="ltr"
          className="text-[11px] font-black text-slate-800"
        >
          TREND FOLLOWING
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          HH + HL
        </span>

      </div>


      <svg
        viewBox="0 0 360 245"
        className="block w-full"
        role="img"
        aria-label="رسم مبسط للاتجاه الصاعد والقمم والقيعان الصاعدة"
      >

        <rect width="360" height="245" fill="#ffffff" />


        {[55, 105, 155, 205].map((y) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <polyline
          points="
            25,200
            75,165
            115,180
            165,135
            205,155
            255,103
            295,125
            338,72
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <line
          x1="30"
          y1="210"
          x2="320"
          y2="85"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="6 5"
        />


        <circle cx="165" cy="135" r="5" fill="#fff" stroke="#16a34a" strokeWidth="3" />

        <text
          x="165"
          y="121"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#15803d"
        >
          HH
        </text>


        <circle cx="205" cy="155" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />

        <text
          x="205"
          y="173"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#1d4ed8"
        >
          HL
        </text>


        <rect
          x="220"
          y="183"
          width="110"
          height="30"
          rx="15"
          fill="#eff6ff"
        />

        <text
          x="275"
          y="202"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Follow the trend
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   CHART 1 — MARKET STRUCTURE
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function TrendStructureChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          كيف تميز الاتجاه من حركة السعر؟
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
          Higher Highs & Higher Lows مقابل Lower Highs & Lower Lows
        </p>

      </div>


      <svg
        viewBox="0 0 900 430"
        className="block w-full"
        role="img"
        aria-label="رسم يوضح الفرق بين الاتجاه الصاعد والاتجاه الهابط من خلال القمم والقيعان"
      >

        <rect width="900" height="430" fill="#ffffff" />


        {/* DIVIDER */}

        <line
          x1="450"
          y1="35"
          x2="450"
          y2="395"
          stroke="#e2e8f0"
          strokeWidth="2"
        />


        {/* UPTREND */}

        <text
          x="225"
          y="45"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#15803d"
        >
          UPTREND — اتجاه صاعد
        </text>


        {[90, 155, 220, 285, 350].map((y) => (
          <line
            key={`up-${y}`}
            x1="35"
            y1={y}
            x2="420"
            y2={y}
            stroke="#f1f5f9"
          />
        ))}


        <polyline
          points="
            45,335
            105,285
            155,310
            215,240
            270,270
            330,195
            385,220
            420,165
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle cx="105" cy="285" r="7" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="215" cy="240" r="7" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="330" cy="195" r="7" fill="#fff" stroke="#16a34a" strokeWidth="3" />

        <circle cx="155" cy="310" r="7" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="270" cy="270" r="7" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="385" cy="220" r="7" fill="#fff" stroke="#2563eb" strokeWidth="3" />


        <text
          x="215"
          y="221"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Higher High
        </text>

        <text
          x="270"
          y="294"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher Low
        </text>


        <rect
          x="105"
          y="365"
          width="240"
          height="34"
          rx="17"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="225"
          y="387"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          HH + HL = Bullish Structure
        </text>


        {/* DOWNTREND */}

        <text
          x="675"
          y="45"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#be123c"
        >
          DOWNTREND — اتجاه هابط
        </text>


        {[90, 155, 220, 285, 350].map((y) => (
          <line
            key={`down-${y}`}
            x1="480"
            y1={y}
            x2="865"
            y2={y}
            stroke="#f1f5f9"
          />
        ))}


        <polyline
          points="
            490,100
            550,145
            600,120
            660,190
            715,160
            775,235
            825,205
            860,275
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle cx="550" cy="145" r="7" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <circle cx="660" cy="190" r="7" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <circle cx="775" cy="235" r="7" fill="#fff" stroke="#e11d48" strokeWidth="3" />

        <circle cx="600" cy="120" r="7" fill="#fff" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="715" cy="160" r="7" fill="#fff" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="825" cy="205" r="7" fill="#fff" stroke="#f59e0b" strokeWidth="3" />


        <text
          x="715"
          y="143"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          Lower High
        </text>

        <text
          x="775"
          y="259"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#be123c"
        >
          Lower Low
        </text>


        <rect
          x="555"
          y="365"
          width="240"
          height="34"
          rx="17"
          fill="#fff1f2"
          stroke="#fecdd3"
        />

        <text
          x="675"
          y="387"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#be123c"
        >
          LH + LL = Bearish Structure
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
        href="#trend-structure-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير رسم هيكل الاتجاه"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            تكبير الرسم
            <span>↗</span>
          </span>

        </div>
      </a>


      <div
        id="trend-structure-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#identify-trend"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                هيكل الاتجاه
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                القمم والقيعان الصاعدة والهابطة
              </div>
            </div>


            <a
              href="#identify-trend"
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

            <div className="min-w-[960px] p-3">
              <TrendStructureChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   CHART 2 — PULLBACK ENTRY
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function PullbackEntryChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          مثال على الدخول بعد التصحيح داخل اتجاه صاعد
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
          Trend → Pullback → Support → Confirmation → Continuation
        </p>

      </div>


      <svg
        viewBox="0 0 900 450"
        className="block w-full"
        role="img"
        aria-label="رسم تعليمي يوضح الدخول بعد التصحيح في اتجاه صاعد"
      >

        <rect width="900" height="450" fill="#ffffff" />


        {[75, 145, 215, 285, 355].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="850"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* MOVING AVERAGE */}

        <path
          d="
            M60 325
            C180 300, 230 270, 320 245
            C400 220, 470 195, 550 170
            C640 145, 720 120, 840 95
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
        />


        <text
          x="805"
          y="80"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          EMA
        </text>


        {/* PRICE */}

        <polyline
          points="
            60,330
            125,285
            185,305
            250,240
            315,260
            380,195
            440,215
            505,250
            565,270
            625,225
            690,165
            750,120
            825,95
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PULLBACK ZONE */}

        <rect
          x="435"
          y="220"
          width="160"
          height="75"
          rx="12"
          fill="#fff7ed"
          stroke="#fed7aa"
        />

        <text
          x="515"
          y="245"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#c2410c"
        >
          Pullback
        </text>

        <text
          x="515"
          y="264"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#9a3412"
        >
          التصحيح ضد الاتجاه
        </text>


        {/* SUPPORT */}

        <line
          x1="445"
          y1="285"
          x2="620"
          y2="285"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <text
          x="535"
          y="308"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Support Area
        </text>


        {/* ENTRY */}

        <circle
          cx="625"
          cy="225"
          r="9"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <line
          x1="625"
          y1="225"
          x2="625"
          y2="170"
          stroke="#2563eb"
          strokeWidth="2"
        />

        <rect
          x="576"
          y="136"
          width="98"
          height="31"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="625"
          y="156"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          ENTRY
        </text>


        {/* STOP */}

        <line
          x1="520"
          y1="320"
          x2="650"
          y2="320"
          stroke="#e11d48"
          strokeWidth="3"
          strokeDasharray="7 6"
        />

        <text
          x="585"
          y="340"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Stop below invalidation
        </text>


        {/* CONTINUATION */}

        <rect
          x="690"
          y="210"
          width="150"
          height="34"
          rx="17"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="765"
          y="232"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Trend Continuation
        </text>


        {/* RULE */}

        <rect
          x="185"
          y="385"
          width="530"
          height="38"
          rx="19"
          fill="#0f172a"
        />

        <text
          x="450"
          y="409"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          لا تطارد السعر — انتظر التصحيح ثم ابحث عن تأكيد عودة الاتجاه
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
        href="#pullback-entry-fullscreen"
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
        id="pullback-entry-fullscreen"
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
                الدخول بعد التصحيح
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Pullback Trading
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
            <span className="text-[16px]">↔</span>
            <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل</span>
          </div>


          <div className="overflow-x-auto overflow-y-auto bg-white">
            <div className="min-w-[960px] p-3">
              <PullbackEntryChart fullscreen />
            </div>
          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   CHART 3 — BREAKOUT + ADX
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function BreakoutADXChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          الاختراق وبداية اتجاه جديد مع ADX
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
          Range → Breakout → Rising ADX → Trend Expansion
        </p>

      </div>


      <svg
        viewBox="0 0 900 500"
        className="block w-full"
        role="img"
        aria-label="رسم يوضح اختراق نطاق سعري مع ارتفاع مؤشر ADX وبداية اتجاه"
      >

        <rect width="900" height="500" fill="#ffffff" />


        {/* PRICE AREA */}

        {[60, 125, 190, 255].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="850"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* RANGE */}

        <rect
          x="70"
          y="130"
          width="430"
          height="130"
          rx="10"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeDasharray="8 6"
        />


        <text
          x="285"
          y="155"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#64748b"
        >
          SIDEWAYS RANGE
        </text>


        <line
          x1="70"
          y1="130"
          x2="515"
          y2="130"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="110"
          y="117"
          fontSize="10"
          fontWeight="900"
          fill="#b45309"
        >
          Resistance
        </text>


        <polyline
          points="
            80,220
            130,170
            180,215
            230,165
            280,225
            330,175
            380,218
            430,162
            485,185
            530,115
            590,95
            650,70
            720,52
            800,38
            845,55
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* BREAKOUT */}

        <circle
          cx="530"
          cy="115"
          r="9"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <rect
          x="500"
          y="68"
          width="105"
          height="30"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="552"
          y="87"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          BREAKOUT
        </text>


        {/* DIVIDER */}

        <line
          x1="45"
          y1="300"
          x2="855"
          y2="300"
          stroke="#cbd5e1"
        />


        {/* ADX */}

        <text
          x="55"
          y="326"
          fontSize="11"
          fontWeight="900"
          fill="#2563eb"
        >
          ADX
        </text>


        <line
          x1="55"
          y1="410"
          x2="850"
          y2="410"
          stroke="#94a3b8"
          strokeDasharray="7 5"
        />

        <text
          x="65"
          y="402"
          fontSize="9"
          fontWeight="900"
          fill="#64748b"
        >
          20
        </text>


        <line
          x1="55"
          y1="375"
          x2="850"
          y2="375"
          stroke="#f59e0b"
          strokeDasharray="7 5"
        />

        <text
          x="65"
          y="367"
          fontSize="9"
          fontWeight="900"
          fill="#b45309"
        >
          25
        </text>


        <polyline
          points="
            75,425
            140,420
            205,428
            270,418
            335,425
            400,415
            470,410
            530,390
            590,360
            650,345
            720,330
            800,320
            845,325
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="590"
          cy="360"
          r="7"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="650"
          y="350"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          ADX Rising
        </text>


        <rect
          x="560"
          y="440"
          width="265"
          height="32"
          rx="16"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="692"
          y="461"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Stronger directional conditions
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
        href="#breakout-adx-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="تكبير رسم الاختراق ومؤشر ADX"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            تكبير الرسم
            <span>↗</span>
          </span>
        </div>
      </a>


      <div
        id="breakout-adx-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#breakout"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                الاختراق وقوة الاتجاه
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Breakout + ADX
              </div>
            </div>

            <a
              href="#breakout"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>


          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">
            <span className="text-[16px]">↔</span>
            <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل</span>
          </div>


          <div className="overflow-x-auto overflow-y-auto bg-white">
            <div className="min-w-[960px] p-3">
              <BreakoutADXChart fullscreen />
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

export default function TrendFollowingStrategyPage() {

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
        name: "Trend Following",
      },
      {
        "@type": "Thing",
        name: "Trend Following Strategy",
      },
      {
        "@type": "Thing",
        name: "Trend Trading",
      },
      {
        "@type": "Thing",
        name: "Market Trend",
      },
      {
        "@type": "Thing",
        name: "Moving Average",
      },
      {
        "@type": "Thing",
        name: "ADX Indicator",
      },
      {
        "@type": "Thing",
        name: "Pullback Trading",
      },
      {
        "@type": "Thing",
        name: "Breakout Trading",
      },
      {
        "@type": "Thing",
        name: "Technical Analysis",
      },
    ],

    keywords: [
      "استراتيجية تتبع الاتجاه",
      "تتبع الاتجاه",
      "استراتيجية الاتجاه",
      "استراتيجية التداول مع الاتجاه",
      "Trend Following Strategy",
      "Trend Following",
      "Trend Trading",
      "كيفية تحديد الاتجاه",
      "كيف تعرف اتجاه السوق",
      "الاتجاه الصاعد والهابط",
      "استراتيجية الترند",
      "تداول الترند",
      "استراتيجية تتبع الاتجاه في الفوركس",
      "استراتيجية الترند في الفوركس",
      "التداول مع الاتجاه",
      "القمم والقيعان",
      "Higher High Higher Low",
      "Lower High Lower Low",
      "استراتيجية المتوسطات المتحركة",
      "المتوسط المتحرك 50",
      "المتوسط المتحرك 200",
      "ADX",
      "مؤشر ADX",
      "قوة الاتجاه",
      "الدخول بعد التصحيح",
      "Pullback Trading",
      "استراتيجية الاختراق",
      "Breakout Trading",
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
        name: "استراتيجية تتبع الاتجاه",
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
            استراتيجية تتبع الاتجاه
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
                    Trend Following Model
                  </span>

                </div>


                <div className="p-4">
                  <TrendHeroDesktopChart />
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
                  Trend Following
                </span>

              </div>


              <h1 className="mt-4 max-w-[900px] text-[34px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                استراتيجية تتبع الاتجاه: كيف تتداول مع الترند؟
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                دليل عملي لفهم{" "}
                <strong className="font-black text-slate-900">
                  استراتيجية تتبع الاتجاه
                </strong>{" "}
                من البداية: كيف تحدد الاتجاه الصاعد والهابط، تقرأ
                القمم والقيعان، تستخدم المتوسطات المتحركة وADX،
                وتختار بين الدخول بعد التصحيح أو الاختراق مع خطة
                واضحة لوقف الخسارة والخروج من الصفقة.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
                  HH / HL
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  LH / LL
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  Moving Average
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  Pullback
                </span>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-black text-violet-700">
                  ADX
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
                  دليل متقدم ومناسب للمبتدئين
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  18–22 دقيقة
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
                  Trend Following
                </span>

              </div>


              <h1 className="mt-3 text-[26px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950">
                استراتيجية تتبع الاتجاه: كيف تتداول مع الترند؟
              </h1>


              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                تعلّم تحديد الاتجاه، قراءة القمم والقيعان، استخدام{" "}
                <strong className="font-black text-slate-900">
                  المتوسطات المتحركة وADX
                </strong>{" "}
                والدخول بعد التصحيح أو الاختراق دون مطاردة السعر.
              </p>


              <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 31 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 18–22 دقيقة
                </span>

              </div>

            </div>


            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <TrendHeroMobileChart />

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

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

              <div className="p-4 md:p-7">

                <SectionLabel>
                  ابدأ من هنا
                </SectionLabel>


                <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                  ما هي استراتيجية تتبع الاتجاه؟
                </h2>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  استراتيجية{" "}
                  <strong className="font-black text-slate-900">
                    تتبع الاتجاه Trend Following
                  </strong>{" "}
                  تقوم على فكرة بسيطة: بدل أن تحاول توقع متى سيصل
                  السوق إلى القمة أو القاع، تنتظر حتى يظهر اتجاه واضح
                  ثم تبحث عن فرصة للدخول{" "}
                  <strong className="font-black text-slate-900">
                    في نفس اتجاه الحركة المسيطرة
                  </strong>
                  .
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  فإذا كان السعر يصنع قممًا وقيعانًا أعلى، تكون الأولوية
                  للبحث عن فرص شراء مع الاتجاه. وإذا كان يصنع قممًا
                  وقيعانًا أدنى، تصبح فرص البيع مع الاتجاه أكثر انسجامًا
                  مع هيكل السوق.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  هذا لا يعني الدخول في أي حركة قوية. المتداول الجيد
                  يحاول الفصل بين{" "}
                  <strong className="font-black text-slate-900">
                    اتجاه حقيقي
                  </strong>{" "}
                  وبين حركة مؤقتة أو سوق عرضي، ثم يحدد منطقة الدخول
                  ومكان الإبطال وحجم المخاطرة قبل تنفيذ الصفقة.
                </p>


                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "حدد الاتجاه",
                      text: "ابدأ بهيكل السعر قبل المؤشرات.",
                    },
                    {
                      no: "02",
                      title: "انتظر الفرصة",
                      text: "Pullback أو Breakout منطقي.",
                    },
                    {
                      no: "03",
                      title: "أدر المخاطر",
                      text: "حدد الإبطال والهدف قبل الدخول.",
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


              {/* QUICK GUIDE */}

              <div className="border-t border-slate-200 bg-slate-50/60 p-4 md:p-6 lg:border-l lg:border-t-0">

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  TREND FOLLOWING QUICK GUIDE
                </div>

                <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                  خريطة سريعة لقراءة الترند
                </h3>


                <div className="mt-4 space-y-2">

                  {[
                    {
                      label: "HH + HL",
                      title: "اتجاه صاعد",
                      text: "قمم أعلى وقيعان أعلى.",
                    },
                    {
                      label: "LH + LL",
                      title: "اتجاه هابط",
                      text: "قمم أدنى وقيعان أدنى.",
                    },
                    {
                      label: "ADX ↑",
                      title: "قوة الاتجاه ترتفع",
                      text: "استخدمه كمرشح قوة وليس اتجاه.",
                    },
                    {
                      label: "Range",
                      title: "سوق عرضي",
                      text: "بيئة أصعب لاستراتيجيات تتبع الاتجاه.",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span
                        dir="ltr"
                        className="flex h-9 min-w-[58px] items-center justify-center rounded-[9px] bg-brand-50 px-2 text-[10px] font-black text-brand-600"
                      >
                        {item.label}
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


                <div className="mt-4 rounded-[14px] border border-amber-100 bg-amber-50/60 p-3.5">

                  <div className="text-[11px] font-black text-amber-800">
                    الفكرة الأهم
                  </div>

                  <p className="mt-1.5 text-[11px] leading-6 text-slate-600">
                    الهدف ليس شراء أعلى نقطة في الصعود أو بيع أدنى نقطة
                    في الهبوط، بل إيجاد دخول منطقي داخل اتجاه ثبت وجوده
                    بالفعل.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              01 — HOW TO IDENTIFY A TREND
          ================================================= */}

          <section
            id="identify-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — تحديد الاتجاه
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تعرف اتجاه السوق من القمم والقيعان؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                قبل إضافة أي مؤشر إلى الشارت، ابدأ بالسعر نفسه. من
                أكثر الطرق وضوحًا لتحديد الاتجاه مراقبة{" "}
                <strong className="font-black text-slate-900">
                  تسلسل القمم والقيعان
                </strong>
                . هذا يعطيك قراءة مباشرة لهيكل السوق بدل الاعتماد
                الكامل على مؤشر متأخر.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <TrendStructureChart />


              <div className="mt-4 grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[10px] font-black uppercase tracking-wide text-emerald-700"
                  >
                    HIGHER HIGHS + HIGHER LOWS
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    اتجاه صاعد
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    عندما ينجح المشترون في دفع السعر إلى قمة أعلى ثم
                    يبقى التصحيح فوق القاع السابق، فهذا يعكس هيكلًا
                    صاعدًا. استمرار هذه السلسلة يدعم بقاء الاتجاه.
                  </p>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[10px] font-black uppercase tracking-wide text-rose-700"
                  >
                    LOWER HIGHS + LOWER LOWS
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    اتجاه هابط
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    عندما يفشل السعر في استعادة القمة السابقة ثم يصنع
                    قاعًا جديدًا أدنى، فهذا يعكس سيطرة أكبر للبائعين
                    وهيكلًا هابطًا.
                  </p>

                </article>


                <article className="rounded-[18px] border border-amber-100 bg-amber-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[10px] font-black uppercase tracking-wide text-amber-700"
                  >
                    NO CLEAR STRUCTURE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    سوق عرضي
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    إذا كان السعر يتحرك بين دعم ومقاومة دون تكوين
                    قمم وقيعان متسلسلة بوضوح، فأنت غالبًا أمام نطاق
                    عرضي وليس اتجاهًا مناسبًا للمطاردة.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تجعل المتوسط المتحرك يقرر الاتجاه بدل السعر">
                  يمكن للمتوسطات المتحركة أن تساعدك على رؤية الاتجاه
                  بصورة أسرع، لكنها مشتقة من السعر نفسه. إذا كان هيكل
                  القمم والقيعان يتغير، فهذه المعلومة أهم من مجرد بقاء
                  السعر فوق خط متوسط لفترة قصيرة.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — TREND VS RANGE
          ================================================= */}

          <section
            id="trend-vs-range"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — Trend vs Range
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تفرق بين الاتجاه الحقيقي والسوق العرضي؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                من أكثر أسباب فشل استراتيجيات الترند محاولة تطبيقها
                داخل سوق لا يتحرك في اتجاه واضح. في النطاق العرضي
                يتذبذب السعر بين مناطق متقاربة وقد تحدث اختراقات صغيرة
                ثم يعود السعر بسرعة، وهو ما يؤدي إلى سلسلة من إشارات
                الدخول والخروج الخاطئة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                <article className="rounded-[20px] border border-brand-100 bg-brand-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRENDING MARKET
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    علامات السوق الاتجاهي
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "تسلسل واضح للقمم والقيعان.",
                      "الاختراقات تحصل على متابعة بدل العودة الفورية.",
                      "التصحيحات تكون مؤقتة ثم يعود الاتجاه.",
                      "المتوسطات المتحركة تميل بوضوح بدل التحرك أفقيًا.",
                      "مؤشرات قوة الاتجاه مثل ADX قد تبدأ بالارتفاع.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-brand-600">
                          ✓
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="rounded-[20px] border border-amber-100 bg-amber-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    SIDEWAYS MARKET
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    علامات السوق العرضي
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "القمة والقاع يتكرران داخل نطاق.",
                      "اختراقات كثيرة تفشل وتعود داخل النطاق.",
                      "السعر يعبر المتوسطات المتحركة ذهابًا وإيابًا.",
                      "لا يوجد تسلسل واضح HH/HL أو LH/LL.",
                      "ADX الضعيف أو الهابط قد يدعم قراءة ضعف الاتجاه.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-amber-600">
                          ×
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  لماذا هذه الخطوة مهمة جدًا؟
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  استراتيجية تتبع الاتجاه تحتاج إلى وجود حركة اتجاهية
                  تستطيع الاستمرار لمسافة كافية. إذا اشتريت كل اختراق
                  في سوق عرضي أو بعت كل كسر صغير، قد تتعرض لسلسلة من
                  الخسائر الصغيرة قبل ظهور الاتجاه الحقيقي. لذلك فإن
                  <strong className="font-black text-slate-900">
                    {" "}معرفة متى لا تتداول{" "}
                  </strong>
                  جزء أساسي من الاستراتيجية.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — MOVING AVERAGES
          ================================================= */}

          <section
            id="moving-averages"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — المتوسطات المتحركة
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تستخدم المتوسطات المتحركة لتحديد الاتجاه؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                المتوسط المتحرك يساعد على تنعيم حركة السعر وإظهار الميل
                العام بصورة أوضح. لكن الاستخدام الأفضل ليس مجرد القول
                إن{" "}
                <strong className="font-black text-slate-900">
                  السعر فوق المتوسط = شراء
                </strong>
                ، بل النظر إلى موقع السعر، ميل المتوسط، وهيكل السوق
                معًا.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                {[
                  {
                    title: "EMA 20",
                    label: "أسرع",
                    text: "يتفاعل بسرعة أكبر مع السعر، ويمكن أن يكون مفيدًا لمتابعة الاتجاهات القصيرة والتصحيحات الضحلة، لكنه أكثر حساسية للتذبذب.",
                  },
                  {
                    title: "MA / EMA 50",
                    label: "متوسط المدى",
                    text: "يستخدم كثيرًا لمتابعة الاتجاه المتوسط وقد يعمل كمرجع ديناميكي أثناء التصحيحات، لكنه ليس دعمًا مضمونًا.",
                  },
                  {
                    title: "MA / EMA 200",
                    label: "الاتجاه الأكبر",
                    text: "يستخدم كثيرًا لفهم الميل طويل الأجل. موقع السعر بالنسبة له يمكن أن يعطي سياقًا عامًا لكنه لا يكفي وحده للدخول.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <h3
                        dir="ltr"
                        className="text-[18px] font-black text-slate-950"
                      >
                        {item.title}
                      </h3>

                      <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                        {item.label}
                      </span>

                    </div>

                    <p className="mt-3 text-[13px] leading-7 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 lg:grid-cols-2">

                <div className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    BULLISH CONTEXT
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    ماذا تبحث عنه في الاتجاه الصاعد؟
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    يكون السيناريو أقوى عندما يكون السعر فوق متوسط
                    صاعد، وهيكل السعر نفسه يكوّن قممًا وقيعانًا أعلى.
                    عندها يمكن استخدام المتوسط كمنطقة مرجعية محتملة
                    أثناء التصحيح، وليس كزر شراء تلقائي.
                  </p>

                </div>


                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    BEARISH CONTEXT
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    ماذا تبحث عنه في الاتجاه الهابط؟
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    وجود السعر تحت متوسط هابط مع قمم وقيعان أدنى يدعم
                    القراءة الهابطة. قد تصبح عودة السعر نحو المتوسط
                    جزءًا من منطقة التصحيح التي يراقب عندها المتداول
                    عودة ضغط البائعين.
                  </p>

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا يوجد متوسط متحرك سحري">
                  EMA 20 أو 50 أو 200 لا يعرف أين سينعكس السعر. القيمة
                  الحقيقية للمتوسط تأتي عندما تستخدمه كجزء من قراءة
                  الاتجاه وهيكل السوق، لا عندما تغير الإعدادات باستمرار
                  حتى تحصل على نتائج تاريخية مثالية.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — PULLBACK
          ================================================= */}

          <section
            id="pullback"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — Pullback Trading
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية الدخول بعد التصحيح: كيف تدخل مع الاتجاه دون مطاردة السعر؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                من أفضل الطرق لفهم تداول الاتجاه انتظار{" "}
                <strong className="font-black text-slate-900">
                  Pullback أو التصحيح
                </strong>
                . بدل الدخول بعد شموع قوية ومتتالية، تنتظر عودة السعر
                مؤقتًا عكس الاتجاه الرئيسي نحو منطقة منطقية ثم تبحث عن
                دليل على استئناف الحركة الأصلية.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <PullbackEntryChart />


              <div className="mt-4 grid gap-3 md:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "حدد الترند",
                    text: "تأكد من وجود هيكل صاعد أو هابط واضح.",
                  },
                  {
                    no: "02",
                    title: "انتظر التصحيح",
                    text: "لا تدخل بعد حركة ممتدة.",
                  },
                  {
                    no: "03",
                    title: "حدد المنطقة",
                    text: "دعم، مقاومة، Swing أو متوسط.",
                  },
                  {
                    no: "04",
                    title: "انتظر التأكيد",
                    text: "راقب عودة الزخم في اتجاه الترند.",
                  },
                  {
                    no: "05",
                    title: "حدد الإبطال",
                    text: "ضع الوقف حيث تصبح الفكرة خاطئة.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                  <h3 className="text-[16px] font-black text-slate-950">
                    مثال: شراء Pullback داخل اتجاه صاعد
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    السعر يصنع قممًا وقيعانًا أعلى ثم يبدأ بالتصحيح.
                    بدل شراء القمة، تنتظر عودته نحو منطقة دعم أو قاع
                    سابق أو متوسط صاعد. إذا فشل البائعون في كسر
                    الهيكل وبدأ المشترون بالعودة، يصبح الدخول أقرب إلى
                    منطق الاتجاه.
                  </p>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    انتبه
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    ليس كل هبوط داخل اتجاه صاعد Pullback
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    إذا كسر السعر قاعًا هيكليًا مهمًا وبدأ يصنع قممًا
                    وقيعانًا أدنى، فقد يكون ما تراه بداية تغير اتجاه
                    وليس مجرد تصحيح. لهذا السبب يكون الإبطال السعري
                    أهم من مجرد ملامسة المتوسط المتحرك.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — BREAKOUT
          ================================================= */}

          <section
            id="breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — Breakout Trading
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية الاختراق: كيف تبدأ الاتجاهات بعد كسر النطاق؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا تبدأ كل الاتجاهات من Pullback واضح. أحيانًا يبقى
                السعر فترة داخل نطاق أو تجميع، ثم يخترق مستوى رئيسيًا
                وتبدأ حركة اتجاهية جديدة. هنا تأتي{" "}
                <strong className="font-black text-slate-900">
                  استراتيجية الاختراق Breakout
                </strong>{" "}
                كطريقة أخرى للدخول مع الاتجاه.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <BreakoutADXChart />


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    VALID BREAKOUT CHECKLIST
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    ماذا تبحث عنه في الاختراق؟
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "مستوى واضح لاحظه السوق أكثر من مرة.",
                      "إغلاق سعري خارج النطاق بدل مجرد ذيل شمعة.",
                      "وجود متابعة بعد الكسر بدل العودة الفورية.",
                      "اتساع الحركة أو ارتفاع قوة الاتجاه.",
                      "وجود مكان منطقي لوقف الخسارة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-brand-600">
                          ✓
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    FALSE BREAKOUT RISK
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    لماذا تفشل بعض الاختراقات؟
                  </h3>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600">
                    قد يخترق السعر المقاومة لبضع نقاط ثم يعود داخل
                    النطاق. هذا لا يعني أن هناك طريقة مضمونة لاكتشاف
                    كل اختراق كاذب، لكن انتظار الإغلاق والمتابعة وقراءة
                    قوة الاتجاه يقلل من الاعتماد على مجرد لمس المستوى.
                  </p>


                  <div className="mt-3 rounded-[12px] bg-white p-3">

                    <div className="text-[11px] font-black text-slate-950">
                      خيار أكثر تحفظًا
                    </div>

                    <p className="mt-1 text-[11px] leading-6 text-slate-500">
                      بعض المتداولين ينتظرون الاختراق ثم إعادة اختبار
                      المستوى Retest قبل البحث عن الدخول، بدل مطاردة
                      أول شمعة خارج النطاق.
                    </p>

                  </div>

                </article>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — ADX
          ================================================= */}

          <section
            id="adx"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — مؤشر ADX
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تستخدم مؤشر ADX لقياس قوة الاتجاه؟
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                مؤشر{" "}
                <strong
                  dir="ltr"
                  className="inline-block font-black text-slate-900"
                >
                  ADX — Average Directional Index
                </strong>{" "}
                مصمم لقياس{" "}
                <strong className="font-black text-slate-900">
                  قوة الاتجاه
                </strong>
                ، وليس تحديد ما إذا كان الاتجاه صاعدًا أو هابطًا.
                لذلك يمكن أن يرتفع ADX أثناء اتجاه صاعد قوي أو اتجاه
                هابط قوي.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    value: "< 20",
                    title: "اتجاه ضعيف",
                    text: "قد يكون السوق عرضيًا أو لا توجد حركة اتجاهية واضحة.",
                  },
                  {
                    value: "20–25",
                    title: "مرحلة انتقال",
                    text: "قد تبدأ قوة الاتجاه بالظهور، لكن القراءة تحتاج إلى سياق السعر.",
                  },
                  {
                    value: "25+",
                    title: "قوة اتجاه أوضح",
                    text: "غالبًا يصبح التركيز على أنظمة تتبع الاتجاه أكثر منطقية.",
                  },
                  {
                    value: "ADX ↑",
                    title: "القوة ترتفع",
                    text: "ارتفاع الخط يعني أن الحركة الاتجاهية الحالية تزداد قوة.",
                  },
                ].map((item) => (
                  <article
                    key={item.value}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <div
                      dir="ltr"
                      className="text-[19px] font-black text-brand-600"
                    >
                      {item.value}
                    </div>

                    <h3 className="mt-1 text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <h3 className="text-[17px] font-black text-slate-950">
                    ما الذي يخبرك به ADX فعلًا؟
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    إذا كان ADX يرتفع، فهذا يدعم فكرة أن الحركة
                    الاتجاهية الحالية تزداد قوة. لذلك تصبح إشارات
                    أدوات مثل المتوسطات المتحركة أو اختراق القنوات
                    أكثر قابلية للاهتمام مقارنةً بفترة ADX ضعيف أو
                    هابط.
                  </p>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    أما إذا كان ADX ينخفض، فلا يعني ذلك بالضرورة أن
                    السعر سينعكس فورًا؛ بل يعني أن{" "}
                    <strong className="font-black text-slate-900">
                      قوة الاتجاه تتراجع
                    </strong>
                    . وقد يبدأ السوق بالدخول في تذبذب أو مرحلة
                    تجميع.
                  </p>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    خطأ شائع
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    ADX لا يقول Buy أو Sell
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    قراءة ADX مرتفعة لا تعني شراء. يجب معرفة الاتجاه
                    من السعر أو أدوات الاتجاه الأخرى. وظيفة ADX
                    الأساسية هنا هي أن تجيب عن سؤال مختلف:
                    <strong className="font-black text-slate-900">
                      {" "}هل الحركة الاتجاهية قوية أم ضعيفة؟
                    </strong>
                  </p>

                </aside>

              </div>


              <div className="mt-4">

                <ImportantBox title="استخدم ADX كفلتر وليس كاستراتيجية كاملة">
                  أحد الاستخدامات العملية لـADX هو مساعدتك على تجنب
                  تطبيق استراتيجية Trend Following داخل فترات تذبذب
                  ضعيفة. لكن لا تعتمد على رقم 20 أو 25 بصورة آلية؛
                  اقرأ اتجاه الخط مع هيكل السعر والاختراق أو التصحيح
                  الذي تراقبه.
                </ImportantBox>

              </div>

            </div>

          </section>
          
                    {/* =================================================
              07 — COMPLETE TREND FOLLOWING SYSTEM
          ================================================= */}

          <section
            id="trend-following-system"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — بناء الاستراتيجية
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تبني استراتيجية تتبع الاتجاه خطوة بخطوة؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                بعد فهم هيكل السوق والمتوسطات المتحركة والتصحيحات
                والاختراقات، يمكن تحويل هذه الأدوات إلى{" "}
                <strong className="font-black text-slate-900">
                  خطة تداول واضحة
                </strong>
                . الفكرة ليست جمع أكبر عدد من المؤشرات، بل تحديد شروط
                بسيطة تجيب عن ستة أسئلة: ما الاتجاه؟ أين سأدخل؟ ما
                التأكيد؟ أين تصبح الفكرة خاطئة؟ كم سأخاطر؟ وكيف سأخرج؟
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-2.5 md:grid-cols-3 lg:grid-cols-6">

                {[
                  {
                    no: "01",
                    title: "الاتجاه",
                    text: "حدد HH/HL أو LH/LL.",
                  },
                  {
                    no: "02",
                    title: "القوة",
                    text: "تأكد أن السوق ليس عرضيًا.",
                  },
                  {
                    no: "03",
                    title: "المنطقة",
                    text: "Pullback أو Breakout.",
                  },
                  {
                    no: "04",
                    title: "التأكيد",
                    text: "انتظر عودة الزخم.",
                  },
                  {
                    no: "05",
                    title: "الإبطال",
                    text: "حدد مكان وقف الخسارة.",
                  },
                  {
                    no: "06",
                    title: "الخروج",
                    text: "هدف أو Trailing Stop.",
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

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRADING LOGIC
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    السعر أولًا، ثم الفلتر، ثم الدخول
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    ابدأ بتحديد الاتجاه من السعر. بعد ذلك استخدم أداة
                    مثل المتوسط المتحرك أو ADX لدعم القراءة وليس
                    لاستبدالها. ثم انتظر أن يصل السعر إلى منطقة دخول
                    منطقية، وبعد ظهور التأكيد حدد مستوى الإبطال قبل
                    تنفيذ الصفقة.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      ["الاتجاه", "Price Structure"],
                      ["الفلتر", "MA / ADX"],
                      ["الدخول", "Pullback / Breakout"],
                      ["التأكيد", "Price Action"],
                      ["المخاطرة", "Position Size"],
                      ["الخروج", "Target / Trailing"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-slate-100 bg-white px-3 py-2.5"
                      >
                        <span className="text-[11px] text-slate-500">
                          {label}
                        </span>

                        <span
                          dir="ltr"
                          className="text-[11px] font-black text-slate-800"
                        >
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    أهم قاعدة
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    لا تدخل لأن السوق "يبدو صاعدًا"
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    الاتجاه يحدد{" "}
                    <strong className="font-black text-slate-900">
                      الجانب الذي تريد التداول معه
                    </strong>
                    ، لكنه لا يحدد وحده نقطة الدخول. يمكن أن يكون
                    الاتجاه ممتازًا لكن الدخول سيئًا إذا اشتريت بعد
                    امتداد كبير وبعيدًا عن منطقة إبطال واضحة.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              08 — COMPLETE TRADE EXAMPLE
          ================================================= */}

          <section
            id="trend-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — مثال عملي كامل
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مثال على صفقة Trend Following من التحليل حتى الخروج
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لنفترض أن السعر في اتجاه صاعد واضح ويصنع قممًا وقيعانًا
                أعلى. بدل الدخول بعد تسجيل قمة جديدة، ينتظر المتداول
                حدوث تصحيح نحو منطقة دعم ثم يبحث عن عودة المشترين قبل
                تنفيذ الصفقة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}

              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  ["01", "الاتجاه", "HH + HL"],
                  ["02", "التصحيح", "عودة نحو الدعم"],
                  ["03", "المنطقة", "Swing / EMA"],
                  ["04", "التأكيد", "عودة المشترين"],
                  ["05", "الوقف", "أسفل الإبطال"],
                  ["06", "الخروج", "Target / Trail"],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </span>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p
                      dir={text.includes("+") || text.includes("/") ? "ltr" : "rtl"}
                      className="mt-2 text-[11px] leading-5 text-slate-500"
                    >
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}

              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "حدد الاتجاه", "قمم وقيعان أعلى."],
                  ["02", "انتظر التصحيح", "لا تطارد القمة."],
                  ["03", "حدد المنطقة", "دعم أو Swing سابق."],
                  ["04", "انتظر التأكيد", "عودة ضغط المشترين."],
                  ["05", "حدد الوقف", "أسفل مستوى الإبطال."],
                  ["06", "خطط للخروج", "هدف أو Trailing Stop."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-3 ${
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

                      <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                        {text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>


              <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    منطق الصفقة
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    لماذا يعتبر هذا دخولًا مع الاتجاه؟
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    لأن المتداول لم يحاول توقع قاع جديد ولم يشترِ
                    لمجرد أن السعر هبط. الاتجاه كان صاعدًا أصلًا،
                    والتصحيح عاد إلى منطقة منطقية دون إبطال الهيكل،
                    ثم ظهر دليل على عودة المشترين. هنا يصبح الدخول
                    امتدادًا للسيناريو القائم وليس محاولة توقع حركة
                    جديدة من الصفر.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      ["هيكل السوق", "HH + HL"],
                      ["نوع الدخول", "Pullback"],
                      ["منطقة المراقبة", "Support / EMA"],
                      ["التأكيد", "Bullish Reaction"],
                      ["الإبطال", "Below Swing Low"],
                      ["الخروج", "Target / Trailing"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                      >
                        <span className="text-[11px] text-slate-500">
                          {label}
                        </span>

                        <span
                          dir="ltr"
                          className="text-[11px] font-black text-slate-800"
                        >
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[20px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    ماذا لو استمر السعر بالصعود دون Pullback؟
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    ليس مطلوبًا أن تدخل كل اتجاه
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    تفويت صفقة أفضل من الدخول في مكان يجعل وقف الخسارة
                    غير منطقي أو نسبة المخاطرة إلى العائد سيئة. وجود
                    اتجاه قوي لا يعني أن كل سعر داخل الاتجاه مناسب
                    للدخول.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              09 — LONG VS SHORT
          ================================================= */}

          <section
            id="long-short-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — صاعد وهابط
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تتداول الاتجاه الصاعد والاتجاه الهابط؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                المنطق نفسه يعمل في الاتجاهين، لكن بصورة معكوسة.
                في الاتجاه الصاعد تبحث أساسًا عن مناطق يعود منها
                المشترون، بينما في الاتجاه الهابط تراقب التصحيحات
                الصاعدة بحثًا عن عودة ضغط البائعين.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-2">

                <article className="overflow-hidden rounded-[20px] border border-emerald-100">

                  <div className="bg-emerald-50/70 p-4 md:p-5">

                    <div
                      dir="ltr"
                      className="text-left text-[10px] font-black uppercase tracking-wide text-emerald-700"
                    >
                      LONG TREND SETUP
                    </div>

                    <h3 className="mt-1 text-[19px] font-black text-slate-950">
                      التداول مع الاتجاه الصاعد
                    </h3>

                  </div>


                  <div className="space-y-2 p-4 md:p-5">

                    {[
                      ["1", "السعر يصنع Higher Highs وHigher Lows."],
                      ["2", "المتوسطات الرئيسية تميل إلى الأعلى."],
                      ["3", "يحدث Pullback نحو دعم أو قاع سابق."],
                      ["4", "يفشل البائعون في كسر الهيكل الصاعد."],
                      ["5", "يظهر تأكيد على عودة المشترين."],
                      ["6", "الوقف يوضع أسفل منطقة الإبطال المناسبة."],
                    ].map(([no, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[11px] bg-emerald-50/40 px-3 py-2.5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white">
                          {no}
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="overflow-hidden rounded-[20px] border border-rose-100">

                  <div className="bg-rose-50/70 p-4 md:p-5">

                    <div
                      dir="ltr"
                      className="text-left text-[10px] font-black uppercase tracking-wide text-rose-700"
                    >
                      SHORT TREND SETUP
                    </div>

                    <h3 className="mt-1 text-[19px] font-black text-slate-950">
                      التداول مع الاتجاه الهابط
                    </h3>

                  </div>


                  <div className="space-y-2 p-4 md:p-5">

                    {[
                      ["1", "السعر يصنع Lower Highs وLower Lows."],
                      ["2", "المتوسطات الرئيسية تميل إلى الأسفل."],
                      ["3", "يحدث تصحيح صاعد نحو مقاومة أو قمة سابقة."],
                      ["4", "يفشل المشترون في استعادة الهيكل الصاعد."],
                      ["5", "يظهر تأكيد على عودة ضغط البائعين."],
                      ["6", "الوقف يوضع أعلى منطقة الإبطال المناسبة."],
                    ].map(([no, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[11px] bg-rose-50/40 px-3 py-2.5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white">
                          {no}
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4">
                <ImportantBox title="الاتجاه لا يلغي إدارة المخاطر">
                  حتى عندما تتوافق جميع عناصر الاستراتيجية، يمكن أن
                  يفشل التصحيح أو يتحول الاتجاه فجأة بعد خبر أو تغير
                  في تدفق السوق. لذلك لا توجد صفقة Trend Following
                  مضمونة، ويجب تحديد المخاطرة قبل الدخول.
                </ImportantBox>
              </div>

            </div>

          </section>


          {/* =================================================
              10 — PULLBACK VS BREAKOUT
          ================================================= */}

          <section
            id="pullback-vs-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — مقارنة طرق الدخول
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pullback أم Breakout: أي طريقة أفضل للدخول مع الاتجاه؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا توجد طريقة دخول أفضل دائمًا. الدخول بعد التصحيح
                والاختراق يحاولان المشاركة في الاتجاه لكن لكل منهما
                خصائص مختلفة من حيث التوقيت، مكان وقف الخسارة واحتمال
                الدخول المتأخر.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="overflow-hidden rounded-[18px] border border-slate-200">

                <div className="hidden grid-cols-[1fr_1fr_1fr] bg-slate-950 text-white md:grid">

                  <div className="p-3 text-[11px] font-black">
                    العامل
                  </div>

                  <div
                    dir="ltr"
                    className="p-3 text-center text-[11px] font-black"
                  >
                    PULLBACK
                  </div>

                  <div
                    dir="ltr"
                    className="p-3 text-center text-[11px] font-black"
                  >
                    BREAKOUT
                  </div>

                </div>


                <div className="hidden md:block">

                  {[
                    ["الدخول", "بعد تصحيح داخل الاتجاه", "بعد كسر مستوى مهم"],
                    ["السعر", "قد يوفر سعرًا أفضل", "قد يكون الدخول أعلى / أدنى"],
                    ["التأكيد", "عودة الاتجاه بعد التراجع", "استمرار السعر بعد الكسر"],
                    ["الخطر", "تحول التصحيح إلى انعكاس", "اختراق كاذب"],
                    ["الوقف", "خلف Swing أو منطقة الإبطال", "خلف النطاق أو بنية الكسر"],
                  ].map(([label, pullback, breakout]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[1fr_1fr_1fr] border-t border-slate-100 first:border-t-0"
                    >

                      <div className="bg-slate-50 p-3 text-[12px] font-black text-slate-800">
                        {label}
                      </div>

                      <div className="p-3 text-center text-[12px] leading-6 text-slate-600">
                        {pullback}
                      </div>

                      <div className="border-r border-slate-100 p-3 text-center text-[12px] leading-6 text-slate-600">
                        {breakout}
                      </div>

                    </div>
                  ))}

                </div>


                {/* MOBILE */}

                <div className="divide-y divide-slate-100 md:hidden">

                  {[
                    ["الدخول", "بعد تصحيح", "بعد اختراق"],
                    ["السعر", "غالبًا أفضل", "قد يكون ممتدًا"],
                    ["الخطر", "فشل التصحيح", "اختراق كاذب"],
                    ["الوقف", "خلف Swing", "خلف النطاق"],
                  ].map(([label, pullback, breakout]) => (
                    <div
                      key={label}
                      className="p-3.5"
                    >

                      <div className="text-[12px] font-black text-slate-950">
                        {label}
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2">

                        <div className="rounded-[10px] bg-brand-50 p-2.5">
                          <div
                            dir="ltr"
                            className="text-[9px] font-black text-brand-600"
                          >
                            PULLBACK
                          </div>
                          <div className="mt-1 text-[11px] text-slate-600">
                            {pullback}
                          </div>
                        </div>

                        <div className="rounded-[10px] bg-slate-50 p-2.5">
                          <div
                            dir="ltr"
                            className="text-[9px] font-black text-slate-700"
                          >
                            BREAKOUT
                          </div>
                          <div className="mt-1 text-[11px] text-slate-600">
                            {breakout}
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — TIMEFRAMES
          ================================================= */}

          <section
            id="trend-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — الأطر الزمنية
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل فريم لاستراتيجية تتبع الاتجاه؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا يوجد إطار زمني واحد مناسب للجميع. كلما انخفض الفريم
                زاد عدد الحركات والإشارات، لكن يزداد أيضًا تأثير الضوضاء
                السعرية. أما الفريمات الأكبر فتنتج إشارات أقل لكنها
                تساعد عادةً على رؤية الهيكل العام بصورة أوضح.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    tf: "5m–15m",
                    title: "قصير جدًا",
                    text: "إشارات كثيرة وسريعة مع ضوضاء واختراقات كاذبة أكثر.",
                  },
                  {
                    tf: "1H",
                    title: "تداول يومي",
                    text: "يمكن أن يوازن بين عدد الفرص ووضوح هيكل الاتجاه.",
                  },
                  {
                    tf: "4H",
                    title: "Swing",
                    text: "شائع لمراقبة الاتجاهات التي تمتد عدة جلسات أو أيام.",
                  },
                  {
                    tf: "1D",
                    title: "اتجاه أوسع",
                    text: "مفيد لفهم الصورة الأكبر وتقليل تأثير الحركة اللحظية.",
                  },
                ].map((item) => (
                  <article
                    key={item.tf}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <div
                      dir="ltr"
                      className="text-[19px] font-black text-brand-600"
                    >
                      {item.tf}
                    </div>

                    <h3 className="mt-1 text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[17px] font-black text-slate-950">
                  استخدام أكثر من فريم
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  يمكن للمتداول مثلًا تحديد الاتجاه العام على{" "}
                  <strong
                    dir="ltr"
                    className="inline-block font-black text-slate-900"
                  >
                    4H
                  </strong>{" "}
                  ثم البحث عن منطقة دخول أكثر دقة على{" "}
                  <strong
                    dir="ltr"
                    className="inline-block font-black text-slate-900"
                  >
                    1H
                  </strong>
                  . الهدف من تعدد الفريمات ليس البحث حتى تجد إشارة
                  تعجبك، بل الفصل بين{" "}
                  <strong className="font-black text-slate-900">
                    سياق الاتجاه وتوقيت الدخول
                  </strong>
                  .
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — STOP LOSS
          ================================================= */}

          <section
            id="trend-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — وقف الخسارة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أين تضع وقف الخسارة في استراتيجية تتبع الاتجاه؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                وقف الخسارة لا يجب أن يكون رقمًا عشوائيًا من النقاط.
                المكان المنطقي هو المنطقة التي إذا وصل إليها السعر
                يصبح{" "}
                <strong className="font-black text-slate-900">
                  سبب دخول الصفقة غير صالح
                </strong>
                .
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    STRUCTURE STOP
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    خلف القاع أو القمة
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    في شراء Pullback يمكن وضع الوقف أسفل القاع الذي
                    يجب أن يبقى قائمًا حتى يستمر السيناريو الصاعد.
                    وفي البيع يكون المنطق معكوسًا.
                  </p>

                </article>


                <article className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    VOLATILITY
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    راعِ تذبذب السوق
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    الوقف الضيق جدًا قد يُضرب بسبب الحركة الطبيعية.
                    يمكن استخدام هيكل السعر مع مقياس للتذبذب مثل ATR
                    لفهم مقدار المساحة التي يحتاجها السوق.
                  </p>

                </article>


                <article className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    POSITION SIZE
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    عدّل حجم الصفقة
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    إذا كان الوقف المنطقي بعيدًا، لا تقرّبه فقط لزيادة
                    حجم الصفقة. الأفضل تقليل حجم المركز حتى تبقى
                    المخاطرة النقدية ضمن الحد الذي حددته.
                  </p>

                </article>

              </div>


              <div className="mt-4 flex flex-wrap gap-2">

                <Link
                  href="/learn-trading/stop-loss"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-slate-800"
                >
                  شرح وقف الخسارة
                </Link>

                <Link
                  href="/tools/risk-calculator"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-600"
                >
                  حاسبة المخاطر
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              13 — TRAILING STOP & EXIT
          ================================================= */}

          <section
            id="trend-exit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                13 — الخروج من الاتجاه
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                متى تخرج من صفقة Trend Following؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                نقطة الخروج مهمة جدًا في تتبع الاتجاه لأن الهدف الأساسي
                هو السماح للصفقات القوية بالاستمرار عندما يمتد الترند،
                مع وجود طريقة واضحة لحماية رأس المال أو الأرباح
                المحتملة إذا بدأت الحركة بالضعف.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    no: "01",
                    title: "هدف ثابت",
                    text: "الخروج عند مقاومة أو دعم أو هدف محدد مسبقًا.",
                  },
                  {
                    no: "02",
                    title: "Trailing Stop",
                    text: "تحريك الوقف مع استمرار السعر في صالح الصفقة.",
                  },
                  {
                    no: "03",
                    title: "كسر الهيكل",
                    text: "الخروج عندما يفشل تسلسل القمم والقيعان.",
                  },
                  {
                    no: "04",
                    title: "ضعف الاتجاه",
                    text: "استخدام تغير السعر والمؤشرات كإشارة لإدارة الصفقة.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[20px] border border-brand-100 bg-brand-50/40 p-4 md:p-5">

                  <div
                    dir="ltr"
                    className="text-left text-[10px] font-black uppercase tracking-wide text-brand-600"
                  >
                    TRAILING STOP
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    كيف تستخدم الوقف المتحرك؟
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    بدل تحديد هدف ثابت فقط، يمكن تحريك وقف الخسارة
                    تدريجيًا مع تقدم الاتجاه. في اتجاه صاعد مثلًا يمكن
                    ربطه بآخر قاع صاعد مؤكد، أو استخدام مسافة ثابتة
                    أو نسبة مئوية أو قاعدة تعتمد على التذبذب.
                  </p>

                  <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    الفائدة هي محاولة البقاء في الاتجاه طالما استمر،
                    لكن الوقف المتحرك لا يضمن سعر التنفيذ المحدد وقد
                    يتأثر بالفجوات والتذبذب السريع.
                  </p>

                </div>


                <aside className="rounded-[20px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    المشكلة النفسية
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    لا تخنق الصفقة الرابحة
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    تحريك الوقف قريبًا جدًا من السعر بعد كل شمعة قد
                    يخرجك من اتجاه طبيعي بسبب تصحيح صغير. إذا كانت
                    استراتيجيتك تهدف إلى التقاط اتجاهات كبيرة، فيجب
                    أن تمنح الحركة مساحة تتناسب مع تذبذب السوق.
                  </p>

                </aside>

              </div>


              <div className="mt-4">
                <ImportantBox title="حدد طريقة الخروج قبل الدخول">
                  لا تنتظر حتى تصبح الصفقة رابحة ثم تقرر كل مرة بطريقة
                  مختلفة. اختر مسبقًا هل ستستخدم هدفًا ثابتًا، خروجًا
                  جزئيًا، Trailing Stop، أو كسرًا في هيكل الاتجاه.
                  اتساق قواعد الخروج مهم بقدر اتساق قواعد الدخول.
                </ImportantBox>
              </div>

            </div>

          </section>


          {/* =================================================
              14 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="trend-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                14 — إدارة المخاطر
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                إدارة المخاطر في استراتيجية تتبع الاتجاه
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                طبيعة Trend Following تعني أن بعض الإشارات ستفشل،
                خصوصًا أثناء الأسواق العرضية. لذلك لا يعتمد نجاح
                المنهج على نسبة الصفقات الرابحة فقط، بل على التحكم
                بالخسائر عندما لا يظهر الاتجاه المتوقع والسماح
                للصفقات الجيدة بالتطور عندما يستمر الترند.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "حدد المخاطرة",
                    text: "اختر مسبقًا مقدار رأس المال الذي تستطيع خسارته في الصفقة.",
                  },
                  {
                    title: "حدد الوقف أولًا",
                    text: "اعرف مكان الإبطال قبل حساب حجم المركز.",
                  },
                  {
                    title: "احسب الحجم",
                    text: "يتغير حجم الصفقة حسب المسافة إلى وقف الخسارة.",
                  },
                  {
                    title: "تقبل الخسائر الصغيرة",
                    text: "لا توسع الوقف فقط لتجنب الاعتراف بفشل السيناريو.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <h3 className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-950 p-4 text-white md:p-6">

                <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">

                  <div>

                    <div className="text-[10px] font-black uppercase tracking-wide text-blue-300">
                      POSITION SIZING
                    </div>

                    <h3 className="mt-1 text-[19px] font-black">
                      لا تجعل حجم الصفقة يحدد وقفك
                    </h3>

                  </div>


                  <p className="text-[13px] leading-7 text-slate-300 md:text-[14px]">
                    الترتيب الصحيح هو: حدد نقطة الدخول، ثم المكان
                    المنطقي للإبطال، ثم احسب المسافة إلى وقف الخسارة،
                    وبعدها اختر حجم الصفقة الذي يجعل الخسارة المحتملة
                    متوافقة مع مستوى المخاطرة الذي حددته. وليس العكس.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              15 — TREND FAILURE
          ================================================= */}

          <section
            id="trend-failure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                15 — ضعف الاتجاه
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تعرف أن الاتجاه يضعف أو قد يكون انتهى؟
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا توجد إشارة واحدة تستطيع تحديد نهاية كل اتجاه.
                الأفضل مراقبة مجموعة من التغيرات في سلوك السعر بدل
                محاولة بيع أعلى قمة أو شراء أدنى قاع.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "فشل قمة جديدة",
                    text: "الاتجاه الصاعد يبدأ بالفشل في تسجيل Higher High واضح.",
                  },
                  {
                    no: "02",
                    title: "كسر Swing مهم",
                    text: "السعر يكسر قاعًا كان يحافظ على الهيكل الصاعد.",
                  },
                  {
                    no: "03",
                    title: "تغير الهيكل",
                    text: "بدء ظهور Lower High ثم Lower Low قد يشير لتحول أعمق.",
                  },
                  {
                    no: "04",
                    title: "ضعف الزخم",
                    text: "الحركات مع الاتجاه تصبح أقصر والتصحيحات أعمق.",
                  },
                  {
                    no: "05",
                    title: "ADX يتراجع",
                    text: "قد يشير إلى تراجع قوة الحركة الاتجاهية الحالية.",
                  },
                  {
                    no: "06",
                    title: "المتوسط يتسطح",
                    text: "ميل المتوسط يبدأ بالاختفاء مع تذبذب السعر حوله.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-slate-950 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4">
                <ImportantBox title="ضعف الاتجاه لا يعني انعكاسًا فوريًا">
                  قد ينتقل السوق من اتجاه قوي إلى نطاق جانبي بدل أن
                  ينعكس مباشرة. لذلك يجب التفريق بين{" "}
                  <strong className="font-black text-slate-900">
                    Trend Weakness
                  </strong>{" "}
                  و
                  <strong className="font-black text-slate-900">
                    {" "}Trend Reversal
                  </strong>
                  . ضعف الزخم تحذير لإدارة الصفقة، وليس بالضرورة إشارة
                  لفتح مركز معاكس.
                </ImportantBox>
              </div>

            </div>

          </section>


          {/* =================================================
              16 — COMMON MISTAKES
          ================================================= */}

          <section
            id="trend-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                16 — أخطاء شائعة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أخطاء شائعة عند التداول مع الاتجاه
              </h2>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "مطاردة السعر",
                    text: "الدخول بعد حركة ممتدة لأنك تخشى تفويت الاتجاه.",
                  },
                  {
                    no: "02",
                    title: "تجاهل السوق العرضي",
                    text: "تطبيق Trend Following عندما لا يوجد Trend أصلًا.",
                  },
                  {
                    no: "03",
                    title: "الاعتماد على MA وحده",
                    text: "اعتبار كل تقاطع أو لمس للمتوسط إشارة تداول.",
                  },
                  {
                    no: "04",
                    title: "الدخول دون إبطال",
                    text: "تنفيذ الصفقة قبل معرفة أين تصبح الفكرة خاطئة.",
                  },
                  {
                    no: "05",
                    title: "الخروج المبكر جدًا",
                    text: "إغلاق الصفقة عند أول تصحيح صغير رغم استمرار الهيكل.",
                  },
                  {
                    no: "06",
                    title: "تحويل الخاسر إلى استثمار",
                    text: "توسيع وقف الخسارة عندما يتحرك السوق ضد السيناريو.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[18px] border border-rose-100 bg-rose-50/30 p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-rose-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              17 — PROS & CONS
          ================================================= */}

          <section
            id="trend-pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                17 — المميزات والعيوب
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مميزات وعيوب استراتيجية تتبع الاتجاه
              </h2>

            </div>


            <div className="grid lg:grid-cols-2">

              <div className="border-b border-slate-200 p-4 md:p-7 lg:border-b-0 lg:border-l">

                <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                  المميزات
                </div>

                <h3 className="mt-1 text-[19px] font-black text-slate-950">
                  لماذا يستخدم المتداولون Trend Following؟
                </h3>


                <div className="mt-4 space-y-2">

                  {[
                    "لا يتطلب توقع القمة أو القاع بدقة.",
                    "يمكن تطبيقه على أسواق وأطر زمنية مختلفة.",
                    "يوفر قواعد واضحة نسبيًا لتحديد اتجاه التداول.",
                    "يمكن دمجه مع Pullback أو Breakout.",
                    "يسمح بمحاولة الاستفادة من الاتجاهات الممتدة.",
                    "يمكن تحويله إلى نظام تداول منظم وقابل للاختبار.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-[11px] bg-emerald-50/50 px-3 py-2.5"
                    >
                      <span className="mt-0.5 font-black text-emerald-600">
                        ✓
                      </span>

                      <span className="text-[12px] leading-6 text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>


              <div className="p-4 md:p-7">

                <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                  العيوب
                </div>

                <h3 className="mt-1 text-[19px] font-black text-slate-950">
                  ما تحديات التداول مع الاتجاه؟
                </h3>


                <div className="mt-4 space-y-2">

                  {[
                    "الأسواق العرضية قد تسبب إشارات كاذبة متكررة.",
                    "قد يبدأ الاتجاه قبل أن تحصل على دخول مثالي.",
                    "الدخول المتأخر قد يجعل نسبة العائد إلى المخاطرة ضعيفة.",
                    "الاختراقات الكاذبة قد تسبب خسائر متتابعة.",
                    "الخروج المبكر قد يمنعك من الاستفادة من الاتجاهات الكبيرة.",
                    "يتطلب الانضباط وتقبل فترات لا توجد فيها فرص مناسبة.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-[11px] bg-rose-50/50 px-3 py-2.5"
                    >
                      <span className="mt-0.5 font-black text-rose-600">
                        ×
                      </span>

                      <span className="text-[12px] leading-6 text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-sm">

            <div className="p-4 md:p-7">

              <SectionLabel>
                خطة تعلم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] md:text-[34px]">
                كيف تتعلم استراتيجية تتبع الاتجاه كمبتدئ؟
              </h2>

              <p className="mt-3 max-w-5xl text-[14px] leading-7 text-slate-300 md:text-[15px] md:leading-8">
                لا تبدأ بخمسة مؤشرات وعشرات الشروط. تعلّم الاستراتيجية
                على مراحل حتى تستطيع فهم سبب كل قرار تتخذه على الشارت.
              </p>


              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "هيكل السوق",
                    text: "تعلم HH / HL وLH / LL.",
                  },
                  {
                    no: "02",
                    title: "Trend vs Range",
                    text: "تعلم متى يوجد اتجاه ومتى لا يوجد.",
                  },
                  {
                    no: "03",
                    title: "الدخول",
                    text: "اختر Pullback أو Breakout.",
                  },
                  {
                    no: "04",
                    title: "المخاطر",
                    text: "حدد Stop وحجم الصفقة.",
                  },
                  {
                    no: "05",
                    title: "الاختبار",
                    text: "اختبر قواعدك على بيانات سابقة وديمو.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-white/10 bg-white/[0.05] p-4"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-[9px] font-black text-slate-950">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[14px] font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-400">
                      {item.text}
                    </p>

                  </article>
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
                FAQ
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أسئلة شائعة حول استراتيجية تتبع الاتجاه
              </h2>

              <p className="mt-3 max-w-5xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                إجابات سريعة على أهم الأسئلة التي يطرحها المتداولون
                حول Trend Following وتحديد الاتجاه والدخول معه.
              </p>

            </div>


            <div className="divide-y divide-slate-100">

              {faqItems.map((item, index) => (
                <div
                  key={item.q}
                  className="p-4 md:px-7 md:py-5"
                >

                  <div className="flex items-start gap-3">

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-50 text-[10px] font-black text-brand-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>

                      <h3 className="text-[15px] font-black leading-7 text-slate-950 md:text-[16px]">
                        {item.q}
                      </h3>

                      <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                        {item.a}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>


          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="p-4 md:p-7">

              <SectionLabel>
                أدلة مرتبطة
              </SectionLabel>

              <h2 className="mt-3 text-[22px] font-black leading-[1.4] text-slate-950 md:text-[30px]">
                أكمل تعلم استراتيجيات التداول
              </h2>


              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    href: "/strategies/price-action",
                    label: "Price Action",
                    title: "استراتيجية البرايس أكشن",
                    text: "تعلم قراءة حركة السعر والهيكل دون الاعتماد الكامل على المؤشرات.",
                  },
                  {
                    href: "/strategies/swing-trading",
                    label: "Swing Trading",
                    title: "استراتيجية السوينغ",
                    text: "تعرف على تداول الحركات التي تمتد من عدة أيام إلى أسابيع.",
                  },
                  {
                    href: "/strategies/rsi",
                    label: "RSI",
                    title: "استراتيجية RSI",
                    text: "استخدم مؤشر القوة النسبية لفهم الزخم والتشبع والدايفرجنس.",
                  },
                  {
                    href: "/learn-trading/stop-loss",
                    label: "Risk",
                    title: "شرح وقف الخسارة",
                    text: "تعلم كيفية تحديد نقطة إبطال الصفقة وإدارة الخسائر.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[17px] border border-slate-200 bg-slate-50/50 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/30"
                  >

                    <div
                      dir="ltr"
                      className="text-left text-[9px] font-black uppercase tracking-wide text-brand-600"
                    >
                      {item.label}
                    </div>

                    <h3 className="mt-1 text-[15px] font-black text-slate-950 transition group-hover:text-brand-600">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                    <div className="mt-3 text-[11px] font-black text-brand-600">
                      اقرأ الدليل ←
                    </div>

                  </Link>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-brand-100 bg-[linear-gradient(135deg,#eef5fd_0%,#ffffff_55%,#f8fbff_100%)] shadow-sm">

            <div className="grid gap-5 p-4 md:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

              <div>

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  BROKER ALARAB
                </div>

                <h2 className="mt-2 text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[31px]">
                  حوّل الاستراتيجية إلى خطة تداول قابلة للقياس
                </h2>

                <p className="mt-3 max-w-4xl text-[13px] leading-7 text-slate-600 md:text-[14px] md:leading-8">
                  استخدم أدوات إدارة المخاطر والحاسبات قبل تنفيذ
                  الصفقة، وقارن بين الوسطاء من حيث المنصات والتكاليف
                  وشروط التداول بما يناسب أسلوبك.
                </p>

              </div>


              <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">

                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-[13px] bg-brand-600 px-5 py-3 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-700"
                >
                  أدوات التداول
                </Link>

                <Link
                  href="/best-brokers"
                  className="inline-flex items-center justify-center rounded-[13px] border border-slate-200 bg-white px-5 py-3 text-[12px] font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-600"
                >
                  مقارنة الوسطاء
                </Link>

              </div>

            </div>


            <div className="border-t border-brand-100 bg-white/60 px-4 py-3 text-[10px] leading-5 text-slate-500 md:px-7 md:text-[11px]">
              هذا المحتوى تعليمي فقط ولا يمثل توصية أو نصيحة استثمارية.
              التداول في الأسواق المالية ينطوي على مخاطر وقد يؤدي إلى
              خسارة رأس المال.
            </div>

          </section>


        </article>

      </div>


      {/* =====================================================
          JSON-LD
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