import React, { useEffect } from 'react';
import NonGuestOptions from '../../../components/Registration/NonGuestOptions';
import { useAppContext } from '../../../context/appContext';
import { ViewNames } from '../../../hooks/usePageForms';

function NonGuestOptionsContainer() {

  const { userInfo, selectedGame, showAlert, signUpForm, signInForm, recoveryForm, verificationForm, setSignUpForm, setSignInForm,
    setRecoveryForm, setVerificationForm, registerPlayer, accountSignIn, recoverPassword, verifyEmailAddress, verifyRecoveryCode,
    addGameParticipant, isAuthenticated, currentView, toggleCurrentView, } = useAppContext();

  useEffect(() => {
    toggleCurrentView(ViewNames.SIGNIN_VIEW);
  }, []);

  return <NonGuestOptions
    userInfo={userInfo}
    showAlert={showAlert}
    signUpForm={signUpForm}
    signInForm={signInForm}
    recoveryForm={recoveryForm}
    verificationForm={verificationForm}
    setSignUpForm={setSignUpForm}
    setSignInForm={setSignInForm}
    setRecoveryForm={setRecoveryForm}
    setVerificationForm={setVerificationForm}
    registerPlayer={registerPlayer}
    accountSignIn={accountSignIn}
    recoverPassword={recoverPassword}
    verifyEmailAddress={verifyEmailAddress}
    verifyRecoveryCode={verifyRecoveryCode}
    selectedGame={selectedGame}
    addGameParticipant={addGameParticipant}
    isAuthenticated={isAuthenticated}
    currentView={currentView}
    toggleCurrentView={toggleCurrentView}
  />
}

export default NonGuestOptionsContainer