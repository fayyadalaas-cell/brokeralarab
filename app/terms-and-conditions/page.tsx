import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "الشروط والأحكام | بروكر العرب",
  description:
    "اقرأ الشروط والأحكام الخاصة باستخدام موقع بروكر العرب، بما يشمل طبيعة المحتوى، مسؤولية المستخدم، حدود المسؤولية، الروابط التابعة، والتنبيهات المتعلقة بشركات التداول.",
  alternates: {
    canonical: "https://brokeralarab.com/terms-and-conditions",
    languages: {
      ar: "https://brokeralarab.com/terms-and-conditions",
      en: "https://brokeralarab.com/en/terms-and-conditions",
      "x-default": "https://brokeralarab.com/en/terms-and-conditions",
    },
  },
  openGraph: {
    title: "الشروط والأحكام | بروكر العرب",
    description:
      "تعرف على شروط استخدام بروكر العرب، وطبيعة المحتوى، وحدود المسؤولية، والروابط التابعة، ومسؤولية المستخدم قبل التعامل مع أي شركة تداول.",
    url: "https://brokeralarab.com/terms-and-conditions",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

type InfoCardItem = {
  icon: string;
  title: string;
  text: string;
};

/* الأقسام الظاهرة دائمًا */
function Section({ title, children }: SectionProps) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[28px]">
      <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-white px-4 py-4 sm:px-7 sm:py-3.5 md:px-8">
        <h2 className="text-[24px] font-black leading-[1.25] text-slate-950 sm:text-[24px] lg:text-[26px]">
          {title}
        </h2>
      </div>

      <div className="px-4 py-5 sm:px-7 sm:py-4 md:px-8 lg:py-5">
        <div className="space-y-4 text-[15px] font-medium leading-8 text-slate-700 sm:space-y-3 sm:text-[15px] sm:leading-8 lg:text-[16px]">
          {children}
        </div>
      </div>
    </section>
  );
}

/* الأقسام الطويلة: Accordion على الموبايل ومفتوحة على الديسكتوب */
function ResponsiveTextSection({ title, children }: SectionProps) {
  return (
    <>
      {/* MOBILE */}
      <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] sm:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-white px-4 py-3.5 text-right">
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
      <section className="hidden overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:block">
        <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-white px-7 py-3.5 md:px-8">
          <h2 className="text-[24px] font-black leading-[1.3] text-slate-950 lg:text-[26px]">
            {title}
          </h2>
        </div>

        <div className="px-7 py-4 md:px-8 lg:py-5">
          <div className="space-y-3 text-[15px] font-medium leading-8 text-slate-700 lg:text-[16px]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/* بطاقات مسؤولية المستخدم */
function InfoCards({ items }: { items: InfoCardItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="group min-h-[122px] rounded-[18px] border border-slate-200 bg-[#fbfdff] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:min-h-0 sm:rounded-[18px] sm:p-4"
        >
          {/* MOBILE */}
          <div className="flex h-full flex-col items-center justify-center text-center sm:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-[17px] shadow-sm">
              {item.icon}
            </span>

            <h3 className="mt-3 text-[13px] font-black leading-5 text-slate-950">
              {item.title}
            </h3>
          </div>

          {/* TABLET / DESKTOP */}
          <div className="hidden items-start gap-3 sm:flex">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[16px] shadow-sm lg:h-10 lg:w-10 lg:text-[18px]">
              {item.icon}
            </span>

            <div className="min-w-0">
              <h3 className="text-[15px] font-black leading-6 text-slate-950 lg:text-[16px]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-[13px] font-medium leading-6 text-slate-600 lg:text-[14px] lg:leading-7">
                {item.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TermsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:py-1 sm:text-[11px]">
              شروط الاستخدام
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] lg:text-[44px]">
              الشروط والأحكام
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              توضح هذه الشروط قواعد استخدام بروكر العرب، ومسؤولية المستخدم،
              وحدود مسؤولية الموقع عند الاعتماد على المحتوى أو الروابط الخارجية.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              تحكم هذه الشروط والأحكام استخدامك لموقع بروكر العرب وجميع
              المراجعات والمقارنات والأدوات والصفحات التعليمية والمعلومات
              التنظيمية والروابط الخارجية المنشورة داخله. كما توضح طبيعة الموقع
              الإعلامية، وحدود مسؤوليتنا، والتزامات المستخدم، والشروط التي تنطبق
              عند التعامل مع شركات التداول أو الخدمات التابعة لأطراف خارجية.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">
          <Section title="القبول بهذه الشروط">
            <p>
              بمجرد دخولك إلى بروكر العرب أو تصفحك لأي صفحة أو استخدامك لأي
              مراجعة أو مقارنة أو أداة أو رابط منشور فيه، فإنك تقر بأنك قرأت هذه
              الشروط والأحكام وفهمتها ووافقت على الالتزام بها.
            </p>

            <p>
              تسري هذه الشروط على جميع الزوار والمستخدمين، سواء تم استخدام
              الموقع للاطلاع على تقييم شركة تداول أو مقارنة بين وسيطين أو قراءة
              صفحة تعليمية أو استخدام إحدى الحاسبات والأدوات.
            </p>

            <p>
              إذا كنت لا توافق على أي جزء من هذه الشروط، فيجب عليك التوقف عن
              استخدام الموقع وعدم الاعتماد على المحتوى أو الأدوات أو الروابط
              الخارجية المنشورة فيه.
            </p>

            <p>
              استمرارك في استخدام بروكر العرب بعد نشر أي تعديلات على هذه الصفحة
              يعني قبولك بالنسخة الجديدة من الشروط.
            </p>
          </Section>

          <Section title="طبيعة موقع بروكر العرب والغرض منه">
            <p>
              بروكر العرب هو موقع إعلامي وتعليمي متخصص في شركات التداول
              والخدمات المالية والحسابات والمنصات والتراخيص والمصطلحات والأدوات
              المرتبطة بالتداول.
            </p>

            <p>
              ننشر مراجعات شركات التداول، والمقارنات، وصفحات الدول، والشروحات
              التعليمية، والحاسبات، ومعلومات الحسابات والتراخيص وغيرها من
              المواد التي تساعد المستخدم على إجراء بحثه الخاص.
            </p>

            <p>
              بروكر العرب ليس شركة وساطة مالية، ولا مستشارًا استثماريًا، ولا
              مدير محافظ، ولا بنكًا، ولا مزود دفع، ولا جهة رقابية، ولا منصة
              لتنفيذ الصفقات. نحن لا نستقبل أموال العملاء، ولا نفتح الحسابات
              نيابة عنهم، ولا ننفذ الصفقات، ولا ندير الإيداعات أو السحوبات.
            </p>

            <p>
              جميع المواد المنشورة في الموقع تقدم لأغراض تعليمية وإعلامية عامة،
              ولا يجب اعتبارها نصيحة استثمارية أو قانونية أو ضريبية أو مالية
              مخصصة لحالة مستخدم معين.
            </p>
          </Section>

          <Section title="مسؤولياتك كمستخدم">
            <p>
              يتحمل كل مستخدم مسؤولية إجراء بحث مستقل وتحديد ما إذا كانت شركة
              التداول أو الخدمة أو الحساب أو المنصة مناسبة لظروفه واحتياجاته.
            </p>

            <InfoCards
              items={[
                {
                  icon: "🔍",
                  title: "التحقق من المعلومات",
                  text: "تحقق من التفاصيل المهمة مباشرة عبر موقع الشركة ومستنداتها الرسمية قبل اتخاذ أي قرار.",
                },
                {
                  icon: "🛡️",
                  title: "مراجعة التراخيص",
                  text: "تأكد من اسم الكيان القانوني والترخيص والجهة الرقابية والحماية المتاحة في دولتك.",
                },
                {
                  icon: "📄",
                  title: "قراءة الشروط الرسمية",
                  text: "راجع اتفاقية العميل وتحذيرات المخاطر والرسوم وشروط السحب والقواعد المرتبطة بالحساب.",
                },
                {
                  icon: "⚠️",
                  title: "فهم المخاطر",
                  text: "قيّم مخاطر الرافعة المالية وتقلبات السوق واحتمال الخسارة وعدم ملاءمة بعض المنتجات.",
                },
                {
                  icon: "💳",
                  title: "حماية معلوماتك",
                  text: "تجنب مشاركة كلمات المرور وبيانات الدفع ومعلومات الحساب والمستندات الحساسة دون ضرورة.",
                },
                {
                  icon: "🧠",
                  title: "اتخاذ قرارك بنفسك",
                  text: "استخدم الموقع كمصدر للبحث وتحمل مسؤولية التسجيل أو الإيداع أو التداول لدى أي شركة.",
                },
              ]}
            />

            <p>
              لا يجب الاعتماد على تقييم أو ترتيب أو مراجعة أو مقارنة أو نتيجة
              حاسبة باعتبارها الأساس الوحيد لاتخاذ قرار مالي. فقد تؤثر ظروف
              المستخدم وموقعه الجغرافي وخبرته وقدرته على تحمل المخاطر والقوانين
              المطبقة عليه في مدى ملاءمة أي خدمة.
            </p>
          </Section>

          <ResponsiveTextSection title="دقة المعلومات وتوفرها">
            <p>
              نسعى إلى عرض المعلومات بصورة واضحة وعملية ومنظمة، لكننا لا نضمن أن
              كل تفصيل منشور في بروكر العرب سيكون دائمًا كاملًا أو خاليًا من
              الخطأ أو محدثًا بصورة فورية.
            </p>

            <p>
              قد تغير شركات التداول أو مزودو الخدمات الرسوم والسبريد وأنواع
              الحسابات والحد الأدنى للإيداع ووسائل الدفع والمنصات والتراخيص
              والعروض والخدمات دون إشعارنا مسبقًا.
            </p>

            <p>
              قد تختلف المعلومات أيضًا بحسب دولة المستخدم أو الجهة التنظيمية أو
              نوع الحساب أو وسيلة الدفع أو فئة العميل أو تاريخ زيارة الصفحة.
            </p>

            <p>
              قبل فتح أي حساب أو تحويل الأموال، يجب التحقق من المعلومات المهمة
              عبر الموقع الرسمي للشركة ومستنداتها القانونية واتفاقية العميل
              والجهة الرقابية المعنية.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="عدم تقديم نصائح مالية أو استثمارية">
            <p>
              بروكر العرب لا يقدم نصائح استثمارية شخصية أو توصيات تداول أو
              إشارات شراء وبيع أو إدارة محافظ أو تخطيطًا ماليًا مخصصًا.
            </p>

            <p>
              نحن لا نقيّم دخلك أو وضعك المالي أو أهدافك أو خبرتك أو قدرتك على
              تحمل الخسارة، ولذلك لا يمكن للمحتوى المنشور تحديد مدى ملاءمة شركة
              أو حساب أو منتج أو استراتيجية معينة لك.
            </p>

            <p>
              الشروحات التعليمية وترتيب الشركات وجداول المقارنة ونتائج الحاسبات
              هي مواد مرجعية عامة، ولا يجب تفسيرها باعتبارها توصية أو ضمانًا لأي
              نتيجة.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="مخاطر التداول">
            <p>
              قد ينطوي تداول العملات الأجنبية والعقود مقابل الفروقات والعملات
              الرقمية والسلع والمؤشرات والأسهم وغيرها من الأدوات ذات الرافعة
              المالية على مستوى مرتفع من المخاطر.
            </p>

            <p>
              يمكن أن تؤدي حركة السوق إلى خسائر سريعة، كما قد تزيد الرافعة
              المالية من حجم الأرباح المحتملة والخسائر المحتملة معًا. وقد لا
              تكون بعض المنتجات مناسبة للمبتدئين أو لمن لا يستطيع تحمل خسارة
              الأموال التي يقوم بإيداعها.
            </p>

            <p>
              يجب على المستخدم مراجعة تحذير المخاطر الرسمي للشركة وفهم آلية
              الهامش والرافعة المالية، والنظر في الحصول على استشارة مستقلة عند
              الحاجة.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="حدود المسؤولية">
            <p>
              إلى الحد الذي يسمح به القانون، لا يتحمل بروكر العرب أو القائمون
              عليه مسؤولية أي خسائر مباشرة أو غير مباشرة أو عرضية أو تبعية تنتج
              عن استخدام الموقع أو الاعتماد على المحتوى المنشور فيه.
            </p>

            <p>
              يشمل ذلك، دون حصر، خسائر التداول، وتأخر أو رفض السحب، وقيود
              الحساب، ومشكلات التحقق، والنزاعات التنظيمية، والأعطال الفنية،
              وعدم دقة البيانات، وضياع الفرص، والخسائر المرتبطة بالخدمات الخارجية.
            </p>

            <p>
              لا نتحمل مسؤولية قيام شركة ما بتغيير شروطها أو هيكل تراخيصها أو
              ملكيتها أو جودة خدماتها أو إجراءات الدفع أو مدى توفر خدماتها بعد
              نشر المعلومات عنها في الموقع.
            </p>

            <p>
              كما لا نضمن استمرار توفر الموقع دون انقطاع، أو خلوه الكامل من
              الأخطاء أو الأعطال أو المشكلات الأمنية.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="شركات التداول والخدمات الخارجية">
            <p>
              قد يتضمن بروكر العرب روابط تؤدي إلى شركات تداول أو جهات رقابية أو
              مزودي خدمات مالية أو شركات تقنية أو منظمي فعاليات أو خدمات دفع أو
              مواقع خارجية أخرى.
            </p>

            <p>
              تعمل هذه الجهات بصورة مستقلة عن بروكر العرب، ولا نتحكم في منصاتها
              أو إجراءاتها الداخلية أو قبول الحسابات أو خدمة العملاء أو
              الإيداعات أو السحوبات أو طريقة تعاملها مع المستخدمين.
            </p>

            <p>
              بمجرد مغادرة بروكر العرب والدخول إلى موقع خارجي، يصبح استخدامك
              لذلك الموقع خاضعًا لشروطه وسياسة الخصوصية وتحذيرات المخاطر
              ومستنداته القانونية.
            </p>

            <p>
              وجود رابط إلى موقع خارجي لا يعني أن بروكر العرب يضمن أمانه أو
              قانونيته أو أداءه أو استمرارية خدماته أو ملاءمته لجميع المستخدمين.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الروابط التابعة والإعلانات">
            <p>
              قد تحتوي بعض الصفحات على روابط تابعة أو روابط إحالة أو إعلانات أو
              مواضع ترويجية مرتبطة بشركات التداول أو مزودي الخدمات.
            </p>

            <p>
              قد يحصل بروكر العرب على مقابل مادي عند قيام الزائر بالنقر على رابط
              أو فتح حساب أو إتمام إجراء مؤهل من خلال بعض هذه الروابط، وفي
              العادة لا يؤدي ذلك إلى فرض تكلفة إضافية على الزائر.
            </p>

            <p>
              الحصول على مقابل تسويقي لا يعني أن الشركة مناسبة لكل مستخدم، ولا
              يلغي مسؤولية المستخدم عن التحقق من المعلومات الرسمية وتقييم
              المخاطر بصورة مستقلة.
            </p>

            <p>
              نسعى إلى الحفاظ على فصل معقول بين المحتوى التحريري والعلاقات
              التجارية، لكن يجب على المستخدم التعامل مع الروابط التابعة
              باعتبارها علاقات ترويجية.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الملكية الفكرية">
            <p>
              ما لم يُذكر خلاف ذلك، تعود النصوص وهيكل الصفحات والتصاميم والعلامة
              التجارية والرسومات والمقارنات والجداول والأدوات والعناصر الأصلية
              المنشورة في بروكر العرب إلى الموقع أو يتم استخدامها بإذن مناسب.
            </p>

            <p>
              يمكن الاطلاع على المحتوى للاستخدام الشخصي وغير التجاري، لكن لا
              يجوز نسخ أجزاء جوهرية منه أو إعادة نشرها أو توزيعها أو بيعها أو
              تعديلها أو جمعها آليًا أو إنشاء نسخ مشتقة منها دون إذن كتابي مسبق.
            </p>

            <p>
              تبقى أسماء الشركات والعلامات التجارية وأسماء المنصات وشعارات
              الأطراف الثالثة ملكًا لأصحابها، ولا يعني ظهورها في الموقع أنها
              مملوكة لبروكر العرب.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الاستخدام المقبول للموقع">
            <p>
              يلتزم المستخدم باستخدام بروكر العرب لأغراض مشروعة وقانونية فقط.
            </p>

            <p>
              لا يجوز محاولة الإضرار بالموقع أو تحميله بصورة مفرطة أو تعطيله أو
              تجاوز أنظمة الحماية أو إدخال برمجيات ضارة أو التدخل في طريقة عمله
              أو الوصول غير المصرح به إلى أنظمته.
            </p>

            <p>
              كما لا يجوز استخدام أنظمة آلية لاستخراج أجزاء جوهرية من المحتوى،
              أو انتحال شخصية الغير، أو تقديم معلومات مضللة، أو استخدام الموقع
              بطريقة تنتهك حقوق بروكر العرب أو أي طرف ثالث.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="تنبيه مهم بشأن إدراج شركات التداول">
            <p>
              ظهور شركة تداول في بروكر العرب لا يعني أنها معتمدة رسميًا من
              الموقع أو خالية من المخاطر أو موصى بها لكل مستخدم أو مضمونة
              لتقديم مستوى محدد من الخدمة.
            </p>

            <p>
              قد تظهر الشركة لأنها محل مراجعة أو مقارنة أو بحث أو لأنها مدرجة
              داخل صفحة دولة أو صفحة تعليمية أو تنظيمية لأغراض معلوماتية.
            </p>

            <p>
              تمثل التقييمات والترتيبات وجهة نظر مبنية على المعلومات المتاحة في
              وقت معين، وقد يتم تعديلها عند ظهور بيانات جديدة أو تغير شروط
              الشركة.
            </p>

            <p>
              التسجيل والتحقق من الحساب والإيداع والسحب والتداول هي معاملات
              تتم مباشرة بين المستخدم وشركة التداول التي يختارها.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="التعديلات على هذه الشروط">
            <p>
              يحق لبروكر العرب تعديل أو توسيع أو تحديث هذه الشروط والأحكام عند
              الحاجة بما يعكس التغييرات في الموقع أو الخدمات أو الممارسات
              التجارية أو المتطلبات المطبقة.
            </p>

            <p>
              تصبح الشروط المعدلة سارية عند نشرها في هذه الصفحة، ولا نلتزم
              بإرسال إشعار فردي للمستخدمين عند كل تعديل.
            </p>

            <p>
              ينصح بمراجعة هذه الصفحة من وقت إلى آخر، ويعني استمرار استخدام
              الموقع بعد التحديث قبول النسخة المعدلة من الشروط.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}