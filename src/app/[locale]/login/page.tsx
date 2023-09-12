import Container from '@/components/container'
import SignInForm from '@/components/signin'
import { Box, Grid } from '@mui/material'

export default function Login() {
	return (
		<>
			<Container>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<Box
							component={'img'}
							src={'/signin.png'}
							width={1}
							height={1}
							sx={{
								filter: 'brightness(0.8)',
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SignInForm />
					</Grid>
				</Grid>
			</Container>
		</>
	)
}
