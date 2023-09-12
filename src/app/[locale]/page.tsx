import Container from '@/components/container'
import Product from '@/components/product'
import Welcome from '@/components/welcome'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'DQuark Networks',
	description:
		'The Front is a beautiful MUI React landing page template built with Material-UI, React, Next.js, and TypeScript.',
}

export default function Home() {
	return (
		<>
			<Welcome />
			{/* <Container>
				<Product />
			</Container> */}
		</>
	)
}
