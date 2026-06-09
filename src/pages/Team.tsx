import { useState } from 'react'
import { staffData } from '../data/staff.data'
import type { StaffMember } from '../data/staff.data'
import { StaffDrawer } from '../components/team/StaffDrawer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const availabilityStyle: Record<string, string> = {
  available: 'text-green-700 bg-green-100',
  limited: 'text-amber-700 bg-amber-100',
  unavailable: 'text-gray-500 bg-gray-100',
}
const availabilityLabel: Record<string, string> = {
  available: 'Dostępna/y dzisiaj',
  limited: 'Ostatnie miejsca',
  unavailable: 'Brak miejsc',
}

export default function Team() {
  const [selected, setSelected] = useState<StaffMember | null>(null)
  const gridRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] mb-2">
          Nasz Zespół
        </h1>
        <p className="text-[var(--color-taupe)] mb-12">
          Poznaj naszych ekspertów – pasjonatów fryzjerstwa z wieloletnim doświadczeniem.
        </p>

        <div ref={gridRef} className="reveal-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffData.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelected(member)}
              className="group bg-[var(--color-warm)] dark:bg-[var(--color-charcoal)] rounded-2xl overflow-hidden border border-[var(--color-taupe)]/20 hover:border-[var(--color-gold)]/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                  {member.name}
                </h2>
                <p className="text-sm text-[var(--color-taupe)] mt-0.5">{member.role}</p>
                <div className={`mt-3 inline-flex text-xs px-2 py-0.5 rounded-full ${availabilityStyle[member.availability]}`}>
                  {availabilityLabel[member.availability]}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {member.specializations.slice(0, 2).map((spec) => (
                    <span key={spec} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-gold)]/15 text-[var(--color-espresso)] dark:text-[var(--color-cream)]">
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[var(--color-gold)] mt-3 group-hover:underline">Zobacz profil →</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <StaffDrawer member={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
