import { useEffect } from "react";
import GamesAccepting from "../../components/Trivia/GamesAccepting";
import { serverUrl } from "../../services/request";

export default function GameAcceptingContainer(props) {

    const { match, trivia, fetchGameParticipants, onParticipantEvents, onGameStartingEvent } = props;

    useEffect(() => {
        const gameId = match.params.gameId;
        async function participantsListing() {
            if (gameId) {
                await fetchGameParticipants(gameId);
            }
        }

        participantsListing();
    }, [match.params.gameId]);

    useEffect(() => {
        const channel = match.params.gameId;
        const player = match.params.playerId;
        const evtSource = new EventSource(`${serverUrl()}/play/game/${channel}/player/${player}`)
        if (channel && player) {
            onParticipantEvents(evtSource);
            onGameStartingEvent(evtSource);
        }

        return () => {
            evtSource.close();
        }
    }, [match.params.gameId, match.params.playerId]);

    const game = trivia?.listing.find(g => g.game_info.game_id === match.params.gameId);

    return <GamesAccepting game={game} {...props} />
}