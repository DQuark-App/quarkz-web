import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import createAdminGuard from './guard/admin'

const middleware = (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith('/api')) {
        return createAdminGuard(request)
    }

    const localeMiddleWare = createMiddleware({
        locales: ['en', 'id'],
        defaultLocale: 'en',
    })

    return localeMiddleWare(request)
}

export default middleware

export const config = {
    matcher: ['/((?!app|_next|.*\\..*).*)'],
}
