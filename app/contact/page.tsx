import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا | بروكر العرب",
  description:
    "تواصل مع فريق بروكر العرب للاستفسارات العامة، التعاون، الملاحظات على مراجعات شركات التداول، أو الإبلاغ عن أي معلومات تحتاج إلى تحديث.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "اتصل بنا | بروكر العرب",
    description:
      "تواصل مع فريق بروكر العرب للاستفسارات العامة، التعاون، الملاحظات على مراجعات شركات التداول، أو الإبلاغ عن أي معلومات تحتاج إلى تحديث.",
    url: "https://brokeralarab.com/contact",
    siteName: "بروكر العرب",
    type: "website",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-950">{title}</h2>
      <div className="space-y-4 leading-8 text-slate-700">{children}</div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <header className="mb-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            تواصل معنا
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            اتصل بنا
          </h1>

          <p className="max-w-4xl text-lg leading-9 text-slate-600">
            إذا كانت لديك ملاحظة حول إحدى مراجعات شركات التداول، أو رغبت في
            التواصل معنا بخصوص تحديث محتوى، أو فرصة تعاون، أو استفسار عام
            متعلق بالموقع، يمكنك مراسلتنا عبر البريد الإلكتروني الموضح أدناه.
          </p>
        </header>

        <div className="grid gap-6">
          <Section title="البريد الإلكتروني">
            <p>
              للتواصل الرسمي مع فريق بروكر العرب، يرجى استخدام البريد
              الإلكتروني التالي:
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-lg font-extrabold text-slate-950">
              info@brokeralarab.com
            </div>

            <p>
              نفضل أن يكون التواصل عبر البريد الإلكتروني، خاصة في المسائل
              المتعلقة بالشراكات أو التحديثات أو الاستفسارات الرسمية، وذلك لضمان
              وضوح المراسلات وإمكانية متابعتها بشكل منظم.
            </p>
          </Section>

          <Section title="متى يمكنك مراسلتنا؟">
            <p>يمكن مراسلتنا بخصوص الأمور التالية على سبيل المثال:</p>

            <ul className="space-y-3 pr-5">
              <li className="list-disc">
                الاستفسار عن محتوى منشور في إحدى صفحات التقييم أو المقارنة.
              </li>
              <li className="list-disc">
                طلب تصحيح أو تحديث معلومة تتعلق بإحدى شركات التداول.
              </li>
              <li className="list-disc">
                التواصل بخصوص فرص الشراكة التسويقية أو البرامج التابعة.
              </li>
              <li className="list-disc">
                الإبلاغ عن رابط لا يعمل أو صفحة تحتاج إلى تحسين.
              </li>
              <li className="list-disc">
                الاستفسارات العامة المتعلقة بالموقع ومحتواه.
              </li>
            </ul>
          </Section>

          <Section title="ملاحظات مهمة قبل التواصل">
            <p>
              يرجى توضيح موضوع الرسالة بشكل مباشر، وذكر اسم الصفحة أو الشركة
              المقصودة إن كان استفسارك يتعلق بمراجعة معينة، حتى نتمكن من فهم
              طلبك بصورة أسرع.
            </p>

            <p>
              كما نرجو العلم بأن بروكر العرب هو موقع محتوى ومراجعات، وليس شركة
              وساطة مالية، وليس جهة لإدارة المحافظ أو تنفيذ الصفقات أو استقبال
              أموال العملاء.
            </p>

            <p>
              لذلك لا يمكننا المساعدة في تنفيذ عمليات إيداع أو سحب داخل حسابات
              التداول، ولا نملك صلاحية الوصول إلى حسابات العملاء لدى الشركات
              المذكورة في الموقع.
            </p>
          </Section>

          <Section title="تنبيه مهم وإخلاء مسؤولية">
            <p>
              بروكر العرب لا يطلب من المستخدمين تحويل أموال، ولا يدير حسابات
              تداول، ولا يقدم وعودًا بالربح، ولا يتواصل مع الزوار لطلب بيانات
              الدخول أو بطاقات الدفع أو كلمات المرور.
            </p>

            <p>
              إذا تواصل معك أي شخص مدعيًا أنه يمثل الموقع وطلب منك أموالًا أو
              بيانات حساسة أو وعدك بعوائد استثمارية، فيجب اعتبار ذلك تصرفًا غير
              معتمد من طرفنا، ونوصي بعدم التعامل معه.
            </p>

            <p>
              كما أن أي نزاع أو مشكلة أو مطالبة أو ضرر ينشأ بين المستخدم وأي
              شركة تداول مذكورة في الموقع يجب معالجته مباشرة مع تلك الشركة أو
              مع الجهات المختصة، لأن دور الموقع يقتصر على النشر المعلوماتي
              والتعريفي فقط.
            </p>
          </Section>

          <Section title="فرص التعاون">
            <p>
              إذا كنت تمثل شركة تداول أو جهة ذات صلة، وترغب في التواصل بخصوص
              شراكة تسويقية أو تحديث معلومات أو تعاون مهني، يرجى إرسال رسالة
              واضحة تتضمن اسم الشركة وطبيعة الطلب ووسيلة التواصل المناسبة.
            </p>

            <p>
              قد نطلب أحيانًا استكمال بعض المعلومات عبر البريد الإلكتروني قبل
              النظر في أي تعاون، وخاصة عندما يتعلق الأمر ببرامج IB أو Affiliate
              أو تحديثات تخص صفحات الشركات.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}