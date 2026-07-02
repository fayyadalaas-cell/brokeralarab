import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Building2,
  ChevronDown,
  Clock3,
  DollarSign,
  Factory,
  Flame,
  Fuel,
  LineChart,
  Percent,
  PieChart,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "المؤشرات الاقتصادية وتأثيرها على التداول | بروكر العرب",
  description:
    "دليل شامل لأهم المؤشرات الاقتصادية التي تحرك الأسواق مثل قرار الفائدة، التضخم، الوظائف، البطالة، GDP، PMI، مبيعات التجزئة، مخزون النفط واجتماعات البنوك المركزية.",
  alternates: {
    canonical: "https://brokeralarab.com/learn-trading/economic-indicators",
  },
};

const indicators = [
  {
    id: "interest-rate",
    title: "قرار الفائدة",
    short: "أقوى حدث اقتصادي تتابعه الأسواق",
    icon: Percent,
    level: "تأثير مرتفع جدًا",
    frequency: "حسب اجتماعات البنك المركزي",
    markets: "الدولار، الذهب، الأسهم، السندات",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
   content: `
قرار الفائدة هو واحد من أهم الأحداث الاقتصادية التي تراقبها الأسواق المالية، لأنه يحدد تكلفة الاقتراض والعائد على العملة. عندما يرفع البنك المركزي الفائدة، يصبح الاحتفاظ بالعملة أكثر جاذبية لأن العائد عليها يرتفع، وقد يؤدي ذلك إلى دعم العملة أمام العملات الأخرى. أما عندما يتم خفض الفائدة، فقد يقل العائد على العملة، وقد تنتقل السيولة إلى أصول أخرى مثل الأسهم أو الذهب.

لكن تأثير قرار الفائدة لا يعتمد على القرار نفسه فقط، بل يعتمد على الفرق بين ما حدث وما كان يتوقعه السوق. إذا كان السوق يتوقع تثبيت الفائدة ثم قام البنك المركزي برفعها، فقد تكون الحركة قوية جدًا. أما إذا كان السوق يتوقع رفعًا كبيرًا وجاء القرار أقل من المتوقع، فقد تكون ردة الفعل عكسية حتى لو تم رفع الفائدة بالفعل.

المتداول المحترف لا يقرأ الرقم وحده. الأهم من القرار هو البيان المصاحب، ونبرة البنك المركزي، وتصريحات رئيس البنك بعد الاجتماع. أحيانًا يتم تثبيت الفائدة، لكن البيان يكون متشددًا ويشير إلى احتمال رفع الفائدة لاحقًا، فيتحرك الدولار صعودًا. وأحيانًا يتم رفع الفائدة، لكن البنك يلمح إلى أن دورة الرفع اقتربت من نهايتها، فيضعف الدولار.

بالنسبة للذهب، العلاقة مع الفائدة مهمة جدًا. عندما ترتفع الفائدة والعوائد، يصبح الذهب أقل جاذبية لأنه لا يقدم عائدًا ثابتًا. لذلك غالبًا ما يتعرض الذهب للضغط عند ارتفاع توقعات الفائدة. لكن هذه العلاقة ليست ثابتة دائمًا، لأن الذهب قد يرتفع في أوقات الخوف أو الأزمات حتى لو كانت الفائدة مرتفعة.

أما الأسهم فتتأثر من زاوية مختلفة. ارتفاع الفائدة يعني أن الشركات قد تدفع تكلفة أعلى على القروض، وقد يقل إنفاق المستهلكين، وهذا قد يضغط على أرباح الشركات. لذلك تميل الأسهم أحيانًا إلى الهبوط عندما يتوقع السوق سياسة نقدية مشددة لفترة طويلة.

قبل التداول على قرار الفائدة، يجب أن يسأل المتداول نفسه: ماذا كان يتوقع السوق؟ هل القرار مفاجئ؟ هل البيان متشدد أم تيسيري؟ وهل المؤتمر الصحفي يدعم نفس الرسالة أم يغيرها؟ هذه الأسئلة أهم من الرقم نفسه.

الخطأ الشائع هو الدخول في صفقة بمجرد صدور القرار. في أول دقائق بعد الخبر قد تكون الحركة عنيفة وغير مستقرة، وقد يحدث اتساع في السبريد أو انعكاس سريع. لذلك يفضل كثير من المتداولين انتظار وضوح الاتجاه بدل الدخول أثناء الفوضى الأولى.
`,
  },
  {
    id: "cpi",
    title: "التضخم CPI",
    short: "المؤشر الأشهر لقياس ارتفاع الأسعار",
    icon: TrendingUp,
    level: "تأثير مرتفع جدًا",
    frequency: "شهريًا غالبًا",
    markets: "الدولار، الذهب، الأسهم، الفائدة",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
   content: `
مؤشر أسعار المستهلكين CPI هو المؤشر الأشهر لقياس التضخم، لأنه يتابع تغير أسعار السلع والخدمات التي يشتريها المستهلكون بشكل مباشر. عندما ترتفع الأسعار بسرعة، يشعر البنك المركزي أن القوة الشرائية تتراجع، وقد يضطر إلى رفع الفائدة أو الإبقاء عليها مرتفعة لفترة أطول حتى يخفف الضغط على الأسعار.

يهتم المتداولون عادة بنوعين من التضخم: التضخم العام والتضخم الأساسي. التضخم العام يشمل الغذاء والطاقة وكل السلع والخدمات، بينما التضخم الأساسي يستثني الغذاء والطاقة لأنها أكثر تقلبًا. لذلك في كثير من الأحيان يكون التضخم الأساسي أهم من الرقم العام، لأنه يعطي صورة أوضح عن الاتجاه الحقيقي للأسعار.

إذا جاءت قراءة CPI أعلى من المتوقع، فقد يدعم ذلك الدولار لأن السوق يبدأ بتوقع سياسة نقدية أكثر تشددًا. في هذه الحالة قد ترتفع عوائد السندات، وقد يتراجع الذهب والأسهم بسبب الخوف من استمرار الفائدة المرتفعة. أما إذا جاءت القراءة أقل من المتوقع، فقد يضعف الدولار وترتفع الأصول عالية المخاطر لأن السوق يبدأ بتوقع خفض الفائدة أو تخفيف السياسة النقدية.

لكن قراءة التضخم لا يجب أن تتم بمعزل عن باقي البيانات. قراءة واحدة مرتفعة لا تعني أن التضخم عاد للارتفاع بشكل دائم، وقراءة واحدة منخفضة لا تعني أن المشكلة انتهت. الأهم هو الاتجاه خلال عدة أشهر، وهل التضخم يقترب من هدف البنك المركزي أم يبتعد عنه.

بالنسبة للذهب، التضخم له تأثير مزدوج. من جهة، التضخم المرتفع قد يدعم الذهب كأصل يحافظ على القيمة. لكن من جهة أخرى، إذا أدى التضخم إلى رفع الفائدة والعوائد، فقد يضغط ذلك على الذهب. لذلك يتحرك الذهب حسب ما يركز عليه السوق: هل يركز على التضخم نفسه أم على رد فعل البنك المركزي؟

أما الأسهم فقد تتأثر سلبًا إذا جاء التضخم قويًا، لأن ذلك يعني أن تكلفة التمويل قد تبقى مرتفعة وأن هوامش أرباح الشركات قد تتعرض للضغط. لكن إذا جاء التضخم منخفضًا بدون ضعف كبير في الاقتصاد، فقد يكون ذلك إيجابيًا للأسهم.

قبل التداول على CPI، لا تنظر إلى الرقم الفعلي فقط. قارن الرقم بالتوقعات، ثم راقب التضخم الأساسي، ثم تابع حركة الدولار وعوائد السندات. إذا تحركت العوائد بقوة بعد الخبر، فهذا يعني أن السوق أخذ القراءة بجدية.
`,
  },
  {
    id: "ppi",
    title: "التضخم PPI",
    short: "يقيس ضغوط الأسعار من جهة المنتجين",
    icon: Factory,
    level: "تأثير متوسط إلى مرتفع",
    frequency: "شهريًا غالبًا",
    markets: "الدولار، الأسهم، السلع، التضخم",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
   content: `
مؤشر أسعار المنتجين PPI يقيس التغير في الأسعار من جهة الشركات والمنتجين قبل أن تصل السلع والخدمات إلى المستهلك النهائي. لذلك يعتبره بعض المتداولين مؤشرًا مبكرًا لاحتمالات تغير التضخم لاحقًا. إذا ارتفعت تكاليف الإنتاج، قد تقوم الشركات بتمرير هذه التكاليف إلى المستهلكين، وهذا قد يظهر لاحقًا في مؤشر CPI.

أهمية PPI تزيد عندما يكون التضخم هو الموضوع الأساسي في الأسواق. في الفترات التي تكون فيها البنوك المركزية قلقة من ارتفاع الأسعار، يصبح أي دليل على استمرار ضغوط الإنتاج مهمًا. قراءة قوية قد تجعل السوق يتوقع أن التضخم لن ينخفض بسرعة، وبالتالي قد تبقى الفائدة مرتفعة لفترة أطول.

تأثير PPI عادة أقل من CPI، لأن السوق يهتم أكثر بما يدفعه المستهلك النهائي. مع ذلك، إذا جاءت القراءة بعيدة جدًا عن التوقعات، فقد تتحرك الأسواق بقوة. القراءة الأعلى من المتوقع قد تدعم الدولار وتضغط على الأسهم، بينما القراءة الأقل من المتوقع قد تخفف مخاوف التضخم.

بالنسبة للشركات، ارتفاع أسعار المنتجين قد يعني ضغطًا على هوامش الربح. إذا لم تستطع الشركة رفع الأسعار على المستهلك، فإن أرباحها قد تتراجع. لهذا السبب قد تتأثر الأسهم سلبًا عندما ترتفع تكاليف الإنتاج بشكل واضح.

المتداول الذكي لا يقرأ PPI وحده، بل يربطه بأسعار الطاقة، الأجور، سلاسل التوريد، وقراءات CPI اللاحقة. إذا بدأت عدة مؤشرات تعطي نفس الرسالة، تصبح الإشارة أقوى وأكثر أهمية للسوق.

أفضل طريقة لاستخدام هذا المؤشر هي اعتباره إنذارًا مبكرًا، وليس قرارًا نهائيًا. إذا ارتفع PPI لعدة أشهر ثم تبعه ارتفاع في CPI، تصبح الصورة التضخمية أقوى. أما إذا ارتفع PPI مرة واحدة فقط ثم تراجع، فقد يكون التأثير محدودًا.
`,
  },
  {
    id: "nfp",
    title: "الوظائف الأمريكية NFP",
    short: "من أقوى الأخبار المحركة للدولار والذهب",
    icon: Users,
    level: "تأثير مرتفع جدًا",
    frequency: "شهريًا غالبًا",
    markets: "الدولار، الذهب، الفوركس، الأسهم",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
   content: `
تقرير الوظائف الأمريكية NFP من أشهر الأخبار الاقتصادية في العالم، لأنه يعطي صورة مهمة عن قوة سوق العمل الأمريكي. التقرير لا يقتصر على عدد الوظائف الجديدة في القطاع غير الزراعي، بل يشمل أيضًا معدل البطالة ومتوسط الأجور. لذلك لا يكفي النظر إلى الرقم الرئيسي فقط، لأن التفاصيل قد تغير تفسير السوق بالكامل.

إذا جاءت الوظائف قوية، فقد يرى السوق أن الاقتصاد الأمريكي لا يزال قادرًا على النمو، وهذا قد يدعم الدولار. لكن إذا جاءت الوظائف قوية جدًا مع ارتفاع الأجور، فقد يزيد القلق من استمرار التضخم، لأن ارتفاع الأجور قد يدفع الشركات إلى رفع الأسعار. في هذه الحالة قد ترتفع توقعات بقاء الفائدة مرتفعة.

أما إذا جاءت الوظائف ضعيفة، فقد يفسر السوق ذلك على أنه بداية تباطؤ اقتصادي. هذا قد يضغط على الدولار إذا توقع المستثمرون أن الفيدرالي سيخفض الفائدة لدعم الاقتصاد. لكن إذا كان التضخم لا يزال مرتفعًا، فقد تصبح الصورة أكثر تعقيدًا، لأن البنك المركزي قد لا يستطيع خفض الفائدة بسرعة.

وقت صدور NFP تكون الحركة غالبًا حادة، خصوصًا على الذهب وأزواج الدولار. قد يتحرك السعر بسرعة في أول ثوانٍ، ثم ينعكس بعد أن يقرأ السوق تفاصيل التقرير. لذلك يعتبر التداول وقت الخبر مخاطرة عالية، خاصة للمتداول المبتدئ.

الأفضل أن يراقب المتداول ثلاثة أرقام معًا: عدد الوظائف، معدل البطالة، ومتوسط الأجور. إذا كانت الثلاثة تدعم نفس الاتجاه، تكون الرسالة أوضح. أما إذا كانت مختلطة، فقد تصبح حركة السوق متذبذبة وغير مستقرة.

مثال ذلك: إذا جاءت الوظائف أعلى من المتوقع، لكن معدل البطالة ارتفع والأجور تباطأت، فقد لا يكون التقرير قويًا كما يبدو من الرقم الرئيسي. أما إذا جاءت الوظائف قوية، والبطالة منخفضة، والأجور مرتفعة، فهذه إشارة قوية إلى سوق عمل متماسك وقد تدعم الدولار.
`,
  },
  {
    id: "unemployment",
    title: "معدل البطالة",
    short: "مؤشر مهم لفهم قوة سوق العمل",
    icon: PieChart,
    level: "تأثير مرتفع",
    frequency: "شهريًا غالبًا",
    markets: "الدولار، الفائدة، الأسهم",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
   content: `
معدل البطالة يقيس نسبة الأشخاص القادرين على العمل والباحثين عنه ولكنهم لا يجدون وظيفة. انخفاض البطالة غالبًا يعكس قوة سوق العمل، بينما ارتفاعها قد يشير إلى تباطؤ اقتصادي أو ضعف في قدرة الشركات على التوظيف.

لكن انخفاض البطالة ليس دائمًا إيجابيًا للأسواق. إذا كان سوق العمل قويًا جدًا، فقد يؤدي ذلك إلى ارتفاع الأجور، وهذا قد يزيد ضغوط التضخم. عندما ترتفع الأجور بسرعة، قد تضطر الشركات إلى رفع أسعارها للحفاظ على أرباحها، وهذا قد يجعل البنك المركزي أكثر حذرًا في خفض الفائدة.

أما ارتفاع البطالة فقد يدفع الأسواق إلى توقع سياسة نقدية أكثر تيسيرًا، خصوصًا إذا كان التضخم يتراجع في نفس الوقت. في هذه الحالة قد يضعف الدولار لأن المستثمرين يتوقعون خفض الفائدة. لكن إذا ارتفعت البطالة مع بقاء التضخم مرتفعًا، فقد تصبح الصورة صعبة لأن الاقتصاد يضعف بينما الأسعار ما زالت مرتفعة.

المتداول لا يجب أن يقرأ معدل البطالة وحده. يجب مقارنته بعدد الوظائف الجديدة، متوسط الأجور، ومعدل المشاركة في سوق العمل. أحيانًا ينخفض معدل البطالة ليس لأن الاقتصاد خلق وظائف قوية، بل لأن بعض الأشخاص توقفوا عن البحث عن عمل وخرجوا من سوق العمل.

لذلك يعتبر معدل البطالة جزءًا من لوحة أكبر. عندما تأتي البطالة منخفضة، والوظائف قوية، والأجور ترتفع، فهذه رسالة عن قوة سوق العمل. أما إذا كانت الأرقام مختلطة، فقد يكون تأثير الخبر أضعف أو أكثر تذبذبًا.

بالنسبة للمتداول، أفضل استخدام لمعدل البطالة هو فهم اتجاه الاقتصاد وليس الدخول في صفقة بناءً عليه وحده. إذا ارتفعت البطالة لعدة أشهر متتالية، فهذا قد يشير إلى تباطؤ حقيقي. أما تغير بسيط في شهر واحد فقد لا يكون كافيًا لتغيير الصورة العامة.
`,
  },
  {
    id: "gdp",
    title: "الناتج المحلي GDP",
    short: "الصورة العامة لقوة الاقتصاد",
    icon: BarChart3,
    level: "تأثير مرتفع",
    frequency: "ربع سنوي غالبًا",
    markets: "العملات، الأسهم، النفط، السندات",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    content: `
الناتج المحلي الإجمالي GDP يقيس القيمة الإجمالية للسلع والخدمات التي ينتجها الاقتصاد خلال فترة معينة. لذلك يعتبر من أهم المؤشرات التي تعطي صورة واسعة عن حالة الاقتصاد، وهل هو في حالة توسع أو تباطؤ أو ركود.

إذا جاء النمو أعلى من المتوقع، فقد يدعم ذلك العملة لأن الاقتصاد القوي يجذب المستثمرين ويزيد الثقة. كما قد تستفيد الأسهم من النمو إذا كان يعني زيادة أرباح الشركات. لكن التأثير لا يكون دائمًا إيجابيًا، لأن النمو القوي في وقت تضخم مرتفع قد يدفع البنك المركزي إلى إبقاء الفائدة مرتفعة.

أما إذا جاء GDP ضعيفًا، فقد يزيد القلق من تباطؤ الاقتصاد. في هذه الحالة قد تتراجع العملة إذا توقع السوق خفض الفائدة، وقد تتأثر الأسهم إذا زادت مخاوف انخفاض أرباح الشركات. النفط أيضًا قد يتأثر، لأن الاقتصاد الضعيف قد يعني طلبًا أقل على الطاقة.

قراءة GDP مهمة، لكنها ليست دائمًا الأسرع تأثيرًا، لأنها تصدر بعد فترة من حدوث النشاط الاقتصادي. لذلك يستخدمها المتداولون مع مؤشرات أسرع مثل PMI، مبيعات التجزئة، الوظائف، والتضخم. هذه المؤشرات تساعد على فهم اتجاه الاقتصاد قبل صدور بيانات النمو الرسمية.

عند قراءة GDP، اسأل: هل النمو قوي بسبب طلب حقيقي؟ هل التضخم مرتفع؟ هل سوق العمل يدعم هذه القراءة؟ وهل البنك المركزي سيرى النمو كشيء إيجابي أم كسبب لتأخير خفض الفائدة؟

المهم أيضًا هو مقارنة النمو الحالي بالقراءات السابقة. نمو قوي بعد فترة ضعف قد يدعم الثقة، بينما تباطؤ واضح بعد سلسلة من القراءات القوية قد يغير توقعات السوق. لذلك لا تقرأ الرقم بمعزل عن الاتجاه العام.
`,
  },
  {
    id: "pmi",
    title: "مؤشر PMI",
    short: "مؤشر مبكر لاتجاه النشاط الاقتصادي",
    icon: Activity,
    level: "تأثير متوسط إلى مرتفع",
    frequency: "شهريًا غالبًا",
    markets: "العملات، الأسهم، السلع",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop",
   content: `
مؤشر مديري المشتريات PMI يقيس نشاط الشركات في قطاعات مثل الصناعة والخدمات. يتم جمع آراء مديري المشتريات حول الطلبات الجديدة، الإنتاج، التوظيف، الأسعار وسلاسل التوريد. لذلك يعتبر PMI من المؤشرات المبكرة التي تعطي لمحة عن اتجاه الاقتصاد قبل صدور بيانات أكبر مثل الناتج المحلي.

القاعدة العامة أن قراءة فوق 50 تعني توسع النشاط الاقتصادي، وقراءة تحت 50 تعني انكماشًا. لكن السوق لا يهتم بالمستوى فقط، بل يهتم أيضًا بالاتجاه. فإذا كان المؤشر فوق 50 لكنه يتراجع شهرًا بعد شهر، فقد تكون هذه إشارة إلى تباطؤ تدريجي.

PMI الصناعي مهم لفهم قطاع الصناعة، بينما PMI الخدمي قد يكون أكثر أهمية في الاقتصادات التي يعتمد معظم نشاطها على الخدمات. في الولايات المتحدة وبريطانيا مثلًا، قطاع الخدمات له وزن كبير، لذلك قد تكون قراءة الخدمات أكثر تأثيرًا من الصناعة في بعض الحالات.

قراءة PMI القوية قد تدعم العملة والأسهم لأنها تشير إلى نشاط اقتصادي صحي. أما القراءة الضعيفة فقد تزيد مخاوف التباطؤ، خصوصًا إذا جاءت مع تراجع في الطلبات الجديدة أو ضعف في التوظيف. كما أن جزء الأسعار داخل PMI قد يعطي إشارات عن التضخم.

بالنسبة للمتداول، PMI مفيد لأنه يصدر مبكرًا ويعطي إنذارًا قبل تغيرات أكبر في الاقتصاد. لكنه لا يكفي وحده، ويجب ربطه بالنمو، التضخم، سوق العمل، وموقف البنك المركزي.

إذا جاءت قراءة PMI ضعيفة في نفس الوقت الذي يتراجع فيه GDP وتضعف الوظائف، تصبح رسالة التباطؤ أقوى. أما إذا كانت قراءة PMI ضعيفة وحدها بينما باقي المؤشرات قوية، فقد يتعامل معها السوق بحذر أقل.
`,
  },
  {
    id: "retail-sales",
    title: "مبيعات التجزئة",
    short: "تقيس قوة إنفاق المستهلك",
    icon: ShoppingCart,
    level: "تأثير متوسط إلى مرتفع",
    frequency: "شهريًا غالبًا",
    markets: "الدولار، الأسهم، النمو",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
   content: `
مبيعات التجزئة تقيس حجم إنفاق المستهلكين على السلع والخدمات. هذا المؤشر مهم لأن الاستهلاك يمثل جزءًا كبيرًا من النشاط الاقتصادي في كثير من الدول، خصوصًا الولايات المتحدة. عندما ينفق المستهلك بقوة، فهذا قد يعني أن الاقتصاد لا يزال قويًا.

إذا جاءت مبيعات التجزئة أعلى من المتوقع، فقد يدعم ذلك الدولار لأنه يعزز توقعات النمو. كما قد تستفيد بعض الأسهم، خاصة شركات التجزئة والاستهلاك. لكن في وقت التضخم المرتفع، قد تكون القراءة القوية سلاحًا ذا حدين، لأنها قد تجعل البنك المركزي أقل استعجالًا لخفض الفائدة.

أما إذا جاءت مبيعات التجزئة ضعيفة، فقد يفسر السوق ذلك على أنه تراجع في ثقة المستهلك أو ضغط من ارتفاع الأسعار والفائدة. في هذه الحالة قد تزداد توقعات التباطؤ الاقتصادي، وقد يضعف الدولار إذا بدأ السوق يتوقع خفض الفائدة.

لكن قراءة مبيعات التجزئة تحتاج إلى تحليل. هل ارتفع الإنفاق لأن الناس يشترون أكثر، أم لأن الأسعار ارتفعت؟ وهل الزيادة جاءت من قطاع واحد فقط مثل السيارات، أم أنها واسعة في عدة قطاعات؟ هذه التفاصيل مهمة لفهم قوة القراءة.

المتداول يقرأ مبيعات التجزئة مع بيانات الأجور، التضخم، وثقة المستهلك. إذا كانت الأجور قوية والإنفاق مستقر والتضخم يتراجع، فقد تكون الصورة إيجابية. أما إذا كان الإنفاق مدعومًا بالديون أو ارتفاع الأسعار، فقد لا تكون القراءة إيجابية كما تبدو.

أهم خطأ هو اعتبار مبيعات التجزئة القوية دائمًا إيجابية. في اقتصاد يعاني من تضخم مرتفع، الإنفاق القوي قد يعني أن الطلب ما زال مرتفعًا، وهذا قد يؤخر خفض الفائدة ويضغط على الأسهم.
`,
  },
  {
    id: "oil-inventories",
    title: "مخزون النفط",
    short: "خبر مهم لمتداولي النفط والطاقة",
    icon: Fuel,
    level: "تأثير مرتفع على النفط",
    frequency: "أسبوعي غالبًا",
    markets: "النفط، الدولار الكندي، أسهم الطاقة",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop",
   content: `
بيانات مخزون النفط الخام تقيس التغير في كمية النفط المخزنة خلال فترة معينة. هذا الخبر مهم لمتداولي النفط لأنه يعطي إشارة عن توازن العرض والطلب. عندما ترتفع المخزونات أكثر من المتوقع، قد يفهم السوق أن المعروض أكبر من الطلب، وهذا قد يضغط على أسعار النفط.

أما عندما تنخفض المخزونات أكثر من المتوقع، فقد يعني ذلك أن الطلب قوي أو أن المعروض أقل، مما قد يدعم أسعار النفط. لكن حركة النفط لا تعتمد على المخزون فقط، لأن السوق يتأثر أيضًا بقرارات أوبك، الإنتاج الأمريكي، التوترات الجيوسياسية، والطلب العالمي.

هذا المؤشر قد يؤثر كذلك على الدولار الكندي لأن الاقتصاد الكندي مرتبط بقطاع الطاقة. كما قد تتحرك أسهم شركات النفط والطاقة بناءً على توقعات الأسعار والطلب. لذلك قد يكون خبر المخزون مهمًا حتى لمن لا يتداول النفط مباشرة.

من المهم أيضًا متابعة تفاصيل التقرير، مثل مخزون البنزين والمشتقات، وليس النفط الخام فقط. أحيانًا يرتفع مخزون الخام لكن ينخفض مخزون البنزين، فتكون ردة فعل السوق مختلطة. كما يجب متابعة اتجاه المخزونات لعدة أسابيع وليس قراءة واحدة فقط.

بالنسبة للمتداول، أفضل استخدام لهذا الخبر يكون ضمن سياق أوسع: ما هو اتجاه النفط العام؟ هل هناك أخبار من أوبك؟ هل الطلب العالمي قوي؟ وهل الدولار يتحرك بقوة؟ هذه العوامل قد تغير معنى قراءة المخزون.

إذا كان النفط في اتجاه صاعد قوي بسبب توترات جيوسياسية، فقد لا يؤدي ارتفاع المخزون إلى هبوط كبير. وإذا كان السوق قلقًا من ركود عالمي، فقد لا يكون انخفاض المخزون كافيًا لدعم النفط طويلًا.
`,
  },
  {
    id: "central-banks",
    title: "البنوك المركزية",
    short: "التوجيه المستقبلي أهم من القرار أحيانًا",
    icon: Building2,
    level: "تأثير مرتفع جدًا",
    frequency: "حسب كل بنك مركزي",
    markets: "العملات، الذهب، الأسهم، السندات",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
   content: `
اجتماعات البنوك المركزية من أهم الأحداث التي تتابعها الأسواق، لأنها لا تقتصر على قرار الفائدة فقط. في كثير من الأحيان يكون الأهم هو البيان الصحفي، التصويت داخل اللجنة، التوقعات الاقتصادية، وتصريحات رئيس البنك المركزي بعد القرار.

البنوك المركزية مثل الفيدرالي الأمريكي، البنك المركزي الأوروبي، بنك إنجلترا، بنك اليابان وبنك كندا تؤثر على العملات والذهب والأسهم والسندات. عندما تكون لهجة البنك متشددة، فهذا يعني أنه قلق من التضخم وقد يبقي الفائدة مرتفعة. وعندما تكون اللهجة تيسيرية، فهذا يعني أن البنك يميل إلى دعم الاقتصاد وقد يخفض الفائدة.

المتداول يحتاج إلى فهم التوجيه المستقبلي. أحيانًا لا يغير البنك الفائدة، لكنه يلمح إلى أن الخفض قريب، فيتحرك السوق بقوة. وأحيانًا يخفض الفائدة فعلًا، لكنه يقول إن الخفض كان لمرة واحدة فقط، فتكون ردة الفعل مختلفة.

قراءة اجتماع البنك المركزي تتطلب متابعة عدة عناصر: القرار، البيان، التصويت، توقعات الأعضاء، والمؤتمر الصحفي. إذا كانت كل هذه العناصر تعطي نفس الرسالة، تكون ردة فعل السوق أوضح. أما إذا كانت مختلطة، فقد تصبح الحركة متذبذبة.

لذلك لا يجب أن يسأل المتداول فقط: هل تم رفع الفائدة أم خفضها؟ بل يجب أن يسأل: ماذا يقول البنك عن المستقبل؟ هل تغيرت نبرته؟ وهل السوق كان يتوقع هذه الرسالة أم لا؟

بالنسبة للذهب، اجتماعات البنوك المركزية مهمة لأنها تؤثر على العوائد والدولار. وبالنسبة للأسهم، فهي مهمة لأنها تحدد تكلفة التمويل وشهية المخاطرة. أما العملات فتتأثر مباشرة بالفارق بين سياسة بنك مركزي وآخر.

أفضل طريقة للتعامل مع هذه الاجتماعات هي قراءة القرار ضمن السياق. قرار تثبيت الفائدة قد يكون إيجابيًا للعملة إذا كان البيان متشددًا، وقد يكون سلبيًا إذا لمح البنك إلى خفض قريب. لذلك التوجيه المستقبلي أحيانًا أهم من القرار نفسه.
`,
  },
];

function SectionHeader({
  badge,
  title,
  desc,
}: {
  badge: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5 sm:px-6">
      <div className="text-center lg:text-right">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
          {badge}
        </span>

<h2 className="mt-4 text-[24px] font-black leading-[1.22] tracking-[-0.015em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          {title}
        </h2>

<p className="mt-3 w-full lg:max-w-[85%] text-right text-[13px] font-semibold leading-8 text-slate-600 sm:text-[15px] sm:leading-8">
  {desc}
</p>
      </div>
    </div>
  );
}

function IndicatorFullSection({
  item,
  index,
}: {
  item: (typeof indicators)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <article
      id={item.id}
      className="group scroll-mt-28 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
    >
      <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
        <div className="relative min-h-[210px] overflow-hidden bg-slate-100 lg:min-h-full">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/35 to-transparent" />

          <div className="absolute bottom-5 right-5 left-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                <Icon className="h-6 w-6" />
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-black text-white backdrop-blur">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>

          </div>
        </div>

        <div className="p-5 sm:p-6">
            <div className="mb-5 border-b border-slate-200 pb-5">
  <div className="flex items-center gap-3">
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
      <Icon className="h-6 w-6" />
    </span>

    <div>
    <h2 className="text-[22px] font-black leading-[1.25] text-[#07111f] sm:text-[26px] lg:text-[30px]">
  {item.title}
</h2>

      <p className="mt-1 text-[14px] font-semibold text-slate-500">
        {item.short}
      </p>
    </div>
  </div>
</div>
      <div className="mb-5 flex flex-wrap gap-2">
  <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[12px] font-black text-brand-600">
    🔥 {item.level}
  </span>

  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-600">
    ⏱ {item.frequency}
  </span>

  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-600">
    📈 {item.markets}
  </span>
</div>

          <div className="relative mt-5">
            <input id={`read-${item.id}`} type="checkbox" className="peer hidden" />

           <div className="
  max-h-[210px]
  overflow-hidden
  text-justify
  text-[14px]
  font-medium
  leading-8
  text-slate-700
  transition-all
  duration-300
  peer-checked:max-h-[2600px]

  sm:max-h-[300px]

  lg:max-h-none
  lg:overflow-visible
  lg:text-[16px]
  lg:font-semibold
  lg:leading-10
">
              {item.content
                .trim()
                .split("\n\n")
                .map((p, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent peer-checked:hidden lg:hidden" />

            <label
              htmlFor={`read-${item.id}`}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-[12px] font-black text-brand-600 shadow-sm transition hover:bg-brand-50 lg:hidden"
            >
              اقرأ المزيد
              <ChevronDown className="h-4 w-4" />
            </label>
          </div>
        </div>
      </div>
    </article>
  );
}

const pageUrl = "https://brokeralarab.com/learn-trading/economic-indicators";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://brokeralarab.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "تعلم التداول",
      item: "https://brokeralarab.com/learn-trading",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "المؤشرات الاقتصادية",
      item: pageUrl,
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "المؤشرات الاقتصادية وتأثيرها على التداول",
  description:
    "دليل شامل لأهم المؤشرات الاقتصادية التي تحرك الأسواق مثل قرار الفائدة، التضخم، الوظائف، البطالة، GDP، PMI، مبيعات التجزئة، مخزون النفط واجتماعات البنوك المركزية.",
  url: pageUrl,
  inLanguage: "ar",
  author: {
    "@type": "Organization",
    name: "Broker Al Arab",
    url: "https://brokeralarab.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Broker Al Arab",
    url: "https://brokeralarab.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": pageUrl,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ما هو أهم مؤشر اقتصادي للمتداول؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "قرار الفائدة، التضخم CPI، وتقرير الوظائف الأمريكية NFP من أكثر المؤشرات تأثيرًا على الدولار والذهب والأسواق العالمية.",
      },
    },
    {
      "@type": "Question",
      name: "هل الأخبار الاقتصادية تعطي إشارة شراء أو بيع؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "لا. الأخبار تساعد على فهم سبب الحركة والسياق العام، لكنها لا تكفي وحدها لاتخاذ قرار تداول.",
      },
    },
    {
      "@type": "Question",
      name: "لماذا يتحرك السوق عكس الخبر أحيانًا؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "لأن السوق يتحرك بناءً على التوقعات. إذا كانت النتيجة جيدة لكنها أقل من توقعات المتداولين، قد تكون ردة الفعل سلبية.",
      },
    },
    {
      "@type": "Question",
      name: "هل التداول وقت الأخبار مناسب للمبتدئين؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "غالبًا لا. وقت الأخبار تكون الحركة سريعة، وقد يتسع السبريد ويحدث انزلاق سعري، لذلك الأفضل للمبتدئ أن يراقب ويتعلم أولًا.",
      },
    },
  ],
};

export default function EconomicIndicatorsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <Script
        id="economic-indicators-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="economic-indicators-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="economic-indicators-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

{/* HERO */}
<section className="border-b border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-8 lg:p-8">
        <div className="text-center lg:text-right">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
            دليل المؤشرات الاقتصادية
          </span>

          <h1 className="mx-auto mt-3 max-w-4xl text-[32px] font-black leading-[1.2] tracking-[-0.015em] text-[#07111f] sm:text-[40px] lg:mx-0 lg:mt-4 lg:max-w-[760px] lg:text-[50px]">
            المؤشرات الاقتصادية
            <span className="mt-1 block text-brand-500">
              وتأثيرها على التداول
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[14px] font-semibold leading-7 text-slate-600 sm:text-[17px] sm:leading-8 lg:mx-0 lg:mt-4 lg:max-w-[760px]">
            افهم كيفية قراءة البيانات الاقتصادية وتوقع تأثيرها على الذهب،
            الدولار، الأسهم والعملات قبل اتخاذ قرارات التداول.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
            {[
              "📈 10 مؤشرات اقتصادية",
              "🧠 تأثير كل خبر",
              "🌍 الدولار والذهب والأسهم",
              "📚 مناسب للمبتدئين",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm sm:text-[12px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.055)] lg:block">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[15px] font-black text-[#07111f]">
              أهم ما ستتعلمه
            </p>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
              مختصر
            </span>
          </div>

          <div className="space-y-3">
            {[
              "كيف تقرأ الخبر الاقتصادي؟",
              "الفرق بين المتوقع والفعلي",
              "تأثير الأخبار على الذهب",
              "متى تتجنب التداول وقت الأخبار؟",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-[13px] font-semibold text-slate-700"
              >
                <span className="text-brand-500">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden border-t border-slate-200 bg-white/75 p-3 sm:block sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
          {indicators.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group min-w-[138px] rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_12px_26px_rgba(15,23,42,0.06)] sm:min-w-0"
              >
                <Icon className="mx-auto mb-1.5 h-5 w-5 text-brand-600 transition group-hover:scale-110" />
                <div className="text-[12px] font-black text-[#07111f]">
                  {item.title}
                </div>
                <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                  {item.level.replace("تأثير ", "")}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>

{/* INTRO */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="فهم الأخبار"
      title="ما هي المؤشرات الاقتصادية؟"
      desc="المؤشرات الاقتصادية هي بيانات وتقارير رسمية تصدرها الحكومات والبنوك المركزية والهيئات الإحصائية، وتستخدم لقياس التضخم، النمو الاقتصادي، التوظيف، الإنفاق الاستهلاكي، والسياسة النقدية. يعتمد عليها المتداولون لفهم اتجاه الأسواق وتوقع حركة العملات، الذهب، الأسهم والسلع قبل اتخاذ قرارات التداول."
    />

    <div className="grid gap-2.5 p-3 sm:p-5 lg:grid-cols-3">
      {[
        {
          icon: Clock3,
          title: "متى تصدر؟",
         desc: "تصدر بعض المؤشرات شهريًا مثل التضخم والوظائف، بينما تصدر مؤشرات أخرى ربع سنويًا مثل الناتج المحلي، أما قرارات الفائدة فتكون حسب جدول اجتماعات البنوك المركزية."
        },
        {
          icon: Flame,
          title: "لماذا تحرك السوق؟",
          desc: "الأسواق لا تتحرك بسبب الخبر نفسه، بل بسبب الفرق بين توقعات المحللين والنتيجة الفعلية، إضافة إلى توقعات السياسة النقدية."
        },
        {
          icon: LineChart,
          title: "كيف تقرأها؟",
          desc: "يجب قراءة كل مؤشر ضمن السياق الاقتصادي العام وربطه بالتضخم، أسعار الفائدة، سوق العمل، النمو الاقتصادي وشهية المخاطرة."
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)] sm:rounded-[22px] sm:p-5"
          >
            <div className="mb-2 flex items-center gap-3 sm:mb-4 sm:block">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-[#bfdbfe] sm:mb-4 sm:h-11 sm:w-11">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>

              <h3 className="text-[16px] font-black text-[#07111f] sm:text-[18px]">
                {item.title}
              </h3>
            </div>

            <p className="text-[12.5px] font-semibold leading-6 text-slate-600 sm:mt-2 sm:text-[13px] sm:leading-7">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* INDICATORS */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="أهم الأخبار"
      title="أهم 10 مؤشرات اقتصادية للمتداول"
      desc="دليل شامل يشرح أهم 10 مؤشرات اقتصادية يعتمد عليها المتداولون والمستثمرون، مثل قرار الفائدة، التضخم CPI وPPI، الوظائف الأمريكية NFP، معدل البطالة، الناتج المحلي GDP، مؤشر PMI، مبيعات التجزئة، مخزون النفط واجتماعات البنوك المركزية، مع شرح تأثير كل مؤشر على الفوركس، الذهب، الأسهم والعملات."
    />

    <div className="space-y-4 p-3 sm:space-y-5 sm:p-5">
      {indicators.map((item, index) => (
        <IndicatorFullSection key={item.id} item={item} index={index} />
      ))}
    </div>
  </div>
</section>

      {/* MARKET IMPACT */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="تأثير الأسواق"
      title="كيف تتحرك الأسواق بعد الأخبار الاقتصادية؟"
      desc="كل سوق يتفاعل بطريقة مختلفة مع الخبر. لذلك لا تنظر إلى النتيجة فقط، بل اسأل: أي أصل مالي سيتأثر أكثر؟"
    />

    <div className="grid gap-2.5 p-3 sm:gap-3 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "الدولار",
          icon: DollarSign,
          desc: "يتأثر بتوقعات الفائدة وقوة الاقتصاد. البيانات القوية قد تدعمه إذا رفعت توقعات التشديد.",
          tags: ["الفائدة", "CPI", "NFP"],
        },
        {
          title: "الذهب",
          icon: TrendingUp,
          desc: "غالبًا يتحرك عكس الدولار والعوائد، لكنه قد يرتفع وقت الخوف حتى لو كانت البيانات قوية.",
          tags: ["الفائدة", "التضخم", "المخاطر"],
        },
        {
          title: "الأسهم",
          icon: BarChart3,
          desc: "تتأثر بتكلفة التمويل وتوقعات أرباح الشركات. الفائدة المرتفعة قد تضغط على السوق.",
          tags: ["GDP", "PMI", "التجزئة"],
        },
        {
          title: "النفط",
          icon: Fuel,
          desc: "يتأثر بالطلب العالمي والمخزونات وقرارات أوبك. بيانات النمو القوية قد تدعم الطاقة.",
          tags: ["المخزون", "GDP", "PMI"],
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:rounded-[22px] sm:p-4"
          >
            <div className="mb-2.5 flex items-center justify-between gap-3 sm:mb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-[#bfdbfe] transition group-hover:bg-brand-500 group-hover:text-white sm:h-10 sm:w-10">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="text-[16px] font-black text-[#07111f] sm:text-[18px]">
                  {item.title}
                </h3>
              </div>

              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500">
                سوق متأثر
              </span>
            </div>

            <p className="text-[12.5px] font-semibold leading-6 text-slate-600 sm:text-[12px]">
              {item.desc}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 transition group-hover:border-brand-100 group-hover:text-brand-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* TRADING RULES */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="دليل الاستخدام"
      title="دليل التداول وقت الأخبار الاقتصادية"
      desc="اقرأ الخبر بهدوء، افهم تأثيره على السوق، ثم اربطه بالتحليل الفني وإدارة المخاطر."
    />

    <div className="grid gap-2.5 p-3 sm:gap-4 sm:p-5 md:grid-cols-3">
      {[
        {
          title: "قبل الخبر",
          desc: "راجع التوقعات والقراءة السابقة وحدد السوق الأكثر تأثرًا.",
          points: ["التوقعات", "السابق", "الأصل المتأثر"],
        },
        {
          title: "وقت الخبر",
          desc: "قارن الفعلي بالمتوقع وراقب الدولار والعوائد.",
          points: ["الفعلي", "الدولار", "العوائد"],
        },
        {
          title: "بعد الخبر",
          desc: "انتظر وضوح الاتجاه ولا تطارد الحركة الأولى.",
          points: ["الاتجاه", "السبريد", "السيولة"],
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:rounded-[24px] sm:p-5"
        >
          <div className="mb-2.5 flex items-center gap-3 sm:mb-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[12px] font-black text-brand-600 ring-1 ring-brand-100 sm:h-10 sm:w-10 sm:text-[14px]">
              {index + 1}
            </span>

            <h3 className="text-[16px] font-black text-[#07111f] sm:text-[19px]">
              {item.title}
            </h3>
          </div>

          <p className="text-[12.5px] font-semibold leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
            {item.desc}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {item.points.map((point) => (
              <span
                key={point}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 transition group-hover:border-brand-100 group-hover:text-brand-600 sm:px-3 sm:text-[11px]"
              >
                ✓ {point}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="mx-3 mb-3 rounded-[20px] border border-brand-200 bg-brand-50 p-3 sm:mx-5 sm:mb-5 sm:rounded-[24px] sm:p-5">
      <h3 className="text-[15px] font-black text-[#07111f] sm:text-[18px]">
        نصيحة من بروكر العرب
      </h3>

      <p className="mt-1.5 text-[12.5px] font-semibold leading-6 text-slate-700 sm:mt-2 sm:text-[13px] sm:leading-7">
        لا تدخل الصفقة لأن الخبر قوي فقط. الأفضل أن تتفق نتيجة الخبر مع
        التحليل الفني وإدارة رأس المال قبل اتخاذ القرار.
      </p>
    </div>
  </div>
</section>

   {/* COMMON MISTAKES */}
<section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="أخطاء شائعة"
      title="أخطاء يقع فيها المتداول عند متابعة الأخبار"
      desc="الهدف من متابعة الأخبار ليس الدخول بسرعة، بل فهم السياق وتجنب القرارات العشوائية."
    />

    <div className="grid gap-2.5 p-3 sm:gap-3 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "الدخول قبل الخبر",
          desc: "بدون خطة واضحة أو معرفة السيناريوهات المحتملة.",
        },
        {
          title: "التركيز على الفعلي فقط",
          desc: "وتجاهل الفرق بين الرقم الفعلي والتوقعات.",
        },
        {
          title: "نسيان السبريد",
          desc: "وقت الأخبار قد يتسع السبريد وتزيد الانزلاقات السعرية.",
        },
        {
          title: "تجاهل السياق العام",
          desc: "مثل اتجاه الفائدة والتضخم ومزاج السوق قبل الخبر.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:rounded-[22px] sm:p-4"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-black text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white sm:h-8 sm:w-8 sm:text-[12px]">
              {index + 1}
            </span>

            <h3 className="text-[15px] font-black text-[#07111f] sm:text-[16px]">
              {item.title}
            </h3>
          </div>

          <p className="text-[12px] font-semibold leading-6 text-slate-600">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* FAQ */}
<section className="mx-auto max-w-7xl px-3 py-3 pb-4 sm:px-6 sm:py-4 sm:pb-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <SectionHeader
            badge="أسئلة شائعة"
            title="أسئلة مهمة حول المؤشرات الاقتصادية"
            desc="إجابات مختصرة تساعدك على فهم الأخبار الاقتصادية وربطها بحركة الأسواق."
          />

          <div className="space-y-3 p-4 sm:p-5">
            {[
              [
                "ما هو أهم مؤشر اقتصادي للمتداول؟",
                "قرار الفائدة، التضخم CPI، وتقرير الوظائف الأمريكية NFP من أكثر المؤشرات تأثيرًا على الدولار والذهب والأسواق العالمية.",
              ],
              [
                "هل الأخبار الاقتصادية تعطي إشارة شراء أو بيع؟",
                "لا. الأخبار تساعد على فهم سبب الحركة والسياق العام، لكنها لا تكفي وحدها لاتخاذ قرار تداول.",
              ],
              [
                "لماذا يتحرك السوق عكس الخبر أحيانًا؟",
                "لأن السوق يتحرك بناءً على التوقعات. إذا كانت النتيجة جيدة لكنها أقل من توقعات المتداولين، قد تكون ردة الفعل سلبية.",
              ],
              [
                "هل التداول وقت الأخبار مناسب للمبتدئين؟",
                "غالبًا لا. وقت الأخبار تكون الحركة سريعة، وقد يتسع السبريد ويحدث انزلاق سعري، لذلك الأفضل للمبتدئ أن يراقب ويتعلم أولًا.",
              ],
              [
                "ما الفرق بين السابق والمتوقع والفعلي؟",
                "السابق هو آخر قراءة، المتوقع هو تقدير المحللين قبل الخبر، والفعلي هو الرقم الذي يصدر رسميًا. قوة الحركة غالبًا تأتي من الفرق بين المتوقع والفعلي.",
              ],
              [
                "هل التأثير يكون دائمًا مباشرًا؟",
                "ليس دائمًا. أحيانًا يتحرك السوق فورًا، وأحيانًا يحتاج دقائق أو ساعات حتى يقرأ التفاصيل مثل الأجور أو التضخم الأساسي أو لهجة البنك المركزي.",
              ],
            ].map(([q, a]) => (
              <details
                key={q}
                className="group rounded-[22px] border border-slate-200 bg-[#fbfdff] p-5 transition open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-[#07111f]">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-brand-500 transition group-open:rotate-180" />
                </summary>

                <p className="mt-3 text-[13px] font-semibold leading-7 text-slate-600">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* RELATED GUIDES */}
<section className="mx-auto max-w-7xl px-3 py-3 pb-6 sm:px-6 sm:py-4 sm:pb-8 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <SectionHeader
      badge="مواضيع ذات صلة"
      title="اكتشف المزيد"
      desc="استكشف المزيد من الأدلة التعليمية التي تساعدك على فهم الأسواق، اختيار شركات التداول المناسبة، واستخدام أدوات إدارة المخاطر."
    />

    <div className="grid gap-3 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "أفضل شركات التداول",
          desc: "تعرف على أفضل شركات التداول المرخصة وقارن بينها.",
          href: "/best-brokers",
        },
        {
          title: "أفضل شركات تداول الذهب",
          desc: "اكتشف أفضل الوسطاء لتداول الذهب والمعادن.",
          href: "/best-brokers/gold",
        },
        {
          title: "أدوات التداول",
          desc: "استخدم حاسبات التداول لإدارة المخاطر ورأس المال.",
          href: "/tools",
        },
        {
          title: "تقييمات الوسطاء",
          desc: "اقرأ مراجعات تفصيلية قبل فتح حساب تداول.",
          href: "/brokers",
        },
      ].map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="group rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
        >
          <h3 className="text-[16px] font-black text-[#07111f] transition group-hover:text-brand-600">
            {item.title}
          </h3>

          <p className="mt-2 text-[12.5px] font-semibold leading-6 text-slate-600">
            {item.desc}
          </p>

          <span className="mt-3 inline-flex text-[12px] font-black text-brand-600">
            اقرأ المزيد ←
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}