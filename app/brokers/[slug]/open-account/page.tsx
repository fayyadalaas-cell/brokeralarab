import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function lines(text?: string | null) {
  return text ? text.split("\n").filter(Boolean) : [];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: guide } = await supabase
    .from("broker_open_account_guides")
    .select("title_ar, meta_title_ar, meta_description_ar")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  return {
    title: guide?.meta_title_ar || guide?.title_ar || "شرح فتح حساب تداول",
    description:
      guide?.meta_description_ar ||
      "شرح فتح حساب تداول خطوة بخطوة بالصور للمتداولين العرب.",
    alternates: {
      canonical: `https://brokeralarab.com/brokers/${slug}/open-account`,
    },
  };
}

export default async function OpenAccountGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: guideData } = await supabase
    .from("broker_open_account_guides")
    .select(`
      id,
      broker_id,
      slug,
      title_ar,
      intro_ar,
      conclusion_ar,
      difficulty_ar,
      estimated_time_ar,
      brokers (
        name,
        logo,
        rating,
        real_account_url,
        demo_account_url
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!guideData) notFound();

  const guide = guideData as any;
  const brokerName = guide.brokers?.name || "الشركة";
  const brokerLogo = guide.brokers?.logo || null;
  const rating = guide.brokers?.rating || null;
  const realAccountUrl = guide.brokers?.real_account_url || null;
  const demoAccountUrl = guide.brokers?.demo_account_url || null;

  const { data: stepsData } = await supabase
    .from("broker_open_account_steps")
    .select(`
      id,
      step_order,
      title_ar,
      description_ar,
      notes_ar,
      warning_ar,
      image_url,
      image_alt_ar,
      step_time_ar,
      difficulty_ar
    `)
    .eq("guide_id", guide.id)
    .order("step_order", { ascending: true });

  const steps = (stepsData || []) as any[];
  if (!steps.length) notFound();

  const { data: comparisonsData } = await supabase
    .from("comparisons")
    .select(`
      id,
      slug,
      title,
      broker_1:broker_1_id (
        name,
        logo
      ),
      broker_2:broker_2_id (
        name,
        logo
      )
    `)
    .or(`broker_1_id.eq.${guide.broker_id},broker_2_id.eq.${guide.broker_id}`)
    .not("slug", "is", null)
    .not("title", "is", null)
    .limit(6);

  const comparisons = (comparisonsData || []) as any[];

  const preferredComparisons = comparisons.sort((a, b) => {
    const priority = [
      "xm",
      "xs",
      "pepperstone",
      "tickmill",
      "equiti",
      "activtrades",
      "multibank",
      "avatrade",
    ];

    const getScore = (item: any) => {
      const title = (item.title || "").toLowerCase();
      const index = priority.findIndex((p) => title.includes(p));
      return index === -1 ? 999 : index;
    };

    return getScore(a) - getScore(b);
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `هل يمكن فتح حساب ${brokerName} من الجوال؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `نعم، يمكن فتح حساب ${brokerName} من الجوال أو الكمبيوتر، لكن يفضل استخدام متصفح حديث ورفع صور واضحة للوثائق عند التحقق من الحساب.`,
        },
      },
      {
        "@type": "Question",
        name: `ما الوثائق المطلوبة لتفعيل حساب ${brokerName}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "عادة تحتاج إلى إثبات هوية مثل جواز السفر أو الهوية الوطنية، وإثبات عنوان مثل كشف حساب بنكي أو فاتورة خدمات حديثة.",
        },
      },
    ],
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:px-6 md:py-8 lg:px-8">
        {/* HERO */}
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] md:rounded-[32px] md:shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
          <div className="grid gap-5 p-5 md:grid-cols-[1fr_300px] md:gap-8 md:p-10">
            <div>
              <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                <Link
                  href={`/brokers/${slug}`}
                  className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[12px] font-extrabold text-brand-600 md:px-4 md:py-2 md:text-sm"
                >
                  تقييم {brokerName}
                </Link>

                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-extrabold text-emerald-700 md:px-4 md:py-2 md:text-sm">
                  شرح بالصور
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-extrabold text-slate-700 md:px-4 md:py-2 md:text-sm">
                  {steps.length} خطوات
                </span>
              </div>

              <h1 className="text-center text-[30px] font-black leading-[1.65] text-slate-950 md:text-right md:text-5xl md:leading-tight">
                {guide.title_ar}
              </h1>

            <div className="md:hidden">
  <details className="group">
    <summary className="cursor-pointer list-none">
      <div className="relative mx-auto mt-4 max-h-[128px] max-w-3xl overflow-hidden text-center text-[15px] leading-8 text-slate-600 group-open:max-h-none">
        <p>{guide.intro_ar}</p>

        <p className="mt-3">
          يشرح هذا الدليل طريقة فتح حساب حقيقي في {brokerName} بداية من
          التسجيل وتأكيد البريد والهاتف، مروراً باستكمال الملف الشخصي
          ورفع الوثائق، وصولاً إلى اختيار طريقة الإيداع وتحميل منصة التداول المناسبة.
        </p>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent group-open:hidden" />
      </div>

      <div className="mt-3 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-black text-brand-600">
        <span className="group-open:hidden">عرض المزيد</span>
        <span className="hidden group-open:inline">عرض أقل</span>
      </div>
    </summary>
  </details>
</div>

<div className="hidden md:block">
  <p className="mx-auto mt-5 max-w-4xl text-right text-lg leading-9 text-slate-600 md:mx-0">
    {guide.intro_ar}
  </p>

  <p className="mx-auto mt-3 max-w-4xl text-right text-base leading-8 text-slate-600 md:mx-0">
    يشرح هذا الدليل طريقة فتح حساب حقيقي في {brokerName} بداية من
    التسجيل وتأكيد البريد والهاتف، مروراً باستكمال الملف الشخصي
    ورفع الوثائق، وصولاً إلى اختيار طريقة الإيداع وتحميل منصة
    التداول المناسبة.
  </p>
</div>

              <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap md:mt-6 md:gap-3">
                {realAccountUrl && (
                  <a
                    href={realAccountUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-brand-600"
                  >
                    فتح حساب حقيقي
                  </a>
                )}

                {demoAccountUrl && (
                  <a
                    href={demoAccountUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 py-3 text-sm font-black text-brand-600 transition hover:bg-brand-50"
                  >
                    فتح حساب تجريبي
                  </a>
                )}
              </div>
            </div>

            <aside className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 md:rounded-[28px] md:p-5">
              <div className="flex items-center justify-center gap-4 md:justify-start">
                {brokerLogo && (
                  <div className="flex h-[72px] w-24 items-center justify-center rounded-2xl bg-white p-3 shadow-sm md:h-20">
                    <Image
                      src={brokerLogo}
                      alt={brokerName}
                      width={110}
                      height={60}
                      className="max-h-14 w-auto object-contain"
                    />
                  </div>
                )}

                <div>
                  <div className="text-sm font-bold text-slate-500">
                    دليل فتح حساب
                  </div>
                  <div className="text-2xl font-black text-slate-950">
                    {brokerName}
                  </div>
                  {rating && (
                    <div className="mt-1 text-sm font-extrabold text-amber-600">
                      التقييم: {rating}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-1">
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm md:text-right">
                  <div className="text-xs font-bold text-slate-500 md:text-sm">
                    الوقت المتوقع
                  </div>
                  <div className="mt-1 text-lg font-black text-brand-600 md:text-xl">
                    {guide.estimated_time_ar || "10 دقائق"}
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 text-center shadow-sm md:text-right">
                  <div className="text-xs font-bold text-slate-500 md:text-sm">
                    مستوى الصعوبة
                  </div>
                  <div className="mt-1 text-lg font-black text-emerald-700 md:text-xl">
                    {guide.difficulty_ar || "سهل"}
                  </div>
                </div>

                <Link
                  href={`/brokers/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-center transition hover:border-blue-400 hover:bg-blue-100 md:col-span-1"
                >
                  <div className="text-sm font-bold text-slate-500">
                    تقييم {brokerName}
                  </div>

                  <div className="mt-2 text-2xl font-black text-brand-600">
                    ⭐ {rating || "4.5"}
                  </div>

                  <div className="mt-2 text-xs text-slate-600">
                    اقرأ المراجعة الكاملة والمميزات والعيوب
                  </div>

                  <div className="mt-3 text-sm font-black text-brand-600">
                    عرض التقييم →
                  </div>
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* CONTENT TABLE */}
        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[32px] md:p-8">
          <h2 className="text-center text-[24px] font-black leading-tight text-slate-950 md:text-right md:text-2xl">
            محتويات دليل فتح حساب {brokerName}
          </h2>

          <div className="mt-5 grid gap-2.5 md:grid-cols-2 md:gap-3">
            {steps.map((step) => (
              <a
                key={step.id}
                href={`#step-${step.step_order}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-[13px] font-extrabold leading-6 text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600 md:text-right md:text-sm"
              >
                الخطوة {step.step_order}: {step.title_ar}
              </a>
            ))}
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section className="mt-5 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
          <div className="rounded-[24px] border border-brand-100 bg-brand-50 p-5 text-center md:rounded-[28px] md:p-6 md:text-right">
            <h3 className="text-[21px] font-black text-blue-800 md:text-xl">
              متطلبات فتح الحساب
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
              <li>• بريد إلكتروني فعال.</li>
              <li>• رقم هاتف يمكن الوصول إليه.</li>
              <li>• وثيقة هوية سارية.</li>
              <li>• إثبات عنوان حديث.</li>
            </ul>
          </div>

          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 text-center md:rounded-[28px] md:p-6 md:text-right">
            <h3 className="text-[21px] font-black text-emerald-800 md:text-xl">
              الوثائق المطلوبة
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
              <li>• جواز السفر أو الهوية الوطنية.</li>
              <li>• رخصة القيادة إذا كانت مقبولة.</li>
              <li>• كشف حساب بنكي أو بطاقة ائتمانية.</li>
              <li>• فاتورة خدمات حديثة.</li>
            </ul>
          </div>

          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-center md:rounded-[28px] md:p-6 md:text-right">
            <h3 className="text-[21px] font-black text-amber-800 md:text-xl">
              قبل بدء التداول
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
              <li>• تأكد من نوع الحساب والمنصة.</li>
              <li>• راجع شروط الإيداع والسحب.</li>
              <li>• لا تبدأ بمبالغ كبيرة دون خطة.</li>
              <li>• افهم مخاطر التداول قبل الإيداع.</li>
            </ul>
          </div>
        </section>
                {/* STEPS */}
        <section id="steps" className="mt-5 space-y-5 md:mt-8 md:space-y-8">
          {steps.map((step) => (
            <article
              id={`step-${step.step_order}`}
              key={step.id}
              className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] md:rounded-[32px] md:shadow-[0_14px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="border-b border-slate-100 p-5 md:p-8">
                <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-full bg-brand-500 px-4 py-2 text-xs font-black text-white md:text-sm">
                    الخطوة {step.step_order}
                  </span>

                  {step.step_time_ar && (
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700 md:px-4 md:text-sm">
                      {step.step_time_ar}
                    </span>
                  )}

                  {step.difficulty_ar && (
                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 md:px-4 md:text-sm">
                      {step.difficulty_ar}
                    </span>
                  )}
                </div>

                <h2 className="text-center text-[24px] font-black leading-tight text-slate-950 md:text-right md:text-4xl">
                  {step.title_ar}
                </h2>

                {step.description_ar && (
                  <p className="mx-auto mt-4 max-w-5xl text-center text-[15px] leading-8 text-slate-600 md:mx-0 md:text-right md:text-lg md:leading-9">
                    {step.step_order === 1 ? (
                      <>
                        ابدأ بزيارة الموقع الرسمي لشركة{" "}
                        <a
                          href={realAccountUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="font-black text-brand-600 underline underline-offset-4"
                        >
                          {brokerName}
                        </a>{" "}
                        ثم اضغط على زر "تسجيل الدخول" الموجود أعلى الصفحة. هذه
                        الخطوة هي البداية لإنشاء حساب تداول جديد والوصول إلى
                        منطقة العميل الخاصة بك.
                        <br />
                        <br />
                        يمكنك أيضاً{" "}
                        <a
                          href={realAccountUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="font-black text-brand-600 underline underline-offset-4"
                        >
                          النقر هنا لفتح حساب {brokerName}
                        </a>{" "}
                        مباشرة من الرابط الرسمي المخصص لدينا.
                      </>
                    ) : (
                      step.description_ar
                    )}
                  </p>
                )}
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-[1fr_330px] md:gap-6 md:p-8">
                <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 md:rounded-[26px]">
                  {step.image_url && (
                    <a
                      href={step.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="border-b border-slate-200 bg-white px-3 py-2 text-center text-xs font-black text-brand-600 md:hidden">
                        اضغط على الصورة لتكبيرها
                      </div>

                      <div className="max-h-[260px] overflow-hidden md:max-h-none">
                        <Image
                          src={step.image_url}
                          alt={step.image_alt_ar || step.title_ar}
                          width={1600}
                          height={1000}
                          className="h-auto w-full object-contain transition hover:scale-[1.01]"
                          priority={step.step_order === 1}
                        />
                      </div>
                    </a>
                  )}
                </div>

                <aside className="space-y-3 md:hidden">
                  {step.notes_ar && (
                    <details className="group overflow-hidden rounded-[20px] border border-amber-200 bg-amber-50">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                        <span className="text-sm font-black text-amber-800">
                          ملاحظات مهمة
                        </span>

                        <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-amber-700 transition group-open:rotate-180">
                          ⌄
                        </span>
                      </summary>

                      <ul className="space-y-2 border-t border-amber-100 px-4 py-3 text-sm leading-7 text-slate-700">
                        {lines(step.notes_ar).map((note, i) => (
                          <li key={i}>• {note}</li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {step.warning_ar && (
                    <details className="group overflow-hidden rounded-[20px] border border-red-200 bg-red-50">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                        <span className="text-sm font-black text-red-700">
                          تنبيه
                        </span>

                        <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-red-700 transition group-open:rotate-180">
                          ⌄
                        </span>
                      </summary>

                      <p className="border-t border-red-100 px-4 py-3 text-sm leading-7 text-slate-700">
                        {step.warning_ar}
                      </p>
                    </details>
                  )}
                </aside>

                <aside className="hidden space-y-4 md:block">
                  {step.notes_ar && (
                    <div className="rounded-[26px] border border-amber-200 bg-amber-50 p-5">
                      <h3 className="mb-3 text-xl font-black text-amber-800">
                        ملاحظات مهمة
                      </h3>

                      <ul className="space-y-2 text-base leading-8 text-slate-700">
                        {lines(step.notes_ar).map((note, i) => (
                          <li key={i}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.warning_ar && (
                    <div className="rounded-[26px] border border-red-200 bg-red-50 p-5">
                      <h3 className="mb-3 text-xl font-black text-red-700">
                        تنبيه
                      </h3>

                      <p className="text-base leading-8 text-slate-700">
                        {step.warning_ar}
                      </p>
                    </div>
                  )}
                </aside>
              </div>
            </article>
          ))}
        </section>

        {/* ACCOUNT TYPES */}
        <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:mt-10 md:rounded-[32px] md:p-8">
          <h2 className="text-center text-[24px] font-black leading-tight text-slate-950 md:text-right md:text-3xl">
            بعد فتح الحساب: أي نوع حساب تختار في {brokerName}؟
          </h2>

          <p className="mt-3 text-center text-sm leading-7 text-slate-600 md:text-right md:text-base md:leading-8">
            بعد الانتهاء من فتح الحساب، ستحتاج إلى اختيار نوع الحساب المناسب
            لطريقة تداولك. بعض الحسابات تكون مناسبة للمبتدئين، بينما حسابات
            أخرى تناسب المتداولين النشطين أو أصحاب الاستراتيجيات التي تعتمد على
            فروقات سعرية منخفضة.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-5 md:gap-3">
            {["Standard", "Standard Cent", "Raw Spread", "Zero", "Pro"].map(
              (account) => (
                <Link
                  key={account}
                  href={`/brokers/${slug}/accounts/${account
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-3 text-center text-xs font-black text-blue-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-brand-50 hover:shadow-md md:p-4 md:text-sm"
                >
                  {account}
                </Link>
              )
            )}
          </div>
        </section>

        {/* COMPARISONS */}
        {comparisons.length > 0 && (
          <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:mt-10 md:rounded-[32px] md:p-8">
            <h2 className="text-center text-[24px] font-black leading-tight text-slate-950 md:text-right md:text-3xl">
              قارن {brokerName} مع شركات أخرى قبل فتح الحساب
            </h2>

            <p className="mt-3 text-center text-sm leading-7 text-slate-600 md:text-right md:text-base md:leading-8">
              قبل فتح حساب حقيقي، من الأفضل مقارنة {brokerName} مع وسطاء آخرين
              من حيث التراخيص، الرسوم، السبريد، منصات التداول، طرق السحب
              والإيداع، وأنواع الحسابات المتاحة.
            </p>

            <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-4">
              {preferredComparisons.map((item) => (
                <Link
                  key={item.id}
                  href={`/compare/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-center transition hover:border-blue-300 hover:bg-brand-50 md:rounded-[24px] md:p-5 md:text-right"
                >
                  <div className="text-base font-black leading-7 text-slate-950 md:text-lg">
                    {item.title}
                  </div>

                  <div className="mt-3 text-sm font-extrabold text-brand-600 md:mt-4">
                    عرض المقارنة ←
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:mt-10 md:rounded-[32px] md:p-8">
          <h2 className="text-center text-[24px] font-black leading-tight text-slate-950 md:text-right md:text-3xl">
            أسئلة شائعة حول فتح حساب {brokerName}
          </h2>

          <div className="mt-5 space-y-3 md:mt-6 md:space-y-4">
            {[
              [
                `هل يمكن فتح حساب ${brokerName} من الجوال؟`,
                `نعم، يمكنك فتح حساب ${brokerName} من الجوال أو الكمبيوتر، لكن يفضل استخدام جهاز يتيح رفع الوثائق بوضوح أثناء عملية التحقق.`,
              ],
              [
                `كم يستغرق فتح حساب ${brokerName}؟`,
                `عادة يمكن إنشاء الحساب خلال دقائق، لكن التحقق من الهوية والعنوان قد يستغرق وقتاً أطول حسب جودة الوثائق وبلد الإقامة.`,
              ],
              [
                `هل أحتاج إلى إثبات عنوان؟`,
                `نعم، قد تحتاج إلى رفع مستند يثبت عنوانك مثل كشف حساب بنكي أو فاتورة خدمات حديثة تظهر اسمك وعنوانك بوضوح.`,
              ],
            ].map(([q, a]) => (
              <details
                key={q}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 md:block md:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 md:block md:p-0">
                  <h3 className="text-right text-sm font-black leading-6 text-slate-950 md:text-base">
                    {q}
                  </h3>

                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-black text-slate-600 transition group-open:rotate-180 md:hidden">
                    ⌄
                  </span>
                </summary>

                <p className="border-t border-slate-200 px-4 pb-4 pt-3 text-right text-sm leading-7 text-slate-600 md:mt-2 md:border-t-0 md:p-0">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-6 rounded-[24px] border border-brand-100 bg-brand-50 p-5 text-center md:mt-10 md:rounded-[32px] md:p-8 md:text-right">
          <h2 className="text-[24px] font-black leading-tight text-slate-950 md:text-3xl">
            هل أنت جاهز لفتح حساب {brokerName}؟
          </h2>

          {guide.conclusion_ar && (
            <p className="mt-4 text-sm leading-8 text-slate-700 md:text-lg md:leading-9">
              {guide.conclusion_ar}
            </p>
          )}

          <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap md:mt-6 md:gap-3">
            {realAccountUrl && (
              <a
                href={realAccountUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-black text-white shadow-sm"
              >
                فتح حساب حقيقي الآن
              </a>
            )}

            <Link
              href={`/brokers/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 py-3 text-sm font-black text-brand-600 shadow-sm"
            >
              قراءة تقييم {brokerName}
            </Link>

            <Link
              href="/best-brokers"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm"
            >
              أفضل شركات التداول
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}