import axios, {serverUrl} from './request';

export const remoteFetchGamesListing = async () => {
    return await axios.get(`${serverUrl()}/trivia/listing`)
        .then(resp => resp.data);
}

export const remoteFetchGameInfo = async (title, organizer) => {
    return await axios.get(`${serverUrl()}/trivia/title/${title}/organizer/${organizer}`)
        .then(resp => resp.data);
}

export const remoteFetchProgression = async (ticker) => {
    return await axios.get(`${serverUrl()}/trivia/ticker/${ticker}`)
        .then(resp => resp.data);
}

export const remoteFetchGameLayout = async (game) => {
    return await axios.get(`${serverUrl()}/trivia/layout/${game}`)
        .then(resp => resp.data);
}

export const remoteFetchGameQuestion = async (question) => {
    return await axios.get(`${serverUrl()}/trivia/question/${question}`)
        .then(resp => resp.data);
}

export const remoteFetchGameEngine = async (game) => {
    return await axios.get(`${serverUrl()}/trivia/engine/${game}`)
        .then(resp => resp.data);
}

export const remoteFetchGameParticipant = async (participant) => {
    return await axios.get(`${serverUrl()}/trivia/participant/${participant}/details`)
        .then(resp => resp.data);
}

export const remoteFetchPlayerByEmail = async (email) => {
    return await axios.get(`${serverUrl()}/trivia/player/${email}`)
        .then(resp => resp.data);
}

export const remoteCreateGameEngine = async (game, { scheduled_start, progression, display_duration, time_ticker }) => {
    return await axios.post(`${serverUrl()}/trivia/engine/${game}`,
        {scheduled_start, progression, display_duration, time_ticker},
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.data);
}

export const remoteUpdateGameEngine = async (game, { current_section, section_index }) => {
    return await axios.put(`${serverUrl()}/trivia/engine/${game}`,
        {current_section, section_index},
        {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(resp => resp.data);
}

export const remoteFetchGameParticipants = async (game) => {
    return await axios.get(`${serverUrl()}/trivia/participant/${game}`)
        .then(resp => resp.data);
}

export const remoteAddGameParticipant = async (game, player) => {
    return await axios.put(`${serverUrl()}/trivia/participant/${game}/player/${player}`)
        .then(resp => resp.data);
}

export const remoteDropGameParticipant = async (participant) => {
    return await axios.delete(`${serverUrl()}/trivia/participant/${participant}`)
        .then(resp => resp.data);
}

export const remoteRespondToQuestion = async (participant, question, { answer_submitted, clock_remaining, tally_points }) => {
    return await axios.put(`${serverUrl()}/trivia/participant/${participant}/question/${question}`,
        {answer_submitted, clock_remaining, tally_points},
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.data);
}

export const remoteFetchCumulativeTally = async (participant) => {
    return await axios.get(`${serverUrl()}/trivia/participant/${participant}/score`)
        .then(resp => resp.data);
}

export const remoteUpdateHighestScore = async (participant, score) => {
    return await axios.put(`${serverUrl()}/trivia/participant/${participant}/highscore/${score}`)
        .then(resp => resp.data);
}