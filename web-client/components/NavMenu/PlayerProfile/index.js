import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function PlayerProfile({ profile, setProfile, updateProfile }) {

    const requiredFields = {
        email_address: '',
        screen_name: ''
    };

    const [notOptional, setNotOptional] = useState(requiredFields);

    const onInputChange = e => setProfile(state => ({...state, [e.target.name]: e.target.value}))

    const handleSubmit = (event) => {
        event.preventDefault();
        setNotOptional(requiredFields);

        const { email_address, screen_name } = profile;

        if (!email_address || email_address !== profile.email_address) {
            setNotOptional(state => ({
                ...state,
                email_address: `You cannot change the email address. It must remain ${profile.email_address}`
            }));
            return;
        }

        if (!screen_name) {
            setNotOptional(state => ({
                ...state,
                screen_name: 'The screen name is a required field'
            }));
            return;
        }

        updateProfile();
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="screenName"
                            name="screen_name"
                            label="Screen name"
                            fullWidth
                            autoComplete="screen name"
                            variant="standard"
                            value={profile?.screen_name}
                            helperText={notOptional?.screen_name}
                            error={notOptional?.screen_name !== ''}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email_address"
                            label="Email Address"
                            fullWidth
                            autoComplete="email address"
                            variant="standard"
                            value={profile?.email_address}
                            helperText={notOptional?.email_address}
                            error={notOptional?.email_address !== ''}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="phone"
                            name="phone_number"
                            label="Phone Number"
                            fullWidth
                            autoComplete="phonne number"
                            variant="standard"
                            value={profile?.phone_number || ''}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="city"
                            variant="standard"
                            value={profile?.city || ''}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            variant="standard"
                            value={profile?.state || ''}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="country"
                            variant="standard"
                            value={profile?.country || ''}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}