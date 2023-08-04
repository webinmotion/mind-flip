import {CLEAR_ALERT_MESSAGE, SHOW_ALERT_MESSAGE,} from './alertActions';

export const initialAlert = {
    show: false,
    severity: 'info',
    title: '',
    message: '',
    autoClose: false,
    closeDelay: 3000,
    onClose: () => { }
};

export const alertReducer = (alert, action) => {
    console.log('state type', typeof alert, 'state value', alert);
    switch (action.type) {
        case SHOW_ALERT_MESSAGE:
        case CLEAR_ALERT_MESSAGE: {
            return ({ ...alert, ...action.alert });
        }
        default: {
            return alert;
        }
    }
}
