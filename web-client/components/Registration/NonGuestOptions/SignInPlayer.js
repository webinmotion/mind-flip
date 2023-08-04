import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import {ViewNames} from '../../../hooks/usePageForms';

export default function SignInPlayer({ showAlert, signInForm, setSignInForm, setSignUpForm, accountSignIn, toggleCurrentView, }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get('username'),
      password: data.get('password'),
    };

    const { username, password } = formData;

    setSignInForm(form => ({
      ...form,
      username: { ...form.username, value: username, error: !username, message: !username ? 'username is a required field' : '' },
      password: { ...form.password, value: password, error: !password, message: !password ? 'password is a required field' : '' }
    }));

    //if all is good, register the details
    if (username && password) {
      accountSignIn({
        username,
        password
      }, function (error, data) {
        if (!error) {
          setSignUpForm(form => ({
            ...form,
            email_address: { ...form.email_address, value: '' },
          }));

          showAlert({
            message: "Congratulations. You have been signed in successfully",
            autoClose: true,
            severity: 'success',
          })
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

  const showSignUp = (e) => {
    e.preventDefault();
    setSignInForm(form => ({
      ...form,
    }));
    setSignUpForm(form => ({
      ...form,
      email_address: { ...form.email_address, value: '' },
    }));
    toggleCurrentView(ViewNames.SIGNUP_VIEW);
  };

  const showRecover = (e) => {
    e.preventDefault();
    toggleCurrentView(ViewNames.RECOVERY_VIEW);
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
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          error={signInForm.username.error}
          helperText={signInForm.username.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={signInForm.password.error}
          helperText={signInForm.password.message}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" onClick={showRecover}>
              Forgot password?
            </Link>
          </Grid>
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