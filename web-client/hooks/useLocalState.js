import {useRef} from 'react';

function useLocalState({trivia, account, alert}) {

    //initialize session storage with initial values (if no values currently exist)
    const storage = window.sessionStorage;
    if (!storage.getItem('trivia')) {
        storage.setItem('trivia', JSON.stringify(trivia));
    }
    if (!storage.getItem('account')) {
        storage.setItem('account', JSON.stringify(account));
    }
    if (!storage.getItem('alert')) {
        storage.setItem('alert', JSON.stringify(alert));
    }

    //attach listener to update session storage values (clean up when signing out)
    const doc = useRef(document);
    doc.current.onvisibilitychange = function () {
        if (doc.current.visibilityState === 'hidden') {
            storage.setItem('trivia', JSON.stringify(trivia));
            storage.setItem('account', JSON.stringify(account));
            storage.setItem('alert', JSON.stringify(alert));
        }
    };

    //return references to cached values
    return ({
        trivia: JSON.parse(storage.getItem('trivia')),
        account: JSON.parse(storage.getItem('account')),
        alert: JSON.parse(storage.getItem('alert')),
        cleanup: () => {
            storage.removeItem('trivia');
            storage.removeItem('account');
            storage.removeItem('alert');
        }
    })
}

export default useLocalState;