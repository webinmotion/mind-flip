const { execute } = require('../repo');

const fetchGameInfo = async (title, organizer) => {
    let result = await execute(`select * from tbl_game where title = $1 and organizer = (
        select a.account_id from tbl_account a inner join tbl_player p on a.player_fk = p.player_id
        where p.email_address = $2)`, [title, organizer]);
    const { game_id, description } = result[0];
    return { game_id, description };
[]}

const fetchProgression = async (ticker_id) => {
    let result = await execute("select * from tbl_Ticker where ticker_id = $1", [ticker_id]);
    const { duration, delay, period } = result[0];
    return { duration, delay, period };
}

const fetchGameLayout = async (game_id) => {
    let results = await execute("select * from tbl_game_layout where game_fk = $1::uuid order by current_section asc, section_index asc", [game_id]);
    // [{ game_fk, question_fk, current_section, section_index }];
    return results;
}

const fetchGameQuestion = async (que_id) => {
    let results = await execute("select * from tbl_question tq where que_id = $1::uuid", [que_id]);
    const { que_value, que_answer, category, asked_by, numeric_answer, has_choices, has_clues, has_points } = results[0];
    return { que_value, que_answer, category, asked_by, numeric_answer, has_choices, has_clues, has_points };
}

const fetchGameEngine = async (game_fk) => {
    let results = await execute("select * from tbl_game_engine te where te.game_fk = $1::uuid", [game_fk]);
    const { scheduled_start, current_section, section_index, progression, initial_delay, display_duration, time_ticker } = results[0];
    return { game_fk, scheduled_start, current_section, section_index, progression, initial_delay, display_duration, time_ticker };
}

const fetchPlayerByEmail = async (email_address) => {
    let results = await execute("select * from tbl_player where email_address = $1", [email_address]);
    const { player_id, screen_name, player_type, city, state, country } = results[0];
    return { player_id, email_address, screen_name, player_type, city, state, country };
}

const fetchPlayerById = async (player_id) => {
    let results = await execute("select * from tbl_player where player_id = $1::uuid", [player_id]);
    const { screen_name, player_type, city, state, country } = results[0];
    return { player_id, email_address, screen_name, player_type, city, state, country };
}

const createGameEngine = async (game_id, { scheduled_start, progression, display_duration, time_ticker }) => {
    let result = await execute(`
    insert into tbl_game_engine (game_fk, scheduled_start, progression, display_duration, time_ticker) values 
    ($1::uuid, $2, $3, $4, $5) on conflict (game_fk) do update set scheduled_start = $2, progression = $3, display_duration = $4, time_ticker = $5 returning *`, [game_id, scheduled_start, progression, display_duration, time_ticker]);
    const { game_fk, current_section, section_index } = result[0];
    return { game_fk, scheduled_start, current_section, section_index, progression, display_duration, time_ticker };
}

const updateGameEngine = async (game_id, { current_section, section_index }) => {
    let result = await execute(`
    update tbl_game_engine set current_section = $2, section_index = $3 where game_fk = $1 returning *`,
        [game_id, current_section, section_index]);
    const { game_fk } = result[0];
    return { game_fk, current_section, section_index };
}

const addGameParticipant = async(game_id, player_id) => {
    let result = await execute(`insert into tbl_game_player (game_fk, player_fk) values ($1::uuid, $2::uuid)
        on conflict (game_fk, player_fk) do update set has_exited = $3 returning participant_id`, [game_id, player_id, false]);
    const {participant_id} = result[0];
    return {participant_id, game_id, player_id, };
}

const dropGameParticipant = async(participant_id) => {
    let result = await execute("delete from tbl_game_player where participant_id = $1::uuid", [participant_id]);
    return result[0];
}

const updatePointsTally = async (participant_fk, question_fk, { answer_submitted, clock_remaining, tally_points }) => {
    let result = await execute(`
    update tbl_game_tally set answer_submitted = $3, clock_remaining = $4, tally_points = $5 where participant_fk = $1 and question_fk = $2`,
        [participant_fk, question_fk, answer_submitted, clock_remaining, tally_points]);
    return result;
}

const fetchCummulativeTally = async (participant_id) => {
    let result = await execute("select sum(tally_points) from tbl_game_tally where participant_fk = $1", [participant_id]);
    return result[0];
}

const updateHighestScore = async (participant_id, score) => {
    let [account] = await execute(`select ta.account_id from tbl_account ta 
    inner join tbl_player tp on ta.player_fk = tp.player_id 
    inner join tbl_game_player tgp on tgp.player_fk = tp.player_id
    where tgp.participant_id = $1`, [participant_id]);

    if (account?.account_id) {
        let account_id = account?.account_id;
        let [current_high] = await execute("select high_score from tbl_high_scores where account_fk = $1 order by high_score desc", [account_id]);
        if (!current_high || current_high?.high_score < score) {
            let result = await execute(`insert into tbl_high_scores (account_fk, high_score) values ($1, $2) 
            on conflict (account_fk, high_score) do update set high_score = $2`,
                [account_id, score]);
            return result;
        }
    }
    return 0;
}

module.exports = {
    fetchGameInfo,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchGameEngine,
    fetchPlayerById,
    fetchPlayerByEmail,
    createGameEngine,
    updateGameEngine,
    addGameParticipant,
    dropGameParticipant,
    updatePointsTally,
    fetchCummulativeTally,
    updateHighestScore,
}