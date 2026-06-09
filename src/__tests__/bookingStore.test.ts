import { describe, it, expect, beforeEach } from 'vitest'

describe('bookingStore', () => {
  beforeEach(async () => {
    const { useBookingStore } = await import('../store/bookingStore')
    useBookingStore.getState().reset()
  })

  it('initializes at step 1 with null selections', async () => {
    const { useBookingStore } = await import('../store/bookingStore')
    const state = useBookingStore.getState()
    expect(state.step).toBe(1)
    expect(state.service).toBeNull()
    expect(state.stylist).toBeNull()
    expect(state.day).toBeNull()
    expect(state.time).toBeNull()
  })

  it('setService persists service across step navigation', async () => {
    const { useBookingStore } = await import('../store/bookingStore')
    const { setService, nextStep } = useBookingStore.getState()
    setService({ id: 'test-service', name: 'Test Service' } as Parameters<typeof setService>[0])
    nextStep()
    expect(useBookingStore.getState().service?.id).toBe('test-service')
    expect(useBookingStore.getState().step).toBe(2)
  })

  it('reset clears all state back to step 1', async () => {
    const { useBookingStore } = await import('../store/bookingStore')
    const { setService, nextStep, reset } = useBookingStore.getState()
    setService({ id: 'svc', name: 'Svc' } as Parameters<typeof setService>[0])
    nextStep()
    reset()
    const state = useBookingStore.getState()
    expect(state.step).toBe(1)
    expect(state.service).toBeNull()
  })

  it('setStylist stores stylist and can advance to step 3', async () => {
    const { useBookingStore } = await import('../store/bookingStore')
    const { setStylist, nextStep } = useBookingStore.getState()
    setStylist({ id: 'anna', name: 'Anna' } as Parameters<typeof setStylist>[0])
    nextStep()
    nextStep()
    expect(useBookingStore.getState().stylist?.id).toBe('anna')
  })

  it('setDay and setTime store values correctly', async () => {
    const { useBookingStore } = await import('../store/bookingStore')
    const { setDay, setTime } = useBookingStore.getState()
    setDay('2025-01-15')
    setTime('10:00')
    const state = useBookingStore.getState()
    expect(state.day).toBe('2025-01-15')
    expect(state.time).toBe('10:00')
  })
})
