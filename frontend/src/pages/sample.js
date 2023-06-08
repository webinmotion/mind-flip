import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import TriviaContainer from '../components/TriviaContainer';
import { AppProvider } from '../context/appContext';

export default function Sample() {

    return (
        <Layout title="Trivia" description="Trivia React Page">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3em',
                }}>

                <AppProvider>
                    <TriviaContainer />
                </AppProvider>
            </div>
        </Layout>
    );
}