import axios, {serverUrl} from '../request';

export const remotePushGameQuestion = async ({game, question}) => {
    return await axios.get(`${serverUrl()}/play/push/${game}/question/${question}`)
        .then(resp => resp.data);
}
