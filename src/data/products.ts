export interface Product {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: 'bridal-lehengas' | 'wedding-dresses' | 'sherwanis';
  categoryLabel: string;
  rentalPrice: string;
  securityDeposit?: string;
  originalPrice?: string;
  color: string;
  fabric: string;
  embroidery: string;
  occasion: string;
  description: string;
  includes: string[];
  images: string[];
  sizes: string[];
  rentalDays: string;
  isTrending?: boolean;
  metaDescription: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  // BRIDAL LEHENGAS
  {
    id: 'bl-1',
    slug: 'royal-heritage-crimson-velvet-lehenga',
    title: 'Royal Heritage Crimson Velvet Lehenga',
    subtitle: 'Signature Bridal Couture',
    category: 'bridal-lehengas',
    categoryLabel: 'Bridal Lehengas',
    rentalPrice: '₹8,999',
    securityDeposit: '₹5,000 (Refundable)',
    originalPrice: '₹85,000',
    color: 'Crimson Red & Antique Gold',
    fabric: 'Micro Velvet with Pure Silk Dupattas',
    embroidery: 'Handcrafted Zardozi, Dabka & Tilla Needlework',
    occasion: 'Wedding Day, Anand Karaj, Phere',
    description: 'An iconic bridal masterpiece crafted in lush crimson velvet with high-density handcrafted zardozi embroidery. Accompanied by a dual dupatta set (heavy shoulder drape + sheer head veil) and padded designer blouse.',
    includes: [
      'Velvet Embroidered Lehenga with 4.5m flare',
      'Dual Dupatta Set (Head veil + Shoulder dupatta)',
      'Custom Fitted Blouse with matching latkans',
      'Complimentary Master Alteration & Sanitized Box'
    ],
    images: [
      '/hero-bride.jpg',
      '/creative-bridal.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fitting'],
    rentalDays: '3 - 4 Days',
    isTrending: true,
    metaDescription: 'Rent handcrafted Royal Crimson Velvet bridal lehenga for wedding day at Ghar Shagna Da. Luxury wedding outfits on rent with custom alterations.'
  },
  {
    id: 'bl-2',
    slug: 'gulabi-noor-pastel-rose-organza-lehenga',
    title: 'Gulabi Noor Pastel Rose Organza Lehenga',
    subtitle: 'Modern Day Wedding Elegance',
    category: 'bridal-lehengas',
    categoryLabel: 'Bridal Lehengas',
    rentalPrice: '₹7,499',
    securityDeposit: '₹4,500 (Refundable)',
    originalPrice: '₹68,000',
    color: 'Blush Powder Pink & Champagne',
    fabric: 'Pure Organza Silk & Raw Silk Lining',
    embroidery: 'Resham Threadwork, Mukaish & Real Pearl Edging',
    occasion: 'Day Wedding, Anand Karaj, Engagement',
    description: 'Dreamy soft rose lehenga adorned with intricate floral resham stitches and pearl detailing. Featherlight in weight with grand can-can flare, ideal for modern brides desiring romance and ease.',
    includes: [
      'Multi-tier Can-can Flowing Skirt',
      'Scalloped Border Organza Dupatta',
      'Tailored Elbow-Sleeve Blouse',
      'Alterations according to your measurements'
    ],
    images: [
      '/hero-lehenga.jpg',
      '/creative-bridal.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rentalDays: '3 - 4 Days',
    isTrending: true,
    metaDescription: 'Rent pastel rose pink bridal lehenga with pearl detailing at Ghar Shagna Da. Affordable designer wedding rental.'
  },
  {
    id: 'bl-3',
    slug: 'vintage-banarasi-gold-handloom-lehenga',
    title: 'Vintage Banarasi Gold Handloom Silk Lehenga',
    subtitle: 'Timeless Royal Aristocracy',
    category: 'bridal-lehengas',
    categoryLabel: 'Bridal Lehengas',
    rentalPrice: '₹8,499',
    securityDeposit: '₹5,000 (Refundable)',
    originalPrice: '₹78,000',
    color: 'Antique Gold & Sandalwood',
    fabric: 'Pure Handloom Banarasi Katan Silk',
    embroidery: 'Real Antique Tilla, Gotta Patti & Marodi Stitching',
    occasion: 'Royal Reception, Anand Karaj, Sangeet',
    description: 'Handwoven Banarasi silk with pure gold zari floral jaal. Creates an ethereal vintage aura under wedding chandeliers with lightweight grace.',
    includes: [
      'Handloom Banarasi Katan Silk Skirt',
      'Tissue Zari Contrast Stole & Heavy Dupatta',
      'Custom Hand-stitched Blouse'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['M', 'L', 'XL'],
    rentalDays: '3 - 4 Days',
    isTrending: false,
    metaDescription: 'Rent antique gold banarasi silk bridal lehenga at Ghar Shagna Da. Premium bridal rental studio.'
  },

  // WEDDING DRESSES
  {
    id: 'wd-1',
    slug: 'firozi-twirl-royal-anarkali-suit',
    title: 'Firozi Twirl Floor-Length Royal Anarkali',
    subtitle: 'Sangeet & Jaggo Special',
    category: 'wedding-dresses',
    categoryLabel: 'Wedding Dresses',
    rentalPrice: '₹3,499',
    securityDeposit: '₹2,500 (Refundable)',
    originalPrice: '₹35,000',
    color: 'Firozi Peacock Blue & Antique Gold',
    fabric: 'Pure Georgette & Soft Net',
    embroidery: 'Foil Mirror Work, Gota Borders & Sequins',
    occasion: 'Sangeet Night, Jaggo, Cocktail Party',
    description: 'A 16-kali twirl-worthy full flare floor-length Anarkali that glimmers brilliantly under event lights. Breathable, comfortable for non-stop dancing.',
    includes: [
      'Full Flare Floor-Length Anarkali Gown',
      'Coordinated Churidar Bottom',
      'Heavy Border Net Dupatta'
    ],
    images: [
      '/hero-gown.jpg',
      '/hero-bride.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rentalDays: '3 Days',
    isTrending: true,
    metaDescription: 'Rent designer peacock blue Anarkali dress for Sangeet & Jaggo at Ghar Shagna Da.'
  },
  {
    id: 'wd-2',
    slug: 'champagne-stardust-reception-trail-gown',
    title: 'Champagne Stardust Reception Trail Gown',
    subtitle: 'Evening Glamour Silhouette',
    category: 'wedding-dresses',
    categoryLabel: 'Wedding Dresses',
    rentalPrice: '₹4,499',
    securityDeposit: '₹3,000 (Refundable)',
    originalPrice: '₹48,000',
    color: 'Champagne Shimmer & Silver Crystal',
    fabric: 'Imported Metallic Tulle & Micro Satin',
    embroidery: 'Cutdana, Micro-Sequins & Shimmer Trail',
    occasion: 'Reception Gala, Cocktail Night, Ring Ceremony',
    description: 'Architectural boned bodice sculpted to create an effortless silhouette with an extended romantic floor trail.',
    includes: [
      'Corset Structured Trail Gown',
      'Bustle Hook for easy walking/dancing'
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rentalDays: '3 Days',
    isTrending: true,
    metaDescription: 'Rent luxury champagne reception trail gown at Ghar Shagna Da. Wedding party couture rentals.'
  },
  {
    id: 'wd-3',
    slug: 'zaffran-marigold-haldi-sharara-set',
    title: 'Zaffran Marigold Silk Peplum Sharara Set',
    subtitle: 'Sunlit Haldi & Mehndi Ensembles',
    category: 'wedding-dresses',
    categoryLabel: 'Wedding Dresses',
    rentalPrice: '₹2,999',
    securityDeposit: '₹2,000 (Refundable)',
    originalPrice: '₹29,000',
    color: 'Marigold Yellow & Sandalwood Gold',
    fabric: 'Pure Georgette & Chanderi Silk',
    embroidery: 'Gota Lappe & Mirrorwork Highlights',
    occasion: 'Haldi Ceremony, Mehndi, Mayian',
    description: 'Vibrant yellow peplum short kurti paired with voluminous multi-tiered ruffled sharara pants. Perfect for sunlit photographs.',
    includes: [
      'Peplum Kurti with tassel ties',
      'Layered Ruffled Sharara Pants',
      'Tassel Embellished Dupatta'
    ],
    images: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    rentalDays: '3 Days',
    isTrending: false,
    metaDescription: 'Rent Haldi and Mehndi sharara dress at Ghar Shagna Da. Affordable wedding wear.'
  },

  // SHERWANIS
  {
    id: 'sh-1',
    slug: 'maharaja-ivory-chikankari-groom-sherwani',
    title: 'Maharaja Ivory Chikankari Groom Sherwani',
    subtitle: 'Royal Groom Collection',
    category: 'sherwanis',
    categoryLabel: 'Sherwanis',
    rentalPrice: '₹6,999',
    securityDeposit: '₹4,000 (Refundable)',
    originalPrice: '₹58,000',
    color: 'Ivory Cream & Champagne Gold',
    fabric: 'Raw Silk & Fine Chikankari Georgette',
    embroidery: 'Tone-on-tone Lucknowi Threadwork & Mukaish',
    occasion: 'Groom Anand Karaj, Barat, Wedding Day',
    description: 'The epitome of timeless royal groom charm. Ivory hand-embroidered Lucknowi chikankari paired with a regal contrasting stole and coordinated churidar.',
    includes: [
      'Designer Embroidered Sherwani Coat',
      'Silk Churidar Trousers',
      'Contrasting Royal Groom Stole',
      'Complimentary Chest & Sleeve Alterations'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    rentalDays: '3 - 4 Days',
    isTrending: true,
    metaDescription: 'Rent Ivory Chikankari groom sherwani for Anand Karaj at Ghar Shagna Da. Designer mens wedding wear on rent.'
  },
  {
    id: 'sh-2',
    slug: 'shahi-emerald-velvet-bandhgala-sherwani',
    title: 'Shahi Emerald Velvet Bandhgala Sherwani',
    subtitle: 'Aristocratic Evening Royal Wear',
    category: 'sherwanis',
    categoryLabel: 'Sherwanis',
    rentalPrice: '₹5,999',
    securityDeposit: '₹3,500 (Refundable)',
    originalPrice: '₹50,000',
    color: 'Deep Emerald Green & Antique Gold',
    fabric: 'Micro Velvet with Silk Satin Lining',
    embroidery: 'Zardozi Mandarin Collar, Crest & Metallic Buttons',
    occasion: 'Groom Reception, Sangeet, Winter Wedding',
    description: 'Rich jewel-tone emerald green velvet tailored with immaculate structure. Gold metallic filigree buttons and handcrafted collar zardozi embroidery.',
    includes: [
      'Micro-Velvet Embroidered Coat',
      'Silk Churidar Pants',
      'Coordinated Pocket Square'
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)'],
    rentalDays: '3 Days',
    isTrending: true,
    metaDescription: 'Rent emerald green velvet sherwani for reception and sangeet at Ghar Shagna Da.'
  },
  {
    id: 'sh-3',
    slug: 'rose-gold-asymmetric-indo-western-achkan',
    title: 'Rose Gold Asymmetric Indo-Western Achkan',
    subtitle: 'Modern Fusion Groom Wear',
    category: 'sherwanis',
    categoryLabel: 'Sherwanis',
    rentalPrice: '₹4,999',
    securityDeposit: '₹3,000 (Refundable)',
    originalPrice: '₹42,000',
    color: 'Rose Gold & Sandalwood Brocade',
    fabric: 'Jacquard Textured Brocade Silk',
    embroidery: 'Asymmetric Side Drape & Metallic Details',
    occasion: 'Engagement, Sangeet, Cocktail Night',
    description: 'Modern Indo-Western fusion achkan designed with an overlap side drape cut and structured shoulders. Sleek, sharp, and charismatic.',
    includes: [
      'Asymmetric Drape Achkan Coat',
      'Slim Fit Coordinated Trousers'
    ],
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    rentalDays: '3 Days',
    isTrending: false,
    metaDescription: 'Rent modern rose gold Indo-Western achkan sherwani at Ghar Shagna Da.'
  }
];

export const CATEGORIES = [
  {
    id: 'bridal-lehengas',
    slug: 'bridal-lehengas',
    title: 'Bridal Lehengas',
    handwrittenSubtitle: 'The Timeless Bride',
    tagline: 'Handcrafted velvet, silk and pastel lehengas for Anand Karaj & Phere',
    image: '/SHOP BY CATEGORY/Bridal-Lehenga.png',
    bgGradient: 'from-[#421a24] via-[#2d1017] to-[#14060a]',
    spotlight: 'from-amber-100/30 via-rose-900/15 to-transparent',
    accentBorder: 'border-amber-300/80',
  },
  {
    id: 'wedding-dresses',
    slug: 'wedding-dresses',
    title: 'Wedding Gowns',
    handwrittenSubtitle: 'Trail & Silhouette',
    tagline: 'Couture floor-length trail gowns & reception evening silhouettes',
    image: '/SHOP BY CATEGORY/wedding-gowns.png',
    bgGradient: 'from-[#382b35] via-[#261c24] to-[#120c11]',
    spotlight: 'from-pink-100/25 via-rose-900/10 to-transparent',
    accentBorder: 'border-rose-300/80',
  },
  {
    id: 'festive-shararas',
    slug: 'wedding-dresses?type=sharara',
    title: 'Festive Shararas',
    handwrittenSubtitle: 'Celebration Ensembles',
    tagline: 'Hand-embroidered tiered sharara & peplum sets for Sangeet and Haldi',
    image: '/Categery/mehendi-v3.png',
    bgGradient: 'from-[#213825] via-[#16271a] to-[#0a120c]',
    spotlight: 'from-emerald-100/30 via-emerald-950/20 to-transparent',
    accentBorder: 'border-emerald-300/80',
  },
  {
    id: 'sherwanis',
    slug: 'sherwanis',
    title: 'Groom Sherwanis',
    handwrittenSubtitle: 'Regal Maharaja Charm',
    tagline: 'Aristocratic Ivory Chikankari, Velvet Bandhgalas & Modern Achkans',
    image: '/SHOP BY CATEGORY/groom-sherwani.png',
    bgGradient: 'from-[#362719] via-[#261a0f] to-[#120b06]',
    spotlight: 'from-amber-100/35 via-amber-950/20 to-transparent',
    accentBorder: 'border-amber-400/80',
  },
  {
    id: 'designer-sarees',
    slug: 'wedding-dresses?type=saree',
    title: 'Designer Sarees',
    handwrittenSubtitle: 'Drapes of Grace',
    tagline: 'Heavy sequined drapes, organza tissue & royal Banarasi silk sarees',
    image: '/SHOP BY CATEGORY/designer-sarees.png',
    bgGradient: 'from-[#22273d] via-[#171b2b] to-[#0c0e17]',
    spotlight: 'from-amber-100/25 via-blue-900/15 to-transparent',
    accentBorder: 'border-amber-200/80',
  },
  {
    id: 'anarkali-suits',
    slug: 'wedding-dresses?type=anarkali',
    title: 'Royal Anarkalis',
    handwrittenSubtitle: 'Heritage Twirls',
    tagline: 'Flared floor-touch kalidar anarkalis crafted with dabka needlework',
    image: '/SHOP BY CATEGORY/royal-anarkalis.png',
    bgGradient: 'from-[#3b1e2a] via-[#28131c] to-[#13070c]',
    spotlight: 'from-rose-100/30 via-rose-950/15 to-transparent',
    accentBorder: 'border-rose-200/80',
  },

];

export const OCCASION_CATEGORIES = [
  {
    id: 'cocktail',
    slug: 'wedding-dresses?occasion=cocktail',
    title: 'COCKTAIL',
    image: '/Categery/Cocktail.png',
    // Balanced Muted Slate & Dusty Navy (Not black, not washed out — makes black sequins sparkle)
    bgGradient: 'from-[#3a445d] via-[#2a3245] to-[#1c2230]',
    spotlight: 'from-amber-100/25 via-white/10 to-transparent',
    archBorder: 'border-amber-300/80',
    accentColor: 'text-amber-200',
  },
  {
    id: 'reception',
    slug: 'bridal-lehengas?occasion=reception',
    title: 'RECEPTION',
    image: '/Categery/reception.png',
    // Warm Rich Caramel & Cinnamon Amber (Perfect medium depth for nude-gold lehenga)
    bgGradient: 'from-[#6e523f] via-[#543d2e] to-[#38271c]',
    spotlight: 'from-amber-100/30 via-white/10 to-transparent',
    archBorder: 'border-amber-300',
    accentColor: 'text-amber-200',
  },
  {
    id: 'sangeet',
    slug: 'wedding-dresses?occasion=sangeet',
    title: 'SANGEET',
    image: '/Categery/Sangeet.png',
    // Rich Imperial Maroon & Ruby Wine (Vibrant festive tone)
    bgGradient: 'from-[#6a2034] via-[#521727] to-[#380e1a]',
    spotlight: 'from-rose-100/25 via-white/10 to-transparent',
    archBorder: 'border-rose-300',
    accentColor: 'text-rose-100',
  },
  {
    id: 'bridesmaid',
    slug: 'wedding-dresses?occasion=bridesmaid',
    title: 'BRIDESMAID',
    image: '/Categery/Bridesmaid.png',
    // Elegant Mauve Berry & Warm Plum (Complements the pastel pink floral saree)
    bgGradient: 'from-[#6b4754] via-[#533541] to-[#3a232c]',
    spotlight: 'from-pink-100/30 via-white/10 to-transparent',
    archBorder: 'border-pink-300',
    accentColor: 'text-pink-100',
  },
  {
    id: 'mehendi',
    slug: 'wedding-dresses?occasion=mehendi',
    title: 'MEHENDI',
    image: '/Categery/mehendi-v3.png',
    // Rich Olive Sage & Forest Moss (Vibrant festive mehendi green depth)
    bgGradient: 'from-[#3a583e] via-[#2c4430] to-[#1e2f21]',
    spotlight: 'from-emerald-100/25 via-white/10 to-transparent',
    archBorder: 'border-emerald-300',
    accentColor: 'text-emerald-100',
  },
  {
    id: 'haldi',
    slug: 'wedding-dresses?occasion=haldi',
    title: 'HALDI',
    image: '/Categery/haldi-new.png',
    // Warm Golden Marigold & Saffron Honey (Rich, joyful and festive without being harsh)
    bgGradient: 'from-[#78541c] via-[#5e4113] to-[#402b0a]',
    spotlight: 'from-amber-100/30 via-white/15 to-transparent',
    archBorder: 'border-amber-300',
    accentColor: 'text-amber-100',
  },
];


export const SITE_CONFIG = {
  name: 'Ghar Shagna Da',
  tagline: 'Complete Store of All Wedding Accessories & Outfits on Rent',
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  email: 'contact@gharshagnada.com',
  address: 'Mall Road / Model Town, Punjab, India',
  domain: 'https://gharshagnada.com',
  description: 'Ghar Shagna Da is Punjab’s premier wedding studio offering designer Bridal Lehengas, Wedding Dresses, and Royal Groom Sherwanis on rent with custom alterations and doorstep hygiene packaging.',
};
