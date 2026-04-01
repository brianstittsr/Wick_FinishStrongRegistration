import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"]
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"]
})

export const metadata: Metadata = {
  title: "Finishing Strong in the Age of AI — May 4–5, 2026",
  description: "Conference on Wisdom, Purpose & Human Connection in a Changing World — Paradise Island, Bahamas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
