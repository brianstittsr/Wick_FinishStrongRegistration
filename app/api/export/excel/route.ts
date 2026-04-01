import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'registrations.json')

async function readRegistrations() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function GET() {
  try {
    const registrations = await readRegistrations()
    
    const headers = [
      'ID',
      'Type',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Organization',
      'Job Title',
      'City',
      'State/ZIP',
      'Mon Breakfast',
      'Tue Breakfast',
      'Lunch',
      'Preferred Speaker',
      'Alternate Speaker',
      'Dinner',
      'Vision Screening',
      'Referral',
      'Created At'
    ]
    
    const rows = registrations.map((reg: any) => [
      reg.id,
      reg.registrationType || 'attendee',
      reg.fname,
      reg.lname,
      reg.email,
      reg.phone || '',
      reg.org || '',
      reg.jobtitle || '',
      reg.city || '',
      reg.zip || '',
      reg.bfast_mon ? 'Yes' : 'No',
      reg.bfast_tue ? 'Yes' : 'No',
      reg.lunch ? 'Yes' : 'No',
      reg.pref_spk || '',
      reg.alt_spk || '',
      reg.dinner ? 'Yes' : 'No',
      reg.vision_screening ? 'Yes' : 'No',
      reg.referral || '',
      reg.createdAt
    ])
    
    let csv = headers.join(',') + '\n'
    rows.forEach((row: any[]) => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n'
    })
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="conference-registrations.csv"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
  }
}
