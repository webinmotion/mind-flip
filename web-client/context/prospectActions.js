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
    remoteFetchPlayerById,
} from '../services/account';
import { extractErrorText } from './alertActions';

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
export const VERIFY_RECOVER_CODE = "VERIFY_RECOVER_CODE";

export const registerPlayerAction = (dispatch) => ({ screen_name, email_address, username, password }, callback) => {
    remoteRegisterPlayer({ screen_name, email_address }).then(player => {
        //register a player - {screen_name, email_address, verification_code, player_type, city, state, country}
        dispatch({ type: REGISTER_PLAYER, player });
        accountSignUpAction(dispatch)({ username, password, email_address }, callback);
    }).catch(error => {
        if (callback) callback(extractErrorText(error));
    });
}

export const verifyEmailAddressAction = (dispatch) => ({ email_address, verification_code }, callback) => {
    remoteVerifyEmailAddr({ email_address, verification_code }).then(verification => {
        if (verification.verified) {
            dispatch({ type: VERIFY_EMAIL_ADDRESS, verification });
            if (callback) callback(null, verification);
        }
        else {
            if (callback) callback("Email verification using code submitted did not work");
        }
    }).catch(error => {
        if (callback) callback(extractErrorText(error))
    });
}

export const registerGuestAction = (dispatch) => (email_address, callback) => {
    remoteRegisterGuest(email_address).then(guest => {
        //register a guest - {screen_name, email_address, verification_code, player_type, city, state, country}
        dispatch({ type: REGISTER_GUEST, guest });
        if (callback) callback(null, guest);
    }).catch(error => {
        if (callback) callback(extractErrorText(error))
    });
}

export const dropGuestPlayerAction = (dispatch) => ({ screen_name, email_address, username, password }) => {
    remoteDropGuestPlayer({ screen_name, email_address, username, password }).then(guest => {
        dispatch({ type: DROP_GUEST_PLAYER, guest });
    });
}

export const accountSignUpAction = (dispatch) => ({ username, password, email_address }, callback) => {
    remoteAccountSignUp({ username, password, email_address }).then(account => {
        dispatch({ type: ACCOUNT_SIGN_UP, account });
        if (callback) callback(null, account);
    }).catch(error => {
        if (callback) callback(extractErrorText(error))
    });
}

export const accountSignInAction = (dispatch) => ({ username, password }, callback) => {
    remoteAccountSignIn({ username, password }).then(account => {
        dispatch({ type: ACCOUNT_SIGN_IN, account });
        if (callback) callback(null, account);
        fetchPlayerByIdAction(dispatch)(account.userInfo.player_id)
    }).catch(error => {
        if (callback) callback(extractErrorText(error));
    });
}

export const fetchPlayerByIdAction = (dispatch) => (player_id, callback) => {
    remoteFetchPlayerById(player_id).then(player => {
        dispatch({ type: REGISTER_PLAYER, player });
        if (callback) callback(null, player)
    }).catch(error => {
        if (callback) callback(extractErrorText(error));
    });
}

export const accountSignOutAction = (dispatch) => (username) => {
    remoteAccountSignOut(username).then(() => {
        dispatch({ type: ACCOUNT_SIGN_OUT })
    });
}

export const resetPasswordAction = (dispatch) => ({ username, password }) => {
    remoteResetPassword({ username, password }).then(reset => {
        dispatch({ type: RESET_PASSWORD, reset })
    });
}

export const resetVerifictionAction = (dispatch) => (email_address) => {
    remoteResetVerification(email_address).then(verification => {
        dispatch({ type: RESET_VERIFICATION, verification })
    });
}

export const recoverPasswordAction = (dispatch) => (email_address) => {
    //TODO: send email and handle action in the reducer as necessary
    console.log('send email and handle action in the reducer as necessary');
    dispatch({ type: RECOVER_PASSWORD, email_address })
}

export const verifyRecoveryCodeAction = (dispatch) => (({ email_address, confirmation_code }, callback) => {
    //TODO - complete this
});