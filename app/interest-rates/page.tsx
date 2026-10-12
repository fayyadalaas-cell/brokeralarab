
import type { Metadata } from "next";
import Link from "next/link";
import HistoryExplorer from "./HistoryExplorer";
import CalendarFilters from "./CalendarFilters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE = "https://brokeralarab.com";
const PAGE = "/interest-rates";
const BANK_SLUGS = [
  "fed",
  "ecb",
  "boe",
  "boj",
  "boc",
  "rba",
  "snb",
  "rbnz",
] as const;

type Meeting = {
  id?: string;
  meeting_date?: string;
  announcement_at?: string | null;
  status?: string;
  decision_rate?: number | null;
  previous_rate?: number | null;
  change_bps?: number | null;
  decision_type?: string | null;
  effective_date?: string | null;
  verification_status?: string | null;
  reference_calendar_url?: string | null;
  decision_source_url?: string | null;
};

type History = {
  meeting_date?: string;
  decision_date?: string;
  effective_date?: string;
  date?: string;
  rate?: number | null;
  decision_rate?: number | null;
  previous_rate?: number | null;
  change_bps?: number | null;
  decision_type?: string | null;
};

type Faq = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type Bank = {
  slug: string;
  bank_name_ar: string;
  bank_short_name_ar: string | null;
  country_ar: string | null;
  currency_code: string | null;
  flag_emoji: string | null;
  bank_logo_url: string | null;
  current_rate: number | null;
  current_rate_lower: number | null;
  current_rate_upper: number | null;
  rate_type_ar: string | null;
  comparison_rate_basis: string | null;
  previous_rate: number | null;
  last_change_bps: number | null;
  last_decision_date: string | null;
  official_website: string | null;
  official_rates_url: string | null;
  meetings: Meeting[] | null;
  rate_history: History[] | null;
  faq_ar: Faq[] | null;
  hub_intro_ar: string | null;
  hub_comparison_intro_ar: string | null;
  hub_meetings_intro_ar: string | null;
  hub_history_intro_ar: string | null;
  hub_educational_content_ar: string | null;
  methodology_ar: string | null;
  data_disclaimer_ar: string | null;
  seo_title_ar: string | null;
  seo_description_ar: string | null;
  seo_h1_ar: string | null;
  og_title_ar: string | null;
  og_description_ar: string | null;
  og_image_url: string | null;
  display_order: number | null;
  is_published?: boolean;
  is_hub?: boolean;
};

type EventRow = {
  bank: Bank;
  meeting: Meeting;
};

type HistoryRow = {
  date: string;
  rate: number;
  previousRate: number | null;
  changeBps: number | null;
  type: string | null;
  source: "history" | "meeting";
};

type PageSearchParams = {
  bank?: string | string[];
  year?: string | string[];
  history_bank?: string | string[];
  history_year?: string | string[];
  show_all?: string | string[];
};

type PageProps = {
  searchParams?: Promise<PageSearchParams>;
};

const BANK_DETAILS: Record<
  string,
  {
    name: string;
    english: string;
    country: string;
    currency: string;
    description: string;
    calendar: string;
  }
> = {
  fed: {
    name: "الاحتياطي الفيدرالي الأمريكي",
    english: "Federal Reserve",
    country: "الولايات المتحدة",
    currency: "USD",
    description:
      "يحدد الاحتياطي الفيدرالي نطاق الفائدة المستهدف للأموال الفيدرالية. وتتابع الأسواق قرارات لجنة السوق المفتوحة وبياناتها وتوقعاتها الاقتصادية.",
    calendar:
      "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
  },
  ecb: {
    name: "البنك المركزي الأوروبي",
    english: "European Central Bank",
    country: "منطقة اليورو",
    currency: "EUR",
    description:
      "يدير البنك المركزي الأوروبي السياسة النقدية لمنطقة اليورو. ويُعد سعر تسهيلات الإيداع من أهم الأسعار التي تتابعها الأسواق.",
    calendar:
      "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
  },
  boe: {
    name: "بنك إنجلترا",
    english: "Bank of England",
    country: "المملكة المتحدة",
    currency: "GBP",
    description:
      "تحدد لجنة السياسة النقدية في بنك إنجلترا سعر البنك، مع متابعة التضخم والأجور والنشاط الاقتصادي في المملكة المتحدة.",
    calendar:
      "https://www.bankofengland.co.uk/monetary-policy/upcoming-mpc-dates",
  },
  boj: {
    name: "بنك اليابان",
    english: "Bank of Japan",
    country: "اليابان",
    currency: "JPY",
    description:
      "يراقب المتداولون قرارات بنك اليابان بشأن أسعار الفائدة وتقييمه للتضخم والأجور والظروف المالية وتأثير ذلك على الين.",
    calendar:
      "https://www.boj.or.jp/en/mopo/mpmsche_minu/",
  },
  boc: {
    name: "بنك كندا",
    english: "Bank of Canada",
    country: "كندا",
    currency: "CAD",
    description:
      "يحدد بنك كندا سعر الفائدة المستهدف لليلة واحدة، وهو مؤشر رئيسي لتكلفة التمويل وتوقعات الدولار الكندي.",
    calendar:
      "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/",
  },
  rba: {
    name: "البنك الاحتياطي الأسترالي",
    english: "Reserve Bank of Australia",
    country: "أستراليا",
    currency: "AUD",
    description:
      "يحدد مجلس السياسة النقدية الأسترالي سعر النقد المستهدف، مع التركيز على التضخم وسوق العمل والنشاط الاقتصادي.",
    calendar:
      "https://www.rba.gov.au/schedules-events/board-meeting-schedules.html",
  },
  snb: {
    name: "البنك الوطني السويسري",
    english: "Swiss National Bank",
    country: "سويسرا",
    currency: "CHF",
    description:
      "يعلن البنك الوطني السويسري تقييماته الدورية للسياسة النقدية، مع مراعاة استقرار الأسعار والظروف النقدية وسعر صرف الفرنك.",
    calendar:
      "https://www.snb.ch/en/services-events/digital-services/event-schedule",
  },
  rbnz: {
    name: "البنك الاحتياطي النيوزيلندي",
    english: "Reserve Bank of New Zealand",
    country: "نيوزيلندا",
    currency: "NZD",
    description:
      "يتابع المستثمرون قرارات سعر النقد الرسمي النيوزيلندي وتوقعات البنك بشأن التضخم والنمو والسياسة النقدية.",
    calendar: "https://www.rbnz.govt.nz/news-and-events/events",
  },
};

const DEFAULT_FAQS = [
  {
    q: "ما هي أسعار الفائدة الحالية للبنوك المركزية العالمية؟",
    a: "تعرض المقارنة في أعلى الصفحة الأسعار المرجعية المسجلة لثمانية بنوك مركزية، منها الفيدرالي الأمريكي والمركزي الأوروبي وبنوك إنجلترا واليابان وكندا وأستراليا وسويسرا ونيوزيلندا. تختلف طبيعة السعر بين بنك وآخر.",
  },
  {
    q: "متى موعد اجتماع الفيدرالي الأمريكي القادم؟",
    a: "يمكن معرفة موعد القرار القادم للاحتياطي الفيدرالي من جدول الاجتماعات في هذه الصفحة، مع رابط التقويم الرسمي. ويُستخدم تاريخ إعلان القرار عند امتداد الاجتماع ليومين.",
  },
  {
    q: "هل يؤدي رفع سعر الفائدة إلى ارتفاع العملة؟",
    a: "ليس بالضرورة. يعتمد تأثير القرار على الفرق بين النتيجة الفعلية وتوقعات الأسواق، وتوجيهات البنك بشأن القرارات القادمة، والعوامل الاقتصادية الأخرى.",
  },
  {
    q: "ما الفرق بين سعر الفائدة الأمريكي والأوروبي؟",
    a: "يستخدم الاحتياطي الفيدرالي نطاقًا مستهدفًا لسعر الأموال الفيدرالية، بينما ينشر البنك المركزي الأوروبي عدة أسعار رئيسية، من أبرزها سعر تسهيلات الإيداع. لذلك يجب معرفة أساس كل رقم قبل المقارنة.",
  },
  {
    q: "كيف تؤثر أسعار الفائدة على الذهب؟",
    a: "يتأثر الذهب بالعوائد الحقيقية وسعر الدولار وتوقعات التضخم والمخاطر العالمية. وقد يؤدي ارتفاع العوائد الحقيقية إلى زيادة تكلفة الفرصة البديلة لحيازة الذهب، لكن العلاقة ليست ثابتة.",
  },
  {
    q: "هل تعني اجتماعات البنوك المركزية تغيير سعر الفائدة؟",
    a: "لا. قد يقرر البنك تثبيت الفائدة أو رفعها أو خفضها. كما قد تؤثر لغة البيان والمؤتمر الصحفي في الأسواق حتى عند عدم تغيير السعر.",
  },
  {
    q: "هل مواعيد اجتماعات البنوك المركزية لعام 2027 مؤكدة؟",
    a: "تعتمد الصفحة على التواريخ المسجلة في قاعدة البيانات والتقاويم الرسمية. بعض البنوك تعتبر مواعيدها مؤقتة أو قابلة للتعديل، ولذلك يجب مراجعة المصدر الرسمي قبل الإعلان.",
  },
  {
    q: "ما المقصود بالنقطة الأساسية في قرارات الفائدة؟",
    a: "النقطة الأساسية تساوي 0.01 نقطة مئوية. ولذلك فإن خفض الفائدة بمقدار 25 نقطة أساس يعني خفضها بمقدار 0.25 نقطة مئوية.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/learn-trading",
    title: "تعلم التداول",
    description: "مفاهيم التداول وإدارة المخاطر للمبتدئين.",
  },
  {
    href: "/best-brokers",
    title: "أفضل وسطاء الفوركس",
    description: "تقييمات ومقارنات شركات الوساطة.",
  },
  {
    href: "/best-brokers/commodities",
    title: "أفضل وسطاء السلع",
    description: "مقارنة الوسطاء لتداول الذهب والسلع.",
  },
  {
    href: "/best-brokers/indices",
    title: "أفضل وسطاء المؤشرات",
    description: "التعرف على خيارات تداول مؤشرات الأسهم.",
  },
  {
    href: "/best-brokers/stocks",
    title: "أفضل وسطاء الأسهم",
    description: "مراجعات الوسطاء المتاحين لتداول الأسهم.",
  },
];

const safeUrl = (value?: string | null) => {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};

const numeric = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value)
    ? value
    : null;

const formatRate = (
  value: number | null | undefined,
  digits = 2
) =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(digits)}%`
    : "—";

const dateOnly = (value?: string | null) => {
  if (!value) return null;
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
};

const dateAr = (value?: string | null) => {
  const iso = dateOnly(value);
  if (!iso) return "—";

  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const shortDate = (value?: string | null) => {
  const iso = dateOnly(value);
  if (!iso) return "—";

  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
};

const rateLabel = (bank: Bank) => {
  if (bank.slug === "fed") {
    return formatRate(
      bank.current_rate_upper ?? bank.current_rate
    );
  }

  if (
    bank.current_rate_lower != null &&
    bank.current_rate_upper != null &&
    bank.current_rate_lower !== bank.current_rate_upper
  ) {
    return `${formatRate(bank.current_rate_lower)} – ${formatRate(
      bank.current_rate_upper
    )}`;
  }

  return formatRate(bank.current_rate);
};

const changeLabel = (bps: number | null | undefined) => {
  if (bps == null) return "غير متاح";
  if (bps === 0) return "تثبيت";
  if (bps > 0) return `رفع ${bps} نقطة أساس`;
  return `خفض ${Math.abs(bps)} نقطة أساس`;
};

const changeClass = (bps: number | null | undefined) => {
  if (bps == null) return "text-slate-500";
  if (bps > 0) return "text-rose-700";
  if (bps < 0) return "text-emerald-700";
  return "text-blue-700";
};

const bankName = (bank: Bank) =>
  bank.bank_name_ar ||
  BANK_DETAILS[bank.slug]?.name ||
  bank.slug.toUpperCase();

const bankShortName = (bank: Bank) =>
  bank.bank_short_name_ar || bankName(bank);

const bankCurrency = (bank: Bank) =>
  bank.currency_code ||
  BANK_DETAILS[bank.slug]?.currency ||
  "—";

const officialSource = (bank: Bank) =>
  safeUrl(bank.official_rates_url) ||
  safeUrl(bank.official_website);

const calendarSource = (bank: Bank) =>
  BANK_DETAILS[bank.slug]?.calendar || officialSource(bank);

function getNextMeeting(bank: Bank, today: string) {
  return (Array.isArray(bank.meetings) ? bank.meetings : [])
    .filter(
      (m) =>
        m.status === "scheduled" &&
        !!dateOnly(m.meeting_date) &&
        dateOnly(m.meeting_date)! >= today
    )
    .sort((a, b) =>
      (a.meeting_date || "").localeCompare(b.meeting_date || "")
    )[0];
}

function getHistory(bank: Bank): HistoryRow[] {
  const rows: HistoryRow[] = [];

  if (Array.isArray(bank.rate_history)) {
    for (const item of bank.rate_history) {
      const date = dateOnly(
        item.decision_date ||
          item.meeting_date ||
          item.date ||
          item.effective_date
      );

      const rate = numeric(item.decision_rate ?? item.rate);

      if (!date || rate === null) continue;

      rows.push({
        date,
        rate,
        previousRate: numeric(item.previous_rate),
        changeBps: numeric(item.change_bps),
        type: item.decision_type || null,
        source: "history",
      });
    }
  }

  if (Array.isArray(bank.meetings)) {
    for (const meeting of bank.meetings) {
      if (meeting.status !== "completed") continue;

      const date = dateOnly(meeting.meeting_date);
      const rate = numeric(meeting.decision_rate);

      if (!date || rate === null) continue;

      rows.push({
        date,
        rate,
        previousRate: numeric(meeting.previous_rate),
        changeBps: numeric(meeting.change_bps),
        type: meeting.decision_type || null,
        source: "meeting",
      });
    }
  }

  // Prevent duplicate historical decisions when the same event
  // exists in both rate_history and completed meetings.
  const unique = new Map<string, HistoryRow>();

  for (const row of rows) {
    const existing = unique.get(row.date);

    if (!existing || row.source === "meeting") {
      unique.set(row.date, row);
    }
  }

  const sorted = [...unique.values()].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return sorted.map((row, index) => {
    const prior = index > 0 ? sorted[index - 1] : null;

    const previousRate =
      row.previousRate ?? prior?.rate ?? null;

    const changeBps =
      row.changeBps ??
      (previousRate === null
        ? null
        : Math.round((row.rate - previousRate) * 100));

    return {
      ...row,
      previousRate,
      changeBps,
    };
  });
}

async function loadData(): Promise<{
  banks: Bank[];
  hub: Bank | null;
  error: boolean;
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return { banks: [], hub: null, error: true };
  }

  try {
    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/interest_rates?select=*&order=display_order.asc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Interest rates Supabase error:",
        response.status
      );
      return { banks: [], hub: null, error: true };
    }

    const records = (await response.json()) as Bank[];

    const hub =
      records.find(
        (r) => r.slug === "global" && r.is_published !== false
      ) || null;

    const banks = records
      .filter(
        (r) =>
          BANK_SLUGS.includes(
            r.slug as (typeof BANK_SLUGS)[number]
          ) && r.is_published !== false
      )
      .sort(
        (a, b) =>
          (a.display_order ?? 99) -
          (b.display_order ?? 99)
      );

    return { banks, hub, error: false };
  } catch (error) {
    console.error("Interest rates fetch failed:", error);
    return { banks: [], hub: null, error: true };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { hub } = await loadData();

  // Do not append the brand name here:
  // the root layout already handles the title template.
  const title =
  hub?.seo_title_ar?.trim() ||
  "أسعار الفائدة العالمية اليوم 2026 | قرارات البنوك المركزية";

const description =
  hub?.seo_description_ar?.trim() ||
  "تابع أسعار الفائدة العالمية لعام 2026، وقارن معدلات البنوك المركزية، واطلع على قرارات الفيدرالي الأمريكي ومواعيد الاجتماعات القادمة والسجل التاريخي للفائدة.";

  const ogTitle = hub?.og_title_ar?.trim() || title;
  const ogDescription =
    hub?.og_description_ar?.trim() || description;

  const ogImage = safeUrl(hub?.og_image_url);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}${PAGE}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${SITE}${PAGE}`,
      siteName: "بروكر العرب",
      locale: "ar_AR",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string | null;
}) {
  return (
    <div className="mb-6 text-right sm:mb-8">
      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-[#1e5bb8] sm:text-xs">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-tight text-[#091b32] sm:text-[32px] lg:text-[36px]">
        {title}
      </h2>

      {description && (
        <p className="mt-2 w-full max-w-none text-justify text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

function BankMark({
  bank,
  large = false,
}: {
  bank: Bank;
  large?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${
        large ? "h-12 w-12 text-2xl" : "h-10 w-10 text-xl"
      }`}
    >
      {safeUrl(bank.bank_logo_url) ? (
        <img
          src={bank.bank_logo_url!}
          alt={`شعار ${bankName(bank)}`}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
        />
      ) : (
        bank.flag_emoji || (
          <span className="text-xs font-black text-blue-700">
            {bankCurrency(bank)}
          </span>
        )
      )}
    </div>
  );
}

function BankIdentity({
  bank,
  compact = false,
}: {
  bank: Bank;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center justify-start gap-2.5">
      <BankMark bank={bank} large={!compact} />
      <div className="min-w-0 text-right">
        <div
          className={`font-black leading-6 text-slate-950 ${
            compact ? "text-xs sm:text-sm" : "text-sm"
          }`}
        >
          {bankName(bank)}
        </div>
        <div className="mt-0.5 text-[10px] font-medium text-slate-500">
          {bank.country_ar ||
            BANK_DETAILS[bank.slug]?.country ||
            ""}{" "}
          · {bankCurrency(bank)}
        </div>
      </div>
    </div>
  );
}

function SourceLink({
  href,
  label = "المصدر الرسمي",
  dark = false,
}: {
  href?: string | null;
  label?: string;
  dark?: boolean;
}) {
  const url = safeUrl(href);

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        dark
          ? "inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-black text-white transition hover:bg-white/20"
          : "inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] font-black text-blue-700 transition hover:bg-blue-100"
      }
    >
      {label} ↗
    </a>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}

function Chart({
  history,
  bank,
}: {
  history: HistoryRow[];
  bank: Bank;
}) {
  if (history.length < 2) {
    return (
      <EmptyState text="لا توجد نقاط تاريخية كافية لرسم تطور سعر الفائدة لهذا البنك." />
    );
  }

  const width = 1000;
  const height = 300;
  const left = 65;
  const right = 25;
  const top = 24;
  const bottom = 48;

  const rates = history.map((h) => h.rate);
  const rawMin = Math.min(...rates);
  const rawMax = Math.max(...rates);
  const span = Math.max(rawMax - rawMin, 0.5);
  const min = rawMin - span * 0.12;
  const max = rawMax + span * 0.12;

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const dates = history.map((h) =>
    new Date(`${h.date}T00:00:00Z`).getTime()
  );

  const firstDate = Math.min(...dates);
  const lastDate = Math.max(...dates);
  const dateSpan = Math.max(lastDate - firstDate, 1);

  const x = (date: number) =>
    left + ((date - firstDate) / dateSpan) * plotWidth;

  const y = (rate: number) =>
    top + ((max - rate) / (max - min)) * plotHeight;

  // Step chart: policy rates stay constant between decisions.
  let path = `M ${x(dates[0]).toFixed(2)} ${y(
    history[0].rate
  ).toFixed(2)}`;

  for (let i = 1; i < history.length; i++) {
    path += ` H ${x(dates[i]).toFixed(2)} V ${y(
      history[i].rate
    ).toFixed(2)}`;
  }

  const areaPath = `${path} L ${x(
    dates[dates.length - 1]
  ).toFixed(2)} ${top + plotHeight} L ${x(
    dates[0]
  ).toFixed(2)} ${top + plotHeight} Z`;

  const ticks = Array.from(
    { length: 5 },
    (_, i) => min + ((max - min) * i) / 4
  );

  const labelIndexes = Array.from(
    new Set([
      0,
      Math.floor((history.length - 1) / 3),
      Math.floor(((history.length - 1) * 2) / 3),
      history.length - 1,
    ])
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black text-slate-900 sm:text-base">
            تطور سعر الفائدة — {bankShortName(bank)}
          </h3>
          <p className="mt-1 text-[11px] text-slate-500">
            تغير السعر عند صدور القرارات المسجلة
          </p>
        </div>

        <span
          dir="ltr"
          className="rounded-xl bg-blue-50 px-3 py-2 text-lg font-black text-blue-700"
        >
          {formatRate(history[history.length - 1].rate)}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`رسم بياني لتاريخ سعر الفائدة لدى ${bankName(
          bank
        )}`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient
            id="rateAreaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#2B6FD0"
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor="#2B6FD0"
              stopOpacity="0.015"
            />
          </linearGradient>
        </defs>

        {ticks.map((tick, index) => {
          const yy = y(tick);
          return (
            <g key={index}>
              <line
                x1={left}
                y1={yy}
                x2={width - right}
                y2={yy}
                stroke="#e2e8f0"
                strokeDasharray="5 6"
              />
              <text
                x={left - 12}
                y={yy + 5}
                textAnchor="end"
                fill="#64748b"
                fontSize="15"
              >
                {tick.toFixed(2)}%
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#rateAreaGradient)" />

        <path
          d={path}
          fill="none"
          stroke="#246cce"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {history.map((row, i) => (
          <circle
            key={`${row.date}-${i}`}
            cx={x(dates[i])}
            cy={y(row.rate)}
            r="3.2"
            fill="#ffffff"
            stroke="#246cce"
            strokeWidth="2"
          >
            <title>
              {`${row.date}: ${formatRate(row.rate)}`}
            </title>
          </circle>
        ))}

        {labelIndexes.map((index) => (
          <text
            key={index}
            x={x(dates[index])}
            y={height - 14}
            textAnchor={
              index === 0
                ? "start"
                : index === history.length - 1
                ? "end"
                : "middle"
            }
            fontSize="14"
            fill="#64748b"
          >
            {history[index].date.slice(0, 7)}
          </text>
        ))}
      </svg>

      <p className="mt-2 text-[11px] leading-6 text-slate-500">
        الرسم يعتمد على القرارات التاريخية المسجلة في
        قاعدة البيانات، ولا يمثل توقعات مستقبلية. يتم
        وصل القرارات بخط متدرج لتوضيح استمرار السعر
        بين القرارات.
      </p>
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="mb-1.5 block text-[11px] font-black text-slate-600">
        {label}
      </span>

      <select
        name={name}
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function RateTable({
  banks,
  today,
}: {
  banks: Bank[];
  today: string;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 px-4 py-5 sm:px-7">
        <div>
          <span className="rounded-full bg-[#2471df] px-3 py-1 text-[10px] font-black text-white">
            بيانات أسعار الفائدة
          </span>
          <h3 className="mt-2 text-lg font-black text-slate-950 sm:text-2xl">
            مقارنة البنوك المركزية العالمية
          </h3>
        </div>

        <span className="rounded-xl border border-blue-100 bg-white px-4 py-2 text-xs font-black text-blue-700">
          {banks.length} بنوك مركزية
        </span>
      </div>

      <div className="hidden p-5 lg:block">
        <div className="overflow-hidden rounded-[18px] border border-slate-200">
          <table className="w-full table-fixed text-center">
            <thead className="bg-[#0b2949] text-white">
              <tr className="text-xs">
                <th className="w-[25%] px-4 py-4 text-center">
                  البنك المركزي
                </th>
                <th className="w-[14%] px-3 py-4 text-center">
                  الفائدة الحالية
                </th>
                <th className="w-[17%] px-3 py-4 text-center">
                  نوع السعر
                </th>
                <th className="w-[16%] px-3 py-4 text-center">
                  آخر قرار
                </th>
                <th className="w-[17%] px-3 py-4 text-center">
                  الاجتماع القادم
                </th>
                <th className="w-[11%] px-3 py-4 text-center">
                  المصدر
                </th>
              </tr>
            </thead>

            <tbody>
              {banks.map((bank, index) => {
                const next = getNextMeeting(bank, today);

                return (
                  <tr
                    key={bank.slug}
                    className={`border-t border-slate-200 transition hover:bg-blue-50 ${
                      index % 2
                        ? "bg-slate-50/70"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 text-right">
                      <BankIdentity bank={bank} />
                    </td>

                    <td className="px-3 py-4 text-center">
                      <span
                        dir="ltr"
                        className="inline-block text-[17px] font-black text-[#1e5bb8]"
                      >
                        {rateLabel(bank)}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-center text-[11px] font-bold leading-6 text-slate-600">
                      {bank.rate_type_ar ||
                        "السعر المرجعي"}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <div
                        className={`text-[11px] font-black ${changeClass(
                          bank.last_change_bps
                        )}`}
                      >
                        {changeLabel(bank.last_change_bps)}
                      </div>
                      <div className="mt-1 text-[10px] text-slate-500">
                        {dateAr(bank.last_decision_date)}
                      </div>
                    </td>

                    <td className="px-3 py-4 text-center text-xs font-black">
                      {next
                        ? dateAr(next.meeting_date)
                        : "لم يُعلن"}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <SourceLink
                        href={officialSource(bank)}
                        label="المصدر"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-5 lg:hidden">
        {banks.map((bank) => {
          const next = getNextMeeting(bank, today);

          return (
            <article
              key={bank.slug}
              className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 p-3.5">
                <BankIdentity bank={bank} compact />

                <div className="shrink-0 text-left">
                  <div
                    dir="ltr"
                    className="text-lg font-black text-[#1e5bb8]"
                  >
                    {rateLabel(bank)}
                  </div>
                  <p className="mt-1 text-[9px] text-slate-500">
                    الفائدة الحالية
                  </p>
                </div>
              </div>

              <div className="mx-3.5 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 text-center">
                <div className="border-l border-slate-200 p-3">
                  <p className="text-[10px] text-slate-500">
                    آخر قرار
                  </p>
                  <p
                    className={`mt-1 text-[11px] font-black ${changeClass(
                      bank.last_change_bps
                    )}`}
                  >
                    {changeLabel(bank.last_change_bps)}
                  </p>
                </div>

                <div className="p-3">
                  <p className="text-[10px] text-slate-500">
                    الاجتماع القادم
                  </p>
                  <p className="mt-1 text-[11px] font-black">
                    {next
                      ? dateAr(next.meeting_date)
                      : "لم يُعلن"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                <p className="line-clamp-2 text-[10px] leading-5 text-slate-500">
                  {bank.rate_type_ar ||
                    "السعر المرجعي"}
                </p>

                <SourceLink
                  href={officialSource(bank)}
                  label="المصدر ↗"
                />
              </div>
            </article>
          );
        })}
      </div>

      {!banks.length && (
        <div className="p-5">
          <EmptyState text="لا توجد بيانات منشورة للعرض حاليًا." />
        </div>
      )}

      <div className="border-t border-amber-100 bg-amber-50 px-4 py-3 text-[11px] leading-7 text-amber-900 sm:px-7">
        <strong>ملاحظة مهمة:</strong> لا تمثل جميع
        الأسعار النوع نفسه من أدوات السياسة النقدية.
        يعرض الفيدرالي الأمريكي نطاقًا مستهدفًا، بينما
        تعتمد بنوك أخرى سعرًا مرجعيًا واحدًا. لا
        تقارن الأرقام باعتبارها عوائد استثمارية موحدة.
      </div>
    </div>
  );
}

export default async function InterestRatesPage({
  searchParams,
}: PageProps) {
  const params = (await searchParams) || {};

  const selectedBank =
    typeof params.bank === "string"
      ? params.bank
      : "all";

  const selectedYear =
    typeof params.year === "string"
      ? params.year
      : "all";

  const selectedHistoryBank =
    typeof params.history_bank === "string"
      ? params.history_bank
      : "fed";

  const selectedHistoryYear =
    typeof params.history_year === "string"
      ? params.history_year
      : "all";

  const { banks, hub, error } = await loadData();

  const today = new Date().toISOString().slice(0, 10);

  const allMeetings: EventRow[] = banks
    .flatMap((bank) =>
      (Array.isArray(bank.meetings)
        ? bank.meetings
        : []
      )
        .filter(
          (meeting) =>
            meeting.status === "scheduled" &&
            !!dateOnly(meeting.meeting_date) &&
            dateOnly(meeting.meeting_date)! >= today
        )
        .map((meeting) => ({ bank, meeting }))
    )
    .sort((a, b) =>
      (a.meeting.meeting_date || "").localeCompare(
        b.meeting.meeting_date || ""
      )
    );

  const calendarYears = [
    ...new Set(
      allMeetings
        .map((event) =>
          dateOnly(event.meeting.meeting_date)?.slice(0, 4)
        )
        .filter((value): value is string => !!value)
    ),
  ].sort();

  const filteredMeetings = allMeetings.filter(
    ({ bank, meeting }) =>
      (selectedBank === "all" ||
        bank.slug === selectedBank) &&
      (selectedYear === "all" ||
        meeting.meeting_date?.startsWith(selectedYear))
  );

    const showAllMeetings = params.show_all === "1";

  const visibleMeetings = showAllMeetings
    ? filteredMeetings
    : filteredMeetings.slice(0, 15);
  
  const allHistory = banks.flatMap((bank) =>
    getHistory(bank).map((row) => ({ bank, row }))
  );

  const historyBank =
    banks.find((bank) => bank.slug === selectedHistoryBank) ||
    banks[0];

  const historyFull = historyBank
    ? getHistory(historyBank)
    : [];

  const historyYears = [
    ...new Set(
      historyFull.map((row) => row.date.slice(0, 4))
    ),
  ].sort();

  const historyFiltered =
    selectedHistoryYear === "all"
      ? historyFull
      : historyFull.filter((row) =>
          row.date.startsWith(selectedHistoryYear)
        );

  const recentDecisions = [...allHistory]
    .sort((a, b) => b.row.date.localeCompare(a.row.date))
    .slice(0, 12);

  const latestPerBank = banks
    .map((bank) => ({
      bank,
      latest: getHistory(bank).at(-1),
    }))
    .filter(
      (
        item
      ): item is {
        bank: Bank;
        latest: HistoryRow;
      } => !!item.latest
    )
    .sort((a, b) =>
      b.latest.date.localeCompare(a.latest.date)
    );

  const nextEvent = allMeetings[0];

  const bankOptions = [
    { value: "all", label: "جميع البنوك المركزية" },
    ...banks.map((bank) => ({
      value: bank.slug,
      label: bankShortName(bank),
    })),
  ];

  const historyBankOptions = banks.map((bank) => ({
    value: bank.slug,
    label: bankShortName(bank),
  }));

  const calendarYearOptions = [
    { value: "all", label: "جميع السنوات" },
    ...calendarYears.map((year) => ({
      value: year,
      label: year,
    })),
  ];

  const historyYearOptions = [
    { value: "all", label: "جميع السنوات" },
    ...historyYears.map((year) => ({
      value: year,
      label: year,
    })),
  ];

  const faqs = DEFAULT_FAQS;

  const hubTitle =
  hub?.seo_h1_ar?.trim() ||
  "أسعار الفائدة العالمية والبنوك المركزية";

  const intro =
    hub?.hub_intro_ar?.trim() ||
    "تابع أسعار الفائدة الرسمية لأهم البنوك المركزية العالمية، واطلع على القرارات السابقة ومواعيد الاجتماعات القادمة وتحليل تأثير السياسة النقدية على الفوركس والذهب والأسهم.";

  const comparisonIntro =
    hub?.hub_comparison_intro_ar?.trim() ||
    "قارن الأسعار المرجعية لثمانية بنوك مركزية مع آخر قرار معلن وموعد الاجتماع القادم، مع مراعاة اختلاف تعريف السعر بين بنك وآخر.";

  const meetingsIntro =
    hub?.hub_meetings_intro_ar?.trim() ||
    "تقويم لإعلانات السياسة النقدية القادمة، مع إمكانية تصفية الاجتماعات حسب البنك المركزي والسنة والرجوع إلى التقويم الرسمي.";

  const historyIntro =
    hub?.hub_history_intro_ar?.trim() ||
    "استعرض القرارات التاريخية المسجلة، وتابع تغير أسعار الفائدة عبر الزمن، بما في ذلك قرارات الرفع والخفض والتثبيت.";

  const methodology =
    hub?.methodology_ar?.trim() ||
    "تعتمد الصفحة على البيانات المسجلة في قاعدة بيانات بروكر العرب وروابط الجهات الرسمية. يُعرض تاريخ إعلان قرار الفائدة، وليس بالضرورة أول أيام اجتماع لجنة السياسة النقدية. وتختلف الأسعار المرجعية وتعريفاتها بين البنوك.";

  const disclaimer =
    hub?.data_disclaimer_ar?.trim() ||
    "قد تتغير أسعار الفائدة ومواعيد الاجتماعات أو أوقات الإعلان دون إشعار مسبق. يرجى مراجعة الموقع الرسمي للبنك المركزي قبل اتخاذ قرارات مالية. المحتوى معلوماتي ولا يمثل توصية استثمارية.";

  const structuredData = [
    {
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
          name: "أسعار الفائدة",
          item: `${SITE}${PAGE}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hubTitle,
      description: intro,
      url: `${SITE}${PAGE}`,
      inLanguage: "ar",
      isPartOf: {
        "@type": "WebSite",
        name: "بروكر العرب",
        url: SITE,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: banks.length,
        itemListElement: banks.map((bank, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: bankName(bank),
          description:
            BANK_DETAILS[bank.slug]?.description || "",
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <main
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-[#f4f7fb] text-slate-900"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />
          <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 pb-5 pt-4 sm:px-6 sm:pb-12 sm:pt-8 lg:px-10 lg:pb-16">
          <nav
            aria-label="مسار الصفحة"
            className="mb-7 hidden items-center gap-2 text-xs font-bold text-blue-200/80 sm:flex"
          >
            <Link href="/" className="hover:text-white">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-white">
              أسعار الفائدة
            </span>
          </nav>

          <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-black text-blue-100 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                مركز السياسة النقدية العالمية
              </span>

              <h1 className="mt-3 max-w-[850px] text-[27px] font-black leading-[1.25] tracking-tight sm:mt-5 sm:text-[45px] lg:text-[53px] xl:text-[59px]">
                {hubTitle ===
"أسعار الفائدة العالمية والبنوك المركزية" ? (
  <>
    أسعار الفائدة العالمية
    <span className="block text-[#59c0ff]">
      والبنوك المركزية
    </span>
  </>
) : (
  hubTitle
)}
              </h1>

              <p className="mt-3 max-w-[800px] text-[12px] font-medium leading-6 text-slate-200 sm:mt-5 sm:text-[16px] sm:leading-9">
                {intro}
              </p>

              <div className="mt-4 grid max-w-[660px] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-1 sm:mt-6">
                {[
                  {
                    value: String(banks.length),
                    label: "بنوك مركزية",
                  },
                  {
                    value: String(allMeetings.length),
                    label: "اجتماعات قادمة",
                  },
                  {
                    value: String(allHistory.length),
                    label: "قرارات تاريخية",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`px-1 py-2 text-center sm:py-3 ${
                      index === 1
                        ? "border-x border-white/10"
                        : ""
                    }`}
                  >
                    <div
                      dir="ltr"
                      className="text-lg font-black text-[#66c8ff] sm:text-2xl"
                    >
                      {item.value}
                    </div>
                    <div className="mt-1 text-[9px] font-bold text-slate-300 sm:text-xs">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
                <a
                  href="#rates"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#2471df] px-1 text-center text-[10px] font-black leading-4 text-white transition hover:bg-[#2e7cea] sm:min-h-11 sm:px-5 sm:text-sm"
                >
                  مقارنة أسعار الفائدة ←
                </a>

                <a
                  href="#calendar"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-1 text-center text-[10px] font-black leading-4 text-white transition hover:bg-white/15 sm:min-h-11 sm:px-5 sm:text-sm"
                >
                  تقويم الاجتماعات ←
                </a>

                <a
                  href="#history"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-1 text-center text-[10px] font-black leading-4 text-white transition hover:bg-white/15 sm:min-h-11 sm:px-5 sm:text-sm"
                >
                  سجل القرارات ←
                </a>
              </div>
            </div>

            

<aside className="w-full max-w-[470px] justify-self-end overflow-hidden rounded-[18px] border border-blue-200 bg-[#eef5fd] p-3 text-slate-900 shadow-2xl sm:rounded-[22px] sm:p-6">
  <div className="flex items-center justify-between gap-3">
    <div>
      <p className="text-[10px] font-bold text-blue-600 sm:text-xs">
        لوحة متابعة السياسة النقدية
      </p>
      <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
        أسعار البنوك الرئيسية
      </h2>
    </div>

    <span className="rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-[10px] font-black text-blue-700">
      بيانات منشورة
    </span>
  </div>

  <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
    {["fed", "ecb", "boe", "boj"]
      .map((slug) => banks.find((bank) => bank.slug === slug))
      .filter((bank): bank is Bank => !!bank)
      .map((bank) => (
        <div
          key={bank.slug}
          className="flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white px-3 py-2.5 shadow-sm sm:py-3"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-lg">
              {bank.flag_emoji || "🌐"}
            </span>

            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 sm:text-sm">
                {bankShortName(bank)}
              </div>

              <div
                dir="ltr"
                className="mt-0.5 text-right text-[10px] text-slate-500"
              >
                {bankCurrency(bank)}
              </div>
            </div>
          </div>

          <span
            dir="ltr"
            className="shrink-0 text-[15px] font-black text-[#1e5bb8] sm:text-lg"
          >
            {rateLabel(bank)}
          </span>
        </div>
      ))}
  </div>

  {nextEvent && (
    <div className="mt-3 rounded-xl border border-blue-200 bg-[#dceafb] p-3 sm:mt-4">
      <p className="text-[10px] font-black text-blue-700">
        أقرب إعلان مجدول
      </p>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-900">
          {bankShortName(nextEvent.bank)}
        </span>

        <time
          dateTime={nextEvent.meeting.meeting_date}
          className="text-xs font-black text-blue-800"
        >
          {dateAr(nextEvent.meeting.meeting_date)}
        </time>
      </div>
    </div>
  )}

  <p className="mt-3 text-[10px] leading-5 text-slate-500 sm:leading-6">
    الأسعار مأخوذة من السجلات المنشورة وليست بثًا مباشرًا لحظيًا.
  </p>
</aside>


          </div>
        </div>
      </section>

      {/* SECTION NAVIGATION */}
      <nav
        aria-label="أقسام أسعار الفائدة"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-[1520px] gap-2 overflow-x-auto px-3 py-3 sm:flex-wrap sm:px-6 lg:px-10">
          {[
            ["#rates", "الأسعار الحالية"],
            ["#calendar", "تقويم الاجتماعات"],
            ["#history", "السجل التاريخي"],
            ["#decisions", "أحدث القرارات"],
            ["#banks", "البنوك المركزية"],
            ["#guide", "الدليل والتحليل"],
            ["#impact", "تأثير الفائدة"],
            ["#faq", "الأسئلة الشائعة"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-4 sm:text-xs"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {error && (
        <div className="mx-auto max-w-[1520px] px-3 pt-5 sm:px-6 lg:px-10">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">
            تعذر الاتصال بقاعدة بيانات أسعار الفائدة.
            تحقق من إعدادات Supabase وسياسات القراءة.
          </div>
        </div>
      )}

      {/* CURRENT RATES */}
      <section
        id="rates"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="المقارنة الرئيسية"
            title="أسعار الفائدة الحالية حسب البنك المركزي"
            description={comparisonIntro}
          />

          <RateTable banks={banks} today={today} />

          <div className="mt-5 hidden gap-3 md:grid md:grid-cols-3">
            {[
              {
                title: "الفائدة الأمريكية",
                text: "يعتمد الاحتياطي الفيدرالي نطاقًا مستهدفًا بدل سعر واحد.",
              },
              {
                title: "الفائدة الأوروبية",
                text: "يجب تحديد السعر الأوروبي المستخدم، مثل سعر تسهيلات الإيداع.",
              },
              {
                title: "اختلاف الأسعار المرجعية",
                text: "اختلاف النسب لا يعني وحده اختلاف مستوى التشدد النقدي.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
              >
                <h3 className="text-sm font-black text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE CALENDAR */}
      <section
        id="calendar"
        className="scroll-mt-20 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="التقويم الاقتصادي"
            title="جدول اجتماعات البنوك المركزية 2026–2027"
            description={meetingsIntro}
          />

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
            <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black sm:text-2xl">
                    تقويم قرارات أسعار الفائدة
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    جميع الإعلانات المستقبلية المسجلة
                    حتى آخر تاريخ متاح
                  </p>
                </div>

                <span className="rounded-full bg-[#2471df] px-3 py-2 text-xs font-black text-white">
                  {filteredMeetings.length} من{" "}
                  {allMeetings.length} موعدًا
                </span>
              </div>

              <CalendarFilters
  key={`${selectedBank}-${selectedYear}`}
  selectedBank={selectedBank}
  selectedYear={selectedYear}
  bankOptions={bankOptions}
  yearOptions={calendarYearOptions}
/>

              {(selectedBank !== "all" ||
                selectedYear !== "all") && (
                <Link
                  href={`${PAGE}#calendar`}
                  className="mt-3 inline-block text-xs font-black text-blue-700 underline underline-offset-4"
                >
                  إعادة عرض جميع الاجتماعات
                </Link>
              )}
            </div>

            <div className="hidden md:block">
              <table className="w-full table-fixed text-center">
                <thead className="bg-[#0b2949] text-white">
                  <tr className="text-xs">
                    <th className="px-5 py-4 text-right">
                      البنك المركزي
                    </th>
                    <th className="px-4 py-4">
                      العملة
                    </th>
                    <th className="px-4 py-4">
                      تاريخ الإعلان
                    </th>
                    <th className="px-4 py-4">
                      الوقت UTC
                    </th>
                    <th className="px-4 py-4">
                      حالة الموعد
                    </th>
                    <th className="px-4 py-4">
                      التقويم الرسمي
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visibleMeetings.map(
                    ({ bank, meeting }, index) => (
                      <tr
                        key={`${bank.slug}-${
                          meeting.id ||
                          meeting.meeting_date
                        }`}
                        className={`border-t border-slate-200 ${
                          index % 2
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-start gap-2">
                            <span className="text-lg">
                              {bank.flag_emoji || "🌐"}
                            </span>
                            <span className="text-xs font-black">
                              {bankName(bank)}
                            </span>
                          </div>
                        </td>

                        <td
                          dir="ltr"
                          className="px-4 py-3.5 text-center text-xs font-black text-slate-600"
                        >
                          {bankCurrency(bank)}
                        </td>

                        <td className="px-4 py-3.5 text-xs font-black">
                          <time
                            dateTime={
                              meeting.meeting_date
                            }
                          >
                            {dateAr(
                              meeting.meeting_date
                            )}
                          </time>
                        </td>

                        <td
                          dir="ltr"
                          className="px-4 py-3.5 text-center text-xs font-bold text-slate-600"
                        >
                          {meeting.announcement_at
                            ? `${meeting.announcement_at.slice(
                                11,
                                16
                              )} UTC`
                            : "غير محدد"}
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                            مجدول
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <SourceLink
                            href={
                              safeUrl(
                                meeting.reference_calendar_url
                              ) ||
                              calendarSource(bank)
                            }
                            label="التقويم"
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-200 md:hidden">
              {visibleMeetings.map(
                ({ bank, meeting }) => (
                  <article
                    key={`${bank.slug}-${
                      meeting.id ||
                      meeting.meeting_date
                    }`}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <BankIdentity
                        bank={bank}
                        compact
                      />

                      <div className="shrink-0 text-left">
                        <time
                          dateTime={
                            meeting.meeting_date
                          }
                          className="text-[11px] font-black text-[#1e5bb8]"
                        >
                          {dateAr(
                            meeting.meeting_date
                          )}
                        </time>

                        <p
                          dir="ltr"
                          className="mt-1 text-[10px] text-slate-500"
                        >
                          {meeting.announcement_at
                            ? `${meeting.announcement_at.slice(
                                11,
                                16
                              )} UTC`
                            : "الوقت غير محدد"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                        إعلان مجدول
                      </span>

                      <SourceLink
                        href={
                          safeUrl(
                            meeting.reference_calendar_url
                          ) ||
                          calendarSource(bank)
                        }
                        label="التقويم الرسمي"
                      />
                    </div>
                  </article>
                )
              )}
            </div>

{filteredMeetings.length > 15 && (
  <div className="flex justify-center border-t border-slate-200 bg-white px-4 py-5">
    <Link
      href={
        showAllMeetings
          ? `${PAGE}?bank=${selectedBank}&year=${selectedYear}#calendar`
          : `${PAGE}?bank=${selectedBank}&year=${selectedYear}&show_all=1#calendar`
      }
      className="rounded-xl bg-[#2471df] px-7 py-3 text-xs font-black text-white transition hover:bg-[#1e5bb8]"
    >
      {showAllMeetings
        ? "عرض أول 15 اجتماعًا"
        : `عرض جميع الاجتماعات (${filteredMeetings.length})`}
    </Link>
  </div>
)}

            {!filteredMeetings.length && (
              <div className="p-5">
                <EmptyState text="لا توجد اجتماعات مطابقة للفلاتر المحددة." />
              </div>
            )}


            <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-[11px] leading-7 text-slate-600 sm:px-7">
              تعرض الأوقات بتوقيت UTC عند توفرها.
              مواعيد الاجتماعات المستقبلية قابلة
              للتغيير، ولا يعني انعقاد الاجتماع بالضرورة
              تغيير سعر الفائدة. يشير تاريخ الاجتماع
              المعروض إلى تاريخ القرار المسجل.
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY + CHART */}
<section
  id="history"
  className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
    <SectionHeading
      eyebrow="البيانات التاريخية"
      title="تاريخ تغير أسعار الفائدة للبنوك المركزية"
      description={historyIntro}
    />

    <HistoryExplorer
      banks={banks.map((bank) => ({
        slug: bank.slug,
        name: bankShortName(bank),
        officialUrl: officialSource(bank),
        history: getHistory(bank).map((row) => ({
          date: row.date,
          rate: row.rate,
          previousRate: row.previousRate,
          changeBps: row.changeBps,
          type: row.type,
        })),
      }))}
    />
  </div>
</section>

      {/* RECENT DECISIONS */}
      <section
        id="decisions"
        className="scroll-mt-20 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="آخر تطورات السياسة النقدية"
            title="أحدث قرارات رفع وخفض وتثبيت الفائدة"
            description="آخر القرارات التاريخية المتاحة مرتبة حسب تاريخ الإعلان، مع سعر الفائدة الناتج عن القرار وحجم التغير بالنقاط الأساسية."
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {recentDecisions.map(({ bank, row }) => (
              <article
                key={`${bank.slug}-${row.date}`}
                className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:border-blue-200 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <BankIdentity bank={bank} compact />

                  <span
                    dir="ltr"
                    className="shrink-0 text-lg font-black text-[#1e5bb8]"
                  >
                    {formatRate(row.rate)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div>
                    <p className="text-[10px] text-slate-500">
                      تاريخ القرار
                    </p>
                    <p className="mt-1 text-xs font-black">
                      {dateAr(row.date)}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-black ${changeClass(
                      row.changeBps
                    )}`}
                  >
                    {changeLabel(row.changeBps)}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {!recentDecisions.length && (
            <EmptyState text="لا توجد قرارات تاريخية منشورة حاليًا." />
          )}
        </div>
      </section>

      {/* BANK DIRECTORY */}
      <section
        id="banks"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="دليل البنوك المركزية"
            title="دليل البنوك المركزية العالمية وأسعار الفائدة"
            description="تعرف على أهم البنوك المركزية العالمية، بما فيها الاحتياطي الفيدرالي الأمريكي والبنك المركزي الأوروبي وبنك إنجلترا وبنك اليابان. استعرض أسعار الفائدة الحالية، وأهداف السياسة النقدية، ومواعيد الاجتماعات القادمة لكل بنك مركزي."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {banks.map((bank) => {
              const next = getNextMeeting(bank, today);
              const details = BANK_DETAILS[bank.slug];

              return (
                <article
                  key={bank.slug}
                  className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <BankMark bank={bank} large />

                    <span
                      dir="ltr"
                      className="rounded-xl bg-blue-50 px-3 py-2 text-lg font-black text-blue-700"
                    >
                      {rateLabel(bank)}
                    </span>
                  </div>

                  
<h3 className="mt-4 text-base font-black leading-7">
  <Link
    href={`/interest-rates/${bank.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-colors hover:text-[#2471df] hover:underline"
  >
    {bankName(bank)}
  </Link>
</h3>


                  <p
                    dir="ltr"
                    className="mt-1 text-right text-[11px] font-medium text-slate-500"
                  >
                    {details?.english}
                  </p>

                  <p className="mt-3 flex-1 text-xs leading-7 text-slate-600">
                    {details?.description}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-500">
                      موعد القرار القادم
                    </p>
                    <p className="mt-1 text-xs font-black text-slate-900">
                      {next
                        ? dateAr(next.meeting_date)
                        : "لم يُعلن"}
                    </p>
                  </div>

                  

<div className="mt-4 flex flex-wrap items-center justify-center gap-2">
  <Link
    href={`/interest-rates/${bank.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-4 py-2 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8]"
  >
    تفاصيل البنك ↗
  </Link>

  <Link
    href={`${PAGE}?history_bank=${bank.slug}#history`}
    className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-center text-[11px] font-black text-blue-700 transition hover:bg-blue-100"
  >
    تاريخ الفائدة ←
  </Link>
</div>


                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL GUIDE */}
      <section
        id="guide"
        className="scroll-mt-20 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="دليل السياسة النقدية"
            title="ما هي أسعار الفائدة وكيف تحددها البنوك المركزية؟"
            description="فهم أسعار الفائدة لا يقتصر على معرفة النسبة الحالية، بل يشمل طريقة اتخاذ القرار وتوقعات الأسواق ومسار السياسة النقدية."
          />

          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 p-5 sm:p-7">
                <h3 className="text-xl font-black sm:text-2xl">
                  كيف يعمل سعر الفائدة المرجعي؟
                </h3>

                <p className="mt-4 text-[13px] leading-8 text-slate-600 sm:text-[15px]">
                  تستخدم البنوك المركزية أسعار الفائدة
                  للتأثير في تكلفة الاقتراض والسيولة
                  والطلب داخل الاقتصاد. وقد يؤدي تشديد
                  السياسة النقدية إلى إبطاء النشاط
                  الاقتصادي والحد من الضغوط التضخمية،
                  بينما قد يهدف خفض الفائدة إلى دعم
                  التمويل والإنفاق عندما تسمح الظروف
                  الاقتصادية بذلك.
                </p>

                <p className="mt-4 text-[13px] leading-8 text-slate-600 sm:text-[15px]">
                  لكن البنوك المركزية لا تتخذ قراراتها
                  بناءً على التضخم وحده؛ إذ تتابع
                  التوظيف والأجور والنمو والائتمان
                  والتوقعات الاقتصادية. كما تختلف
                  الأدوات النقدية بين الولايات المتحدة
                  ومنطقة اليورو واليابان وغيرها من
                  الاقتصادات.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
                {[
                  {
                    n: "01",
                    title: "تقييم التضخم",
                    text: "تراجع البنوك اتجاه الأسعار والتضخم الأساسي والتوقعات المستقبلية.",
                  },
                  {
                    n: "02",
                    title: "تحليل النمو والتوظيف",
                    text: "تدرس بيانات سوق العمل والإنفاق والإنتاج والظروف المالية.",
                  },
                  {
                    n: "03",
                    title: "اتخاذ قرار الفائدة",
                    text: "قد يكون القرار رفعًا أو خفضًا أو تثبيتًا، وفق أهداف السياسة النقدية.",
                  },
                  {
                    n: "04",
                    title: "إعلان التوجيه المستقبلي",
                    text: "تتابع الأسواق البيان والتوقعات والمؤتمر الصحفي لفهم المسار القادم.",
                  },
                ].map((item) => (
                  <div
  key={item.n}
  className="rounded-[17px] border border-slate-200 bg-slate-50 p-4"
>
  <div className="flex items-center gap-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-[#2471df]">
      {item.n}
    </span>
    <h4 className="text-[15px] font-black text-slate-950">
      {item.title}
    </h4>
  </div>

  <p className="mt-3 text-xs leading-7 text-slate-600">
    {item.text}
  </p>
</div>
                ))}
              </div>
            </article>

            <aside className="rounded-[22px] bg-[#071c34] p-5 text-white shadow-lg sm:p-7">
              <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[10px] font-black text-cyan-200">
                دليل المتداول
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                ماذا تراجع قبل صدور قرار الفائدة؟
              </h3>

              <p className="mt-3 text-xs leading-7 text-slate-300">
                لا تعتمد على السعر المعلن وحده.
                قارن النتيجة بالتوقعات وانتبه إلى
                الرسائل المصاحبة للقرار.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "السعر الحالي قبل الاجتماع",
                  "توقعات السوق قبل الإعلان",
                  "القرار الفعلي وحجم التغيير",
                  "بيان البنك وتوقعات التضخم",
                  "المؤتمر الصحفي للمحافظ",
                  "توقعات الاجتماعات التالية",
                  "التقلبات وفروق الأسعار وقت الخبر",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 border-b border-white/10 pb-3 last:border-0"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-black text-cyan-300">
                      ✓
                    </span>
                    <span className="text-xs font-bold leading-6 text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <h3 className="text-xl font-black">
                ما الفرق بين رفع الفائدة وخفضها وتثبيتها؟
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                <strong className="text-slate-900">
                  رفع الفائدة:
                </strong>{" "}
                يشير غالبًا إلى تشديد السياسة النقدية
                وزيادة تكلفة الاقتراض.{" "}
                <strong className="text-slate-900">
                  خفض الفائدة:
                </strong>{" "}
                يشير غالبًا إلى تيسير الظروف النقدية.
                أما{" "}
                <strong className="text-slate-900">
                  التثبيت
                </strong>{" "}
                فلا يعني بالضرورة الحياد، فقد يبقي
                البنك الفائدة مرتفعة مع التحذير من
                التضخم أو يلمح إلى خفض قادم.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <h3 className="text-xl font-black">
                لماذا تكون توقعات السوق أهم من القرار أحيانًا؟
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                عندما تتوقع الأسواق خفض الفائدة بمقدار
                25 نقطة أساس ويأتي القرار مطابقًا،
                قد يكون أثره محدودًا. أما إذا فاجأ
                البنك الأسواق بقرار مختلف أو بتوجيه
                غير متوقع، فقد تتحرك العملات والسندات
                والذهب بقوة حتى دون تغيير كبير في
                السعر المعلن.
              </p>
            </article>
          </div>

          {hub?.hub_educational_content_ar?.trim() && (
            <div className="mt-6 rounded-[22px] border border-slate-200 bg-blue-50/40 p-5 sm:p-7">
              <h3 className="text-lg font-black">
                معلومات إضافية عن السياسة النقدية
              </h3>

              <p className="mt-3 whitespace-pre-line text-[13px] leading-8 text-slate-700">
                {hub.hub_educational_content_ar}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MARKET IMPACT */}
      <section
        id="impact"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="تأثير السياسة النقدية"
            title="كيف تؤثر أسعار الفائدة على الفوركس والذهب والأسهم؟"
            description="تؤثر القرارات النقدية على توقعات المستثمرين وتكلفة التمويل والعوائد، لكن اتجاه السوق يعتمد على الظروف الاقتصادية ومدى مفاجأة القرار."
          />

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: "↗",
                title: "الفوركس والعملات",
                text: "تؤثر فروق الفائدة المتوقعة بين الاقتصادات على جاذبية العملات وتدفقات رؤوس الأموال. وتظل توقعات القرارات القادمة عاملًا أساسيًا.",
              },
              {
                icon: "◇",
                title: "الذهب والمعادن",
                text: "يتأثر الذهب بالعوائد الحقيقية والدولار والتضخم والمخاطر العالمية. لذلك لا توجد علاقة ثابتة ومضمونة بين الفائدة وسعر الذهب.",
              },
              {
                icon: "▥",
                title: "الأسهم والمؤشرات",
                text: "قد تؤثر تكلفة الاقتراض ومعدلات الخصم وتوقعات الأرباح في تقييم الأسهم، مع اختلاف التأثير بين القطاعات.",
              },
              {
                icon: "≋",
                title: "السندات والعوائد",
                text: "تعكس عوائد السندات توقعات الفائدة والتضخم والمخاطر. وتتفاعل الآجال القصيرة والطويلة بصورة مختلفة.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[19px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-[#2471df]">
    {item.icon}
  </span>

  <h3 className="text-base font-black text-slate-950">
    {item.title}
  </h3>
</div>

                <p className="mt-3 text-xs leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
              <h3 className="text-lg font-black sm:text-xl">
                كيف تؤثر الفائدة الأمريكية على الدولار؟
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                تؤثر توقعات الفائدة الأمريكية في عوائد
                الأصول المقومة بالدولار. وقد يستفيد
                الدولار من ارتفاع العوائد المتوقعة،
                لكن النتيجة تعتمد على المقارنة مع
                الاقتصادات الأخرى وعلى شهية المخاطرة
                وتوقعات النمو. لذلك فإن قرار الفيدرالي
                وحده لا يكفي لتحديد اتجاه الدولار.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
              <h3 className="text-lg font-black sm:text-xl">
                كيف تؤثر فروق الفائدة على أزواج العملات؟
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                يقارن المتداولون أحيانًا مسار الفائدة
                المتوقع بين بنكين مركزيين، مثل
                الفيدرالي والأوروبي، لفهم اتجاه
                زوج EUR/USD. لكن الفرق الحالي بين
                السعرين لا يحدد حركة الزوج وحده؛
                فالتوقعات المستقبلية والتضخم والنمو
                والمخاطر العالمية عناصر مؤثرة أيضًا.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="مقالات وأدوات ذات صلة"
            title="استكمل تحليل الأسواق مع بروكر العرب"
            description="اربط قرارات السياسة النقدية بفهم الأسواق وإدارة المخاطر ومقارنة شركات الوساطة."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {INTERNAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-xs font-black text-[#2471df]">
                  اكتشف المزيد ←
                </span>

                <h3 className="mt-3 text-base font-black text-slate-900 group-hover:text-blue-700">
                  {item.title}
                </h3>

                <p className="mt-2 flex-1 text-xs leading-7 text-slate-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="أسئلة شائعة"
            title="الأسئلة الشائعة حول أسعار الفائدة"
            description="إجابات مباشرة عن أسعار الفائدة العالمية ومواعيد قرارات البنوك المركزية وتأثيرها على الأسواق."
          />

          <div className="space-y-2.5">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-[15px] border border-slate-200 bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-xs font-black text-slate-900 marker:hidden sm:px-6 sm:text-sm [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-blue-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="border-t border-slate-200 px-4 py-4 text-xs leading-8 text-slate-600 sm:px-6 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY AND SOURCES */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 p-5 sm:p-7">
              <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-[10px] font-black text-blue-700">
                الشفافية والمصادر
              </span>

              <h2 className="mt-3 text-xl font-black sm:text-2xl">
                مصادر أسعار الفائدة ومنهجية عرض البيانات
              </h2>

              <p className="mt-3 whitespace-pre-line text-[13px] leading-8 text-slate-600">
                {methodology}
              </p>
            </div>

            <div className="p-3 sm:p-7">
  <h3 className="text-sm font-black sm:text-base">
    المصادر الرسمية للبنوك المركزية
  </h3>

  <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 lg:grid-cols-4">
    {banks.map((bank) => (
      <div
        key={bank.slug}
        className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-2.5 sm:p-4"
      >
        <div className="flex min-h-[38px] items-center justify-center">
  <h4 className="min-w-0 text-center text-[10px] font-black leading-4 sm:text-xs">
    {bankShortName(bank)}
  </h4>
</div>

        <div className="mt-2 grid grid-cols-2 gap-1 sm:mt-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
          <div className="min-w-0 [&>a]:w-full [&>a]:!px-1 [&>a]:!py-2 [&>a]:!text-[9px] sm:[&>a]:!w-auto sm:[&>a]:!px-3 sm:[&>a]:!text-[11px]">
            <SourceLink
              href={officialSource(bank)}
              label="الفائدة"
            />
          </div>

          <div className="min-w-0 [&>a]:w-full [&>a]:!px-1 [&>a]:!py-2 [&>a]:!text-[9px] sm:[&>a]:!w-auto sm:[&>a]:!px-3 sm:[&>a]:!text-[11px]">
            <SourceLink
              href={calendarSource(bank)}
              label="الاجتماعات"
            />
          </div>
        </div>
      </div>
    ))}
  </div>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-sm font-black text-amber-950">
                  تنبيه بشأن دقة البيانات
                </h3>

                <p className="mt-2 whitespace-pre-line text-xs leading-7 text-amber-900">
                  {disclaimer}
                </p>
              </div>

              <p className="mt-4 text-[11px] leading-7 text-slate-500">
                يتم تخزين الأسعار والاجتماعات
                والقرارات في قاعدة بيانات الموقع.
                تُراجع المواعيد والقرارات بالرجوع إلى
                الجهات الرسمية، وقد تظهر تحديثات
                جديدة بعد إعادة توليد الصفحة.
                مدة إعادة التحقق التقني من البيانات
                المخزنة مؤقتًا هي 15 دقيقة، ولا تعني
                مراجعة بشرية للمصادر كل 15 دقيقة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
