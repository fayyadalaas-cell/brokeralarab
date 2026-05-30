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

function cleanMoney(value?: string | null) {
  if (!value) return "-";
  return value;
}

function accountBestFor(account: any) {
  return account.best_for_en || account.best_for || "General traders";
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, account } = await params;
  const supabase = await createClient();

  const { data: broker } = await supabase
    .from("brokers")
    .select("id,name,name_en,slug")
    .eq("slug", slug)
    .single();

  if (!broker) return {};

  const { data: accounts } = await supabase
    .from("broker_accounts")
    .select("account_name,spread,commission,commission_en,min_deposit,min_deposit_en,best_for_en")
    .eq("broker_id", broker.id);

  const current = accounts?.find((a) => slugify(a.account_name) === account);
  if (!current) return {};

  const brokerName = broker.name_en || broker.name;

  return {
    title: `${brokerName} ${current.account_name} Account Review: Spreads, Fees & Minimum Deposit`,
    description: `Detailed ${current.account_name} account review for ${brokerName}. Compare spreads, commissions, minimum deposit, execution type, trading costs, and the best account type for your strategy.`,
    alternates: {
      canonical: `/en/brokers/${broker.slug}/accounts/${slugify(
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
      name_en,
      slug,
      logo,
      rating,
      platforms,
      regulation_short,
      real_account_url,
      demo_account_url,
      final_verdict_en,
      broker_positioning_en,
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

  const brokerName = broker.name_en || broker.name;
  const currentCommission = current.commission_en || current.commission;
  const currentDeposit = current.min_deposit_en || current.min_deposit;
  const currentBestFor = accountBestFor(current);

  const cheapestSpread = [...accounts].sort(
    (a, b) => Number(a.spread_avg ?? 99) - Number(b.spread_avg ?? 99)
  )[0];

  const lowestDeposit = [...accounts].sort(
    (a, b) =>
      moneyRank(a.min_deposit_en || a.min_deposit) -
      moneyRank(b.min_deposit_en || b.min_deposit)
  )[0];

  const zeroCommission =
    String(current.commission_value ?? current.commission) === "0" ||
    current.commission === "$0";

  const betterSpreadAccounts = accounts.filter(
    (a) => Number(a.spread_avg ?? 99) < Number(current.spread_avg ?? 99)
  );

  return (
    <main dir="ltr" className="min-h-screen bg-[#f3f7fb] text-[#0f172a]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 md:py-4">
          <Link href="/en" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/en/brokers/${broker.slug}`} className="hover:text-blue-700">
            {brokerName} Review
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-slate-900">
            {current.account_name} Account
          </span>
        </div>
      </section>

      {/* Mobile Hero */}
      <section className="px-4 py-5 md:hidden">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              {brokerName} Account Guide
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              {zeroCommission ? "No commission" : `Commission ${currentCommission}`}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
              {current.execution_type}
            </span>
          </div>

          <h1 className="text-[28px] font-black leading-[1.35] text-slate-950">
            {brokerName} {current.account_name} Account: Is It Right for You?
          </h1>

          <p className="mx-auto mt-4 max-w-[315px] text-[14px] leading-7 text-slate-600">
            A clear breakdown of spreads, commission, minimum deposit, execution
            model, and how this account compares with other {brokerName} account types.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              ["Spread", current.spread],
              ["Commission", currentCommission],
              ["Min deposit", currentDeposit],
              ["Execution", current.execution_type],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-left"
              >
                <p className="text-[11px] font-bold text-slate-500">{label}</p>
                <strong className="mt-1 block text-lg font-black text-slate-950">
                  {value || "-"}
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
                className="flex min-h-[52px] items-center justify-center rounded-2xl bg-blue-600 px-6 text-base font-black text-white shadow-md hover:bg-blue-700"
              >
                Open Real Account
              </a>
            )}

            <Link
              href={`/en/brokers/${broker.slug}`}
              className="flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-base font-black text-slate-900 hover:bg-slate-50"
            >
              Back to {brokerName} Review
            </Link>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {broker.logo && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <Image
                  src={broker.logo}
                  alt={brokerName}
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
            )}

            <div className="text-left">
              <p className="text-[11px] text-slate-500">Trading account</p>
              <h2 className="text-lg font-black">{current.account_name}</h2>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50 p-3 text-left">
            <p className="text-[11px] font-bold text-blue-800">Best for</p>
            <p className="mt-1 text-sm font-black leading-6 text-blue-950">
              {currentBestFor}
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
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {brokerName} Account Guide
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {zeroCommission ? "No commission" : `Commission ${currentCommission}`}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {current.execution_type}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              {brokerName} {current.account_name} Account: Spreads, Fees and Who It Is Best For
            </h1>

            <p className="mt-5 max-w-4xl text-sm leading-8 text-slate-600 md:text-base">
              This page breaks down the {current.account_name} account at {brokerName} from a practical trading-cost perspective. We compare its spread, commission, minimum deposit, execution model, and positioning against other {brokerName} account types so you can decide whether it matches your trading style.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Spread", current.spread],
                ["Commission", currentCommission],
                ["Minimum deposit", currentDeposit],
                ["Execution", current.execution_type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <strong className="mt-2 block text-lg font-black">
                    {value || "-"}
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
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-blue-700"
                >
                  Open Real Account
                </a>
              )}

              <Link
                href={`/en/brokers/${broker.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-slate-50"
              >
                Back to {brokerName} Review
              </Link>
            </div>
          </div>

          <aside className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-[320px]">
            <div className="flex items-center gap-4">
              {broker.logo && (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src={broker.logo}
                    alt={brokerName}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}

              <div>
                <p className="text-xs text-slate-500">Trading Account</p>
                <h2 className="text-2xl font-black">{current.account_name}</h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                ["Broker", brokerName],
                ["Spread", current.spread],
                ["Commission", currentCommission],
                ["Minimum deposit", currentDeposit],
                ["Execution", current.execution_type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-xs text-slate-500">{label}</span>
                  <strong className="text-sm text-slate-950">{value || "-"}</strong>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-bold text-blue-800">Best for</p>
              <p className="mt-2 text-sm font-black leading-7 text-blue-950">
                {currentBestFor}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 md:py-8">
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">Lowest spread at {brokerName}</p>
            <h3 className="mt-2 text-xl font-black">
              {cheapestSpread.account_name}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Spread from {cheapestSpread.spread}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">Lowest minimum deposit</p>
            <h3 className="mt-2 text-xl font-black">
              {lowestDeposit.account_name}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Starts from {cleanMoney(lowestDeposit.min_deposit_en || lowestDeposit.min_deposit)}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">Available account types</p>
            <h3 className="mt-2 text-xl font-black">{accounts.length} accounts</h3>
            <p className="mt-2 text-sm text-slate-600">
              Compared side by side
            </p>
          </div>
        </div>
      </section>
            <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              What is the {current.account_name} account at {brokerName}?
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              The {current.account_name} account is one of the account types
              offered by {brokerName}. It comes with a spread of{" "}
              <strong>{current.spread}</strong>, a commission of{" "}
              <strong>{currentCommission}</strong>, and a minimum deposit of{" "}
              <strong>{currentDeposit}</strong>.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              This account is mainly positioned for{" "}
              <strong>{currentBestFor}</strong>. The key point is to compare its
              pricing model, execution type, and total trading cost against the
              other {brokerName} account types.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm md:p-6">
            <h3 className="text-[22px] font-black text-blue-950 md:text-xl">
              Quick verdict
            </h3>
            <p className="mt-3 text-sm leading-8 text-blue-900">
              The {current.account_name} account is best suited for{" "}
              {currentBestFor}.{" "}
              {betterSpreadAccounts.length > 0
                ? `If your main priority is the lowest possible spread, also compare it with ${betterSpreadAccounts
                    .map((a) => a.account_name)
                    .join(", ")}.`
                : "It appears to be one of the stronger spread options inside this broker’s account lineup."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              Who is the {current.account_name} account best for?
            </h2>

            <div className="mt-4 grid gap-3">
              {[
                `Traders looking for an account designed for ${currentBestFor}.`,
                "Users who want to understand trading costs before opening an account.",
                `Traders comparing spreads and commissions across ${brokerName} account types.`,
                `Users who prefer trading on ${broker.platforms || "the available trading platforms"}.`,
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-left"
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
              When might this account not be ideal?
            </h2>

            <div className="mt-4 grid gap-3">
              {[
                "If you need the lowest possible spread and another account is cheaper.",
                "If the minimum deposit is higher than your current trading budget.",
                "If your strategy depends on a different execution model.",
                "If you trade very frequently and total cost matters more than simplicity.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-3 text-left"
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
          <div className="border-b border-slate-200 p-5 text-center md:p-6 md:text-left">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              {current.account_name} vs other {brokerName} account types
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Compare account types using mobile-friendly cards with no horizontal scrolling.
            </p>
          </div>

          {/* Mobile account cards */}
          <div className="grid gap-3 p-4 md:hidden">
            {accounts.map((item) => {
              const active = item.id === current.id;
              const itemCommission = item.commission_en || item.commission;
              const itemDeposit = item.min_deposit_en || item.min_deposit;
              const itemBestFor = item.best_for_en || item.best_for;

              return (
                <Link
                  key={item.id}
                  href={`/en/brokers/${broker.slug}/accounts/${slugify(
                    item.account_name
                  )}`}
                  className={`rounded-2xl border p-4 transition ${
                    active
                      ? "border-blue-300 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.account_name}
                    </span>

                    {active ? (
                      <span className="text-xs font-black text-blue-700">
                        Current account
                      </span>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-left">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold text-slate-500">
                        Spread
                      </p>
                      <strong className="mt-1 block text-sm text-slate-950">
                        {item.spread || "-"}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold text-slate-500">
                        Commission
                      </p>
                      <strong className="mt-1 block text-sm text-slate-950">
                        {itemCommission || "-"}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold text-slate-500">
                        Deposit
                      </p>
                      <strong className="mt-1 block text-sm text-slate-950">
                        {itemDeposit || "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-left">
                    <p className="text-[10px] font-bold text-slate-500">
                      Best for
                    </p>
                    <p className="mt-1 text-sm font-bold leading-6 text-slate-800">
                      {itemBestFor || "-"}
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
                  <th className="p-4 text-left">Account</th>
                  <th className="p-4 text-left">Spread</th>
                  <th className="p-4 text-left">Commission</th>
                  <th className="p-4 text-left">Minimum deposit</th>
                  <th className="p-4 text-left">Execution</th>
                  <th className="p-4 text-left">Best for</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {accounts.map((item) => {
                  const active = item.id === current.id;
                  const itemCommission = item.commission_en || item.commission;
                  const itemDeposit = item.min_deposit_en || item.min_deposit;
                  const itemBestFor = item.best_for_en || item.best_for;

                  return (
                    <tr key={item.id} className={active ? "bg-blue-50" : "bg-white"}>
                      <td className="p-4">
                        <Link
                          href={`/en/brokers/${broker.slug}/accounts/${slugify(
                            item.account_name
                          )}`}
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                            active
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        >
                          {item.account_name}
                        </Link>
                      </td>
                      <td className="p-4 font-medium">{item.spread}</td>
                      <td className="p-4 font-medium">{itemCommission}</td>
                      <td className="p-4 font-medium">{itemDeposit}</td>
                      <td className="p-4 font-medium">{item.execution_type}</td>
                      <td className="p-4 font-medium">{itemBestFor}</td>
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
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-center shadow-sm md:p-6 md:text-left">
            <h2 className="text-[24px] font-black leading-9 text-amber-950 md:text-2xl">
              Are there lower-spread accounts than {current.account_name}?
            </h2>

            <p className="mt-3 text-sm leading-8 text-amber-900">
              Yes. Based on the account data available for {brokerName}, accounts
              such as{" "}
              <strong>
                {betterSpreadAccounts.map((a) => a.account_name).join(", ")}
              </strong>{" "}
              may offer lower spreads than the {current.account_name} account.
              Still, the best choice depends on the full cost structure, including
              commission, execution type, minimum deposit, and trading frequency.
            </p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              Trading cost and account structure
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              The most important factor when comparing the {current.account_name}
              account is total trading cost. A zero-commission account can still
              be more expensive if the spread is wider, while a raw-spread account
              may look cheaper but include a fixed commission per lot. For active
              traders, spread and commission should be reviewed together.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              Regulation and broker safety
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              Account selection should not be separated from broker quality.
              Before opening the {current.account_name} account, review {brokerName}
              ’s regulation, platform stability, fund protection, support quality,
              and withdrawal process. Main regulatory references:{" "}
              <strong>{broker.regulation_short || "Not specified"}</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:pb-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-center text-[22px] font-black leading-8 md:text-left md:text-2xl">
            Frequently asked questions about the {current.account_name} account
          </h2>

          <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-4">
            {[
              [
                `What is the minimum deposit for the ${current.account_name} account?`,
                `The minimum deposit for the ${current.account_name} account at ${brokerName} starts from ${currentDeposit}.`,
              ],
              [
                `What is the spread on the ${current.account_name} account?`,
                `The ${current.account_name} account at ${brokerName} has a spread of ${current.spread}.`,
              ],
              [
                `Does the ${current.account_name} account charge commission?`,
                `The commission on the ${current.account_name} account is ${currentCommission}.`,
              ],
              [
                `Is the ${current.account_name} account good for active traders?`,
                `It depends on your trading frequency and cost sensitivity, but this account is mainly positioned for ${currentBestFor}.`,
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
              Ready to compare the {current.account_name} account?
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              Compare the {current.account_name} account with other {brokerName}
              account types, then choose based on your trading strategy, capital,
              execution needs, and total trading cost.
            </p>
          </div>

          {broker.real_account_url && (
            <a
              href={broker.real_account_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white hover:bg-blue-700 md:mt-0 md:w-auto"
            >
              Open Real Account
            </a>
          )}
        </div>
      </section>
    </main>
  );
}