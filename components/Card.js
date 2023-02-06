import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function MediaControlCard() {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Available Stock
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        250 Items
                    </Typography>
                </CardContent>

            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://media.istockphoto.com/photos/stock-market-investment-graph-with-indicator-and-volume-data-picture-id1221293664?b=1&k=20&m=1221293664&s=612x612&w=0&h=G37b-ENZKUQowTtK8CP-EbfS2BgVMVwi06HuzuADjhg="
                alt="Live from space album cover"
            />
        </Card>
    );
}

export default MediaControlCard;