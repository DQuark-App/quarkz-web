'use client'

import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { alpha, useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import NavItem from './navitem'
import Image from 'next/image'

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }: any) => {
	const theme = useTheme()
	const { mode } = theme.palette
	// const {
	// 	landings: landingPages,
	// 	secondary: secondaryPages,
	// 	company: companyPages,
	// 	account: accountPages,
	// 	portfolio: portfolioPages,
	// 	blog: blogPages,
	// } = pages

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box
				display={'flex'}
				component="a"
				href="/"
				title="theFront"
				width={{ xs: 100, md: 120 }}
			>
				<Image
					src={
						mode === 'light' && !colorInvert
							? '/logo-black.png'
							: '/logo-white.png'
					}
					width={180}
					height={60}
					alt={''}
				/>
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Box>
					<NavItem title={'Home'} id={'home'} colorInvert={colorInvert} />
				</Box>
				<Box marginLeft={4}>
					<NavItem title={'Sign In'} id={'signin'} colorInvert={colorInvert} />
				</Box>
			</Box>
			<Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
				<Button
					onClick={() => onSidebarOpen()}
					aria-label="Menu"
					variant={'outlined'}
					sx={{
						borderRadius: 2,
						minWidth: 'auto',
						padding: 1,
						borderColor: alpha(theme.palette.divider, 0.2),
					}}
				>
					<MenuIcon />
				</Button>
			</Box>
		</Box>
	)
}

Topbar.propTypes = {
	onSidebarOpen: PropTypes.func,
	pages: PropTypes.object,
	colorInvert: PropTypes.bool,
}

export default Topbar
