import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "معارض ومؤتمرات الفوركس 2026",

  description:
    "تابع أهم معارض ومؤتمرات الفوركس والتكنولوجيا المالية في 2026، مع مواعيد الفعاليات وأماكن انعقادها وأبرز الأحداث والشراكات الإعلامية.",

  alternates: {
    canonical: "https://brokeralarab.com/events",

    languages: {
      ar: "https://brokeralarab.com/events",
      en: "https://brokeralarab.com/en/events",
      "x-default": "https://brokeralarab.com/en/events",
    },
  },

  openGraph: {
    title: "معارض ومؤتمرات الفوركس 2026 | بروكر العرب",

    description:
      "دليل أهم معارض الفوركس والتكنولوجيا المالية في 2026، مع مواعيد الأحداث وأماكن انعقادها وتفاصيل المشاركة.",

    url: "https://brokeralarab.com/events",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",

    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 377,
        alt: "معارض ومؤتمرات الفوركس 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "معارض ومؤتمرات الفوركس 2026 | بروكر العرب",

    description:
      "تابع مواعيد أهم معارض الفوركس والتكنولوجيا المالية وأماكن انعقادها في 2026.",

    images: ["https://brokeralarab.com/og-image.png"],
  },
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
  is_media_partner: boolean | null;
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
  const mediaPartner = event.is_media_partner === true;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-white transition duration-300 sm:rounded-[24px] ${
        mediaPartner && !ended
          ? "border-amber-300 shadow-[0_12px_34px_rgba(245,158,11,0.13)] hover:-translate-y-1 hover:border-amber-400 hover:shadow-[0_22px_48px_rgba(245,158,11,0.17)]"
          : ended
            ? "border-slate-200 shadow-[0_7px_22px_rgba(15,23,42,0.045)] hover:border-slate-300"
            : "border-slate-200 shadow-[0_7px_22px_rgba(15,23,42,0.045)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_rgba(15,23,42,0.08)]"
      }`}
    >
      {/* TOP ACCENT */}
      <div
        className={`h-[4px] ${
          mediaPartner && !ended
            ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-brand-500"
            : ended
              ? "bg-gradient-to-r from-slate-400 via-slate-300 to-transparent"
              : "bg-gradient-to-r from-brand-600 via-brand-400 to-[#93c5fd]"
        }`}
      />

      {/* EVENT HEADER */}
      <div className="relative min-h-[116px] border-b border-slate-100 bg-gradient-to-b from-[#f5f9ff] to-white px-4 pb-3.5 pt-3.5 text-center sm:min-h-[136px] sm:px-5 sm:pb-5 sm:pt-4">
        <div className="flex min-h-[30px] justify-center">
          {ended ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[9px] font-black text-slate-600 sm:text-[10px]">
              حدث منتهي
            </span>
          ) : mediaPartner ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f6c453] bg-[linear-gradient(180deg,#fff8dc_0%,#ffefb3_100%)] px-3.5 py-1.5 text-[9px] font-black text-[#8a5a00] shadow-[0_6px_16px_rgba(245,158,11,0.18)] sm:text-[10px]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f59e0b] text-[9px] font-black text-white">
                ✓
              </span>

              شريك إعلامي رسمي
            </span>
          ) : countdown.status === "live" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[9px] font-black text-emerald-700 sm:text-[10px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              جاري الآن
            </span>
          ) : (
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 shadow-sm sm:text-[10px]">
              حدث قادم
            </span>
          )}
        </div>

        <h2 className="mx-auto mt-2.5 line-clamp-2 min-h-[44px] max-w-[290px] text-[16px] font-black leading-[22px] text-[#07111f] sm:mt-3 sm:min-h-[48px] sm:text-[19px] sm:leading-7">
          {eventTitle}
        </h2>

        <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 sm:text-[12px]">
          <span className="text-brand-500">●</span>
          <span>{getEventLocation(event)}</span>
        </div>
      </div>

      {/* COUNTDOWN */}
      {!ended && countdown.status === "live" ? (
        <div className="flex min-h-[84px] flex-col items-center justify-center border-b border-emerald-100 bg-emerald-50 px-4 text-center">
          <div className="text-[19px] font-black text-emerald-700">
            الحدث منعقد حاليًا
          </div>

          <div className="mt-1 text-[10px] font-bold text-emerald-600">
            استعرض معلومات الحدث والتغطيات
          </div>
        </div>
      ) : !ended ? (
        <div className="border-b border-slate-100 bg-[#fbfdff] px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex min-w-[86px] items-center justify-center gap-2 rounded-xl border border-brand-100 bg-white px-3 py-2 shadow-sm">
              <span
                dir="ltr"
                className="text-[19px] font-black text-brand-600 sm:text-[21px]"
              >
                {countdown.days}
              </span>

              <span className="text-[10px] font-bold text-slate-500">
                يوم
              </span>
            </div>

            <div className="inline-flex min-w-[86px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span
                dir="ltr"
                className="text-[19px] font-black text-slate-700 sm:text-[21px]"
              >
                {countdown.hours}
              </span>

              <span className="text-[10px] font-bold text-slate-500">
                ساعة
              </span>
            </div>
          </div>

          <div className="mt-2 text-center text-[9px] font-bold text-slate-400">
            الوقت المتبقي
          </div>
        </div>
      ) : (
        <div className="flex min-h-[70px] items-center justify-center border-b border-slate-100 bg-slate-50 px-4 text-center">
          <div>
            <div className="text-[10px] font-black text-slate-500">
              انتهى بتاريخ
            </div>

            <div className="mt-1 text-[12px] font-black text-slate-700">
              {formatDate(event.end_date || event.start_date)}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="line-clamp-2 min-h-[48px] text-center text-[11px] font-medium leading-6 text-slate-600 sm:line-clamp-3 sm:min-h-[72px] sm:text-[13px]">
          {event.excerpt_ar ||
            "سيتم تحديث تفاصيل هذا الحدث والمعلومات المرتبطة به قريبًا."}
        </p>

        <div className="mt-2.5 rounded-[15px] border border-slate-100 bg-slate-50/70 px-3 py-2.5 text-center sm:mt-3 sm:rounded-[16px] sm:py-3">
          <div className="text-[11px] font-black leading-5 text-slate-800 sm:text-[12px]">
            {getDateRange(event.start_date, event.end_date)}
          </div>

          <div className="mt-1 text-[10px] font-bold leading-5 text-slate-600 sm:text-[11px]">
            {getEventLocation(event)}
          </div>

          <div className="mt-0.5 line-clamp-1 text-[10px] font-medium leading-5 text-slate-500">
            {getEventVenue(event)}
          </div>
        </div>

        <Link
          href={`/events/${event.slug}`}
          className={`mt-auto inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl px-4 text-[12px] font-black transition sm:min-h-[46px] sm:text-[13px] ${
            ended
              ? "border border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              : "border border-brand-200 bg-brand-50 text-brand-600 hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          }`}
        >
          {ended ? "مشاهدة تفاصيل الحدث" : "عرض تفاصيل الحدث"}

          <span className="mr-2 transition group-hover:-translate-x-1">
            ←
          </span>
        </Link>
      </div>
    </article>
  );
}

function EndedEventRow({ event }: { event: EventItem }) {
  const eventTitle = normalizeEventTitle(event.title_ar);

  return (
    <article className="group hidden overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)] transition hover:border-brand-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] md:grid md:grid-cols-[minmax(0,1.35fr)_0.8fr_0.9fr_190px] md:items-stretch">
      {/* EVENT */}
      <div className="relative flex min-h-[126px] items-center gap-4 overflow-hidden border-l border-slate-100 bg-gradient-to-l from-[#f5f9ff] to-white px-5 py-5">
        <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-b from-slate-400 via-brand-300 to-transparent" />

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-[20px] shadow-sm">
          ✓
        </div>

        <div className="min-w-0">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[9px] font-black text-slate-600">
            حدث منتهي
          </span>

          <h3 className="mt-2 line-clamp-2 text-[19px] font-black leading-7 text-[#07111f]">
            {eventTitle}
          </h3>

          <p className="mt-1 line-clamp-1 text-[11px] font-semibold leading-5 text-slate-500">
            {event.excerpt_ar ||
              "يمكنك مشاهدة معلومات الحدث وتفاصيل مكان الانعقاد."}
          </p>
        </div>
      </div>

      {/* DATE */}
      <div className="flex flex-col justify-center border-l border-slate-100 bg-white px-5 py-5">
        <span className="text-[9px] font-black text-slate-400">
          تاريخ الحدث
        </span>

        <div className="mt-2 text-[12px] font-black leading-6 text-slate-800">
          {getDateRange(event.start_date, event.end_date)}
        </div>

        <div className="mt-1 text-[10px] font-bold text-slate-500">
          انتهى بتاريخ {formatDate(event.end_date || event.start_date)}
        </div>
      </div>

      {/* LOCATION */}
      <div className="flex flex-col justify-center border-l border-slate-100 bg-slate-50/60 px-5 py-5">
        <span className="text-[9px] font-black text-slate-400">
          الموقع
        </span>

        <div className="mt-2 text-[12px] font-black leading-6 text-slate-800">
          {getEventLocation(event)}
        </div>

        <div className="mt-1 line-clamp-2 text-[10px] font-semibold leading-5 text-slate-500">
          {getEventVenue(event)}
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex items-center justify-center px-4 py-5">
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 px-4 text-[12px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
        >
          مشاهدة التفاصيل

          <span className="mr-2 transition group-hover:-translate-x-1">
            ←
          </span>
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
      hero_image,
      is_media_partner
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

...(event.hero_image
  ? {
      image: [event.hero_image],
    }
  : {}),

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

    <section className="mx-auto w-full max-w-[1520px] px-3 pt-4 pb-0 sm:px-6 sm:pt-7 sm:pb-0 lg:px-8">
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
         {/* HERO */}
<div className="relative overflow-hidden border-b border-slate-100 bg-[linear-gradient(135deg,#eef5ff_0%,#ffffff_52%,#e8f1ff_100%)]">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -right-20 -top-28 h-[320px] w-[320px] rounded-full bg-brand-100/70 blur-3xl" />
    <div className="absolute -left-24 bottom-[-170px] h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-3xl" />

    <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(30,91,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(30,91,184,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />
  </div>

  <div className="relative px-4 py-6 text-center sm:px-6 sm:py-8 lg:px-10 lg:py-10">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[10px] font-black text-brand-600 shadow-sm sm:text-[11px]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50">
        ✓
      </span>

      دليل معارض ومؤتمرات التداول
    </span>

    <h1 className="mx-auto mt-4 max-w-[310px] text-[27px] font-black leading-[1.2] tracking-[-0.025em] text-[#07111f] sm:max-w-4xl sm:text-[38px] lg:text-[42px]">
      أهم معارض ومؤتمرات الفوركس في 2026
    </h1>

    <p className="mx-auto mt-3 max-w-[320px] text-[12px] font-semibold leading-6 text-slate-600 sm:max-w-3xl sm:text-[15px] sm:leading-8">
      تابع أبرز معارض الفوركس والتكنولوجيا المالية، وتعرّف على مواعيد
      الفعاليات، أماكن انعقادها، والأحداث التي يشارك فيها بروكر العرب
      كشريك إعلامي رسمي.
    </p>

    <div className="mx-auto mt-5 grid max-w-[620px] grid-cols-3 gap-2.5 sm:gap-3">
      <div className="rounded-[16px] border border-white/80 bg-white/90 px-2 py-2.5 shadow-[0_8px_24px_rgba(30,91,184,0.08)] sm:px-4 sm:py-3">
        <div
          dir="ltr"
          className="text-[19px] font-black text-brand-600 sm:text-[22px]"
        >
          {upcomingEvents.length}
        </div>

        <div className="mt-0.5 text-[9px] font-bold text-slate-500 sm:text-[11px]">
          أحداث قادمة
        </div>
      </div>

      <div className="rounded-[16px] border border-white/80 bg-white/90 px-2 py-2.5 shadow-[0_8px_24px_rgba(30,91,184,0.08)] sm:px-4 sm:py-3">
        <div
          dir="ltr"
          className="text-[19px] font-black text-slate-700 sm:text-[22px]"
        >
          {endedEvents.length}
        </div>

        <div className="mt-0.5 text-[9px] font-bold text-slate-500 sm:text-[11px]">
          أحداث منتهية
        </div>
      </div>

      <div className="rounded-[16px] border border-brand-100 bg-brand-50 px-2 py-2.5 shadow-[0_8px_24px_rgba(30,91,184,0.08)] sm:px-4 sm:py-3">
        <div className="flex min-h-[25px] items-center justify-center text-[17px] font-black text-brand-700 sm:text-[20px]">
          {nextEvent
            ? nextCountdown?.status === "live"
              ? "الآن"
              : nextCountdown?.days ?? "—"
            : "—"}
        </div>

        <div className="mt-0.5 text-[9px] font-bold text-brand-600 sm:text-[11px]">
          {nextCountdown?.status === "live"
            ? "جاري الآن"
            : "يوم لأقرب حدث"}
        </div>
      </div>
    </div>
  </div>
</div>

          <div className="px-3 pt-3 pb-0 sm:px-5 sm:pt-5 sm:pb-0 lg:px-6 lg:pt-6 lg:pb-0">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                حدث خطأ أثناء جلب بيانات الأحداث.
              </div>
            )}

            {/* UPCOMING EVENTS */}
            <section>
<div className="mb-4 rounded-[20px] border border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-white px-4 py-4 sm:mb-5 sm:rounded-[24px] sm:px-5 sm:py-5">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm sm:text-[11px]">
        الجدول القادم
      </span>

      <h2 className="mt-2.5 text-[25px] font-black leading-[1.25] tracking-[-0.02em] text-[#07111f] sm:text-[31px]">
        الأحداث والمعارض القادمة
      </h2>

      <p className="mt-1.5 text-[12px] font-semibold leading-6 text-slate-600 sm:text-[14px] sm:leading-7">
        مرتبة تلقائيًا حسب أقرب موعد، مع معلومات التاريخ والموقع ومكان الانعقاد.
      </p>
    </div>

    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-2 text-[10px] font-black text-brand-600 sm:text-[11px]">
      <span
        dir="ltr"
        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[11px] shadow-sm"
      >
        {upcomingEvents.length}
      </span>

      حدث قادم
    </div>
  </div>
</div>

              {upcomingEvents.length > 0 ? (
                <div className="grid items-stretch gap-3.5 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
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
 <section className="mt-8 border-t border-slate-200 pt-6 sm:mt-10 sm:pt-7">
   <div className="mb-4 rounded-[20px] border border-slate-200 bg-gradient-to-l from-slate-50 via-white to-white px-4 py-4 sm:mb-5 sm:rounded-[24px] sm:px-5 sm:py-5">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black text-slate-600 shadow-sm sm:text-[11px]">
        أرشيف الأحداث
      </span>

      <h2 className="mt-2.5 text-[25px] font-black leading-[1.25] tracking-[-0.02em] text-[#07111f] sm:text-[31px]">
        الأحداث والمعارض المنتهية
      </h2>

      <p className="mt-1.5 text-[12px] font-semibold leading-6 text-slate-600 sm:text-[14px] sm:leading-7">
        فعاليات انتهت مواعيدها، ويمكنك الرجوع إلى صفحاتها وتغطياتها السابقة.
      </p>
    </div>

    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[10px] font-black text-slate-600 shadow-sm sm:text-[11px]">
      <span
        dir="ltr"
        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[11px]"
      >
        {endedEvents.length}
      </span>

      حدث منتهي
    </div>
  </div>
</div>

    <div className="space-y-3.5 md:space-y-4">
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
<section className="mt-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.045)] sm:mt-10 sm:rounded-[28px]">
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 sm:px-5 sm:py-6 md:px-7">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
          تقويم الفعاليات
        </span>

        <h2 className="mt-3 text-[24px] font-black leading-[1.25] tracking-[-0.02em] text-slate-950 sm:text-[27px] md:text-[32px]">
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

  <div className="p-3 sm:p-4 md:p-6">
    <div className="grid items-start gap-4 lg:grid-cols-2">
      {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
        <div
  key={month}
  className="h-fit self-start overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,23,42,0.035)] sm:rounded-[22px]"
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
                className="group grid grid-cols-[44px_minmax(0,1fr)_18px] items-center gap-2.5 px-3 py-3 transition hover:bg-brand-50/60 sm:grid-cols-[48px_minmax(0,1fr)_20px] sm:gap-3 sm:py-4 md:grid-cols-[52px_minmax(0,1fr)_24px] md:px-4"
              >
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 sm:h-11 sm:w-11 md:h-12 md:w-12">
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
  className="line-clamp-2 break-words text-[12px] font-black leading-5 text-slate-950 transition group-hover:text-brand-600 sm:text-[13px] md:text-[14px]"
>
  {normalizeEventTitle(event.title_ar)}
</h4>

                  <p className="mt-0.5 line-clamp-1 text-[10px] font-semibold leading-5 text-slate-500 sm:mt-1 sm:text-[11px]">
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

        <h2 className="mt-3 max-w-2xl text-[22px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950 md:text-[32px]">
  <span className="md:hidden">
    لماذا نهتم بمعارض الفوركس؟
  </span>

  <span className="hidden md:inline">
    لماذا نهتم بمعارض الفوركس والتكنولوجيا المالية؟
  </span>
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

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 md:mt-7 lg:grid-cols-4">
          {[
            ["🏦", "شركات الوساطة"],
            ["💧", "مزودو السيولة"],
            ["💳", "شركات الدفع"],
            ["💻", "تقنيات التداول"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="group flex min-h-[86px] flex-col items-center justify-center rounded-[18px] border border-slate-200 bg-white px-3 py-3 text-center shadow-[0_6px_18px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.07)]"
            >
              <span className="text-[22px] transition duration-300 group-hover:scale-110 md:text-[24px]">
  {icon}
</span>
              <span className="mt-1.5 text-[11px] font-black text-slate-700 md:text-[12px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* BROKER ALARAB COVERAGE */}
<div className="relative overflow-hidden bg-[linear-gradient(145deg,#153f82_0%,#184A97_52%,#1E5BB8_100%)] px-4 py-5 text-white md:px-7 md:py-8">  <div className="pointer-events-none absolute inset-0">
<div className="absolute left-[-90px] top-[-110px] h-[280px] w-[280px] rounded-full bg-brand-400/20 blur-[90px]" />
<div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:48px_48px]" />  </div>

  <div className="relative">
    <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-black text-white md:text-[11px]">
      تغطية بروكر العرب
    </span>

<h2 className="mt-3 max-w-[280px] text-[22px] font-black leading-[1.25] text-white md:max-w-none md:text-[30px] md:leading-[1.3]">      متابعة أهم فعاليات الفوركس والفنتك
    </h2>

    <p className="mt-2.5 text-[11px] font-medium leading-6 text-white/80 md:mt-4 md:text-[14px] md:leading-8">
      نتابع الشركات المشاركة وأخبار الوسطاء والرعاة والجهات المنظمة، مع
      التركيز على المعلومات التي تهم المتداول العربي.
    </p>

    <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
  {[
    ["📰", "أخبار وبيانات صحفية", "متابعة أخبار الجهات المنظمة والوسطاء"],
    ["🤝", "فرص شراكات وتعاون", "ربط الشركات والمنظمين بالشركاء"],
    ["📸", "تغطيات وتحديثات", "نشر المستجدات قبل وأثناء المعارض"],
  ].map(([icon, title, text]) => (
    <div
      key={title}
      className="group flex min-h-[58px] items-center gap-2.5 rounded-[15px] border border-white/15 bg-[#123d7a]/55 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-white/25 hover:bg-[#123d7a]/70 md:min-h-[74px] md:gap-3 md:rounded-[16px] md:px-3.5 md:py-3"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.08] text-[15px] shadow-sm md:h-10 md:w-10 md:rounded-[13px] md:text-[17px]">
        {icon}
      </span>

      <div className="min-w-0">
        <div className="text-[11px] font-black leading-5 text-white md:text-[13px]">
          {title}
        </div>

        <div className="mt-0.5 hidden text-[9px] font-semibold leading-4 text-blue-100/70 lg:block">
          {text}
        </div>
      </div>
    </div>
  ))}
</div>

    <Link
  href="/contact"
  className="group mt-4 inline-flex min-h-[46px] w-full items-center justify-between rounded-2xl border border-white/80 bg-white px-4 text-[12px] font-black text-brand-600 shadow-[0_12px_28px_rgba(8,35,78,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-50 md:mt-5 md:min-h-[48px] md:px-5 md:text-[13px]"
>
  <span>تواصل معنا للتغطية الإعلامية</span>

  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:-translate-x-1 group-hover:bg-brand-100">
    ←
  </span>
</Link>
  </div>
</div>
  </div>
</section>

{/* EVENT PAGE FEATURES */}
<section className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.04)] md:rounded-[30px]">
<div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 text-center md:px-7 md:py-7 md:text-right">    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
      داخل صفحات الأحداث
    </span>

    <h2 className="mx-auto mt-2.5 max-w-[285px] text-[22px] font-black leading-[1.3] text-slate-950 md:mx-0 md:mt-3 md:max-w-none md:text-[31px]">
      ماذا تقدم صفحات معارض الفوركس؟
    </h2>

    <p className="mx-auto mt-2 max-w-[300px] text-[12px] font-semibold leading-6 text-slate-600 md:mx-0 md:max-w-3xl md:text-[14px] md:leading-7">
      معلومات منظمة تساعدك على معرفة موعد المعرض، مكانه، الشركات المشاركة،
      والتغطيات المرتبطة به.
    </p>
  </div>

  {/* MOBILE */}
<div className="grid grid-cols-2 gap-2.5 p-3 md:hidden">
  {[
    {
      icon: "📅",
      title: "الموعد والمكان",
      text: "تاريخ المعرض وموقع انعقاد الحدث.",
    },
    {
      icon: "🏢",
      title: "الشركات المشاركة",
      text: "أبرز الوسطاء والرعاة والعارضين.",
    },
    {
      icon: "📰",
      title: "التغطيات الإعلامية",
      text: "الأخبار والبيانات والتحديثات.",
    },
    {
      icon: "🎯",
      title: "فرص المتداولين",
      text: "جلسات تعليمية وفرص تواصل.",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="flex min-h-[126px] flex-col items-center rounded-[17px] border border-slate-200 bg-[#fbfdff] px-2.5 py-3 text-center shadow-[0_5px_16px_rgba(15,23,42,0.035)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-brand-100 bg-white text-[17px] shadow-sm">
        {item.icon}
      </div>

      <h3 className="mt-2.5 text-[12px] font-black leading-5 text-slate-950">
        {item.title}
      </h3>

      <p className="mt-1.5 text-[10px] font-medium leading-5 text-slate-600">
        {item.text}
      </p>

      <div className="mt-auto h-[3px] w-8 rounded-full bg-brand-500" />
    </div>
  ))}
</div>

  {/* DESKTOP */}
  <div className="hidden gap-4 p-5 md:grid md:grid-cols-2 md:p-6 xl:grid-cols-4">
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
        className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)] lg:p-6"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-[19px]">
          {item.icon}
        </div>

        <h3 className="mt-4 text-[16px] font-black text-slate-950">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 text-[13px] font-medium leading-7 text-slate-600">
          {item.text}
        </p>

        <div className="mt-5 h-[4px] w-12 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-20" />
      </div>
    ))}
  </div>
</section>

{/* WHO SHOULD ATTEND */}
<section className="mt-6 overflow-hidden rounded-[24px] border border-[#153f82] bg-[linear-gradient(145deg,#12366f_0%,#184A97_52%,#1E5BB8_100%)] shadow-[0_18px_46px_rgba(24,74,151,0.18)] md:rounded-[30px]">
  <div className="relative px-4 py-6 sm:px-5 md:px-8 md:py-9">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute right-[-110px] top-[-130px] h-[340px] w-[340px] rounded-full bg-brand-400/15 blur-[100px]" />

      <div className="absolute bottom-[-150px] left-[-100px] h-[300px] w-[300px] rounded-full bg-brand-100/10 blur-[100px]" />

      <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:52px_52px]" />
    </div>

    <div className="relative">
      {/* MOBILE HEADER */}
      <div className="text-center md:hidden">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black text-white">
          الحضور والمشاركة
        </span>

        <h2 className="mx-auto mt-3 max-w-[285px] text-[24px] font-black leading-[1.25] tracking-[-0.02em] text-white">
          لمن تناسب معارض الفوركس؟
        </h2>

        <p className="mx-auto mt-2 max-w-[285px] text-[11px] font-semibold leading-6 text-blue-100/80">
          تجمع هذه الفعاليات المتداولين وشركات الوساطة والفنتك والشركاء
          داخل قطاع التداول.
        </p>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden text-center md:block">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-black text-white">
          الحضور والمشاركة
        </span>

        <h2 className="mx-auto mt-3 max-w-3xl text-[34px] font-black leading-[1.25] text-white">
          لمن تناسب معارض الفوركس والتكنولوجيا المالية؟
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-[14px] font-semibold leading-8 text-blue-100/80">
          تجمع هذه الفعاليات المتداولين، شركات الوساطة، مزودي التكنولوجيا،
          المستثمرين، والمسوقين داخل قطاع التداول العالمي.
        </p>
      </div>

      {/* MOBILE CARDS */}
      <div className="mt-5 grid grid-cols-2 gap-2.5 md:hidden">
        {[
          {
            icon: "📊",
            title: "المتداولون",
            text: "منصات وجلسات تعليمية.",
          },
          {
            icon: "🏦",
            title: "شركات الوساطة",
            text: "شراكات وخدمات وسيولة.",
          },
          {
            icon: "💻",
            title: "شركات الفنتك",
            text: "تقنيات دفع وتداول.",
          },
          {
            icon: "🤝",
            title: "الشركاء",
            text: "فرص تسويق وتعاون.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex min-h-[112px] flex-col items-center justify-center rounded-[17px] border border-white/14 bg-[#123d7a]/55 px-2.5 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.08] text-[17px]">
              {item.icon}
            </div>

            <h3 className="mt-2 text-[12px] font-black leading-5 text-white">
              {item.title}
            </h3>

            <p className="mt-0.5 text-[9px] font-medium leading-4 text-blue-100/70">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* DESKTOP CARDS */}
      <div className="mt-7 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: "📊",
            title: "المتداولون والمستثمرون",
            text: "للتعرف على منصات التداول والمنتجات الجديدة والجلسات التعليمية.",
          },
          {
            icon: "🏦",
            title: "شركات الوساطة",
            text: "لبناء شراكات والتواصل مع مزودي السيولة والتكنولوجيا.",
          },
          {
            icon: "💻",
            title: "شركات التكنولوجيا المالية",
            text: "لعرض حلول الدفع ومنصات التداول وأدوات إدارة المخاطر.",
          },
          {
            icon: "🤝",
            title: "المسوقون والشركاء",
            text: "لاكتشاف برامج الشراكة وفرص التعاون والتسويق.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="group flex h-full flex-col rounded-[20px] border border-white/15 bg-[#123d7a]/55 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#123d7a]/70"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-[20px] transition group-hover:scale-105">
              {item.icon}
            </div>

            <h3 className="mt-4 text-[16px] font-black text-white">
              {item.title}
            </h3>

            <p className="mt-2 flex-1 text-[12px] font-medium leading-7 text-blue-100/75">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-5 flex items-center justify-between gap-3 rounded-[17px] border border-white/15 bg-white/[0.07] px-3.5 py-3 md:mt-7 md:rounded-[21px] md:px-5 md:py-4">
        <div className="min-w-0">
          <h3 className="text-[13px] font-black leading-5 text-white md:text-[17px]">
            هل تنظم معرضًا ماليًا؟
          </h3>

          <p className="mt-0.5 line-clamp-1 text-[9px] font-semibold text-blue-100/70 md:text-[12px]">
            أضف حدثك أو ناقش فرص التغطية والشراكة الإعلامية.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-[38px] shrink-0 items-center justify-center rounded-xl bg-white px-4 text-[10px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:bg-brand-50 md:min-h-[44px] md:rounded-2xl md:px-6 md:text-[12px]"
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