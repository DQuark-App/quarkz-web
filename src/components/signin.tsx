/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useForm } from 'react-hook-form'
import {
    signInWithCustomToken,
    signInWithEmailAndPassword,
} from '@firebase/auth'
import { firebaseAuth } from '@/providers/firebase'
import { Alert, AlertTitle } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
type SignInValues = {
    email: string
    password: string
}
const SignInForm = () => {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SignInValues>()
    const [error, setError] = useState<string>('')
    const { setVisible: setModalVisible } = useWalletModal()
    const { publicKey, disconnect, signMessage } = useWallet()

    const onSignInEmail = async (data: SignInValues) => {
        try {
            await signInWithEmailAndPassword(
                firebaseAuth,
                data.email,
                data.password
            )

            router.push('/app')
        } catch (e) {
            console.log(e)
            setError('Failed to sign in. Invalid email or password')
        }
    }
    const onSignInWallet = async () => {
        try {
            if (!signMessage) {
                throw new Error('Sign message not supported')
            }
            const message = 'Please sign this message to verify address'
            const encodedMessage = new TextEncoder().encode(message)
            const signature = await signMessage(encodedMessage)
            const rawToken =
                publicKey?.toBase58() +
                '&&' +
                new Buffer(signature).toString('base64')

            const token = Buffer.from(rawToken).toString('base64')
            const response = await fetch('/api/custom-token', {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
            })
            const data = (await response.json()) as { token: string }

            await signInWithCustomToken(firebaseAuth, data.token)

            router.push('/app')
        } catch (e) {
            console.log(e)
            setError('Failed to sign in. Can not verify address')
        }
    }
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
                <form onSubmit={handleSubmit(onSignInEmail)}>
                    <Grid container spacing={4}>
                        {error && (
                            <Grid item xs={12} marginY={2}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </Alert>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Typography
                                variant={'subtitle2'}
                                sx={{ marginBottom: 2 }}
                            >
                                Enter your email
                            </Typography>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                            />
                            {errors.email && (
                                <Typography variant={'subtitle2'}>
                                    {errors.email.message}
                                </Typography>
                            )}
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
                                type={'password'}
                                fullWidth
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                            {errors.password && (
                                <Typography variant={'subtitle2'}>
                                    {errors.password.message}
                                </Typography>
                            )}
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
                            {!publicKey && (
                                <Box width={'100%'} marginY={3}>
                                    <Button
                                        size={'large'}
                                        variant={'outlined'}
                                        fullWidth
                                        type={'button'}
                                        onClick={() => {
                                            setModalVisible(true)
                                        }}
                                    >
                                        Connect Wallet
                                    </Button>
                                </Box>
                            )}
                            {publicKey && (
                                <Box width={'50%'} marginY={3} paddingRight={1}>
                                    <Button
                                        size={'large'}
                                        variant={'outlined'}
                                        fullWidth
                                        type={'button'}
                                        onClick={disconnect}
                                    >
                                        Disconnect
                                    </Button>
                                </Box>
                            )}

                            {publicKey && (
                                <Box width={'50%'} marginY={3} paddingLeft={1}>
                                    <Button
                                        size={'large'}
                                        variant={'contained'}
                                        fullWidth
                                        type={'button'}
                                        onClick={onSignInWallet}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    )
}

export default SignInForm
