import { create } from 'zustand'
import type { Service } from '../data/services.data'
import type { StaffMember } from '../data/staff.data'

interface ClientData {
  imię: string
  telefon: string
  email: string
  notatka: string
}

interface BookingState {
  step: number
  service: Service | null
  stylist: StaffMember | null
  day: string | null
  time: string | null
  client: ClientData
  setService: (service: Service | null) => void
  setStylist: (stylist: StaffMember | null) => void
  setDay: (day: string) => void
  setTime: (time: string) => void
  setClient: (client: Partial<ClientData>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  reset: () => void
}

const defaultClient: ClientData = {
  imię: '',
  telefon: '',
  email: '',
  notatka: '',
}

export const useBookingStore = create<BookingState>()((set) => ({
  step: 1,
  service: null,
  stylist: null,
  day: null,
  time: null,
  client: { ...defaultClient },

  setService: (service) => set({ service }),
  setStylist: (stylist) => set({ stylist }),
  setDay: (day) => set({ day, time: null }),
  setTime: (time) => set({ time }),
  setClient: (partial) =>
    set((state) => ({ client: { ...state.client, ...partial } })),

  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  goToStep: (step) => set({ step }),

  reset: () =>
    set({
      step: 1,
      service: null,
      stylist: null,
      day: null,
      time: null,
      client: { ...defaultClient },
    }),
}))
