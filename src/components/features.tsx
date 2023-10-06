'use client'

import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from './container'
import Image from 'next/image'

const Features = () => {
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    return (
        <Box
            bgcolor={'alternate.main'}
            padding={{ xs: 2, md: 4 }}
            borderRadius={2}
        >
            <Container>
                <Grid container spacing={4} marginY={3}>
                    <Grid item xs={12} md={6}>
                        <Box
                            height={1}
                            width={1}
                            display={'flex'}
                            justifyContent={'center'}
                        >
                            <Box
                                height={1}
                                width={1}
                                maxWidth={{ xs: 600, md: '100%' }}
                                maxHeight={500}
                            >
                                <Box
                                    component={'img'}
                                    src={'/samurai.jpg'}
                                    width={1}
                                    height={1}
                                    sx={{
                                        borderRadius: 10,
                                        filter:
                                            theme.palette.mode === 'dark'
                                                ? 'brightness(0.8)'
                                                : 'none',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        md={6}
                        alignItems={'center'}
                        sx={{ position: 'relative' }}
                    >
                        <Box
                            data-aos={isMd ? 'fade-right' : 'fade-up'}
                            marginBottom={4}
                        >
                            <Box marginBottom={4}>
                                <Typography
                                    variant="h3"
                                    component={'h3'}
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Let your creativity flow
                                    <br />
                                </Typography>
                            </Box>
                            <Box marginBottom={3}>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    color="text.primary"
                                >
                                    Join the NFT revolution and unleash your
                                    creativity! With our app, you can easily
                                    create unique and valuable NFTs that can be
                                    bought, sold, and traded worldwide.
                                    <br />
                                    <br />
                                    Start creating your own Generative NFTs
                                    today! <br />
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Features
