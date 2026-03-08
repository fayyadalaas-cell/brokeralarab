import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "أفضل شركات التداول في مصر 2026 | بروكر العرب",
  description:
    "تعرف على أفضل شركات التداول في مصر لعام 2026، مع شرح أهم المعايير مثل الحساب الإسلامي، التراخيص، الإيداع، والمنصات المناسبة للمبتدئين والمحترفين.",
  alternates: {
    canonical: "/best-brokers/saudi-arabia",
  },
  openGraph: {
    title: "أفضل شركات التداول في مصر 2026 | بروكر العرب",
    description:
      "دليل شامل يساعدك على اختيار أفضل شركة تداول في مصر بناءً على الترخيص، الحساب الإسلامي، الإيداع، والمنصات.",
    url: "/best-brokers/saudi-arabia",
    siteName: "بروكر العرب",
    type: "website",
  },
};

export default async function SaudiBrokersPage() {
    const supabase = await createClient();

const { data: brokers } = await supabase
  .from("brokers")
  .select("id, name, slug, rating, min_deposit, logo, real_account_url")
  .order("rating", { ascending: false })
  .limit(6);
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-700">
              دليل محدث للمتداولين في مصر
            </span>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              أفضل شركات التداول في مصر
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              إذا كنت تبحث عن أفضل شركات التداول في مصر، فهذه الصفحة
              صُممت لتساعدك على اختيار الوسيط المناسب بطريقة أوضح وأكثر
              احترافية. ركزنا على المعايير التي تهم المتداول السعودي فعلًا مثل
              قوة الشركة، توفر الحساب الإسلامي، سهولة البدء، الحد الأدنى
              للإيداع، المنصات المتاحة، وإمكانية الانتقال إلى صفحة التقييم الكامل
              قبل اتخاذ قرار فتح الحساب.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/brokers"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                عرض جدول الوسطاء
              </Link>

              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
              >
                تصفح المقارنات
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
  <div className="mb-6 text-center">
    <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
      أفضل شركات التداول في مصر
    </h2>
    <p className="mt-2 text-slate-600">
      هذه قائمة مختارة من الوسطاء الأكثر شعبية بين المتداولين في مصر.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {brokers?.map((broker, index) => (
    <div
      key={broker.id}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >

      <div className="mb-2 text-xs font-bold text-blue-600">
        #{index + 1} الأفضل
      </div>

      <div className="flex items-center gap-4">
        {broker.logo && (
          <Image
            src={broker.logo}
            alt={broker.name || ""}
            width={48}
            height={48}
            className="rounded-xl"
          />
        )}

          <div>
            <div className="text-lg font-bold text-slate-900">
              {broker.name}
            </div>
            <div className="text-sm text-slate-500">
              تقييم: {broker.rating}/10
            </div>
          </div>
        </div>

       <div className="mt-4 flex items-center justify-between">
  <div className="text-sm text-slate-600">
    الحد الأدنى: ${broker.min_deposit}
  </div>

  <div className="flex gap-2">
    <Link
      href={`/brokers/${broker.slug}`}
      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
    >
      عرض التقييم
    </Link>

    <a
      href={broker.real_account_url || "#"}
      target="_blank"
      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
    >
      فتح حساب
    </a>
  </div>
</div>
      </div>
    ))}
  </div>
</section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">
              ما الذي يهم المتداول السعودي؟
            </div>
            <div className="mt-2 text-xl font-extrabold text-slate-900">
              الحساب الإسلامي + الثقة + سهولة الإيداع
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">
              نوع الشركات المناسبة
            </div>
            <div className="mt-2 text-xl font-extrabold text-slate-900">
              وسطاء عالميون بصفحات تقييم واضحة
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">
              الهدف من الصفحة
            </div>
            <div className="mt-2 text-xl font-extrabold text-slate-900">
              مساعدتك على الاختيار قبل التسجيل
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              كيف اخترنا أفضل شركات التداول في مصر؟
            </h2>

            <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
              <p>
                اختيار أفضل شركة تداول في مصر لا ينبغي أن يعتمد فقط على اسم
                الشركة أو شهرتها، بل على مجموعة من العناصر العملية التي تؤثر
                مباشرة في تجربة المستخدم. لهذا السبب قمنا ببناء هذه الصفحة بحيث
                تكون نقطة انطلاق واضحة للباحث عن وسيط مناسب، سواء كان مبتدئًا
                يريد البدء بمبلغ بسيط، أو متداولًا لديه خبرة ويبحث عن منصة قوية
                وتنفيذ جيد.
              </p>

              <p>
                ركزنا على العناصر الأكثر أهمية بالنسبة للمتداولين في مصر،
                وفي مقدمتها توفر الحساب الإسلامي، لأن هذا العامل يعتبر من أكثر
                النقاط طلبًا لدى كثير من المستخدمين. كما أخذنا بعين الاعتبار
                سهولة فتح الحساب، وضوح المعلومات، الحد الأدنى للإيداع، والمنصات
                المتاحة مثل MT4 وMT5، إلى جانب إمكانية قراءة تقييم كامل لكل شركة
                بدل الاعتماد على قرار سريع أو عشوائي.
              </p>

              <p>
                الهدف من هذه الصفحة ليس إعطاء وعود مبالغ فيها، بل تقديم أساس
                منظم يساعدك على المقارنة بشكل أفضل. وبعد ذلك يمكنك الانتقال إلى
                صفحة كل شركة لمعرفة التفاصيل بشكل أعمق، مثل أنواع الحسابات،
                الإيداع والسحب، المزايا والعيوب، ومدى مناسبة الوسيط لأسلوب
                تداولك.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              أهم المعايير
            </h2>

            <div className="mt-5 space-y-3 text-sm leading-8 text-slate-700">
              <div className="rounded-2xl bg-white px-4 py-3">
                1. توفر الحساب الإسلامي
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                2. سهولة الإيداع والبدء
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                3. وضوح صفحة التقييم
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                4. المنصات المناسبة
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                5. ملاءمة المبتدئين والمحترفين
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                6. الحد الأدنى للإيداع
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            لماذا يهتم المتداولون في مصر بالحساب الإسلامي؟
          </h2>

          <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
            <p>
              من أكثر الأمور التي يبحث عنها المستخدم عند اختيار شركة تداول في
              مصر هي إمكانية فتح حساب إسلامي. ويرجع ذلك إلى رغبة شريحة
              كبيرة من المتداولين في تجنب الرسوم أو الفوائد المرتبطة بتبييت
              الصفقات، أو على الأقل التعامل مع شركة تقدم خيارًا واضحًا ومعلنًا
              للحسابات الإسلامية.
            </p>

            <p>
              لكن من المهم الانتباه إلى أن وجود عبارة “حساب إسلامي” وحدها لا يكفي
              للحكم على الشركة. الأفضل دائمًا هو قراءة التفاصيل بدقة، لأن بعض
              الشركات قد توفر هذا النوع من الحسابات بشروط مختلفة من وسيط إلى
              آخر. لذلك، وجود تقييم كامل ومنظم لكل شركة يساعدك على فهم الصورة
              بشكل أفضل قبل التسجيل.
            </p>

            <p>
              ولهذا السبب نعتبر الحساب الإسلامي عاملًا مهمًا، لكنه ليس العامل
              الوحيد. يجب أيضًا النظر إلى سهولة الاستخدام، نوع المنصات، وقوة
              الشركة بشكل عام، لأن الوسيط المناسب هو الذي يجمع بين أكثر من ميزة
              في الوقت نفسه.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              أفضل خيار للمبتدئين
            </h3>
            <p className="mt-3 leading-8 text-slate-700">
              المبتدئ يحتاج غالبًا إلى شركة تقدم تجربة واضحة، وإيداعًا منخفضًا،
              ومنصة مشهورة، وصفحة تقييم تشرح الأمور ببساطة قبل فتح الحساب.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              أفضل خيار للإيداع المنخفض
            </h3>
            <p className="mt-3 leading-8 text-slate-700">
              بعض الوسطاء يتيحون البدء بمبالغ بسيطة، وهذا مناسب لمن يريد تجربة
              التداول الحقيقية تدريجيًا دون تحمل التزام مالي كبير منذ البداية.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              أفضل خيار لعشاق المنصات
            </h3>
            <p className="mt-3 leading-8 text-slate-700">
              إذا كنت تفضل MT4 أو MT5 أو تهتم بسهولة تنفيذ الأوامر، فاختيار
              الوسيط يجب أن يرتبط مباشرة بجودة المنصة وتجربة الاستخدام الفعلية.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            أخطاء يجب تجنبها قبل فتح حساب تداول
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="font-extrabold text-slate-900">
                اختيار الشركة فقط بسبب الإعلان
              </div>
              <p className="mt-2 leading-7 text-slate-700">
                بعض المستخدمين يتجهون مباشرة إلى التسجيل لأن اسم الشركة متكرر
                أمامهم، دون قراءة تقييم فعلي يشرح المزايا والعيوب.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="font-extrabold text-slate-900">
                تجاهل صفحة التقييم الكاملة
              </div>
              <p className="mt-2 leading-7 text-slate-700">
                الصفحة المختصرة تساعد على المقارنة، لكن القراءة المفصلة تبقى
                ضرورية قبل اتخاذ قرار فتح الحساب الحقيقي.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="font-extrabold text-slate-900">
                البدء بإيداع أكبر من اللازم
              </div>
              <p className="mt-2 leading-7 text-slate-700">
                من الأفضل أن يبدأ المستخدم بمبلغ مناسب وقابل للتجربة بدل رفع
                المخاطرة من أول خطوة.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="font-extrabold text-slate-900">
                تجاهل نوع المنصة المناسبة له
              </div>
              <p className="mt-2 leading-7 text-slate-700">
                أحيانًا تكون الشركة جيدة، لكن المنصة أو طريقة الاستخدام لا تناسب
                أسلوب المتداول نفسه.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-[28px] border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                ابدأ من المقارنة ثم انتقل إلى التقييم الكامل
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-8 text-blue-50 md:text-base">
                أفضل طريقة لاختيار شركة تداول في مصر هي أن تبدأ بالمقارنة
                السريعة بين الوسطاء، ثم تنتقل إلى صفحة التقييم الكامل للشركة التي
                تناسب احتياجاتك أكثر.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/brokers"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                تصفح الوسطاء
              </Link>

              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                عرض المقارنات
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            الأسئلة الشائعة حول أفضل شركات التداول في مصر
          </h2>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                ما أفضل شركة تداول في مصر؟
              </h3>
              <p className="mt-2 leading-8 text-slate-700">
                لا توجد شركة واحدة تناسب الجميع، لأن ذلك يعتمد على ما إذا كنت
                تبحث عن حساب إسلامي، إيداع منخفض، منصة محددة، أو تجربة مناسبة
                للمبتدئين. لهذا من الأفضل البدء بجدول المقارنة ثم قراءة التقييم
                التفصيلي.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                هل الحساب الإسلامي مهم عند اختيار الوسيط؟
              </h3>
              <p className="mt-2 leading-8 text-slate-700">
                نعم، بالنسبة إلى كثير من المتداولين في مصر يعتبر الحساب
                الإسلامي عنصرًا أساسيًا، لكن يجب أيضًا النظر إلى بقية المعايير
                مثل وضوح الشركة وسهولة الاستخدام والمنصة.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                هل أفتح الحساب مباشرة من أول زيارة؟
              </h3>
              <p className="mt-2 leading-8 text-slate-700">
                الأفضل دائمًا أن تقرأ التقييم الكامل للشركة أولًا، ثم تقارن بينها
                وبين بدائل أخرى قبل اتخاذ قرار نهائي.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                ما أقل مبلغ مناسب للبدء؟
              </h3>
              <p className="mt-2 leading-8 text-slate-700">
                ذلك يختلف من شركة إلى أخرى، لكن كثيرًا من المستخدمين يفضلون
                البدء بإيداع منخفض في البداية حتى يختبروا المنصة وتجربة التداول
                بشكل عملي.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}