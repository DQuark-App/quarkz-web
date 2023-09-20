import AppProviders from '@/providers/app'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Protected from '@/components/protected'
import AppLayout from '@/components/applayout'

export default function AppRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AppProviders>
                    <Protected>
                        <AppLayout>{children}</AppLayout>
                    </Protected>
                </AppProviders>
            </body>
        </html>
    )
}
