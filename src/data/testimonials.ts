export interface TestimonialItem {
  id?: string | number;
  _id?: string;
  author: string;
  city: string;
  date: string;
  rating: number;
  comment: string;
  tag?: string;
  productTitle?: string;
}

export const INITIAL_HOMEPAGE_REVIEWS: TestimonialItem[] = [
  {
    id: 1,
    author: 'Sreelekshmi',
    city: 'Amritsar',
    date: '6/19/2026',
    rating: 5,
    comment:
      'As good as in the picture! Handcrafted embroidery and rich crimson velvet dupatta was stunning. Truly made my Anand Karaj memorable.',
    tag: 'Verified Bride',
  },
  {
    id: 2,
    author: 'Mansi Sharma',
    city: 'Ludhiana',
    date: '5/12/2026',
    rating: 4,
    comment:
      'Very pretty lehenga! Trial fitting was good. The blouse fit really well after slight sleeve adjustment. Got lots of compliments!',
    tag: 'Verified Bride',
  },
  {
    id: 3,
    author: 'Sujoy & Harleen',
    city: 'Chandigarh',
    date: '4/28/2026',
    rating: 5,
    comment:
      'Excellent royal outfit. Fabric and zardozi look like pure couture. Very hygienic packaging and arrived right on time.',
    tag: 'Verified Client',
  },
  {
    id: 4,
    author: 'Swati Verma',
    city: 'Delhi',
    date: '4/15/2026',
    rating: 4,
    comment:
      'Pretty outfit! Dry cleaning and hygiene was 10/10. Saved so much money renting instead of buying an expensive designer piece.',
    tag: 'Verified Bride',
  },
  {
    id: 5,
    author: 'Ragesree Kaur',
    city: 'Jalandhar',
    date: '3/20/2026',
    rating: 5,
    comment:
      'The craftsmanship is so royal! Master ji ne blouse exact mere body shape te alter kar dita. Highly recommend Ghar Shagna Da 💕',
    tag: 'Verified Bride',
  },
  {
    id: 6,
    author: 'Jaspreet B.',
    city: 'Patiala',
    date: '2/18/2026',
    rating: 4,
    comment:
      'Can-can flare is big and twirl photographs looked magical in natural sunlight. Loved the colour combination and dupatta.',
    tag: 'Verified Client',
  },
  {
    id: 7,
    author: 'Navneet Sandhu',
    city: 'Bathinda',
    date: '2/04/2026',
    rating: 5,
    comment:
      'Fitting was completely custom! Even without visiting store, measurements were taken via WhatsApp video call. Timely doorstep delivery.',
    tag: 'Verified Bride',
  },
  {
    id: 8,
    author: 'Simran & Aman',
    city: 'Mohali',
    date: '1/10/2026',
    rating: 4,
    comment:
      'Rented matching bride & groom outfits. Security deposit was refunded on time after returning the dresses. Overall a smooth experience!',
    tag: 'Verified Couple',
  },
];
