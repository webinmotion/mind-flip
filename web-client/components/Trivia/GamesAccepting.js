import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function GamesAccepting({ game, trivia }) {

    const { participants } = trivia;
    //participant_id, player_id, screen_name, city, state, country 
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Accepting participants for <strong>{game.game_info.title}</strong>
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {participants && participants.map(p => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonPinIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={p.screen_name} secondary={`city: ${p.city || 'na'}, state: ${p.state || 'na'}`} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}