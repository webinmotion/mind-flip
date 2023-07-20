import axios, {serverUrl} from "./request";

export const remoteSendResponseToQuestion = async (game_id, player_id, question_id, answer_submitted) => {
    return await axios.post(`${serverUrl()}/play/client/${game_id}/player/${player_id}/question/${question_id}/answer`,
        {answer_submitted},
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.data);
}