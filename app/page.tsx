"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function ConferencePage() {
  return (
    <div className="min-h-screen bg-[#F9F5EE]">
      <nav className="bg-[#1B2A4A] px-5 py-3 flex flex-wrap gap-2 justify-center items-center">
        <a href="#cover" className="text-[#E8B96A] text-xs font-semibold tracking-wider uppercase px-4 py-1.5 border border-[#E8B96A]/35 rounded-full hover:bg-[#E8B96A]/15 transition-colors">
          🏠 Home
        </a>
        <a href="#welcome" className="text-[#E8B96A] text-xs font-semibold tracking-wider uppercase px-4 py-1.5 border border-[#E8B96A]/35 rounded-full hover:bg-[#E8B96A]/15 transition-colors">
          📖 Welcome
        </a>
        <a href="#speakers" className="text-[#E8B96A] text-xs font-semibold tracking-wider uppercase px-4 py-1.5 border border-[#E8B96A]/35 rounded-full hover:bg-[#E8B96A]/15 transition-colors">
          🎤 Speakers
        </a>
        <a href="#register" className="text-[#E8B96A] text-xs font-semibold tracking-wider uppercase px-4 py-1.5 border border-[#E8B96A]/35 rounded-full hover:bg-[#E8B96A]/15 transition-colors">
          📋 Register
        </a>
        <Link href="/admin" className="ml-auto">
          <Button variant="outline" size="sm" className="bg-[#E8B96A]/10 border-[#E8B96A]/50 text-[#E8B96A] hover:bg-[#E8B96A]/20">
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </Link>
      </nav>

      <div id="cover" className="bg-gradient-to-br from-[#0F1B33] via-[#1B3A5C] to-[#0D2233] px-6 py-14 text-center">
        <div className="inline-block border border-[#E8B96A]/50 text-[#E8B96A] text-xs tracking-[0.18em] uppercase px-5 py-1.5 rounded-full mb-6 bg-[#E8B96A]/7">
          ✦ Conference · Paradise Island, Bahamas · May 4–5, 2026 ✦
        </div>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-black text-white leading-tight mb-3">
          Finishing Strong<br />in the <em className="text-[#E8B96A] italic">Age of Artificial Intelligence</em>
        </h1>
        <p className="text-lg md:text-xl text-white/65 mb-8 max-w-3xl mx-auto">
          Wisdom, Purpose &amp; Human Connection in a Changing World
        </p>
        <div className="w-[70px] h-[3px] bg-gradient-to-r from-transparent via-[#C9933A] to-transparent mx-auto mb-7"></div>
        <div className="flex flex-wrap gap-3 justify-center mb-8 max-w-4xl mx-auto">
          <div className="bg-white/7 border border-white/15 text-white/88 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            📅 May 4–5, 2026
          </div>
          <div className="bg-white/7 border border-white/15 text-white/88 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            📍 Atlantis Cove · One Casino Drive, Suite 40 · Paradise Island, Bahamas
          </div>
          <div className="bg-white/7 border border-white/15 text-white/88 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            🕡 Sessions begin 6:30 a.m. each morning
          </div>
          <div className="bg-white/7 border border-white/15 text-white/88 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            🏁 Concludes after breakfast, Tue. May 5
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mb-7">
          <a href="#register" className="bg-gradient-to-br from-[#C9933A] to-[#E8B96A] text-[#0F1B33] px-8 py-3 rounded-lg font-bold text-base tracking-wide hover:opacity-90 transition-opacity">
            Register Now — Free
          </a>
          <a href="#speakers" className="border-2 border-white/35 text-white/90 px-7 py-3 rounded-lg font-medium text-base hover:bg-white/10 transition-colors">
            View Speakers
          </a>
        </div>
        <div className="inline-block bg-[#1B5E20]/85 border border-[#68C568]/40 text-[#A5D6A7] px-6 py-2.5 rounded-full text-sm font-semibold max-w-[95%]">
          ✅ No Registration Fee &nbsp;·&nbsp; Continental Breakfast $40/day &nbsp;·&nbsp; Beyond the Podium Lunch $45 (Mon. May 4)<br />
          Mon. Dinner on your own · 6:00 PM · Poop Deck, Nassau — or dine at the Atlantis Resort
        </div>
      </div>

      <div id="welcome" className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.18em] uppercase text-[#C9933A] font-semibold mb-2">A Message from the Organizers</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Welcome to the Conference</h2>
          <div className="w-[50px] h-[3px] bg-[#C9933A] rounded mb-7"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-base md:text-lg leading-relaxed text-[#1A1A2E] space-y-4">
                <p>Friend and Colleague,</p>
                <p>We are delighted to welcome you to <strong>Finishing Strong in the Age of Artificial Intelligence</strong> — a two-day gathering on the beautiful shores of Paradise Island, Bahamas, designed for those who believe that experience, wisdom, and human connection matter more than ever in a world being reshaped by technology.</p>
                <p>We are honored to have <strong>Bishop Earnest Sutton</strong> of Faithway Apostolic Church in Elizabeth City, North Carolina open our program in prayer.</p>
                <p>Artificial intelligence is not simply a tool for the young or the technical. It is a force that touches every stage of life, every profession, and every community — including healthcare, which sits at the very heart of this year&apos;s program. We have assembled an extraordinary panel of physicians and scholars who will help us understand how AI is transforming the practice of medicine in America and around the world.</p>
                <p>Our sessions begin each morning at 6:30 a.m. On Monday evening, May 4, we invite you to dine on your own — either at the renowned Poop Deck Restaurant on East Bay Street in Nassau, or at one of the many wonderful restaurants at the Atlantis Resort. The conference concludes following breakfast on Tuesday, May 5th.</p>
                <p>Come ready to learn, to ask questions, and to finish strong. We look forward to spending these two days with you.</p>
              </div>
              <div className="mt-7 pt-5 border-t border-[#EEE8DC]">
                <div className="font-[family-name:var(--font-playfair)] text-lg text-[#1B2A4A] italic">The Conference Planning Committee</div>
                <div className="text-xs text-[#2D3748] mt-1">Finishing Strong in the Age of AI · Paradise Island, Bahamas · May 4–5, 2026</div>
              </div>
            </div>
            
            <div>
              <div className="bg-[#F9F5EE] border-l-4 border-[#C9933A] rounded-r-xl p-6">
                <div className="text-xs tracking-[0.15em] uppercase text-[#C9933A] font-semibold mb-3">Conference at a Glance</div>
                <div className="space-y-3">
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">🙏</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Opening Prayer</strong>
                      <span className="text-xs text-[#2D3748]">Bishop Earnest Sutton<br />Faithway Apostolic Church<br />Elizabeth City, North Carolina</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">📅</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Dates</strong>
                      <span className="text-xs text-[#2D3748]">Monday–Tuesday, May 4–5, 2026</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">🕡</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Daily Start Time</strong>
                      <span className="text-xs text-[#2D3748]">6:30 a.m. each morning</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">📍</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Venue</strong>
                      <span className="text-xs text-[#2D3748]">Atlantis Cove, One Casino Drive, Suite 40, Paradise Island, Bahamas</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">🍳</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Continental Breakfast</strong>
                      <span className="text-xs text-[#2D3748]">Both days · $40 per day · begins 6:30 a.m.</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">🌟</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Beyond the Podium Lunch</strong>
                      <span className="text-xs text-[#2D3748]">Mon. May 4 · Sit with a speaker · $45</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b border-[#EEE8DC]">
                    <div className="text-xl flex-shrink-0">🍷</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Monday Dinner — On Your Own</strong>
                      <span className="text-xs text-[#2D3748]">6:00 PM · Poop Deck, E Bay St, Nassau — or dine at the Atlantis Resort</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-xl flex-shrink-0">🆓</div>
                    <div>
                      <strong className="block text-sm font-semibold text-[#1B2A4A]">Registration Fee</strong>
                      <span className="text-xs text-[#1B5E20] font-semibold">FREE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFF3E0] border border-[#E68200]/35 rounded-lg p-4 mt-4 text-sm text-[#4E2600] leading-relaxed">
                <strong className="text-[#BF360C]">💳 Meal Payment Deadline: April 20, 2026</strong><br />
                All meal payments must be received by <strong>April 20, 2026</strong> and forwarded to:<br /><br />
                <strong>Dr. Gloria Frelix</strong><br />
                301 Dogwood Trail · Elizabeth City, NC 27909<br /><br />
                <strong>Payment by Money Order or Cashier&apos;s Check only</strong> — made payable to Dr. Gloria Frelix. Cash and personal checks will not be accepted.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="speakers" className="bg-[#1B2A4A] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.18em] uppercase text-[#E8B96A] font-semibold mb-2">Featured Presentations · Monday, May 4, 2026</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-4">Featured Speakers</h2>
          <div className="w-[50px] h-[3px] bg-[#C9933A] rounded mb-7"></div>
          <p className="text-white/62 text-base max-w-2xl leading-relaxed mb-8">
            Six distinguished physicians and scholars explore how artificial intelligence is transforming healthcare across America and the world. Five morning sessions begin at 6:30 a.m., followed by an afternoon session with Dr. Timothy C. Summers beginning at 1:30 PM — all on Monday, May 4.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { initials: "MB", name: "Monique Barbour, M.D., MHA", creds: "Medicine · Visual Health", topic: "How AI Has Impacted the Treatment of Visual Health in America", session: "Session 1", hasScreening: true },
              { initials: "CG", name: "Christopher Griffin, M.D.", creds: "Medicine · Pediatric Care", topic: "How AI Has Impacted the Practice of Pediatric Care in America", session: "Session 2" },
              { initials: "MR", name: "Mack Roach III, M.D., Ph.D., FASTRO", creds: "Medicine · Male Health", topic: "How Artificial Intelligence Has Impacted Male Health in America", session: "Session 3" },
              { initials: "GS", name: "George L. Saunders, M.D.", creds: "Medicine · Geriatric Health", topic: "How A.I. Has Impacted the Practice of Geriatric Health in America", session: "Session 4" },
              { initials: "EG", name: "Ericka Griffin, M.D.", creds: "Medicine · Women's Health", topic: "How AI Has Impacted the Practice of Women's Health in America", session: "Session 5" },
              { initials: "TS", name: "Timothy C. Summers, Ph.D., VP, CIO", creds: "Technology & Global Health Policy", topic: "How AI Is Changing the Delivery of Health Care in the World Now and Beyond", session: "Session 6 · Afternoon", isAfternoon: true },
            ].map((speaker, idx) => (
              <div key={idx} className="bg-white/6 border border-white/12 rounded-2xl p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2A7B8C] to-[#1B2A4A] flex items-center justify-center font-[family-name:var(--font-playfair)] text-xl text-[#E8B96A] font-bold mb-3 border-2 border-[#E8B96A]/30">
                  {speaker.initials}
                </div>
                <div className="font-[family-name:var(--font-playfair)] text-base font-bold text-white mb-1">{speaker.name}</div>
                <div className="text-xs text-[#E8B96A] mb-2 font-medium">{speaker.creds}</div>
                <div className="text-sm text-white/62 italic border-t border-white/10 pt-2.5 mt-2 leading-relaxed">{speaker.topic}</div>
                <span className="inline-block mt-2.5 bg-[#C9933A]/15 border border-[#C9933A]/30 text-[#E8B96A] px-3 py-1 rounded-full text-xs font-semibold">
                  {speaker.session}
                </span>
                <span className="inline-block mt-1.5 ml-1 bg-[#2A7B8C]/20 border border-[#2A7B8C]/35 text-[#7DD4E0] px-2.5 py-1 rounded-full text-xs font-semibold">
                  Mon. May 4
                </span>
                {speaker.hasScreening && (
                  <div className="mt-2.5 bg-[#E8B96A]/12 border border-[#E8B96A]/30 rounded-lg p-2.5 text-xs text-[#E8B96A] leading-relaxed">
                    👁️ <strong>Free Vision Screenings</strong><br />
                    Dr. Barbour will offer complimentary vision screenings at the conference. Sign up on the registration form.
                  </div>
                )}
                {speaker.isAfternoon && (
                  <div className="mt-2.5 text-xs text-white/50 leading-relaxed">
                    📍 1:30 – 3:15 PM · Main Presentation<br />
                    ☕ 3:15 – 3:30 PM · Short Break<br />
                    📍 3:30 – 4:30 PM · Summary &amp; Wrap-Up
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white/4 border border-white/10 rounded-xl p-5 mb-4">
            <h4 className="font-[family-name:var(--font-playfair)] text-[#E8B96A] text-base mb-3">📋 Conference Schedule — Monday, May 4, 2026</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">6:30 AM</span>
                <span>Continental Breakfast ($40) · Opening Prayer — Bishop Earnest Sutton, Faithway Apostolic Church · Sessions begin</span>
              </div>
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">Morning</span>
                <span>Sessions 1–5 · Dr. Barbour, Dr. Christopher Griffin, Dr. Roach, Dr. Saunders, Dr. Ericka Griffin</span>
              </div>
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">TBD</span>
                <span>👁️ Free Vision Screenings — Dr. Monique Barbour, M.D., MHA (sign up on registration form)</span>
              </div>
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">Midday</span>
                <span>Beyond the Podium Lunch ($45) — sit with a morning speaker</span>
              </div>
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">1:30 – 3:15 PM</span>
                <span>Session 6 · Dr. Timothy C. Summers, Ph.D., VP, CIO — Main Presentation</span>
              </div>
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">3:15 – 3:30 PM</span>
                <span>Short Break</span>
              </div>
              <div className="flex gap-3 pb-2 border-b border-white/6">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">3:30 – 4:30 PM</span>
                <span>Dr. Summers — Summary &amp; Wrap-Up</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">6:00 PM</span>
                <span>Dinner on your own · Poop Deck Restaurant, E Bay St, Nassau — or dine at the Atlantis Resort</span>
              </div>
            </div>
          </div>

          <div className="bg-white/4 border border-white/10 rounded-xl p-5 mb-6">
            <h4 className="font-[family-name:var(--font-playfair)] text-[#E8B96A] text-base mb-3">📋 Conference Schedule — Tuesday, May 5, 2026</h4>
            <div className="text-sm text-white/70">
              <div className="flex gap-3">
                <span className="text-[#E8B96A] font-semibold min-w-[115px]">6:30 AM</span>
                <span>Continental Breakfast ($40) · Conference concludes following breakfast</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2A7B8C]/15 border border-[#2A7B8C]/35 rounded-xl p-5 flex gap-4">
            <div className="text-3xl flex-shrink-0">🌟</div>
            <div>
              <h4 className="font-[family-name:var(--font-playfair)] text-white text-base mb-2">Beyond the Podium — Lunch with a Speaker (Monday, May 4)</h4>
              <p className="text-white/68 text-sm leading-relaxed">
                Register early and request to be seated at a morning speaker&apos;s table during the 1-hour lunch ($45). Seating is limited and filled first-come, first-served. Ask questions, share ideas, and connect beyond the stage. Select your speaker preference on the registration form below.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="register" className="bg-[#F9F5EE] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.18em] uppercase text-[#C9933A] font-semibold mb-2">Secure Your Spot</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Conference Registration</h2>
          <div className="w-[50px] h-[3px] bg-[#C9933A] rounded mb-7"></div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-[#388E3C]/30 text-[#1B5E20] px-4 py-2 rounded-full text-sm font-bold mb-6">
              ✅ No Registration Fee
            </div>
            
            <div className="text-center py-12">
              <p className="text-lg text-[#1B2A4A] mb-4">
                Registration form will be integrated here with full functionality.
              </p>
              <p className="text-sm text-[#4A5568]">
                The form will capture all attendee information, meal selections, and speaker preferences,<br />
                then store them in the admin dashboard for tracking and recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#0F1B33] text-white/50 text-center px-5 py-8 text-xs leading-relaxed">
        <p className="text-[#E8B96A] font-bold">Finishing Strong in the Age of Artificial Intelligence</p>
        <p>May 4–5, 2026 · Atlantis Cove, One Casino Drive, Suite 40, Paradise Island, Bahamas</p>
        <p>Opening Prayer: Bishop Earnest Sutton · Faithway Apostolic Church · Elizabeth City, NC</p>
        <p>Meal payment deadline: April 20, 2026 · Dr. Gloria Frelix · 301 Dogwood Trail · Elizabeth City, NC 27909 · Money Order or Cashier&apos;s Check only</p>
        <p className="mt-2 text-[0.7rem] opacity-40">For questions, refer to the contact information in your conference invitation.</p>
      </footer>
    </div>
  )
}
