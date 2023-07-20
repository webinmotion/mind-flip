import { useEffect } from "react";
import GamesAccepting from "../../components/Trivia/GamesAccepting";
import { serverUrl } from "../../services/request";
import { useParams } from "react-router-dom";

export default function GameAcceptingContainer(props) {

    let { gameId, playerId } = useParams();
    const {trivia, fetchGameParticipants, onParticipantEvents} = props;

    useEffect(() => {
        async function participantsListing() {
            if (gameId) {
                await fetchGameParticipants(gameId);
            }
        }

        participantsListing();
    }, [gameId]);

    useEffect(() => {
        const evtSource = new EventSource(`${serverUrl()}/play/game/${gameId}/player/${playerId}`)
        if (gameId && playerId) {
            onParticipantEvents(evtSource);
        }

        return () => {
            evtSource.close();
        }
    }, [gameId, playerId]);

    const game = trivia?.listing?.find(g => g.game_info.game_id === gameId);

    return <GamesAccepting game={game} {...props} />
}