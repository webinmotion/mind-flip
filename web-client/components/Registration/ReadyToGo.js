import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function ReadyToGo({ selectedGame, playerEmail, addGameParticipant }) {

    React.useEffect(() => {
        async function joinSelectedGame({ game, email }) {
            await addGameParticipant({ game, email })
        }

        if (selectedGame && playerEmail) {
            joinSelectedGame({ game: selectedGame, email: playerEmail })
        }
    }, [selectedGame, playerEmail]);

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <ThumbUpIcon />
            </Avatar>
            <Alert severity="success">
                <AlertTitle>Ready to go</AlertTitle>
                You are all set and ready to roll
            </Alert>
        </Box>
    );
}