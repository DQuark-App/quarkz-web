import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Footer = () => {
    return (
        <Grid container spacing={2}>
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
