import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import {
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB — GLOBAL INTEREST RATES (ENGLISH)
========================================================= */

/* =========================================================
   CENTRAL BANKS
========================================================= */

const BANKS = [
  {
    slug: "fed",
    name: "Federal Reserve",
    currency: "USD",
    flag: "us",
  },
  {
    slug: "ecb",
    name: "European Central Bank",
    currency: "EUR",
    flag: "eu",
  },
  {
    slug: "boe",
    name: "Bank of England",
    currency: "GBP",
    flag: "gb",
  },
  {
    slug: "boj",
    name: "Bank of Japan",
    currency: "JPY",
    flag: "jp",
  },
  {
    slug: "boc",
    name: "Bank of Canada",
    currency: "CAD",
    flag: "ca",
  },
  {
    slug: "rba",
    name: "Reserve Bank of Australia",
    currency: "AUD",
    flag: "au",
  },
  {
    slug: "snb",
    name: "Swiss National Bank",
    currency: "CHF",
    flag: "ch",
  },
  {
    slug: "rbnz",
    name: "Reserve Bank of New Zealand",
    currency: "NZD",
    flag: "nz",
  },
];

/* =========================================================
   DATA TYPES
========================================================= */

type Meeting = {
  meeting_date?: string | null;
  announcement_at?: string | null;
  status?: string | null;
};

type InterestRateRow = {
  slug: string;
  currency_code: string | null;
  current_rate: number | null;
  current_rate_lower: number | null;
  current_rate_upper: number | null;
  previous_rate: number | null;
  last_change_bps: number | null;
  last_decision_date: string | null;
  meetings: Meeting[] | null;
  is_published: boolean | null;
};

/* =========================================================
   FORMAT RATE
========================================================= */

function formatRate(value: number | null | undefined) {
  if (value == null || !Number.isFinite(Number(value))) {
    return "—";
  }

  return `${Number(value).toFixed(2)}%`;
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value.slice(0, 10) + "T00:00:00Z");

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    numberingSystem: "latn",
    timeZone: "UTC",
  }).format(date);
}

/* =========================================================
   FORMAT MEETING DATE
========================================================= */

function formatMeetingDate(value: string | null | undefined) {

  if (!value) return null;

  const date = new Date(value.slice(0, 10) + "T00:00:00Z");

  if (Number.isNaN(date.getTime())) return null;

  return {
    dayMonth: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      numberingSystem: "latn",
      timeZone: "UTC",
    }).format(date),

    year: new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      numberingSystem: "latn",
      timeZone: "UTC",
    }).format(date),
  };
}

/* =========================================================
   CURRENT INTEREST RATE
========================================================= */

function getCurrentRate(bank: InterestRateRow) {

  if (
    bank.current_rate_lower != null &&
    bank.current_rate_upper != null &&
    bank.current_rate_lower !== bank.current_rate_upper
  ) {

    return `${Number(bank.current_rate_lower).toFixed(2)}% – ${Number(
      bank.current_rate_upper
    ).toFixed(2)}%`;

  }

  return formatRate(bank.current_rate);
}

/* =========================================================
   NEXT CENTRAL BANK MEETING
========================================================= */

function getNextMeeting(meetings: Meeting[] | null) {

  if (!Array.isArray(meetings)) return null;

  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  const upcoming = meetings

    .filter((meeting) => {

      if (!meeting.meeting_date) return false;

      const status = String(
        meeting.status || ""
      ).toLowerCase();

      if (
        [
          "cancelled",
          "canceled",
          "completed",
          "decided",
          "published",
          "postponed",
        ].includes(status)
      ) {
        return false;
      }

      if (meeting.announcement_at) {

        const announcement = new Date(
          meeting.announcement_at
        );

        if (!Number.isNaN(announcement.getTime())) {

          return announcement.getTime() > now.getTime();

        }

      }

      return meeting.meeting_date.slice(0, 10) >= today;

    })

    .sort((a, b) =>
      String(a.meeting_date).localeCompare(
        String(b.meeting_date)
      )
    );

  return upcoming[0]?.meeting_date ?? null;

}

/* =========================================================
   INTEREST RATE CHANGE BADGES
========================================================= */

function RateChange({
  value,
}: {
  value: number | null;
}) {

  if (value == null) {

    return (
      <span className="text-[13px] font-semibold text-slate-400">
        —
      </span>
    );

  }

  /* RATE INCREASE */

  if (value > 0) {

    return (

      <span
        dir="ltr"
        className="inline-flex min-w-[82px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[7px] bg-emerald-50 px-2.5 py-1.5 text-[12px] font-black text-emerald-700 ring-1 ring-inset ring-emerald-100"
      >

        <ArrowUpRight
          size={15}
          strokeWidth={2}
          aria-hidden="true"
        />

        +{value}

        <span className="text-[10px] font-bold">
          bps
        </span>

      </span>

    );

  }

  /* RATE DECREASE */

  if (value < 0) {

    return (

      <span
        dir="ltr"
        className="inline-flex min-w-[82px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[7px] bg-rose-50 px-2.5 py-1.5 text-[12px] font-black text-rose-700 ring-1 ring-inset ring-rose-100"
      >

        <ArrowDownRight
          size={15}
          strokeWidth={2}
          aria-hidden="true"
        />

        {value}

        <span className="text-[10px] font-bold">
          bps
        </span>

      </span>

    );

  }

  /* RATE UNCHANGED */

  return (

    <span className="inline-flex min-w-[82px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[7px] bg-slate-100 px-2.5 py-1.5 text-[12px] font-bold text-slate-600 ring-1 ring-inset ring-slate-200">

      <Minus
        size={14}
        strokeWidth={2}
        aria-hidden="true"
      />

      Hold

    </span>

  );

}

/* =========================================================
   MAIN SERVER COMPONENT
========================================================= */

export default async function HomeInterestRatesEn() {

  const supabase = await createClient();

  const { data, error } = await supabase

    .from("interest_rates")

    .select(`
      slug,
      currency_code,
      current_rate,
      current_rate_lower,
      current_rate_upper,
      previous_rate,
      last_change_bps,
      last_decision_date,
      meetings,
      is_published
    `)

    .in(
      "slug",
      BANKS.map((bank) => bank.slug)
    );

  if (error) {

    console.error(
      "Homepage interest rates (EN):",
      error.message
    );

  }

  const records = (
    (data ?? []) as InterestRateRow[]
  ).filter((bank) => bank.is_published !== false);

  const bankMap = new Map(
    records.map((bank) => [bank.slug, bank])
  );

  const rows = BANKS.flatMap((item) => {

    const data = bankMap.get(item.slug);

    return data ? [{ ...item, data }] : [];

  });

  return (

    <section
      id="home-interest-rates"
      aria-labelledby="home-interest-rates-title"
      dir="ltr"
      lang="en"
      className="mx-auto w-full min-w-0 py-3 sm:py-4"
    >

      {/* =================================================
          EXTERNAL SECTION HEADER
      ================================================== */}

      <div className="mb-4 flex min-h-[44px] items-center">

        <h2
          id="home-interest-rates-title"
          className="text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          <Link
            href="/en/interest-rates"
            className="group/title inline-flex items-center gap-2 transition-colors hover:text-brand-600"
          >

            Global Interest Rates

            <ChevronRight
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover/title:translate-x-1"
            />

          </Link>

        </h2>

      </div>

      {/* =================================================
          MOBILE — GLOBAL INTEREST RATES
          COMPACT FINANCIAL DIRECTORY
      ================================================== */}

      <div className="w-full min-w-0 overflow-hidden rounded-[15px] border border-slate-200 bg-white md:hidden">

        {/* MOBILE TABLE HEADER */}

        <div className="flex items-center justify-between gap-2 bg-[#102e55] px-3.5 py-3">

          <span className="text-[12px] font-bold text-white">

            Central Bank

          </span>

          <span className="text-[12px] font-bold text-white">

            Current Rate

          </span>

        </div>

        {/* ===============================================
            MOBILE BANK ROWS
            COMPACT FINANCIAL LIST
        ================================================ */}

        {rows.length > 0 ? (

          <div className="divide-y divide-slate-200">

            {rows.map((bank, index) => {

              const nextMeeting = getNextMeeting(
                bank.data.meetings
              );

              const meetingDate = formatMeetingDate(
                nextMeeting
              );

              const change = bank.data.last_change_bps;

              const changeColor =
                change == null
                  ? "bg-slate-100 text-slate-500"
                  : change > 0
                    ? "bg-emerald-50 text-emerald-700"
                    : change < 0
                      ? "bg-rose-50 text-rose-700"
                      : "bg-slate-100 text-slate-600";

              return (

                <Link
                  key={bank.slug}
                  href={`/en/interest-rates/${bank.slug}`}
                  aria-label={`${bank.name} interest rate details`}
                  className={`group grid min-h-[82px] min-w-0 grid-cols-[minmax(0,1fr)_auto_12px] items-center gap-2 px-3 py-2.5 transition-colors duration-200 active:bg-blue-50 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-[#f7f9fc]"
                  }`}
                >

                  {/* =====================================
                      CENTRAL BANK IDENTITY
                  ====================================== */}

                  <div className="flex min-w-0 items-center gap-2">

                    {/* COUNTRY FLAG */}

                    <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">

                      <img
                        src={`https://flagcdn.com/w80/${bank.flag}.png`}
                        alt=""
                        width={34}
                        height={34}
                        loading="lazy"
                        className="!h-full !w-full !object-cover"
                      />

                    </span>

                    {/* BANK INFORMATION */}

                    <div className="min-w-0">

                      {/* BANK NAME */}

                      <h3 className="break-words text-[12px] font-black leading-[18px] text-[#10233f] transition-colors group-hover:text-brand-600 min-[390px]:text-[13px]">

                        {bank.name}

                      </h3>

                      {/* CURRENCY CODE */}

                      <span
                        dir="ltr"
                        className="mt-0.5 block w-fit text-[10px] font-bold leading-4 tracking-wide text-slate-500"
                      >

                        {bank.data.currency_code ||
                          bank.currency}

                      </span>

                      {/* NEXT MEETING DATE */}

                      <div className="mt-0.5 flex flex-wrap items-center gap-x-1 gap-y-0.5">

                        <span className="text-[10px] font-medium leading-4 text-slate-500">

                          Next Meeting:

                        </span>

                        {meetingDate ? (

                          <time
                            dateTime={nextMeeting ?? undefined}
                            title={`${meetingDate.dayMonth} ${meetingDate.year}`}
                            className="text-[10px] font-bold leading-4 text-[#194b92]"
                          >

                            {meetingDate.dayMonth}

                          </time>

                        ) : (

                          <span className="text-[10px] font-medium text-slate-400">

                            TBA

                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                  {/* =====================================
                      CURRENT RATE + LAST CHANGE
                  ====================================== */}

                  <div className="flex shrink-0 flex-col items-end justify-center gap-1.5">

                    {/* CURRENT INTEREST RATE */}

                    <strong
                      dir="ltr"
                      className="whitespace-nowrap text-[13px] font-black leading-5 tabular-nums text-[#194b92] min-[390px]:text-[15px]"
                    >

                      {getCurrentRate(bank.data)}

                    </strong>

                    {/* INTEREST RATE CHANGE */}

                    <span
                      dir="ltr"
                      aria-label={
                        change == null
                          ? "Last rate change unavailable"
                          : change === 0
                            ? "Interest rate unchanged"
                            : `Last change: ${change} basis points`
                      }
                      className={`inline-flex min-h-[21px] items-center justify-center gap-1 whitespace-nowrap rounded-[5px] px-1.5 py-0.5 text-[10px] font-bold ${changeColor}`}
                    >

                      {change == null ? (

                        "—"

                      ) : change > 0 ? (

                        <>

                          <ArrowUpRight
                            size={11}
                            strokeWidth={2}
                            aria-hidden="true"
                          />

                          +{change} bps

                        </>

                      ) : change < 0 ? (

                        <>

                          <ArrowDownRight
                            size={11}
                            strokeWidth={2}
                            aria-hidden="true"
                          />

                          {change} bps

                        </>

                      ) : (

                        <>

                          <Minus
                            size={11}
                            strokeWidth={2}
                            aria-hidden="true"
                          />

                          Hold

                        </>

                      )}

                    </span>

                  </div>

                  {/* =====================================
                      BANK DETAILS ARROW
                  ====================================== */}

                  <ChevronRight
                    size={13}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="shrink-0 text-slate-400 transition duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600"
                  />

                </Link>

              );

            })}

          </div>

        ) : (

          <div className="px-4 py-10 text-center text-[13px] font-medium text-slate-500">

            Interest rate data is currently unavailable.

          </div>

        )}

        {/* ===============================================
            MOBILE DATA INFORMATION
        ================================================ */}

        <div className="border-t border-slate-200 bg-[#f8fafc] px-3 py-3 text-center">

          <p className="text-[10px] font-semibold leading-5 text-slate-600">

            Central Bank Monetary Policy Data

          </p>

          <p className="mt-0.5 text-[10px] font-medium leading-5 text-slate-500">

            100 basis points (bps) = 1 percentage point

          </p>

        </div>

        {/* ===============================================
            VIEW ALL INTEREST RATES
        ================================================ */}

        <Link
          href="/en/interest-rates"
          className="group flex min-h-[46px] items-center justify-center gap-2 bg-gradient-to-r from-[#102e55] to-[#194b92] px-3 text-center text-[12px] font-black text-white transition active:opacity-90"
        >

          View All Global Interest Rates

          <ChevronRight
            size={15}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />

        </Link>

      </div>

{/* =====================================================
    TABLET — COMPACT INTEREST RATES TABLE
    768px — 1279px
====================================================== */}

<div className="hidden w-full min-w-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white md:block xl:hidden">

  {/* TABLET HEADER */}

  <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)_24px] items-center gap-2 bg-[#102e55] px-3 py-3.5 text-[12px] font-bold text-white">

    <span>
      Central Bank
    </span>

    <span className="text-center">
      Current Rate
    </span>

    <span className="text-center">
      Last Change
    </span>

    <span className="text-center">
      Next Meeting
    </span>

    <span className="sr-only">
      Details
    </span>

  </div>

  {/* TABLET BANK ROWS */}

  {rows.length > 0 ? (

    <div className="divide-y divide-slate-200">

      {rows.map((bank, index) => {

        const nextMeeting = getNextMeeting(
          bank.data.meetings
        );

        const meetingDate = formatMeetingDate(
          nextMeeting
        );

        return (

          <Link
            key={bank.slug}
            href={`/en/interest-rates/${bank.slug}`}
            aria-label={`${bank.name} interest rate details`}
            className={`group grid min-h-[76px] min-w-0 grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)_24px] items-center gap-2 px-3 py-3 transition-colors duration-200 hover:bg-[#eef5ff] ${
              index % 2 === 0
                ? "bg-white"
                : "bg-[#f7f9fc]"
            }`}
          >

            {/* CENTRAL BANK */}

            <div className="flex min-w-0 items-center gap-2.5">

              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white lg:h-11 lg:w-11">

                <img
                  src={`https://flagcdn.com/w80/${bank.flag}.png`}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  className="!h-full !w-full !object-cover"
                />

              </span>

              <div className="min-w-0">

                <h3 className="break-words text-[12px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600 lg:text-[14px] lg:leading-6">

                  {bank.name}

                </h3>

                <span
                  dir="ltr"
                  className="mt-0.5 block w-fit text-[10px] font-bold tracking-wide text-slate-500"
                >

                  {bank.data.currency_code ||
                    bank.currency}

                </span>

              </div>

            </div>

            {/* CURRENT INTEREST RATE */}

            <div
              dir="ltr"
              className="min-w-0 text-center"
            >

              <strong className="text-[14px] font-black leading-6 tabular-nums text-[#194b92] lg:text-[17px]">

                {getCurrentRate(bank.data)}

              </strong>

            </div>

            {/* LAST RATE CHANGE */}

            <div className="flex min-w-0 items-center justify-center">

              <RateChange
                value={bank.data.last_change_bps}
              />

            </div>

            {/* NEXT CENTRAL BANK MEETING */}

            <div className="min-w-0 text-center">

              {meetingDate ? (

                <time
                  dateTime={nextMeeting ?? undefined}
                  className="flex flex-col items-center justify-center gap-0.5"
                >

                  <span className="text-[12px] font-black leading-5 text-[#194b92] lg:text-[14px]">

                    {meetingDate.dayMonth}

                  </span>

                  <span className="text-[10px] font-medium text-slate-500">

                    {meetingDate.year}

                  </span>

                </time>

              ) : (

                <span className="text-[11px] font-medium text-slate-400">

                  TBA

                </span>

              )}

            </div>

            {/* DETAILS ARROW */}

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7effa] text-[#194b92] transition-colors group-hover:bg-[#194b92] group-hover:text-white">

              <ChevronRight
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />

            </span>

          </Link>

        );

      })}

    </div>

  ) : (

    <div className="px-4 py-10 text-center text-[13px] font-medium text-slate-500">

      Interest rate data is currently unavailable.

    </div>

  )}

  {/* TABLET FOOTER */}

  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-[#f1f5f9] px-4 py-3">

    <span className="text-[11px] font-semibold text-slate-600">

      Central Bank Monetary Policy Data

    </span>

    <span className="text-[10px] font-medium text-slate-500">

      100 basis points (bps) = 1 percentage point

    </span>

  </div>

  {/* VIEW ALL INTEREST RATES */}

  <Link
    href="/en/interest-rates"
    className="group flex min-h-[44px] items-center justify-center gap-2 bg-gradient-to-r from-[#102e55] to-[#194b92] px-3 text-[12px] font-black text-white transition hover:brightness-110"
  >

    View All Global Interest Rates

    <ChevronRight
      size={15}
      strokeWidth={2}
      aria-hidden="true"
      className="transition-transform group-hover:translate-x-1"
    />

  </Link>

</div>

      {/* =================================================
    DESKTOP — GLOBAL INTEREST RATES TABLE
    ORIGINAL DESIGN — UNCHANGED
================================================== */}

<div className="hidden w-full min-w-0 overflow-hidden rounded-[18px] border border-slate-200 bg-white xl:block">

        {rows.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] border-collapse text-left">

              {/* =========================================
                  DARK BLUE TABLE HEADER
              ========================================== */}

              <thead>

                <tr className="bg-[#102e55] text-[13px] font-bold text-white sm:text-[14px]">

                  <th
                    scope="col"
                    className="w-[29%] whitespace-nowrap px-5 py-4"
                  >

                    Central Bank

                  </th>

                  <th
                    scope="col"
                    className="w-[16%] whitespace-nowrap px-3 py-4 text-center"
                  >

                    Current Rate

                  </th>

                  <th
                    scope="col"
                    className="w-[12%] whitespace-nowrap px-3 py-4 text-center"
                  >

                    Previous Rate

                  </th>

                  <th
                    scope="col"
                    className="w-[13%] whitespace-nowrap px-3 py-4 text-center"
                  >

                    Last Change

                  </th>

                  <th
                    scope="col"
                    className="w-[13%] whitespace-nowrap px-3 py-4 text-center"
                  >

                    Last Decision

                  </th>

                  <th
                    scope="col"
                    className="w-[13%] whitespace-nowrap px-3 py-4 text-center"
                  >

                    Next Meeting

                  </th>

                  <th
                    scope="col"
                    className="w-[4%] px-3 py-4"
                  >

                    <span className="sr-only">
                      Details
                    </span>

                  </th>

                </tr>

              </thead>

              {/* =========================================
                  TABLE BODY
              ========================================== */}

              <tbody className="divide-y divide-slate-200/70">

                {rows.map((bank, index) => {

                  const nextMeeting = getNextMeeting(
                    bank.data.meetings
                  );

                  const meetingDate = formatMeetingDate(
                    nextMeeting
                  );

                  return (

                    <tr
                      key={bank.slug}
                      className={`group transition-colors duration-150 hover:bg-[#eef5ff] ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-[#f7f9fc]"
                      }`}
                    >

                      {/* ===============================
                          CENTRAL BANK + CURRENCY
                      ================================ */}

                      <td className="px-5 py-3">

                        <Link
                          href={`/en/interest-rates/${bank.slug}`}
                          className="flex items-center gap-3"
                        >

                          {/* COUNTRY FLAG */}

                          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">

                            <img
                              src={`https://flagcdn.com/w80/${bank.flag}.png`}
                              alt=""
                              width={44}
                              height={44}
                              loading="lazy"
                              className="!h-full !w-full !object-cover"
                            />

                          </span>

                          {/* BANK NAME AND CURRENCY */}

                          <div className="min-w-0">

                            <span className="block text-[14px] font-black leading-6 text-[#10233f] transition-colors group-hover:text-brand-600 sm:text-[15px]">

                              {bank.name}

                            </span>

                            <span
                              dir="ltr"
                              className="mt-0.5 block w-fit text-[11px] font-bold tracking-wide text-slate-500"
                            >

                              {bank.data.currency_code ||
                                bank.currency}

                            </span>

                          </div>

                        </Link>

                      </td>

                      {/* ===============================
                          CURRENT INTEREST RATE
                      ================================ */}

                      <td
                        dir="ltr"
                        className="whitespace-nowrap px-3 py-3 text-center"
                      >

                        <span className="text-[16px] font-black tabular-nums text-[#194b92] sm:text-[18px]">

                          {getCurrentRate(bank.data)}

                        </span>

                      </td>

                      {/* ===============================
                          PREVIOUS INTEREST RATE
                      ================================ */}

                      <td
                        dir="ltr"
                        className="whitespace-nowrap px-3 py-3 text-center text-[14px] font-semibold tabular-nums text-slate-600"
                      >

                        {formatRate(bank.data.previous_rate)}

                      </td>

                      {/* ===============================
                          LAST INTEREST RATE CHANGE
                      ================================ */}

                      <td className="px-3 py-3 text-center">

                        <RateChange
                          value={bank.data.last_change_bps}
                        />

                      </td>

                      {/* ===============================
                          LAST DECISION DATE
                      ================================ */}

                      <td className="whitespace-nowrap px-3 py-3 text-center text-[13px] font-medium text-slate-600">

                        {formatDate(
                          bank.data.last_decision_date
                        )}

                      </td>

                      {/* ===============================
                          NEXT MEETING DATE
                      ================================ */}

                      <td className="whitespace-nowrap px-3 py-3 text-center">

                        {meetingDate ? (

                          <div className="flex flex-col items-center justify-center gap-0.5">

                            <span className="text-[14px] font-black leading-5 text-[#194b92]">

                              {meetingDate.dayMonth}

                            </span>

                            <span className="text-[11px] font-medium leading-4 text-slate-500">

                              {meetingDate.year}

                            </span>

                          </div>

                        ) : (

                          <span className="text-[12px] font-medium text-slate-400">

                            TBA

                          </span>

                        )}

                      </td>

                      {/* ===============================
                          DETAILS LINK
                      ================================ */}

                      <td className="px-3 py-3">

                        <Link
                          href={`/en/interest-rates/${bank.slug}`}
                          aria-label={`${bank.name} interest rate details`}
                          className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7effa] text-[#194b92] transition duration-200 hover:bg-[#194b92] hover:text-white"
                        >

                          <ChevronRight
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />

                        </Link>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="px-4 py-10 text-center text-[13px] font-medium text-slate-500">

            Interest rate data is currently unavailable.

          </div>

        )}

        {/* =================================================
            TABLE FOOTER
        ================================================== */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#f1f5f9] px-4 py-3 sm:px-5">

          <span className="text-[11px] font-semibold text-slate-600 sm:text-[12px]">

            Central Bank Monetary Policy Data

          </span>

          <span className="text-[11px] font-medium text-slate-500">

            100 basis points (bps) = 1 percentage point

          </span>

        </div>

      </div>

    </section>

  );

}