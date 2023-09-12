import SupaBaseService from '@/service/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const data = (await SupaBaseService.instance.from('hello').select('*')).data
	return NextResponse.json({ status: 'ok', data })
}

export async function PUT(request: NextRequest) {
	const result = await SupaBaseService.instance
		.from('hello')
		.insert({ name: 'test' })
	return NextResponse.json(result)
}
