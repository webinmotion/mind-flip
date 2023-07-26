import React from 'react';
import GuestOptions from '../../containers/Registration/GuestOptions';
import NonGuestOptions from '../../containers/Registration/NonGuestOptions';

export default function Registration({ playerType, }) {

  return (
    playerType === 'guest' ? (<GuestOptions />) : (<NonGuestOptions />)
  )
}
