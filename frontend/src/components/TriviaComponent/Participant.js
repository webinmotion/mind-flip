import React, { useState } from 'react';

export default function Participant({ joinByEmail }) {

  const [email, setEmail] = useState('jimmy@email.com');

  const onJoinGame = () => {
    if (email) {
      joinByEmail(email);
    }
  }

  return (
    <section>
      <form className='form row'>
        <div className='col-5'>
          <input id='email_address' type='email' placeholder='email Email' value={email} onChange={setEmail} />
        </div>
        <div className='col-2'>
          <a className='btn' href='#' onClick={onJoinGame}>Join</a>
        </div>
      </form>
    </section>
  )
}
