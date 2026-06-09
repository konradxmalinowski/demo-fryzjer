import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Scissors } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { testimonialsData } from '../data/testimonials.data'
import { TrendsMarquee } from '../components/home/TrendsMarquee'
import { useScrollReveal } from '../hooks/useScrollReveal'

const offerTiles = [
  {
    title: 'Fryzjerstwo damskie',
    desc: 'Strzyżenia, stylizacje i upięcia na każdą okazję',
    color: 'from-rose-900/70',
    bg: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80',
  },
  {
    title: 'Fryzjerstwo męskie',
    desc: 'Precyzyjne cięcia i stylizacje dla panów',
    color: 'from-stone-900/70',
    bg: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
  },
  {
    title: 'Koloryzacja',
    desc: 'Balayage, ombre, pasemka i zaawansowane techniki koloru',
    color: 'from-amber-900/70',
    bg: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&q=80',
  },
  {
    title: 'Barber',
    desc: 'Tradycyjne i nowoczesne usługi barberskie',
    color: 'from-zinc-900/70',
    bg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena: ${rating} z 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-[var(--color-gold)]' : 'text-[var(--color-taupe)]/30'}>★</span>
      ))}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!emblaApi || isHovered) return
    autoplayRef.current = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [emblaApi, isHovered])

  const offerRef = useScrollReveal<HTMLDivElement>()
  const trendsRef = useScrollReveal<HTMLDivElement>()
  const testimonialsRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center bg-[var(--color-espresso)] text-[var(--color-cream)]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl font-serif font-light tracking-wide mb-6"
          >
            Twoje włosy,<br />
            <span className="text-[var(--color-gold)]">nasza pasja</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/80 mb-10 max-w-xl mx-auto"
          >
            Nowoczesny salon fryzjerski w sercu miasta. Profesjonalne usługi i indywidualne podejście do każdego klienta.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/rezerwacja')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-gold)] text-[var(--color-espresso)] font-semibold text-lg hover:bg-yellow-400 transition-colors"
            >
              <Calendar size={20} />
              Zarezerwuj wizytę
            </button>
            <button
              onClick={() => navigate('/uslugi')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white border border-white/30 font-medium text-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <Scissors size={20} />
              Poznaj ofertę
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[var(--color-bg)]">
        <div ref={offerRef} className="reveal-on-scroll max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] text-center mb-12">
            Nasza oferta premium
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offerTiles.map((tile) => (
              <button
                key={tile.title}
                onClick={() => navigate('/uslugi')}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              >
                <img
                  src={tile.bg}
                  alt={tile.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${tile.color} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <div className="text-white font-semibold text-lg leading-tight">{tile.title}</div>
                  <div className="text-white/70 text-sm mt-1">{tile.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-warm)] dark:bg-[var(--color-charcoal)]">
        <div ref={trendsRef} className="reveal-on-scroll max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] text-center mb-2 px-4">
            Trendy i inspiracje
          </h2>
          <p className="text-center text-[var(--color-taupe)] mb-8 px-4">Odkryj najnowsze trendy fryzjerskie sezonu</p>
          <TrendsMarquee />
        </div>
      </section>

      <section className="py-20 px-4 bg-[var(--color-bg)]">
        <div ref={testimonialsRef} className="reveal-on-scroll max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] text-center mb-12">
            Opinie klientów
          </h2>
          <div className="overflow-hidden" ref={emblaRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex">
              {testimonialsData.map((t) => (
                <div key={t.id} className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3">
                  <div className="bg-[var(--color-warm)] dark:bg-[var(--color-charcoal)] rounded-2xl p-6 border border-[var(--color-taupe)]/20 h-full">
                    <StarRating rating={t.rating} />
                    <p className="text-[var(--color-espresso)] dark:text-[var(--color-cream)] mt-3 text-sm leading-relaxed">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] text-sm">{t.name}</div>
                        <div className="text-xs text-[var(--color-taupe)]">{t.service}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
