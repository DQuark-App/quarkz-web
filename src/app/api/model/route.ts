import { NextRequest, NextResponse } from 'next/server'
import SupaBaseService from '@/service/supabase'

export async function GET(request: NextRequest) {
    const result = await SupaBaseService.instance.from('model').select('name, image').order('name', {
        ascending: true,
    })
    return NextResponse.json({ data: result.data || [] })
}
