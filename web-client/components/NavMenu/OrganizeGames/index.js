import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Forward10Icon from '@mui/icons-material/Forward10';
import InventoryIcon from '@mui/icons-material/Inventory';
import { orange, green, red } from '@mui/material/colors';

export const GameStatus = {
  CREATED: "Created",
  ACCEPTING: "Accepting",
  PLAYING: "Playing",
  ARCHIVED: "Archived",
}

export function selectIcon(status) {
  switch (status) {
    case GameStatus.CREATED:
      return <FiberNewIcon />
    case GameStatus.ACCEPTING:
      return <AlarmOnIcon />
    case GameStatus.PLAYING:
      return <Forward10Icon />
    default:
      return <InventoryIcon />
  }
}

export function iconBgColor(status) {
  switch (status) {
    case GameStatus.CREATED:
      return green[500]
    case GameStatus.ACCEPTING:
      return orange[500]
    case GameStatus.PLAYING:
      return red[500]
    default:
      return null
  }
}

export function nextStatus(status) {
  const keys = Object.keys(GameStatus);
  const idx = keys.indexOf(status.toUpperCase());
  return (idx > -1 && idx < 2) ? GameStatus[keys[idx + 1]] : null;
}

export function nextStatusIcon(status) {
  const next = nextStatus(status);
  if (next) {
    return selectIcon(next);
  }
  return null;
}

export default function OrganizeGames({ games, form, handleChange, onCreateGame, updateGame, deleteGame, }) {

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
              value={form.title}
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

        <List sx={{ width: '100%', ml: 2 }}>
          {games.map(({ game_info }) => (
            <ListItem key={game_info.game_id} secondaryAction={
              <>
                {nextStatus(game_info.game_status) ?
                  <IconButton edge="end" aria-label="delete" onClick={() => updateGame(game_info.game_id, nextStatus(game_info.game_status))}>
                    {nextStatusIcon(game_info.game_status)}
                  </IconButton> : null
                }
                <IconButton edge="end" aria-label="delete" onClick={() => deleteGame(game_info.game_id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: iconBgColor(game_info.game_status) }}>
                  {selectIcon(game_info.game_status)}
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={game_info.title} secondary={game_info.game_status} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Paper>
  )
}
