import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Forex and FinTech Events in 2026",
  description:
    "Follow major forex, trading and fintech events in 2026, including dates, venues, locations and why they matter for traders, brokers and financial brands.",
};

function formatDate(date?: string | null) {
  if (!date) return "To be announced";

  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getDateRange(start?: string | null, end?: string | null) {
  if (!start) return "To be announced";
  if (!end || end === start) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });

  const eventList = events || [];

  return (
    <main dir="ltr" className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-5 py-10 text-center md:px-10 md:py-14">
            <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-brand-600 shadow-sm">
              Forex & FinTech Events
            </span>

            <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Major Forex and FinTech Expos in 2026
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
              A regularly updated guide to major forex, trading, fintech and
              online brokerage events, with details about dates, cities, venues
              and opportunities for brokers, traders and financial brands.
            </p>
          </div>

          <div className="p-4 md:p-7">
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                There was an error loading the events.
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {eventList.map((event) => (
                <article
                  key={event.id}
                  className="group flex min-h-[320px] flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-100 hover:shadow-xl"
                >
                  <h2 className="text-center text-2xl font-black leading-8 text-slate-950">
                    {event.title_en || event.title_ar}
                  </h2>

                  <p className="mt-3 min-h-[72px] text-center text-sm leading-7 text-slate-600">
                    {event.excerpt_en ||
                      event.excerpt_ar ||
                      "Event details will be updated soon."}
                  </p>

                  <div className="mt-5 space-y-2 text-sm font-bold text-slate-700">
                    <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
                      📅 {getDateRange(event.start_date, event.end_date)}
                    </div>

                    <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
                      📍 {event.city_en || event.city_ar}
                      {event.country_en || event.country_ar
                        ? `, ${event.country_en || event.country_ar}`
                        : ""}
                    </div>

                    <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
                      🏢 {event.venue_en || event.venue_ar || "To be announced"}
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/en/events/${event.slug}`}
                      className="flex w-full items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-black text-white transition hover:bg-brand-600"
                    >
                      View Event Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 md:p-7">
                <h2 className="text-2xl font-black text-slate-950">
                  Why We Track Forex and FinTech Events
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
                  Forex and fintech expos are no longer just promotional events.
                  They have become meeting points for brokers, liquidity
                  providers, payment companies, trading platforms, technology
                  vendors, fintech brands and affiliates. These events help
                  traders and companies follow market trends, discover new
                  products and build direct relationships within the trading
                  industry.
                </p>
              </div>

              <div className="rounded-[26px] border border-brand-100 bg-brand-50 p-5 md:p-7">
                <h2 className="text-2xl font-black text-slate-950">
                  Broker Alarab Coverage
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
                  Broker Alarab follows major financial conferences and trading
                  expos that matter to brokers, traders and fintech companies,
                  with a focus on participating brands, partnership
                  opportunities, broker updates and events shaping the forex and
                  fintech ecosystem.
                </p>
              </div>
            </section>

            <section className="mt-5 rounded-[26px] border border-slate-200 bg-white p-5 md:p-7">
              <h2 className="text-2xl font-black text-slate-950">
                What You Will Find on Event Pages
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {[
                  ["Dates and Venues", "Event dates, host cities and venue details."],
                  [
                    "Participating Companies",
                    "Key brokers, sponsors, exhibitors and service providers.",
                  ],
                  [
                    "Media Updates",
                    "Press releases and updates from organizers where available.",
                  ],
                  [
                    "Opportunities for Traders",
                    "Educational sessions, networking and direct access to brands.",
                  ],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}