import React from 'react';
import { useAppContext } from '../../context/appContext';
import App from '../../components/App';

function AppContainer() {

    const { ...rest } = useAppContext();

    return (
        <App {...rest} ></App>
    )
}

export default AppContainer