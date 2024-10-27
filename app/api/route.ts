import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        return NextResponse.json({ status: 'Healthy' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}
