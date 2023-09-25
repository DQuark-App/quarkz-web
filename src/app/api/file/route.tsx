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
    const form = (await request.json()) as { data: string; album_uid: string }
    const userId = request.headers.get('x-user-id')
    const buffer = Buffer.from(form.data, 'base64')

    const cid = await Storage.instance.storeBlob(new Blob([buffer]))

    const check = (
        await SupaBaseService.instance
            .from('file')
            .select('*')
            .eq('cid', cid)
            .eq('user_id', userId)
            .eq('album_uid', form.album_uid)
    ).data

    if (check && check.length > 0) {
        return NextResponse.json(
            { message: 'file already exist' },
            { status: 200 }
        )
    }

    const result = await SupaBaseService.instance.from('file').insert({
        cid: cid,
        album_uid: form.album_uid,
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
