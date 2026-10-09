export interface ReviewItem {
  author: string;
  city: string;
  date: string;
  rating: number;
  comment: string;
  image?: string;
  tag?: string;
}

export const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    author: 'Sreelekshmi',
    city: 'Amritsar',
    date: '6/19/2026',
    rating: 5,
    comment: 'As good as in the picture! Handcrafted embroidery and rich crimson velvet dupatta was stunning. Truly made my Anand Karaj memorable.',
    image: '/hero-bride.jpg',
    tag: 'Verified'
  },
  {
    author: 'Mansi',
    city: 'Ludhiana',
    date: '5/12/2026',
    rating: 5,
    comment: 'Very pretty! Fitting trial was flawless. Received endless compliments on wedding day. The blouse fitting was 100% spot on.',
    image: '/creative-bridal.jpg',
    tag: 'Verified'
  },
  {
    author: 'Sujoy',
    city: 'Chandigarh',
    date: '4/28/2026',
    rating: 5,
    comment: 'Excellent outfit. Fabric and zardozi look like pure couture. Very hygienic packaging and arrived right on time.',
    image: '/hero-gown.jpg',
    tag: 'Verified'
  },
  {
    author: 'Swati',
    city: 'Delhi',
    date: '4/15/2026',
    rating: 5,
    comment: 'Pretty! 😍 Dry cleaning and hygiene was 10/10. Saved so much money renting instead of buying an expensive designer piece.',
    image: '/hero-lehenga.jpg',
    tag: 'Verified'
  },
  {
    author: 'Ragesree',
    city: 'Jalandhar',
    date: '3/20/2026',
    rating: 5,
    comment: 'The craftsmanship is so royal! Perfect for wedding day. Master ji ne blouse exact mere body shape te alter kar dita. Highly recommend Ghar Shagna Da 💕',
    image: '/mobile-bridal.jpg',
    tag: 'Verified'
  },
  {
    author: 'Jaspreet B.',
    city: 'Patiala',
    date: '2/18/2026',
    rating: 5,
    comment: 'Can-can flare is huge and twirl photographs looked magical in natural sunlit decor. Best bridal rental studio in Punjab!',
    image: '/Categery/Bridesmaid.png',
    tag: 'Verified'
  },
  {
    author: 'Navneet Sandhu',
    city: 'Bhatinda',
    date: '2/04/2026',
    rating: 5,
    comment: 'Fitting was completely custom! Even without visiting store, measurements were taken via WhatsApp video call. Timely doorstep delivery.',
    tag: 'Verified'
  },
  {
    author: 'Simran & Aman',
    city: 'Mohali',
    date: '1/10/2026',
    rating: 5,
    comment: 'Rented matching bride & groom outfits. Security deposit was refunded immediately without any delay. Zero stress experience!',
    image: '/creative-groom.jpg',
    tag: 'Verified'
  },
  {
    author: 'Kiranjeet Kaur',
    city: 'Hoshiarpur',
    date: '12/28/2025',
    rating: 5,
    comment: 'Fabric quality is very premium. Everyone at the reception thought I bought it from Delhi couture designer. Loved it!',
    tag: 'Verified'
  }
];
