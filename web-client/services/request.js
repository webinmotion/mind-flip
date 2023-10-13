import axios from 'axios';
import {localState} from '../hooks/useLocalState';

export const serverUrl = () => window.location.origin.replace(/(:\d+)/, `:${process.env.REACT_APP_SERVER_PORT}`)
export const wserverUrl = () => window.location.origin.replace(/(http)/, 'ws').replace(/(:\d+)/, `:${process.env.REACT_APP_SERVER_PORT}`)

const refreshTokenEndpoint = `${serverUrl()}/auth/refresh-token`;

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    try {
        const response = await axios.get(refreshTokenEndpoint);
        return response.data?.accessToken;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

axios.interceptors.request.use(
    (config) => {
        const accessToken = localState.authentication?.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if(!error?.response){
            return Promise.reject("No server response available");
        }

        //prevent infinite loop in-case the refresh error is expired
        if (error.response.status === 401 && originalRequest.url === refreshTokenEndpoint) {
            return Promise.reject(error);
        }

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return await refreshAccessToken()
                .then((accessToken) => {
                    localState.accessToken = accessToken;
                    const token = localState.accessToken;
                    originalRequest['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                });
        }
        return Promise.reject(error);
    }
);

export default axios;