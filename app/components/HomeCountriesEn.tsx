import Link from "next/link";
import { ChevronRight } from "lucide-react";

/* =========================================================
   BROKER ALARAB — HOME COUNTRIES (ENGLISH)
========================================================= */

const countries = [
  {
    name: "Vietnam",
    slug: "vietnam",
    code: "vn",
    description: "Forex brokers and trading accounts",
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    code: "id",
    description: "Trading accounts and payment options",
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    code: "my",
    description: "Islamic accounts and trading platforms",
  },
  {
    name: "UK",
    slug: "united-kingdom",
    code: "gb",
    description: "Broker regulation and trading costs",
  },
  {
    name: "Australia",
    slug: "australia",
    code: "au",
    description: "Broker regulation and account types",
  },
  {
    name: "South Africa",
    slug: "south-africa",
    code: "za",
    description: "Forex brokers and funding options",
  },
  {
    name: "Singapore",
    slug: "singapore",
    code: "sg",
    description: "Regulation and trading platforms",
  },
  {
    name: "Ghana",
    slug: "ghana",
    code: "gh",
    description: "Trading accounts and payment methods",
  },
  {
    name: "Nigeria",
    slug: "nigeria",
    code: "ng",
    description: "Forex brokers and local payment options",
  },
  {
    name: "Thailand",
    slug: "thailand",
    code: "th",
    description: "Trading platforms and account options",
  },
  {
    name: "Philippines",
    slug: "philippines",
    code: "ph",
    description: "Forex brokers and deposit methods",
  },
  {
    name: "Kenya",
    slug: "kenya",
    code: "ke",
    description: "Broker regulation and funding options",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeCountriesEn() {

  return (

    <section
      id="home-countries"
      aria-labelledby="home-countries-title"
      dir="ltr"
      lang="en"
      className="flex min-w-0 flex-1 flex-col py-3 sm:py-4"
    >

      {/* =================================================
          EXTERNAL SECTION HEADER
      ================================================== */}

      <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

        <h2
          id="home-countries-title"
          className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          <Link
            href="/en/best-brokers"
            className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
          >

            Best Trading Brokers by Country

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
          MOBILE — COMPACT COUNTRY GRID
          THREE COLUMNS / FOUR ROWS
      ================================================== */}

      <div className="overflow-hidden rounded-[15px] border border-slate-200 bg-white sm:hidden">

        <div className="grid grid-cols-3">

          {countries.map((country, index) => (

            <Link
              key={country.slug}
              href={`/en/best-brokers/${country.slug}`}
              aria-label={`Best trading brokers in ${country.name}`}
              className={`group flex min-h-[88px] min-w-0 flex-col items-center justify-center gap-2 px-1 py-3 text-center transition duration-200 active:bg-[#edf3fc] ${
                index % 3 !== 0
                  ? "border-l border-slate-200"
                  : ""
              } ${
                index >= 3
                  ? "border-t border-slate-200"
                  : ""
              }`}
            >

              {/* COUNTRY FLAG */}

              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-slate-100 ring-1 ring-slate-200 transition duration-200 group-hover:ring-blue-300">

                <img
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={`${country.name} flag`}
                  width={38}
                  height={38}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

              </span>

              {/* COUNTRY NAME */}

              <span className="text-[12px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600">

                {country.name}

              </span>

            </Link>

          ))}

        </div>

      </div>

      {/* =================================================
          DESKTOP — COUNTRY CARDS
      ================================================== */}

      <div className="hidden flex-1 auto-rows-fr grid-cols-2 gap-3 sm:grid md:grid-cols-3">

        {countries.map((country) => (

          <Link
            key={country.slug}
            href={`/en/best-brokers/${country.slug}`}
            className="group flex min-h-[90px] min-w-0 items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-3 py-3 transition duration-200 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_5px_18px_rgba(15,23,42,0.05)]"
          >

            {/* COUNTRY FLAG */}

            <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-slate-100 ring-1 ring-slate-200 transition duration-200 group-hover:ring-blue-300">

              <img
                src={`https://flagcdn.com/w80/${country.code}.png`}
                alt={`${country.name} flag`}
                width={46}
                height={46}
                loading="lazy"
                className="h-full w-full object-cover"
              />

            </span>

            {/* COUNTRY INFORMATION */}

            <div className="min-w-0 flex-1">

              <h3 className="text-[14px] font-black leading-6 text-[#10233f] transition-colors group-hover:text-brand-600">

                {country.name}

              </h3>

              <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-500">

                {country.description}

              </p>

            </div>

            {/* NAVIGATION ARROW */}

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white">

              <ChevronRight
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />

            </span>

          </Link>

        ))}

      </div>

    </section>

  );

}