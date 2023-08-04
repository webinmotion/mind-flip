import * as React from 'react';
import {useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function GameMultiPlay({ progression: { question, ending_message, }, navigate, submitAnswer, submitChoice, }) {

    useEffect(() => {
        if(ending_message) {
            navigate("/");
        }
    }, [ending_message]);

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
                    Round {question?.round} - Question {question?.number}
                </Typography>

                <Typography
                    component="h1"
                    variant="h3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {question?.que_value}
                </Typography>

                <Typography
                    component="p"
                    variant="subtitle"
                    align="right"
                    color="text.secondary"
                >
                    {question?.max_points} points
                </Typography>
            </Container>

            {question?.has_choices &&
                <Box sx={{ width: '100%', mb: 5 }}>
                    <Typography variant="subtitle" align="left" color="text.secondary" component="p">
                        Choices
                    </Typography>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {question?.choices.map(choice => (
                            <Grid key={choice.choice_id} item xs={6}>
                                <Button fullWidth sx={{ padding: 2, fontSize: '1.2em' }} variant="outlined" onClick={() => submitChoice(choice.choice_value)}>
                                    {choice.choice_value}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }

            {!question?.has_choices &&
                <Box component="form" noValidate onSubmit={submitAnswer} sx={{ mt: 3 }}>
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
        </React.Fragment>
    )
}
