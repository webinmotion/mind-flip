import {localState} from '../hooks/useLocalState';
import {
    ACCOUNT_SIGN_IN,
    ACCOUNT_SIGN_OUT,
    ACCOUNT_SIGN_UP,
    DROP_GUEST_PLAYER,
    REGISTER_GUEST,
    REGISTER_PLAYER,
    RESET_PASSWORD,
    RESET_VERIFICATION,
    VERIFY_EMAIL_ADDRESS,
    VERIFY_RECOVER_CODE,
} from './visitorActions';

export const initialRegistration = {
    screen_name: '',
    email_address: '',
    username: '',
    player_type: null,
    player_id: false,
    email_verified: false,
    reset_verified: false,
    reset_requested: false,
}

export const initialAuthentication = {
    authUser: {
        username: null,
        is_active: false,
        player_id: null,
        role: null
    },
    accessToken: null,
    message: '',
};

export const visitorReducer = (visitor, action) => {
    console.log('state type', typeof visitor, 'state value', visitor);
    switch (action.type) {
        case REGISTER_PLAYER: {
            //player details - {screen_name, email_address, verification_code, player_type, city, state, country}
            const { screen_name, email_address, player_type, player_id } = action.player;
            return { ...visitor, registration: { ...visitor.registration, screen_name, email_address, player_type, player_id, registered: true } };
        }
        case REGISTER_GUEST: {
            //player details - {screen_name, email_address, verification_code, player_type, city, state, country}
            const { screen_name, email_address, player_type, player_id } = action.guest;
            return { ...visitor, registration: { ...visitor.registration, screen_name, email_address, player_type, player_id, registered: false } };
        }
        case DROP_GUEST_PLAYER: {
            const { player_id } = action.guest;
            if (player_id === visitor.registration.player_id) {
                return { ...visitor, registration: initialRegistration }
            }
            return visitor;
        }
        case VERIFY_EMAIL_ADDRESS: {
            const { email_address, verified } = action.verification;
            if (visitor.registration.email_address === email_address) {
                return { ...visitor, registration: { ...visitor.registration, email_verified: verified } };
            }
            return visitor;
        }
        case ACCOUNT_SIGN_UP: {
            const { message, token } = action.account;
            return { ...visitor, registration: { ...visitor.registration, message, verification_token: token } };
        }
        case ACCOUNT_SIGN_IN: {
            const { message, authUser, accessToken } = action.account;
            localState.onSignIn({ authUser: authUser, accessToken }); //cache user info and the access token for axios interceptor to use
            return { ...visitor, authentication: { ...visitor.authentication, message, authUser, accessToken } };
        }
        case ACCOUNT_SIGN_OUT: {
            localState.onSignOut(); //clear the access token and user info from local cache
            return { ...visitor, authentication: { ...visitor.authentication, ...initialAuthentication } };
        }
        case RESET_VERIFICATION: {
            const { email_address } = action.verification;
            if (visitor.email_address === email_address) {
                return { ...visitor, authentication: { ...visitor.authentication, reset_verified: false } };
            }
            return visitor;
        }
        case RESET_PASSWORD: {
            const { username, account_id } = action.reset;
            if (visitor.username === username) {
                return { ...visitor, authentication: { ...visitor.authentication, account_id, reset_requested: true } }
            }
            return visitor;
        }
        case VERIFY_RECOVER_CODE: {
            //TODO - complete this
        }
        default: {
            return visitor;
        }
    }
}