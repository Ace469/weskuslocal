import type { Business } from '../types/business';

const generateBusinessHours = (openTime: string, closeTime: string) => [
  { day: 'Monday', open: openTime, close: closeTime, isClosed: false },
  { day: 'Tuesday', open: openTime, close: closeTime, isClosed: false },
  { day: 'Wednesday', open: openTime, close: closeTime, isClosed: false },
  { day: 'Thursday', open: openTime, close: closeTime, isClosed: false },
  { day: 'Friday', open: openTime, close: closeTime, isClosed: false },
  { day: 'Saturday', open: '10:00', close: '18:00', isClosed: false },
  { day: 'Sunday', open: '10:00', close: '16:00', isClosed: true },
];

const generateDummyBusinesses = (category: string, startId: number): Business[] => {
  const getCoverPhoto = (category: string, id: number) => {
    const coverPhotos = {
      restaurants: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de',
      ],
      retail: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
        'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8',
      ],
      'real-estate': [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      ],
      'auto-sales': [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
        'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
      ],
    };
    return `${coverPhotos[category as keyof typeof coverPhotos][id % 3]}?auto=format&fit=crop&w=1600&q=80`;
  };

  const getLogo = (category: string, id: number) => {
    const logos = {
      restaurants: [
        'https://images.unsplash.com/photo-1581873372796-635b67ca2008',
        'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17',
      ],
      retail: [
        'https://images.unsplash.com/photo-1534653299134-96a171b61581',
        'https://images.unsplash.com/photo-1488707872600-5507977fe355',
        'https://images.unsplash.com/photo-1542838132-92c53300491e',
      ],
      'real-estate': [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6',
      ],
      'auto-sales': [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
        'https://images.unsplash.com/photo-1557683311-eac922347aa1',
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
      ],
    };
    return `${logos[category as keyof typeof logos][id % 3]}?auto=format&fit=crop&w=400&h=400&q=80`;
  };

  const getRandomCoordinates = () => ({
    lat: 40.7128 + (Math.random() - 0.5) * 0.1,
    lng: -74.006 + (Math.random() - 0.5) * 0.1,
  });

  const businessNames = {
    restaurants: [
      'The Rustic Kitchen',
      'Ocean Blue Seafood',
      'Spice Garden',
      'Urban Plates',
      'The Golden Fork',
      'Café Milano',
    ],
    retail: [
      'Fashion Forward',
      'Tech World',
      'Home Essentials',
      'Sports Hub',
      'The Book Nook',
      'Gadget Galaxy',
    ],
    'real-estate': [
      'Luxury Homes',
      'City View Properties',
      'Modern Living',
      'Urban Spaces',
      'Dream Homes',
      'Elite Properties',
    ],
    'auto-sales': [
      'Premium Motors',
      'City Cars',
      'AutoMax',
      'Elite Wheels',
      'Drive Time',
      'Car Haven',
    ],
  };

  return Array.from({ length: 6 }, (_, i) => {
    const coordinates = getRandomCoordinates();
    const names = businessNames[category as keyof typeof businessNames];
    
    return {
      id: `${startId + i}`,
      name: names[i],
      category: category as any,
      description: `A premier ${category.toLowerCase()} establishment offering exceptional services to our community. We pride ourselves on quality and customer satisfaction.`,
      image: `https://source.unsplash.com/800x600/?${category.toLowerCase()}&sig=${startId + i}`,
      coverPhoto: getCoverPhoto(category, i),
      logo: getLogo(category, i),
      address: `${Math.floor(Math.random() * 999) + 1} ${['Main', 'Broadway', 'Park', 'Madison', 'Fifth'][Math.floor(Math.random() * 5)]} ${['Street', 'Avenue', 'Road', 'Boulevard'][Math.floor(Math.random() * 4)]}, New York, NY`,
      coordinates,
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      distance: Number((0.5 + Math.random() * 4).toFixed(1)),
      businessHours: generateBusinessHours('09:00', '18:00'),
      contact: {
        email: `info@${names[i].toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        website: `https://www.${names[i].toLowerCase().replace(/\s+/g, '')}.com`,
        social: {
          facebook: `https://facebook.com/${names[i].toLowerCase().replace(/\s+/g, '')}`,
          instagram: `https://instagram.com/${names[i].toLowerCase().replace(/\s+/g, '')}`,
        },
      },
      products: Array.from({ length: 3 }, (_, j) => ({
        id: `${startId + i}-product-${j}`,
        name: `Product ${j + 1}`,
        price: Math.floor(20 + Math.random() * 180),
        description: `High-quality ${category.toLowerCase()} product with great features.`,
        image: `https://source.unsplash.com/400x300/?${category.toLowerCase()},product&sig=${startId + i}-${j}`,
      })),
    };
  });
};

export const dummyBusinesses: Business[] = [
  ...generateDummyBusinesses('restaurants', 100),
  ...generateDummyBusinesses('retail', 200),
  ...generateDummyBusinesses('real-estate', 300),
  ...generateDummyBusinesses('auto-sales', 400),
];