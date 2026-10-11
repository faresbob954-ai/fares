import { Product } from '../types';

export const products: Product[] = [
  // =================== SMARTPHONES ===================
  {
    id: 'iphone-16-pro-max',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    model: 'iPhone 16 Pro Max',
    category: 'smartphones',
    releaseYear: 2024,
    descriptionEn: 'Flagship iOS smartphone featuring a Grade 5 titanium chassis, 6.9-inch Super Retina XDR OLED, A18 Pro silicon, and dedicated Camera Control capacitive button.',
    descriptionAr: 'هاتف رائد من آبل بهيكل من التيتانيوم فئة 5، شاشة مقاس 6.9 بوصة Super Retina XDR OLED، معالج A18 Pro، وزر تحكم الكاميرا بالسعة اللمسية.',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Apple iPhone 16 Pro Max in Desert Titanium',
    imageAltAr: 'آبل آيفون 16 برو ماكس باللون التيتانيوم الصحراوي',
    prices: [
      {
        retailer: 'Official Apple Store (Ref)',
        price: 1199,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      },
      {
        retailer: 'Authorized Regional Distributor (Ref)',
        price: 4999,
        currency: 'SAR',
        market: 'GCC (Reference MSRP)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'UK', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Screen Size', labelAr: 'حجم الشاشة', valueEn: '6.9 inches', valueAr: '6.9 بوصة', isHighlight: true, source: 'Apple Tech Specs Sheet' },
          { key: 'panel_type', labelEn: 'Panel Type', labelAr: 'نوع اللوحة', valueEn: 'Super Retina XDR OLED', valueAr: 'Super Retina XDR OLED', isHighlight: true },
          { key: 'resolution', labelEn: 'Resolution', labelAr: 'الدقة', valueEn: '2868 x 1320 px (460 ppi)', valueAr: '2868 × 1320 بكسل (460 بكسل/بوصة)' },
          { key: 'refresh_rate', labelEn: 'Refresh Rate', labelAr: 'معدل التحديث', valueEn: '1-120 Hz ProMotion', valueAr: '1-120 هرتز ProMotion', isHighlight: true },
          { key: 'peak_brightness', labelEn: 'Peak Brightness', labelAr: 'السطوع الأقصى', valueEn: '2000 nits (Outdoor)', valueAr: '2000 شمعة (في ضوء الشمس)' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'Processor', labelAr: 'المعالج', valueEn: 'Apple A18 Pro (3nm 2nd Gen)', valueAr: 'Apple A18 Pro (معمارية 3 نانومتر الجيل 2)', isHighlight: true, source: 'Apple Technical Disclosures' },
          { key: 'cpu_cores', labelEn: 'CPU Config', labelAr: 'تكوين الأنوية', valueEn: '6 cores (2 performance + 4 efficiency)', valueAr: '6 أنوية (2 أداء + 4 كفاءة)' },
          { key: 'gpu_cores', labelEn: 'GPU Architecture', labelAr: 'معالج الرسوميات', valueEn: '6-core GPU with hardware ray tracing', valueAr: '6 أنوية مع تتبع الأشعة العتادي' },
          { key: 'npu', labelEn: 'Neural Engine', labelAr: 'المحرك العصبي', valueEn: '16-core NPU (35 TOPS)', valueAr: '16 نواة (35 تريليون عملية/ثانية)' },
          { key: 'base_ram', labelEn: 'RAM Memory', labelAr: 'الذاكرة العشوائية', valueEn: '8 GB LPDDR5X', valueAr: '8 جيجابايت LPDDR5X' },
          { key: 'storage_options', labelEn: 'Storage Options', labelAr: 'خيارات التخزين', valueEn: '256GB, 512GB, 1TB NVMe', valueAr: '256 جيجابايت، 512 جيجابايت، 1 تيرابايت' }
        ]
      },
      {
        titleEn: 'Camera System',
        titleAr: 'منظومة الكاميرات',
        items: [
          { key: 'main_camera', labelEn: 'Primary Sensor', labelAr: 'المستشعر الرئيسي', valueEn: '48 MP Fusion (24mm, f/1.78, Sensor-shift OIS)', valueAr: '48 ميجابكسل Fusion (24 مم، f/1.78، تثبيت مستشعر)', isHighlight: true },
          { key: 'ultra_wide', labelEn: 'Ultra-Wide Sensor', labelAr: 'عدسة الزاوية العريضة', valueEn: '48 MP (13mm, f/2.2, 120° FOV)', valueAr: '48 ميجابكسل (13 مم، f/2.2، زاوية 120 درجة)' },
          { key: 'telephoto', labelEn: 'Telephoto Zoom', labelAr: 'عدسة التقريب', valueEn: '12 MP 5x Optical Tetraprism (120mm, f/2.8)', valueAr: '12 ميجابكسل تقريب بصري 5x بتصميم الموشور (120 مم)', isHighlight: true },
          { key: 'video_recording', labelEn: 'Max Video Capture', labelAr: 'أقصى دقة فيديو', valueEn: '4K at 120 fps Dolby Vision HDR / ProRes Log', valueAr: '4K بمعدل 120 إطار/ثانية Dolby Vision HDR / ProRes Log' }
        ]
      },
      {
        titleEn: 'Battery & Charging',
        titleAr: 'البطارية والشحن',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Capacity', labelAr: 'سعة البطارية', valueEn: '4685 mAh (Nominal)', valueAr: '4685 مللي أمبير (سعة نموذجية)' },
          { key: 'charging_wired', labelEn: 'Wired Charging', labelAr: 'الشحن السلكي', valueEn: 'USB-C (Up to 30W PD peak)', valueAr: 'منفذ USB-C (حتى 30 واط كحد أقصى)' },
          { key: 'charging_wireless', labelEn: 'Wireless Charging', labelAr: 'الشحن اللاسلكي', valueEn: 'Up to 25W MagSafe / 15W Qi2', valueAr: 'حتى 25 واط مع MagSafe / 15 واط Qi2' }
        ]
      },
      {
        titleEn: 'Chassis & Connectivity',
        titleAr: 'الهيكل والاتصال',
        items: [
          { key: 'chassis_material', labelEn: 'Frame Material', labelAr: 'مادة الهيكل', valueEn: 'Titanium Grade 5 + Textured Matte Glass', valueAr: 'تيتانيوم درجة 5 وزجاج غير لامع' },
          { key: 'water_resistance', labelEn: 'Ingress Protection', labelAr: 'مقاومة الماء والغبار', valueEn: 'IP68 (6 meters up to 30 mins)', valueAr: 'معيار IP68 (حتى 6 أمتار لمدة 30 دقيقة)' },
          { key: 'weight', labelEn: 'Weight', labelAr: 'الوزن', valueEn: '227 g (8.01 oz)', valueAr: '227 جرام' },
          { key: 'usb_standard', labelEn: 'USB Data Transfer', labelAr: 'سرعة منفذ USB', valueEn: 'USB 3.2 Gen 2 (Up to 10 Gbps)', valueAr: 'USB 3.2 Gen 2 (حتى 10 جيجابت/ثانية)' }
        ]
      }
    ],
    keyFeaturesEn: ['A18 Pro 3nm Silicon', '48MP Ultra-Wide & 5x Tetraprism Zoom', 'Dedicated Camera Control', 'Up to 33h Video Playback'],
    keyFeaturesAr: ['معالج A18 Pro بتقنية 3 نانومتر', 'كاميرا عريضة 48 ميجابكسل وتقريب 5x موشوري', 'زر تحكم مخصص للكاميرا', 'تشغيل فيديو يصل إلى 33 ساعة'],
    dataSource: 'Apple Official Technical Specification Whitepaper (A2849 Series)',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'galaxy-s25-ultra',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra',
    category: 'smartphones',
    releaseYear: 2025,
    descriptionEn: 'Ultra-tier Android flagship with Snapdragon 8 Elite For Galaxy, integrated S Pen, rounded titanium frame, and 200MP quad-telephoto optical system.',
    descriptionAr: 'هاتف سامسونج الرائد الفائق بمعالج Snapdragon 8 Elite المخصص، قلم S Pen مدمج، إطار تيتانيوم مصقول، ونظام رباعي الكاميرات بدقة 200 ميجابكسل.',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Samsung Galaxy S25 Ultra Titanium Gray',
    imageAltAr: 'سامسونج جالكسي S25 الترا باللون الرمادي التيتانيومي',
    prices: [
      {
        retailer: 'Official Samsung Store (Ref)',
        price: 1299,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      },
      {
        retailer: 'Authorized Regional Distributor (Ref)',
        price: 5299,
        currency: 'SAR',
        market: 'GCC (Reference MSRP)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'UK', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Screen Size', labelAr: 'حجم الشاشة', valueEn: '6.86 inches', valueAr: '6.86 بوصة', isHighlight: true, source: 'Samsung Display Disclosures' },
          { key: 'panel_type', labelEn: 'Panel Type', labelAr: 'نوع اللوحة', valueEn: 'Dynamic AMOLED 2X with Anti-Reflective Armor', valueAr: 'Dynamic AMOLED 2X مع طبقة درع مضادة للانعكاس', isHighlight: true },
          { key: 'resolution', labelEn: 'Resolution', labelAr: 'الدقة', valueEn: '3120 x 1440 px (QHD+, 501 ppi)', valueAr: '3120 × 1440 بكسل (QHD+، 501 بكسل/بوصة)' },
          { key: 'refresh_rate', labelEn: 'Refresh Rate', labelAr: 'معدل التحديث', valueEn: '1-120 Hz Adaptive LTPO', valueAr: '1-120 هرتز تكيفي LTPO' },
          { key: 'peak_brightness', labelEn: 'Peak Brightness', labelAr: 'السطوع الأقصى', valueEn: '2600 nits Peak', valueAr: '2600 شمعة ذروة السطوع' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'Processor', labelAr: 'المعالج', valueEn: 'Qualcomm Snapdragon 8 Elite For Galaxy (3nm)', valueAr: 'Qualcomm Snapdragon 8 Elite For Galaxy (3 نانومتر)', isHighlight: true, source: 'Qualcomm & Samsung Datasheet' },
          { key: 'cpu_cores', labelEn: 'CPU Config', labelAr: 'تكوين الأنوية', valueEn: 'Oryon Prime (2x 4.47 GHz + 6x 3.53 GHz)', valueAr: 'أنوية Oryon (2 بتردد 4.47 جيجاهرتز + 6 بتردد 3.53 جيجاهرتز)' },
          { key: 'gpu_cores', labelEn: 'GPU Architecture', labelAr: 'معالج الرسوميات', valueEn: 'Adreno 830 with Sliced Architecture', valueAr: 'Adreno 830 مع بنية معمارية مجزأة' },
          { key: 'npu', labelEn: 'Neural Engine', labelAr: 'المحرك العصبي', valueEn: 'Hexagon NPU (~45 TOPS on-device)', valueAr: 'Hexagon NPU (حوالي 45 تريليون عملية/ثانية)' },
          { key: 'base_ram', labelEn: 'RAM Memory', labelAr: 'الذاكرة العشوائية', valueEn: '12 GB or 16 GB LPDDR5X', valueAr: '12 أو 16 جيجابايت LPDDR5X' },
          { key: 'storage_options', labelEn: 'Storage Options', labelAr: 'خيارات التخزين', valueEn: '256GB, 512GB, 1TB UFS 4.0', valueAr: '256 جيجابايت، 512 جيجابايت، 1 تيرابايت UFS 4.0' }
        ]
      },
      {
        titleEn: 'Camera System',
        titleAr: 'منظومة الكاميرات',
        items: [
          { key: 'main_camera', labelEn: 'Primary Sensor', labelAr: 'المستشعر الرئيسي', valueEn: '200 MP ISOCELL HP2 (1/1.3", f/1.7, OIS)', valueAr: '200 ميجابكسل ISOCELL HP2 (حجم 1/1.3 بوصة، f/1.7، OIS)', isHighlight: true },
          { key: 'ultra_wide', labelEn: 'Ultra-Wide Sensor', labelAr: 'عدسة الزاوية العريضة', valueEn: '50 MP (1/2.76", f/1.9, Dual Pixel AF)', valueAr: '50 ميجابكسل (1/2.76 بوصة، f/1.9، تركيز مزدوج)' },
          { key: 'telephoto', labelEn: 'Telephoto Zoom', labelAr: 'عدسة التقريب', valueEn: '50 MP 5x Periscope + 10 MP 3x Optical', valueAr: '50 ميجابكسل بيريسكوب 5x + 10 ميجابكسل تقريب بصري 3x', isHighlight: true },
          { key: 'video_recording', labelEn: 'Max Video Capture', labelAr: 'أقصى دقة فيديو', valueEn: '8K at 30 fps / 4K at 120 fps', valueAr: '8K بمعدل 30 إطار/ثانية / 4K بمعدل 120 إطار/ثانية' }
        ]
      },
      {
        titleEn: 'Battery & Charging',
        titleAr: 'البطارية والشحن',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Capacity', labelAr: 'سعة البطارية', valueEn: '5000 mAh (Typical)', valueAr: '5000 مللي أمبير (سعة نموذجية)' },
          { key: 'charging_wired', labelEn: 'Wired Charging', labelAr: 'الشحن السلكي', valueEn: '45W Fast Charging (USB-PD 3.0 PPS)', valueAr: 'شحن سريع 45 واط (تقنية USB-PD 3.0 PPS)' },
          { key: 'charging_wireless', labelEn: 'Wireless Charging', labelAr: 'الشحن اللاسلكي', valueEn: '15W Fast Wireless / Reverse Wireless PowerShare', valueAr: '15 واط لاسلكي / مشاركة طاقة لاسلكية عكسية' }
        ]
      },
      {
        titleEn: 'Chassis & Connectivity',
        titleAr: 'الهيكل والاتصال',
        items: [
          { key: 'chassis_material', labelEn: 'Frame Material', labelAr: 'مادة الهيكل', valueEn: 'Titanium Frame + Corning Gorilla Armor 2', valueAr: 'إطار تيتانيوم + زجاج غوريلا آرمور 2' },
          { key: 'water_resistance', labelEn: 'Ingress Protection', labelAr: 'مقاومة الماء والغبار', valueEn: 'IP68 (1.5 meters up to 30 mins)', valueAr: 'معيار IP68 (حتى 1.5 متر لمدة 30 دقيقة)' },
          { key: 'weight', labelEn: 'Weight', labelAr: 'الوزن', valueEn: '219 g (7.72 oz)', valueAr: '219 جرام' },
          { key: 'special_hardware', labelEn: 'Built-in Peripherals', labelAr: 'الملحقات المدمجة', valueEn: 'Integrated Bluetooth S Pen stylus slot', valueAr: 'قلم S Pen مدمج مع دعم البلوتوث' }
        ]
      }
    ],
    keyFeaturesEn: ['Snapdragon 8 Elite Silicon', '200MP Quad Camera System', 'Built-in S Pen Stylus', 'Gorilla Armor Anti-Reflective Glass'],
    keyFeaturesAr: ['معالج Snapdragon 8 Elite المخصص', 'نظام كاميرات رباعي بدقة 200 ميجابكسل', 'قلم S Pen مدمج', 'زجاج Gorilla Armor المضاد للانعكاس'],
    dataSource: 'Samsung Electronics Global Product Technical Specifications Sheet',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'pixel-9-pro-xl',
    slug: 'google-pixel-9-pro-xl',
    brand: 'Google',
    model: 'Pixel 9 Pro XL',
    category: 'smartphones',
    releaseYear: 2024,
    descriptionEn: 'Flagship Google device with Tensor G4, dedicated TPU for Gemini Nano, 16GB unified RAM, and high-dynamic-range camera tuning.',
    descriptionAr: 'هاتف جوجل الرائد بمعالج Tensor G4 وشريحة ذكاء اصطناعي، 16 جيجابايت رام موحدة، ومستشعرات كاميرا فائقة النطاق الديناميكي.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Google Pixel 9 Pro XL Obsidian',
    imageAltAr: 'جوجل بكسل 9 برو إكس إل باللون الأسود البركاني',
    prices: [
      {
        retailer: 'Official Google Store (Ref)',
        price: 1099,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'UK', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Screen Size', labelAr: 'حجم الشاشة', valueEn: '6.8 inches', valueAr: '6.8 بوصة', isHighlight: true, source: 'Google Hardware Docs' },
          { key: 'panel_type', labelEn: 'Panel Type', labelAr: 'نوع اللوحة', valueEn: 'Super Actua LTPO OLED', valueAr: 'Super Actua LTPO OLED' },
          { key: 'resolution', labelEn: 'Resolution', labelAr: 'الدقة', valueEn: '2992 x 1344 px (486 ppi)', valueAr: '2992 × 1344 بكسل (486 بكسل/بوصة)' },
          { key: 'refresh_rate', labelEn: 'Refresh Rate', labelAr: 'معدل التحديث', valueEn: '1-120 Hz Smooth Display', valueAr: '1-120 هرتز تكيفي' },
          { key: 'peak_brightness', labelEn: 'Peak Brightness', labelAr: 'السطوع الأقصى', valueEn: '3000 nits Peak', valueAr: '3000 شمعة ذروة السطوع' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'Processor', labelAr: 'المعالج', valueEn: 'Google Tensor G4 (4nm)', valueAr: 'Google Tensor G4 (4 نانومتر)', isHighlight: true },
          { key: 'cpu_cores', labelEn: 'CPU Config', labelAr: 'تكوين الأنوية', valueEn: '8-core (1x Cortex-X4 + 3x A720 + 4x A520)', valueAr: '8 أنوية (1 كورتكس X4 + 3 أنوية A720 + 4 أنوية A520)' },
          { key: 'base_ram', labelEn: 'RAM Memory', labelAr: 'الذاكرة العشوائية', valueEn: '16 GB LPDDR5X', valueAr: '16 جيجابايت LPDDR5X', isHighlight: true },
          { key: 'storage_options', labelEn: 'Storage Options', labelAr: 'خيارات التخزين', valueEn: '128GB, 256GB, 512GB, 1TB UFS 3.1', valueAr: '128، 256، 512 جيجابايت، 1 تيرابايت' }
        ]
      },
      {
        titleEn: 'Camera System',
        titleAr: 'منظومة الكاميرات',
        items: [
          { key: 'main_camera', labelEn: 'Primary Sensor', labelAr: 'المستشعر الرئيسي', valueEn: '50 MP (1/1.31", f/1.68, OIS, Octa PD)', valueAr: '50 ميجابكسل (1/1.31 بوصة، f/1.68، تثبيت بصري)' },
          { key: 'ultra_wide', labelEn: 'Ultra-Wide Sensor', labelAr: 'عدسة الزاوية العريضة', valueEn: '48 MP (f/1.7, 123° FOV, Macro Focus)', valueAr: '48 ميجابكسل (f/1.7، زاوية 123 درجة، تركيز ماكرو)' },
          { key: 'telephoto', labelEn: 'Telephoto Zoom', labelAr: 'عدسة التقريب', valueEn: '48 MP 5x Optical Periscope (Up to 30x Super Res)', valueAr: '48 ميجابكسل تقريب بصري 5x (حتى 30x تكبير عالي الدقة)' }
        ]
      },
      {
        titleEn: 'Battery & Charging',
        titleAr: 'البطارية والشحن',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Capacity', labelAr: 'سعة البطارية', valueEn: '5060 mAh', valueAr: '5060 مللي أمبير' },
          { key: 'charging_wired', labelEn: 'Wired Charging', labelAr: 'الشحن السلكي', valueEn: '37W Fast Charging (PPS)', valueAr: '37 واط شحن سريع (PPS)' }
        ]
      }
    ],
    keyFeaturesEn: ['Google Tensor G4 SoC', '16GB LPDDR5X Memory Standard', '3000 nits Super Actua Screen', '7 Years OS & Security Support'],
    keyFeaturesAr: ['معالج Google Tensor G4', 'ذاكرة عشوائية قياسية 16 جيجابايت', 'شاشة Super Actua بسطوع 3000 شمعة', '7 سنوات من تحديثات النظام والأمان'],
    dataSource: 'Google Store Official Specifications & Regulatory Submissions',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },

  // =================== LAPTOPS ===================
  {
    id: 'macbook-pro-14-m4',
    slug: 'apple-macbook-pro-14-m4',
    brand: 'Apple',
    model: 'MacBook Pro 14 (M4 Pro)',
    category: 'laptops',
    releaseYear: 2024,
    descriptionEn: 'Professional 14.2-inch workstation laptop powered by the Apple M4 Pro chip with Liquid Retina XDR mini-LED display and Thunderbolt 5 support.',
    descriptionAr: 'لابتوب احترافي بشاشة Liquid Retina XDR مقاس 14.2 بوصة mini-LED ومعالج Apple M4 Pro فائق الكفاءة ومنافذ Thunderbolt 5.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Apple MacBook Pro 14 Space Black',
    imageAltAr: 'ماك بوك برو 14 باللون الأسود الفضائي',
    prices: [
      {
        retailer: 'Official Apple Store (Ref)',
        price: 1999,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      },
      {
        retailer: 'Authorized Regional Tech (Ref)',
        price: 8499,
        currency: 'SAR',
        market: 'GCC (Reference MSRP)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'UK', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Display Diagonal', labelAr: 'مقاس الشاشة', valueEn: '14.2 inches', valueAr: '14.2 بوصة', isHighlight: true },
          { key: 'panel_type', labelEn: 'Panel Architecture', labelAr: 'نوع اللوحة', valueEn: 'Liquid Retina XDR Mini-LED (10,000 diodes)', valueAr: 'Liquid Retina XDR Mini-LED (10,000 صمام ضوئي)', isHighlight: true },
          { key: 'resolution', labelEn: 'Native Resolution', labelAr: 'الدقة الأصلية', valueEn: '3024 x 1964 px (254 ppi)', valueAr: '3024 × 1964 بكسل (254 بكسل/بوصة)' },
          { key: 'refresh_rate', labelEn: 'ProMotion Rate', labelAr: 'معدل التحديث', valueEn: 'Up to 120 Hz Adaptive', valueAr: 'حتى 120 هرتز تكيفي' },
          { key: 'peak_brightness', labelEn: 'SDR / XDR Peak Brightness', labelAr: 'السطوع الأقصى SDR / XDR', valueEn: '1000 nits sustained SDR / 1600 nits peak HDR', valueAr: '1000 شمعة SDR مستمر / 1600 شمعة HDR ذروة' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'System on Chip', labelAr: 'المعالج الرئيسي', valueEn: 'Apple M4 Pro (3nm Process)', valueAr: 'Apple M4 Pro (معمارية 3 نانومتر)', isHighlight: true, source: 'Apple Architecture Whitepaper' },
          { key: 'cpu_cores', labelEn: 'CPU Breakdown', labelAr: 'تكوين الأنوية', valueEn: '12-core or 14-core CPU', valueAr: '12 نواة أو 14 نواة للمعالجة' },
          { key: 'gpu_cores', labelEn: 'GPU Cores', labelAr: 'أنوية معالج الرسوم', valueEn: '16-core or 20-core GPU (Dynamic Caching)', valueAr: '16 نواة أو 20 نواة رسوميات مع Dynamic Caching' },
          { key: 'unified_memory', labelEn: 'Unified Memory', labelAr: 'الذاكرة الموحدة', valueEn: '24 GB or 48 GB Unified RAM (273 GB/s bandwidth)', valueAr: '24 أو 48 جيجابايت رام موحدة (نطاق ترددي 273 جيجابايت/ثانية)', isHighlight: true },
          { key: 'storage_options', labelEn: 'Storage Config', labelAr: 'سعة التخزين', valueEn: '512GB, 1TB, 2TB, 4TB SSD', valueAr: '512 جيجابايت، 1، 2، 4 تيرابايت SSD' }
        ]
      },
      {
        titleEn: 'Battery & Ports',
        titleAr: 'البطارية والمنافذ',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Whr', labelAr: 'سعة البطارية (واط/ساعة)', valueEn: '72.4 Wh Lithium-polymer', valueAr: '72.4 واط/ساعة ليثيوم بوليمر' },
          { key: 'battery_life', labelEn: 'Rated Endurance', labelAr: 'عمر البطارية المقدر', valueEn: 'Up to 22 hours video streaming', valueAr: 'حتى 22 ساعة بث فيديو', source: 'Apple Battery Testing Disclosures' },
          { key: 'ports', labelEn: 'I/O Ports', labelAr: 'المنافذ والتوصيل', valueEn: '3x Thunderbolt 5 (USB-C), HDMI 2.1, SDXC slot, MagSafe 3, 3.5mm jack', valueAr: '3 منافذ Thunderbolt 5، منفذ HDMI 2.1، قارئ SDXC، منفذ MagSafe 3، مقبس 3.5 مم', isHighlight: true }
        ]
      },
      {
        titleEn: 'Physical Specifications',
        titleAr: 'الأبعاد والوزن',
        items: [
          { key: 'weight', labelEn: 'Chassis Weight', labelAr: 'الوزن', valueEn: '1.60 kg (3.53 lbs)', valueAr: '1.60 كجم' },
          { key: 'thickness', labelEn: 'Thickness', labelAr: 'السُمك', valueEn: '15.5 mm (0.61 in)', valueAr: '15.5 مم' }
        ]
      }
    ],
    keyFeaturesEn: ['Apple M4 Pro 3nm Architecture', 'Thunderbolt 5 (Up to 120 Gbps)', 'Liquid Retina XDR Mini-LED', '22-hour battery endurance'],
    keyFeaturesAr: ['معمارية Apple M4 Pro بتقنية 3 نانومتر', 'منافذ Thunderbolt 5 بسرعة 120 جيجابت/ثانية', 'شاشة Liquid Retina XDR Mini-LED', 'بطارية تدوم حتى 22 ساعة'],
    dataSource: 'Apple Product Hardware Specifications (A3112 Spec Sheet)',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'dell-xps-14-9440',
    slug: 'dell-xps-14-9440',
    brand: 'Dell',
    model: 'XPS 14 (9440)',
    category: 'laptops',
    releaseYear: 2024,
    descriptionEn: 'CNC-machined aluminum laptop featuring Intel Core Ultra 7 processor, optional 3.2K OLED touch display, capacitive touch function row, and seamless glass haptic touchpad.',
    descriptionAr: 'لابتوب ألومنيوم مصنع بتقنية CNC بمعالج Intel Core Ultra 7 وشاشة لمسية 3.2K OLED اختيارية وشريط وظائف لمسي ولوحة لمس زجاجية غير مرئية.',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Dell XPS 14 Platinum Aluminum',
    imageAltAr: 'ديل إكس بي إس 14 بلاتينيوم ألومنيوم',
    prices: [
      {
        retailer: 'Dell Direct (Ref)',
        price: 1699,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Display Diagonal', labelAr: 'مقاس الشاشة', valueEn: '14.5 inches (16:10)', valueAr: '14.5 بوصة (نسبة 16:10)', isHighlight: true },
          { key: 'panel_type', labelEn: 'Panel Architecture', labelAr: 'نوع اللوحة', valueEn: '3.2K InfinityEdge OLED Touch or FHD+ IPS', valueAr: '3.2K InfinityEdge OLED لمسية أو FHD+ IPS', isHighlight: true },
          { key: 'resolution', labelEn: 'Native Resolution', labelAr: 'الدقة الأصلية', valueEn: '3200 x 2000 px (OLED config)', valueAr: '3200 × 2000 بكسل (لنسخة OLED)' },
          { key: 'refresh_rate', labelEn: 'Refresh Rate', labelAr: 'معدل التحديث', valueEn: '48-120 Hz Variable', valueAr: '48-120 هرتز متغير' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'System on Chip', labelAr: 'المعالج الرئيسي', valueEn: 'Intel Core Ultra 7 155H (Meteor Lake)', valueAr: 'Intel Core Ultra 7 155H', isHighlight: true, source: 'Intel ARK Database' },
          { key: 'cpu_cores', labelEn: 'CPU Breakdown', labelAr: 'تكوين الأنوية', valueEn: '16 cores (6 Performance + 8 Efficient + 2 Low-power E-cores)', valueAr: '16 نواة (6 أداء + 8 كفاءة + 2 طاقة منخفضة)' },
          { key: 'gpu_cores', labelEn: 'Discrete / Integrated GPU', labelAr: 'بطاقة الرسوميات', valueEn: 'Intel Arc Graphics (Optional RTX 4050 30W)', valueAr: 'Intel Arc المدمجة (أو RTX 4050 بقدرة 30 واط اختيارية)' },
          { key: 'unified_memory', labelEn: 'System RAM', labelAr: 'الذاكرة العشوائية', valueEn: '16 GB or 32 GB LPDDR5X (7467 MT/s soldered)', valueAr: '16 أو 32 جيجابايت LPDDR5X ملحومة' },
          { key: 'storage_options', labelEn: 'Storage Config', labelAr: 'سعة التخزين', valueEn: '512GB, 1TB, 2TB PCIe 4.0 NVMe SSD', valueAr: '512 جيجابايت، 1، 2 تيرابايت PCIe 4.0 SSD' }
        ]
      },
      {
        titleEn: 'Battery & Ports',
        titleAr: 'البطارية والمنافذ',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Whr', labelAr: 'سعة البطارية (واط/ساعة)', valueEn: '69.5 Wh integrated', valueAr: '69.5 واط/ساعة مدمجة' },
          { key: 'ports', labelEn: 'I/O Ports', labelAr: 'المنافذ والتوصيل', valueEn: '3x Thunderbolt 4 (USB-C), MicroSD slot, 3.5mm jack', valueAr: '3 منافذ Thunderbolt 4، منفذ MicroSD، مقبس 3.5 مم' }
        ]
      },
      {
        titleEn: 'Physical Specifications',
        titleAr: 'الأبعاد والوزن',
        items: [
          { key: 'weight', labelEn: 'Chassis Weight', labelAr: 'الوزن', valueEn: '1.68 kg (3.7 lbs OLED model)', valueAr: '1.68 كجم (موديل OLED)' },
          { key: 'thickness', labelEn: 'Thickness', labelAr: 'السُمك', valueEn: '18.0 mm (0.71 in)', valueAr: '18.0 مم' }
        ]
      }
    ],
    keyFeaturesEn: ['Intel Core Ultra 7 155H Processor', 'Vibrant 3.2K 120Hz OLED Touchscreen', 'Seamless Invisible Glass Trackpad', 'Precision CNC Aluminum Chassis'],
    keyFeaturesAr: ['معالج Intel Core Ultra 7 155H مع وحدة NPU', 'شاشة 3.2K OLED بتردد 120 هرتز ولمس دقيق', 'لوحة لمس زجاجية غير مرئية سلسة', 'هيكل ألومنيوم CNC عالي الدقة'],
    dataSource: 'Dell Official XPS 9440 Specification Reference Manual',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'thinkpad-x1-carbon-gen-12',
    slug: 'lenovo-thinkpad-x1-carbon-gen-12',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon Gen 12',
    category: 'laptops',
    releaseYear: 2024,
    descriptionEn: 'Flagship enterprise ultralight laptop built from aerospace carbon fiber and magnesium, weighing just 1.09 kg with Intel Core Ultra silicon and TrackPoint haptic controls.',
    descriptionAr: 'لابتوب أعمال فائق الخفة مصنوع من ألياف الكربون الفضائية والمغنيسيوم بوزن 1.09 كجم فقط مع معالجات Intel Core Ultra ونظام TrackPoint المطور.',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Lenovo ThinkPad X1 Carbon Gen 12',
    imageAltAr: 'لينوفو ثينك باد إكس 1 كاربون الجيل 12',
    prices: [
      {
        retailer: 'Lenovo Official Store (Ref)',
        price: 1749,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Display Diagonal', labelAr: 'مقاس الشاشة', valueEn: '14.0 inches (16:10)', valueAr: '14.0 بوصة (نسبة 16:10)', isHighlight: true },
          { key: 'panel_type', labelEn: 'Panel Architecture', labelAr: 'نوع اللوحة', valueEn: '2.8K OLED (2880x1800) 120Hz or Low Power IPS (1920x1200)', valueAr: '2.8K OLED بتردد 120 هرتز أو IPS منخفض الطاقة' },
          { key: 'resolution', labelEn: 'Native Resolution', labelAr: 'الدقة الأصلية', valueEn: '2880 x 1800 px', valueAr: '2880 × 1800 بكسل' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'System on Chip', labelAr: 'المعالج الرئيسي', valueEn: 'Intel Core Ultra 7 165U / 155H vPro', valueAr: 'Intel Core Ultra 7 مع دعم vPro للأعمال', isHighlight: true },
          { key: 'unified_memory', labelEn: 'System RAM', labelAr: 'الذاكرة العشوائية', valueEn: '16GB, 32GB, 64GB LPDDR5X soldered', valueAr: '16، 32، 64 جيجابايت LPDDR5X' },
          { key: 'storage_options', labelEn: 'Storage Config', labelAr: 'سعة التخزين', valueEn: '512GB up to 2TB M.2 2280 NVMe SSD', valueAr: '512 جيجابايت حتى 2 تيرابايت SSD' }
        ]
      },
      {
        titleEn: 'Battery & Ports',
        titleAr: 'البطارية والمنافذ',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Whr', labelAr: 'سعة البطارية', valueEn: '57 Whr Rapid Charge', valueAr: '57 واط/ساعة مع شحن سريع' },
          { key: 'ports', labelEn: 'I/O Ports', labelAr: 'المنافذ', valueEn: '2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, 3.5mm jack, optional Nano SIM', valueAr: '2 Thunderbolt 4، 2 USB-A، منفذ HDMI 2.1، مقبس 3.5 مم', isHighlight: true }
        ]
      },
      {
        titleEn: 'Physical Specifications',
        titleAr: 'الأبعاد والوزن',
        items: [
          { key: 'weight', labelEn: 'Chassis Weight', labelAr: 'الوزن', valueEn: '1.09 kg (2.42 lbs)', valueAr: '1.09 كجم فقط', isHighlight: true }
        ]
      }
    ],
    keyFeaturesEn: ['Ultra-Lightweight 1.09kg Carbon Fiber', 'MIL-STD-810H Military Durability', 'Dual Thunderbolt 4 + Native USB-A Ports', 'Enterprise vPro Hardware Security'],
    keyFeaturesAr: ['وزن فائق الخفة 1.09 كجم بألياف الكربون', 'صلابة عسكرية معيار MIL-STD-810H', 'منافذ كاملة تشمل Thunderbolt 4 وUSB-A التقليدي', 'حماية أمنية للشركات عبر منصة vPro'],
    dataSource: 'Lenovo PSREF (Product Specifications Reference)',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },

  // =================== TABLETS ===================
  {
    id: 'ipad-pro-13-m4',
    slug: 'apple-ipad-pro-13-m4',
    brand: 'Apple',
    model: 'iPad Pro 13 (M4)',
    category: 'tablets',
    releaseYear: 2024,
    descriptionEn: 'The thinnest Apple product ever at 5.1 mm, featuring a revolutionary Tandem Ultra Retina XDR OLED display, Apple M4 silicon, and Apple Pencil Pro support.',
    descriptionAr: 'أنحف منتج صنعته آبل بسُمك 5.1 مم فقط، مع شاشة Tandem Ultra Retina XDR OLED الثورية، معالج M4، ودعم قلم Apple Pencil Pro.',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Apple iPad Pro 13 M4 with Magic Keyboard',
    imageAltAr: 'آبل آيباد برو 13 بمعالج M4 مع لوحة المفاتيح',
    prices: [
      {
        retailer: 'Official Apple Store (Ref)',
        price: 1299,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Screen Size', labelAr: 'حجم الشاشة', valueEn: '13.0 inches', valueAr: '13.0 بوصة', isHighlight: true },
          { key: 'panel_type', labelEn: 'Panel Technology', labelAr: 'تقنية اللوحة', valueEn: 'Tandem OLED Ultra Retina XDR (Two stacked OLED layers)', valueAr: 'Tandem OLED مزدوجة الطبقات Ultra Retina XDR', isHighlight: true, source: 'Apple Display Technical Brief' },
          { key: 'resolution', labelEn: 'Resolution', labelAr: 'الدقة', valueEn: '2752 x 2064 px (264 ppi)', valueAr: '2752 × 2064 بكسل' },
          { key: 'refresh_rate', labelEn: 'Refresh Rate', labelAr: 'معدل التحديث', valueEn: '10-120 Hz ProMotion', valueAr: '10-120 هرتز ProMotion' },
          { key: 'peak_brightness', labelEn: 'Peak Brightness', labelAr: 'السطوع الأقصى', valueEn: '1000 nits full-screen / 1600 nits peak HDR', valueAr: '1000 شمعة شاشة كاملة / 1600 شمعة ذروة HDR' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'Processor', labelAr: 'المعالج', valueEn: 'Apple M4 (9-core or 10-core CPU options)', valueAr: 'Apple M4 (خيارات 9 أو 10 أنوية)', isHighlight: true },
          { key: 'gpu_cores', labelEn: 'GPU Architecture', labelAr: 'الرسوميات', valueEn: '10-core GPU with hardware ray tracing', valueAr: '10 أنوية رسومية مع تتبع الأشعة العتادي' },
          { key: 'base_ram', labelEn: 'Memory', labelAr: 'الذاكرة العشوائية', valueEn: '8 GB (256/512GB) or 16 GB (1TB/2TB models)', valueAr: '8 جيجابايت أو 16 جيجابايت للموديلات الكبيرة' }
        ]
      },
      {
        titleEn: 'Dimensions & Weight',
        titleAr: 'الأبعاد والوزن',
        items: [
          { key: 'thickness', labelEn: 'Chassis Profile', labelAr: 'السُمك', valueEn: '5.1 mm (0.20 in)', valueAr: '5.1 مم فقط (أنحف أجهزة آبل)', isHighlight: true },
          { key: 'weight', labelEn: 'Device Weight', labelAr: 'الوزن', valueEn: '579 g (1.28 lbs)', valueAr: '579 جرام' }
        ]
      }
    ],
    keyFeaturesEn: ['Tandem Dual-Layer OLED Display', 'Apple M4 Generation Silicon', 'Ultra-Slim 5.1mm Aluminum Profile', 'Apple Pencil Pro Squeeze & Haptic Feedback'],
    keyFeaturesAr: ['شاشة Tandem OLED مزدوجة الطبقات', 'معالج Apple M4 من الجيل الجديد', 'سُمك فائق النحافة 5.1 مم', 'دعم قلم Apple Pencil Pro مع استجابة لمسية'],
    dataSource: 'Apple Official Technical Specifications (A2925/A2926 Series)',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'galaxy-tab-s10-ultra',
    slug: 'samsung-galaxy-tab-s10-ultra',
    brand: 'Samsung',
    model: 'Galaxy Tab S10 Ultra',
    category: 'tablets',
    releaseYear: 2024,
    descriptionEn: 'Massive 14.6-inch Dynamic AMOLED 2X productivity slate with anti-reflective glass, MediaTek Dimensity 9300+ flagship silicon, IP68 water resistance, and bundled S Pen.',
    descriptionAr: 'جهاز لوحي عملاق بشاشة مقاس 14.6 بوصة Dynamic AMOLED 2X بطبقة مضادة للانعكاس، معالج Dimensity 9300+، مقاومة الماء IP68، وقلم S Pen مرفق في العلبة.',
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Samsung Galaxy Tab S10 Ultra Moonstone Gray',
    imageAltAr: 'سامسونج جالكسي تاب S10 الترا رمادي مونستون',
    prices: [
      {
        retailer: 'Official Samsung Store (Ref)',
        price: 1199,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Display',
        titleAr: 'الشاشة',
        items: [
          { key: 'screen_size', labelEn: 'Screen Size', labelAr: 'حجم الشاشة', valueEn: '14.6 inches (16:10)', valueAr: '14.6 بوصة (نسبة 16:10)', isHighlight: true },
          { key: 'panel_type', labelEn: 'Panel Technology', labelAr: 'تقنية اللوحة', valueEn: 'Dynamic AMOLED 2X with Anti-Reflective Coating', valueAr: 'Dynamic AMOLED 2X بطبقة مضادة للانعكاس', isHighlight: true },
          { key: 'resolution', labelEn: 'Resolution', labelAr: 'الدقة', valueEn: '2960 x 1848 px (WQXGA+, 240 ppi)', valueAr: '2960 × 1848 بكسل' },
          { key: 'refresh_rate', labelEn: 'Refresh Rate', labelAr: 'معدل التحديث', valueEn: 'Up to 120 Hz', valueAr: 'حتى 120 هرتز' }
        ]
      },
      {
        titleEn: 'Performance & Silicon',
        titleAr: 'المعالج والأداء',
        items: [
          { key: 'chipset', labelEn: 'Processor', labelAr: 'المعالج', valueEn: 'MediaTek Dimensity 9300+ (4nm All-Big-Core)', valueAr: 'MediaTek Dimensity 9300+ (معمارية 4 نانومتر بالأنوية الكبيرة)', isHighlight: true },
          { key: 'base_ram', labelEn: 'Memory', labelAr: 'الذاكرة العشوائية', valueEn: '12 GB or 16 GB', valueAr: '12 أو 16 جيجابايت' }
        ]
      },
      {
        titleEn: 'Battery & Durability',
        titleAr: 'البطارية والمتانة',
        items: [
          { key: 'battery_capacity', labelEn: 'Battery Size', labelAr: 'سعة البطارية', valueEn: '11200 mAh', valueAr: '11200 مللي أمبير', isHighlight: true },
          { key: 'charging_wired', labelEn: 'Wired Fast Charging', labelAr: 'الشحن السريع', valueEn: '45W Fast Charging (Charger sold separately)', valueAr: '45 واط شحن سلكي سريع' },
          { key: 'water_resistance', labelEn: 'Ingress Protection', labelAr: 'مقاومة الماء والغبار', valueEn: 'IP68 Certified (Tablet & S Pen)', valueAr: 'معيار IP68 مقاوم للماء للتابلت والقلم معاً' }
        ]
      }
    ],
    keyFeaturesEn: ['Expansive 14.6-inch AMOLED 2X Canvas', 'IP68 Water Resistance for Tablet & Pen', 'Included Low-Latency S Pen', 'Samsung DeX Desktop Multitasking Mode'],
    keyFeaturesAr: ['شاشة سينمائية ضخمة 14.6 بوصة AMOLED', 'مقاومة الماء والغبار معيار IP68 للتابلت والقلم', 'قلم S Pen مرفق بالعلبة بدون تكلفة إضافية', 'وضع DeX لتحويل الواجهة لنظام حاسوب مكتبي'],
    dataSource: 'Samsung Electronics Global Specification Data Sheet',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },

  // =================== HEADPHONES ===================
  {
    id: 'sony-wh-1000xm5',
    slug: 'sony-wh-1000xm5',
    brand: 'Sony',
    model: 'WH-1000XM5',
    category: 'headphones',
    releaseYear: 2022,
    descriptionEn: 'Industry-leading noise canceling over-ear headphones featuring dual processors, 8 microphones with Auto NC Optimizer, and custom carbon-composite 30mm drivers.',
    descriptionAr: 'سماعات رأس رائدة في إلغاء الضوضاء بمعالجين مخصصين، 8 ميكروفونات مع محسن عزل تلقائي، ومحركات كربونية مقاس 30 مم.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Sony WH-1000XM5 Silver Over-Ear Headphones',
    imageAltAr: 'سماعات سوني WH-1000XM5 باللون الفضي',
    prices: [
      {
        retailer: 'Sony Direct Store (Ref)',
        price: 399,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Acoustics & Drivers',
        titleAr: 'الصوتيات والمحركات',
        items: [
          { key: 'driver_size', labelEn: 'Acoustic Driver', labelAr: 'قطر المحرك الصوتي', valueEn: '30 mm Carbon Fiber Composite Dome', valueAr: '30 مم قبة من ألياف الكربون المركبة', isHighlight: true, source: 'Sony Engineering Spec Sheet' },
          { key: 'frequency_response', labelEn: 'Frequency Response', labelAr: 'الاستجابة الترددية', valueEn: '4 Hz - 40,000 Hz (JEITA)', valueAr: '4 هرتز إلى 40,000 هرتز' },
          { key: 'bluetooth_codecs', labelEn: 'Supported Codecs', labelAr: 'ترميزات البلوتوث', valueEn: 'LDAC, AAC, SBC (Hi-Res Audio Wireless)', valueAr: 'LDAC، AAC، SBC (صوت لاسلكي عالي الدقة)', isHighlight: true }
        ]
      },
      {
        titleEn: 'Noise Canceling & Voice',
        titleAr: 'عزل الضوضاء والمكالمات',
        items: [
          { key: 'nc_processors', labelEn: 'ANC Processors', labelAr: 'معالجات العزل', valueEn: 'Integrated Processor V1 + HD Noise Cancelling Processor QN1', valueAr: 'معالج V1 مدمج + معالج QN1 المخصص للعزل', isHighlight: true },
          { key: 'microphones', labelEn: 'Microphone Array', labelAr: 'مصفوفة الميكروفونات', valueEn: '8 microphones (4 beamforming with AI DNN voice pick-up)', valueAr: '8 ميكروفونات (4 لتشكيل الحزم الصوتية وخوارزمية ذكاء اصطناعي)' }
        ]
      },
      {
        titleEn: 'Battery & Connectivity',
        titleAr: 'البطارية والاتصال',
        items: [
          { key: 'battery_life_anc', labelEn: 'Battery with ANC On', labelAr: 'عمر البطارية مع تشغيل العزل', valueEn: 'Up to 30 hours (40 hours with ANC Off)', valueAr: 'حتى 30 ساعة (40 ساعة عند إيقاف العزل)', isHighlight: true },
          { key: 'quick_charge', labelEn: 'Quick Charge Capability', labelAr: 'الشحن السريع', valueEn: '3 min charge yields up to 3 hours playback (USB-PD)', valueAr: '3 دقائق شحن تمنح 3 ساعات تشغيل عبر شاحن USB-PD' },
          { key: 'weight', labelEn: 'Headphone Weight', labelAr: 'الوزن', valueEn: '250 g (8.8 oz)', valueAr: '250 جرام' }
        ]
      }
    ],
    keyFeaturesEn: ['Dual Processors for Flagship ANC', 'Hi-Res Audio with Sony LDAC Codec', '30-Hour Battery with USB-PD Quick Charge', 'Speak-to-Chat & Multipoint Connection'],
    keyFeaturesAr: ['معالجان مستقلان لعزل ضجيج رائد عالمياً', 'صوت عالي الدقة يدعم ترميز LDAC اللاسلكي', 'بطارية 30 ساعة مع شحن فائق السرعة', 'التبديل التلقائي عند التحدث والاتصال بجهازين معاً'],
    dataSource: 'Sony Corporation Product Manual & Technical Specifications',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'bose-quietcomfort-ultra',
    slug: 'bose-quietcomfort-ultra-headphones',
    brand: 'Bose',
    model: 'QuietComfort Ultra',
    category: 'headphones',
    releaseYear: 2023,
    descriptionEn: 'Flagship wireless headphones featuring Bose Immersive Audio spatial sound virtualization, CustomTune acoustic calibration, and world-class quiet mode.',
    descriptionAr: 'سماعات بوز اللاسلكية الرائدة بتقنية الصوت المكاني Immersive Audio ومعايرة CustomTune التلقائية وعزل الضوضاء الأسطوري.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Bose QuietComfort Ultra Headphones Black',
    imageAltAr: 'سماعات بوز كوايت كومفورت الترا باللون الأسود',
    prices: [
      {
        retailer: 'Bose Direct (Ref)',
        price: 429,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Acoustics & Drivers',
        titleAr: 'الصوتيات والمحركات',
        items: [
          { key: 'spatial_audio', labelEn: 'Spatial Audio Engine', labelAr: 'محرك الصوت المكاني', valueEn: 'Bose Immersive Audio (Still and Motion modes)', valueAr: 'Bose Immersive Audio (وضعي الثبات والحركة)', isHighlight: true, source: 'Bose Technical Release' },
          { key: 'acoustic_tuning', labelEn: 'Personal Calibration', labelAr: 'المعايرة الشخصية', valueEn: 'CustomTune Technology (measures ear canal acoustic response)', valueAr: 'تقنية CustomTune تقيس استجابة القناة السمعية لكل أذن', isHighlight: true },
          { key: 'bluetooth_codecs', labelEn: 'Supported Codecs', labelAr: 'ترميزات البلوتوث', valueEn: 'Snapdragon Sound aptX Adaptive, AAC, SBC', valueAr: 'Snapdragon Sound aptX Adaptive، AAC، SBC' }
        ]
      },
      {
        titleEn: 'Battery & Physical',
        titleAr: 'البطارية والتصميم',
        items: [
          { key: 'battery_life_anc', labelEn: 'Battery Duration', labelAr: 'عمر البطارية', valueEn: 'Up to 24 hours (Up to 18 hours with Immersive Audio)', valueAr: 'حتى 24 ساعة (حتى 18 ساعة مع الصوت المكاني)', isHighlight: true },
          { key: 'headband_design', labelEn: 'Chassis Materials', labelAr: 'مواد التصنيع', valueEn: 'Cast aluminum arms, protein leather ear cushions', valueAr: 'أذرع ألومنيوم مصبوبة ووسائد جلد بروتيني مريح' },
          { key: 'weight', labelEn: 'Weight', labelAr: 'الوزن', valueEn: '252 g (8.9 oz)', valueAr: '252 جرام' }
        ]
      }
    ],
    keyFeaturesEn: ['Bose Immersive Audio Spatial Virtualization', 'CustomTune Automated Ear Canal Calibration', 'Snapdragon Sound aptX Adaptive Codec', 'Collapsible Fold-Flat Travel Design'],
    keyFeaturesAr: ['صوت مكاني غامر Bose Immersive Audio', 'معايرة صوتية شخصية مخصصة للأذن CustomTune', 'دعم ترميز aptX Adaptive الصوتي فائق الدقة', 'تصميم قابل للطي الكامل لسهولة السفر'],
    dataSource: 'Bose Corporation Technical Documentation & User Guides',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },

  // =================== SMARTWATCHES ===================
  {
    id: 'apple-watch-ultra-2',
    slug: 'apple-watch-ultra-2',
    brand: 'Apple',
    model: 'Apple Watch Ultra 2',
    category: 'smartwatches',
    releaseYear: 2024,
    descriptionEn: 'Rugged 49mm aerospace-grade titanium multisport smartwatch powered by the S9 SiP, 3000-nit display, precision dual-frequency GPS, and up to 72 hours in Low Power Mode.',
    descriptionAr: 'ساعة رياضية متينة بمقاس 49 مم من التيتانيوم الفضائي ومعالج S9 SiP، شاشة بسطوع 3000 شمعة، نظام GPS مزدوج التردد، وبطارية حتى 72 ساعة في وضع توفير الطاقة.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Apple Watch Ultra 2 with Ocean Band',
    imageAltAr: 'ساعة آبل واتش الترا 2 مع سوار المحيط',
    prices: [
      {
        retailer: 'Official Apple Store (Ref)',
        price: 799,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Display & Chassis',
        titleAr: 'الشاشة والهيكل',
        items: [
          { key: 'case_size', labelEn: 'Case Size & Material', labelAr: 'حجم الهيكل والمادة', valueEn: '49mm Natural or Black Titanium (Grade 5)', valueAr: '49 مم تيتانيوم طبيعي أو أسود فئة 5', isHighlight: true, source: 'Apple Ultra Tech Sheet' },
          { key: 'peak_brightness', labelEn: 'Display Brightness', labelAr: 'سطوع الشاشة', valueEn: '3000 nits Peak (down to 1 nit in darkness)', valueAr: '3000 شمعة ذروة (وتنخفض إلى 1 شمعة في الظلام)', isHighlight: true },
          { key: 'crystal', labelEn: 'Screen Cover', labelAr: 'زجاج الحماية', valueEn: 'Flat Sapphire Front Crystal with display edge protection', valueAr: 'كريستال ياقوتي مسطح مع حواف مرتفعة للحماية' }
        ]
      },
      {
        titleEn: 'Sensors & Metrics',
        titleAr: 'المستشعرات والقياسات',
        items: [
          { key: 'gps_type', labelEn: 'Satellite Navigation', labelAr: 'الملاحة بالأقمار الصناعية', valueEn: 'Precision Dual-Frequency GPS (L1 and L5)', valueAr: 'نظام GPS دقيق مزدوج التردد (نطاقي L1 وL5)', isHighlight: true },
          { key: 'depth_gauge', labelEn: 'Water & Diving Specs', labelAr: 'مواصفات الغوص والماء', valueEn: '100m water resistance, EN13319 certified dive computer to 40m', valueAr: 'مقاومة ماء 100 متر، ومعتمدة ككمبيوتر غوص حتى 40 متراً (EN13319)' },
          { key: 'health_sensors', labelEn: 'Biometric Array', labelAr: 'المستشعرات الحيوية', valueEn: 'Electrical heart sensor (ECG), Third-gen optical heart sensor, Dual water temp sensors', valueAr: 'مستشعر تخطيط القلب الكهربائي ECG، مستشعر بصري جيل ثالث، مستشعران لحرارة الماء' }
        ]
      },
      {
        titleEn: 'Battery & Processing',
        titleAr: 'البطارية والمعالجة',
        items: [
          { key: 'processor', labelEn: 'System in Package', labelAr: 'المعالج', valueEn: 'Apple S9 SiP (64-bit dual-core + 4-core Neural Engine)', valueAr: 'Apple S9 SiP مع محرك عصبي رباعي النواة' },
          { key: 'battery_endurance', labelEn: 'Battery Duration', labelAr: 'عمر البطارية', valueEn: 'Up to 36 hours standard use / Up to 72 hours in Low Power Mode', valueAr: 'حتى 36 ساعة استخدام عادي / حتى 72 ساعة بوضع توفير الطاقة', isHighlight: true }
        ]
      }
    ],
    keyFeaturesEn: ['Blazing 3000 nits Always-On OLED', 'Precision Dual-Frequency L1/L5 GPS', 'EN13319 Certified 40m Recreational Dive Computer', 'Up to 72h Low Power Endurance'],
    keyFeaturesAr: ['شاشة OLED فائقة السطوع 3000 شمعة', 'نظام ملاحة دقيق ثنائي التردد L1/L5', 'معتمدة للغوص الترفيهي حتى 40 متراً بمعيار EN13319', 'عمر بطارية يصل إلى 72 ساعة بوضع توفير الطاقة'],
    dataSource: 'Apple Watch Ultra 2 Technical Specifications Documentation',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'garmin-fenix-8-51mm',
    slug: 'garmin-fenix-8-51mm-amoled',
    brand: 'Garmin',
    model: 'Fenix 8 (51mm AMOLED)',
    category: 'smartwatches',
    releaseYear: 2024,
    descriptionEn: 'The definitive outdoor multisport adventure watch equipped with a vibrant 1.4-inch AMOLED display, leakproof inductive buttons, mic/speaker, and up to 29 days of battery life.',
    descriptionAr: 'ساعة المغامرات والرياضات المتعددة الرائدة بشاشة AMOLED مقاس 1.4 بوصة، أزرار حثية مانعة لتسرب الماء، ميكروفون ومكبر صوت، وبطارية تدوم حتى 29 يوماً.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Garmin Fenix 8 51mm AMOLED Titanium',
    imageAltAr: 'جارمن فينكس 8 مقاس 51 مم بشاشة أموليد',
    prices: [
      {
        retailer: 'Garmin Official (Ref)',
        price: 1099,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Display & Chassis',
        titleAr: 'الشاشة والهيكل',
        items: [
          { key: 'case_size', labelEn: 'Case Size & Bezel', labelAr: 'حجم الهيكل والإطار', valueEn: '51 mm Titanium bezel with fiber-reinforced polymer', valueAr: '51 مم إطار تيتانيوم وهيكل بوليمر مقوى بالألياف', isHighlight: true, source: 'Garmin Product Specifications Sheet' },
          { key: 'display_tech', labelEn: 'Display Architecture', labelAr: 'نوع الشاشة', valueEn: '1.4-inch AMOLED (454 x 454 px) with Sapphire crystal', valueAr: '1.4 بوصة AMOLED بدقة 454 × 454 بكسل مع زجاج ياقوتي' }
        ]
      },
      {
        titleEn: 'Sensors & Diving',
        titleAr: 'المستشعرات والغوص',
        items: [
          { key: 'gps_type', labelEn: 'Multi-GNSS Navigation', labelAr: 'الملاحة المتعددة', valueEn: 'Multi-Band GPS with SatIQ technology (Auto-selects optimal satellite band)', valueAr: 'نظام GPS متعدد النطاقات مع تقنية SatIQ للاختيار التلقائي للتردد', isHighlight: true },
          { key: 'dive_rating', labelEn: 'Dive Computer Capability', labelAr: 'قدرات الغوص', valueEn: '40m scuba dive rating with leakproof inductive buttons', valueAr: 'معتمدة للغوص حتى 40 متراً مع أزرار حثية مانعة للتسرب' },
          { key: 'sensor_suite', labelEn: 'Biometric Metrics', labelAr: 'القياسات الحيوية', valueEn: 'Elevate Gen 5 Heart Rate, ECG App support, Pulse Ox blood oxygen', valueAr: 'مستشعر نبض Elevate الجيل الخامس، تطبيق تخطيط القلب، أكسجين الدم Pulse Ox' }
        ]
      },
      {
        titleEn: 'Battery Longevity',
        titleAr: 'عمر البطارية',
        items: [
          { key: 'smartwatch_battery', labelEn: 'Smartwatch Mode Battery', labelAr: 'وضع الساعة الذكية العادي', valueEn: 'Up to 29 days (13 days always-on)', valueAr: 'حتى 29 يوماً (13 يوماً مع تشغيل الشاشة الدائم)', isHighlight: true },
          { key: 'gps_battery', labelEn: 'All Satellite Systems GPS', labelAr: 'وضع الملاحة بجميع الأقمار', valueEn: 'Up to 68 hours (47 hours always-on)', valueAr: 'حتى 68 ساعة تتبع مستمر' }
        ]
      }
    ],
    keyFeaturesEn: ['Incredible 29-Day Smartwatch Battery Life', 'Brilliant 1.4-inch AMOLED + Sapphire Glass', 'Multi-Band GPS with SatIQ Auto Optimization', 'Leakproof Inductive Buttons & 40m Dive Rating'],
    keyFeaturesAr: ['بطارية مذهلة تدوم حتى 29 يوماً في وضع الساعة', 'شاشة AMOLED مقاس 1.4 بوصة ساطعة مع زجاج ياقوتي', 'نظام ملاحة متعدد النطاقات مع ذكاء SatIQ لتوفير الطاقة', 'أزرار حثية مانعة للتسرب وتصنيف غوص احترافي حتى 40 متراً'],
    dataSource: 'Garmin International Engineering Datasheet',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },

  // =================== MONITORS ===================
  {
    id: 'lg-ultragear-32gs95ue',
    slug: 'lg-ultragear-oled-32-32gs95ue',
    brand: 'LG',
    model: 'UltraGear 32GS95UE',
    category: 'monitors',
    releaseYear: 2024,
    descriptionEn: 'Revolutionary Dual-Mode 31.5-inch WOLED gaming monitor capable of switching instantly between 4K at 240Hz and FHD at 480Hz with a blisteringly fast 0.03ms response time.',
    descriptionAr: 'شاشة ألعاب ثورية بتقنية WOLED مقاس 31.5 بوصة بنظام التبديل المزدوج الفوري بين دقة 4K بتردد 240 هرتز ودقة FHD بتردد 480 هرتز مع زمن استجابة 0.03 مللي ثانية.',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'LG UltraGear OLED 32 Gaming Monitor',
    imageAltAr: 'شاشة إل جي التراجير أوليد 32 بوصة للألعاب',
    prices: [
      {
        retailer: 'LG Electronics Store (Ref)',
        price: 1399,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Panel & Display',
        titleAr: 'اللوحة والشاشة',
        items: [
          { key: 'panel_type', labelEn: 'Panel Chemistry', labelAr: 'نوع اللوحة', valueEn: 'WOLED with Micro Lens Array (MLA+)', valueAr: 'WOLED مع عدسات مجهرية MLA+', isHighlight: true, source: 'LG Electronics Spec Sheet' },
          { key: 'screen_size', labelEn: 'Screen Diagonal', labelAr: 'حجم الشاشة', valueEn: '31.5 inches (16:9 flat)', valueAr: '31.5 بوصة (نسبة 16:9 مسطحة)' },
          { key: 'dual_mode', labelEn: 'Dual-Hz Operation', labelAr: 'الوضع الترددي المزدوج', valueEn: '4K (3840x2160) @ 240Hz OR 1080p (1920x1080) @ 480Hz', valueAr: '4K بتردد 240 هرتز أو 1080p بتردد 480 هرتز', isHighlight: true },
          { key: 'response_time', labelEn: 'Pixel Response Time', labelAr: 'زمن استجابة البكسل', valueEn: '0.03 ms (GtG)', valueAr: '0.03 مللي ثانية (GtG)', isHighlight: true },
          { key: 'contrast_ratio', labelEn: 'Native Contrast', labelAr: 'نسبة التباين الأصلية', valueEn: '1,500,000:1 (Infinite true blacks)', valueAr: '1,500,000:1 (سواد حقيقي لا نهائي)' }
        ]
      },
      {
        titleEn: 'Connectivity & Audio',
        titleAr: 'المنافذ والصوت',
        items: [
          { key: 'ports', labelEn: 'Video Inputs', labelAr: 'منافذ الفيديو', valueEn: '2x HDMI 2.1, 1x DisplayPort 1.4 (DSC), 2x USB 3.0 downstream', valueAr: '2 منفذ HDMI 2.1، منفذ DisplayPort 1.4 مع DSC، منفذان USB 3.0' },
          { key: 'audio_tech', labelEn: 'Integrated Audio', labelAr: 'الصوت المدمج', valueEn: 'Pixel Sound (Acoustic audio emitted through the OLED panel itself)', valueAr: 'Pixel Sound (صوت ينبعث من لوحة OLED نفسها)' }
        ]
      }
    ],
    keyFeaturesEn: ['Dual-Mode Instant Switching (4K 240Hz / FHD 480Hz)', '0.03ms Ultra-Low GtG Response Time', 'MLA+ WOLED Panel with Infinite Contrast', 'Acoustic Pixel Sound Panel'],
    keyFeaturesAr: ['تقنية Dual-Mode للتبديل الفوري بين 4K 240Hz وFHD 480Hz', 'زمن استجابة فائق السرعة 0.03 مللي ثانية', 'لوحة WOLED مع عدسات MLA+ وسواد لا نهائي', 'صوت Pixel Sound ينبعث مباشرة من سطح الشاشة'],
    dataSource: 'LG Electronics Official Product Documentation',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  },
  {
    id: 'dell-ultrasharp-32-u3224kb',
    slug: 'dell-ultrasharp-32-6k-u3224kb',
    brand: 'Dell',
    model: 'UltraSharp 32 6K (U3224KB)',
    category: 'monitors',
    releaseYear: 2023,
    descriptionEn: 'The worlds first 6K monitor with IPS Black technology, featuring 6144 x 3456 resolution, built-in 4K HDR webcam with echo-canceling mics, and 140W Thunderbolt 4 power delivery.',
    descriptionAr: 'أول شاشة بدقة 6K في العالم بتقنية IPS Black، بدقة 6144 × 3456 بكسل، كاميرا 4K HDR مدمجة وميكروفونات عازلة، وشحن بقوة 140 واط عبر Thunderbolt 4.',
    imageUrl: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
    imageAltEn: 'Dell UltraSharp 32 6K Monitor',
    imageAltAr: 'شاشة ديل الترا شارب 32 بدقة 6K',
    prices: [
      {
        retailer: 'Dell Store (Ref)',
        price: 2599,
        currency: 'USD',
        market: 'US (MSRP Reference)',
        isSampleData: true,
        priceUpdatedAt: '2026-03-01',
        inStock: true
      }
    ],
    availableMarkets: ['US', 'EU', 'GCC', 'Global'],
    specifications: [
      {
        titleEn: 'Panel & Display',
        titleAr: 'اللوحة والشاشة',
        items: [
          { key: 'panel_type', labelEn: 'Panel Chemistry', labelAr: 'نوع اللوحة', valueEn: 'IPS Black Technology (2000:1 contrast ratio)', valueAr: 'تقنية IPS Black (نسبة تباين 2000:1)', isHighlight: true, source: 'Dell Monitor Engineering Spec' },
          { key: 'screen_size', labelEn: 'Screen Diagonal', labelAr: 'حجم الشاشة', valueEn: '31.5 inches', valueAr: '31.5 بوصة' },
          { key: 'resolution', labelEn: 'Resolution', labelAr: 'الدقة', valueEn: '6144 x 3456 px (6K, 223 ppi)', valueAr: '6144 × 3456 بكسل (دقة 6K فائقة، 223 بكسل/بوصة)', isHighlight: true },
          { key: 'color_gamut', labelEn: 'Color Reproduction', labelAr: 'دقة الألوان', valueEn: '99% DCI-P3, 100% sRGB, 1.07 Billion Colors', valueAr: '99% DCI-P3، و100% sRGB، و1.07 مليار لون' }
        ]
      },
      {
        titleEn: 'Workstation Hub & Camera',
        titleAr: 'المحطة الشاملة والكاميرا',
        items: [
          { key: 'power_delivery', labelEn: 'Thunderbolt 4 Hub', labelAr: 'توصيل الطاقة', valueEn: 'Thunderbolt 4 with up to 140W PD, RJ45 2.5GbE LAN', valueAr: 'Thunderbolt 4 مع شحن بقوة 140 واط ومنفذ شبكة 2.5GbE', isHighlight: true },
          { key: 'webcam', labelEn: 'Built-in Webcam', labelAr: 'الكاميرا المدمجة', valueEn: '4K dual-gain HDR CMOS webcam with auto-framing', valueAr: 'كاميرا 4K بدقة عالية وتقنية HDR وتأطير تلقائي' }
        ]
      }
    ],
    keyFeaturesEn: ['Astonishing 6K Resolution (6144x3456)', 'IPS Black Panel with 2000:1 Contrast', 'Built-in 4K HDR Collaboration Webcam', '140W Thunderbolt 4 Single-Cable Docking'],
    keyFeaturesAr: ['دقة 6K استثنائية (6144 × 3456 بكسل)', 'لوحة IPS Black بتباين مضاعف 2000:1', 'كاميرا مدمجة 4K HDR مع ميكروفونات عازلة', 'قوة شحن هائلة 140 واط عبر كابل Thunderbolt 4 واحد'],
    dataSource: 'Dell Technologies U3224KB Hardware Datasheet',
    isSampleData: false,
    lastUpdated: '2026-03-01'
  }
];
