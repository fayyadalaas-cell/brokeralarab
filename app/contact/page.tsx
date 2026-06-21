import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع فريق بروكر العرب للاستفسارات العامة، التعاون، الملاحظات على مراجعات شركات التداول، أو الإبلاغ عن أي معلومات تحتاج إلى تحديث.",
  alternates: {
    canonical: "https://brokeralarab.com/contact",
    languages: {
      ar: "https://brokeralarab.com/contact",
      en: "https://brokeralarab.com/en/contact",
      "x-default": "https://brokeralarab.com/en/contact",
    },
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
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <h2 className="mb-4 text-2xl font-extrabold text-slate-950">{title}</h2>
      <div className="space-y-4 text-base leading-8 text-slate-700">
        {children}
      </div>
    </section>
  );
}

function Label({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-extrabold text-slate-800">
      {children}
      {required && <span className="mr-1 text-red-600">*</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

export default function ContactPage() {
  return (
    <main className="bg-slate-50" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <header className="mb-5 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            تواصل معنا
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            اتصل بنا
          </h1>

          <p className="max-w-none text-base leading-8 text-slate-600 md:text-lg md:leading-9">
            إذا كانت لديك ملاحظة حول إحدى مراجعات شركات التداول، أو رغبت في
            التواصل معنا بخصوص تحديث محتوى، أو فرصة تعاون، أو استفسار عام متعلق
            بالموقع، يمكنك مراسلتنا عبر النموذج أو البريد الإلكتروني أدناه.
          </p>
        </header>

        <div className="grid gap-5">
          <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <div className="mb-6">
              <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                نموذج التواصل
              </div>

              <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
                أرسل لنا رسالة
              </h2>

              <p className="mt-3 max-w-none text-base leading-8 text-slate-600">
                استخدم هذا النموذج للاستفسارات العامة، تحديث معلومات الشركات،
                طلبات الشراكة، فرص الإعلان، أو الإبلاغ عن مشاكل تقنية متعلقة
                بموقع بروكر العرب.
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                الحقول التي تحتوي على <span className="text-red-600">*</span>{" "}
                مطلوبة.
              </p>
            </div>

            <form action="/api/contact" method="post">
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label required>الاسم الكامل</Label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="اكتب اسمك الكامل"
                    className={inputClass}
                  />
                </div>

                <div>
                  <Label required>البريد الإلكتروني</Label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                    dir="ltr"
                  />
                </div>

                <div>
                  <Label>رقم الهاتف</Label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="اختياري"
                    className={inputClass}
                    dir="ltr"
                  />
                </div>

                <div>
                  <Label required>نوع الطلب</Label>
                  <select
                    name="type"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      اختر نوع الطلب
                    </option>
                    <option value="General Inquiry">استفسار عام</option>
                    <option value="Content Update">تحديث محتوى</option>
                    <option value="Broker Inquiry">استفسار عن شركة تداول</option>
                    <option value="Partnership">شراكة أو تعاون</option>
                    <option value="Advertising">إعلان أو رعاية</option>
                    <option value="Technical Issue">مشكلة تقنية</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <Label required>عنوان الرسالة</Label>
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="اكتب عنواناً مختصراً"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label required>الرسالة</Label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="اكتب رسالتك هنا..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
                <p className="text-sm leading-7 text-slate-500">
                  يرجى عدم إرسال كلمات مرور، بيانات دفع، أو معلومات دخول خاصة
                  بحسابات التداول.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-8 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-800"
                >
                  إرسال الرسالة
                </button>
              </div>
            </form>
          </section>

          <Section title="البريد الإلكتروني">
            <p>
              للتواصل الرسمي مع فريق بروكر العرب، يرجى استخدام البريد الإلكتروني
              التالي:
            </p>

            <div
              dir="ltr"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right text-lg font-extrabold text-slate-950"
            >
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
              شركة تداول مذكورة في الموقع يجب معالجته مباشرة مع تلك الشركة أو مع
              الجهات المختصة، لأن دور الموقع يقتصر على النشر المعلوماتي والتعريفي
              فقط.
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