import type { Metadata } from "next";
import type { ReactNode } from "react";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "اتصل ببروكر العرب | التحديثات والشراكات والاستفسارات",
  description:
    "تواصل مع بروكر العرب لتحديث معلومات شركات التداول، أو الاستفسار عن الشراكات والإعلانات، أو إرسال الملاحظات والمشكلات التقنية المتعلقة بالموقع.",
  alternates: {
    canonical: "https://brokeralarab.com/contact",
    languages: {
      ar: "https://brokeralarab.com/contact",
      en: "https://brokeralarab.com/en/contact",
      "x-default": "https://brokeralarab.com/en/contact",
    },
  },
  openGraph: {
    title: "اتصل ببروكر العرب | التحديثات والشراكات والاستفسارات",
    description:
      "تواصل مع بروكر العرب بخصوص تحديثات الشركات، والشراكات، والإعلانات، والملاحظات التقنية، والاستفسارات العامة المتعلقة بالموقع.",
    url: "https://brokeralarab.com/contact",
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

/* الأقسام التي تبقى ظاهرة على جميع المقاسات */
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

/* بطاقات مواضيع التواصل */
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

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f4f7fb] text-right text-slate-900"
    >
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:py-1 sm:text-[11px]">
              تواصل معنا
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] lg:text-[44px]">
              اتصل ببروكر العرب
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              تواصل معنا بخصوص معلومات الشركات، أو ملاحظات الموقع، أو
              الشراكات، أو الإعلانات، أو المشكلات التقنية.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              تواصل مع بروكر العرب إذا رغبت في الإبلاغ عن معلومات قديمة تخص
              إحدى شركات التداول، أو طلب تصحيح محتوى، أو مناقشة فرصة شراكة
              مهنية، أو الاستفسار عن فرص الإعلان، أو إرسال ملاحظات تتعلق
              بالموقع. كما نرحب بالتقارير التقنية والاقتراحات التي تساعدنا على
              تحسين صفحات التقييم والمقارنة والمحتوى المنشور.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">
          {/* CONTACT FORM */}
          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[28px]">
            <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-white px-4 py-4 sm:px-7 sm:py-4 md:px-8">
              <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                نموذج التواصل
              </div>

              <h2 className="mt-3 text-[24px] font-black leading-[1.25] text-slate-950 sm:text-[26px] lg:text-[28px]">
                أرسل لنا رسالة
              </h2>

              <p className="mt-2 max-w-[1100px] text-[14px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                استخدم النموذج أدناه لتحديث معلومات الشركات، أو طلبات
                الشراكة والإعلان، أو إرسال الملاحظات التقنية، أو الاستفسارات
                العامة المتعلقة ببروكر العرب.
              </p>

              <p className="mt-2 text-[12px] font-semibold text-slate-500">
                الحقول التي تحتوي على{" "}
                <span className="text-red-600">*</span> مطلوبة.
              </p>
            </div>

            <div className="px-4 py-5 sm:px-7 sm:py-6 md:px-8">
              <ContactForm lang="ar" />
            </div>
          </section>

          {/* INTRODUCTION */}
          <Section title="كيف يمكننا مساعدتك؟">
            <p>
              ينشر بروكر العرب تقييمات شركات التداول، وصفحات المقارنة،
              والشروحات التعليمية، ومعلومات التراخيص، وأدوات التداول وغيرها من
              الموارد التي تساعد المستخدمين على البحث وفهم خدمات شركات التداول.
              وتساعدنا الملاحظات الواضحة والدقيقة على إبقاء المحتوى مفيدًا
              ومحدثًا.
            </p>

            <p>
              يمكنك التواصل معنا إذا لاحظت معلومة تحتاج إلى تصحيح، أو إذا قامت
              شركة بتغيير شروط حساباتها أو خدماتها، أو إذا وجدت مشكلة تقنية أو
              رابطًا لا يعمل أو شرحًا يحتاج إلى توضيح.
            </p>

            <p>
              كما نرحب بالاستفسارات الواردة من شركات التداول ومزودي الخدمات
              المالية ومنظمي الفعاليات والمؤسسات الإعلامية والجهات المهتمة
              بالشراكات أو الإعلانات أو تحديث البيانات أو التعاون المهني.
            </p>

            <p>
              يرجى تقديم تفاصيل كافية تساعدنا على فهم الطلب. وإذا كانت الرسالة
              تتعلق بشركة أو مقارنة أو صفحة معينة، أرفق اسم الشركة أو رابط
              الصفحة كلما كان ذلك ممكنًا.
            </p>
          </Section>

          {/* CONTACT REASONS */}
          <Section title="ما المواضيع التي يمكنك مراسلتنا بشأنها؟">
            <p>
              اختر الموضوع الأقرب إلى طلبك، وأضف التفاصيل المهمة داخل الرسالة.
            </p>

            <InfoCards
              items={[
                {
                  icon: "📝",
                  title: "تحديثات المحتوى",
                  text: "الإبلاغ عن معلومات قديمة أو غير مكتملة أو تحتاج إلى تصحيح داخل صفحات الشركات.",
                },
                {
                  icon: "⚖️",
                  title: "ملاحظات التقييمات والمقارنات",
                  text: "إرسال سؤال أو ملاحظة بخصوص تقييم شركة أو ترتيبها أو صفحة مقارنة.",
                },
                {
                  icon: "🤝",
                  title: "طلبات الشراكة",
                  text: "مناقشة الشراكات الإعلامية أو البرامج التابعة أو إدراج الشركات أو التعاون المهني.",
                },
                {
                  icon: "📣",
                  title: "فرص الإعلان",
                  text: "طلب معلومات حول المواضع الإعلانية أو الحملات أو فرص الترويج داخل الموقع.",
                },
                {
                  icon: "🛠️",
                  title: "المشكلات التقنية",
                  text: "الإبلاغ عن روابط لا تعمل أو أخطاء في العرض أو النماذج أو وظائف الموقع.",
                },
                {
                  icon: "💬",
                  title: "الاستفسارات العامة",
                  text: "التواصل معنا بخصوص الموقع أو محتواه أو طريقة استخدام الصفحات والأدوات.",
                },
              ]}
            />
          </Section>

          {/* EMAIL */}
          <ResponsiveTextSection title="البريد الإلكتروني">
            <p>
              للتواصل المباشر والرسمي مع فريق بروكر العرب، استخدم البريد
              الإلكتروني التالي:
            </p>

            <a
              dir="ltr"
              href="mailto:info@brokeralarab.com"
              className="flex min-h-[58px] items-center justify-center rounded-2xl border border-brand-100 bg-[#f8fbff] px-4 py-3 text-center text-[16px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-50 sm:justify-end sm:text-[18px]"
            >
              info@brokeralarab.com
            </a>

            <p>
              يعد البريد الإلكتروني الخيار الأفضل للطلبات الرسمية، واستفسارات
              الشراكات، وتحديثات معلومات الشركات، والمراسلات التي قد تحتاج إلى
              تفاصيل إضافية أو متابعة لاحقة.
            </p>
          </ResponsiveTextSection>

          {/* IMPORTANT NOTES */}
          <ResponsiveTextSection title="قبل إرسال رسالتك">
            <p>
              اجعل رسالتك واضحة ومحددة، واذكر اسم الشركة أو الصفحة أو الأداة أو
              المشكلة المقصودة. كما يفضل إضافة رابط الصفحة عند توفره حتى نتمكن
              من مراجعة الطلب بصورة أسرع.
            </p>

            <p>
              بروكر العرب هو موقع معلومات وتقييمات ومقارنات ومحتوى تعليمي، وليس
              شركة وساطة مالية أو منصة تداول أو مستشارًا استثماريًا أو مزود دفع
              أو خدمة لإدارة الحسابات.
            </p>

            <p>
              لا نملك صلاحية الوصول إلى حسابات العملاء لدى شركات التداول، ولا
              يمكننا تنفيذ الإيداعات أو السحوبات أو إجراءات التحقق أو استعادة
              كلمات المرور أو معالجة شكاوى المنصات نيابة عن المستخدمين.
            </p>
          </ResponsiveTextSection>

          {/* SAFETY NOTICE */}
          <ResponsiveTextSection title="تنبيه أمني مهم">
            <p>
              لا يطلب بروكر العرب من المستخدمين تحويل الأموال أو مشاركة كلمات
              مرور حسابات التداول أو تقديم بيانات بطاقات الدفع أو معلومات
              تسجيل الدخول.
            </p>

            <p>
              نحن لا ندير حسابات التداول، ولا ننفذ الصفقات، ولا نقدم وعودًا
              بأرباح مضمونة، ولا نستقبل الإيداعات من زوار الموقع.
            </p>

            <p>
              إذا تواصل معك شخص يدعي تمثيل بروكر العرب وطلب أموالًا أو كلمات
              مرور أو بيانات دفع أو معلومات سرية تخص الحساب، فلا تقدم له هذه
              المعلومات.
            </p>
          </ResponsiveTextSection>

          {/* BROKER ISSUES */}
          <ResponsiveTextSection title="مشكلات الحسابات والإيداع والسحب">
            <p>
              يجب عادةً معالجة الشكاوى المتعلقة بالإيداع والسحب وقيود الحساب
              والتحقق من الهوية والوصول إلى المنصة وتنفيذ الصفقات مباشرة مع
              شركة التداول المعنية.
            </p>

            <p>
              عند الحاجة، يمكن للمستخدم أيضًا التواصل مع الجهة الرقابية أو جهة
              فض النزاعات المرتبطة بالكيان القانوني الذي يدير حسابه.
            </p>

            <p>
              قد ينشر بروكر العرب معلومات عامة عن الشركة، لكننا لا نتحكم في
              قرارات الحساب أو إجراءات الدفع أو خدمة العملاء أو نظام الشكاوى
              الداخلي الخاص بها.
            </p>
          </ResponsiveTextSection>

          {/* PARTNERSHIPS */}
          <ResponsiveTextSection title="فرص الشراكة والتعاون">
            <p>
              على الشركات والجهات المهتمة بالتعاون مع بروكر العرب تقديم تعريف
              واضح يتضمن اسم الشركة ورابط موقعها وموضوع الطلب ووسيلة التواصل
              المفضلة.
            </p>

            <p>
              قد تشمل فرص التعاون الشراكات الإعلامية، وتغطية الفعاليات، وتحديث
              صفحات الشركات، والإعلانات، والبرامج التابعة، والحملات المدفوعة،
              وتبادل البيانات، والمشروعات المهنية ذات الصلة.
            </p>

            <p>
              إرسال الطلب لا يعني قبوله تلقائيًا، وقد نطلب معلومات إضافية عن
              الشركة أو الحملة قبل مراجعة التعاون المقترح.
            </p>
          </ResponsiveTextSection>

          {/* RESPONSE TIMES */}
          <ResponsiveTextSection title="مدة الرد على الرسائل">
            <p>
              نسعى إلى مراجعة الرسائل الجادة في أقرب وقت معقول، لكن مدة الرد قد
              تختلف بحسب موضوع الرسالة وكمية المعلومات المقدمة وما إذا كانت
              تحتاج إلى تحقق أو بحث إضافي.
            </p>

            <p>
              قد لا يتم الرد على الرسائل غير الواضحة أو غير المرتبطة بالموقع أو
              الرسائل الإعلانية المزعجة أو الطلبات التي تتضمن نصائح تداول
              شخصية.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}