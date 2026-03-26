import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

const PAGE_URL = "https://brokeralarab.com/best-brokers/gold";
const PAGE_TITLE = "أفضل منصات تداول الذهب 2026 | مقارنة شاملة";
const PAGE_DESCRIPTION =
  "اكتشف أفضل منصات تداول الذهب لعام 2026 مع مقارنة تفصيلية بين الوسطاء من حيث التراخيص، أقل إيداع، الرافعة المالية، الحسابات الإسلامية، وأهم مزايا كل وسيط للمتداول العربي.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Al Arab",
    locale: "ar_AR",
    type: "website",
    images: [
      {
        url: "https://brokeralarab.com/articles/best-gold-broker.png",
        width: 1600,
        height: 900,
        alt: "أفضل منصات تداول الذهب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["https://brokeralarab.com/articles/best-gold-broker.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "أفضل منصات تداول الذهب",
    "أفضل منصة تداول الذهب",
    "منصات تداول الذهب",
    "تداول الذهب",
    "أفضل شركات تداول الذهب",
    "وسيط تداول الذهب",
    "منصات الذهب",
    "حساب اسلامي تداول الذهب",
    "أفضل وسيط لتداول الذهب",
    "تداول الذهب للمبتدئين",
  ],
};

type Broker = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  rating: number | null;
  min_deposit: number | null;
  max_leverage: string | number | null;
  islamic_account: boolean | null;
  arabic_support?: boolean | null;
  regulation?: string | null;
  founded_year?: number | null;
  headquarters?: string | null;
  real_account_url?: string | null;
};

async function getTopGoldBrokers(): Promise<Broker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
  "id, name, slug, logo, rating, min_deposit, max_leverage, islamic_account, real_account_url, arabic_support, regulation, founded_year, headquarters"
)
    .not("rating", "is", null)
    .order("rating", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Failed to fetch brokers:", error.message);
    return [];
  }

  return (data || []) as Broker[];
}

function formatDeposit(value: number | null) {
  if (value === null || Number.isNaN(value)) return "غير محدد";
  return `$${value}`;
}

function formatLeverage(value: string | number | null) {
  if (!value) return "غير محددة";
  return `${value}`;
}

function BrokerLogo({
  logo,
  name,
  size = 56,
}: {
  logo: string | null;
  name: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-blue-100 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.08)]"
      style={{ width: size, height: size }}
    >
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={size}
          height={size}
          className="object-contain"
          style={{ width: size - 10, height: size - 10 }}
        />
      ) : (
        <span className="text-xs font-bold text-slate-500">
          {name.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const top = rank <= 3;

  return (
    <div
      className={`flex h-[70px] w-[30px] items-center justify-center rounded-[12px] text-sm font-black ${
        top ? "bg-amber-200/90 text-amber-800" : "bg-slate-100 text-slate-600"
      }`}
    >
      {rank}
    </div>
  );
}

function TopBrokerCard({
  broker,
  rank,
}: {
  broker: Broker;
  rank: number;
}) {
  return (
    <div
      className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <RankBadge rank={rank} />
          <BrokerLogo logo={broker.logo} name={broker.name} size={46} />
        </div>

        <div className="text-right">
          <h3 className="text-[22px] font-black leading-none text-slate-950">
            {broker.name}
          </h3>
          <div className="mt-2 text-sm font-semibold text-emerald-600">
            ★ {broker.rating?.toFixed(1) ?? "—"}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-right">
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <div className="text-[11px] text-slate-500">أقل إيداع</div>
          <div className="mt-1 text-xs font-bold text-slate-900">
            {formatDeposit(broker.min_deposit)}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <div className="text-[11px] text-slate-500">أعلى رافعة</div>
          <div className="mt-1 text-xs font-bold text-slate-900">
            {formatLeverage(broker.max_leverage)}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <div className="text-[11px] text-slate-500">إسلامي</div>
          <div className="mt-1 text-xs font-bold text-slate-900">
            {broker.islamic_account ? "متاح" : "غير متاح"}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/brokers/${broker.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          مراجعة الشركة
        </Link>

        <Link
  href={broker.real_account_url || `/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
>
  فتح حساب
</Link>
      </div>
    </div>
  );
}

function RankingRow({
  broker,
  rank,
}: {
  broker: Broker;
  rank: number;
}) {
  return (
    <Link
      href={`/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-5 overflow-hidden rounded-[22px] border border-blue-200 bg-white px-5 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(59,130,246,0.10)] focus:outline-none focus:ring-0 active:outline-none"
    >
      {/* right accent */}
      <div className="absolute inset-y-0 right-0 w-[4px] rounded-r-[22px] bg-blue-200" />

      {/* rank */}
      <div className="relative z-10 flex h-[60px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-blue-100 text-[15px] font-black text-blue-700 shadow-sm">
        {rank}
      </div>

      {/* logo */}
      <div className="relative z-10 shrink-0">
        <BrokerLogo logo={broker.logo} name={broker.name} size={56} />
      </div>

      {/* broker name */}
      <div className="relative z-10 min-w-[150px] text-right">
        <div className="text-[19px] font-black leading-tight text-slate-950">
          {broker.name}
        </div>
      </div>

      {/* spacer */}
      <div className="flex-1" />

      {/* info */}
      <div className="relative z-10 flex items-center gap-6 text-[13px] font-semibold text-slate-600">
        <div>
          <span className="text-slate-500">أقل إيداع:</span>{" "}
          <span className="font-black text-slate-950">
            {formatDeposit(broker.min_deposit)}
          </span>
        </div>

        <div>
          <span className="text-slate-500">الرافعة:</span>{" "}
          <span className="font-black text-slate-950">
            {formatLeverage(broker.max_leverage)}
          </span>
        </div>
      </div>

      {/* arrow */}
      <div className="relative z-10 text-blue-600 group-hover:text-blue-800">
        ‹
      </div>
    </Link>
  );
}

function MobileRankingRow({
  broker,
  rank,
}: {
  broker: any;
  rank: number;
}) {
  return (
    <Link
      href={`/brokers/${broker.slug}`}
      className="group block rounded-[24px] border border-blue-200 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.08)]"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Right side: logo + rank */}
        <div className="flex shrink-0 items-center">
  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
    <img
      src={broker.logo}
      alt={broker.name}
      className="h-9 w-9 object-contain"
    />
  </div>
</div>

        {/* Center content */}
        <div className="min-w-0 flex-1 text-right">
  <div className="truncate text-[18px] font-black text-slate-950">
    {broker.name}
  </div>

  <div className="mt-1 text-right text-[13px] font-bold text-slate-600">
  <span className="ml-1">تقييم</span>
  <span className="text-emerald-600">{broker.rating}</span>
  <span className="text-emerald-500 mr-1">★</span>
</div>
</div>

        {/* Left side: blue arrow */}
        <div className="flex shrink-0 items-center">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-100 group-hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.78 4.97a.75.75 0 010 1.06L8.81 10l3.97 3.97a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
        ✓
      </span>
      <span className="text-[15px] leading-7 text-slate-700">{children}</span>
    </li>
  );
}

const faqItems = [
  {
    q: "ما أفضل منصة لتداول الذهب؟",
    a: "أفضل منصة لتداول الذهب تختلف حسب احتياجاتك، لكن بشكل عام يجب أن تجمع بين الترخيص الجيد، التنفيذ السريع، السبريد المناسب، سهولة الإيداع والسحب، وتوفر الحساب الإسلامي إذا كنت تحتاجه.",
  },
  {
    q: "هل تداول الذهب مناسب للمبتدئين؟",
    a: "نعم، يمكن أن يكون تداول الذهب مناسبًا للمبتدئين إذا تم التعامل معه بخطة واضحة وإدارة مخاطر منضبطة، مع اختيار وسيط موثوق وشروط تداول مناسبة.",
  },
  {
    q: "كم أقل مبلغ لبدء تداول الذهب؟",
    a: "يختلف ذلك من وسيط إلى آخر، فبعض منصات تداول الذهب تسمح ببدء الحساب بمبلغ منخفض نسبيًا، بينما تطلب شركات أخرى حدًا أعلى.",
  },
  {
    q: "هل يمكن تداول الذهب بحساب إسلامي؟",
    a: "نعم، كثير من الوسطاء يوفرون حسابات إسلامية أو خيارات تداول بدون فوائد تبييت على بعض الأدوات، لكن الشروط تختلف من شركة إلى أخرى.",
  },
  {
    q: "ما الفرق بين شراء الذهب وتداول الذهب؟",
    a: "شراء الذهب يعني امتلاك الذهب الفعلي أو الاستثمار فيه كأصل حقيقي، بينما تداول الذهب عبر المنصات يكون غالبًا من خلال عقود تتيح الاستفادة من حركة السعر دون امتلاك المعدن نفسه.",
  },
  {
    q: "هل الرافعة العالية أفضل في تداول الذهب؟",
    a: "ليست دائمًا أفضل، لأن الرافعة العالية قد تزيد فرص الربح لكنها ترفع الخسارة كذلك، لذلك يجب اختيار رافعة مناسبة لحجم الحساب والخبرة.",
  },
  {
    q: "ما أفضل وقت لتداول الذهب؟",
    a: "غالبًا يزداد نشاط الذهب أثناء الجلسات التي يكون فيها السوق الأمريكي نشطًا، وعند صدور الأخبار الاقتصادية المهمة مثل بيانات التضخم والفائدة والوظائف الأمريكية.",
  },
  {
    q: "كيف أعرف أن منصة تداول الذهب موثوقة؟",
    a: "ابدأ بالنظر إلى الترخيص، ثم راقب سمعة الشركة، وضوح الشروط، سهولة التواصل مع الدعم، واستقرار المنصة عند الحركة السريعة.",
  },
];

export default async function BestGoldTradingPlatformsPage() {
  const brokers = await getTopGoldBrokers();
  const featured = brokers.slice(0, 3);
  const winner = brokers[0] || null;

  const leftColumn = brokers.slice(5, 10); // 6-10
  const rightColumn = brokers.slice(0, 5); // 1-5

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
        name: "أفضل الوسطاء",
        item: "https://brokeralarab.com/best-brokers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "أفضل منصات تداول الذهب",
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "أفضل منصات تداول الذهب في 2026",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: brokers.length,
    itemListElement: brokers.map((broker, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: broker.name,
      url: `https://brokeralarab.com/brokers/${broker.slug}`,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: "ar",
    about: [
      { "@type": "Thing", name: "تداول الذهب" },
      { "@type": "Thing", name: "منصات تداول الذهب" },
      { "@type": "Thing", name: "أفضل شركات تداول الذهب" },
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "أفضل منصات تداول الذهب",
      numberOfItems: brokers.length,
      itemListElement: brokers.map((broker, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://brokeralarab.com/brokers/${broker.slug}`,
        name: broker.name,
      })),
    },
  };

  return (
    <main className="bg-slate-50">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
/>

    {/* HERO */}
<section className="hidden md:block mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
    <div className="px-5 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-4xl text-center">
  <h1
  className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl lg:text-6xl"
  style={{ lineHeight: 1.15 }}
>
  أفضل منصات تداول الذهب في 2026
</h1>

 <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-9 text-slate-700 md:text-[18px]">
  اكتشف أفضل منصات تداول الذهب المناسبة للمتداول العربي، مع مقارنة واضحة بين
  التقييم العام، الحد الأدنى للإيداع، الرافعة المالية، التراخيص، الحسابات
  الإسلامية، وأهم مزايا كل وسيط.
</p>

<a
  href="#gold-prices"
  className="mx-auto mt-4 inline-flex max-w-fit items-center justify-center rounded-full bg-amber-100 px-5 py-2 text-[13px] font-bold text-amber-800 transition hover:bg-amber-200 md:text-[14px]"
>
  📊 أسعار الذهب من 1980 إلى 2026
</a>
</div>
    </div>

    <div className="border-t border-slate-200 px-4 py-3 md:px-8 md:py-4">
      <div className="overflow-hidden rounded-[26px] border border-slate-200 shadow-sm md:rounded-[28px]">
        <Image
          src="/articles/best-gold-broker.png"
          alt="أفضل منصات تداول الذهب في 2026"
          width={1600}
          height={900}
          priority
          className="h-[220px] w-full object-cover md:h-[320px]"
        />
      </div>
    </div>
  </div>
</section>

{/* MOBILE HERO */}
<section className="md:hidden mx-auto max-w-7xl px-3 pb-4">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
    <div className="px-5 pt-4 pb-5 text-center">
      <div className="text-[30px] font-black leading-[1.35] tracking-tight text-slate-950 sm:text-[32px]">
  أفضل منصات تداول الذهب في 2026
</div>

      <p className="mx-auto mt-4 max-w-[320px] text-[16px] leading-9 text-slate-700">
        اكتشف أفضل شركات تداول الذهب المناسبة للمتداول العربي، مع مقارنة
        واضحة بين التقييم العام، الحد الأدنى للإيداع، الرافعة المالية،
        التراخيص، الحسابات الإسلامية، وأهم مزايا كل وسيط.
      </p>
      <a
  href="#gold-prices"
  className="mx-auto mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-[12px] font-bold text-amber-800 transition hover:bg-amber-200"
>
  📊 أسعار الذهب 1980 – 2026
</a>
    </div>

    <div className="border-t border-slate-200 px-3 py-3">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 shadow-sm">
        <Image
          src="/articles/best-gold-broker.png"
          alt="أفضل منصات تداول الذهب"
          width={1600}
          height={900}
          priority
          className="h-[170px] w-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

{/* INTRO */}
<section className="hidden md:block mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="rounded-[26px] border border-slate-200 bg-white px-5 py-5 shadow-sm md:px-8 md:py-6">
    <p className="text-[15px] leading-8 text-slate-700 md:text-[17px] md:leading-9">
      إذا كنت تبحث عن أفضل منصة لتداول الذهب، فهذه الصفحة تمنحك نظرة واضحة
      وعملية على الوسطاء الأعلى تقييمًا لدى المتداولين العرب. ستجد هنا أفضل 3
      منصات نرشحها لتداول الذهب، ثم ترتيبًا مختصرًا لأفضل 10 منصات، بالإضافة
      إلى مقارنة تساعدك على تقييم التراخيص، الحد الأدنى للإيداع، الرافعة
      المالية، نوع الحسابات، والرسوم قبل اختيار وسيط تداول الذهب المناسب لك.
    </p>

    <p className="mt-4 text-[15px] leading-8 text-slate-700 md:text-[17px] md:leading-9">
      ركزنا في هذا الدليل على العوامل التي يبحث عنها أغلب المهتمين بتداول
      الذهب، مثل سهولة فتح الحساب، تنوع أدوات التداول، قوة المنصة، مستوى
      التنظيم والموثوقية، وإمكانية الحصول على حساب إسلامي عند الحاجة. لذلك إذا
      كنت تريد مقارنة سريعة ولكن مفيدة بين أفضل منصات تداول الذهب في 2026، فهذا
      القسم يمنحك بداية قوية قبل الانتقال إلى التفاصيل الكاملة لكل وسيط.
    </p>
  </div>
</section>

      {/* TOP 3 */}
{featured.length > 0 && (
  <section className="hidden md:block mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
      {/* header */}
      <div className="border-b border-slate-200 px-5 py-6 md:px-8">
        <div className="text-right" dir="rtl">
          <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
           أفضل 3 منصات تداول الذهب التي نرشحها
          </h2>

          <p className="mt-3 text-[15px] leading-8 text-slate-700 md:text-base">
            هذه هي أقوى الخيارات المعروضة حاليًا بناءً على التقييم العام، الحد
            الأدنى للإيداع، الرافعة المالية، وتوفر الحساب الإسلامي.
          </p>
        </div>
      </div>

      {/* cards */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {featured.map((broker, index) => (
            <div
              key={broker.id}
              className="group relative overflow-hidden rounded-[26px] border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-[2px] hover:border-blue-200 hover:shadow-md"
              dir="rtl"
            >
              {/* top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-blue-500 via-blue-400 to-blue-300" />

             {/* top row */}
<div className="flex items-center justify-between gap-4" dir="rtl">

  {/* right: logo */}
  <div className="shrink-0">
    <BrokerLogo
      logo={broker.logo}
      name={broker.name}
      size={56}
    />
  </div>

  {/* middle: name + rating */}
  <div className="flex-1 text-right">
    <h3 className="truncate text-[24px] font-black leading-none text-slate-950">
      {broker.name}
    </h3>

    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
      ★ {broker.rating?.toFixed(1) ?? "—"}
    </div>
  </div>

</div>

              {/* short highlight */}
              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-right">
                <p className="text-[13px] leading-7 text-slate-600">
                  خيار بارز للمتداولين الباحثين عن وسيط واضح وسهل مع شروط قوية
                  لتداول الذهب.
                </p>
              </div>

              {/* stats */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-right">
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                  <div className="text-[11px] font-semibold text-slate-500">
                    أقل إيداع
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    {formatDeposit(broker.min_deposit)}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                  <div className="text-[11px] font-semibold text-slate-500">
                    أعلى رافعة
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    {formatLeverage(broker.max_leverage)}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                  <div className="text-[11px] font-semibold text-slate-500">
                    حساب إسلامي
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    {broker.islamic_account ? "متاح" : "غير متاح"}
                  </div>
                </div>
              </div>

              {/* buttons */}
              <div className="mt-5 flex gap-3">
               <Link
  href={broker.real_account_url || `/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
>
  فتح حساب
</Link>

                <Link
                  href={`/brokers/${broker.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  مراجعة الشركة
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)}

      {/* TOP 10 */}
<section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 md:px-8 text-right">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
       أفضل 10 منصات تداول الذهب في 2026
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-500 md:text-base">
       اكتشف أفضل منصات تداول الذهب لعام 2026 وقارن بين الوسطاء من حيث أقل إيداع، أعلى رافعة مالية، التراخيص، والرسوم لاختيار أفضل وسيط تداول ذهب مناسب لك.
      </p>
      <p className="mt-2 text-sm leading-7 text-blue-600 md:text-[15px]">
  اضغط على أي شركة لعرض التقييم الكامل وفتح الحساب.
</p>
    </div>

    <div className="px-4 py-6 md:px-6">
      {brokers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
          لا توجد بيانات متاحة حاليًا.
        </div>
      ) : (
        <>
      {/* Mobile */}
<div className="space-y-3 md:hidden" dir="rtl">
  {brokers.map((broker, index) => (
    <MobileRankingRow
      key={broker.id}
      broker={broker}
      rank={index + 1}
    />
  ))}
</div>

{/* Desktop */}
<div className="hidden md:flex md:flex-row-reverse md:gap-10 md:px-2">
  {/* اليمين: 1 - 5 */}
  <div className="w-1/2 space-y-4 border-l border-slate-200 pl-5">
    {brokers.slice(0, 5).map((broker, i) => (
      <RankingRow
        key={broker.id}
        broker={broker}
        rank={i + 1}
      />
    ))}
  </div>

  {/* اليسار: 6 - 10 */}
  <div className="w-1/2 space-y-4 pr-5">
    {brokers.slice(5, 10).map((broker, i) => (
      <RankingRow
        key={broker.id}
        broker={broker}
        rank={i + 6}
      />
    ))}
  </div>
</div>
        </>
      )}
    </div>
  </div>
</section>

<section id="gold-prices" className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    {/* Header */}
    <div className="border-b border-slate-200 bg-gradient-to-r from-amber-50/70 via-white to-white px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
       أسعار الذهب من 1980 إلى 2026: جدول تاريخي شامل
      </h2>
      <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[16px]">
  استعرض أسعار الذهب من 1980 إلى 2026 في جدول تاريخي شامل يوضح تطور سعر
  الذهب عبر السنوات، مع أعلى وأدنى سعر سنوي والمتوسط بالدولار والريال
  السعودي، بالإضافة إلى تحديثات حديثة لعام 2026 لمساعدتك على تحليل الاتجاهات
  طويلة المدى في سوق الذهب.
</p>
<p className="mt-4 text-[14px] leading-7 text-slate-600 text-right md:text-[15px]">
  إذا كنت تفكر في الاستفادة من حركة الذهب، يمكنك أيضًا الاطلاع على{" "}
  <Link href="/best-brokers" className="font-bold text-blue-600 hover:text-blue-700">
    أفضل الوسطاء
  </Link>{" "}
  أو مراجعة{" "}
  <Link href="/lowest-spread-brokers" className="font-bold text-blue-600 hover:text-blue-700">
    وسطاء السبريد المنخفض
  </Link>{" "}
  لاختيار منصة مناسبة لتداول الذهب.
</p>
    </div>

    {/* Desktop */}
    <div className="hidden overflow-x-auto lg:block">
      <table className="min-w-full text-center" dir="rtl">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-4 font-black text-slate-700">السنة / الشهر</th>
            <th className="px-4 py-4 font-black text-slate-700">أعلى</th>
            <th className="px-4 py-4 font-black text-slate-700">أدنى</th>
            <th className="px-4 py-4 font-black text-slate-700">المتوسط</th>
            <th className="px-4 py-4 font-black text-slate-700">SAR</th>
            <th className="px-4 py-4 font-black text-slate-700">الاتجاه</th>
            <th className="px-4 py-4 font-black text-slate-700">الحدث</th>
          </tr>
        </thead>

        <tbody>
          {[
            { y: "يناير 2026", h: 5595.62, l: 4310.53, e: "بداية السنة", special: true },
            { y: "فبراير 2026", h: 5281.19, l: 4403.75, e: "استمرار الزخم", special: true },
            { y: "مارس 2026", h: 5418.82, l: 4099.52, e: "آخر تحديث", special: true },

            { y: 2025, h: 4537, l: 2600, e: "صعود قوي جدًا" },
            { y: 2024, h: 2790, l: 1984, e: "قمم تاريخية" },
            { y: 2023, h: 2135, l: 1804, e: "رفع الفائدة" },
            { y: 2022, h: 2070, l: 1618, e: "حرب أوكرانيا" },
            { y: 2021, h: 1959, l: 1677, e: "التضخم" },
            { y: 2020, h: 2067, l: 1451, e: "كورونا" },
            { y: 2019, h: 1557, l: 1266, e: "تباطؤ عالمي" },
            { y: 2018, h: 1369, l: 1160, e: "توترات تجارية" },
            { y: 2017, h: 1357, l: 1146, e: "صعود" },
            { y: 2016, h: 1375, l: 1060, e: "بريكست" },
            { y: 2015, h: 1307, l: 1049, e: "قاع" },
            { y: 2014, h: 1392, l: 1131, e: "ضغط الدولار" },
            { y: 2013, h: 1694, l: 1192, e: "هبوط" },
            { y: 2012, h: 1792, l: 1540, e: "تصحيح" },
            { y: 2011, h: 1921, l: 1319, e: "قمة تاريخية" },
            { y: 2010, h: 1421, l: 1058, e: "أزمة ديون" },
          ].map((r, i, arr) => {
           const avg = Math.round((r.h + r.l) / 2);
const sar = Math.round(avg * 3.75);
const prevHigh = i < arr.length - 1 ? arr[i + 1].h : null;

let trend = "—";
let color = "bg-slate-100 text-slate-600";

if (prevHigh !== null) {
  if (r.h > prevHigh) {
    trend = "⬆";
    color = "bg-emerald-50 text-emerald-700";
  } else if (r.h < prevHigh) {
    trend = "⬇";
    color = "bg-rose-50 text-rose-700";
  }
}
            return (
              <tr
                key={String(r.y)}
                className={`${
                  r.special ? "bg-blue-50 font-bold" : i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-4 py-4 font-black">{r.y}</td>
                <td className="px-4 py-4">${r.h}</td>
                <td className="px-4 py-4">${r.l}</td>
                <td className="px-4 py-4 font-bold text-amber-700">${avg}</td>
                <td className="px-4 py-4 font-bold text-blue-700">{sar} ر.س</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${color}`}>
                    {trend}
                  </span>
                </td>
                <td className="px-4 py-4">{r.e}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <details className="border-t border-slate-200 bg-white">
  <summary className="cursor-pointer list-none select-none px-6 py-5 text-center">
    <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
      عرض باقي السنوات
    </span>
  </summary>

  <div className="overflow-x-auto border-t border-slate-200">
    <table className="min-w-full text-center" dir="rtl">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-4 py-4 font-black text-slate-700">السنة / الشهر</th>
        <th className="px-4 py-4 font-black text-slate-700">أعلى</th>
        <th className="px-4 py-4 font-black text-slate-700">أدنى</th>
        <th className="px-4 py-4 font-black text-slate-700">المتوسط</th>
        <th className="px-4 py-4 font-black text-slate-700">SAR</th>
        <th className="px-4 py-4 font-black text-slate-700">الاتجاه</th>
        <th className="px-4 py-4 font-black text-slate-700">الحدث</th>
      </tr>
    </thead>

    <tbody>
            {[
              { y: 2009, h: 1226, l: 810, e: "ملاذ آمن" },
              { y: 2008, h: 1011, l: 681, e: "أزمة مالية" },
              { y: 2007, h: 841, l: 608, e: "أزمة رهن" },
              { y: 2006, h: 725, l: 524, e: "طلب استثماري" },
              { y: 2005, h: 537, l: 411, e: "صعود" },
              { y: 2004, h: 455, l: 375, e: "ضعف الدولار" },
              { y: 2003, h: 417, l: 320, e: "حرب العراق" },
              { y: 2002, h: 348, l: 278, e: "ملاذ آمن" },
              { y: 2001, h: 293, l: 256, e: "11 سبتمبر" },
              { y: 2000, h: 314, l: 264, e: "بداية صعود" },

              { y: 1999, h: 326, l: 252, e: "قاع نسبي" },
              { y: 1998, h: 314, l: 273, e: "أزمة روسيا" },
              { y: 1997, h: 367, l: 283, e: "أزمة آسيا" },
              { y: 1996, h: 416, l: 368, e: "استقرار" },
              { y: 1995, h: 396, l: 372, e: "نطاق ضيق" },
              { y: 1994, h: 398, l: 369, e: "فائدة" },
              { y: 1993, h: 406, l: 326, e: "تحسن" },
              { y: 1992, h: 360, l: 330, e: "هدوء" },
              { y: 1991, h: 403, l: 343, e: "ما بعد الحرب" },
              { y: 1990, h: 423, l: 346, e: "حرب الخليج" },

              { y: 1989, h: 417, l: 358, e: "تباطؤ" },
              { y: 1988, h: 485, l: 394, e: "استقرار" },
              { y: 1987, h: 502, l: 391, e: "انهيار الأسواق" },
              { y: 1986, h: 442, l: 326, e: "تقلب النفط" },
              { y: 1985, h: 339, l: 285, e: "ضعف الطلب" },
              { y: 1984, h: 424, l: 308, e: "قوة الدولار" },
              { y: 1983, h: 511, l: 374, e: "استقرار" },
              { y: 1982, h: 487, l: 297, e: "ركود" },
              { y: 1981, h: 614, l: 401, e: "تشديد نقدي" },
              { y: 1980, h: 850, l: 481, e: "التضخم" },
            ].map((r, i, arr) => {
              const avg = Math.round((r.h + r.l) / 2);
const sar = Math.round(avg * 3.75);

// نقارن الهاي مع السنة الأحدث مباشرة
// 2009 تقارن مع 2010، وبعدها كل سنة مع اللي فوقها في الجدول
const prevHigh = i < arr.length - 1 ? arr[i + 1].h : null;

let trend = "—";
let color = "bg-slate-100 text-slate-600";

if (prevHigh !== null) {
  if (r.h > prevHigh) {
    trend = "⬆";
    color = "bg-emerald-50 text-emerald-700";
  } else if (r.h < prevHigh) {
    trend = "⬇";
    color = "bg-rose-50 text-rose-700";
  }
}

              return (
                <tr
                  key={String(r.y)}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                >
                  <td className="px-4 py-4 font-black">{r.y}</td>
                  <td className="px-4 py-4">${r.h}</td>
                  <td className="px-4 py-4">${r.l}</td>
                  <td className="px-4 py-4 font-bold text-amber-700">${avg}</td>
                  <td className="px-4 py-4 font-bold text-blue-700">{sar} ر.س</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${color}`}>
                      {trend}
                    </span>
                  </td>
                  <td className="px-4 py-4">{r.e}</td>
                </tr>
              );
            })}
          </tbody>
                </table>
      </div>
    </details>
    </div>

    {/* Mobile */}
<div className="lg:hidden" dir="rtl">
  <div className="overflow-hidden rounded-b-[28px] border-t border-slate-200 bg-white">
    {[
      { y: "يناير 2026", h: 5595.62, l: 4310.53, e: "بداية السنة", special: true },
      { y: "فبراير 2026", h: 5281.19, l: 4403.75, e: "استمرار الزخم", special: true },
      { y: "مارس 2026", h: 5418.82, l: 4099.52, e: "آخر تحديث", special: true },

      { y: 2025, h: 4537, l: 2600, e: "صعود قوي جدًا" },
      { y: 2024, h: 2790, l: 1984, e: "قمم تاريخية" },
      { y: 2023, h: 2135, l: 1804, e: "رفع الفائدة" },
      { y: 2022, h: 2070, l: 1618, e: "حرب أوكرانيا" },
      { y: 2021, h: 1959, l: 1677, e: "التضخم" },
      { y: 2020, h: 2067, l: 1451, e: "كورونا" },
    ].map((r, i, arr) => {
      const avg = Math.round((r.h + r.l) / 2);
      const sar = Math.round(avg * 3.75);
      const prev = i > 0 ? Math.round((arr[i - 1].h + arr[i - 1].l) / 2) : null;

      let trend = "—";
      let trendText = "text-slate-400";
      let trendBg = "bg-slate-100";

      if (prev !== null) {
        if (avg > prev) {
          trend = "↑";
          trendText = "text-emerald-700";
          trendBg = "bg-emerald-50";
        } else if (avg < prev) {
          trend = "↓";
          trendText = "text-rose-700";
          trendBg = "bg-rose-50";
        }
      }

      return (
        <details
          key={String(r.y)}
          className={`group border-b border-slate-200 ${
            r.special ? "bg-blue-50/20" : "bg-white"
          }`}
        >
          <summary className="list-none cursor-pointer px-4 py-3">
  <div className="flex items-start justify-between gap-3">
    {/* Title (يمين) */}
  <div className="flex items-start justify-between gap-3">
  

  {/* Title (يمين تمامًا) */}
  <div className="min-w-0 flex-1">
    <div className="flex w-full items-center justify-end gap-2">
     

      <h3 className="truncate text-[19px] font-black leading-none text-slate-950 text-right">
        {r.y}
      </h3>
    </div>
  </div>
</div>

    {/* Toggle (يسار) */}
    <span
      className={`flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full transition duration-200 group-open:rotate-180 ${trendBg} ${trendText}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>

  {/* Mini table row */}
  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
    <div className="grid grid-cols-2">
      <div className="border-l border-slate-200 px-3 py-2 text-right">
        <div className="text-[10px] font-medium text-slate-500">المتوسط</div>
        <div className="mt-1 text-[15px] font-black text-amber-700">
          ${avg}
        </div>
      </div>

      <div className="px-3 py-2 text-right">
        <div className="text-[10px] font-medium text-slate-500">بالريال السعودي</div>
        <div className="mt-1 text-[15px] font-black text-blue-700">
          {sar} ر.س
        </div>
      </div>
    </div>
  </div>
</summary>

          {/* Expanded details */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="grid grid-cols-2 border-b border-slate-200">
                <div className="border-l border-slate-200 px-3 py-3 text-right">
                  <div className="text-[10px] font-medium text-slate-500">أعلى سعر</div>
                  <div className="mt-1 text-[14px] font-black text-slate-900">
                    ${r.h}
                  </div>
                </div>

                <div className="px-3 py-3 text-right">
                  <div className="text-[10px] font-medium text-slate-500">أدنى سعر</div>
                  <div className="mt-1 text-[14px] font-black text-slate-900">
                    ${r.l}
                  </div>
                </div>
              </div>

              <div className="px-3 py-3 text-right">
                <div className="text-[10px] font-medium text-slate-500">الحدث</div>
                <div className="mt-1 text-[13px] font-bold text-slate-800">{r.e}</div>
              </div>
            </div>
          </div>
        </details>
      );
    })}
  </div>

  {/* Remaining years */}
  <details className="bg-white" dir="rtl">
    <summary className="cursor-pointer list-none select-none border-t border-slate-200 px-4 py-4 text-center">
      <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
        عرض باقي السنوات
      </span>
    </summary>

    <div className="border-t border-slate-200 bg-white">
      {[
        { y: 2019, h: 1557, l: 1266, e: "تباطؤ عالمي" },
        { y: 2018, h: 1369, l: 1160, e: "توترات تجارية" },
        { y: 2017, h: 1357, l: 1146, e: "صعود" },
        { y: 2016, h: 1375, l: 1060, e: "بريكست" },
        { y: 2015, h: 1307, l: 1049, e: "قاع" },
        { y: 2014, h: 1392, l: 1131, e: "ضغط الدولار" },
        { y: 2013, h: 1694, l: 1192, e: "هبوط" },
        { y: 2012, h: 1792, l: 1540, e: "تصحيح" },
        { y: 2011, h: 1921, l: 1319, e: "قمة تاريخية" },
        { y: 2010, h: 1421, l: 1058, e: "أزمة ديون" },

        { y: 2009, h: 1226, l: 810, e: "ملاذ آمن" },
        { y: 2008, h: 1011, l: 681, e: "أزمة مالية" },
        { y: 2007, h: 841, l: 608, e: "أزمة رهن" },
        { y: 2006, h: 725, l: 524, e: "طلب استثماري" },
        { y: 2005, h: 537, l: 411, e: "صعود" },
        { y: 2004, h: 455, l: 375, e: "ضعف الدولار" },
        { y: 2003, h: 417, l: 320, e: "حرب العراق" },
        { y: 2002, h: 348, l: 278, e: "ملاذ آمن" },
        { y: 2001, h: 293, l: 256, e: "11 سبتمبر" },
        { y: 2000, h: 314, l: 264, e: "بداية صعود" },

        { y: 1999, h: 326, l: 252, e: "قاع نسبي" },
        { y: 1998, h: 314, l: 273, e: "أزمة روسيا" },
        { y: 1997, h: 367, l: 283, e: "أزمة آسيا" },
        { y: 1996, h: 416, l: 368, e: "استقرار" },
        { y: 1995, h: 396, l: 372, e: "نطاق ضيق" },
        { y: 1994, h: 398, l: 369, e: "فائدة" },
        { y: 1993, h: 406, l: 326, e: "تحسن" },
        { y: 1992, h: 360, l: 330, e: "هدوء" },
        { y: 1991, h: 403, l: 343, e: "ما بعد الحرب" },
        { y: 1990, h: 423, l: 346, e: "حرب الخليج" },

        { y: 1989, h: 417, l: 358, e: "تباطؤ" },
        { y: 1988, h: 485, l: 394, e: "استقرار" },
        { y: 1987, h: 502, l: 391, e: "انهيار الأسواق" },
        { y: 1986, h: 442, l: 326, e: "تقلب النفط" },
        { y: 1985, h: 339, l: 285, e: "ضعف الطلب" },
        { y: 1984, h: 424, l: 308, e: "قوة الدولار" },
        { y: 1983, h: 511, l: 374, e: "استقرار" },
        { y: 1982, h: 487, l: 297, e: "ركود" },
        { y: 1981, h: 614, l: 401, e: "تشديد نقدي" },
        { y: 1980, h: 850, l: 481, e: "التضخم" },
      ].map((r) => {
        const avg = Math.round((r.h + r.l) / 2);
        const sar = Math.round(avg * 3.75);

        return (
          <div
            key={String(r.y)}
            className="border-b border-slate-200 px-4 py-3"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between px-3 py-3">
                <div className="text-[17px] font-black text-slate-950">{r.y}</div>
              </div>

              <div className="grid grid-cols-2 border-t border-slate-200 bg-slate-50">
                <div className="border-l border-slate-200 px-3 py-2 text-right">
                  <div className="text-[10px] font-medium text-slate-500">المتوسط</div>
                  <div className="mt-1 text-[14px] font-black text-amber-700">
                    ${avg}
                  </div>
                </div>

                <div className="px-3 py-2 text-right">
                  <div className="text-[10px] font-medium text-slate-500">بالريال السعودي</div>
                  <div className="mt-1 text-[14px] font-black text-blue-700">
                    {sar} ر.س
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </details>
</div>
  </div>
</section>

{/* HOW WE CHOSE */}
<section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
       كيف اخترنا أفضل منصات تداول الذهب للمتداول العربي؟
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        اعتمدنا في ترتيب أفضل منصات تداول الذهب على مجموعة من المعايير العملية
        التي يبحث عنها المتداول العربي قبل فتح الحساب، وليس فقط على الاسم
        التجاري أو شهرة الشركة. الهدف من هذا القسم هو توضيح المنهجية التي
        اعتمدناها حتى تكون المقارنة أكثر شفافية وفائدة.
      </p>
    </div>

    {/* Desktop */}
    <div className="hidden md:block p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "الترخيص والموثوقية",
            text: "أعطينا أولوية واضحة للشركات المنظمة من جهات رقابية معروفة، لأن تراخيص الوسيط تبقى من أهم عوامل الأمان عند تداول الذهب، خصوصًا للمتداول الذي يريد السحب والإيداع براحة أكبر.",
          },
          {
            title: "شروط تداول الذهب",
            text: "راجعنا شروط تداول الذهب من حيث فروقات الأسعار، سرعة التنفيذ، طبيعة العقود، ومدى ملاءمة المنصة للتداول السريع أو التداول متوسط المدى على XAU/USD.",
          },
          {
            title: "الحد الأدنى للإيداع",
            text: "أخذنا بعين الاعتبار قيمة أقل إيداع، لأن كثيرًا من الزوار يريدون البدء بمبلغ صغير نسبيًا، لذلك ركزنا على المنصات التي تمنح مرونة أكبر للمبتدئين.",
          },
          {
            title: "الرافعة المالية",
            text: "قارنّا بين الوسطاء من حيث الرافعة المتاحة على الذهب، مع الانتباه إلى أن الرافعة العالية ليست ميزة مطلقة دائمًا، بل تحتاج إلى إدارة مخاطر صارمة.",
          },
          {
            title: "الحساب الإسلامي",
            text: "لأن جزءًا كبيرًا من الجمهور العربي يهتم بهذا العامل، تم إعطاء أهمية لتوفر الحساب الإسلامي أو على الأقل وجود بدائل واضحة ومفهومة للمتداول المسلم.",
          },
          {
            title: "تجربة الاستخدام والدعم",
            text: "راجعنا سهولة فتح الحساب، واجهة المنصة، جودة التطبيقات، وسهولة الوصول إلى الدعم، لأن المنصة الجيدة ليست فقط في الأرقام بل في تجربة الاستخدام اليومية.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right"
          >
            <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              معيار أساسي
            </div>
            <h3 className="mt-3 text-[20px] font-black text-slate-950">
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-700">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-blue-100 bg-blue-50/60 p-5 text-right">
        <p className="text-[15px] leading-8 text-slate-700">
          لذلك عندما ترى منصة في أعلى القائمة، فهذا لا يعني فقط أنها مشهورة،
          بل يعني أنها حققت توازنًا أفضل بين الأمان، شروط التداول، سهولة
          الاستخدام، وملاءمة الخدمة للمتداول العربي الذي يريد التداول على
          الذهب بشكل عملي وواضح.
        </p>
      </div>
    </div>

    {/* Mobile */}
    <div className="space-y-3 p-4 md:hidden">
      {[
        {
          title: "الترخيص والموثوقية",
          text: "أعطينا أولوية واضحة للشركات المنظمة من جهات رقابية معروفة، لأن تراخيص الوسيط تبقى من أهم عوامل الأمان عند تداول الذهب، خصوصًا للمتداول الذي يريد السحب والإيداع براحة أكبر.",
        },
        {
          title: "شروط تداول الذهب",
          text: "راجعنا شروط تداول الذهب من حيث فروقات الأسعار، سرعة التنفيذ، طبيعة العقود، ومدى ملاءمة المنصة للتداول السريع أو التداول متوسط المدى على XAU/USD.",
        },
        {
          title: "الحد الأدنى للإيداع",
          text: "أخذنا بعين الاعتبار قيمة أقل إيداع، لأن كثيرًا من الزوار يريدون البدء بمبلغ صغير نسبيًا، لذلك ركزنا على المنصات التي تمنح مرونة أكبر للمبتدئين.",
        },
        {
          title: "الرافعة المالية",
          text: "قارنّا بين الوسطاء من حيث الرافعة المتاحة على الذهب، مع الانتباه إلى أن الرافعة العالية ليست ميزة مطلقة دائمًا، بل تحتاج إلى إدارة مخاطر صارمة.",
        },
        {
          title: "الحساب الإسلامي",
          text: "لأن جزءًا كبيرًا من الجمهور العربي يهتم بهذا العامل، تم إعطاء أهمية لتوفر الحساب الإسلامي أو على الأقل وجود بدائل واضحة ومفهومة للمتداول المسلم.",
        },
        {
          title: "تجربة الاستخدام والدعم",
          text: "راجعنا سهولة فتح الحساب، واجهة المنصة، جودة التطبيقات، وسهولة الوصول إلى الدعم، لأن المنصة الجيدة ليست فقط في الأرقام بل في تجربة الاستخدام اليومية.",
        },
      ].map((item) => (
        <details
          key={item.title}
          className="overflow-hidden rounded-[22px] border border-slate-200 bg-white"
        >
          <summary className="list-none cursor-pointer px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                +
              </span>
              <h3 className="flex-1 text-right text-[18px] font-black text-slate-950">
                {item.title}
              </h3>
            </div>
          </summary>
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-right">
            <p className="text-[14px] leading-8 text-slate-700">{item.text}</p>
          </div>
        </details>
      ))}

      <details className="overflow-hidden rounded-[22px] border border-blue-100 bg-blue-50/60">
        <summary className="list-none cursor-pointer px-4 py-4 text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-black text-blue-700">
            قراءة المزيد
          </span>
        </summary>
        <div className="border-t border-blue-100 px-4 py-4 text-right">
          <p className="text-[14px] leading-8 text-slate-700">
            عندما ترى منصة في أعلى القائمة، فهذا لا يعني فقط أنها مشهورة، بل
            يعني أنها حققت توازنًا أفضل بين الأمان، شروط التداول، سهولة
            الاستخدام، وملاءمة الخدمة للمتداول العربي الذي يريد التداول على
            الذهب بشكل عملي وواضح.
          </p>
        </div>
      </details>
    </div>
  </div>
</section>

{/* EDUCATIONAL GUIDE */}
<section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
       كيف تختار أفضل منصة تداول ذهب مناسبة لك؟
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        اختيار أفضل منصة تداول الذهب لا يعتمد على شركة واحدة تناسب الجميع، بل
        يعتمد على طريقة تداولك، حجم رأس المال، ومدى حاجتك إلى أدوات معينة مثل
        الحساب الإسلامي أو الرافعة أو التنفيذ السريع. لهذا من المهم أن تنظر
        إلى المنصة من زاوية احتياجاتك أنت، وليس من زاوية الإعلانات فقط.
      </p>
    </div>

    {/* Desktop */}
    <div className="hidden md:block p-6 md:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-right">
          <h3 className="text-[22px] font-black text-slate-950">
            1) حدّد أسلوبك في التداول أولًا
          </h3>
          <p className="mt-3 text-[15px] leading-8 text-slate-700">
            هل أنت متداول يومي على الذهب؟ أم تبحث عن صفقات تمتد عدة أيام؟ أم
            تريد فقط الاستفادة من تحركات الذهب عند الأخبار القوية؟ الجواب هنا
            يغيّر المنصة المناسبة لك، لأن بعض الشركات تكون أقوى في التنفيذ السريع
            والسبريد، بينما شركات أخرى تكون أفضل للمبتدئين أو للحسابات الصغيرة.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-right">
          <h3 className="text-[22px] font-black text-slate-950">
            2) لا تختَر الوسيط بناءً على الرافعة فقط
          </h3>
          <p className="mt-3 text-[15px] leading-8 text-slate-700">
            كثير من المبتدئين ينجذبون إلى الرافعة العالية، لكن الحقيقة أن
            الأهم هو جودة التنفيذ، وضوح الرسوم، واستقرار المنصة عند الحركة
            السريعة. الرافعة قد تزيد الفرص، لكنها كذلك تزيد الخطر، لذلك لا يجب
            أن تكون العامل الأول في اختيار وسيط تداول الذهب.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-right">
          <h3 className="text-[22px] font-black text-slate-950">
            3) راقب تكلفة التداول الفعلية
          </h3>
          <p className="mt-3 text-[15px] leading-8 text-slate-700">
            عند مقارنة منصات تداول الذهب، لا تنظر فقط إلى كلمة “سبريد منخفض”.
            راقب أيضًا العمولة إن وجدت، سرعة التنفيذ، والانزلاق السعري في فترات
            التذبذب. لأن تكلفة الصفقة الحقيقية هي ما يهم في النهاية، خصوصًا إذا
            كنت تدخل صفقات متعددة على XAU/USD خلال الأسبوع.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-right">
          <h3 className="text-[22px] font-black text-slate-950">
            4) اختر منصة تناسب خبرتك
          </h3>
          <p className="mt-3 text-[15px] leading-8 text-slate-700">
            إذا كنت مبتدئًا، فأنت تحتاج إلى وسيط واضح، سهل، ويقدم واجهة بسيطة
            مع حد أدنى منخفض. أما إذا كنت متداولًا أكثر خبرة، فقد تهتم أكثر
            بجودة التنفيذ، الحسابات الاحترافية، تنوع المنصات، ومرونة إدارة
            الصفقات على الذهب.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-amber-100 bg-amber-50/60 p-6 text-right">
        <h3 className="text-[20px] font-black text-slate-950">
          الخلاصة العملية
        </h3>
        <p className="mt-3 text-[15px] leading-8 text-slate-700">
          أفضل منصة تداول الذهب بالنسبة لك هي المنصة التي تجمع بين الترخيص
          القوي، الشروط المناسبة لاستراتيجيتك، وتجربة استخدام مريحة. لذلك قبل
          فتح الحساب، راقب: التنظيم، السبريد، الحد الأدنى للإيداع، نوع المنصة،
          الحساب الإسلامي، وسهولة السحب والإيداع. هذه العوامل مجتمعة أهم من
          أي إعلان تسويقي أو وعود مبالغ فيها.
        </p>
      </div>
    </div>

    {/* Mobile */}
    <div className="space-y-3 p-4 md:hidden">
      {[
        {
          title: "1) حدّد أسلوبك في التداول أولًا",
          text: "هل أنت متداول يومي على الذهب؟ أم تبحث عن صفقات تمتد عدة أيام؟ أم تريد فقط الاستفادة من تحركات الذهب عند الأخبار القوية؟ الجواب هنا يغيّر المنصة المناسبة لك، لأن بعض الشركات تكون أقوى في التنفيذ السريع والسبريد، بينما شركات أخرى تكون أفضل للمبتدئين أو للحسابات الصغيرة.",
        },
        {
          title: "2) لا تختَر الوسيط بناءً على الرافعة فقط",
          text: "كثير من المبتدئين ينجذبون إلى الرافعة العالية، لكن الحقيقة أن الأهم هو جودة التنفيذ، وضوح الرسوم، واستقرار المنصة عند الحركة السريعة. الرافعة قد تزيد الفرص، لكنها كذلك تزيد الخطر، لذلك لا يجب أن تكون العامل الأول في اختيار وسيط تداول الذهب.",
        },
        {
          title: "3) راقب تكلفة التداول الفعلية",
          text: "عند مقارنة منصات تداول الذهب، لا تنظر فقط إلى كلمة “سبريد منخفض”. راقب أيضًا العمولة إن وجدت، سرعة التنفيذ، والانزلاق السعري في فترات التذبذب. لأن تكلفة الصفقة الحقيقية هي ما يهم في النهاية، خصوصًا إذا كنت تدخل صفقات متعددة على XAU/USD خلال الأسبوع.",
        },
        {
          title: "4) اختر منصة تناسب خبرتك",
          text: "إذا كنت مبتدئًا، فأنت تحتاج إلى وسيط واضح، سهل، ويقدم واجهة بسيطة مع حد أدنى منخفض. أما إذا كنت متداولًا أكثر خبرة، فقد تهتم أكثر بجودة التنفيذ، الحسابات الاحترافية، تنوع المنصات، ومرونة إدارة الصفقات على الذهب.",
        },
      ].map((item) => (
        <details
          key={item.title}
          className="overflow-hidden rounded-[22px] border border-slate-200 bg-white"
        >
          <summary className="list-none cursor-pointer px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                ✓
              </span>
              <h3 className="flex-1 text-right text-[17px] font-black text-slate-950">
                {item.title}
              </h3>
            </div>
          </summary>
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-right">
            <p className="text-[14px] leading-8 text-slate-700">{item.text}</p>
          </div>
        </details>
      ))}

      <details className="overflow-hidden rounded-[22px] border border-amber-100 bg-amber-50/60">
        <summary className="list-none cursor-pointer px-4 py-4 text-center">
          <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-black text-amber-700">
            قراءة المزيد
          </span>
        </summary>
        <div className="border-t border-amber-100 px-4 py-4 text-right">
          <p className="text-[14px] leading-8 text-slate-700">
            أفضل منصة تداول الذهب بالنسبة لك هي المنصة التي تجمع بين الترخيص
            القوي، الشروط المناسبة لاستراتيجيتك، وتجربة استخدام مريحة. لذلك قبل
            فتح الحساب، راقب: التنظيم، السبريد، الحد الأدنى للإيداع، نوع
            المنصة، الحساب الإسلامي، وسهولة السحب والإيداع.
          </p>
        </div>
      </details>
    </div>
  </div>
</section>

{/* RISKS */}
<section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
        مخاطر تداول الذهب التي يجب أن تعرفها
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        تداول الذهب قد يبدو أسهل من بعض الأسواق الأخرى بسبب شهرته الكبيرة،
        لكنه في الحقيقة سوق سريع وحساس جدًا للأخبار الاقتصادية والسياسية. لهذا
        من المهم أن يفهم المتداول المخاطر الأساسية قبل فتح أي صفقة.
      </p>
    </div>

    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[
          {
            title: "تقلب السعر بسرعة",
            text: "الذهب قد يتحرك بشكل قوي خلال دقائق عند صدور بيانات التضخم، الفائدة الأمريكية، أو تصريحات البنوك المركزية. لذلك الدخول العشوائي على الأخبار قد يعرّضك لخسائر كبيرة.",
          },
          {
            title: "خطر الرافعة المالية",
            text: "الرافعة تضاعف القدرة الشرائية، لكنها تضاعف كذلك حجم الخسارة. كثير من الحسابات الصغيرة لا تتضرر من الذهب نفسه، بل من سوء استخدام الرافعة على الذهب.",
          },
          {
            title: "الانزلاق السعري والتنفيذ",
            text: "في فترات الحركة العنيفة قد لا يتم تنفيذ الأمر عند السعر المتوقع تمامًا، ولهذا تصبح جودة المنصة والوسيط مهمة جدًا عند التداول على الذهب.",
          },
          {
            title: "غياب إدارة رأس المال",
            text: "أكثر الأخطاء شيوعًا في تداول الذهب ليست في التحليل فقط، بل في فتح عقود أكبر من حجم الحساب، أو ترك الصفقة بدون وقف خسارة واضح أو خطة خروج.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-rose-100 bg-rose-50/50 p-5 text-right"
          >
            <h3 className="text-[20px] font-black text-slate-950">
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-700">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right">
        <h3 className="text-[19px] font-black text-slate-950">
          كيف تقلل مخاطر تداول الذهب؟
        </h3>
        <ul className="mt-4 space-y-3">
          <FeatureItem>لا تدخل بحجم عقد أكبر من قدرة حسابك.</FeatureItem>
          <FeatureItem>استخدم وقف خسارة واضح في كل صفقة.</FeatureItem>
          <FeatureItem>تجنب الدخول العشوائي وقت الأخبار الكبرى.</FeatureItem>
          <FeatureItem>اختر وسيطًا قويًا من حيث التنفيذ والاستقرار.</FeatureItem>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* WHY TRADE GOLD */}
<section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
        لماذا يتداول الناس الذهب؟
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        الذهب ليس مجرد معدن ثمين، بل أصل مالي يتابعه المستثمرون والمتداولون
        حول العالم يوميًا. ولهذا السبب تحظى منصات تداول الذهب بهذا الحجم من
        الاهتمام، خصوصًا في الفترات التي تزيد فيها التقلبات وعدم اليقين.
      </p>
    </div>

    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "ملاذ آمن",
            text: "كثير من المستثمرين يتجهون إلى الذهب في أوقات الأزمات أو التوترات الجيوسياسية.",
          },
          {
            title: "التحوط من التضخم",
            text: "يُنظر إلى الذهب غالبًا كأداة لحفظ القيمة عندما تتراجع القوة الشرائية للعملات.",
          },
          {
            title: "فرص تداول يومية",
            text: "الذهب من أكثر الأصول نشاطًا، وهذا يجعله جذابًا للمتداولين الباحثين عن حركة يومية قوية.",
          },
          {
            title: "سهولة الوصول",
            text: "اليوم أصبح تداول الذهب متاحًا بسهولة من خلال المنصات الإلكترونية دون الحاجة إلى شراء الذهب الفعلي.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right"
          >
           <div className="flex items-center gap-3 text-right">
  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-black shrink-0">
    ★
  </div>

  <h3 className="text-[18px] font-black text-slate-950 md:text-[20px]">
    {item.title}
  </h3>
</div>
            <p className="mt-3 text-[15px] leading-8 text-slate-700">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* mobile extra read more */}
      <div className="mt-4 md:hidden">
        <details className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
          <summary className="list-none cursor-pointer px-4 py-4 text-center">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700">
              قراءة المزيد
            </span>
          </summary>
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-right">
            <p className="text-[14px] leading-8 text-slate-700">
              كذلك يحب كثير من المتداولين الذهب لأنه أصل معروف وواضح، ويتأثر
              بعوامل اقتصادية مشهورة مثل الدولار الأمريكي، الفائدة، التضخم،
              وحالة الأسواق العالمية. لذلك يعتبره البعض من أفضل الأصول للتداول
              لمن يفهم سلوكه جيدًا ويتابع أخباره باستمرار.
            </p>
          </div>
        </details>
      </div>

      <div className="mt-5 hidden rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right md:block">
        <p className="text-[15px] leading-8 text-slate-700">
          كذلك يحب كثير من المتداولين الذهب لأنه أصل معروف وواضح، ويتأثر
          بعوامل اقتصادية مشهورة مثل الدولار الأمريكي، الفائدة، التضخم، وحالة
          الأسواق العالمية. لذلك يعتبره البعض من أفضل الأصول للتداول لمن يفهم
          سلوكه جيدًا ويتابع أخباره باستمرار.
        </p>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
       الأسئلة الشائعة حول أفضل منصات تداول الذهب
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        هذه مجموعة من أهم الأسئلة التي يبحث عنها المستخدمون عند اختيار أفضل
        منصة تداول الذهب، وقد حرصنا على أن تكون الإجابات واضحة ومباشرة ومفيدة
        للسيو وللزائر في الوقت نفسه.
      </p>
    </div>

    <div className="p-4 md:p-8">
      <div className="space-y-3">
        {[
          {
            q: "ما أفضل منصة لتداول الذهب؟",
            a: "أفضل منصة لتداول الذهب تختلف حسب احتياجاتك، لكن بشكل عام يجب أن تجمع بين الترخيص الجيد، التنفيذ السريع، السبريد المناسب، سهولة الإيداع والسحب، وتوفر الحساب الإسلامي إذا كنت تحتاجه. لهذا السبب من الأفضل دائمًا مقارنة أكثر من وسيط قبل اتخاذ القرار النهائي.",
          },
          {
            q: "هل تداول الذهب مناسب للمبتدئين؟",
            a: "نعم، يمكن أن يكون تداول الذهب مناسبًا للمبتدئين إذا تم التعامل معه بخطة واضحة وإدارة مخاطر منضبطة. الذهب أصل مشهور وسهل المتابعة نسبيًا، لكنه في الوقت نفسه قد يكون سريع الحركة جدًا، لذلك يجب تجنب الدخول العشوائي أو استخدام رافعة مبالغ فيها.",
          },
          {
            q: "كم أقل مبلغ لبدء تداول الذهب؟",
            a: "يختلف ذلك من وسيط إلى آخر، فبعض منصات تداول الذهب تسمح ببدء الحساب بمبلغ منخفض نسبيًا، بينما تطلب شركات أخرى حدًا أعلى. المهم ليس فقط قيمة الإيداع الأول، بل أيضًا حجم العقد، والرافعة، وتكلفة الصفقة الفعلية.",
          },
          {
            q: "هل يمكن تداول الذهب بحساب إسلامي؟",
            a: "نعم، كثير من الوسطاء يوفرون حسابات إسلامية أو خيارات تداول بدون فوائد تبييت على بعض الأدوات. لكن يجب قراءة الشروط بدقة، لأن تفاصيل الحساب الإسلامي تختلف من منصة إلى أخرى.",
          },
          {
            q: "ما الفرق بين شراء الذهب وتداول الذهب؟",
            a: "شراء الذهب يعني امتلاك الذهب الفعلي أو الاستثمار فيه كأصل حقيقي، بينما تداول الذهب عبر المنصات يكون غالبًا من خلال عقود أو مشتقات مالية تتيح لك الاستفادة من حركة السعر صعودًا أو هبوطًا دون امتلاك المعدن نفسه.",
          },
          {
            q: "هل الرافعة العالية أفضل في تداول الذهب؟",
            a: "ليست دائمًا أفضل. الرافعة العالية قد تزيد من فرص الربح، لكنها كذلك تزيد الخسارة بسرعة. لذلك الأفضل اختيار رافعة تناسب خبرتك وحجم حسابك، لا أن تختار أعلى رافعة فقط لأنها متاحة.",
          },
          {
            q: "ما أفضل وقت لتداول الذهب؟",
            a: "غالبًا يزداد نشاط الذهب أثناء الجلسات التي يكون فيها السوق الأمريكي نشطًا، وعند صدور الأخبار الاقتصادية المهمة مثل بيانات التضخم والفائدة والوظائف الأمريكية. لكن الوقت الأفضل يعتمد أيضًا على استراتيجيتك.",
          },
          {
            q: "كيف أعرف أن منصة تداول الذهب موثوقة؟",
            a: "ابدأ بالنظر إلى الترخيص، ثم راقب سمعة الشركة، وضوح الشروط، سهولة التواصل مع الدعم، واستقرار المنصة عند الحركة السريعة. كذلك من الأفضل أن تختار وسيطًا معروفًا وله حضور قوي وخدمة واضحة للمنطقة العربية.",
          },
        ].map((item, index) => (
          <details
            key={index}
            className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white"
          >
            <summary className="list-none cursor-pointer px-4 py-4 md:px-5">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-open:rotate-45">
                  +
                </span>
                <h3 className="flex-1 text-right text-[16px] font-black leading-7 text-slate-950 md:text-[18px]">
                  {item.q}
                </h3>
              </div>
            </summary>
            <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-right md:px-5">
              <p className="text-[14px] leading-8 text-slate-700 md:text-[15px]">
                {item.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>

{/* INTERNAL LINKS */}
<section className="mx-auto max-w-7xl px-4 pb-4 md:px-6 lg:pb-6">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
        روابط مهمة قد تفيدك
      </h2>

      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        إذا كنت تبحث عن معلومات إضافية حول أفضل منصات التداول، فهذه الصفحات
        المرتبطة تساعدك على مقارنة الوسطاء وفهم الفروقات بينهم بشكل أوضح قبل
        اتخاذ القرار.
      </p>
    </div>

    {(() => {
      const internalLinks = [
        {
          title: "كيف تبدأ التداول من الصفر",
          desc: "دليل مبسط للمبتدئين لفهم أساسيات التداول خطوة بخطوة.",
          href: "https://brokeralarab.com/learn-trading/how-to-start-trading-from-zero",
        },
        {
          title: "أفضل الوسطاء",
          desc: "استعرض صفحة أفضل الوسطاء ومقارنة أهم الشركات المناسبة للمتداول العربي.",
          href: "https://brokeralarab.com/best-brokers",
        },
        {
          title: "أفضل وسطاء السبريد المنخفض",
          desc: "صفحة متخصصة لمقارنة الشركات التي تقدم فروقات أسعار منخفضة.",
          href: "https://brokeralarab.com/lowest-spread-brokers",
        },
        {
          title: "تقييم Exness",
          desc: "مراجعة شاملة لوسيط Exness من حيث التراخيص، الحسابات، والسحب.",
          href: "/brokers/exness",
        },
        {
          title: "تقييم XM",
          desc: "تعرف على أهم مميزات وعيوب XM وهل يناسب تداول الذهب.",
          href: "/brokers/xm",
        },
        {
          title: "تقييم Pepperstone",
          desc: "مراجعة مفصلة لوسيط Pepperstone من حيث التنفيذ والرسوم والمنصات.",
          href: "/brokers/pepperstone",
        },
      ];

      return (
        <>
          {/* Desktop */}
          <div className="hidden p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {internalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-blue-200"
              >
                <div className="flex items-start justify-between gap-3">
                  
                  {/* TEXT */}
                  <div className="flex-1 text-right">
                    <h3 className="text-[18px] font-black text-slate-950 group-hover:text-blue-700">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[14px] leading-7 text-slate-600">
                      {item.desc}
                    </p>

                    <div className="mt-4 text-[13px] font-black text-blue-600">
                      اقرأ المزيد ←
                    </div>
                  </div>

                  {/* ICON */}
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 shrink-0">
                    ↗
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile */}
          <div className="p-4 md:hidden">
            <div className="space-y-3">
              {internalLinks.slice(0, 3).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm text-right"
                >
                  <h3 className="text-[17px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[14px] leading-7 text-slate-600">
                    {item.desc}
                  </p>

                  <div className="mt-3 text-[13px] font-black text-blue-600">
                    اقرأ المزيد ←
                  </div>
                </a>
              ))}
            </div>

            <details className="mt-3 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
              <summary className="list-none cursor-pointer px-4 py-4 text-center">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700">
                  عرض المزيد
                </span>
              </summary>

              <div className="border-t border-slate-200 p-3 space-y-3">
                {internalLinks.slice(3).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-[18px] border border-slate-200 bg-slate-50 p-4 text-right"
                  >
                    <h3 className="text-[16px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-7 text-slate-600">
                      {item.desc}
                    </p>

                    <div className="mt-3 text-[13px] font-black text-blue-600">
                      اقرأ المزيد ←
                    </div>
                  </a>
                ))}
              </div>
            </details>
          </div>
        </>
      );
    })()}
  </div>
</section> 
    </main>
  );
}