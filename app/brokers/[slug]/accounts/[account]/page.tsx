import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    slug: string;
    account: string;
  }>;
};

function slugify(value: string | null) {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function moneyRank(value?: string | null) {
  if (!value) return 999999;
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 999999;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, account } = await params;
  const supabase = await createClient();

  const { data: broker } = await supabase
    .from("brokers")
    .select("id,name,slug")
    .eq("slug", slug)
    .single();

  if (!broker) return {};

  const { data: accounts } = await supabase
    .from("broker_accounts")
    .select("account_name,spread,commission,min_deposit,best_for")
    .eq("broker_id", broker.id);

  const current = accounts?.find((a) => slugify(a.account_name) === account);
  if (!current) return {};

  return {
    title: `حساب ${current.account_name} في ${broker.name}: السبريد والعمولة`,
    description: `شرح حساب ${current.account_name} في ${broker.name}: السبريد، العمولة، أقل إيداع، نوع التنفيذ، وهل يناسب هذا الحساب أسلوب تداولك.`,
    alternates: {
      canonical: `/brokers/${broker.slug}/accounts/${slugify(
        current.account_name
      )}`,
    },
  };
}

export default async function BrokerAccountPage({ params }: PageProps) {
  const { slug, account } = await params;
  const supabase = await createClient();

  const { data: broker } = await supabase
    .from("brokers")
    .select(`
      id,
      name,
      slug,
      logo,
      rating,
      platforms,
      regulation_short,
      real_account_url,
      demo_account_url,
      final_verdict,
      score_safety,
      score_fees,
      score_platforms,
      score_deposit,
      score_support
    `)
    .eq("slug", slug)
    .single();

  if (!broker) notFound();

  const { data: accounts } = await supabase
    .from("broker_accounts")
    .select("*")
    .eq("broker_id", broker.id)
    .order("sort_order", { ascending: true });

  if (!accounts?.length) notFound();

  const current = accounts.find((a) => slugify(a.account_name) === account);
  if (!current) notFound();

  const cheapestSpread = [...accounts].sort(
    (a, b) => Number(a.spread_avg ?? 99) - Number(b.spread_avg ?? 99)
  )[0];

  const lowestDeposit = [...accounts].sort(
    (a, b) => moneyRank(a.min_deposit) - moneyRank(b.min_deposit)
  )[0];

  const zeroCommission =
    String(current.commission_value ?? current.commission) === "0" ||
    current.commission === "$0";

  const betterSpreadAccounts = accounts.filter(
    (a) => Number(a.spread_avg ?? 99) < Number(current.spread_avg ?? 99)
  );

  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fb] text-[#0f172a]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 md:py-4">
          <Link href="/" className="hover:text-brand-600">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/brokers/${broker.slug}`} className="hover:text-brand-600">
            تقييم {broker.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-slate-900">
            حساب {current.account_name}
          </span>
        </div>
      </section>

      {/* Mobile Hero */}
      <section className="px-4 py-5 md:hidden">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
              دليل حسابات {broker.name}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              {zeroCommission ? "بدون عمولة" : `عمولة ${current.commission}`}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
              {current.execution_type}
            </span>
          </div>

          <h1 className="text-[28px] font-black leading-[1.35] text-slate-950">
            حساب {current.account_name} في {broker.name}: هل يناسبك؟
          </h1>

          <p className="mx-auto mt-4 max-w-[310px] text-[14px] leading-8 text-slate-600">
            شرح مختصر لتكلفة التداول، السبريد، العمولة، أقل إيداع، ونوع التنفيذ
            مع مقارنة مباشرة بباقي حسابات {broker.name}.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              ["السبريد", current.spread],
              ["العمولة", current.commission],
              ["أقل إيداع", current.min_deposit],
              ["إسلامي", current.is_islamic_available ? "متاح" : "غير محدد"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-right"
              >
                <p className="text-[11px] font-bold text-slate-500">{label}</p>
                <strong className="mt-1 block text-lg font-black text-slate-950">
                  {value}
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-2">
            {broker.real_account_url && (
              <a
                href={broker.real_account_url}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="flex min-h-[52px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-base font-black text-white shadow-md hover:bg-brand-600"
              >
                فتح حساب حقيقي
              </a>
            )}

            <Link
              href={`/brokers/${broker.slug}`}
              className="flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-base font-black text-slate-900 hover:bg-slate-50"
            >
              العودة إلى تقييم {broker.name}
            </Link>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {broker.logo && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <Image
                  src={broker.logo}
                  alt={broker.name}
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
            )}

            <div className="text-right">
              <p className="text-[11px] text-slate-500">حساب تداول</p>
              <h2 className="text-lg font-black">{current.account_name}</h2>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-blue-100 bg-brand-50 p-3 text-right">
            <p className="text-[11px] font-bold text-blue-800">الأفضل لـ</p>
            <p className="mt-1 text-sm font-black leading-6 text-blue-950">
              {current.best_for}
            </p>
          </div>
        </div>
      </section>

      {/* Desktop Hero - unchanged */}
      <section className="relative hidden overflow-hidden bg-white md:block">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-50 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                دليل حسابات {broker.name}
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {zeroCommission ? "بدون عمولة" : `عمولة ${current.commission}`}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {current.execution_type}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              حساب {current.account_name} في {broker.name}: السبريد، العمولة وهل
              يناسبك؟
            </h1>

            <p className="mt-5 max-w-4xl text-sm leading-8 text-slate-600 md:text-base">
              إذا كنت تفكر في فتح حساب {current.account_name} لدى {broker.name}،
              فهذه الصفحة تمنحك شرحًا واضحًا لتكلفة التداول، السبريد، العمولة،
              أقل إيداع، ونوع التنفيذ، مع مقارنة مباشرة بباقي حسابات الشركة حتى
              تختار الحساب الأنسب لطريقة تداولك.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["السبريد", current.spread],
                ["العمولة", current.commission],
                ["أقل إيداع", current.min_deposit],
                ["الحساب الإسلامي", current.is_islamic_available ? "متاح" : "غير محدد"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <strong className="mt-2 block text-lg font-black">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {broker.real_account_url && (
                <a
                  href={broker.real_account_url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-brand-600"
                >
                  فتح حساب حقيقي
                </a>
              )}

              <Link
                href={`/brokers/${broker.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-slate-50"
              >
                العودة إلى تقييم {broker.name}
              </Link>
            </div>
          </div>

          <aside className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-[320px]">
            <div className="flex items-center gap-4">
              {broker.logo && (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src={broker.logo}
                    alt={broker.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}

              <div>
                <p className="text-xs text-slate-500">حساب تداول</p>
                <h2 className="text-2xl font-black">{current.account_name}</h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                ["الوسيط", broker.name],
                ["السبريد", current.spread],
                ["العمولة", current.commission],
                ["أقل إيداع", current.min_deposit],
                ["نوع التنفيذ", current.execution_type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-xs text-slate-500">{label}</span>
                  <strong className="text-sm text-slate-950">{value}</strong>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-blue-100 bg-brand-50 p-4">
              <p className="text-xs font-bold text-blue-800">الأفضل لـ</p>
              <p className="mt-2 text-sm font-black leading-7 text-blue-950">
                {current.best_for}
              </p>
            </div>
          </aside>
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-4 py-5 md:py-8">
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">أقل سبريد في حسابات {broker.name}</p>
            <h3 className="mt-2 text-xl font-black">{cheapestSpread.account_name}</h3>
            <p className="mt-2 text-sm text-slate-600">
              سبريد يبدأ من {cheapestSpread.spread}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">أقل إيداع في حسابات {broker.name}</p>
            <h3 className="mt-2 text-xl font-black">{lowestDeposit.account_name}</h3>
            <p className="mt-2 text-sm text-slate-600">
              يبدأ من {lowestDeposit.min_deposit}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">عدد حسابات {broker.name}</p>
            <h3 className="mt-2 text-xl font-black">{accounts.length} حسابات</h3>
            <p className="mt-2 text-sm text-slate-600">
              مقارنة مباشرة بين الحسابات المتاحة
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              ما هو حساب {current.account_name} في {broker.name}؟
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              حساب {current.account_name} هو أحد حسابات التداول التي توفرها شركة{" "}
              {broker.name}. يتميز بسبريد يتراوح بين{" "}
              <strong>{current.spread}</strong>، وعمولة تبلغ{" "}
              <strong>{current.commission}</strong>، مع حد أدنى للإيداع يبدأ من{" "}
              <strong>{current.min_deposit}</strong>.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              يناسب هذا الحساب فئة <strong>{current.best_for}</strong>، لكن
              الأفضل دائمًا مقارنته مع باقي حسابات {broker.name} من حيث السبريد،
              العمولة، نوع التنفيذ، وأسلوب التداول المناسب.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 shadow-sm md:p-6">
            <h3 className="text-[22px] font-black text-blue-950 md:text-xl">
              الحكم السريع
            </h3>
            <p className="mt-3 text-sm leading-8 text-blue-900">
              حساب {current.account_name} مناسب أكثر لـ {current.best_for}.{" "}
              {betterSpreadAccounts.length > 0
                ? `إذا كان هدفك الأساسي أقل سبريد، قارن أيضًا مع ${betterSpreadAccounts
                    .map((a) => a.account_name)
                    .join("، ")}.`
                : "ويُعد من الخيارات القوية من ناحية السبريد داخل هذه الشركة."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              لمن يناسب حساب {current.account_name}؟
            </h2>

            <div className="mt-4 grid gap-3">
              {[
                `مناسب لمن يبحث عن حساب يخدم فئة ${current.best_for}.`,
                "مناسب لمن يريد معرفة تكلفة التداول قبل فتح الحساب.",
                `مناسب لمن يقارن السبريد والعمولة بين حسابات ${broker.name}.`,
                `مناسب لمن يريد التداول عبر ${broker.platforms || "منصات التداول المتاحة"}.`,
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-right"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
                    ✓
                  </span>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              متى لا يكون {current.account_name} مناسبًا؟
            </h2>

            <div className="mt-4 grid gap-3">
              {[
                "إذا كنت تبحث عن أقل سبريد ممكن وهناك حساب آخر أقل تكلفة.",
                "إذا كان الحد الأدنى للإيداع لا يناسب رأس مالك الحالي.",
                "إذا كان أسلوب تداولك يحتاج إلى نوع تنفيذ مختلف.",
                "إذا كانت شروط الحساب لا تناسب طريقة تداولك.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-3 text-right"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                    !
                  </span>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 text-center md:p-6 md:text-right">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              مقارنة حساب {current.account_name} مع حسابات {broker.name}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              اختر الحساب الأنسب من خلال مقارنة مبسطة بدون سكرول أفقي على الموبايل.
            </p>
          </div>

          {/* Mobile account cards */}
          <div className="grid gap-3 p-4 md:hidden">
            {accounts.map((item) => {
              const active = item.id === current.id;

              return (
                <Link
                  key={item.id}
                  href={`/brokers/${broker.slug}/accounts/${slugify(
                    item.account_name
                  )}`}
                  className={`rounded-2xl border p-4 transition ${
                    active
                      ? "border-blue-300 bg-brand-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-brand-100 hover:bg-brand-50/40"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        active
                          ? "bg-brand-500 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.account_name}
                    </span>

                    {active ? (
                      <span className="text-xs font-black text-brand-600">
                        الحساب الحالي
                      </span>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-right">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold text-slate-500">
                        السبريد
                      </p>
                      <strong className="mt-1 block text-sm text-slate-950">
                        {item.spread || "-"}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold text-slate-500">
                        العمولة
                      </p>
                      <strong className="mt-1 block text-sm text-slate-950">
                        {item.commission || "-"}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold text-slate-500">
                        الإيداع
                      </p>
                      <strong className="mt-1 block text-sm text-slate-950">
                        {item.min_deposit || "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-right">
                    <p className="text-[10px] font-bold text-slate-500">
                      مناسب لـ
                    </p>
                    <p className="mt-1 text-sm font-bold leading-6 text-slate-800">
                      {item.best_for || "-"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop table unchanged */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4 text-right">الحساب</th>
                  <th className="p-4 text-right">السبريد</th>
                  <th className="p-4 text-right">العمولة</th>
                  <th className="p-4 text-right">أقل إيداع</th>
                  <th className="p-4 text-right">نوع التنفيذ</th>
                  <th className="p-4 text-right">الأفضل لـ</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {accounts.map((item) => {
                  const active = item.id === current.id;

                  return (
                    <tr key={item.id} className={active ? "bg-brand-50" : "bg-white"}>
                      <td className="p-4">
                        <Link
                          href={`/brokers/${broker.slug}/accounts/${slugify(
                            item.account_name
                          )}`}
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                            active
                              ? "bg-brand-500 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600"
                          }`}
                        >
                          {item.account_name}
                        </Link>
                      </td>
                      <td className="p-4 font-medium">{item.spread}</td>
                      <td className="p-4 font-medium">{item.commission}</td>
                      <td className="p-4 font-medium">{item.min_deposit}</td>
                      <td className="p-4 font-medium">{item.execution_type}</td>
                      <td className="p-4 font-medium">{item.best_for}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {betterSpreadAccounts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-center shadow-sm md:p-6 md:text-right">
            <h2 className="text-[24px] font-black leading-9 text-amber-950 md:text-2xl">
              هل توجد حسابات أقل سبريدًا من {current.account_name}؟
            </h2>

            <p className="mt-3 text-sm leading-8 text-amber-900">
              نعم، داخل حسابات {broker.name} توجد حسابات قد تقدم سبريدًا أقل من{" "}
              {current.account_name}، مثل{" "}
              <strong>
                {betterSpreadAccounts.map((a) => a.account_name).join("، ")}
              </strong>
              . لكن اختيار الحساب لا يعتمد على السبريد فقط، بل يجب النظر أيضًا
              إلى العمولة، أقل إيداع، نوع التنفيذ، ومدى ملاءمة الحساب لطريقة
              تداولك.
            </p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              هل حساب {current.account_name} إسلامي؟
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              {current.is_islamic_available
                ? `يوفر ${broker.name} إمكانية الحساب الإسلامي لهذا النوع من الحسابات. ${
                    current.islamic_conditions ||
                    "وقد تختلف الشروط حسب الأداة المالية، مدة الاحتفاظ بالصفقة، وسياسات الشركة."
                  }`
                : `لا توجد معلومات كافية تؤكد توفر الحساب الإسلامي على حساب ${current.account_name} لدى ${broker.name}. لذلك يُفضل مراجعة شروط الشركة قبل فتح الحساب.`}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              التراخيص والأمان
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              اختيار حساب التداول لا ينفصل عن تقييم شركة الوساطة نفسها. قبل فتح
              حساب {current.account_name}، راجع تراخيص {broker.name}، حماية أموال
              العملاء، جودة المنصات، وسرعة السحب والإيداع. التراخيص المختصرة
              لهذا الوسيط:{" "}
              <strong>{broker.regulation_short || "غير محدد"}</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-center text-[22px] font-black leading-8 md:text-right md:text-2xl">
            أسئلة شائعة عن حساب {current.account_name} في {broker.name}
          </h2>

          <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-4">
            {[
              [
                `ما أقل إيداع في حساب ${current.account_name}؟`,
                `أقل إيداع في حساب ${current.account_name} لدى ${broker.name} يبدأ من ${current.min_deposit}.`,
              ],
              [
                `ما سبريد حساب ${current.account_name}؟`,
                `سبريد حساب ${current.account_name} لدى ${broker.name} يتراوح بين ${current.spread}.`,
              ],
              [
                `هل حساب ${current.account_name} بدون عمولة؟`,
                `العمولة في حساب ${current.account_name} هي ${current.commission}.`,
              ],
              [
                `هل حساب ${current.account_name} مناسب للمبتدئين؟`,
                `يعتمد ذلك على أسلوب التداول، لكن هذا الحساب مناسب بشكل خاص لـ ${current.best_for}.`,
              ],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-slate-200 p-4 md:p-5">
                <h3 className="font-black">{q}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-0">
        <div className="rounded-3xl bg-[#07111f] p-6 text-white shadow-sm md:flex md:items-center md:justify-between md:p-7">
          <div>
            <h2 className="text-[23px] font-black leading-9 md:text-2xl">
              هل تريد فتح حساب {current.account_name}؟
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              قارن حساب {current.account_name} مع باقي حسابات {broker.name}، ثم
              اختر الحساب الأقرب لطريقة تداولك، حجم رأس المال، وعدد الصفقات التي
              تنفذها.
            </p>
          </div>

          {broker.real_account_url && (
            <a
              href={broker.real_account_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white hover:bg-brand-600 md:mt-0 md:w-auto"
            >
              فتح حساب حقيقي
            </a>
          )}
        </div>
      </section>
    </main>
  );
}