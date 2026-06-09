export type ServiceCategory = 'Damskie' | 'Męskie' | 'Koloryzacja' | 'Barber' | 'Pielęgnacja'
export type ServiceBadge = 'Bestseller' | 'Nowość' | 'Wymaga konsultacji'

export interface Service {
  id: string
  category: ServiceCategory
  name: string
  duration: number
  price: number
  priceMax?: number
  description: string
  badges: ServiceBadge[]
}

export const servicesData: Service[] = [
  {
    id: 'strzyżenie-damskie',
    category: 'Damskie',
    name: 'Strzyżenie damskie',
    duration: 60,
    price: 80,
    description: 'Profesjonalne strzyżenie włosów dostosowane do kształtu twarzy i stylu życia.',
    badges: ['Bestseller'],
  },
  {
    id: 'strzyżenie-i-modelowanie',
    category: 'Damskie',
    name: 'Strzyżenie + modelowanie',
    duration: 90,
    price: 120,
    description: 'Strzyżenie z pełną stylizacją i blow-out.',
    badges: [],
  },
  {
    id: 'czesanie-upięcia',
    category: 'Damskie',
    name: 'Czesanie / Upięcia',
    duration: 60,
    price: 100,
    priceMax: 180,
    description: 'Profesjonalne upięcia na wesela, studniówki i inne uroczystości.',
    badges: [],
  },
  {
    id: 'keratynowe-prostowanie',
    category: 'Damskie',
    name: 'Keratynowe prostowanie',
    duration: 180,
    price: 350,
    description: 'Trwałe wygładzenie włosów na kilka miesięcy. Eliminuje puszenie i skraca czas stylizacji.',
    badges: ['Wymaga konsultacji'],
  },
  {
    id: 'strzyżenie-meskie',
    category: 'Męskie',
    name: 'Strzyżenie męskie',
    duration: 30,
    price: 50,
    description: 'Klasyczne lub nowoczesne strzyżenie męskie z uwzględnieniem preferencji.',
    badges: ['Bestseller'],
  },
  {
    id: 'strzyżenie-meskie-modelowanie',
    category: 'Męskie',
    name: 'Strzyżenie + modelowanie',
    duration: 45,
    price: 70,
    description: 'Strzyżenie ze stylizacją produktami fryzjerskimi.',
    badges: [],
  },
  {
    id: 'balayage',
    category: 'Koloryzacja',
    name: 'Balayage',
    duration: 180,
    price: 280,
    priceMax: 450,
    description: 'Naturalne, ręcznie malowane rozjaśnienia dające efekt słońcem całowane włosy.',
    badges: ['Bestseller', 'Wymaga konsultacji'],
  },
  {
    id: 'koloryzacja-globalna',
    category: 'Koloryzacja',
    name: 'Koloryzacja globalna',
    duration: 120,
    price: 160,
    priceMax: 220,
    description: 'Pełna zmiana koloru włosów lub odświeżenie obecnego koloru.',
    badges: ['Wymaga konsultacji'],
  },
  {
    id: 'pasemka',
    category: 'Koloryzacja',
    name: 'Pasemka / Highlights',
    duration: 150,
    price: 200,
    priceMax: 320,
    description: 'Klasyczne pasemka lub nowoczesne techniki rozjaśniania.',
    badges: [],
  },
  {
    id: 'ombre',
    category: 'Koloryzacja',
    name: 'Ombre / Sombre',
    duration: 150,
    price: 220,
    description: 'Płynne przejście kolorów od ciemniejszej nasady do jaśniejszych końców.',
    badges: ['Nowość'],
  },
  {
    id: 'fade',
    category: 'Barber',
    name: 'Fade',
    duration: 45,
    price: 70,
    description: 'Precyzyjne cieniowanie bocznych partii włosów z płynnym przejściem.',
    badges: ['Bestseller'],
  },
  {
    id: 'strzyżenie-brody',
    category: 'Barber',
    name: 'Strzyżenie brody',
    duration: 30,
    price: 40,
    description: 'Profesjonalne formowanie i strzyżenie brody.',
    badges: [],
  },
  {
    id: 'hot-towel-shave',
    category: 'Barber',
    name: 'Hot Towel Shave',
    duration: 45,
    price: 60,
    description: 'Tradycyjne golenie na mokro z gorącymi kompresami.',
    badges: ['Nowość'],
  },
  {
    id: 'botox-wlosy',
    category: 'Pielęgnacja',
    name: 'Botox do włosów',
    duration: 120,
    price: 250,
    description: 'Intensywna regeneracja zniszczonych włosów. Przywraca blask i miękkość.',
    badges: ['Nowość', 'Wymaga konsultacji'],
  },
  {
    id: 'nawilzanie',
    category: 'Pielęgnacja',
    name: 'Nawilżanie i regeneracja',
    duration: 60,
    price: 120,
    description: 'Profesjonalna kuracja nawilżająca i odbudowująca strukturę włosa.',
    badges: [],
  },
]
