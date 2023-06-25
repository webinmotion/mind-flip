import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const Severity = {
    ERROR: { name: "error", title: "Error" },
    WARNING: { name: "warning", title: "Warning" },
    INFO: { name: "info", title: "Info" },
    SUCCESS: { name: "success", title: "Success" },
};

function inferTitle(severity) {
    return Object.keys(Severity).find(key => key.name === severity) || "Alert";
}

function handleAutoClose(closeDelay = 3000, handleClose) {
    let handle = setTimeout(function () {
        handleClose();
        clearTimeout(handle);
    }, closeDelay || 3000)
}

export default function AlertMessage({ show, clearAlert, severity, title, message, autoClose, closeDelay, onClose }) {

    function handleClose() {
        onClose();
        clearAlert(false);
    }

    if (autoClose) {
        handleAutoClose(closeDelay, handleClose);
    }

    return show ? (
        <Alert onClose={!autoClose ? () => handleClose() : () => { }} variant="outlined" severity={severity}>
            <AlertTitle>{title || inferTitle(severity)}</AlertTitle>
            {message}
        </Alert>) : null
}