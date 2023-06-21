import React from 'react';
import JoinAsGuest from './JoinAsGuest';
import VerifyGuest from './VerifyGuest';
import SignUpPlayer from './SignUpPlayer';
import SignInPlayer from './SignInPlayer';
import VerifyRegistered from './VerifyRegistered';
import RecoverPassword from './RecoverPassword';

function guestOptions({ selectedGame, playerAttributes, setPlayerAttributes }) {
  return !playerAttributes?.emailAddress ?
    <JoinAsGuest setPlayer={setPlayerAttributes} /> : <VerifyGuest setPlayer={setPlayerAttributes} />
}

function registerOptions({ selectedGame, playerAttributes, setPlayerAttributes }) {
  if (playerAttributes?.recoverPassword) {
    return <RecoverPassword setPlayer={setPlayerAttributes} />
  }
  if (playerAttributes?.accountExists) {
    return <SignInPlayer setPlayer={setPlayerAttributes} />
  }
  if (playerAttributes?.emailAddress) {
    return <VerifyRegistered setPlayer={setPlayerAttributes} />
  }
  return <SignUpPlayer setPlayer={setPlayerAttributes} />
}

export default function RegisterOptions({ selectedGame, playerType, playerAttributes, setPlayerAttributes }) {

  const options = { selectedGame, playerAttributes, setPlayerAttributes };
  
  return (
    <React.Fragment>
      {playerType === 'guest' ?
        guestOptions(options) :
        registerOptions(options)}
    </React.Fragment>
  )
}
