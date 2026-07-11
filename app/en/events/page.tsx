import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Forex, Trading and FinTech Events in 2026",
  description:
    "Explore major forex expos, trading conferences and fintech events in 2026, with dates, venues, locations, participating companies and industry coverage.",
  alternates: {
    canonical: "https://brokeralarab.com/en/events",
    languages: {
      en: "https://brokeralarab.com/en/events",
      ar: "https://brokeralarab.com/events",
    },
  },
  openGraph: {
    title: "Forex, Trading and FinTech Events in 2026",
    description:
      "A regularly updated calendar of major forex expos, trading conferences and fintech events around the world.",
    url: "https://brokeralarab.com/en/events",
    type: "website",
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
};

function formatDate(date?: string | null) {
  if (!date) return "To be announced";

  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getDateRange(start?: string | null, end?: string | null) {
  if (!start) return "To be announced";
  if (!end || end === start) return formatDate(start);

  const [startYear, startMonth, startDay] = start.split("-").map(Number);
  const [endYear, endMonth, endDay] = end.split("-").map(Number);

  if (startYear === endYear && startMonth === endMonth) {
    const monthAndYear = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(startYear, startMonth - 1, 1));

    return `${monthAndYear} ${startDay}–${endDay}`;
  }

  if (startYear === endYear) {
    const startText = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(startYear, startMonth - 1, startDay));

    const endText = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(endYear, endMonth - 1, endDay));

    return `${startText} – ${endText}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
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
  return (title || "Trading Industry Event")
    .replace(/\s+/g, " ")
    .trim();
}

function getEventTitle(event: EventItem) {
  return normalizeEventTitle(event.title_en || event.title_ar);
}

function getEventDescription(event: EventItem) {
  return (
    event.excerpt_en?.trim() ||
    event.excerpt_ar?.trim() ||
    "Event information, participating companies and venue details will be updated as they become available."
  );
}

function getEventLocation(event: EventItem) {
  const city = event.city_en?.trim() || event.city_ar?.trim();
  const country = event.country_en?.trim() || event.country_ar?.trim();

  if (city && country) {
    return `${city}, ${country}`;
  }

  return city || country || "Location to be announced";
}

function getEventVenue(event: EventItem) {
  return (
    event.venue_en?.trim() ||
    event.venue_ar?.trim() ||
    "Venue to be announced"
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
  const eventTitle = getEventTitle(event);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[24px] border bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition duration-300 ${
        ended
          ? "border-slate-200 hover:border-slate-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)]"
          : "border-slate-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_rgba(15,23,42,0.09)]"
      }`}
    >
      {/* CARD HEADER */}
      <div className="relative flex min-h-[92px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-4 py-4 text-center md:min-h-[110px] md:px-5 md:py-5">
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
              ? "Past Event"
              : countdown.status === "live"
                ? "Happening Now"
                : "Upcoming Event"}
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

          <div className="mt-2 text-[19px] font-black text-emerald-700">
            The event is live
          </div>

          <div className="mt-1 text-[11px] font-bold text-emerald-600">
            View event information and the latest coverage
          </div>
        </div>
      ) : !ended ? (
        <div className="grid min-h-[72px] grid-cols-2 border-b border-slate-100 bg-[#f8fbff] md:min-h-[86px]">
          <div className="flex flex-col items-center justify-center border-r border-slate-100 px-3 py-3 text-center">
            <div className="text-[24px] font-black leading-none text-brand-600 md:text-[28px]">
              {countdown.days}
            </div>

            <div className="mt-1.5 text-[10px] font-black text-slate-500 md:mt-2 md:text-[11px]">
              Days
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-3 py-3 text-center">
            <div className="text-[24px] font-black leading-none text-brand-600 md:text-[28px]">
              {countdown.hours}
            </div>

            <div className="mt-1.5 text-[10px] font-black text-slate-500 md:mt-2 md:text-[11px]">
              Hours
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[62px] items-center justify-center border-b border-slate-100 bg-slate-50 px-4 py-2 text-center md:min-h-[72px]">
          <div>
            <div className="text-[11px] font-black text-slate-600 md:text-[13px]">
              Event ended on
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
          {getEventDescription(event)}
        </p>

        <div className="mt-4 space-y-2 md:mt-5 md:space-y-2.5">
          <div className="flex min-h-[46px] items-center gap-2.5 rounded-[14px] border border-slate-100 bg-slate-50 px-3 py-2.5 md:min-h-[52px] md:gap-3 md:rounded-2xl md:px-4 md:py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[12px] shadow-sm md:h-8 md:w-8 md:rounded-xl md:text-[14px]">
              📅
            </span>

            <div className="min-w-0">
              <div className="text-[9px] font-black text-slate-400 md:text-[10px]">
                Event dates
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
                City and country
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
                Venue
              </div>

              <div className="mt-0.5 text-[11px] font-black leading-5 text-slate-700 md:text-[12px]">
                {getEventVenue(event)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 md:pt-5">
          <Link
            href={`/en/events/${event.slug}`}
            className={`flex min-h-[44px] w-full items-center justify-center rounded-[14px] px-4 py-2.5 text-[12px] font-black transition md:min-h-[48px] md:rounded-2xl md:py-3 md:text-[13px] ${
              ended
                ? "border border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:text-brand-600"
                : "bg-brand-500 text-white shadow-[0_12px_26px_rgba(37,99,235,0.20)] hover:-translate-y-0.5 hover:bg-brand-600"
            }`}
          >
            {ended ? "View Event Coverage" : "View Event Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}

function EndedEventRow({ event }: { event: EventItem }) {
  const eventTitle = getEventTitle(event);

  return (
    <article className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] md:grid md:grid-cols-[1.25fr_0.85fr_0.85fr_auto] md:items-stretch">
      {/* TITLE */}
      <div className="relative flex min-h-[150px] flex-col justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-6 py-5 text-left">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_48%)]" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-black text-white">
            Past Event
          </span>

          <h3 className="mt-3 text-[21px] font-black leading-8 text-white">
            {eventTitle}
          </h3>

          <p className="mt-2 line-clamp-2 text-[12px] font-medium leading-6 text-white/80">
            {getEventDescription(event)}
          </p>
        </div>
      </div>

      {/* DATE */}
      <div className="flex flex-col justify-center border-r border-slate-100 bg-slate-50 px-5 py-5">
        <span className="text-[10px] font-black text-slate-400">
          Event dates
        </span>

        <div className="mt-2 text-[13px] font-black leading-6 text-slate-700">
          {getDateRange(event.start_date, event.end_date)}
        </div>
      </div>

      {/* LOCATION */}
      <div className="flex flex-col justify-center border-r border-slate-100 bg-slate-50 px-5 py-5">
        <span className="text-[10px] font-black text-slate-400">
          Location
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
          href={`/en/events/${event.slug}`}
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-[13px] font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
        >
          View Event Coverage
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
    (event) => event.slug && (event.title_en || event.title_ar)
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

  const eventsByMonth = upcomingEvents.reduce<Record<string, EventItem[]>>(
    (groups, event) => {
      if (!event.start_date) {
        const key = "Date to be announced";

        if (!groups[key]) {
          groups[key] = [];
        }

        groups[key].push(event);
        return groups;
      }

      const [year, month] = event.start_date.split("-").map(Number);

      const key = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(year, month - 1, 1));

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(event);
      return groups;
    },
    {}
  );

  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forex, Trading and FinTech Events in 2026",
    description:
      "A calendar of major forex expos, trading conferences and fintech events, including dates, venues and international locations.",
    url: "https://brokeralarab.com/en/events",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: eventList.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: getEventTitle(event),
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
            name: getEventVenue(event),
            address: {
              "@type": "PostalAddress",
              addressLocality:
                event.city_en || event.city_ar || undefined,
              addressCountry:
                event.country_en || event.country_ar || undefined,
            },
          },
          description: getEventDescription(event),
          url: `https://brokeralarab.com/en/events/${event.slug}`,
        },
      })),
    },
  };

  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
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
                Forex, Trading & FinTech Events
              </span>

              <h1 className="mx-auto mt-3 max-w-[290px] text-[25px] font-black leading-[1.18] tracking-[-0.02em] text-slate-950">
                Major Forex Events in 2026
              </h1>

              <p className="mx-auto mt-3 max-w-[295px] text-[12px] font-semibold leading-6 text-slate-600">
                Track leading forex expos, fintech conferences and trading
                industry events worldwide.
              </p>

              <div className="mx-auto mt-4 grid max-w-[300px] grid-cols-3 gap-2">
                <div className="rounded-[16px] border border-slate-200 bg-white px-2 py-2.5 shadow-sm">
                  <div className="text-[18px] font-black text-brand-600">
                    {upcomingEvents.length}
                  </div>

                  <div className="mt-0.5 text-[9px] font-bold text-slate-500">
                    Upcoming
                  </div>
                </div>

                <div className="rounded-[16px] border border-slate-200 bg-white px-2 py-2.5 shadow-sm">
                  <div className="text-[18px] font-black text-slate-700">
                    {endedEvents.length}
                  </div>

                  <div className="mt-0.5 text-[9px] font-bold text-slate-500">
                    Past Events
                  </div>
                </div>

                <div className="rounded-[16px] border border-slate-200 bg-white px-2 py-2.5 shadow-sm">
                  <div className="flex min-h-[22px] items-center justify-center text-[18px] font-black leading-none text-brand-600">
                    {nextEvent
                      ? nextCountdown?.status === "live"
                        ? "Live"
                        : nextCountdown?.days ?? "—"
                      : "—"}
                  </div>

                  <div className="mt-1 text-[9px] font-bold text-slate-500">
                    {nextCountdown?.status === "live"
                      ? "Happening now"
                      : "Days to next"}
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP / TABLET */}
            <div className="relative hidden px-10 py-14 text-center md:block">
              <span className="inline-flex rounded-full border border-brand-100 bg-white px-4 py-1.5 text-sm font-black text-brand-600 shadow-sm">
                Global Forex, Trading & FinTech Events
              </span>

              <h1 className="mx-auto mt-5 max-w-4xl text-[48px] font-black leading-[1.2] tracking-[-0.025em] text-slate-950">
                Major Forex Expos and FinTech Conferences in 2026
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-[16px] font-semibold leading-8 text-slate-600">
                Explore leading forex expos, online trading conferences and
                fintech events connecting brokers, traders, technology
                providers, payment companies, affiliates and financial brands.
              </p>

              <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="text-[22px] font-black text-brand-600">
                    {upcomingEvents.length}
                  </div>

                  <div className="mt-1 text-[11px] font-bold text-slate-500">
                    Upcoming Events
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="text-[22px] font-black text-slate-700">
                    {endedEvents.length}
                  </div>

                  <div className="mt-1 text-[11px] font-bold text-slate-500">
                    Past Events
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 shadow-sm">
                  <div className="text-[15px] font-black text-brand-600">
                    {nextEvent
                      ? nextCountdown?.status === "live"
                        ? "Happening Now"
                        : `${nextCountdown?.days ?? "—"} Days`
                      : "No Event"}
                  </div>

                  <div className="mt-1 text-[11px] font-bold text-brand-600">
                    Until the Next Event
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-7">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                We could not load the events at this time.
              </div>
            )}

            {/* UPCOMING EVENTS */}
            <section>
              <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4 md:mb-5 md:flex-row md:items-end md:justify-between md:gap-3 md:pb-5">
                <div>
                  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 md:text-[11px]">
                    Upcoming Schedule
                  </span>

                  <h2 className="mt-2 text-[24px] font-black leading-[1.35] text-slate-950 md:mt-3 md:text-[32px]">
                    <span className="md:hidden">Upcoming Events</span>
                    <span className="hidden md:inline">
                      Upcoming Forex and FinTech Events
                    </span>
                  </h2>

                  <p className="mt-1.5 text-[12px] font-semibold leading-6 text-slate-600 md:mt-2 md:text-[14px] md:leading-7">
                    Automatically ordered by the nearest event date.
                  </p>
                </div>

                <div className="hidden text-[12px] font-black text-slate-500 md:block">
                  {upcomingEvents.length} upcoming events
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
                    No upcoming events are listed
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    New forex and fintech events will be added when dates are
                    announced.
                  </p>
                </div>
              )}
            </section>

            {/* PAST EVENTS */}
            {endedEvents.length > 0 && (
              <section className="mt-8 border-t border-slate-200 pt-6 md:mt-12 md:pt-8">
                <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4 md:mb-5 md:flex-row md:items-end md:justify-between md:gap-3 md:pb-5">
                  <div>
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600 md:text-[11px]">
                      Event Archive
                    </span>

                    <h2 className="mt-2 text-[24px] font-black leading-[1.35] text-slate-950 md:mt-3 md:text-[32px]">
                      <span className="md:hidden">Past Events</span>

                      <span className="hidden md:inline">
                        Past Forex and FinTech Events
                      </span>
                    </h2>

                    <p className="mt-1.5 text-[12px] font-semibold leading-6 text-slate-600 md:mt-2 md:text-[14px] md:leading-7">
                      Completed events ordered from the most recent to the
                      oldest.
                    </p>
                  </div>

                  <div className="hidden text-[12px] font-black text-slate-500 md:block">
                    {endedEvents.length} past events
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
              <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 md:px-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
                      2026 Event Calendar
                    </span>

                    <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 md:text-[32px]">
                      Forex Expos and FinTech Conferences by Month
                    </h2>

                    <p className="mt-2 max-w-3xl text-[13px] font-semibold leading-7 text-slate-600 md:text-[14px]">
                      Browse upcoming forex expos, online trading conferences
                      and fintech events by month, with quick access to event
                      dates, destinations and venue details.
                    </p>
                  </div>

                  <div className="hidden rounded-2xl border border-brand-100 bg-brand-50 px-5 py-3 text-center lg:block">
                    <div className="text-[22px] font-black text-brand-600">
                      {upcomingEvents.length}
                    </div>

                    <div className="mt-1 text-[11px] font-bold text-brand-600">
                      Upcoming Events
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  {Object.entries(eventsByMonth).map(
                    ([month, monthEvents]) => (
                      <div
                        key={month}
                        className="overflow-hidden rounded-[22px] border border-slate-200 bg-white"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-brand-50 to-white px-3 py-3 md:px-4">
                          <h3 className="text-[15px] font-black text-slate-950">
                            {month}
                          </h3>

                          <span className="rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[10px] font-black text-brand-600 shadow-sm">
                            {monthEvents.length}{" "}
                            {monthEvents.length === 1 ? "event" : "events"}
                          </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                          {monthEvents.map((event) => (
                            <Link
                              key={event.id}
                              href={`/en/events/${event.slug}`}
                              className="group grid grid-cols-[48px_minmax(0,1fr)_20px] items-center gap-3 px-3 py-4 transition hover:bg-brand-50/60 md:grid-cols-[52px_minmax(0,1fr)_24px] md:px-4"
                            >
                              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 md:h-12 md:w-12">
                                <span className="text-[16px] font-black leading-none">
                                  {event.start_date
                                    ? Number(event.start_date.split("-")[2])
                                    : "—"}
                                </span>

                                <span className="mt-1 text-[8px] font-black uppercase">
                                  Day
                                </span>
                              </div>

                              <div className="min-w-0">
                                <h4
                                  title={getEventTitle(event)}
                                  className="line-clamp-2 break-words text-[13px] font-black leading-5 text-slate-950 transition group-hover:text-brand-600 md:text-[14px]"
                                >
                                  {getEventTitle(event)}
                                </h4>

                                <p className="mt-1 line-clamp-1 text-[11px] font-semibold text-slate-500">
                                  {getEventLocation(event)}
                                </p>
                              </div>

                              <span className="text-[18px] font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">
                                →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* EVENTS VALUE SECTION */}
            <section className="mt-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)] md:mt-10 md:rounded-[30px]">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                {/* MAIN CONTENT */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#f8fbff] via-white to-white px-4 py-6 md:px-7 md:py-8">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-80px] top-[-100px] h-[260px] w-[260px] rounded-full bg-brand-100/60 blur-3xl" />
                  </div>

                  <div className="relative">
                    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
                      Why Industry Events Matter
                    </span>

                    <h2 className="mt-3 max-w-2xl text-[24px] font-black leading-[1.35] text-slate-950 md:text-[32px]">
                      Why Forex Expos and FinTech Conferences Matter
                    </h2>

                    <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 md:text-[15px] md:leading-8">
                      Today’s forex and fintech events are more than
                      promotional gatherings. They bring brokers, liquidity
                      providers, payment firms, trading technology companies
                      and financial service providers together in one place.
                    </p>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 md:mt-4 md:text-[15px] md:leading-8">
                      These conferences help industry professionals track market
                      trends, evaluate new trading products, meet potential
                      partners and build relationships across the global online
                      trading ecosystem.
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-7 md:grid-cols-4 md:gap-3">
                      {[
                        ["🏦", "Forex Brokers"],
                        ["💧", "Liquidity Providers"],
                        ["💳", "Payment Companies"],
                        ["💻", "Trading Technology"],
                      ].map(([icon, label]) => (
                        <div
                          key={label}
                          className="flex min-h-[66px] flex-col items-center justify-center rounded-[16px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm md:min-h-[76px] md:rounded-[18px]"
                        >
                          <span className="text-[18px] md:text-[20px]">
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
                <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-4 py-6 text-white md:px-7 md:py-8">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute right-[-80px] top-[-100px] h-[260px] w-[260px] rounded-full bg-white/15 blur-3xl" />

                    <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:44px_44px]" />
                  </div>

                  <div className="relative">
                    <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-black text-white md:text-[11px]">
                      Broker Alarab Coverage
                    </span>

                    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-white md:text-[30px]">
                      Tracking Major Trading and FinTech Events
                    </h2>

                    <p className="mt-4 text-[13px] font-medium leading-7 text-white/80 md:text-[14px] md:leading-8">
                      We follow participating brokers, sponsors, exhibitors and
                      event organizers, with coverage focused on developments
                      that matter to the global trading industry.
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {[
                        ["📰", "Industry News and Press Releases"],
                        ["🤝", "Partnership and Networking Opportunities"],
                        ["📸", "Event Updates and Media Coverage"],
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
                      href="/en/contact"
                      className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-[14px] bg-white px-5 text-[12px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:bg-slate-100 md:min-h-[48px] md:rounded-2xl md:text-[13px]"
                    >
                      Contact Us About Media Coverage
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* EVENT PAGE FEATURES */}
            <section className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.04)] md:rounded-[30px]">
              <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 text-center md:px-7 md:py-7 md:text-left">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm md:text-[11px]">
                  Inside Each Event Guide
                </span>

                <h2 className="mx-auto mt-3 max-w-[295px] text-[23px] font-black leading-[1.35] text-slate-950 md:mx-0 md:max-w-none md:text-[31px]">
                  What You Can Find on Our Forex Event Pages
                </h2>

                <p className="mx-auto mt-2 max-w-[305px] text-[12px] font-semibold leading-6 text-slate-600 md:mx-0 md:max-w-3xl md:text-[14px] md:leading-7">
                  Each event page is designed to help visitors quickly review
                  dates, locations, participating companies and relevant event
                  coverage.
                </p>
              </div>

              {/* MOBILE */}
              <div className="space-y-2.5 p-3 md:hidden">
                {[
                  {
                    icon: "📅",
                    title: "Dates and Location",
                    text: "Event dates, host city and venue information.",
                  },
                  {
                    icon: "🏢",
                    title: "Participating Companies",
                    text: "Brokers, sponsors, exhibitors and service providers.",
                  },
                  {
                    icon: "📰",
                    title: "Media and Event Updates",
                    text: "Press releases and updates from event organizers.",
                  },
                  {
                    icon: "🎯",
                    title: "Industry Opportunities",
                    text: "Education, networking and access to financial brands.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex min-h-[72px] items-center gap-3 rounded-[16px] border border-slate-100 bg-slate-50 px-3 py-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[17px] shadow-sm">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1 text-left">
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
                    title: "Dates and Venue",
                    text: "Review event dates, the host destination and venue details before attending.",
                  },
                  {
                    icon: "🏢",
                    title: "Participating Companies",
                    text: "Discover brokers, sponsors, exhibitors and technology providers at the event.",
                  },
                  {
                    icon: "📰",
                    title: "Press and Event Updates",
                    text: "Follow announcements, press releases and updates from organizers and partners.",
                  },
                  {
                    icon: "🎯",
                    title: "Trading Industry Opportunities",
                    text: "Explore educational sessions, networking opportunities and direct access to brands.",
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

                    <p className="mt-2 min-h-[92px] text-[13px] font-medium leading-7 text-slate-600">
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
                  <div className="absolute left-[-100px] top-[-120px] h-[340px] w-[340px] rounded-full bg-white/15 blur-3xl" />

                  <div className="absolute bottom-[-140px] right-[-90px] h-[300px] w-[300px] rounded-full bg-brand-100/20 blur-3xl" />

                  <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:46px_46px]" />
                </div>

                <div className="relative">
                  <div className="text-center">
                    <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-black text-white md:text-[11px]">
                      Who Attends These Events?
                    </span>

                    <h2 className="mx-auto mt-3 max-w-[315px] text-[25px] font-black leading-[1.3] text-white md:max-w-3xl md:text-[36px]">
                      Who Benefits From Forex and FinTech Events?
                    </h2>

                    <p className="mx-auto mt-3 max-w-[315px] text-[12px] font-semibold leading-6 text-white/80 md:max-w-3xl md:text-[15px] md:leading-8">
                      These events bring together retail and institutional
                      traders, brokers, investors, technology firms, affiliates
                      and service providers from across the financial industry.
                    </p>
                  </div>

                  {/* MOBILE */}
                  <div className="mt-6 space-y-2.5 md:hidden">
                    {[
                      {
                        icon: "📊",
                        title: "Traders and Investors",
                        text: "New platforms, products and educational sessions.",
                      },
                      {
                        icon: "🏦",
                        title: "Forex Brokers",
                        text: "Partnerships and meetings with service providers.",
                      },
                      {
                        icon: "💻",
                        title: "FinTech Companies",
                        text: "Payments, trading tools and risk technology.",
                      },
                      {
                        icon: "🤝",
                        title: "Affiliates and Partners",
                        text: "Broker programs, networking and commercial deals.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex min-h-[76px] items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.06] px-3 py-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[17px]">
                          {item.icon}
                        </div>

                        <div className="min-w-0 flex-1 text-left">
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
                        title: "Traders and Investors",
                        text: "Discover trading platforms, financial products, market education and new investment services.",
                      },
                      {
                        icon: "🏦",
                        title: "Forex and CFD Brokers",
                        text: "Meet liquidity providers, payment companies, technology vendors and potential partners.",
                      },
                      {
                        icon: "💻",
                        title: "FinTech and Trading Technology",
                        text: "Present payment solutions, trading infrastructure, risk tools and brokerage technology.",
                      },
                      {
                        icon: "🤝",
                        title: "Affiliates and Business Partners",
                        text: "Connect with affiliate programs and identify new marketing and commercial partnerships.",
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

                        <p className="mt-2 min-h-[92px] text-[12px] font-medium leading-7 text-white/75">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.06] px-4 py-4 text-center md:mt-8 md:flex-row md:rounded-[22px] md:px-6 md:py-5 md:text-left">
                    <div>
                      <h3 className="text-[16px] font-black text-white md:text-[18px]">
                        Organizing a Financial or Trading Event?
                      </h3>

                      <p className="mt-1 text-[11px] font-semibold leading-6 text-white/75 md:text-[13px]">
                        Submit your event to Broker Alarab or discuss media
                        coverage and partnership opportunities with our team.
                      </p>
                    </div>

                    <Link
                      href="/en/contact"
                      className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-[14px] bg-white px-6 text-[12px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:bg-slate-100 md:min-h-[48px] md:w-auto md:rounded-2xl md:text-[13px]"
                    >
                      Submit Your Event
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