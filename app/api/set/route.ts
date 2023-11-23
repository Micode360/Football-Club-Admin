import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET(req: Request){
    return NextResponse.json({ message: 'Set complete' })
  
}