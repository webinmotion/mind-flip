import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useAppContext } from '../../context/appContext';
import App from '../../components/App';
import { serverUrl } from '../../services/request';

function AppContainer() {

    const history = useHistory();
    const context = useAppContext();
    const { toggleCurrentView, currentRoute, onGameListingEvents, fetchGamesListing } = context;

    useEffect(() => {
        toggleCurrentView(null);
    }, []);

    useEffect(() => {
        async function initializeListing() {
            await fetchGamesListing();
        }

        initializeListing();
    }, []);

    useEffect(() => {
        const evtSource = new EventSource(`${serverUrl()}/play`)
        onGameListingEvents(evtSource);

        return () => {
            evtSource.close();
        }
    }, []);

    useEffect(() => {
        history.push(`/${currentRoute}`)
    }, [currentRoute]);

    return (
        <App {...context}  ></App>
    )
}

export default AppContainer