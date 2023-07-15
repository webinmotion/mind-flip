import { useRef } from 'react';

const REGISTRATION_KEY = 'registration';
const AUTHENTICATION_KEY = 'authentication';
const PARTICIPANT_KEY = 'participant';
const PLAYER_KEY = 'player';

class LocalState {

    constructor(storage) {
        this._storage = storage;
    }

    save(key, data) {
        if (typeof data === 'object') {
            this._storage.setItem(key, JSON.stringify(data));
        }
    }

    find(key) {
        let data = this._storage.getItem(key);
        if (data && typeof data === 'string') {
            return JSON.parse(data);
        }
        return ({});
    }

    clear() {
        for (let key of [REGISTRATION_KEY, AUTHENTICATION_KEY, PARTICIPANT_KEY, PLAYER_KEY]) {
            this._storage.removeItem(key);
        }
    }

    set authentication(json) {
        if (json) {
            this.save(AUTHENTICATION_KEY, json);
        }
    }

    get authentication() {
        return this.find(AUTHENTICATION_KEY);
    }

    set registration(json) {
        if (json) {
            this.save(REGISTRATION_KEY, json);
        }
    }

    get registration() {
        return this.find(REGISTRATION_KEY);
    }

    set participant(json) {
        if (json) {
            this.save(PARTICIPANT_KEY, json);
        }
    }

    get participant() {
        return this.find(PARTICIPANT_KEY);
    }

    set player(json) {
        if (json) {
            this.save(PLAYER_KEY, json);
        }
    }

    get player() {
        return this.find(PLAYER_KEY);
    }

    onSignIn({ authUser, accessToken }) {
        this.authentication = ({authUser, accessToken});
    }

    onSignOut() {
        this.clear();
    }

    onJoinGame(participant) {
        this.participant = participant
    }

    onPlayerInfo(player) {
        this.player = player;
    }
}

export const localState = new LocalState(window.sessionStorage);

export function useLocalState({ registration, authentication, participant, player }) {

    //initialize session storage with initial values (if no values currently exist)
    if (!localState.player && player) {
        localState.player = player;
    }
    if (!localState.participant && participant) {
        localState.participant = participant;
    }
    if (!localState.registration && registration) {
        localState.registration = registration;
    }
    if (!localState.authentication && authentication) {
        localState.authentication = authentication;
    }

    //attach listener to update session storage values (clean up when signing out)
    const doc = useRef(document);
    doc.current.onvisibilitychange = function () {
        if (doc.current.visibilityState === 'hidden') {
            localState.player = player;
            localState.participant = participant;
            localState.registration = registration;
            localState.authentication = authentication;
        }
    };

    //return references to cached values
    return ({
        player: localState.player,
        participant: localState.participant,
        registration: localState.registration,
        authentication: localState.authentication,
        cleanup: () => {
            localState.clear();
        }
    })
}
