import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "عن بروكر العرب | من نحن وكيف نقيّم شركات التداول",
  description:
    "تعرف على موقع بروكر العرب، منهجية تقييم شركات التداول، أهداف الموقع، وإخلاء المسؤولية قبل استخدام أي مراجعة أو مقارنة منشورة.",
  alternates: {
    canonical: "https://brokeralarab.com/about",
    languages: {
      ar: "https://brokeralarab.com/about",
      en: "https://brokeralarab.com/en/about",
      "x-default": "https://brokeralarab.com/en/about",
    },
  },
  openGraph: {
    title: "عن بروكر العرب | من نحن وكيف نقيّم شركات التداول",
    description:
      "تعرف على موقع بروكر العرب، منهجية تقييم شركات التداول، أهداف الموقع، وإخلاء المسؤولية المهم قبل استخدام أي مراجعة أو مقارنة منشورة.",
    url: "https://brokeralarab.com/about",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

/* الأقسام الظاهرة دائمًا */
function Section({ title, children }: SectionProps) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[32px]">
      <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-white px-4 py-4 sm:px-7 sm:py-5 md:px-8">
        <h2 className="text-[25px] font-black leading-[1.2] text-slate-950 sm:text-[27px]">
          {title}
        </h2>
      </div>

      <div className="px-4 py-5 sm:px-7 sm:py-6 md:px-8">
        <div className="max-w-[1260px] space-y-4 text-[15px] font-medium leading-8 text-slate-700 sm:space-y-5 sm:text-[16px] sm:leading-9">
          {children}
        </div>
      </div>
    </section>
  );
}

/* الأقسام الطويلة: Accordion على الموبايل، ومفتوحة على الديسكتوب */
function ResponsiveTextSection({ title, children }: SectionProps) {
  return (
    <>
      {/* MOBILE */}
      <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] sm:rounded-[32px]">
<summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-white px-4 py-3.5 text-right sm:hidden">
  <h2 className="text-[17px] font-black leading-6 text-slate-950">
    {title}
  </h2>

  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8fbff] text-[11px] font-black text-brand-600 transition duration-300 group-open:rotate-180">
    ▼
  </span>
</summary>

        <div className="border-t border-slate-100 px-4 py-5">
          <div className="space-y-4 text-[15px] font-medium leading-8 text-slate-700">
            {children}
          </div>
        </div>
      </details>

      {/* TABLET / DESKTOP */}
      <section className="hidden overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:block">
        <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-white px-7 py-5 md:px-8">
          <h2 className="text-[27px] font-black leading-[1.25] text-slate-950">
            {title}
          </h2>
        </div>

        <div className="px-7 py-6 md:px-8">
          <div className="max-w-[1260px] space-y-5 text-[16px] font-medium leading-9 text-slate-700">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

type InfoCardItem = {
  title: string;
  text: string;
  icon: string;
};

function InfoCards({ items }: { items: InfoCardItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
      {items.map((item) => {
        const hideOnMobile =
          item.title === "الشفافية وتحديث البيانات";

        return (
          <div
            key={item.title}
            className={`group min-h-[132px] rounded-[18px] border border-slate-200 bg-[#fbfdff] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:min-h-[145px] sm:rounded-[22px] sm:p-5 ${
              hideOnMobile ? "hidden sm:block" : "block"
            }`}
          >
           {/* MOBILE */}
<div className="flex h-full flex-col items-center justify-center text-center sm:hidden">
  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-[17px] shadow-sm">
    {item.icon}
  </span>

  <h3 className="mt-3 text-[14px] font-black leading-5 text-slate-950">
    {item.title}
  </h3>
</div>

            {/* TABLET / DESKTOP */}
            <div className="hidden items-start gap-3 sm:flex">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-[18px] shadow-sm">
                {item.icon}
              </span>

              <div className="min-w-0">
                <h3 className="text-[16px] font-black leading-6 text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:mb-8 sm:rounded-[32px]">
          <div className="bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:text-[12px]">
              من نحن
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:text-[44px] lg:text-[52px]">
              عن بروكر العرب
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              بروكر العرب موقع متخصص في مراجعات شركات التداول والمقارنة بين
              الوسطاء، لمساعدة المستخدم على فهم التراخيص والرسوم والحسابات قبل
              اتخاذ قراره.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-5 hidden max-w-[1180px] text-[18px] font-medium leading-10 text-slate-600 sm:block">
              بروكر العرب موقع متخصص في مراجعات وتقييم شركات التداول والمقارنات
              بين الوسطاء، ويهدف إلى مساعدة المتداولين على الوصول إلى معلومات
              واضحة ومنظمة قبل فتح حساب حقيقي أو تجريبي مع أي شركة تداول. نعمل
              على تقديم محتوى عملي يساعد المستخدم على فهم التراخيص، الرسوم،
              الحسابات، المنصات وشروط التداول قبل اتخاذ قراره.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-7">
          <ResponsiveTextSection title="ما هو بروكر العرب؟">
            <p>
              يركز موقع بروكر العرب على تقديم محتوى احترافي يغطي أهم الجوانب
              التي يبحث عنها المتداولون قبل التعامل مع أي وسيط، مثل التراخيص
              والتنظيم، منصات التداول، الرسوم والسبريد، الحد الأدنى للإيداع،
              أنواع الحسابات، طرق السحب والإيداع، الحسابات الإسلامية، ومستوى
              الدعم والخدمات المتاحة للمستخدمين.
            </p>

            <p>
              نحن ندرك أن قرار اختيار شركة التداول لا يجب أن يُبنى على إعلان
              تسويقي أو وعود أرباح سريعة، بل على مقارنة عملية ومراجعة منظمة
              للمعلومات الأساسية التي تساعد المستخدم على تكوين صورة أوضح قبل
              اتخاذ أي قرار.
            </p>

            <p>
              لهذا السبب نسعى إلى تبسيط المعلومات وترتيبها بطريقة تسهّل على
              الزائر فهم الفروقات بين الشركات، بدلًا من تركه أمام صفحات تسويقية
              طويلة أو معلومات متفرقة يصعب مقارنتها.
            </p>
          </ResponsiveTextSection>

          <Section title="ماذا يقدم الموقع للزائر؟">
            <p>
              يقدم الموقع صفحات ومراجعات وأدوات تساعد المستخدم على المقارنة بين
              الوسطاء وفهم نقاط القوة والضعف في كل شركة.
            </p>

            <InfoCards
              items={[
                {
                  icon: "⭐",
                  title: "مراجعات شركات التداول",
                  text: "مراجعات منظمة توضح التراخيص والحسابات والمنصات والرسوم وأهم مزايا كل وسيط.",
                },
                {
                  icon: "⚖️",
                  title: "مقارنات بين الوسطاء",
                  text: "مقارنات مباشرة تساعد على فهم الفروقات في الرسوم والتراخيص والمنصات وشروط الحساب.",
                },
                {
                  icon: "📘",
                  title: "شروحات تعليمية",
                  text: "محتوى مبسط حول الحسابات الحقيقية والتجريبية ومنصات التداول مثل MT4 وMT5.",
                },
                {
                  icon: "🌍",
                  title: "وسطاء حسب الدولة",
                  text: "صفحات تساعد المستخدم على الوصول إلى شركات التداول المناسبة لبلده واحتياجاته.",
                },
                {
                  icon: "🧮",
                  title: "أدوات وحاسبات تداول",
                  text: "حاسبات عملية لفهم المخاطر وحجم الصفقة والهامش والنقاط وتكلفة التداول.",
                },
                {
                  icon: "✓",
                  title: "إرشادات قبل التسجيل",
                  text: "معلومات توضح ما يجب مراجعته قبل فتح الحساب أو إيداع الأموال لدى أي شركة.",
                },
              ]}
            />

            <p>
              الهدف ليس دفع المستخدم نحو شركة معينة، بل تمكينه من مقارنة
              الخيارات واتخاذ قرار أكثر وعيًا وفق احتياجاته.
            </p>
          </Section>

          <Section title="كيف نقيّم شركات التداول؟">
            <p>
              نعتمد على المعلومات المنشورة في المواقع الرسمية للشركات وصفحات
              الجهات التنظيمية وشروط الحسابات، ثم ننظمها في صورة واضحة تساعد
              المستخدم على إجراء مقارنة عملية.
            </p>

            <InfoCards
              items={[
                {
                  icon: "🛡️",
                  title: "التراخيص والتنظيم",
                  text: "نراجع التراخيص المعلنة وقوة الجهات الرقابية المرتبطة بكل شركة.",
                },
                {
                  icon: "💰",
                  title: "حماية أموال العملاء",
                  text: "نفحص وضوح إجراءات الأمان وفصل أموال العملاء وسياسات الحماية المعلنة.",
                },
                {
                  icon: "📂",
                  title: "أنواع الحسابات",
                  text: "نقارن الحسابات المتاحة وشروطها والحد الأدنى للإيداع ومدى ملاءمتها للمستخدم.",
                },
                {
                  icon: "📊",
                  title: "الرسوم وتكلفة التداول",
                  text: "نراجع السبريد والعمولات ورسوم التبييت وعدم النشاط والتكاليف المحتملة.",
                },
                {
                  icon: "💻",
                  title: "المنصات وجودة التنفيذ",
                  text: "نراجع المنصات المتاحة وسهولة استخدامها واستقرار الأداء وسرعة تنفيذ الأوامر.",
                },
                {
                  icon: "🏦",
                  title: "الإيداع والسحب",
                  text: "نقارن وسائل الدفع وسرعة المعالجة ووضوح الشروط والرسوم المرتبطة بها.",
                },
                {
                  icon: "☪️",
                  title: "الحساب الإسلامي",
                  text: "نتحقق من توفر الحساب الإسلامي وطريقة تطبيقه وأي شروط أو قيود مرتبطة به.",
                },
                {
                  icon: "🎧",
                  title: "الدعم وتجربة المستخدم",
                  text: "نقيّم جودة خدمة العملاء وسرعة الاستجابة وسهولة الوصول إلى المعلومات.",
                },
                {
                  icon: "🔄",
                  title: "الشفافية وتحديث البيانات",
                  text: "نراجع وضوح المعلومات المنشورة ونعمل على تحديث بيانات الشركات عند توفر تغييرات مهمة.",
                },
              ]}
            />

            <p>
              لا يُعد أي تقييم أو ترتيب ضمانًا ثابتًا لجودة الشركة، لأن شروط
              الشركات وخدماتها وتراخيصها قد تتغير مع الوقت أو تختلف بحسب الدولة
              والجهة التنظيمية.
            </p>
          </Section>

          <ResponsiveTextSection title="هل بروكر العرب يقدم نصائح استثمارية؟">
            <p>
              لا. بروكر العرب لا يقدم نصائح استثمارية أو توصيات شراء وبيع، ولا
              يدير محافظ استثمارية، ولا يفتح صفقات نيابة عن المستخدمين، ولا يعد
              المستخدمين بأي أرباح أو نتائج مالية.
            </p>

            <p>
              جميع المواد المنشورة هي لأغراض تعليمية وإعلامية فقط، وهدفها
              تسهيل فهم المستخدم للشركات والخدمات والأدوات المعروضة في السوق،
              وليس توجيهه نحو قرار استثماري محدد.
            </p>

            <p>
              يجب على كل مستخدم قراءة الشروط الرسمية للشركة والتحقق من ملاءمة
              الخدمة لوضعه القانوني والمالي وخبرته ومستوى تحمله للمخاطر.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="إخلاء المسؤولية">
            <p>
              على الرغم من حرصنا على تحديث المعلومات وتنظيمها بأفضل صورة ممكنة،
              فإن بروكر العرب لا يضمن أن كل معلومة منشورة على الموقع خالية من
              التغيير أو الاختلاف بحسب المنطقة الجغرافية أو نوع الحساب أو توقيت
              زيارة الموقع.
            </p>

            <p>
              إدراج أي شركة داخل الموقع، أو نشر مراجعة عنها، أو عرضها في صفحة
              مقارنة، لا يعني أننا نمنحها ضمانًا أو تأكيدًا بأنها مناسبة لجميع
              المستخدمين.
            </p>

            <p>
              استخدام المعلومات المنشورة عند فتح حساب أو إيداع أموال أو بدء
              التداول هو قرار يتم على مسؤولية المستخدم الشخصية الكاملة، ولا
              يتحمل الموقع مسؤولية الخسائر التي قد تنتج عن التعامل مع أي شركة.
            </p>

            <p>
              دور الموقع يقتصر على النشر المعلوماتي والمقارنات العامة، وليس
              الرقابة القانونية أو الضمان أو الإدارة أو الوساطة المالية
              المباشرة.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الروابط التابعة والإعلانات">
            <p>
              قد يحتوي الموقع على روابط تابعة أو إعلانية لبعض شركات التداول أو
              مزودي الخدمات، وقد نحصل على عمولة تسويقية إذا قام المستخدم بتنفيذ
              إجراء من خلال بعض الروابط، دون تكلفة إضافية عليه في العادة.
            </p>

            <p>
              وجود رابط تابع لا يعني أن الشركة هي الخيار الأفضل لكل مستخدم، كما
              لا يعني أننا نتحكم في خدماتها أو شروطها أو طريقة إدارتها لحسابات
              العملاء.
            </p>

            <p>
              نسعى إلى الفصل بين المحتوى التحريري والمواد الإعلانية، ولا يفترض
              أن تؤثر العلاقات التسويقية وحدها في نتائج التقييم أو ترتيب
              الشركات.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="رسالتنا">
            <p>
              رسالتنا هي بناء مرجع منظم يساعد المستخدم على فهم سوق الوسطاء
              بصورة أوضح، ويقدم صفحات مفيدة وعملية بدلًا من المحتوى المكرر أو
              العبارات التسويقية العامة.
            </p>

            <p>
              نهدف إلى تقديم محتوى يخدم المتداولين في أسواق ودول مختلفة، مع
              الاستمرار في تطوير المحتوى العربي والنسخة الإنجليزية للوصول إلى
              جمهور عالمي.
            </p>

            <p>
              نؤمن أن المستخدم يستحق محتوى احترافيًا يشرح الفروقات الحقيقية بين
              الشركات، مع التأكيد على أن القرار النهائي يجب أن يكون مبنيًا على
              البحث الشخصي وتحمل مسؤولية الاختيار.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}