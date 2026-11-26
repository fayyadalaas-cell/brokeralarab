import Link from "next/link";

/* =========================================================
   BROKER ALARAB — HOME COUNTRIES DIRECTORY
========================================================= */

const countries = [
  {
    name: "السعودية",
    slug: "saudi-arabia",
    code: "sa",
    description: "حسابات إسلامية ودعم عربي",
  },
  {
    name: "الكويت",
    slug: "kuwait",
    code: "kw",
    description: "الحسابات والرسوم وطرق الدفع",
  },
  {
    name: "الإمارات",
    slug: "uae",
    code: "ae",
    description: "دعم الدرهم ووسائل الإيداع",
  },
  {
    name: "قطر",
    slug: "qatar",
    code: "qa",
    description: "التراخيص والحسابات المتاحة",
  },
  {
    name: "عُمان",
    slug: "oman",
    code: "om",
    description: "الحسابات ومنصات التداول",
  },
  {
    name: "البحرين",
    slug: "bahrain",
    code: "bh",
    description: "الرسوم ووسائل الإيداع",
  },
  {
    name: "الأردن",
    slug: "jordan",
    code: "jo",
    description: "الدعم وطرق الدفع المحلية",
  },
  {
    name: "العراق",
    slug: "iraq",
    code: "iq",
    description: "الوسطاء المتاحون للمتداولين",
  },
  {
    name: "مصر",
    slug: "egypt",
    code: "eg",
    description: "خيارات مناسبة للمبتدئين",
  },
  {
    name: "لبنان",
    slug: "lebanon",
    code: "lb",
    description: "الحسابات وخيارات التداول",
  },
  {
    name: "الجزائر",
    slug: "algeria",
    code: "dz",
    description: "الوسطاء ووسائل الإيداع",
  },
  {
    name: "فلسطين",
    slug: "palestine",
    code: "ps",
    description: "خيارات شركات التداول",
  },
  {
    name: "سوريا",
    slug: "syria",
    code: "sy",
    description: "شركات التداول المتاحة",
  },
  {
    name: "ليبيا",
    slug: "libya",
    code: "ly",
    description: "الحسابات ومنصات التداول",
  },
  {
    name: "اليمن",
    slug: "yemen",
    code: "ye",
    description: "خيارات الوسطاء المتاحين",
  },
];

/* =========================================================
   MAIN SECTION
========================================================= */

export default function HomeCountries() {

  return (

    <section
      id="home-countries"
      dir="rtl"
      aria-labelledby="home-countries-title"
      className="mx-auto flex w-full min-w-0 flex-col pt-3 pb-3 sm:pt-4 sm:pb-4 xl:flex-1"
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
            href="/best-brokers"
            className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
          >

            أفضل شركات التداول حسب الدولة

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover/title:-translate-x-1"
            >

              <path d="m15 18-6-6 6-6" />

            </svg>

          </Link>

        </h2>

      </div>

      {/* =================================================
          MOBILE — COMPACT COUNTRY DIRECTORY
          3 COLUMNS / 5 ROWS
      ================================================== */}

      <div className="overflow-hidden rounded-[15px] border border-slate-200 bg-white sm:hidden">

        <div className="grid grid-cols-3">

          {countries.map((country, index) => (

            <Link
              key={country.slug}
              href={`/best-brokers/${country.slug}`}
              title={`أفضل شركات التداول في ${country.name}`}
              aria-label={`أفضل شركات التداول في ${country.name}`}
              className={`group relative flex min-h-[92px] min-w-0 flex-col items-center justify-center gap-2 px-2 py-3 text-center transition duration-200 hover:bg-blue-50/50 active:bg-blue-100/60 ${
                index % 3 !== 0
                  ? "border-r border-slate-200"
                  : ""
              } ${
                index >= 3
                  ? "border-t border-slate-200"
                  : ""
              }`}
            >

              {/* MOBILE COUNTRY FLAG */}

              <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-slate-100 ring-1 ring-slate-200 transition duration-200 group-hover:ring-blue-300">

                <img
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={`علم ${country.name}`}
                  width={80}
                  height={60}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

              </div>

              {/* MOBILE COUNTRY NAME */}

              <h3 className="text-[13px] font-black leading-6 text-[#10233f] transition duration-200 group-hover:text-brand-600">

                {country.name}

              </h3>

            </Link>

          ))}

        </div>

      </div>

      {/* =================================================
          DESKTOP + TABLET — ORIGINAL DESIGN
          UNCHANGED
      ================================================== */}

      <div className="hidden grid-cols-2 gap-2 sm:grid sm:gap-3 md:grid-cols-3 xl:flex-1 xl:auto-rows-fr">

        {countries.map((country) => (

          <Link
            key={country.slug}
            href={`/best-brokers/${country.slug}`}
            title={`أفضل شركات التداول في ${country.name}`}
            aria-label={`أفضل شركات التداول في ${country.name}`}
            className="
              group relative flex min-h-[76px] min-w-0 items-center
              justify-between gap-2 overflow-hidden
              rounded-[15px] border border-slate-200
              bg-white px-3 py-3
              transition duration-200
              hover:border-brand-300
              hover:shadow-[0_6px_18px_rgba(15,23,42,0.06)]
              sm:min-h-[90px] sm:px-4
            "
          >

            {/* COUNTRY IDENTITY */}

            <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">

              {/* COUNTRY FLAG */}

              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-slate-100 ring-1 ring-slate-200 sm:h-[46px] sm:w-[46px]">

                <img
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={`علم ${country.name}`}
                  width={80}
                  height={60}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

              </div>

              {/* COUNTRY INFORMATION */}

              <div className="min-w-0">

                <h3 className="text-[14px] font-black leading-6 text-[#10233f] transition group-hover:text-brand-600 sm:text-[18px]">

                  {country.name}

                </h3>

                <p className="mt-0.5 hidden text-[12px] font-medium leading-5 text-slate-500 sm:block">

                  {country.description}

                </p>

              </div>

            </div>

            {/* NAVIGATION ARROW */}

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f5fb] text-brand-600 transition duration-200 group-hover:bg-brand-600 group-hover:text-white">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >

                <path d="m15 18-6-6 6-6" />

              </svg>

            </span>

          </Link>

        ))}

      </div>

    </section>

  );

}