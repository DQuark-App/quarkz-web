import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import QuarkThemeProvider from './providers/theme'

export default async function Providers({
	children,
	params,
}: {
	children: React.ReactNode
	params: any
}) {
	let messages
	try {
		messages = (await import(`./locales/${params.locale}.json`)).default
	} catch (error) {
		notFound()
	}
	return (
		<QuarkThemeProvider>
			<NextIntlClientProvider locale={params.locale} messages={messages}>
				{children}
			</NextIntlClientProvider>
		</QuarkThemeProvider>
	)
}
