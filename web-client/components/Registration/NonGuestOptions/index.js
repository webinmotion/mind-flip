import React from 'react';
import SignInPlayer from './SignInPlayer';
import SignUpPlayer from './SignUpPlayer';
import VerifyRegistered from './VerifyRegistered';
import RecoverPassword from './RecoverPassword';
import ConfirmRecovery from './ConfirmRecovery';
import ReadyToGo from '../ReadyToGo';

export default function NonGuestOptions({ playerEmail, selectedGame, showAlert, signUpForm, signInForm, recoveryForm, verificationForm, setSignUpForm, setSignInForm,
    setRecoveryForm, setVerificationForm, registerPlayer, accountSignIn, recoverPassword, verifyEmailAddress, verifyRecoveryCode,
    addGameParticipant, isAuthenticated, currentView, toggleCurrentView, }) {

    if (!isAuthenticated()) {
        if (currentView?.recovering) {
            return <RecoverPassword showAlert={showAlert} recoveryForm={recoveryForm} setRecoveryForm={setRecoveryForm} setSignUpForm={setSignUpForm} toggleCurrentView={toggleCurrentView} recoverPassword={recoverPassword} />
        }
        if (currentView?.verifying) {
            return <VerifyRegistered recoveryForm={recoveryForm} verificationForm={verificationForm} setVerificationForm={setVerificationForm} verifyEmailAddress={verifyEmailAddress} />
        }
        if (currentView?.confirming) {
            return <ConfirmRecovery recoveryForm={recoveryForm} setRecoveryForm={setRecoveryForm} verificationForm={verificationForm} setVerificationForm={setVerificationForm} verifyRecoveryCode={verifyRecoveryCode} />
        }
        if (currentView?.authenticating) {
            return <SignInPlayer showAlert={showAlert} signInForm={signInForm} setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} accountSignIn={accountSignIn} toggleCurrentView={toggleCurrentView} />
        }
        if (currentView?.registering) {
            return <SignUpPlayer showAlert={showAlert} signUpForm={signUpForm} setSignUpForm={setSignUpForm} setSignInForm={setSignInForm} registerPlayer={registerPlayer} toggleCurrentView={toggleCurrentView} />
        }
        return null;
    }
    else {
        return <ReadyToGo playerEmail={playerEmail} selectedGame={selectedGame} addGameParticipant={addGameParticipant} />
    }
}
