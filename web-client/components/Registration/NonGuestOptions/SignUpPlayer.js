import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { ViewNames } from '../../../hooks/usePageForms';

export default function SignUpPlayer({ showAlert, signUpForm, setSignUpForm, setSignInForm, registerPlayer, toggleCurrentView }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            email_address: data.get('email_address'),
            screen_name: data.get('screen_name'),
            username: data.get('username'),
            password: data.get('password'),
        };

        const { email_address, screen_name, username, password } = formData;

        setSignUpForm(form => ({
            ...form,
            email_address: { ...form.email_address, value: email_address, error: !email_address, message: !email_address ? 'email address is a required field' : '' },
            screen_name: { ...form.screen_name, value: screen_name, error: !screen_name, message: !screen_name ? 'screen name is a required field' : '' },
            username: { ...form.username, value: username, error: !username, message: !username ? 'username is a required field' : '' },
            password: { ...form.password, value: password, error: !password, message: !password ? 'password is a required field' : '' }
        }));

        //if all is good, register the details
        if (email_address && screen_name && username && password) {
            registerPlayer({
                email_address,
                screen_name,
                username,
                password
            }, function (error) {
                if (!error) {
                    setSignInForm(form => ({
                        ...form,
                        account_exists: true,
                        username: { ...form.username, value: signUpForm.username.value },
                    }));

                    showAlert({
                        message: "Congratulations. You have been registered successfully",
                        autoClose: true,
                        severity: 'success',
                    });

                    toggleCurrentView(ViewNames.SIGNIN_VIEW);
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

    const showSignIn = (e) => {
        e.preventDefault();
        toggleCurrentView(ViewNames.SIGNIN_VIEW)
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
                Sign Up
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
                            error={signUpForm.email_address.error}
                            helperText={signUpForm.email_address.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="screen_name"
                            label="Screen Name"
                            id="screen_name"
                            autoComplete="screen name"
                            error={signUpForm.screen_name.error}
                            helperText={signUpForm.screen_name.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            error={signUpForm.username.error}
                            helperText={signUpForm.username.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            error={signUpForm.password.error}
                            helperText={signUpForm.password.message}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2" onClick={showSignIn}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}