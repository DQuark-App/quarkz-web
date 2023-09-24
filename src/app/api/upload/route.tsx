import { NextRequest, NextResponse } from 'next/server'
import Storage from '@/service/storage'
export async function POST(request: NextRequest) {
    const form = await request.formData()
    const file = form.get('file')

    if (!file) return NextResponse.json({ error: 'No file' })

    const cid = await Storage.instance.storeBlob(file as Blob)
    return NextResponse.json({
        cid: cid,
    })
}
