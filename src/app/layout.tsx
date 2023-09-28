import Providers from '@/providers'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DQuark App | Generate , Upload and Mint NFTs',
    description:
        'DQuark Networks is a software development company that specializes in building web and mobile applications.',
}
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
