const serverPort = process.env.REACT_APP_SERVER_PORT;

export const serverUrl = () => window.location.origin.replace(/(:\d+)/, `:${serverPort}`);