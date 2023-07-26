import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Trivia from '../Trivia';
import AlertMessage from '../Layout/AlertMessage';
import GameSinglePlay from '../../containers/Trivia/GameSinglePlay';
import GameAccepting from '../../containers/Trivia/GameAccepting';
import OrganizeGames from '../../containers/NavMenu/OrganizeGames';
import PlayerProfile from '../../containers/NavMenu/PlayerProfile';
import GameMultiPlay from '../../containers/Trivia/GameMultiPlay';
import ProgressBar from '../Layout/ProgressBar';

export default function App({ ...rest }) {

    const { alert, clearAlert, progress, showProgress, visitor, trivia, createGameHandle, updateGameStatus, deleteGameHandle, } = rest;

    const { auth } = visitor?.authentication;

    return (
        <div className="app">
            <AlertMessage {...alert} clearAlert={clearAlert} />
            <Routes>
                <Route path={"/accepting/:gameId/player/:playerId"} element={<GameAccepting {...rest} />} />
                <Route path={"/playing/subscribe/:gameId/player/:playerId"} element={<GameMultiPlay {...rest} />} />
                <Route path={"/playing/prescribe/:gameId/player/:playerId"} element={<GameSinglePlay participant={trivia?.participant} showProgress={showProgress} />} />
                <Route path={"/organize"} element={<OrganizeGames games={trivia.listing} player={trivia.player} createGame={createGameHandle} updateGame={updateGameStatus} deleteGame={deleteGameHandle} />} />
                <Route path={"/profile"} element={<PlayerProfile player={trivia.player} accessToken={auth?.accessToken} />} />
                <Route path={"/*"} element={<Trivia {...rest} />} />
            </Routes>
            <ProgressBar progress={progress} />
        </div>
    )
}
