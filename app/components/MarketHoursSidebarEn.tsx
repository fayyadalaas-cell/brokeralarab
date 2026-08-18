"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MarketSession = {
  id: string;
  name: string;
  shortName: string;
  code: string;
  timezone: string;
  sessions: {
    open: number;
    close: number;
  }[];
};

type MarketState = {
  market: MarketSession;
  isOpen: boolean;
  currentMinutes: number;
  nextChangeMinutes: number;
  nextChangeType: "open" | "close";
};

const markets: MarketSession[] = [
  {
    id: "us",
    name: "U.S. Market",
    shortName: "NYSE / Nasdaq",
    code: "US",
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
    name: "London Market",
    shortName: "London",
    code: "GB",
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
    name: "Tokyo Market",
    shortName: "Tokyo",
    code: "JP",
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
    name: "Sydney Market",
    shortName: "Sydney",
    code: "AU",
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

function weekdayIndex(day: string) {
  return weekdays.indexOf(day);
}

function getMarketTime(
  date: Date,
  timeZone: string
) {
  const formatter = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone,
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
  const current = weekdayIndex(day);

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
  market: MarketSession,
  now: Date
): MarketState {
  const { weekday, minutes } =
    getMarketTime(now, market.timezone);

  const tradingDay =
    isTradingDay(weekday);

  if (!tradingDay) {
    const days =
      daysUntilNextTradingDay(weekday);

    const firstOpen =
      market.sessions[0].open;

    return {
      market,
      isOpen: false,
      currentMinutes: minutes,
      nextChangeMinutes:
        days * 24 * 60 -
        minutes +
        firstOpen,
      nextChangeType: "open",
    };
  }

  for (
    let i = 0;
    i < market.sessions.length;
    i++
  ) {
    const session =
      market.sessions[i];

    if (
      minutes >= session.open &&
      minutes < session.close
    ) {
      return {
        market,
        isOpen: true,
        currentMinutes: minutes,
        nextChangeMinutes:
          session.close - minutes,
        nextChangeType: "close",
      };
    }

    if (minutes < session.open) {
      return {
        market,
        isOpen: false,
        currentMinutes: minutes,
        nextChangeMinutes:
          session.open - minutes,
        nextChangeType: "open",
      };
    }
  }

  const days =
    daysUntilNextTradingDay(weekday);

  const firstOpen =
    market.sessions[0].open;

  return {
    market,
    isOpen: false,
    currentMinutes: minutes,
    nextChangeMinutes:
      days * 24 * 60 -
      minutes +
      firstOpen,
    nextChangeType: "open",
  };
}

function formatCountdown(
  totalMinutes: number
) {
  const safeMinutes = Math.max(
    0,
    Math.floor(totalMinutes)
  );

  const days = Math.floor(
    safeMinutes / 1440
  );

  const hours = Math.floor(
    (safeMinutes % 1440) / 60
  );

  const minutes =
    safeMinutes % 60;

  if (days > 0) {
    if (hours > 0) {
      return `${days}d ${hours}h`;
    }

    return `${days}d`;
  }

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${hours}h`;
  }

  return `${minutes}m`;
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
    return "Local Time";
  }

  const names: Record<
    string,
    string
  > = {
    Riyadh: "Riyadh",
    Dubai: "Dubai",
    Toronto: "Toronto",
    Montreal: "Montreal",
    Vancouver: "Vancouver",
    London: "London",
    Paris: "Paris",
    Berlin: "Berlin",
    Cairo: "Cairo",
    Amman: "Amman",
    Baghdad: "Baghdad",
    Kuwait: "Kuwait",
    Qatar: "Doha",
    Bahrain: "Manama",
    Muscat: "Muscat",
    Casablanca: "Casablanca",
    Tunis: "Tunis",
    Tokyo: "Tokyo",
    Sydney: "Sydney",
    "New York": "New York",
    Chicago: "Chicago",
    Detroit: "Detroit",
    Edmonton: "Edmonton",
    Halifax: "Halifax",
    Winnipeg: "Winnipeg",
  };

  return names[city] ?? city;
}

function formatVisitorTime(
  date: Date,
  timezone: string
) {
  try {
    return new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    ).format(date);
  } catch {
    return "";
  }
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
   REAL SVG FLAGS
===================================================== */

function FlagIcon({
  country,
  className = "",
}: {
  country:
    | "US"
    | "GB"
    | "JP"
    | "AU";
  className?: string;
}) {
  if (country === "US") {
    return (
      <svg
        viewBox="0 0 60 40"
        className={className}
        aria-label="United States"
      >
        <clipPath id="us-clip-en">
          <rect
            width="60"
            height="40"
            rx="4"
          />
        </clipPath>

        <g clipPath="url(#us-clip-en)">
          <rect
            width="60"
            height="40"
            fill="#fff"
          />

          {[
            0,
            6.15,
            12.3,
            18.45,
            24.6,
            30.75,
            36.9,
          ].map((y) => (
            <rect
              key={y}
              y={y}
              width="60"
              height="3.08"
              fill="#B22234"
            />
          ))}

          <rect
            width="26"
            height="21.5"
            fill="#3C3B6E"
          />

          {[
            [4, 4],
            [9, 4],
            [14, 4],
            [19, 4],
            [24, 4],
            [6.5, 8],
            [11.5, 8],
            [16.5, 8],
            [21.5, 8],
            [4, 12],
            [9, 12],
            [14, 12],
            [19, 12],
            [24, 12],
            [6.5, 16],
            [11.5, 16],
            [16.5, 16],
            [21.5, 16],
          ].map(
            (
              [cx, cy],
              index
            ) => (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r="0.9"
                fill="#fff"
              />
            )
          )}
        </g>
      </svg>
    );
  }

  if (country === "GB") {
    return (
      <svg
        viewBox="0 0 60 40"
        className={className}
        aria-label="United Kingdom"
      >
        <clipPath id="gb-clip-en">
          <rect
            width="60"
            height="40"
            rx="4"
          />
        </clipPath>

        <g clipPath="url(#gb-clip-en)">
          <rect
            width="60"
            height="40"
            fill="#012169"
          />

          <path
            d="M0 0L60 40M60 0L0 40"
            stroke="#fff"
            strokeWidth="8"
          />

          <path
            d="M0 0L60 40M60 0L0 40"
            stroke="#C8102E"
            strokeWidth="4"
          />

          <path
            d="M30 0V40M0 20H60"
            stroke="#fff"
            strokeWidth="12"
          />

          <path
            d="M30 0V40M0 20H60"
            stroke="#C8102E"
            strokeWidth="7"
          />
        </g>
      </svg>
    );
  }

  if (country === "JP") {
    return (
      <svg
        viewBox="0 0 60 40"
        className={className}
        aria-label="Japan"
      >
        <rect
          width="60"
          height="40"
          rx="4"
          fill="#fff"
        />

        <circle
          cx="30"
          cy="20"
          r="10"
          fill="#BC002D"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-label="Australia"
    >
      <clipPath id="au-clip-en">
        <rect
          width="60"
          height="40"
          rx="4"
        />
      </clipPath>

      <g clipPath="url(#au-clip-en)">
        <rect
          width="60"
          height="40"
          fill="#012169"
        />

        <g transform="scale(.5)">
          <path
            d="M0 0L60 40M60 0L0 40"
            stroke="#fff"
            strokeWidth="8"
          />

          <path
            d="M0 0L60 40M60 0L0 40"
            stroke="#C8102E"
            strokeWidth="4"
          />

          <path
            d="M30 0V40M0 20H60"
            stroke="#fff"
            strokeWidth="12"
          />

          <path
            d="M30 0V40M0 20H60"
            stroke="#C8102E"
            strokeWidth="7"
          />
        </g>

        <circle
          cx="43"
          cy="10"
          r="2"
          fill="#fff"
        />

        <circle
          cx="49"
          cy="19"
          r="1.7"
          fill="#fff"
        />

        <circle
          cx="40"
          cy="27"
          r="1.7"
          fill="#fff"
        />

        <circle
          cx="53"
          cy="29"
          r="1.4"
          fill="#fff"
        />

        <circle
          cx="31"
          cy="31"
          r="2.2"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

/* =====================================================
   SIDEBAR
===================================================== */

export default function MarketHoursSidebarEn() {
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

  const marketStates =
    useMemo(() => {
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
    marketStates.filter(
      (item) => item.isOpen
    );

  const nextMarket = [
    ...marketStates,
  ]
    .filter(
      (item) => !item.isOpen
    )
    .sort(
      (a, b) =>
        a.nextChangeMinutes -
        b.nextChangeMinutes
    )[0];

  const featuredMarket =
    openMarkets.find(
      (item) =>
        item.market.id === "us"
    ) ??
    openMarkets[0] ??
    nextMarket;

  const visitorTime =
    now && timezone
      ? formatVisitorTime(
          now,
          timezone
        )
      : "";

  const utcOffset =
    now && timezone
      ? getUTCOffset(
          now,
          timezone
        )
      : "";

  return (
    <div
      dir="ltr"
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        bg-white
        shadow-[0_10px_28px_rgba(15,23,42,0.055)]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_100%)] px-4 pb-3 pt-3">

        <div className="flex items-center justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">

            {/* 24H CLOCK */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

              <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

              <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

              <span className="absolute right-[5px] top-[7px] h-[14px] w-[14px] rounded-tr-full border-r-[3px] border-t-[3px] border-blue-400" />

              <span className="absolute bottom-[6px] left-[6px] h-[13px] w-[13px] rounded-bl-full border-b-[3px] border-l-[3px] border-cyan-400" />

              <div className="relative z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border border-white/10 bg-[#07182d] shadow-[0_2px_8px_rgba(0,0,0,0.22)]">

                <span className="text-[10px] font-black leading-none tracking-[-0.04em] text-white">
                  24H
                </span>

              </div>

              <span className="absolute bottom-[8px] right-[7px] z-20 h-[5px] w-[5px] rounded-full border border-[#0a1d36] bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.7)]" />

            </div>

            {/* TITLE */}
            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <h3 className="text-[14px] font-black text-[#07111f]">
                  Market Status
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[7px] font-black text-emerald-700">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  LIVE

                </span>

              </div>

              <p className="mt-0.5 text-[8.5px] font-semibold text-slate-500">
                Based on your local time
              </p>

            </div>

          </div>

        </div>

        {/* LOCAL TIME */}
        <div className="mt-2.5 flex items-center justify-between rounded-[13px] border border-brand-100 bg-white px-3 py-2 shadow-[0_3px_10px_rgba(15,23,42,0.05)]">

          <div className="text-left">

            <div className="text-[8px] font-bold text-slate-400">
              Your Time
            </div>

            <div className="mt-0.5 text-[10px] font-black text-slate-700">
              {timezone
                ? formatTimezoneName(
                    timezone
                  )
                : "Detecting..."}
            </div>

          </div>

          <div className="text-right">

            <div className="text-[16px] font-black text-brand-600">
              {visitorTime ||
                "--:--"}
            </div>

            <div className="mt-0.5 text-[8px] font-bold text-slate-400">
              {utcOffset ||
                "UTC"}
            </div>

          </div>

        </div>

      </div>

      {!now ? (
        <div className="space-y-2 p-3">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="h-[54px] animate-pulse rounded-[14px] bg-slate-100"
              />
            )
          )}

        </div>
      ) : (
        <>
          {/* =====================================================
              FEATURED MARKET
          ====================================================== */}
          {featuredMarket && (
            <div className="px-3 pb-2 pt-3">

              <div
                className={`
                  relative overflow-hidden rounded-[18px] border
                  px-3.5 py-3.5
                  ${
                    featuredMarket.isOpen
                      ? "border-emerald-200 bg-[linear-gradient(135deg,#ffffff_0%,#f1fcf7_100%)] shadow-[0_6px_18px_rgba(16,185,129,0.07)]"
                      : "border-slate-200 bg-white"
                  }
                `}
              >
                {featuredMarket.isOpen && (
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-emerald-400" />
                )}

                {/* TOP */}
                <div className="flex items-center justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2.5">

                    {/* ROUND FLAG */}
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[2px] border-white bg-slate-100 shadow-[0_2px_8px_rgba(15,23,42,0.14)] ring-1 ring-slate-200">

                      <FlagIcon
                        country={
                          featuredMarket
                            .market
                            .code as
                            | "US"
                            | "GB"
                            | "JP"
                            | "AU"
                        }
                        className="h-full w-full scale-[1.42]"
                      />

                    </div>

                    <div className="min-w-0">

                      <div className="whitespace-nowrap text-[13px] font-black leading-tight text-[#0b172a]">
                        {
                          featuredMarket
                            .market
                            .name
                        }
                      </div>

                      <div className="mt-0.5 text-[7px] font-bold text-slate-400">
                        {
                          featuredMarket
                            .market
                            .shortName
                        }
                      </div>

                    </div>

                  </div>

                  {/* STATUS */}
                  <div
                    className={`
                      inline-flex shrink-0 items-center gap-1.5
                      rounded-full px-2.5 py-1.5
                      text-[7.5px] font-black
                      ${
                        featuredMarket.isOpen
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        featuredMarket.isOpen
                          ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.10)]"
                          : "bg-slate-400"
                      }`}
                    />

                    {featuredMarket.isOpen
                      ? "Open Now"
                      : "Closed"}

                  </div>

                </div>

                {/* COUNTDOWN */}
                <div className="mt-3 border-t border-emerald-100/70 pt-2.5">

                  <div className="flex items-center justify-between gap-3">

                    <span className="text-[8px] font-bold text-slate-400">
                      {featuredMarket.nextChangeType ===
                      "close"
                        ? "Closes in"
                        : "Opens in"}
                    </span>

                    <span
                      className={`whitespace-nowrap text-[14px] font-black tracking-[-0.02em] ${
                        featuredMarket.isOpen
                          ? "text-emerald-700"
                          : "text-brand-600"
                      }`}
                    >
                      {formatCountdown(
                        featuredMarket.nextChangeMinutes
                      )}
                    </span>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* =====================================================
              OTHER MARKETS
          ====================================================== */}
          <div className="px-3 pb-2.5 pt-1">

            <div className="overflow-hidden rounded-[16px] border border-slate-100 bg-[#fbfcfe]">

              {marketStates
                .filter(
                  (item) =>
                    item.market.id !==
                    featuredMarket
                      ?.market.id
                )
                .map(
                  (
                    item,
                    index,
                    array
                  ) => (
                    <div
                      key={
                        item.market.id
                      }
                      className={`
                        px-3 py-2.5
                        ${
                          index !==
                          array.length -
                            1
                            ? "border-b border-slate-100"
                            : ""
                        }
                        ${
                          item.isOpen
                            ? "bg-emerald-50/40"
                            : ""
                        }
                      `}
                    >
                      {/* MARKET ROW */}
                      <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-2.5">

                          {/* ROUND FLAG */}
                          <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[2px] border-white bg-slate-100 shadow-[0_1px_5px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">

                            <FlagIcon
                              country={
                                item.market
                                  .code as
                                  | "US"
                                  | "GB"
                                  | "JP"
                                  | "AU"
                              }
                              className="h-full w-full scale-[1.4]"
                            />

                          </div>

                          <div className="min-w-0">

                            <div className="truncate text-[10.5px] font-black text-slate-800">
                              {
                                item
                                  .market
                                  .name
                              }
                            </div>

                            <div className="mt-[1px] truncate text-[6.5px] font-semibold text-slate-400">
                              {
                                item
                                  .market
                                  .shortName
                              }
                            </div>

                          </div>

                        </div>

                        {/* STATUS */}
                        <div
                          className={`
                            inline-flex shrink-0 items-center gap-1.5
                            rounded-full px-2 py-1
                            text-[7px] font-black
                            ${
                              item.isOpen
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }
                          `}
                        >

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.isOpen
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          />

                          {item.isOpen
                            ? "Open"
                            : "Closed"}

                        </div>

                      </div>

                      {/* COUNTDOWN */}
                      <div className="mt-2 flex items-center justify-between pl-[38px]">

                        <span className="text-[7.25px] font-bold text-slate-400">
                          {item.nextChangeType ===
                          "close"
                            ? "Closes in"
                            : "Opens in"}
                        </span>

                        <span
                          className={`whitespace-nowrap text-[9.75px] font-black ${
                            item.isOpen
                              ? "text-emerald-700"
                              : "text-slate-700"
                          }`}
                        >
                          {formatCountdown(
                            item.nextChangeMinutes
                          )}
                        </span>

                      </div>

                    </div>
                  )
                )}

            </div>

          </div>

          {/* =====================================================
              NEXT MARKET
          ====================================================== */}
          {nextMarket && (
            <div className="border-t border-slate-100 bg-[#fbfdff] px-3 py-2.5">

              <div className="flex items-center justify-between gap-3 rounded-[11px] bg-brand-50/45 px-2.5 py-2">

                <div className="flex min-w-0 items-center gap-2.5">

                  <div className="flex h-[25px] w-[25px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[2px] border-white bg-slate-100 shadow-sm ring-1 ring-slate-200">

                    <FlagIcon
                      country={
                        nextMarket
                          .market
                          .code as
                          | "US"
                          | "GB"
                          | "JP"
                          | "AU"
                      }
                      className="h-full w-full scale-[1.4]"
                    />

                  </div>

                  <div>

                    <div className="text-[6.75px] font-bold text-brand-500">
                      Next Market
                    </div>

                    <div className="mt-[1px] text-[9.25px] font-black text-slate-700">
                      {
                        nextMarket
                          .market
                          .name
                      }
                    </div>

                  </div>

                </div>

                <div className="shrink-0 text-right">

                  <div className="text-[6.75px] font-bold text-slate-400">
                    Opens in
                  </div>

                  <div className="mt-[1px] whitespace-nowrap text-[9.25px] font-black text-brand-600">
                    {formatCountdown(
                      nextMarket.nextChangeMinutes
                    )}
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* =====================================================
              CTA
          ====================================================== */}
          <div className="border-t border-slate-100 bg-white p-3">

            <Link
              href="/en/tools/market-hours"
              className="
                group
                flex
                h-[44px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[14px]
                bg-brand-600
                px-4
                text-[10.5px]
                font-black
                text-white
                shadow-[0_8px_18px_rgba(37,99,235,0.16)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-brand-700
              "
            >

              <span>
                View All Market Hours
              </span>

              <span className="text-[13px] transition group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>

        </>
      )}

    </div>
  );
}