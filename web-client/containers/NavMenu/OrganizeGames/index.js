import React, {useState} from 'react';
import OrganizeGames from '../../../components/NavMenu/OrganizeGames';

function OrganizeGamesContainer({ games, player, createGame, updateGame, deleteGame, }) {

    const [{ title, organizer }, setForm] = useState({ title: '', organizer: player?.email_address });

  const handleChange = e => setForm(form => ({ ...form, [e.target.id]: e.target.value }));

  const onCreateGame = () => {
    if (title && organizer) {
      createGame({ title, organizer });
      setForm({ title: '', organizer: '' });
    }
  }

  return (
    <OrganizeGames games={games} form={{title, organizer}} handleChange={handleChange} onCreateGame={onCreateGame} updateGame={updateGame} deleteGame={deleteGame} />
  )
}

export default OrganizeGamesContainer