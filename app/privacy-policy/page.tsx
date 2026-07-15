import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | بروكر العرب",
  description:
    "اطلع على سياسة الخصوصية في موقع بروكر العرب، وكيفية التعامل مع المعلومات، والكوكيز، والروابط الخارجية، وإخلاء المسؤولية المتعلق باستخدام الموقع.",
  alternates: {
    canonical: "https://brokeralarab.com/privacy-policy",
    languages: {
      ar: "https://brokeralarab.com/privacy-policy",
      en: "https://brokeralarab.com/en/privacy-policy",
      "x-default": "https://brokeralarab.com/en/privacy-policy",
    },
  },
  openGraph: {
    title: "سياسة الخصوصية | بروكر العرب",
    description:
      "اطلع على سياسة الخصوصية في موقع بروكر العرب، وكيفية التعامل مع المعلومات، والكوكيز، والروابط الخارجية، وإخلاء المسؤولية المتعلق باستخدام الموقع.",
    url: "https://brokeralarab.com/privacy-policy",
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

/* الأقسام الطويلة: مختصرة على الموبايل ومفتوحة على الديسكتوب */
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

/* بطاقات استخدام المعلومات */
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

export default function PrivacyPolicyPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:py-1 sm:text-[11px]">
              الخصوصية والبيانات
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] lg:text-[44px]">
              سياسة الخصوصية
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              توضح هذه الصفحة كيفية تعامل بروكر العرب مع البيانات والكوكيز
              والمعلومات المرتبطة باستخدام الموقع.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              توضح سياسة الخصوصية هذه الطريقة التي يتعامل بها موقع بروكر العرب
              مع البيانات والمعلومات التي قد ترتبط باستخدام الموقع، سواء كانت
              معلومات فنية يتم جمعها بصورة تلقائية أثناء التصفح أو معلومات يقدمها
              المستخدم بنفسه عند التواصل معنا. كما توضح الصفحة استخدام ملفات
              تعريف الارتباط وأدوات التحليل والروابط الخارجية، والإجراءات العامة
              التي نتبعها لحماية المعلومات وتحسين تجربة المستخدم داخل الموقع.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">
          <Section title="مقدمة">
            <p>
              نحن في بروكر العرب نحترم خصوصية المستخدمين، ونسعى إلى التعامل مع
              البيانات والمعلومات المرتبطة باستخدام الموقع بصورة مسؤولة وواضحة،
              بما يتوافق مع طبيعة الموقع باعتباره منصة تقدم محتوى تعليميًا
              ومراجعات ومقارنات ومعلومات عامة عن شركات التداول والخدمات المالية.
            </p>

            <p>
              تهدف هذه السياسة إلى توضيح أنواع المعلومات التي قد يتم جمعها أثناء
              زيارة الموقع، والطريقة التي قد تُستخدم بها هذه المعلومات، والجهات
              الخارجية التي قد يتم التعامل معها لأغراض التحليل أو تشغيل بعض
              الخدمات الفنية. كما نوضح حدود مسؤوليتنا عند انتقال المستخدم إلى
              مواقع خارجية من خلال الروابط المنشورة داخل صفحات الموقع.
            </p>

            <p>
              لا يهدف الموقع إلى جمع معلومات شخصية حساسة دون حاجة، ولا نطلب من
              الزوار مشاركة بيانات مالية مباشرة مثل أرقام البطاقات البنكية أو
              كلمات المرور أو بيانات الدخول إلى حسابات التداول. ويقتصر تعاملنا
              مع المعلومات على ما يلزم لتشغيل الموقع وتحسين المحتوى والرد على
              الرسائل والاستفسارات.
            </p>

            <p>
              إن استمرارك في استخدام الموقع يعني اطلاعك على هذه السياسة
              وموافقتك على تطبيقها بصيغتها الحالية. وقد نقوم بتعديلها أو تحديثها
              عند الحاجة، بما يتناسب مع تطور الموقع أو إضافة خدمات جديدة أو
              تغير المتطلبات الفنية والتنظيمية ذات الصلة.
            </p>
          </Section>

          <Section title="ما نوع المعلومات التي قد يتم جمعها؟">
            <p>
              عند استخدام الموقع، قد يتم جمع بعض البيانات الفنية أو غير الشخصية
              بصورة تلقائية، مثل نوع المتصفح ونظام التشغيل ونوع الجهاز واللغة
              المستخدمة والصفحات التي تمت زيارتها ومدة التصفح التقريبية ومصدر
              الزيارة.
            </p>

            <p>
              قد يتم كذلك تسجيل معلومات تقنية عامة مثل عنوان الإنترنت بصورة
              محدودة، والموقع الجغرافي التقريبي على مستوى الدولة أو المدينة،
              وتوقيت الزيارة، والأخطاء الفنية أو الصفحات التي لم يتم تحميلها
              بصورة صحيحة.
            </p>

            <p>
              كما قد يتم جمع بيانات يقدمها المستخدم طوعًا عند التواصل معنا عبر
              البريد الإلكتروني أو من خلال أي نموذج تواصل قد تتم إضافته في
              المستقبل، مثل الاسم والبريد الإلكتروني وموضوع الرسالة ومحتواها.
            </p>

            <p>
              لا نطلب من المستخدمين عبر الموقع تزويدنا ببيانات مالية حساسة مثل
              أرقام البطاقات البنكية أو كلمات المرور أو بيانات تسجيل الدخول إلى
              حسابات التداول، ويجب عدم إرسال هذا النوع من المعلومات من خلال أي
              نموذج أو رسالة موجهة إلينا.
            </p>
          </Section>

          <Section title="كيف نستخدم المعلومات؟">
            <p>
              قد نستخدم المعلومات الفنية والعامة التي يتم جمعها لتطوير الموقع
              وتحسين المحتوى وفهم احتياجات المستخدمين بصورة أفضل.
            </p>

            <InfoCards
              items={[
                {
                  icon: "✨",
                  title: "تحسين تجربة المستخدم",
                  text: "تحسين سرعة التصفح وترتيب العناصر وتسهيل الوصول إلى الصفحات والمعلومات المهمة.",
                },
                {
                  icon: "📊",
                  title: "تحليل أداء الصفحات",
                  text: "فهم الصفحات الأكثر زيارة ومدة التفاعل والمواضيع التي تحظى باهتمام المستخدمين.",
                },
                {
                  icon: "📝",
                  title: "تطوير المحتوى",
                  text: "تحديث المقالات والمراجعات وتنظيم المعلومات بصورة أكثر وضوحًا وفائدة.",
                },
                {
                  icon: "✉️",
                  title: "الرد على الرسائل",
                  text: "استخدام بيانات التواصل للرد على الاستفسارات والرسائل التي يرسلها المستخدم طوعًا.",
                },
                {
                  icon: "🛡️",
                  title: "حماية الموقع",
                  text: "مراقبة الأعطال ومحاولات الاستخدام غير الطبيعي والمشكلات الفنية والأمنية.",
                },
                {
                  icon: "⚙️",
                  title: "تحسين الخدمات",
                  text: "اختبار وتطوير الأدوات والخصائص الجديدة وتحسين طريقة عرض الموقع على الأجهزة المختلفة.",
                },
              ]}
            />

            <p>
              لا نستخدم المعلومات بهدف بيع البيانات الشخصية للمستخدمين، ولا
              نقوم باستخدامها لفتح حسابات تداول نيابة عنهم أو تنفيذ معاملات
              مالية باسمهم.
            </p>
          </Section>

          <ResponsiveTextSection title="ملفات تعريف الارتباط (Cookies)">
            <p>
              قد يستخدم الموقع ملفات تعريف ارتباط أو تقنيات مشابهة لتحسين سرعة
              التصفح وتذكر بعض التفضيلات العامة وفهم كيفية استخدام الموقع بصورة
              أفضل.
            </p>

            <p>
              ملفات تعريف الارتباط هي ملفات صغيرة قد يتم حفظها على جهاز
              المستخدم، وتساعد في تشغيل بعض الخصائص أو قياس الأداء أو معرفة ما
              إذا كان المستخدم قد زار صفحة معينة من قبل.
            </p>

            <p>
              يمكن للمستخدم عادة التحكم في ملفات الكوكيز أو حذفها أو منعها من
              خلال إعدادات المتصفح الخاص به، مع العلم أن تعطيل بعض هذه الملفات
              قد يؤثر على تجربة التصفح أو على عمل بعض عناصر الموقع بصورة صحيحة.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="التحليلات والإحصاءات">
            <p>
              قد نستخدم أدوات تحليلية عامة لفهم أداء الموقع، مثل معرفة عدد
              الزيارات ومصادرها والصفحات الأكثر مشاهدة ومدة التفاعل ونوع الجهاز
              والمتصفح المستخدم.
            </p>

            <p>
              تساعد هذه البيانات في اكتشاف الصفحات التي تحتاج إلى تحسين وفهم
              المواضيع الأكثر أهمية للزوار وتطوير المحتوى والأدوات المنشورة داخل
              الموقع.
            </p>

            <p>
              الهدف من استخدام أدوات التحليل هو تحسين بنية الموقع والمحتوى، وليس
              تحديد هوية المستخدمين بصورة شخصية أو بيع بياناتهم لأطراف أخرى.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الروابط الخارجية ومواقع الأطراف الثالثة">
            <p>
              يحتوي الموقع أو قد يحتوي على روابط خارجية تقود إلى مواقع شركات
              تداول أو مزودي خدمات أو جهات تنظيمية أو أطراف أخرى.
            </p>

            <p>
              عند انتقالك إلى أي موقع خارجي، فإنك تصبح خاضعًا لسياسات الخصوصية
              والشروط والأحكام الخاصة بذلك الموقع، وليس لهذه السياسة.
            </p>

            <p>
              لا نتحكم في طريقة جمع البيانات أو تخزينها أو استخدامها داخل مواقع
              الأطراف الثالثة، ولذلك نوصي دائمًا بمراجعة سياسة الخصوصية والشروط
              الخاصة بأي موقع خارجي قبل التسجيل أو إدخال معلومات أو بدء تعامل
              مالي معه.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الروابط التابعة والإعلانات">
            <p>
              بعض الروابط المنشورة في الموقع قد تكون روابط تابعة أو تسويقية، وقد
              نحصل على عمولة إذا قام المستخدم بالتسجيل أو تنفيذ إجراء معين من
              خلال بعض هذه الروابط، دون تكلفة إضافية عليه في العادة.
            </p>

            <p>
              عند النقر على رابط تابع، قد تتمكن الجهة المعلنة أو شركة التداول من
              معرفة أن الزيارة جاءت من موقع بروكر العرب، وذلك باستخدام ملفات
              تتبع أو رموز إحالة تابعة لأنظمتها الخاصة.
            </p>

            <p>
              نحن لا نتحكم في أنظمة التتبع الداخلية الخاصة بالمواقع الخارجية،
              ولذلك فإن استخدام هذه الروابط يخضع أيضًا لسياسات وشروط الجهات التي
              تديرها.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="حماية المعلومات">
            <p>
              نسعى إلى اتخاذ إجراءات فنية وتنظيمية مناسبة ومعقولة لحماية
              المعلومات التي تتم مشاركتها معنا بصورة مباشرة من الوصول أو
              الاستخدام غير المصرح به.
            </p>

            <p>
              قد تشمل هذه الإجراءات استخدام اتصالات آمنة ومراقبة الأعطال
              والأنشطة غير الطبيعية وتقييد الوصول إلى بعض الأنظمة والخدمات
              المرتبطة بتشغيل الموقع.
            </p>

            <p>
              مع ذلك، لا يمكن ضمان الأمان المطلق لأي وسيلة إرسال أو تخزين
              إلكتروني بنسبة 100%، ولذلك فإن إرسال المعلومات عبر الإنترنت يتم
              على مسؤولية المستخدم الشخصية.
            </p>

            <p>
              ننصح المستخدم بعدم إرسال معلومات مالية أو كلمات مرور أو بيانات
              حساسة غير مطلوبة من خلال البريد الإلكتروني أو نماذج التواصل.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="الاحتفاظ بالمعلومات">
            <p>
              قد نحتفظ ببعض المعلومات الفنية أو بيانات التواصل للمدة التي تكون
              ضرورية لتحقيق الغرض الذي جُمعت من أجله، مثل الرد على رسالة أو
              معالجة مشكلة فنية أو تحسين أداء الموقع.
            </p>

            <p>
              قد يتم حذف البيانات أو إخفاء هويتها أو الاحتفاظ بها بصورة مجمعة
              لأغراض إحصائية، بحسب نوع المعلومات والغرض من استخدامها.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="خصوصية الأطفال">
            <p>
              هذا الموقع موجه للاستخدام العام وللمهتمين بمحتوى التداول والأسواق
              المالية، وليس مخصصًا للأطفال.
            </p>

            <p>
              لا نستهدف عمدًا جمع معلومات شخصية من القُصّر، وفي حال تبين لنا
              وصول معلومات شخصية تخص طفلًا بطريقة غير مقصودة، فقد نقوم بحذفها
              عند اكتشافها أو عند تلقي طلب مناسب بذلك.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="حقوق المستخدم">
            <p>
              يمكن للمستخدم التواصل معنا للاستفسار عن أي معلومات سبق أن قدمها
              لنا مباشرة، أو لطلب تحديثها أو تصحيحها أو حذفها، عندما يكون ذلك
              ممكنًا ومناسبًا.
            </p>

            <p>
              قد نحتاج إلى التحقق من هوية صاحب الطلب بصورة معقولة قبل تنفيذ بعض
              الطلبات، وذلك لحماية المعلومات ومنع الوصول غير المصرح به إليها.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="إخلاء المسؤولية">
            <p>
              إن استخدامك للموقع ومحتواه والاعتماد على أي معلومة منشورة فيه يتم
              على مسؤوليتك الشخصية.
            </p>

            <p>
              لا يتحمل بروكر العرب مسؤولية أي خسائر أو أضرار أو مطالبات قد تنتج
              عن استخدام المعلومات المنشورة أو عن التعامل مع الروابط الخارجية
              أو الخدمات المقدمة من أطراف ثالثة.
            </p>

            <p>
              كما أننا لا نضمن بشكل دائم خلو الموقع من الأخطاء أو الأعطال أو
              التغييرات أو التحديثات المتأخرة، ولا نتحمل مسؤولية ما يحدث داخل
              مواقع شركات التداول أو الخدمات المرتبطة بها بعد مغادرة المستخدم
              لموقعنا.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="التعديلات على هذه السياسة">
            <p>
              نحتفظ بالحق في تعديل هذه الصفحة أو تحديثها في أي وقت عند الحاجة،
              سواء بسبب تطوير الموقع أو إضافة خدمات جديدة أو تحديث الأدوات
              التقنية المستخدمة.
            </p>

            <p>
              تصبح التعديلات سارية عند نشر النسخة الجديدة على هذه الصفحة، ويُنصح
              المستخدم بمراجعتها من وقت لآخر لمعرفة أي تحديثات جديدة.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}