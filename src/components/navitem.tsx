'use client'

import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NavItem = ({ title, id, onClick, colorInvert = false }: any) => {
    const handleClick = (event: any) => {
        if (onClick) onClick(event)
    }

    const linkColor = colorInvert ? 'common.white' : 'text.primary'

    return (
        <Box>
            <Box
                display={'flex'}
                alignItems={'center'}
                aria-describedby={id}
                sx={{ cursor: 'pointer' }}
                onClick={(e) => handleClick(e)}
            >
                <Typography fontWeight={400} color={linkColor}>
                    {title}
                </Typography>
            </Box>
        </Box>
    )
}

NavItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    colorInvert: PropTypes.bool,
    onClick: PropTypes.func,
}

export default NavItem
