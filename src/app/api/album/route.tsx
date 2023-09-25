import { NextRequest, NextResponse } from 'next/server'
import SupaBaseService from '@/service/supabase'
import { v4 as uuid } from 'uuid'

type Folder = {
    uid?: string
    name: string
}

export async function GET(request: NextRequest) {
    const userId = request.headers.get('x-user-id')
    const lastTimestamp = request.nextUrl.searchParams.get('last_timestamp')
    const result = await SupaBaseService.instance
        .from('folder')
        .select('name, uid, created_at')
        .eq('user_id', userId)
        .gte('created_at', new Date(lastTimestamp ? Number(lastTimestamp) : 0))
        .lte('created_at', new Date())
        .limit(10)
    return NextResponse.json({ data: result.data || [] })
}
export async function POST(request: NextRequest) {
    const data = (await request.json()) as Folder
    const userId = request.headers.get('x-user-id')
    const checkFolder = (
        await SupaBaseService.instance
            .from('folder')
            .select('*')
            .eq('uid', data.uid)
            .eq('user_id', userId)
    ).data

    if (!checkFolder) {
        return NextResponse.json(
            { message: 'Folder not found' },
            { status: 400 }
        )
    }
    console.log(data)
    const result = await SupaBaseService.instance
        .from('folder')
        .update({
            name: data.name,
            updated_at: new Date(),
        })
        .eq('uid', data.uid)

    if (result.error) {
        return NextResponse.json(
            { message: 'Can not update folder' },
            { status: 500 }
        )
    }

    console.log(result)

    return NextResponse.json({ status: 'success', message: 'Folder updated' })
}
export async function PUT(request: NextRequest) {
    const data = (await request.json()) as Folder
    const userId = request.headers.get('x-user-id')
    const checkFolder = (
        await SupaBaseService.instance
            .from('folder')
            .select('*')
            .eq('name', data.name)
            .eq('user_id', userId)
    ).data

    if (checkFolder && checkFolder.length > 0) {
        return NextResponse.json(
            { message: 'Folder Name already exist' },
            { status: 400 }
        )
    }

    const result = await SupaBaseService.instance.from('folder').insert({
        uid: uuid().toString(),
        name: data.name,
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

    return NextResponse.json({ status: 'success', message: 'Folder created' })
}

export async function DELETE(request: NextRequest) {
    const uid = request.nextUrl.searchParams.get('uid')
    const userId = request.headers.get('x-user-id')
    const checkFolder = (
        await SupaBaseService.instance
            .from('folder')
            .select('*')
            .eq('uid', uid)
            .eq('user_id', userId)
    ).data

    if (!checkFolder) {
        return NextResponse.json(
            { message: 'Folder not found' },
            { status: 400 }
        )
    }

    const result = await SupaBaseService.instance
        .from('folder')
        .delete()
        .eq('uid', uid)

    if (result.error) {
        return NextResponse.json(
            { message: 'Can not delete folder' },
            { status: 500 }
        )
    }

    return NextResponse.json({ status: 'success', message: 'Folder deleted' })
}
