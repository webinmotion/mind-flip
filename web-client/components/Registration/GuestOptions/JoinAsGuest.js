import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';

export default function JoinAsGuest({ showAlert, guestEmailForm, setGuestEmailForm, registerGuest }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            email_address: data.get('email'),
        };

        const { email_address, } = formData;

        setGuestEmailForm(form => ({
            ...form,
            verified: false,
            email_address: { ...form.email_address, value: email_address, error: !email_address, message: !email_address ? 'email address is a required field' : '' },
        }));

        //if all is good, register the guest
        if (email_address) {
            registerGuest(email_address, function (error, data) {
                if (!error) {
                    showAlert({
                        message: "Congratulations. You have been registered successfully",
                        autoClose: true,
                        severity: 'success',
                    });

                    //print out response data
                    console.log('guest registration data', data);
                }
                else {
                    showAlert({
                        message: error,
                        autoClose: true,
                        severity: 'error',
                    });
                }
            });
        }
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
                Guest Player
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
                            error={guestEmailForm?.email_address.error}
                            helperText={guestEmailForm?.email_address.message}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Request to Join
                </Button>
            </Box>
        </Box>
    );
}