export interface Page {
	title: string
	href: string
}

export const pages: Page[] = [
	{
		title: 'Home',
		href: '/',
	},
	{
		title: 'How to Get Listed',
		href: '/listing',
	},
	{
		title: 'Sign In',
		href: '/login',
	},
]
