import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'registrations.json')

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readRegistrations() {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeRegistrations(data: any[]) {
  await ensureDataDirectory()
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const registrations = await readRegistrations()
    return NextResponse.json({ data: registrations })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read registrations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const registrations = await readRegistrations()
    registrations.push(body)
    await writeRegistrations(registrations)
    return NextResponse.json({ data: body }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const registrations = await readRegistrations()
    const index = registrations.findIndex((r: any) => r.id === body.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }
    
    registrations[index] = body
    await writeRegistrations(registrations)
    return NextResponse.json({ data: body })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const registrations = await readRegistrations()
    const filtered = registrations.filter((r: any) => r.id !== id)
    
    if (filtered.length === registrations.length) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }
    
    await writeRegistrations(filtered)
    return NextResponse.json({ data: { id } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 })
  }
}
