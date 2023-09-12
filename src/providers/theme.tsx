'use client'
import getTheme from '@/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

export default function QuarkThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ThemeProvider theme={getTheme('dark')}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
