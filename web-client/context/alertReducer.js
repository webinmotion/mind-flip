import {
    SHOW_ALERT_MESSAGE,
    CLEAR_ALERT_MESSAGE,
    SHOW_PROGRESS_BAR,
    CLEAR_PROGRESS_BAR,
}
    from './alertActions';

export const initialAlert = {
    show: false,
    severity: 'info',
    title: '',
    message: '',
    autoClose: false,
    closeDelay: 3000,
    onClose: () => { }
};

export const initialProgress = {
    show: false,
    pre_delay: 0,
    post_delay: 0,
    interval: 0,
    duration: 0,
    points: 0,
    number: 'label',
    count: 0,
    oncountdown: null,
    precountdown: null,
    postcountdown: null,
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

export const progressReducer = (progress, action) => {
    console.log('state type', typeof progress, 'state value', progress);
    switch (action.type) {
        case SHOW_PROGRESS_BAR:
        case CLEAR_PROGRESS_BAR: {
            return ({ ...progress, ...action.progress });
        }
        default: {
            return progress;
        }
    }
}