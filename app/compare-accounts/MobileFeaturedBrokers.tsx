
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_name_ar: string | null;
  sort_order: number | null;
  account_type: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
};

type Props = {
  brokers: Broker[];
  accounts: BrokerAccount[];
};

function shuffleBrokers(items: Broker[]) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function MobileFeaturedBrokers({
  brokers,
  accounts,
}: Props) {
  const [orderedBrokers, setOrderedBrokers] = useState(brokers);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    setOrderedBrokers(shuffleBrokers(brokers));
  }, [brokers]);

  const displayedBrokers = orderedBrokers.slice(0, visibleCount);
  const hasMore = visibleCount < orderedBrokers.length;

  return (
    <div className="space-y-3">
      {displayedBrokers.map((broker) => {
        const brokerAccounts = accounts.filter(
          (account) => account.broker_id === broker.id
        );

        const previewAccounts = brokerAccounts.slice(0, 2);
        const remainingAccounts = brokerAccounts.length - previewAccounts.length;

        return (
          <article
            key={broker.id}
            className="overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm"
          >
            
{/* Broker header */}
<div className="flex items-center gap-4">
  <div className="flex h-[85px] w-[95px] shrink-0 items-center justify-center rounded-[18px] border border-slate-100 bg-white p-2 shadow-sm">
    {broker.logo ? (
      <img
        src={broker.logo}
        alt={`شعار ${broker.name}`}
        className="h-full w-full object-contain"
      />
    ) : (
      <span className="text-sm font-black text-[#1E5BB8]">
        {broker.name}
      </span>
    )}
  </div>

  <div className="min-w-0 flex-1">
    <h3 className="text-[17px] font-black leading-6 text-slate-900">
      {broker.name}
    </h3>

    <div className="mt-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold text-[#1E5BB8]">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        {brokerAccounts.length} حسابات تداول
      </span>
    </div>

    <Link
      href={`/brokers/${broker.slug}`}
      className="mt-2 inline-block text-[11px] font-bold text-slate-500 hover:text-[#1E5BB8]"
    >
      عرض تقييم الشركة ←
    </Link>
  </div>
</div>

{/* Account preview */}
<div className="mt-4 border-t border-slate-100 pt-3">
  <div className="mb-3 text-[12px] font-black text-slate-800">
    حسابات التداول المتوفرة
  </div>

  <div className="grid grid-cols-2 gap-2">
    {previewAccounts.map((account) => (
      <div
        key={account.id}
        className={`flex min-h-[43px] items-center justify-center rounded-xl border border-blue-100 bg-[#f7faff] px-3 py-2 text-center text-[12px] font-extrabold leading-5 text-slate-800 ${
          previewAccounts.length === 1 ? "col-span-2" : ""
        }`}
      >
        {account.account_name_ar || account.account_name}
      </div>
    ))}
  </div>

  {remainingAccounts > 0 && (
    <p className="mt-2.5 text-center text-[11px] font-bold text-[#1E5BB8]">
      + {remainingAccounts} حسابات إضافية متوفرة
    </p>
  )}
</div>

{/* Action */}
<Link
  href={`/brokers/${broker.slug}`}
  className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#1E5BB8] px-4 py-3 text-[13px] font-black text-white shadow-sm transition hover:bg-[#174a98]"
>
  استعرض حسابات الشركة
  <span aria-hidden="true">←</span>
</Link>
</article>

        );
      })}

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + 5)}
          className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-[13px] font-black text-[#1E5BB8] transition hover:bg-blue-100"
        >
          عرض المزيد من الشركات
          <span aria-hidden="true">↓</span>
        </button>
      )}

      <p className="px-2 text-center text-[10px] leading-5 text-slate-500">
        تختلف شروط الحسابات حسب الشركة والكيان القانوني وبلد الإقامة.
      </p>
    </div>
  );
}
