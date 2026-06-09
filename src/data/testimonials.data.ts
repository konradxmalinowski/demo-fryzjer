export interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  service: string
}

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Katarzyna M.',
    avatar: 'https://i.pravatar.cc/80?img=1',
    rating: 5,
    text: 'Niesamowite efekty! Anna zrobiła mi balayage dokładnie tak jak chciałam. Salon jest przepiękny, a obsługa na najwyższym poziomie. Na pewno wrócę!',
    service: 'Balayage',
  },
  {
    id: 't2',
    name: 'Monika K.',
    avatar: 'https://i.pravatar.cc/80?img=2',
    rating: 5,
    text: 'Pierwsza wizyta w tym salonie i jestem zachwycona. Marta cudownie wymodelowała moje włosy. Atmosfera relaksująca, ceny adekwatne do jakości.',
    service: 'Strzyżenie + modelowanie',
  },
  {
    id: 't3',
    name: 'Tomasz W.',
    avatar: 'https://i.pravatar.cc/80?img=3',
    rating: 5,
    text: 'Piotr robi najlepsze fade w mieście. Precyzja, szybkość i profesjonalizm. Zawsze wychodzę zadowolony. Polecam każdemu!',
    service: 'Fade',
  },
  {
    id: 't4',
    name: 'Agnieszka L.',
    avatar: 'https://i.pravatar.cc/80?img=4',
    rating: 4,
    text: 'Botox do włosów zdziałał cuda! Moje włosy są teraz jedwabiste i błyszczące. Karolina doskonale dobrała zabieg do moich potrzeb.',
    service: 'Botox do włosów',
  },
  {
    id: 't5',
    name: 'Ewa S.',
    avatar: 'https://i.pravatar.cc/80?img=5',
    rating: 5,
    text: 'Stylizacja ślubna była perfekcyjna! Marta zadbała o każdy detal. Fryzura trzymała przez całą uroczystość. Serdecznie polecam!',
    service: 'Czesanie / Upięcia',
  },
  {
    id: 't6',
    name: 'Marcin P.',
    avatar: 'https://i.pravatar.cc/80?img=6',
    rating: 5,
    text: 'Najlepsza hot towel shave jakiej doświadczyłem. Rytuał prawdziwego barbera. Polecam wszystkim panom ceniącym starą szkołę.',
    service: 'Hot Towel Shave',
  },
]
