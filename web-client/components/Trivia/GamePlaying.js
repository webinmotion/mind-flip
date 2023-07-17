import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ProgressBar from '../Layout/ProgressBar';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h5,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function GamesPlaying({ engine, current, onNext, hasMore, handleSubmit }) {

    function onHandleNext(e) {
        e.preventDefault();
        if (typeof onNext === 'function') {
            onNext();
        }
    }

    return (
        <React.Fragment>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 4 }}>
                <Typography
                    component="p"
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                >
                    Round {current?.round} - Question {current?.number}
                </Typography>

                <Typography
                    component="h1"
                    variant="h3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {current?.que_value}
                </Typography>

                <Typography
                    component="p"
                    variant="subtitle"
                    align="right"
                    color="text.secondary"
                >
                    {current?.max_points} points
                </Typography>
            </Container>

            {current?.has_choices &&
                <Box sx={{ width: '100%', mb: 5 }}>
                    <Typography variant="subtitle" align="left" color="text.secondary" component="p">
                        Choices
                    </Typography>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {current?.choices.map(choice => (
                            <Grid key={choice.choice_id} item xs={6}>
                                <Button fullWidth sx={{ padding: 2, fontSize: '1.2em' }} variant="outlined">{choice.choice_value}</Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }

            {!current?.has_choices &&
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="answer"
                                label="Answer"
                                name="answer"
                                autoComplete="answer"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit Answer
                    </Button>
                </Box>
            }

            {onNext && hasMore && engine?.progression === 'manual' &&
                <Box component="form" noValidate onSubmit={onHandleNext} sx={{ mt: 3 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Next
                    </Button>
                </Box>
            }
        </React.Fragment>
    )
}