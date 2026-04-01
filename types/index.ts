export interface RegistrationData {
  id: string
  registrationType: 'attendee' | 'speaker'
  fname: string
  lname: string
  email: string
  phone?: string
  org?: string
  jobtitle?: string
  city?: string
  zip?: string
  bfast_mon: boolean
  bfast_tue: boolean
  lunch: boolean
  pref_spk?: string
  alt_spk?: string
  dinner: boolean
  vision_screening: boolean
  referral?: string
  createdAt: string
}

export interface ConferenceStats {
  totalAttendees: number
  mondayBreakfast: number
  tuesdayBreakfast: number
  lunch: number
  dinner: number
  visionScreening: number
  speakerPreferences: Record<string, number>
}

export interface Recommendations {
  mondayBreakfastLunches: number
  tuesdayBreakfastLunches: number
  lunchMeals: number
  totalSeatsNeeded: number
  roomCapacity: number
  speakerTableSeating: Record<string, number>
}
