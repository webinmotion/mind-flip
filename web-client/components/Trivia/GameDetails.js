import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function GameDetails({ game_info, organizer, playerType, setPlayerType }) {

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {game_info.game_status}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {game_info.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        created by {organizer.email_address}
                    </Typography>
                </CardContent>

                <CardActions>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Join As</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={playerType}
                            onChange={e => setPlayerType(e.target.value)}
                        >
                            <FormControlLabel value="guest" control={<Radio />} label="Guest" />
                            <FormControlLabel value="registered" control={<Radio />} label="Registered" />
                        </RadioGroup>
                    </FormControl>
                </CardActions>
            </Card>
        </Box>
    );
}