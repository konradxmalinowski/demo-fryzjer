export interface StaffMember {
  id: string
  name: string
  role: string
  bio: string
  specializations: string[]
  experience: string
  instagram: string
  tiktok: string
  lastWorks: string[]
  availability: 'available' | 'limited' | 'unavailable'
  image: string
}

export const staffData: StaffMember[] = [
  {
    id: 'anna-kowalska',
    name: 'Anna Kowalska',
    role: 'Senior Stylistka',
    bio: 'Anna specjalizuje się w nowoczesnych technikach koloryzacji i stylizacji. Z pasją do fryzjerstwa od ponad 10 lat, jej prace zdobyły nagrody na ogólnopolskich konkursach.',
    specializations: ['Balayage', 'Koloryzacja', 'Strzyżenie damskie', 'Keratynowe prostowanie'],
    experience: '10 lat',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    lastWorks: ['balayage1', 'color1', 'cut1'],
    availability: 'available',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
  },
  {
    id: 'marta-nowak',
    name: 'Marta Nowak',
    role: 'Stylistka',
    bio: 'Marta to mistrzyni cięć geometrycznych i stylizacji na specjalne okazje. Uwielbia pracować z długimi włosami, tworząc ponadczasowe fryzury.',
    specializations: ['Cięcia geometryczne', 'Stylizacja ślubna', 'Upięcia', 'Przedłużanie włosów'],
    experience: '7 lat',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    lastWorks: ['updo1', 'geometric1', 'wedding1'],
    availability: 'limited',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80',
  },
  {
    id: 'julia-wisniowska',
    name: 'Julia Wiśniewska',
    role: 'Kolorystka',
    bio: 'Julia jest ekspertką w dziedzinie koloryzacji. Jej specjalnością jest color correction i zaawansowane techniki blondu.',
    specializations: ['Color correction', 'Rozjaśnianie', 'Pasemka', 'Ombre'],
    experience: '8 lat',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    lastWorks: ['ombre1', 'blonde1', 'highlights1'],
    availability: 'available',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80',
  },
  {
    id: 'piotr-zielinski',
    name: 'Piotr Zieliński',
    role: 'Barber',
    bio: 'Piotr to nasz specjalista od męskich fryzur i brodogolenia. Łączy tradycyjne techniki barberskie z nowoczesnymi trendami.',
    specializations: ['Strzyżenie męskie', 'Fade', 'Brodogolenie', 'Hot towel shave'],
    experience: '6 lat',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    lastWorks: ['fade1', 'beard1', 'mens1'],
    availability: 'available',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
  },
  {
    id: 'karolina-dabrowska',
    name: 'Karolina Dąbrowska',
    role: 'Stylistka & Kosmetyczka',
    bio: 'Karolina łączy fryzjerstwo z zabiegami pielęgnacyjnymi. Specjalizuje się w terapii włosów oraz naturalnych metodach pielęgnacji.',
    specializations: ['Terapia włosów', 'Keratyna', 'Pielęgnacja', 'Botox do włosów'],
    experience: '5 lat',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    lastWorks: ['treatment1', 'keratin1', 'care1'],
    availability: 'unavailable',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80',
  },
]
