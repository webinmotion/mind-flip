import {useState} from "react";

const paths = {
    'GameListing': ['GameDetails'],
    'GameDetails': ['Guest', 'Registration'],
    'Guest': ['JoinAsGuest'],
    'JoinAsGuest': ['VerifyGuest'],
    'VerifyGuest': ['ReadyToGo'],
    'ReadyToGo': ['GameAccepting', 'GamePlaying'],
    'GameAccepting': [],
    'GamePlaying': [],
    'Registration': ['SignUpPlayer', 'SignInPlayer'],
    'SignInPlayer': ['RecoverPassword', 'SignUpPlayer', 'ReadyToGo'],
    'RecoverPassword': ['VerifyRegistered', 'SignUpPlayer'],
    'SignUpPlayer': ['SignInPlayer'],
    'VerifyRegistered': ['ReadyToGo'],
};

export default function useFlowGraph() {

    const [[previous, current], setCurrent] = useState([null, 'GameListing']);

    const getNext = () => {
        if (paths[current].length === 0) {
            return "No more steps";
        }

        return paths[current];
    }

    const setNext = (prev, next) => {
        if(paths.hasOwnProperty(next)){
            setCurrent([prev, next]);
        }
    }

    const getPrev = () => {
        return Object.entries(paths).reduce((acc, [key, value]) => {
            if (value.includes(current)) {
                acc.push(key)
            }
            return acc;
        }, []);
    }

    const setPrev = (prev, next) => {
        if(paths.hasOwnProperty(prev)){
            setCurrent([prev, next]);
        }
    }

    return {current: [previous, current], getNext, setNext, getPrev, setPrev};
}