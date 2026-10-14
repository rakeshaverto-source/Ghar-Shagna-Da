export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML rich text
  coverImage: string;
  category: string;
  author: string;
  authorRole?: string;
  readTime: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const INITIAL_BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'blog-1',
    slug: 'bridal-lehenga-rental-guide-punjab',
    title: 'Complete Guide to Renting Bridal Lehengas in Punjab & Chandigarh',
    excerpt: 'Planning your dream wedding look without breaking the bank? Discover the top reasons brides are choosing designer lehengas on rent, fittings tips, and timing advice.',
    content: `
### Why Renting a Bridal Lehenga is the Smartest Modern Choice

For generations, buying an exorbitant wedding lehenga meant spending upwards of ₹1.5L to ₹4L on an ensemble worn just once for 6 to 8 hours. Today's modern brides in Chandigarh, Ludhiana, and across Punjab are embracing **wedding wear rentals** for style, sustainability, and unmatched luxury.

#### 1. Access to High-End Designer Aesthetics
Renting allows you to adorn museum-quality hand-embroidery, pure raw silks, zardozi, and authentic sequins without the massive price tag. At **Ghar Shagna Da**, our handpicked bridal couture gives you royalty and shahi andaaz right within budget.

#### 2. Complimentary Custom Tailoring & Fittings
A common myth is that rented bridal outfits will not fit like tailor-made garments. Our master artisans do custom alterations, bustier and blouse adjustments, and cancan flaring based on your exact measurements. We hand over or deliver your sanitized outfit as per your requirement prior to the ceremony.

#### 3. No Dry-Cleaning Hassles or Storage Degradation
Pure zari and heavy raw silk lehengas demand strict chemical storage, moisture-proof covers, and repeated dry cleaning. With rentals, we manage 100% hospital-grade hygienic steam sanitization, and you simply return the outfit after your celebrations.

#### Essential Tips for Booking Your Rental Lehenga
* **Book 1 to 3 months ahead:** Peak wedding seasons (October to February) fill up fast.
* **Coordinate your jewelry:** Decide on your polki, kundan, or temple jewelry tone before locking your outfit's base embroidery hue.
* **Flexible Fitting & Delivery:** We hand over or deliver your sanitized outfit as per your requirement prior to your event so everything is stress-free.
    `,
    coverImage: '/hero-bride.jpg',
    category: 'Bridal Fashion',
    author: 'Ghar Shagna Da Styling Team',
    authorRole: 'Bridal Stylists',
    readTime: '4 min read',
    tags: ['Bridal Lehenga', 'Wedding Rental', 'Chandigarh Weddings', 'Styling Tips'],
    isPublished: true,
    isFeatured: true,
    publishedAt: '2025-01-15',
  },
  {
    id: 'blog-2',
    slug: 'groom-sherwani-rental-tips',
    title: 'Royal Groom Sherwanis: How to Match with Your Bride in Style',
    excerpt: 'From pastel ivory velvets to shahi achkans, learn how grooms can effortlessly coordinate with their bride while enjoying supreme comfort on their big day.',
    content: `
### Elevating the Groom's Shahi Look

The era when men's wedding wear was considered secondary is long gone. Today's grooms demand statement craftsmanship, intricate handwork, and silhouettes that complement the bride's regal attire.

#### Color Coordination: Complement, Don't Copy
Rather than wearing an exact color twin of the bride's lehenga, choose harmony:
* If the bride wears **Crimson or Heritage Maroon**, grooms look striking in **Warm Ivory, Raw Silk Cream, or Champagne Gold** with a subtle maroon safa or stole.
* If the bride chooses **Pastel Peach or Blush Pink**, a **Mint Sage or Powder Pearl Sherwani** provides romantic contrast.

#### Layering Essentials: Safa, Mala, & Shawls
A regal sherwani rental is incomplete without signature accessories:
* **Pashmina or Velvet Doshala:** Adds shahi depth and warmth during winter Anand Karaj ceremonies.
* **Pearl & Emerald Kantha Mala:** A timeless adornment that frames the neckline with aristocratic elegance.
* **Coordinated Turban (Pagg/Safa):** Ensures cohesive family and ceremonial photos.

At **Ghar Shagna Da**, our complete Groom Collection includes designer sherwanis, customized safas, stoles, and matching footwear.
    `,
    coverImage: '/groom-sherwani-blog.jpg',
    category: 'Groom Wear',
    author: 'Harpreet Singh',
    authorRole: 'Master Couturier',
    readTime: '3 min read',
    tags: ['Groom Sherwani', 'Color Coordination', 'Wedding Styling', 'Men Fashion'],
    isPublished: true,
    isFeatured: false,
    publishedAt: '2025-01-20',
  },
  {
    id: 'blog-3',
    slug: 'nri-wedding-shopping-chandigarh-guide',
    title: 'NRI Wedding Planning: How to Reserve Outfits in Advance from Canada & UK',
    excerpt: 'Living abroad and visiting Punjab for your wedding? Here is how NRI brides and grooms seamlessly lock fittings, rentals, and trials online without stress.',
    content: `
### Seamless NRI Wedding Wear Coordination

Every wedding season, hundreds of families travel from Canada, the UK, the USA, and Australia to celebrate their Anand Karaj and Hindu weddings in Punjab and Chandigarh. However, limited vacation days make traditional multi-week shopping excursions impossible.

#### How Ghar Shagna Da Simplifies NRI Wedding Rentals:
1. **WhatsApp Video Consultations:** Explore our latest in-store collections over high-definition video calls with our bridal advisors.
2. **Standardized Measurement Charts:** Share standard measurements or let us guide your tailor remotely to ensure an immaculate base cut.
3. **Guaranteed Date Reservation:** Lock your dates months in advance so your favourite bridal lehenga or sherwani is reserved strictly for your ceremony.
4. **Flexible Delivery & Trial Upon Arrival:** We hand over or deliver your sanitized outfit as per your requirement prior to your event for instant touch-ups and final draping trials.

Save thousands of dollars compared to international designer boutiques while wearing original Indian heritage craftsmanship.
    `,
    coverImage: '/hero-lehenga.jpg',
    category: 'NRI Brides',
    author: 'Ghar Shagna Da Styling Team',
    authorRole: 'Customer Concierge',
    readTime: '5 min read',
    tags: ['NRI Brides', 'Remote Bookings', 'Chandigarh Shopping', 'Destination Wedding'],
    isPublished: true,
    isFeatured: false,
    publishedAt: '2025-02-01',
  },
  {
    id: 'blog-4',
    slug: 'top-wedding-dress-trends-sangeet-cocktail',
    title: 'Top Wedding Wear Trends for Sangeet, Cocktail & Jaggo Nights',
    excerpt: 'Twirl in style with shimmering foil mirrorwork Anarkalis, pre-draped cocktail sarees, and floor-length festive gowns crafted for non-stop dancing.',
    content: `
### Glamour, Grace & Unrestricted Dance Moves

Sangeet and Jaggo celebrations demand outfits that look dazzling under festive spotlights while offering the freedom to dance the night away to Punjabi beats.

#### 1. Mirrorwork Kalidar Anarkalis
Foil mirrorwork, gota borders, and deep jewel tones like peacock firozi or royal emerald catch every flash of stage lighting.

#### 2. Pre-Draped Concept Sarees
Say goodbye to complicated pleat pinning on hectic celebration evenings. Pre-stitched sarees provide sleek celebrity red-carpet silhouettes in under 2 minutes.

#### 3. Lightweight Organza Dupattas
Swap burdensome velvets for airy organza or tissue silk to stay refreshed and stylish through midnight celebrations.
    `,
    coverImage: '/Categery/Sangeet.png',
    category: 'Wedding Trends',
    author: 'Ghar Shagna Da Styling Team',
    authorRole: 'Celebrity Stylist',
    readTime: '4 min read',
    tags: ['Sangeet Outfits', 'Jaggo Night', 'Party Wear', 'Designer Sarees'],
    isPublished: true,
    isFeatured: false,
    publishedAt: '2025-02-10',
  },
];
