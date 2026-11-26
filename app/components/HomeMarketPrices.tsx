"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

/* =========================================================
   BROKER ALARAB — HOME MARKET PRICES
   LIVE PRICE MOVEMENT
========================================================= */

const INSTRUMENTS = [
  {
    symbol: "XAUUSDc",
    label: "XAU/USD",
    name: "الذهب",
    icon: "gold",
    digits: 2,
  },
  {
    symbol: "XAGUSDc",
    label: "XAG/USD",
    name: "الفضة",
    icon: "silver",
    digits: 3,
  },
  {
    symbol: "EURUSDc",
    label: "EUR/USD",
    name: "اليورو مقابل الدولار",
    icon: "eu",
    digits: 5,
  },
  {
    symbol: "GBPUSDc",
    label: "GBP/USD",
    name: "الجنيه الإسترليني مقابل الدولار",
    icon: "gb",
    digits: 5,
  },
  {
    symbol: "AUDUSDc",
    label: "AUD/USD",
    name: "الدولار الأسترالي مقابل الدولار الأمريكي",
    icon: "au",
    digits: 5,
  },
  {
    symbol: "USDJPYc",
    label: "USD/JPY",
    name: "الدولار مقابل الين",
    icon: "jp",
    digits: 3,
  },
  {
  symbol: "USDCADc",
  label: "USD/CAD",
  name: "الدولار الأمريكي مقابل الدولار الكندي",
  icon: "ca",
  digits: 5,
},
{
  symbol: "USDCHFc",
  label: "USD/CHF",
  name: "الدولار الأمريكي مقابل الفرنك السويسري",
  icon: "ch",
  digits: 5,
},
];

type LiveQuote = {
  symbol: string;
  bid: number | string | null;
  quote_time_utc?: string | null;
};

type QuoteMap = Record<string, LiveQuote>;

type PriceDirection = "up" | "down" | "neutral";

type DirectionMap = Record<string, PriceDirection>;

/* =========================================================
   PRICE HELPERS
========================================================= */

function numericPrice(
  value: number | string | null | undefined
): number | null {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) && number > 0
    ? number
    : null;
}

function formatPrice(
  value: number | string | null | undefined,
  digits: number
) {

  const number = numericPrice(value);

  if (number === null) {
    return "—";
  }

  return number.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/* =========================================================
   INSTRUMENT ICON
========================================================= */

function InstrumentIcon({
  icon,
}: {
  icon: string;
}) {

  if (icon === "gold" || icon === "silver") {

    const isGold = icon === "gold";

    return (
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isGold
            ? "bg-amber-100 text-amber-600"
            : "bg-slate-200 text-slate-500"
        }`}
      >

        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 4h8l3 6H5l3-6ZM4 12h7l3 6H1l3-6Zm10 0h6l3 6H12l2-6Z" />
        </svg>

      </span>
    );
  }

  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">

      <img
        src={`https://flagcdn.com/w80/${icon}.png`}
        alt=""
        width={28}
        height={28}
        className="h-full w-full object-cover"
      />

    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeMarketPrices() {

  const [quotes, setQuotes] =
    useState<QuoteMap>({});

  const [directions, setDirections] =
    useState<DirectionMap>({});

  const [flashes, setFlashes] =
    useState<DirectionMap>({});

  const [lastChecked, setLastChecked] =
    useState<Date | null>(null);

  const [hasError, setHasError] =
    useState(false);

  const previousQuotesRef =
    useRef<QuoteMap>({});

  const flashTimersRef =
    useRef<Record<string, number>>({});

  /* =====================================================
     LIVE QUOTES — SINGLE REQUEST
  ====================================================== */

  useEffect(() => {

    let cancelled = false;
    let running = false;

    const controller = new AbortController();

    async function loadQuotes() {

      if (
        cancelled ||
        running ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      running = true;

      try {

        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL;

        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {

          throw new Error(
            "Supabase configuration unavailable"
          );

        }

        const endpoint = new URL(
          `${url.replace(/\/$/, "")}/rest/v1/broker_live_quotes`
        );

        endpoint.searchParams.set(
          "select",
          "symbol,bid,quote_time_utc"
        );

        endpoint.searchParams.set(
          "symbol",
          `in.(${INSTRUMENTS.map(
            (item) => item.symbol
          ).join(",")})`
        );

        const response = await fetch(
          endpoint.toString(),
          {
            headers: {
              apikey: key,
              Authorization: `Bearer ${key}`,
              Accept: "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {

          throw new Error(
            `Market prices HTTP ${response.status}`
          );

        }

        const rows: LiveQuote[] =
          await response.json();

        if (cancelled) return;

        /* ===============================================
           SELECT LATEST QUOTE PER SYMBOL
        ================================================ */

        const nextQuotes: QuoteMap = {};

        for (const row of rows) {

          const previous =
            nextQuotes[row.symbol];

          const rowTime =
            Date.parse(row.quote_time_utc ?? "") || 0;

          const previousTime =
            Date.parse(previous?.quote_time_utc ?? "") || 0;

          if (!previous || rowTime >= previousTime) {

            nextQuotes[row.symbol] = row;

          }

        }

        /* ===============================================
           DETECT REAL PRICE MOVEMENT
        ================================================ */

        const acceptedQuotes: QuoteMap = {
          ...previousQuotesRef.current,
        };

        const changedDirections: DirectionMap = {};

        for (const instrument of INSTRUMENTS) {

          const symbol = instrument.symbol;

          const newQuote =
            nextQuotes[symbol];

          const previousQuote =
            previousQuotesRef.current[symbol];

          if (!newQuote) {
            continue;
          }

          const newPrice =
            numericPrice(newQuote.bid);

          if (newPrice === null) {
            continue;
          }

          const previousPrice =
            numericPrice(previousQuote?.bid);

          const newTime =
            Date.parse(
              newQuote.quote_time_utc ?? ""
            ) || 0;

          const oldTime =
            Date.parse(
              previousQuote?.quote_time_utc ?? ""
            ) || 0;

          /* IGNORE OLDER QUOTES */

          if (
            previousQuote &&
            oldTime > 0 &&
            newTime > 0 &&
            newTime < oldTime
          ) {
            continue;
          }

          acceptedQuotes[symbol] = newQuote;

          /* FIRST PRICE — NO FLASH */

          if (previousPrice === null) {
            continue;
          }

          /* COMPARE DISPLAYED PRICE PRECISION */

          const oldDisplayed = Number(
            previousPrice.toFixed(instrument.digits)
          );

          const newDisplayed = Number(
            newPrice.toFixed(instrument.digits)
          );

          if (newDisplayed > oldDisplayed) {

            changedDirections[symbol] = "up";

          } else if (newDisplayed < oldDisplayed) {

            changedDirections[symbol] = "down";

          }

        }

        /* ===============================================
           UPDATE PRICES
        ================================================ */

        previousQuotesRef.current = acceptedQuotes;

        setQuotes(acceptedQuotes);

        /* ===============================================
           UPDATE PRICE COLORS AND FLASH EFFECTS
        ================================================ */

        if (Object.keys(changedDirections).length > 0) {

          setDirections((previous) => ({
            ...previous,
            ...changedDirections,
          }));

          setFlashes((previous) => ({
            ...previous,
            ...changedDirections,
          }));

          for (const symbol of Object.keys(
            changedDirections
          )) {

            const existingTimer =
              flashTimersRef.current[symbol];

            if (existingTimer !== undefined) {

              window.clearTimeout(existingTimer);

            }

            flashTimersRef.current[symbol] =
              window.setTimeout(() => {

                if (cancelled) return;

                setFlashes((previous) => ({

                  ...previous,
                  [symbol]: "neutral",

                }));

                delete flashTimersRef.current[symbol];

              }, 1100);

          }

        }

        setLastChecked(new Date());

        setHasError(false);

      } catch (error) {

        if (!cancelled) {

          console.error(
            "Home market prices:",
            error
          );

          setHasError(true);

        }

      } finally {

        running = false;

      }

    }

    void loadQuotes();

    const interval = window.setInterval(
      () => void loadQuotes(),
      5000
    );

    const onVisible = () => {

      if (document.visibilityState === "visible") {

        void loadQuotes();

      }

    };

    document.addEventListener(
      "visibilitychange",
      onVisible
    );

    return () => {

      cancelled = true;

      controller.abort();

      window.clearInterval(interval);

      for (const timer of Object.values(
        flashTimersRef.current
      )) {

        window.clearTimeout(timer);

      }

      flashTimersRef.current = {};

      document.removeEventListener(
        "visibilitychange",
        onVisible
      );

    };

  }, []);

  /* =====================================================
     RENDER
====================================================== */

  return (

    <section
      dir="rtl"
      aria-labelledby="home-market-prices-title"
      className="flex min-w-0 flex-1 flex-col"
    >

      {/* =================================================
          EXTERNAL SECTION HEADER
      ================================================== */}

      <div className="mb-2.5 flex min-h-[36px] shrink-0 items-center sm:mb-4 sm:min-h-[44px]">

        <h2
          id="home-market-prices-title"
          className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          أسعار الأسواق

        </h2>

      </div>

{/* =================================================
    TABLET — MARKET PRICES DASHBOARD
    640px — 1279px
================================================== */}

<div className="hidden min-w-0 flex-col gap-2.5 sm:flex xl:hidden">

  {/* TABLET MARKET PRICES GRID */}

  <div className="grid min-w-0 grid-cols-2 gap-2.5 lg:gap-3">

    {INSTRUMENTS.map((item, index) => {

      const direction =
        directions[item.symbol] ?? "neutral";

      const flash =
        flashes[item.symbol] ?? "neutral";

      const priceColor =
        direction === "up"
          ? "text-emerald-600"
          : direction === "down"
            ? "text-rose-600"
            : "text-slate-900";

      const flashBackground =
        flash === "up"
          ? "bg-emerald-100"
          : flash === "down"
            ? "bg-rose-100"
            : "bg-transparent";

      return (

        <div
          key={item.symbol}
          title={item.name}
          className={`flex min-h-[84px] min-w-0 items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-3 transition-colors duration-200 hover:border-brand-300 lg:min-h-[92px] lg:px-4 ${
            index === INSTRUMENTS.length - 1 &&
            INSTRUMENTS.length % 2 !== 0
              ? "col-span-2"
              : ""
          }`}
        >

          {/* =========================================
              INSTRUMENT ICON AND NAME
          ========================================== */}

          <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f1f5f9] lg:h-11 lg:w-11">

              <InstrumentIcon
                icon={item.icon}
              />

            </div>

            <div className="min-w-0">

              <span
                dir="ltr"
                className="block w-fit text-[13px] font-black leading-5 text-[#10233f] lg:text-[15px]"
              >

                {item.label}

              </span>

              <span className="mt-1 block text-[10px] font-medium leading-4 text-slate-500 lg:text-[12px] lg:leading-5">

                {item.name}

              </span>

            </div>

          </div>

          {/* =========================================
              LIVE MARKET PRICE
          ========================================== */}

          <div
            dir="ltr"
            className={`flex shrink-0 items-center justify-end gap-1 rounded-[8px] px-1.5 py-2 transition-colors duration-500 motion-reduce:transition-none lg:gap-1.5 lg:px-2.5 ${flashBackground}`}
          >

            {/* PRICE DIRECTION */}

            <span
              aria-hidden="true"
              className={`inline-flex w-3 shrink-0 items-center justify-center text-[10px] ${priceColor}`}
            >

              {direction === "up"
                ? "▲"
                : direction === "down"
                  ? "▼"
                  : ""}

            </span>

            {/* PRICE VALUE */}

            <strong
              className={`whitespace-nowrap text-[16px] font-black tabular-nums transition-colors duration-300 motion-reduce:transition-none lg:text-[19px] ${priceColor}`}
            >

              {formatPrice(
                quotes[item.symbol]?.bid,
                item.digits
              )}

            </strong>

          </div>

        </div>

      );

    })}

  </div>

  {/* ===============================================
      TABLET — UPDATE INFORMATION
  ================================================ */}

  <div className="flex min-h-[40px] min-w-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5">

    <span
      className={`flex items-center gap-1.5 text-[11px] font-medium ${
        hasError
          ? "text-rose-600"
          : "text-slate-500"
      }`}
    >

      <RefreshCw
        size={12}
        aria-hidden="true"
      />

      {hasError
        ? "تعذر التحديث"
        : lastChecked
          ? "آخر فحص للأسعار"
          : "جاري التحميل"}

    </span>

    <span
      dir="ltr"
      className="text-[11px] font-bold tabular-nums text-slate-600"
    >

      {lastChecked
        ? lastChecked.toLocaleTimeString(
            "en-GB",
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }
          )
        : "—"}

    </span>

  </div>

</div>

      {/* =================================================
    MOBILE + DESKTOP — ORIGINAL MARKET PRICES TABLE
================================================== */}

<div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[15px] border border-slate-200 bg-white sm:hidden xl:flex xl:rounded-[18px]">

        {/* ===============================================
            TABLE HEADER
        ================================================ */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-[#102e55] px-3.5 py-3 sm:bg-[#f8fafc] sm:px-3 sm:py-2.5">

          <span className="text-[12px] font-bold text-white sm:font-semibold sm:text-slate-500">

            الأداة المالية

          </span>

          <span className="text-[12px] font-bold text-white sm:font-semibold sm:text-slate-500">

            آخر سعر

          </span>

        </div>

        {/* ===============================================
    PRICE ROWS — MOBILE AND DESKTOP ONLY
================================================ */}

<div className="flex flex-1 flex-col divide-y divide-slate-200 px-3 sm:divide-slate-100">

  {INSTRUMENTS.filter(
    (item) => item.symbol !== "USDCHFc"
  ).map((item) => {

            const direction =
              directions[item.symbol] ?? "neutral";

            const flash =
              flashes[item.symbol] ?? "neutral";

            const priceColor =
              direction === "up"
                ? "text-emerald-600"
                : direction === "down"
                  ? "text-rose-600"
                  : "text-slate-900";

            const flashBackground =
              flash === "up"
                ? "bg-emerald-100"
                : flash === "down"
                  ? "bg-rose-100"
                  : "bg-transparent";

            return (

              <div
                key={item.symbol}
                title={item.name}
                className="flex min-h-[40px] flex-1 items-center justify-between gap-2 py-1 transition hover:bg-slate-50 sm:min-h-[36px] sm:py-1.5"
              >

                {/* =======================================
                    INSTRUMENT IDENTITY
                ======================================== */}

                <div className="flex min-w-0 items-center gap-2.5 sm:gap-2">

                  <InstrumentIcon
                    icon={item.icon}
                  />

                  <span
                    dir="ltr"
                    className="whitespace-nowrap text-[15px] font-black text-[#10233f] sm:text-[14px]"
                  >

                    {item.label}

                  </span>

                </div>

                {/* =======================================
                    LIVE PRICE
                ======================================== */}

                <div
                  dir="ltr"
                  className={`flex shrink-0 items-center justify-end gap-1.5 rounded-md px-1.5 py-1 transition-colors duration-500 motion-reduce:transition-none sm:gap-1 ${flashBackground}`}
                >

                  {/* PRICE DIRECTION */}

                  <span
                    aria-hidden="true"
                    className={`inline-flex w-3 shrink-0 items-center justify-center text-[10px] sm:text-[9px] ${priceColor}`}
                  >

                    {direction === "up"
                      ? "▲"
                      : direction === "down"
                        ? "▼"
                        : ""}

                  </span>

                  {/* PRICE VALUE */}

                  <span
                    className={`whitespace-nowrap text-[17px] font-black tabular-nums transition-colors duration-300 motion-reduce:transition-none sm:text-[15px] ${priceColor}`}
                  >

                    {formatPrice(
                      quotes[item.symbol]?.bid,
                      item.digits
                    )}

                  </span>

                </div>

              </div>

            );

          })}

        </div>

        {/* ===============================================
            UPDATE INFORMATION
        ================================================ */}

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-slate-200 bg-[#f8fafc] px-3 py-2.5">

          <span
            className={`flex items-center gap-1.5 text-[11px] font-semibold sm:text-[10px] sm:font-medium ${
              hasError
                ? "text-rose-600"
                : "text-slate-600 sm:text-slate-500"
            }`}
          >

            <RefreshCw
              size={11}
            />

            {hasError
              ? "تعذر التحديث"
              : lastChecked
                ? "آخر فحص للأسعار"
                : "جاري التحميل"}

          </span>

          <span
            dir="ltr"
            className="text-[11px] font-bold tabular-nums text-slate-600 sm:text-[10px] sm:text-slate-500"
          >

            {lastChecked
              ? lastChecked.toLocaleTimeString(
                  "en-GB",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )
              : "—"}

          </span>

        </div>

      </div>

    </section>

  );

}