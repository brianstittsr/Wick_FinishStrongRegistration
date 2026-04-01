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
  
  // Speaker-specific fields
  credentials?: string
  presentationTitle?: string
  timeSlot_7_8?: boolean
  timeSlot_8_9?: boolean
  timeSlot_9_10?: boolean
  timeSlot_10_11?: boolean
  timeSlot_11_12?: boolean
  timeSlotNotes?: string
  ownLaptop?: boolean
  conferenceLaptop?: boolean
  projectorScreen?: boolean
  hdmiConnection?: boolean
  handheldMic?: boolean
  lavalierMic?: boolean
  podiumMic?: boolean
  audioForVideo?: boolean
  internetAccess?: boolean
  laptopType?: string
  avNotes?: string
  noFoodAllergies?: boolean
  hasFoodAllergies?: boolean
  allergyDetails?: string
  vegetarian?: boolean
  vegan?: boolean
  glutenFree?: boolean
  dairyFree?: boolean
  nutFree?: boolean
  kosher?: boolean
  halal?: boolean
  dietaryOther?: string
  mobilityNone?: boolean
  mobilityCane?: boolean
  mobilityWalker?: boolean
  mobilityManualWheelchair?: boolean
  mobilityPowerWheelchair?: boolean
  mobilityServiceAnimal?: boolean
  mobilityOther?: string
  noSupportPerson?: boolean
  hasSupportPerson?: boolean
  supportPersonRole?: string
  additionalInfo?: string
  
  // Payment tracking
  paymentReceived?: boolean
  paymentAmount?: number
  paymentDate?: string
  paymentNotes?: string
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
