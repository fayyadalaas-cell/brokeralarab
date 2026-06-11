import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function formatDate(date?: string | null) {
  if (!date) return "سيتم الإعلان لاحقاً";
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("ar", {
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

function htmlStyle(extra = "") {
  return `
    mt-5 text-[14px] leading-8 text-slate-700 md:text-[15px] md:leading-8
    [&_p]:mb-4 [&_p]:leading-8
    [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-950
    [&_h3]:mt-6 [&_h3]:rounded-2xl [&_h3]:bg-slate-50 [&_h3]:px-4 [&_h3]:py-3 [&_h3]:text-[16px] [&_h3]:font-black [&_h3]:text-slate-950
    [&_ul]:mt-5 [&_ul]:grid [&_ul]:grid-cols-1 [&_ul]:gap-3 sm:[&_ul]:grid-cols-2 lg:[&_ul]:grid-cols-3
    [&_li]:list-none [&_li]:rounded-2xl [&_li]:border [&_li]:border-slate-200 [&_li]:bg-white [&_li]:px-4 [&_li]:py-3 [&_li]:text-center [&_li]:text-sm [&_li]:font-black [&_li]:text-slate-800 [&_li]:shadow-sm
    ${extra}
  `;
}

function ContentSection({
  title,
  html,
  badge,
  blue = false,
}: {
  title: string;
  html?: string | null;
  badge?: string;
  blue?: boolean;
}) {
  if (!html) return null;

  return (
    <section
      className={`overflow-hidden rounded-[28px] border shadow-[0_14px_40px_rgba(15,23,42,0.045)] ${
        blue ? "border-blue-100 bg-blue-50/40" : "border-slate-200 bg-white"
      }`}
    >
      <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[22px] font-black leading-8 text-slate-950 md:text-[26px]">
            {title}
          </h2>

          {badge && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700 shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div
        className={htmlStyle(
          `px-5 py-5 md:px-7 md:py-6 ${
            blue ? "[&_h3]:bg-white [&_li]:bg-white" : ""
          }`
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
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

  const countdown = getCountdown(event.start_date);
  const gallery = event.gallery_images || [];

  const eventStats = [
    [event.stat_1_value || "30,000+", event.stat_1_label || "مشارك"],
    [event.stat_2_value || "240+", event.stat_2_label || "عارض وراعٍ"],
    [event.stat_3_value || "140+", event.stat_3_label || "متحدث"],
    [event.stat_4_value || "50+", event.stat_4_label || "دولة"],
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="mb-4 inline-flex text-sm font-black text-blue-700 hover:text-blue-800"
        >
          ← العودة إلى المعارض
        </Link>

        <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          {/* HERO */}
          <div className="bg-gradient-to-b from-blue-50 via-white to-white px-5 py-8 text-center md:px-10 md:py-12">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-black text-blue-700 shadow-sm md:text-sm">
                {event.category || "معرض مالي"}
              </span>

              {event.is_media_partner && (
                <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-700 md:text-sm">
                  شريك إعلامي
                </span>
              )}
            </div>

            <h1 className="mx-auto mt-5 max-w-5xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              {event.title_ar}
            </h1>

            <p className="mx-auto mt-4 max-w-4xl text-sm leading-8 text-slate-600 md:text-lg">
              {event.excerpt_ar || "تابع تفاصيل هذا الحدث عبر Broker Al Arab."}
            </p>

            {countdown && (
              <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  ["الأيام", countdown.days],
                  ["الساعات", countdown.hours],
                  ["الدقائق", countdown.minutes],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-blue-100 bg-white p-4 shadow-[0_12px_30px_rgba(37,99,235,0.10)] md:p-5"
                  >
                    <div className="text-3xl font-black text-blue-700 md:text-5xl">
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

          {/* IMAGE */}
          {event.hero_image && (
            <div className="px-4 pt-2 md:px-8">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950">
                <Image
                  src={event.hero_image}
                  alt={event.title_ar}
                  width={1600}
                  height={900}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="px-4 pt-5 md:px-8">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {eventStats.map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 text-center shadow-sm"
                >
                  <div className="text-2xl font-black text-blue-700">{num}</div>
                  <div className="mt-1 text-sm font-bold text-slate-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK INFO FULL WIDTH */}
          <div className="px-4 pt-5 md:px-8">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-4">
                <h2 className="text-xl font-black text-slate-950">
                  معلومات الحدث
                </h2>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  📅 البداية: {formatDate(event.start_date)}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  📅 النهاية: {formatDate(event.end_date)}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  📍 {event.city_ar}
                  {event.country_ar ? `، ${event.country_ar}` : ""}
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  🏢 {event.venue_ar || event.venue_en}
                </div>

                {event.official_url && (
                  <a
                    href={event.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700"
                  >
                    زيارة موقع الحدث
                  </a>
                )}
              </div>

              {event.is_media_partner && (
                <div className="mx-4 mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-sm font-bold leading-7 text-slate-700">
                  <strong className="text-emerald-700">Broker Al Arab</strong>{" "}
                  شريك إعلامي لهذا الحدث ويتابع أبرز الأخبار والتحديثات المتعلقة به.
                </div>
              )}
            </div>
          </div>

          {/* CONTENT FULL WIDTH */}
          <div className="space-y-6 p-4 md:p-8">
            <ContentSection
              title="نبذة عن الحدث"
              html={
                event.content_ar ||
                "<p>سيتم إضافة تفاصيل الحدث والتغطية الكاملة قريباً.</p>"
              }
            />

            <ContentSection title="من سيحضر المعرض؟" html={event.attendees_html} />

            <ContentSection
              title="ماذا سيكتشف الزوار؟"
              html={event.highlights_html}
            />

            <ContentSection
              title="أبرز الرعاة والشركات المشاركة"
              html={event.sponsors_html}
            />

            <ContentSection title="مكان إقامة المعرض" html={event.venue_html} />

            <ContentSection
              title="آخر تحديث من الجهة المنظمة"
              badge="بيان صحفي"
              html={event.press_release_ar}
              blue
            />

            <ContentSection title="الأسئلة الشائعة" html={event.faq_html} />

            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.045)]">
              <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-4 md:px-7">
                <h2 className="text-[22px] font-black text-slate-950 md:text-[26px]">
                  لماذا يهم هذا الحدث؟
                </h2>
              </div>

              <div className="grid gap-3 p-5 md:grid-cols-3 md:p-7">
                {[
                  [
                    "بناء العلاقات",
                    "فرصة للتواصل مع شركات الوساطة والتكنولوجيا المالية.",
                  ],
                  [
                    "متابعة السوق",
                    "التعرف على اتجاهات قطاع التداول والخدمات المالية.",
                  ],
                  [
                    "تغطية إعلامية",
                    "متابعة أهم الأخبار والتحديثات عبر Broker Al Arab.",
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
            </section>

            {gallery.length > 0 && (
              <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.045)]">
                <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-4 md:px-7">
                  <h2 className="text-[22px] font-black text-slate-950 md:text-[26px]">
                    صور من الحدث
                  </h2>
                </div>

                <div className="grid gap-3 p-5 md:grid-cols-2 md:p-7">
                  {gallery.map((image: string, index: number) => (
                    <div
                      key={image}
                      className="relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >
                      <Image
                        src={image}
                        alt={`${event.title_ar} - صورة ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}