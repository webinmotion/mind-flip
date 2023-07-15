import React from 'react';
import SignInPlayer from './SignInPlayer';
import SignUpPlayer from './SignUpPlayer';
import VerifyRegistered from './VerifyRegistered';
import RecoverPassword from './RecoverPassword';
import ConfirmRecovery from './ConfirmRecovery';
import ReadyToGo from '../ReadyToGo';

export default function NonGuestOptions({ userInfo, selectedGame, showAlert, signUpForm, signInForm, recoveryForm, verificationForm, setSignUpForm, setSignInForm,
    setRecoveryForm, setVerificationForm, registerPlayer, accountSignIn, recoverPassword, verifyEmailAddress, verifyRecoveryCode,
    addGameParticipant, isAuthenticated, currentView, toggleCurrentView, }) {

    if (!isAuthenticated()) {
        if (currentView?.recovering) {
            return <RecoverPassword recoveryForm={recoveryForm} setRecoveryForm={setRecoveryForm} setSignUpForm={setSignUpForm} toggleCurrentView={toggleCurrentView} recoverPassword={recoverPassword} />
        }
        if (currentView?.verifying) {
            return <VerifyRegistered recoveryForm={recoveryForm} verificationForm={verificationForm} setVerificationForm={setVerificationForm} verifyEmailAddress={verifyEmailAddress} />
        }
        if (currentView?.confirming) {
            return <ConfirmRecovery recoveryForm={recoveryForm} verificationForm={verificationForm} setConfirmationForm={setVerificationForm} verifyRecoveryCode={verifyRecoveryCode} />
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
        return <ReadyToGo playerEmail={userInfo} selectedGame={selectedGame} addGameParticipant={addGameParticipant} />
    }
}
