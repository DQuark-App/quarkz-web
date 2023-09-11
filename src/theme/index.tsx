import { responsiveFontSizes } from '@mui/material'
import { PaletteOptions, Shadows, createTheme } from '@mui/material/styles'
import shadows from './shadows'
import { light, dark } from './palette'

const getTheme = (mode: string = 'light') =>
	responsiveFontSizes(
		createTheme({
			palette: (mode === 'light' ? light : dark) as PaletteOptions,
			shadows: shadows(mode) as Shadows,
			typography: {
				fontFamily: '"Inter", sans-serif',
				button: {
					textTransform: 'none',
					fontWeight: 'medium',
				},
			},
			zIndex: {
				appBar: 1200,
				drawer: 1300,
			},
			components: {
				MuiButton: {
					styleOverrides: {
						root: {
							fontWeight: 400,
							borderRadius: 5,
							paddingTop: 10,
							paddingBottom: 10,
						},
						containedSecondary: mode === 'light' ? { color: 'white' } : {},
					},
				},
				MuiInputBase: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
					},
				},
				MuiOutlinedInput: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
						input: {
							borderRadius: 5,
						},
					},
				},
				MuiCard: {
					styleOverrides: {
						root: {
							borderRadius: 8,
						},
					},
				},
			},
		})
	)

export default getTheme
