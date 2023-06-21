import React, { useEffect } from 'react';
import { Switch, Route, } from 'react-router-dom';
import Trivia from '../Trivia';
import GameAccepting from '../Trivia/GamesAccepting';
import GamePlaying from '../Trivia/GamePlaying';
import OrganizeGame from '../Trivia/OrganizeGame';
import { useAppContext } from '../../context/appContext';
import { useHistory } from "react-router-dom";
import PlayerProfile from '../Trivia/PlayerProfile';

export default function App() {

    const { appMenu, profile, setProfile } = useAppContext();
    const history = useHistory();

    useEffect(() => {
        history.push(`/${appMenu.route}`)
    }, [appMenu.route])

    return (
        <div className="app">
            <Switch>
                <Route exact path="/eee" render={(props) =>
                    <Trivia {...props} />} />
                <Route path="/accepting/:gameId" render={(props) =>
                    <GameAccepting {...props} />} />
                <Route path="/" render={(props) =>
                    <GamePlaying {...props} />} />
                <Route path="/organize" render={(props) =>
                    <OrganizeGame {...props} />} />
                <Route path="/profile" render={(props) =>
                    <PlayerProfile profile={profile} setProfile={setProfile} {...props} />} />
            </Switch>
        </div>
    )
}
