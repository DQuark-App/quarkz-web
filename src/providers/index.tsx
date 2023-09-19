import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import QuarkThemeProvider from './theme'
import { FirebaseProvider } from './firebase'
import { SolanaProvider } from '@/providers/solana'

export default async function Providers({
    children,
    params,
}: {
    children: React.ReactNode
    params: any
}) {
    let messages
    try {
        messages = (await import(`../locales/${params.locale}.json`)).default
    } catch (error) {
        notFound()
    }
    return (
        <QuarkThemeProvider>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
                <FirebaseProvider>
                    <SolanaProvider>{children}</SolanaProvider>
                </FirebaseProvider>
            </NextIntlClientProvider>
        </QuarkThemeProvider>
    )
}
