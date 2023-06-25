import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useAppContext } from '../../context/appContext';
import App from '../../components/App';
import { serverUrl } from '../../services/common';

function AppContainer() {

    const history = useHistory();
    const context = useAppContext();
    const { globals, onGameListingEvents, fetchGamesListing } = context;

    useEffect(() => {
        const evtSource = new EventSource(`${serverUrl()}/play`)
        onGameListingEvents(evtSource);

        return () => {
            evtSource.close();
        }
    }, []);

    useEffect(() => {
        async function intitializeListing() {
            await fetchGamesListing();
        }

        intitializeListing();
    }, []);

    useEffect(() => {
        history.push(`/${globals.route}`)
    }, [globals.route])


    return (
        <App {...context} ></App>
    )
}

export default AppContainer