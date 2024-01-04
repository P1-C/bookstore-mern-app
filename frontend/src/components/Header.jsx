/* eslint-disable react/prop-types */
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const Header = ({ title, destination = '/' }) => {
    return (
        <>
            <Box display='flex' flexDirection='row'  >
                <Tooltip title='Go Back' placement='bottom-end' arrow>
                    <IconButton disableRipple component={Link} to={destination}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" flexItem />
                <Typography flexGrow={1} textAlign="center" variant="h5" py={1} px={3}>{title}</Typography>
            </Box>
            <Divider />
        </>
    )
}

export default Header