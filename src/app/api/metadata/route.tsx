import { NextRequest, NextResponse } from 'next/server'
import Storage from '@/service/storage'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const cid = await Storage.instance.storeBlob(
        new Blob([JSON.stringify(data)])
    )

    return NextResponse.json({
        cid: cid,
    })
}
