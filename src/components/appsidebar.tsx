'use client'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { AppPages } from '@/data/appnav'
import { useRouter } from 'next/navigation'

export default function AppSideBar() {
    const router = useRouter()
    return (
        <>
            <List>
                {AppPages.map((nav, index) => {
                    return (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                onClick={() => router.push(nav.href)}
                            >
                                <ListItemIcon>{nav.icon}</ListItemIcon>
                                <ListItemText primary={nav.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
