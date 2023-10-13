import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ListIcon from '@mui/icons-material/List';
import {Fab} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ManageQuickVote({attendees, email, choice, selected, choices, editing, createChoices, selectChoice, removeChoice, handleChoice, handleQuestion, broadcastData, handleEmail, inviteAttendee, }) {

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, minWidth: 120 },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="up_for_vote_text"
                    label="Question up for vote"
                    multiline
                    rows={4}
                    placeholder="What is the vote about?"
                    fullWidth
                    error={false}
                    helperText={""}
                    onChange={handleQuestion}
                />

                <Box sx={{'& .MuiTextField-root': { m: 1, width: '40ch' }}}>
                    <TextField
                        id="add-new-choice"
                        label="Add new choice"
                        placeholder="Create a choice"
                        value={choice}
                        onChange={handleChoice}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <IconButton
                                    aria-label="remove choices"
                                    onClick={() => removeChoice(choice)}
                                    edge="start"
                                >
                                    {editing ? <RemoveCircleIcon /> : null }
                                </IconButton>
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="add or update choices"
                                    onClick={() => createChoices(choice)}
                                    edge="end"
                                >
                                    {editing ? <SaveIcon /> : choice !== "" ? <AddCircleIcon /> : null }
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        id="create-choices"
                        select
                        label={`${choices?.length || 0} Choice(s) available`}
                        value={selected}
                        helperText=""
                        onChange={selectChoice}
                    >
                        {choices.map((option) => (
                            <MenuItem key={option} value={option}>
                                <IconButton size={"small"}>
                                    <ListIcon />
                                </IconButton>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Button sx={{m: 1}} variant="contained" endIcon={<SendIcon />} onClick={broadcastData} fullWidth >
                    Send
                </Button>
            </div>

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <TextField
                        label="Attendee email"
                        id="attendee-email-input"
                        sx={{ m: 1, width: '45ch' }}
                        fullWidth
                        value={email}
                        onChange={handleEmail}
                    />
                    <Fab sx={{mt: 2}} size={"small"} color="primary" aria-label="add new attendee">
                        <AddIcon onClick={inviteAttendee} />
                    </Fab>
                </div>
            </Box>

            <Box sx={{ mt: 2, flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {attendees?.length > 0 && attendees.map(att => (
                        <Grid item xs={4}>
                            <Item>{att.email_address}</Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}