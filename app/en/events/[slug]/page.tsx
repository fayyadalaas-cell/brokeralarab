import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function formatDate(date?: string | null) {
  if (!date) return "To be announced";

  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getCountdown(startDate?: string | null) {
  if (!startDate) return null;

  const [year, month, day] = startDate.split("-").map(Number);
  const eventDate = new Date(year, month - 1, day, 9, 0, 0);
  const diff = eventDate.getTime() - new Date().getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function extractListItems(html?: string | null) {
  if (!html) return [];
  const matches = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return matches.map((m) => stripTags(m[1])).filter(Boolean);
}

function extractFaq(html?: string | null) {
  if (!html) return [];
  const matches = [
    ...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi),
  ];

  return matches
    .map((m) => ({
      q: stripTags(m[1]),
      a: stripTags(m[2]),
    }))
    .filter((item) => item.q && item.a);
}

function htmlStyle(extra = "") {
  return `
    text-[14px] leading-8 text-slate-700 md:text-[15px] md:leading-8
    [&_p]:mb-4 [&_p]:leading-8
    [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-950
    [&_h3]:mt-5 [&_h3]:rounded-2xl [&_h3]:bg-slate-50 [&_h3]:px-4 [&_h3]:py-3 [&_h3]:text-[16px] [&_h3]:font-black [&_h3]:text-slate-950
    [&_ul]:mt-5 [&_ul]:grid [&_ul]:grid-cols-1 [&_ul]:gap-3 sm:[&_ul]:grid-cols-2 lg:[&_ul]:grid-cols-4
    [&_li]:list-none [&_li]:rounded-2xl [&_li]:border [&_li]:border-slate-200 [&_li]:bg-white [&_li]:px-4 [&_li]:py-3 [&_li]:text-center [&_li]:text-sm [&_li]:font-black [&_li]:text-slate-800 [&_li]:shadow-sm
    ${extra}
  `;
}

function SectionShell({
  title,
  badge,
  children,
}: {
  title: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.045)]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[21px] font-black leading-8 text-slate-950 md:text-[26px]">
            {title}
          </h2>

          {badge && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-brand-600 shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 md:p-7">{children}</div>
    </section>
  );
}

function ContentSection({
  title,
  html,
  badge,
}: {
  title: string;
  html?: string | null;
  badge?: string;
}) {
  if (!html) return null;

  return (
    <SectionShell title={title} badge={badge}>
      <div className={htmlStyle()} dangerouslySetInnerHTML={{ __html: html }} />
    </SectionShell>
  );
}

function SponsorsSection({ html }: { html?: string | null }) {
  if (!html) return null;

  const sponsors = extractListItems(html);
  const intro = html.replace(/<ul[\s\S]*?<\/ul>/gi, "").trim();

  if (sponsors.length === 0) {
    return <ContentSection title="Featured Sponsors and Participants" html={html} />;
  }

  const firstSponsors = sponsors.slice(0, 8);
  const restSponsors = sponsors.slice(8);

  return (
    <SectionShell title="Featured Sponsors and Participants">
      {intro && (
        <div className={htmlStyle("mb-5")} dangerouslySetInnerHTML={{ __html: intro }} />
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
        {firstSponsors.map((name) => (
          <div
            key={name}
            className="rounded-full border border-brand-100 bg-brand-50 px-4 py-3 text-center text-sm font-black text-slate-900 shadow-sm"
          >
            {name}
          </div>
        ))}
      </div>

      {restSponsors.length > 0 && (
        <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <summary className="cursor-pointer list-none text-center text-sm font-black text-brand-600">
            View all participating companies
          </summary>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {restSponsors.map((name) => (
              <div
                key={name}
                className="rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-800 shadow-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </details>
      )}
    </SectionShell>
  );
}

function FaqSection({ html }: { html?: string | null }) {
  if (!html) return null;

  const faqs = extractFaq(html);

  if (faqs.length === 0) {
    return <ContentSection title="Frequently Asked Questions" html={html} />;
  }

  return (
    <SectionShell title="Frequently Asked Questions">
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.q}
            open={index === 0}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-black text-slate-950 md:text-base">
              <span>{faq.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-3 text-sm leading-8 text-slate-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("title_en, excerpt_en, meta_title_en, meta_description_en")
    .eq("slug", slug)
    .single();

  if (!event) {
    return {
      title: "Forex and FinTech Events | Broker Alarab",
      description:
        "Follow major forex, trading and fintech events through Broker Alarab.",
    };
  }

  return {
    title: event.meta_title_en || event.title_en,
    description: event.meta_description_en || event.excerpt_en || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!event) notFound();

  const { data: relatedEvents } = await supabase
    .from("events")
    .select("id, slug, title_en, start_date, city_en, country_en")
    .neq("slug", slug)
    .not("title_en", "is", null)
    .order("start_date", { ascending: true })
    .limit(3);

  const countdown = getCountdown(event.start_date);
  const gallery = event.gallery_images || [];

  const pressReleases = [
  {
    content: event.press_release_en,
    title: event.press_release_title_en,
    image: event.press_release_image,
    date: event.press_release_date,
  },
  {
    content: event.press_release_2_en,
    title: event.press_release_2_title_en,
    image: event.press_release_2_image,
    date: event.press_release_2_date,
  },
  {
    content: event.press_release_3_en,
    title: event.press_release_3_title_en,
    image: event.press_release_3_image,
    date: event.press_release_3_date,
  },
]
  .filter((release) => release.content)
  .sort((a, b) => {
    const firstDate = a.date
      ? new Date(`${a.date}T00:00:00`).getTime()
      : 0;

    const secondDate = b.date
      ? new Date(`${b.date}T00:00:00`).getTime()
      : 0;

    return secondDate - firstDate;
  });

  const eventStats = [
    [event.stat_1_value || "30,000+", event.stat_1_label_en || "Attendees"],
    [event.stat_2_value || "240+", event.stat_2_label_en || "Exhibitors"],
    [event.stat_3_value || "140+", event.stat_3_label_en || "Speakers"],
    [event.stat_4_value || "50+", event.stat_4_label_en || "Countries"],
  ];

  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/en/events"
          className="mb-4 inline-flex text-sm font-black text-brand-600 hover:text-blue-800"
        >
          ← Back to events
        </Link>

        <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <div className="bg-gradient-to-b from-blue-50 via-white to-white px-5 py-8 text-center md:px-10 md:py-12">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-black text-brand-600 shadow-sm md:text-sm">
                {event.category || "Financial Event"}
              </span>

              {event.is_media_partner && (
                <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-700 md:text-sm">
                  Media Partner
                </span>
              )}
            </div>

            <h1 className="mx-auto mt-5 max-w-5xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              {event.title_en || event.title_ar}
            </h1>

            <p className="mx-auto mt-4 max-w-4xl text-sm leading-8 text-slate-600 md:text-lg">
              {event.excerpt_en || "Follow this event through Broker Alarab."}
            </p>

            {countdown && (
              <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  ["Days", countdown.days],
                  ["Hours", countdown.hours],
                  ["Minutes", countdown.minutes],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-brand-100 bg-white p-4 shadow-[0_12px_30px_rgba(37,99,235,0.10)] md:p-5"
                  >
                    <div className="text-3xl font-black text-brand-600 md:text-5xl">
                      {value}
                    </div>
                    <div className="mt-1 text-xs font-black text-slate-600 md:text-sm">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {event.hero_image && (
            <div className="px-4 pt-2 md:px-8">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950">
                <Image
                  src={event.hero_image}
                  alt={event.title_en || event.title_ar}
                  width={1600}
                  height={900}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          )}

          <div className="px-4 pt-5 md:px-8">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {eventStats.map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 text-center shadow-sm"
                >
                  <div className="text-2xl font-black text-brand-600">{num}</div>
                  <div className="mt-1 text-sm font-bold text-slate-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 pt-5 md:px-8">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-4">
                <h2 className="text-xl font-black text-slate-950">
                  Event Information
                </h2>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  📅 Start: {formatDate(event.start_date)}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  📅 End: {formatDate(event.end_date)}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  📍 {event.city_en}
                  {event.country_en ? `, ${event.country_en}` : ""}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  🏢 {event.venue_en || event.venue_ar}
                </div>

                {event.official_url && (
                  <a
                    href={event.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-black text-white hover:bg-brand-600"
                  >
                    Visit Event Website
                  </a>
                )}
              </div>

              {event.is_media_partner && (
                <div className="mx-4 mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-sm font-bold leading-7 text-slate-700">
                  <strong className="text-emerald-700">Broker Alarab</strong>{" "}
                  is a media partner for this event and follows key updates and announcements.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 p-4 md:p-8">
            <ContentSection
              title="Event Overview"
              html={
                event.content_en ||
                "<p>Full event details and coverage will be added soon.</p>"
              }
            />

            <ContentSection title="Who Will Attend?" html={event.attendees_html_en} />

            <ContentSection
              title="What Will Visitors Discover?"
              html={event.highlights_html_en}
            />

            <SponsorsSection html={event.sponsors_html_en} />

            <ContentSection title="Event Venue" html={event.venue_html_en} />

           {pressReleases.length > 0 && (
  <SectionShell
    title="Latest Updates from the Organizer"
    badge={`${pressReleases.length} ${
      pressReleases.length === 1 ? "Press Release" : "Press Releases"
    }`}
  >
    <div className="space-y-5">
      {pressReleases.map((release, index) => (
        <article
          key={`${release.date || "press-release"}-${index}`}
          className={`rounded-[24px] bg-white p-4 md:border md:border-slate-200 md:p-6 md:shadow-sm ${
            index > 0 ? "border-t border-slate-200 pt-6" : ""
          }`}
        >
          {index === 0 && (
            <div className="mb-4 flex justify-start">
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-700">
                Latest Update
              </span>
            </div>
          )}

          {release.image && (
            <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
              <Image
                src={release.image}
                alt={release.title || "Press Release"}
                width={1400}
                height={735}
                className="h-auto w-full object-contain"
              />
            </div>
          )}

          <div className="mt-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-600 px-4 py-1.5 text-xs font-black text-white">
                Press Release
              </span>

              {release.date && (
                <span className="rounded-full bg-slate-50 px-4 py-1.5 text-xs font-black text-slate-600">
                  {formatDate(release.date)}
                </span>
              )}
            </div>

            {release.title && (
              <h2 className="text-[17px] font-black leading-8 text-slate-950 sm:text-[20px] md:text-left md:text-3xl md:leading-[1.45]">
                {release.title}
              </h2>
            )}

            <div
              className="mt-5 hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-8 text-slate-700 md:block [&_p]:mb-4 [&_strong]:font-normal [&_strong]:text-slate-700"
              dangerouslySetInnerHTML={{
                __html: release.content,
              }}
            />

            <details className="mt-5 md:hidden" open={index === 0}>
              <summary className="cursor-pointer list-none rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-center text-sm font-black text-brand-700">
                {index === 0
                  ? "Read the latest press release"
                  : "Read the full press release"}
              </summary>

              <div
                className="mt-5 text-[13px] leading-8 text-slate-700 [&_p]:mb-4 [&_strong]:font-normal [&_strong]:text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: release.content,
                }}
              />
            </details>
          </div>
        </article>
      ))}
    </div>
  </SectionShell>
)}

            <FaqSection html={event.faq_html_en} />

            <SectionShell title="Why This Event Matters">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  [
                    "Business Networking",
                    "A direct opportunity to meet brokers, fintech providers and financial service companies.",
                  ],
                  [
                    "Market Insight",
                    "A useful way to follow trends in online trading, fintech and financial services.",
                  ],
                  [
                    "Brand Exposure",
                    "An event format that helps companies build visibility and connect with relevant audiences.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center"
                  >
                    <h3 className="font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            {relatedEvents && relatedEvents.length > 0 && (
              <SectionShell title="Other Events You May Be Interested In">
                <div className="grid gap-3 md:grid-cols-3">
                  {relatedEvents.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/en/events/${item.slug}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-brand-100 hover:bg-white hover:shadow-md"
                    >
                      <h3 className="text-lg font-black text-slate-950">
                        {item.title_en}
                      </h3>

                      <p className="mt-3 text-sm font-bold text-slate-600">
                        📅 {formatDate(item.start_date)}
                      </p>

                      <p className="mt-2 text-sm font-bold text-slate-600">
                        📍 {item.city_en}
                        {item.country_en ? `, ${item.country_en}` : ""}
                      </p>

                      <div className="mt-4 text-sm font-black text-brand-600">
                        View Details →
                      </div>
                    </Link>
                  ))}
                </div>
              </SectionShell>
            )}

            {gallery.length > 0 && (
              <SectionShell title="Event Gallery">
                <div className="grid gap-3 md:grid-cols-2">
                  {gallery.map((image: string, index: number) => (
                    <div
                      key={image}
                      className="relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >
                      <Image
                        src={image}
                        alt={`${event.title_en || event.title_ar} - image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </SectionShell>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}