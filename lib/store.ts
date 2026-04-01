import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RegistrationData } from '@/types'

interface ConferenceStore {
  registrations: RegistrationData[]
  addRegistration: (registration: RegistrationData) => void
  removeRegistration: (id: string) => void
  clearRegistrations: () => void
}

export const useConferenceStore = create<ConferenceStore>()(
  persist(
    (set) => ({
      registrations: [],
      addRegistration: (registration) =>
        set((state) => ({
          registrations: [...state.registrations, registration],
        })),
      removeRegistration: (id) =>
        set((state) => ({
          registrations: state.registrations.filter((r) => r.id !== id),
        })),
      clearRegistrations: () => set({ registrations: [] }),
    }),
    {
      name: 'conference-storage',
    }
  )
)
