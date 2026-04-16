import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  best_for: string | null;
  best_for_en: string | null;
  regulation: string | null;
  platforms: string | null;
  islamic_account: string | null;
  logo: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

export const metadata: Metadata = {
  title: "Trusted Broker Reviews",
  description:
    "Browse trusted broker reviews, compare regulation, minimum deposit, trading platforms, and Islamic account availability, then choose the right broker before opening a live account.",
  keywords: [
    "broker reviews",
    "trusted brokers",
    "best brokers",
    "broker comparison",
    "open live trading account",
    "forex brokers",
    "Islamic account",
    "Broker Al Arab",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/en/brokers",
    languages: {
      ar: "https://brokeralarab.com/brokers",
      en: "https://brokeralarab.com/en/brokers",
    },
  },
  openGraph: {
    title: "Trusted Broker Reviews | Broker Al Arab",
    description:
      "A professional English page to explore broker reviews and compare key details before opening a live account.",
    url: "https://brokeralarab.com/en/brokers",
    siteName: "Broker Al Arab",
    type: "website",
    locale: "en_US",
  },
};

function formatRating(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(1);
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "Not specified";
  return `$${Number(value).toLocaleString()}`;
}

function normalizeText(value: string | null | undefined, fallback = "Not specified") {
  if (!value || !value.trim()) return fallback;
  return value;
}

function islamicAccountLabel(value: string | null | undefined) {
  if (!value || !value.trim()) return "Not specified";

  const v = value.trim().toLowerCase();

  if (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("islamic") ||
    v.includes("نعم")
  ) {
    return "Available";
  }

  if (
    v.includes("no") ||
    v.includes("false") ||
    v.includes("not available") ||
    v.includes("غير متوفر")
  ) {
    return "Not available";
  }

  return value;
}

function hasRealAccountLink(url: string | null | undefined) {
  return !!url && url.trim().length > 0;
}

function getInitials(name: string | null | undefined) {
  if (!name) return "BR";
  const cleaned = name.trim();
  if (!cleaned) return "BR";
  return cleaned.slice(0, 2).toUpperCase();
}

function splitToBadges(value: string | null | undefined, fallback = "Not specified") {
  const text = normalizeText(value, fallback);

  return text
    .split(/,|\/|\||\n|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function getRoundedStarValue(rating: number | null) {
  if (rating === null || rating === undefined) return 0;
  return Math.round(Number(rating) * 2) / 2;
}

function renderStars(rating: number | null) {
  const rounded = getRoundedStarValue(rating);
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center justify-center gap-0.5"
      aria-label={`Rating ${formatRating(rating)} out of 5`}
      dir="ltr"
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-[14px] leading-none text-amber-400">
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className="text-[14px] leading-none text-amber-400">⯨</span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-[14px] leading-none text-slate-300">
          ★
        </span>
      ))}
    </div>
  );
}

function getLogoImgClass(name: string | null | undefined) {
  const n = (name || "").toLowerCase().trim();

  if (n.includes("exness")) return "scale-[1.45]";
  if (n === "xm") return "scale-[1.45]";
  if (n.includes("vantage")) return "scale-[1.35]";
  if (n.includes("equiti")) return "scale-[1.45]";
  if (n === "xs") return "scale-[1.4]";
  if (n.includes("alpari")) return "scale-[1.45]";

  return "scale-[1.35]";
}

function BrokerCard({
  broker,
  index,
}: {
  broker: Broker;
  index: number;
}) {
  const realLink = hasRealAccountLink(broker.real_account_url);
  const platformBadges = splitToBadges(broker.platforms).slice(0, 2);
  const regulationBadges = splitToBadges(broker.regulation).slice(0, 2);
  const islamicLabel = islamicAccountLabel(broker.islamic_account);
  const brokerName = broker.name_en || broker.name || "Broker";

  return (
    <article className="group rounded-[22px] border border-blue-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-700">
          {index + 1}
        </span>

        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-extrabold text-blue-700">
          Recommended
        </span>
      </div>

      <div dir="ltr" className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1 text-left">
          <h3 className="text-[20px] font-extrabold text-slate-950">
            {brokerName}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            {renderStars(broker.rating)}

            <span className="text-base font-extrabold text-slate-900">
              {formatRating(broker.rating)}
              <span className="ml-1 text-xs font-bold text-slate-500">/5</span>
            </span>
          </div>
        </div>

        <div className="relative flex h-[76px] w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {broker.logo ? (
            <Image
              src={broker.logo}
              alt={brokerName}
              fill
              className={`object-contain ${getLogoImgClass(brokerName)}`}
            />
          ) : (
            <span className="text-sm font-extrabold text-slate-600">
              {getInitials(brokerName)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Minimum deposit</span>
            <span className="font-extrabold text-slate-900">
              {formatDeposit(broker.min_deposit)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Islamic account</span>
            <span
              className={`font-extrabold ${
                islamicLabel === "Available"
                  ? "text-emerald-700"
                  : islamicLabel === "Not available"
                  ? "text-rose-700"
                  : "text-slate-700"
              }`}
            >
              {islamicLabel}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500">Regulation</span>
            <span className="text-right font-bold text-slate-900">
              {regulationBadges.join(", ") || "Not specified"}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500">Platforms</span>
            <span className="text-right font-bold text-slate-900">
              {platformBadges.join(", ") || "Not specified"}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500">Best for</span>
            <span className="text-right font-bold text-slate-900">
              {normalizeText(
                broker.best_for_en || broker.best_for,
                "Beginners and active traders"
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {realLink ? (
          <a
            href={`/go/${broker.slug}?type=real`}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
          >
            Open Live Account
          </a>
        ) : (
          <span className="inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-5 py-3 text-sm font-extrabold text-slate-500">
            Coming Soon
          </span>
        )}

        <div className="mt-3 text-center text-[11px] font-medium text-slate-400">
          Review regulation and fees before signing up
        </div>

        <div className="mt-3 flex items-center justify-center">
          <Link
            href={`/en/brokers/${broker.slug}`}
            className="inline-flex items-center gap-1 text-sm font-extrabold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-4 transition hover:text-blue-700"
          >
            Read Review
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function BrokersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
      "id,name,name_en,slug,rating,min_deposit,best_for,best_for_en,regulation,platforms,islamic_account,logo,real_account_url,demo_account_url"
    )
    .order("rating", { ascending: false });

  const brokers = (data as Broker[] | null) ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I choose the best broker before opening a live account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choosing the right broker depends on regulatory strength, trading costs, minimum deposit, platform quality, execution standards, and whether an Islamic account is available if that matters to you.",
        },
      },
      {
        "@type": "Question",
        name: "Does every highly rated broker suit all traders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not necessarily. Some brokers are better for beginners, while others are more suitable for experienced traders seeking advanced tools, tighter pricing, or more professional trading environments.",
        },
      },
      {
        "@type": "Question",
        name: "Can I open a live account directly from this page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. When a live account link is available, a dedicated button will appear inside each broker card to help you go directly to the registration page.",
        },
      },
      {
        "@type": "Question",
        name: "Why is regulation important when reviewing brokers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Regulation is one of the most important factors because it helps assess credibility, oversight, and the overall level of trust and transparency a broker offers to traders.",
        },
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: brokers.map((broker, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://brokeralarab.com/en/brokers/${broker.slug ?? ""}`,
      name: broker.name_en || broker.name || "Broker",
    })),
  };

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          An error occurred while loading the broker reviews page.
        </div>
      </main>
    );
  }

  return (
    <>
      <Script
        id="brokers-faq-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="brokers-itemlist-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="bg-slate-50" dir="ltr">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                Trusted Broker Reviews
              </h1>

              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                Review brokers, compare regulation, platforms, minimum deposit,
                and Islamic account availability, then choose the right trading
                company before opening a live account.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/en/compare"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  Start Broker Comparison
                </Link>

                <a
                  href="#brokers-grid"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100"
                >
                  Browse Reviews
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="brokers-grid"
          className="mx-auto max-w-7xl px-4 pt-6 pb-10 md:pt-5 md:pb-14"
        >
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div></div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {brokers.map((broker, index) => (
              <BrokerCard key={broker.id} broker={broker} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}