import axios from 'axios';

const serverPort = process.env.REACT_APP_SERVER_PORT;
const TOKEN_KEY = 'accessToken';
class SessionToken {

    constructor(token) {
        if (token && typeof token === 'string') {
            this.token(token);
        }
    }

    token(token) {
        if (!token) {
            return sessionStorage.getItem(TOKEN_KEY);
        }
        else {
            sessionStorage.setItem(TOKEN_KEY, token);
        }
    }

    clear() {
        sessionStorage.removeItem(TOKEN_KEY);
    }
}

export const localToken = new SessionToken();
export const serverUrl = () => window.location.origin.replace(/(:\d+)/, `:${serverPort}`)

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
        const accessToken = localToken.token();
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
    (error) => {
        const originalRequest = error.config;

        //prevent infinite loop in-case the refresh error is expired
        if (error.response.status === 401 && originalRequest.url === refreshTokenEndpoint) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return refreshAccessToken()
                .then((accessToken) => {
                    localToken.token(accessToken);
                    const token = localToken.token();
                    originalRequest['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                });
        }
        return Promise.reject(error);
    }
);

export default axios;