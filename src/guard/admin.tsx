import { NextRequest, NextResponse } from 'next/server'

const createAdminGuard = (request: NextRequest) => {
    const authorization = request.headers.get('authorization')
    return NextResponse.next()
}

export default createAdminGuard
