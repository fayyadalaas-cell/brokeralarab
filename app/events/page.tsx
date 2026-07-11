import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "معارض ومؤتمرات الفوركس في 2026",
  description:
    "تابع أهم معارض ومؤتمرات الفوركس والتكنولوجيا المالية في 2026، مع مواعيد الفعاليات، أماكنها، وأهميتها للمتداولين وشركات الوساطة.",
};

export const revalidate = 3600;

type EventItem = {
  id: number;
  slug: string | null;
  title_ar: string | null;
  title_en: string | null;
  excerpt_ar: string | null;
  excerpt_en: string | null;
  category: string | null;
  start_date: string | null;
  end_date: string | null;
  venue_ar: string | null;
  venue_en: string | null;
  city_ar: string | null;
  city_en: string | null;
  country_ar: string | null;
  country_en: string | null;
  status: string | null;
  hero_image: string | null;
};

function formatDate(date?: string | null) {
  if (!date) return "سيتم الإعلان لاحقاً";

  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getDateRange(start?: string | null, end?: string | null) {
  if (!start) return "سيتم الإعلان لاحقاً";
  if (!end || end === start) return formatDate(start);

  const [startYear, startMonth, startDay] = start.split("-").map(Number);
  const [endYear, endMonth, endDay] = end.split("-").map(Number);

  if (startYear === endYear && startMonth === endMonth) {
    const monthAndYear = new Intl.DateTimeFormat("ar", {
      month: "long",
      year: "numeric",
    }).format(new Date(startYear, startMonth - 1, 1));

    return `${startDay} - ${endDay} ${monthAndYear}`;
  }

  if (startYear === endYear) {
    const startText = new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "long",
    }).format(new Date(startYear, startMonth - 1, startDay));

    const endText = new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(endYear, endMonth - 1, endDay));

    return `${startText} - ${endText}`;
  }

  return `${formatDate(start)} - ${formatDate(end)}`;
}

function getEventTimes(start?: string | null, end?: string | null) {
  if (!start) {
    return {
      status: "unknown" as const,
      days: "—",
      hours: "—",
    };
  }

  const now = new Date();

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = end
    ? new Date(`${end}T23:59:59`)
    : new Date(`${start}T23:59:59`);

  if (now > endDate) {
    return {
      status: "ended" as const,
      days: 0,
      hours: 0,
    };
  }

  if (now >= startDate && now <= endDate) {
    return {
      status: "live" as const,
      days: 0,
      hours: 0,
    };
  }

  const difference = startDate.getTime() - now.getTime();

  const days = Math.max(
    0,
    Math.floor(difference / (1000 * 60 * 60 * 24))
  );

  const hours = Math.max(
    0,
    Math.floor((difference / (1000 * 60 * 60)) % 24)
  );

  return {
    status: "upcoming" as const,
    days,
    hours,
  };
}

function normalizeEventTitle(title?: string | null) {
  return (title || "معرض تداول")
    .replace(/\s+/g, " ")
    .trim();
}

function getEventLocation(event: EventItem) {
  const city = event.city_ar?.trim();
  const country = event.country_ar?.trim();

  if (city && country) {
    return `${city}، ${country}`;
  }

  return city || country || "سيتم الإعلان عن الموقع لاحقاً";
}

function getEventVenue(event: EventItem) {
  return (
    event.venue_ar?.trim() ||
    event.venue_en?.trim() ||
    "سيتم الإعلان عن مكان الانعقاد لاحقاً"
  );
}

function EventCard({
  event,
  ended = false,
}: {
  event: EventItem;
  ended?: boolean;
}) {
  const countdown = getEventTimes(event.start_date, event.end_date);
  const eventTitle = normalizeEventTitle(event.title_ar);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[24px] border bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition duration-300 ${
        ended
  ? "border-slate-200 hover:border-slate-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)]"
          : "border-slate-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_rgba(15,23,42,0.09)]"
      }`}
    >
      {/* CARD HEADER */}
    <div
  className={`relative flex min-h-[92px] flex-col items-center justify-center overflow-hidden px-4 py-4 text-center md:min-h-[110px] md:px-5 md:py-5 ${
    ended
  ? "bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400"
  : "bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400"
  }`}
>
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_48%)]" />
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />

  <div className="relative">
          <div
            className={`mx-auto mb-1.5 inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black md:mb-2 md:px-3 md:text-[10px] ${
              ended
  ? "border-white/30 bg-white/20 text-white"
  : countdown.status === "live"
    ? "border-emerald-200/40 bg-emerald-300/20 text-white"
    : "border-white/25 bg-white/15 text-white"
            }`}
          >
            {ended
              ? "حدث منتهي"
              : countdown.status === "live"
                ? "جاري الآن"
                : "حدث قادم"}
          </div>

          <h2 className="mx-auto max-w-[260px] text-[17px] font-black leading-6 text-white md:max-w-none md:text-[20px] md:leading-7">
            {eventTitle}
          </h2>
        </div>
      </div>

      {/* COUNTDOWN */}
      {!ended && countdown.status === "live" ? (
        <div className="flex min-h-[86px] flex-col items-center justify-center border-b border-emerald-100 bg-emerald-50 px-4 text-center">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>

          <div className="mt-2 text-[20px] font-black text-emerald-700">
            الحدث منعقد حالياً
          </div>

          <div className="mt-1 text-[11px] font-bold text-emerald-600">
            يمكنك الاطلاع على تفاصيل الحدث والتغطيات
          </div>
        </div>
      ) : !ended ? (
        <div className="grid min-h-[72px] grid-cols-2 border-b border-slate-100 bg-[#f8fbff] md:min-h-[86px]">
          <div className="flex flex-col items-center justify-center border-l border-slate-100 px-3 py-3 text-center">
           <div className="text-[24px] font-black leading-none text-brand-600 md:text-[28px]">
              {countdown.days}
            </div>

            <div className="mt-1.5 text-[10px] font-black text-slate-500 md:mt-2 md:text-[11px]">
              يوم
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-3 py-3 text-center">
            <div className="text-[24px] font-black leading-none text-brand-600 md:text-[28px]">
  {countdown.hours}
</div>

            <div className="mt-1.5 text-[10px] font-black text-slate-500 md:mt-2 md:text-[11px]">
              ساعة
            </div>
          </div>
        </div>
      ) : (
       <div className="flex min-h-[62px] items-center justify-center border-b border-slate-100 bg-slate-50 px-4 py-2 text-center md:min-h-[72px]">
  <div>
    <div className="text-[11px] font-black text-slate-600 md:text-[13px]">
      انتهى بتاريخ
    </div>

    <div className="mt-1 text-[11px] font-bold text-slate-500 md:text-[12px]">
      {formatDate(event.end_date || event.start_date)}
    </div>
  </div>
</div>
      )}

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="line-clamp-3 min-h-[66px] text-center text-[12px] font-medium leading-6 text-slate-600 md:min-h-[84px] md:text-[13px] md:leading-7">
          {event.excerpt_ar ||
            "سيتم تحديث تفاصيل هذا الحدث والمعلومات الخاصة به قريباً."}
        </p>

        <div className="mt-4 space-y-2 md:mt-5 md:space-y-2.5">
          <div className="flex min-h-[46px] items-center gap-2.5 rounded-[14px] border border-slate-100 bg-slate-50 px-3 py-2.5 md:min-h-[52px] md:gap-3 md:rounded-2xl md:px-4 md:py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[12px] shadow-sm md:h-8 md:w-8 md:rounded-xl md:text-[14px]">
              📅
            </span>

            <div className="min-w-0">
              <div className="text-[9px] font-black text-slate-400 md:text-[10px]">
                تاريخ الحدث
              </div>

<div className="mt-0.5 text-[11px] font-black leading-5 text-slate-700 md:text-[12px]">
                {getDateRange(event.start_date, event.end_date)}
              </div>
            </div>
          </div>

          <div className="flex min-h-[46px] items-center gap-2.5 rounded-[14px] border border-slate-100 bg-slate-50 px-3 py-2.5 md:min-h-[52px] md:gap-3 md:rounded-2xl md:px-4 md:py-3">
           <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[12px] shadow-sm md:h-8 md:w-8 md:rounded-xl md:text-[14px]">
              📍
            </span>

            <div className="min-w-0">
              <div className="text-[9px] font-black text-slate-400 md:text-[10px]">
                المدينة والدولة
              </div>

              <div className="mt-0.5 text-[11px] font-black leading-5 text-slate-700 md:text-[12px]">
                {getEventLocation(event)}
              </div>
            </div>
          </div>

          <div className="flex min-h-[46px] items-center gap-2.5 rounded-[14px] border border-slate-100 bg-slate-50 px-3 py-2.5 md:min-h-[52px] md:gap-3 md:rounded-2xl md:px-4 md:py-3">
           <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[12px] shadow-sm md:h-8 md:w-8 md:rounded-xl md:text-[14px]">
              🏢
            </span>

            <div className="min-w-0">
              <div className="text-[9px] font-black text-slate-400 md:text-[10px]">
                مكان الانعقاد
              </div>

              <div className="mt-0.5 text-[11px] font-black leading-5 text-slate-700 md:text-[12px]">
                {getEventVenue(event)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 md:pt-5">
          <Link
            href={`/events/${event.slug}`}
            className={`flex min-h-[44px] w-full items-center justify-center rounded-[14px] px-4 py-2.5 text-[12px] font-black transition md:min-h-[48px] md:rounded-2xl md:py-3 md:text-[13px] ${
              ended
                ? "border border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:text-brand-600"
                : "bg-brand-500 text-white shadow-[0_12px_26px_rgba(37,99,235,0.20)] hover:-translate-y-0.5 hover:bg-brand-600"
            }`}
          >
            {ended ? "مشاهدة تفاصيل الحدث" : "عرض تفاصيل الحدث"}
          </Link>
        </div>
      </div>
    </article>
  );
}

function EndedEventRow({ event }: { event: EventItem }) {
  const eventTitle = normalizeEventTitle(event.title_ar);

  return (
    <article className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] md:grid md:grid-cols-[1.25fr_0.85fr_0.85fr_auto] md:items-stretch">
      {/* TITLE */}
      <div className="relative flex min-h-[150px] flex-col justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-6 py-5 text-right">
       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_48%)]" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-black text-white">
  حدث منتهي
</span>

          <h3 className="mt-3 text-[21px] font-black leading-8 text-white">
            {eventTitle}
          </h3>

          <p className="mt-2 line-clamp-2 text-[12px] font-medium leading-6 text-slate-300">
            {event.excerpt_ar ||
              "يمكنك مشاهدة معلومات الحدث وتفاصيل مكان الانعقاد."}
          </p>
        </div>
      </div>

      {/* DATE */}
      <div className="flex flex-col justify-center border-l border-slate-100 bg-slate-50 px-5 py-5">
        <span className="text-[10px] font-black text-slate-400">
          تاريخ الحدث
        </span>

        <div className="mt-2 text-[13px] font-black leading-6 text-slate-700">
          {getDateRange(event.start_date, event.end_date)}
        </div>
      </div>

      {/* LOCATION */}
      <div className="flex flex-col justify-center border-l border-slate-100 bg-slate-50 px-5 py-5">
        <span className="text-[10px] font-black text-slate-400">
          المكان
        </span>

        <div className="mt-2 text-[13px] font-black leading-6 text-slate-700">
          {getEventLocation(event)}
        </div>

        <div className="mt-1 text-[11px] font-semibold leading-5 text-slate-500">
          {getEventVenue(event)}
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex min-w-[190px] items-center justify-center px-5 py-5">
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-[13px] font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
        >
          مشاهدة تفاصيل الحدث
        </Link>
      </div>
    </article>
  );
}

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select(`
      id,
      slug,
      title_ar,
      title_en,
      excerpt_ar,
      excerpt_en,
      category,
      start_date,
      end_date,
      venue_ar,
      venue_en,
      city_ar,
      city_en,
      country_ar,
      country_en,
      status,
      hero_image
    `)
    .not("slug", "is", null)
    .order("start_date", { ascending: true });

  const eventList = ((events || []) as EventItem[]).filter(
    (event) => event.slug && event.title_ar
  );

  const now = new Date();

  const upcomingEvents = eventList
    .filter((event) => {
      if (!event.start_date) return true;

      const endDate = event.end_date
        ? new Date(`${event.end_date}T23:59:59`)
        : new Date(`${event.start_date}T23:59:59`);

      return endDate >= now;
    })
    .sort((a, b) => {
      if (!a.start_date) return 1;
      if (!b.start_date) return -1;

      return (
        new Date(`${a.start_date}T00:00:00`).getTime() -
        new Date(`${b.start_date}T00:00:00`).getTime()
      );
    });

  const endedEvents = eventList
    .filter((event) => {
      if (!event.start_date) return false;

      const endDate = event.end_date
        ? new Date(`${event.end_date}T23:59:59`)
        : new Date(`${event.start_date}T23:59:59`);

      return endDate < now;
    })
    .sort((a, b) => {
      const aDate = a.end_date || a.start_date || "1970-01-01";
      const bDate = b.end_date || b.start_date || "1970-01-01";

      return (
        new Date(`${bDate}T23:59:59`).getTime() -
        new Date(`${aDate}T23:59:59`).getTime()
      );
    });

  const nextEvent = upcomingEvents[0] || null;
  const nextCountdown = nextEvent
    ? getEventTimes(nextEvent.start_date, nextEvent.end_date)
    : null;
    const eventsByMonth = upcomingEvents.reduce<
  Record<string, EventItem[]>
>((groups, event) => {
  if (!event.start_date) {
    const key = "موعد غير محدد";

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(event);
    return groups;
  }

  const [year, month] = event.start_date.split("-").map(Number);

  const key = new Intl.DateTimeFormat("ar", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));

  if (!groups[key]) {
    groups[key] = [];
  }

  groups[key].push(event);
  return groups;
}, {});

    const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "معارض ومؤتمرات الفوركس في 2026",
  description:
    "دليل معارض ومؤتمرات الفوركس والتكنولوجيا المالية مع مواعيد الأحداث وأماكن الانعقاد.",
  url: "https://brokeralarab.com/events",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: eventList.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title_ar || event.title_en || "معرض تداول",
        startDate: event.start_date || undefined,
        endDate: event.end_date || event.start_date || undefined,
        eventStatus:
  getEventTimes(event.start_date, event.end_date).status === "ended"
    ? "https://schema.org/EventCompleted"
    : "https://schema.org/EventScheduled",
        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name:
            event.venue_ar ||
            event.venue_en ||
            "سيتم الإعلان عن مكان الانعقاد",
          address: {
            "@type": "PostalAddress",
            addressLocality: event.city_ar || event.city_en || undefined,
            addressCountry: event.country_ar || event.country_en || undefined,
          },
        },
        description:
          event.excerpt_ar ||
          event.excerpt_en ||
          "تفاصيل معرض ومؤتمر تداول.",
        url: `https://brokeralarab.com/events/${event.slug}`,
      },
    })),
  },
};

 return (
  <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventsJsonLd),
      }}
    />

    <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:rounded-[34px]">
         {/* HERO */}
<div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#eef5ff] via-white to-white">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-blue-200/25 blur-3xl" />
  </div>

  {/* MOBILE */}
  <div className="relative px-4 py-5 text-center md:hidden">
    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
      معارض ومؤتمرات التداول
    </span>

    <h1 className="mx-auto mt-3 max-w-[285px] text-[25px] font-black leading-[1.18] tracking-[-0.02em] text-slate-950">
      أهم معارض الفوركس في 2026
    </h1>

    <p className="mx-auto mt-3 max-w-[290px] text-[12px] font-semibold leading-6 text-slate-600">
      تابع مواعيد أهم معارض الفوركس والفنتك وأماكن انعقادها.
    </p>

    <div className="mx-auto mt-4 grid max-w-[300px] grid-cols-3 gap-2">
      <div className="rounded-[16px] border border-slate-200 bg-white px-2 py-2.5 shadow-sm">
        <div className="text-[18px] font-black text-brand-600">
          {upcomingEvents.length}
        </div>

        <div className="mt-0.5 text-[9px] font-bold text-slate-500">
          أحداث قادمة
        </div>
      </div>

      <div className="rounded-[16px] border border-slate-200 bg-white px-2 py-2.5 shadow-sm">
        <div className="text-[18px] font-black text-slate-700">
          {endedEvents.length}
        </div>

        <div className="mt-0.5 text-[9px] font-bold text-slate-500">
          أحداث منتهية
        </div>
      </div>

     <div className="rounded-[16px] border border-slate-200 bg-white px-2 py-2.5 shadow-sm">
  <div className="flex min-h-[22px] items-center justify-center text-[18px] font-black leading-none text-brand-600">
    {nextEvent
      ? nextCountdown?.status === "live"
        ? "الآن"
        : nextCountdown?.days ?? "—"
      : "—"}
  </div>

  <div className="mt-1 text-[9px] font-bold text-slate-500">
    {nextCountdown?.status === "live" ? "جاري الآن" : "يوم لأقرب حدث"}
  </div>
</div>
    </div>
  </div>

  {/* DESKTOP / TABLET */}
  <div className="relative hidden px-10 py-14 text-center md:block">
    <span className="inline-flex rounded-full border border-brand-100 bg-white px-4 py-1.5 text-sm font-black text-brand-600 shadow-sm">
      معارض ومؤتمرات التداول
    </span>

    <h1 className="mx-auto mt-5 max-w-4xl text-[48px] font-black leading-[1.2] tracking-[-0.025em] text-slate-950">
      أهم معارض ومؤتمرات الفوركس في 2026
    </h1>

    <p className="mx-auto mt-5 max-w-3xl text-[16px] font-semibold leading-8 text-slate-600">
      تابع أبرز فعاليات الفوركس والتكنولوجيا المالية، وتعرّف على مواعيد
      المعارض، أماكن الانعقاد، والفعاليات التي تجمع شركات الوساطة والفنتك
      والمتداولين.
    </p>

    <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="text-[22px] font-black text-brand-600">
          {upcomingEvents.length}
        </div>

        <div className="mt-1 text-[11px] font-bold text-slate-500">
          أحداث قادمة
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="text-[22px] font-black text-slate-700">
          {endedEvents.length}
        </div>

        <div className="mt-1 text-[11px] font-bold text-slate-500">
          أحداث منتهية
        </div>
      </div>

      <div className="rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 shadow-sm">
        <div className="text-[15px] font-black text-brand-700">
          {nextEvent
            ? nextCountdown?.status === "live"
              ? "جاري الآن"
              : `${nextCountdown?.days ?? "—"} يوم`
            : "لا يوجد"}
        </div>

        <div className="mt-1 text-[11px] font-bold text-brand-600">
          حتى أقرب حدث
        </div>
      </div>
    </div>
  </div>
</div>

          <div className="p-3 md:p-7">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                حدث خطأ أثناء جلب بيانات الأحداث.
              </div>
            )}

            {/* UPCOMING EVENTS */}
            <section>
<div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4 md:mb-5 md:flex-row md:items-end md:justify-between md:gap-3 md:pb-5">
  <div>
    <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 md:text-[11px]">
      الجدول القادم
    </span>

    <h2 className="mt-2 text-[24px] font-black leading-[1.35] text-slate-950 md:mt-3 md:text-[32px]">
      <span className="md:hidden">المعارض القادمة</span>
      <span className="hidden md:inline">الأحداث والمعارض القادمة</span>
    </h2>

    <p className="mt-1.5 text-[12px] font-semibold leading-6 text-slate-600 md:mt-2 md:text-[14px] md:leading-7">
      مرتبة تلقائيًا حسب أقرب موعد للحدث.
    </p>
  </div>

  <div className="hidden text-[12px] font-black text-slate-500 md:block">
    {upcomingEvents.length} حدث قادم
  </div>
</div>

              {upcomingEvents.length > 0 ? (
                <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                  <div className="text-[20px] font-black text-slate-800">
                    لا توجد أحداث قادمة حالياً
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    سيتم إضافة المعارض والمؤتمرات الجديدة فور الإعلان عنها.
                  </p>
                </div>
              )}
            </section>

          {/* ENDED EVENTS */}
{endedEvents.length > 0 && (
  <section className="mt-8 border-t border-slate-200 pt-6 md:mt-12 md:pt-8">
    <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4 md:mb-5 md:flex-row md:items-end md:justify-between md:gap-3 md:pb-5">
      <div>
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600 md:text-[11px]">
          أرشيف الأحداث
        </span>

        <h2 className="mt-2 text-[24px] font-black leading-[1.35] text-slate-950 md:mt-3 md:text-[32px]">
          <span className="md:hidden">المعارض المنتهية</span>

          <span className="hidden md:inline">
            الأحداث والمعارض المنتهية
          </span>
        </h2>

        <p className="mt-1.5 text-[12px] font-semibold leading-6 text-slate-600 md:mt-2 md:text-[14px] md:leading-7">
          فعاليات انتهت مواعيدها، مرتبة من الأحدث إلى الأقدم.
        </p>
      </div>

      <div className="hidden text-[12px] font-black text-slate-500 md:block">
        {endedEvents.length} حدث منتهي
      </div>
    </div>

    <div className="space-y-4">
  {endedEvents.map((event) => (
    <div key={event.id}>
      {/* MOBILE */}
      <div className="md:hidden">
        <EventCard event={event} ended />
      </div>

      {/* DESKTOP / TABLET */}
      <EndedEventRow event={event} />
    </div>
  ))}
</div>
  </section>
)}

{/* EVENTS CALENDAR */}
<section className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.045)]">
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 md:px-7">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
          تقويم الفعاليات
        </span>

        <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 md:text-[32px]">
          جدول معارض ومؤتمرات الفوركس في 2026
        </h2>

        <p className="mt-2 max-w-3xl text-[13px] font-semibold leading-7 text-slate-600 md:text-[14px]">
          استعرض مواعيد أهم معارض الفوركس والتكنولوجيا المالية مرتبة حسب
          الشهر، وتعرّف بسرعة على المدينة والدولة وموعد كل فعالية.
        </p>
      </div>

      <div className="hidden rounded-2xl border border-brand-100 bg-brand-50 px-5 py-3 text-center lg:block">
        <div className="text-[22px] font-black text-brand-600">
          {upcomingEvents.length}
        </div>

        <div className="mt-1 text-[11px] font-bold text-brand-600">
          فعالية قادمة
        </div>
      </div>
    </div>
  </div>

  <div className="p-4 md:p-6">
    <div className="grid gap-4 lg:grid-cols-2">
      {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
        <div
          key={month}
          className="overflow-hidden rounded-[22px] border border-slate-200 bg-white"
        >
         <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-l from-brand-50 to-white px-3 py-3 md:px-4">
            <h3 className="text-[15px] font-black text-slate-950">
              {month}
            </h3>

            <span className="rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[10px] font-black text-brand-600 shadow-sm">
              {monthEvents.length} حدث
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {monthEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group grid grid-cols-[48px_minmax(0,1fr)_20px] items-center gap-3 px-3 py-4 transition hover:bg-brand-50/60 md:grid-cols-[52px_minmax(0,1fr)_24px] md:px-4"
              >
                <div className="flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 md:h-12 md:w-12">
                  <span className="text-[16px] font-black leading-none">
                    {event.start_date
                      ? Number(event.start_date.split("-")[2])
                      : "—"}
                  </span>

                  <span className="mt-1 text-[8px] font-black">
                    يوم
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                 <h4
  title={normalizeEventTitle(event.title_ar)}
  className="line-clamp-2 break-words text-[13px] font-black leading-5 text-slate-950 transition group-hover:text-brand-600 md:text-[14px]"
>
  {normalizeEventTitle(event.title_ar)}
</h4>

                  <p className="mt-1 line-clamp-1 text-[11px] font-semibold text-slate-500">
                    {getEventLocation(event)}
                  </p>
                </div>

                <span className="text-[18px] font-black text-slate-300 transition group-hover:-translate-x-1 group-hover:text-brand-500">
                  ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

          {/* EVENTS VALUE SECTION */}
<section className="mt-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)] md:mt-10 md:rounded-[30px]">
  <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
    {/* MAIN CONTENT */}
    <div className="relative overflow-hidden bg-gradient-to-l from-[#f8fbff] via-white to-white px-4 py-6 md:px-7 md:py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-80px] top-[-100px] h-[260px] w-[260px] rounded-full bg-brand-100/60 blur-3xl" />
      </div>

      <div className="relative">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
          أهمية المعارض المالية
        </span>

        <h2 className="mt-3 max-w-2xl text-[24px] font-black leading-[1.35] text-slate-950 md:text-[32px]">
          لماذا نهتم بمعارض الفوركس والتكنولوجيا المالية؟
        </h2>

        <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 md:text-[15px] md:leading-8">
          لم تعد معارض الفوركس مجرد فعاليات ترويجية، بل أصبحت ملتقى يجمع
          شركات الوساطة، مزودي السيولة، شركات الدفع، منصات التداول، وشركات
          التكنولوجيا المالية في مكان واحد.
        </p>

        <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 md:mt-4 md:text-[15px] md:leading-8">
          تساعد هذه الفعاليات المتداولين والشركات على متابعة اتجاهات السوق،
          اكتشاف المنتجات الجديدة، وبناء علاقات مباشرة داخل قطاع التداول
          والاستثمار.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-7 md:grid-cols-4 md:gap-3">
          {[
            ["🏦", "شركات الوساطة"],
            ["💧", "مزودو السيولة"],
            ["💳", "شركات الدفع"],
            ["💻", "تقنيات التداول"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="flex min-h-[66px] flex-col items-center justify-center rounded-[16px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm md:min-h-[76px] md:rounded-[18px]"
            >
              <span className="text-[18px] md:text-[20px]">{icon}</span>
              <span className="mt-1.5 text-[11px] font-black text-slate-700 md:text-[12px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* BROKER ALARAB COVERAGE */}
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-4 py-6 text-white md:px-7 md:py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-100px] h-[260px] w-[260px] rounded-full bg-white/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative">
        <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-black text-white md:text-[11px]">
          تغطية بروكر العرب
        </span>

        <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-white md:text-[30px]">
          متابعة أهم فعاليات الفوركس والفنتك
        </h2>

        <p className="mt-4 text-[13px] font-medium leading-7 text-white/80 md:text-[14px] md:leading-8">
          نتابع الشركات المشاركة، أخبار الوسطاء، الرعاة، والجهات المنظمة، مع
          التركيز على ما يهم المتداول العربي.
        </p>

        <div className="mt-5 space-y-2.5">
          {[
            ["📰", "أخبار وبيانات صحفية"],
            ["🤝", "فرص شراكات وتعاون"],
            ["📸", "تغطيات وتحديثات المعارض"],
          ].map(([icon, text]) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-[16px] border border-white/20 bg-white/10 px-3 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[16px]">
                {icon}
              </span>

              <span className="text-[12px] font-black text-white md:text-[13px]">
                {text}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-[14px] bg-white px-5 text-[12px] font-black text-[#07111f] transition hover:-translate-y-0.5 hover:bg-slate-100 md:min-h-[48px] md:rounded-2xl md:text-[13px]"
        >
          تواصل معنا للتغطية الإعلامية
        </Link>
      </div>
    </div>
  </div>
</section>

{/* EVENT PAGE FEATURES */}
<section className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.04)] md:rounded-[30px]">
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 text-center md:px-7 md:py-7 md:text-right">
    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
      داخل صفحات الأحداث
    </span>

    <h2 className="mx-auto mt-3 max-w-[290px] text-[23px] font-black leading-[1.35] text-slate-950 md:mx-0 md:max-w-none md:text-[31px]">
      ماذا تقدم صفحات معارض الفوركس؟
    </h2>

    <p className="mx-auto mt-2 max-w-[300px] text-[12px] font-semibold leading-6 text-slate-600 md:mx-0 md:max-w-3xl md:text-[14px] md:leading-7">
      معلومات منظمة تساعدك على معرفة موعد المعرض، مكانه، الشركات المشاركة،
      والتغطيات المرتبطة به.
    </p>
  </div>

  {/* MOBILE */}
  <div className="space-y-2.5 p-3 md:hidden">
    {[
      {
        icon: "📅",
        title: "الموعد والمكان",
        text: "تاريخ المعرض، المدينة، وموقع انعقاد الحدث.",
      },
      {
        icon: "🏢",
        title: "الشركات المشاركة",
        text: "أبرز الوسطاء والرعاة والعارضين المشاركين.",
      },
      {
        icon: "📰",
        title: "التغطيات الإعلامية",
        text: "أخبار وبيانات صحفية من الجهات المنظمة.",
      },
      {
        icon: "🎯",
        title: "فرص المتداولين",
        text: "جلسات تعليمية وتواصل مع شركات الوساطة.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="flex min-h-[72px] items-center gap-3 rounded-[16px] border border-slate-100 bg-slate-50 px-3 py-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[17px] shadow-sm">
          {item.icon}
        </div>

        <div className="min-w-0 flex-1 text-right">
          <h3 className="text-[14px] font-black leading-5 text-slate-950">
            {item.title}
          </h3>

          <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-600">
            {item.text}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* DESKTOP */}
  <div className="hidden gap-4 p-6 md:grid md:grid-cols-2 xl:grid-cols-4">
    {[
      {
        icon: "📅",
        title: "الموعد والمكان",
        text: "تعرّف على تاريخ المعرض، المدينة، وموقع انعقاد الحدث بالتفصيل.",
      },
      {
        icon: "🏢",
        title: "الشركات المشاركة",
        text: "اكتشف أبرز شركات الوساطة، الرعاة، والعارضين المشاركين.",
      },
      {
        icon: "📰",
        title: "التغطيات الإعلامية",
        text: "تابع الأخبار، البيانات الصحفية، وتحديثات الجهة المنظمة.",
      },
      {
        icon: "🎯",
        title: "فرص المتداولين",
        text: "جلسات تعليمية وتواصل مباشر مع شركات الوساطة.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)]"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-[19px]">
          {item.icon}
        </div>

        <h3 className="mt-4 text-[16px] font-black text-slate-950">
          {item.title}
        </h3>

        <p className="mt-2 min-h-[72px] text-[13px] font-medium leading-7 text-slate-600">
          {item.text}
        </p>

        <div className="mt-4 h-[3px] w-10 rounded-full bg-brand-500 transition-all group-hover:w-16" />
      </div>
    ))}
  </div>
</section>

{/* WHO SHOULD ATTEND */}
<section className="mt-6 overflow-hidden rounded-[24px] border border-brand-400/30 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 shadow-[0_20px_55px_rgba(30,91,184,0.22)] md:rounded-[30px]">
  <div className="relative px-4 py-7 md:px-8 md:py-10">
    <div className="pointer-events-none absolute inset-0">
<div className="absolute right-[-100px] top-[-120px] h-[340px] w-[340px] rounded-full bg-white/15 blur-3xl" />
<div className="absolute bottom-[-140px] left-[-90px] h-[300px] w-[300px] rounded-full bg-brand-100/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:46px_46px]" />
    </div>

    <div className="relative">
      <div className="text-center">
        <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-black text-white md:text-[11px]">
          الحضور والمشاركة
        </span>

        <h2 className="mx-auto mt-3 max-w-[310px] text-[25px] font-black leading-[1.3] text-white md:max-w-3xl md:text-[36px]">
          لمن تناسب معارض الفوركس والتكنولوجيا المالية؟
        </h2>

        <p className="mx-auto mt-3 max-w-[310px] text-[12px] font-semibold leading-6 text-white/80 md:max-w-3xl md:text-[15px] md:leading-8">
          تجمع هذه الفعاليات المتداولين، شركات الوساطة، مزودي التكنولوجيا،
          المستثمرين، والمسوقين داخل قطاع التداول العالمي.
        </p>
      </div>

      {/* MOBILE */}
      <div className="mt-6 space-y-2.5 md:hidden">
        {[
          {
            icon: "📊",
            title: "المتداولون والمستثمرون",
            text: "منصات جديدة وجلسات تعليمية.",
          },
          {
            icon: "🏦",
            title: "شركات الوساطة",
            text: "شراكات وتواصل مع مزودي الخدمات.",
          },
          {
            icon: "💻",
            title: "شركات التكنولوجيا المالية",
            text: "حلول دفع وتقنيات إدارة المخاطر.",
          },
          {
            icon: "🤝",
            title: "المسوقون والشركاء",
            text: "برامج شراكة وفرص تعاون وتسويق.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex min-h-[76px] items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.06] px-3 py-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[17px]">
              {item.icon}
            </div>

            <div className="min-w-0 flex-1 text-right">
              <h3 className="text-[14px] font-black leading-5 text-white">
                {item.title}
              </h3>

              <p className="mt-0.5 text-[11px] font-medium leading-5 text-white/75">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="mt-8 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: "📊",
            title: "المتداولون والمستثمرون",
            text: "للتعرف على منصات التداول، المنتجات الجديدة، والجلسات التعليمية.",
          },
          {
            icon: "🏦",
            title: "شركات الوساطة",
            text: "لبناء شراكات والتواصل مع مزودي السيولة والتكنولوجيا.",
          },
          {
            icon: "💻",
            title: "شركات التكنولوجيا المالية",
            text: "لعرض حلول الدفع، منصات التداول، وأدوات إدارة المخاطر.",
          },
          {
            icon: "🤝",
            title: "المسوقون والشركاء",
            text: "لاكتشاف برامج الشراكة وفرص التعاون والتسويق.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.09]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[20px]">
              {item.icon}
            </div>

            <h3 className="mt-4 text-[16px] font-black text-white">
              {item.title}
            </h3>

            <p className="mt-2 min-h-[72px] text-[12px] font-medium leading-7 text-slate-300">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.06] px-4 py-4 text-center md:mt-8 md:flex-row md:rounded-[22px] md:px-6 md:py-5 md:text-right">
        <div>
          <h3 className="text-[16px] font-black text-white md:text-[18px]">
            هل تنظم معرضًا أو مؤتمرًا ماليًا؟
          </h3>

          <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-300 md:text-[13px]">
            أضف حدثك إلى بروكر العرب أو ناقش فرص التغطية والشراكة الإعلامية.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-[14px] bg-white px-6 text-[12px] font-black text-[#07111f] transition hover:-translate-y-0.5 hover:bg-slate-100 md:min-h-[48px] md:w-auto md:rounded-2xl md:text-[13px]"
        >
          أضف حدثك
        </Link>
      </div>
    </div>
  </div>
</section>
          </div>
        </div>
      </section>
    </main>
  );
}