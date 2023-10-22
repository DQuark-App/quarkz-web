import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'
import nacl from 'tweetnacl'
import { Buffer } from 'buffer'
import * as bs58 from 'bs58'
const createAdminGuard = async (request: NextRequest) => {
    const authorization = request.headers.get('Authorization')
        ? request.headers.get('Authorization')
        : request.headers.get('authorization')
        ? request.headers.get('authorization')
        : null
    if (!authorization) {
        return NextResponse.json(
            { error: 'Unauthorized no header found'},
            { status: 401 }
        )
    }
    let userId: string | null = null

    if (request.url.includes('api/custom-token')) {
        const token = Buffer.from(authorization, 'base64').toString('utf-8')
        const [publicKey, signature] = token.split('&&')
        const isValid = nacl.sign.detached.verify(
            new TextEncoder().encode(
                'Please sign this message to verify address'
            ),
            Buffer.from(signature, 'base64'),
            bs58.decode(publicKey)
        )
        if (!isValid) {
            return NextResponse.json(
                { error: 'Unauthorized Wallet Token' },
                { status: 401 }
            )
        }

        userId = publicKey
    }

    try {
        const user = await jose.decodeJwt(authorization)
        userId = user.user_id as string
    } catch (e) {}

    if (!userId) {
        return NextResponse.json(
            { error: 'Unauthorized Firebase Token' },
            { status: 401 }
        )
    }
    const response = NextResponse.next()
    response.headers.set('x-user-id', userId)
    return response
}

export default createAdminGuard
