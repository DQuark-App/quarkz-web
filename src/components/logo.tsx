import Image from 'next/image'
import { Typography } from '@mui/material'
import React from 'react'

export default function Logo() {
    return (
        <>
            <Image
                src={'/logo-no-background.png'}
                width={60}
                height={60}
                alt={''}
            />
            <Typography variant={'h4'} color={'white'}>
                QUARK
            </Typography>
        </>
    )
}
