import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { servicesData } from '../../data/services.data'
import type { ServiceCategory } from '../../data/services.data'
import { staffData } from '../../data/staff.data'
import { useBookingStore } from '../../store/bookingStore'
import { useDemoModal } from '../../hooks/useDemoModal'
import { DaySlider } from './DaySlider'

const clientSchema = z.object({
  imię: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  telefon: z.string().regex(/^[0-9+\s-]{9,15}$/, 'Nieprawidłowy numer telefonu'),
  email: z.string().email('Nieprawidłowy adres email'),
  notatka: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

const STEPS = ['Usługa', 'Stylista', 'Termin', 'Dane']

const availabilityStyle: Record<string, string> = {
  available: 'text-green-600 bg-green-50 border-green-200',
  limited: 'text-amber-600 bg-amber-50 border-amber-200',
  unavailable: 'text-gray-400 bg-gray-50 border-gray-200',
}
const availabilityLabel: Record<string, string> = {
  available: 'Dostępny dzisiaj',
  limited: 'Ostatnie miejsca',
  unavailable: 'Brak miejsc',
}

const categories: ServiceCategory[] = ['Damskie', 'Męskie', 'Koloryzacja', 'Barber', 'Pielęgnacja']

export function BookingWizard() {
  const { step, service, stylist, day, time, setService, setStylist, nextStep, prevStep } = useBookingStore()
  const { triggerDemo } = useDemoModal()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'Wszystkie'>('Wszystkie')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    mode: 'onChange',
  })

  const filteredServices = servicesData.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Wszystkie' || s.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const onSubmit = () => {
    triggerDemo()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const done = step > stepNum
          const active = step === stepNum
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
                  done
                    ? 'bg-[var(--color-espresso)] border-[var(--color-espresso)] text-[var(--color-cream)]'
                    : active
                    ? 'border-[var(--color-gold)] text-[var(--color-espresso)]'
                    : 'border-[var(--color-taupe)]/30 text-[var(--color-taupe)]'
                }`}
              >
                {done ? <Check size={14} /> : stepNum}
              </div>
              <span className={`text-sm hidden sm:inline ${active ? 'text-[var(--color-espresso)] font-medium' : 'text-[var(--color-taupe)]'}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-8 sm:w-16 ${step > stepNum ? 'bg-[var(--color-espresso)]' : 'bg-[var(--color-taupe)]/30'}`} />
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">Wybierz usługę</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-taupe)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Szukaj usługi..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Wszystkie', ...categories] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      activeCategory === cat
                        ? 'bg-[var(--color-espresso)] text-[var(--color-cream)] border-[var(--color-espresso)]'
                        : 'border-[var(--color-taupe)]/30 text-[var(--color-taupe)] hover:border-[var(--color-gold)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filteredServices.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => { setService(svc); nextStep() }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      service?.id === svc.id
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
                        : 'border-[var(--color-taupe)]/20 hover:border-[var(--color-gold)]/50 bg-[var(--color-warm)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)]">{svc.name}</div>
                        <div className="text-sm text-[var(--color-taupe)] mt-0.5">{svc.duration} min</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                          {svc.price} zł{svc.priceMax ? ` – ${svc.priceMax} zł` : ''}
                        </div>
                        <div className="flex gap-1 mt-1 justify-end flex-wrap">
                          {svc.badges.map((badge) => (
                            <span key={badge} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-espresso)]">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">Wybierz stylistę</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => { setStylist(null); nextStep() }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    stylist === null
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
                      : 'border-[var(--color-taupe)]/20 hover:border-[var(--color-gold)]/50 bg-[var(--color-warm)]'
                  }`}
                >
                  <div className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)]">Dowolny stylista</div>
                  <div className="text-sm text-[var(--color-taupe)] mt-0.5">Przydzielimy najlepszego dostępnego</div>
                </button>
                {staffData.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => { if (member.availability !== 'unavailable') { setStylist(member); nextStep() } }}
                    disabled={member.availability === 'unavailable'}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      stylist?.id === member.id
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
                        : member.availability === 'unavailable'
                        ? 'border-[var(--color-taupe)]/10 opacity-50 cursor-not-allowed bg-[var(--color-warm)]'
                        : 'border-[var(--color-taupe)]/20 hover:border-[var(--color-gold)]/50 bg-[var(--color-warm)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                      <div>
                        <div className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)]">{member.name}</div>
                        <div className="text-xs text-[var(--color-taupe)]">{member.role}</div>
                      </div>
                    </div>
                    <div className={`mt-2 text-xs px-2 py-0.5 rounded-full border inline-block ${availabilityStyle[member.availability]}`}>
                      {availabilityLabel[member.availability]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">Wybierz termin</h2>
              <DaySlider />
              {day && time && (
                <div className="mt-4 p-3 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-sm text-[var(--color-espresso)]">
                  Wybrany termin: <strong>{day}</strong> o <strong>{time}</strong>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">Twoje dane</h2>
                <div className="mt-3 p-4 rounded-xl bg-[var(--color-warm)] border border-[var(--color-taupe)]/20 text-sm space-y-1">
                  <div className="text-[var(--color-taupe)]">Podsumowanie rezerwacji</div>
                  {service && <div><strong>Usługa:</strong> {service.name} ({service.price} zł)</div>}
                  <div><strong>Stylista:</strong> {stylist ? stylist.name : 'Dowolny stylista'}</div>
                  {day && <div><strong>Termin:</strong> {day} {time && `o ${time}`}</div>}
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-1">
                    Imię *
                  </label>
                  <input
                    {...register('imię')}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                    placeholder="Twoje imię"
                  />
                  {errors.imię && <p className="text-red-500 text-xs mt-1">{errors.imię.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-1">
                    Telefon *
                  </label>
                  <input
                    {...register('telefon')}
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                    placeholder="+48 000 000 000"
                  />
                  {errors.telefon && <p className="text-red-500 text-xs mt-1">{errors.telefon.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                    placeholder="twoj@email.pl"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-1">
                    Notatka dla stylisty
                  </label>
                  <textarea
                    {...register('notatka')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] resize-none"
                    placeholder="Dodatkowe informacje..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[var(--color-espresso)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-brown)] transition-colors"
                >
                  Potwierdź rezerwację
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 text-[var(--color-taupe)] hover:border-[var(--color-gold)] transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            Wstecz
          </button>
        )}
        {step < 4 && step !== 1 && (
          <button
            onClick={nextStep}
            disabled={step === 3 && (!day || !time)}
            className="ml-auto flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--color-espresso)] text-[var(--color-cream)] hover:bg-[var(--color-brown)] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Dalej
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
