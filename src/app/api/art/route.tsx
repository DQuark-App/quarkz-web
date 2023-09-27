import { NextRequest, NextResponse } from 'next/server'
import Storage from '@/service/storage'
import SupaBaseService from '@/service/supabase'
import { v4 as uuid } from 'uuid'
import ArtGenerator from '@/service/artgenerator'
type ARTGenerate = {
    text: string
    isHD: boolean
    model: string
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

    const response = await ArtGenerator.instance.generateArt(
        text,
        jsonData.model,
        jsonData.isHD
    )
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
