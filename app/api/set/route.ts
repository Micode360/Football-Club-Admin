import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET(req: Request){
  cookies().set({
    name: 'name',
    value: 'lee',
    path: '/',
    httpOnly: true
  })

    return NextResponse.json({ message: 'Set complete' })
  
}