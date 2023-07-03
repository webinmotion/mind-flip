import axios, { serverUrl } from './request';

export const remoteFetchGamesListing = async () => {
    const result = await axios.get(`${serverUrl()}/trivia/listing`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchGameInfo = async (title, organizer) => {
    const result = await axios.get(`${serverUrl()}/trivia/title/${title}/organizer/${organizer}`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchProgression = async (ticker) => {
    const result = await axios.get(`${serverUrl()}/trivia/ticker/${ticker}`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchGameLayout = async (game) => {
    const result = await axios.get(`${serverUrl()}/trivia/layout/${game}`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchGameQuestion = async (question) => {
    const result = await axios.get(`${serverUrl()}/trivia/question/${question}`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchGameEngine = async (game) => {
    const result = await axios.get(`${serverUrl()}/trivia/engine/${game}`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchGameParticipant = async (participant) => {
    const result = await axios.get(`${serverUrl()}/trivia/participant/${participant}/details`)
        .then(resp => resp.data);
    return result;
}

export const remoteFetchPlayerByEmail = async (email) => {
    const result = await axios.get(`${serverUrl()}/trivia/player/${email}`)
        .then(resp => resp.data);
    return result;
}

export const remoteCreateGameEngine = async (game, { scheduled_start, progression, display_duration, time_ticker }) => {
    const result = await axios.post(`${serverUrl()}/trivia/engine/${game}`,
        { scheduled_start, progression, display_duration, time_ticker },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.data);
    return result;
}

export const remoteUpdateGameEngine = async (game, { current_section, section_index }) => {
    const result = await axios.put(`${serverUrl()}/trivia/engine/${game}`,
        { current_section, section_index },
        {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(resp => resp.data);
    return result;
}

export const remoteFetchGameParticipants = async (game) => {
    const result = await axios.get(`${serverUrl()}/trivia/participant/${game}`)
        .then(resp => resp.data);
    return result;
}

export const remoteAddGameParticipant = async (game, player) => {
    const result = await axios.put(`${serverUrl()}/trivia/participant/${game}/player/${player}`)
        .then(resp => resp.data);
    return result;
}

export const remoteDropGameParticipant = async (participant) => {
    const result = await axios.delete(`${serverUrl()}/trivia/participant/${participant}`)
        .then(resp => resp.data);
    return result;
}

export const remoteRespondToQuestion = async (participant, question, { answer_submitted, clock_remaining, tally_points }) => {
    const result = await axios.put(`${serverUrl()}/trivia/participant/${participant}/question/${question}`,
        { answer_submitted, clock_remaining, tally_points },
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.data);
    return result;
}

export const remoteFetchCumulativeTally = async (participant) => {
    const result = await axios.get(`${serverUrl()}/trivia/participant/${participant}/score`)
        .then(resp => resp.data);
    return result;
}

export const remoteUpdateHighestScore = async (participant, score) => {
    const result = await axios.put(`${serverUrl()}/trivia/participant/${participant}/highscore/${score}`)
        .then(resp => resp.data);
    return result;
}