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
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useRef} from "react";

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

export default function GamesListing({games, gameStatus, selectedGame, setSelectedGame, useQuickCode, setUseQuickCode, navigateTo}) {

    const quickCodeRef = useRef(null);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Available to join
            </Typography>

            <Box component="form"
                 sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' },}}
                 noValidate>
                <div>
                    <label htmlFor={"use-quick-vote"} style={{display: "inline-block", marginTop: "15px"}}>
                        <Checkbox id={'use-quick-vote'} checked={useQuickCode} onChange={e => { setUseQuickCode(e.target.checked); setSelectedGame(''); }}  />
                        Use a quick vote code
                    </label>
                    {useQuickCode ?
                        <>
                            <TextField id="quick-vote-code" label="Quick Code Vote" variant="outlined" inputRef={quickCodeRef}  />
                            <Button variant="outlined" sx={{mb: 1}} onClick={() => {
                                navigateTo(encodeURIComponent(btoa(`organizer=false&${quickCodeRef.current.value}`)))
                            }}>Let's go!</Button>
                        </>
                        : null
                    }
                </div>
            </Box>
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
                                        onClick={() => {setSelectedGame(game_info.game_id); setUseQuickCode(false); }}
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