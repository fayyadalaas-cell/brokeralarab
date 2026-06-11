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

const eventStats = [
  ["30,000+", "مشارك"],
  ["240+", "عارض وراعٍ"],
  ["140+", "متحدث"],
  ["50+", "دولة"],
];

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

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="mb-4 inline-flex text-sm font-bold text-blue-700 hover:text-blue-800"
        >
          ← العودة إلى المعارض
        </Link>

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
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

            <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              {event.title_ar}
            </h1>

            <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
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
                    className="rounded-[22px] border border-blue-100 bg-white p-4 shadow-[0_12px_30px_rgba(37,99,235,0.10)] md:p-5"
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

          {event.hero_image && (
            <div className="px-4 pt-2 md:px-8">
              <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-slate-950">
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

          <div className="px-4 pt-6 md:px-8">
            <div className="grid gap-3 md:grid-cols-4">
              {eventStats.map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                >
                  <div className="text-2xl font-black text-blue-700">{num}</div>
                  <div className="mt-1 text-sm font-bold text-slate-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 p-4 md:grid-cols-[1fr_340px] md:p-8">
            <aside className="order-1 h-fit rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:order-2 md:sticky md:top-24">
              <h2 className="text-lg font-black text-slate-950">
                معلومات الحدث
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <p>📅 البداية: {formatDate(event.start_date)}</p>
                <p>📅 النهاية: {formatDate(event.end_date)}</p>
                <p>
                  📍 الموقع: {event.city_ar}
                  {event.country_ar ? `، ${event.country_ar}` : ""}
                </p>
                <p>🏢 المكان: {event.venue_ar || event.venue_en}</p>
                {event.organizer && <p>🏷 المنظم: {event.organizer}</p>}
              </div>

              {event.is_media_partner && (
                <div className="mt-5 rounded-2xl border border-emerald-100 bg-white p-4 text-sm leading-7 text-slate-700">
                  <strong className="text-emerald-700">Broker Al Arab</strong>{" "}
                  شريك إعلامي لهذا الحدث، وسيتابع أبرز الأخبار والتحديثات
                  المتعلقة بالمعرض.
                </div>
              )}

              {event.official_url && (
                <a
                  href={event.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700"
                >
                  زيارة موقع الحدث
                </a>
              )}

              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-800 hover:bg-slate-100"
              >
                تواصل معنا للتغطية
              </Link>
            </aside>

            <div className="order-2 space-y-6 md:order-1">
              <article className="rounded-[24px] border border-slate-200 bg-white p-5 md:p-7">
                <h2 className="text-2xl font-black text-slate-950">
                  نبذة عن الحدث
                </h2>

                <div
                  className="mt-5 space-y-5 text-[15px] leading-8 text-slate-700 md:text-base
                  [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-950
                  [&_p]:leading-8 [&_ul]:grid [&_ul]:gap-2 [&_ul]:rounded-2xl [&_ul]:bg-slate-50 [&_ul]:p-5
                  [&_li]:list-none [&_li]:rounded-xl [&_li]:bg-white [&_li]:px-4 [&_li]:py-2 [&_li]:font-bold [&_li]:text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      event.content_ar ||
                      "<p>سيتم إضافة تفاصيل الحدث والتغطية الكاملة قريباً.</p>",
                  }}
                />
              </article>

              {event.press_release_ar && (
                <article className="rounded-[24px] border border-blue-100 bg-blue-50/40 p-5 md:p-7">
                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700">
                    بيان صحفي
                  </span>

                  <h2 className="mt-3 text-2xl font-black text-slate-950">
                    آخر تحديث من الجهة المنظمة
                  </h2>

                  <div
                    className="mt-5 space-y-5 text-[15px] leading-8 text-slate-700 md:text-base
                    [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-950
                    [&_ul]:grid [&_ul]:gap-2 [&_ul]:rounded-2xl [&_ul]:bg-white [&_ul]:p-5
                    [&_li]:list-none [&_li]:rounded-xl [&_li]:bg-blue-50 [&_li]:px-4 [&_li]:py-2 [&_li]:font-bold"
                    dangerouslySetInnerHTML={{ __html: event.press_release_ar }}
                  />
                </article>
              )}

              <article className="rounded-[24px] border border-slate-200 bg-white p-5 md:p-7">
                <h2 className="text-2xl font-black text-slate-950">
                  لماذا يهم هذا الحدث؟
                </h2>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
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
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <h3 className="font-black text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {gallery.length > 0 && (
                <article className="rounded-[24px] border border-slate-200 bg-white p-5 md:p-7">
                  <h2 className="text-2xl font-black text-slate-950">
                    صور من الحدث
                  </h2>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {gallery.map((image: string, index: number) => (
                      <div
                        key={image}
                        className="relative h-52 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
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
                </article>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}