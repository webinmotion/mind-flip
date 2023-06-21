import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Forward10Icon from '@mui/icons-material/Forward10';
import IconButton from '@mui/material/IconButton';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function selectIcon(status) {
    switch (status) {
        case 'Accepting':
            return <AlarmOnIcon />
        case 'Created':
            return <FiberNewIcon />
        default:
            return <Forward10Icon />
    }
}

export default function GamesListing({games, gameStatus, selectedGame, setSelectedGame}) {

    const handleListItemClick = (event, index) => {
        setSelectedGame(index);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Available to join
            </Typography>
            <List>
                {gameStatus.map(status => (
                    <ListItem key={status}>
                        <List>
                            {games.filter(({ game_info }) => game_info.game_status === status).map(({ game_info }) => (
                                <ListItem key={game_info.game_id} sx={{ py: 1, px: 0 }} secondaryAction={
                                    <IconButton edge="end" aria-label="selected">
                                        {game_info.game_id === selectedGame ? <DoneOutlineIcon /> : null}
                                    </IconButton>
                                }>
                                    <ListItemButton
                                        selected={selectedGame === game_info.game_id}
                                        onClick={(event) => handleListItemClick(event, game_info.game_id)}
                                    >
                                        <ListItemIcon>
                                            {selectIcon(game_info.game_status)}
                                        </ListItemIcon>
                                        <ListItemText primary={game_info.title} secondary={game_info.game_status} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                )
                )}
            </List>
        </React.Fragment>
    );
}