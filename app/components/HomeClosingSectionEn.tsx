import Link from "next/link";

import {
  Headset,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB — FINAL HOME SECTION (ENGLISH)
========================================================= */

type FeaturedBroker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
};

type Props = {
  brokers: FeaturedBroker[];
};

/* =========================================================
   MANUAL FEATURED BROKER SELECTION
========================================================= */

const FEATURED_BROKER_SLUGS = [
  "equiti",
  "pepperstone",
  "exness",
  "capital-com",
  "xs",
  "fxpro",
];

/* =========================================================
   INDIVIDUAL LOGO SIZE CONTROL
========================================================= */

const LOGO_SCALES: Record<string, number> = {
  equiti: 1.95,
  pepperstone: 1.75,
  exness: 1.75,
  "capital-com": 1.55,
  xs: 1.75,
  fxpro: 1.85,
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeClosingSectionEn({
  brokers,
}: Props) {

  const visibleBrokers = FEATURED_BROKER_SLUGS
    .map((slug) =>
      brokers.find(
        (broker) =>
          broker.slug === slug &&
          broker.logo &&
          broker.name
      )
    )
    .filter(
      (broker): broker is FeaturedBroker =>
        Boolean(broker)
    );

  return (

    <div
      dir="ltr"
      lang="en"
      className="mx-auto w-full min-w-0 pb-1 sm:pb-2"
    >

      {/* =================================================
          SELECTED BROKER LOGOS + ADVERTISEMENT
      ================================================== */}

      <section
        id="home-featured-brokers"
        aria-labelledby="home-final-brokers-title"
        className="py-3 sm:py-4"
      >

        {/* ===============================================
            EXTERNAL SECTION HEADER
        ================================================ */}

        <div className="mb-4 flex min-h-[44px] items-center">

          <h2
            id="home-final-brokers-title"
            className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
          >

            <Link
              href="/en/brokers"
              className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
            >

              Featured Trading Brokers

              <ChevronRight
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover/title:translate-x-1"
              />

            </Link>

          </h2>

        </div>

        {/* ===============================================
            MAIN GRID
        ================================================ */}

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch">

          {/* =============================================
              FEATURED BROKER LOGOS CONTAINER
          ============================================== */}

          <div className="flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white">

            {/* ===========================================
                LOGOS GRID
                MOBILE: 3 COLUMNS / 2 ROWS
                DESKTOP: ORIGINAL DESIGN
            ============================================ */}

            <div className="grid flex-1 grid-cols-3 items-stretch">

              {visibleBrokers.map((broker) => (

                <Link
                  key={broker.id}
                  href={`/en/brokers/${broker.slug}`}
                  aria-label={`Read ${broker.name} Review`}
                  className="group relative flex min-h-[90px] min-w-0 flex-col items-center justify-center overflow-hidden border-b border-r border-slate-200/80 px-1.5 py-2 transition duration-300 hover:bg-[#f0f6ff] [&:nth-child(3n)]:border-r-0 sm:min-h-[135px] sm:px-3 sm:py-3"
                >

                  {/* SUBTLE HOVER ACCENT */}

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-center scale-x-0 bg-[#194b92] opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                  />

                  {/* =====================================
                      BROKER LOGO — RESPONSIVE SIZE
                  ====================================== */}

                  <div className="flex h-[53px] w-full max-w-[110px] items-center justify-center overflow-hidden sm:h-[85px] sm:max-w-[240px]">

                    <img
                      src={broker.logo!}
                      alt={`${broker.name} logo`}
                      loading="lazy"
                      className="h-[46px] w-[95px] max-w-full scale-[var(--mobile-logo-scale)] object-contain mix-blend-multiply transition duration-300 sm:h-[85px] sm:w-[170px] sm:scale-[var(--desktop-logo-scale)]"
                      style={{
                        "--mobile-logo-scale":
                          broker.slug === "equiti"
                            ? 1.40
                            : broker.slug === "capital-com"
                              ? 1.25
                              : broker.slug === "pepperstone"
                                ? 1.30
                                : broker.slug === "exness"
                                  ? 1.30
                                  : broker.slug === "xs"
                                    ? 1.40
                                    : broker.slug === "fxpro"
                                      ? 1.40
                                      : 1.25,

                        "--desktop-logo-scale":
                          LOGO_SCALES[broker.slug || ""] || 1.65,

                      } as React.CSSProperties}
                    />

                  </div>

                  {/* =====================================
                      REVIEW LINK
                  ====================================== */}

                  <span className="mt-0.5 inline-flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-500 transition duration-200 group-hover:text-[#194b92] sm:mt-1 sm:gap-1.5 sm:text-[11px]">

                    View Review

                    <ChevronRight
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="h-[11px] w-[11px] transition-transform duration-200 group-hover:translate-x-1 sm:h-[13px] sm:w-[13px]"
                    />

                  </span>

                </Link>

              ))}

            </div>

            {/* ===========================================
                DARK FOOTER — ALL BROKERS
            ============================================ */}

            <Link
              href="/en/brokers"
              className="group flex min-h-[46px] shrink-0 items-center justify-center gap-3 bg-[linear-gradient(250deg,#10233f_0%,#102e55_60%,#194b92_100%)] px-4 py-3 text-[12px] font-bold text-white transition duration-200 hover:brightness-110 sm:text-[13px]"
            >

              Explore All Trading Brokers

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />

            </Link>

          </div>

          {/* =============================================
              CAPITAL.COM ADVERTISING PLACEMENT
          ============================================== */}

          <aside
            aria-label="Capital.com Advertisement"
            className="hidden min-w-0 xl:flex"
          >

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-white px-2 pb-3 pt-6">

              {/* ADVERTISEMENT LABEL */}

              <span className="absolute left-1/2 top-1.5 z-10 -translate-x-1/2 text-[10px] font-medium text-slate-400">

                Advertisement

              </span>

              {/* CAPITAL.COM BANNER */}

              <a
                href="https://go.capital.com/visit/?bta=107752&nci=7031"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                aria-label="Capital.com Advertisement"
                className="block w-full max-w-[300px] overflow-hidden rounded-[12px]"
              >

                <img
                  src="/banners/capitalbanneren.png"
                  alt="Capital.com Advertisement"
                  width={300}
                  height={250}
                  loading="lazy"
                  className="mx-auto !block !h-auto !w-full !max-h-none !max-w-full !object-contain !object-center !transform-none !scale-100"
                />

              </a>

            </div>

          </aside>

        </div>

      </section>

      {/* =================================================
          FREE BROKER COMPARISON ASSISTANCE
      ================================================== */}

      <section
        aria-labelledby="home-assistance-title"
        className="py-3 sm:py-4"
      >

        <div className="flex flex-col items-start gap-4 rounded-[18px] border border-[#d7e3f2] bg-[#edf3fc] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

          {/* CONTACT ICON AND CONTENT */}

          <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">

            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[15px] bg-white text-[#194b92] sm:h-16 sm:w-16">

              <Headset
                size={30}
                strokeWidth={1.7}
                aria-hidden="true"
              />

            </span>

            <div className="min-w-0 flex-1">

              <h2
                id="home-assistance-title"
                className="text-[18px] font-black leading-8 text-[#10233f] sm:text-[22px]"
              >

                Need Help Choosing a Trading Broker?

              </h2>

              <p className="mt-1 text-[12px] font-medium leading-6 text-slate-600 sm:text-[14px]">

                Tell us your country, experience level and what
                you are looking for. We will help you compare
                brokers and understand the available options.

              </p>

              <p className="mt-1 text-[10px] font-medium leading-5 text-slate-500 sm:text-[11px]">

                Free informational assistance, not investment advice.

              </p>

            </div>

          </div>

          {/* CONTACT BUTTON */}

          <Link
            href="/en/contact"
            className="group flex min-h-[46px] w-full shrink-0 items-center justify-center gap-3 rounded-[12px] bg-[#194b92] px-6 text-[13px] font-black text-white transition duration-200 hover:bg-brand-600 sm:w-auto sm:min-w-[180px]"
          >

            Contact Us

            <ArrowRight
              size={17}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>

    </div>

  );

}