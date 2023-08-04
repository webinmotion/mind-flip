import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import App from "./containers/App";
import Layout from "./components/Layout";
import {AppProvider} from './context/appContext';

const root = document.getElementById('root');

ReactDom.render(<React.StrictMode>
    <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <Layout>
                    <App/>
                </Layout>
            </BrowserRouter>
        </LocalizationProvider>
    </AppProvider>
</React.StrictMode>, root)