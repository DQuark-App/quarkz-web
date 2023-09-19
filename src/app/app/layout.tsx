import AppProviders from '@/providers/app'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Protected from '@/components/protected'

export default function AppLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: any
}) {
    return (
        <html lang="en">
            <body>
                <AppProviders>
                    <Protected>{children}</Protected>
                </AppProviders>
            </body>
        </html>
    )
}
