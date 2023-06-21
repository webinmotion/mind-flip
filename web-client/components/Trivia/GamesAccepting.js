import * as React from 'react';
import { gameInfo } from '../../__mocks__/mock-game-layout';

export default function GamesAccepting({ match }) {

    return <>Game Accepting {match.params.gameId}</>
}