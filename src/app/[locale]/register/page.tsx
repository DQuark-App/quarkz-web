import Container from '@/components/container'
import { Box, Grid } from '@mui/material'
import SignUpForm from '@/components/signup'

export default function SignUp() {
    return (
        <>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Box
                            component={'img'}
                            src={'/signin.png'}
                            width={1}
                            sx={{
                                filter: 'brightness(0.8)',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SignUpForm />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
