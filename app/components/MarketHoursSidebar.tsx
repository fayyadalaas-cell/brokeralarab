"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MarketSession = {
  id: string;
  name: string;
  shortName: string;
  code: string;
  flag: string;
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

function getMarketTime(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const hour = Number(
    parts.find((part) => part.type === "hour")?.value ?? 0
  );

  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0
  );

  const weekday =
    parts.find((part) => part.type === "weekday")?.value ?? "Sun";

  return {
    weekday,
    minutes: hour * 60 + minute,
  };
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weekdayIndex(day: string) {
  return weekdays.indexOf(day);
}

function isTradingDay(day: string) {
  return !["Sat", "Sun"].includes(day);
}

function daysUntilNextTradingDay(day: string) {
  const current = weekdayIndex(day);

  for (let i = 1; i <= 7; i++) {
    const next = weekdays[(current + i) % 7];

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
  const { weekday, minutes } = getMarketTime(now, market.timezone);

  const tradingDay = isTradingDay(weekday);

  if (!tradingDay) {
    const days = daysUntilNextTradingDay(weekday);
    const firstOpen = market.sessions[0].open;

    return {
      market,
      isOpen: false,
      currentMinutes: minutes,
      nextChangeMinutes: days * 24 * 60 - minutes + firstOpen,
      nextChangeType: "open",
    };
  }

  for (let i = 0; i < market.sessions.length; i++) {
    const session = market.sessions[i];

    if (minutes >= session.open && minutes < session.close) {
      return {
        market,
        isOpen: true,
        currentMinutes: minutes,
        nextChangeMinutes: session.close - minutes,
        nextChangeType: "close",
      };
    }

    if (minutes < session.open) {
      return {
        market,
        isOpen: false,
        currentMinutes: minutes,
        nextChangeMinutes: session.open - minutes,
        nextChangeType: "open",
      };
    }
  }

  const days = daysUntilNextTradingDay(weekday);
  const firstOpen = market.sessions[0].open;

  return {
    market,
    isOpen: false,
    currentMinutes: minutes,
    nextChangeMinutes: days * 24 * 60 - minutes + firstOpen,
    nextChangeType: "open",
  };
}

function formatCountdown(totalMinutes: number) {
  const safeMinutes = Math.max(0, Math.floor(totalMinutes));

  const days = Math.floor(safeMinutes / 1440);
  const hours = Math.floor((safeMinutes % 1440) / 60);
  const minutes = safeMinutes % 60;

  if (days > 0) {
    if (hours > 0) {
      return `${days} يوم ${hours} ساعة`;
    }

    return `${days} يوم`;
  }

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours} ساعة ${minutes} دقيقة`;
    }

    return `${hours} ساعة`;
  }

  return `${minutes} دقيقة`;
}

function getVisitorTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

function formatTimezoneName(timezone: string) {
  const city = timezone.split("/").pop()?.replaceAll("_", " ");

  if (!city) return "توقيتك المحلي";

  const arabicNames: Record<string, string> = {
    Riyadh: "الرياض",
    Dubai: "دبي",
    Toronto: "تورونتو",
    Montreal: "مونتريال",
    Vancouver: "فانكوفر",
    London: "لندن",
    Paris: "باريس",
    Berlin: "برلين",
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
    Chicago: "شيكاغو",
    Detroit: "ديترويت",
    Edmonton: "إدمونتون",
    Halifax: "هاليفاكس",
    Winnipeg: "وينيبيغ",
  };

  return arabicNames[city] ?? city;
}

function formatVisitorTime(date: Date, timezone: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return "";
  }
}

function getUTCOffset(date: Date, timezone: string) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    }).formatToParts(date);

    const offset =
      parts.find((part) => part.type === "timeZoneName")?.value ?? "";

    return offset.replace("GMT", "UTC");
  } catch {
    return "";
  }
}

export default function MarketHoursSidebar() {
  const [now, setNow] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    setNow(new Date());
    setTimezone(getVisitorTimezone());

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  const marketStates = useMemo(() => {
    if (!now) return [];

    return markets.map((market) =>
      calculateMarketState(market, now)
    );
  }, [now]);

  const openMarkets = marketStates.filter(
    (item) => item.isOpen
  );

  const nextMarket = [...marketStates]
    .filter((item) => !item.isOpen)
    .sort(
      (a, b) =>
        a.nextChangeMinutes - b.nextChangeMinutes
    )[0];

  const featuredMarket =
    openMarkets.find((item) => item.market.id === "us") ??
    openMarkets[0] ??
    nextMarket;

  const visitorTime =
    now && timezone
      ? formatVisitorTime(now, timezone)
      : "";

  const utcOffset =
    now && timezone
      ? getUTCOffset(now, timezone)
      : "";

  return (
    <div
      dir="rtl"
      className="
        overflow-hidden rounded-[22px]
        border border-slate-200
        bg-white
        shadow-[0_10px_28px_rgba(15,23,42,0.055)]
      "
    >
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_100%)] px-4 py-3.5">

        <div className="flex items-center justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">

            {/* MINI MARKET CLOCK */}
<div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

  {/* DARK OUTER SHELL */}
  <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

  {/* OUTER RING */}
  <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

  {/* INNER FACE */}
  <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

  {/* BLUE SESSION ARC */}
  <span className="absolute right-[5px] top-[7px] h-[14px] w-[14px] rounded-tr-full border-r-[3px] border-t-[3px] border-blue-400" />

  {/* CYAN SESSION ARC */}
  <span className="absolute bottom-[6px] left-[6px] h-[13px] w-[13px] rounded-bl-full border-b-[3px] border-l-[3px] border-cyan-400" />

  {/* CENTER */}
  <div className="relative z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border border-white/10 bg-[#07182d] shadow-[0_2px_8px_rgba(0,0,0,0.22)]">

    <span
      dir="ltr"
      className="text-[10px] font-black leading-none tracking-[-0.04em] text-white"
    >
      24H
    </span>

  </div>

  {/* CURRENT TIME DOT */}
  <span className="absolute bottom-[8px] right-[7px] z-20 h-[5px] w-[5px] rounded-full border border-[#0a1d36] bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.7)]" />

</div>

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <h3 className="text-[14px] font-black text-[#07111f]">
                  حالة الأسواق
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[7px] font-black text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  LIVE
                </span>

              </div>

              <p className="mt-0.5 text-[8.5px] font-semibold text-slate-500">
                حسب توقيتك المحلي
              </p>

            </div>

          </div>

        </div>

        {/* TIME */}
        <div className="mt-3 flex items-center justify-between rounded-[14px] border border-brand-100 bg-white px-3 py-2.5 shadow-sm">

          <div className="text-right">

            <div className="text-[8px] font-bold text-slate-400">
              توقيتك
            </div>

            <div className="mt-0.5 text-[10px] font-black text-slate-700">
              {timezone
                ? formatTimezoneName(timezone)
                : "جاري التحديد..."}
            </div>

          </div>

          <div dir="ltr" className="text-left">

            <div className="text-[16px] font-black text-brand-600">
              {visitorTime || "--:--"}
            </div>

            <div className="mt-0.5 text-[8px] font-bold text-slate-400">
              {utcOffset || "UTC"}
            </div>

          </div>

        </div>

      </div>

      {!now ? (
        <div className="space-y-2 p-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[54px] animate-pulse rounded-[14px] bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <>
          {/* FEATURED MARKET */}
          {featuredMarket && (
            <div className="border-b border-slate-100 px-3 py-3">

              <div
                className={`
                  overflow-hidden rounded-[16px] border px-3 py-3
                  ${
                    featuredMarket.isOpen
                      ? "border-emerald-200 bg-emerald-50/60"
                      : "border-slate-200 bg-[#fbfdff]"
                  }
                `}
              >

                <div className="flex items-center justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2.5">

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-slate-200 bg-white text-[17px]">
                      {featuredMarket.market.flag}
                    </span>

                    <div className="min-w-0">

                      <div className="truncate text-[12.5px] font-black text-[#07111f]">
                        {featuredMarket.market.name}
                      </div>

                      <div
  dir="ltr"
  className="mt-0.5 text-right text-[8px] font-bold text-slate-600"
>
  {featuredMarket.market.shortName}
</div>

                    </div>

                  </div>

                  <div className="shrink-0 text-left">

                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[8px] font-black ${
                        featuredMarket.isOpen
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          featuredMarket.isOpen
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />

                      {featuredMarket.isOpen
                        ? "مفتوح الآن"
                        : "مغلق"}

                    </div>

                  </div>

                </div>

                <div className="mt-2.5 flex items-center gap-1.5 border-t border-slate-200/70 pt-2.5">

  <span className="shrink-0 text-[9px] font-bold text-slate-500">
    {featuredMarket.nextChangeType === "close"
      ? "يغلق بعد"
      : "يفتح بعد"}
  </span>

  <span
    className={`whitespace-nowrap text-[14px] font-black ${
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
          )}

          {/* MARKET LIST */}
<div className="px-3 py-2">

  {marketStates
    .filter(
      (item) =>
        item.market.id !== featuredMarket?.market.id
    )
    .map((item) => (

      <div
        key={item.market.id}
        className="border-b border-slate-100 py-2.5 last:border-b-0"
      >

        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-3">

          {/* MARKET */}
          <div className="flex min-w-0 items-center gap-2.5">

            <span
              dir="ltr"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-slate-200 bg-slate-50 text-[8px] font-black text-slate-600"
            >
              {item.market.code}
            </span>

            <div className="min-w-0">

              <div className="truncate text-[10.5px] font-black text-slate-800">
                {item.market.name}
              </div>

              <div
                dir="ltr"
                className="mt-0.5 truncate text-right text-[7.5px] font-bold text-slate-500"
              >
                {item.market.shortName}
              </div>

            </div>

          </div>

          {/* STATUS */}
          <div
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

            {item.isOpen ? "مفتوح" : "مغلق"}
          </div>

        </div>

        {/* COUNTDOWN ROW */}
        <div className="mt-2 flex items-center gap-1.5 rounded-[9px] bg-slate-50 px-2.5 py-2">

          <span className="shrink-0 text-[9px] font-bold text-slate-500">
            {item.nextChangeType === "close"
              ? "يغلق بعد"
              : "يفتح بعد"}
          </span>

          <span
            className={`whitespace-nowrap text-[11px] font-black ${
              item.isOpen
                ? "text-emerald-700"
                : "text-slate-800"
            }`}
          >
            {formatCountdown(item.nextChangeMinutes)}
          </span>

        </div>

      </div>

    ))}

</div>

          {/* NEXT MARKET */}
          {nextMarket && (
            <div className="border-t border-slate-100 bg-[#fbfdff] px-3 py-2.5">

              <div className="flex items-center justify-between rounded-[12px] border border-brand-200 bg-brand-50 px-3 py-2.5">

                <span className="text-[8px] font-bold text-slate-500">
                  السوق التالي
                </span>

                <div className="flex items-center gap-1.5 text-[8.5px] font-black text-brand-700">

                  <span>
                    {nextMarket.market.flag}
                  </span>

                  <span>
                    {nextMarket.market.name}
                  </span>

                  <span className="text-[9px] font-black text-brand-700">
                    بعد {formatCountdown(nextMarket.nextChangeMinutes)}
                  </span>

                </div>

              </div>

            </div>
          )}

          {/* CTA */}
          <div className="border-t border-slate-100 bg-white p-3">

            <Link
              href="/tools/market-hours"
              className="group flex h-[44px] w-full items-center justify-center gap-2 rounded-[13px] bg-brand-600 px-4 text-[10px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700"
            >
              <span>
  عرض جميع ساعات الأسواق
</span>

              <span className="text-[13px] transition group-hover:-translate-x-1">
                ←
              </span>

            </Link>

          </div>

        </>
      )}

    </div>
  );
}