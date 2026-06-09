import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useDemoModal } from '../hooks/useDemoModal'
import { useScrollReveal } from '../hooks/useScrollReveal'

const contactSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: z.string().email('Nieprawidłowy adres email'),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków'),
})

type ContactFormData = z.infer<typeof contactSchema>

const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
const hours = [
  { day: 'Poniedziałek – Piątek', hours: '09:00 – 20:00' },
  { day: 'Sobota', hours: '09:00 – 18:00' },
  { day: 'Niedziela', hours: 'Nieczynne' },
]

export default function Contact() {
  const { triggerDemo } = useDemoModal()
  const todayName = days[new Date().getDay()]

  const formRef = useScrollReveal<HTMLDivElement>()
  const infoRef = useScrollReveal<HTMLDivElement>()

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = () => {
    triggerDemo()
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-2">
          Kontakt
        </h1>
        <p className="text-[var(--color-taupe)] mb-12">Jesteśmy tu dla Ciebie. Napisz do nas lub odwiedź nas w salonie.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={formRef} className="reveal-on-scroll">
            <h2 className="text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-6">
              Napisz do nas
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-1">
                  Imię *
                </label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                  placeholder="Twoje imię"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
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
                  Wiadomość *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] resize-none"
                  placeholder="Twoja wiadomość..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--color-espresso)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-brown)] transition-colors"
              >
                Wyślij wiadomość
              </button>
            </form>
          </div>

          <div ref={infoRef} className="reveal-on-scroll space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-4">
                Informacje
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                  <div className="text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                    ul. Elegancka 15<br />
                    00-000 Warszawa
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[var(--color-gold)] flex-shrink-0" />
                  <a href="tel:+48123456789" className="text-[var(--color-espresso)] dark:text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors">
                    +48 123 456 789
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[var(--color-gold)] flex-shrink-0" />
                  <a href="mailto:salon@example.pl" className="text-[var(--color-espresso)] dark:text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors">
                    salon@example.pl
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-3 uppercase tracking-wide">
                <Clock size={16} className="text-[var(--color-gold)]" />
                Godziny otwarcia
              </h3>
              <div className="space-y-2">
                {hours.map(({ day, hours: h }) => {
                  const isToday = day.includes(todayName)
                  return (
                    <div
                      key={day}
                      className={`flex justify-between text-sm px-3 py-2 rounded-lg ${
                        isToday
                          ? 'bg-[var(--color-gold)]/15 font-semibold text-[var(--color-espresso)] border border-[var(--color-gold)]/30'
                          : 'text-[var(--color-taupe)]'
                      }`}
                    >
                      <span>{day}</span>
                      <span>{h}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[var(--color-taupe)]/20 h-48">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=21.0%2C52.2%2C21.1%2C52.3&layer=mapnik"
                title="Mapa salonu"
                className="w-full h-full border-0"
                loading="lazy"
                aria-label="Mapa lokalizacji salonu"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
