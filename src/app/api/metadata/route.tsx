import { NextRequest, NextResponse } from 'next/server'
import Storage from '@/service/storage'

export async function POST(request: NextRequest) {
    const form = (await request.json()) as { data: string; album_uid: string }
    const buffer = Buffer.from(form.data, 'base64')

    const cid = await Storage.instance.storeBlob(new Blob([buffer]))

    return NextResponse.json({
        cid: cid,
    })
}
