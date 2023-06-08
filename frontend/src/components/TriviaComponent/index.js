import React, { useState } from 'react';
import Participant from './Participant';
import Organizer from './Organizer';
import Listener from './Listener';
import './Trivia.module.css';

export default function Trivia({ trivia, initializeGame, joinByEmail }) {

  const [intent, setIntent] = useState('organizer');

  const onIntent = e => {
    const { checked, value } = e.target;
    setIntent(checked ? value : '');
  }

  return (
    <section>
      <form className='form row'>
        <div className='col-5'>
          <label htmlFor='participant'>I want to play</label>
          <input id='participant' name='intent' type='radio' value={'participant'} onChange={onIntent} />
        </div>
        <div className='col-5'>
          <label htmlFor='organizer'>I want to plan</label>
          <input id='organizer' name='intent' type='radio' value={'organizer'} onChange={onIntent} />
        </div>
      </form>

      {intent === 'participant' && (
        <>
          <Participant joinByEmail={joinByEmail} />
          {trivia?.participant && <Listener participant={trivia?.participant} />}
        </>
      )}
      {intent === 'organizer' && (
        <Organizer initializeGame={initializeGame} />
      )}
    </section>
  )
}
