import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* =====================================================
   PAGE SEO CONSTANTS
====================================================== */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/best-brokers/scalping`;
const PAGE_IMAGE_URL = `${BASE_URL}/og-image.webp`;

const PAGE_TITLE =
  "أفضل شركات الفوركس للسكالبينج 2026";

const PAGE_HEADLINE =
  "أفضل شركات الفوركس للسكالبينج في 2026";

const PAGE_DESCRIPTION =
  "مقارنة أفضل شركات الفوركس للسكالبينج في 2026 حسب السبريد والعمولة وسرعة التنفيذ وحسابات Raw وECN ومنصات MT4 وMT5 وcTrader.";

const DATE_PUBLISHED = "2026-07-30";
const DATE_MODIFIED = "2026-07-30";

/*
 * Google لا يستخدم meta keywords في الترتيب،
 * لكننا نعيد استخدام هذه العبارات داخل Article Schema
 * وعناوين الصفحة والمحتوى بصورة طبيعية.
 */
const PAGE_KEYWORDS = [
  "أفضل شركات الفوركس للسكالبينج",
  "أفضل شركة فوركس للسكالبينج",
  "أفضل وسيط فوركس للسكالبينج",
  "أفضل بروكر للسكالبينج",
  "شركات فوركس تسمح بالسكالبينج",
  "شركات تداول تسمح بالسكالبينج",
  "أفضل شركات التداول للسكالبينج",
  "سكالبينج الفوركس",
  "المضاربة السريعة في الفوركس",
  "أفضل حساب للسكالبينج",
  "حساب Raw Spread للسكالبينج",
  "حساب ECN للسكالبينج",
  "أقل سبريد للسكالبينج",
  "أقل عمولة سكالبينج",
  "أفضل منصة للسكالبينج",
  "أفضل وسيط cTrader للسكالبينج",
  "أفضل وسيط MT5 للسكالبينج",
  "أفضل شركات الفوركس 2026",
];

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  sort_order: number | null;
  spread_avg: number | null;
  spread_min: number | null;
  account_type: string | null;
  is_islamic_available: boolean | null;
  islamic_conditions: string | null;
  commission_value: number | null;
  commission_en: string | null;
  min_deposit_en: string | null;
  best_for_en: string | null;
  is_best_for_scalping: boolean | null;
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  regulation: string | null;
  regulation_short: string | null;
  platforms: string | null;
  arabic_support: string | null;
  islamic_account: string | null;
  min_deposit: number | null;
  max_leverage: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

/* =====================================================
   SUPABASE BROKER RELATION TYPES
====================================================== */

/**
 * الشكل الخام الذي قد يرجع من Supabase.
 * العلاقة قد تكون كائنًا واحدًا أو مصفوفة أو null.
 */
type RawScalpingBroker = BrokerAccount & {
  broker: Broker | Broker[] | null;
};

/**
 * الشكل النهائي بعد التحقق والتنظيف.
 * هنا نضمن أن broker وslug وname موجودة.
 */
type ValidScalpingBroker = BrokerAccount & {
  broker: Broker & {
    slug: string;
    name: string;
  };
};

type EditorialDetails = {
  rank: number;
  score: number;
  award: string;
  shortAward: string;
  verdict: string;
  whySelected: string[];
  warning: string;
  reviewText: string[];
};

const editorialData: Record<string, EditorialDetails> = {
  "icmarkets": {
    rank: 1,
    score: 9.4,
    award: "الأفضل إجمالًا للسكالبينج الاحترافي",
    shortAward: "الأفضل إجمالًا",
    verdict:
  "خيار قوي للمتداول النشط الذي يبحث عن حساب Raw Spread عبر cTrader بتكلفة منخفضة وبيئة مناسبة للسكالبينج والتداول الآلي.",
    whySelected: [
      "حساب Raw Spread عبر cTrader يبدأ بسبريد خام منخفض.",
      "عمولة تنافسية مقارنة بعدد كبير من حسابات Raw.",
      "دعم cTrader وTradingView وبيئة مناسبة للتداول الآلي.",
      "مرونة عالية في وضع الأوامر القريبة من سعر السوق.",
    ],
    warning:
      "المتداول الذي يعتمد على Expert Advisors مكتوبة لـMT4 أو MT5 قد يفضل حساب Raw Spread الخاص بميتاتريدر بدل حساب cTrader.",
    reviewText: [
      "تحتل IC Markets المركز الأول في ترتيبنا لأنها تجمع بين حساب Raw واضح، تكلفة تنافسية، وتنوع قوي في المنصات المناسبة للمتداول النشط. الحساب المختار في هذه الصفحة هو Raw Spread المخصص لـcTrader، وليس الحساب القياسي أو حساب Raw الخاص بميتاتريدر.",
      "تظهر قوة الشركة بصورة أوضح عند تنفيذ عدد كبير من الصفقات؛ لأن فرق العمولة البسيط يصبح مؤثرًا مع ارتفاع حجم التداول. كما أن وجود cTrader وTradingView يمنح المتداول أدوات مناسبة للتداول بنقرة واحدة ومتابعة عمق السوق.",
      "مع ذلك، لا يعني المركز الأول أنها الخيار الأنسب للجميع. من يعتمد على روبوتات MQL4 أو MQL5 سيحتاج إلى حساب ومنصة مختلفين، كما أن التنفيذ السوقي لا يلغي احتمال الانزلاق أثناء التحركات السريعة.",
    ],
  },

  pepperstone: {
    rank: 2,
    score: 9.2,
    award: "الأفضل لتعدد منصات السكالبينج",
    shortAward: "أفضل تنوع منصات",
    verdict:
      "مناسبة لمن يريد الانتقال بين MetaTrader وcTrader وTradingView دون التضحية بحساب Raw قوي.",
    whySelected: [
      "حساب Razor مصمم للمتداول النشط والاستراتيجيات الآلية.",
      "دعم MT4 وMT5 وcTrader وTradingView.",
      "سبريد Raw يبدأ من مستويات منخفضة.",
      "شركة قوية من حيث التنظيم وتجربة المنصات.",
    ],
    warning:
      "تكلفة حساب Razor قد تكون أعلى قليلًا من بعض المنافسين الأرخص عند احتساب السبريد والعمولة معًا.",
    reviewText: [
      "الميزة الأساسية لدى Pepperstone ليست رقم العمولة وحده، بل حرية اختيار المنصة. يستطيع المتداول استخدام حساب Razor مع MetaTrader أو cTrader، كما يتوفر تكامل مع TradingView، وهذا يجعلها مناسبة لأساليب سكالبينج متعددة.",
      "تستحق الشركة مركزًا متقدمًا أيضًا بسبب وضوح حساب Razor وانتشارها التنظيمي. وهي خيار عملي لمن لا يريد أن يرتبط بمنصة واحدة أو يحتاج إلى استخدام أدوات مختلفة للتحليل والتنفيذ.",
      "نقطة الضعف أن التكلفة الإجمالية قد لا تكون الأرخص دائمًا مقارنة بـIC Markets أو Tickmill، لذلك يجب مقارنة السبريد الفعلي وقت التداول بدل الاعتماد على عبارة يبدأ من صفر فقط.",
    ],
  },

  tickmill: {
    rank: 3,
    score: 9.1,
    award: "الأفضل للسكالبينج منخفض التكلفة",
    shortAward: "أقل تكلفة قوية",
    verdict:
      "حساب Raw واضح وعمولة منخفضة وسياسة مناسبة للصفقات القصيرة والتداول الخوارزمي.",
    whySelected: [
      "عمولة منخفضة مقارنة بكثير من حسابات Raw.",
      "السكالبينج والـEA والتداول عالي التردد مدعومة.",
      "لا تعتمد جاذبية الحساب على بونص أو عرض مؤقت.",
      "بنية حساب بسيطة وسهلة المقارنة.",
    ],
    warning:
      "تنوع المنصات والأدوات الإضافية أقل من Pepperstone وIC Markets.",
    reviewText: [
      "تتميز Tickmill بالبساطة: حساب Raw، عمولة واضحة، وسياسة مناسبة للمتداول الذي يفتح ويغلق عددًا كبيرًا من الصفقات. لذلك وضعناها في المركز الثالث رغم أنها قد تتفوق من حيث التكلفة المباشرة على شركات أعلى منها.",
      "لم تحصل على المركز الأول لأن تقييمنا لا يعتمد على العمولة فقط؛ بل يشمل تنوع المنصات، الأدوات، والمرونة العامة. لكنها تظل من أقوى الخيارات لمن يستخدم MetaTrader ويريد تجنب التكلفة المرتفعة.",
      "يجب على المتداول متابعة السبريد أثناء فترات الأخبار وافتتاح الجلسات، لأن انخفاض العمولة لا يضمن بقاء التكلفة الإجمالية منخفضة في جميع ظروف السوق.",
    ],
  },

  "fp-markets": {
    rank: 4,
    score: 8.9,
    award: "الأفضل للجمع بين MetaTrader وcTrader",
    shortAward: "مرونة منصات قوية",
    verdict:
      "بديل متوازن يقدم حساب Raw منخفض التكلفة مع مجموعة جيدة من منصات التنفيذ.",
    whySelected: [
      "حساب Raw بعمولة تنافسية.",
      "توفر MT4 وMT5 وcTrader وTradingView.",
      "مناسب للتداول اليدوي والخوارزمي.",
      "تسعير واضح نسبيًا في حساب Raw.",
    ],
    warning:
      "تجربة البحث والتطبيقات الإضافية ليست الأقوى مقارنة بالمنافسين الثلاثة الأوائل.",
    reviewText: [
      "FP Markets خيار متوازن للمتداول الذي يريد تكلفة حساب Raw منخفضة مع حرية استخدام أكثر من منصة. لا تعتمد جاذبيتها على ميزة واحدة فقط، ولذلك تناسب من يبحث عن وسيط شامل للسكالبينج والتداول اليومي.",
      "العمولة المنخفضة تجعل الحساب منافسًا مباشرًا لـTickmill وVantage، بينما يمنحه توفر cTrader وTradingView نقطة إضافية في تقييم المنصات.",
      "لم نضعها ضمن أول ثلاثة لأن تجربة الأدوات والبحث والواجهة العامة ليست مميزة بالدرجة نفسها، لكن الحساب نفسه قوي من ناحية التكلفة والتنفيذ.",
    ],
  },

  thinkmarkets: {
    rank: 5,
    score: 8.6,
    award: "الأفضل للمتداول ذي الحجم المرتفع",
    shortAward: "للحجم المرتفع",
    verdict:
      "حساب ThinkZero مناسب للمتداول الجاد الذي يقبل إيداعًا أوليًا أعلى مقابل بيئة Raw.",
    whySelected: [
      "حساب ThinkZero يبدأ بسبريد منخفض.",
      "مناسب للسكالبينج واستخدام Expert Advisors.",
      "دعم منصات MetaTrader ومنصة ThinkTrader.",
      "شركة ذات حضور تنظيمي جيد.",
    ],
    warning:
      "الحد الأدنى المطلوب لحساب ThinkZero قد يكون أعلى من أغلب الحسابات الموجودة في القائمة.",
    reviewText: [
      "يستهدف حساب ThinkZero المتداول الأكثر نشاطًا وليس الشخص الذي يريد تجربة السكالبينج بإيداع صغير. ولذلك حافظت ThinkMarkets على مركز قوي، لكنها لم تتقدم على الشركات التي توفر نقطة دخول أقل تكلفة.",
      "الحساب مناسب لاستخدام Expert Advisors وللصفقات المتكررة، كما تمنح منصة ThinkTrader الشركة جانبًا مختلفًا عن الوسطاء الذين يعتمدون بالكامل على MetaTrader.",
      "نقطة القرار الأساسية هنا هي رأس المال: الحساب جيد، لكن من يملك ميزانية محدودة سيجد بدائل أسهل في Tickmill أو FP Markets أو Vantage.",
    ],
  },

  fxpro: {
    rank: 6,
    score: 8.5,
    award: "الأفضل لمن يعطي التنظيم أولوية",
    shortAward: "تنظيم وتنفيذ",
    verdict:
      "شركة راسخة مع حساب Raw+ ومنصات متعددة، لكنها ليست الأرخص أو الأكثر مرونة للأوامر شديدة القرب.",
    whySelected: [
      "سجل طويل وحضور تنظيمي قوي.",
      "حساب Raw+ مخصص للتسعير القائم على العمولة.",
      "دعم MT4 وMT5 ومنصات أخرى.",
      "مناسبة لمن يوازن بين الثقة والأداء.",
    ],
    warning:
      "قد توجد مسافة دنيا لبعض أوامر الوقف والحد، كما أن التكلفة ليست الأقل في القائمة.",
    reviewText: [
      "دخلت FxPro القائمة بسبب قوة علامتها التنظيمية وتنوع بنيتها التقنية، وليس لأنها تقدم أرخص حساب Raw. وهي مناسبة لمن يفضّل التعامل مع شركة راسخة حتى لو دفع تكلفة أعلى قليلًا.",
      "حساب Raw+ يمنح المتداول سبريدًا منخفضًا مع عمولة منفصلة، لكن بعض استراتيجيات السكالبينج التي تضع الأوامر شديدة القرب من السعر قد تجد مرونة أكبر لدى IC Markets.",
      "هذا يجعل FxPro خيارًا متوازنًا، لكنه ليس الاختيار الأول لمن تكون الأولوية الوحيدة لديه هي أقل تكلفة ممكنة.",
    ],
  },

  exness: {
    rank: 7,
    score: 8.4,
    award: "الأفضل للمتداول العربي",
    shortAward: "أفضل دعم عربي",
    verdict:
      "خيار عملي للمتداول العربي بفضل سهولة الوصول والدعم وخيارات الحساب، مع ضرورة الانتباه لاختلاف الكيان والعمولة حسب الأداة.",
    whySelected: [
      "حضور قوي ودعم واسع للمتداول العربي.",
      "حساب Raw Spread يبدأ من سبريد منخفض.",
      "خيارات إيداع وسحب متنوعة في كثير من الدول.",
      "توفر حسابات دون فوائد تبييت وفق الشروط.",
    ],
    warning:
      "العمولة قد تختلف حسب الأداة، كما تختلف حماية العميل وخصائص الحساب حسب الكيان المسجل تحته.",
    reviewText: [
      "لا تحتل Exness المركز الأول رغم شعبيتها الكبيرة عربيًا؛ لأن الشعبية وسهولة السحب ليستا المعيار الوحيد للسكالبينج. التكلفة الفعلية والكيان التنظيمي ونوع الأداة عوامل أكثر أهمية في هذا الترتيب.",
      "حساب Raw Spread مناسب للصفقات القصيرة، كما أن الدعم العربي وطرق الدفع يجعلان الشركة سهلة الاستخدام لعدد كبير من المتداولين في المنطقة.",
      "يجب عدم عرض العمولة على أنها رقم ثابت لجميع الأدوات، كما ينبغي التحقق من الكيان القانوني الذي سيفتح المستخدم حسابه تحته قبل الإيداع.",
    ],
  },

  vantage: {
    rank: 8,
    score: 8.2,
    award: "الأفضل لسكالبينج MetaTrader",
    shortAward: "لمستخدمي MT5",
    verdict:
      "حساب Raw ECN منخفض التكلفة ومناسب لمن يريد تجربة تقليدية عبر MT4 أو MT5.",
    whySelected: [
      "عمولة تنافسية في حساب Raw ECN.",
      "سبريد يبدأ من مستويات منخفضة.",
      "دعم MT4 وMT5.",
      "وجود حساب Pro ECN للمتداول مرتفع الحجم.",
    ],
    warning:
      "الحساب الأرخص Pro ECN يتطلب عادةً رأس مال مرتفعًا، لذلك لا يناسب أغلب المستخدمين.",
    reviewText: [
      "اخترنا Raw ECN بدل Pro ECN لأن الصفحة موجهة إلى جمهور واسع. الحساب الاحترافي قد يقدم عمولة أقل، لكن متطلبات الدخول تجعله غير عملي لمعظم المتداولين.",
      "Raw ECN حساب واضح لمستخدمي MetaTrader، ويمنح Vantage مكانًا مستحقًا في القائمة، خصوصًا لمن لا يحتاج إلى cTrader.",
      "تراجعت الشركة إلى المركز الثامن لأن الشركات الأعلى تقدم إما تنظيمًا أقوى، أو منصات أكثر، أو تكلفة إجمالية أكثر تنافسية.",
    ],
  },

  justmarkets: {
    rank: 9,
    score: 7.9,
    award: "الأفضل للرافعة المرتفعة مع Raw Spread",
    shortAward: "رافعة مرتفعة",
    verdict:
      "حساب Raw واضح وتكلفة جيدة، لكنه يأتي بدرجة ثقة أقل من الشركات المتقدمة.",
    whySelected: [
      "حساب Raw Spread موجه للسكالبينج.",
      "عمولة منخفضة نسبيًا.",
      "دعم MT4 وMT5.",
      "رافعة مالية مرتفعة وفق الكيان والشروط.",
    ],
    warning:
      "قوة التنظيم والانتشار المؤسسي أقل من الشركات الموجودة في المراكز الأولى.",
    reviewText: [
      "من ناحية خصائص الحساب وحدها، تستطيع JustMarkets المنافسة على مركز أعلى؛ لكن ترتيبنا يأخذ التنظيم والثقة والانتشار في الاعتبار، وليس السبريد والعمولة فقط.",
      "حساب Raw Spread مناسب للمتداول النشط ويعمل عبر منصات MetaTrader، كما أن الرافعة العالية قد تجذب بعض المستخدمين.",
      "الرافعة المرتفعة ليست ميزة مطلقة، ولذلك لا ينبغي استخدامها سببًا وحيدًا لاختيار الشركة أو زيادة حجم المخاطرة.",
    ],
  },

  hfm: {
    rank: 10,
    score: 7.8,
    award: "الأفضل للحساب الإسلامي وأدوات MetaTrader",
    shortAward: "حساب إسلامي",
    verdict:
      "خيار جيد للمتداول العربي الذي يريد حساب Zero وبيئة MetaTrader مع خيارات إسلامية.",
    whySelected: [
      "السكالبينج والـEA متاحان وفق سياسة الشركة.",
      "حساب Zero يبدأ بسبريد منخفض.",
      "دعم MT4 وMT5.",
      "دعم عربي وخيارات حساب إسلامي.",
    ],
    warning:
      "قيمة العمولة والحد الأدنى قد تختلف حسب الكيان والأداة، لذلك يجب فحص مواصفات الحساب قبل فتحه.",
    reviewText: [
      "دخلت HFM القائمة بدل XM لأن حساب Zero الحالي يمنحنا أساسًا أوضح للمقارنة من حيث السبريد ودعم السكالبينج وMetaTrader.",
      "تكون HFM أكثر جاذبية للمتداول العربي الذي يهتم بالدعم والحساب الإسلامي، لكنها لا تتقدم على الشركات الأعلى بسبب اختلاف بعض شروط الحساب حسب الكيان.",
      "يجب ألا نعرض رقمًا موحدًا للعمولة قبل التأكد من الأداة والكيان؛ لذلك تعرض الصفحة القيمة المخزنة في قاعدة البيانات مع تنبيه المستخدم إلى مراجعة المواصفات.",
    ],
  },
};

const faqs = [
  {
    question: "ما أفضل شركة فوركس للسكالبينج في 2026؟",
    answer:
      "جاءت IC Markets في المركز الأول ضمن تقييم بروكر العرب للسكالبينج بسبب حساب Raw Spread عبر cTrader، التكلفة التنافسية، تنوع المنصات والمرونة المناسبة للصفقات القصيرة. لكن الشركة الأنسب تختلف حسب المنصة والميزانية والكيان التنظيمي.",
  },
  {
    question: "هل السكالبينج مسموح لدى جميع شركات الفوركس؟",
    answer:
      "لا. تختلف سياسة السكالبينج بين الشركات والحسابات والكيانات القانونية. يجب مراجعة شروط التداول والتأكد من عدم وجود حد زمني أدنى للصفقة أو قيود على التداول عالي التردد.",
  },
  {
    question: "هل السبريد صفر يعني أن التداول مجاني؟",
    answer:
      "لا. حسابات Raw التي تبدأ من سبريد 0.0 تفرض عادةً عمولة منفصلة، وقد يتسع السبريد أثناء الأخبار أو ضعف السيولة. التكلفة الحقيقية تشمل السبريد والعمولة والانزلاق ورسوم التبييت.",
  },
  {
    question: "ما أفضل نوع حساب للسكالبينج؟",
    answer:
      "غالبًا تناسب حسابات Raw أو ECN المتداول النشط لأنها تقدم سبريدًا أقل مقابل عمولة واضحة، لكن الحساب القياسي قد يكون أبسط إذا كان حجم التداول منخفضًا.",
  },
  {
    question: "هل يمكن استخدام Expert Advisors في السكالبينج؟",
    answer:
      "نعم لدى كثير من الشركات، لكن يجب التأكد من أن الوسيط يسمح بالتداول الآلي، وأن المنصة تدعم لغة الروبوت المستخدمة، مثل MQL على MetaTrader أو C# على cTrader.",
  },
  {
    question: "ما الفرق بين العمولة لكل جهة والعمولة لكل لوت؟",
    answer:
      "العمولة لكل جهة تُدفع عند فتح الصفقة ثم تُدفع مرة أخرى عند إغلاقها. في مقارنات بروكر العرب نحاول عرض إجمالي عمولة الفتح والإغلاق لكل لوت لتسهيل المقارنة.",
  },
  {
    question: "هل MT5 أفضل من MT4 للسكالبينج؟",
    answer:
      "MT5 أحدث ويوفر أدوات وأطرًا زمنية وقدرات اختبار أكثر، لكن MT4 ما زال مناسبًا لعدد كبير من استراتيجيات السكالبينج والروبوتات القديمة. الأهم هو جودة التنفيذ وتوافق الاستراتيجية.",
  },
  {
    question: "هل cTrader جيدة للسكالبينج؟",
    answer:
      "نعم، توفر cTrader التداول بنقرة واحدة وعمق السوق وأدوات تنفيذ مناسبة للمتداول النشط، كما تدعم التداول الآلي عبر cTrader Algo.",
  },
  {
    question: "هل الرافعة المرتفعة مهمة للسكالبينج؟",
    answer:
      "الرافعة تقلل الهامش المطلوب لكنها ترفع القدرة على فتح مراكز أكبر، ما يزيد المخاطر. لا ينبغي اختيار شركة السكالبينج بناءً على الرافعة وحدها.",
  },
  {
    question: "كيف أختبر شركة فوركس قبل استخدامها للسكالبينج؟",
    answer:
      "ابدأ بحساب تجريبي، ثم اختبر بحجم صغير في حساب حقيقي. راقب السبريد وقت التنفيذ والانزلاق وسرعة تنفيذ الأوامر والسحب بدل الاعتماد على الأرقام التسويقية فقط.",
  },
];

/* =====================================================
   SLUG NORMALIZATION + EDITORIAL LOOKUP
====================================================== */
function normalizeBrokerSlug(
  slug: string | null | undefined
): string {
  return slug?.trim().toLowerCase() ?? "";
}

function getEditorial(
  slug: string | null | undefined
): EditorialDetails | null {
  const normalizedSlug = normalizeBrokerSlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  return editorialData[normalizedSlug] ?? null;
}

function formatRating(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return Number(value).toFixed(2);
}

function formatScore(value: number) {
  return value.toFixed(1);
}

function normalizeText(
  value: string | null | undefined,
  fallback = "غير محدد"
) {
  if (!value?.trim()) return fallback;
  return value.trim();
}

function accountSlug(value: string | null | undefined) {
  if (!value?.trim()) return "";

  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function accountPageHref(
  brokerSlug: string,
  accountName: string | null | undefined
) {
  const slug = accountSlug(accountName);

  if (!slug) return null;

  return `/brokers/${brokerSlug}/accounts/${slug}`;
}

function splitValues(value: string | null | undefined, limit = 4) {
  if (!value?.trim()) return [];

  return value
    .split(/\|\||\||,|\/|;|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function getInitials(value: string | null | undefined) {
  if (!value?.trim()) return "BA";

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function accountDeposit(account: BrokerAccount) {
  return (
    normalizeText(account.min_deposit, "") ||
    normalizeText(account.min_deposit_en, "") ||
    "غير محدد"
  );
}

function accountSpread(account: BrokerAccount) {
  if (account.spread?.trim()) return account.spread.trim();

  if (account.spread_min !== null && account.spread_min !== undefined) {
    return `من ${Number(account.spread_min)} نقطة`;
  }

  return "غير محدد";
}

function accountCommission(account: BrokerAccount) {
  return normalizeText(account.commission, "حسب الأداة");
}

function renderStars(rating: number | null | undefined) {
  const safeRating = Math.max(0, Math.min(5, Number(rating ?? 0)));
  const percentage = (safeRating / 5) * 100;

  return (
    <div
      className="relative inline-flex text-[14px] leading-none"
      dir="ltr"
      aria-label={`تقييم ${formatRating(rating)} من 5`}
    >
      <div className="flex gap-0.5 text-slate-300" aria-hidden="true">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
        aria-hidden="true"
      >
        <div className="flex w-max gap-0.5 text-amber-400">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
}


function BrokerLogo({
  broker,
  size = "large",
  linked = true,
}: {
  broker: Broker;
  size?: "small" | "medium" | "large";
  linked?: boolean;
}) {
  const dimensions = {
    small: "h-[50px] w-[80px] rounded-xl",
    medium:
      "h-[60px] w-[92px] rounded-[13px] sm:h-[72px] sm:w-[118px] sm:rounded-[15px]",
    large:
      "h-[72px] w-[116px] rounded-[16px] sm:h-[84px] sm:w-[142px] sm:rounded-[17px]",
  }[size];

  const responsiveSize = {
    small: "80px",
    medium: "118px",
    large: "142px",
  }[size];

  const padding = {
    small: "p-2",
    medium: "p-2",
    large: "p-2",
  }[size];

  const logoContent = broker.logo ? (
    <Image
      src={broker.logo}
      alt={`شعار ${broker.name ?? "شركة الفوركس"}`}
      fill
      className={`object-contain ${padding}`}
      sizes={responsiveSize}
    />
  ) : (
    <span className="text-base font-black text-slate-600">
      {getInitials(broker.name)}
    </span>
  );

  const sharedClassName = `relative flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.07)] ${dimensions}`;

  if (!linked) {
    return (
      <div className={sharedClassName}>
        {logoContent}
      </div>
    );
  }

  return (
    <Link
      href={`/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`اقرأ تقييم ${broker.name ?? "شركة الفوركس"}`}
      className={`${sharedClassName} transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_rgba(30,91,184,0.11)]`}
    >
      {logoContent}
    </Link>
  );
}

/* =====================================================
   PAGE METADATA
====================================================== */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  /*
   * لا يعتمد Google على meta keywords في الترتيب،
   * لكن Next.js قد يخرجها لمحركات أو أدوات أخرى.
   */
  keywords: PAGE_KEYWORDS,

  applicationName: "بروكر العرب",
  category: "المال والأعمال",
  creator: "فريق بروكر العرب",
  publisher: "بروكر العرب",

  authors: [
    {
      name: "فريق بروكر العرب",
    },
  ],

  alternates: {
    canonical: PAGE_URL,

    languages: {
      ar: PAGE_URL,
      en: `${BASE_URL}/en/best-brokers/scalping`,
      "x-default": `${BASE_URL}/en/best-brokers/scalping`,
    },
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "بروكر العرب",
    type: "article",
    locale: "ar_AR",

    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,

    authors: ["فريق بروكر العرب"],

    section: "أفضل شركات الفوركس",

    tags: [
      "شركات الفوركس للسكالبينج",
      "أفضل وسيط للسكالبينج",
      "حساب Raw Spread",
      "حساب ECN",
      "سكالبينج الفوركس",
    ],

    images: [
      {
        url: PAGE_IMAGE_URL,
        width: 1560,
        height: 377,
        alt: "أفضل شركات الفوركس للسكالبينج في 2026",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: PAGE_IMAGE_URL,
        alt: "مقارنة أفضل شركات الفوركس للسكالبينج",
      },
    ],
  },

  other: {
    "article:published_time": DATE_PUBLISHED,
    "article:modified_time": DATE_MODIFIED,
    "article:section": "أفضل شركات الفوركس للسكالبينج",
  },
};

export default async function ScalpingBrokersPage() {
  const supabase = await createClient();

  const { data: accountRows, error } = await supabase
    .from("broker_accounts")
    .select(`
      id,
      broker_id,
      account_name,
      spread,
      commission,
      min_deposit,
      execution_type,
      best_for,
      sort_order,
      spread_avg,
      spread_min,
      account_type,
      is_islamic_available,
      islamic_conditions,
      commission_value,
      commission_en,
      min_deposit_en,
      best_for_en,
      is_best_for_scalping,
      broker:brokers!broker_accounts_broker_id_fkey (
        id,
        name,
        slug,
        logo,
        rating,
        regulation,
        regulation_short,
        platforms,
        arabic_support,
        islamic_account,
        min_deposit,
        max_leverage,
        real_account_url,
        demo_account_url
      )
    `)
    .eq("is_best_for_scalping", true);

  if (error) {
    console.error("Scalping brokers query error:", error);
  }

/* =====================================================
   RAW SUPABASE ACCOUNTS
====================================================== */
const rawAccounts =
  (accountRows ?? []) as unknown as RawScalpingBroker[];

/* =====================================================
   NORMALIZE + VALIDATE + SORT BROKERS
====================================================== */
const brokers: ValidScalpingBroker[] = rawAccounts
  .reduce<ValidScalpingBroker[]>((result, row) => {
    const brokerValue = Array.isArray(row.broker)
      ? row.broker[0] ?? null
      : row.broker;

    if (!brokerValue) {
      return result;
    }

    const normalizedSlug = normalizeBrokerSlug(
      brokerValue.slug
    );

    const normalizedName =
      brokerValue.name?.trim() ?? "";

    if (!normalizedSlug || !normalizedName) {
      return result;
    }

    const editorial = getEditorial(normalizedSlug);

    if (!editorial) {
      return result;
    }

    result.push({
      ...row,
      broker: {
        ...brokerValue,
        slug: normalizedSlug,
        name: normalizedName,
      },
    });

    return result;
  }, [])
  .sort((a, b) => {
    const rankA =
      getEditorial(a.broker.slug)?.rank ?? 999;

    const rankB =
      getEditorial(b.broker.slug)?.rank ?? 999;

    return rankA - rankB;
  });

/* =====================================================
   QUICK PICKS — EXACT TOP 3
====================================================== */
const topThree: ValidScalpingBroker[] = brokers
  .filter((item) => {
    const rank =
      getEditorial(item.broker.slug)?.rank;

    return (
      typeof rank === "number" &&
      rank >= 1 &&
      rank <= 3
    );
  })
  .sort((a, b) => {
    const rankA =
      getEditorial(a.broker.slug)?.rank ?? 999;

    const rankB =
      getEditorial(b.broker.slug)?.rank ?? 999;

    return rankA - rankB;
  });

/* =====================================================
   PAGE TOTALS
====================================================== */
const totalBrokers = brokers.length;
const totalAccounts = brokers.length;
const totalCriteria = 6;

const desktopStats = [
  {
    value: String(totalBrokers),
    title: "شركات",
    desc: "مختارة",
  },
  {
    value: String(totalAccounts),
    title: "حسابات",
    desc: "مقارنة",
  },
  {
    value: String(totalCriteria),
    title: "معايير",
    desc: "تقييم",
  },
];

const mobileStats = [
  [String(totalBrokers), "شركات"],
  [String(totalAccounts), "حسابات"],
  [String(totalCriteria), "معايير"],
] as const;

/* =====================================================
   DEVELOPMENT VALIDATION
====================================================== */
if (
  process.env.NODE_ENV === "development" &&
  topThree.length !== 3
) {
  console.warn("SCALPING TOP THREE IS INCOMPLETE", {
    expectedRanks: [1, 2, 3],

    received: topThree.map((item) => ({
      name: item.broker?.name,
      slug: item.broker?.slug,
      rank: getEditorial(item.broker?.slug)?.rank,
      accountName: item.account_name,
      enabled: item.is_best_for_scalping,
    })),

    allAvailableBrokers: brokers.map((item) => ({
      name: item.broker?.name,
      slug: item.broker?.slug,
      rank: getEditorial(item.broker?.slug)?.rank,
    })),
  });
}

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "أفضل شركات الفوركس للسكالبينج 2026",
  numberOfItems: brokers.length,
  itemListElement: brokers.map((item, index) => {
  const editorial = getEditorial(item.broker.slug);

  return {
    "@type": "ListItem",
    position: editorial?.rank ?? index + 1,
    name: item.broker.name,
    url: `${BASE_URL}/brokers/${item.broker.slug}`,
  };
}),
};

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "أفضل شركات الفوركس",
        item: `${BASE_URL}/best-brokers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "أفضل شركات الفوركس للسكالبينج",
        item: PAGE_URL,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "أفضل شركات الفوركس للسكالبينج 2026",
    description:
      "دليل ومقارنة أفضل شركات وحسابات الفوركس المناسبة للسكالبينج.",
    inLanguage: "ar",
    mainEntityOfPage: PAGE_URL,
    author: {
      "@type": "Organization",
      name: "بروكر العرب",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "بروكر العرب",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-image.webp`,
      },
    },
    dateModified: "2026-07-30",
    datePublished: "2026-07-30",
  };
    return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f4f7fb] text-slate-950"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

    {/* =====================================================
    SCALPING HERO — FINAL PREMIUM
====================================================== */}
<section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f2f7fd_100%)]">
  {/* BACKGROUND */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute -right-40 -top-56 h-[520px] w-[520px] rounded-full bg-brand-100/55 blur-[135px]" />

    <div className="absolute -left-44 bottom-[-300px] h-[500px] w-[500px] rounded-full bg-blue-100/45 blur-[145px]" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(255,255,255,0.99),transparent_42%)]" />

    <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(30,91,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,91,184,0.055)_1px,transparent_1px)] [background-size:54px_54px]" />
  </div>

  <div className="relative mx-auto w-full max-w-[1520px] px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-5">
    {/* BREADCRUMB */}
    <nav
      aria-label="مسار التنقل"
      className="flex flex-wrap items-center gap-2 text-[9px] font-bold text-slate-500 sm:text-[11px]"
    >
      <Link
        href="/"
        className="transition hover:text-brand-600"
      >
        الرئيسية
      </Link>

      <span className="text-slate-300">/</span>

      <Link
        href="/best-brokers"
        className="transition hover:text-brand-600"
      >
        أفضل شركات الفوركس
      </Link>

      <span className="text-slate-300">/</span>

      <span className="text-slate-800">
        شركات السكالبينج
      </span>
    </nav>

    {/* =================================================
        DESKTOP HERO
    ================================================== */}
    <div className="mt-3 hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px] xl:gap-16">
      {/* TEXT */}
      <div className="min-w-0 pb-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-[31px] items-center gap-2 rounded-full border border-brand-100 bg-white/90 px-4 text-[11px] font-black text-brand-700 shadow-sm backdrop-blur">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
              ✓
            </span>

            مراجعة مستقلة لحسابات السكالبينج
          </span>

          <span className="inline-flex min-h-[31px] items-center rounded-full border border-slate-200 bg-white/90 px-4 text-[11px] font-black text-slate-600 shadow-sm">
            آخر تحديث: يوليو 2026
          </span>
        </div>

        <h1 className="mt-4 max-w-[920px] text-[49px] font-black leading-[1.05] tracking-[-0.04em] text-[#07111f] xl:text-[56px]">
          أفضل شركات الفوركس

          <span className="mt-1 block text-brand-600">
            للسكالبينج في 2026
          </span>
        </h1>

        <p className="mt-3 max-w-[880px] text-[14px] font-semibold leading-8 text-slate-600 xl:text-[15px]">
          قارنا حسابات Raw وECN حسب السبريد والعمولة وجودة التنفيذ
          والمنصات المناسبة للتداول السريع، للوصول إلى أفضل حساب
          سكالبينج داخل كل شركة.
        </p>

        {/* TRUST */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-extrabold text-slate-700">
          {[
            "حساب واحد مختار لكل شركة",
            "تكلفة الفتح والإغلاق",
            "ترتيب تحريري مستقل",
          ].map((point) => (
            <span
              key={point}
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[10px] text-emerald-700 ring-1 ring-emerald-100">
                ✓
              </span>

              {point}
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex items-center gap-3">
          <a
            href="#top-brokers"
            className="inline-flex min-h-[44px] min-w-[178px] items-center justify-center rounded-xl bg-brand-600 px-6 text-[13px] font-black text-white shadow-[0_10px_23px_rgba(30,91,184,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            شاهد الترتيب
          </a>

          <a
            href="#methodology"
            className="inline-flex min-h-[44px] min-w-[166px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-800 shadow-[0_7px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
          >
            كيف اخترناها؟
          </a>
        </div>
      </div>

      {/* STATS PANEL */}
      <aside className="rounded-[24px] border border-slate-200/90 bg-white/78 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.055)] backdrop-blur">
        <div className="mb-2 flex items-center justify-between px-2 py-1">
          <div>
            <span className="block text-[10px] font-black text-brand-600">
              ملخص المقارنة
            </span>

            <span className="mt-0.5 block text-[13px] font-black text-slate-950">
              أرقام الدليل الأساسية
            </span>
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-[15px] font-black text-brand-700 ring-1 ring-brand-100">
            ✓
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 overflow-hidden rounded-[18px] border border-slate-200 bg-white">
         {desktopStats.map((stat) => (
            <div
              key={stat.title}
              className="flex min-h-[112px] flex-col items-center justify-center px-2 text-center"
            >
              <span
                dir="ltr"
                className="text-[34px] font-black leading-none tracking-[-0.04em] text-brand-700"
              >
                {stat.value}
              </span>

              <span className="mt-2 text-[12px] font-black text-slate-950">
                {stat.title}
              </span>

              <span className="mt-0.5 text-[9px] font-semibold text-slate-500">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        <p className="px-2 pt-3 text-[10px] font-semibold leading-5 text-slate-500">
          الترتيب يعتمد على التكلفة والتنفيذ والمنصات وقوة التنظيم،
          وليس على اسم الشركة وحده.
        </p>
      </aside>
    </div>

    {/* =================================================
        MOBILE + TABLET HERO
    ================================================== */}
    <div className="mx-auto mt-3 max-w-[620px] text-center lg:hidden">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full border border-brand-100 bg-white/90 px-3 text-[9px] font-black text-brand-700 shadow-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
            ✓
          </span>

          مراجعة مستقلة
        </span>

        <span className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-white/90 px-3 text-[9px] font-black text-slate-600 shadow-sm">
          تحديث يوليو 2026
        </span>
      </div>

      <h1 className="mx-auto mt-3 max-w-[350px] text-[29px] font-black leading-[1.07] tracking-[-0.035em] text-[#07111f] sm:max-w-[600px] sm:text-[42px]">
        أفضل شركات الفوركس

        <span className="mt-1 block text-brand-600">
          للسكالبينج في 2026
        </span>
      </h1>

      <p className="mx-auto mt-2 max-w-[330px] text-[10px] font-semibold leading-[1.7] text-slate-600 sm:max-w-[570px] sm:text-[14px] sm:leading-7">
        مقارنة لأفضل حسابات Raw وECN حسب التكلفة والتنفيذ والمنصات
        المناسبة للسكالبينج.
      </p>

      {/* MOBILE TRUST */}
      <div className="mx-auto mt-2.5 grid max-w-[340px] grid-cols-2 gap-2">
        <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
          <span className="text-emerald-600">✓</span>
          حساب مختار
        </div>

        <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
          <span className="text-emerald-600">✓</span>
          ترتيب مستقل
        </div>
      </div>

      {/* MOBILE ACTIONS */}
      <div className="mx-auto mt-3 grid max-w-[350px] grid-cols-[1.1fr_0.9fr] gap-2.5">
        <a
          href="#top-brokers"
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-4 text-[12px] font-black text-white shadow-[0_9px_20px_rgba(30,91,184,0.18)]"
        >
          شاهد الترتيب
        </a>

        <a
          href="#methodology"
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-[12px] font-black text-slate-800 shadow-sm"
        >
          كيف اخترناها؟
        </a>
      </div>

      {/* MOBILE STATS */}
      <div className="mx-auto mt-3.5 grid max-w-[350px] grid-cols-3 divide-x divide-x-reverse divide-slate-200 overflow-hidden rounded-[15px] border border-slate-200 bg-white/90 shadow-[0_7px_18px_rgba(15,23,42,0.04)]">
        {mobileStats.map(([value, label]) => (
          <div
            key={label}
            className="flex min-h-[56px] flex-col items-center justify-center px-2"
          >
            <span
              dir="ltr"
              className="text-[18px] font-black leading-none text-brand-700"
            >
              {value}
            </span>

            <span className="mt-1.5 text-[8px] font-bold text-slate-500">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<div className="mx-auto w-full max-w-[1520px] px-3 pb-4 pt-3 sm:px-6 sm:pb-7 sm:pt-6 lg:px-8">
  {/* =====================================================
    QUICK PICKS — FINAL THREE BROKERS
====================================================== */}
<section className="pt-1">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-4 sm:px-6 sm:py-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-20 -top-24 h-[210px] w-[210px] rounded-full bg-brand-100/65 blur-[75px]" />

        <div className="absolute -left-20 bottom-[-135px] h-[205px] w-[205px] rounded-full bg-blue-100/45 blur-[80px]" />
      </div>

      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-brand-600 text-[16px] font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.19)] sm:h-12 sm:w-12 sm:text-[18px]">
            ✓
          </span>

          <div>
            <span className="block text-[9px] font-black text-brand-600 sm:text-[10px]">
              قرار سريع
            </span>

            <h2 className="mt-0.5 text-[20px] font-black leading-[1.2] tracking-[-0.025em] text-slate-950 sm:text-[27px]">
              اختر الوسيط حسب أولويتك
            </h2>

            <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-600 sm:text-[11px]">
              أفضل ثلاثة خيارات قبل الانتقال إلى الترتيب الكامل.
            </p>
          </div>
        </div>

        <a
          href="#top-brokers"
          className="inline-flex min-h-[37px] w-fit shrink-0 self-start items-center justify-center rounded-xl border border-brand-100 bg-white px-4 text-[10px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 sm:min-h-[40px] sm:self-auto sm:px-5 sm:text-[11px]"
        >
          عرض الترتيب الكامل
        </a>
      </div>
    </div>

    {/* CARDS OR ERROR MESSAGE */}
    {topThree.length > 0 && (
      <div className="grid md:grid-cols-3 md:divide-x md:divide-x-reverse md:divide-slate-200">
        {topThree.map((item) => {
          if (!item.broker) return null;

          const editorial = getEditorial(item.broker.slug);

          if (!editorial) return null;

          const isFirst = editorial.rank === 1;

          return (
            <article
              key={item.id}
              className={`group relative flex min-w-0 flex-col border-b border-slate-200 px-4 pb-4 pt-4 transition last:border-b-0 hover:bg-brand-50/20 md:border-b-0 sm:px-5 sm:pb-5 sm:pt-5 ${
                isFirst
                  ? "bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_65%)]"
                  : "bg-white"
              }`}
            >
              {/* TOP ACCENT */}
              <div
                className={`absolute inset-x-0 top-0 h-[4px] ${
                  isFirst
                    ? "bg-gradient-to-l from-amber-400 via-brand-600 to-brand-300"
                    : "bg-gradient-to-l from-brand-600 via-brand-400 to-brand-100"
                }`}
              />

              {/* RANK + SCORE */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-flex min-h-[28px] items-center gap-2 rounded-full px-3 text-[9px] font-black ring-1 sm:min-h-[30px] sm:text-[10px] ${
                    isFirst
                      ? "bg-amber-50 text-amber-800 ring-amber-200"
                      : "bg-brand-50 text-brand-700 ring-brand-100"
                  }`}
                >
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[8px] text-white sm:h-6 sm:min-w-6 sm:text-[9px] ${
                      isFirst ? "bg-amber-500" : "bg-brand-600"
                    }`}
                  >
                    {editorial.rank}
                  </span>

                  {isFirst
                    ? "المركز الأول"
                    : `المركز ${editorial.rank}`}
                </span>

                <span
                  dir="ltr"
                  className="inline-flex min-h-[28px] items-center rounded-full bg-slate-50 px-3 text-[10px] font-black text-slate-800 ring-1 ring-slate-200"
                >
                  {formatScore(editorial.score)}/10
                </span>
              </div>

              {/* IDENTITY */}
              <div className="mt-3.5 grid grid-cols-[98px_minmax(0,1fr)] items-center gap-3.5 sm:mt-4 sm:grid-cols-[118px_minmax(0,1fr)] sm:gap-4">
                <BrokerLogo
                  broker={item.broker}
                  size="medium"
                />

                <div className="min-w-0">
                  <span className="block text-[9px] font-black text-brand-600 sm:text-[10px]">
                    {editorial.shortAward}
                  </span>

                  <Link
                    href={`/brokers/${item.broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="mt-1 block truncate text-left text-[18px] font-black tracking-[-0.02em] text-slate-950 transition hover:text-brand-700 sm:text-[19px]"
                  >
                    {item.broker.name}
                  </Link>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {accountPageHref(
  item.broker.slug,
  item.account_name
) ? (
  <Link
    href={
      accountPageHref(
        item.broker.slug,
        item.account_name
      )!
    }
    target="_blank"
    rel="noopener noreferrer"
    dir="ltr"
    aria-label={`عرض حساب ${normalizeText(
      item.account_name
    )} لدى ${item.broker.name}`}
    className="inline-flex min-h-[23px] max-w-full items-center rounded-full bg-slate-100 px-2.5 text-[9px] font-black text-brand-700 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
  >
    <span className="truncate">
      {normalizeText(item.account_name)}
    </span>
  </Link>
) : (
  <span
    dir="ltr"
    className="inline-flex min-h-[23px] max-w-full items-center rounded-full bg-slate-100 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200"
  >
    <span className="truncate">
      {normalizeText(item.account_name)}
    </span>
  </span>
)}

                    <span className="inline-flex min-h-[23px] items-center rounded-full bg-brand-50 px-2.5 text-[8px] font-black text-brand-700 ring-1 ring-brand-100 sm:text-[9px]">
                      الحساب المختار
                    </span>
                  </div>
                </div>
              </div>

              {/* RECOMMENDATION */}
              <div className="mt-3 flex-1 rounded-[14px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-3.5 py-2.5 shadow-[0_4px_12px_rgba(15,23,42,0.025)] sm:mt-4 sm:px-4 sm:py-3.5">
                <span className="flex items-center gap-2 text-[9px] font-black text-brand-700 sm:text-[10px]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-[10px] ring-1 ring-brand-100">
                    ✓
                  </span>

                  لماذا نرشحه؟
                </span>

                <p className="mt-1.5 line-clamp-2 min-h-[42px] text-[10.5px] font-semibold leading-[1.8] text-slate-700 sm:line-clamp-3 sm:min-h-[60px] sm:text-[12px] sm:leading-6">
                  {editorial.verdict}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`#broker-${item.broker.slug}`}
                className="mt-3.5 inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_7px_16px_rgba(30,91,184,0.16)] transition hover:-translate-y-0.5 hover:bg-brand-700 sm:mt-4 sm:min-h-[42px] sm:text-[12px]"
              >
                عرض تفاصيل الوسيط
                <span aria-hidden="true">↓</span>
              </a>
            </article>
          );
        })}
      </div>
    )}
  </div>
</section>


{/* =====================================================
    SCALPING INTRO — FINAL BLUE RESPONSIVE SECTION
====================================================== */}
<section className="pt-5 sm:pt-7">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.055)] sm:rounded-[30px]">
    {/* =================================================
        MOBILE
    ================================================== */}
    <div className="sm:hidden">
      {/* INTRO */}
      <article className="px-4 pb-4 pt-4">
        <div className="flex justify-start">
          <span className="inline-flex min-h-[27px] items-center rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-3 text-[9px] font-black text-[#1E5BB8]">
            شرح مبسط قبل المقارنة
          </span>
        </div>

        <h2 className="mt-3 text-right text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950">
          ما هو السكالبينج
          <span className="block text-[#1E5BB8]">
            في الفوركس؟
          </span>
        </h2>

        <p className="mt-3 text-right text-[11.5px] font-semibold leading-7 text-slate-700">
          السكالبينج هو أسلوب تداول قصير الأجل يعتمد على فتح وإغلاق
          صفقات سريعة للاستفادة من تحركات سعرية صغيرة خلال ثوانٍ
          أو دقائق.
        </p>

        <p className="mt-1.5 text-right text-[11.5px] font-semibold leading-7 text-slate-700">
          لذلك تصبح تكلفة التنفيذ والسبريد والعمولة واستقرار المنصة
          عوامل أساسية عند اختيار شركة التداول.
        </p>

        {/* MOBILE FACTS */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex min-h-[112px] min-w-0 flex-col rounded-[15px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[9px] font-black text-[#1E5BB8]">
              1
            </span>

            <h3 className="mt-2 text-[9px] font-black leading-5 text-slate-950">
              مدة الصفقات
            </h3>

            <p className="mt-1 text-[8.5px] font-semibold leading-5 text-slate-600">
              ثوانٍ أو دقائق غالبًا.
            </p>
          </div>

          <div className="flex min-h-[112px] min-w-0 flex-col rounded-[15px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[9px] font-black text-[#1E5BB8]">
              2
            </span>

            <h3 className="mt-2 text-[9px] font-black leading-5 text-slate-950">
              عدد الصفقات
            </h3>

            <p className="mt-1 text-[8.5px] font-semibold leading-5 text-slate-600">
              أعلى من التداول اليومي.
            </p>
          </div>

          <div className="flex min-h-[112px] min-w-0 flex-col rounded-[15px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[9px] font-black text-[#1E5BB8]">
              3
            </span>

            <h3 className="mt-2 text-[9px] font-black leading-5 text-slate-950">
              العامل الأهم
            </h3>

            <p className="mt-1 text-[8.5px] font-semibold leading-5 text-slate-600">
              التكلفة وجودة التنفيذ.
            </p>
          </div>
        </div>
      </article>

      {/* MOBILE COMPARISON */}
      <aside className="border-t border-slate-200 bg-[linear-gradient(180deg,#F8FBFF_0%,#EDF4FD_100%)] px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[8px] font-black text-[#1E5BB8]">
              الفرق المختصر
            </span>

            <h3 className="mt-0.5 text-[16px] font-black leading-6 text-slate-950">
              السكالبينج أم التداول اليومي؟
            </h3>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#C9DDF8] bg-white text-[12px] font-black text-[#1E5BB8] shadow-sm">
            ↔
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {/* SCALPING — BLUE BORDER */}
          <div className="rounded-[14px] border border-[#6EA3E8] bg-white p-3 shadow-[0_7px_18px_rgba(30,91,184,0.09)]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black text-[#1E5BB8]">
                السكالبينج
              </span>

              <span className="rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-2 py-1 text-[7px] font-black text-[#1E5BB8]">
                أسرع
              </span>
            </div>

            <p className="mt-2 text-[9px] font-semibold leading-5 text-slate-600">
              صفقات أكثر وحساسية أعلى للسبريد والعمولة.
            </p>
          </div>

          {/* DAY TRADING */}
          <div className="rounded-[14px] border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black text-slate-900">
                التداول اليومي
              </span>

              <span className="rounded-full bg-slate-100 px-2 py-1 text-[7px] font-black text-slate-600">
                أطول
              </span>
            </div>

            <p className="mt-2 text-[9px] font-semibold leading-5 text-slate-600">
              صفقات أقل وقد تبقى مفتوحة لساعات.
            </p>
          </div>
        </div>
      </aside>
    </div>

    {/* =================================================
        TABLET + DESKTOP
    ================================================== */}
    <div className="hidden sm:grid sm:grid-cols-[minmax(0,1fr)_330px] lg:grid-cols-[minmax(0,1fr)_370px] xl:grid-cols-[minmax(0,1fr)_410px]">
      {/* MAIN CONTENT */}
      <article className="flex min-w-0 flex-col justify-center px-6 py-6 lg:px-8 lg:py-7 xl:px-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-[28px] items-center rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-3.5 text-[9px] font-black text-[#1E5BB8]">
            شرح للمبتدئين
          </span>

          <span className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 text-[9px] font-black text-slate-600">
            قبل اختيار شركة السكالبينج
          </span>
        </div>

        <h2 className="mt-4 max-w-[850px] text-[31px] font-black leading-[1.15] tracking-[-0.03em] text-slate-950 lg:text-[37px] xl:text-[40px]">
          ما هو السكالبينج في الفوركس؟
        </h2>

        <p className="mt-3 max-w-[980px] text-[13px] font-semibold leading-7 text-slate-700 lg:text-[14px] lg:leading-8">
          السكالبينج هو أسلوب تداول قصير الأجل يعتمد على فتح وإغلاق
          عدد كبير نسبيًا من الصفقات للاستفادة من تحركات سعرية صغيرة،
          وقد تبقى الصفقة مفتوحة لثوانٍ أو دقائق فقط.
        </p>

        <p className="mt-1.5 max-w-[980px] text-[13px] font-semibold leading-7 text-slate-700 lg:text-[14px] lg:leading-8">
          لذلك لا يكفي اختيار شركة تعلن سبريدًا منخفضًا؛ بل يجب النظر
          إلى العمولة وجودة التنفيذ واستقرار المنصة وسياسة السكالبينج.
        </p>

        {/* DESKTOP FACTS */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[12px] font-black text-slate-950">
                مدة الصفقات
              </h3>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8]">
                1
              </span>
            </div>

            <p className="mt-1.5 text-[11px] font-semibold leading-6 text-slate-600">
              غالبًا قصيرة جدًا مقارنة بالتداول اليومي أو المتأرجح.
            </p>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[12px] font-black text-slate-950">
                عدد الصفقات
              </h3>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8]">
                2
              </span>
            </div>

            <p className="mt-1.5 text-[11px] font-semibold leading-6 text-slate-600">
              قد يكون مرتفعًا، لذلك تتراكم العمولة والسبريد بسرعة.
            </p>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[12px] font-black text-slate-950">
                العامل الأهم
              </h3>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8]">
                3
              </span>
            </div>

            <p className="mt-1.5 text-[11px] font-semibold leading-6 text-slate-600">
              التكلفة الفعلية وجودة التنفيذ، وليس السبريد المعلن فقط.
            </p>
          </div>
        </div>
      </article>

      {/* DESKTOP COMPARISON */}
      <aside className="flex flex-col border-r border-slate-200 bg-[linear-gradient(180deg,#F8FBFF_0%,#EDF4FD_100%)] px-6 py-6 lg:px-7 lg:py-7">
        <div>
          <span className="inline-flex min-h-[27px] items-center rounded-full border border-[#C9DDF8] bg-white px-3 text-[9px] font-black text-[#1E5BB8] shadow-sm">
            الفرق المختصر
          </span>

          <h3 className="mt-3 text-[22px] font-black leading-[1.22] text-slate-950 lg:text-[25px]">
            السكالبينج أم التداول اليومي؟
          </h3>
        </div>

        <div className="mt-5 space-y-3.5">
          {/* SCALPING — EXPLICIT BLUE BORDER */}
          <div className="rounded-[16px] border border-[#4F8EDC] bg-white p-4 shadow-[0_8px_22px_rgba(30,91,184,0.10)] transition hover:border-[#1E5BB8] hover:shadow-[0_12px_28px_rgba(30,91,184,0.14)]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-black text-[#1E5BB8]">
                السكالبينج
              </span>

              <span className="rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-2.5 py-1 text-[8px] font-black text-[#1E5BB8]">
                أسرع
              </span>
            </div>

            <p className="mt-2 text-[11px] font-semibold leading-6 text-slate-600">
              صفقات أكثر وأهداف أصغر وحساسية أعلى للسبريد والعمولة.
            </p>
          </div>

          {/* DAY TRADING */}
          <div className="rounded-[16px] border border-slate-200 bg-white p-4 transition hover:border-slate-300">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-black text-slate-900">
                التداول اليومي
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] font-black text-slate-600">
                أطول
              </span>
            </div>

            <p className="mt-2 text-[11px] font-semibold leading-6 text-slate-600">
              صفقات أقل وقد تبقى مفتوحة عدة ساعات.
            </p>
          </div>
        </div>

        <div className="mt-3.5 rounded-[15px] border border-amber-200 bg-amber-50 p-4">
          <span className="text-[10px] font-black text-amber-900">
            لماذا يهم عند اختيار الشركة؟
          </span>

          <p className="mt-1.5 text-[10px] font-semibold leading-5 text-amber-800">
            لأن فروق التكلفة الصغيرة تتكرر مع كل صفقة وتؤثر في
            النتيجة النهائية.
          </p>
        </div>
      </aside>
    </div>
  </div>
</section>

    {/* =====================================================
    TOP BROKERS — FINAL PREMIUM SECTION
====================================================== */}
<section
  id="top-brokers"
  className="scroll-mt-24 pt-5 sm:pt-7"
>
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
  {/* =================================================
    SECTION HEADER — MOBILE + DESKTOP
================================================== */}
<div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_55%,#eaf2fc_100%)]">
  {/* BACKGROUND */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute -right-24 -top-28 h-[260px] w-[260px] rounded-full bg-brand-100/70 blur-[85px]" />

    <div className="absolute -left-24 bottom-[-130px] h-[240px] w-[240px] rounded-full bg-blue-100/50 blur-[90px]" />
  </div>

  {/* =============================================
      MOBILE HEADER
  ============================================== */}
  <div className="relative px-4 pb-4 pt-4 text-right sm:hidden">
    {/* BADGES */}
    <div className="flex flex-wrap items-center justify-start gap-1.5">
      <span className="inline-flex min-h-[27px] items-center rounded-full bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
        ترتيب بروكر العرب 2026
      </span>

      <span className="inline-flex min-h-[27px] items-center rounded-full bg-white/90 px-3 text-[9px] font-black text-slate-600 shadow-sm ring-1 ring-slate-200">
        {totalAccounts} حسابات Raw وECN
      </span>
    </div>

    {/* TITLE — CENTERED ONLY */}
    <h2 className="mt-3 text-right text-[25px] font-black leading-[1.15] tracking-[-0.04em] text-slate-950">
    أفضل {totalBrokers} شركات فوركس
    <span className="block text-brand-700">
        للسكالبينج
    </span>
</h2>

    {/* DESCRIPTION — RIGHT ALIGNED */}
    <p className="mt-2 text-right text-[11px] leading-7 text-slate-600">
      اخترنا حسابًا واحدًا من كل شركة، وقارنا التكلفة والتنفيذ
      والمنصات للوصول إلى أفضل خيارات السكالبينج.
    </p>

    {/* MOBILE TRUST POINTS */}
    <div className="mt-3 flex flex-col gap-2">
      <span className="inline-flex min-h-[35px] items-center justify-start gap-2 rounded-xl bg-white/85 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
          ✓
        </span>

        حساب مختار
      </span>

      <span className="inline-flex min-h-[35px] items-center justify-start gap-2 rounded-xl bg-white/85 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
          ✓
        </span>

        مقارنة التكلفة
      </span>

      <span className="col-span-2 inline-flex min-h-[35px] items-center justify-start gap-2 rounded-xl bg-white/85 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
          ✓
        </span>

        ترتيب تحريري مستقل
      </span>
    </div>

    {/* METHODOLOGY BUTTON — RIGHT ALIGNED */}
    <div className="mt-4">
      <a
        href="#methodology"
        className="inline-flex min-h-[39px] w-fit items-center justify-center rounded-xl bg-white px-5 text-[10px] font-black text-brand-700 shadow-[0_6px_16px_rgba(15,23,42,0.06)] ring-1 ring-brand-100 transition hover:bg-brand-50"
      >
        عرض منهجية التقييم
      </a>
    </div>
  </div>

  {/* =============================================
      TABLET + DESKTOP HEADER
  ============================================== */}
  <div className="relative hidden px-6 py-6 sm:block lg:px-8 lg:py-7">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[1050px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-[30px] items-center rounded-full bg-white px-3.5 text-[11px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100 sm:text-[12px]">
            ترتيب بروكر العرب لعام 2026
          </span>

          <span className="inline-flex min-h-[30px] items-center rounded-full bg-white/80 px-3.5 text-[10px] font-black text-slate-600 ring-1 ring-slate-200 sm:text-[11px]">
            {totalAccounts} حسابات Raw وECN
          </span>
        </div>

        <h2 className="mt-4 text-[38px] font-black leading-[1.2] tracking-[-0.03em] text-slate-950 lg:text-[42px]">
          أفضل {totalBrokers} شركات فوركس للسكالبينج
        </h2>

        <p className="mt-3 max-w-[980px] text-[15px] font-semibold leading-8 text-slate-700">
          اخترنا حسابًا واحدًا من كل شركة، ثم قارنا تكلفة التداول،
          نوع التنفيذ، المنصات، سياسة السكالبينج، دعم التداول الآلي
          وقوة التنظيم. يمكنك فتح التحليل داخل كل بطاقة لمعرفة سبب
          الترتيب بالتفصيل.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-extrabold text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">
              ✓
            </span>

            حساب مختار لكل شركة
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">
              ✓
            </span>

            مقارنة التكلفة الإجمالية
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">
              ✓
            </span>

            ترتيب تحريري مستقل
          </span>
        </div>
      </div>

      <a
  href="#methodology"
  className="inline-flex min-h-[46px] w-fit shrink-0 items-center justify-center self-start rounded-xl bg-brand-600 px-6 text-[12px] font-black text-white shadow-[0_10px_24px_rgba(30,91,184,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-700 lg:-translate-y-2 lg:self-center"
>
  عرض منهجية التقييم
</a>
    </div>
  </div>
</div>

    {/* =================================================
        BROKERS LIST
    ================================================== */}
    <div className="bg-[#f4f7fb] p-2.5 sm:p-5 lg:p-6">
      {brokers.length === 0 ? (
        <div className="rounded-[22px] bg-amber-50 p-7 text-center ring-1 ring-amber-200">
          <h3 className="text-[19px] font-black text-amber-950">
            لم يتم العثور على حسابات مخصصة للسكالبينج
          </h3>

          <p className="mt-2 text-[13px] font-bold leading-7 text-amber-800">
            تأكد من تفعيل
            <span
              dir="ltr"
              className="mx-1 inline-block font-black"
            >
              is_best_for_scalping
            </span>
            للحسابات المطلوبة.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-5">
          {brokers.map((item) => {
            if (!item.broker) return null;

            const editorial = getEditorial(item.broker.slug);
            if (!editorial) return null;

            const platforms = splitValues(
              item.broker.platforms,
              5
            );

            const regulators = splitValues(
              item.broker.regulation_short ||
                item.broker.regulation,
              4
            );

            return (
              <article
                key={item.id}
                id={`broker-${item.broker.slug}`}
                className={`group scroll-mt-24 overflow-hidden rounded-[22px] bg-white shadow-[0_8px_26px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)] sm:rounded-[26px] ${
                  editorial.rank === 1
                    ? "ring-1 ring-brand-200"
                    : "ring-1 ring-slate-200"
                }`}
              >
                {editorial.rank === 1 && (
                  <div className="h-[3px] bg-gradient-to-l from-brand-600 via-brand-400 to-brand-200" />
                )}

                {/* =============================================
    MOBILE CARD — COMPACT ACCORDION
============================================== */}
<div className="lg:hidden">
  <details className="group/mobile">
    {/* =========================================
        CLOSED CARD SUMMARY
    ========================================== */}
    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
      <div
        className={`relative overflow-hidden px-3.5 pb-3.5 pt-3.5 ${
          editorial.rank === 1
            ? "bg-[linear-gradient(135deg,#f6f9ff_0%,#ffffff_72%)]"
            : "bg-white"
        }`}
      >
        {/* TOP ACCENT */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-[3px] ${
            editorial.rank === 1
              ? "bg-gradient-to-l from-amber-400 via-brand-600 to-brand-300"
              : "bg-gradient-to-l from-brand-600 via-brand-400 to-brand-100"
          }`}
        />

        {/* RANK + SCORE */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex min-h-[27px] items-center gap-1.5 rounded-full px-2.5 text-[9px] font-black ring-1 ${
              editorial.rank === 1
                ? "bg-amber-50 text-amber-800 ring-amber-200"
                : "bg-brand-50 text-brand-700 ring-brand-100"
            }`}
          >
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[8px] text-white ${
                editorial.rank === 1
                  ? "bg-amber-500"
                  : "bg-brand-600"
              }`}
            >
              {editorial.rank}
            </span>

            {editorial.rank === 1
              ? "المركز الأول"
              : `المركز ${editorial.rank}`}
          </span>

          <div className="flex items-center gap-2">
            <span
              dir="ltr"
              className="inline-flex min-h-[27px] items-center rounded-full bg-white px-2.5 text-[10px] font-black text-slate-800 shadow-sm ring-1 ring-slate-200"
            >
              {formatScore(editorial.score)}/10
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[15px] font-black text-white shadow-[0_5px_12px_rgba(30,91,184,0.18)] transition duration-200 group-open/mobile:rotate-45">
              +
            </span>
          </div>
        </div>

        {/* COMPANY IDENTITY */}
        <div className="mt-3 grid grid-cols-[84px_minmax(0,1fr)] items-center gap-3">
          <BrokerLogo
            broker={item.broker}
            size="small"
          />

          <div className="min-w-0">
            <span className="block text-[9px] font-black leading-5 text-brand-700">
              {editorial.shortAward}
            </span>

            <h3
              dir="ltr"
              className="mt-0.5 truncate text-left text-[19px] font-black tracking-[-0.025em] text-slate-950"
            >
              {item.broker.name}
            </h3>

            <div className="mt-1.5 flex items-center gap-2">
              {renderStars(item.broker.rating)}

              <span
                dir="ltr"
                className="text-[10px] font-black text-slate-600"
              >
                {formatRating(item.broker.rating)}/5
              </span>
            </div>
          </div>
        </div>

        {/* QUICK FACTS */}
<div className="mt-3 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200">
 <div className="flex min-h-[62px] min-w-0 flex-col items-center justify-center px-2 text-center">
  <span className="text-[9px] font-bold text-slate-500">
    الحساب
  </span>

  {accountPageHref(
    item.broker.slug,
    item.account_name
  ) ? (
    <Link
      href={
        accountPageHref(
          item.broker.slug,
          item.account_name
        )!
      }
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      aria-label={`عرض حساب ${normalizeText(
        item.account_name
      )} لدى ${item.broker.name}`}
      className="mt-1.5 block max-w-full truncate text-[11px] font-black leading-none text-brand-700 underline-offset-2 transition hover:text-brand-900 hover:underline"
    >
      {normalizeText(item.account_name)}
    </Link>
  ) : (
    <span
      dir="ltr"
      className="mt-1.5 block max-w-full truncate text-[11px] font-black leading-none text-slate-950"
    >
      {normalizeText(item.account_name)}
    </span>
  )}
</div>

  <div className="flex min-h-[62px] min-w-0 flex-col items-center justify-center px-2 text-center">
    <span className="text-[9px] font-bold text-slate-500">
      السبريد
    </span>

    <span className="mt-1.5 block max-w-full truncate text-[11px] font-black leading-none text-slate-950">
      {accountSpread(item)}
    </span>
  </div>

  <div className="flex min-h-[62px] min-w-0 flex-col items-center justify-center px-2 text-center">
    <span className="text-[9px] font-bold text-slate-500">
      العمولة
    </span>

    <span
      dir="ltr"
      className="mt-1.5 block max-w-full truncate text-[11px] font-black leading-none text-slate-950"
    >
      {accountCommission(item)}
    </span>
  </div>
</div>

        {/* SHORT VERDICT */}
<p className="mt-3 line-clamp-2 min-h-[48px] text-[11.5px] font-semibold leading-6 text-slate-700">
  {editorial.verdict}
</p>

       {/* OPEN HINT */}
<div className="mt-3 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-brand-50 px-4 text-[11px] font-black text-brand-800 ring-1 ring-brand-100 transition group-open/mobile:hidden">
  <span>عرض التفاصيل</span>

  <span aria-hidden="true">
    ↓
  </span>
</div>
      </div>
    </summary>

    {/* =========================================
        EXPANDED MOBILE CONTENT
    ========================================== */}
    <div className="border-t border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)]">
      {/* FULL FACTS */}
      <div className="grid grid-cols-2 gap-2 px-3.5 pt-3.5">
        <div className="rounded-[13px] bg-white px-3 py-2.5 ring-1 ring-slate-200">
          <span className="block text-[8px] font-bold text-slate-500">
            نوع التنفيذ
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-right text-[10px] font-black text-slate-950"
          >
            {normalizeText(item.execution_type)}
          </span>
        </div>

        <div className="rounded-[13px] bg-white px-3 py-2.5 ring-1 ring-slate-200">
          <span className="block text-[8px] font-bold text-slate-500">
            الحد الأدنى للإيداع
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-right text-[10px] font-black text-slate-950"
          >
            {accountDeposit(item)}
          </span>
        </div>
      </div>

      {/* PLATFORMS + REGULATORS */}
      <div className="grid gap-3 px-3.5 pt-4 sm:grid-cols-2">
        <div>
          <span className="text-[10px] font-black text-slate-900">
            المنصات
          </span>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {platforms.length > 0 ? (
              platforms.map((platform) => (
                <span
                  key={platform}
                  dir="ltr"
                  className="inline-flex min-h-[25px] items-center rounded-lg bg-brand-50 px-2.5 text-[8px] font-black text-brand-800 ring-1 ring-brand-100"
                >
                  {platform}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-semibold text-slate-500">
                غير محدد
              </span>
            )}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black text-slate-900">
            أبرز التراخيص
          </span>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {regulators.length > 0 ? (
              regulators.map((regulator) => (
                <span
                  key={regulator}
                  dir="ltr"
                  className="inline-flex min-h-[25px] items-center rounded-lg bg-white px-2.5 text-[8px] font-black text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  {regulator}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-semibold text-slate-500">
                غير محدد
              </span>
            )}
          </div>
        </div>
      </div>

      {/* REASONS */}
      <div className="px-3.5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-black text-slate-950">
            أبرز أسباب الاختيار
          </span>

          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-700 ring-1 ring-emerald-200">
            أهم 3 مزايا
          </span>
        </div>

        <div className="mt-2.5 grid gap-2">
          {editorial.whySelected
            .slice(0, 3)
            .map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-2.5 rounded-[13px] bg-emerald-50/70 px-3 py-2.5 ring-1 ring-emerald-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white">
                  ✓
                </span>

                <span className="text-[10.5px] font-semibold leading-6 text-slate-800">
                  {reason}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* WARNING */}
      <div className="mx-3.5 mt-3.5 overflow-hidden rounded-[14px] bg-[#fffaf0] ring-1 ring-amber-200">
        <div className="flex items-center gap-2 border-b border-amber-200/70 bg-amber-50/80 px-3 py-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-[9px] font-black text-amber-900">
            !
          </span>

          <span className="text-[10px] font-black text-amber-950">
            عيب يجب معرفته
          </span>
        </div>

        <p className="px-3 py-3 text-[10.5px] font-semibold leading-6 text-slate-700">
          {editorial.warning}
        </p>
      </div>

      {/* EDITORIAL ANALYSIS */}
      <details className="group/analysis mx-3.5 mt-3.5 overflow-hidden rounded-[14px] bg-white ring-1 ring-brand-100">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2.5 [&::-webkit-details-marker]:hidden">
          <div>
            <span className="block text-[11px] font-black text-brand-700">
              التحليل التحريري الكامل
            </span>

            <span className="mt-0.5 block text-[8px] font-semibold text-slate-500">
              شرح سبب الترتيب بالتفصيل
            </span>
          </div>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[14px] font-black text-white transition group-open/analysis:rotate-45">
            +
          </span>
        </summary>

        <div className="border-t border-brand-100 bg-brand-50/20 px-3.5 py-3.5">
          <h4 className="text-[14px] font-black leading-6 text-slate-950">
            لماذا وضعنا {item.broker.name} في المركز{" "}
            {editorial.rank}؟
          </h4>

          <div className="mt-2.5 space-y-2.5">
            {editorial.reviewText.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[10.5px] font-semibold leading-6 text-slate-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </details>

      {/* ACTIONS */}
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-2.5 px-3.5 pb-3.5 pt-4">
        <Link
          href={`/brokers/${item.broker.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.14)] transition hover:bg-brand-700"
        >
          اقرأ التقييم
        </Link>

        {item.broker.real_account_url ? (
          <a
            href={`/go/${item.broker.slug}?type=real&source=scalping-page`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-white px-3 text-[11px] font-black text-slate-700 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
          >
            فتح حساب
          </a>
        ) : (
          <span className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-slate-50 px-3 text-[11px] font-black text-slate-400 ring-1 ring-slate-200">
            قريبًا
          </span>
        )}
      </div>
    </div>
  </details>
</div>

                {/* =============================================
                    DESKTOP CARD
                ============================================== */}
                <div className="hidden lg:block">
                  <div className="grid min-h-[440px] grid-cols-[210px_minmax(0,1fr)_255px] xl:grid-cols-[220px_minmax(0,1fr)_270px]">
                    {/* BROKER IDENTITY */}
                    <aside className="h-full border-l border-slate-100 bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] px-5 py-6">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <span className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-brand-50 px-3 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
                          {editorial.rank === 1
                            ? "المركز الأول"
                            : `المركز ${editorial.rank}`}
                        </span>

                        <div className="mt-4">
                          <BrokerLogo
                            broker={item.broker}
                          />
                        </div>

                        <h3
                          dir="ltr"
                          className="mt-4 text-[22px] font-black tracking-[-0.025em] text-slate-950"
                        >
                          {item.broker.name}
                        </h3>

                        <div className="mt-2.5 flex items-center justify-center gap-2">
                          {renderStars(
                            item.broker.rating
                          )}

                          <span
                            dir="ltr"
                            className="text-[11px] font-black text-slate-700"
                          >
                            {formatRating(
                              item.broker.rating
                            )}
                            /5
                          </span>
                        </div>

                        <span className="mt-4 inline-flex min-h-[29px] max-w-[175px] items-center justify-center rounded-full bg-brand-50 px-3 text-[10px] font-black leading-5 text-brand-700 ring-1 ring-brand-100">
                          {editorial.shortAward}
                        </span>
                      </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex min-w-0 flex-col px-6 py-5 xl:px-7">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-black text-brand-600">
                            لماذا احتلت المركز{" "}
                            {editorial.rank}؟
                          </span>

                          <h4 className="mt-1.5 text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950 xl:text-[26px]">
                            {editorial.award}
                          </h4>

                          <p className="mt-2.5 max-w-[900px] text-[13px] font-semibold leading-7 text-slate-700">
                            {editorial.verdict}
                          </p>
                        </div>

                        {/* SCORE — FINAL */}
<div
  dir="ltr"
  className="flex h-[94px] w-[100px] shrink-0 flex-col items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,#eaf3ff_0%,#ffffff_100%)] text-center shadow-[inset_0_0_0_1px_rgba(30,91,184,0.16),0_9px_22px_rgba(30,91,184,0.08)]"
>
  <span className="text-[10px] font-black text-brand-700">
    تقييم السكالبينج
  </span>

  <span className="mt-1 text-[32px] font-black leading-none tracking-[-0.03em] text-slate-950">
    {formatScore(editorial.score)}
  </span>

  <span className="mt-1 text-[10px] font-bold text-slate-600">
    من 10
  </span>
</div>
</div>

    {/* =================================================
    ACCOUNT FACTS — FINAL
================================================== */}
<div className="mt-5 grid grid-cols-4 gap-3">
  {/* ACCOUNT */}
  <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
    <span className="block text-[11px] font-bold text-slate-600">
      الحساب المختار
    </span>

    {accountPageHref(
      item.broker.slug,
      item.account_name
    ) ? (
      <Link
        href={
          accountPageHref(
            item.broker.slug,
            item.account_name
          )!
        }
        target="_blank"
        rel="noopener noreferrer"
        dir="ltr"
        aria-label={`عرض حساب ${normalizeText(
          item.account_name
        )} لدى ${item.broker.name}`}
        className="mt-1.5 inline-flex max-w-full items-center gap-1 text-[14px] font-black text-brand-700 underline-offset-2 transition hover:text-brand-900 hover:underline"
      >
        <span className="truncate">
          {normalizeText(item.account_name)}
        </span>

        <span
          aria-hidden="true"
          className="shrink-0 text-[11px]"
        >
          ↗
        </span>
      </Link>
    ) : (
      <span
        dir="ltr"
        className="mt-1.5 block truncate text-right text-[14px] font-black text-slate-950"
      >
        {normalizeText(item.account_name)}
      </span>
    )}
  </div>

  {/* SPREAD */}
  <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
    <span className="block text-[11px] font-bold text-slate-600">
      السبريد
    </span>

    <span
      dir="ltr"
      className="mt-1.5 block truncate text-right text-[13px] font-black text-slate-950"
    >
      {accountSpread(item)}
    </span>
  </div>

  {/* COMMISSION */}
  <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
    <span className="block text-[11px] font-bold text-slate-600">
      العمولة
    </span>

    <span
      dir="ltr"
      className="mt-1.5 block truncate text-right text-[13px] font-black text-slate-950"
    >
      {accountCommission(item)}
    </span>
  </div>

  {/* MINIMUM DEPOSIT */}
  <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
    <span className="block text-[11px] font-bold text-slate-600">
      الحد الأدنى للإيداع
    </span>

    <span
      dir="ltr"
      className="mt-1.5 block truncate text-right text-[13px] font-black text-slate-950"
    >
      {accountDeposit(item)}
    </span>
  </div>
</div>

                      {/* =================================================
    SELECTION REASONS — CLEAR TYPOGRAPHY
================================================== */}
<div className="mt-5">
  <div className="mb-3 flex items-center justify-between gap-4">
    <div>
      <span className="block text-[13px] font-black text-slate-950">
        أبرز أسباب الاختيار
      </span>

      <span className="mt-0.5 block text-[11px] font-semibold text-slate-600">
        أهم المزايا التي أثرت في ترتيب الشركة
      </span>
    </div>

    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600">
      الحساب والمنصات والتكلفة
    </span>
  </div>

    <div className="grid grid-cols-2 gap-3">
    {editorial.whySelected
      .slice(0, 4)
      .map((reason) => (
        <div
          key={reason}
          className="flex min-h-[54px] items-center gap-3 rounded-[15px] bg-emerald-50/75 px-4 py-3 ring-1 ring-emerald-200/80"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[12px] font-black text-white shadow-[0_4px_10px_rgba(5,150,105,0.16)]">
            ✓
          </span>

          <span className="text-[13px] font-semibold leading-6 text-slate-800 xl:text-[14px]">
            {reason}
          </span>
        </div>
      ))}
  </div>
</div>

{/* =============================================
    INLINE EDITORIAL ANALYSIS — BOTTOM ALIGNED
============================================== */}
<details className="group/desktop-analysis mt-auto pt-5">
  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
    <div className="flex min-h-[58px] w-full items-center justify-between gap-4 rounded-[17px] bg-white px-5 shadow-[0_7px_20px_rgba(15,23,42,0.05)] ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:bg-brand-50/50 hover:ring-brand-200">
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[18px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.18)] transition duration-200 group-open/desktop-analysis:rotate-45">
          +
        </span>

        <div className="min-w-0">
          <span className="block truncate text-[14px] font-black text-slate-950">
            التحليل التحريري الكامل لـ{item.broker.name}
          </span>

          <span className="mt-1 block text-[11px] font-semibold text-slate-600">
            لماذا حصلت الشركة على المركز {editorial.rank}؟
          </span>
        </div>
      </div>

      <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-black text-brand-700 transition group-open/desktop-analysis:bg-brand-600 group-open/desktop-analysis:text-white">
        <span className="group-open/desktop-analysis:hidden">
          اقرأ التحليل
        </span>

        <span className="hidden group-open/desktop-analysis:inline">
          إخفاء التحليل
        </span>
      </span>
    </div>
  </summary>

  <div className="mt-3 overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] shadow-[0_8px_24px_rgba(15,23,42,0.045)] ring-1 ring-brand-100">
    <div className="p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex min-h-[27px] items-center rounded-full bg-brand-50 px-3 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
          تحليل بروكر العرب
        </span>

        <span className="text-[10px] font-bold text-slate-500">
          مراجعة تحريرية مستقلة
        </span>
      </div>

      <h5 className="mt-3 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950">
        لماذا وضعنا {item.broker.name} في المركز {editorial.rank}؟
      </h5>

      <div className="mt-4 space-y-3">
        {editorial.reviewText.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[13px] font-semibold leading-7 text-slate-700"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-5 rounded-[15px] bg-amber-50/70 p-4 ring-1 ring-amber-200">
        <span className="text-[11px] font-black text-amber-950">
          أهم نقطة قبل الاختيار
        </span>

        <p className="mt-2 text-[12px] font-semibold leading-7 text-slate-700">
          {editorial.warning}
        </p>
      </div>

      <Link
        href={`/brokers/${item.broker.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_6px_15px_rgba(30,91,184,0.16)] transition hover:-translate-y-0.5 hover:bg-brand-700"
      >
        تقييم {item.broker.name} الكامل
      </Link>
    </div>
  </div>
</details>

</div>

             {/* =================================================
    SUPPORTING INFO — FINAL
================================================== */}
<aside className="h-full border-r border-slate-100 bg-[linear-gradient(180deg,#fbfdff_0%,#f7faff_100%)] px-5 py-6">
  <div className="flex h-full flex-col">
    {/* PLATFORMS */}
    <div>
      <span className="text-[12px] font-black text-slate-900">
        المنصات المتاحة
      </span>

      <div className="mt-3 flex flex-wrap gap-2">
        {platforms.length > 0 ? (
          platforms.map((platform) => (
            <span
              key={platform}
              dir="ltr"
              className="inline-flex min-h-[29px] items-center rounded-lg bg-brand-50 px-3 text-[10px] font-black text-brand-800 ring-1 ring-brand-100"
            >
              {platform}
            </span>
          ))
        ) : (
          <span className="text-[12px] font-bold text-slate-600">
            غير محدد
          </span>
        )}
      </div>
    </div>

    {/* REGULATORS */}
    <div className="mt-5">
      <span className="text-[12px] font-black text-slate-900">
        أبرز التراخيص
      </span>

      <div className="mt-3 flex flex-wrap gap-2">
        {regulators.length > 0 ? (
          regulators.map((regulator) => (
            <span
              key={regulator}
              dir="ltr"
              className="inline-flex min-h-[29px] items-center rounded-lg bg-white px-3 text-[10px] font-black text-slate-800 shadow-sm ring-1 ring-slate-200"
            >
              {regulator}
            </span>
          ))
        ) : (
          <span className="text-[12px] font-bold text-slate-600">
            غير محدد
          </span>
        )}
      </div>
    </div>

    {/* WARNING */}
    <div className="mt-5 overflow-hidden rounded-[16px] bg-[#fffaf0] ring-1 ring-amber-200">
      <div className="flex items-center gap-2.5 border-b border-amber-200/70 bg-amber-50/80 px-4 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[12px] font-black text-amber-900">
          !
        </span>

        <div>
          <span className="block text-[12px] font-black text-amber-950">
            عيب يجب معرفته
          </span>

          <span className="mt-0.5 block text-[9px] font-semibold text-amber-800">
            نقطة مهمة قبل فتح الحساب
          </span>
        </div>
      </div>

      <div className="px-4 py-3.5">
        <p className="text-[12px] font-semibold leading-6 text-slate-800 xl:text-[13px]">
          {editorial.warning}
        </p>
      </div>
    </div>

    {/* ACTIONS — OPEN ACCOUNT IS PRIMARY */}
    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
      {item.broker.real_account_url ? (
        <a
          href={`/go/${item.broker.slug}?type=real&source=scalping-page`}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_6px_15px_rgba(30,91,184,0.17)] transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          فتح حساب
        </a>
      ) : (
        <span className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-3 text-[11px] font-black text-slate-400 ring-1 ring-slate-200">
          قريبًا
        </span>
      )}

      <Link
        href={`/brokers/${item.broker.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-white px-3 text-[11px] font-black text-brand-700 shadow-sm ring-1 ring-brand-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-300"
      >
        التقييم الكامل
      </Link>
    </div>
  </div>
</aside>
                  </div>

                
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  </div>
</section>

{/* =====================================================
    SCALPING DECISION GUIDE — FOUR DISTINCT SECTIONS
====================================================== */}
<div className="space-y-5 pt-6 sm:space-y-7 sm:pt-9">
  {/* =====================================================
      1. BROKER SCALPING POLICY — CONNECTED CHECKLIST
  ====================================================== */}
  <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[250px] w-[250px] rounded-full bg-[#D9E9FC] blur-[95px]"
      />

      <div className="relative">
        <span className="inline-flex min-h-[27px] items-center rounded-full border border-[#C9DDF8] bg-white px-3 text-[9px] font-black text-[#1E5BB8] shadow-sm sm:text-[10px]">
          سياسة شركات الفوركس
        </span>

       <h2 className="mt-3 text-right text-[23px] font-black leading-[1.16] tracking-[-0.04em] text-slate-950 sm:text-[32px] lg:whitespace-nowrap lg:text-[36px] xl:text-[40px]">
  <span className="block lg:inline">
    هل تسمح جميع شركات الفوركس
  </span>

  <span className="block text-[#1E5BB8] lg:mr-2 lg:inline">
    بالسكالبينج؟
  </span>
</h2>

        <p className="mt-3 max-w-[1080px] text-right text-[11.5px] font-semibold leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
          لا توجد سياسة واحدة لدى جميع الشركات. قد تسمح الشركة
          بالسكالبينج عمومًا، لكنها تطبق شروطًا مختلفة حسب الحساب
          والمنصة والكيان القانوني.
        </p>
      </div>
    </div>

    {/* MOBILE STEPS */}
    <div className="px-4 py-4 sm:hidden">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-5 right-[15px] top-5 w-px bg-[#C9DDF8]"
        />

        {[
          {
            number: "1",
            title: "مدة الاحتفاظ بالصفقة",
            desc: "تحقق من عدم وجود مدة دنيا قبل إغلاق الصفقة.",
          },
          {
            number: "2",
            title: "التداول عالي التردد",
            desc: "راجع أي قيود خاصة بالصفقات الآلية شديدة السرعة.",
          },
          {
            number: "3",
            title: "Expert Advisors",
            desc: "تأكد من السماح بالروبوتات على الحساب والمنصة المختارين.",
          },
          {
            number: "4",
            title: "الكيان القانوني",
            desc: "قد تختلف الشروط والحماية حسب فرع الشركة.",
          },
        ].map((item, index) => (
          <article
            key={item.number}
            className={`relative flex gap-3 ${
              index === 3 ? "" : "pb-4"
            }`}
          >
            <span className="relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border border-[#9FC2F0] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8] shadow-[0_3px_10px_rgba(30,91,184,0.08)]">
              {item.number}
            </span>

            <div className="min-w-0 flex-1 pb-1">
              <h3 className="text-[12px] font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 text-[10.5px] font-semibold leading-6 text-slate-600">
                {item.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-[15px] border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-[10.5px] font-semibold leading-6 text-amber-900">
          <span className="font-black">قبل فتح الحساب:</span>{" "}
          اقرأ شروط الحساب نفسه، ولا تعتمد فقط على عبارة «السكالبينج
          مسموح».
        </p>
      </div>
    </div>

    {/* DESKTOP CONNECTED STEPS */}
    <div className="hidden px-6 py-6 sm:block">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-[20px] h-px bg-[#C9DDF8]"
        />

        <div className="relative grid grid-cols-4 gap-5">
          {[
            {
              number: "1",
              title: "مدة الاحتفاظ بالصفقة",
              desc: "تحقق من عدم وجود مدة دنيا قبل إغلاق الصفقة.",
            },
            {
              number: "2",
              title: "التداول عالي التردد",
              desc: "راجع القواعد الخاصة بالصفقات الآلية شديدة السرعة.",
            },
            {
              number: "3",
              title: "Expert Advisors",
              desc: "تأكد من دعم الروبوتات على الحساب والمنصة المختارين.",
            },
            {
              number: "4",
              title: "الكيان القانوني",
              desc: "قد تختلف الشروط والحماية حسب فرع الشركة.",
            },
          ].map((item) => (
            <article
              key={item.number}
              className="relative text-center"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#9FC2F0] bg-white text-[11px] font-black text-[#1E5BB8] shadow-[0_5px_16px_rgba(30,91,184,0.10)]">
                {item.number}
              </span>

              <h3 className="mt-3 text-[12px] font-black text-slate-950 lg:text-[13px]">
                {item.title}
              </h3>

              <p className="mx-auto mt-1.5 max-w-[245px] text-[10.5px] font-semibold leading-6 text-slate-600 lg:text-[11px]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-[15px] border border-amber-200 bg-amber-50 px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[12px] font-black text-amber-800">
          !
        </span>

        <p className="text-[11px] font-semibold leading-6 text-amber-900">
          <span className="font-black">قبل فتح الحساب:</span>{" "}
          راجع شروط الحساب المختار والكيان القانوني الذي ستسجل تحته،
          ولا تعتمد على السياسة العامة للشركة فقط.
        </p>
      </div>
    </div>
  </section>

  {/* =====================================================
      2. ACCOUNT TYPES — FEATURED + STACKED COMPARISON
  ====================================================== */}
  <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    <div className="px-4 pb-4 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
      <span className="text-[9px] font-black text-[#1E5BB8] sm:text-[10px]">
        أنواع حسابات التداول
      </span>

      <h2 className="mt-2 text-right text-[26px] font-black leading-[1.18] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
        ما أفضل نوع حساب
        <span className="block text-[#1E5BB8] sm:inline">
          {" "}
          للسكالبينج؟
        </span>
      </h2>

      <p className="mt-3 max-w-[1080px] text-right text-[11.5px] font-semibold leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
        لا يكفي اختيار الشركة؛ يجب اختيار الحساب المناسب داخلها.
        قارن السبريد والعمولة ونوع التنفيذ بدل الاعتماد على اسم الحساب
        وحده.
      </p>
    </div>

    <div className="border-t border-slate-200 p-4 sm:p-6">
      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4">
        {/* FEATURED RAW */}
        {/* FEATURED RAW — CLICKABLE */}
<Link
  href="/best-brokers/accounts/raw-spread"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="فتح دليل حساب Raw Spread في صفحة جديدة"
  className="group relative block overflow-hidden rounded-[20px] border border-[#4F8EDC] bg-[linear-gradient(145deg,#F1F7FF_0%,#FFFFFF_72%)] p-4 shadow-[0_12px_30px_rgba(30,91,184,0.11)] transition duration-200 hover:-translate-y-1 hover:border-[#1E5BB8] hover:shadow-[0_18px_38px_rgba(30,91,184,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] focus-visible:ring-offset-2 sm:p-6"
>
  {/* BLUE ACCENT */}
  <div className="absolute inset-y-0 right-0 w-[4px] bg-[#1E5BB8]" />

  {/* TOP */}
  <div className="relative flex flex-wrap items-center justify-between gap-3">
    <span className="inline-flex min-h-[28px] items-center rounded-full bg-[#1E5BB8] px-3 text-[9px] font-black text-white">
      الأنسب غالبًا للمتداول النشط
    </span>

    <div className="flex items-center gap-2">
      <span
        dir="ltr"
        className="text-[10px] font-black text-[#1E5BB8]"
      >
        RAW
      </span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9DDF8] bg-white text-[13px] font-black text-[#1E5BB8] shadow-sm transition group-hover:-translate-x-1 group-hover:bg-[#1E5BB8] group-hover:text-white">
        ↗
      </span>
    </div>
  </div>

  {/* TITLE */}
  <div className="relative mt-4 flex flex-wrap items-center gap-2">
    <h3 className="text-[21px] font-black text-slate-950 transition group-hover:text-[#1E5BB8] sm:text-[25px]">
      حساب Raw Spread
    </h3>

    <span className="inline-flex min-h-[24px] items-center rounded-full border border-[#C9DDF8] bg-white px-2.5 text-[8px] font-black text-[#1E5BB8] opacity-90">
      اضغط لعرض التفاصيل
    </span>
  </div>

  {/* DESCRIPTION */}
  <p className="relative mt-2 max-w-[660px] text-[11.5px] font-semibold leading-7 text-slate-700 sm:text-[13px]">
    يقدم سبريدًا منخفضًا مقابل عمولة منفصلة، ويكون مناسبًا
    للسكالبينج عندما تكون العمولة واضحة وتُنفذ صفقات كثيرة.
  </p>

  {/* FEATURES */}
  <div className="relative mt-5 grid gap-2.5 sm:grid-cols-3">
    <div className="flex items-start gap-2">
      <span className="font-black text-emerald-600">✓</span>

      <div>
        <span className="block text-[10px] font-black text-slate-950">
          سبريد منخفض
        </span>

        <span className="mt-0.5 block text-[9px] font-semibold leading-5 text-slate-600">
          يبدأ عادةً من مستويات أقل.
        </span>
      </div>
    </div>

    <div className="flex items-start gap-2">
      <span className="font-black text-emerald-600">✓</span>

      <div>
        <span className="block text-[10px] font-black text-slate-950">
          تكلفة قابلة للمقارنة
        </span>

        <span className="mt-0.5 block text-[9px] font-semibold leading-5 text-slate-600">
          عند معرفة عمولة الفتح والإغلاق.
        </span>
      </div>
    </div>

    <div className="flex items-start gap-2">
      <span className="font-black text-amber-600">!</span>

      <div>
        <span className="block text-[10px] font-black text-slate-950">
          ليس مجانيًا
        </span>

        <span className="mt-0.5 block text-[9px] font-semibold leading-5 text-slate-600">
          يجب جمع السبريد والعمولة.
        </span>
      </div>
    </div>
  </div>

  {/* LINK HINT */}
  <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-[#C9DDF8] pt-3">
    <span className="text-[9.5px] font-black text-[#1E5BB8]">
      اقرأ دليل حساب Raw Spread
    </span>

    <span className="text-[14px] font-black text-[#1E5BB8] transition group-hover:-translate-x-1">
      ←
    </span>
  </div>
</Link>

        {/* ECN + STANDARD STACK */}
        <div className="divide-y divide-slate-200 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          {/* ECN */}
          <article className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[8px] font-black text-[#1E5BB8]">
                  يحتاج تدقيقًا
                </span>

                <h3 className="mt-1 text-[18px] font-black text-slate-950 sm:text-[20px]">
                  حساب ECN
                </h3>
              </div>

              <span
                dir="ltr"
                className="inline-flex min-h-[29px] items-center rounded-xl border border-[#C9DDF8] bg-[#F2F7FE] px-3 text-[10px] font-black text-[#1E5BB8]"
              >
                ECN
              </span>
            </div>

            <p className="mt-2 text-[10.5px] font-semibold leading-6 text-slate-600 sm:text-[11px]">
              قد يشير إلى تسعير وتنفيذ منخفض التكلفة، لكن بعض الشركات
              تستخدم الاسم تسويقيًا؛ افحص العمولة والتنفيذ فعليًا.
            </p>
          </article>

         {/* STANDARD — CLICKABLE */}
<Link
  href="/best-brokers/accounts/standard"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="فتح دليل الحساب Standard في صفحة جديدة"
  className="group relative block p-4 transition hover:bg-[#F5F9FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E5BB8] sm:p-5"
>
  <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="min-w-0">
      <span className="text-[8px] font-black text-slate-500">
        الأسهل للمبتدئ
      </span>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h3 className="text-[18px] font-black text-slate-950 transition group-hover:text-[#1E5BB8] sm:text-[20px]">
          الحساب Standard
        </h3>

        <span className="inline-flex min-h-[23px] items-center rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-2.5 text-[8px] font-black text-[#1E5BB8]">
          اضغط للتفاصيل
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <span
        dir="ltr"
        className="inline-flex min-h-[29px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] font-black text-slate-700 transition group-hover:border-[#9FC2F0] group-hover:bg-white group-hover:text-[#1E5BB8]"
      >
        Standard
      </span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9DDF8] bg-white text-[12px] font-black text-[#1E5BB8] shadow-sm transition group-hover:-translate-x-1 group-hover:bg-[#1E5BB8] group-hover:text-white">
        ↗
      </span>
    </div>
  </div>

  <p className="mt-2 text-[10.5px] font-semibold leading-6 text-slate-600 sm:text-[11px]">
    غالبًا لا توجد عمولة منفصلة، لكن السبريد أوسع. قد يناسب
    من يتداول بعدد صفقات أقل ويريد تكلفة أبسط.
  </p>

  <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
    <span className="text-[9px] font-black text-[#1E5BB8]">
      اقرأ دليل الحساب Standard
    </span>

    <span className="text-[13px] font-black text-[#1E5BB8] transition group-hover:-translate-x-1">
      ←
    </span>
  </div>
</Link>
        </div>
      </div>

      {/* ACCOUNT DECISION BAR */}
      <div className="mt-4 flex flex-col gap-2 rounded-[16px] border border-[#C9DDF8] bg-[#F2F7FE] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[10px] font-black text-[#1E5BB8]">
            قاعدة القرار
          </span>

          <p className="mt-0.5 text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[11px]">
            قارن التكلفة الإجمالية للصفقة، وليس السبريد المعلن وحده.
          </p>
        </div>

        <span className="shrink-0 text-[9px] font-black text-slate-600">
          السبريد + العمولة + الانزلاق
        </span>
      </div>
    </div>
  </section>

  {/* =====================================================
    3. PLATFORMS — COMPACT RESPONSIVE COMPARISON
====================================================== */}
<section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
  {/* =================================================
      MOBILE
  ================================================== */}
  <div className="lg:hidden">
    {/* MOBILE HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#EDF5FF_0%,#F8FBFF_100%)] px-4 pb-3.5 pt-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-[210px] w-[210px] rounded-full bg-[#D9E9FC] blur-[80px]"
      />

      <div className="relative">
        <span className="text-[9px] font-black text-[#1E5BB8]">
          منصات التداول
        </span>

        <h2 className="mt-2 text-right text-[24px] font-black leading-[1.14] tracking-[-0.04em] text-slate-950">
          ما أفضل منصة
          <span className="block text-[#1E5BB8]">
            للسكالبينج؟
          </span>
        </h2>

        <p className="mt-2.5 text-[10.5px] font-semibold leading-6 text-slate-700">
          تعتمد المنصة المناسبة على الاستراتيجية والروبوتات والأدوات
          التي تحتاجها أثناء تنفيذ الصفقة.
        </p>
      </div>
    </div>

    {/* MOBILE PLATFORM ROWS */}
    <div className="divide-y divide-slate-200">
      {[
        {
          name: "MT4",
          title: "للروبوتات القديمة",
          desc: "مكتبة واسعة من Expert Advisors والمؤشرات بلغة MQL4.",
          label: "الأكثر انتشارًا",
          featured: false,
        },
        {
          name: "MT5",
          title: "للاختبارات والأدوات الأحدث",
          desc: "أطر زمنية وأدوات واختبارات أكثر من MT4.",
          label: "أحدث",
          featured: false,
        },
        {
          name: "cTrader",
          title: "للتنفيذ وعمق السوق",
          desc: "تداول بنقرة واحدة وعمق السوق ودعم cTrader Algo.",
          label: "مناسب للسكالبينج",
          featured: true,
        },
        {
          name: "TradingView",
          title: "للتحليل والرسوم",
          desc: "واجهة رسوم قوية، بينما يعتمد التنفيذ على تكامل الوسيط.",
          label: "أفضل للتحليل",
          featured: false,
        },
      ].map((platform) => (
        <article
          key={platform.name}
          className={`px-4 py-3 ${
            platform.featured
              ? "bg-[linear-gradient(90deg,#F2F7FE_0%,#FFFFFF_85%)]"
              : "bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              dir="ltr"
              className={`inline-flex min-h-[32px] min-w-[64px] shrink-0 items-center justify-center rounded-[10px] border px-2.5 text-[9.5px] font-black ${
                platform.featured
                  ? "border-[#4F8EDC] bg-white text-[#1E5BB8]"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              {platform.name}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[11.5px] font-black leading-5 text-slate-950">
                  {platform.title}
                </h3>

                <span
                  className={`rounded-full px-2 py-1 text-[7px] font-black ${
                    platform.featured
                      ? "bg-[#1E5BB8] text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {platform.label}
                </span>
              </div>

              <p className="mt-0.5 text-[9px] font-semibold leading-[1.8] text-slate-600">
                {platform.desc}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* MOBILE NOTE */}
<div className="border-t border-slate-200 bg-slate-50/70 px-4 py-2.5">
  <p className="text-[9px] font-semibold leading-5 text-slate-600">
    <span className="font-black text-[#1E5BB8]">
      المهم:
    </span>{" "}
    جودة التنفيذ تعتمد على الوسيط والحساب، وليس اسم المنصة وحده.
  </p>
</div>
  </div>

  {/* =================================================
      DESKTOP
  ================================================== */}
  <div className="hidden lg:grid lg:grid-cols-[390px_minmax(0,1fr)] xl:grid-cols-[430px_minmax(0,1fr)]">
    {/* DESKTOP INTRO PANEL */}
    <aside className="relative flex min-h-[390px] flex-col justify-between overflow-hidden border-l border-slate-200 bg-[linear-gradient(145deg,#EAF3FF_0%,#F8FBFF_100%)] px-7 py-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 h-[270px] w-[270px] rounded-full bg-[#CFE3FC] blur-[95px]"
      />

      <div className="relative">
        <span className="text-[10px] font-black text-[#1E5BB8]">
          منصات التداول
        </span>

        <h2 className="mt-3 text-[34px] font-black leading-[1.05] tracking-[-0.04em] text-slate-950">
  ما أفضل منصة
  <br />
  <span className="text-brand-600">
    للسكالبينج
  </span>
</h2>

        <p className="mt-4 text-[13px] font-semibold leading-8 text-slate-700">
          تعتمد المنصة المناسبة على طريقة التداول، ونوع الروبوتات
          والأدوات المستخدمة أثناء تحليل السوق وتنفيذ الأوامر.
        </p>
      </div>

      {/* PLATFORM VISUAL */}
      <div className="relative mt-6">
        <div className="rounded-[20px] border border-[#C9DDF8] bg-white/85 p-4 shadow-[0_12px_28px_rgba(30,91,184,0.08)] backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#1E5BB8]">
              اختيار المنصة
            </span>

            <div className="flex -space-x-1.5 space-x-reverse">
              {["MT4", "MT5", "cT", "TV"].map((item) => (
                <span
                  key={item}
                  dir="ltr"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#F2F7FE] text-[8px] font-black text-[#1E5BB8] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#1E5BB8_0%,#73A9EA_100%)]" />
          </div>

          <p className="mt-3 text-[10px] font-semibold leading-5 text-slate-600">
            لا توجد منصة واحدة مثالية للجميع؛ الأهم هو توافقها مع
            الاستراتيجية والحساب المختار.
          </p>
        </div>
      </div>
    </aside>

    {/* DESKTOP PLATFORM ROWS */}
    <div className="divide-y divide-slate-200">
      {[
        {
          name: "MT4",
          title: "للروبوتات والمؤشرات القديمة",
          desc: "منصة منتشرة وتدعم مكتبة كبيرة من Expert Advisors والمؤشرات بلغة MQL4.",
          label: "الأكثر انتشارًا",
          featured: false,
        },
        {
          name: "MT5",
          title: "أدوات واختبارات أحدث",
          desc: "توفر أطرًا زمنية وأدوات واختبارات أكثر من MT4 مع دعم MQL5.",
          label: "أحدث",
          featured: false,
        },
        {
          name: "cTrader",
          title: "لعمق السوق والتنفيذ السريع",
          desc: "توفر التداول بنقرة واحدة وعمق السوق ودعم التداول الآلي عبر cTrader Algo.",
          label: "مناسبة للسكالبينج",
          featured: true,
        },
        {
          name: "TradingView",
          title: "للتحليل والرسوم",
          desc: "واجهة رسوم متقدمة، بينما تعتمد جودة التنفيذ على تكامل الوسيط والحساب.",
          label: "أفضل للتحليل",
          featured: false,
        },
      ].map((platform) => (
        <article
          key={platform.name}
          className={`group flex min-h-[97px] items-center px-6 py-4 transition xl:px-7 ${
            platform.featured
              ? "bg-[linear-gradient(90deg,#F2F7FE_0%,#FFFFFF_80%)]"
              : "bg-white hover:bg-slate-50/70"
          }`}
        >
          <div className="grid w-full grid-cols-[105px_minmax(0,1fr)_150px] items-center gap-5">
            <span
              dir="ltr"
              className={`inline-flex min-h-[36px] w-fit min-w-[76px] items-center justify-center rounded-xl border px-3 text-[11px] font-black ${
                platform.featured
                  ? "border-[#4F8EDC] bg-white text-[#1E5BB8]"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              {platform.name}
            </span>

            <div className="min-w-0">
              <h3 className="text-[14px] font-black text-slate-950">
                {platform.title}
              </h3>

              <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-600">
                {platform.desc}
              </p>
            </div>

            <span
  className={`inline-flex min-h-[30px] min-w-[96px] items-center justify-center justify-self-end rounded-full px-4 text-[9.5px] font-black shadow-sm ${
    platform.featured
      ? "bg-[#1E5BB8] text-white shadow-[0_6px_16px_rgba(30,91,184,0.16)]"
      : "border border-slate-200 bg-slate-100 text-slate-700"
  }`}
>
  {platform.label}
</span>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

{/* =====================================================
    4. BEST BROKER BY NEED — LOGOS + FILLED DESKTOP
====================================================== */}
<section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
  {/* =================================================
      MOBILE HEADER
  ================================================== */}
  <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#F4F8FE_0%,#FFFFFF_100%)] px-4 py-5 lg:hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-20 -top-20 h-[190px] w-[190px] rounded-full bg-[#D9E9FC] blur-[80px]"
    />

    <div className="relative">
      <span className="text-[9px] font-black text-[#1E5BB8]">
        خلاصة عملية
      </span>

      <h2 className="mt-2 text-right text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950">
        أفضل شركة سكالبينج
        <span className="block text-[#1E5BB8]">
          حسب احتياجك
        </span>
      </h2>

      <p className="mt-3 text-[11px] font-semibold leading-7 text-slate-700">
        اختر الأولوية الأقرب لك، ثم انتقل مباشرة إلى بطاقة الشركة
        في الترتيب.
      </p>
    </div>
  </div>

  <div className="lg:grid lg:grid-cols-[390px_minmax(0,1fr)] xl:grid-cols-[430px_minmax(0,1fr)]">
    {/* =================================================
        DESKTOP FEATURE PANEL
    ================================================== */}
    <aside className="relative hidden overflow-hidden border-l border-slate-200 bg-[linear-gradient(145deg,#EAF3FF_0%,#F8FBFF_100%)] px-7 py-7 lg:flex lg:min-h-[510px] lg:flex-col lg:justify-between">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-28 h-[300px] w-[300px] rounded-full bg-[#CFE3FC] blur-[100px]"
      />

      <div className="relative">
        <span className="text-[10px] font-black text-[#1E5BB8]">
          خلاصة عملية
        </span>

        <h2 className="mt-3 text-right text-[34px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 xl:text-[39px]">
          أفضل شركة سكالبينج
          <span className="block text-[#1E5BB8]">
            حسب احتياجك
          </span>
        </h2>

        <p className="mt-4 text-[13px] font-semibold leading-8 text-slate-700">
          لا توجد شركة واحدة تناسب جميع المتداولين. حدّد أولويتك:
          التكلفة، المنصة، الدعم العربي أو نوع الحساب.
        </p>
      </div>

      {/* FEATURED BROKER LOGOS */}
      <div className="relative mt-7">
        <span className="block text-[9px] font-black text-[#1E5BB8]">
          أبرز الخيارات في الدليل
        </span>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {["icmarkets", "tickmill", "pepperstone", "exness"].map(
            (slug) => {
              const brokerItem = brokers.find(
                (candidate) => candidate.broker.slug === slug
              );

              if (!brokerItem) return null;

              return (
                <Link
                  key={slug}
                  href={`#broker-${slug}`}
                  className="group flex min-h-[76px] items-center gap-3 rounded-[16px] border border-white/90 bg-white/85 p-3 shadow-[0_8px_22px_rgba(30,91,184,0.07)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#9FC2F0]"
                >
                  <div className="relative flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {brokerItem.broker.logo ? (
                      <Image
                        src={brokerItem.broker.logo}
                        alt={`شعار ${brokerItem.broker.name}`}
                        fill
                        className="object-contain p-1.5"
                        sizes="56px"
                      />
                    ) : (
                      <span className="text-[9px] font-black text-slate-600">
                        {getInitials(brokerItem.broker.name)}
                      </span>
                    )}
                  </div>

                  <span
                    dir="ltr"
                    className="min-w-0 truncate text-left text-[11px] font-black text-slate-950 transition group-hover:text-[#1E5BB8]"
                  >
                    {brokerItem.broker.name}
                  </span>
                </Link>
              );
            }
          )}
        </div>
      </div>

      {/* DESKTOP CTA */}
      <div className="relative mt-6 rounded-[18px] border border-[#C9DDF8] bg-white/85 p-4 shadow-[0_10px_26px_rgba(30,91,184,0.07)]">
        <span className="text-[10px] font-black text-[#1E5BB8]">
          كيف تتخذ القرار؟
        </span>

        <p className="mt-2 text-[10.5px] font-semibold leading-6 text-slate-600">
          راجع الحساب المختار والتكلفة والمنصات والتحليل التحريري قبل
          فتح حساب حقيقي.
        </p>

        <a
          href="#top-brokers"
          className="mt-3 inline-flex min-h-[39px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-4 text-[10px] font-black text-white shadow-[0_7px_18px_rgba(30,91,184,0.18)] transition hover:bg-[#174A96]"
        >
          عرض ترتيب الشركات
        </a>
      </div>
    </aside>

    {/* =================================================
        DECISION ROWS
    ================================================== */}
    <div className="divide-y divide-slate-200">
      {[
        {
          number: "01",
          need: "الأفضل إجمالًا",
          broker: "IC Markets",
          slug: "icmarkets",
          note: "حساب Raw وتكلفة قوية ومنصات مناسبة للمتداول النشط.",
        },
        {
          number: "02",
          need: "أقل عمولة مباشرة",
          broker: "Tickmill",
          slug: "tickmill",
          note: "حساب Raw واضح وخيار قوي لمستخدمي MetaTrader.",
        },
        {
          number: "03",
          need: "أفضل تنوع منصات",
          broker: "Pepperstone",
          slug: "pepperstone",
          note: "يدعم MetaTrader وcTrader وTradingView.",
        },
        {
          number: "04",
          need: "أفضل دعم عربي",
          broker: "Exness",
          slug: "exness",
          note: "دعم عربي وطرق دفع وخيارات حساب متعددة.",
        },
        {
          number: "05",
          need: "الحساب الإسلامي",
          broker: "HFM",
          slug: "hfm",
          note: "حساب Zero وخيارات إسلامية وفق الكيان والشروط.",
        },
        {
          number: "06",
          need: "سكالبينج عبر MT5",
          broker: "Vantage",
          slug: "vantage",
          note: "حساب Raw ECN وتجربة تقليدية عبر MetaTrader.",
        },
        {
          number: "07",
          need: "تنوع منصات بتكلفة متوازنة",
          broker: "FP Markets",
          slug: "fp-markets",
          note: "Raw مع MT4 وMT5 وcTrader وTradingView.",
        },
        {
          number: "08",
          need: "التداول بحجم مرتفع",
          broker: "ThinkMarkets",
          slug: "thinkmarkets",
          note: "حساب ThinkZero مناسب للمتداول الأكثر نشاطًا.",
        },
      ].map((item) => {
        const brokerItem = brokers.find(
          (candidate) => candidate.broker.slug === item.slug
        );

        return (
          <a
            key={item.number}
            href={`#broker-${item.slug}`}
            className="group flex min-h-[92px] items-center gap-3 px-4 py-3.5 transition hover:bg-[#F5F9FF] sm:px-6 lg:min-h-[105px] lg:px-7"
          >
            {/* LOGO */}
            <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-slate-200 bg-white shadow-[0_5px_14px_rgba(15,23,42,0.05)]">
              {brokerItem?.broker.logo ? (
                <Image
                  src={brokerItem.broker.logo}
                  alt={`شعار ${item.broker}`}
                  fill
                  className="object-contain p-1.5"
                  sizes="64px"
                />
              ) : (
                <span
                  dir="ltr"
                  className="text-[9px] font-black text-slate-600"
                >
                  {getInitials(item.broker)}
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[9px] font-black text-slate-500">
                  {item.need}
                </span>

                <span
                  dir="ltr"
                  className="text-[9px] font-black text-[#1E5BB8]"
                >
                  {item.number}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <h3
                  dir="ltr"
                  className="truncate text-left text-[15px] font-black text-slate-950 transition group-hover:text-[#1E5BB8] sm:text-[16px]"
                >
                  {item.broker}
                </h3>

                <span className="text-[11px] font-black text-[#1E5BB8] transition group-hover:-translate-x-1">
                  ←
                </span>
              </div>

              <p className="mt-1 line-clamp-2 text-[9.5px] font-semibold leading-5 text-slate-600 sm:text-[10.5px]">
                {item.note}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>

  {/* MOBILE FOOTER */}
  <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-4 lg:hidden">
    <a
      href="#top-brokers"
      className="inline-flex min-h-[41px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-5 text-[10px] font-black text-white shadow-[0_7px_18px_rgba(30,91,184,0.18)]"
    >
      العودة إلى ترتيب الشركات
    </a>
  </div>
</section>
</div>

    {/* =====================================================
    METHODOLOGY + REAL COST — COMPACT FINAL
====================================================== */}
<div className="space-y-5 pt-6 sm:space-y-7 sm:pt-9">
  {/* =====================================================
      METHODOLOGY — COMPACT MOBILE + CLEAN DESKTOP
  ====================================================== */}
  <section
    id="methodology"
    className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)] sm:rounded-[30px]"
  >
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-4 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[240px] w-[240px] rounded-full bg-[#d9e9fc] blur-[90px]"
      />

      <div className="relative">
        <span className="inline-flex min-h-[26px] items-center rounded-full border border-[#c9ddf8] bg-white px-3 text-[8.5px] font-black text-[#1e5bb8] shadow-sm sm:text-[10px]">
          منهجية بروكر العرب
        </span>

        <h2 className="mt-3 text-right text-[25px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
          كيف اخترنا شركات
          <span className="block text-[#1e5bb8] sm:inline">
            {" "}
            السكالبينج؟
          </span>
        </h2>

        <p className="mt-2.5 max-w-[1050px] text-right text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[13px] sm:leading-7">
          أعطينا الوزن الأكبر للتكلفة والتنفيذ، ثم راجعنا سياسة
          السكالبينج والمنصات والثقة وتجربة الحساب.
        </p>
      </div>
    </div>

    {/* =================================================
        MOBILE — 4 COMPACT GROUPS
    ================================================== */}
    <div className="p-4 sm:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        {[
          {
            weight: "30%",
            title: "التكلفة",
            desc: "السبريد والعمولة.",
          },
          {
            weight: "25%",
            title: "التنفيذ",
            desc: "السرعة والانزلاق.",
          },
          {
            weight: "15%",
            title: "السياسة",
            desc: "السكالبينج والروبوتات.",
          },
          {
            weight: "10%",
            title: "المنصات",
            desc: "MT4 وMT5 وcTrader.",
          },
          {
            weight: "10%",
            title: "الثقة",
            desc: "التراخيص والكيان.",
          },
          {
            weight: "10%",
            title: "التجربة",
            desc: "الحساب والدعم والقرار التحريري.",
          },
        ].map((criterion, index) => (
          <article
            key={criterion.title}
            className={`relative min-h-[105px] overflow-hidden rounded-[16px] border p-3 ${
              index < 2
                ? "border-[#9fc2f0] bg-[linear-gradient(145deg,#f2f7fe_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                dir="ltr"
                className={`inline-flex min-h-[25px] min-w-[45px] items-center justify-center rounded-full px-2 text-[8px] font-black ${
                  index < 2
                    ? "bg-[#1e5bb8] text-white"
                    : "bg-[#f2f7fe] text-[#1e5bb8] ring-1 ring-[#c9ddf8]"
                }`}
              >
                {criterion.weight}
              </span>

              <span className="text-[8px] font-black text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-3 text-[11px] font-black text-slate-950">
              {criterion.title}
            </h3>

            <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
              {criterion.desc}
            </p>
          </article>
        ))}
      </div>

      {/* MOBILE SUMMARY */}
      <div className="mt-3 flex items-center justify-between gap-3 rounded-[16px] border border-[#c9ddf8] bg-[#f2f7fe] px-4 py-3">
        <div>
          <span className="block text-[9px] font-black text-[#1e5bb8]">
            النتيجة النهائية
          </span>

          <p className="mt-0.5 text-[9px] font-semibold leading-5 text-slate-600">
            تقييم متوازن، وليس مقارنة عمولة فقط.
          </p>
        </div>

        <span
          dir="ltr"
          className="shrink-0 text-[23px] font-black text-[#1e5bb8]"
        >
          100%
        </span>
      </div>
    </div>

    {/* =================================================
        TABLET + DESKTOP — WEIGHTED ROWS
    ================================================== */}
    <div className="hidden sm:grid sm:grid-cols-[330px_minmax(0,1fr)] lg:grid-cols-[380px_minmax(0,1fr)]">
      {/* SUMMARY PANEL */}
      <aside className="relative flex flex-col justify-between overflow-hidden border-l border-slate-200 bg-[linear-gradient(145deg,#edf5ff_0%,#f8fbff_100%)] p-6 lg:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-24 h-[250px] w-[250px] rounded-full bg-[#cfe3fc] blur-[90px]"
        />

        <div className="relative">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            توزيع أوزان التقييم
          </span>

          <div className="mt-3 flex items-end gap-2">
            <span
              dir="ltr"
              className="text-[48px] font-black leading-none text-[#1e5bb8]"
            >
              100%
            </span>

            <span className="pb-1 text-[11px] font-black text-slate-600">
              مجموع المعايير
            </span>
          </div>

          <p className="mt-4 text-[11px] font-semibold leading-6 text-slate-600">
            لا نعطي المركز الأول للشركة صاحبة أقل عمولة وحدها؛ بل نبحث
            عن توازن بين التكلفة والتنفيذ والمنصة والثقة.
          </p>
        </div>

        <div className="relative mt-5 rounded-[16px] border border-[#c9ddf8] bg-white/80 p-4">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            الأولوية الأعلى
          </span>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-[11px] font-black text-slate-950">
              التكلفة + التنفيذ
            </span>

            <span
              dir="ltr"
              className="text-[16px] font-black text-[#1e5bb8]"
            >
              55%
            </span>
          </div>
        </div>
      </aside>

      {/* WEIGHT ROWS */}
      <div className="divide-y divide-slate-200">
        {[
          {
            weight: 30,
            title: "التكلفة الإجمالية",
            desc: "السبريد والعمولة وتكلفة فتح وإغلاق الصفقة.",
          },
          {
            weight: 25,
            title: "جودة التنفيذ",
            desc: "سرعة الأوامر واحتمال الانزلاق واستقرار التنفيذ.",
          },
          {
            weight: 15,
            title: "سياسة السكالبينج",
            desc: "الصفقات القصيرة والتداول الآلي وعالي التردد.",
          },
          {
            weight: 10,
            title: "المنصات",
            desc: "توفر MT4 وMT5 وcTrader وTradingView.",
          },
          {
            weight: 10,
            title: "التراخيص والثقة",
            desc: "قوة التنظيم والكيان وحماية العميل.",
          },
          {
            weight: 10,
            title: "التجربة والقرار التحريري",
            desc: "وضوح الحساب والدعم والمراجعة النهائية.",
          },
        ].map((criterion, index) => (
          <article
            key={criterion.title}
            className={`px-6 py-4 lg:px-7 ${
              index < 2
                ? "bg-[linear-gradient(90deg,#f2f7fe_0%,#ffffff_75%)]"
                : "bg-white"
            }`}
          >
            <div className="grid grid-cols-[68px_minmax(0,1fr)_150px] items-center gap-5">
              <span
                dir="ltr"
                className={`inline-flex min-h-[32px] items-center justify-center rounded-full text-[9px] font-black ${
                  index < 2
                    ? "bg-[#1e5bb8] text-white"
                    : "bg-[#f2f7fe] text-[#1e5bb8] ring-1 ring-[#c9ddf8]"
                }`}
              >
                {criterion.weight}%
              </span>

              <div>
                <h3 className="text-[13px] font-black text-slate-950">
                  {criterion.title}
                </h3>

                <p className="mt-1 text-[10.5px] font-semibold leading-5 text-slate-600">
                  {criterion.desc}
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#1e5bb8_0%,#70a7e9_100%)]"
                  style={{ width: `${(criterion.weight / 30) * 100}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  {/* =====================================================
      SPREAD 0.0 — LIGHTER COST EXPLAINER
  ====================================================== */}
  <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)] sm:rounded-[30px]">
    {/* =================================================
        MOBILE
    ================================================== */}
    <div className="lg:hidden">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#f3f8ff_100%)] px-4 py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-[200px] w-[200px] rounded-full bg-[#d9e9fc] blur-[80px]"
        />

        <div className="relative">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            فهم التكلفة
          </span>

          <h2 className="mt-2 text-right text-[24px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950">
            لماذا سبريد 0.0 لا يعني
            <span className="block text-[#1e5bb8]">
              أن الحساب مجاني؟
            </span>
          </h2>

          <p className="mt-2.5 text-[10.5px] font-semibold leading-6 text-slate-700">
            حسابات Raw قد تبدأ من سبريد صفر، لكنها تفرض عمولة منفصلة،
            وقد يتسع السبريد أثناء الأخبار أو ضعف السيولة.
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* FORMULA */}
        <div className="rounded-[17px] border border-[#c9ddf8] bg-[#f2f7fe] p-4">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            التكلفة الحقيقية
          </span>

          <p className="mt-2 text-[13px] font-black leading-7 text-slate-950">
            السبريد + العمولة + الانزلاق المحتمل
          </p>

          <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
            وقد تضاف رسوم تبييت إذا بقيت الصفقة مفتوحة.
          </p>
        </div>

        {/* COMPARISON */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-[16px] border border-[#9fc2f0] bg-[linear-gradient(145deg,#f2f7fe_0%,#ffffff_100%)] p-3">
            <span className="text-[8px] font-black text-[#1e5bb8]">
              Raw
            </span>

            <h3 className="mt-2 text-[11px] font-black text-slate-950">
              سبريد أقل
            </h3>

            <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
              مع عمولة منفصلة.
            </p>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-3">
            <span className="text-[8px] font-black text-slate-500">
              Standard
            </span>

            <h3 className="mt-2 text-[11px] font-black text-slate-950">
              تكلفة أبسط
            </h3>

            <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
              لكن السبريد أوسع غالبًا.
            </p>
          </div>
        </div>

        {/* MOBILE COMMISSION EXAMPLE — BRAND COLORS */}
<aside className="relative mt-3 overflow-hidden rounded-[18px] border border-brand-400 bg-[linear-gradient(145deg,#2B6FD0_0%,#1E5BB8_58%,#184A97_100%)] p-4 text-white shadow-[0_12px_28px_rgba(30,91,184,0.18)]">
  {/* DECORATION */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-16 -top-20 h-[180px] w-[180px] rounded-full bg-white/10 blur-[65px]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-20 -right-16 h-[170px] w-[170px] rounded-full bg-brand-400/25 blur-[60px]"
  />

  <div className="relative">
    {/* HEADER */}
    <div className="flex items-start justify-between gap-3">
      <div>
        <span className="text-[8px] font-black text-brand-100">
          مثال مبسط
        </span>

        <h3 className="mt-1 text-[17px] font-black leading-6 text-white">
          عمولة 3.5$ لكل جهة
        </h3>

        <p className="mt-1 text-[8.5px] font-semibold leading-5 text-brand-100">
          تُدفع مرة عند فتح الصفقة ومرة عند إغلاقها.
        </p>
      </div>

      <div className="shrink-0 text-left">
        <span className="block text-[8px] font-bold text-brand-100">
          الإجمالي
        </span>

        <span
          dir="ltr"
          className="mt-1 block text-[27px] font-black leading-none text-white"
        >
          $7
        </span>
      </div>
    </div>

    {/* OPEN + CLOSE */}
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-[13px] border border-white/20 bg-white/10 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[8px] font-bold text-brand-100">
          فتح الصفقة
        </span>

        <span
          dir="ltr"
          className="mt-1.5 block text-[14px] font-black text-white"
        >
          $3.50
        </span>
      </div>

      <div className="rounded-[13px] border border-white/20 bg-white/10 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[8px] font-bold text-brand-100">
          إغلاق الصفقة
        </span>

        <span
          dir="ltr"
          className="mt-1.5 block text-[14px] font-black text-white"
        >
          $3.50
        </span>
      </div>
    </div>

    {/* TOTAL */}
    <div className="mt-2.5 flex items-center justify-between rounded-[14px] border border-white/25 bg-white/15 px-3.5 py-3">
      <span className="text-[10px] font-black text-white">
        الإجمالي لكل لوت
      </span>

      <span
        dir="ltr"
        className="text-[19px] font-black text-white"
      >
        $7
      </span>
    </div>

    <p className="mt-3 text-[8.5px] font-semibold leading-5 text-brand-100">
      هذا هو إجمالي عمولة فتح الصفقة وإغلاقها لكل لوت.
    </p>
  </div>
</aside>
      </div>
    </div>

    {/* =================================================
        DESKTOP
    ================================================== */}
    <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* MAIN */}
      <article className="px-7 py-7 xl:px-9">
        <span className="text-[10px] font-black text-[#1e5bb8]">
          فهم التكلفة
        </span>

        <h2 className="mt-2 max-w-[900px] text-[33px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 xl:text-[38px]">
          لماذا سبريد 0.0 لا يعني أن الحساب مجاني؟
        </h2>

        <p className="mt-3 max-w-[900px] text-[12.5px] font-semibold leading-7 text-slate-700 xl:text-[13.5px]">
          حسابات Raw قد تعرض سبريدًا يبدأ من صفر، لكنها تفرض عمولة
          منفصلة للفتح والإغلاق. كما يتغير السبريد الفعلي حسب السيولة
          ووقت التداول.
        </p>

        <div className="mt-5 rounded-[17px] border border-[#c9ddf8] bg-[linear-gradient(145deg,#f2f7fe_0%,#ffffff_100%)] p-4">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            معادلة التكلفة
          </span>

          <p className="mt-2 text-[16px] font-black text-slate-950">
            السبريد + العمولة + الانزلاق المحتمل
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            {
              label: "حساب Raw",
              title: "سبريد أقل",
              desc: "مع عمولة منفصلة.",
            },
            {
              label: "حساب Standard",
              title: "تكلفة أبسط",
              desc: "لكن بسبريد أوسع.",
            },
            {
              label: "قرار المقارنة",
              title: "احسب الإجمالي",
              desc: "حسب حجم وعدد الصفقات.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[16px] border border-slate-200 bg-white p-4"
            >
              <span className="text-[8.5px] font-black text-[#1e5bb8]">
                {item.label}
              </span>

              <h3 className="mt-2 text-[12.5px] font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 text-[9.5px] font-semibold leading-5 text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* DESKTOP COMMISSION CALCULATOR — BRAND COLORS */}
<aside className="relative overflow-hidden border-r border-brand-400 bg-[linear-gradient(145deg,#2B6FD0_0%,#1E5BB8_58%,#184A97_100%)] px-6 py-7 text-white shadow-[inset_1px_0_0_rgba(255,255,255,0.08)] xl:px-7">
  {/* DECORATION */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-24 -top-24 h-[230px] w-[230px] rounded-full bg-white/10 blur-[80px]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-28 -right-24 h-[240px] w-[240px] rounded-full bg-brand-400/25 blur-[85px]"
  />

  <div className="relative flex h-full flex-col">
    {/* HEADER */}
    <span className="text-[9px] font-black text-brand-100">
      مثال حساب العمولة
    </span>

    <h3 className="mt-2 text-[24px] font-black leading-[1.25] text-white">
      عمولة 3.5$ لكل جهة
    </h3>

    <p className="mt-2 text-[10px] font-semibold leading-6 text-brand-100">
      تُدفع العمولة مرة عند فتح الصفقة ومرة أخرى عند إغلاقها.
    </p>

    {/* VALUES */}
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      <div className="rounded-[14px] border border-white/20 bg-white/10 px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[9px] font-black text-brand-100">
          فتح الصفقة
        </span>

        <span
          dir="ltr"
          className="mt-2 block text-[17px] font-black text-white"
        >
          $3.50
        </span>
      </div>

      <div className="rounded-[14px] border border-white/20 bg-white/10 px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[9px] font-black text-brand-100">
          إغلاق الصفقة
        </span>

        <span
          dir="ltr"
          className="mt-2 block text-[17px] font-black text-white"
        >
          $3.50
        </span>
      </div>
    </div>

    {/* TOTAL */}
    <div className="mt-3 rounded-[15px] border border-white/25 bg-white/15 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-black text-brand-100">
            الإجمالي
          </span>

          <span className="mt-1 block text-[12px] font-black text-white">
            لكل لوت كامل
          </span>
        </div>

        <span
          dir="ltr"
          className="text-[29px] font-black leading-none text-white"
        >
          $7
        </span>
      </div>
    </div>

    {/* FOOTNOTE */}
    <div className="mt-4 rounded-[14px] border border-white/15 bg-white/[0.08] px-4 py-3">
      <span className="text-[9px] font-black text-brand-100">
        لماذا نعرض الإجمالي؟
      </span>

      <p className="mt-1.5 text-[9.5px] font-semibold leading-5 text-brand-100">
        حتى تتم مقارنة الحسابات دون الخلط بين عمولة جهة واحدة وعمولة
        فتح الصفقة وإغلاقها معًا.
      </p>
    </div>
  </div>
</aside>
    </div>
  </section>
</div>

    {/* =====================================================
    1. HOW TO CHOOSE — FINAL RESPONSIVE
====================================================== */}
<section className="pt-6 sm:pt-9">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[230px] w-[230px] rounded-full bg-brand-100/70 blur-[90px]"
      />

      <div className="relative">
        <span className="text-[9px] font-black text-brand-600 sm:text-[10px]">
          دليل عملي
        </span>

        <h2 className="mt-2 text-right text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
          كيف تختار شركة فوركس
          <span className="block text-brand-600 sm:inline">
            {" "}
            للسكالبينج؟
          </span>
        </h2>

        <p className="mt-3 max-w-[980px] text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[13px] sm:leading-7">
          اتبع هذه الخطوات قبل فتح الحساب، ولا تعتمد على السبريد المعلن
          أو اسم الشركة وحده.
        </p>
      </div>
    </div>

    {/* MOBILE */}
    <div className="divide-y divide-slate-200 sm:hidden">
      {[
        {
          title: "احسب التكلفة الإجمالية",
          desc: "أضف السبريد والعمولة وتكلفة فتح الصفقة وإغلاقها.",
        },
        {
          title: "تحقق من سياسة السكالبينج",
          desc: "تأكد من عدم وجود مدة دنيا للصفقة أو قيود على HFT.",
        },
        {
          title: "اختر المنصة المناسبة",
          desc: "MetaTrader للـEA وcTrader لعمق السوق والتنفيذ.",
        },
        {
          title: "راقب الانزلاق",
          desc: "اختبر التنفيذ بحجم صغير في ظروف سيولة عادية.",
        },
        {
          title: "راجع الكيان القانوني",
          desc: "قد تختلف التراخيص والحماية والرافعة حسب الكيان.",
        },
        {
          title: "ابدأ بحجم منخفض",
          desc: "اختبر الحساب الحقيقي قبل زيادة عدد الصفقات.",
        },
      ].map((item, index) => (
        <article
          key={item.title}
          className="px-4 py-4"
        >
          {/* الرقم والعنوان في سطر واحد */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
              {index + 1}
            </span>

            <h3 className="min-w-0 text-[13px] font-black leading-6 text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="mr-11 mt-1 text-[9.5px] font-semibold leading-5 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>

    {/* DESKTOP */}
    <div className="hidden gap-3 p-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "احسب التكلفة الإجمالية",
          desc: "لا تقارن السبريد وحده؛ أضف عمولة الفتح والإغلاق والانزلاق.",
        },
        {
          title: "تحقق من سياسة السكالبينج",
          desc: "تأكد من عدم وجود مدة دنيا للصفقة أو قيود على HFT.",
        },
        {
          title: "اختر المنصة المناسبة",
          desc: "MetaTrader للروبوتات وcTrader لعمق السوق والتنفيذ.",
        },
        {
          title: "راقب الانزلاق",
          desc: "اختبر جودة التنفيذ بحجم صغير وفي ظروف سيولة طبيعية.",
        },
        {
          title: "راجع الكيان القانوني",
          desc: "قد تختلف الحماية والرافعة وشروط الحساب حسب الكيان.",
        },
        {
          title: "ابدأ بحجم منخفض",
          desc: "اختبر الحساب الحقيقي قبل زيادة عدد الصفقات أو حجمها.",
        },
      ].map((item, index) => (
        <article
          key={item.title}
          className="group rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)] p-4 transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
              {index + 1}
            </span>

            <h3 className="text-[13px] font-black text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="mr-11 mt-1.5 text-[10px] font-semibold leading-5 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>

{/* =====================================================
    3. FAQ — 5 MOBILE / 10 DESKTOP
====================================================== */}
<section className="pt-6 sm:pt-9">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-28 h-[220px] w-[220px] rounded-full bg-brand-100/60 blur-[90px]"
      />

      <div className="relative">
        <span className="text-[9px] font-black text-brand-600 sm:text-[10px]">
          الأسئلة الشائعة
        </span>

        <h2 className="mt-2 text-right text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
          أسئلة حول شركات
          <span className="block text-brand-600 sm:inline">
            {" "}
            السكالبينج
          </span>
        </h2>

        <p className="mt-3 text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[12px]">
          إجابات مختصرة عن الحسابات والتكاليف والمنصات وسياسة التداول.
        </p>
      </div>
    </div>

    {/* MOBILE — أهم 5 فقط */}
    <div className="divide-y divide-slate-200 p-3 sm:hidden">
      {faqs.slice(0, 5).map((item) => (
        <details
          key={item.question}
          className="group border-b border-slate-200 last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-[12px] font-black leading-6 text-slate-950">
            <span className="min-w-0">
              {item.question}
            </span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[13px] font-black text-brand-600 transition group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
              +
            </span>
          </summary>

          <p className="pb-4 text-[10px] font-semibold leading-6 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}

      <div className="pt-3">
        <p className="rounded-[14px] bg-brand-50 px-3 py-2.5 text-center text-[9px] font-bold text-brand-700 ring-1 ring-brand-100">
          تظهر أهم 5 أسئلة على الموبايل لتقليل طول الصفحة.
        </p>
      </div>
    </div>

    {/* TABLET + DESKTOP — كل 10 */}
    <div className="hidden gap-2.5 p-5 sm:grid lg:grid-cols-2">
      {faqs.map((item) => (
        <details
          key={item.question}
          className="group rounded-[16px] border border-slate-200 bg-[#fbfdff] p-4 open:border-brand-100 open:bg-brand-50/30"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[13px] font-black leading-6 text-slate-950">
            <span>{item.question}</span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[13px] font-black text-brand-600 transition group-open:rotate-45 group-open:border-brand-100 group-open:bg-brand-600 group-open:text-white">
              +
            </span>
          </summary>

          <p className="mt-3 border-t border-slate-200 pt-3 text-[11px] font-semibold leading-6 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>

{/* =====================================================
    FINAL SUMMARY + CTA — COMPACT RESPONSIVE
====================================================== */}
<section className="pb-1 pt-4 sm:pb-2 sm:pt-6">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* =================================================
        SUMMARY HEADER
    ================================================== */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_62%,#edf5ff_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[230px] w-[230px] rounded-full bg-brand-100/70 blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-[210px] w-[210px] rounded-full bg-brand-50 blur-[85px]"
      />

      <div className="relative">
        {/* MOBILE */}
        <div className="sm:hidden">
          <span className="inline-flex min-h-[28px] items-center rounded-full border border-brand-100 bg-white px-3 text-[11px] font-black text-brand-600 shadow-sm">
            الخلاصة
          </span>

          <h2 className="mt-3 text-right text-[26px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950">
            اختر الوسيط المناسب
            <span className="block text-brand-600">
              لطريقة تداولك
            </span>
          </h2>

          <p className="mt-3 text-[13px] font-semibold leading-7 text-slate-700">
            أفضل شركة ليست صاحبة أقل سبريد فقط؛ بل الشركة التي تجمع بين
            سرعة التنفيذ، ووضوح الرسوم، وسياسة سكالبينج مناسبة.
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <span className="inline-flex min-h-[30px] items-center rounded-full border border-brand-100 bg-white px-4 text-[12px] font-black text-brand-600 shadow-sm">
              الخلاصة
            </span>

            <h2 className="mt-3 text-[34px] font-black leading-[1.14] tracking-[-0.035em] text-slate-950 lg:text-[39px]">
              اختر الوسيط المناسب لطريقة تداولك
            </h2>

            <p className="mt-3 max-w-[900px] text-[15px] font-semibold leading-8 text-slate-700">
              أفضل شركة ليست صاحبة أقل سبريد فقط؛ بل الشركة التي تقدم
              تنفيذًا سريعًا، ورسومًا واضحة، ومنصة مستقرة، وشروطًا مناسبة
              لطريقة تداولك.
            </p>
          </div>

          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-brand-600 text-[25px] font-black text-white shadow-[0_10px_24px_rgba(30,91,184,0.18)]">
            ✓
          </span>
        </div>
      </div>
    </div>

    {/* =================================================
        KEY POINTS
    ================================================== */}

    {/* MOBILE — COMPACT ROWS */}
    <div className="divide-y divide-slate-200 sm:hidden">
      {[
        {
          number: "1",
          title: "التنفيذ أهم من السبريد",
          desc: "التنفيذ البطيء قد يكلف أكثر من فرق سبريد بسيط.",
        },
        {
          number: "2",
          title: "راجع نوع الحساب",
          desc: "قارن بين Raw وStandard حسب عدد صفقاتك.",
        },
        {
          number: "3",
          title: "راجع الترخيص",
          desc: "تحقق من الكيان الرقابي قبل فتح الحساب.",
        },
      ].map((item) => (
        <article
          key={item.number}
          className="px-4 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[12px] font-black text-brand-700 ring-1 ring-brand-100">
              {item.number}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="mr-12 mt-1 text-[12px] font-semibold leading-6 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>

    {/* DESKTOP — THREE COLUMNS */}
    <div className="hidden gap-3 p-5 sm:grid sm:grid-cols-3 sm:p-6">
      {[
        {
          number: "1",
          title: "التنفيذ أهم من السبريد",
          desc: "التنفيذ البطيء والانزلاق قد يكلفان أكثر من فرق سبريد بسيط.",
        },
        {
          number: "2",
          title: "راجع الحساب المناسب",
          desc: "قارن بين Raw وStandard وفق عدد الصفقات وحجم التداول.",
        },
        {
          number: "3",
          title: "الترخيص أولًا",
          desc: "تأكد من الكيان الرقابي وشروط حماية العميل قبل الإيداع.",
        },
      ].map((item) => (
        <article
          key={item.number}
          className="group rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)] p-4 transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[12px] font-black text-brand-700 ring-1 ring-brand-100">
              {item.number}
            </span>

            <h3 className="text-[16px] font-black text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="mr-12 mt-2 text-[13px] font-semibold leading-7 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>

    {/* =================================================
        CTA
    ================================================== */}
    <div className="border-t border-slate-200 bg-slate-50/80 px-4 py-5 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-right">
          <h3 className="text-[19px] font-black text-slate-950 sm:text-[22px]">
            جاهز لمقارنة الشركات؟
          </h3>

          <p className="mt-1 text-[12px] font-semibold leading-6 text-slate-600 sm:text-[13px]">
            راجع التقييم الكامل واختر الحساب الأقرب لطريقة تداولك.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:shrink-0">
          <Link
            href="/brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-500 px-4 text-[12px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.16)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:min-w-[175px] sm:px-6 sm:text-[13px]"
          >
            تصفح الوسطاء
          </Link>

          <Link
            href="/compare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-[12px] font-black text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 sm:min-w-[160px] sm:px-6 sm:text-[13px]"
          >
            مقارنة الوسطاء
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
    </main>
  );
}