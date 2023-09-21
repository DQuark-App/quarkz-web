import { Page } from '@/data/nav'
import { ReactNode } from 'react'
import { House } from '@mui/icons-material'
export interface PageWithIcon extends Page {
    icon: ReactNode
}

export const AppPages: PageWithIcon[] = [
    {
        title: 'Home',
        href: '/',
        icon: <House />,
    },
]
