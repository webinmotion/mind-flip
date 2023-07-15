import React from 'react';
import JoinAsGuest from './JoinAsGuest';
import VerifyGuest from './VerifyGuest';
import ReadyToGo from '../ReadyToGo';

export default function GuestOptions({
    showAlert,
    selectedGame,
    guestEmailForm,
    setGuestEmailForm,
    registerGuest,
    verificationForm,
    setVerificationForm,
    verifyEmailAddress,
    addGameParticipant
}) {


    if (!guestEmailForm?.email_address.value) {
        return <JoinAsGuest showAlert={showAlert} guestEmailForm={guestEmailForm} setGuestEmailForm={setGuestEmailForm} registerGuest={registerGuest} />;
    }
    if (!guestEmailForm?.verified) {
        return <VerifyGuest showAlert={showAlert} guestEmailForm={guestEmailForm} setGuestEmailForm={setGuestEmailForm} verificationForm={verificationForm} setVerificationForm={setVerificationForm} verifyEmailAddress={verifyEmailAddress} />
    }
    return <ReadyToGo playerEmail={guestEmailForm?.email_address.value} selectedGame={selectedGame} addGameParticipant={addGameParticipant} />
}
