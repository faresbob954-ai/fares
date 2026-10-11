import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'subscriber' | 'user';
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageSection {
  id: string;
  key: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  layout: 'grid' | 'carousel' | 'featured' | 'banner';
  itemType: 'products' | 'comparisons' | 'articles' | 'categories' | 'promo';
  itemIds: string[];
  order: number;
  isVisible: boolean;
}

export interface CustomPage {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  showInHeader: boolean;
  showInFooter: boolean;
  navOrder: number;
  language: 'all' | 'en' | 'ar';
  updatedAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // rich markdown / html
  author: string;
  category: string;
  tags: string[];
  language: 'en' | 'ar';
  isPublished: boolean;
  publishedDate: string;
  readTimeMinutes: number;
  featuredImageUrl: string;
  seoTitle?: string;
  seoDescription?: string;
  hasAffiliateLinks: boolean;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  language: 'en' | 'ar';
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
  ip?: string;
}

export interface SubscriptionPlan {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  stripeMonthlyPriceId?: string;
  stripeAnnualPriceId?: string;
  featuresEn: string[];
  featuresAr: string[];
  isPopular?: boolean;
  isActive: boolean;
}

export interface SubscriptionRecord {
  id: string;
  userId: string;
  customerEmail: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  billingInterval: 'month' | 'year';
  currentPeriodEnd: string;
  createdAt: string;
}

export interface AffiliateLinkItem {
  id: string;
  name: string;
  merchant: string;
  targetUrl: string;
  category: string;
  disclosureNoticeEn: string;
  disclosureNoticeAr: string;
  isActive: boolean;
  clicksCount: number;
}

export interface SiteSettings {
  siteName: string;
  taglineEn: string;
  taglineAr: string;
  supportEmail: string;
  defaultLanguage: 'en' | 'ar';
  availableLanguages: string[];
  logoText: string;
  footerNoticeEn: string;
  footerNoticeAr: string;
  affiliateDisclosureEn: string;
  affiliateDisclosureAr: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  stripeMode: 'test' | 'live';
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  details: string;
  ip?: string;
}

export interface DatabaseSchema {
  users: User[];
  homepageSections: HomepageSection[];
  pages: CustomPage[];
  articles: Article[];
  contactMessages: ContactMessage[];
  plans: SubscriptionPlan[];
  subscriptions: SubscriptionRecord[];
  affiliateLinks: AffiliateLinkItem[];
  settings: SiteSettings;
  logs: ActivityLog[];
}

// In-memory state synchronized with filesystem
let memoryDb: DatabaseSchema | null = null;

// Initial 12 original articles (6 EN, 6 AR)
const initialArticles: Article[] = [
  // --- 6 ENGLISH SUBSTANTIVE ARTICLES ---
  {
    id: 'art-en-1',
    slug: 'how-to-choose-a-smartphone-for-your-needs',
    title: 'How to Choose a Smartphone for Your Needs: A Pragmatic 2026 Buying Guide',
    excerpt: 'Cut through marketing hype: understand display sizes, silicon tiers, camera hardware, and real-world battery longevity before buying.',
    content: `## Choosing the Ideal Smartphone Without Overpaying

Modern smartphone flagships regularly exceed $1,200, yet most users only utilize a fraction of their computational headroom. Choosing the right device requires aligning your personal workflow with hardware specifications that actually impact daily life.

### 1. Assess Your Operating Ecosystem
- **iOS (Apple)**: Best for long-term consistency, multi-device continuity (MacBook, iPad, Apple Watch), and standardized application optimization.
- **Android (Samsung, Google, OnePlus)**: Ideal for custom multitasking, universal USB-C peripheral connectivity, diverse form factors, and freedom in application sideloading.

### 2. The Silicon Priority
Do not judge performance merely by CPU core counts. Modern chips like the Apple A18 Pro and Qualcomm Snapdragon 8 Elite excel in sustained thermal efficiency and localized neural processing (NPU). If you do not perform high-framerate 3D gaming or 4K video rendering on-device, mid-tier silicon delivers an indistinguishable social and web browsing experience.

### 3. Display Ergonomics
- **OLED vs AMOLED**: Provides true blacks and energy savings with dark mode.
- **Refresh Rates**: Look for adaptive LTPO displays (1-120Hz), which scale down to 1Hz when reading text to conserve battery.

### 4. Pragmatic Camera Evaluation
Ignore triple-digit megapixel figures. Prioritize physical sensor dimensions (such as 1/1.3-inch or 1-inch types) and optical image stabilization (OIS). A 48MP camera with a large sensor consistently outperforms a budget 108MP sensor in low light.`,
    author: 'Editorial Tech Lab',
    category: 'smartphones',
    tags: ['Smartphones', 'Buying Guide', 'Hardware'],
    language: 'en',
    isPublished: true,
    publishedDate: '2026-03-01',
    readTimeMinutes: 6,
    featuredImageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'How to Choose a Smartphone for Your Needs | 2026 Hardware Guide',
    seoDescription: 'A pragmatic guide to choosing a smartphone: compare silicon efficiency, camera sensor sizes, display tech, and battery life.',
    hasAffiliateLinks: false,
    updatedAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'art-en-2',
    slug: 'smartphone-specifications-explained',
    title: 'Smartphone Specifications Explained: Decoding Megapixels, SoCs, and Nits',
    excerpt: 'Demystifying spec sheets: what peak brightness, LPDDR5X RAM, UFS 4.0 storage, and IP68 ratings truly mean in everyday use.',
    content: `## Decoding Modern Smartphone Spec Sheets

Technical spec sheets can be overwhelming with acronyms. Here is an engineering breakdown of the numbers that genuinely dictate device responsiveness and longevity.

### 1. System on Chip (SoC) & Node Process
The SoC integrates the CPU, GPU, Modem, and NPU onto a single die. The manufacturing process (e.g. 3nm vs 4nm) reflects transistor density. Smaller nodes translate directly into lower thermal dissipation and higher performance per watt.

### 2. RAM Standards: LPDDR5X vs LPDDR5
Memory bandwidth determines how rapidly apps reload from background suspension. LPDDR5X operates up to 8533 Mbps, delivering instant app switching and stutter-free camera processing.

### 3. Storage Technology: UFS 4.0 vs UFS 3.1
Storage speed affects app install times, boot speed, and 4K ProRes capture. UFS 4.0 delivers up to 4200 MB/s sequential read speeds, doubling UFS 3.1 performance.

### 4. Display Brightness: Nits and Candela
Manufacturers advertise "peak brightness" (e.g., 3,000 nits), but this often applies only to a 1% screen window during HDR playback. Look for sustained full-screen outdoor brightness (typically 1,000–1,600 nits) to guarantee legibility under direct sunlight.`,
    author: 'Hardware Engineering Desk',
    category: 'smartphones',
    tags: ['Specifications', 'Processor', 'Display'],
    language: 'en',
    isPublished: true,
    publishedDate: '2026-02-25',
    readTimeMinutes: 7,
    featuredImageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'Smartphone Specifications Explained: Hardware Deep Dive',
    seoDescription: 'Detailed explanation of smartphone specs: SoC, RAM standards, UFS storage, display nits, and IP ratings.',
    hasAffiliateLinks: false,
    updatedAt: '2026-02-25T12:00:00.000Z'
  },
  {
    id: 'art-en-3',
    slug: 'laptop-buying-guide-for-students',
    title: 'Laptop Buying Guide for Students: Balancing Portability, Battery, and Budget',
    excerpt: 'Key considerations for academic computing: keyboard ergonomics, USB-C Power Delivery charging, weight constraints, and software compatibility.',
    content: `## Selecting the Optimal Student Laptop

For university students, a laptop is a four-to-six-year investment. A machine that dies halfway through a three-hour lecture or strains your backpack creates unnecessary friction.

### 1. Battery Life Trumps Raw Horsepower
Look for laptops with tested 12+ hour real-world battery endurance. Apple Silicon (M2/M3/M4) and newer Snapdragon X Elite or Intel Core Ultra laptops easily last a full academic day without carrying a charger brick.

### 2. Weight and Build Quality
Aim for an ultralight chassis weighing between 1.1 kg and 1.4 kg (2.4 to 3.0 lbs). An aluminum unibody or carbon-fiber composite construction prevents chassis flex and keyboard deck damage when compressed in crowded student backpacks.

### 3. RAM Requirements
Do not buy an 8GB RAM laptop in 2026. Modern operating systems and browser tabs with multiple research documents quickly exhaust 8GB, causing memory paging to the SSD. 16GB is the mandatory baseline for comfortable multitasking.

### 4. Display Aspect Ratio: 16:10 vs 16:9
A 16:10 or 3:2 aspect ratio provides significantly more vertical screen space for PDF documents, spreadsheets, and coding environments compared to traditional 16:9 widescreen formats.`,
    author: 'Academic Tech Review',
    category: 'laptops',
    tags: ['Laptops', 'Students', 'Education'],
    language: 'en',
    isPublished: true,
    publishedDate: '2026-02-18',
    readTimeMinutes: 5,
    featuredImageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'Laptop Buying Guide for Students 2026 | Nexora',
    seoDescription: 'Discover the ideal student laptop: battery endurance, keyboard ergonomics, 16GB RAM standards, and lightweight portability.',
    hasAffiliateLinks: false,
    updatedAt: '2026-02-18T14:30:00.000Z'
  },
  {
    id: 'art-en-4',
    slug: 'how-to-compare-battery-life-and-charging',
    title: 'How to Compare Battery Life and Charging: Beyond Raw Milliampere-Hours',
    excerpt: 'Why a 5,000mAh battery does not always outlast a 4,400mAh battery, and how proprietary fast-charging protocols differ from universal USB-PD.',
    content: `## Understanding Battery Chemistry and Power Management

One of the most persistent misconceptions in consumer technology is that battery capacity (measured in mAh) directly correlates with battery longevity. In practice, endurance is an equation governed by hardware efficiency.

### 1. Capacity (mAh) vs Watt-Hours (Wh)
Milliampere-hours measure electrical charge, but Watt-hours (Wh = V × Ah) reflect actual energy content. Because nominal voltages vary across single-cell and dual-cell battery configurations, comparing Watt-hours provides a far more objective baseline.

### 2. Display and Processor Efficiency
The display panel and application processor consume up to 80% of active power. A smartphone with an efficient 3nm processor and an LTPO display running at 1Hz can achieve 12 hours of screen-on time with a 4,500mAh cell, whereas an unoptimized 5,000mAh device might yield only 8 hours.

### 3. Fast Charging Protocols: USB-PD PPS vs Proprietary Systems
- **Universal USB Power Delivery (PD) 3.0 with PPS**: The open industry standard supported by Apple, Google, and Samsung. Adapters are interchangeable.
- **Proprietary High-Wattage Protocols**: 80W–120W systems often rely on non-standard dual-charge pumps and proprietary cables.

### 4. Long-Term Battery Health
Charging at 100W generates internal chemical heat that can accelerate lithium plating and electrolyte degradation. Modern 80% charge limits and overnight trickle charging preserve over 80% health beyond 1,000 cycles.`,
    author: 'Power & Acoustics Lab',
    category: 'smartphones',
    tags: ['Battery', 'Charging', 'Efficiency'],
    language: 'en',
    isPublished: true,
    publishedDate: '2026-02-10',
    readTimeMinutes: 6,
    featuredImageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'How to Compare Battery Life and Charging Accurately',
    seoDescription: 'Learn how to evaluate battery life beyond mAh: Watt-hours, LTPO display savings, thermal degradation, and USB-PD standards.',
    hasAffiliateLinks: false,
    updatedAt: '2026-02-10T09:15:00.000Z'
  },
  {
    id: 'art-en-5',
    slug: 'understanding-smartphone-camera-specifications',
    title: 'Understanding Smartphone Camera Specifications: Optics, Sensors, and Zoom Physics',
    excerpt: 'Learn why lens aperture, sensor dimensions, periscope prisms, and raw computational pipelines dictate image clarity.',
    content: `## The Physics Behind Smartphone Camera Engineering

Smartphone cameras have transformed from basic webcams into computational imaging powerhouses. Understanding their optical mechanics helps you separate genuine imaging prowess from marketing gimmicks.

### 1. Sensor Size is King
The diagonal dimension of the image sensor (e.g., 1/1.3-inch or 1-inch) dictates how much physical light photons are gathered. A larger sensor generates a higher signal-to-noise ratio, superior dynamic range, and authentic optical depth-of-field without software blur artifacts.

### 2. Lens Aperture (f-stop)
The aperture value (e.g., f/1.7 vs f/2.2) measures the ratio of the lens focal length to the entrance pupil diameter. Smaller f-numbers allow more light into the sensor and improve handheld low-light shutter speeds.

### 3. Periscope Telephoto vs Digital Cropping
True optical zoom uses folded periscope prism lenses to magnify light across the device chassis. Digital zoom merely crops into the center pixels of the main sensor, reducing resolving power and introducing computational sharpening halos.

### 4. Sensor-Shift Stabilization vs Standard Lens OIS
Sensor-shift OIS physically moves the camera sensor up to 5,000 times per second to neutralize handshake vibrations, providing noticeably steadier night exposures and fluid video capture compared to older lens-barrel mechanics.`,
    author: 'Optics & Hardware Team',
    category: 'smartphones',
    tags: ['Cameras', 'Optics', 'Photography'],
    language: 'en',
    isPublished: true,
    publishedDate: '2026-01-28',
    readTimeMinutes: 5,
    featuredImageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'Understanding Smartphone Camera Specifications | Optics Explained',
    seoDescription: 'A guide to smartphone camera specs: sensor sizes, lens aperture f-stops, periscope telephoto optics, and stabilization.',
    hasAffiliateLinks: false,
    updatedAt: '2026-01-28T11:00:00.000Z'
  },
  {
    id: 'art-en-6',
    slug: 'how-to-compare-electronics-prices-safely',
    title: 'How to Compare Electronics Prices Safely: Avoiding Counterfeits and Fake Discounts',
    excerpt: 'Practical advice on regional warranties, authorized reseller verification, dynamic pricing algorithms, and return protections.',
    content: `## Safe Price Comparison Strategies for Consumer Tech

Finding the lowest price on an expensive laptop or flagship phone is enticing, but consumer tech markets are riddled with deceptive practices. Here is how to verify deals and protect your investment.

### 1. Beware of Fabricated "Original Prices"
Many online merchants artificially inflate reference MSRPs immediately before promotional holidays to display dramatic "50% Off" badges. Always check historical baseline prices on independent comparison tools like Nexora.

### 2. Verify Authorized Reseller Status
Buying from an unauthorized third-party marketplace seller often invalidates the manufacturer warranty. When purchasing Apple, Samsung, or Dell hardware, verify that the merchant is an authorized regional distributor.

### 3. Check Regional SKU and Cellular Bands
Imported grey-market devices may lack specific 5G cellular bands required by your domestic carrier or include foreign power plugs without safety certifications. Always verify the exact model code (SKU) before ordering.

### 4. Scrutinize Return Policies and Restocking Fees
Legitimate retailers provide at least a 14-to-30 day inspection period with no hidden restocking penalties. Be cautious of vendors that accept returns only for unopened boxes or demand exorbitant return postage fees.`,
    author: 'Consumer Protection Desk',
    category: 'monitors',
    tags: ['Consumer Guide', 'Pricing', 'Safety'],
    language: 'en',
    isPublished: true,
    publishedDate: '2026-01-15',
    readTimeMinutes: 5,
    featuredImageUrl: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'How to Compare Electronics Prices Safely | Consumer Protection',
    seoDescription: 'Safeguard your electronics purchases: avoid fake discounts, verify authorized retailer warranties, and check regional model SKUs.',
    hasAffiliateLinks: false,
    updatedAt: '2026-01-15T08:00:00.000Z'
  },

  // --- 6 ARABIC SUBSTANTIVE ARTICLES ---
  {
    id: 'art-ar-1',
    slug: 'how-to-choose-a-smartphone-for-your-needs-ar',
    title: 'كيف تختار الهاتف الذكي المناسب لاحتياجاتك: دليل عملي لعام 2026',
    excerpt: 'تجاوز الدعاية التسويقية: تعرف على معايير اختيار حجم الشاشة، فئات المعالجات، عتاد الكاميرات، وعمر البطارية الفعلي قبل الشراء.',
    content: `## اختيار الهاتف الذكي الأنسب دون دفع مبالغ غير مبررة

تتجاوز أسعار الهواتف الرائدة الحديثة حاجز 1,200 دولار، ومع ذلك لا يستفيد معظم المستخدمين إلا من جزء يسير من قدراتها العتادية. يعتمد الاختيار الذكي على مواءمة استخدامك اليومي مع المواصفات التي تؤثر فعلياً على تجربتك.

### 1. تحديد النظام البيئي المناسب لك
- **نظام iOS (أبل)**: الخيار الأنسب لمن يبحث عن استقرار طويل الأمد، وتكامل سلس مع أجهزة Mac وiPad وساعة أبل، ودعم تحديثات يمتد لسنوات عديدة.
- **نظام Android (سامسونج، جوجل، ون بلس)**: الخيار المثالي لمحبي تخصيص الواجهة، والإنتاجية متعددة النوافذ، وحرية نقل الملفات واستخدام ملحقات USB-C المتنوعة.

### 2. أولويات المعالج والأداء
لا تحكم على المعالج بمجرد عدد الأنوية؛ فالمعالجات الرائدة مثل Apple A18 Pro وSnapdragon 8 Elite تتميز بالكفاءة الحرارية العالية ومعالجة الذكاء الاصطناعي محلياً. إذا كان استخدامك مقتصراً على التصفح والتطبيقات اليومية، فإن معالجات الفئة المتوسطة العليا تقدم تجربة فائقة السلاسة دون استنزاف ميزانيتك.

### 3. راحة الشاشة وتقنيات العرض
- **شاشات OLED وAMOLED**: تقدم سواداً حقيقياً وتوفيراً كبيراً للطاقة مع الوضع الداكن.
- **معدل التحديث التكيفي (LTPO)**: ابحث عن الشاشات التي تدعم التردد التكيفي من 1 إلى 120 هرتز؛ حيث تنخفض السرعة إلى 1 هرتز أثناء قراءة النصوص لتوفير طاقة البطارية.

### 4. تقييم الكاميرات بذكاء
تجاهل أرقام الميغابكسل الفلكية؛ فركز دائماً على الحجم الفيزيائي للمستشعر والتثبيت البصري OIS. فمستشعر بدقة 48 ميجابكسل بحجم فيزيائي كبير يمنح صوراً ليلية أنقى بكثير من مستشعر تجاري بدقة 108 ميجابكسل بحجم صغير.`,
    author: 'فريق التحرير التقني',
    category: 'smartphones',
    tags: ['الهواتف الذكية', 'دليل الشراء', 'العتاد'],
    language: 'ar',
    isPublished: true,
    publishedDate: '2026-03-01',
    readTimeMinutes: 6,
    featuredImageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'كيف تختار الهاتف الذكي المناسب لاحتياجاتك | دليل نيكسورا (Nexora)',
    seoDescription: 'دليل شامل لاختيار الهاتف الذكي: مقارنة المعالجات، مستشعرات الكاميرا، تقنيات الشاشات، وعمر البطارية الفعلي.',
    hasAffiliateLinks: false,
    updatedAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'art-ar-2',
    slug: 'smartphone-specifications-explained-ar',
    title: 'دليل فهم مواصفات الهواتف الذكية بالتفصيل: فك شفرة المعالجات والشاشات',
    excerpt: 'شرح مبسط للمصطلحات التقنية: سطوع الشاشة بالنيتس، معايير الذاكرة العشوائية LPDDR5X، سرعة التخزين UFS، ومعايير مقاومة الماء IP68.',
    content: `## فك شفرة مواصفات الهواتف الذكية للمستخدم الذكي

تمتلئ جداول المواصفات باختصارات هندسية قد تبدو معقدة. نستعرض هنا الأرقام والمصطلحات التي تحدد استجابة الهاتف ومتانته على المدى الطويل.

### 1. النظام على شريحة (SoC) ودقة التصنيع
المعالج في الهواتف يدمج وحدة المعالجة المركزية ومعالج الرسوميات وشريحة الاتصال ووحدة الذكاء الاصطناعي (NPU). دقة التصنيع (مثل 3 نانومتر أو 4 نانومتر) تشير إلى كثافة الترانزستورات؛ وكلما صغر الرقم قل الانبعاث الحراري وزادت كفاءة استهلاك الطاقة.

### 2. سرعة الذاكرة العشوائية (RAM): معيار LPDDR5X
تحدد سرعة الذاكرة مدى سلاسة إعادة فتح التطبيقات دون إعادة تحميل. يعمل معيار LPDDR5X بسرعات تصل إلى 8533 ميجابت/ثانية، مما يضمن تصويراً فورياً وتشغيلاً سلساً لأثقل الألعاب.

### 3. تقنيات التخزين: UFS 4.0 مقابل UFS 3.1
تحدد سرعة التخزين سرعة تثبيت التطبيقات وتشغيل النظام وتسجيل الفيديو بدقة 4K بدون تقطيع. يقدم معيار UFS 4.0 سرعات قراءة تصل إلى 4200 ميجابايت/ثانية، وهي ضعف سرعة الجيل السابق.

### 4. سطوع الشاشة: الشمعات (Nits)
تعلن الشركات أحياناً عن سطوع أقصى يصل إلى 3000 شمعة، ولكن هذا الرقم ينطبق غالباً على نافذة صغيرة جداً أثناء تشغيل محتوى HDR. ابحث دائماً عن السطوع المستمر للشاشة الكاملة تحت أشعة الشمس (بين 1000 و1600 شمعة) لضمان سهولة القراءة نهاراً.`,
    author: 'قسم الهندسة العتادية',
    category: 'smartphones',
    tags: ['المواصفات', 'المعالجات', 'الشاشات'],
    language: 'ar',
    isPublished: true,
    publishedDate: '2026-02-25',
    readTimeMinutes: 7,
    featuredImageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'دليل فهم مواصفات الهواتف الذكية بالتفصيل | نيكسورا (Nexora)',
    seoDescription: 'شرح مفصل لمواصفات الهواتف: المعالج، الذاكرة العشوائية، التخزين UFS، سطوع الشاشة بالنيتس، ومعايير الحماية.',
    hasAffiliateLinks: false,
    updatedAt: '2026-02-25T12:00:00.000Z'
  },
  {
    id: 'art-ar-3',
    slug: 'laptop-buying-guide-for-students-ar',
    title: 'دليل شراء الحاسوب المحمول للطلاب: الموازنة بين الوزن وعمر البطارية والميزانية',
    excerpt: 'أهم نصائح اختيار لابتوب للدراسة والجامعة: راحة لوحة المفاتيح، الشحن عبر USB-C، حدود الوزن المقبولة، وسعة الذاكرة المناسبة.',
    content: `## اختيار اللابتوب الأمثل للدراسة والجامعة

يمثل الحاسوب المحمول للطالب استثماراً يدوم من 4 إلى 6 سنوات. اختيار جهاز ينفد شحنه في منتصف المحاضرة أو يثقل حقيبة الظهر يسبب إرباكاً يومياً غير ضروري.

### 1. عمر البطارية أهم من قوة المعالجة القصوى
احرص على اختيار أجهزة توفر عملاً فعلياً لا يقل عن 12 ساعة بشحنة واحدة. تتيح حواسيب Apple Silicon ومعالجات Snapdragon X Elite وIntel Core Ultra قضاء يوم دراسي كامل دون الحاجة لحمل شاحن ثقيل.

### 2. الوزن وجودة التصنيع
اختر حاسوباً خفيف الوزن يتراوح وزنه بين 1.1 كجم و1.4 كجم. يمنح الهيكل المصنوع من الألومنيوم أو ألياف الكربون حماية فائقة للشاشة ولوحة المفاتيح ضد الضغط اليومي داخل الحقيبة الجامعية.

### 3. سعة الذاكرة العشوائية (RAM)
تجنب شراء جهاز بذاكرة 8 جيجابايت في عام 2026. تستهلك المتصفحات الحديثة وملفات الـ PDF البحثية الذاكرة سريعاً؛ ولذلك تمثل سعة 16 جيجابايت الحد الأدنى للعمل المريح لعدة سنوات دون بطء.

### 4. نسبة أبعاد الشاشة: 16:10 مقابل 16:9
توفر نسبة 16:10 مساحة رأسية إضافية مريحة للغاية لقراءة الأبحاث والبرمجة وتحرير الجداول مقارنة بالشاشات العريضة التقليدية 16:9.`,
    author: 'مراجعات التقنية الأكاديمية',
    category: 'laptops',
    tags: ['لابتوب', 'الطلاب', 'الجامعة'],
    language: 'ar',
    isPublished: true,
    publishedDate: '2026-02-18',
    readTimeMinutes: 5,
    featuredImageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'دليل شراء الحاسوب المحمول للطلاب 2026 | نيكسورا (Nexora)',
    seoDescription: 'تعرف على معايير اختيار لابتوب الطلاب: البطارية الطويلة، الوزن الخفيف، ذاكرة 16 جيجابايت، ونسبة الشاشة 16:10.',
    hasAffiliateLinks: false,
    updatedAt: '2026-02-18T14:30:00.000Z'
  },
  {
    id: 'art-ar-4',
    slug: 'how-to-compare-battery-life-and-charging-ar',
    title: 'كيف تقارن بين سعة البطارية وسرعات الشحن بأمان: ما وراء الملي أمبير',
    excerpt: 'لماذا لا تعني بطارية 5,000 مللي أمبير بالضرورة عملاً أطول من بطارية 4,400 مللي أمبير، والفرق بين الشحن العالمي والبروتوكولات الخاصة.',
    content: `## فهم كيمياء البطاريات وإدارة الطاقة في الإلكترونيات

من أكثر المفاهيم الخاطئة انتشاراً الاعتقاد بأن سعة البطارية بالمللي أمبير (mAh) تعبر وحدها عن فترة الاستخدام الفعلي. في الواقع، عمر البطارية نتيجة معادلة متكاملة بين كفاءة العتاد والبرمجيات.

### 1. السعة بالمللي أمبير مقابل واط/ساعة (Wh)
يقيس المللي أمبير الشحنة الكهربائية، بينما يعبر الواط/ساعة عن محتوى الطاقة الإجمالي. وبما أن الجهد الكهربائي يختلف باختلاف تصميم الخلايا الأحادية والمزدوجة، فإن مقارنة الواط/ساعة تمنحك مقارنة أدق بكثير.

### 2. كفاءة الشاشة والمعالج
تستهلك الشاشة والمعالج أكثر من 80% من طاقة الجهاز. الهاتف المزود بمعالج حديث بدقة 3 نانومتر وشاشة LTPO تنخفض إلى 1 هرتز قد يدوم 12 ساعة شاشة مع بطارية 4500 مللي أمبير، بينما قد لا يتجاوز هاتف ببطارية 5000 مللي أمبير غير موفر للطاقة 8 ساعات.

### 3. معايير الشحن السريع: USB-PD PPS مقابل الشواحن الخاصة
- **معيار USB Power Delivery (PD) المفتوح**: المعيار العالمي الآمن والمدعوم من كبرى الشركات، ويتيح استخدام نفس الشاحن للهاتف واللابتوب والتابلت بأمان تام.
- **بروتوكولات الشركات الخاصة (80-120 واط)**: تتطلب غالباً شواحن وكابلات مخصصة تزيد من السخونة الداخلية أثناء الشحن.

### 4. الحفاظ على صحة البطارية على المدى الطويل
يؤدي الشحن فائق السرعة المستمر إلى توليد حرارة تؤثر تدريجياً على العمر الافتراضي لليثيوم. يساهم تفعيل خيار حماية البطارية عند 80% في الحفاظ على قدرتها لأكثر من 1000 دورة شحن كاملة.`,
    author: 'مختبر الطاقة والبطاريات',
    category: 'smartphones',
    tags: ['البطارية', 'الشحن السريع', 'كفاءة الطاقة'],
    language: 'ar',
    isPublished: true,
    publishedDate: '2026-02-10',
    readTimeMinutes: 6,
    featuredImageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'كيف تقارن بين سعة البطارية وسرعات الشحن بأمان | نيكسورا (Nexora)',
    seoDescription: 'دليل مقارنة بطاريات الأجهزة: الواط/ساعة، كفاءة شاشات LTPO، معايير USB-PD، والحفاظ على صحة البطارية.',
    hasAffiliateLinks: false,
    updatedAt: '2026-02-10T09:15:00.000Z'
  },
  {
    id: 'art-ar-5',
    slug: 'understanding-smartphone-camera-specifications-ar',
    title: 'فهم مواصفات كاميرات الهواتف الذكية وحجم المستشعرات: قوانين البصريات',
    excerpt: 'اكتشف لماذا تحدد فتحة العدسة، والحجم الفيزيائي للمستشعر، وعدسات البيريسكوب دقة الصور وجودتها الحقيقية.',
    content: `## قوانين البصريات في هندسة كاميرات الهواتف الحديثة

تحولت كاميرات الهواتف من مجرد عدسات بسيطة إلى منظومات تصوير حاسوبية متقدمة. يساعدك فهم أسس البصريات على التفريق بين جودة التصوير الحقيقية والمصطلحات التسويقية الجذابة.

### 1. حجم المستشعر الفيزيائي هو المعيار الأساسي
يحدد الحجم الفيزيائي للمستشعر (مثل 1/1.3 بوصة أو 1 بوصة) كمية فوتونات الضوء المجمعة. فالمستشعر الأكبر يمنح صوراً بنطاق ديناميكي واسع وتفاصيل واضحة وعزل طبيعي مريح للعين دون الحاجة لمحاكاة الذكاء الاصطناعي.

### 2. فتحة العدسة (f-stop)
تعبر قيمة فتحة العدسة (مثل f/1.7 مقابل f/2.2) عن مقدار الضوء المار عبر الزجاج إلى المستشعر. كلما صغر الرقم بعد حرف f، زادت كمية الضوء المار، مما يساعد في التقاط صور ليلية سريعة خالية من الاهتزاز.

### 3. التقريب البصري بالبيريسكوب مقابل القص الرقمي
يعتمد التقريب البصري الحقيقي على موشورات زجاجية داخل هيكل الهاتف لتكبير الصورة بصرياً. أما التقريب الرقمي فما هو إلا قص لجزء من الصورة الأصلية مما يتسبب في فقدان التفاصيل وظهور تشوهات رقمية.

### 4. التثبيت البصري بتحريك المستشعر (Sensor-Shift OIS)
تقوم هذه التقنية بتحريك المستشعر نفسه بمعدل آلاف المرات في الثانية لمعادلة اهتزاز اليد، مما يوفر ثباتاً فائقاً لتصوير الفيديو واللقطات الليلية الطويلة مقارنة بتحريك العدسة التقليدي.`,
    author: 'فريق البصريات والعتاد',
    category: 'smartphones',
    tags: ['كاميرات', 'بصريات', 'تصوير'],
    language: 'ar',
    isPublished: true,
    publishedDate: '2026-01-28',
    readTimeMinutes: 5,
    featuredImageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'فهم مواصفات كاميرات الهواتف وحجم المستشعرات | نيكسورا (Nexora)',
    seoDescription: 'شرح عتاد كاميرات الهواتف: حجم المستشعر، فتحة العدسة، تقريب البيريسكوب البصري، وتقنيات تثبيت المستشعر.',
    hasAffiliateLinks: false,
    updatedAt: '2026-01-28T11:00:00.000Z'
  },
  {
    id: 'art-ar-6',
    slug: 'how-to-compare-electronics-prices-safely-ar',
    title: 'كيف تقارن أسعار الأجهزة الإلكترونية بأمان وتتجنب العروض المضللة',
    excerpt: 'إرشادات عملية لفحص الضمان المحلي المعتمد، والتحقق من المتاجر الرسمية، ومقارنة التخفيضات الحقيقية بأمان.',
    content: `## إرشادات مقارنة الأسعار وحماية المستهلك عند شراء الإلكترونيات

البحث عن أفضل سعر عند شراء لابتوب أو هاتف ذكي خطوة ذكية، ولكن الأسواق الرقمية تشهد أحياناً عروضاً وهمية وممارسات غير شفافة. إليك كيف تتحقق من الصفقات وتحمي أموالك.

### 1. احذر من "الأسعار الأصلية" المصطنعة
تلجأ بعض المتاجر غير المعتمدة إلى رفع السعر المرجعي المسجل قبل فترات التخفيضات مباشرة لإظهار خصم وهمي بنسبة 50%. استخدم أدوات المقارنة المحايدة للتحقق من السعر الفعلي المرجعي للجهاز.

### 2. تأكد من صفة الموزع المعتمد والضمان الإقليمي
الشراء من بائعين غير معتمدين في المنصات المفتوحة قد يحرمك من الضمان الرسمي للشركة المصنعة داخل دولتك. عند شراء أجهزة أبل أو سامسونج أو ديل، احرص على التأكد من وجود ضمان الوكيل المعتمد.

### 3. مطابقة رمز الموديل (SKU) ونطاقات الشبكات
قد تفتقر الأجهزة المستوردة من أسواق أخرى إلى ترددات شبكات الجيل الخامس 5G المحلية، أو تأتي بقابس كهربائي غير متوافق. تأكد دائماً من رمز الموديل المخصص لمنطقتك قبل إتمام الدفع.

### 4. قراءة سياسة الاسترجاع ورسوم إعادة التخزين
توفر المتاجر الموثوقة فترة سماح واضحة للفحص والاسترجاع (بين 14 و30 يوماً). تجنب المتاجر التي تشترط رسوماً باهظة لإعادة الشحن أو ترفض استرجاع المنتجات في حال وجود عيوب مصنعية.`,
    author: 'مكتب حماية المستهلك التقني',
    category: 'monitors',
    tags: ['حماية المستهلك', 'الأسعار', 'الأمان'],
    language: 'ar',
    isPublished: true,
    publishedDate: '2026-01-15',
    readTimeMinutes: 5,
    featuredImageUrl: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
    seoTitle: 'كيف تقارن أسعار الأجهزة الإلكترونية بأمان | نيكسورا (Nexora)',
    seoDescription: 'نصائح حماية المستهلك لشراء الأجهزة: تجنب الخصومات الوهمية، فحص ضمان الوكيل المعتمد، ومطابقة موديل الجهاز.',
    hasAffiliateLinks: false,
    updatedAt: '2026-01-15T08:00:00.000Z'
  }
];

// Initial Homepage sections
const initialSections: HomepageSection[] = [
  {
    id: 'sec-hero',
    key: 'hero',
    titleEn: 'Find the Right Tech for You',
    titleAr: 'اعثر على التقنية المناسبة لك',
    descriptionEn: 'Compare specifications side-by-side with verified factual hardware data, highlight genuine differences, and make confident purchasing decisions.',
    descriptionAr: 'قارن المواصفات التقنية جنبًا إلى جنب مع بيانات عتادية موثوقة ومستندة للحقائق، واكتشف الفروق الجوهرية لاتخاذ قرارات شراء مدروسة.',
    layout: 'featured',
    itemType: 'promo',
    itemIds: [],
    order: 1,
    isVisible: true
  },
  {
    id: 'sec-categories',
    key: 'categories',
    titleEn: 'Explore Tech Categories',
    titleAr: 'استكشف فئات الإلكترونيات',
    descriptionEn: 'Select a category to filter technical specs and compare devices in the same class.',
    descriptionAr: 'اختر فئة لمقارنة المواصفات الفنية بين أفضل الأجهزة في نفس الفئة.',
    layout: 'grid',
    itemType: 'categories',
    itemIds: ['smartphones', 'laptops', 'tablets', 'headphones', 'smartwatches', 'monitors'],
    order: 2,
    isVisible: true
  },
  {
    id: 'sec-popular-comparisons',
    key: 'comparisons',
    titleEn: 'Popular Head-to-Head Matchups',
    titleAr: 'أبرز المقارنات المباشرة',
    descriptionEn: 'Direct spec comparisons between the most requested flagship devices.',
    descriptionAr: 'مقارنات رأس برأس بين أكثر الأجهزة الرائدة طلباً في السوق.',
    layout: 'grid',
    itemType: 'comparisons',
    itemIds: ['flagship-smartphones-2025', 'pro-laptops-comparison', 'flagship-tablets-showdown'],
    order: 3,
    isVisible: true
  },
  {
    id: 'sec-featured-products',
    key: 'products',
    titleEn: 'Featured Devices',
    titleAr: 'أجهزة مختارة',
    descriptionEn: 'Examine detailed technical specifications and sample reference pricing.',
    descriptionAr: 'استعرض المواصفات الفنية التفصيلية والأسعار الإرشادية النموذجية.',
    layout: 'grid',
    itemType: 'products',
    itemIds: ['iphone-16-pro-max', 'galaxy-s25-ultra', 'macbook-pro-14-m4', 'dell-xps-14-9440', 'sony-wh-1000xm5', 'lg-ultragear-32gs95ue'],
    order: 4,
    isVisible: true
  },
  {
    id: 'sec-how-it-works',
    key: 'how-it-works',
    titleEn: 'How Nexora Works',
    titleAr: 'كيف تعمل منصة نيكسورا (Nexora)',
    descriptionEn: 'A transparent, engineer-grade approach to technology evaluation.',
    descriptionAr: 'منهجية هندسية شفافة لتقييم الأجهزة بدون تعقيدات تسويقية.',
    layout: 'grid',
    itemType: 'promo',
    itemIds: [],
    order: 5,
    isVisible: true
  },
  {
    id: 'sec-articles',
    key: 'articles',
    titleEn: 'Educational Buying Guides',
    titleAr: 'أدلة الشراء والتحليل التقني',
    descriptionEn: 'In-depth, objective hardware explainers to decode marketing terms and choose what you actually need.',
    descriptionAr: 'مقالات تعليمية موضوعية تشرح مصطلحات العتاد وتساعدك على اختيار ما تحتاجه فعلياً.',
    layout: 'grid',
    itemType: 'articles',
    itemIds: ['art-en-1', 'art-en-2', 'art-en-3', 'art-ar-1', 'art-ar-2', 'art-ar-3'],
    order: 6,
    isVisible: true
  }
];

// Initial Site Settings
const initialSettings: SiteSettings = {
  siteName: 'Nexora',
  taglineEn: 'Compare smarter. Buy better.',
  taglineAr: 'قارن بذكاء. اشترِ باختيار أفضل.',
  supportEmail: 'support@tooloraweb.com',
  defaultLanguage: 'en',
  availableLanguages: ['en', 'ar'],
  logoText: 'Nexora',
  footerNoticeEn: 'Product specifications are compiled from publicly available manufacturer documentation. Nexora is an independent evaluation platform.',
  footerNoticeAr: 'تُستخلص مواصفات المنتجات من البيانات التقنية العامة للشركات المصنعة. نيكسورا (Nexora) منصة تقييم مستقلة.',
  affiliateDisclosureEn: 'Nexora may earn an affiliate commission on qualifying purchases made through external links. Comparisons remain strictly editorial and data-driven.',
  affiliateDisclosureAr: 'قد تحصل نيكسورا (Nexora) على عمولة تسويق بالعمولة عند إتمام عمليات الشراء المؤهلة عبر الروابط الخارجية. تبقى جميع المقارنات حيادية ومستندة للحقائق.',
  seoDefaultTitle: 'Nexora - Compare Smarter. Buy Better. | Electronics Comparison',
  seoDefaultDescription: 'Bilingual electronics comparison platform for smartphones, laptops, tablets, headphones, smartwatches, and monitors.',
  socialLinks: {
    twitter: 'https://twitter.com/nexora',
    github: 'https://github.com/nexora',
  },
  stripeMode: 'test'
};

// Initial Subscription Plans
const initialPlans: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    nameEn: 'Free Community',
    nameAr: 'العضوية المجانية',
    descriptionEn: 'Core comparison capabilities for individuals and casual tech buyers.',
    descriptionAr: 'إمكانيات المقارنة الأساسية للمشترين والمستخدمين الأفراد.',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: 'USD',
    featuresEn: [
      'Side-by-side spec comparisons (up to 4 devices)',
      'Difference highlight detector',
      'Access to all public educational guides',
      'Unbiased hardware data sourcing'
    ],
    featuresAr: [
      'مقارنة المواصفات جنباً إلى جنب (حتى 4 أجهزة)',
      'أداة كشف وإبراز الفروقات العتادية',
      'الوصول الكامل إلى أدلة الشراء التعليمية',
      'بيانات موثوقة ومحايدة من المصنّعين'
    ],
    isPopular: false,
    isActive: true
  },
  {
    id: 'plan-premium',
    nameEn: 'Nexora Pro',
    nameAr: 'نيكسورا برو (احترافي)',
    descriptionEn: 'Advanced tools, saved matrices, unlimited export, and early hardware breakdowns.',
    descriptionAr: 'أدوات متقدمة، حفظ المقارنات، تصدير غير محدود، ومواصفات حصرية مبكرة.',
    monthlyPrice: 9.99,
    annualPrice: 89.99,
    currency: 'USD',
    stripeMonthlyPriceId: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_comparenest_pro_monthly_test',
    stripeAnnualPriceId: process.env.STRIPE_ANNUAL_PRICE_ID || 'price_comparenest_pro_annual_test',
    featuresEn: [
      'Unlimited saved comparison lists across devices',
      'Direct PDF / CSV spec sheet exports for procurement',
      'Custom hardware alerts & price fluctuation tracking',
      'Priority specification correction verification',
      'Ad-free clean browsing experience',
      'Dedicated technical evaluation support'
    ],
    featuresAr: [
      'حفظ غير محدود لقوائم المقارنات والمزامنة عبر الأجهزة',
      'تصدير مباشر لجداول المواصفات بصيغتي PDF وCSV للشركات',
      'تنبيهات مخصصة لتحديثات العتاد وتذبذب الأسعار',
      'أولوية مراجعة طلبات تصحيح المواصفات وتدقيقها',
      'تجربة تصفح نظيفة وخالية تماماً من الإعلانات',
      'دعم فني استشاري مباشر لتقييم الأجهزة'
    ],
    isPopular: true,
    isActive: true
  }
];

// Initial Custom Pages
const initialPages: CustomPage[] = [
  {
    id: 'page-about',
    slug: 'about-us',
    titleEn: 'About Nexora',
    titleAr: 'عن منصة نيكسورا (Nexora)',
    contentEn: `## Independent Engineering Comparisons

Nexora was founded on a singular premise: consumer technology purchasing should be grounded in empirical engineering disclosures, not marketing slogans.

Our editorial team rigorously compiles, normalizes, and verifies technical documentation across global electronics manufacturers. Whether you are comparing neural engine throughput or display pixel architectures, Nexora delivers unbiased side-by-side clarity.`,
    contentAr: `## مقارنات عتادية هندسية مستقلة

تأسست منصة نيكسورا (Nexora) على مبدأ واحد: قرارات شراء الإلكترونيات الاستهلاكية يجب أن تستند إلى حقائق هندسية موثقة وليس إلى شعارات تسويقية مضللة.

يقوم فريقنا بتجميع وتوحيد وتدقيق الوثائق التقنية الصادرة عن كبرى الشركات المصنعة عالمياً لنقدم للمستخدم العربي والعالمي أدوات مقارنة شفافة وحيادية.`,
    seoTitle: 'About Nexora | Our Mission and Hardware Standards',
    seoDescription: 'Learn about Nexora: our independent editorial integrity, engineering data sourcing, and bilingual technology platform.',
    isPublished: true,
    showInHeader: true,
    showInFooter: true,
    navOrder: 1,
    language: 'all',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-privacy',
    slug: 'privacy-policy',
    titleEn: 'Privacy Policy',
    titleAr: 'سياسة الخصوصية',
    contentEn: `## Your Privacy Rights at Nexora

We believe in minimal data footprint. Nexora does not require personal account registration for basic specification browsing and comparisons.

### 1. Data Collection
We collect contact inquiry details only when you voluntarily submit our support form. When subscribing to Nexora Pro, payment credentials are processed securely via Stripe without passing through our web servers.

### 2. Cookies & Local Storage
We store language preferences and active comparison queues locally in your browser. We never sell personal information to third parties.`,
    contentAr: `## حقوق الخصوصية في نيكسورا (Nexora)

نؤمن بأقل قدر من جمع البيانات. لا تتطلب منصة نيكسورا (Nexora) أي تسجيل إجباري لتصفح المواصفات واستخدام المقارنات.

### 1. جمع البيانات
نقوم بحفظ تفاصيل الرسائل فقط عند إرسال استفسار عبر نموذج الدعم. وعند الاشتراك في باقة Pro، تتم معالجة بيانات الدفع بأمان كامل عبر Stripe دون المرور بخوادمنا.

### 2. التخزين المحلي
نستخدم التخزين المحلي لمتصفحك فقط لحفظ اللغة وقائمة المقارنة النشطة، ولا نبيع بياناتك لأي طرف ثالث.`,
    seoTitle: 'Privacy Policy | Nexora',
    seoDescription: 'Read Nexora Privacy Policy regarding data protection, Stripe transactions, and client-side preferences.',
    isPublished: true,
    showInHeader: false,
    showInFooter: true,
    navOrder: 2,
    language: 'all',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-terms',
    slug: 'terms-of-service',
    titleEn: 'Terms of Service',
    titleAr: 'شروط الاستخدام',
    contentEn: `## Terms and Conditions of Service

By accessing Nexora, you agree to these terms. Specification data is provided for consumer comparative reference. Specifications and regional model variants should be confirmed with authorized regional vendors before final purchase.`,
    contentAr: `## الشروط والأحكام العامة

باستخدامك لمنصة نيكسورا (Nexora)، فإنك توافق على هذه الشروط. يتم تقديم بيانات المواصفات لأغراض المقارنة والاسترشاد، ويجب دائماً التأكد من رمز الموديل الإقليمي مع الوكيل المعتمد قبل الشراء.`,
    seoTitle: 'Terms of Service | Nexora',
    seoDescription: 'Nexora Terms of Service and legal disclosures.',
    isPublished: true,
    showInHeader: false,
    showInFooter: true,
    navOrder: 3,
    language: 'all',
    updatedAt: new Date().toISOString()
  }
];

// Helper to ensure database directory exists and load data
export function getDb(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      // Ensure any newly added properties exist
      if (memoryDb) {
        if (!memoryDb.homepageSections || memoryDb.homepageSections.length === 0) {
          memoryDb.homepageSections = initialSections;
        }
        if (!memoryDb.articles || memoryDb.articles.length === 0) {
          memoryDb.articles = initialArticles;
        }
        if (!memoryDb.plans || memoryDb.plans.length === 0) {
          memoryDb.plans = initialPlans;
        }
        if (!memoryDb.pages || memoryDb.pages.length === 0) {
          memoryDb.pages = initialPages;
        }
        if (!memoryDb.settings) {
          memoryDb.settings = initialSettings;
        }
        if (!memoryDb.logs) {
          memoryDb.logs = [];
        }
        if (!memoryDb.contactMessages) {
          memoryDb.contactMessages = [];
        }
        if (!memoryDb.subscriptions) {
          memoryDb.subscriptions = [];
        }
        if (!memoryDb.affiliateLinks) {
          memoryDb.affiliateLinks = [];
        }
        return memoryDb;
      }
    } catch (err) {
      console.error('[DB] Error parsing existing db.json, re-initializing default state:', err);
    }
  }

  // Initialize new default database
  memoryDb = {
    users: [],
    homepageSections: initialSections,
    pages: initialPages,
    articles: initialArticles,
    contactMessages: [],
    plans: initialPlans,
    subscriptions: [],
    affiliateLinks: [
      {
        id: 'aff-amazon-ref',
        name: 'Amazon Electronics (Partner Ref)',
        merchant: 'Amazon',
        targetUrl: 'https://www.amazon.com',
        category: 'general',
        disclosureNoticeEn: 'As an Amazon Associate we earn from qualifying purchases.',
        disclosureNoticeAr: 'قد نحصل على عمولة إحالة من عمليات الشراء المؤهلة عبر أمازون.',
        isActive: true,
        clicksCount: 0
      }
    ],
    settings: initialSettings,
    logs: [
      {
        id: 'log-init',
        timestamp: new Date().toISOString(),
        adminEmail: 'system',
        action: 'SYSTEM_BOOTSTRAP',
        details: 'Nexora database bootstrapped with 12 substantive bilingual articles, categories, and settings.'
      }
    ]
  };

  saveDb();
  return memoryDb;
}

// Atomic persistence to file
export function saveDb(): void {
  if (!memoryDb) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(memoryDb, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('[DB] Error saving db.json:', err);
  }
}

// Ensure initial admin user from environment variables if present
export async function initializeAdminUser(): Promise<void> {
  const db = getDb();
  const envEmail = process.env.ADMIN_EMAIL || 'admin@tooloraweb.com';
  const envPassword = process.env.ADMIN_PASSWORD;

  const existingAdmin = db.users.find(u => u.role === 'admin');

  if (!existingAdmin && envPassword) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(envPassword, salt);

    const newAdmin: User = {
      id: 'admin-owner-1',
      email: envEmail.toLowerCase().trim(),
      passwordHash,
      role: 'admin',
      name: 'Site Administrator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.users.push(newAdmin);
    db.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminEmail: newAdmin.email,
      action: 'ADMIN_INITIALIZED_ENV',
      details: `Administrator account created from environment configuration: ${newAdmin.email}`
    });
    saveDb();
    console.log(`[AUTH] Initial admin account provisioned from environment: ${newAdmin.email}`);
  }
}

// Helper to log administrative actions
export function logAdminAction(adminEmail: string, action: string, details: string, ip?: string): void {
  const db = getDb();
  db.logs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    adminEmail,
    action,
    details,
    ip
  });
  if (db.logs.length > 200) {
    db.logs = db.logs.slice(0, 200);
  }
  saveDb();
}
