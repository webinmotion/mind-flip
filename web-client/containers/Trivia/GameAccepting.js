import { useEffect } from "react";
import GamesAccepting from "../../components/Trivia/GamesAccepting";
import { serverUrl } from "../../services/common";

export default function GameAcceptingContainer(props) {

    const { match, trivia, fetchGameParticipants, onParticipantEvents } = props;

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
        const participant = match.params.participant;
        const evtSource = new EventSource(`${serverUrl()}/play/game/${channel}/participant/${participant}`)
        if (channel) {
            onParticipantEvents(channel, evtSource);
        }

        return () => {
            evtSource.close();
        }
    }, []);

    const game = trivia?.listing.find(g => g.game_info.game_id === match.params.gameId);

    return <GamesAccepting game={game} {...props} />
}