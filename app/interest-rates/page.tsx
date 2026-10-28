
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


// =====================================================
// UPCOMING MEETINGS — SHARED FILTER
// =====================================================

function isUpcomingMeeting(
  bank: Bank,
  meeting: Meeting,
  today: string
): boolean {
  const meetingDate = dateOnly(meeting.meeting_date);
  const latestDecisionDate = dateOnly(bank.last_decision_date);

  if (!meetingDate) return false;

  // Exclude completed or cancelled meetings.
  if (
    meeting.status === "completed" ||
    meeting.status === "cancelled"
  ) {
    return false;
  }

  // Only scheduled meetings can be upcoming.
  if (meeting.status !== "scheduled") {
    return false;
  }

  // Exclude past meetings.
  if (meetingDate < today) {
    return false;
  }

  // Exclude meetings whose decisions are already recorded.
  if (
    latestDecisionDate &&
    meetingDate <= latestDecisionDate
  ) {
    return false;
  }

  return true;
}

function getNextMeeting(
  bank: Bank,
  today: string
): Meeting | undefined {
  return (Array.isArray(bank.meetings)
    ? bank.meetings
    : []
  )
    .filter((meeting) =>
      isUpcomingMeeting(bank, meeting, today)
    )
    .sort((a, b) =>
      (a.meeting_date || "").localeCompare(
        b.meeting_date || ""
      )
    )[0];
}



function getHistory(bank: Bank): HistoryRow[] {
  const rows: HistoryRow[] = [];

  const completedMeetings = (
    Array.isArray(bank.meetings) ? bank.meetings : []
  ).filter(
    (meeting) =>
      meeting.status === "completed" &&
      !!dateOnly(meeting.meeting_date) &&
      numeric(meeting.decision_rate) !== null
  );

  // Match historical records with completed meetings.
  // A meeting date and an effective date may differ by one day.
  const matchedMeetings = new Set<number>();

  if (Array.isArray(bank.rate_history)) {
    for (const item of bank.rate_history) {
      const historyDate = dateOnly(
        item.decision_date ||
          item.meeting_date ||
          item.date ||
          item.effective_date
      );

      const historyRate = numeric(
        item.decision_rate ?? item.rate
      );

      if (!historyDate || historyRate === null) continue;

      const matchIndex = completedMeetings.findIndex(
        (meeting, index) => {
          if (matchedMeetings.has(index)) return false;

          const meetingRate = numeric(meeting.decision_rate);
          if (meetingRate === null) return false;

          const sameRate =
            Math.abs(meetingRate - historyRate) < 0.000001;

          const possibleDates = [
            dateOnly(meeting.meeting_date),
            dateOnly(meeting.effective_date),
          ].filter(Boolean);

          const historyDates = [
            dateOnly(item.decision_date),
            dateOnly(item.meeting_date),
            dateOnly(item.date),
            dateOnly(item.effective_date),
          ].filter(Boolean);

          return (
            sameRate &&
            historyDates.some((date) =>
              possibleDates.includes(date)
            )
          );
        }
      );

      if (matchIndex !== -1) {
        matchedMeetings.add(matchIndex);

        const meeting = completedMeetings[matchIndex];

        rows.push({
          date:
            dateOnly(meeting.meeting_date) ||
            historyDate,
          rate: historyRate,
          previousRate:
            numeric(meeting.previous_rate) ??
            numeric(item.previous_rate),
          changeBps:
            numeric(meeting.change_bps) ??
            numeric(item.change_bps),
          type:
            meeting.decision_type ||
            item.decision_type ||
            null,
          source: "meeting",
        });
      } else {
        rows.push({
          date: historyDate,
          rate: historyRate,
          previousRate: numeric(item.previous_rate),
          changeBps: numeric(item.change_bps),
          type: item.decision_type || null,
          source: "history",
        });
      }
    }
  }

  // Add completed meetings not already represented in history.
  completedMeetings.forEach((meeting, index) => {
    if (matchedMeetings.has(index)) return;

    const date = dateOnly(meeting.meeting_date);
    const rate = numeric(meeting.decision_rate);

    if (!date || rate === null) return;

    rows.push({
      date,
      rate,
      previousRate: numeric(meeting.previous_rate),
      changeBps: numeric(meeting.change_bps),
      type: meeting.decision_type || null,
      source: "meeting",
    });
  });

  
// =====================================================
// REMOVE DUPLICATES AND INCLUDE LATEST DECISION
// =====================================================

// 1. Keep existing historical records and meetings.
const unique = new Map<string, HistoryRow>();

for (const row of rows) {
  const key = `${row.date}|${row.rate.toFixed(6)}`;
  const existing = unique.get(key);

  if (!existing || row.source === "meeting") {
    unique.set(key, row);
  }
}

// 2. Read the latest recorded decision.
const latestDate = dateOnly(bank.last_decision_date);
const currentRate = numeric(bank.current_rate);
const previousRate = numeric(bank.previous_rate);
const latestChange = numeric(bank.last_change_bps);

const today = new Date().toISOString().slice(0, 10);

// 3. Include the latest recorded decision.
if (
  latestDate &&
  latestDate <= today &&
  currentRate !== null
) {
  // Find existing details for the same date.
  const existing = rows.find(
    (row) => row.date === latestDate
  );

  // Remove older entries for this decision date.
  for (const [key, row] of unique.entries()) {
    if (row.date === latestDate) {
      unique.delete(key);
    }
  }

  // Insert the latest decision without duplication.
  unique.set(
    `${latestDate}|${currentRate.toFixed(6)}`,
    {
      date: latestDate,
      rate: currentRate,
      previousRate:
        previousRate ??
        existing?.previousRate ??
        null,
      changeBps:
        latestChange ??
        existing?.changeBps ??
        null,
      type:
        latestChange !== null
          ? latestChange > 0
            ? "hike"
            : latestChange < 0
            ? "cut"
            : "hold"
          : existing?.type ?? null,
      source: existing?.source ?? "history",
    }
  );
}

// 4. Preserve chronological sorting.
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
      ) &&
      r.is_published !== false
  )
  .sort((a, b) => {
    const dateA = dateOnly(a.last_decision_date) || "";
    const dateB = dateOnly(b.last_decision_date) || "";

    // Show the bank with the latest decision first.
    const byDecisionDate = dateB.localeCompare(dateA);

    if (byDecisionDate !== 0) {
      return byDecisionDate;
    }

    // Preserve the original order when dates match.
    return (
      (a.display_order ?? 99) -
      (b.display_order ?? 99)
    );
  });


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
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string | null;
}) {
  return (
    <div className="mb-5 text-right sm:mb-6">
      <h2 className="m-0 text-[24px] font-black leading-[1.35] tracking-tight text-[#091b32] sm:text-[32px] lg:text-[36px]">
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


const BANK_FLAG_CODES: Record<string, string> = {
  fed: "us",
  ecb: "eu",
  boe: "gb",
  boj: "jp",
  boc: "ca",
  rba: "au",
  snb: "ch",
  rbnz: "nz",
};

function BankMark({
  bank,
  large = false,
}: {
  bank: Bank;
  large?: boolean;
}) {
  const currencyFlags: Record<string, string> = {
    USD: "us",
    EUR: "eu",
    GBP: "gb",
    JPY: "jp",
    CAD: "ca",
    AUD: "au",
    CHF: "ch",
    NZD: "nz",
  };

  const code =
    BANK_FLAG_CODES[bank.slug] ||
    currencyFlags[bankCurrency(bank).toUpperCase()];

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${
        large ? "h-10 w-12" : "h-9 w-11"
      }`}
    >
      {code ? (
        <img
          src={`https://flagcdn.com/${code}.svg`}
          alt={`علم ${bank.country_ar || bankName(bank)}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xl" aria-hidden="true">
          🏦
        </span>
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

      {/* HEADER */}
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

      {/* DESKTOP TABLE */}
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
                    {/* CLICKABLE BANK NAME */}
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/interest-rates/${bank.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`عرض تفاصيل أسعار الفائدة لدى ${bankName(bank)} في تبويب جديد`}
                        title={`عرض صفحة ${bankName(bank)}`}
                        className="group inline-flex max-w-full items-center rounded-xl p-1 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                      >
                        <div className="transition group-hover:text-[#2471df] [&_.font-black]:group-hover:text-[#2471df]">
                          <BankIdentity bank={bank} />
                        </div>
                      </Link>
                    </td>

                    {/* CURRENT RATE */}
                    <td className="px-3 py-4 text-center">
                      <span
                        dir="ltr"
                        className="inline-block text-[17px] font-black text-[#1e5bb8]"
                      >
                        {rateLabel(bank)}
                      </span>
                    </td>

                    {/* RATE TYPE */}
                    <td className="px-3 py-4 text-center text-[11px] font-bold leading-6 text-slate-600">
                      {bank.rate_type_ar || "السعر المرجعي"}
                    </td>

                    {/* LAST DECISION */}
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

                    {/* NEXT MEETING */}
                    <td className="px-3 py-4 text-center text-xs font-black">
                      {next
                        ? dateAr(next.meeting_date)
                        : "لم يُعلن"}
                    </td>

                    {/* OFFICIAL SOURCE */}
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

      {/* MOBILE AND TABLET CARDS */}
      <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-5 lg:hidden">
        {banks.map((bank) => {
          const next = getNextMeeting(bank, today);

          return (
            <article
              key={bank.slug}
              className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 p-3.5">

                {/* CLICKABLE BANK IDENTITY */}
                <Link
                  href={`/interest-rates/${bank.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`عرض تفاصيل ${bankName(bank)} في تبويب جديد`}
                  className="group min-w-0 rounded-lg transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <div className="[&_.font-black]:group-hover:text-[#2471df]">
                    <BankIdentity bank={bank} compact />
                  </div>
                </Link>

                {/* CURRENT RATE */}
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

              {/* DECISION AND NEXT MEETING */}
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

              {/* RATE TYPE AND SOURCE */}
              <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                <p className="line-clamp-2 text-[10px] leading-5 text-slate-500">
                  {bank.rate_type_ar || "السعر المرجعي"}
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

      {/* EMPTY STATE */}
      {!banks.length && (
        <div className="p-5">
          <EmptyState text="لا توجد بيانات منشورة للعرض حاليًا." />
        </div>
      )}

      {/* DISCLAIMER */}
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
      .filter((meeting) =>
        isUpcomingMeeting(bank, meeting, today)
      )
      .map((meeting) => ({
        bank,
        meeting,
      }))
  )

  .sort((a, b) => {
    const dateA = dateOnly(a.meeting.meeting_date) || "";
    const dateB = dateOnly(b.meeting.meeting_date) || "";

    const dateComparison = dateA.localeCompare(dateB);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    const getAnnouncementTime = (meeting: Meeting) => {
      if (!meeting.announcement_at) {
        return Number.POSITIVE_INFINITY;
      }

      const timestamp = Date.parse(meeting.announcement_at);

      return Number.isFinite(timestamp)
        ? timestamp
        : Number.POSITIVE_INFINITY;
    };

    const timeA = getAnnouncementTime(a.meeting);
    const timeB = getAnnouncementTime(b.meeting);

    if (timeA !== timeB) {
      return timeA - timeB;
    }

    return a.bank.slug.localeCompare(b.bank.slug);
  });


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

const mobileVisibleMeetings = showAllMeetings
  ? filteredMeetings
  : filteredMeetings.slice(0, 5);
  
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
  .filter(({ row }) => row.date <= today)
  .sort((a, b) => b.row.date.localeCompare(a.row.date))
  .slice(0, 5);

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
    "@id": `${SITE}${PAGE}#breadcrumb`,
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
        name: "أسعار الفائدة العالمية",
        item: `${SITE}${PAGE}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}${PAGE}#webpage`,
    name: hubTitle,
    description: intro,
    url: `${SITE}${PAGE}`,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "بروكر العرب",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "بروكر العرب",
      url: SITE,
    },
    breadcrumb: {
      "@id": `${SITE}${PAGE}#breadcrumb`,
    },
    about: [
      {
        "@type": "Thing",
        name: "أسعار الفائدة العالمية",
      },
      {
        "@type": "Thing",
        name: "السياسة النقدية للبنوك المركزية",
      },
      {
        "@type": "Thing",
        name: "اجتماعات وقرارات البنوك المركزية",
      },
    ],
    mainEntity: {
      "@type": "ItemList",
      "@id": `${SITE}${PAGE}#central-banks`,
      name: "البنوك المركزية العالمية وأسعار الفائدة",
      numberOfItems: banks.length,
      itemListElement: banks.map((bank, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: bankName(bank),
        url: `${SITE}${PAGE}/${bank.slug}`,
        item: {
          "@type": "WebPage",
          "@id": `${SITE}${PAGE}/${bank.slug}#webpage`,
          url: `${SITE}${PAGE}/${bank.slug}`,
          name: `سعر الفائدة لدى ${bankName(bank)}`,
          description:
            BANK_DETAILS[bank.slug]?.description || "",
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}${PAGE}#faq`,
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

      


{/* HERO — MOBILE OPTIMIZED / DESKTOP PRESERVED */}
<section className="relative overflow-hidden border-b border-[#d6e5f8] bg-gradient-to-bl from-[#eef5fd] via-[#f7faff] to-white">
  <div className="pointer-events-none absolute -right-32 -top-40 h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-[90px]" />
  <div className="pointer-events-none absolute -bottom-32 left-0 h-[240px] w-[240px] rounded-full bg-sky-100/50 blur-[80px]" />

  <div className="relative mx-auto max-w-[1520px] px-4 pb-5 pt-3 sm:px-6 sm:pb-5 sm:pt-4 lg:px-10 lg:pb-5 lg:pt-3">

    {/* BREADCRUMB */}
    <nav
      aria-label="مسار الصفحة"
      className="mb-2 flex items-center gap-2 text-[10px] font-bold text-slate-500"
    >
      <Link href="/" className="transition hover:text-[#2471df]">
        الرئيسية
      </Link>
      <span className="text-slate-300">/</span>
      <span className="text-[#1e5bb8]">أسعار الفائدة</span>
    </nav>

    <div className="grid items-stretch gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">

      {/* MAIN CONTENT */}
      <div className="flex min-w-0 flex-col lg:justify-between">

        {/* TITLE AND DESCRIPTION */}
        <div>
          <h1 className="mt-2 max-w-[850px] text-[30px] font-black leading-[1.22] tracking-tight text-[#091b32] sm:mt-4 sm:text-[44px] lg:mt-6 lg:text-[52px] lg:leading-[1.15]">
            {hubTitle === "أسعار الفائدة العالمية والبنوك المركزية" ? (
              <>
                أسعار الفائدة العالمية
                <span className="block text-[#2471df]">
                  والبنوك المركزية
                </span>
              </>
            ) : (
              hubTitle
            )}
          </h1>

          {/* MOBILE DESCRIPTION */}
          <p className="mt-3 text-[12px] font-medium leading-[1.9] text-slate-600 sm:hidden">
            تابع أسعار الفائدة لدى أهم البنوك المركزية
            العالمية، وقارن القرارات ومواعيد الاجتماعات
            القادمة والسجل التاريخي للفائدة.
          </p>

          {/* TABLET AND DESKTOP DESCRIPTION */}
          <p className="mt-4 hidden max-w-[790px] text-[12px] font-medium leading-7 text-slate-600 sm:block sm:text-[13px] sm:leading-8">
            {intro}
          </p>
        </div>

        {/* STATISTICS AND BUTTONS */}
        <div className="mt-4 flex flex-col gap-3 lg:mt-auto lg:gap-4 lg:pt-5">

          {/* QUICK STATISTICS */}
          <div className="grid max-w-[630px] grid-cols-3 gap-2">
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
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#d6e5f8] bg-white/90 px-1.5 py-3 text-center shadow-sm sm:px-3 sm:py-2.5 lg:px-2 lg:py-2.5"
              >
                <div
                  dir="ltr"
                  className="text-[22px] font-black leading-7 text-[#2471df] sm:text-xl sm:leading-6"
                >
                  {item.value}
                </div>

                <div className="mt-1 text-[10px] font-bold leading-4 text-slate-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE QUICK NAVIGATION */}
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            <a
              href="#rates"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2471df] px-2 py-2 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-[#1e5bb8]"
            >
              مقارنة أسعار الفائدة ←
            </a>

            <a
              href="#calendar"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-200 bg-white px-2 py-2 text-center text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
            >
              تقويم الاجتماعات ←
            </a>

            <a
              href="#history"
              className="col-span-2 inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-[#d6e5f8] bg-[#eef5fd]/70 px-3 py-2 text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-100"
            >
              استعراض السجل التاريخي
              <span aria-hidden="true">←</span>
            </a>
          </div>

          {/* TABLET AND DESKTOP QUICK NAVIGATION — ORIGINAL */}
          <div className="hidden flex-wrap items-center gap-2 sm:flex">
            <a
              href="#rates"
              className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-4 py-1.5 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8]"
            >
              مقارنة أسعار الفائدة ←
            </a>

            <a
              href="#calendar"
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-1.5 text-center text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
            >
              تقويم الاجتماعات ←
            </a>

            <a
              href="#history"
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-1.5 text-center text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
            >
              سجل القرارات ←
            </a>
          </div>
        </div>
      </div>

      {/* CENTRAL BANK RATES PANEL */}
      <aside className="w-full max-w-[510px] justify-self-center overflow-hidden rounded-[18px] border border-[#d6e5f8] bg-white p-3 shadow-[0_10px_30px_rgba(30,91,184,0.07)] lg:justify-self-end">

        {/* PANEL HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-black text-[#2471df]">
              لوحة متابعة السياسة النقدية
            </p>

            <h2 className="mt-0.5 text-base font-black text-[#091b32]">
              أسعار البنوك الرئيسية
            </h2>
          </div>

          <span className="rounded-full border border-blue-100 bg-[#eef5fd] px-2.5 py-1 text-[9px] font-black text-[#1e5bb8]">
            بيانات منشورة
          </span>
        </div>

        {/* BANK RATES */}
        <div className="mt-3 space-y-2 lg:mt-2 lg:space-y-1.5">
          {["fed", "ecb", "boe", "boj"]
            .map((slug) => banks.find((bank) => bank.slug === slug))
            .filter((bank): bank is Bank => !!bank)
            .map((bank) => (
              <Link
                key={bank.slug}
                href={`/interest-rates/${bank.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[49px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#f8fbff] px-3 py-2 transition hover:border-blue-300 hover:bg-[#eef5fd] hover:shadow-sm lg:min-h-0 lg:rounded-lg lg:px-2.5 lg:py-1.5"
              >
                <div className="flex min-w-0 items-center gap-2">

                  {/* MOBILE: REAL FLAG / DESKTOP: ORIGINAL MARK */}
                  <div className="lg:hidden">
                    <BankMark bank={bank} />
                  </div>

                  <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white text-xs font-black text-[#1e5bb8] lg:flex">
                    {bank.flag_emoji || bankCurrency(bank)}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[11px] font-black leading-5 text-[#091b32] transition group-hover:text-[#2471df] sm:text-xs">
                      {bankShortName(bank)}
                    </div>

                    <div
                      dir="ltr"
                      className="text-right text-[9px] leading-4 text-slate-400"
                    >
                      {bankCurrency(bank)}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    dir="ltr"
                    className="text-[15px] font-black text-[#2471df] sm:text-base lg:text-sm"
                  >
                    {rateLabel(bank)}
                  </span>

                  <span className="text-[10px] text-blue-400 transition group-hover:-translate-x-1">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
        </div>

        {/* NEXT MEETING */}
        {nextEvent && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-blue-100 bg-[#eef5fd] px-3 py-3 lg:mt-2 lg:flex-wrap lg:rounded-lg lg:px-2.5 lg:py-2">
            <div className="min-w-0">
              <p className="text-[9px] font-black text-[#2471df]">
                أقرب إعلان مجدول
              </p>

              <p className="mt-1 text-[11px] font-bold text-[#091b32] lg:mt-0.5">
                {bankShortName(nextEvent.bank)}
              </p>
            </div>

            <time
              dateTime={nextEvent.meeting.meeting_date}
              className="shrink-0 text-[11px] font-black text-[#1e5bb8]"
            >
              {dateAr(nextEvent.meeting.meeting_date)}
            </time>
          </div>
        )}

        {/* DATA NOTE */}
        <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3 lg:mt-2 lg:pt-2">
          <span className="shrink-0 text-[12px] text-blue-500 lg:text-[10px]">
            ⓘ
          </span>

          <p className="text-[10px] leading-[1.8] text-slate-500 lg:text-[9px] lg:leading-4">
            الأسعار مستمدة من البيانات المنشورة وليست بثًا مباشرًا لحظيًا.
            يمكن الضغط على اسم أي بنك للاطلاع على التفاصيل.
          </p>
        </div>
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
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-12 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* SECTION INTRO */}
    <div className="mb-4 text-right sm:mb-6">
      <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32] sm:text-[32px] sm:leading-[1.35] lg:text-[36px]">
        أسعار الفائدة الحالية حسب البنك المركزي
      </h2>

      {/* MOBILE DESCRIPTION */}
      <p className="mt-2 text-right text-[12px] font-medium leading-[1.9] text-slate-600 sm:hidden">
        قارن أسعار الفائدة لدى 8 بنوك مركزية عالمية،
        وتعرّف على آخر قراراتها ومواعيد اجتماعاتها
        القادمة، مع روابط المصادر الرسمية.
      </p>

      {/* TABLET AND DESKTOP DESCRIPTION — UNCHANGED */}
      <p className="mt-2 hidden text-justify text-[13px] font-medium leading-7 text-slate-600 sm:block sm:text-[15px] sm:leading-8">
        {comparisonIntro}
      </p>
    </div>

    {/* CENTRAL BANK COMPARISON TABLE */}
    <RateTable banks={banks} today={today} />

    {/* ADDITIONAL INFORMATION — DESKTOP UNCHANGED */}
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
  className="scroll-mt-20 bg-white pt-5 pb-8 sm:pt-7 sm:pb-10"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    
{/* MOBILE HEADING ONLY */}
<div className="mb-4 text-right sm:hidden">
  <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32]">
    مواعيد اجتماعات البنوك المركزية
  </h2>

  <p className="mt-2 text-[12px] leading-[1.85] text-slate-600">
    تابع مواعيد قرارات الفائدة القادمة للبنوك المركزية
    العالمية، مع توقيت الإعلان وروابط التقويم الرسمي.
  </p>
</div>

{/* TABLET AND DESKTOP — UNCHANGED */}
<div className="hidden sm:block">
  <SectionHeading
    eyebrow="التقويم الاقتصادي"
    title="جدول اجتماعات البنوك المركزية 2026–2027"
    description={meetingsIntro}
  />
</div>


    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:rounded-[28px]">

      {/* HEADER AND FILTERS */}
      <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 p-4 sm:p-6">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>
            <h3 className="text-lg font-black sm:text-2xl">
              تقويم قرارات أسعار الفائدة
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              جميع الإعلانات المستقبلية المسجلة حتى آخر تاريخ متاح
            </p>
          </div>

          {/* DYNAMIC COUNTER */}
          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-[#2471df] px-3 py-2 text-[11px] font-black text-white">
              عرض {visibleMeetings.length} من أصل{" "}
              {filteredMeetings.length} اجتماعًا
            </span>

            {(selectedBank !== "all" ||
              selectedYear !== "all") && (
              <span className="rounded-full border border-blue-200 bg-white px-3 py-2 text-[10px] font-black text-[#1e5bb8]">
                إجمالي التقويم: {allMeetings.length}
              </span>
            )}

          </div>
        </div>

        {/* EXISTING FILTER COMPONENT */}
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

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">

        <table className="w-full table-fixed text-center">

          <thead className="bg-[#0b2949] text-white">
            <tr className="text-xs">

              <th className="w-[27%] px-4 py-4 text-right">
                البنك المركزي
              </th>

              <th className="w-[10%] px-3 py-4">
                العملة
              </th>

              <th className="w-[19%] px-3 py-4">
                تاريخ الإعلان
              </th>

              <th className="w-[14%] px-3 py-4">
                الوقت UTC
              </th>

              <th className="w-[12%] px-3 py-4">
                حالة الموعد
              </th>

              <th className="w-[18%] px-3 py-4">
                التقويم الرسمي
              </th>

            </tr>
          </thead>

          <tbody>
            {visibleMeetings.map(
              ({ bank, meeting }, index) => (
                <tr
                  key={`${bank.slug}-${
                    meeting.id || meeting.meeting_date
                  }`}
                  className={`border-t border-slate-200 transition hover:bg-blue-50/60 ${
                    index % 2
                      ? "bg-slate-50"
                      : "bg-white"
                  }`}
                >

                  {/* CLICKABLE BANK IDENTITY */}
                  <td className="px-4 py-3.5 text-right">

                    <Link
                      href={`/interest-rates/${bank.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`عرض صفحة ${bankName(bank)}`}
                      aria-label={`عرض تفاصيل ${bankName(bank)} في تبويب جديد`}
                      className="group inline-flex max-w-full items-center rounded-xl p-1 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                    >
                      <div className="[&_.font-black]:group-hover:text-[#2471df]">
                        <BankIdentity bank={bank} compact />
                      </div>
                    </Link>

                  </td>

                  {/* CURRENCY */}
                  <td
                    dir="ltr"
                    className="px-3 py-3.5 text-center text-xs font-black text-slate-600"
                  >
                    {bankCurrency(bank)}
                  </td>

                  {/* ANNOUNCEMENT DATE */}
                  <td className="px-3 py-3.5 text-center text-xs font-black">
                    <time dateTime={meeting.meeting_date}>
                      {dateAr(meeting.meeting_date)}
                    </time>
                  </td>

                  {/* ANNOUNCEMENT TIME */}
                  <td
                    dir="ltr"
                    className="px-3 py-3.5 text-center text-xs font-bold text-slate-600"
                  >
                    {meeting.announcement_at
                      ? `${meeting.announcement_at.slice(11, 16)} UTC`
                      : "غير محدد"}
                  </td>

                  {/* MEETING STATUS */}
                  <td className="px-3 py-3.5 text-center">
                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                      مجدول
                    </span>
                  </td>

                  {/* OFFICIAL CALENDAR */}
                  <td className="px-3 py-3.5 text-center">
                    <SourceLink
                      href={
                        safeUrl(
                          meeting.reference_calendar_url
                        ) || calendarSource(bank)
                      }
                      label="التقويم الرسمي"
                    />
                  </td>

                </tr>
              )
            )}
          </tbody>

        </table>
      </div>

      {/* MOBILE AND TABLET */}
      <div className="divide-y divide-slate-200 md:hidden">

        {mobileVisibleMeetings.map(
          ({ bank, meeting }) => (
            <article
              key={`${bank.slug}-${
                meeting.id || meeting.meeting_date
              }`}
              className="p-4"
            >

              <div className="flex items-start justify-between gap-3">

                {/* CLICKABLE BANK IDENTITY */}
                <Link
                  href={`/interest-rates/${bank.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`عرض صفحة ${bankName(bank)}`}
                  aria-label={`عرض تفاصيل ${bankName(bank)} في تبويب جديد`}
                  className="group min-w-0 rounded-xl p-1 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <div className="[&_.font-black]:group-hover:text-[#2471df]">
                    <BankIdentity bank={bank} compact />
                  </div>
                </Link>

                {/* DATE AND TIME */}
                <div className="shrink-0 text-left">

                  <time
                    dateTime={meeting.meeting_date}
                    className="text-[11px] font-black text-[#1e5bb8]"
                  >
                    {dateAr(meeting.meeting_date)}
                  </time>

                  <p
                    dir="ltr"
                    className="mt-1 text-[10px] text-slate-500"
                  >
                    {meeting.announcement_at
                      ? `${meeting.announcement_at.slice(11, 16)} UTC`
                      : "الوقت غير محدد"}
                  </p>

                </div>
              </div>

              {/* STATUS AND OFFICIAL SOURCE */}
              <div className="mt-3 flex items-center justify-between gap-2">

                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                  إعلان مجدول
                </span>

                <SourceLink
                  href={
                    safeUrl(
                      meeting.reference_calendar_url
                    ) || calendarSource(bank)
                  }
                  label="التقويم الرسمي"
                />

              </div>

            </article>
          )
        )}

      </div>

      {/* SHOW MORE / SHOW LESS */}
      {filteredMeetings.length > 15 && (
        <div className="flex justify-center border-t border-slate-200 bg-white px-4 py-5">

          
{/* SHOW MORE / SHOW LESS */}
{filteredMeetings.length > 5 && (
  <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">

    {/* MOBILE: FIRST 5 MEETINGS */}
    <div className="md:hidden">
      <Link
        href={
          showAllMeetings
            ? `${PAGE}?bank=${selectedBank}&year=${selectedYear}#calendar`
            : `${PAGE}?bank=${selectedBank}&year=${selectedYear}&show_all=1#calendar`
        }
        className="flex min-h-11 w-full items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-[12px] font-black text-[#1e5bb8] transition hover:bg-blue-100"
      >
        {showAllMeetings
          ? "عرض أول 5 اجتماعات ↑"
          : `عرض جميع الاجتماعات (${filteredMeetings.length}) ←`}
      </Link>
    </div>

    {/* DESKTOP: KEEP ORIGINAL 15-MEETING LIMIT */}
    {filteredMeetings.length > 15 && (
      <div className="hidden justify-center md:flex">
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

  </div>
)}


        </div>
      )}

      {/* EMPTY STATE */}
      {!filteredMeetings.length && (
        <div className="p-5">
          <EmptyState text="لا توجد اجتماعات مطابقة للفلاتر المحددة." />
        </div>
      )}

      {/* DATA NOTE */}
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-[11px] leading-7 text-slate-600 sm:px-7">
        تعرض الأوقات بتوقيت UTC عند توفرها.
        مواعيد الاجتماعات المستقبلية قابلة للتغيير،
        ولا يعني انعقاد الاجتماع بالضرورة تغيير سعر الفائدة.
        يشير تاريخ الاجتماع المعروض إلى تاريخ القرار المسجل.
      </div>

    </div>
  </div>
</section>


      {/* HISTORY + CHART */}
<section
  id="history"
  className="scroll-mt-20 bg-[#f4f7fb] pt-5 pb-8 sm:pt-7 sm:pb-10"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
    
{/* MOBILE HEADING ONLY */}
<div className="mb-4 text-right sm:hidden">
  <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32]">
    تاريخ أسعار الفائدة
  </h2>

  <p className="mt-2 text-[12px] leading-[1.85] text-slate-600">
    استعرض تطور أسعار الفائدة وقرارات الرفع والخفض
    والتثبيت عبر الرسم البياني والسجل التاريخي.
  </p>
</div>

{/* TABLET AND DESKTOP — UNCHANGED */}
<div className="hidden sm:block">
  <SectionHeading
    eyebrow="البيانات التاريخية"
    title="تاريخ تغير أسعار الفائدة للبنوك المركزية"
    description={historyIntro}
  />
</div>


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

      {/* RECENT DECISIONS — LAST 5 */}
<section
  id="decisions"
  className="scroll-mt-20 bg-white pb-8 pt-5 sm:pb-10 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
    <SectionHeading
      title="آخر 5 قرارات لأسعار الفائدة"
      description="تابع أحدث خمسة قرارات مسجلة لدى البنوك المركزية العالمية، مرتبة من الأحدث إلى الأقدم، مع مقارنة سعر الفائدة قبل القرار وبعده."
    />

    {recentDecisions.length > 0 ? (
      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-5">
          <span className="text-xs font-black text-slate-700">
            أحدث القرارات المسجلة
          </span>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
            {recentDecisions.length} قرارات
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {recentDecisions.map(({ bank, row }) => (
            <article
              key={`${bank.slug}-${row.date}`}
              className="px-4 py-4 transition hover:bg-blue-50/40 sm:px-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/interest-rates/${bank.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-w-0 rounded-lg transition hover:text-blue-700"
                >
                  <div className="[&_.font-black]:group-hover:text-blue-700">
                    <BankIdentity bank={bank} compact />
                  </div>
                </Link>

                <span
                  className={`inline-flex shrink-0 items-center rounded-lg border px-3 py-1.5 text-[11px] font-black ${
                    row.changeBps == null
                      ? "border-slate-200 bg-slate-50 text-slate-600"
                      : row.changeBps > 0
                      ? "border-rose-200 bg-rose-50 text-rose-700"
                      : row.changeBps < 0
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-blue-200 bg-blue-50 text-blue-700"
                  }`}
                >
                  {changeLabel(row.changeBps)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-500">
                    تاريخ القرار
                  </p>
                  <p className="mt-1 text-[11px] font-black text-slate-900">
                    {dateAr(row.date)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-500">
                    السعر السابق
                  </p>
                  <p
                    dir="ltr"
                    className="mt-1 text-sm font-black text-slate-700"
                  >
                    {formatRate(row.previousRate)}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50/70 p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-500">
                    السعر الجديد
                  </p>
                  <p
                    dir="ltr"
                    className="mt-1 text-sm font-black text-[#1e5bb8]"
                  >
                    {formatRate(row.rate)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-500">
                    مقدار التغيير
                  </p>
                  <p
                    dir="ltr"
                    className={`mt-1 text-sm font-black ${changeClass(
                      row.changeBps
                    )}`}
                  >
                    {row.changeBps == null
                      ? "—"
                      : `${row.changeBps > 0 ? "+" : ""}${row.changeBps} bps`}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5">
          <p className="text-[11px] leading-6 text-slate-500">
            تعرض هذه القائمة آخر القرارات التاريخية المتاحة في قاعدة البيانات.
          </p>

          <a
            href="#history"
            className="text-[11px] font-black text-[#1e5bb8] transition hover:underline"
          >
            استعراض السجل التاريخي الكامل ←
          </a>
        </div>
      </div>
    ) : (
      <EmptyState text="لا توجد قرارات تاريخية منشورة حاليًا." />
    )}
  </div>
</section>

      


{/* BANK DIRECTORY */}
<section
  id="banks"
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-10 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* SECTION HEADING */}
    <div className="md:hidden mb-4 text-right">
      <h2 className="text-[21px] font-black leading-[1.45] tracking-tight text-[#071c34]">
        دليل البنوك المركزية
        <span className="block text-[#2471df]">
          وأسعار الفائدة العالمية
        </span>
      </h2>

      <p className="mt-2 text-[12px] leading-[1.85] text-slate-600">
        تعرف على أسعار الفائدة الحالية لدى 8 بنوك مركزية،
        ومواعيد قراراتها القادمة، مع إمكانية استعراض
        التفاصيل والسجل التاريخي لكل بنك.
      </p>
    </div>

    <div className="hidden md:block">
      <SectionHeading
        title="دليل البنوك المركزية العالمية وأسعار الفائدة"
        description="تعرف على أهم البنوك المركزية العالمية، بما فيها الاحتياطي الفيدرالي الأمريكي والبنك المركزي الأوروبي وبنك إنجلترا وبنك اليابان. استعرض أسعار الفائدة الحالية، وأهداف السياسة النقدية، ومواعيد الاجتماعات القادمة لكل بنك مركزي."
      />
    </div>

    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
      {banks.map((bank) => {
        const next = getNextMeeting(bank, today);
        const details = BANK_DETAILS[bank.slug];

        return (
          <article
            key={bank.slug}
            className="flex h-full min-w-0 flex-col rounded-[17px] border border-slate-200 bg-white p-3 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:rounded-[18px] sm:p-4"
          >
            {/* HEADER */}
            <div className="flex min-h-[42px] items-center justify-between gap-2 sm:min-h-[48px]">
              <Link
                href={`/interest-rates/${bank.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-1 items-center gap-2"
              >
                <BankMark bank={bank} large />

                <div className="min-w-0 flex-1 text-right">
                  <h3
                    className="text-[12px] font-black leading-[1.5] text-slate-950 transition group-hover:text-[#2471df] sm:truncate sm:text-[12px] sm:leading-5"
                    title={bankName(bank)}
                  >
                    {bankName(bank)}
                  </h3>

                  <p
                    dir="ltr"
                    className="mt-0.5 truncate text-right text-[9px] text-slate-500"
                  >
                    {details?.english}
                  </p>
                </div>
              </Link>

              <span
                dir="ltr"
                className="shrink-0 rounded-lg bg-blue-50 px-2 py-1.5 text-[12px] font-black text-[#1e5bb8] sm:py-2"
              >
                {rateLabel(bank)}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-2 min-h-[38px] overflow-hidden sm:mt-3 sm:h-[63px] sm:min-h-0">
              <p
                className="text-[11px] leading-[19px] text-slate-600 sm:leading-[21px]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                <span className="sm:hidden">
                  {details?.description}
                </span>
                <span className="hidden sm:inline">
                  {details?.description}
                </span>
              </p>
            </div>

            {/* NEXT MEETING */}
            <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5 sm:mt-3 sm:py-3">
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500">
                  موعد القرار القادم
                </p>

                <p className="mt-0.5 text-[11px] font-black text-slate-900 sm:mt-1">
                  {next
                    ? dateAr(next.meeting_date)
                    : "لم يُعلن"}
                </p>
              </div>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white text-[#2471df] sm:h-8 sm:w-8">
                ◷
              </span>
            </div>

            {/* BUTTONS */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3">
              <Link
                href={`/interest-rates/${bank.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-2 py-2 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8] sm:text-[10px]"
              >
                تفاصيل البنك ↗
              </Link>

              <Link
                href={`${PAGE}?history_bank=${bank.slug}#history`}
                className="flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-2 py-2 text-center text-[11px] font-black text-blue-700 transition hover:bg-blue-100 sm:text-[10px]"
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

  className="scroll-mt-20 bg-white pb-6 pt-4 sm:pb-10 sm:pt-7"

>

  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
    <div className="hidden md:block">


    <SectionHeading

      title="ما هي أسعار الفائدة وكيف تحددها البنوك المركزية؟"

      description="فهم أسعار الفائدة لا يقتصر على معرفة النسبة الحالية، بل يشمل طريقة اتخاذ القرار وتوقعات الأسواق ومسار السياسة النقدية."

    />



    {/* MAIN EDUCATIONAL CONTENT */}

    <div className="grid items-stretch gap-5 lg:grid-cols-[1.45fr_0.55fr]">

      <article className="flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 p-5 sm:p-6">

          <h3 className="text-[19px] font-black leading-8 text-slate-950 sm:text-[22px]">

            كيف يعمل سعر الفائدة المرجعي؟

          </h3>



          <p className="mt-3 text-[13px] leading-7 text-slate-700 sm:text-[14px] sm:leading-8">

            سعر الفائدة هو النسبة التي تُستخدم لتحديد تكلفة

            الاقتراض أو العائد على بعض أنواع الادخار. وتحدد

            البنوك المركزية أسعارًا مرجعية تؤثر في تكلفة

            التمويل داخل الاقتصاد، لكنها لا تعني بالضرورة

            أن جميع القروض والودائع تُسعّر بالنسبة نفسها.

          </p>



          <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">

            تستخدم البنوك المركزية أسعار الفائدة للتأثير

            في تكلفة الاقتراض والسيولة والطلب داخل الاقتصاد.

            وقد يؤدي تشديد السياسة النقدية إلى إبطاء النشاط

            الاقتصادي والحد من الضغوط التضخمية، بينما قد

            يهدف خفض الفائدة إلى دعم التمويل والإنفاق عندما

            تسمح الظروف الاقتصادية بذلك.

          </p>



          <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">

            لكن البنوك المركزية لا تتخذ قراراتها بناءً على

            التضخم وحده؛ إذ تتابع التوظيف والأجور والنمو

            والائتمان والتوقعات الاقتصادية. كما تختلف

            الأدوات النقدية بين الولايات المتحدة ومنطقة

            اليورو واليابان وغيرها من الاقتصادات.

          </p>

        </div>



        {/* FOUR DECISION STAGES */}

        <div className="grid flex-1 auto-rows-fr gap-3 p-4 sm:grid-cols-2 sm:p-5">

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

              className="flex h-full flex-col rounded-[15px] border border-slate-200 bg-slate-50 p-4"

            >

              <div className="flex items-center gap-3">

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-[#2471df]">

                  {item.n}

                </span>



                <h4 className="text-[14px] font-black leading-6 text-slate-950 sm:text-[15px]">

                  {item.title}

                </h4>

              </div>



              <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:text-[13px] sm:leading-7">

                {item.text}

              </p>

            </div>

          ))}

        </div>

      </article>



      {/* TRADER CHECKLIST */}

      <aside className="flex h-full min-w-0 flex-col rounded-[20px] bg-[#071c34] p-5 text-white shadow-lg sm:p-6">

        <h3 className="text-[19px] font-black leading-8 sm:text-[21px]">

          ماذا تراجع قبل صدور قرار الفائدة؟

        </h3>



        <p className="mt-2 text-[12px] leading-7 text-slate-300 sm:text-[13px]">

          لا تعتمد على السعر المعلن وحده. قارن النتيجة

          بالتوقعات وانتبه إلى الرسائل المصاحبة للقرار.

        </p>



        <div className="mt-4 flex-1">

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

              className="flex items-center gap-2.5 border-b border-white/10 py-2.5 last:border-0"

            >

              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[11px] font-black text-cyan-300">

                ✓

              </span>



              <span className="text-[12px] font-bold leading-6 text-slate-200 sm:text-[13px]">

                {item}

              </span>

            </div>

          ))}

        </div>

      </aside>

    </div>



    {/* EDUCATIONAL QUESTIONS */}

    <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-2">

      <article className="h-full rounded-[20px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-6">

        <h3 className="text-[17px] font-black leading-7 text-slate-950 sm:text-[19px]">

          ما الفرق بين رفع الفائدة وخفضها وتثبيتها؟

        </h3>



        <p className="mt-3 text-[13px] leading-8 text-slate-600 sm:text-[14px]">

          <strong className="text-slate-900">

            رفع الفائدة:

          </strong>{" "}

          يشير غالبًا إلى تشديد السياسة النقدية وزيادة

          تكلفة الاقتراض.{" "}

          <strong className="text-slate-900">

            خفض الفائدة:

          </strong>{" "}

          يشير غالبًا إلى تيسير الظروف النقدية. أما{" "}

          <strong className="text-slate-900">

            التثبيت

          </strong>{" "}

          فلا يعني بالضرورة الحياد، فقد يبقي البنك

          الفائدة مرتفعة مع التحذير من التضخم أو يلمح

          إلى خفض قادم.

        </p>

      </article>



      <article className="h-full rounded-[20px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-6">

        <h3 className="text-[17px] font-black leading-7 text-slate-950 sm:text-[19px]">

          لماذا تكون توقعات السوق أهم من القرار أحيانًا؟

        </h3>



        <p className="mt-3 text-[13px] leading-8 text-slate-600 sm:text-[14px]">

          عندما تتوقع الأسواق خفض الفائدة بمقدار 25 نقطة

          أساس ويأتي القرار مطابقًا، قد يكون أثره محدودًا.

          أما إذا فاجأ البنك الأسواق بقرار مختلف أو بتوجيه

          غير متوقع، فقد تتحرك العملات والسندات والذهب

          بقوة حتى دون تغيير كبير في السعر المعلن.

        </p>

      </article>

    </div>



    {/* ADDITIONAL SUPABASE CONTENT */}

    {hub?.hub_educational_content_ar?.trim() && (

      <div className="mt-5 rounded-[20px] border border-slate-200 bg-blue-50/40 p-5 sm:p-6">

        <h3 className="text-[18px] font-black leading-8 text-slate-950">

          معلومات إضافية عن السياسة النقدية

        </h3>



        <div className="mt-3 space-y-3">

          {hub.hub_educational_content_ar

            .trim()

            .split(/\n\s*\n/)

            .filter((paragraph) => paragraph.trim())

            .map((paragraph, index) => (

              <p

                key={index}

                className="whitespace-pre-line text-[13px] leading-8 text-slate-700 sm:text-[14px]"

              >

                {paragraph.trim()}

              </p>

            ))}

        </div>

      </div>

    )}

  
    </div>

    {/* MOBILE EDUCATIONAL GUIDE */}
    <div className="md:hidden" dir="rtl">
      <header className="mb-4 text-right">
        <h2 className="text-[21px] font-black leading-[1.45] text-[#071c34]">
          ما هي أسعار الفائدة وكيف تحددها البنوك المركزية؟
        </h2>
        <p className="mt-2 text-[12px] leading-6 text-slate-600">
          تعرف على آلية قرارات الفائدة والعوامل التي تراقبها البنوك المركزية.
        </p>
      </header>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-blue-50/60 p-4">
          <h3 className="text-[16px] font-black text-slate-950">كيف يعمل سعر الفائدة المرجعي؟</h3>
          <p className="mt-2 text-[12px] leading-7 text-slate-700">
            سعر الفائدة هو النسبة التي تؤثر في تكلفة الاقتراض وعوائد الادخار.
            وتستخدمه البنوك المركزية للمساعدة في ضبط التضخم والنشاط الاقتصادي.
          </p>
          <details className="group mt-2 border-t border-blue-100 pt-2">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-black text-[#2471df] [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">عرض الشرح الكامل</span>
              <span className="hidden group-open:inline">عرض أقل</span>
              <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-3 space-y-3 text-[12px] leading-7 text-slate-600">
              <p>تحدد البنوك المركزية أسعارًا مرجعية تؤثر في تكلفة التمويل داخل الاقتصاد، لكنها لا تعني بالضرورة أن جميع القروض والودائع تُسعّر بالنسبة نفسها.</p>
              <p>قد يؤدي تشديد السياسة النقدية إلى إبطاء النشاط الاقتصادي والحد من الضغوط التضخمية، بينما قد يهدف خفض الفائدة إلى دعم التمويل والإنفاق عندما تسمح الظروف الاقتصادية بذلك.</p>
              <p>لا تعتمد القرارات على التضخم وحده؛ إذ تتابع البنوك التوظيف والأجور والنمو والائتمان والتوقعات الاقتصادية، وتختلف أدواتها بين الاقتصادات.</p>
            </div>
          </details>
        </div>
        <div className="p-3">
          <h4 className="mb-3 text-[13px] font-black text-slate-900">كيف يُتخذ قرار الفائدة؟</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { n: "01", title: "تقييم التضخم", text: "مراجعة الأسعار والتوقعات." },
              { n: "02", title: "النمو والتوظيف", text: "تحليل سوق العمل والنشاط." },
              { n: "03", title: "قرار الفائدة", text: "رفع أو خفض أو تثبيت." },
              { n: "04", title: "التوجيه القادم", text: "قراءة البيان والتوقعات." },
            ].map((item) => (
              <div key={item.n} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-100 px-1.5 py-1 text-[10px] font-black text-blue-700">{item.n}</span>
                  <span className="text-[11px] font-black text-slate-900">{item.title}</span>
                </div>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <aside className="mt-3 rounded-2xl bg-[#071c34] p-4 text-white shadow-sm">
        <h3 className="text-[15px] font-black">ماذا تراجع قبل قرار الفائدة؟</h3>
        <p className="mt-1 text-[11px] leading-6 text-slate-300">قارن القرار بتوقعات السوق، وليس بالسعر السابق فقط.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["السعر قبل الاجتماع", "توقعات السوق", "القرار وحجم التغيير", "بيان البنك"].map((item) => (
            <div key={item} className="flex items-start gap-1.5 rounded-lg bg-white/5 p-2 text-[10px] font-bold leading-5 text-slate-100">
              <span className="text-cyan-300">✓</span><span>{item}</span>
            </div>
          ))}
        </div>
        <details className="group mt-3 border-t border-white/15 pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-black text-cyan-200 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">عرض بقية نقاط المتابعة</span>
            <span className="hidden group-open:inline">عرض أقل</span>
            <span>⌄</span>
          </summary>
          <div className="mt-3 space-y-2 text-[11px] leading-6 text-slate-200">
            {["توقعات التضخم", "المؤتمر الصحفي للمحافظ", "توقعات الاجتماعات التالية", "التقلبات وفروق الأسعار وقت الخبر"].map((item) => (
              <p key={item}><span className="ml-2 text-cyan-300">✓</span>{item}</p>
            ))}
          </div>
        </details>
      </aside>

      <div className="mt-3 space-y-2">
        <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>ما الفرق بين رفع الفائدة وخفضها وتثبيتها؟</span>
            <span className="shrink-0 text-blue-700 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 border-t border-slate-200 pt-3 text-[12px] leading-7 text-slate-600">
            <strong>رفع الفائدة</strong> يشير غالبًا إلى تشديد السياسة النقدية وزيادة تكلفة الاقتراض.
            <strong> خفض الفائدة</strong> يشير غالبًا إلى تيسير الظروف النقدية.
            أما <strong>التثبيت</strong> فلا يعني بالضرورة الحياد؛ فقد يبقي البنك الفائدة مرتفعة أو يلمح إلى خفض قادم.
          </p>
        </details>
        <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>لماذا تكون توقعات السوق أهم من القرار أحيانًا؟</span>
            <span className="shrink-0 text-blue-700 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 border-t border-slate-200 pt-3 text-[12px] leading-7 text-slate-600">
            إذا جاء القرار مطابقًا لتوقعات السوق فقد يكون أثره محدودًا، بينما قد تؤدي مفاجأة في القرار أو التوجيه المستقبلي إلى تحركات قوية في العملات والسندات والذهب.
          </p>
        </details>
        {hub?.hub_educational_content_ar?.trim() && (
          <details className="group rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
              <span>معلومات إضافية عن السياسة النقدية</span>
              <span className="shrink-0 text-blue-700 group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 whitespace-pre-line border-t border-blue-100 pt-3 text-[12px] leading-7 text-slate-600">
              {hub.hub_educational_content_ar}
            </div>
          </details>
        )}
      </div>
    </div>

  </div>

</section>









{/* MARKET IMPACT + RELATED CONTENT */}

<section

  id="impact"

  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-12 sm:pt-7"

>

  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
    <div className="hidden md:block">


    <SectionHeading

      title="كيف تؤثر أسعار الفائدة على الفوركس والذهب والأسهم؟"

      description="تؤثر قرارات البنوك المركزية في العملات والمعادن والأسهم والسندات من خلال توقعات المستثمرين وتكلفة التمويل والعوائد. لكن اتجاه الأسواق يعتمد أيضًا على الظروف الاقتصادية ومدى مفاجأة القرار."

    />



    {/* FOUR MARKET CATEGORIES */}

    <div className="grid auto-rows-fr gap-3 md:grid-cols-2 xl:grid-cols-4">

      {[

        {

          icon: "↗",

          title: "الفوركس والعملات",

          text: "تؤثر فروق الفائدة المتوقعة بين الاقتصادات في جاذبية العملات وتدفقات رؤوس الأموال، وتظل توقعات القرارات القادمة عاملًا أساسيًا في تحركات السوق.",

          accent: "blue",

        },

        {

          icon: "◇",

          title: "الذهب والمعادن",

          text: "يتأثر الذهب بالعوائد الحقيقية والدولار والتضخم والمخاطر العالمية. لذلك لا توجد علاقة ثابتة ومضمونة بين قرارات الفائدة واتجاه سعر الذهب.",

          accent: "amber",

        },

        {

          icon: "▥",

          title: "الأسهم والمؤشرات",

          text: "قد تؤثر تكلفة الاقتراض ومعدلات الخصم وتوقعات الأرباح في تقييم الأسهم والمؤشرات، مع اختلاف التأثير بين الشركات والقطاعات الاقتصادية.",

          accent: "indigo",

        },

        {

          icon: "≋",

          title: "السندات والعوائد",

          text: "تعكس عوائد السندات توقعات أسعار الفائدة والتضخم والمخاطر. وقد تتفاعل السندات قصيرة الأجل وطويلة الأجل بصورة مختلفة مع القرار.",

          accent: "cyan",

        },

      ].map((item) => {

        const accentClasses: Record<string, string> = {

          blue: "bg-blue-50 text-blue-700 border-blue-100",

          amber: "bg-amber-50 text-amber-700 border-amber-100",

          indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",

          cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",

        };



        return (

          <article

            key={item.title}

            className="flex h-full min-w-0 flex-col rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5"

          >

            <div className="flex items-center gap-3">

              <span

                aria-hidden="true"

                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[22px] font-black ${

                  accentClasses[item.accent]

                }`}

              >

                {item.icon}

              </span>



              <h3 className="text-[15px] font-black leading-6 text-slate-950 sm:text-[16px]">

                {item.title}

              </h3>

            </div>



            <p className="mt-3 text-[12px] leading-7 text-slate-600 sm:text-[13px]">

              {item.text}

            </p>

          </article>

        );

      })}

    </div>



    {/* DEEPER ANALYSIS */}

    <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">

      <article className="h-full rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-3 flex items-center gap-2.5">

          <span

            aria-hidden="true"

            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-[#2471df]"

          >

            $

          </span>



          <h3 className="text-[16px] font-black leading-7 text-slate-950 sm:text-[18px]">

            كيف تؤثر الفائدة الأمريكية على الدولار؟

          </h3>

        </div>



        <p className="text-[13px] leading-8 text-slate-600 sm:text-[14px]">

          تؤثر توقعات الفائدة الأمريكية في عوائد الأصول

          المقومة بالدولار. وقد يستفيد الدولار من ارتفاع

          العوائد المتوقعة، لكن النتيجة تعتمد على المقارنة

          مع الاقتصادات الأخرى وعلى شهية المخاطرة وتوقعات

          النمو. لذلك فإن قرار الفيدرالي وحده لا يكفي

          لتحديد اتجاه الدولار.

        </p>

      </article>



      <article className="h-full rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-3 flex items-center gap-2.5">

          <span

            aria-hidden="true"

            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-[#2471df]"

          >

            ⇄

          </span>



          <h3 className="text-[16px] font-black leading-7 text-slate-950 sm:text-[18px]">

            كيف تؤثر فروق الفائدة على أزواج العملات؟

          </h3>

        </div>



        <p className="text-[13px] leading-8 text-slate-600 sm:text-[14px]">

          يقارن المتداولون أحيانًا مسار الفائدة المتوقع

          بين بنكين مركزيين، مثل الفيدرالي والأوروبي،

          لفهم اتجاه زوج EUR/USD. لكن الفرق الحالي بين

          السعرين لا يحدد حركة الزوج وحده؛ فالتوقعات

          المستقبلية والتضخم والنمو والمخاطر العالمية

          عناصر مؤثرة أيضًا.

        </p>

      </article>

    </div>



    {/* RELATED CONTENT - INTEGRATED */}

    <div className="mt-5 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-2 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">

        <h2 className="text-[18px] font-black leading-7 text-slate-950 sm:text-[20px]">

          واصل استكشاف الأسواق مع بروكر العرب

        </h2>



        <p className="text-[12px] leading-6 text-slate-500 sm:text-[13px]">

          انتقل من فهم تأثير أسعار الفائدة إلى تعلم التداول

          ومقارنة الوسطاء حسب الأسواق التي تتابعها.

        </p>

      </div>



      <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3 xl:grid-cols-5">

        {INTERNAL_LINKS.map((item) => (

          <Link

            key={item.href}

            href={item.href}

            className="group flex h-full min-w-0 flex-col rounded-[14px] border border-slate-200 bg-[#f8fafc] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"

          >

            <div className="flex items-center justify-between gap-2">

              <span className="text-[10px] font-bold text-slate-400">

                دليل بروكر العرب

              </span>



              <span

                aria-hidden="true"

                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[16px] font-bold text-[#2471df] ring-1 ring-slate-200 transition group-hover:bg-[#2471df] group-hover:text-white"

              >

                ←

              </span>

            </div>



            <h3 className="mt-3 text-[14px] font-black leading-6 text-slate-950 transition group-hover:text-[#1e5bb8]">

              {item.title}

            </h3>



            <p className="mt-2 flex-1 text-[12px] leading-6 text-slate-600">

              {item.description}

            </p>



            <span className="mt-3 text-[11px] font-black text-[#2471df]">

              اكتشف المزيد ←

            </span>

          </Link>

        ))}

      </div>

    </div>

  
    </div>

    {/* MOBILE MARKET IMPACT */}
    <div className="md:hidden" dir="rtl">
      <header className="mb-4 text-right">
        <h2 className="text-[21px] font-black leading-[1.45] text-[#071c34]">
          كيف تؤثر الفائدة على الأسواق؟
        </h2>
        <p className="mt-2 text-[12px] leading-6 text-slate-600">
          تعرف على تأثير قرارات البنوك المركزية في العملات والذهب والأسهم والسندات.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2.5">
        {[
          { icon: "↗", title: "الفوركس والعملات", short: "فروق الفائدة وتوقعات العملات", text: "تؤثر فروق الفائدة المتوقعة بين الاقتصادات في جاذبية العملات وتدفقات رؤوس الأموال، وتظل توقعات القرارات القادمة عاملًا أساسيًا في تحركات السوق.", color: "bg-blue-50 text-blue-700" },
          { icon: "◇", title: "الذهب والمعادن", short: "العوائد الحقيقية والدولار", text: "يتأثر الذهب بالعوائد الحقيقية والدولار والتضخم والمخاطر العالمية. لذلك لا توجد علاقة ثابتة ومضمونة بين قرارات الفائدة واتجاه سعر الذهب.", color: "bg-amber-50 text-amber-700" },
          { icon: "▥", title: "الأسهم والمؤشرات", short: "تكلفة التمويل وتقييم الأسهم", text: "قد تؤثر تكلفة الاقتراض ومعدلات الخصم وتوقعات الأرباح في تقييم الأسهم والمؤشرات، مع اختلاف التأثير بين الشركات والقطاعات الاقتصادية.", color: "bg-indigo-50 text-indigo-700" },
          { icon: "≋", title: "السندات والعوائد", short: "توقعات الفائدة والتضخم", text: "تعكس عوائد السندات توقعات أسعار الفائدة والتضخم والمخاطر. وقد تتفاعل السندات قصيرة الأجل وطويلة الأجل بصورة مختلفة مع القرار.", color: "bg-cyan-50 text-cyan-700" },
        ].map((item) => (
          <details key={item.title} className="group min-w-0 self-start rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex min-h-9 items-center gap-2">
  <span
    aria-hidden="true"
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg font-black ${item.color}`}
  >
    {item.icon}
  </span>

  <span className="min-w-0 flex-1 text-[11px] font-black leading-5 text-slate-950">
    {item.title}
  </span>
</div>
              <span className="mt-1 block text-[10px] leading-5 text-slate-500">{item.short}</span>
              <span className="mt-2 block border-t border-slate-100 pt-2 text-[10px] font-black text-blue-700">
                <span className="group-open:hidden">عرض التفاصيل ←</span>
                <span className="hidden group-open:inline">عرض أقل ↑</span>
              </span>
            </summary>
            <p className="mt-2 text-[11px] leading-6 text-slate-600">{item.text}</p>
          </details>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        <details className="group rounded-xl border border-slate-200 bg-white p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>كيف تؤثر الفائدة الأمريكية على الدولار؟</span>
            <span className="shrink-0 text-blue-700 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] leading-7 text-slate-600">
            تؤثر توقعات الفائدة الأمريكية في عوائد الأصول المقومة بالدولار. وقد يستفيد الدولار من ارتفاع العوائد المتوقعة، لكن النتيجة تعتمد على المقارنة مع الاقتصادات الأخرى وشهية المخاطرة وتوقعات النمو. لذلك لا يكفي قرار الفيدرالي وحده لتحديد اتجاه الدولار.
          </p>
        </details>
        <details className="group rounded-xl border border-slate-200 bg-white p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>كيف تؤثر فروق الفائدة على أزواج العملات؟</span>
            <span className="shrink-0 text-blue-700 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] leading-7 text-slate-600">
            يقارن المتداولون مسار الفائدة المتوقع بين بنكين مركزيين، مثل الفيدرالي والأوروبي، لفهم اتجاه EUR/USD. لكن فرق السعر الحالي لا يحدد حركة الزوج وحده؛ فالتوقعات والتضخم والنمو والمخاطر العالمية مؤثرة أيضًا.
          </p>
        </details>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <h2 className="text-[16px] font-black text-slate-950">واصل استكشاف الأسواق مع بروكر العرب</h2>
          <p className="mt-1 text-[11px] leading-6 text-slate-500">أدلة ومقارنات تساعدك على فهم الأسواق واختيار الوسيط.</p>
        </div>
        <div className="divide-y divide-slate-100 px-3">
          {INTERNAL_LINKS.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <h3 className="text-[12px] font-black text-slate-950">{item.title}</h3>
                <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">{item.description}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-sm font-black text-blue-700">←</span>
            </Link>
          ))}
          {INTERNAL_LINKS.length > 3 && (
            <details className="group py-3">
              <summary className="cursor-pointer list-none text-center text-[11px] font-black text-blue-700 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">عرض بقية الأدلة ←</span>
                <span className="hidden group-open:inline">عرض أقل ↑</span>
              </summary>
              <div className="mt-2 divide-y divide-slate-100">
                {INTERNAL_LINKS.slice(3).map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between gap-2 py-3">
                    <div className="min-w-0">
                      <h3 className="text-[12px] font-black text-slate-950">{item.title}</h3>
                      <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">{item.description}</p>
                    </div>
                    <span className="text-blue-700">←</span>
                  </Link>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>

  </div>

</section>





{/* FAQ */}
<section
  id="faq"
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-0 sm:pb-10 sm:pt-0"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* MOBILE FAQ */}
    <div className="md:hidden">
      <div className="mb-4 text-right">
        <h2 className="text-[21px] font-black leading-[1.5] text-slate-950">
          الأسئلة الشائعة حول أسعار الفائدة
        </h2>
        <p className="mt-1.5 text-[11px] leading-6 text-slate-500">
          إجابات لأهم الأسئلة حول قرارات البنوك المركزية وتأثيرها على الأسواق.
        </p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <details
            key={`${index}-${faq.q}`}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white open:border-blue-200 open:shadow-sm"
          >
            <summary className="flex min-h-[53px] cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-right marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1 text-[11.5px] font-black leading-5 text-slate-900 group-open:text-[#1e5bb8]">
                {faq.q}
              </span>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-lg font-bold text-[#2471df] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="border-t border-slate-100 bg-[#fbfdff] px-3.5 py-3.5">
              <p className="text-[12px] leading-7 text-slate-600">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>

    {/* DESKTOP FAQ — ORIGINAL */}
    <div className="hidden md:block">
      <div className="mb-5 text-right sm:mb-6">
        <h2 className="text-[23px] font-black leading-tight text-slate-950 sm:text-[29px]">
          الأسئلة الشائعة حول أسعار الفائدة
        </h2>

        <p className="mt-2 text-[12px] leading-7 text-slate-500 sm:text-[14px]">
          إجابات مباشرة عن أسعار الفائدة العالمية ومواعيد قرارات
          البنوك المركزية وتأثيرها على الأسواق.
        </p>
      </div>

      <div className="grid items-start gap-3 lg:grid-cols-2">
        {faqs.map((faq, index) => (
          <details
            key={`${index}-${faq.q}`}
            className="group min-w-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm transition-colors duration-200 open:border-blue-200 open:shadow-md"
          >
            <summary className="flex min-h-[66px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right marker:hidden sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="text-[13px] font-black leading-6 text-slate-900 transition-colors group-open:text-[#1e5bb8] sm:text-[14px]">
                {faq.q}
              </span>

              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[19px] font-medium leading-none text-[#2471df] transition-transform duration-200 group-open:rotate-45 group-open:bg-blue-100"
              >
                +
              </span>
            </summary>

            <div className="border-t border-slate-100 bg-[#fbfdff] px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[13px] leading-8 text-slate-600 sm:text-[14px]">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>


{/* METHODOLOGY AND SOURCES */}
<section className="bg-white pb-8 pt-4 sm:pb-10 sm:pt-7">
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* MOBILE SOURCES */}
    <div className="md:hidden overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      {/* MOBILE HEADER */}
      <div className="border-b border-slate-200 bg-blue-50/70 px-4 py-5">
        <h2 className="text-[19px] font-black leading-7 text-slate-950">
          مصادر أسعار الفائدة
          <span className="block text-[#2471df]">
            ومنهجية البيانات
          </span>
        </h2>

        <p className="mt-2 text-[11.5px] leading-6 text-slate-600">
          نعتمد على بيانات البنوك المركزية الرسمية لعرض أسعار الفائدة
          ومواعيد الاجتماعات والقرارات النقدية.
        </p>

        <details className="group mt-3 rounded-xl border border-blue-100 bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="text-[11px] font-black text-[#1e5bb8]">
              عرض منهجية البيانات كاملة
            </span>
            <span className="text-sm font-black text-[#2471df] transition-transform group-open:rotate-180">
              ⌄
            </span>
          </summary>

          <div className="border-t border-blue-100 px-3 pb-3 pt-2">
            <p className="whitespace-pre-line text-[11.5px] leading-7 text-slate-600">
              {methodology}
            </p>
          </div>
        </details>
      </div>

      {/* MOBILE BANK SOURCES */}
      <div className="px-3.5 py-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-black text-slate-950">
            المصادر الرسمية للبنوك المركزية
          </h3>

          <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700">
            {banks.length} بنوك
          </span>
        </div>

        <div className="space-y-2">
          {banks.map((bank) => (
            <div
              key={bank.slug}
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2.5"
            >
              <h4 className="min-w-0 flex-1 text-right text-[11px] font-black leading-5 text-slate-900">
                {bankShortName(bank)}
              </h4>

              <div className="flex shrink-0 items-center gap-1.5 [&_a]:!inline-flex [&_a]:!min-h-8 [&_a]:!items-center [&_a]:!justify-center [&_a]:!rounded-lg [&_a]:!px-2 [&_a]:!py-1.5 [&_a]:!text-[10px]">
                <SourceLink
                  href={officialSource(bank)}
                  label="الفائدة"
                />
                <SourceLink
                  href={calendarSource(bank)}
                  label="الاجتماعات"
                />
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE DISCLAIMER */}
        <details className="group mt-4 overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3.5 py-3.5 marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="text-[12px] font-black text-amber-950">
              تنبيه بشأن دقة البيانات
            </span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-100 text-sm font-black text-amber-800 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="border-t border-amber-200 px-3.5 py-3">
            <p className="whitespace-pre-line text-[11.5px] leading-7 text-amber-900">
              {disclaimer}
            </p>
          </div>
        </details>

        <p className="mt-3 text-[10.5px] leading-6 text-slate-500">
          البيانات محفوظة في قاعدة بيانات الموقع وتُراجع بالرجوع
          إلى المصادر الرسمية. قد تتأخر التحديثات عن وقت صدور
          القرارات، ولا تعني مدة التحديث التقني مراجعة بشرية فورية.
        </p>
      </div>
    </div>

    {/* DESKTOP SOURCES — ORIGINAL */}
    <div className="hidden md:block">
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
  </div>
</section>

    </main>
  );
}
