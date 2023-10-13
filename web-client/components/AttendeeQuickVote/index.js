import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AttendQuickVote({attendees, choices, voting, question, submitChoice, }) {

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, minWidth: 120 },
            }}
            noValidate
            autoComplete="off"
        >
            <Paper elevation={3} >
                <Typography sx={{m: 2, p: 2}} variant="h2" component="h3">
                    {question || "Next vote coming up"}
                </Typography>
            </Paper>

            <Stack direction="row" spacing={2}>
                {choices.map((choice, idx) => (
                    <Button key={idx} variant="outlined" onClick={() => submitChoice(choice)}>
                        {choice}
                    </Button>
                ))}
            </Stack>

            <Box sx={{ my: 2, mx: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {attendees?.length > 0 ? attendees.map(att => (
                            <Grid item xs={4}>
                                <Item>{att.screen_name}</Item>
                            </Grid>
                        )):
                        <Grid item sx={{width: '100%'}}>
                            <Item>Awaiting attendees to join</Item>
                        </Grid>
                    }
                </Grid>
            </Box>
        </Box>
    );
}