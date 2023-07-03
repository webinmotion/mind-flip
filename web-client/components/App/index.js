import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import Trivia from '../Trivia';
import GameAccepting from '../../containers/Trivia/GameAccepting';
import GamePlaying from '../Trivia/GamePlaying';
import OrganizeGame from '../Trivia/OrganizeGame';
import PlayerProfile from '../NavMenu/PlayerProfile';
import AlertMessage from '../Layout/AlertMessage';

export default function App({...rest}) {

    const { profile, setProfile, alert, clearAlert } = rest

    return (
        <div className="app">
            <AlertMessage {...alert} clearAlert={clearAlert} />
            <Switch>
                <Route exact path="/" render={(props) =>
                    <Trivia {...props} {...rest} />} />
                <Route path="/accepting/:gameId/player/:playerId" render={(props) =>
                    <GameAccepting {...props} {...rest} />} />
                <Route path="/playing/:gameId/player/:playerId" render={(props) =>
                    <GamePlaying {...props} />} />
                <Route path="/organize" render={(props) =>
                    <OrganizeGame {...props} />} />
                <Route path="/profile" render={(props) =>
                    <PlayerProfile profile={profile} setProfile={setProfile} {...props} />} />
            </Switch>
        </div>
    )
}
