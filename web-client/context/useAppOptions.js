import { useState } from "react";

export const initialAuth = {
    userInfo: {
        username: null,
        is_active: false,
        player_id: null,
        role: null
    },
    accessToken: null,
    refreshToken: null
};

export const isAuthenticated = (entity) => {
    return entity?.auth?.accessToken;
}

export default () => {

    const [globals, setGlobals] = useState({
        auth: initialAuth,
        route: '',
    });

    const [playerTypeForm, setPlayerTypeForm] = useState({
        value: 'registered', error: false, message: '',
    });

    const [guestEmailForm, setGuestEmailForm] = useState({
        verified: false,
        email_address: { value: '', error: false, message: '' },
    });

    const [signUpForm, setSignUpForm] = useState({
        email_address: { value: '', error: false, message: '' },
        screen_name: { value: '', error: false, message: '' },
        username: { value: '', error: false, message: '' },
        password: { value: '', error: false, message: '' },
        registering: true,
    });

    const [signInForm, setSignInForm] = useState({
        username: { value: '', error: false, message: '' },
        password: { value: '', error: false, message: '' },
        remember_me: false,
        account_exists: false,
        require_auth: false,
    });

    const [verificationForm, setVerificationForm] = useState({
        verifying: false,
        code: { value: false, error: false, message: '' },
    });

    const [recoveryForm, setRecoveryForm] = useState({
        recovering: false,
        email_address: { value: false, error: false, message: '' },
    });

    const [selectedGame, setSelectedGame] = useState(null);

    function setAuth(auth) {
        setGlobals(options => ({ ...options, auth, route: '' }))
    }

    function setRoute(route) {
        setGlobals(options => ({ ...options, route }))
    }

    return ({
        globals, playerTypeForm, guestEmailForm, signUpForm, signInForm, verificationForm, recoveryForm, selectedGame,
        setAuth, setRoute, setPlayerTypeForm, setGuestEmailForm, setSignUpForm, setSignInForm, setVerificationForm,
        setRecoveryForm, setSelectedGame,
    });
}