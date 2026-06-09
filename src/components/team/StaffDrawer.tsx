import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Link, Music, Calendar } from 'lucide-react'
import type { StaffMember } from '../../data/staff.data'
import { useBookingStore } from '../../store/bookingStore'

interface Props {
  member: StaffMember | null
  onClose: () => void
}

export function StaffDrawer({ member, onClose }: Props) {
  const navigate = useNavigate()
  const { setStylist, goToStep } = useBookingStore()

  const handleBook = () => {
    if (!member) return
    setStylist(member)
    goToStep(3)
    navigate('/rezerwacja')
    onClose()
  }

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[var(--color-cream)] dark:bg-[var(--color-charcoal)] shadow-2xl flex flex-col overflow-y-auto"
            aria-label={`Profil: ${member.name}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-taupe)]/20">
              <h2 className="text-lg font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                {member.name}
              </h2>
              <button
                onClick={onClose}
                aria-label="Zamknij panel"
                className="p-2 rounded-full hover:bg-[var(--color-taupe)]/20 transition-colors text-[var(--color-espresso)] dark:text-[var(--color-cream)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[var(--color-gold)]"
                  loading="lazy"
                />
                <div>
                  <div className="text-[var(--color-taupe)] text-sm">{member.role}</div>
                  <div className="text-sm mt-1 text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                    Doświadczenie: <strong>{member.experience}</strong>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-[var(--color-taupe)] hover:text-[var(--color-gold)] transition-colors"
                    >
                      <Link size={18} />
                    </a>
                    <a
                      href={member.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-[var(--color-taupe)] hover:text-[var(--color-gold)] transition-colors"
                    >
                      <Music size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--color-taupe)] leading-relaxed">{member.bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-2 uppercase tracking-wide">
                  Specjalizacje
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-espresso)] border border-[var(--color-gold)]/30"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-3 uppercase tracking-wide">
                  Ostatnie realizacje
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-[var(--color-taupe)]/20 overflow-hidden"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1580618672591-eb180b1a973f' : i === 2 ? '1562322140-8baeececf3df' : '1605497788044-5a32c7078486'}?w=200&q=70`}
                        alt={`Realizacja ${i}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBook}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-espresso)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-brown)] transition-colors"
              >
                <Calendar size={16} />
                Zarezerwuj u {member.name.split(' ')[0]}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
