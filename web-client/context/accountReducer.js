import {
    REGISTER_PLAYER,
    REGISTER_GUEST,
    DROP_GUEST_PLAYER,
    VERIFY_EMAIL_ADDRESS,
    ACCOUNT_SIGN_UP,
    ACCOUNT_SIGN_IN,
    ACCOUNT_SIGN_OUT,
    RESET_VERIFICATION,
    RESET_PASSWORD
}
    from './accountActions';

export const initialAccount = {
    signed_in: false,
    screen_name: '',
    email_address: '',
    username: '',
    resetting: false,
    recovering: false,
    verifying: false,
    registered: false,
    completed: false,
}

export const accountReducer = (account, action) => {
    console.log('state type', typeof account, 'state value', account);
    switch (action.type) {
        case REGISTER_PLAYER: {
            const { screen_name, email_address, player_type, player_id } = action.player;
            return { ...account, screen_name, email_address, player_type, player_id, registered: true };
        }
        case REGISTER_GUEST: {
            const { screen_name, email_address, player_type, player_id } = action.guest;
            return { ...account, screen_name, email_address, player_type, player_id, registered: true };
        }
        case DROP_GUEST_PLAYER: {
            const { player_id } = action.guest;
            if (player_id === account.player_id) {
                return { ...account, initialAccount }
            }
            return account;
        }
        case VERIFY_EMAIL_ADDRESS: {
            const { email_address, verified } = action.verification;
            if (account.email_address === email_address) {
                return { ...account, completed: verified };
            }
            return account;
        }
        case ACCOUNT_SIGN_UP: {
            const { message, token } = action.account;
            return { ...account, message, token };
        }
        case ACCOUNT_SIGN_IN: {
            const { message, user } = action.account;
            return { ...account, message, signed_in: user };
        }
        case ACCOUNT_SIGN_OUT: {
            return { ...account, message: '', signed_in: false };
        }
        case RESET_VERIFICATION: {
            const { email_address } = action.verification;
            if (account.email_address === email_address) {
                return { ...account, verified: false };
            }
            return account;
        }
        case RESET_PASSWORD: {
            const { username, account_id } = action.reset;
            if (account.username === username) {
                return { ...account, account_id, reset: true }
            }
            return account;
        }
        default: {
            return account;
        }
    }
}