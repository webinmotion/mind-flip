import axios, {serverUrl} from "./request";

export const remoteSendResponseToQuestion = async (game_id, participant_id, question_id, { answer_submitted, display_duration, max_points, score_strategy, expected_answer, time_remaining, points_remaining,}) => {
    return await axios.post(`${serverUrl()}/play/client/${game_id}/participant/${participant_id}/question/${question_id}/answer`,
        { answer_submitted, display_duration, max_points, score_strategy, expected_answer, time_remaining, points_remaining,},
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.data);
}