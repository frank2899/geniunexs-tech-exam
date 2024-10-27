import { connectToDataBase } from '@/lib/db/connect'
import { JobModel } from '@/lib/db/job'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDataBase()
        const id = (await params).id
        const data = await req.json()

        await connectToDataBase()

        const entry = await JobModel.findOneAndUpdate({ _id: id }, data, { new: true })

        return NextResponse.json({ data: entry }, { status: 200 })
    } catch (error) {
        console.error('Error in POST handler:', error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDataBase()
        const id = (await params).id

        const entry = await JobModel.findOne({ _id: id })

        return NextResponse.json({ data: entry }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
