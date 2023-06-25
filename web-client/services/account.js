import axios from 'axios';
import { serverUrl } from './common';

export const remoteRegisterPlayer = async ({ screen_name, email_address }) => {
    const result = await axios.post(`${serverUrl()}/account/player`,
        { screen_name, email_address, player_type: "registered" },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.data);
    return result;
}

export const remoteVerifyEmailAddr = async ({ email_address, verification_code }) => {
    const result = await axios.get(`${serverUrl()}/account/verify?email_address=${email_address}&verification_code=${verification_code}`)
        .then(resp => resp.data);
    return result;
}

export const remoteRegisterGuest = async (email_address) => {
    const result = await axios.post(`${serverUrl()}/account/player`,
        { player_type: "guest", email_address },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.data);
    return result;
}

export const remoteDropGuestPlayer = async (screen_name) => {
    const result = await axios.delete(`${serverUrl()}/account/player/${screen_name}`)
        .then(resp => resp.data);
    return result;
}

export const remoteAccountSignUp = async ({ username, email_address, password }) => {
    const result = await axios.post(`${serverUrl()}/account/register`, {
        username, email_address, password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.data);
    return result;
}

export const remoteAccountSignIn = async ({ username, password }) => {
    const result = await axios.post(`${serverUrl()}/account/login`, {
        username, password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.data);
    return result;
}

export const remoteAccountSignOut = async (username) => {
    const result = await axios.get(`${serverUrl()}/account/${username}/logout`)
        .then(resp => resp.data);
    return result;
}

export const remoteResetPassword = async ({ username, password }) => {
    const result = await axios.put(`${serverUrl()}/account/reset`, {
        username, password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.data);
    return result;
}

export const remoteResetVerification = async (email_address) => {
    const result = await axios.get(`${serverUrl()}/account/${email_address}/recover`)
        .then(resp => resp.data);
    return result;
}