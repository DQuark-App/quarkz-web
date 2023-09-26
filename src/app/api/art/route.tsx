import { NextRequest, NextResponse } from 'next/server'
import Storage from '@/service/storage'
import SupaBaseService from '@/service/supabase'
import { v4 as uuid } from 'uuid'
type ARTGenerate = {
    text: string
}
export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Art Gen is ready' }, { status: 200 })
}

export async function POST(request: NextRequest) {
    const userId = request.headers.get('x-user-id')
    const jsonData = (await request.json()) as ARTGenerate
    const text = jsonData.text
    let albumUid = null

    if (!text) {
        return NextResponse.json(
            { message: 'Text is required' },
            { status: 400 }
        )
    }

    const checkFolder = (
        await SupaBaseService.instance
            .from('folder')
            .select('*')
            .eq('name', 'AI-GENERATED')
            .eq('user_id', userId)
    ).data

    if (!checkFolder || (checkFolder && checkFolder.length === 0)) {
        albumUid = uuid().toString()
        const result = await SupaBaseService.instance.from('folder').insert({
            uid: albumUid,
            name: 'AI-GENERATED',
            user_id: userId,
            created_at: new Date(),
            updated_at: new Date(),
        })

        if (result.error) {
            return NextResponse.json(
                { message: 'Can not create folder' },
                { status: 500 }
            )
        }
    } else {
        albumUid = (checkFolder[0] as { uid: string }).uid
    }

    const params: string[][] = []
    params.push(['text', text.toString()])
    params.push(['grid_size', '1'])
    params.push(['image_generator_version', 'hd'])
    params.push(['negative_prompt', process.env.NEGATIVE_PROMPT || ''])

    const response = await fetch(process.env.DEEP_AI_API_URL || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'api-key': process.env.DEEP_AI_KEY || '',
        },
        body: new URLSearchParams(params),
    })

    const data = await response.json()

    if (data.err) {
        return NextResponse.json({ message: data.err }, { status: 500 })
    }

    const downloadResult = data as { id: string; output_url: string }
    const downloadResponse = await fetch(downloadResult.output_url)
    const downloadData = await downloadResponse.blob()

    const cid = await Storage.instance.storeBlob(downloadData)

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

    return NextResponse.json({ status: 'success', cid: cid })
}
