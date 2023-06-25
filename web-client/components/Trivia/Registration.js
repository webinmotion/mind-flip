import React, { useEffect } from 'react';
import JoinAsGuest from './JoinAsGuest';
import VerifyGuest from './VerifyGuest';
import SignUpPlayer from './SignUpPlayer';
import SignInPlayer from './SignInPlayer';
import VerifyRegistered from './VerifyRegistered';
import RecoverPassword from './RecoverPassword';
import ReadyToGo from './ReadyToGo';

function guestOptions({ guestEmailForm, setGuestEmailForm, verificationForm, setVerificationForm, registerGuest, verifyEmailAddress }) {
  if (!guestEmailForm?.email_address.value) {
    return <JoinAsGuest guestEmailForm={guestEmailForm} setGuestEmailForm={setGuestEmailForm} registerGuest={registerGuest} />;
  }
  if (!guestEmailForm?.verified) {
    return <VerifyGuest guestEmailForm={guestEmailForm} setGuestEmailForm={setGuestEmailForm} verificationForm={verificationForm} setVerificationForm={setVerificationForm} verifyEmailAddress={verifyEmailAddress} />
  }
  return <ReadyToGo />
}

function registerOptions({ globals, setAuth, signUpForm, signInForm, recoveryForm, verificationForm, setSignUpForm, setSignInForm, setRecoveryForm, setVerificationForm, registerPlayer, accountSignIn, recoverPassword, verifyEmailAddress }) {
  if (!globals.auth && recoveryForm?.recovering) {
    return <RecoverPassword recoveryForm={recoveryForm} setRecoveryForm={setRecoveryForm} setSignUpForm={setSignUpForm} setSignInForm={setSignInForm} setVerificationForm={setVerificationForm} recoverPassword={recoverPassword} />
  }
  if (!globals.auth && verificationForm?.verifying) {
    return <VerifyRegistered recoveryForm={recoveryForm} verificationForm={verificationForm} setVerificationForm={setVerificationForm} verifyEmailAddress={verifyEmailAddress} />
  }
  if (!globals.auth && signInForm?.account_exists && !signUpForm?.registering) {
    return <SignInPlayer setAuth={setAuth} signInForm={signInForm} setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} setRecoveryForm={setRecoveryForm} accountSignIn={accountSignIn} />
  }
  if (!globals.auth && signUpForm?.registering && !signInForm?.account_exists) {
    return <SignUpPlayer signUpForm={signUpForm} setSignUpForm={setSignUpForm} setSignInForm={setSignInForm} registerPlayer={registerPlayer} />
  }
  return <ReadyToGo />
}

export default function Registration({
  globals, setAuth, playerType, guestEmailForm, signUpForm, signInForm, verificationForm, recoveryForm,
  setGuestEmailForm, setSignUpForm, setSignInForm, setVerificationForm,
  setRecoveryForm, registerPlayer, registerGuest, accountSignIn, recoverPassword, verifyEmailAddress }) {

  useEffect(() => {
    if (globals.require_auth) {
      setSignInForm(form => ({
        ...form,
        account_exists: true,
      }))

      setSignUpForm(form => ({
        ...form,
        registering: false,
      }));
    }
  }, [globals.require_auth]);

  return (
    <React.Fragment>
      {playerType === 'guest' ?
        guestOptions({ guestEmailForm, setGuestEmailForm, verificationForm, setVerificationForm, registerGuest, verifyEmailAddress }) :
        registerOptions({
          globals, setAuth, signUpForm, signInForm, recoveryForm, verificationForm, setSignUpForm, setSignInForm,
          setRecoveryForm, setVerificationForm, registerPlayer, accountSignIn, recoverPassword, verifyEmailAddress
        })
      }
    </React.Fragment>
  )
}
