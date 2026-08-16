"use client";

import { useEffect, useMemo, useState } from "react";

type Session = {
  open: number;
  close: number;
};

type Market = {
  id: string;
  name: string;
  shortName: string;
  code: string;
  flag: string;
  timezone: string;
  sessions: Session[];
};

type MarketState = {
  market: Market;
  isOpen: boolean;
  nextChangeMinutes: number;
  nextChangeType: "open" | "close";
};

const markets: Market[] = [
  {
    id: "us",
    name: "السوق الأمريكي",
    shortName: "NYSE / Nasdaq",
    code: "US",
    flag: "🇺🇸",
    timezone: "America/New_York",
    sessions: [
      {
        open: 9 * 60 + 30,
        close: 16 * 60,
      },
    ],
  },
  {
    id: "london",
    name: "سوق لندن",
    shortName: "London",
    code: "GB",
    flag: "🇬🇧",
    timezone: "Europe/London",
    sessions: [
      {
        open: 8 * 60,
        close: 16 * 60 + 30,
      },
    ],
  },
  {
    id: "tokyo",
    name: "سوق طوكيو",
    shortName: "Tokyo",
    code: "JP",
    flag: "🇯🇵",
    timezone: "Asia/Tokyo",
    sessions: [
      {
        open: 9 * 60,
        close: 11 * 60 + 30,
      },
      {
        open: 12 * 60 + 30,
        close: 15 * 60 + 30,
      },
    ],
  },
  {
    id: "sydney",
    name: "سوق سيدني",
    shortName: "Sydney",
    code: "AU",
    flag: "🇦🇺",
    timezone: "Australia/Sydney",
    sessions: [
      {
        open: 10 * 60,
        close: 16 * 60,
      },
    ],
  },
];

const weekdays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function getTimeParts(
  date: Date,
  timezone: string
) {
  const formatter = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }
  );

  const parts = formatter.formatToParts(date);

  const hour = Number(
    parts.find(
      (part) => part.type === "hour"
    )?.value ?? 0
  );

  const minute = Number(
    parts.find(
      (part) => part.type === "minute"
    )?.value ?? 0
  );

  const weekday =
    parts.find(
      (part) => part.type === "weekday"
    )?.value ?? "Sun";

  return {
    weekday,
    minutes: hour * 60 + minute,
  };
}

function isTradingDay(day: string) {
  return !["Sat", "Sun"].includes(day);
}

function daysUntilNextTradingDay(
  day: string
) {
  const current = weekdays.indexOf(day);

  for (let i = 1; i <= 7; i++) {
    const next =
      weekdays[(current + i) % 7];

    if (isTradingDay(next)) {
      return i;
    }
  }

  return 1;
}

function calculateMarketState(
  market: Market,
  now: Date
): MarketState {
  const { weekday, minutes } =
    getTimeParts(
      now,
      market.timezone
    );

  if (!isTradingDay(weekday)) {
    const days =
      daysUntilNextTradingDay(
        weekday
      );

    return {
      market,
      isOpen: false,
      nextChangeMinutes:
        days * 1440 -
        minutes +
        market.sessions[0].open,
      nextChangeType: "open",
    };
  }

  for (
    const session of market.sessions
  ) {
    if (
      minutes >= session.open &&
      minutes < session.close
    ) {
      return {
        market,
        isOpen: true,
        nextChangeMinutes:
          session.close - minutes,
        nextChangeType: "close",
      };
    }

    if (minutes < session.open) {
      return {
        market,
        isOpen: false,
        nextChangeMinutes:
          session.open - minutes,
        nextChangeType: "open",
      };
    }
  }

  const days =
    daysUntilNextTradingDay(weekday);

  return {
    market,
    isOpen: false,
    nextChangeMinutes:
      days * 1440 -
      minutes +
      market.sessions[0].open,
    nextChangeType: "open",
  };
}

function getVisitorTimezone() {
  try {
    return Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone;
  } catch {
    return "UTC";
  }
}

function formatTimezoneName(
  timezone: string
) {
  const city = timezone
    .split("/")
    .pop()
    ?.replaceAll("_", " ");

  if (!city) {
    return "توقيتك المحلي";
  }

  const names: Record<
    string,
    string
  > = {
    Riyadh: "الرياض",
    Dubai: "دبي",
    Toronto: "تورونتو",
    Montreal: "مونتريال",
    Vancouver: "فانكوفر",
    London: "لندن",
    Cairo: "القاهرة",
    Amman: "عمّان",
    Baghdad: "بغداد",
    Kuwait: "الكويت",
    Qatar: "الدوحة",
    Bahrain: "المنامة",
    Muscat: "مسقط",
    Casablanca: "الدار البيضاء",
    Tunis: "تونس",
    Tokyo: "طوكيو",
    Sydney: "سيدني",
    "New York": "نيويورك",
    Paris: "باريس",
    Berlin: "برلين",
    Chicago: "شيكاغو",
    Detroit: "ديترويت",
    Edmonton: "إدمونتون",
    Halifax: "هاليفاكس",
    Winnipeg: "وينيبيغ",
  };

  return names[city] ?? city;
}

function formatTime(
  date: Date,
  timezone: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  ).format(date);
}

function getUTCOffset(
  date: Date,
  timezone: string
) {
  try {
    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: timezone,
          timeZoneName:
            "shortOffset",
        }
      ).formatToParts(date);

    const offset =
      parts.find(
        (part) =>
          part.type ===
          "timeZoneName"
      )?.value ?? "";

    return offset.replace(
      "GMT",
      "UTC"
    );
  } catch {
    return "";
  }
}

/* =====================================================
   COUNTDOWN — واضح بالعربي
===================================================== */
function formatCountdown(
  minutes: number
) {
  const safe = Math.max(
    0,
    Math.floor(minutes)
  );

  const days = Math.floor(
    safe / 1440
  );

  const hours = Math.floor(
    (safe % 1440) / 60
  );

  const mins = safe % 60;

  if (days > 0) {
    if (hours > 0) {
      return `${days} يوم ${hours} ساعة`;
    }

    return `${days} يوم`;
  }

  if (hours > 0) {
    if (mins > 0) {
      return `${hours} ساعة ${mins} دقيقة`;
    }

    return `${hours} ساعة`;
  }

  return `${mins} دقيقة`;
}

function getChangeTime(
  now: Date,
  minutes: number,
  visitorTimezone: string
) {
  const target = new Date(
    now.getTime() +
      minutes * 60 * 1000
  );

  return formatTime(
    target,
    visitorTimezone
  );
}

function getTimelineSegments(
  market: Market,
  now: Date,
  visitorTimezone: string
) {
  const marketNow =
    getTimeParts(
      now,
      market.timezone
    ).minutes;

  const visitorNow =
    getTimeParts(
      now,
      visitorTimezone
    ).minutes;

  let offset =
    visitorNow - marketNow;

  if (offset > 720) {
    offset -= 1440;
  }

  if (offset < -720) {
    offset += 1440;
  }

  return market.sessions.flatMap(
    (session) => {
      let start =
        session.open + offset;

      let end =
        session.close + offset;

      while (start < 0) {
        start += 1440;
        end += 1440;
      }

      while (start >= 1440) {
        start -= 1440;
        end -= 1440;
      }

      if (end <= 1440) {
        return [
          {
            left:
              (start / 1440) *
              100,
            width:
              ((end - start) /
                1440) *
              100,
          },
        ];
      }

      return [
        {
          left:
            (start / 1440) *
            100,
          width:
            ((1440 - start) /
              1440) *
            100,
        },
        {
          left: 0,
          width:
            ((end - 1440) /
              1440) *
            100,
        },
      ];
    }
  );
}

export default function MarketHoursTool() {
  const [now, setNow] =
    useState<Date | null>(null);

  const [timezone, setTimezone] =
    useState("");

  useEffect(() => {
    setNow(new Date());

    setTimezone(
      getVisitorTimezone()
    );

    const interval =
      window.setInterval(() => {
        setNow(new Date());
      }, 30_000);

    return () =>
      window.clearInterval(
        interval
      );
  }, []);

  const states = useMemo(() => {
    if (!now) {
      return [];
    }

    return markets.map(
      (market) =>
        calculateMarketState(
          market,
          now
        )
    );
  }, [now]);

  const openMarkets =
    states.filter(
      (market) =>
        market.isOpen
    );

  const nextMarket = [
    ...states,
  ]
    .filter(
      (market) =>
        !market.isOpen
    )
    .sort(
      (a, b) =>
        a.nextChangeMinutes -
        b.nextChangeMinutes
    )[0];

  if (!now || !timezone) {
    return (
      <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">

        <div className="h-[96px] animate-pulse rounded-[20px] bg-slate-100" />

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-[170px] animate-pulse rounded-[20px] bg-slate-100"
              />
            )
          )}

        </div>

      </div>
    );
  }

  const currentVisitorMinutes =
    getTimeParts(
      now,
      timezone
    ).minutes;

  const timelinePosition =
    (currentVisitorMinutes /
      1440) *
    100;

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.065)]">

      {/* =====================================================
          TOP
      ====================================================== */}
      <div className="border-b border-slate-100 bg-gradient-to-l from-[#f7fbff] via-white to-[#edf5ff] px-4 py-4 sm:px-6 sm:py-5 lg:px-7">

        {/* MOBILE */}
        <div className="sm:hidden">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <h2 className="text-[19px] font-black text-[#07111f]">
                  حالة الأسواق الآن
                </h2>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[7px] font-black text-emerald-700">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  LIVE

                </span>

              </div>

              <p className="mt-1.5 text-[10px] font-semibold text-slate-500">
                المواعيد حسب توقيت{" "}
                {formatTimezoneName(
                  timezone
                )}
              </p>

            </div>

            <div
              dir="ltr"
              className="shrink-0 text-left"
            >

              <div className="text-[18px] font-black text-brand-600">
                {formatTime(
                  now,
                  timezone
                )}
              </div>

              <div className="mt-0.5 text-[8px] font-bold text-slate-400">
                {getUTCOffset(
                  now,
                  timezone
                )}
              </div>

            </div>

          </div>

          <div
            className={`mt-4 rounded-[16px] border px-3.5 py-3 ${
              openMarkets.length > 0
                ? "border-emerald-200 bg-emerald-50/70"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="flex items-center gap-2.5">

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  openMarkets.length > 0
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
              />

              <span
                className={`text-[12px] font-black ${
                  openMarkets.length > 0
                    ? "text-emerald-700"
                    : "text-slate-700"
                }`}
              >
                {openMarkets.length > 0
                  ? `${openMarkets.length} من الأسواق الرئيسية مفتوحة الآن`
                  : "الأسواق الرئيسية مغلقة الآن"}
              </span>

            </div>

            {nextMarket && (
              <div className="mt-2 text-[9px] font-bold leading-5 text-slate-500">

                التالي:{" "}

                <span className="font-black text-brand-600">
                  {
                    nextMarket
                      .market
                      .name
                  }
                </span>

                {" "}بعد{" "}

                <span className="font-black text-brand-600">
                  {formatCountdown(
                    nextMarket.nextChangeMinutes
                  )}
                </span>

              </div>
            )}

          </div>

        </div>

        {/* DESKTOP */}
        <div className="hidden items-center justify-between gap-6 sm:flex">

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-[24px] font-black text-[#07111f] lg:text-[28px]">
                حالة الأسواق العالمية الآن
              </h2>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-700">

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                LIVE

              </span>

            </div>

            <p className="mt-1.5 text-[12px] font-semibold text-slate-500">
              حالة مباشرة ومواعيد محسوبة تلقائيًا حسب توقيتك المحلي
            </p>

          </div>

          <div className="flex items-center gap-4 rounded-[18px] border border-brand-100 bg-white px-5 py-3 shadow-sm">

            <div>

              <div className="text-[9px] font-bold text-slate-400">
                توقيتك المحلي
              </div>

              <div className="mt-0.5 text-[12px] font-black text-slate-800">
                {formatTimezoneName(
                  timezone
                )}
              </div>

            </div>

            <div className="h-9 w-px bg-slate-200" />

            <div
              dir="ltr"
              className="text-left"
            >

              <div className="text-[20px] font-black text-brand-600">
                {formatTime(
                  now,
                  timezone
                )}
              </div>

              <div className="mt-0.5 text-[8px] font-bold text-slate-400">
                {getUTCOffset(
                  now,
                  timezone
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MOBILE MARKET CARDS
      ====================================================== */}
      <div className="space-y-3 p-3 sm:hidden">

        {states.map((item) => (

          <article
            key={
              item.market.id
            }
            className={`overflow-hidden rounded-[20px] border ${
              item.isOpen
                ? "border-emerald-200 bg-emerald-50/45"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="p-3.5">

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-slate-200 bg-white text-[11px] font-black text-slate-700 shadow-sm">
                    {
                      item.market
                        .code
                    }
                  </span>

                  <div className="min-w-0">

                    <h3 className="truncate text-[14px] font-black text-slate-900">
                      {
                        item.market
                          .name
                      }
                    </h3>

                    <p
                      dir="ltr"
                      className="mt-0.5 text-right text-[9px] font-bold text-slate-500"
                    >
                      {
                        item.market
                          .shortName
                      }
                    </p>

                  </div>

                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[9px] font-black ${
                    item.isOpen
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >

                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.isOpen
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                  />

                  {item.isOpen
                    ? "مفتوح الآن"
                    : "مغلق"}

                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3.5">

                <div>

                  <div className="text-[9px] font-bold text-slate-400">
                    {item.nextChangeType ===
                    "close"
                      ? "يغلق الساعة"
                      : "يفتح الساعة"}
                  </div>

                  <div
                    dir="ltr"
                    className="mt-1 text-right text-[15px] font-black text-brand-600"
                  >
                    {getChangeTime(
                      now,
                      item.nextChangeMinutes,
                      timezone
                    )}
                  </div>

                </div>

                <div>

                  <div className="text-[9px] font-bold text-slate-400">
                    الوقت المتبقي
                  </div>

                  <div
                    className={`mt-1 text-right text-[13px] font-black leading-6 ${
                      item.isOpen
                        ? "text-emerald-700"
                        : "text-slate-900"
                    }`}
                  >
                    {formatCountdown(
                      item.nextChangeMinutes
                    )}
                  </div>

                </div>

              </div>

            </div>

          </article>

        ))}

      </div>

      {/* =====================================================
          DESKTOP MARKET CARDS
      ====================================================== */}
      <div className="hidden grid-cols-2 gap-3 p-5 sm:grid lg:p-6 xl:grid-cols-4">

        {states.map((item) => (

          <article
            key={
              item.market.id
            }
            className={`relative overflow-hidden rounded-[22px] border p-4 transition duration-300 ${
              item.isOpen
                ? "border-emerald-200 bg-emerald-50/55"
                : "border-slate-200 bg-[#fbfdff]"
            }`}
          >

            {item.isOpen && (
              <div className="absolute inset-x-0 top-0 h-[3px] bg-emerald-500" />
            )}

            <div className="flex items-start justify-between gap-3">

              <div className="flex min-w-0 items-center gap-3">

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-slate-200 bg-white text-[12px] font-black text-slate-700 shadow-sm">
                  {
                    item.market
                      .code
                  }
                </span>

                <div className="min-w-0">

                  <h3 className="truncate text-[14px] font-black text-slate-900">
                    {
                      item.market
                        .name
                    }
                  </h3>

                  <div
                    dir="ltr"
                    className="mt-0.5 text-right text-[9px] font-bold text-slate-500"
                  >
                    {
                      item.market
                        .shortName
                    }
                  </div>

                </div>

              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8.5px] font-black ${
                  item.isOpen
                    ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >

                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.isOpen
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />

                {item.isOpen
                  ? "مفتوح"
                  : "مغلق"}

              </span>

            </div>

            <div className="mt-5 border-t border-slate-200/70 pt-4">

              <div className="flex items-center justify-between gap-3">

                <span className="text-[9px] font-bold text-slate-400">
                  {item.nextChangeType ===
                  "close"
                    ? "موعد الإغلاق"
                    : "موعد الافتتاح"}
                </span>

                <span
                  dir="ltr"
                  className="text-[14px] font-black text-brand-600"
                >
                  {getChangeTime(
                    now,
                    item.nextChangeMinutes,
                    timezone
                  )}
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between gap-3">

                <span className="text-[9px] font-bold text-slate-400">
                  الوقت المتبقي
                </span>

                <span
                  className={`whitespace-nowrap text-[13px] font-black ${
                    item.isOpen
                      ? "text-emerald-700"
                      : "text-slate-900"
                  }`}
                >
                  {formatCountdown(
                    item.nextChangeMinutes
                  )}
                </span>

              </div>

            </div>

          </article>

        ))}

      </div>

      {/* =====================================================
    TIMELINE
====================================================== */}
<div className="border-t border-slate-100 px-3 py-5 sm:px-6 sm:py-6 lg:px-7">

  {/* =====================================================
      MOBILE TIMELINE — NO HORIZONTAL SCROLL
  ====================================================== */}
  <div className="sm:hidden">

    <div className="mb-4">

      <span className="text-[10px] font-black text-brand-600">
        اليوم حسب توقيتك
      </span>

      <h2 className="mt-1 text-[21px] font-black leading-[1.25] text-[#07111f]">
        خريطة ساعات الأسواق خلال 24 ساعة
      </h2>

      <p className="mt-1.5 text-[10px] font-semibold leading-5 text-slate-500">
        المواعيد التالية محسوبة تلقائيًا حسب توقيتك المحلي.
      </p>

    </div>

    <div className="space-y-3">

      {states.map((item) => {
        const market = item.market;

        const segments = getTimelineSegments(
          market,
          now,
          timezone
        );

        return (
          <div
            key={market.id}
            className={`overflow-hidden rounded-[18px] border ${
              item.isOpen
                ? "border-emerald-200 bg-emerald-50/40"
                : "border-slate-200 bg-white"
            }`}
          >

            {/* MARKET HEADER */}
            <div className="flex items-center justify-between gap-3 px-3.5 py-3">

              <div className="flex min-w-0 items-center gap-2.5">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-[9px] font-black text-slate-600 shadow-sm">
                  {market.code}
                </span>

                <div className="min-w-0">

                  <div className="truncate text-[13px] font-black text-slate-900">
                    {market.name}
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 text-right text-[8px] font-bold text-slate-500"
                  >
                    {market.shortName}
                  </div>

                </div>

              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8.5px] font-black ${
                  item.isOpen
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.isOpen
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />

                {item.isOpen ? "مفتوح الآن" : "مغلق"}
              </span>

            </div>

            {/* TIMES */}
            <div className="grid grid-cols-2 border-t border-slate-100">

              <div className="border-l border-slate-100 px-3.5 py-3">

                <div className="text-[8px] font-bold text-slate-400">
                  {item.nextChangeType === "close"
                    ? "يغلق الساعة"
                    : "يفتح الساعة"}
                </div>

                <div
                  dir="ltr"
                  className="mt-1 text-right text-[14px] font-black text-brand-600"
                >
                  {getChangeTime(
                    now,
                    item.nextChangeMinutes,
                    timezone
                  )}
                </div>

              </div>

              <div className="px-3.5 py-3">

                <div className="text-[8px] font-bold text-slate-400">
                  الوقت المتبقي
                </div>

                <div
                  className={`mt-1 text-[12px] font-black leading-5 ${
                    item.isOpen
                      ? "text-emerald-700"
                      : "text-slate-900"
                  }`}
                >
                  {formatCountdown(
                    item.nextChangeMinutes
                  )}
                </div>

              </div>

            </div>

            {/* MINI 24H BAR */}
            <div className="border-t border-slate-100 px-3.5 pb-3.5 pt-3">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-[8px] font-bold text-slate-400">
                  00:00
                </span>

                <span className="text-[8px] font-bold text-slate-400">
                  06:00
                </span>

                <span className="text-[8px] font-bold text-slate-400">
                  12:00
                </span>

                <span className="text-[8px] font-bold text-slate-400">
                  18:00
                </span>

                <span className="text-[8px] font-bold text-slate-400">
                  24:00
                </span>

              </div>

              <div className="relative h-9 overflow-hidden rounded-[11px] border border-slate-200 bg-slate-50">

                {/* GRID */}
                <div className="absolute inset-0 grid grid-cols-4">

                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="border-l border-slate-200/80 last:border-0"
                    />
                  ))}

                </div>

                {/* MARKET SESSIONS */}
                {segments.map((segment, index) => (
                  <div
                    key={index}
                    className={`absolute top-1/2 h-[14px] -translate-y-1/2 rounded-full ${
                      item.isOpen
                        ? "bg-emerald-500"
                        : "bg-brand-500"
                    }`}
                    style={{
                      left: `${segment.left}%`,
                      width: `${segment.width}%`,
                    }}
                  />
                ))}

                {/* CURRENT TIME */}
                <div
                  className="absolute inset-y-0 z-20 w-[2px] bg-rose-500"
                  style={{
                    left: `${timelinePosition}%`,
                  }}
                >
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-white bg-rose-500" />
                </div>

              </div>

            </div>

          </div>
        );
      })}

    </div>

    {/* LEGEND */}
    <div className="mt-4 flex flex-wrap items-center gap-4 text-[8.5px] font-bold text-slate-500">

      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-5 rounded-full bg-brand-500" />
        ساعات التداول
      </span>

      <span className="flex items-center gap-1.5">
        <span className="h-3 w-[2px] bg-rose-500" />
        الوقت الحالي
      </span>

      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-5 rounded-full bg-emerald-500" />
        السوق مفتوح
      </span>

    </div>

  </div>

  {/* =====================================================
      DESKTOP TIMELINE — KEEP CURRENT FULL 24H VIEW
  ====================================================== */}
  <div className="hidden sm:block">

    <div className="mb-5 flex items-end justify-between gap-5">

      <div>

        <span className="text-[10px] font-black text-brand-600">
          اليوم حسب توقيتك
        </span>

        <h2 className="mt-1 text-[26px] font-black text-[#07111f]">
          خريطة ساعات الأسواق خلال 24 ساعة
        </h2>

        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          جميع الساعات في الرسم محسوبة حسب توقيتك المحلي.
        </p>

      </div>

      <div className="rounded-xl bg-brand-50 px-3 py-2 text-left">

        <div className="text-[8px] font-bold text-slate-400">
          الوقت الحالي
        </div>

        <div
          dir="ltr"
          className="mt-0.5 text-[13px] font-black text-brand-600"
        >
          {formatTime(now, timezone)}
        </div>

      </div>

    </div>

    <div className="overflow-hidden">

      <div>

        {/* HOURS */}
        <div className="mr-[125px] grid grid-cols-8 text-center">

          {[
            "00",
            "03",
            "06",
            "09",
            "12",
            "15",
            "18",
            "21",
          ].map((hour) => (
            <span
              key={hour}
              className="text-[9px] font-bold text-slate-400"
            >
              {hour}:00
            </span>
          ))}

        </div>

        <div className="mt-3 space-y-3">

          {markets.map((market) => {
            const segments = getTimelineSegments(
              market,
              now,
              timezone
            );

            return (
              <div
                key={market.id}
                className="grid grid-cols-[112px_1fr] items-center gap-3"
              >

                <div className="flex items-center gap-2.5">

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[8px] font-black text-slate-600">
                    {market.code}
                  </span>

                  <div>

                    <div className="text-[10px] font-black text-slate-800">
                      {market.name}
                    </div>

                    <div
                      dir="ltr"
                      className="mt-0.5 text-right text-[7.5px] font-bold text-slate-400"
                    >
                      {market.shortName}
                    </div>

                  </div>

                </div>

                <div className="relative h-11 overflow-hidden rounded-[12px] border border-slate-200 bg-slate-50">

                  <div className="absolute inset-0 grid grid-cols-8">

                    {Array.from({
                      length: 8,
                    }).map((_, index) => (
                      <div
                        key={index}
                        className="border-l border-slate-200/75 last:border-0"
                      />
                    ))}

                  </div>

                  {segments.map(
                    (segment, index) => (
                      <div
                        key={index}
                        className="absolute top-1/2 h-5 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_4px_12px_rgba(30,91,184,0.20)]"
                        style={{
                          left: `${segment.left}%`,
                          width: `${segment.width}%`,
                        }}
                      />
                    )
                  )}

                  <div
                    className="absolute inset-y-0 z-20 w-[2px] bg-rose-500"
                    style={{
                      left: `${timelinePosition}%`,
                    }}
                  >
                    <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-rose-500 shadow-sm" />
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>

    <div className="mt-4 flex flex-wrap items-center gap-5 text-[9px] font-bold text-slate-500">

      <span className="flex items-center gap-2">

        <span className="h-3 w-6 rounded-full bg-brand-500" />

        ساعات التداول

      </span>

      <span className="flex items-center gap-2">

        <span className="h-4 w-[2px] bg-rose-500" />

        الوقت الحالي

      </span>

    </div>

  </div>

</div>

      {/* =====================================================
          NOTE
      ====================================================== */}
      <div className="border-t border-amber-100 bg-amber-50/70 px-4 py-3.5 text-[10px] font-semibold leading-6 text-amber-900 sm:px-6 sm:text-[11px]">

        تعتمد الحالة على ساعات التداول المعتادة وأيام العمل. قد تغلق بعض
        البورصات أو تقلص ساعات التداول خلال العطلات الرسمية أو أيام
        الإغلاق المبكر.

      </div>

    </div>
  );
}