"use client"

import { useState } from "react"
import { useConferenceStore } from "@/lib/store"
import { toast } from "sonner"

export default function StudentRegistration() {
  const addRegistration = useConferenceStore((state) => state.addRegistration)
  const registrations = useConferenceStore((state) => state.registrations)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    studentName: "",
    schoolName: "",
    parentName: "",
    parentEmail: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.studentName || !formData.schoolName || !formData.parentName || !formData.parentEmail) {
      toast.error("Please fill in all fields to complete your registration.")
      return
    }

    // Check for duplicate email
    const existingRegistration = registrations.find(r => r.email?.toLowerCase() === formData.parentEmail.toLowerCase())
    if (existingRegistration) {
      toast.error(`This email is already registered: ${existingRegistration.fname} ${existingRegistration.lname}`)
      return
    }

    // Add student registration
    addRegistration({
      registrationType: 'student',
      fname: formData.studentName.split(' ')[0] || formData.studentName,
      lname: formData.studentName.split(' ').slice(1).join(' ') || '',
      email: formData.parentEmail,
      studentName: formData.studentName,
      schoolName: formData.schoolName,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      bfast_mon: false,
      bfast_tue: false,
      lunch: false,
      dinner: false,
      vision_screening: false,
      createdAt: new Date().toISOString()
    })

    // Send email via Formspree to themonet@aol.com
    try {
      await fetch('https://formspree.io/f/xdkoqpvd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'New Student Registration - Your Future Runs on AI',
          _replyto: formData.parentEmail,
          studentName: formData.studentName,
          schoolName: formData.schoolName,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          eventDate: 'Monday, May 4, 2026',
          eventTime: '1:30 PM - 4:30 PM',
          arrivalTime: '1:15 PM'
        })
      })
    } catch (error) {
      console.error('Email send error:', error)
    }

    setShowSuccess(true)
    toast.success("Registration submitted successfully!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#0f0f1a', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
        
        {/* INVITATION SECTION */}
        <div style={{ borderRadius: '24px 24px 0 0', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0d1f4a 40%, #003d40 100%)', padding: '48px 40px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', color: '#6EE7B7', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '7px 18px', borderRadius: '30px', marginBottom: '24px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }}></span> Special Student Invitation
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem,6vw,2.8rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '10px', color: '#fff' }}>
                You&apos;re Invited to<br/>
                <span style={{ background: 'linear-gradient(135deg,#67E8F9 0%,#A78BFA 50%,#F9A8D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your Future Runs on AI</span>
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', marginBottom: '28px', lineHeight: 1.6, fontWeight: 600 }}>
                A special afternoon session for high school students<br/>with a world-class expert — Monday, May 4, 2026
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)', color: '#67E8F9' }}>🕐 Arrive by 1:15 PM</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#A78BFA' }}>🎤 Presentation 1:30 – 4:30 PM</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#6EE7B7' }}>✅ FREE Admission</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '40px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.4, color: '#1a1a2e', letterSpacing: '0.02em', marginBottom: '16px' }}>
              To the Trailblazers, Visionaries & Future Leaders of Tomorrow —
            </p>
            <p style={{ fontSize: '0.93rem', color: '#334155', lineHeight: 1.8, marginBottom: '18px', fontWeight: 600 }}>
              We are excited to extend a special invitation to you for an exclusive afternoon session designed just for high school students!
            </p>

            <div style={{ background: 'linear-gradient(135deg,#0d1f4a 0%,#1a0533 100%)', borderRadius: '16px', padding: '24px 26px', margin: '24px 0', display: 'flex', gap: '18px', alignItems: 'center' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED 0%,#06B6D4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#fff', flexShrink: 0, border: '3px solid rgba(124,58,237,0.5)', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}>TS</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: '4px', letterSpacing: '0.04em' }}>Dr. Timothy C. Summers, Ph.D., VP, CIO</div>
                <div style={{ fontSize: '0.76rem', color: '#67E8F9', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.5, marginBottom: '8px' }}>Vice President & Chief Information Officer<br/>Morgan State University · Baltimore, MD, USA</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '9px', marginTop: '4px' }}>&quot;How AI Is Changing the Delivery of Health Care in the World — Now and Beyond&quot;</div>
              </div>
            </div>

            <p style={{ fontSize: '0.93rem', color: '#334155', lineHeight: 1.8, marginBottom: '18px', fontWeight: 600 }}>
              Dr. Summers is known for making complex ideas exciting and accessible for audiences of all backgrounds — so come ready to learn, ask questions, and be inspired!
            </p>

            <div style={{ background: '#F0FDF4', border: '2px solid #BBF7D0', borderRadius: '14px', padding: '22px 24px', margin: '22px 0' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.85rem', fontWeight: 800, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>📋 Event Details</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #D1FAE5', fontSize: '0.88rem', color: '#1a3a2a', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>📅</span>
                <span style={{ color: '#065F46', minWidth: '90px', flexShrink: 0 }}>Date</span>
                <span>Monday, May 4, 2026</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #D1FAE5', fontSize: '0.88rem', color: '#1a3a2a', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>🏁</span>
                <span style={{ color: '#065F46', minWidth: '90px', flexShrink: 0 }}>Arrive By</span>
                <span>1:15 PM — please be on time!</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #D1FAE5', fontSize: '0.88rem', color: '#1a3a2a', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>🎤</span>
                <span style={{ color: '#065F46', minWidth: '90px', flexShrink: 0 }}>Presentation</span>
                <span>1:30 PM – 3:15 PM</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #D1FAE5', fontSize: '0.88rem', color: '#1a3a2a', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>💬</span>
                <span style={{ color: '#065F46', minWidth: '90px', flexShrink: 0 }}>Wrap-Up & Q&A</span>
                <span>3:30 PM – 4:30 PM</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #D1FAE5', fontSize: '0.88rem', color: '#1a3a2a', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>📍</span>
                <span style={{ color: '#065F46', minWidth: '90px', flexShrink: 0 }}>Location</span>
                <span>Atlantis Cove · One Casino Drive, Suite 40 · Paradise Island, Bahamas</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '9px 0 0', fontSize: '0.88rem', color: '#1a3a2a', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>💰</span>
                <span style={{ color: '#065F46', minWidth: '90px', flexShrink: 0 }}>Admission</span>
                <span>FREE <span style={{ display: 'inline-block', background: '#065F46', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 10px', borderRadius: '20px', marginLeft: '6px' }}>NO COST</span></span>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#7C3AED 0%,#06B6D4 100%)', borderRadius: '12px', padding: '16px 22px', textAlign: 'center', margin: '22px 0', color: '#fff', fontSize: '0.92rem', fontWeight: 800, letterSpacing: '0.03em' }}>
              🚀 This is a rare opportunity to hear from a world-class AI expert — and it won&apos;t cost you a thing!
            </div>

            <p style={{ fontSize: '0.93rem', color: '#334155', lineHeight: 1.8, marginBottom: '18px', fontWeight: 600 }}>
              To reserve your spot, please complete the short registration form below. It only takes 30 seconds! <strong>Seats are limited</strong>, so please register as soon as possible.
            </p>

            <p style={{ fontSize: '0.93rem', color: '#334155', lineHeight: 1.8, marginBottom: '18px', fontWeight: 600 }}>
              We look forward to seeing you there!
            </p>

            <div style={{ marginTop: '28px', paddingTop: '22px', borderTop: '2px solid #F1F5F9' }}>
              <p style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600, lineHeight: 1.7 }}>Warm regards,</p>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', marginTop: '10px', letterSpacing: '0.03em' }}>Dr. Johnny Williams, M.D.</div>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.84rem', fontWeight: 600, color: '#334155', lineHeight: 1.6, marginTop: '3px' }}>President, Old North State Medical Foundation</div>

              <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', letterSpacing: '0.03em' }}>Dr. Gloria Frelix, M.D., MHA</div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.84rem', fontWeight: 600, color: '#334155', lineHeight: 1.6, marginTop: '3px' }}>Board Member, Old North State Medical Foundation</div>
              </div>

              <div style={{ marginTop: '20px', padding: '13px 16px', background: '#FFF3E0', border: '1px solid rgba(230,130,0,0.35)', borderRadius: '10px', fontSize: '0.83rem', color: '#4E2600', lineHeight: 1.65 }}>
                <strong>📋 Please Note:</strong> Once completed, please return your registration form to <strong>Thea Monet</strong> at <strong>theamonet@aol.com</strong> if it does not return automatically.
              </div>
            </div>
          </div>

          <div style={{ background: '#1a1a2e', padding: '24px 40px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', lineHeight: 1.8 }}>
            <p><strong style={{ color: 'rgba(255,255,255,0.6)' }}>Finishing Strong in the Age of Artificial Intelligence</strong></p>
            <p>May 4–5, 2026 · Atlantis Cove, One Casino Drive, Suite 40, Paradise Island, Bahamas</p>
            <p style={{ marginTop: '6px', fontSize: '0.7rem', opacity: 0.6 }}>Questions? theamonet@aol.com</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ background: '#0f0f1a', textAlign: 'center', padding: '20px', fontFamily: "'Syne',sans-serif", fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(103,232,249,0.6)', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
          ↓ &nbsp; Complete Your Registration Below &nbsp; ↓
        </div>

        {/* REGISTRATION FORM */}
        <div style={{ borderRadius: '0 0 24px 24px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}>
          
          <div style={{ background: 'linear-gradient(135deg,#1B2A4A 0%,#2A5080 100%)', padding: '32px 32px 28px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(232,185,106,0.15)', border: '1px solid rgba(232,185,106,0.45)', color: '#E8B96A', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: '30px', marginBottom: '14px' }}>
              ✦ Student Registration Form ✦
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.3rem,4vw,1.7rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '6px' }}>
              Your Future<br/><span style={{ color: '#E8B96A' }}>Runs on AI</span>
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, lineHeight: 1.5 }}>Reserve your spot — takes just 30 seconds!</p>
          </div>

          <div style={{ background: '#F9F5EE', borderBottom: '2px solid #EEE8DC', padding: '12px 28px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#1B2A4A', display: 'flex', alignItems: 'center', gap: '5px' }}>📅 Monday, May 4, 2026</div>
            <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#1B2A4A', display: 'flex', alignItems: 'center', gap: '5px' }}>🕐 1:30 – 4:30 PM</div>
            <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#1B2A4A', display: 'flex', alignItems: 'center', gap: '5px' }}>📍 Atlantis Cove, Paradise Island</div>
            <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#1B2A4A', display: 'flex', alignItems: 'center', gap: '5px' }}>✅ FREE</div>
          </div>

          <div style={{ background: '#ffffff', padding: '28px 32px' }}>
            {!showSuccess ? (
              <>
                <div style={{ fontSize: '0.87rem', color: '#4A5568', lineHeight: 1.65, marginBottom: '22px', fontWeight: 600, background: '#EEF2FF', borderLeft: '4px solid #1B2A4A', borderRadius: '0 8px 8px 0', padding: '11px 13px' }}>
                  Please complete all fields below to reserve your spot. <strong>Seats are limited</strong> — register as soon as possible!
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9933A', marginBottom: '11px', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Student Information
                    <div style={{ flex: 1, height: '1px', background: '#EEE8DC' }}></div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '13px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1B2A4A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Student&apos;s Full Name *</label>
                    <input
                      type="text"
                      name="studentName"
                      placeholder="First and last name"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      style={{ border: '1.5px solid #DDE2EC', borderRadius: '10px', padding: '11px 14px', fontSize: '0.92rem', fontFamily: "'Nunito',sans-serif", color: '#1B2A4A', background: '#F9F5EE', outline: 'none', width: '100%', fontWeight: 600 }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '13px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1B2A4A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>School Name *</label>
                    <input
                      type="text"
                      name="schoolName"
                      placeholder="Name of your school"
                      value={formData.schoolName}
                      onChange={handleChange}
                      required
                      style={{ border: '1.5px solid #DDE2EC', borderRadius: '10px', padding: '11px 14px', fontSize: '0.92rem', fontFamily: "'Nunito',sans-serif", color: '#1B2A4A', background: '#F9F5EE', outline: 'none', width: '100%', fontWeight: 600 }}
                    />
                  </div>

                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9933A', marginBottom: '11px', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Parent / Guardian Information
                    <div style={{ flex: 1, height: '1px', background: '#EEE8DC' }}></div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '13px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1B2A4A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Parent or Guardian Full Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      placeholder="First and last name"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      style={{ border: '1.5px solid #DDE2EC', borderRadius: '10px', padding: '11px 14px', fontSize: '0.92rem', fontFamily: "'Nunito',sans-serif", color: '#1B2A4A', background: '#F9F5EE', outline: 'none', width: '100%', fontWeight: 600 }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '13px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1B2A4A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Parent or Guardian Email Address *</label>
                    <input
                      type="email"
                      name="parentEmail"
                      placeholder="parent@email.com"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      required
                      style={{ border: '1.5px solid #DDE2EC', borderRadius: '10px', padding: '11px 14px', fontSize: '0.92rem', fontFamily: "'Nunito',sans-serif", color: '#1B2A4A', background: '#F9F5EE', outline: 'none', width: '100%', fontWeight: 600 }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#1B2A4A,#2A5080)', color: '#fff', border: 'none', borderRadius: '12px', fontFamily: "'Nunito',sans-serif", fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em', cursor: 'pointer', marginTop: '18px', boxShadow: '0 4px 16px rgba(27,42,74,0.3)' }}
                  >
                    Reserve My Spot →
                  </button>
                </form>

                <div style={{ marginTop: '14px', background: '#FFF8E1', border: '1px solid rgba(201,147,58,0.35)', borderRadius: '10px', padding: '11px 13px', fontSize: '0.79rem', color: '#4E3200', lineHeight: 1.6, fontWeight: 600, textAlign: 'center' }}>
                  📋 If your registration does not submit automatically, please email<br/>
                  <strong style={{ color: '#BF360C' }}>Thea Monet</strong> at <strong style={{ color: '#BF360C' }}>theamonet@aol.com</strong>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 28px' }}>
                <div style={{ fontSize: '3.2rem', marginBottom: '14px' }}>🎉</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#1B2A4A', marginBottom: '8px' }}>You&apos;re Registered!</h3>
                <p style={{ fontSize: '0.88rem', color: '#4A5568', lineHeight: 1.7, fontWeight: 600 }}>
                  Thank you for registering for <strong>Your Future Runs on AI</strong>.<br/><br/>
                  Please arrive by <strong>1:15 PM</strong> on Monday, May 4, 2026 at<br/>
                  Atlantis Cove, One Casino Drive, Suite 40, Paradise Island, Bahamas.<br/><br/>
                  We look forward to seeing you there!
                </p>
              </div>
            )}
          </div>

          <div style={{ background: '#1B2A4A', padding: '16px 28px', textAlign: 'center', fontSize: '0.74rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            <p><strong style={{ color: '#E8B96A' }}>Finishing Strong in the Age of Artificial Intelligence</strong></p>
            <p>May 4–5, 2026 · Atlantis Cove · Paradise Island, Bahamas</p>
            <p>Questions? <strong style={{ color: '#E8B96A' }}>theamonet@aol.com</strong></p>
          </div>
        </div>

      </div>
    </div>
  )
}
