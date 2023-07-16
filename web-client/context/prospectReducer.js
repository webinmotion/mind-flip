import { localState } from '../hooks/useLocalState';
import {
    REGISTER_PLAYER,
    REGISTER_GUEST,
    DROP_GUEST_PLAYER,
    VERIFY_EMAIL_ADDRESS,
    ACCOUNT_SIGN_UP,
    ACCOUNT_SIGN_IN,
    ACCOUNT_SIGN_OUT,
    RESET_VERIFICATION,
    RESET_PASSWORD,
    VERIFY_RECOVER_CODE,
}
    from './prospectActions';

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
};

export const prospectReducer = (prospect, action) => {
    console.log('state type', typeof prospect, 'state value', prospect);
    switch (action.type) {
        case REGISTER_PLAYER: {
            //player details - {screen_name, email_address, verification_code, player_type, city, state, country}
            const { screen_name, email_address, player_type, player_id } = action.player;
            return { ...prospect, registration: { ...prospect.registration, screen_name, email_address, player_type, player_id, registered: true } };
        }
        case REGISTER_GUEST: {
            //player details - {screen_name, email_address, verification_code, player_type, city, state, country}
            const { screen_name, email_address, player_type, player_id } = action.guest;
            return { ...prospect, registration: { ...prospect.registration, screen_name, email_address, player_type, player_id, registered: false } };
        }
        case DROP_GUEST_PLAYER: {
            const { player_id } = action.guest;
            if (player_id === prospect.registration.player_id) {
                return { ...prospect, registration: initialRegistration }
            }
            return prospect;
        }
        case VERIFY_EMAIL_ADDRESS: {
            const { email_address, verified } = action.verification;
            if (prospect.registration.email_address === email_address) {
                return { ...prospect, registration: { ...prospect.registration, email_verified: verified } };
            }
            return prospect;
        }
        case ACCOUNT_SIGN_UP: {
            const { message, token } = action.account;
            return { ...prospect, registration: { ...prospect.registration, message, verification_token: token } };
        }
        case ACCOUNT_SIGN_IN: {
            const { message, authUser, accessToken } = action.account;
            localState.onSignIn({ authUser: authUser, accessToken }); //cache user info and the access token for axios interceptor to use
            return { ...prospect, authentication: { ...prospect.authentication, message, authUser, accessToken } };
        }
        case ACCOUNT_SIGN_OUT: {
            localState.onSignOut(); //clear the access token and user info from local cache
            return { ...prospect, authentication: { ...prospect.authentication, message: '', authUser: null } };
        }
        case RESET_VERIFICATION: {
            const { email_address } = action.verification;
            if (prospect.email_address === email_address) {
                return { ...prospect, authentication: { ...prospect.authentication, reset_verified: false } };
            }
            return prospect;
        }
        case RESET_PASSWORD: {
            const { username, account_id } = action.reset;
            if (prospect.username === username) {
                return { ...prospect, authentication: { ...prospect.authentication, account_id, reset_requested: true } }
            }
            return prospect;
        }
        case VERIFY_RECOVER_CODE: {
            //TODO - complete this
        }
        default: {
            return prospect;
        }
    }
}