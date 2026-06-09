import { useRef } from 'react'
import { slotsData } from '../../data/slots.data'
import type { SlotStatus } from '../../data/slots.data'
import { useBookingStore } from '../../store/bookingStore'

const statusStyles: Record<SlotStatus, string> = {
  zielony: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 cursor-pointer',
  żółty: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 cursor-pointer',
  szary: 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60',
}

const statusLabel: Record<SlotStatus, string> = {
  zielony: 'Dostępny',
  żółty: 'Ostatnie miejsca',
  szary: 'Brak miejsc',
}

export function DaySlider() {
  const { day, time, setDay, setTime } = useBookingStore()
  const sliderRef = useRef<HTMLDivElement>(null)

  const selectedDayData = slotsData.find((d) => d.date === day) ?? slotsData[0]

  return (
    <div className="space-y-6">
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
        aria-label="Wybierz dzień"
      >
        {slotsData.map((daySlot) => {
          const isSelected = daySlot.date === (day ?? slotsData[0].date)
          return (
            <button
              key={daySlot.date}
              onClick={() => setDay(daySlot.date)}
              className={`snap-start flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-espresso)]'
                  : 'border-[var(--color-taupe)]/30 bg-[var(--color-warm)] text-[var(--color-espresso)] hover:border-[var(--color-gold)]/50'
              }`}
              aria-pressed={isSelected}
              aria-label={`${daySlot.dayLabel} ${daySlot.dateLabel}`}
            >
              <span className="text-xs font-medium uppercase tracking-wide opacity-70">{daySlot.dayLabel}</span>
              <span className="text-2xl font-bold mt-1">{daySlot.dateLabel}</span>
            </button>
          )
        })}
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--color-taupe)] mb-3">Dostępne godziny</h4>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {selectedDayData.slots.map((slot) => {
            const isSelected = slot.time === time
            const disabled = slot.status === 'szary'
            return (
              <button
                key={slot.time}
                onClick={() => !disabled && setTime(slot.time)}
                disabled={disabled}
                title={statusLabel[slot.status]}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                  isSelected
                    ? 'bg-[var(--color-espresso)] text-[var(--color-cream)] border-[var(--color-espresso)]'
                    : statusStyles[slot.status]
                }`}
                aria-pressed={isSelected}
                aria-label={`${slot.time} — ${statusLabel[slot.status]}`}
              >
                {slot.time}
              </button>
            )
          })}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-[var(--color-taupe)]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block" />Dostępny</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />Ostatnie miejsca</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />Brak miejsc</span>
        </div>
      </div>
    </div>
  )
}
