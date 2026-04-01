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

function generateHTMLReport(registrations: any[]) {
  const speakers = registrations.filter(r => r.registrationType === 'speaker')
  const attendees = registrations.filter(r => r.registrationType === 'attendee')
  
  const stats = {
    totalRegistrations: registrations.length,
    totalSpeakers: speakers.length,
    totalAttendees: attendees.length,
    mondayBreakfast: registrations.filter(r => r.bfast_mon).length,
    tuesdayBreakfast: registrations.filter(r => r.bfast_tue).length,
    lunch: registrations.filter(r => r.lunch).length,
    dinner: registrations.filter(r => r.dinner).length,
    visionScreening: registrations.filter(r => r.vision_screening).length
  }
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Conference Registration Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #1B2A4A; border-bottom: 3px solid #E8B96A; padding-bottom: 10px; }
    h2 { color: #1B2A4A; margin-top: 30px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
    .stat-card { background: #f9f5ee; padding: 15px; border-radius: 8px; border-left: 4px solid #E8B96A; }
    .stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
    .stat-value { font-size: 28px; font-weight: bold; color: #1B2A4A; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #1B2A4A; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    tr:nth-child(even) { background: #f9f9f9; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .badge-speaker { background: #E8B96A; color: #1B2A4A; }
    .badge-attendee { background: #4A5568; color: white; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>Finishing Strong Conference - Registration Report</h1>
  <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
  
  <div class="stats">
    <div class="stat-card">
      <div class="stat-label">Total Registrations</div>
      <div class="stat-value">${stats.totalRegistrations}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Speakers</div>
      <div class="stat-value">${stats.totalSpeakers}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Attendees</div>
      <div class="stat-value">${stats.totalAttendees}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Monday Breakfast</div>
      <div class="stat-value">${stats.mondayBreakfast}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Tuesday Breakfast</div>
      <div class="stat-value">${stats.tuesdayBreakfast}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Lunch Attendees</div>
      <div class="stat-value">${stats.lunch}</div>
    </div>
  </div>
  
  <h2>Speakers (${speakers.length})</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Organization</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      ${speakers.map(s => `
        <tr>
          <td><strong>${s.fname} ${s.lname}</strong></td>
          <td>${s.email}</td>
          <td>${s.org || 'N/A'}</td>
          <td>${s.phone || 'N/A'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <h2>Attendees (${attendees.length})</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mon Bfast</th>
        <th>Lunch</th>
        <th>Tue Bfast</th>
        <th>Vision</th>
      </tr>
    </thead>
    <tbody>
      ${attendees.map(a => `
        <tr>
          <td><strong>${a.fname} ${a.lname}</strong></td>
          <td>${a.email}</td>
          <td>${a.bfast_mon ? '✓' : ''}</td>
          <td>${a.lunch ? '✓' : ''}</td>
          <td>${a.bfast_tue ? '✓' : ''}</td>
          <td>${a.vision_screening ? '✓' : ''}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
  `
}

export async function GET() {
  try {
    const registrations = await readRegistrations()
    const html = generateHTMLReport(registrations)
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="conference-report.html"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { registrations } = await request.json()
    const html = generateHTMLReport(registrations || [])
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="conference-report.html"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
