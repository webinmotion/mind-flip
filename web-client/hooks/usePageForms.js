import {useState} from "react";

export const ViewNames = {
    RECOVERY_VIEW: "recovering",
    VERIFYING_VIEW: "verifying",
    CONFIRMING_VIEW: "confirming",
    SIGNIN_VIEW: "authenticating",
    SIGNUP_VIEW: "registering"
};

export function usePageForms() {

    const initialViews = Object.values(ViewNames).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
    }, {});

    const [currentRoute, setCurrentRoute] = useState('');

    const [currentView, setCurrentView] = useState(initialViews);

    const toggleCurrentView = (view = '') => {
        setCurrentView(Object.keys(currentView).reduce((acc, curr) => {
            acc[curr] = (view === curr);
            return acc;
        }, {}));
    }

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
        account_exists: false,
    });

    const [signInForm, setSignInForm] = useState({
        username: { value: '', error: false, message: '' },
        password: { value: '', error: false, message: '' },
        remember_me: false,
    });

    const [verificationForm, setVerificationForm] = useState({
        code: { value: false, error: false, message: '' },
    });

    const [recoveryForm, setRecoveryForm] = useState({
        confirmed: false,
        email_address: { value: false, error: false, message: '' },
    });

    const [selectedGame, setSelectedGame] = useState(null);

    return ({
        currentRoute, currentView, playerTypeForm, guestEmailForm, signUpForm, signInForm, verificationForm, recoveryForm, selectedGame,
        setCurrentRoute, toggleCurrentView, setPlayerTypeForm, setGuestEmailForm, setSignUpForm, setSignInForm, setVerificationForm,
        setRecoveryForm, setSelectedGame,
    });
}