import React from 'react'
import GuestOptions from '../../../components/Registration/GuestOptions';
import { useAppContext } from '../../../context/appContext';

function GuestOptionsContainer() {

    const { showAlert, selectedGame, guestEmailForm, setGuestEmailForm, registerGuest, verificationForm, setVerificationForm, verifyEmailAddress, addGameParticipant } = useAppContext();

    return (
        <GuestOptions
            showAlert={showAlert}
            selectedGame={selectedGame}
            guestEmailForm={guestEmailForm}
            setGuestEmailForm={setGuestEmailForm}
            registerGuest={registerGuest}
            verificationForm={verificationForm}
            setVerificationForm={setVerificationForm}
            verifyEmailAddress={verifyEmailAddress}
            addGameParticipant={addGameParticipant} />
    )
}

export default GuestOptionsContainer