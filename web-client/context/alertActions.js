export const SHOW_ALERT_MESSAGE = "SHOW_ALERT_MESSAGE";
export const CLEAR_ALERT_MESSAGE = "CLEAR_ALERT_MESSAGE";

function defaultCloseOptions(autoClose = false, closeDelay, onClose) {
    return ({
        autoClose,
        closeDelay: (autoClose) ? 0 : closeDelay || 3000,
        onClose: onClose || function () { },
    })
}

export const extractErrorText = error => {
    return error.request?.responseText
        .replaceAll(/<.*?>/g, '')
        .replaceAll(/&.*?;/g, '')
        .replaceAll('Error\n', '')
        .replaceAll('\n', '')
        .replaceAll('  ', ' ') || error.message
}

export const showAlertAction = dispatch => ({ message, severity, autoClose, closeDelay, onClose }) => {
    dispatch({
        type: SHOW_ALERT_MESSAGE, alert: {
            show: true,
            message,
            severity,
            ...defaultCloseOptions(autoClose, closeDelay, onClose),
        }
    });
};

export const clearAlertAction = dispatch => () => {
    dispatch({
        type: CLEAR_ALERT_MESSAGE, alert: {
            show: false,
            message: '',
            severity: 'info',
            ...defaultCloseOptions(),
        }
    });
};
