const { execute } = require('../repo');

const fetchGamesListing = async () => {
    let results = await execute(`select G.*, P.* from tbl_Game G 
    join tbl_account A on A.account_id = G.organizer
    join tbl_player P on P.player_id = A.player_fk 
    where A.is_active = true
        and P.player_type != 'guest'
        and G.game_status in ('Created', 'Accepting', 'Playing')`, [])
    return results?.length == 0 ? [] : results.map(record => {
        const {
            game_id, title, description, game_status,
            player_id, organizer, email_address, screen_name, player_type, city, state, country
        } = record;

        return ({
            game_info: { game_id, title, description, game_status },
            organizer: {
                player: player_id,
                account: organizer,
                email_address,
                screen_name,
                player_type,
                city,
                state,
                country
            }
        });
    });
}

const fetchGameInfo = async (title, organizer) => {
    let result = await execute(`select tg.*, tp.* from tbl_game tg 
    inner join tbl_account ta on tg.organizer = ta.account_id 
    inner join tbl_player tp on ta.player_fk = tp.player_id 
    where tg.title = $1 and tp.email_address = $2`, [title, organizer]);
    const { game_id, description, game_status, player_id, screen_name, email_address, city, state, country } = result[0];
    return ({
        game: { game_id, description, game_status },
        organizer: { player_id, screen_name, email_address, city, state, country }
    });
}

const fetchGameInfoById = async (gameid) => {
    let result = await execute(`select tg.*, tp.* from tbl_game tg 
    inner join tbl_account ta on tg.organizer = ta.account_id 
    inner join tbl_player tp on ta.player_fk = tp.player_id 
    where tg.game_id = $1::uuid`, [gameid]);
    const { game_id, title, description, game_status, player_id, screen_name, email_address, city, state, country } = result[0];
    return ({
        game: { game_id, title, description, game_status },
        organizer: { player_id, screen_name, email_address, city, state, country }
    });
}

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
    const { que_value, que_answer, category, asked_by, numeric_answer, has_choices, has_clues, max_points } = results[0];
    return { que_value, que_answer, category, asked_by, numeric_answer, has_choices, has_clues, max_points };
}

const fetchQuestionChoices = async (que_id) => {
    let results = await execute("select * from tbl_choice tc where question_fk = $1::uuid", [que_id]);
    // const { is_correct, choice_value, clue } = results[0];
    return results;
}

const fetchGameEngine = async (game_fk) => {
    let results = await execute("select * from tbl_game_engine te where te.game_fk = $1::uuid", [game_fk]);
    const {
        scheduled_start,
        current_section,
        section_index,
        progression,
        initial_delay,
        display_duration,
        time_ticker
    } = results[0];
    return {
        game_fk,
        scheduled_start,
        current_section,
        section_index,
        progression,
        initial_delay,
        display_duration,
        time_ticker
    };
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

const createGameHandle = async ({ organizer, title }) => {
    let result = await execute(`
    insert into tbl_game (organizer, title) values 
    ((select ta.account_id from tbl_account ta join tbl_player tp on ta.player_fk = tp.player_id 
        where tp.email_address = $1 and tp.player_type != 'guest' and ta.is_active = true), $2)
    returning game_id, game_status`, [organizer, title]);
    const { game_id, game_status } = result[0];
    return { game_id, game_status, organizer, title };
}

const updateGameStatus = async (game_id, game_status) => {
    let result = await execute(`
    update tbl_game set game_status = $2 where game_id = $1 returning game_status`, [game_id, game_status]);
    const updatedStatus = result[0].game_status;
    return { game_id, game_status: updatedStatus };
}

const deleteGameHandle = async (game_id) => {
    let result = await execute(`
    delete from tbl_game where game_id = $1`, [game_id]);
    console.log('delete game result', result);
    return { rows: result };
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

const fetchGameParticipants = async (game_id) => {
    let result = await execute(`
    select * from tbl_game_player gp inner join tbl_player p on gp.player_fk = p.player_id where gp.game_fk = $1`,
        [game_id]);
    // const { participant_id, player_id, screen_name, city, state, country } = result;
    return result;
}

const fetchParticipantById = async (participant_id) => {
    let result = await execute(`
    select * from tbl_game_player gp inner join tbl_player p on gp.player_fk = p.player_id where gp.participant_id = $1`,
        [participant_id]);
    // const { participant_id, player_id, screen_name, city, state, country } = result;
    return result;
}

const addGameParticipant = async (game_id, player_id) => {
    let result = await execute(`insert into tbl_game_player (game_fk, player_fk) values ($1::uuid, $2::uuid)
        on conflict (game_fk, player_fk) do update set has_exited = $3 returning participant_id`, [game_id, player_id, false]);
    const { participant_id } = result[0];
    return { participant_id, game_id, player_id, };
}

const dropGameParticipant = async (participant_id) => {
    let result = await execute("delete from tbl_game_player where participant_id = $1::uuid returning game_fk, player_fk", [participant_id]);
    const { game_fk, player_fk } = result[0];
    return { game_fk, player_fk, };
}

const respondToQuestion = async (participant_fk, question_fk, { answer_submitted, clock_remaining, tally_points }) => {
    let insert_query = `insert into tbl_game_tally (participant_fk, question_fk, answer_submitted, clock_remaining, tally_points) 
values ($1, $2, $3, $4, $5) on conflict (participant_fk, question_fk) update set tally_points = $5`;
    let result = await execute(insert_query,
        [participant_fk, question_fk, answer_submitted, clock_remaining, tally_points]);
    return result[0];
}

const fetchCumulativeTally = async (participant_id) => {
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
    fetchGamesListing,
    fetchGameInfo,
    fetchGameInfoById,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchQuestionChoices,
    fetchGameEngine,
    fetchPlayerById,
    fetchPlayerByEmail,
    createGameHandle,
    updateGameStatus,
    deleteGameHandle,
    createGameEngine,
    updateGameEngine,
    fetchGameParticipants,
    fetchParticipantById,
    addGameParticipant,
    dropGameParticipant,
    respondToQuestion,
    fetchCumulativeTally,
    updateHighestScore,
}