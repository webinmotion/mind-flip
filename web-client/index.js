import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./containers/App";
import Layout from "./components/Layout";
import { AppProvider } from './context/appContext';

const root = document.getElementById('root');

ReactDom.render(<React.StrictMode>
    <AppProvider>
        <BrowserRouter>
            <Layout>
                <App />
            </Layout>
        </BrowserRouter>
    </AppProvider>
</React.StrictMode>, root)