'use client'

import Container from '@/components/container'
import Sidebar from '@/components/sidebar'
import Topbar from '@/components/topbar'
import {
    AppBar,
    Box,
    useMediaQuery,
    useScrollTrigger,
    useTheme,
} from '@mui/material'
import { useState } from 'react'
import { pages } from '@/data/nav'
import Footer from './footer'
import { useDQuarkUser } from '@/providers/firebase'

export default function MainLayout({
    children,
    colorInvert = false,
    bgcolor = 'transparent',
}: {
    children: React.ReactNode
    colorInvert?: boolean
    bgcolor?: string
}) {
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })
    const [openSidebar, setOpenSidebar] = useState(false)
    const user = useDQuarkUser()

    const handleSidebarOpen = () => {
        setOpenSidebar(true)
    }

    const handleSidebarClose = () => {
        setOpenSidebar(false)
    }

    const open = isMd ? false : openSidebar

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 38,
    })

    return (
        <Box>
            <AppBar
                position={'sticky'}
                sx={{
                    top: 0,
                    backgroundColor: trigger
                        ? theme.palette.background.paper
                        : bgcolor,
                }}
                elevation={trigger ? 1 : 0}
            >
                <Container>
                    <Topbar
                        pages={pages}
                        onSidebarOpen={handleSidebarOpen}
                        colorInvert={trigger ? false : colorInvert}
                    />
                </Container>
            </AppBar>
            <Sidebar
                onClose={handleSidebarClose}
                open={open}
                variant="temporary"
                pages={pages}
            />
            <main>
                <Box minHeight={'80vh'}>{children}</Box>
            </main>
            <Container>
                <Footer />
            </Container>
        </Box>
    )
}
