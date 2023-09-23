/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { firebaseAuth } from '@/providers/firebase'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { useRouter } from 'next/navigation'
import { Alert, AlertTitle } from '@mui/material'

type SignUpValues = {
    email: string
    password: string
    confirm_Password: string
}
const SignUpForm = () => {
    const router = useRouter()
    const {
        getValues,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SignUpValues>()
    const [error, setError] = useState<string>('')
    const onSignUp = async (data: SignUpValues) => {
        try {
            await createUserWithEmailAndPassword(
                firebaseAuth,
                data.email,
                data.password
            )

            router.push('/login')
        } catch (error) {
            console.log(error)
            setError('Failed to create an account')
        }
    }

    useEffect(() => {
        if (firebaseAuth.currentUser) {
            firebaseAuth.signOut()
        }
    }, [])
    return (
        <Box maxWidth={600}>
            <Box marginBottom={4}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Register Account
                </Typography>
            </Box>
            <Card sx={{ p: { xs: 4, md: 6 } }}>
                <form onSubmit={handleSubmit(onSignUp)}>
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
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Email is not valid',
                                    },
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
                                        Password
                                    </Typography>
                                </Box>
                            </Box>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type={'password'}
                                fullWidth
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be at least 6 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <Typography variant={'subtitle2'}>
                                    {errors.password.message}
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
                                        Re-Type Password
                                    </Typography>
                                </Box>
                            </Box>
                            <TextField
                                label="Password Confirmation"
                                variant="outlined"
                                type={'password'}
                                fullWidth
                                {...register('confirm_Password', {
                                    required:
                                        'Password Confirmation is required',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be at least 6 characters',
                                    },
                                    validate: (value) =>
                                        value === getValues('password') ||
                                        'The passwords do not match',
                                })}
                            />
                            {errors.confirm_Password && (
                                <Typography variant={'subtitle2'}>
                                    {errors.confirm_Password.message}
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
                                        Already has account?{' '}
                                        <Link
                                            component={'a'}
                                            color={'white'}
                                            href={'/login'}
                                            fontWeight={'bold'}
                                            underline={'none'}
                                        >
                                            Sign In here.
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
                                    Register
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    )
}

export default SignUpForm
