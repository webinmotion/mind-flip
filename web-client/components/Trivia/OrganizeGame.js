import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Forward10Icon from '@mui/icons-material/Forward10';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { games } from '../../__mocks__/mock-games-listing';

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

export default function Organizer({ player, initializeGame, createGame }) {

  const [{ title, organizer }, setForm] = useState({ title: '', organizer: player?.email_address });

  const handleChange = e => setForm(form => ({ ...form, [e.target.id]: e.target.value }));

  const onCreateGame = () => {
    createGame(title, organizer);
    setForm({ title: '', organizer: '' });
  }

  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        Organizer
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
            <FilledInput
              id="title"
              value={title}
              onChange={handleChange}
              placeholder='game title'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="title for new game"
                    onClick={onCreateGame}
                    edge="end"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="title-helper-text"
              inputProps={{
                'aria-label': 'game title',
              }}
            />
            <FormHelperText id="title-helper-text">Create new Game</FormHelperText>
          </FormControl>
        </Grid>

        <List>
          {games.map(({ game_info }) => (
            <ListItem key={game_info.game_id} sx={{ py: 1, px: 0 }}>
              <ListItemButton
                selected={false}
                onClick={() => initializeGame(game_info.title, organizer)}
              >
                <ListItemIcon>
                  {selectIcon(game_info.game_status)}
                </ListItemIcon>
                <ListItemText primary={game_info.title} secondary={game_info.game_status} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Paper>
  )
}
// {/* <form className='form row'>
//         <div className='col-5'>
//           <input id='title' placeholder='Game title' value={title} onChange={onTrivia} />
//         </div>
//         <div className='col-5'>
//           <input id='organizer' type='email' placeholder='Organizer email' value={organizer} onChange={onTrivia} />
//         </div>
//         <div className='col-2'>
//           <a className='btn' href='#' onClick={onInitialize}>Retrieve</a>
//         </div>
//       </form> */}