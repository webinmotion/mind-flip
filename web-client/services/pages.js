import axios from 'axios';
import { serverUrl } from './common';

export const remoteFetchFolderMetadata = async (folder) => {
    const result = await axios.get(`${serverUrl()}/pages?location=${folder}`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchPageContentAction = async (name) => {
    const result = await axios.get(`${serverUrl()}/pages/1?name=client/pages/${name}`)
        .then(resp => resp.data);
    return result;
}

export const remoteUpdatePageContentAction = async (name, content) => {
    const result = await axios.post(`${serverUrl()}/pages?name=client/pages/${name}`, {content},
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.data);
    return result;
}