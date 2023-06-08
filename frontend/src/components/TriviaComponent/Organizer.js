import React, { useState } from 'react';

export default function Organizer({ initializeGame }) {

  const [{ title, organizer }, setForm] = useState({ title: 'friendly numbers', organizer: 'jimmy@email.com' });

  const onTrivia = e => setForm(form => ({ ...form, [e.target.id]: e.target.value }));

  const onInitialize = () => {
    initializeGame({ title, organizer });
    setForm({ title: '', organizer: '' });
  }

  return (
    <section>
      <form className='form row'>
        <div className='col-5'>
          <input id='title' placeholder='Game title' value={title} onChange={onTrivia} />
        </div>
        <div className='col-5'>
          <input id='organizer' type='email' placeholder='Organizer email' value={organizer} onChange={onTrivia} />
        </div>
        <div className='col-2'>
          <a className='btn' href='#' onClick={onInitialize}>Retrieve</a>
        </div>
      </form>
    </section>
  )
}
