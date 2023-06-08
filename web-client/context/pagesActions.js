import {
    remoteFetchFolderMetadata,
    remoteFetchPageContentAction,
    remoteUpdatePageContentAction,
} from '../services/pages';

export const FETCH_FOLDER_METADATA = "FETCH_FOLDER_METADATA";
export const SELECTED_PAGE_CONTENT = "SELECTED_PAGE_CONTENT";
export const UPDATED_PAGE_CONTENT = "UPDATED_PAGE_CONTENT";
export const SET_SELECTED_PAGE = "SET_SELECTED_PAGE";

export const fetchFolderMetadataAction = dispatch => (folder) => {
    remoteFetchFolderMetadata(folder).then(meta => {
        dispatch({ type: FETCH_FOLDER_METADATA, meta });
    });
}

export const fetchPageContentAction = dispatch => name => {
    remoteFetchPageContentAction(name).then(page => {
        dispatch({type: SELECTED_PAGE_CONTENT, page})
    })
}

export const updatePageContentAction = dispatch => (name, content) => {
    remoteUpdatePageContentAction(name, content).then(page => {
        dispatch({type: UPDATED_PAGE_CONTENT, page})
    })
}

export const setSelectedPageAction = dispatch => (pageName) => {
    dispatch({type: SET_SELECTED_PAGE, pageName })
}