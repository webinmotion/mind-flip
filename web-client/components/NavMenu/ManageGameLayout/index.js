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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function ManageGameLayout({ games, tickers, form, handleSelected, handleChange, handleChecked, handleDateTime, applyEngine, }) {

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
                            games.map(({ game_info }) => <MenuItem key={game_info?.game_id} value={game_info?.game_id}>{game_info?.title}</MenuItem>)
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
                        <FormControlLabel control={<Checkbox />}
                            name="can_navigate_back"
                            checked={form.can_navigate_back}
                            label="Can navigate back"
                            title='allow a participant to move back and forth in the questions'
                            onChange={handleChecked} />
                        <FormControlLabel control={<Checkbox />}
                            name="server_push_mode"
                            checked={form.server_push_mode}
                            label="Server push mode"
                            title='server sets the cadence of the game through a timer'
                            onChange={handleChecked} />
                    </FormGroup>
                </Box>

                <FormControl fullWidth>
                    <InputLabel id="select-game-ticker-label">Game Ticker</InputLabel>
                    <Select
                        labelId="select-game-ticker-label"
                        name="game_ticker"
                        value={form.game_ticker}
                        label="Game Ticker"
                        onChange={handleChange}
                    >
                        {tickers.map((game) => <MenuItem key={game.ticker_id} value={game.ticker_id}>{game.ticker_title}</MenuItem>)}
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>

                <Box sx={{ my: 2 }}>
                    <Button variant="contained" fullWidth endIcon={<UpdateIcon />} onClick={applyEngine}>Update</Button>
                </Box>
            </div>

            <Box>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}