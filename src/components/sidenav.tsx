'use client'

import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import NavItem from './navitem'

const SidebarNav = ({ pages }: any) => {
	const theme = useTheme()
	const { mode } = theme.palette

	const {
		landings: landingPages,
		secondary: secondaryPages,
		company: companyPages,
		account: accountPages,
		portfolio: portfolioPages,
		blog: blogPages,
	} = pages

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
				<Box>
					<NavItem title={'Landings'} id={''} />
				</Box>
				<Box>
					<NavItem title={'Company'} id={''} />
				</Box>
				<Box>
					<NavItem title={'Pages'} id={''} />
				</Box>
				<Box>
					<NavItem title={'Account'} id={''} />
				</Box>
				<Box>
					<NavItem title={'Blog'} id={''} />
				</Box>
				<Box>
					<NavItem title={'Portfolio'} id={''} />
				</Box>
			</Box>
		</Box>
	)
}

SidebarNav.propTypes = {
	pages: PropTypes.object.isRequired,
}

export default SidebarNav
