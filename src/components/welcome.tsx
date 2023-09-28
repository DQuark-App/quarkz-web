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
                                    Generate , Upload and Mint NFTs
                                    <br />
                                </Typography>
                            </Box>
                            <Box marginBottom={3}>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    color="text.primary"
                                >
                                    Our innovative app allows you to generate
                                    unique and beautiful art pieces, upload them
                                    to the IPFS network, and mint them as NFTs
                                    on the Solana blockchain. <br />
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
                                    src={'/dquark-home.png'}
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
