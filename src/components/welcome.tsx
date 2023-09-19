'use client'

import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from './container'

const Welcome = () => {
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
                                    DQuark Center
                                    <br />
                                </Typography>
                            </Box>
                            <Box marginBottom={3}>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    color="text.primary"
                                >
                                    Quark is Simple, Secure and Easy to
                                    Integrate Web 2.0 Service on Solana
                                    Blockchain. <br />
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', sm: 'row' }}
                                alignItems={{
                                    xs: 'stretched',
                                    sm: 'flex-start',
                                }}
                            >
                                <Box
                                    component={Button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth={!isMd}
                                >
                                    Explore
                                </Box>
                                <Box
                                    component={Button}
                                    color="white"
                                    size="large"
                                    fullWidth={!isMd}
                                    marginTop={{ xs: 1, sm: 0 }}
                                    marginLeft={{ sm: 2 }}
                                    startIcon={
                                        <Box
                                            component={'svg'}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            width={24}
                                            height={24}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </Box>
                                    }
                                >
                                    Watch the video
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
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
                                    src={'/home.png'}
                                    width={1}
                                    height={1}
                                    sx={{
                                        filter:
                                            theme.palette.mode === 'dark'
                                                ? 'brightness(0.8)'
                                                : 'none',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Welcome
