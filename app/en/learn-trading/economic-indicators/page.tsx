import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Activity,
  BarChart3,
  Building2,
  ChevronDown,
  Clock3,
  DollarSign,
  Factory,
  Flame,
  Fuel,
  LineChart,
  Percent,
  PieChart,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Economic Indicators and Their Impact on Trading",
  description:
  "Learn how interest rates, CPI, PPI, Nonfarm Payrolls (NFP), GDP, PMI, unemployment, retail sales, crude oil inventories and central bank meetings affect forex, gold, stocks and financial markets.",
  alternates: {
    canonical: "https://brokeralarab.com/en/learn-trading/economic-indicators",
  },
};

const indicators = [
  {
    id: "interest-rate",
    title: "Interest Rate Decision",
    short: "One of the most important events for global markets",
    icon: Percent,
    level: "Very high impact",
    frequency: "Based on central bank meetings",
    markets: "USD, gold, stocks, bonds",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
    content: `
Interest rate decisions are among the most closely watched economic events in financial markets because they directly affect the cost of borrowing, the return on cash, and the attractiveness of a currency. When a central bank raises interest rates, holding that currency can become more attractive because investors may earn a higher return. This can support the currency, especially when the hike is stronger than the market expected.

However, markets do not react to the interest rate number alone. The most important factor is the difference between the actual decision and what traders had already priced in. If the market expected no change and the central bank raises rates, the reaction can be powerful. But if traders expected a large hike and the central bank delivers a smaller one, the currency may weaken even though rates were raised.

Professional traders pay close attention to the statement, the voting pattern, the economic projections and the press conference. Sometimes the central bank keeps rates unchanged, but the tone sounds hawkish and signals that more tightening may be needed. In that case, the currency may rise. At other times, the bank raises rates but suggests that the tightening cycle is close to ending, which can weaken the currency.

For gold, interest rates are extremely important. Gold does not pay interest, so when yields rise, gold can become less attractive compared with bonds or cash. This is why gold often comes under pressure when rate expectations rise. But the relationship is not automatic. During periods of fear, banking stress or geopolitical uncertainty, gold can still rise even if interest rates are high.

Stocks react through a different channel. Higher interest rates can increase borrowing costs for companies, reduce consumer spending, and lower the present value of future earnings. This is why stock markets may fall when investors believe rates will remain high for a long time. Growth stocks can be especially sensitive because their valuations depend heavily on future profits.

Before trading an interest rate decision, the key questions are: What did the market expect? Was the decision a surprise? Was the statement hawkish or dovish? Did the press conference confirm the message or change it? These questions are often more important than the headline rate itself.

The most common mistake is entering a trade immediately after the announcement without understanding the full message. The first minutes can be extremely volatile. Spreads may widen, price can spike in both directions, and the initial move may reverse quickly once traders read the details.
`,
  },
  {
    id: "cpi",
    title: "CPI Inflation",
    short: "The most watched inflation report",
    icon: TrendingUp,
    level: "Very high impact",
    frequency: "Usually monthly",
    markets: "USD, gold, stocks, rates",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    content: `
The Consumer Price Index, or CPI, is one of the most important inflation indicators in the world. It measures how prices change for a basket of goods and services purchased by consumers. Because inflation directly affects purchasing power, wages, interest rates and central bank policy, CPI can create major moves in forex, gold, stocks and bonds.

Traders usually focus on two versions of CPI: headline CPI and core CPI. Headline CPI includes all items, including food and energy. Core CPI excludes food and energy because they can be highly volatile. In many cases, core CPI receives more attention from markets because it may give a clearer picture of underlying inflation pressure.

If CPI comes in higher than expected, the market may assume that the central bank will need to keep rates higher for longer. This can support the currency, push bond yields higher, pressure gold, and weigh on stocks. If CPI comes in lower than expected, traders may start pricing in rate cuts or a softer policy path, which can weaken the currency and support risk assets.

The reaction depends heavily on context. One high inflation reading does not necessarily mean inflation is accelerating again, and one low reading does not mean the problem is solved. Markets look for a trend across several months. Traders also ask whether inflation is moving closer to the central bank’s target or becoming more persistent.

Gold can react in two different ways to inflation. On one hand, inflation may support gold as a store of value. On the other hand, if high inflation leads to higher interest rates and higher real yields, gold may fall. This is why gold’s reaction to CPI depends on whether traders focus more on inflation itself or on the central bank response.

Stock markets can also react sharply. Strong inflation may pressure equities because higher rates can increase financing costs and reduce company margins. But lower inflation, especially when growth remains stable, can be positive for stocks because it creates room for easier monetary policy.

Before trading CPI, do not focus only on the actual number. Compare it with expectations, check the core reading, watch bond yields, and observe whether the dollar confirms the move. If yields move strongly after the release, the market is taking the inflation report seriously.
`,
  },
  {
    id: "ppi",
    title: "PPI Inflation",
    short: "Producer-side inflation pressure",
    icon: Factory,
    level: "Medium to high impact",
    frequency: "Usually monthly",
    markets: "USD, stocks, commodities, inflation",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    content: `
The Producer Price Index, or PPI, measures price changes from the perspective of producers and businesses before goods and services reach the consumer. This makes it useful for understanding early inflation pressure in the supply chain. If production costs rise, companies may eventually pass those costs to consumers, which can later appear in CPI.

PPI becomes especially important when inflation is already the main market theme. During periods when central banks are concerned about price pressure, any sign that producer costs remain elevated can affect expectations for interest rates. A strong PPI report may suggest that inflation will not fall as quickly as markets hoped.

In general, PPI has less immediate market impact than CPI because investors care more about the prices consumers actually pay. However, if PPI comes far above or below expectations, it can still move markets. A higher-than-expected PPI reading may support the dollar and pressure stocks, while a softer reading may reduce inflation concerns.

For companies, rising producer prices can be a problem because they may reduce profit margins. If a company cannot pass higher costs to customers, its earnings may suffer. This is why equity markets can react negatively when producer inflation is strong and persistent.

PPI should not be read in isolation. Traders should compare it with energy prices, wage growth, supply chain conditions and upcoming CPI releases. If several indicators point in the same direction, the signal becomes stronger. But if PPI rises once and then fades, the market may treat it as temporary.

The best way to use PPI is as an early warning indicator. It helps traders understand whether inflation pressure is building beneath the surface. It is not usually the final word on inflation, but it can shape expectations before more important data arrives.
`,
  },
  {
    id: "nfp",
    title: "Nonfarm Payrolls NFP",
    short: "A major report for the US dollar and gold",
    icon: Users,
    level: "Very high impact",
    frequency: "Usually monthly",
    markets: "USD, gold, forex, stocks",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    content: `
The Nonfarm Payrolls report, often called NFP, is one of the most famous economic releases in the world. It shows how many jobs were added or lost in the US economy outside the farming sector. Because the US labor market is central to Federal Reserve policy, NFP can create strong movement in the US dollar, gold, bond yields and major currency pairs.

The headline jobs number is important, but it is not the only thing traders should watch. The report also includes the unemployment rate and average hourly earnings. Wage growth can be just as important as job creation because rising wages may increase inflation pressure. If wages grow too quickly, the Fed may be less willing to cut interest rates.

A strong NFP report can support the dollar because it suggests that the US economy remains resilient. But if the labor market is too strong while inflation remains high, traders may expect interest rates to stay elevated for longer. This can pressure gold and stocks, especially if bond yields rise after the release.

A weak NFP report may suggest that the economy is slowing. In that case, the dollar can weaken if investors expect the Fed to move toward rate cuts. But the interpretation can become complicated if inflation is still sticky. A weak labor market and high inflation together create a difficult environment for central banks.

NFP is known for sharp volatility. Price can move quickly in the first few seconds, then reverse after traders read the details. For this reason, trading immediately at the release can be risky, especially for beginners. Spreads can widen, liquidity can thin, and slippage may occur.

A better approach is to read the full picture: payrolls, unemployment, wages and revisions to previous months. If all parts of the report point in the same direction, the message is clearer. If the numbers are mixed, the market reaction can be choppy and less reliable.

For example, if payrolls beat expectations but unemployment rises and wage growth slows, the report may not be as strong as the headline suggests. But if jobs, unemployment and wages all show strength, the market may view it as a powerful signal that the labor market remains firm.
`,
  },
    {
    id: "unemployment",
    title: "Unemployment Rate",
    short: "A key measure of labor market strength",
    icon: PieChart,
    level: "High impact",
    frequency: "Usually monthly",
    markets: "USD, interest rates, stocks",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    content: `
The unemployment rate measures the percentage of people who are actively looking for work but do not currently have a job. It is one of the clearest indicators of labor market health and is closely watched by traders because it can influence central bank policy, consumer confidence and expectations for economic growth.

A low unemployment rate usually suggests that the labor market is strong. More people are working, household income may be more stable, and consumer spending can remain supported. This can be positive for the economy and may support the currency if it reduces the need for rate cuts.

However, very low unemployment is not always positive for markets. If the labor market becomes too tight, companies may need to raise wages to attract workers. Higher wage growth can add inflation pressure, which may force the central bank to keep interest rates higher for longer. This is why a strong labor market can sometimes pressure stocks and gold.

A rising unemployment rate can signal that the economy is slowing. If unemployment rises while inflation is falling, traders may expect the central bank to cut rates to support growth. This can weaken the currency and support bonds. But if unemployment rises while inflation remains high, the market may face a more difficult situation because the economy is weakening while price pressure remains.

Traders should not read unemployment in isolation. It should be compared with job creation, wage growth and labor force participation. Sometimes unemployment falls because more jobs were created, but sometimes it falls because people leave the labor force and stop looking for work. These two situations have very different meanings.

The unemployment rate is most useful when it confirms a broader trend. If unemployment rises for several months while payroll growth weakens and wages slow, the signal of economic weakness becomes stronger. If unemployment changes slightly for one month but other data remains strong, the market may ignore it.

For traders, the key is to ask whether unemployment changes the outlook for interest rates. If it changes rate expectations, the impact on currencies, gold and stocks can be significant.
`,
  },
  {
    id: "gdp",
    title: "Gross Domestic Product GDP",
    short: "The broadest measure of economic growth",
    icon: BarChart3,
    level: "High impact",
    frequency: "Usually quarterly",
    markets: "Currencies, stocks, oil, bonds",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    content: `
Gross Domestic Product, or GDP, measures the total value of goods and services produced by an economy over a specific period. It is one of the most important indicators for understanding whether an economy is expanding, slowing or moving toward recession.

A stronger-than-expected GDP reading can support a country’s currency because it suggests that the economy is healthy and may attract investment. It can also support stocks if stronger growth means better company earnings. However, the market reaction depends on the inflation environment. If growth is strong while inflation is also high, investors may expect interest rates to stay elevated.

A weaker GDP reading can raise concerns about economic slowdown. If traders believe the central bank will cut rates in response, the currency may weaken. Stocks can also come under pressure if slower growth means lower earnings. Oil may react as well, because weaker economic activity can reduce expectations for energy demand.

GDP is important, but it is not always the fastest-moving indicator. It is often released after much of the economic activity has already happened. This is why traders also watch faster indicators such as PMI, retail sales, employment, inflation and consumer confidence. These reports can provide early clues before GDP is officially released.

When analyzing GDP, traders should ask several questions. Is growth driven by real demand or temporary factors? Is inflation high or falling? Does the labor market support the growth story? Will the central bank see strong GDP as positive, or as a reason to keep rates high?

The trend matters more than one single number. A strong GDP reading after a weak period can improve confidence. But a clear slowdown after several strong quarters can change the market narrative quickly. Traders should compare GDP with previous readings and with expectations.

GDP can be especially important for stock indices, commodity currencies and oil. A strong global growth outlook may support demand for energy and industrial commodities, while weak growth can create pressure on risk assets.
`,
  },
  {
    id: "pmi",
    title: "PMI Index",
    short: "An early signal of business activity",
    icon: Activity,
    level: "Medium to high impact",
    frequency: "Usually monthly",
    markets: "Currencies, stocks, commodities",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop",
    content: `
The Purchasing Managers’ Index, known as PMI, measures business activity in sectors such as manufacturing and services. It is based on surveys of purchasing managers who report on new orders, production, employment, prices and supply chains. Because it is released relatively early, PMI can give traders an early view of economic momentum.

The basic rule is simple: a reading above 50 suggests expansion, while a reading below 50 suggests contraction. But traders do not look only at whether the number is above or below 50. They also look at the direction. If PMI is above 50 but falling month after month, it may suggest that growth is slowing.

Manufacturing PMI is important for economies with a large industrial base, while services PMI can be more important in economies where services make up most of economic activity. In the United States, the United Kingdom and many developed economies, services data can have a major market impact because services represent a large share of GDP.

A strong PMI reading can support the currency and stock market because it suggests that business activity remains healthy. A weak reading may raise concerns about slowdown, especially if new orders and employment are also falling. The prices component inside PMI can also provide clues about inflation pressure.

PMI is useful because it can warn traders before larger economic reports are published. If PMI weakens while GDP slows and employment data deteriorates, the message becomes stronger. But if PMI weakens alone while other indicators remain solid, markets may treat the signal with caution.

For commodities and oil, PMI can matter because it reflects industrial demand and broader economic activity. Strong global PMIs may support demand for energy and raw materials, while weak PMIs may pressure commodity prices.

The best way to use PMI is as part of a broader dashboard. It should be combined with inflation, labor market data, GDP and central bank guidance before forming a trading view.
`,
  },
  {
    id: "retail-sales",
    title: "Retail Sales",
    short: "A key measure of consumer spending",
    icon: ShoppingCart,
    level: "Medium to high impact",
    frequency: "Usually monthly",
    markets: "USD, stocks, growth",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    content: `
Retail sales measure consumer spending on goods and services. This report is important because consumer spending represents a major part of economic activity in many countries, especially the United States. When consumers continue to spend, the economy may remain resilient even if interest rates are high.

A stronger-than-expected retail sales report can support the currency because it suggests that demand remains healthy. It can also support certain stocks, especially companies linked to consumer spending. But in a high-inflation environment, strong spending can be a double-edged sword because it may keep inflation pressure alive and delay rate cuts.

A weak retail sales report may suggest that consumers are under pressure from high prices, high interest rates or weaker confidence. This can increase concerns about economic slowdown. If the market believes weaker spending will lead to easier monetary policy, the currency may weaken and bonds may rise.

Retail sales should be analyzed carefully. Did spending rise because consumers bought more, or because prices were higher? Was the increase broad across many categories, or driven by one sector such as autos? The details matter because they help traders judge whether the consumer is truly strong.

Traders should also compare retail sales with wage growth, inflation and consumer confidence. Strong wages, stable spending and falling inflation can create a positive environment for risk assets. But spending supported by debt or higher prices may not be as healthy as it looks.

For stock traders, retail sales can affect sectors differently. Consumer discretionary stocks may benefit from strong spending, while defensive sectors may perform better when spending weakens. For forex traders, retail sales can influence rate expectations if the central bank is watching demand and inflation closely.

The biggest mistake is assuming that strong retail sales are always bullish. If inflation is already too high, strong demand can make the central bank more cautious and keep rates high for longer.
`,
  },
  {
    id: "oil-inventories",
    title: "Crude Oil Inventories",
    short: "An important report for oil and energy traders",
    icon: Fuel,
    level: "High impact on oil",
    frequency: "Usually weekly",
    markets: "Oil, CAD, energy stocks",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop",
    content: `
Crude oil inventories measure the change in stored oil supplies over a specific period. This report is important for oil traders because it gives insight into the balance between supply and demand. When inventories rise more than expected, it may suggest that supply is greater than demand, which can pressure oil prices.

When inventories fall more than expected, the market may interpret it as a sign of strong demand or tighter supply, which can support oil prices. However, oil does not move based on inventories alone. Prices are also affected by OPEC decisions, US production, geopolitical tensions, refinery activity and the global growth outlook.

Oil inventory data can also influence currencies and stocks. The Canadian dollar may react because Canada is a major energy exporter. Energy companies can move when oil prices change, especially if traders expect higher or lower future demand.

The details inside the report matter. Traders often look not only at crude oil inventories, but also gasoline inventories, distillates and refinery utilization. Sometimes crude inventories rise while gasoline inventories fall, creating a mixed signal. This is why reading only the headline can be misleading.

The market also cares about the trend. A single weekly build or draw may not change the broader outlook, but several weeks in the same direction can influence expectations. A series of inventory draws during a period of strong demand may support prices, while repeated builds may create pressure.

Oil traders should always consider the broader context. Is oil already in a strong uptrend because of geopolitical risk? Is the market worried about recession? Is the US dollar rising? These factors can change how the inventory report is interpreted.

A bullish inventory report may have limited effect if recession fears are dominating the market. A bearish inventory report may not push oil much lower if supply risks are high. Context is everything.
`,
  },

    {
    id: "central-banks",
    title: "Central Bank Meetings",
    short: "Forward guidance can be more important than the rate decision",
    icon: Building2,
    level: "Very high impact",
    frequency: "Based on each central bank schedule",
    markets: "Currencies, gold, stocks, bonds",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    content: `
Central bank meetings are among the most important events in financial markets because they influence interest rates, inflation expectations, liquidity and investor confidence. These meetings do not only affect currencies; they can also move gold, stock indices, bonds and commodities.

Many beginner traders focus only on whether the central bank raised, cut or held interest rates. Professional traders look deeper. They read the statement, listen to the press conference, compare the new guidance with the previous meeting and watch how policymakers describe inflation, growth and employment.

The language of the central bank can be hawkish or dovish. A hawkish tone means policymakers are worried about inflation and may keep rates high for longer. A dovish tone means they are more concerned about economic weakness and may become more open to rate cuts.

Currencies often react quickly because interest rates affect the expected return of holding a currency. Gold reacts through real yields and the US dollar. Stocks react through the cost of financing and expectations for future company earnings.

The most important thing is not only what the central bank did today, but what it suggests about the next meetings. A rate hold can be bullish for a currency if the statement is hawkish. A rate hike can be bearish if the bank signals that the tightening cycle is ending.

Before trading central bank meetings, always ask: what did the market expect, what changed in the statement, and did the press conference confirm or reverse the first reaction?
`,
  },
];

const pageUrl = "https://brokeralarab.com/en/learn-trading/economic-indicators";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://brokeralarab.com/en",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Learn Trading",
      item: "https://brokeralarab.com/en/learn-trading",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Economic Indicators",
      item: pageUrl,
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Economic Indicators and Their Impact on Trading",
  description:
    "A complete guide to the key economic indicators that move forex, gold, stocks and commodities.",
  url: pageUrl,
  inLanguage: "en",
  author: {
    "@type": "Organization",
    name: "Broker Alarab",
    url: "https://brokeralarab.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Broker Alarab",
    url: "https://brokeralarab.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": pageUrl,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are economic indicators in trading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Economic indicators are official data releases that help traders understand inflation, employment, growth, interest rates and economic strength.",
      },
    },
    {
      "@type": "Question",
      name: "Which economic indicator moves markets the most?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Interest rate decisions, CPI inflation, Nonfarm Payrolls and central bank meetings are usually among the most important market-moving indicators.",
      },
    },
    {
      "@type": "Question",
      name: "Should beginners trade during major news releases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most beginners should avoid trading during the first minutes after major economic releases because volatility, wider spreads and sudden reversals can increase risk.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the market sometimes move opposite to the news?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Markets react to expectations. If the result was already priced in, the reaction may be weak or even move in the opposite direction.",
      },
    },
  ],
};

  function SectionHeader({
  badge,
  title,
  desc,
}: {
  badge: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5 sm:px-6">
      <div className="text-center lg:text-left">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
          {badge}
        </span>

        <h2 className="mt-4 text-[24px] font-black leading-[1.22] tracking-[-0.015em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          {title}
        </h2>

        <p className="mt-3 w-full text-left text-[13px] font-semibold leading-8 text-slate-600 sm:text-[15px] sm:leading-8 lg:max-w-[85%]">
          {desc}
        </p>
      </div>
    </div>
  );
}

function IndicatorFullSection({
  item,
  index,
}: {
  item: (typeof indicators)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <article
      id={item.id}
      className="group scroll-mt-28 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
    >
      <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
        <div className="relative min-h-[210px] overflow-hidden bg-slate-100 lg:min-h-full">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/35 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                <Icon className="h-6 w-6" />
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-black text-white backdrop-blur">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="h-6 w-6" />
              </span>

              <div>
                <h2 className="text-[22px] font-black leading-[1.25] text-[#07111f] sm:text-[26px] lg:text-[30px]">
                  {item.title}
                </h2>

                <p className="mt-1 text-[14px] font-semibold text-slate-500">
                  {item.short}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[12px] font-black text-brand-600">
              🔥 {item.level}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-600">
              ⏱ {item.frequency}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-600">
              📈 {item.markets}
            </span>
          </div>

          <div className="relative mt-5">
            <input id={`read-${item.id}`} type="checkbox" className="peer hidden" />

            <div className="max-h-[210px] overflow-hidden text-justify text-[14px] font-medium leading-8 text-slate-700 transition-all duration-300 peer-checked:max-h-[2600px] sm:max-h-[300px] lg:max-h-none lg:overflow-visible lg:text-[16px] lg:font-semibold lg:leading-10">
              {item.content
                .trim()
                .split("\n\n")
                .map((p, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent peer-checked:hidden lg:hidden" />

            <label
              htmlFor={`read-${item.id}`}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-[12px] font-black text-brand-600 shadow-sm transition hover:bg-brand-50 lg:hidden"
            >
              Read more
              <ChevronDown className="h-4 w-4" />
            </label>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EconomicIndicatorsPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
     <Script
  id="economic-indicators-breadcrumb-schema-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>

<Script
  id="economic-indicators-article-schema-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>

<Script
  id="economic-indicators-faq-schema-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
            <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-8 lg:p-8">
              <div className="text-center lg:text-left">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
                  Economic Indicators Guide
                </span>

                <h1 className="mx-auto mt-3 max-w-4xl text-[32px] font-black leading-[1.2] tracking-[-0.015em] text-[#07111f] sm:text-[40px] lg:mx-0 lg:mt-4 lg:max-w-[760px] lg:text-[50px]">
                  Economic Indicators
                  <span className="mt-1 block text-brand-500">
                    and Their Impact on Trading
                  </span>
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-[14px] font-semibold leading-7 text-slate-600 sm:text-[17px] sm:leading-8 lg:mx-0 lg:mt-4 lg:max-w-[760px]">
                  Learn how to read economic data and understand its impact on
                  gold, the US dollar, stocks, currencies and trading decisions.
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {[
                    "📈 10 key indicators",
                    "🧠 Market impact explained",
                    "🌍 Forex, gold and stocks",
                    "📚 Beginner-friendly",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm sm:text-[12px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.055)] lg:block">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[15px] font-black text-[#07111f]">
                    What you will learn
                  </p>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                    Guide
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    "How to read economic news",
                    "Forecast vs actual results",
                    "Impact on gold and currencies",
                    "When to avoid news trading",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-[13px] font-semibold text-slate-700"
                    >
                      <span className="text-brand-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden border-t border-slate-200 bg-white/75 p-3 sm:block sm:p-5">
              <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
                {indicators.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="group min-w-[138px] rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_12px_26px_rgba(15,23,42,0.06)] sm:min-w-0"
                    >
                      <Icon className="mx-auto mb-1.5 h-5 w-5 text-brand-600 transition group-hover:scale-110" />
                      <div className="text-[12px] font-black text-[#07111f]">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                        {item.level}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* INTRO */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="Learn"
      title="What Are Economic Indicators?"
      desc="Economic indicators are official reports released by governments, central banks and statistical agencies. Traders use them to evaluate inflation, employment, growth, consumer spending, manufacturing activity and monetary policy expectations before major market moves happen."
    />

    <div className="grid gap-2.5 p-3 sm:p-5 lg:grid-cols-3">
      {[
        {
          icon: Clock3,
          title: "When are they released?",
          desc: "Some reports are monthly, others are quarterly, while interest rate decisions follow central bank schedules.",
        },
        {
          icon: Flame,
          title: "Why do they move markets?",
          desc: "Markets react to the difference between forecasts and actual results, not just the number itself.",
        },
        {
          icon: LineChart,
          title: "How should traders read them?",
          desc: "Read every report with inflation, rates, employment, risk sentiment and central bank guidance.",
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 sm:rounded-[22px] sm:p-5"
          >
            <div className="mb-2 flex items-center gap-3 sm:mb-4 sm:block">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-[#bfdbfe] sm:mb-4 sm:h-11 sm:w-11">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>

              <h3 className="text-[16px] font-black text-[#07111f] sm:text-[18px]">
                {item.title}
              </h3>
            </div>

            <p className="text-[12.5px] font-semibold leading-6 text-slate-600 sm:mt-2 sm:text-[13px] sm:leading-7">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* INDICATORS */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="Key Reports"
      title="Top 10 Economic Indicators Every Trader Should Know"
      desc="A detailed educational guide to the most important economic indicators that move global markets, including interest rates, CPI, PPI, NFP, unemployment, GDP, PMI, retail sales, oil inventories and central bank meetings."
    />

    <div className="space-y-4 p-3 sm:space-y-5 sm:p-5">
      {indicators.map((item, index) => (
        <IndicatorFullSection key={item.id} item={item} index={index} />
      ))}
    </div>
  </div>
</section>

{/* MARKET IMPACT */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="Market Impact"
      title="How Do Markets React to Economic News?"
      desc="Every market reacts differently. A report may support the US dollar, pressure gold, move stocks, or affect oil depending on expectations, interest rates and investor sentiment."
    />

    <div className="grid gap-2.5 p-3 sm:gap-3 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "US Dollar",
          icon: DollarSign,
          desc: "Moves with interest rate expectations, inflation data and the strength of the US economy.",
          tags: ["Rates", "CPI", "NFP"],
        },
        {
          title: "Gold",
          icon: TrendingUp,
          desc: "Often reacts to real yields, the US dollar and risk sentiment during major data releases.",
          tags: ["Rates", "Inflation", "Risk"],
        },
        {
          title: "Stocks",
          icon: BarChart3,
          desc: "React to growth expectations, financing costs and the outlook for company earnings.",
          tags: ["GDP", "PMI", "Retail"],
        },
        {
          title: "Oil",
          icon: Fuel,
          desc: "Moves with demand expectations, inventories, global growth and energy supply risks.",
          tags: ["Inventories", "GDP", "PMI"],
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 sm:rounded-[22px] sm:p-4"
          >
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-[#bfdbfe] transition group-hover:bg-brand-500 group-hover:text-white sm:h-10 sm:w-10">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="text-[16px] font-black text-[#07111f] sm:text-[18px]">
                  {item.title}
                </h3>
              </div>
            </div>

            <p className="text-[12.5px] font-semibold leading-6 text-slate-600">
              {item.desc}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 transition group-hover:border-brand-100 group-hover:text-brand-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* TRADING RULES */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="Trading Guide"
      title="How to Trade Around Economic News"
      desc="Use economic indicators to understand market context, not as automatic buy or sell signals. A good setup combines the data, market reaction, technical analysis and risk management."
    />

    <div className="grid gap-2.5 p-3 sm:gap-4 sm:p-5 md:grid-cols-3">
      {[
        {
          title: "Before the release",
          desc: "Check the forecast, previous reading and which markets are most likely to react.",
          points: ["Forecast", "Previous", "Market focus"],
        },
        {
          title: "During the release",
          desc: "Compare the actual result with expectations and watch the dollar, yields and liquidity.",
          points: ["Actual", "Dollar", "Yields"],
        },
        {
          title: "After the release",
          desc: "Wait for the market to settle. The first move can be misleading or quickly reversed.",
          points: ["Direction", "Spread", "Liquidity"],
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:rounded-[24px] sm:p-5"
        >
          <div className="mb-2.5 flex items-center gap-3 sm:mb-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[12px] font-black text-brand-600 ring-1 ring-brand-100 sm:h-10 sm:w-10 sm:text-[14px]">
              {index + 1}
            </span>

            <h3 className="text-[16px] font-black text-[#07111f] sm:text-[19px]">
              {item.title}
            </h3>
          </div>

          <p className="text-[12.5px] font-semibold leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
            {item.desc}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {item.points.map((point) => (
              <span
                key={point}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 transition group-hover:border-brand-100 group-hover:text-brand-600 sm:px-3 sm:text-[11px]"
              >
                ✓ {point}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="mx-3 mb-3 rounded-[20px] border border-brand-200 bg-brand-50 p-3 sm:mx-5 sm:mb-5 sm:rounded-[24px] sm:p-5">
      <h3 className="text-[15px] font-black text-[#07111f] sm:text-[18px]">
        Broker Alarab Tip
      </h3>

      <p className="mt-1.5 text-[12.5px] font-semibold leading-6 text-slate-700 sm:mt-2 sm:text-[13px] sm:leading-7">
        Do not enter a trade just because the news is strong. The best trades
        happen when the data, price action and risk management all support the
        same idea.
      </p>
    </div>
  </div>
</section>

{/* COMMON MISTAKES */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="Common Mistakes"
      title="Mistakes Traders Make When Following Economic News"
      desc="The goal is not to react fast. The goal is to understand the context, avoid emotional decisions and wait for a clearer market reaction."
    />

    <div className="grid gap-2.5 p-3 sm:gap-3 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "Trading before the release",
          desc: "Entering without a plan or without knowing the possible scenarios.",
        },
        {
          title: "Watching only the actual number",
          desc: "Ignoring the forecast, previous reading and market expectations.",
        },
        {
          title: "Forgetting spreads",
          desc: "Spreads can widen sharply during major economic releases.",
        },
        {
          title: "Ignoring the bigger picture",
          desc: "The trend in inflation, rates and sentiment matters more than one report.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:rounded-[22px] sm:p-4"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-black text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white sm:h-8 sm:w-8 sm:text-[12px]">
              {index + 1}
            </span>

            <h3 className="text-[15px] font-black text-[#07111f] sm:text-[16px]">
              {item.title}
            </h3>
          </div>

          <p className="text-[12px] font-semibold leading-6 text-slate-600">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* FAQ */}
<section className="mx-auto max-w-7xl px-3 py-3 pb-4 sm:px-6 sm:py-4 sm:pb-6 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <SectionHeader
      badge="FAQ"
      title="Frequently Asked Questions About Economic Indicators"
      desc="Simple answers to help traders understand economic news and connect it with market movement."
    />

    <div className="space-y-3 p-4 sm:p-5">
      {[
        [
          "What are economic indicators in trading?",
          "They are official data releases that help traders understand inflation, employment, growth, interest rates and economic strength.",
        ],
        [
          "Which economic indicator moves markets the most?",
          "Interest rate decisions, CPI inflation, NFP and central bank meetings are usually among the most important.",
        ],
        [
          "Should beginners trade during major news releases?",
          "Usually no. The first minutes can be volatile, spreads may widen and price can reverse quickly.",
        ],
        [
          "Why does the market sometimes move opposite to the news?",
          "Because markets react to expectations. If the result was already priced in, the reaction may be weak or even opposite.",
        ],
      ].map(([q, a]) => (
        <details
          key={q}
          className="group rounded-[22px] border border-slate-200 bg-[#fbfdff] p-5 transition open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-[#07111f]">
            {q}
            <ChevronDown className="h-5 w-5 shrink-0 text-brand-500 transition group-open:rotate-180" />
          </summary>

          <p className="mt-3 text-[13px] font-semibold leading-7 text-slate-600">
            {a}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>
{/* RELATED GUIDES */}
<section className="mx-auto max-w-7xl px-3 py-3 pb-6 sm:px-6 sm:py-4 sm:pb-8 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="Related Guides"
      title="Continue Learning About Trading News"
      desc="Explore more educational guides that help you connect economic data with forex, gold, brokers and market decisions."
    />

    <div className="grid gap-3 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "Best Forex Brokers",
          desc: "Compare trusted forex brokers for trading currencies, gold and global markets.",
          href: "/en/best-brokers",
        },
        {
          title: "Gold Brokers",
          desc: "Find brokers suitable for trading gold and precious metals.",
          href: "/en/best-brokers/gold",
        },
        {
          title: "Forex Calculators",
          desc: "Use trading tools to calculate risk, margin, pip value and position size.",
          href: "/en/tools",
        },
        {
          title: "Broker Reviews",
          desc: "Read detailed broker reviews before choosing a trading platform.",
          href: "/en/brokers",
        },
      ].map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="group rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
        >
          <h3 className="text-[16px] font-black text-[#07111f] transition group-hover:text-brand-600">
            {item.title}
          </h3>

          <p className="mt-2 text-[12.5px] font-semibold leading-6 text-slate-600">
            {item.desc}
          </p>

          <span className="mt-3 inline-flex text-[12px] font-black text-brand-600">
            Read more →
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}