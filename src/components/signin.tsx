/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Container from './container'

const SignInForm = () => {
    return (
        <Box maxWidth={600}>
            <Box marginBottom={4}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Welcome back
                </Typography>
            </Box>
            <Card sx={{ p: { xs: 4, md: 6 } }}>
                <form>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography
                                variant={'subtitle2'}
                                sx={{ marginBottom: 2 }}
                            >
                                Enter your email
                            </Typography>
                            <TextField
                                label="Email *"
                                variant="outlined"
                                name={'email'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', sm: 'row' }}
                                alignItems={{ xs: 'stretched', sm: 'center' }}
                                justifyContent={'space-between'}
                                width={1}
                                marginBottom={2}
                            >
                                <Box marginBottom={{ xs: 1, sm: 0 }}>
                                    <Typography variant={'subtitle2'}>
                                        Enter your password
                                    </Typography>
                                </Box>
                                <Typography variant={'subtitle2'}>
                                    <Link
                                        component={'a'}
                                        color={'white'}
                                        href={'#'}
                                        underline={'none'}
                                    >
                                        Forgot your password?
                                    </Link>
                                </Typography>
                            </Box>
                            <TextField
                                label="Password *"
                                variant="outlined"
                                name={'password'}
                                type={'password'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item container xs={12}>
                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', sm: 'row' }}
                                alignItems={{ xs: 'stretched', sm: 'center' }}
                                justifyContent={'space-between'}
                                width={1}
                                maxWidth={600}
                                margin={'0 auto'}
                            >
                                <Box marginBottom={{ xs: 1, sm: 0 }}>
                                    <Typography variant={'subtitle2'}>
                                        Don't have an account yet?{' '}
                                        <Link
                                            component={'a'}
                                            color={'white'}
                                            href={'/register'}
                                            fontWeight={'bold'}
                                            underline={'none'}
                                        >
                                            Sign up here.
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item container xs={12}>
                            <Box width={'100%'}>
                                <Button
                                    size={'large'}
                                    variant={'contained'}
                                    fullWidth
                                    type={'submit'}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Box width={'100%'} marginY={3}>
                                <Button
                                    size={'large'}
                                    variant={'outlined'}
                                    fullWidth
                                    type={'submit'}
                                >
                                    Login With Wallet
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    )
}

export default SignInForm
