import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "معارض ومؤتمرات الفوركس في 2026",
  description:
    "تابع أهم معارض ومؤتمرات الفوركس والتكنولوجيا المالية في 2026، مع مواعيد الفعاليات، أماكنها، وأهميتها للمتداولين وشركات الوساطة.",
};

function formatDate(date?: string | null) {
  if (!date) return "سيتم الإعلان لاحقاً";

  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getDateRange(start?: string | null, end?: string | null) {
  if (!start) return "سيتم الإعلان لاحقاً";
  if (!end || end === start) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });

  const eventList = events || [];

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-5 py-10 text-center md:px-10 md:py-14">
            <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-blue-700 shadow-sm">
              معارض ومؤتمرات التداول
            </span>

            <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              أهم معارض ومؤتمرات الفوركس في 2026
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
              دليل متجدد لأبرز فعاليات الفوركس والتكنولوجيا المالية في المنطقة،
              مع معلومات عن المواعيد، المدن، أماكن الانعقاد، والشراكات الإعلامية.
            </p>
          </div>

          <div className="p-4 md:p-7">
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                حدث خطأ في جلب بيانات الأحداث.
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {eventList.map((event) => (
                <article
                  key={event.id}
                 className="group flex min-h-[320px] flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                >
                 

                 <h2 className="text-center text-2xl font-black leading-8 text-slate-950">
                    {event.title_ar}
                  </h2>

                  <p className="mt-3 min-h-[72px] text-center text-sm leading-7 text-slate-600">
                    {event.excerpt_ar || "تفاصيل الحدث سيتم تحديثها قريباً."}
                  </p>

                  <div className="mt-5 space-y-2 text-sm font-bold text-slate-700">
                    <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
                      📅 {getDateRange(event.start_date, event.end_date)}
                    </div>
                    <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
                      📍 {event.city_ar}
                      {event.country_ar ? `، ${event.country_ar}` : ""}
                    </div>
                    <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
                      🏢 {event.venue_ar || event.venue_en || "سيتم الإعلان لاحقاً"}
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/events/${event.slug}`}
                      className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      عرض تفاصيل الحدث
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 md:p-7">
                <h2 className="text-2xl font-black text-slate-950">
                  لماذا نهتم بمعارض الفوركس والتكنولوجيا المالية؟
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
                  معارض الفوركس لم تعد مجرد فعاليات ترويجية، بل أصبحت مكاناً
                  تلتقي فيه شركات الوساطة، مزودو السيولة، شركات الدفع، منصات
                  التداول، مزودو التكنولوجيا المالية، والمسوقون بالعمولة. لذلك
                  تساعد هذه الفعاليات المتداولين والشركات على متابعة اتجاهات
                  السوق، التعرف على المنتجات الجديدة، وبناء علاقات مباشرة داخل
                  قطاع التداول.
                </p>
              </div>

              <div className="rounded-[26px] border border-blue-100 bg-blue-50 p-5 md:p-7">
                <h2 className="text-2xl font-black text-slate-950">
                  تغطية Broker Al Arab
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
                  نتابع أهم المؤتمرات والمعارض المالية التي تهم المتداول العربي،
                  مع التركيز على الشركات المشاركة، فرص الشراكات، أخبار الوسطاء،
                  وأبرز الفعاليات التي تجمع قطاع الفوركس والفنتك في المنطقة.
                </p>
              </div>
            </section>

            <section className="mt-5 rounded-[26px] border border-slate-200 bg-white p-5 md:p-7">
              <h2 className="text-2xl font-black text-slate-950">
                ماذا ستجد في صفحات الأحداث؟
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {[
                  ["الموعد والمكان", "تفاصيل التاريخ، المدينة، ومركز انعقاد الحدث."],
                  ["الشركات المشاركة", "متابعة أبرز الوسطاء والرعاة والعارضين."],
                  ["تغطيات إعلامية", "بيانات صحفية وتحديثات من الجهات المنظمة."],
                  ["فرص للمتداولين", "أحداث تعليمية وتواصل مباشر مع الشركات."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}