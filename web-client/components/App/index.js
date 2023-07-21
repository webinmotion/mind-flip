import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Trivia from '../Trivia';
import AlertMessage from '../Layout/AlertMessage';
import GamePlaying from '../../containers/Trivia/GamePlaying';
import GameAccepting from '../../containers/Trivia/GameAccepting';
import OrganizeGames from '../../containers/NavMenu/OrganizeGames';
import PlayerProfile from '../../containers/NavMenu/PlayerProfile';
import GameClient from '../../containers/Trivia/GameClient';
import ProgressBar from '../Layout/ProgressBar';

export default function App({ ...rest }) {

    const { alert, clearAlert, progress, showProgress, clearProgress, prospect, trivia, createGameHandle, updateGameStatus, deleteGameHandle, } = rest;

    const { auth } = prospect?.authentication;

    return (
        <div className="app">
            <AlertMessage {...alert} clearAlert={clearAlert} />
            <Routes>
                <Route path="/accepting/:gameId/player/:playerId" element={<GameClient {...rest} />} />
                <Route path="/waiting/:gameId/player/:playerId" element={<GameAccepting {...rest} />} />
                <Route path="/playing/:gameId/player/:playerId" element={<GamePlaying participant={trivia?.participant} showProgress={showProgress} />} />
                <Route path="/organize" element={<OrganizeGames games={trivia.listing} player={trivia.player} createGame={createGameHandle} updateGame={updateGameStatus} deleteGame={deleteGameHandle} />} />
                <Route path="/profile" element={<PlayerProfile player={trivia.player} accessToken={auth?.accessToken} />} />
                <Route path="/*" element={<Trivia {...rest} />} />
            </Routes>
            <ProgressBar progress={progress} clearProgress={clearProgress} />
        </div>
    )
}
