import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';

export default function VerifyRegistered({ recoveryForm, verificationForm, setVerificationForm, verifyEmailAddress, }) {

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
        if (code && recoveryForm.email_address) {
            verifyEmailAddress({ email_address: recoveryForm.email_address, verification_code: code });
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
                Registered Player
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
                            error={verificationForm.error}
                            helperText={verificationForm.message}
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