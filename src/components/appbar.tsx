'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { firebaseAuth, useDQuarkUser } from '@/providers/firebase'

interface PrimaryAppBarProps {
    title: string
}
export default function PrimaryAppBar({ title = '' }: PrimaryAppBarProps) {
    const user = useDQuarkUser()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const signOut = () => {
        firebaseAuth.signOut()
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            style={{ marginTop: '40px' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
        </Menu>
    )

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
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                            <Typography variant={'subtitle2'}>
                                {user?.displayName
                                    ? user?.displayName.substring(0, 4) +
                                      '...' +
                                      user?.displayName.substring(
                                          user?.displayName?.length - 4
                                      )
                                    : user?.email}
                            </Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    )
}
