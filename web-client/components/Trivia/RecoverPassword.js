import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function RecoverPassword({ setPlayer }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPlayer(player => ({
            ...player,
            emailAddress: data.get('email'),
        }));
    };

    const showSignUp = (e) => {
        e.preventDefault();
        setPlayer(player => ({
            ...player,
            recoverPassword: false,
            emailAddress: '',
        }))
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Recover Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Start Recovery
                </Button>

                <Grid container>
                    <Grid item>
                        <Link href="#" variant="body2" onClick={showSignUp}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}