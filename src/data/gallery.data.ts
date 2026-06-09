export type GalleryCategory = 'Damskie' | 'Męskie' | 'Koloryzacje' | 'Barber'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  aspectRatio: 'square' | 'portrait' | 'landscape'
}

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80',
    alt: 'Fryzura damska - cięcie bob',
    category: 'Damskie',
    aspectRatio: 'portrait',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&q=80',
    alt: 'Koloryzacja - balayage',
    category: 'Koloryzacje',
    aspectRatio: 'landscape',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    alt: 'Strzyżenie męskie - fade',
    category: 'Barber',
    aspectRatio: 'square',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    alt: 'Fryzura damska - długie fale',
    category: 'Damskie',
    aspectRatio: 'portrait',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    alt: 'Koloryzacja - ombre',
    category: 'Koloryzacje',
    aspectRatio: 'square',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
    alt: 'Strzyżenie męskie klasyczne',
    category: 'Męskie',
    aspectRatio: 'landscape',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80',
    alt: 'Pasemka i rozjaśnienia',
    category: 'Koloryzacje',
    aspectRatio: 'portrait',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?w=600&q=80',
    alt: 'Brodogolenie - barber',
    category: 'Barber',
    aspectRatio: 'square',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=600&q=80',
    alt: 'Fryzura damska - pixie cut',
    category: 'Damskie',
    aspectRatio: 'landscape',
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80',
    alt: 'Stylizacja i upięcia',
    category: 'Damskie',
    aspectRatio: 'portrait',
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=600&q=80',
    alt: 'Fade z deseniem',
    category: 'Barber',
    aspectRatio: 'square',
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80',
    alt: 'Koloryzacja - pastelowe odcienie',
    category: 'Koloryzacje',
    aspectRatio: 'landscape',
  },
]
