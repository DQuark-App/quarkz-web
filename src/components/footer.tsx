import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useTheme } from '@mui/material/styles'
const Footer = () => {
    const theme = useTheme()

    return (
        <Grid container spacing={2}>
            <Grid item container justifyContent={'center'} direction={'row'}>
                <a
                    href={'https://twitter.com/dquarkofficial'}
                    style={{ color: theme.palette.common.white }}
                >
                    <TwitterIcon />
                </a>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    align={'center'}
                    variant={'subtitle2'}
                    color="text.secondary"
                    gutterBottom
                >
                    &copy; DQUARK NETWORKS. 2023. All rights reserved
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer
