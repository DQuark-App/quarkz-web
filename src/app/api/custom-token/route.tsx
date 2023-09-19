import { NextRequest, NextResponse } from 'next/server'
import FirebaseService from '@/service/firebase'

export async function POST(request: NextRequest) {
    let user: any = null
    try {
        user = await FirebaseService.firebaseAdminAuth.getUser(
            request.headers.get('x-user-id')!
        )
    } catch (e) {
        user = await FirebaseService.firebaseAdminAuth.createUser({
            uid: request.headers.get('x-user-id')!,
            displayName: request.headers.get('x-user-id')!,
            email: request.headers.get('x-user-id')! + '@dquark.network',
        })
    }

    const token = await FirebaseService.firebaseAdminAuth.createCustomToken(
        user.uid
    )
    return NextResponse.json({ token: token })
}
