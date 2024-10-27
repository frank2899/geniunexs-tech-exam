import { connectToDataBase } from '@/lib/db/connect'
import { JobModel } from '@/lib/db/job'
import { NextRequest, NextResponse } from 'next/server'
import moment from 'moment-timezone'

export async function POST(req: Request) {
    try {
        const data = await req.json()

        await connectToDataBase()

        const entry = new JobModel(data)

        await entry.save()

        return NextResponse.json({ data: entry }, { status: 200 })
    } catch (error) {
        console.error('Error in POST handler:', error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams

        const showActive = searchParams.get('showActive') === 'true'
        const showEnded = searchParams.get('showEnded') === 'true'
        await connectToDataBase()

        const now = moment().tz('Asia/Manila')

        let query = {}
        if (showActive) query = { activeUntil: { $gte: now.toDate() } }
        else if (showEnded) query = { activeUntil: { $lt: now.toDate() } }

        const entry = await JobModel.find(query).sort({ dateCreated: -1 })

        return NextResponse.json({ data: entry }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
