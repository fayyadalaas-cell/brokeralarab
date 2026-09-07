import type { Metadata } from "next";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/smart-money-concepts`;
const EN_PAGE_URL = `${BASE_URL}/en/strategies/smart-money-concepts`;

const PAGE_TITLE =
  "استراتيجية الأموال الذكية SMC: شرح شامل للتداول";

const PAGE_DESCRIPTION =
  "شرح استراتيجية الأموال الذكية SMC بالعربي: هيكل السوق، BOS وCHoCH، السيولة وLiquidity Sweep، كتل الأوامر Order Blocks، فجوات القيمة العادلة FVG، وطريقة بناء صفقة SMC خطوة بخطوة.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "استراتيجية الأموال الذكية",
    "الأموال الذكية",
    "مفهوم الأموال الذكية",
    "مفاهيم الأموال الذكية",
    "استراتيجية SMC",
    "شرح SMC",
    "SMC",
    "SMC بالعربي",
    "SMC في التداول",
    "SMC في الفوركس",
    "استراتيجية SMC في الفوركس",
    "Smart Money Concepts",
    "Smart Money Concept",
    "Smart Money Trading",
    "المال الذكي في التداول",
    "المال الذكي في الفوركس",
    "السمارت موني",
    "استراتيجية السمارت موني",
    "هيكل السوق",
    "Market Structure",
    "كسر الهيكل",
    "BOS",
    "Break of Structure",
    "CHoCH",
    "Change of Character",
    "تغير هيكل السوق",
    "السيولة في التداول",
    "Liquidity",
    "Liquidity Sweep",
    "Liquidity Grab",
    "سحب السيولة",
    "اصطياد السيولة",
    "كتل الأوامر",
    "Order Block",
    "Order Blocks",
    "Bullish Order Block",
    "Bearish Order Block",
    "فجوة القيمة العادلة",
    "Fair Value Gap",
    "FVG",
    "Imbalance",
    "اختلال التوازن السعري",
    "Premium and Discount",
    "استراتيجية التداول المؤسسي",
    "Institutional Trading",
    "Price Action",
    "ICT",
    "التحليل الفني",
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: EN_PAGE_URL,
      "x-default": EN_PAGE_URL,
    },
  },

  openGraph: {
    type: "article",
    locale: "ar_SA",
    url: PAGE_URL,
    siteName: "Broker Alarab",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqItems = [
  {
    question: "ما هي استراتيجية الأموال الذكية SMC؟",
    answer:
      "استراتيجية الأموال الذكية SMC هي إطار لتحليل حركة السعر يعتمد على قراءة هيكل السوق والسيولة وكسر الهيكل BOS وتغير السلوك CHoCH وكتل الأوامر Order Blocks وفجوات القيمة العادلة FVG. الهدف هو بناء سيناريو تداول منظم بدل الاعتماد على مؤشر واحد أو إشارة منفردة.",
  },
  {
    question: "ما معنى SMC في التداول؟",
    answer:
      "SMC اختصار لـ Smart Money Concepts أي مفاهيم الأموال الذكية. يستخدم المتداولون هذا المصطلح لوصف مجموعة من مفاهيم حركة السعر التي تحاول تفسير بنية السوق ومناطق السيولة والاختلالات السعرية ومناطق الاهتمام المحتملة.",
  },
  {
    question: "ما الفرق بين BOS وCHoCH؟",
    answer:
      "BOS أو Break of Structure يشير عادة إلى كسر هيكلي في اتجاه الحركة المسيطرة وقد يستخدم لتأكيد استمرارها، بينما CHoCH أو Change of Character يشير إلى تغير مبكر في سلوك الهيكل وقد يكون تنبيهًا لاحتمال تغير الاتجاه. كلاهما يحتاج إلى قراءة السياق وليس مجرد كسر مستوى منفرد.",
  },
  {
    question: "ما هي السيولة في استراتيجية SMC؟",
    answer:
      "يقصد بالسيولة في تحليل SMC المناطق التي قد تتجمع حولها أوامر معلقة أو أوامر وقف، مثل أعلى القمم وأسفل القيعان والقمم أو القيعان المتساوية. يراقب متداولو SMC كيفية تفاعل السعر مع هذه المناطق قبل البحث عن فرصة تداول.",
  },
  {
    question: "ما هو Order Block؟",
    answer:
      "كتلة الأوامر أو Order Block هي منطقة سعرية يحددها متداولو SMC عادة حول آخر حركة معاكسة قبل اندفاع سعري واضح. لا تعني المنطقة بالضرورة وجود أوامر مؤسسية مؤكدة، ولذلك يجب استخدامها مع هيكل السوق والسيولة والتأكيد السعري.",
  },
  {
    question: "ما هي فجوة القيمة العادلة FVG؟",
    answer:
      "فجوة القيمة العادلة Fair Value Gap هي نوع من الاختلال السعري يظهر عندما يتحرك السعر بسرعة بحيث يكون هناك فصل بين نطاقات ثلاث شموع متتالية. يراقب بعض متداولي SMC عودة السعر إلى هذه المنطقة بحثًا عن تفاعل أو استمرار للحركة.",
  },
  {
    question: "هل SMC هي نفسها ICT؟",
    answer:
      "هناك تداخل كبير بين المصطلحات المستخدمة في SMC ومنهج ICT، مثل السيولة وOrder Blocks وFair Value Gaps وهيكل السوق، لكن من الأفضل عدم اعتبار المصطلحين متطابقين تمامًا. ICT منهج مسمى وله مجموعة أوسع من النماذج والمفاهيم الخاصة به.",
  },
  {
    question: "هل استراتيجية SMC مناسبة للمبتدئين؟",
    answer:
      "يمكن للمبتدئ تعلم SMC، لكن الأفضل البدء أولًا بفهم الاتجاه والقمم والقيعان وهيكل السوق، ثم BOS وCHoCH، وبعدها السيولة وOrder Blocks وFVG. محاولة تعلم جميع المصطلحات في وقت واحد تجعل الرسم البياني معقدًا بلا داعٍ.",
  },
];

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#1E5BB8] sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2B6FD0]" />
      {children}
    </div>
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
    <div className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
      <div className="mb-2 text-sm font-black text-[#184A97]">
        {title}
      </div>
      <div className="text-[13px] font-medium leading-7 text-slate-700 sm:text-sm sm:leading-8">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HERO — DESKTOP
========================================================= */

function SmartMoneyHeroDesktopChart() {
  return (
    <div className="relative h-full min-h-[410px] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/70 p-6 xl:p-8">
      <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>

          <div className="rounded-md border border-slate-200 bg-white px-3 py-1 text-[9px] font-black tracking-[0.16em] text-slate-500">
            SMC • MARKET MAP
          </div>

          <div className="text-[9px] font-bold text-slate-400">
            EUR/USD
          </div>
        </div>

        <div className="relative flex-1">
          <svg
            viewBox="0 0 720 390"
            className="h-full w-full"
            role="img"
            aria-label="رسم تعليمي يوضح هيكل السوق والسيولة وكتلة الأوامر وفجوة القيمة العادلة في استراتيجية SMC"
          >
            <defs>
              <linearGradient id="heroSmcArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2B6FD0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2B6FD0" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="heroObFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.45" />
              </linearGradient>

              <pattern
                id="heroGrid"
                width="48"
                height="42"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 42"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="720" height="390" fill="#ffffff" />
            <rect width="720" height="390" fill="url(#heroGrid)" />

            {/* Buy-side liquidity */}
            <line
              x1="470"
              y1="82"
              x2="665"
              y2="82"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="7 7"
            />
            <circle cx="520" cy="82" r="4" fill="#64748b" />
            <circle cx="574" cy="82" r="4" fill="#64748b" />
            <circle cx="628" cy="82" r="4" fill="#64748b" />

            <rect
              x="487"
              y="48"
              width="154"
              height="24"
              rx="12"
              fill="#f8fafc"
              stroke="#cbd5e1"
            />
            <text
              x="564"
              y="64"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fill="#475569"
            >
              BUY-SIDE LIQUIDITY
            </text>

            {/* Order block */}
            <rect
              x="285"
              y="252"
              width="155"
              height="57"
              rx="10"
              fill="url(#heroObFill)"
              stroke="#60a5fa"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <text
              x="362"
              y="274"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#1E5BB8"
            >
              BULLISH ORDER BLOCK
            </text>
            <text
              x="362"
              y="292"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#64748b"
            >
              AREA OF INTEREST
            </text>

            {/* FVG */}
            <rect
              x="435"
              y="176"
              width="102"
              height="43"
              rx="8"
              fill="#eff6ff"
              stroke="#93c5fd"
              strokeWidth="1.5"
            />
            <text
              x="486"
              y="202"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#2563eb"
            >
              FVG
            </text>

            {/* Price area */}
            <path
              d="M50 319
                 L92 292
                 L130 306
                 L174 260
                 L215 277
                 L262 222
                 L307 247
                 L350 195
                 L395 215
                 L442 155
                 L486 177
                 L530 120
                 L573 141
                 L620 80
                 L668 105
                 L668 350
                 L50 350 Z"
              fill="url(#heroSmcArea)"
            />

            {/* Price path */}
            <path
              d="M50 319
                 L92 292
                 L130 306
                 L174 260
                 L215 277
                 L262 222
                 L307 247
                 L350 195
                 L395 215
                 L442 155
                 L486 177
                 L530 120
                 L573 141
                 L620 80
                 L668 105"
              fill="none"
              stroke="#1E5BB8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Swing labels */}
            <g fontSize="10" fontWeight="900" fill="#0f172a">
              <text x="167" y="244">HH</text>
              <text x="205" y="296">HL</text>
              <text x="343" y="178">HH</text>
              <text x="388" y="235">HL</text>
              <text x="523" y="103">HH</text>
            </g>

            {/* BOS */}
            <line
              x1="344"
              y1="195"
              x2="470"
              y2="195"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <rect
              x="388"
              y="158"
              width="53"
              height="24"
              rx="12"
              fill="#2563eb"
            />
            <text
              x="414.5"
              y="174"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#ffffff"
            >
              BOS
            </text>

            {/* Sweep */}
            <path
              d="M620 80 L634 55 L646 88"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="642"
              y="43"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#0f172a"
            >
              SWEEP
            </text>

            {/* Flow labels */}
            <g>
              <rect
                x="54"
                y="26"
                width="94"
                height="27"
                rx="13.5"
                fill="#eff6ff"
                stroke="#bfdbfe"
              />
              <text
                x="101"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#1E5BB8"
              >
                STRUCTURE
              </text>

              <rect
                x="157"
                y="26"
                width="88"
                height="27"
                rx="13.5"
                fill="#f8fafc"
                stroke="#cbd5e1"
              />
              <text
                x="201"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#475569"
              >
                LIQUIDITY
              </text>

              <rect
                x="254"
                y="26"
                width="84"
                height="27"
                rx="13.5"
                fill="#f8fafc"
                stroke="#cbd5e1"
              />
              <text
                x="296"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#475569"
              >
                POI
              </text>
            </g>
          </svg>

          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            {[
              ["01", "هيكل السوق"],
              ["02", "السيولة"],
              ["03", "منطقة الدخول"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-center shadow-sm backdrop-blur"
              >
                <div className="text-[9px] font-black text-[#2B6FD0]">
                  {number}
                </div>
                <div
                  dir="rtl"
                  className="mt-0.5 text-[10px] font-black text-slate-700"
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO — MOBILE
========================================================= */

function SmartMoneyHeroMobileChart() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="text-[9px] font-black tracking-wider text-slate-400">
          SMC MARKET MAP
        </span>
        <span className="rounded-md bg-blue-50 px-2 py-1 text-[8px] font-black text-[#1E5BB8]">
          EDUCATIONAL
        </span>
      </div>

      <svg
        viewBox="0 0 680 300"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم مبسط لمفاهيم الأموال الذكية SMC"
      >
        <defs>
          <pattern
            id="mobileSmcGrid"
            width="46"
            height="38"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M46 0 L0 0 0 38"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="680" height="300" fill="#fff" />
        <rect width="680" height="300" fill="url(#mobileSmcGrid)" />

        <rect
          x="255"
          y="205"
          width="148"
          height="44"
          rx="9"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeDasharray="5 5"
        />
        <text
          x="329"
          y="232"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1E5BB8"
        >
          ORDER BLOCK
        </text>

        <rect
          x="414"
          y="134"
          width="86"
          height="37"
          rx="7"
          fill="#eff6ff"
          stroke="#93c5fd"
        />
        <text
          x="457"
          y="157"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#2563eb"
        >
          FVG
        </text>

        <line
          x1="476"
          y1="64"
          x2="626"
          y2="64"
          stroke="#64748b"
          strokeDasharray="6 6"
        />
        <text
          x="550"
          y="48"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#475569"
        >
          LIQUIDITY
        </text>

        <path
          d="M44 250 L100 222 L145 237 L205 190 L250 207 L310 156 L358 177 L419 120 L468 142 L528 88 L577 108 L625 58"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g fontSize="10" fontWeight="900" fill="#0f172a">
          <text x="194" y="174">HH</text>
          <text x="240" y="225">HL</text>
          <text x="408" y="103">HH</text>
          <text x="458" y="160">HL</text>
        </g>

        <rect x="338" y="113" width="51" height="23" rx="11.5" fill="#2563eb" />
        <text
          x="363.5"
          y="129"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#fff"
        >
          BOS
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   CHART 01 — MARKET STRUCTURE + BOS / CHoCH
========================================================= */

function MarketStructureSMCChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[820px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <div className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SMC • MARKET STRUCTURE
        </div>
        <div
          dir="rtl"
          className="text-[11px] font-black text-slate-600"
        >
          BOS مقابل CHoCH
        </div>
      </div>

      <svg
        viewBox="0 0 1000 470"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم تعليمي يشرح هيكل السوق وكسر الهيكل BOS وتغير السلوك CHoCH"
      >
        <defs>
          <pattern
            id="structureGrid"
            width="50"
            height="47"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 47"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1000" height="470" fill="#ffffff" />
        <rect width="1000" height="470" fill="url(#structureGrid)" />

        <line
          x1="500"
          y1="35"
          x2="500"
          y2="425"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="7 7"
        />

        {/* LEFT — BOS */}
        <text
          x="250"
          y="45"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#0f172a"
        >
          BOS — استمرار الهيكل
        </text>

        <path
          d="M65 360
             L120 305
             L175 330
             L235 255
             L290 290
             L350 205
             L405 240
             L462 145"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g fontSize="12" fontWeight="900" fill="#0f172a">
          <text x="105" y="288">HH</text>
          <text x="164" y="352">HL</text>
          <text x="220" y="238">HH</text>
          <text x="278" y="313">HL</text>
          <text x="337" y="188">HH</text>
          <text x="393" y="264">HL</text>
        </g>

        <line
          x1="340"
          y1="205"
          x2="456"
          y2="205"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <rect x="390" y="166" width="57" height="28" rx="14" fill="#2563eb" />
        <text
          x="418.5"
          y="185"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#fff"
        >
          BOS
        </text>

        <text
          x="250"
          y="408"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          Higher Highs + Higher Lows
        </text>

        {/* RIGHT — CHoCH */}
        <text
          x="750"
          y="45"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#0f172a"
        >
          CHoCH — تغير محتمل في السلوك
        </text>

        <path
          d="M540 115
             L595 165
             L650 138
             L708 210
             L762 180
             L817 255
             L868 225
             L918 318"
          fill="none"
          stroke="#475569"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g fontSize="12" fontWeight="900" fill="#0f172a">
          <text x="585" y="188">LL</text>
          <text x="638" y="122">LH</text>
          <text x="697" y="233">LL</text>
          <text x="750" y="164">LH</text>
        </g>

        <line
          x1="702"
          y1="210"
          x2="880"
          y2="210"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <circle cx="868" cy="225" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />

        <rect x="823" y="174" width="72" height="28" rx="14" fill="#0f172a" />
        <text
          x="859"
          y="193"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          CHoCH
        </text>

        <path
          d="M868 225 L908 184 L947 205"
          fill="none"
          stroke="#2B6FD0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="750"
          y="408"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          كسر معاكس للهيكل المسيطر يحتاج إلى تأكيد
        </text>
      </svg>

      <div className="grid grid-cols-2 border-t border-slate-200">
        <div className="border-l border-slate-200 p-4 text-center">
          <div className="text-[10px] font-black text-[#2B6FD0]">
            BOS
          </div>
          <div
            dir="rtl"
            className="mt-1 text-[11px] font-bold text-slate-600"
          >
            يستخدم غالبًا لتأكيد استمرار البنية
          </div>
        </div>

        <div className="p-4 text-center">
          <div className="text-[10px] font-black text-slate-900">
            CHoCH
          </div>
          <div
            dir="rtl"
            className="mt-1 text-[11px] font-bold text-slate-600"
          >
            إنذار مبكر وليس تأكيدًا تلقائيًا للانعكاس
          </div>
        </div>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="smc-structure-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#market-structure"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          إغلاق ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">{chart}</div>

      <div className="lg:hidden">
        <a
  href="#smc-structure-fullscreen"
  className="smc-centered-scroll block overflow-x-auto rounded-[22px]"
>
  {chart}
</a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل — اضغط للتكبير</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHART 02 — LIQUIDITY SWEEP
========================================================= */

function LiquiditySweepChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[820px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SMC • LIQUIDITY MAP
        </span>
        <span
          dir="rtl"
          className="text-[11px] font-black text-slate-600"
        >
          مثال تعليمي على Liquidity Sweep
        </span>
      </div>

      <svg
        viewBox="0 0 1000 470"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم يوضح تجمع السيولة أعلى القمم المتساوية ثم سحب السيولة وعودة السعر"
      >
        <defs>
          <pattern
            id="liquidityGrid"
            width="50"
            height="47"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 47"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>

          <linearGradient id="liquidityZone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <rect width="1000" height="470" fill="#ffffff" />
        <rect width="1000" height="470" fill="url(#liquidityGrid)" />

        <rect
          x="445"
          y="83"
          width="420"
          height="65"
          rx="12"
          fill="url(#liquidityZone)"
        />

        <line
          x1="410"
          y1="132"
          x2="895"
          y2="132"
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="8 7"
        />

        <text
          x="645"
          y="108"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#334155"
        >
          BUY-SIDE LIQUIDITY
        </text>

        <text
          x="645"
          y="126"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          سيولة محتملة أعلى القمم المتقاربة
        </text>

        {/* equal highs */}
        <path
          d="M95 355
             L160 292
             L220 320
             L292 245
             L354 287
             L425 190
             L485 252
             L552 134
             L610 247
             L680 132
             L738 235
             L806 128
             L840 72
             L875 158
             L925 245"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g>
          <circle cx="552" cy="134" r="6" fill="#fff" stroke="#475569" strokeWidth="2.5" />
          <circle cx="680" cy="132" r="6" fill="#fff" stroke="#475569" strokeWidth="2.5" />
          <circle cx="806" cy="128" r="6" fill="#fff" stroke="#475569" strokeWidth="2.5" />
        </g>

        <text
          x="680"
          y="165"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#475569"
        >
          EQUAL HIGHS
        </text>

        {/* sweep */}
        <line
          x1="840"
          y1="72"
          x2="840"
          y2="128"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <circle cx="840" cy="72" r="8" fill="#fff" stroke="#ef4444" strokeWidth="3" />

        <rect
          x="790"
          y="32"
          width="102"
          height="29"
          rx="14.5"
          fill="#0f172a"
        />
        <text
          x="841"
          y="51"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          LIQUIDITY SWEEP
        </text>

        <path
          d="M848 92 L876 115"
          stroke="#0f172a"
          strokeWidth="1.8"
          markerEnd="url(#none)"
        />

        {/* explanation cards */}
        <g>
          <rect
            x="96"
            y="55"
            width="225"
            height="73"
            rx="14"
            fill="#f8fafc"
            stroke="#cbd5e1"
          />
          <text
            x="208"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#0f172a"
          >
            1 — IDENTIFY LIQUIDITY
          </text>
          <text
            x="208"
            y="104"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            قمم متساوية أو قمة واضحة
          </text>

          <rect
            x="96"
            y="150"
            width="225"
            height="73"
            rx="14"
            fill="#eff6ff"
            stroke="#bfdbfe"
          />
          <text
            x="208"
            y="177"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#1E5BB8"
          >
            2 — WAIT FOR THE SWEEP
          </text>
          <text
            x="208"
            y="199"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            لا تدخل قبل رؤية التفاعل
          </text>

          <rect
            x="96"
            y="245"
            width="225"
            height="73"
            rx="14"
            fill="#f8fafc"
            stroke="#cbd5e1"
          />
          <text
            x="208"
            y="272"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#0f172a"
          >
            3 — SEEK CONFIRMATION
          </text>
          <text
            x="208"
            y="294"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            CHoCH / displacement / POI
          </text>
        </g>

        <text
          x="680"
          y="407"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          اختراق مستوى السيولة وحده لا يعني أن السعر سينعكس
        </text>
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="liquidity-sweep-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#liquidity"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          إغلاق ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">{chart}</div>

      <div className="lg:hidden">
        <a
          href="#liquidity-sweep-fullscreen"
          className="smc-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل — اضغط للتكبير</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHART 03 — ORDER BLOCK
========================================================= */

function OrderBlockSMCChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[820px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SMC • ORDER BLOCK
        </span>
        <span
          dir="rtl"
          className="text-[11px] font-black text-slate-600"
        >
          منطقة اهتمام وليست إشارة دخول منفردة
        </span>
      </div>

      <svg
        viewBox="0 0 1000 470"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم يشرح Bullish Order Block والاندفاع وعودة السعر إلى المنطقة"
      >
        <defs>
          <pattern
            id="obGrid"
            width="50"
            height="47"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 47"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1000" height="470" fill="#fff" />
        <rect width="1000" height="470" fill="url(#obGrid)" />

        {/* OB zone */}
        <rect
          x="228"
          y="292"
          width="520"
          height="72"
          rx="12"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="7 6"
        />

        <text
          x="490"
          y="322"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#1E5BB8"
        >
          BULLISH ORDER BLOCK
        </text>
        <text
          x="490"
          y="344"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          منطقة يراقبها المتداول عند عودة السعر
        </text>

        {/* price before impulse */}
        <path
          d="M80 335
             L135 310
             L190 340
             L245 300
             L290 329
             L330 305"
          fill="none"
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* displacement */}
        <path
          d="M330 305
             L385 250
             L435 205
             L485 150
             L535 105"
          fill="none"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect x="391" y="170" width="118" height="29" rx="14.5" fill="#2563eb" />
        <text
          x="450"
          y="189"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          DISPLACEMENT
        </text>

        {/* BOS line */}
        <line
          x1="280"
          y1="252"
          x2="570"
          y2="252"
          stroke="#64748b"
          strokeWidth="1.8"
          strokeDasharray="7 6"
        />

        <rect x="512" y="217" width="54" height="26" rx="13" fill="#0f172a" />
        <text
          x="539"
          y="235"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          BOS
        </text>

        {/* retracement */}
        <path
          d="M535 105
             L595 137
             L645 170
             L690 222
             L722 300
             L755 323
             L800 285
             L850 225
             L905 175"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="755"
          cy="323"
          r="9"
          fill="#fff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <rect x="714" y="374" width="86" height="29" rx="14.5" fill="#0f172a" />
        <text
          x="757"
          y="393"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          REACTION
        </text>

        <line
          x1="757"
          y1="365"
          x2="757"
          y2="337"
          stroke="#0f172a"
          strokeWidth="1.5"
        />

        {/* labels */}
        <g>
          <rect
            x="74"
            y="55"
            width="208"
            height="74"
            rx="14"
            fill="#f8fafc"
            stroke="#cbd5e1"
          />
          <text
            x="178"
            y="83"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#0f172a"
          >
            1 — STRONG MOVE
          </text>
          <text
            x="178"
            y="105"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            اندفاع واضح + كسر هيكلي
          </text>

          <rect
            x="74"
            y="150"
            width="208"
            height="74"
            rx="14"
            fill="#eff6ff"
            stroke="#bfdbfe"
          />
          <text
            x="178"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#1E5BB8"
          >
            2 — MARK THE POI
          </text>
          <text
            x="178"
            y="200"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            حدد المنطقة قبل الاندفاع
          </text>
        </g>
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="order-block-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#order-block"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          إغلاق ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">{chart}</div>

      <div className="lg:hidden">
        <a
          href="#order-block-fullscreen"
          className="smc-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل — اضغط للتكبير</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SmartMoneyConceptsStrategyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "ar",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    url: PAGE_URL,
    datePublished: "2026-09-06",
    dateModified: "2026-09-06",
    author: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
    },
    articleSection: "استراتيجيات التداول",
    keywords: [
      "استراتيجية الأموال الذكية",
      "مفهوم الأموال الذكية",
      "مفاهيم الأموال الذكية",
      "استراتيجية SMC",
      "شرح SMC",
      "SMC بالعربي",
      "SMC في الفوركس",
      "Smart Money Concepts",
      "هيكل السوق",
      "Market Structure",
      "BOS",
      "Break of Structure",
      "CHoCH",
      "Change of Character",
      "السيولة في التداول",
      "Liquidity Sweep",
      "كتل الأوامر",
      "Order Blocks",
      "فجوة القيمة العادلة",
      "Fair Value Gap",
      "FVG",
      "Premium and Discount",
      "Price Action",
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
        name: "استراتيجية الأموال الذكية SMC",
        item: PAGE_URL,
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

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50/40 pb-6 text-right md:pb-10"
    >
      {/* Fullscreen mobile charts */}
      <MarketStructureSMCChart fullscreen />
      <LiquiditySweepChart fullscreen />
      <OrderBlockSMCChart fullscreen />

      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">
        {/* =================================================
            BREADCRUMBS
        ================================================= */}

        <nav
          aria-label="مسار التنقل"
          className="py-4 text-[11px] font-bold text-slate-500 sm:py-5 sm:text-xs"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="/"
                className="transition hover:text-[#1E5BB8]"
              >
                الرئيسية
              </a>
            </li>

            <li className="text-slate-300">/</li>

            <li>
              <a
                href="/strategies"
                className="transition hover:text-[#1E5BB8]"
              >
                استراتيجيات التداول
              </a>
            </li>

            <li className="text-slate-300">/</li>

            <li className="text-slate-700">
              الأموال الذكية SMC
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO — DESKTOP
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.07)] lg:block">
          <div
            dir="ltr"
            className="grid min-h-[410px] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="border-r border-slate-200">
              <SmartMoneyHeroDesktopChart />
            </div>

            <div
              dir="rtl"
              className="flex flex-col justify-center bg-gradient-to-bl from-white via-white to-blue-50/40 p-9 xl:p-12"
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black text-[#1E5BB8]">
                  استراتيجية تداول
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
                  SMC
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
                  متوسط → متقدم
                </span>
              </div>

              <h1 className="max-w-[820px] text-[34px] font-black leading-[1.45] tracking-tight text-slate-950 xl:text-[42px]">
  استراتيجية الأموال الذكية SMC
  <span className="block text-[#1E5BB8]">
    شرح شامل للتداول
  </span>
</h1>

              <p className="mt-5 max-w-[850px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                دليل عربي شامل لفهم مفاهيم الأموال الذكية من الصفر: كيف تقرأ
                هيكل السوق، تفرق بين BOS وCHoCH، تحدد مناطق السيولة وعمليات
                Liquidity Sweep، وتفهم كتل الأوامر Order Blocks وفجوات القيمة
                العادلة FVG قبل تحويل هذه المفاهيم إلى خطة تداول واضحة وقابلة
                للاختبار.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Market Structure",
                  "BOS / CHoCH",
                  "Liquidity",
                  "Order Blocks",
                  "FVG",
                  "Premium / Discount",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-[10px] font-bold text-slate-500">
                <span>آخر تحديث: 6 سبتمبر 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>وقت القراءة: 22–28 دقيقة</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>دليل تعليمي شامل</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            HERO — MOBILE
        ================================================= */}

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:hidden">
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-[#1E5BB8]">
                استراتيجية تداول
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-600">
                SMC
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-600">
                متوسط → متقدم
              </span>
            </div>

            <h1 className="text-[25px] font-black leading-[1.55] tracking-tight text-slate-950 sm:text-[29px]">
              استراتيجية الأموال الذكية SMC
              <span className="mt-1 block text-[20px] text-[#1E5BB8] sm:text-[23px]">
                شرح Smart Money Concepts في التداول
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              شرح عملي لمفاهيم SMC من هيكل السوق والسيولة إلى BOS وCHoCH
              وOrder Blocks وFVG، مع رسومات تعليمية توضح كيف ترتبط هذه
              العناصر ببعضها داخل سيناريو تداول واحد.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "BOS",
                "CHoCH",
                "Liquidity",
                "Order Block",
                "FVG",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[9px] font-black text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-[9px] font-bold text-slate-400">
              <span>6 سبتمبر 2026</span>
              <span>•</span>
              <span>22–28 دقيقة</span>
            </div>

            <SmartMoneyHeroMobileChart />
          </div>
        </section>

        {/* =================================================
            ARTICLE
        ================================================= */}

        <article className="mt-6 w-full space-y-6 sm:mt-8 sm:space-y-8">
          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>مقدمة — Smart Money Concepts</SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.55] text-slate-950 sm:text-[30px]">
                ما هي استراتيجية الأموال الذكية SMC؟
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>استراتيجية الأموال الذكية SMC</strong>، أو ما يعرف
                  باسم <strong>Smart Money Concepts</strong>، هي طريقة لتنظيم
                  قراءة حركة السعر بالاعتماد على مجموعة مترابطة من المفاهيم
                  مثل <strong>هيكل السوق Market Structure</strong>،
                  و<strong>السيولة Liquidity</strong>، و
                  <strong>كسر الهيكل BOS</strong>، و
                  <strong>تغير السلوك CHoCH</strong>، و
                  <strong>كتل الأوامر Order Blocks</strong>، و
                  <strong>فجوات القيمة العادلة FVG</strong>.
                </p>

                <p>
                  الفكرة ليست البحث عن مؤشر يخبرك متى تشتري أو تبيع. متداول
                  SMC يحاول أولًا فهم ما يفعله السعر: هل السوق صاعد أم هابط؟
                  أين توجد القمم والقيعان المهمة؟ أين قد تتجمع السيولة؟ هل
                  حدث كسر هيكلي حقيقي؟ وهل عاد السعر إلى منطقة يمكن بناء
                  صفقة حولها مع نقطة إبطال واضحة؟
                </p>

                <p>
                  ولهذا السبب يمكن اعتبار SMC أقرب إلى
                  <strong> إطار لتحليل حركة السعر</strong> من كونها إشارة
                  تداول واحدة. وجود Order Block أو FVG على الرسم وحده لا
                  يصنع صفقة؛ القيمة تأتي من ربط العناصر بالسياق الصحيح.
                </p>
              </div>

              <ImportantBox title="نقطة مهمة قبل أن تبدأ">
                تعبير «الأموال الذكية» لا يعني أن الرسم البياني يكشف لنا
                بصورة مؤكدة أين اشترى بنك أو صندوق استثماري. الرسم يظهر
                حركة السعر، وليس هوية كل من نفذ الأوامر. لذلك نتعامل مع
                مفاهيم SMC كطريقة منظمة لتفسير الهيكل والسيولة والاندفاع
                السعري، ثم نختبر قواعدها بدل اعتبارها دليلًا قطعيًا على
                نشاط مؤسسة معينة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — HOW SMC WORKS
          ================================================= */}

          <section
            id="how-smc-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — الفكرة الأساسية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تعمل استراتيجية SMC؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                بدل أن تبدأ الصفقة من سؤال «هل أشتري الآن؟»، تبدأ قراءة SMC
                بسلسلة من الأسئلة. كل إجابة تضيق الاحتمالات حتى تصل إلى
                سيناريو يمكن تحديد دخوله ووقفه وهدفه.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "الهيكل",
                    text: "حدد الاتجاه والقمم والقيعان المسيطرة.",
                  },
                  {
                    n: "02",
                    title: "السيولة",
                    text: "حدد المناطق التي يراقبها السوق حول القمم والقيعان.",
                  },
                  {
                    n: "03",
                    title: "الكسر",
                    text: "راقب BOS أو تغيرًا محتملًا مثل CHoCH.",
                  },
                  {
                    n: "04",
                    title: "منطقة الاهتمام",
                    text: "ابحث عن OB أو FVG أو منطقة منطقية للعودة.",
                  },
                  {
                    n: "05",
                    title: "التنفيذ",
                    text: "حدد التأكيد والإبطال والمخاطرة والهدف.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="text-[10px] font-black text-[#2B6FD0]">
                      {item.n}
                    </div>

                    <h3 className="mt-2 text-sm font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.16em] text-blue-300">
                  SMC DECISION FLOW
                </div>

                <div
                  dir="ltr"
                  className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-black sm:text-xs"
                >
                  {[
                    "STRUCTURE",
                    "→",
                    "LIQUIDITY",
                    "→",
                    "BOS / CHoCH",
                    "→",
                    "POI",
                    "→",
                    "CONFIRMATION",
                    "→",
                    "RISK",
                  ].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={
                        item === "→"
                          ? "text-slate-500"
                          : "rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              02 — MARKET STRUCTURE
          ================================================= */}

          <section
            id="market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Market Structure</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                هيكل السوق في SMC: الأساس قبل السيولة وOrder Blocks
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                قبل التفكير في كتل الأوامر أو فجوات FVG، يجب أن تعرف
                <strong> من يسيطر على الهيكل السعري</strong>. الاتجاه الصاعد
                يتكون عادة من قمم أعلى وقيعان أعلى
                <strong> HH + HL</strong>، بينما الاتجاه الهابط يتكون من قمم
                أدنى وقيعان أدنى <strong>LH + LL</strong>. هذه القراءة هي
                المرجع الذي يعطي معنى لاحقًا لـBOS وCHoCH.
              </p>

              <div className="mt-7">
                <MarketStructureSMCChart />
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BULLISH STRUCTURE
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    هيكل صاعد
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    قمم أعلى HH وقيعان أعلى HL تعني أن المشترين ما زالوا
                    قادرين على دفع السعر إلى مستويات جديدة مع الحفاظ على
                    قيعان أعلى.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-slate-500">
                    BEARISH STRUCTURE
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    هيكل هابط
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    قمم أدنى LH وقيعان أدنى LL تشير إلى هيكل هابط ما دام
                    السعر يحافظ على تسلسل القمم والقيعان الهابطة.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-[10px] font-black text-slate-500">
                    RANGE
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    سوق جانبي
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    عندما يفشل السعر في تكوين تسلسل واضح، قد يكون داخل نطاق.
                    هنا تصبح سيولة طرفي النطاق أكثر أهمية من محاولة فرض اتجاه
                    غير موجود.
                  </p>
                </div>
              </div>

              <ImportantBox title="ابدأ دائمًا من الهيكل">
                أحد أكثر أخطاء متداولي SMC شيوعًا هو فتح الرسم والبدء فورًا
                في رسم عشرات الـOrder Blocks والـFVG. إذا لم تعرف أولًا
                الاتجاه والـSwing High والـSwing Low المهمين، ستتحول الصفحة
                إلى مجموعة مناطق بلا سياق.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — BOS
          ================================================= */}

          <section
            id="bos"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Break of Structure</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هو BOS في استراتيجية SMC؟
              </h2>

              <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                  <p>
                    <strong>BOS</strong> هو اختصار
                    <strong> Break of Structure</strong> أو
                    <strong> كسر هيكل السوق</strong>. يستخدم المصطلح عادة
                    عندما يكسر السعر Swing مهمًا في اتجاه الهيكل المسيطر.
                  </p>

                  <p>
                    في هيكل صاعد، إذا كان السوق يصنع HH وHL ثم تجاوز قمة
                    هيكلية سابقة، يمكن قراءة ذلك كـ
                    <strong>Bullish BOS</strong>. والعكس في الهيكل الهابط:
                    كسر قاع هيكلي مهم قد يدعم استمرار البنية الهابطة.
                  </p>

                  <p>
                    لكن ليس كل اختراق صغير هو BOS. أهمية القمة أو القاع،
                    والإغلاق بالنسبة للمستوى، وسياق الحركة قبل الكسر، كلها
                    عوامل يجب النظر إليها حتى لا تتحول كل شمعة إلى «كسر
                    هيكل».
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    BOS CHECKLIST
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "هل المستوى المكسور Swing مهم فعلًا؟",
                      "هل الكسر متوافق مع الهيكل المسيطر؟",
                      "هل هناك اندفاع سعري واضح بعد الكسر؟",
                      "هل حدث إغلاق مقنع أم مجرد Wick؟",
                      "أين تقع السيولة بالنسبة للكسر؟",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {index + 1}
                        </span>
                        <span className="text-[11px] font-bold leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              04 — CHoCH
          ================================================= */}

          <section
            id="choch"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Change of Character</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هو CHoCH وما الفرق بينه وبين BOS؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <strong>CHoCH</strong> اختصار لـ
                <strong> Change of Character</strong>، ويستخدم لوصف تغير
                ملحوظ في سلوك الهيكل. بينما يقرأ BOS غالبًا ككسر في اتجاه
                البنية المسيطرة، يظهر CHoCH عندما يحدث كسر مهم
                <strong> عكس تلك البنية</strong>، ولذلك يراقبه المتداول
                كإشارة مبكرة إلى أن الاتجاه الحالي ربما بدأ يفقد السيطرة.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BOS
                  </div>
                  <h3 className="mt-2 text-base font-black text-slate-900">
                    استمرار محتمل
                  </h3>
                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    السوق صاعد ويكسر قمة هيكلية للأعلى، أو هابط ويكسر قاعًا
                    هيكليًا للأسفل. القراءة الأساسية هنا هي استمرار القوة
                    في اتجاه البنية.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    CHoCH
                  </div>
                  <h3 className="mt-2 text-base font-black text-slate-900">
                    تغير محتمل
                  </h3>
                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    يحدث كسر مهم عكس البنية السابقة. هذا يخبرك أن شيئًا تغير،
                    لكنه لا يعني وحده أن اتجاهًا جديدًا أصبح مؤكدًا.
                  </p>
                </div>
              </div>

              <ImportantBox title="CHoCH ليس زر بيع أو شراء">
                ظهور CHoCH بعد اتجاه صاعد لا يعني أن عليك البيع فورًا، كما أن
                ظهوره بعد اتجاه هابط لا يعني شراءً تلقائيًا. الأفضل قراءة
                موقع الكسر بالنسبة للسيولة، ثم انتظار بنية أو تأكيد يدعم
                السيناريو الجديد.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — LIQUIDITY
          ================================================= */}

          <section
            id="liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Liquidity</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                السيولة في SMC: أين يبحث متداول الأموال الذكية؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>السيولة Liquidity</strong> من أهم مفاهيم SMC.
                  عمليًا، يهتم المتداول بالمناطق الواضحة التي قد تتمركز
                  حولها أوامر وقف أو أوامر معلقة، مثل أعلى قمة واضحة أو أسفل
                  قاع واضح أو حول القمم والقيعان المتساوية.
                </p>

                <p>
                  في لغة SMC يطلق عادة على السيولة الموجودة أعلى القمم
                  <strong> Buy-Side Liquidity (BSL)</strong>، بينما تسمى
                  السيولة أسفل القيعان
                  <strong> Sell-Side Liquidity (SSL)</strong>. هذه ليست
                  «أهدافًا مضمونة» للسعر، وإنما مناطق يضعها المتداول على
                  خريطته ويراقب ما يحدث عند وصول السعر إليها.
                </p>
              </div>

              <div className="mt-7">
                <LiquiditySweepChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Equal Highs",
                    ar: "قمم متساوية",
                    text: "منطقة واضحة قد يراقبها المتداول كسيولة أعلى السعر.",
                  },
                  {
                    title: "Equal Lows",
                    ar: "قيعان متساوية",
                    text: "قد تتجمع أسفلها أوامر وقف أو أوامر مرتبطة بالكسر.",
                  },
                  {
                    title: "Previous High",
                    ar: "قمة سابقة",
                    text: "القمة اليومية أو الأسبوعية أو Swing واضح قد تصبح مرجعًا للسيولة.",
                  },
                  {
                    title: "Previous Low",
                    ar: "قاع سابق",
                    text: "قاع واضح قد يصبح منطقة اهتمام عند اقتراب السعر منه.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="text-[10px] font-black text-[#2B6FD0]">
                      {item.title}
                    </div>
                    <h3 className="mt-1.5 text-sm font-black text-slate-900">
                      {item.ar}
                    </h3>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              06 — LIQUIDITY SWEEP
          ================================================= */}

          <section
            id="liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Liquidity Sweep</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هو سحب السيولة Liquidity Sweep؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يحدث <strong>Liquidity Sweep</strong> عندما يتجاوز السعر
                منطقة سيولة واضحة، مثل قمة سابقة أو مجموعة قمم متساوية، ثم
                يفشل في الاستمرار بالطريقة التي يتوقعها متداول الاختراق.
                في SMC يهتم المتداول بما يحدث
                <strong> بعد أخذ المستوى</strong>: هل ظهر رفض سعري؟ هل حدث
                CHoCH على فريم أصغر؟ هل ظهر اندفاع معاكس؟ وهل توجد منطقة
                اهتمام منطقية يمكن استخدامها لبناء الصفقة؟
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "حدد السيولة",
                    text: "ابحث عن قمة أو قاع واضح، Equal Highs / Equal Lows أو مستوى هيكلي مهم.",
                  },
                  {
                    n: "02",
                    title: "انتظر التفاعل",
                    text: "لا تفترض الانعكاس قبل أن يصل السعر إلى المنطقة ويظهر ما يفعله حولها.",
                  },
                  {
                    n: "03",
                    title: "ابحث عن التأكيد",
                    text: "اربط Sweep بتغير هيكل أو اندفاع أو عودة إلى POI بدل الدخول من المستوى وحده.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[11px] font-black text-[#1E5BB8]">
                      {item.n}
                    </div>

                    <h3 className="mt-4 text-base font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
                <div className="text-[11px] font-black text-amber-800">
                  Liquidity Sweep ≠ انعكاس مضمون
                </div>
                <p className="mt-2 text-[12px] font-medium leading-7 text-amber-950/70 sm:text-[13px]">
                  أحيانًا يخترق السعر القمة لأن الاتجاه قوي ويستمر في الصعود،
                  وليس لأنه يستعد للهبوط. لذلك لا تستخدم مجرد لمس أو تجاوز
                  السيولة كسبب مستقل للدخول عكس الاتجاه.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — ORDER BLOCKS
          ================================================= */}

          <section
            id="order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Order Blocks</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هي كتل الأوامر Order Blocks في استراتيجية SMC؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Order Block</strong> أو
                  <strong> كتلة الأوامر</strong> هو مصطلح يستخدمه متداولو
                  SMC لوصف منطقة سعرية سبقت حركة قوية أو اندفاعًا واضحًا.
                  في التفسير الشائع، يبحث المتداول عن آخر حركة أو شمعة
                  معاكسة قبل اندفاع أدى إلى كسر هيكلي أو حركة ذات دلالة.
                </p>

                <p>
                  لكن الخطأ هو اعتبار كل شمعة هابطة قبل صعود
                  <strong> Bullish Order Block</strong>، أو كل شمعة صاعدة
                  قبل هبوط <strong>Bearish Order Block</strong>. إذا فعلت
                  ذلك، ستجد عشرات الكتل على أي رسم. المنطقة تصبح أكثر معنى
                  عندما ترتبط بسياق واضح: هيكل، سيولة، اندفاع، وكسر مهم.
                </p>
              </div>

              <div className="mt-7">
                <OrderBlockSMCChart />
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BULLISH ORDER BLOCK
                  </div>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    كتلة أوامر صاعدة
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    منطقة سبقت اندفاعًا صاعدًا مهمًا. عند عودة السعر إليها،
                    يراقب المتداول إمكانية ظهور طلب أو تأكيد صاعد بدل الشراء
                    تلقائيًا بمجرد لمس المنطقة.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    BEARISH ORDER BLOCK
                  </div>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    كتلة أوامر هابطة
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    منطقة سبقت اندفاعًا هابطًا مهمًا. يمكن مراقبة عودة السعر
                    إليها ضمن سيناريو هابط، لكن يجب أن تبقى نقطة الإبطال
                    والمخاطرة واضحتين.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  STRONGER ORDER BLOCK CONTEXT
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["01", "Liquidity", "سبق الحركة أخذ سيولة أو تفاعل مهم."],
                    ["02", "Displacement", "خرج السعر من المنطقة بقوة واضحة."],
                    ["03", "Structure", "الحركة ساهمت في BOS أو تغير هيكلي مهم."],
                    ["04", "Return", "عاد السعر للمنطقة ضمن سياق ما زال صالحًا."],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-[9px] font-black text-blue-300">
                        {n}
                      </div>
                      <div className="mt-2 text-xs font-black">
                        {title}
                      </div>
                      <p className="mt-2 text-[10px] font-medium leading-6 text-slate-300">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="لماذا لا ندخل من Order Block مباشرة؟">
                لأن المنطقة نفسها لا تخبرك أن السعر سيحترمها هذه المرة. من
                الأفضل أن تعرف لماذا حددتها، وما الهيكل المحيط بها، وأين
                تقع السيولة، وما الذي سيجعل فكرتك غير صالحة. في الجزء التالي
                سنربط Order Block مع FVG والـDisplacement ومناطق
                Premium/Discount حتى تتحول المفاهيم إلى نموذج تداول كامل.
              </ImportantBox>
            </div>
          </section>
          {/* =================================================
              08 — FAIR VALUE GAP
          ================================================= */}

          <section
            id="fair-value-gap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Fair Value Gap</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هي فجوة القيمة العادلة FVG في استراتيجية SMC؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>فجوة القيمة العادلة Fair Value Gap</strong>، أو
                  <strong> FVG</strong>، هي منطقة اختلال سعري يحددها متداولو
                  SMC عادة باستخدام تسلسل من ثلاث شموع. تظهر عندما يتحرك
                  السعر بسرعة بحيث لا يحدث تداخل كامل بين نطاق الشمعة الأولى
                  والشمعة الثالثة.
                </p>

                <p>
                  في <strong>Bullish FVG</strong> تكون هناك مساحة بين أعلى
                  الشمعة الأولى وأدنى الشمعة الثالثة. أما في
                  <strong> Bearish FVG</strong> فتظهر المساحة بين أدنى الشمعة
                  الأولى وأعلى الشمعة الثالثة.
                </p>

                <p>
                  يستخدم متداولو الأموال الذكية هذه المنطقة كـ
                  <strong>منطقة اهتمام محتملة</strong> إذا عاد السعر إليها.
                  لكن وجود FVG لا يعني أن السعر ملزم بالعودة إليها، ولا يعني
                  أن كل فجوة ستنتج عنها صفقة ناجحة.
                </p>
              </div>

              {/* DESKTOP FVG CHART */}
              <div className="mt-7 hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:block">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
                  <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
                    SMC • FAIR VALUE GAP
                  </span>

                  <span className="text-[11px] font-black text-slate-600">
                    نموذج ثلاث شموع
                  </span>
                </div>

                <svg
                  viewBox="0 0 1000 500"
                  className="block h-auto w-full"
                  role="img"
                  aria-label="رسم تعليمي يوضح فجوة القيمة العادلة FVG الصاعدة باستخدام ثلاث شموع"
                >
                  <defs>
                    <pattern
                      id="fvgGridDesktop"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M50 0 L0 0 0 50"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1000" height="500" fill="#ffffff" />
                  <rect width="1000" height="500" fill="url(#fvgGridDesktop)" />

                  {/* Context */}
                  <path
                    d="M80 382 L150 350 L215 372 L275 330"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Candle 1 */}
                  <line
                    x1="340"
                    y1="292"
                    x2="340"
                    y2="402"
                    stroke="#475569"
                    strokeWidth="4"
                  />
                  <rect
                    x="315"
                    y="315"
                    width="50"
                    height="62"
                    rx="4"
                    fill="#64748b"
                  />

                  {/* Candle 2 displacement */}
                  <line
                    x1="500"
                    y1="132"
                    x2="500"
                    y2="352"
                    stroke="#2563eb"
                    strokeWidth="4"
                  />
                  <rect
                    x="470"
                    y="172"
                    width="60"
                    height="150"
                    rx="5"
                    fill="#2563eb"
                  />

                  {/* Candle 3 */}
                  <line
                    x1="660"
                    y1="92"
                    x2="660"
                    y2="258"
                    stroke="#1E5BB8"
                    strokeWidth="4"
                  />
                  <rect
                    x="635"
                    y="128"
                    width="50"
                    height="94"
                    rx="4"
                    fill="#60a5fa"
                  />

                  {/* FVG zone */}
                  <rect
                    x="366"
                    y="258"
                    width="268"
                    height="34"
                    rx="7"
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="7 6"
                  />

                  <text
                    x="500"
                    y="280"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    FAIR VALUE GAP — FVG
                  </text>

                  {/* Labels */}
                  <text
                    x="340"
                    y="430"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#475569"
                  >
                    CANDLE 1
                  </text>

                  <text
                    x="500"
                    y="380"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    CANDLE 2
                  </text>

                  <text
                    x="500"
                    y="399"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    DISPLACEMENT
                  </text>

                  <text
                    x="660"
                    y="280"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    CANDLE 3
                  </text>

                  {/* Explanation */}
                  <rect
                    x="755"
                    y="105"
                    width="190"
                    height="190"
                    rx="18"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                  />

                  <text
                    x="850"
                    y="140"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#0f172a"
                  >
                    BULLISH FVG
                  </text>

                  <text
                    x="850"
                    y="172"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    1 — حركة سريعة
                  </text>

                  <text
                    x="850"
                    y="200"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    2 — اختلال بين 1 و3
                  </text>

                  <text
                    x="850"
                    y="228"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    3 — نراقب العودة
                  </text>

                  <text
                    x="850"
                    y="256"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    4 — لا ندخل بلا سياق
                  </text>

                  {/* Return arrow */}
                  <path
                    d="M730 105 C745 180 715 235 670 270"
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeDasharray="6 5"
                  />

                  <polygon
                    points="663,266 675,268 668,278"
                    fill="#0f172a"
                  />

                  <text
                    x="760"
                    y="82"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#0f172a"
                  >
                    POSSIBLE RETRACEMENT
                  </text>
                </svg>
              </div>

              {/* MOBILE FVG CHART */}
              <div className="mt-7 lg:hidden">
                <a
  href="#fvg-fullscreen"
  className="smc-centered-scroll block overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
>
                  <div className="min-w-[820px]">
                    <svg
                      viewBox="0 0 1000 500"
                      className="block h-auto w-full"
                      role="img"
                      aria-label="رسم تعليمي يوضح فجوة القيمة العادلة FVG"
                    >
                      <defs>
                        <pattern
                          id="fvgGridMobile"
                          width="50"
                          height="50"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M50 0 L0 0 0 50"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>

                      <rect width="1000" height="500" fill="#ffffff" />
                      <rect width="1000" height="500" fill="url(#fvgGridMobile)" />

                      <text
                        x="500"
                        y="48"
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="900"
                        fill="#0f172a"
                      >
                        BULLISH FAIR VALUE GAP
                      </text>

                      <line
                        x1="300"
                        y1="285"
                        x2="300"
                        y2="400"
                        stroke="#475569"
                        strokeWidth="4"
                      />
                      <rect
                        x="275"
                        y="310"
                        width="50"
                        height="65"
                        rx="4"
                        fill="#64748b"
                      />

                      <line
                        x1="500"
                        y1="120"
                        x2="500"
                        y2="350"
                        stroke="#2563eb"
                        strokeWidth="4"
                      />
                      <rect
                        x="468"
                        y="165"
                        width="64"
                        height="160"
                        rx="5"
                        fill="#2563eb"
                      />

                      <line
                        x1="700"
                        y1="85"
                        x2="700"
                        y2="250"
                        stroke="#1E5BB8"
                        strokeWidth="4"
                      />
                      <rect
                        x="675"
                        y="125"
                        width="50"
                        height="95"
                        rx="4"
                        fill="#60a5fa"
                      />

                      <rect
                        x="326"
                        y="250"
                        width="348"
                        height="35"
                        rx="8"
                        fill="#dbeafe"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="500"
                        y="273"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        FVG — IMBALANCE
                      </text>

                      <text
                        x="300"
                        y="430"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#475569"
                      >
                        CANDLE 1
                      </text>

                      <text
                        x="500"
                        y="382"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#2563eb"
                      >
                        DISPLACEMENT
                      </text>

                      <text
                        x="700"
                        y="275"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        CANDLE 3
                      </text>
                    </svg>
                  </div>
                </a>

                <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
                  <span>↔</span>
                  <span>
                    حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل — اضغط للتكبير
                  </span>
                </div>
              </div>

              {/* FULLSCREEN FVG */}
              <div
                id="fvg-fullscreen"
                className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
              >
                <a
                  href="#fair-value-gap"
                  className="fixed left-4 top-4 z-[110] rounded-full bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
                >
                  إغلاق ×
                </a>

                <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
                  <div className="min-w-[900px] overflow-hidden rounded-[24px] bg-white">
                    <svg
                      viewBox="0 0 1000 500"
                      className="block h-auto w-full"
                    >
                      <rect width="1000" height="500" fill="#ffffff" />

                      <text
                        x="500"
                        y="55"
                        textAnchor="middle"
                        fontSize="18"
                        fontWeight="900"
                        fill="#0f172a"
                      >
                        FAIR VALUE GAP — FVG
                      </text>

                      <line
                        x1="300"
                        y1="285"
                        x2="300"
                        y2="400"
                        stroke="#475569"
                        strokeWidth="4"
                      />
                      <rect
                        x="275"
                        y="310"
                        width="50"
                        height="65"
                        rx="4"
                        fill="#64748b"
                      />

                      <line
                        x1="500"
                        y1="120"
                        x2="500"
                        y2="350"
                        stroke="#2563eb"
                        strokeWidth="4"
                      />
                      <rect
                        x="468"
                        y="165"
                        width="64"
                        height="160"
                        rx="5"
                        fill="#2563eb"
                      />

                      <line
                        x1="700"
                        y1="85"
                        x2="700"
                        y2="250"
                        stroke="#1E5BB8"
                        strokeWidth="4"
                      />
                      <rect
                        x="675"
                        y="125"
                        width="50"
                        height="95"
                        rx="4"
                        fill="#60a5fa"
                      />

                      <rect
                        x="326"
                        y="250"
                        width="348"
                        height="35"
                        rx="8"
                        fill="#dbeafe"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="500"
                        y="273"
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        FAIR VALUE GAP
                      </text>

                      <text
                        x="300"
                        y="430"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#475569"
                      >
                        CANDLE 1
                      </text>

                      <text
                        x="500"
                        y="382"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#2563eb"
                      >
                        DISPLACEMENT
                      </text>

                      <text
                        x="700"
                        y="275"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        CANDLE 3
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              <ImportantBox title="هل يجب أن يتم ملء كل FVG؟">
                لا. من الأخطاء الشائعة افتراض أن السعر يجب أن يعود إلى كل
                فجوة قيمة عادلة ويغلقها بالكامل. بعض الفجوات يتم اختبارها،
                وبعضها يتم تجاوزه، وبعضها قد يبقى دون عودة لفترة طويلة.
                تعامل مع FVG كمنطقة اهتمام داخل السياق، وليس كقاعدة تفرض على
                السوق العودة إليها.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — DISPLACEMENT
          ================================================= */}

          <section
            id="displacement"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Displacement</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هو الاندفاع السعري Displacement ولماذا هو مهم في SMC؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <strong>Displacement</strong> هو حركة سعرية قوية وواضحة
                تبتعد عن منطقة معينة بسرعة أكبر من الحركة السابقة. غالبًا
                تظهر على شكل شموع ذات أجسام كبيرة نسبيًا، وقد يصاحبها كسر
                لمستوى هيكلي وظهور اختلال سعري مثل FVG.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    SPEED
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    سرعة الحركة
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    ينتقل السعر بسرعة بعيدًا عن المنطقة بدل التحرك داخل نطاق
                    ضيق ومتداخل.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    STRUCTURE
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    أثر على الهيكل
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    يصبح الاندفاع أكثر أهمية إذا ساهم في كسر Swing مهم أو
                    أكد BOS أو تغيرًا في البنية.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    IMBALANCE
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    اختلال سعري
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    قد يترك الاندفاع خلفه FVG أو منطقة تداول غير متوازنة
                    يراقبها المتداول عند التصحيح.
                  </p>
                </div>
              </div>

              <ImportantBox title="الاندفاع يعطي المنطقة سياقًا">
                عندما تحدد Order Block أو FVG، اسأل: ماذا فعل السعر بعد هذه
                المنطقة؟ الحركة القوية التي كسرت هيكلًا مهمًا تعطي المنطقة
                سياقًا أقوى من منطقة خرج منها السعر بحركة ضعيفة ومتداخلة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — PREMIUM / DISCOUNT
          ================================================= */}

          <section
            id="premium-discount"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Premium & Discount</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                مناطق Premium وDiscount في استراتيجية الأموال الذكية
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يستخدم بعض متداولي SMC نطاقًا سعريًا بين
                <strong> Swing Low</strong> و<strong>Swing High</strong> مهمين،
                ثم يقسمون النطاق عند مستوى <strong>50%</strong>. النصف السفلي
                يسمى <strong>Discount</strong> والنصف العلوي يسمى
                <strong>Premium</strong>، بينما يمثل منتصف النطاق
                <strong> Equilibrium</strong>.
              </p>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-3">
                  <div className="text-[10px] font-black tracking-[0.14em] text-slate-400">
                    SMC • DEALING RANGE
                  </div>
                </div>

                <div className="smc-centered-scroll overflow-x-auto">
  <div className="min-w-[760px]">
                    <svg
                      viewBox="0 0 1000 500"
                      className="block h-auto w-full"
                      role="img"
                      aria-label="رسم يوضح مناطق Premium وDiscount وEquilibrium داخل نطاق سعري"
                    >
                      <rect width="1000" height="500" fill="#ffffff" />

                      <rect
                        x="190"
                        y="80"
                        width="620"
                        height="160"
                        fill="#f8fafc"
                      />

                      <rect
                        x="190"
                        y="240"
                        width="620"
                        height="160"
                        fill="#eff6ff"
                      />

                      <line
                        x1="190"
                        y1="240"
                        x2="810"
                        y2="240"
                        stroke="#0f172a"
                        strokeWidth="2"
                        strokeDasharray="8 7"
                      />

                      <line
                        x1="190"
                        y1="80"
                        x2="810"
                        y2="80"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      <line
                        x1="190"
                        y1="400"
                        x2="810"
                        y2="400"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      <text
                        x="500"
                        y="145"
                        textAnchor="middle"
                        fontSize="24"
                        fontWeight="900"
                        fill="#475569"
                      >
                        PREMIUM
                      </text>

                      <text
                        x="500"
                        y="178"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#64748b"
                      >
                        النصف العلوي من النطاق
                      </text>

                      <text
                        x="500"
                        y="318"
                        textAnchor="middle"
                        fontSize="24"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        DISCOUNT
                      </text>

                      <text
                        x="500"
                        y="351"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#64748b"
                      >
                        النصف السفلي من النطاق
                      </text>

                      <rect
                        x="423"
                        y="220"
                        width="154"
                        height="40"
                        rx="20"
                        fill="#0f172a"
                      />

                      <text
                        x="500"
                        y="246"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        EQUILIBRIUM 50%
                      </text>

                      <text
                        x="130"
                        y="86"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#475569"
                      >
                        SWING HIGH
                      </text>

                      <text
                        x="130"
                        y="405"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        SWING LOW
                      </text>

                      <path
                        d="M220 380
                           L290 340
                           L350 355
                           L420 300
                           L480 320
                           L550 255
                           L610 278
                           L680 205
                           L735 225
                           L790 145"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle
                        cx="350"
                        cy="355"
                        r="8"
                        fill="#fff"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <text
                        x="350"
                        y="385"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        POSSIBLE LONG POI
                      </text>

                      <circle
                        cx="735"
                        cy="225"
                        r="8"
                        fill="#fff"
                        stroke="#475569"
                        strokeWidth="3"
                      />

                      <text
                        x="735"
                        y="195"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#475569"
                      >
                        PREMIUM AREA
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500 lg:hidden">
                <span>↔</span>
                <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل</span>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    DISCOUNT
                  </div>
                  <h3 className="mt-2 text-base font-black text-slate-900">
                    البحث عن شراء بسعر أفضل
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    في سيناريو صاعد، قد يفضل المتداول البحث عن منطقة شراء
                    منطقية داخل النصف السفلي من النطاق بدل مطاردة السعر قرب
                    القمة.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-slate-500">
                    PREMIUM
                  </div>
                  <h3 className="mt-2 text-base font-black text-slate-900">
                    البحث عن بيع بسعر أفضل
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    في سيناريو هابط، قد تكون مناطق الاهتمام الموجودة في
                    النصف العلوي من النطاق أكثر منطقية من البيع بعد هبوط
                    ممتد.
                  </p>
                </div>
              </div>

              <ImportantBox title="Premium وDiscount لا يحددان الاتجاه">
                وجود السعر في Discount لا يعني الشراء تلقائيًا، ووجوده في
                Premium لا يعني البيع تلقائيًا. الاتجاه والهيكل والسيولة
                ومنطقة الاهتمام تأتي أولًا؛ تقسيم النطاق يساعد فقط على تقييم
                موقع السعر داخل السيناريو.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — HOW CONCEPTS CONNECT
          ================================================= */}

          <section
            id="smc-framework"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — ربط مفاهيم SMC</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تربط BOS والسيولة وOrder Block وFVG في استراتيجية واحدة؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                القوة الحقيقية في SMC لا تأتي من العثور على أكبر عدد من
                المصطلحات على الرسم، بل من وجود
                <strong> تسلسل منطقي</strong>. كل مفهوم يجب أن يجيب عن سؤال
                مختلف داخل خطة الصفقة.
              </p>

              <div className="mt-7 rounded-[24px] border border-slate-200 bg-slate-950 p-4 sm:p-6 lg:p-8">
  {/* DESKTOP */}
  <div
    dir="ltr"
    className="hidden items-center justify-center gap-4 lg:flex xl:gap-6"
  >
    {[
      ["01", "BIAS", "الاتجاه"],
      ["02", "LIQUIDITY", "السيولة"],
      ["03", "SWEEP", "سحب السيولة"],
      ["04", "BOS / CHoCH", "تأكيد الهيكل"],
      ["05", "OB / FVG", "منطقة العودة"],
      ["06", "EXECUTION", "الدخول والمخاطرة"],
    ].map((item, index, arr) => (
      <div
        key={item[0]}
        className="flex items-center gap-4 xl:gap-6"
      >
        <div className="flex h-[118px] w-[145px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-center xl:h-[126px] xl:w-[155px]">
          <div className="text-[10px] font-black text-blue-300">
            {item[0]}
          </div>

          <div className="mt-3 text-[12px] font-black text-white">
            {item[1]}
          </div>

          <div
            dir="rtl"
            className="mt-2 text-[11px] font-bold text-slate-400"
          >
            {item[2]}
          </div>
        </div>

        {index < arr.length - 1 && (
          <span className="text-[24px] font-black text-slate-600">
            →
          </span>
        )}
      </div>
    ))}
  </div>

  {/* MOBILE — 6 نقاط كاملة بدون قص */}
  <div
    dir="ltr"
    className="grid grid-cols-2 gap-3 lg:hidden"
  >
    {[
      ["01", "BIAS", "الاتجاه"],
      ["02", "LIQUIDITY", "السيولة"],
      ["03", "SWEEP", "سحب السيولة"],
      ["04", "BOS / CHoCH", "تأكيد الهيكل"],
      ["05", "OB / FVG", "منطقة العودة"],
      ["06", "EXECUTION", "الدخول والمخاطرة"],
    ].map((item) => (
      <div
        key={item[0]}
        className="flex min-h-[105px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center"
      >
        <div className="text-[9px] font-black text-blue-300">
          {item[0]}
        </div>

        <div className="mt-2 text-[10px] font-black text-white">
          {item[1]}
        </div>

        <div
          dir="rtl"
          className="mt-2 text-[10px] font-bold text-slate-400"
        >
          {item[2]}
        </div>
      </div>
    ))}
  </div>
</div>


              <div className="mt-7 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                <div className="text-[10px] font-black text-[#1E5BB8]">
                  مثال على منطق SMC
                </div>

                <p className="mt-3 text-[13px] font-medium leading-8 text-slate-700">
                  إذا كان الاتجاه العام صاعدًا، فقد تراقب سيولة أسفل قاع
                  قصير الأجل. بعد سحب هذه السيولة يظهر CHoCH صاعد على إطار
                  الدخول، ويتبعه Displacement يترك FVG ويخرج من Bullish
                  Order Block. عند التصحيح إلى منطقة الاهتمام، يمكن عندها
                  تقييم الدخول مع وقف واضح أسفل نقطة الإبطال وهدف باتجاه
                  السيولة المقابلة.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              12 — COMPLETE BULLISH EXAMPLE
          ================================================= */}

          <section
            id="smc-trade-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — مثال صفقة كاملة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                مثال عملي على صفقة شراء باستخدام استراتيجية SMC
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                الرسم التالي يجمع المفاهيم السابقة في سيناريو واحد. الهدف
                ليس حفظ شكل الرسم، وإنما فهم
                <strong> ترتيب القرارات</strong> الذي يسبق الدخول.
              </p>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
                  <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
                    SMC • COMPLETE LONG SETUP
                  </span>

                  <span className="text-[11px] font-black text-slate-600">
                    Liquidity → CHoCH → POI → Entry
                  </span>
                </div>

                <div className="smc-centered-scroll overflow-x-auto">
  <div className="min-w-[900px]">
                    <svg
                      viewBox="0 0 1100 560"
                      className="block h-auto w-full"
                      role="img"
                      aria-label="مثال تعليمي كامل لصفقة شراء SMC مع سحب السيولة وCHoCH وOrder Block وFVG والدخول والوقف والهدف"
                    >
                      <defs>
                        <pattern
                          id="fullSmcGrid"
                          width="55"
                          height="56"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M55 0 L0 0 0 56"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>

                      <rect width="1100" height="560" fill="#fff" />
                      <rect width="1100" height="560" fill="url(#fullSmcGrid)" />

                      {/* Sell-side liquidity */}
                      <line
                        x1="115"
                        y1="385"
                        x2="390"
                        y2="385"
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="8 7"
                      />

                      <text
                        x="250"
                        y="410"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#475569"
                      >
                        SELL-SIDE LIQUIDITY
                      </text>

                      {/* price before sweep */}
                      <path
                        d="M90 225
                           L145 275
                           L200 245
                           L255 315
                           L310 285
                           L365 382
                           L400 420"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* sweep */}
                      <circle
                        cx="400"
                        cy="420"
                        r="9"
                        fill="#fff"
                        stroke="#ef4444"
                        strokeWidth="4"
                      />

                      <rect
                        x="350"
                        y="442"
                        width="105"
                        height="28"
                        rx="14"
                        fill="#0f172a"
                      />

                      <text
                        x="402"
                        y="461"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#fff"
                      >
                        LIQUIDITY SWEEP
                      </text>

                      {/* reversal / displacement */}
                      <path
                        d="M400 420
                           L445 360
                           L490 325
                           L540 250
                           L590 195
                           L640 150"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* CHoCH */}
                      <line
                        x1="300"
                        y1="285"
                        x2="560"
                        y2="285"
                        stroke="#0f172a"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <rect
                        x="505"
                        y="248"
                        width="70"
                        height="27"
                        rx="13.5"
                        fill="#0f172a"
                      />

                      <text
                        x="540"
                        y="266"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#fff"
                      >
                        CHoCH
                      </text>

                      {/* OB */}
                      <rect
                        x="410"
                        y="348"
                        width="285"
                        height="58"
                        rx="10"
                        fill="#eff6ff"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="552"
                        y="382"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        BULLISH ORDER BLOCK
                      </text>

                      {/* FVG */}
                      <rect
                        x="505"
                        y="290"
                        width="190"
                        height="38"
                        rx="8"
                        fill="#dbeafe"
                        stroke="#2563eb"
                        strokeWidth="1.5"
                      />

                      <text
                        x="600"
                        y="315"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        FVG
                      </text>

                      {/* Retracement */}
                      <path
                        d="M640 150
                           L695 185
                           L735 225
                           L770 285
                           L790 350"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Entry */}
                      <circle
                        cx="790"
                        cy="350"
                        r="9"
                        fill="#fff"
                        stroke="#2563eb"
                        strokeWidth="4"
                      />

                      <rect
                        x="808"
                        y="330"
                        width="70"
                        height="28"
                        rx="14"
                        fill="#2563eb"
                      />

                      <text
                        x="843"
                        y="349"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#fff"
                      >
                        ENTRY
                      </text>

                      {/* Stop */}
                      <line
                        x1="730"
                        y1="430"
                        x2="880"
                        y2="430"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="900"
                        y="434"
                        fontSize="10"
                        fontWeight="900"
                        fill="#ef4444"
                      >
                        STOP
                      </text>

                      {/* continuation */}
                      <path
                        d="M790 350
                           L835 295
                           L875 245
                           L920 190
                           L970 125"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* target liquidity */}
                      <line
                        x1="850"
                        y1="115"
                        x2="1015"
                        y2="115"
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="930"
                        y="92"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#475569"
                      >
                        TARGET LIQUIDITY
                      </text>

                      {/* sequence */}
                      <g>
                        <circle cx="400" cy="420" r="17" fill="#0f172a" />
                        <text
                          x="400"
                          y="426"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="900"
                          fill="#fff"
                        >
                          1
                        </text>

                        <circle cx="540" cy="285" r="17" fill="#0f172a" />
                        <text
                          x="540"
                          y="291"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="900"
                          fill="#fff"
                        >
                          2
                        </text>

                        <circle cx="655" cy="377" r="17" fill="#0f172a" />
                        <text
                          x="655"
                          y="383"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="900"
                          fill="#fff"
                        >
                          3
                        </text>

                        <circle cx="790" cy="350" r="17" fill="#2563eb" />
                        <text
                          x="790"
                          y="356"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="900"
                          fill="#fff"
                        >
                          4
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500 lg:hidden">
                <span>↔</span>
                <span>حرّك الرسم يمينًا ويسارًا لمشاهدة الصفقة كاملة</span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "سحب السيولة",
                    text: "السعر يأخذ سيولة أسفل قاع واضح ثم يعود.",
                  },
                  {
                    n: "02",
                    title: "تغير الهيكل",
                    text: "يظهر CHoCH واندفاع صاعد يدعم سيناريو التغير.",
                  },
                  {
                    n: "03",
                    title: "منطقة الاهتمام",
                    text: "نحدد Bullish OB وFVG الناتجين عن الاندفاع.",
                  },
                  {
                    n: "04",
                    title: "التنفيذ",
                    text: "نقيم الدخول عند العودة مع وقف وإبطال واضحين.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="text-[10px] font-black text-[#2B6FD0]">
                      {item.n}
                    </div>
                    <h3 className="mt-2 text-sm font-black text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="المهم هو التسلسل وليس عدد الإشارات">
                لا تحتاج إلى وضع كل مفهوم من مفاهيم SMC على كل صفقة. المطلوب
                هو وجود منطق متماسك: سياق واضح، منطقة سيولة، تغير أو استمرار
                في الهيكل، منطقة دخول قابلة للتحديد، ثم إبطال ومخاطرة وهدف.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — BULLISH VS BEARISH
          ================================================= */}

          <section
            id="bullish-bearish-smc"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — شراء مقابل بيع</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                نموذج SMC الصاعد والهابط: ما الذي نبحث عنه؟
              </h2>

              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BULLISH SMC SETUP
                  </div>

                  <h3 className="mt-2 text-lg font-black text-slate-900">
                    سيناريو شراء
                  </h3>

                  <div className="mt-5 space-y-3">
                    {[
                      "سياق صاعد أو سبب منطقي لتوقع تغير صاعد.",
                      "وجود Sell-Side Liquidity أسفل قاع مهم.",
                      "سحب السيولة أو تفاعل واضح مع المنطقة.",
                      "CHoCH أو BOS صاعد مع Displacement.",
                      "تحديد Bullish Order Block أو FVG.",
                      "عودة السعر إلى منطقة الاهتمام.",
                      "وقف أسفل نقطة الإبطال الهيكلية.",
                      "هدف باتجاه سيولة أو قمة منطقية.",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                          {index + 1}
                        </span>

                        <span className="text-[12px] font-medium leading-7 text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    BEARISH SMC SETUP
                  </div>

                  <h3 className="mt-2 text-lg font-black text-slate-900">
                    سيناريو بيع
                  </h3>

                  <div className="mt-5 space-y-3">
                    {[
                      "سياق هابط أو سبب منطقي لتوقع تغير هابط.",
                      "وجود Buy-Side Liquidity أعلى قمة مهمة.",
                      "سحب السيولة أو رفض واضح أعلى المنطقة.",
                      "CHoCH أو BOS هابط مع Displacement.",
                      "تحديد Bearish Order Block أو FVG.",
                      "عودة السعر إلى منطقة الاهتمام.",
                      "وقف أعلى نقطة الإبطال الهيكلية.",
                      "هدف باتجاه سيولة أو قاع منطقي.",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-black text-slate-600 shadow-sm">
                          {index + 1}
                        </span>

                        <span className="text-[12px] font-medium leading-7 text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              14 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="smc-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — الأطر الزمنية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما أفضل فريم لاستراتيجية SMC؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا يوجد فريم واحد هو «الأفضل» للجميع. يمكن استخدام مفاهيم
                SMC على أطر مختلفة، لكن قراءة كل حركة صغيرة على فريم منخفض
                كـBOS أو CHoCH قد تنتج ضوضاء كبيرة. لذلك يفيد
                <strong> التحليل متعدد الأطر الزمنية</strong> في فصل السياق
                العام عن توقيت الدخول.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    tf: "1D / 4H",
                    title: "السياق العام",
                    text: "حدد الاتجاه والـSwing الرئيسي والسيولة الكبيرة.",
                  },
                  {
                    tf: "4H / 1H",
                    title: "منطقة الاهتمام",
                    text: "حدد OB أو FVG أو نطاقًا تريد مراقبته.",
                  },
                  {
                    tf: "1H / 15m",
                    title: "التأكيد",
                    text: "راقب Sweep أو تغير الهيكل عند المنطقة.",
                  },
                  {
                    tf: "15m / 5m",
                    title: "التنفيذ",
                    text: "يمكن استخدامه لتحسين الدخول إذا كان ضمن خطتك.",
                  },
                ].map((item) => (
                  <div
                    key={item.tf}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                  >
                    <div className="text-[11px] font-black text-[#2B6FD0]">
                      {item.tf}
                    </div>
                    <h3 className="mt-2 text-sm font-black text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  مثال عملي
                </div>

                <p className="mt-3 text-[13px] font-medium leading-8 text-slate-300">
                  يمكنك مثلًا استخدام <strong className="text-white">4H</strong>{" "}
                  لتحديد الاتجاه والمنطقة الرئيسية، ثم الانتقال إلى
                  <strong className="text-white"> 1H أو 15m</strong> لمراقبة
                  السيولة والـCHoCH والدخول. الفكرة ليست التنقل بين الفريمات
                  حتى تجد إشارة تناسب رأيك، بل تحديد وظيفة كل فريم مسبقًا.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              15 — STOP LOSS
          ================================================= */}

          <section
            id="smc-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — وقف الخسارة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أين يوضع وقف الخسارة في استراتيجية SMC؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يجب أن يكون وقف الخسارة مرتبطًا بـ
                <strong> نقطة إبطال السيناريو</strong>، وليس بعدد نقاط
                عشوائي. إذا كانت صفقة الشراء تعتمد على قاع محدد وسحب سيولة
                وBullish Order Block، فيجب أن تعرف المستوى الذي إذا تجاوزه
                السعر يصبح تفسيرك للصفقة غير صالح.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    STRUCTURE
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    خلف الهيكل
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    يمكن أن تكون نقطة الإبطال خلف Swing High أو Swing Low
                    الذي تعتمد عليه فكرة الصفقة.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    POI
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    خلف منطقة الاهتمام
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    في بعض النماذج يكون تجاوز Order Block أو منطقة الإبطال
                    المحددة سببًا للخروج.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    RISK
                  </div>
                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    عدّل حجم الصفقة
                  </h3>
                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    إذا كان الوقف المنطقي بعيدًا، خفّض حجم المركز بدل تحريك
                    الوقف إلى مكان غير منطقي.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/learn-trading/stop-loss"
                  className="rounded-xl bg-slate-950 px-4 py-3 text-[11px] font-black text-white transition hover:bg-slate-800"
                >
                  شرح وقف الخسارة
                </a>

                <a
                  href="/tools/risk-calculator"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[11px] font-black text-slate-700 transition hover:border-blue-200 hover:text-[#1E5BB8]"
                >
                  حاسبة المخاطرة
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              16 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="smc-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — إدارة المخاطر</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                إدارة المخاطر عند التداول باستخدام SMC
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                مهما بدا السيناريو متكاملًا، لا توجد صفقة SMC مضمونة.
                Liquidity Sweep أو Order Block أو FVG لا يلغي احتمال الخسارة.
                لذلك يجب أن تكون إدارة المخاطر جزءًا من الاستراتيجية
                <strong> قبل الضغط على زر الدخول</strong>.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
  {
    n: "01",
    title: "حدد المخاطرة",
    text: "قرر مسبقًا مقدار رأس المال الذي تقبل خسارته في الصفقة.",
  },
  {
    n: "02",
    title: "حدد الإبطال",
    text: "ضع الوقف في المكان الذي تصبح عنده فكرة الصفقة غير صالحة.",
  },
  {
    n: "03",
    title: "احسب الحجم",
    text: "احسب حجم المركز بناءً على مسافة الوقف والمخاطرة.",
  },
  {
    n: "04",
    title: "حدد الخروج",
    text: "اعرف أين ستأخذ الربح أو كيف ستدير الصفقة قبل الدخول.",
  },
].map((item) => (
  <div
    key={item.n}
    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
        {item.n}
      </div>

      <h3 className="text-sm font-black text-slate-900">
        {item.title}
      </h3>
    </div>

    <p className="mt-2 pr-12 text-[11px] font-medium leading-6 text-slate-600 sm:pr-0">
      {item.text}
    </p>
  </div>
))}
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  القاعدة الأهم
                </div>

                <h3 className="mt-2 text-lg font-black">
                  لا تجعل حجم الصفقة يحدد مكان وقف الخسارة
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-7 text-slate-300">
                  حدد أولًا مكان الإبطال الصحيح على الرسم، ثم استخدم حجم
                  مركز يتناسب معه. تضييق الوقف فقط حتى تستطيع فتح حجم أكبر
                  يغير منطق الصفقة ويزيد احتمال الخروج بسبب حركة طبيعية.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              17 — SMC VS ICT
          ================================================= */}

          <section
            id="smc-vs-ict"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — SMC مقابل ICT</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما الفرق بين استراتيجية SMC واستراتيجية ICT؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                هناك تداخل كبير بين المصطلحات التي يستخدمها مجتمع
                <strong> Smart Money Concepts</strong> والمفاهيم الموجودة
                ضمن منهج <strong>ICT</strong>. ستجد في كليهما حديثًا عن
                السيولة، Order Blocks، Fair Value Gaps، هيكل السوق ومناطق
                Premium وDiscount.
              </p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                <div className="hidden md:block">
                  <table className="w-full border-collapse text-right">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="border-b border-slate-200 p-4 text-xs font-black text-slate-900">
                          العنصر
                        </th>
                        <th className="border-b border-slate-200 p-4 text-xs font-black text-slate-900">
                          SMC
                        </th>
                        <th className="border-b border-slate-200 p-4 text-xs font-black text-slate-900">
                          ICT
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[12px] font-medium leading-7 text-slate-600">
                      {[
                        [
                          "الطبيعة",
                          "مصطلح واسع يستخدمه مجتمع التداول لمجموعة مفاهيم حركة السعر.",
                          "منهج تداول مسمى يرتبط بمحتوى ونماذج محددة.",
                        ],
                        [
                          "هيكل السوق",
                          "BOS وCHoCH والقمم والقيعان.",
                          "يستخدم هيكل السوق ضمن إطار أوسع.",
                        ],
                        [
                          "السيولة",
                          "مفهوم مركزي.",
                          "مفهوم مركزي أيضًا.",
                        ],
                        [
                          "FVG / OB",
                          "تستخدم بكثرة في SMC.",
                          "من المفاهيم المعروفة ضمن محتوى ICT.",
                        ],
                        [
                          "التطبيق",
                          "يختلف تعريفه وقواعده بين المتداولين.",
                          "يحتوي على مصطلحات ونماذج إضافية خاصة بالمنهج.",
                        ],
                      ].map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, index) => (
                            <td
                              key={cell}
                              className={`p-4 ${
                                index === 0
                                  ? "font-black text-slate-900"
                                  : ""
                              } border-b border-slate-100`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 p-4 md:hidden">
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="text-[10px] font-black text-[#1E5BB8]">
                      SMC
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      إطار واسع يستخدم مصطلحات مثل BOS وCHoCH والسيولة وOrder
                      Blocks وFVG، وقد تختلف قواعد تطبيقه بين المتداولين.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="text-[10px] font-black text-slate-600">
                      ICT
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      منهج مسمى يحتوي على العديد من المفاهيم المتداخلة مع SMC
                      إضافة إلى نماذج ومصطلحات أخرى ضمن المنهج.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/strategies/ict"
                  className="inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-[11px] font-black text-[#1E5BB8] transition hover:bg-blue-100"
                >
                  اقرأ شرح استراتيجية ICT
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              18 — COMMON MISTAKES
          ================================================= */}

          <section
            id="smc-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — الأخطاء الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                7 أخطاء شائعة عند تعلم استراتيجية الأموال الذكية SMC
              </h2>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {[
                  {
                    n: "01",
                    title: "رسم Order Block في كل مكان",
                    text: "ليس كل شمعة معاكسة قبل حركة سعرية كتلة أوامر مفيدة. ابحث عن السياق والاندفاع والأثر الهيكلي.",
                  },
                  {
                    n: "02",
                    title: "اعتبار كل Wick سحب سيولة",
                    text: "يجب أولًا أن يكون هناك مستوى سيولة واضح له معنى داخل السياق.",
                  },
                  {
                    n: "03",
                    title: "اعتبار كل كسر CHoCH",
                    text: "الكسر الصغير داخل الضوضاء لا يساوي تغيرًا مهمًا في هيكل السوق.",
                  },
                  {
                    n: "04",
                    title: "الدخول من FVG وحدها",
                    text: "FVG منطقة اهتمام محتملة وليست إشارة شراء أو بيع مستقلة.",
                  },
                  {
                    n: "05",
                    title: "تجاهل الفريم الأكبر",
                    text: "إشارة جميلة على 5 دقائق قد تكون مجرد تصحيح صغير داخل اتجاه قوي على 4 ساعات.",
                  },
                  {
                    n: "06",
                    title: "تغيير القواعد بعد الصفقة",
                    text: "إذا كنت تعيد تعريف Swing وBOS وOrder Block بعد معرفة النتيجة فلن تستطيع اختبار الاستراتيجية بموضوعية.",
                  },
                  {
                    n: "07",
                    title: "إهمال إدارة المخاطر",
                    text: "أفضل تحليل يمكن أن يفشل. المخاطرة غير المنضبطة قد تجعل سلسلة قصيرة من الخسائر مؤذية للحساب.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#2B6FD0] shadow-sm">
                        {item.n}
                      </span>

                      <div>
                        <h3 className="text-sm font-black text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              19 — PROS & CONS
          ================================================= */}

          <section
            id="smc-pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — المميزات والعيوب</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                مميزات وعيوب استراتيجية SMC
              </h2>

              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[24px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    مميزات SMC
                  </h3>

                  <div className="mt-5 space-y-3">
                    {[
                      "تضع هيكل السوق في مركز عملية التحليل.",
                      "تشجع على التفكير في موقع السيولة بدل مطاردة السعر.",
                      "توفر مناطق واضحة يمكن استخدامها لتحديد الإبطال.",
                      "يمكن دمجها مع Price Action والتحليل متعدد الفريمات.",
                      "تجبر المتداول على التفكير في السياق قبل الدخول.",
                      "يمكن تحويل المفاهيم إلى قواعد قابلة للاختبار إذا عُرّفت بدقة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-medium leading-7 text-slate-700"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2B6FD0]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    عيوب وتحديات SMC
                  </h3>

                  <div className="mt-5 space-y-3">
                    {[
                      "المصطلحات كثيرة وقد تربك المبتدئ.",
                      "تعريف BOS وCHoCH وOrder Block قد يختلف بين المتداولين.",
                      "من السهل رؤية إعدادات مثالية بعد انتهاء الحركة.",
                      "كثرة المناطق على الرسم قد تؤدي إلى تحليل مفرط.",
                      "لا يوجد مفهوم يلغي الإشارات الكاذبة أو الخسائر.",
                      "يحتاج إلى قواعد واضحة وBacktesting قبل تقييم فعاليته.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-medium leading-7 text-slate-700"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              20 — BACKTESTING
          ================================================= */}

          <section
            id="smc-backtesting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — اختبار الاستراتيجية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تختبر استراتيجية SMC بدل الاعتماد على الأمثلة المثالية؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                أحد أكبر التحديات في SMC هو
                <strong> Hindsight Bias</strong>: بعد أن يتحرك السعر يصبح من
                السهل اختيار Order Block مثالي أو القول إن Wick معين كان
                Liquidity Sweep. الحل هو كتابة قواعدك قبل رؤية النتيجة ثم
                اختبارها على عدد كافٍ من الأمثلة التاريخية.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
  {[
    ["01", "حدد السوق", "مثال: EUR/USD فقط."],
    ["02", "حدد الفريم", "مثال: 4H للسياق و15m للدخول."],
    ["03", "عرّف الإشارة", "ما تعريفك الدقيق لـSweep وCHoCH؟"],
    ["04", "سجل النتائج", "الدخول والوقف والهدف والنتيجة."],
    ["05", "راجع العينة", "لا تحكم من 5 أو 10 صفقات فقط."],
  ].map(([n, title, text]) => (
    <div
      key={n}
      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#2B6FD0] shadow-sm sm:h-auto sm:w-auto sm:bg-transparent sm:shadow-none">
          {n}
        </div>

        <h3 className="text-sm font-black text-slate-900">
          {title}
        </h3>
      </div>

      <p className="mt-2 pr-11 text-[11px] font-medium leading-6 text-slate-600 sm:pr-0">
        {text}
      </p>
    </div>
  ))}
</div>

              <ImportantBox title="حوّل المصطلحات إلى قواعد قابلة للقياس">
                بدل كتابة «أدخل عند Order Block قوي»، عرّف ما الذي يجعله قويًا:
                هل يجب أن يسبقه Liquidity Sweep؟ هل يجب أن ينتج عنه BOS؟ هل
                تحتاج FVG؟ ما الفريم؟ وأين الإبطال؟ كلما كانت القواعد أوضح،
                أصبح اختبار الاستراتيجية أكثر موضوعية.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section
            id="smc-beginners"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>للمبتدئين — خطة التعلم</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تتعلم استراتيجية SMC من الصفر؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا تحاول تعلم جميع اختصارات Smart Money Concepts في يوم
                واحد. الأفضل بناء المعرفة على مراحل؛ لأن Order Block وFVG
                لا يصبح لهما معنى حقيقي إذا لم تفهم أولًا هيكل السوق.
              </p>

              <div className="mt-7 space-y-3">
                {[
  {
    n: "01",
    title: "تعلم هيكل السوق",
    text: "ابدأ بـHH وHL وLH وLL وتحديد Swing High وSwing Low.",
  },
  {
    n: "02",
    title: "تعلم BOS وCHoCH",
    text: "افهم الفرق بين استمرار الهيكل وتغيره قبل التفكير في مناطق الدخول.",
  },
  {
    n: "03",
    title: "تعلم السيولة",
    text: "حدد القمم والقيعان الواضحة وEqual Highs وEqual Lows.",
  },
  {
    n: "04",
    title: "أضف Order Blocks وFVG",
    text: "تعلم كيف تنشأ مناطق الاهتمام من حركة ذات سياق واضح.",
  },
  {
    n: "05",
    title: "تعلم Premium وDiscount",
    text: "استخدم موقع السعر داخل النطاق كفلتر وليس كإشارة منفردة.",
  },
  {
    n: "06",
    title: "ابنِ نموذجًا واحدًا",
    text: "اختر Setup واحدًا واكتب قواعده بدل محاولة تداول كل نموذج.",
  },
  {
    n: "07",
    title: "اختبر وسجل",
    text: "راجع عشرات الأمثلة التاريخية وسجل النتائج قبل المخاطرة برأس المال.",
  },
].map((item) => (
  <div
    key={item.n}
    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:grid sm:grid-cols-[55px_190px_1fr] sm:items-center sm:gap-3"
  >
    {/* MOBILE */}
    <div className="sm:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#2B6FD0] shadow-sm">
          {item.n}
        </div>

        <h3 className="text-sm font-black text-slate-900">
          {item.title}
        </h3>
      </div>

      <p className="mt-2 pr-12 text-[11px] font-medium leading-6 text-slate-600">
        {item.text}
      </p>
    </div>

    {/* TABLET / DESKTOP */}
    <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#2B6FD0] shadow-sm sm:flex">
      {item.n}
    </div>

    <h3 className="hidden text-sm font-black text-slate-900 sm:block">
      {item.title}
    </h3>

    <p className="hidden text-[11px] font-medium leading-6 text-slate-600 sm:block">
      {item.text}
    </p>
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
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>FAQ — الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أسئلة شائعة عن استراتيجية الأموال الذكية SMC
              </h2>

              <p className="mt-4 max-w-[900px] text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                إجابات مختصرة على أكثر الأسئلة المرتبطة بمفهوم الأموال
                الذكية، BOS وCHoCH والسيولة وOrder Blocks وفجوات القيمة
                العادلة FVG.
              </p>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[12px] font-black leading-7 text-slate-900 sm:text-sm">
                          {item.question}
                        </h3>
                      </div>

                      <span className="text-lg font-bold text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-5">
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
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>أدلة مرتبطة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أكمل تعلم استراتيجيات التحليل الفني
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "ICT",
                    title: "استراتيجية ICT",
                    href: "/strategies/ict",
                    text: "تعرف على منهج ICT ومفاهيم السيولة وFVG وOrder Blocks.",
                  },
                  {
                    label: "PRICE ACTION",
                    title: "استراتيجية حركة السعر",
                    href: "/strategies/price-action",
                    text: "تعلم قراءة حركة السعر والهيكل والمستويات بدون الاعتماد على المؤشرات.",
                  },
                  {
                    label: "TREND",
                    title: "استراتيجية تتبع الاتجاه",
                    href: "/strategies/trend-following",
                    text: "تعلم تحديد الاتجاه والقمم والقيعان والدخول مع الحركة المسيطرة.",
                  },
                  {
                    label: "SWING",
                    title: "استراتيجية السوينج",
                    href: "/strategies/swing-trading",
                    text: "تعلم بناء صفقات تستهدف الحركات المتوسطة باستخدام هيكل السوق.",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div className="text-[9px] font-black tracking-[0.14em] text-[#2B6FD0]">
                      {item.label}
                    </div>

                    <h3 className="mt-2 text-sm font-black text-slate-900 transition group-hover:text-[#1E5BB8]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>

                    <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                      اقرأ الدليل ←
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FINAL SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>الخلاصة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                هل استراتيجية الأموال الذكية SMC مناسبة لك؟
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يمكن أن تكون <strong>استراتيجية SMC</strong> مفيدة
                  للمتداول الذي يريد بناء قراراته حول حركة السعر وهيكل السوق
                  بدل الاعتماد فقط على إشارات المؤشرات. لكنها تصبح معقدة
                  بسرعة إذا تم التعامل مع كل مصطلح كإشارة مستقلة.
                </p>

                <p>
                  أبسط طريقة لاستخدام مفاهيم الأموال الذكية هي العودة دائمًا
                  إلى التسلسل الأساسي:
                  <strong>
                    {" "}
                    هيكل السوق → السيولة → التفاعل أو الكسر → منطقة الاهتمام
                    → التأكيد → الإبطال → إدارة المخاطر.
                  </strong>
                </p>

                <p>
                  وإذا لم تستطع تعريف هذه العناصر قبل الدخول، فوجود عشرات
                  الـOrder Blocks والـFVG على الرسم لن يحول التحليل إلى
                  استراتيجية قابلة للقياس.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["STRUCTURE", "حدد من يسيطر على السوق."],
                  ["LIQUIDITY", "اعرف أين تقع المناطق المهمة."],
                  ["CONFIRMATION", "انتظر دليلًا يدعم السيناريو."],
                  ["RISK", "اعرف أين تكون مخطئًا قبل الدخول."],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="text-[9px] font-black text-[#2B6FD0]">
                      {title}
                    </div>

                    <p className="mt-2 text-[11px] font-bold leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[30px] border border-slate-900 bg-slate-950 text-white shadow-xl">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative">
                <div className="text-[10px] font-black tracking-[0.16em] text-blue-300">
                  الخطوة التالية
                </div>

                <h2 className="mt-3 max-w-[800px] text-[24px] font-black leading-[1.5] sm:text-[31px]">
                  حوّل تحليل SMC إلى خطة تداول قابلة للقياس
                </h2>

                <p className="mt-4 max-w-[850px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px]">
                  استخدم أدوات إدارة المخاطر والحسابات، وراجع الوسطاء
                  المتاحين، ثم اختبر قواعد استراتيجيتك على بيانات تاريخية
                  قبل المخاطرة برأس مال حقيقي.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/tools"
                    className="rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-blue-50"
                  >
                    أدوات التداول
                  </a>

                  <a
                    href="/best-brokers"
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[11px] font-black text-white transition hover:bg-white/10"
                  >
                    مقارنة الوسطاء
                  </a>
                </div>

                <div className="mt-7 border-t border-white/10 pt-5 text-[10px] font-medium leading-6 text-slate-400">
                  هذا المحتوى تعليمي فقط ولا يشكل نصيحة استثمارية أو توصية
                  بالشراء أو البيع. التداول في الأسواق المالية ينطوي على
                  مخاطر وقد يؤدي إلى خسارة رأس المال.
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>

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
      <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        function centerSmcCharts() {
          document.querySelectorAll('.smc-centered-scroll').forEach(function (el) {
            var maxScroll = el.scrollWidth - el.clientWidth;
            if (maxScroll > 0) {
              el.scrollLeft = maxScroll / 2;
            }
          });
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', centerSmcCharts);
        } else {
          centerSmcCharts();
        }

        window.addEventListener('resize', centerSmcCharts);
      })();
    `,
  }}
/>
    </main>
  );
}