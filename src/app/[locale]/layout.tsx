import MainLayout from '@/components/mainlayout'
import Providers from '@/providers'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Paper } from '@mui/material'

export default function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: any
}) {
	return (
		<html lang="en">
			<body>
				<Providers params={params}>
					<Paper>
						<MainLayout>{children}</MainLayout>
					</Paper>
				</Providers>
			</body>
		</html>
	)
}
