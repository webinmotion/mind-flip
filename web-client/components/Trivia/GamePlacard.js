import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function GamePlacard({progression: {placard,}}) {

    return (
        <Container disableGutters maxWidth="sm" component="main" sx={{pt: 4, pb: 4}}>
            <Typography
                component="p"
                variant="h5"
                align="center"
                color="text.secondary"
                gutterBottom
            >
                Snack Break
            </Typography>

            <Typography
                component="h1"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
            >
                {placard?.placard_content}
            </Typography>
        </Container>
    )
}
