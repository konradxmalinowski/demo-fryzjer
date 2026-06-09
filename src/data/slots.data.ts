export type SlotStatus = 'zielony' | 'żółty' | 'szary'

export interface TimeSlot {
  time: string
  status: SlotStatus
}

export interface DaySlots {
  date: string
  dayLabel: string
  dateLabel: string
  slots: TimeSlot[]
}

function generateSlots(date: Date): DaySlots {
  const days = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb']
  const dayLabel = days[date.getDay()]
  const dateLabel = date.getDate().toString()

  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  const statuses: SlotStatus[] = ['zielony', 'zielony', 'żółty', 'szary', 'zielony', 'zielony', 'żółty', 'szary', 'zielony', 'zielony']

  const shuffled = statuses.map((s, i) => ({
    time: times[i],
    status: s,
  }))

  return {
    date: date.toISOString().split('T')[0],
    dayLabel,
    dateLabel,
    slots: shuffled,
  }
}

export function getSlotsForNext14Days(): DaySlots[] {
  const result: DaySlots[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    result.push(generateSlots(d))
  }

  return result
}

export const slotsData: DaySlots[] = getSlotsForNext14Days()
