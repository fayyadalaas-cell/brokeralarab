
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

type Guide = {
  id: number;
  broker_id: number | null;
  slug: string;
  title_ar: string | null;
  intro_ar: string | null;
  conclusion_ar: string | null;
  meta_title_ar: string | null;
  meta_description_ar: string | null;
  is_published: boolean;
  last_verified_at: string | null;
  
faq_ar: {
  question: string;
  answer: string;
}[] | null;

faq_en: {
  question: string;
  answer: string;
}[] | null;

};

type Step = {
  id: number;
  step_order: number;
  source_step_number: number | null;
  section_key: string | null;
  title: string | null;
  description: string | null;
  image_path: string | null;
  image_alt: string | null;
  notes: string | null;
  warning: string | null;
};

type Broker = {
  name: string | null;
  logo: string | null;
  rating: number | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

const SITE = "https://brokeralarab.com";
const BUCKET = "broker-guides";

async function getDatabase() {
  // Draft preview is available on the local development server only.
  if (process.env.NODE_ENV === "development") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      return createAdminClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    }
  }

  return createClient();
}

async function getGuide(slug: string): Promise<Guide | null> {
  const db = await getDatabase();

  let query = db
    .from("broker_account_guides_v2")
    .select("*")
    .eq("slug", slug);

  // Public visitors can only access published guides.
  if (process.env.NODE_ENV !== "development") {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error("V2 guide error:", error.message);
    return null;
  }

  return (data as Guide | null) ?? null;
}

function imageUrl(path: string | null) {
  if (!path) return null;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;

  if (
    path.startsWith("/") ||
    path.includes("..") ||
    path.includes("://")
  ) {
    return null;
  }

  const safePath = path
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  return (
    `${base.replace(/\/$/, "")}` +
    `/storage/v1/object/public/${BUCKET}/${safePath}`
  );
}

function safeUrl(value: string | null | undefined) {
  if (!value) return null;

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  try {
    const url = new URL(value);

    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {}

  return null;
}


function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function LinkedGuideText({
  text,
  brokerName,
  registrationUrl,
}: {
  text: string;
  brokerName: string;
  registrationUrl: string | null;
}) {
  if (!registrationUrl) return <>{text}</>;

  // Match natural registration-related phrases
  // without changing the original text stored in Supabase.
  const escapedBroker = escapeRegExp(brokerName);

  const phrases = [
    `صفحة التسجيل الرسمية لشركة\\s+${escapedBroker}`,
    `صفحة التسجيل في شركة\\s+${escapedBroker}`,
    `صفحة التسجيل لدى\\s+${escapedBroker}`,
    `الموقع الرسمي لشركة\\s+${escapedBroker}`,
    `فتح حساب حقيقي لدى\\s+${escapedBroker}`,
    `فتح حساب لدى\\s+${escapedBroker}`,
    `فتح حساب في شركة\\s+${escapedBroker}`,
    `رابط التسجيل في\\s+${escapedBroker}`,
    `رابط فتح الحساب`,
    `رابط التسجيل الرسمي`,
    `صفحة التسجيل الرسمية`,
    `رابط التسجيل`,
  ];

  const matcher = new RegExp(`(${phrases.join("|")})`, "gi");

  const parts = text.split(matcher);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        matcher.lastIndex = 0;
        const isRegistrationPhrase = matcher.test(part);

        if (!isRegistrationPhrase) {
          return (
            <span key={index}>
              {part}
            </span>
          );
        }

        return (
          <a
            key={index}
            href={registrationUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="font-extrabold text-[#1264b0] underline decoration-blue-300 decoration-1 underline-offset-4 transition hover:text-[#083e79] hover:decoration-blue-600"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}


export async function getV2Metadata(slug: string) {
  const guide = await getGuide(slug);

  if (!guide) {
    return {
      title: "الصفحة غير موجودة",
      robots: { index: false, follow: false },
    };
  }

  const title =
    guide.meta_title_ar ||
    guide.title_ar ||
    `فتح حساب ${slug}`;

  const description =
    guide.meta_description_ar ||
    `تعرف على طريقة فتح حساب ${slug} بالصور.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/brokers/${slug}/open-account`,
    },
    robots: {
      index: guide.is_published,
      follow: guide.is_published,
    },
    openGraph: {
      title,
      description,
      url: `${SITE}/brokers/${slug}/open-account`,
      type: "article" as const,
    },
  };
}


type Stage = "register" | "profile" | "verify" | "trading" | "other";

const STAGES: {
  key: Stage;
  name: string;
  short: string;
}[] = [
  {
    key: "register",
    name: "التسجيل وإنشاء الحساب",
    short: "التسجيل",
  },
  {
    key: "profile",
    name: "البيانات الشخصية والخبرة",
    short: "البيانات",
  },
  {
    key: "verify",
    name: "توثيق الهوية والعنوان",
    short: "التوثيق",
  },
  {
    key: "trading",
    name: "إعداد حساب التداول",
    short: "حساب التداول",
  },
  {
    key: "other",
    name: "خطوات إضافية",
    short: "خطوات أخرى",
  },
];

// Each step belongs to a stage defined in Supabase.
// No fixed step numbers, percentages or broker-specific rules.
function getStage(step: Step): Stage {
  const key = (step.section_key || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  const stageAliases: Record<string, Stage> = {
    // Registration
    register: "register",
    registration: "register",
    signup: "register",
    sign_up: "register",
    basics: "register",
    account_creation: "register",

    
    // Personal information, trading experience and financial questionnaires
    profile: "profile",
    personal: "profile",
    personal_info: "profile",
    personal_information: "profile",
    experience: "profile",
    trading_experience: "profile",
    questionnaire: "profile",
    questionnaires: "profile",
    financial_questionnaire: "profile",
    financial_profile: "profile",
    suitability: "profile",
    appropriateness: "profile",


    // Identity and address verification
    verify: "verify",
    verification: "verify",
    identity: "verify",
    kyc: "verify",
    documents: "verify",
    address_verification: "verify",

    // Trading account configuration
    trading: "trading",
    trading_account: "trading",
    account_setup: "trading",
    platform: "trading",
    trading_platform: "trading",
  };

  return stageAliases[key] || "other";
}


 

export default async function NewAccountGuideV2({
  slug,
}: {
  slug: string;
}) {
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const db = await getDatabase();

  const { data: stepsData, error: stepsError } = await db
    .from("broker_account_guide_steps_v2")
    .select(
      "id,step_order,source_step_number,section_key,title,description,image_path,image_alt,notes,warning"
    )
    .eq("guide_id", guide.id)
    .eq("language", "ar")
    .eq("is_active", true)
    .order("step_order", { ascending: true });

  if (stepsError) {
    console.error("V2 steps error:", stepsError.message);
  }

  const steps = (stepsData || []) as Step[];

  if (!steps.length) notFound();

  const { data: brokerData } = await db
    .from("brokers")
    .select("name,logo,rating,real_account_url,demo_account_url")
    .eq("id", guide.broker_id)
    .maybeSingle();

  const broker = (brokerData || null) as Broker | null;

  const brokerName = broker?.name || slug.toUpperCase();
  const brokerLogo = safeUrl(broker?.logo);
  const realUrl = safeUrl(broker?.real_account_url);
  const demoUrl = safeUrl(broker?.demo_account_url);

  const title =
    guide.title_ar || `كيفية فتح حساب في ${brokerName}`;

  const intro =
    guide.intro_ar ||
    `تعرف على خطوات التسجيل وفتح حساب لدى ${brokerName} من خلال هذا الدليل المصور.`;

 
  // Build stages dynamically from Supabase step data.
  // Sort stages by their actual first step, not by a fixed order.
  const groupedStages = STAGES.map((stage) => {
    const stageSteps = steps
      .map((step, index) => ({
        ...step,
        displayNumber: index + 1,
      }))
      .filter((step) => getStage(step) === stage.key);

    return {
      ...stage,
      steps: stageSteps,
      firstStep: stageSteps[0]?.displayNumber ?? Infinity,
      lastStep:
        stageSteps[stageSteps.length - 1]?.displayNumber ?? 0,
    };
  })
    .filter((stage) => stage.steps.length > 0)
    .sort((a, b) => a.firstStep - b.firstStep);


  const getAnchor = (index: number) => `guide-step-${index + 1}`;

  
  // Company-specific FAQs from Supabase
  const faq = Array.isArray(guide.faq_ar)
    ? guide.faq_ar
        .filter(
          (item) =>
            item != null &&
            typeof item.question === "string" &&
            typeof item.answer === "string" &&
            item.question.trim().length > 0 &&
            item.answer.trim().length > 0
        )
        .slice(0, 4)
        .map((item) => ({
          q: item.question,
          a: item.answer,
        }))
    : [];

  const pageUrl = `${SITE}/brokers/${slug}/open-account`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: intro,
    inLanguage: "ar",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title || `الخطوة ${index + 1}`,
      text: step.description || undefined,
      image: imageUrl(step.image_path) || undefined,
      url: `${pageUrl}#${getAnchor(index)}`,
    })),
  };

  const primaryButton =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#1261b2] px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(18,97,178,0.18)] transition hover:bg-[#0c4b8c]";

  const secondaryButton =
    "inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#d2e2f4] bg-white px-6 py-3 text-sm font-bold text-[#15558e] transition hover:border-blue-300 hover:bg-blue-50";

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f8fc] pb-6 text-slate-900"
    >
      {guide.is_published && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}


      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-5 md:px-7 lg:px-8 lg:py-8">

        {/* ===============================
            BREADCRUMBS
        =============================== */}

        <nav
          aria-label="مسار الصفحة"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm"
        >
          <Link href="/" className="hover:text-blue-700">
            الرئيسية
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href="/brokers"
            className="hover:text-blue-700"
          >
            شركات التداول
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href={`/brokers/${slug}`}
            className="hover:text-blue-700"
          >
            {brokerName}
          </Link>

          <span className="text-slate-300">/</span>

          <span className="font-bold text-[#145c9e]">
            فتح حساب
          </span>
        </nav>

        {!guide.is_published && (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-800">
            معاينة محلية — هذا الدليل غير منشور بعد
          </div>
        )}


{/* MOBILE HERO — COMPACT */}
<header className="relative overflow-hidden rounded-[20px] border border-[#d7e5f5] bg-white shadow-sm md:hidden">
  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#0b4687] via-[#1977c4] to-[#82c9ee]" />

  <div className="px-4 pb-4 pt-5">
    <div className="mb-3 flex flex-wrap items-center gap-1.5">
      <span className="rounded-full bg-[#edf5ff] px-2.5 py-1 text-[10px] font-extrabold text-[#145a97]">
        دليل فتح حساب
      </span>
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
        شرح بالصور
      </span>
      <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600">
        {steps.length} خطوة
      </span>
    </div>

    <h1 className="text-[24px] font-black leading-[1.5] tracking-tight text-[#0b3769]">
      {title}
    </h1>

    <p className="mt-2.5 line-clamp-3 text-[12px] leading-[1.9] text-slate-600">
      {intro}
    </p>

    <details className="group mt-1.5">
      <summary className="w-fit cursor-pointer list-none text-[11px] font-extrabold text-[#1463a7] [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">قراءة المزيد +</span>
        <span className="hidden group-open:inline">عرض أقل −</span>
      </summary>
      <p className="mt-2 text-xs leading-7 text-slate-600">
        اتبع الصور والتعليمات بالترتيب، واستخدم بياناتك الحقيقية عند التسجيل والتوثيق.
      </p>
    </details>

    <div className="mt-4 grid grid-cols-2 gap-2">
      <a
        href="#guide-step-1"
        className="col-span-2 flex min-h-[43px] items-center justify-center gap-2 rounded-xl bg-[#1265b1] px-3 py-2 text-[12px] font-black text-white shadow-sm"
      >
        ابدأ شرح فتح الحساب
        <span aria-hidden="true">←</span>
      </a>

      {realUrl && (
        <a
          href={realUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="flex min-h-[40px] items-center justify-center rounded-xl border border-[#cfe1f6] bg-[#f4f9ff] px-2 py-2 text-center text-[11px] font-extrabold text-[#145b98]"
        >
          فتح حساب حقيقي ↗
        </a>
      )}

      <Link
        href={`/brokers/${slug}`}
        className={`flex min-h-[40px] items-center justify-center rounded-xl border border-[#dce7f4] bg-white px-2 py-2 text-center text-[11px] font-bold text-[#175489] ${!realUrl ? "col-span-2" : ""}`}
      >
        تقييم {brokerName}
      </Link>
    </div>

    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e8eff7] pt-3">
      <div className="flex min-w-0 items-center gap-2.5">
        {brokerLogo ? (
          <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white p-1">
            <img
              src={brokerLogo}
              alt={brokerName}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <span className="text-sm font-black text-[#145b98]">
            {brokerName}
          </span>
        )}

        <div className="min-w-0">
          <p className="truncate text-[12px] font-black text-[#113b69]">
            {brokerName}
          </p>
          <p className="text-[10px] text-slate-500">
            دليل عربي مصور
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-[11px] font-extrabold">
        {broker?.rating != null && (
          <span className="text-amber-700">
            ★ {broker.rating}
          </span>
        )}
        <span className="rounded-lg bg-[#edf5ff] px-2.5 py-1.5 text-[#145b98]">
          {steps.length} خطوة
        </span>
      </div>
    </div>
  </div>
</header>


        {/* ===============================
            NEW PREMIUM HERO
        =============================== */}

        
<header className="relative isolate hidden overflow-hidden rounded-[24px] border border-[#d8e4f2] bg-white shadow-[0_16px_55px_rgba(15,55,105,0.06)] md:block md:rounded-[30px]">


          <div className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-l from-[#0a3771] via-[#1475c6] to-[#75c8e9]" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-20 h-[300px] w-[300px] rounded-full bg-sky-100/60 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-0 h-[250px] w-[250px] rounded-full bg-blue-50 blur-3xl"
          />

          <div className="relative p-5 sm:p-8 lg:p-10 xl:p-12">

            {/* EYEBROW */}

            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d6e9ff] bg-[#eff7ff] px-4 py-2 text-xs font-black text-[#15568e]">
                دليل فتح حساب تداول
              </span>

              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">
                شرح عملي بالصور
              </span>

              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
                {steps.length} خطوة
              </span>
            </div>

            {/* TITLE */}

            <div className="max-w-[1160px]">
              <h1 className="text-[29px] font-black leading-[1.55] tracking-tight text-[#092f5c] sm:text-[37px] sm:leading-[1.4] lg:text-[46px] xl:text-[51px]">
                {title}
              </h1>

              <p className="mt-5 max-w-[1000px] text-[15px] leading-8 text-slate-600 sm:text-[17px] sm:leading-9">
                {intro}
              </p>
            </div>

            {/* ACTION BUTTONS */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

              <a
                href="#guide-step-1"
                className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl bg-[#1264b0] px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(18,100,176,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0d4f90]"
              >
                ابدأ شرح فتح الحساب
                <span aria-hidden="true">←</span>
              </a>

              {realUrl && (
                <a
                  href={realUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-[#cbdff5] bg-white px-7 py-3.5 text-sm font-extrabold text-[#15578f] transition hover:border-blue-300 hover:bg-blue-50"
                >
                  فتح حساب حقيقي لدى {brokerName} ↗
                </a>
              )}

              <Link
                href={`/brokers/${slug}`}
                className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:text-blue-800"
              >
                تقييم شركة {brokerName}
              </Link>
            </div>

            {/* BROKER INFORMATION STRIP */}

            <div className="mt-9 grid gap-3 border-t border-[#e5edf6] pt-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">

              {/* BROKER */}

              <div className="flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#dfebf8] bg-[#f9fbff] p-4">

                {brokerLogo ? (
                  <div className="flex h-[67px] w-[86px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-2.5">
                    <img
                      src={brokerLogo}
                      alt={brokerName}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-[67px] w-[86px] shrink-0 items-center justify-center rounded-xl bg-white text-xl font-black text-[#145b9a]">
                    {brokerName.slice(0, 2).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-500">
                    شركة الوساطة
                  </p>

                  <p className="mt-1 truncate text-xl font-black text-[#0d3b69]">
                    {brokerName}
                  </p>

                  {broker?.rating != null && (
                    <p className="mt-1 text-xs font-bold text-amber-700">
                      ★ {broker.rating}
                    </p>
                  )}
                </div>
              </div>

              {/* STEPS */}

              <div className="flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#dfebf8] bg-[#f9fbff] p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#e8f2ff] text-2xl font-black text-[#155e9f]">
                  {steps.length}
                </div>

                <div>
                  <p className="text-sm font-black text-[#153f6b]">
                    خطوة مصورة
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    من التسجيل حتى إعداد الحساب
                  </p>
                </div>
              </div>

              {/* LANGUAGE */}

              <div className="flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#dfebf8] bg-[#f9fbff] p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eaf8f3] text-xl font-black text-emerald-700">
                  AR
                </div>

                <div>
                  <p className="text-sm font-black text-[#153f6b]">
                    الشرح باللغة العربية
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    صور وتعليمات لكل خطوة
                  </p>
                </div>
              </div>

              {/* REVIEW DATE */}

              <div className="flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#dfebf8] bg-[#f9fbff] p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] text-lg font-black text-[#3857a1]">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-black text-[#153f6b]">
                    آخر مراجعة
                  </p>

                  {guide.last_verified_at ? (
                    <time
                      dateTime={guide.last_verified_at}
                      className="mt-1 block text-sm font-bold text-slate-600"
                    >
                      {new Date(
                        guide.last_verified_at
                      ).toLocaleDateString("ar", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </time>
                  ) : (
                    <p className="mt-1 text-xs text-slate-500">
                      لم يُحدد تاريخ مراجعة
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </header>

        
{/* ===============================
    BEFORE YOU START — RESPONSIVE
=============================== */}

{/* MOBILE VERSION */}
<section className="mt-3 rounded-[18px] border border-[#dce7f4] bg-white p-3.5 shadow-sm md:hidden">
  <h2 className="text-[16px] font-black text-[#103b69]">
    قبل أن تبدأ فتح الحساب
  </h2>

  <p className="mt-1.5 text-[11px] leading-6 text-slate-600">
    جهّز بيانات التواصل ووثائقك، وتأكد من إدخال معلوماتك الحقيقية.
  </p>

  <div className="mt-3 grid grid-cols-2 gap-2">
    {[
      "بريد إلكتروني فعال",
      "رقم هاتف صحيح",
      "إثبات هوية ساري",
      "إثبات عنوان عند الطلب",
    ].map((item) => (
      <div
        key={item}
        className="flex min-h-[42px] items-center gap-2 rounded-lg border border-[#e3edf7] bg-[#f8fbff] px-2.5 py-2"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-700">
          ✓
        </span>

        <span className="text-[11px] font-bold leading-5 text-slate-700">
          {item}
        </span>
      </div>
    ))}
  </div>
</section>

{/* TABLET & DESKTOP VERSION — UNCHANGED */}
<section className="mt-6 hidden rounded-[24px] border border-[#dce7f4] bg-white p-5 shadow-sm md:block md:p-7 lg:p-8">
  <div className="flex items-start gap-4">
    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ecf5ff] text-xl text-[#1264b0] sm:flex">
      ✓
    </div>

    <div className="min-w-0 flex-1">
      <h2 className="text-xl font-black text-[#103b69] sm:text-[25px]">
        قبل أن تبدأ فتح الحساب
      </h2>

      <p className="mt-3 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base">
        جهّز بريدك الإلكتروني ورقم هاتفك ووثائق
        التحقق المطلوبة، وتأكد من إدخال بياناتك
        الحقيقية. قد تختلف خطوات التسجيل أو
        المستندات المقبولة بحسب بلد الإقامة
        ومتطلبات شركة الوساطة.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          "بريد إلكتروني فعال",
          "رقم هاتف صحيح",
          "إثبات هوية ساري",
          "إثبات عنوان عند الطلب",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-xl border border-[#e1eaf5] bg-[#f9fbfe] px-4 py-3 text-sm font-bold text-slate-700"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
              ✓
            </span>

            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


        

{/* ===============================
    GUIDE NAVIGATION — RESPONSIVE
=============================== */}

<section
  id="guide-contents"
  className="mt-3 w-full scroll-mt-24 rounded-[18px] border border-[#dce7f4] bg-white p-3.5 shadow-sm sm:p-6 md:mt-7 md:rounded-[26px] lg:p-8"
>
  {/* SECTION HEADER */}

  <div className="flex items-start justify-between gap-3">
    <div className="min-w-0">
      <p className="mb-1 hidden text-xs font-extrabold text-[#1562a4] md:block">
        دليل خطوة بخطوة
      </p>

      <h2 className="text-[17px] font-black leading-7 text-[#0b3563] sm:text-[24px] lg:text-[30px]">
        مراحل فتح الحساب في {brokerName}
      </h2>

      <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:mt-2 sm:text-sm">
        اختر المرحلة المطلوبة، أو تابع الخطوات بالترتيب.
      </p>
    </div>

    <span className="shrink-0 rounded-full bg-[#eff6ff] px-3 py-1.5 text-[10px] font-extrabold text-[#145a96] sm:px-4 sm:py-2 sm:text-xs">
      {steps.length} خطوة
    </span>
  </div>

  {/* DYNAMIC STAGE GRID */}

  <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:mt-6 md:grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
    {groupedStages.map((stage, index) => {
      const first = stage.firstStep;
      const last = stage.lastStep;

      const isLastOddCard =
        groupedStages.length % 2 === 1 &&
        index === groupedStages.length - 1;

      return (
        <a
          key={stage.key}
          href={`#guide-step-${first}`}
          className={`group flex min-h-[104px] min-w-0 flex-col justify-between rounded-[14px] border border-[#dce8f6] bg-[#f8fbff] p-3 transition hover:border-[#91c1ec] hover:bg-[#eff7ff] hover:shadow-sm sm:min-h-[142px] sm:rounded-[18px] sm:p-4 lg:p-5 ${
            isLastOddCard
              ? "col-span-2 md:col-span-1"
              : ""
          }`}
        >
          {/* NUMBER AND COUNT */}

          <div className="flex items-center justify-between gap-2">
            <span className="text-[21px] font-black leading-none text-[#b5d0eb] sm:text-[30px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-[#1564a7] sm:px-3 sm:py-1.5 sm:text-xs">
              {stage.steps.length} خطوات
            </span>
          </div>

          {/* STAGE DETAILS */}

          <div className="mt-3">
            <h3 className="text-[12px] font-black leading-[1.6] text-[#103e6d] sm:text-[15px]">
              {stage.name}
            </h3>

            <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-xs">
              {first === last
                ? `الخطوة ${first}`
                : `من الخطوة ${first} إلى ${last}`}
            </p>

            <span className="mt-2 hidden text-xs font-extrabold text-[#1767ad] sm:inline-block">
              الانتقال إلى المرحلة ←
            </span>
          </div>
        </a>
      );
    })}
  </div>

  {/* COMPLETE STEP INDEX */}

  <details className="group mt-4 overflow-hidden rounded-xl border border-[#dce7f4] bg-[#f8fbff] sm:mt-6 sm:rounded-[18px]">
    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-3 text-[11px] font-extrabold text-[#164e84] sm:px-5 sm:text-sm [&::-webkit-details-marker]:hidden">
      <span>
        عرض الفهرس الكامل ({steps.length} خطوة)
      </span>

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-base transition group-open:rotate-180">
        ⌄
      </span>
    </summary>

    <div className="max-h-[360px] overflow-y-auto border-t border-[#e0eaf5] bg-white p-2 sm:max-h-none sm:p-5">
      <div className="grid gap-1 sm:gap-2 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <a
            key={step.id}
            href={`#guide-step-${index + 1}`}
            className="flex items-start gap-2 rounded-lg px-2.5 py-2 text-[11px] leading-5 text-slate-600 transition hover:bg-blue-50 hover:text-[#155f9f] sm:gap-3 sm:rounded-xl sm:px-3 sm:py-3 sm:text-sm sm:leading-6"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#edf5ff] text-[10px] font-black text-[#1462a5] sm:h-7 sm:w-7 sm:rounded-lg sm:text-xs">
              {index + 1}
            </span>

            <span className="font-semibold">
              {step.title || `الخطوة ${index + 1}`}
            </span>
          </a>
        ))}
      </div>
    </div>
  </details>
</section>



        {/* ===============================
            GUIDE STEPS — FULL WIDTH
        =============================== */}

        
<section
  id="guide-steps"
  aria-label="شرح فتح حساب التداول بالصور"
  className="mt-9 w-full min-w-0 space-y-7 sm:space-y-9"
>

          {steps.map((step, index) => {
            const screenshot = imageUrl(step.image_path);
            const stage = getStage(step);

            const previousStage =
              index > 0
                ? getStage(steps[index - 1])
                : null;

            const stageName =
              STAGES.find((item) => item.key === stage)?.name ||
              "خطوات فتح الحساب";

            return (
              <div key={step.id}>

                {/* STAGE DIVIDER */}

                {stage !== previousStage && (
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-[5px] rounded-full bg-[#1569b4]" />

                      <div>
                        <p className="mb-1 text-xs font-extrabold text-[#317bb6]">
                          مرحلة من مراحل فتح الحساب
                        </p>

                        <h2 className="text-[22px] font-black text-[#103b6b] sm:text-[28px]">
                          {stageName}
                        </h2>
                      </div>
                    </div>

                    <a
                      href="#guide-contents"
                      className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-[#1566a7] hover:bg-blue-50"
                    >
                      العودة إلى الفهرس ↑
                    </a>
                  </div>
                )}

                {/* STEP CARD */}

                <article
                  id={getAnchor(index)}
                  className="scroll-mt-24 overflow-hidden rounded-[24px] border border-[#d8e5f3] bg-white shadow-[0_10px_35px_rgba(15,54,105,0.05)] sm:rounded-[28px]"
                >

                  {/* STEP TOP */}

                  <div className="border-b border-[#edf1f7] p-3.5 sm:p-7 lg:px-9 lg:py-8">

                    <div className="mb-4 flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center rounded-lg bg-[#1263ae] px-4 py-2 text-xs font-black text-white">
                        الخطوة {index + 1}
                      </span>

                      <span className="rounded-lg bg-[#eef4fb] px-3 py-2 text-xs font-bold text-[#436987]">
                        {index + 1} من {steps.length}
                      </span>

                      <span className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs font-semibold text-slate-500">
                        {stageName}
                      </span>
                    </div>

                    <h3 className="text-[19px] font-black leading-[1.55] text-[#0d3562] sm:text-[30px] lg:text-[34px]">
  {step.title || `الخطوة ${index + 1}`}
</h3>

                    
{step.description && (
  <p className="mt-2.5 max-w-[1100px] whitespace-pre-line text-[13px] leading-[1.9] text-slate-600 sm:mt-4 sm:text-[17px] sm:leading-[2]">
    <LinkedGuideText
      text={step.description}
      brokerName={brokerName}
      registrationUrl={realUrl}
    />
  </p>
)}

                  </div>

                  
                  {/* ===============================
                      SCREENSHOT — RESPONSIVE
                  =============================== */}

                  {screenshot && (
                    <figure className="p-2 pb-3 sm:p-6 lg:p-8">
                      <a
                        href={screenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`عرض صورة الخطوة ${index + 1} بالحجم الكامل`}
                        className="group block overflow-hidden rounded-[12px] border border-[#bad9f8] bg-[#f8fbff] transition hover:border-[#6ba9e4] hover:shadow-[0_12px_32px_rgba(18,87,153,0.1)] sm:rounded-[15px]"
                      >
                        <img
                          src={screenshot}
                          alt={
                            step.image_alt ||
                            step.title ||
                            `صورة الخطوة ${index + 1}`
                          }
                          width={1600}
                          height={1000}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="block h-auto w-full object-contain"
                        />
                      </a>

                      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] font-semibold text-slate-500 sm:mt-4 sm:px-0 sm:text-xs">
                        <span>
                          صورة الخطوة {index + 1}
                        </span>

                        <a
                          href={screenshot}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-extrabold text-[#1663a5] hover:underline"
                        >
                          تكبير الصورة ↗
                        </a>
                      </figcaption>
                    </figure>
                  )}

                  {/* ===============================
                      NOTES AND WARNINGS
                      MOBILE: COLLAPSIBLE
                      TABLET/DESKTOP: ORIGINAL CARDS
                  =============================== */}

                  {(step.notes || step.warning) && (
                    <>
                      {/* MOBILE ONLY */}

                      <div className="space-y-2 px-2 pb-3 pt-1 sm:px-3 md:hidden">
                        {step.notes && (
                          <details className="group overflow-hidden rounded-xl border border-amber-200 bg-amber-50/80">
                            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
                              <span className="flex items-center gap-2 text-[12px] font-black text-amber-900">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px]">
                                  i
                                </span>
                                ملاحظات مهمة
                              </span>

                              <span
                                aria-hidden="true"
                                className="text-sm text-amber-700 transition group-open:rotate-180"
                              >
                                ⌄
                              </span>
                            </summary>

                            <p className="whitespace-pre-line border-t border-amber-200/70 px-3 py-3 text-[12px] leading-6 text-slate-700">
                              {step.notes}
                            </p>
                          </details>
                        )}

                        {step.warning && (
                          <details className="group overflow-hidden rounded-xl border border-rose-200 bg-rose-50/80">
                            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
                              <span className="flex items-center gap-2 text-[12px] font-black text-rose-900">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px]">
                                  !
                                </span>
                                تنبيه مهم
                              </span>

                              <span
                                aria-hidden="true"
                                className="text-sm text-rose-700 transition group-open:rotate-180"
                              >
                                ⌄
                              </span>
                            </summary>

                            <p className="whitespace-pre-line border-t border-rose-200/70 px-3 py-3 text-[12px] leading-6 text-slate-700">
                              {step.warning}
                            </p>
                          </details>
                        )}
                      </div>

                      {/* TABLET & DESKTOP — ORIGINAL DESIGN */}

                      <div className="hidden gap-3 px-4 pb-6 sm:px-6 md:grid md:grid-cols-2 lg:px-8">
                        {step.notes && (
                          <div className="rounded-[18px] border border-amber-200 bg-amber-50/80 p-5">
                            <h4 className="mb-3 flex items-center gap-2 text-base font-black text-amber-900">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm">
                                i
                              </span>
                              ملاحظات مهمة
                            </h4>

                            <p className="whitespace-pre-line text-sm leading-8 text-slate-700 sm:text-[15px]">
                              {step.notes}
                            </p>
                          </div>
                        )}

                        {step.warning && (
                          <div className="rounded-[18px] border border-rose-200 bg-rose-50/80 p-5">
                            <h4 className="mb-3 flex items-center gap-2 text-base font-black text-rose-900">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-sm">
                                !
                              </span>
                              تنبيه مهم
                            </h4>

                            <p className="whitespace-pre-line text-sm leading-8 text-slate-700 sm:text-[15px]">
                              {step.warning}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* ===============================
                      STEP NAVIGATION — RESPONSIVE
                  =============================== */}

                  <nav
                    aria-label="التنقل بين خطوات الدليل"
                    className="flex items-center justify-between gap-2 border-t border-[#e8eff7] bg-[#fafcff] px-3 py-3 sm:gap-3 sm:px-7 sm:py-5"
                  >
                    {index > 0 ? (
                      <a
                        href={`#guide-step-${index}`}
                        className="inline-flex min-h-[38px] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-800 sm:min-h-[44px] sm:rounded-xl sm:px-6 sm:py-2.5 sm:text-sm"
                      >
                        → الخطوة السابقة
                      </a>
                    ) : (
                      <span />
                    )}

                    <span className="hidden text-xs font-bold text-slate-400 sm:block">
                      {index + 1} / {steps.length}
                    </span>

                    {index < steps.length - 1 ? (
                      <a
                        href={`#guide-step-${index + 2}`}
                        className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-[#eaf4ff] px-3 py-2 text-[11px] font-extrabold text-[#135d9e] transition hover:bg-[#d9ecff] sm:min-h-[44px] sm:rounded-xl sm:px-6 sm:py-2.5 sm:text-sm"
                      >
                        الخطوة التالية ←
                      </a>
                    ) : (
                      <a
                        href="#guide-end"
                        className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-[#1264b0] px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-[#0d4f90] sm:min-h-[44px] sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
                      >
                        إنهاء الدليل ←
                      </a>
                    )}
                  </nav>

                </article>
              </div>
            );
          })}
        </section>


        
        {/* ===============================
            PREMIUM FINAL CTA
        =============================== */}

        <section
          id="guide-end"
          className="relative mt-10 w-full scroll-mt-24 overflow-hidden rounded-[28px] border border-[#c9ddf4] bg-gradient-to-l from-[#eaf4ff] via-[#f5f9ff] to-white shadow-[0_12px_35px_rgba(15,65,120,0.06)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl"
          />

          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center lg:p-10 xl:gap-12 xl:p-12">

            {/* MAIN CTA CONTENT */}

            <div className="min-w-0">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700">
                <span className="text-base">✓</span>
                اكتملت جميع خطوات الدليل
              </div>

              <h2 className="max-w-[950px] text-[27px] font-black leading-[1.5] text-[#0b3563] sm:text-[36px] lg:text-[40px]">
                أكملت شرح فتح حساب {brokerName}.
                ما الخطوة التالية؟
              </h2>

              <p className="mt-5 max-w-[850px] text-[15px] leading-9 text-slate-600 sm:text-[17px]">
                بعد التعرف على خطوات التسجيل والتوثيق وإعداد
                حساب التداول، يمكنك الانتقال إلى صفحة التسجيل
                الخاصة بالشركة، أو مراجعة تقييم الوسيط ومقارنة
                شروط التداول قبل اتخاذ قرارك.
              </p>

              {guide.conclusion_ar && (
                <p className="mt-3 max-w-[850px] text-sm leading-8 text-slate-600 sm:text-base">
                  {guide.conclusion_ar}
                </p>
              )}

              {/* MAIN ACTIONS */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                {realUrl && (
                  <a
                    href={realUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#1263af] px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(18,99,175,0.17)] transition hover:-translate-y-0.5 hover:bg-[#0c4d8e]"
                  >
                    فتح حساب حقيقي لدى {brokerName}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#c8ddf4] bg-white px-6 py-3.5 text-sm font-extrabold text-[#155b99] transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    فتح حساب تجريبي
                  </a>
                )}

                <Link
                  href={`/brokers/${slug}`}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#c8ddf4] bg-white px-6 py-3.5 text-sm font-extrabold text-[#155b99] transition hover:border-blue-300 hover:bg-blue-50"
                >
                  قراءة تقييم {brokerName}
                </Link>
              </div>
            </div>

            {/* FINISH CARD */}

            <aside className="rounded-[24px] border border-[#d7e5f5] bg-white/95 p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf6ff] text-2xl font-black text-[#1464aa]">
                  ✓
                </div>

                <div>
                  <p className="text-base font-black text-[#103e6d]">
                    انتهيت من الدليل
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    ملخص خطوات فتح الحساب
                  </p>
                </div>
              </div>

              <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#e8f0f9]">
                <div className="h-full w-full rounded-full bg-[#1474c4]" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-sm">
                <span className="text-slate-500">
                  عدد الخطوات المشروحة
                </span>

                <span className="font-black text-[#135f9f]">
                  {steps.length} خطوة
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-4 text-sm">
                <span className="text-slate-500">
                  لغة الشرح
                </span>

                <span className="font-black text-slate-800">
                  العربية
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 text-sm">
                <span className="text-slate-500">
                  شركة الوساطة
                </span>

                <span className="font-black text-[#135f9f]">
                  {brokerName}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-[#f2f7fd] p-4 text-xs leading-7 text-slate-600">
                <strong className="mb-1 block text-[#114e86]">
                  قبل الإيداع
                </strong>
                راجع الرسوم وشروط السحب ومتطلبات التحقق
                وإفصاحات المخاطر الخاصة بالشركة.
              </div>
            </aside>
          </div>
        </section>

        {/* ===============================
            PREMIUM FAQ
        =============================== */}

        <section className="mt-8 w-full rounded-[28px] border border-[#dce7f4] bg-white p-5 shadow-[0_10px_30px_rgba(15,54,105,0.04)] sm:p-8 lg:p-10 xl:p-12">

          {/* FAQ HEADER */}

          <div className="mb-7 flex flex-col gap-4 border-b border-[#e8eff7] pb-7 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <span className="mb-3 inline-block rounded-full bg-[#edf6ff] px-4 py-2 text-xs font-black text-[#1464a9]">
                الأسئلة الأكثر شيوعاً
              </span>

              <h2 className="text-[26px] font-black leading-[1.5] text-[#0b3563] sm:text-[34px]">
                أسئلة شائعة حول فتح حساب {brokerName}
              </h2>

              <p className="mt-3 max-w-[850px] text-[15px] leading-8 text-slate-600">
                إجابات على أبرز الاستفسارات المتعلقة بالتسجيل
                والتوثيق والوثائق المطلوبة لفتح الحساب.
              </p>
            </div>

            <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[#dfebf8] bg-[#f8fbff] px-4 py-3 text-xs font-extrabold text-[#155f9f]">
              {faq.length} أسئلة وإجابات
            </div>
          </div>

          {/* FAQ LIST */}

          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">

            {faq.map((item, index) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[18px] border border-[#dfe9f5] bg-[#fbfdff] transition hover:border-[#b4d4f3] open:border-[#aed1f1] open:bg-white open:shadow-sm"
              >
                <summary className="flex min-h-[80px] cursor-pointer list-none items-center justify-between gap-4 p-5 text-right [&::-webkit-details-marker]:hidden">

                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf4ff] text-xs font-black text-[#1365a9]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="pt-1 text-sm font-black leading-7 text-[#123d6b] sm:text-[16px]">
                      {item.q}
                    </h3>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8e8f7] bg-white text-xl text-[#1463a4] transition group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <div className="border-t border-[#e9eff7] px-5 py-5 sm:px-6">
                  <p className="text-sm leading-8 text-slate-600 sm:text-[15px]">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* FAQ FOOTER */}

          <div className="mt-7 flex flex-col gap-4 rounded-[18px] border border-[#dfebf8] bg-[#f3f8fe] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

            <div>
              <h3 className="text-base font-black text-[#123e6b]">
                تريد معرفة المزيد عن {brokerName}؟
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                اطلع على التقييم الكامل للشركة، بما في ذلك
                التراخيص والرسوم وأنواع الحسابات.
              </p>
            </div>

            <Link
              href={`/brokers/${slug}`}
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-xl border border-[#c5ddf5] bg-white px-6 py-3 text-sm font-extrabold text-[#145c99] transition hover:border-blue-300 hover:bg-blue-50"
            >
              عرض تقييم {brokerName} ←
            </Link>
          </div>
        </section>

        {/* ===============================
            BOTTOM GUIDE NAVIGATION
        =============================== */}

        <nav
          aria-label="روابط إضافية"
          className="mt-7 grid w-full gap-3 sm:grid-cols-3"
        >
          <a
            href="#guide-contents"
            className="flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] border border-[#dce7f4] bg-white px-5 py-4 text-sm font-extrabold text-[#145b98] transition hover:border-blue-300 hover:bg-blue-50"
          >
            <span>العودة إلى فهرس الدليل</span>
            <span aria-hidden="true">↑</span>
          </a>

          <Link
            href={`/brokers/${slug}`}
            className="flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] border border-[#dce7f4] bg-white px-5 py-4 text-sm font-extrabold text-[#145b98] transition hover:border-blue-300 hover:bg-blue-50"
          >
            <span>تقييم شركة {brokerName}</span>
            <span aria-hidden="true">←</span>
          </Link>

          <Link
            href="/best-brokers"
            className="flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] border border-[#dce7f4] bg-white px-5 py-4 text-sm font-extrabold text-[#145b98] transition hover:border-blue-300 hover:bg-blue-50"
          >
            <span>أفضل شركات التداول</span>
            <span aria-hidden="true">←</span>
          </Link>
        </nav>

        {/* ===============================
            RISK DISCLAIMER
        =============================== */}

        <section
          aria-label="تنبيه المخاطر"
          className="mt-7 w-full rounded-[20px] border border-[#e0e7ef] bg-white px-5 py-6 sm:px-8 sm:py-7"
        >
          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg font-black text-amber-700">
              !
            </div>

            <div>
              <h2 className="mb-2 text-sm font-black text-slate-800">
                تنبيه المخاطر وإخلاء المسؤولية
              </h2>

              <p className="max-w-[1250px] text-xs leading-8 text-slate-500 sm:text-sm">
                تداول المنتجات المالية ذات الرافعة المالية
                ينطوي على مخاطر مرتفعة وقد يؤدي إلى خسارة
                رأس المال. المعلومات والصور الواردة في هذا
                الدليل لأغراض تعليمية وتوضيحية فقط، ولا
                تمثل توصية استثمارية أو ضماناً لقبول طلب
                فتح الحساب. قد تختلف إجراءات التسجيل
                والتحقق والوثائق المطلوبة بحسب بلد الإقامة
                وسياسات الوسيط. يرجى مراجعة الشروط
                وإفصاحات المخاطر قبل التسجيل أو الإيداع.
              </p>
            </div>

          </div>
        </section>


      </div>
    </main>
  );
}
