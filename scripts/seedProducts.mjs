import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually without external package
let uri = process.env.MONGODB_URI;
if (!uri) {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/MONGODB_URI=([^\r\n]+)/);
    if (match) {
      uri = match[1].trim();
    }
  } catch (e) {
    console.error('Could not read .env.local');
  }
}

if (!uri) {
  console.error('❌ MONGODB_URI not found');
  process.exit(1);
}

// Minimal Product Schema
const ProductReviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  city: { type: String, default: '' },
  date: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  comment: { type: String, required: true },
  image: { type: String, default: '' },
  tag: { type: String, default: 'Verified Bride' },
});

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    price: { type: String, required: true },
    originalValue: { type: String, required: true },
    deposit: { type: String, required: true },
    duration: { type: String, default: '3 Days' },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    fabric: { type: String, required: true },
    work: { type: String, required: true },
    color: { type: String, required: true },
    occasion: { type: String, required: true },
    sizes: { type: [String], default: ['Custom Fit Available'] },
    includes: { type: [String], default: [] },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    reviews: { type: [ProductReviewSchema], default: [] },
    status: {
      type: String,
      enum: ['available', 'rented', 'reserved', 'maintenance'],
      default: 'available',
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Full initial dataset mapped to schema
const INITIAL_DATA = [
  {
    id: 'bl-1',
    slug: 'royal-heritage-crimson-velvet-lehenga',
    title: 'Royal Heritage Crimson Velvet Lehenga',
    subtitle: 'Signature Bridal Couture',
    category: 'Bridal Lehengas',
    categorySlug: 'bridal-lehengas',
    price: '₹8,999',
    deposit: '₹5,000 (Refundable)',
    originalValue: '₹85,000',
    color: 'Crimson Red & Antique Gold',
    fabric: 'Micro Velvet with Pure Silk Dupattas',
    work: 'Handcrafted Zardozi, Dabka & Tilla Needlework',
    occasion: 'Wedding Day, Anand Karaj, Phere',
    duration: '3 - 4 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 3,
    reviews: [
      {
        author: 'Sreelekshmi',
        city: 'Amritsar',
        date: '6/19/2026',
        rating: 5,
        comment: 'As good as in the picture! Handcrafted embroidery and rich crimson velvet dupatta was stunning. Truly made my Anand Karaj memorable.',
        image: '/hero-bride.jpg',
        tag: 'Verified Bride'
      },
      {
        author: 'Mansi',
        city: 'Ludhiana',
        date: '5/12/2026',
        rating: 5,
        comment: 'Very pretty! Fitting trial was flawless. Received endless compliments on wedding day. The blouse fitting was 100% spot on.',
        image: '/creative-bridal.jpg',
        tag: 'Verified Bride'
      },
      {
        author: 'Jaspreet B.',
        city: 'Patiala',
        date: '2/18/2026',
        rating: 5,
        comment: 'Can-can flare is huge and twirl photographs looked magical in natural sunlit decor. Best bridal rental studio in Punjab!',
        tag: 'Wedding Day'
      }
    ]
  },
  {
    id: 'bl-2',
    slug: 'gulabi-noor-pastel-rose-organza-lehenga',
    title: 'Gulabi Noor Pastel Rose Organza Lehenga',
    subtitle: 'Modern Day Wedding Elegance',
    category: 'Bridal Lehengas',
    categorySlug: 'bridal-lehengas',
    price: '₹7,499',
    deposit: '₹4,500 (Refundable)',
    originalValue: '₹68,000',
    color: 'Blush Powder Pink & Champagne',
    fabric: 'Pure Organza Silk & Raw Silk Lining',
    work: 'Resham Threadwork, Mukaish & Real Pearl Edging',
    occasion: 'Day Wedding, Anand Karaj, Engagement',
    duration: '3 - 4 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 2,
    reviews: [
      {
        author: 'Swati',
        city: 'Delhi',
        date: '4/15/2026',
        rating: 5,
        comment: 'Pretty! 😍 Dry cleaning and hygiene was 10/10. Saved so much money renting instead of buying an expensive designer piece.',
        image: '/hero-lehenga.jpg',
        tag: 'Verified Bride'
      },
      {
        author: 'Ragesree',
        city: 'Jalandhar',
        date: '3/20/2026',
        rating: 5,
        comment: 'The craftsmanship is so royal! Perfect for wedding day. Master ji ne blouse exact mere body shape te alter kar dita. Highly recommend Ghar Shagna Da 💕',
        tag: 'Verified Bride'
      }
    ]
  },
  {
    id: 'bl-3',
    slug: 'vintage-banarasi-gold-handloom-lehenga',
    title: 'Vintage Banarasi Gold Handloom Silk Lehenga',
    subtitle: 'Timeless Royal Aristocracy',
    category: 'Bridal Lehengas',
    categorySlug: 'bridal-lehengas',
    price: '₹8,499',
    deposit: '₹5,000 (Refundable)',
    originalValue: '₹78,000',
    color: 'Antique Gold & Sandalwood',
    fabric: 'Pure Handloom Banarasi Katan Silk',
    work: 'Real Antique Tilla, Gotta Patti & Marodi Stitching',
    occasion: 'Royal Reception, Anand Karaj, Sangeet',
    duration: '3 - 4 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 1,
    reviews: [
      {
        author: 'Kiranjeet Kaur',
        city: 'Hoshiarpur',
        date: '12/28/2025',
        rating: 5,
        comment: 'Fabric quality is very premium. Everyone at the reception thought I bought it from Delhi couture designer. Loved it!',
        tag: 'Reception Night'
      }
    ]
  },
  {
    id: 'wd-1',
    slug: 'firozi-twirl-royal-anarkali-suit',
    title: 'Firozi Twirl Floor-Length Royal Anarkali',
    subtitle: 'Sangeet & Jaggo Special',
    category: 'Wedding Dresses',
    categorySlug: 'wedding-dresses',
    price: '₹3,499',
    deposit: '₹2,500 (Refundable)',
    originalValue: '₹35,000',
    color: 'Firozi Peacock Blue & Antique Gold',
    fabric: 'Pure Georgette & Soft Net',
    work: 'Foil Mirror Work, Gota Borders & Sequins',
    occasion: 'Sangeet Night, Jaggo, Cocktail Party',
    duration: '3 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 1,
    reviews: [
      {
        author: 'Navneet Sandhu',
        city: 'Bhatinda',
        date: '2/04/2026',
        rating: 5,
        comment: 'Fitting was completely custom! Even without visiting store, measurements were taken via WhatsApp video call. Timely doorstep delivery.',
        tag: 'Sangeet Night'
      }
    ]
  },
  {
    id: 'wd-2',
    slug: 'champagne-stardust-reception-trail-gown',
    title: 'Champagne Stardust Reception Trail Gown',
    subtitle: 'Evening Glamour Silhouette',
    category: 'Wedding Dresses',
    categorySlug: 'wedding-dresses',
    price: '₹4,499',
    deposit: '₹3,000 (Refundable)',
    originalValue: '₹48,000',
    color: 'Champagne Shimmer & Silver Crystal',
    fabric: 'Imported Metallic Tulle & Micro Satin',
    work: 'Cutdana, Micro-Sequins & Shimmer Trail',
    occasion: 'Reception Gala, Cocktail Night, Ring Ceremony',
    duration: '3 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 1,
    reviews: [
      {
        author: 'Sujoy',
        city: 'Chandigarh',
        date: '4/28/2026',
        rating: 5,
        comment: 'Excellent outfit. Fabric and zardozi look like pure couture. Very hygienic packaging and arrived right on time.',
        image: '/hero-gown.jpg',
        tag: 'Verified'
      }
    ]
  },
  {
    id: 'wd-3',
    slug: 'zaffran-marigold-haldi-sharara-set',
    title: 'Zaffran Marigold Silk Peplum Sharara Set',
    subtitle: 'Sunlit Haldi & Mehndi Ensembles',
    category: 'Wedding Dresses',
    categorySlug: 'wedding-dresses',
    price: '₹2,999',
    deposit: '₹2,000 (Refundable)',
    originalValue: '₹29,000',
    color: 'Marigold Yellow & Sandalwood Gold',
    fabric: 'Pure Georgette & Chanderi Silk',
    work: 'Gota Lappe & Mirrorwork Highlights',
    occasion: 'Haldi Ceremony, Mehndi, Mayian',
    duration: '3 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 0,
    reviews: []
  },
  {
    id: 'sh-1',
    slug: 'maharaja-ivory-chikankari-groom-sherwani',
    title: 'Maharaja Ivory Chikankari Groom Sherwani',
    subtitle: 'Royal Groom Collection',
    category: 'Sherwanis',
    categorySlug: 'sherwanis',
    price: '₹6,999',
    deposit: '₹4,000 (Refundable)',
    originalValue: '₹58,000',
    color: 'Ivory Cream & Champagne Gold',
    fabric: 'Raw Silk & Fine Chikankari Georgette',
    work: 'Tone-on-tone Lucknowi Threadwork & Mukaish',
    occasion: 'Groom Anand Karaj, Barat, Wedding Day',
    duration: '3 - 4 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 1,
    reviews: [
      {
        author: 'Simran & Aman',
        city: 'Mohali',
        date: '1/10/2026',
        rating: 5,
        comment: 'Rented matching bride & groom outfits. Security deposit was refunded immediately without any delay. Zero stress experience!',
        image: '/creative-groom.jpg',
        tag: 'Verified Bride & Groom'
      }
    ]
  },
  {
    id: 'sh-2',
    slug: 'shahi-emerald-velvet-bandhgala-sherwani',
    title: 'Shahi Emerald Velvet Bandhgala Sherwani',
    subtitle: 'Aristocratic Evening Royal Wear',
    category: 'Sherwanis',
    categorySlug: 'sherwanis',
    price: '₹5,999',
    deposit: '₹3,500 (Refundable)',
    originalValue: '₹50,000',
    color: 'Deep Emerald Green & Antique Gold',
    fabric: 'Micro Velvet with Silk Satin Lining',
    work: 'Zardozi Mandarin Collar, Crest & Metallic Buttons',
    occasion: 'Groom Reception, Sangeet, Winter Wedding',
    duration: '3 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 0,
    reviews: []
  },
  {
    id: 'sh-3',
    slug: 'rose-gold-asymmetric-indo-western-achkan',
    title: 'Rose Gold Asymmetric Indo-Western Achkan',
    subtitle: 'Modern Fusion Groom Wear',
    category: 'Sherwanis',
    categorySlug: 'sherwanis',
    price: '₹4,999',
    deposit: '₹3,000 (Refundable)',
    originalValue: '₹42,000',
    color: 'Rose Gold & Sandalwood Brocade',
    fabric: 'Jacquard Textured Brocade Silk',
    work: 'Asymmetric Side Drape & Metallic Details',
    occasion: 'Engagement, Sangeet, Cocktail Night',
    duration: '3 Days',
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
    status: 'available',
    rating: 5,
    reviewsCount: 0,
    reviews: []
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected successfully!');

    let inserted = 0;
    let updated = 0;

    for (const item of INITIAL_DATA) {
      const res = await Product.findOneAndUpdate(
        { $or: [{ id: item.id }, { slug: item.slug }] },
        { $set: item },
        { upsert: true, returnDocument: 'after' }
      );
      if (res) {
        console.log(`✓ Seeded/Updated: ${item.title} (${item.slug})`);
        updated++;
      }
    }

    const total = await Product.countDocuments();
    console.log(`\n🎉 MongoDB Seeding Complete! Total Outfits in Database: ${total}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
