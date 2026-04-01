"use client"

import { useState } from "react"
import { useConferenceStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const speakers = [
  "Monique Barbour, M.D., MHA — Visual Health",
  "Christopher Griffin, M.D. — Pediatric Care",
  "Mack Roach III, M.D., Ph.D., FASTRO — Male Health",
  "George L. Saunders, M.D. — Geriatric Health",
  "Ericka Griffin, M.D. — Women's Health",
  "Timothy C. Summers, Ph.D., VP, CIO — Global Health & AI"
]

export function RegistrationForm() {
  const addRegistration = useConferenceStore((state) => state.addRegistration)
  const registrations = useConferenceStore((state) => state.registrations)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showSpeakerSelect, setShowSpeakerSelect] = useState(false)
  const [formData, setFormData] = useState({
    registrationType: "" as "attendee" | "speaker" | "",
    fname: "",
    lname: "",
    org: "",
    jobtitle: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    bfast_mon: false,
    lunch: false,
    dinner: false,
    bfast_tue: false,
    vision_screening: false,
    pref_spk: "",
    alt_spk: "",
    referral: "",
    credentials: "",
    presentationTitle: "",
    timeSlot_7_8: false,
    timeSlot_8_9: false,
    timeSlot_9_10: false,
    timeSlot_10_11: false,
    timeSlot_11_12: false,
    timeSlotNotes: "",
    ownLaptop: false,
    conferenceLaptop: false,
    projectorScreen: false,
    hdmiConnection: false,
    handheldMic: false,
    lavalierMic: false,
    podiumMic: false,
    audioForVideo: false,
    internetAccess: false,
    laptopType: "",
    avNotes: "",
    noFoodAllergies: false,
    hasFoodAllergies: false,
    allergyDetails: "",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    kosher: false,
    halal: false,
    dietaryOther: "",
    mobilityNone: false,
    mobilityCane: false,
    mobilityWalker: false,
    mobilityManualWheelchair: false,
    mobilityPowerWheelchair: false,
    mobilityServiceAnimal: false,
    mobilityOther: "",
    noSupportPerson: false,
    hasSupportPerson: false,
    supportPersonRole: "",
    additionalInfo: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleLunchChange = (attending: boolean) => {
    setFormData(prev => ({ ...prev, lunch: attending }))
    setShowSpeakerSelect(attending)
    if (!attending) {
      setFormData(prev => ({ ...prev, pref_spk: "", alt_spk: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.registrationType) {
      toast.error("Please select if you are registering as an Attendee or Speaker")
      return
    }

    if (!formData.fname || !formData.lname || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    // Check for duplicate email
    const existingRegistration = registrations.find(r => r.email.toLowerCase() === formData.email.toLowerCase())
    if (existingRegistration) {
      const existingType = existingRegistration.registrationType === 'speaker' ? 'Speaker' : 'Attendee'
      toast.error(`This email is already registered as a ${existingType}: ${existingRegistration.fname} ${existingRegistration.lname}`)
      return
    }

    addRegistration({
      registrationType: formData.registrationType as 'attendee' | 'speaker',
      fname: formData.fname,
      lname: formData.lname,
      org: formData.org,
      jobtitle: formData.jobtitle,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      zip: formData.zip,
      bfast_mon: formData.bfast_mon,
      lunch: formData.lunch,
      dinner: formData.dinner,
      bfast_tue: formData.bfast_tue,
      vision_screening: formData.vision_screening,
      pref_spk: formData.pref_spk,
      alt_spk: formData.alt_spk,
      referral: formData.referral,
      credentials: formData.credentials,
      presentationTitle: formData.presentationTitle,
      timeSlot_7_8: formData.timeSlot_7_8,
      timeSlot_8_9: formData.timeSlot_8_9,
      timeSlot_9_10: formData.timeSlot_9_10,
      timeSlot_10_11: formData.timeSlot_10_11,
      timeSlot_11_12: formData.timeSlot_11_12,
      timeSlotNotes: formData.timeSlotNotes,
      ownLaptop: formData.ownLaptop,
      conferenceLaptop: formData.conferenceLaptop,
      projectorScreen: formData.projectorScreen,
      hdmiConnection: formData.hdmiConnection,
      handheldMic: formData.handheldMic,
      lavalierMic: formData.lavalierMic,
      podiumMic: formData.podiumMic,
      audioForVideo: formData.audioForVideo,
      internetAccess: formData.internetAccess,
      laptopType: formData.laptopType,
      avNotes: formData.avNotes,
      noFoodAllergies: formData.noFoodAllergies,
      hasFoodAllergies: formData.hasFoodAllergies,
      allergyDetails: formData.allergyDetails,
      vegetarian: formData.vegetarian,
      vegan: formData.vegan,
      glutenFree: formData.glutenFree,
      dairyFree: formData.dairyFree,
      nutFree: formData.nutFree,
      kosher: formData.kosher,
      halal: formData.halal,
      dietaryOther: formData.dietaryOther,
      mobilityNone: formData.mobilityNone,
      mobilityCane: formData.mobilityCane,
      mobilityWalker: formData.mobilityWalker,
      mobilityManualWheelchair: formData.mobilityManualWheelchair,
      mobilityPowerWheelchair: formData.mobilityPowerWheelchair,
      mobilityServiceAnimal: formData.mobilityServiceAnimal,
      mobilityOther: formData.mobilityOther,
      noSupportPerson: formData.noSupportPerson,
      hasSupportPerson: formData.hasSupportPerson,
      supportPersonRole: formData.supportPersonRole,
      additionalInfo: formData.additionalInfo,
      paymentReceived: false,
      paymentAmount: 0,
      paymentDate: '',
      paymentNotes: ''
    })

    try {
      await fetch("https://formspree.io/f/mbdpyrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
    } catch (error) {
      console.error("Form submission error:", error)
    }

    setShowSuccess(true)
    toast.success("Registration submitted successfully!")
    
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        registrationType: "",
        fname: "",
        lname: "",
        org: "",
        jobtitle: "",
        email: "",
        phone: "",
        city: "",
        zip: "",
        bfast_mon: false,
        lunch: false,
        dinner: false,
        bfast_tue: false,
        vision_screening: false,
        pref_spk: "",
        alt_spk: "",
        referral: "",
        credentials: "",
        presentationTitle: "",
        timeSlot_7_8: false,
        timeSlot_8_9: false,
        timeSlot_9_10: false,
        timeSlot_10_11: false,
        timeSlot_11_12: false,
        timeSlotNotes: "",
        ownLaptop: false,
        conferenceLaptop: false,
        projectorScreen: false,
        hdmiConnection: false,
        handheldMic: false,
        lavalierMic: false,
        podiumMic: false,
        audioForVideo: false,
        internetAccess: false,
        laptopType: "",
        avNotes: "",
        noFoodAllergies: false,
        hasFoodAllergies: false,
        allergyDetails: "",
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        nutFree: false,
        kosher: false,
        halal: false,
        dietaryOther: "",
        mobilityNone: false,
        mobilityCane: false,
        mobilityWalker: false,
        mobilityManualWheelchair: false,
        mobilityPowerWheelchair: false,
        mobilityServiceAnimal: false,
        mobilityOther: "",
        noSupportPerson: false,
        hasSupportPerson: false,
        supportPersonRole: "",
        additionalInfo: ""
      })
      setShowSpeakerSelect(false)
    }, 5000)
  }

  if (showSuccess) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            🎉 Registration Received!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-800">
          <p className="mb-4">
            Thank you for registering for <strong>Finishing Strong in the Age of AI</strong> — May 4–5, 2026, Paradise Island, Bahamas.
          </p>
          <p className="text-sm">
            If you selected meals, please mail payment to <strong>Dr. Gloria Frelix, 301 Dogwood Trail, Elizabeth City, NC 27909</strong> by <strong>April 20, 2026</strong>. <strong>Cash will not be accepted.</strong> Your Beyond the Podium table assignment (if applicable) will be included in your confirmation.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-green-100 border-2 border-green-600 rounded-lg px-4 py-2 inline-block">
        <span className="text-green-900 font-semibold">✅ No Registration Fee</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1B2A4A]">Registration Type *</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Please select whether you are registering as an attendee or speaker.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="registrationType"
                value="attendee"
                checked={formData.registrationType === "attendee"}
                onChange={handleInputChange}
                className="w-5 h-5"
                required
              />
              <div>
                <span className="font-semibold text-gray-900 block">Attendee</span>
                <span className="text-sm text-gray-600">I am attending the conference</span>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="registrationType"
                value="speaker"
                checked={formData.registrationType === "speaker"}
                onChange={handleInputChange}
                className="w-5 h-5"
                required
              />
              <div>
                <span className="font-semibold text-gray-900 block">Speaker</span>
                <span className="text-sm text-gray-600">I am presenting at the conference</span>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1B2A4A]">1 — Registration Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fname">First Name *</Label>
              <Input
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                placeholder="First name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lname">Last Name *</Label>
              <Input
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="org">Organization / Employer</Label>
            <Input
              id="org"
              name="org"
              value={formData.org}
              onChange={handleInputChange}
              placeholder="Organization"
            />
          </div>

          <div>
            <Label htmlFor="jobtitle">Job Title / Role</Label>
            <Input
              id="jobtitle"
              name="jobtitle"
              value={formData.jobtitle}
              onChange={handleInputChange}
              placeholder="Your role"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(___) ___-____"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="zip">State / ZIP</Label>
              <Input
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="State, ZIP"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.registrationType === "speaker" && (
        <>
          <Card className="border-2 border-amber-300 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-[#1B2A4A] flex items-center gap-2">
                🎤 Speaker Information — Name & Credentials
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Please provide your exact name and credentials as they should appear in all conference materials.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="credentials">Credentials (e.g., Ph.D., M.D., MHA, FASTRO)</Label>
                <Input
                  id="credentials"
                  name="credentials"
                  value={formData.credentials}
                  onChange={handleInputChange}
                  placeholder="Ph.D., M.D., MHA"
                />
              </div>
              <div>
                <Label htmlFor="presentationTitle">Presentation Title (exact wording)</Label>
                <Input
                  id="presentationTitle"
                  name="presentationTitle"
                  value={formData.presentationTitle}
                  onChange={handleInputChange}
                  placeholder="Your presentation title"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-[#1B2A4A]">⏰ Preferred Morning Presentation Time</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Check all time slots that work for you.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeSlot_7_8"
                  checked={formData.timeSlot_7_8}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">7:00 – 8:00 AM</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeSlot_8_9"
                  checked={formData.timeSlot_8_9}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">8:00 – 9:00 AM</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeSlot_9_10"
                  checked={formData.timeSlot_9_10}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">9:00 – 10:00 AM</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeSlot_10_11"
                  checked={formData.timeSlot_10_11}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">10:00 – 11:00 AM</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeSlot_11_12"
                  checked={formData.timeSlot_11_12}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">11:00 AM – 12:00 PM</span>
              </label>
              <div className="mt-4">
                <Label htmlFor="timeSlotNotes">Notes (e.g., not available before a specific time)</Label>
                <Input
                  id="timeSlotNotes"
                  name="timeSlotNotes"
                  value={formData.timeSlotNotes}
                  onChange={handleInputChange}
                  placeholder="Any scheduling constraints"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-[#1B2A4A]">🎥 Audio-Visual Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Equipment</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="ownLaptop" checked={formData.ownLaptop} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">I will use my own laptop</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="conferenceLaptop" checked={formData.conferenceLaptop} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Conference-provided laptop</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="projectorScreen" checked={formData.projectorScreen} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Projector & screen</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="hdmiConnection" checked={formData.hdmiConnection} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">HDMI connection</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="handheldMic" checked={formData.handheldMic} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Handheld microphone</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="lavalierMic" checked={formData.lavalierMic} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Lavalier microphone</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="podiumMic" checked={formData.podiumMic} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Podium microphone</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="audioForVideo" checked={formData.audioForVideo} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Audio for video/music</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="internetAccess" checked={formData.internetAccess} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Internet access during session</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="laptopType">Laptop type (Mac / PC) and any additional AV needs</Label>
                <Input
                  id="laptopType"
                  name="laptopType"
                  value={formData.laptopType}
                  onChange={handleInputChange}
                  placeholder="Mac, PC, or other AV requirements"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-[#1B2A4A]">🍽️ Food & Dietary Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="noFoodAllergies" checked={formData.noFoodAllergies} onChange={handleInputChange} className="w-4 h-4" />
                  <span className="text-sm font-semibold">No food allergies</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="hasFoodAllergies" checked={formData.hasFoodAllergies} onChange={handleInputChange} className="w-4 h-4" />
                  <span className="text-sm font-semibold">Food allergies (list below)</span>
                </label>
              </div>
              <div>
                <Label htmlFor="allergyDetails">Allergies or foods/ingredients strictly not allowed (medical, religious, or ethical)</Label>
                <Input
                  id="allergyDetails"
                  name="allergyDetails"
                  value={formData.allergyDetails}
                  onChange={handleInputChange}
                  placeholder="List any allergies or restrictions"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Dietary Preferences</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="vegetarian" checked={formData.vegetarian} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="vegan" checked={formData.vegan} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Vegan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="glutenFree" checked={formData.glutenFree} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Gluten-free</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="dairyFree" checked={formData.dairyFree} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Dairy-free</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="nutFree" checked={formData.nutFree} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Nut-free</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="kosher" checked={formData.kosher} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Kosher</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="halal" checked={formData.halal} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Halal</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="dietaryOther">Other dietary needs</Label>
                <Input
                  id="dietaryOther"
                  name="dietaryOther"
                  value={formData.dietaryOther}
                  onChange={handleInputChange}
                  placeholder="Any other dietary requirements"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-[#1B2A4A]">♿ Accessibility & Assistance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Mobility or assistance equipment (check all that apply)</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="mobilityNone" checked={formData.mobilityNone} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">None needed</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="mobilityCane" checked={formData.mobilityCane} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Cane</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="mobilityWalker" checked={formData.mobilityWalker} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Walker</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="mobilityManualWheelchair" checked={formData.mobilityManualWheelchair} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Manual wheelchair</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="mobilityPowerWheelchair" checked={formData.mobilityPowerWheelchair} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Power wheelchair/scooter</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="mobilityServiceAnimal" checked={formData.mobilityServiceAnimal} onChange={handleInputChange} className="w-4 h-4" />
                    <span className="text-sm">Service animal</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="mobilityOther">Other mobility or accessibility needs (ramp to stage, seating on stage, etc.)</Label>
                <Input
                  id="mobilityOther"
                  name="mobilityOther"
                  value={formData.mobilityOther}
                  onChange={handleInputChange}
                  placeholder="Describe any accessibility needs"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="noSupportPerson" checked={formData.noSupportPerson} onChange={handleInputChange} className="w-4 h-4" />
                  <span className="text-sm">No support person attending with me</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="hasSupportPerson" checked={formData.hasSupportPerson} onChange={handleInputChange} className="w-4 h-4" />
                  <span className="text-sm">Support person attending (role below)</span>
                </label>
              </div>
              <div>
                <Label htmlFor="supportPersonRole">Support person&apos;s role, if applicable</Label>
                <Input
                  id="supportPersonRole"
                  name="supportPersonRole"
                  value={formData.supportPersonRole}
                  onChange={handleInputChange}
                  placeholder="e.g., Personal assistant, caregiver"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-[#1B2A4A]">📝 Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="additionalInfo">Anything else we should know to support your comfort and best presentation?</Label>
              <Input
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any other information or special requests"
              />
              <p className="text-xs text-gray-600 mt-2">
                Questions? Contact Thea Monet at [email protected] or (919) 696-0206. Text messages are seen immediately.
              </p>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1B2A4A]">2 — Meal Reservations</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Select all meals you plan to attend so we can reserve your seat. <strong>Seats cannot be guaranteed without advance selection.</strong>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">🍳 Continental Breakfast</h4>
              <div className="flex gap-2">
                <span className="bg-[#1B2A4A] text-white px-3 py-1 rounded-full text-xs font-semibold">$40.00</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">Mon. May 4</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Available at 6:30 a.m. Monday, May 4 before the morning sessions begin.</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="bfast_mon"
                checked={formData.bfast_mon}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes — I will attend breakfast on Monday, May 4 ($40.00)</span>
            </label>
          </div>

          <div className="border border-purple-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">🌟 Beyond the Podium Lunch</h4>
              <div className="flex gap-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">$45.00</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">Mon. May 4</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Sit at a morning speaker&apos;s table during this exclusive 1-hour lunch. <strong>Early registrants</strong> may request their preferred speaker. Seating is limited — first-come, first-served.
            </p>
            <div className="space-y-2 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="lunch_radio"
                  checked={formData.lunch}
                  onChange={() => handleLunchChange(true)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Yes — I will attend the Beyond the Podium Lunch ($45.00)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="lunch_radio"
                  checked={!formData.lunch}
                  onChange={() => handleLunchChange(false)}
                  className="w-4 h-4"
                />
                <span className="text-sm">No — I will not attend lunch</span>
              </label>
            </div>

            {showSpeakerSelect && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                <p className="font-semibold text-purple-900 mb-3">Request Your Speaker Table</p>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="pref_spk">Preferred Speaker</Label>
                    <select
                      id="pref_spk"
                      name="pref_spk"
                      value={formData.pref_spk}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">— Select a speaker —</option>
                      {speakers.map(speaker => (
                        <option key={speaker} value={speaker}>{speaker}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="alt_spk">Alternate Speaker Choice</Label>
                    <select
                      id="alt_spk"
                      name="alt_spk"
                      value={formData.alt_spk}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">— Select an alternate —</option>
                      {speakers.map(speaker => (
                        <option key={speaker} value={speaker}>{speaker}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-gray-600">⚑ Requests honored while seats remain. Table assignment included in your confirmation.</p>
                </div>
              </div>
            )}
          </div>

          <div className="border border-purple-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">🍷 Monday Dinner — On Your Own</h4>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">Mon. May 4 · 6:00 PM</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Dinner is on your own. Join the group at the <strong>Poop Deck Restaurant</strong>, E Bay St, Nassau — or choose from the many dining options at the <strong>Atlantis Resort</strong>. Make your own reservation directly. Select below to coordinate the group heading to the Poop Deck.
            </p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="dinner"
                checked={formData.dinner}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes — I plan to dine at the Poop Deck on Monday evening</span>
            </label>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">🍳 Continental Breakfast</h4>
              <div className="flex gap-2">
                <span className="bg-[#1B2A4A] text-white px-3 py-1 rounded-full text-xs font-semibold">$40.00</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">Tue. May 5</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Available at 6:30 a.m. Tuesday, May 5. The conference concludes following this breakfast.</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="bfast_tue"
                checked={formData.bfast_tue}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes — I will attend breakfast on Tuesday, May 5 ($40.00)</span>
            </label>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-900">
              <strong>💳 Meal Payment Deadline: April 20, 2026</strong><br />
              All meal payments must be received by <strong>April 20, 2026</strong> and forwarded to:<br /><br />
              <strong>Dr. Gloria Frelix</strong> · 301 Dogwood Trail · Elizabeth City, NC 27909<br /><br />
              <strong>Payment must be made by Money Order or Cashier&apos;s Check only.</strong> Please make payable to <strong>Dr. Gloria Frelix</strong>. Cash and personal checks will not be accepted. Payment must be submitted in advance by the deadline.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1B2A4A]">3 — Free Vision Screening by Dr. Barbour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-green-300 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-green-900">👁️ Complimentary Vision Screening</h4>
              <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">FREE</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Dr. Monique Barbour, M.D., MHA will offer <strong>free vision screenings</strong> to conference attendees. Space is limited — please indicate below if you would like to participate so we can schedule your appointment.
            </p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="vision_screening"
                checked={formData.vision_screening}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Yes — I would like a free vision screening with Dr. Barbour</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1B2A4A]">4 — How Did You Hear About Us?</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            name="referral"
            value={formData.referral}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">— Please select —</option>
            <option>Email / Newsletter</option>
            <option>Colleague / Word of Mouth</option>
            <option>Social Media</option>
            <option>Organization Website</option>
            <option>Flyer / Printed Material</option>
            <option>Other</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1B2A4A]">5 — Special Needs & Food Choices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>📋 A separate form will be provided</strong> to collect information regarding special needs and dietary/food preferences. That form will be attached to your registration. Please complete both forms so we can accommodate you fully.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#E8B96A] hover:bg-[#d4a556] text-[#1B2A4A] font-bold text-lg py-6"
      >
        Submit Registration →
      </Button>
    </form>
  )
}
