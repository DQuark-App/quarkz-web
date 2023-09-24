import { NextRequest, NextResponse } from 'next/server'
import Storage from '@/service/storage'
import SupaBaseService from '@/service/supabase'

export async function GET(request: NextRequest) {
    const userId = request.headers.get('x-user-id')
    const result = await SupaBaseService.instance
        .from('file')
        .select('*')
        .eq('user_id', userId)
        .eq('album_uid', request.nextUrl.searchParams.get('album_uid'))
    return NextResponse.json({ data: result.data || [] })
}

export async function POST(request: NextRequest) {
    const form = await request.formData()
    const file = form.get('file')
    const albumUid = form.get('album_uid')
    const userId = request.headers.get('x-user-id')

    if (!file) return NextResponse.json({ error: 'No file' })

    const cid = await Storage.instance.storeBlob(file as Blob)

    const result = await SupaBaseService.instance.from('file').insert({
        cid: cid,
        album_uid: albumUid,
        user_id: userId,
        created_at: new Date(),
    })

    if (result.error) {
        return NextResponse.json(
            { message: 'Can not create file' },
            { status: 500 }
        )
    }

    return NextResponse.json({
        cid: cid,
    })
}
