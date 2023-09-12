'use client'

import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import NavItem from './navitem'
import { useRouter } from 'next/navigation'

const SidebarNav = ({ pages }: any) => {
	const theme = useTheme()
	const router = useRouter()
	const { mode } = theme.palette

	return (
		<Box>
			<Box width={1} paddingX={2} paddingY={1}>
				<Box
					display={'flex'}
					component="a"
					href="/"
					title="theFront"
					width={{ xs: 100, md: 120 }}
				>
					<Box
						component={'img'}
						src={
							mode === 'light'
								? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
								: 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
						}
						height={1}
						width={1}
					/>
				</Box>
			</Box>
			<Box paddingX={2} paddingY={2}>
				{pages.map((page: any, index: number) => {
					return (
						<Box key={index.toString()} marginY={2}>
							<Box>
								<NavItem
									title={page.title}
									onClick={() => {
										router.push(page.href)
									}}
									id={`side-${index}`}
								/>
							</Box>
						</Box>
					)
				})}
			</Box>
		</Box>
	)
}

SidebarNav.propTypes = {
	pages: PropTypes.array.isRequired,
}

export default SidebarNav
