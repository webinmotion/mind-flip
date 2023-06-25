import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';

export default function VerifyGuest({ showAlert, guestEmailForm, setGuestEmailForm, verificationForm, setVerificationForm, verifyEmailAddress }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            code: data.get('code'),
        };

        const { code } = formData;

        setVerificationForm(form => ({
            ...form,
            code: { ...form.code, value: code, error: !code, message: !code ? 'verification code is a required field' : '' },
        }));

        //if all is good, register the details
        if (code && guestEmailForm?.email_address.value) {
            verifyEmailAddress({ email_address: guestEmailForm?.email_address.value, verification_code: code }, function(error){
                if(!error){
                    setGuestEmailForm(form => ({
                        ...form,
                        verified: true,
                    }))

                    showAlert({
                        message: "Your email has been validated successfully",
                        autoClose: true,
                        severity: 'success',
                    })
                }
                else{
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
                <LockPersonIcon />
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
                            name="code"
                            label="verification Code"
                            id="code"
                            autoComplete="verification code"
                            error={verificationForm?.code.error}
                            helperText={verificationForm?.code.message}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Verify
                </Button>
            </Box>
        </Box>
    );
}