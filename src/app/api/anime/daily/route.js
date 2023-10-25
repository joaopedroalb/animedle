import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://back-anime-dle.onrender.com/daily')
  const data = await res.json()
 
  return NextResponse.json({ data })
}