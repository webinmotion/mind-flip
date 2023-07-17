import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Trivia from '../Trivia';
import GameAccepting from '../../containers/Trivia/GameAccepting';
// import GamePlaying from '../Trivia/GamePlaying';
import OrganizeGames from '../../containers/NavMenu/OrganizeGames';
import PlayerProfile from '../../containers/NavMenu/PlayerProfile';
import AlertMessage from '../Layout/AlertMessage';
// import ClientManualPull from '../../containers/Trivia/ClientManualPull';
import ClientIntervalPull from '../../containers/Trivia/ClientIntervalPull';

export default function App({ ...rest }) {

    const { alert, clearAlert, prospect, trivia, createGameHandle, updateGameStatus, deleteGameHandle, } = rest;

    const { auth } = prospect?.authentication;

    return (
        <div className="app">
            <AlertMessage {...alert} clearAlert={clearAlert} />
            <Routes>
                <Route path="/accepting/:gameId/player/:playerId" element={<GameAccepting {...rest} />} />
                <Route path="/playing/:gameId/player/:playerId" element={<ClientIntervalPull participant={trivia?.participant} />} />
                <Route path="/organize" element={<OrganizeGames games={trivia.listing} player={trivia.player} createGame={createGameHandle} updateGame={updateGameStatus} deleteGame={deleteGameHandle} />} />
                <Route path="/profile" element={<PlayerProfile player={trivia.player} accessToken={auth?.accessToken} />} />
                <Route path="/*" element={<Trivia {...rest} />} />
            </Routes>
        </div>
    )
}
