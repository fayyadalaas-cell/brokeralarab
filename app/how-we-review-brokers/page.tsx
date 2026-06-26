import Link from "next/link";

export const metadata = {
  title: "منهجية تقييم شركات التداول | كيف نراجع الوسطاء",
  description:
    "تعرف على منهجية بروكر العرب في تقييم شركات التداول عبر أكثر من 150 معياراً تشمل التراخيص، الرسوم، الحسابات، المنصات، الإيداع والسحب والدعم.",
};

const criteria = [
  {
    title: "التراخيص وحماية الأموال",
    weight: "25%",
    text: "نراجع قوة الجهات الرقابية، وضوح الترخيص، فصل أموال العملاء، حماية الرصيد السالب، وتاريخ الشركة التشغيلي.",
    points: ["قوة الجهة الرقابية", "فصل أموال العملاء", "حماية الرصيد السالب", "الشفافية التنظيمية"],
  },
  {
    title: "الرسوم والسبريد",
    weight: "20%",
    text: "نقارن السبريد، العمولات، رسوم السحب، رسوم عدم النشاط، وتكاليف التداول الفعلية على مختلف أنواع الحسابات.",
    points: ["السبريد", "العمولات", "رسوم السحب", "تكاليف التبييت"],
  },
  {
    title: "أنواع الحسابات",
    weight: "15%",
    text: "نحلل الحسابات المتاحة، الحد الأدنى للإيداع، الحساب الإسلامي، الحساب التجريبي، ومدى مناسبة الحسابات لفئات مختلفة من المتداولين.",
    points: ["الحساب القياسي", "الحساب الإسلامي", "الحساب التجريبي", "الحد الأدنى للإيداع"],
  },
  {
    title: "منصات التداول",
    weight: "15%",
    text: "نراجع توفر MT4 و MT5 وتطبيقات الهاتف وWebTrader، مع التركيز على سهولة الاستخدام وسرعة التنفيذ واستقرار المنصة.",
    points: ["MT4", "MT5", "تطبيق الجوال", "سرعة التنفيذ"],
  },
  {
    title: "الإيداع والسحب",
    weight: "15%",
    text: "نقارن طرق الدفع، سرعة السحب، وضوح الشروط، الرسوم المحتملة، ومدى سهولة إدارة الأموال من داخل الحساب.",
    points: ["طرق الدفع", "سرعة السحب", "وضوح الشروط", "رسوم التحويل"],
  },
  {
    title: "الدعم وتجربة المستخدم",
    weight: "10%",
    text: "نقيّم توفر الدعم العربي، سرعة الاستجابة، وضوح الموقع، سهولة فتح الحساب، وسهولة الوصول إلى المعلومات المهمة.",
    points: ["الدعم العربي", "سرعة الرد", "سهولة التسجيل", "وضوح المعلومات"],
  },
];

const sources = [
  "المواقع الرسمية لشركات التداول",
  "صفحات التراخيص والهيئات الرقابية",
  "شروط الحسابات والرسوم والمنصات",
  "المواد التعريفية المنشورة من الشركات",
  "تحديثات المنتجات والخدمات عند توفرها",
  "تجربة المستخدم ووضوح المعلومات",
];

export default function HowWeReviewBrokersPage() {
  return (
   <main dir="rtl" className="mx-auto max-w-7xl px-4 pt-8 pb-2 text-right sm:px-5 md:pt-10 md:pb-3">
      {/* Hero */}
      <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-brand-50 shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_280px] md:p-10 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-black text-brand-600">
              منهجية التقييم
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
              كيف نقيّم شركات التداول في بروكر العرب؟
            </h1>

            <p className="mt-5 max-w-5xl text-base leading-8 text-slate-700 md:text-lg">
              نعتمد في بروكر العرب على منهجية منظمة لمراجعة شركات التداول ومقارنة الوسطاء،
              بهدف مساعدة المتداول العربي على فهم الفروقات الحقيقية بين الشركات قبل فتح
              حساب حقيقي أو تجريبي. تشمل مراجعاتنا أكثر من 150 معياراً تغطي التراخيص،
              الرسوم، الحسابات، المنصات، الإيداع والسحب، وتجربة المستخدم.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xl font-black text-slate-950">
              تقييم عملي لاختيار وسيط موثوق
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              لا نعتمد على الإعلانات فقط، بل نرتب المعلومات الأساسية التي يحتاجها المتداول
              قبل اتخاذ قراره.
            </p>
            <Link
              href="/brokers"
              className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-brand-500 px-5 text-sm font-black text-white hover:bg-brand-600"
            >
              تصفح تقييمات الوسطاء
            </Link>
          </div>
        </div>

        <div className="grid gap-3 border-t border-slate-200 bg-white/70 p-5 md:grid-cols-4">
          {[
            ["150+", "معيار تقييم"],
            ["50+", "وسيط تمت مراجعته"],
            ["6", "محاور رئيسية"],
            ["شهرياً", "تحديث البيانات"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-black text-brand-600">{value}</div>
              <div className="mt-2 text-sm font-bold text-slate-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro SEO content */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">
          لماذا نستخدم منهجية واضحة في تقييم الوسطاء؟
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-8 text-slate-700 md:text-base">
          <p>
            سوق التداول مليء بالعروض التسويقية والوعود التي قد تجعل المقارنة بين شركات
            التداول صعبة على المستخدم. لذلك نحرص في بروكر العرب على تحويل المعلومات
            المتفرقة إلى مراجعة منظمة تساعد الزائر على فهم نقاط القوة والضعف في كل وسيط.
          </p>
          <p>
            لا يهدف التقييم إلى دفع المستخدم نحو شركة معينة، بل إلى توفير إطار واضح
            للمقارنة بين الوسطاء من حيث الأمان، التكاليف، الحسابات، المنصات، السحب
            والإيداع، والدعم المقدم للمتداولين العرب.
          </p>
        </div>
      </section>

     {/* Criteria */}
<section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
  <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
    <div>
      <h2 className="text-3xl font-black text-slate-950">
        معايير تقييم شركات التداول
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        نقسم التقييم إلى محاور رئيسية تساعد المستخدم على فهم الصورة الكاملة لكل وسيط.
      </p>
    </div>
  </div>

  <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    {criteria.map((item, index) => (
      <article
        key={item.title}
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-black text-brand-600">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
            الوزن: {item.weight}
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-950">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {item.text}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.points.map((point) => (
            <span
              key={point}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
            >
              {point}
            </span>
          ))}
        </div>
      </article>
    ))}
  </div>
</section>

      {/* Sources */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">كيف نجمع المعلومات؟</h2>
        <p className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
          تعتمد عملية المراجعة على جمع المعلومات من مصادر متعددة ثم إعادة تنظيمها
          بطريقة واضحة تناسب المستخدم العربي.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sources.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-700">
                ✓
              </span>
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Score table */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">كيف نحسب التقييم النهائي؟</h2>
        <p className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
          لا يعتمد التقييم النهائي على عامل واحد فقط، بل على مجموع نقاط موزعة بين
          عدة محاور رئيسية. هذه الأوزان تقريبية وقد تختلف قليلاً بحسب طبيعة الشركة
          وتوفر المعلومات.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 font-black">المعيار</th>
                <th className="p-4 font-black">الوزن التقريبي</th>
                <th className="p-4 font-black">ما الذي نراجعه؟</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {criteria.map((item) => (
                <tr key={item.title} className="bg-white">
                  <td className="p-4 font-black text-slate-950">{item.title}</td>
                  <td className="p-4 font-black text-brand-600">{item.weight}</td>
                  <td className="p-4 leading-7 text-slate-600">{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Independence + affiliate */}
      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-slate-950">سياسة الاستقلالية</h2>
          <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
            نطبق في بروكر العرب منهجية موحدة على جميع شركات التداول المدرجة في الموقع.
            وجود شركة ضمن صفحاتنا أو حصولها على تقييم معين لا يعني أنها مناسبة لجميع
            المستخدمين، كما لا يمثل ضماناً لجودة خدماتها في كل وقت أو في كل دولة.
          </p>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-slate-950">الروابط التابعة والإعلانات</h2>
          <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
            قد يحتوي الموقع على روابط تابعة أو إعلانية لبعض شركات التداول. في بعض الحالات
            قد نحصل على عمولة تسويقية عند التسجيل عبر بعض الروابط، دون تكلفة إضافية على
            المستخدم عادةً. مع ذلك، تخضع الشركات لنفس معايير المراجعة الأساسية.
          </p>
        </div>
      </section>

      {/* Updates */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">متى نحدّث المراجعات؟</h2>
        <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
          نحاول تحديث صفحات التقييم بشكل دوري عند ظهور تغييرات مهمة في شروط التداول،
          الرسوم، أنواع الحسابات، التراخيص، طرق الإيداع والسحب أو تجربة المستخدم.
          ومع ذلك، قد تختلف بعض المعلومات بحسب الدولة أو الجهة التنظيمية أو نوع الحساب،
          لذلك ننصح المستخدم دائماً بمراجعة الموقع الرسمي للشركة قبل التسجيل.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mt-8 rounded-[30px] border border-brand-100 bg-brand-50 p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-slate-950">تنويه مهم</h2>
        <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
          المحتوى المنشور في بروكر العرب لأغراض تعليمية وإعلامية فقط، ولا يمثل نصيحة
          استثمارية أو توصية مالية أو دعوة لشراء أو بيع أي منتج مالي. يجب على كل مستخدم
          إجراء بحثه الخاص والتأكد من ملاءمة أي شركة أو خدمة لاحتياجاته وخبرته ووضعه
          القانوني والمالي.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/brokers"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white hover:bg-brand-600"
          >
            تصفح تقييمات الوسطاء
          </Link>

          <Link
            href="/about"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 text-sm font-black text-brand-600 hover:bg-brand-50"
          >
            عن بروكر العرب
          </Link>
        </div>
      </section>
    </main>
  );
}