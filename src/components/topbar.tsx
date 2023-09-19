'use client'

import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { alpha, useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import NavItem from './navitem'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Typography } from '@mui/material'

const Topbar = ({ onSidebarOpen, pages = [], colorInvert = false }: any) => {
    const theme = useTheme()
    const router = useRouter()
    const { mode } = theme.palette

    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={1}
        >
            <Box
                display={'flex'}
                width={{ xs: 100, md: 120 }}
                alignItems={'center'}
            >
                <Image
                    src={'/logo-no-background.png'}
                    width={60}
                    height={60}
                    alt={''}
                />
                <Typography variant={'h4'} color={'white'}>
                    QUARK
                </Typography>
            </Box>
            <Box
                sx={{ display: { xs: 'none', md: 'flex' } }}
                alignItems={'center'}
            >
                {pages.map((page: any, index: number) => {
                    return (
                        <Box key={index.toString()} marginX={2}>
                            <NavItem
                                onClick={() => {
                                    router.push(page.href)
                                }}
                                title={page.title}
                                id={`nav-${index}`}
                                colorInvert={colorInvert}
                            />
                        </Box>
                    )
                })}
            </Box>
            <Box
                sx={{ display: { xs: 'block', md: 'none' } }}
                alignItems={'center'}
            >
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
    pages: PropTypes.array,
    colorInvert: PropTypes.bool,
}

export default Topbar
