import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ViewNames } from '../../../hooks/usePageForms';

export default function RecoverPassword({ recoveryForm, setRecoveryForm, setSignUpForm, recoverPassword, toggleCurrentView }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            email_address: data.get('email_address'),
        };

        const { email_address } = formData;

        setRecoveryForm(form => ({
            ...form,
            email_address: { ...form.email_address, value: email_address, error: !email_address, message: !email_address ? 'email address is a required field' : '' },
        }));

        toggleCurrentView(ViewNames.VERIFYING_VIEW);

        //if all is good, register the details
        if (email_address) {
            recoverPassword(email_address);
        }
    };

    const showSignUp = (e) => {
        e.preventDefault();
        setRecoveryForm(form => ({
            ...form,
            email_address: '',
        }));
        setSignUpForm(form => ({
            ...form,
            email_address: { ...form.email_address, value: '' },
        }));
        toggleCurrentView(ViewNames.SIGNUP_VIEW);
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
                            id="email_address"
                            label="Email Address"
                            name="email_address"
                            autoComplete="email"
                            error={recoveryForm.email_address.error}
                            helperText={recoveryForm.email_address.message}
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