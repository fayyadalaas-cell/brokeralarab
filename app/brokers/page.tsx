import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  best_for: string | null;
  regulation: string | null;
  platforms: string | null;
  islamic_account: string | null;
  logo: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

export const metadata: Metadata = {
  title: "تقييمات شركات التداول الموثوقة",
  description:
  "تصفح تقييمات شركات التداول الموثوقة، وراجع التراخيص والرسوم والمنصات والحد الأدنى للإيداع والحساب الإسلامي قبل اختيار وسيط التداول المناسب.",
  keywords: [
    "تقييم شركات التداول",
    "شركات تداول موثوقة",
    "أفضل شركات التداول",
    "مراجعات شركات التداول",
    "وسطاء الفوركس",
    "فتح حساب تداول",
    "الحساب الإسلامي",
    "بروكر العرب",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/brokers",
    languages: {
      ar: "https://brokeralarab.com/brokers",
      en: "https://brokeralarab.com/en/brokers",
      "x-default": "https://brokeralarab.com/en/brokers",
    },
  },
  openGraph: {
    title: "تقييمات شركات التداول الموثوقة | بروكر العرب",
    description:
  "تصفح تقييمات شركات التداول وراجع التراخيص والرسوم والمنصات والحساب الإسلامي قبل اختيار الوسيط وفتح حساب حقيقي.",
    url: "https://brokeralarab.com/brokers",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 377,
        alt: "بروكر العرب",
      },
    ],
  },
};

function formatRating(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(1);
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${Number(value).toLocaleString()}`;
}

function normalizeText(value: string | null | undefined, fallback = "غير محدد") {
  if (!value || !value.trim()) return fallback;
  return value;
}

function islamicAccountLabel(value: string | null | undefined) {
  if (!value || !value.trim()) return "غير محدد";

  const v = value.trim().toLowerCase();

  if (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("islamic") ||
    v.includes("نعم")
  ) {
    return "متوفر";
  }

  if (
    v.includes("no") ||
    v.includes("false") ||
    v.includes("not available") ||
    v.includes("غير متوفر")
  ) {
    return "غير متوفر";
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

function splitToBadges(value: string | null | undefined, fallback = "غير محدد") {
  const text = normalizeText(value, fallback);

  return text
    .split(/,|\/|\||\n|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function ratingLabel(rating: number | null) {
  if (rating === null || rating === undefined) return "غير مقيم";
  if (rating >= 4.5) return "ممتاز";
  if (rating >= 4) return "قوي جدًا";
  if (rating >= 3.5) return "جيد";
  return "مقبول";
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
      aria-label={`تقييم ${formatRating(rating)} من 5`}
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

function getLogoWrapClass(name: string | null | undefined) {
  const n = (name || "").toLowerCase().trim();

  if (n.includes("exness")) return "w-[180px] h-[80px]";
  if (n === "xm") return "w-[180px] h-[80px]";
  if (n.includes("vantage")) return "w-[180px] h-[80px]";
  if (n.includes("equiti")) return "w-[180px] h-[80px]";
  if (n === "xs") return "w-[180px] h-[80px]";
  if (n.includes("alpari")) return "w-[180px] h-[80px]";
  if (n.includes("fxpro")) return "w-[180px] h-[80px]";

  return "w-[190px] h-[88px]";
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

function regulationStrengthLabel(value: string | null | undefined) {
  const text = (value || "").toLowerCase();

  if (
    text.includes("fca") ||
    text.includes("asic") ||
    text.includes("cysec") ||
    text.includes("dfsa")
  ) {
    return "قوية";
  }

  if (text.trim()) {
    return "جيدة";
  }

  return "غير واضحة";
}

function beginnerFriendlyLabel(value: string | null | undefined) {
  const text = (value || "").toLowerCase();

  if (
    text.includes("مبتدئ") ||
    text.includes("المبتدئين") ||
    text.includes("beginners") ||
    text.includes("novice")
  ) {
    return "نعم";
  }

  return "متوسطة";
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

  return (
    <article className="group rounded-[22px] border border-brand-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-700">
          {index + 1}
        </span>

       <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-600">
  موصى بها
</span>
      </div>

      <div dir="ltr" className="flex items-center justify-between gap-4">
  <div className="min-w-0 flex-1 text-left">
    <h3 className="text-[20px] font-extrabold text-slate-950">
      {broker.name ?? "وسيط تداول"}
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
        alt={broker.name ?? "Broker logo"}
        fill
        className={`object-contain ${getLogoImgClass(broker.name)}`}
      />
    ) : (
      <span className="text-sm font-extrabold text-slate-600">
        {getInitials(broker.name)}
      </span>
    )}
  </div>
</div>

      <div className="mt-5 border-t border-slate-200 pt-4">
  <div className="space-y-2 text-sm">
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">الحد الأدنى للإيداع</span>

      <span dir="ltr" className="font-extrabold text-slate-900">
        {formatDeposit(broker.min_deposit)}
      </span>
    </div>

    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">الحساب الإسلامي</span>

      <span
        className={`font-extrabold ${
          islamicLabel === "متوفر"
            ? "text-emerald-700"
            : islamicLabel === "غير متوفر"
            ? "text-rose-700"
            : "text-slate-700"
        }`}
      >
        {islamicLabel}
      </span>
    </div>

    <div className="flex items-start justify-between gap-4">
      <span className="text-slate-500">التراخيص</span>

      <span dir="ltr" className="text-left font-bold text-slate-900">
        {regulationBadges.join(", ") || "غير محدد"}
      </span>
    </div>

    <div className="flex items-start justify-between gap-4">
      <span className="text-slate-500">المنصات</span>

      <span dir="ltr" className="text-left font-bold text-slate-900">
        {platformBadges.join(", ") || "غير محدد"}
      </span>
    </div>

    <div className="flex items-start justify-between gap-4">
      <span className="text-slate-500">الأنسب لـ</span>

      <span className="text-left font-bold text-slate-900">
        {normalizeText(broker.best_for, "المبتدئين والمتداولين العرب")}
      </span>
    </div>
  </div>
</div>

      <div className="mt-5">
       {realLink ? (
  <a
  href={`/go/${broker.slug}?type=real`}
  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-brand-500 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-brand-600"
>
  افتح حساب حقيقي
</a>
) : (
  <span className="inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-5 py-2.5 text-sm font-extrabold text-slate-500">
    فتح حساب قريبًا
  </span>
)}

        <div className="mt-3 text-center text-[11px] font-medium text-slate-400">
          راجع تفاصيل الترخيص والرسوم قبل التسجيل
        </div>

        <div className="mt-3 flex items-center justify-center">
          <Link
            href={`/brokers/${broker.slug}`}
            className="inline-flex items-center gap-1 text-sm font-extrabold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-4 transition hover:text-brand-600"
          >
            اقرأ التقييم
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
    "id,name,slug,rating,min_deposit,best_for,regulation,platforms,islamic_account,logo,real_account_url,demo_account_url"
  )
  .order("rating", { ascending: false });

  const brokers = (data as Broker[] | null) ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف أختار أفضل شركة تداول لفتح حساب حقيقي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اختيار شركة التداول المناسبة لفتح حساب حقيقي يعتمد على قوة الترخيص، تكاليف التداول، الحد الأدنى للإيداع، نوع المنصات، جودة التنفيذ، وتوفر الحساب الإسلامي إذا كان ذلك مهمًا بالنسبة لك.",
        },
      },
      {
        "@type": "Question",
        name: "هل كل شركة بتقييم مرتفع تناسب جميع المتداولين؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ليس بالضرورة. بعض الشركات تناسب المبتدئين أكثر، بينما شركات أخرى تكون أفضل لأصحاب الخبرة أو لمن يبحثون عن أدوات ومنصات أكثر تقدمًا.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكنني فتح حساب حقيقي مباشرة من هذه الصفحة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، عند توفر رابط فتح الحساب الحقيقي للشركة سيظهر زر مخصص لذلك داخل البطاقات، مما يسهل الانتقال مباشرة إلى صفحة التسجيل.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهمية الترخيص عند تقييم شركات التداول؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الترخيص عنصر أساسي لأنه يساعد على قياس مستوى الموثوقية والرقابة على الشركة، ويمنح المتداول درجة أعلى من الطمأنينة والشفافية.",
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
      url: `https://brokeralarab.com/brokers/${broker.slug ?? ""}`,
      name: broker.name ?? "شركة تداول",
    })),
  };

  if (error) {
    return (
      <main dir="rtl" className="mx-auto max-w-[1520px] px-4 py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          حدث خطأ أثناء تحميل صفحة التقييمات.
        </div>
      </main>
    );
  }

  return (
    <>
      <Script
        id="brokers-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="brokers-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main dir="rtl" className="bg-slate-50">
      {/* HERO */}
<section className="relative overflow-hidden border-b border-brand-100 bg-[#eaf3ff]">
  {/* BACKGROUND */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-bl from-[#f5f9ff] via-[#e8f2ff] to-[#cfe3ff]" />

    <div className="absolute right-[-120px] top-[-130px] h-[360px] w-[360px] rounded-full bg-white/70 blur-3xl" />

    <div className="absolute bottom-[-160px] left-[-100px] h-[420px] w-[420px] rounded-full bg-blue-300/25 blur-3xl" />

    <div className="absolute left-1/2 top-[120px] h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-[100px]" />

    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,91,184,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,91,184,0.025)_1px,transparent_1px)] bg-[size:46px_46px]" />
  </div>

  <div className="relative mx-auto w-full max-w-[1520px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-11">
    <div className="mx-auto max-w-[1160px] text-center">
      {/* LABEL */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/90 px-4 py-2 text-[11px] font-extrabold text-brand-700 shadow-sm backdrop-blur sm:text-xs">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-[11px] text-brand-600">
          ✓
        </span>

       تقييمات مستقلة لشركات التداول
      </div>

      {/* TITLE */}
      <h1 className="mt-4 text-[34px] font-black leading-[1.16] tracking-[-0.025em] text-slate-950 sm:text-[48px] sm:leading-[1.12] lg:text-[60px]">
  تقييمات شركات التداول
  <span className="mt-1 block text-[#1E5BB8]">
   لمساعدتك في اختيار الوسيط
  </span>
</h1>

      {/* DESCRIPTION */}
     <p className="mx-auto mt-5 max-w-[900px] text-[15px] font-medium leading-8 text-slate-600 sm:text-[17px] sm:leading-9 lg:text-[18px]">
  تصفح تقييمات شركات التداول، وراجع التراخيص والرسوم والمنصات والحد
  الأدنى للإيداع والحساب الإسلامي قبل اختيار الوسيط وفتح حساب حقيقي.
</p>

      {/* TRUST POINTS */}
      <div className="mx-auto mt-6 grid max-w-[900px] grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
        <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-2.5 text-[13px] font-extrabold text-slate-700 shadow-[0_8px_24px_rgba(30,91,184,0.08)] backdrop-blur">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-[15px] text-emerald-700">
            ✓
          </span>

          مراجعة التراخيص
        </div>

        <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-2.5 text-[13px] font-extrabold text-slate-700 shadow-[0_8px_24px_rgba(30,91,184,0.08)] backdrop-blur">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[15px] font-black text-brand-600">
            $
          </span>

         مراجعة الرسوم والتكاليف
        </div>

        <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-2.5 text-[13px] font-extrabold text-slate-700 shadow-[0_8px_24px_rgba(30,91,184,0.08)] backdrop-blur">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-50 text-[16px] font-black text-violet-600">
            ☪
          </span>

         التحقق من الحساب الإسلامي
        </div>
      </div>

     {/* BUTTONS */}
<div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
  <a
    href="#brokers-grid"
    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#1E5BB8] px-7 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(30,91,184,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a98]"
  >
    تصفح تقييمات الوسطاء
    <span aria-hidden="true">↓</span>
  </a>

  <Link
    href="/compare"
    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-7 py-3 text-sm font-extrabold text-slate-800 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-white hover:text-brand-700"
  >
    الانتقال إلى المقارنات
    <span aria-hidden="true">←</span>
  </Link>
</div>

      {/* NOTICE */}
      <p className="mx-auto mt-4 max-w-[760px] text-[11px] font-medium leading-5 text-slate-500 sm:text-xs">
  راجع شروط الشركة وترخيصها ورسومها وتحذيرات المخاطر قبل فتح الحساب
  أو إيداع الأموال.
</p>
    </div>
  </div>
</section>

{/* CARDS GRID */}
<section
  id="brokers-grid"
  className="mx-auto max-w-[1520px] px-4 pb-10 pt-5 sm:px-6 md:pb-14 md:pt-6 lg:px-8"
>
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