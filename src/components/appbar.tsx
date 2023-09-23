'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { firebaseAuth } from '@/providers/firebase'
import useStore from '@/store'

interface PrimaryAppBarProps {
    title: string
}
export default function PrimaryAppBar({ title = '' }: PrimaryAppBarProps) {
    const store = useStore()
    const user = store.user
    const signOut = () => {
        store.signOut()
    }

    return (
        <>
            <AppBar
                position={'fixed'}
                sx={{
                    width: `calc(100% - 240px)`,
                    ml: `240px`,
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: 'block' }}
                    >
                        {title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            color="inherit"
                            onClick={signOut}
                        >
                            <AccountCircle />
                            <Typography variant={'subtitle2'}>
                                {user?.displayName
                                    ? user?.displayName.substring(0, 6) +
                                      '...' +
                                      user?.displayName.substring(
                                          user?.displayName?.length - 6
                                      )
                                    : user?.email}{' '}
                                (Sign Out)
                            </Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
