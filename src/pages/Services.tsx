import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { servicesData } from '../data/services.data'
import type { ServiceCategory } from '../data/services.data'
import { useBookingStore } from '../store/bookingStore'

const categories: ServiceCategory[] = ['Damskie', 'Męskie', 'Koloryzacja', 'Barber', 'Pielęgnacja']

const badgeColors: Record<string, string> = {
  'Bestseller': 'bg-[var(--color-gold)]/20 text-[var(--color-espresso)]',
  'Nowość': 'bg-blue-100 text-blue-800',
  'Wymaga konsultacji': 'bg-purple-100 text-purple-800',
}

export default function Services() {
  const navigate = useNavigate()
  const { setService, goToStep } = useBookingStore()
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Damskie')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = servicesData.filter((s) => s.category === activeCategory)

  const handleSelect = (svc: typeof servicesData[0]) => {
    setService(svc)
    goToStep(2)
    navigate('/rezerwacja')
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-2">
          Nasze Usługi
        </h1>
        <p className="text-[var(--color-taupe)] mb-8">Profesjonalne usługi fryzjerskie dla Ciebie.</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-espresso)] text-[var(--color-cream)] border-[var(--color-espresso)]'
                  : 'border-[var(--color-taupe)]/30 text-[var(--color-taupe)] hover:border-[var(--color-gold)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((svc) => (
            <div
              key={svc.id}
              className="rounded-xl border border-[var(--color-taupe)]/20 bg-[var(--color-warm)] overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
                className="w-full flex items-center justify-between p-4 text-left"
                aria-expanded={expanded === svc.id}
              >
                <div className="flex items-start gap-3">
                  <div>
                    <div className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)]">{svc.name}</div>
                    <div className="flex items-center gap-1 text-sm text-[var(--color-taupe)] mt-0.5">
                      <Clock size={13} />
                      <span>{svc.duration} min</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap mt-0.5">
                    {svc.badges.map((b) => (
                      <span key={b} className={`text-xs px-2 py-0.5 rounded-full ${badgeColors[b]}`}>{b}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                    {svc.price} zł{svc.priceMax ? ` – ${svc.priceMax} zł` : ''}
                  </span>
                  {expanded === svc.id ? (
                    <ChevronUp size={16} className="text-[var(--color-taupe)]" />
                  ) : (
                    <ChevronDown size={16} className="text-[var(--color-taupe)]" />
                  )}
                </div>
              </button>
              {expanded === svc.id && (
                <div className="px-4 pb-4 border-t border-[var(--color-taupe)]/10 pt-3 flex items-center justify-between gap-4">
                  <p className="text-sm text-[var(--color-taupe)]">{svc.description}</p>
                  <button
                    onClick={() => handleSelect(svc)}
                    className="flex-shrink-0 px-4 py-2 rounded-lg bg-[var(--color-espresso)] text-[var(--color-cream)] text-sm font-medium hover:bg-[var(--color-brown)] transition-colors"
                  >
                    Wybierz
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
