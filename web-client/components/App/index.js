import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import Trivia from '../Trivia';
import AlertMessage from '../Layout/AlertMessage';
import GameSinglePlay from '../../containers/Trivia/GameSinglePlay';
import GameAccepting from '../../containers/Trivia/GameAccepting';
import OrganizeGames from '../../containers/NavMenu/OrganizeGames';
import PlayerProfile from '../../containers/NavMenu/PlayerProfile';
import GameMultiPlay from '../../containers/Trivia/GameMultiPlay';
import ProgressBar from '../Layout/ProgressBar';
import ManageGameEngine from "../../containers/NavMenu/ManageGameEngine";
import ManageGameLayout from "../../containers/NavMenu/ManageGameLayout";
import ManageGameClock from "../../containers/NavMenu/ManageGameClock";
import ManageGameMessage from "../../containers/NavMenu/ManageGameMessage";
import ManageGameQuestion from "../../containers/NavMenu/ManageGameQuestion";

export default function App({ ...rest }) {

    const {
        alert,
        showAlert,
        clearAlert,
        progress,
        showProgress,
        visitor,
        trivia,
        createGameHandle,
        updateGameStatus,
        deleteGameHandle,
    } = rest;

    const { auth } = visitor?.authentication;

    return (
        <div className="app">
            <AlertMessage {...alert} clearAlert={clearAlert} />
            <Routes>
                <Route path={"/accepting/:gameId/player/:playerId"} element={<GameAccepting {...rest} />} />
                <Route path={"/playing"}>
                    <Route path={"subscribe/:gameId/player/:playerId"} element={<GameMultiPlay {...rest} />} />
                    <Route path={"prescribe/:gameId/player/:playerId"} element={<GameSinglePlay participant={trivia?.participant} showProgress={showProgress} />} />
                </Route>
                <Route path={"/organize"} element={<OrganizeGames games={trivia.listing} player={trivia.player} createGame={createGameHandle} updateGame={updateGameStatus} deleteGame={deleteGameHandle} />} />
                <Route path={"/profile"} element={<PlayerProfile player={trivia.player} accessToken={auth?.accessToken} />} />
                <Route path={"/engine"} element={<ManageGameEngine player={visitor.authentication?.authUser?.player_id} showAlert={showAlert} />} />
                <Route path={"/layout"} element={<ManageGameLayout player={visitor.authentication?.authUser?.player_id} showAlert={showAlert} />} />
                <Route path={"/clock"} element={<ManageGameClock showAlert={showAlert} />} />
                <Route path={"/message"} element={<ManageGameMessage />} />
                <Route path={"/question"} element={<ManageGameQuestion player={visitor.authentication?.authUser?.player_id} />} showAlert={showAlert} />
                <Route path={"/*"} element={<Trivia {...rest} />} />
            </Routes>
            <ProgressBar progress={progress} />
        </div>
    )
}
