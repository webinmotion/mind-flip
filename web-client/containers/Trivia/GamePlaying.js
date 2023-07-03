import { useEffect } from "react";
import GamePlaying from "../../components/Trivia/GamePlaying";
import { serverUrl } from "../../services/request";

export default function GamePlayingContainer(props) {

    const { match, trivia, onNextQuestionEvent, respondToQuestion } = props;

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

    return <GamePlaying game={game} {...props} />
}