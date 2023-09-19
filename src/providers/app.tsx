import QuarkThemeProvider from './theme'
import { FirebaseProvider } from './firebase'

export default function AppProviders({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <QuarkThemeProvider>
            <FirebaseProvider>{children}</FirebaseProvider>
        </QuarkThemeProvider>
    )
}
