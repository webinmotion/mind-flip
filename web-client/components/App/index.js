import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Trivia from '../Trivia';
import GameAccepting from '../../containers/Trivia/GameAccepting';
import GamePlaying from '../Trivia/GamePlaying';
import OrganizeGame from '../NavMenu/OrganizeGames';
import PlayerProfile from '../../containers/NavMenu/PlayerProfile';
import AlertMessage from '../Layout/AlertMessage';

export default function App({ ...rest }) {

    const { alert, clearAlert, prospect, trivia, createGameHandle, updateGameStatus, deleteGameHandle, } = rest;

    const { auth } = prospect?.authentication;

    return (
        <div className="app">
            <AlertMessage {...alert} clearAlert={clearAlert} />
            <Routes>
                <Route path="/accepting/:gameId/player/:playerId" element={<GameAccepting {...rest} />} />
                <Route path="/playing/:gameId/player/:playerId" element={<GamePlaying />} />
                <Route path="/organize" element={<OrganizeGame games={trivia.listing} player={trivia.player} createGame={createGameHandle} updateGame={updateGameStatus} deleteGame={deleteGameHandle} />} />
                <Route path="/profile" element={<PlayerProfile player={trivia.player} accessToken={auth?.accessToken} />} />
                <Route path="/*" element={<Trivia {...rest} />} />
            </Routes>
        </div>
    )
}
