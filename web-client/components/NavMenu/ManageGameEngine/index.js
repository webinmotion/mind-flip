import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function ManageGameEngine({ games, clocks, form, handleSelected, handleChange, handleChecked, handleDateTime, applyEngine, }) {

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, minWidth: 120 },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <FormControl fullWidth>
                    <InputLabel id="select-game-label">Game ID</InputLabel>
                    <Select
                        labelId="select-game-label"
                        name="game_id"
                        value={form.game_id}
                        label="Game ID"
                        onChange={handleSelected}
                    >
                        {games?.length > 0 ?
                            games.map(({game_info}) => <MenuItem key={game_info?.game_id} value={game_info?.game_id}>{game_info?.title}</MenuItem>)
                            :
                            <MenuItem>{"No games available"}</MenuItem>}
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>

                <Box sx={{ my: 2 }}>
                    <DateTimePicker onChange={handleDateTime} name="scheduled_start" value={form.scheduled_start} label="Scheduled Game Start" />
                </Box>

                <Box sx={{ m: 2 }}>
                    <FormControl>
                        <FormLabel id="game-progression-option-label">Game Progression Mode</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="game-progression-option-label"
                            name="progression"
                            value={form.progression}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="auto" control={<Radio />} label="Auto" />
                            <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                        </RadioGroup>
                        <FormHelperText>
                            This will turn ON/OFF the progress bar. When ON (auto), it means that the question should be
                            answered within the countdown duration to be eligible for scoring points. It applies to both
                            multi-player ans single-player mode.
                        </FormHelperText>
                    </FormControl>
                </Box>

                <Box sx={{ m: 2 }}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />}
                            name="is_multi_player"
                            checked={form.is_multi_player}
                            label="Is multi-player mode"
                            title='subscribe to the server for content'
                            onChange={handleChecked} />
                        <FormHelperText>
                            This will instruct the web client to make use of either the MultiPlay or the SinglePlay
                            component. The difference is that MultiPLay will subscribe for content from the server, while
                            SinglePlay will request content from the server.
                        </FormHelperText>
                        <FormControlLabel control={<Checkbox />}
                            name="can_navigate_back"
                            checked={form.can_navigate_back}
                            label="Can navigate back"
                            title='allow a participant to move back and forth in the questions'
                            onChange={handleChecked} />
                        <FormHelperText>
                            (not yet implemented) This will allow a participant to navigate back and forth through the
                            questions. Because of this, the game cannot use a progress bar (progression MUST be manual)
                        </FormHelperText>
                        <FormControlLabel control={<Checkbox />}
                            name="server_push_mode"
                            checked={form.server_push_mode}
                            label="Server push mode"
                            title='server sets the cadence of the game through a timer'
                            onChange={handleChecked} />
                        <FormHelperText>
                            This will instruct the server to register a GameDriver which will manage pushing content
                            automatically to all subscribed participants. Because of this, the game has to use a progress
                            bar (progression MUST be auto) otherwise, the participants would have no clue when the next
                            question will show up. When OFF, the organizer is responsible for triggering the server to push
                            content.
                        </FormHelperText>
                    </FormGroup>
                </Box>

                <FormControl fullWidth>
                    <InputLabel id="select-game-clock-label">Game Clock</InputLabel>
                    <Select
                        labelId="select-game-clock-label"
                        name="game_clock"
                        value={form.game_clock}
                        label="Game Clock"
                        onChange={handleChange}
                    >
                        {clocks.map((game) => <MenuItem key={game.clock_id} value={game.clock_id}>{game.clock_title}</MenuItem>)}
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>

                <Box sx={{ my: 2 }}>
                    <Button variant="contained" fullWidth endIcon={<UpdateIcon />} onClick={applyEngine}>Update</Button>
                </Box>
            </div>
        </Box>
    );
}