import {
    remoteRegisterPlayer,
    remoteVerifyEmailAddr,
    remoteRegisterGuest,
    remoteDropGuestPlayer,
    remoteAccountSignUp,
    remoteAccountSignIn,
    remoteAccountSignOut,
    remoteResetPassword,
    remoteResetVerification,
} from '../services/account';
import { SHOW_ALERT_MESSAGE, extractErrorText } from './alertActions';

export const REGISTER_PLAYER = "REGISTER_PLAYER";
export const REGISTER_GUEST = "REGISTER_GUEST";
export const VERIFY_EMAIL_ADDRESS = "VERIFY_EMAIL_ADDRESS";
export const DROP_GUEST_PLAYER = "DROP_GUEST_PLAYER";
export const ACCOUNT_SIGN_UP = "ACCOUNT_SIGN_UP";
export const ACCOUNT_SIGN_IN = "ACCOUNT_SIGN_IN";
export const ACCOUNT_SIGN_IN_ERROR = "ACCOUNT_SIGN_IN_ERROR";
export const ACCOUNT_SIGN_OUT = "ACCOUNT_SIGN_OUT";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_VERIFICATION = "RESET_VERIFICATION";
export const RECOVER_PASSWORD = "RECOVER_PASSWORD";

export const registerPlayerAction = (dispatch, alertDispatch) => ({ screen_name, email_address, username, password }, callback) => {
    remoteRegisterPlayer({ screen_name, email_address }).then(player => {
        dispatch({ type: REGISTER_PLAYER, player });

        //register an account
        accountSignUpAction(dispatch, alertDispatch)({ username, password, email_address }, callback);
    }).catch(error => {
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: extractErrorText(error),
                autoClose: true,
                severity: 'error',
                show: true,
            }
        });
    });
}

export const verifyEmailAddressAction = dispatch => ({ email_address, verification_code }, callback = () => {}) => {
    remoteVerifyEmailAddr({ email_address, verification_code }).then(verification => {
        dispatch({ type: VERIFY_EMAIL_ADDRESS, verification });
        callback();
    });
}

export const registerGuestAction = (dispatch, alertDispatch) => (email_address) => {
    remoteRegisterGuest(email_address).then(guest => {

        //register a guest
        dispatch({ type: REGISTER_GUEST, guest });

        //notify success
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: "Congratulations. You have been registered successfully",
                autoClose: true,
                severity: 'success',
                show: true,
            }
        });
    }).catch(error => {
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: extractErrorText(error),
                autoClose: true,
                severity: 'error',
                show: true,
            }
        })
    });
}

export const dropGuestPlayerAction = dispatch => ({ screen_name, email_address, username, password }) => {
    remoteDropGuestPlayer({ screen_name, email_address, username, password }).then(guest => {
        dispatch({ type: DROP_GUEST_PLAYER, guest });
    });
}

export const accountSignUpAction = (dispatch, alertDispatch) => ({ username, password, email_address }, callback) => {
    remoteAccountSignUp({ username, password, email_address }).then(account => {
        dispatch({ type: ACCOUNT_SIGN_UP, account });

        //notify success
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: "Congratulations. You have been registered successfully",
                autoClose: true,
                severity: 'success',
                show: true,
            }
        });

        callback();
    }).catch(error => {
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: extractErrorText(error),
                autoClose: true,
                severity: 'error',
                show: true,
            }
        })
    });
}

export const accountSignInAction = (dispatch, alertDispatch) => ({ username, password }, callback) => {
    remoteAccountSignIn({ username, password }).then(account => {
        dispatch({ type: ACCOUNT_SIGN_IN, account });

        //notify success
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: "Congratulations. You have been signed in successfully",
                autoClose: true,
                severity: 'success',
                show: true,
            }
        });

        callback();
    }).catch(error => {
        alertDispatch({
            type: SHOW_ALERT_MESSAGE, alert: {
                message: extractErrorText(error),
                autoClose: true,
                severity: 'error',
                show: true,
            }
        });
    });
}

export const accountSignOutAction = dispatch => (username) => {
    remoteAccountSignOut(username).then(() => {
        dispatch({ type: ACCOUNT_SIGN_OUT })
    });
}

export const resetPasswordAction = dispatch => ({ username, password }) => {
    remoteResetPassword({ username, password }).then(reset => {
        dispatch({ type: RESET_PASSWORD, reset })
    });
}

export const resetVerifictionAction = dispatch => (email_address) => {
    remoteResetVerification(email_address).then(verification => {
        dispatch({ type: RESET_VERIFICATION, verification })
    });
}

export const recoverPasswordAction = dispatch => (email_address) => {
    //TODO: send email and handle action in the reducer as necessary
    console.log('send email and handle action in the reducer as necessary');
    dispatch({ type: RECOVER_PASSWORD, email_address })
}