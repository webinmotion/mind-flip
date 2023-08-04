const { execute } = require('../repo');

const fetchGamesListing = async () => {
    let results = await execute(`select G.*, P.*, GE.* from tbl_Game G
        join tbl_account A on A.account_id = G.organizer
        join tbl_player P on P.player_id = A.player_fk
        left outer join tbl_game_engine GE on GE.game_fk = G.game_id
        where A.is_active = true
        and P.player_type != 'guest'
        and G.game_status in ('Created', 'Accepting', 'Playing')`, [])
    return results?.length === 0 ? [] : results.map(record => {
        const {
            game_id, title, description, game_status,
            player_id, organizer, email_address, screen_name, player_type, city, state, country,
            scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock,
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
            },
            engine_info: {
                scheduled_start,
                progression,
                is_multi_player,
                can_navigate_back,
                server_push_mode,
                game_clock,
            }
        });
    });
}

const fetchGamesByOrganizer = async (player_id) => {
    let results = await execute(`select G.*, P.*, GE.* from tbl_Game G
        join tbl_account A on A.account_id = G.organizer
        join tbl_player P on P.player_id = A.player_fk
        left outer join tbl_game_engine GE on GE.game_fk = G.game_id
        where A.is_active = true
        and P.player_id = $1::uuid
        and G.game_status in ('Created', 'Accepting', 'Playing')`, [player_id])
    return results?.length === 0 ? [] : results.map(record => {
        const {
            game_id, title, description, game_status,
            player_id, organizer, email_address, screen_name, player_type, city, state, country,
            scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock,
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
            },
            engine_info: {
                scheduled_start,
                progression,
                is_multi_player,
                can_navigate_back,
                server_push_mode,
                game_clock,
            }
        });
    });
}

const fetchGameClocks = async () => {
    return await execute("select * from tbl_game_clock", []);
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

const fetchGameInfoById = async (game) => {
    let result = await execute(`select tg.*, tp.* from tbl_game tg 
    inner join tbl_account ta on tg.organizer = ta.account_id 
    inner join tbl_player tp on ta.player_fk = tp.player_id 
    where tg.game_id = $1::uuid`, [game]);
    const { game_id, title, description, game_status, player_id, screen_name, email_address, city, state, country } = result[0];
    return ({
        game: { game_id, title, description, game_status },
        organizer: { player_id, screen_name, email_address, city, state, country }
    });
}

const fetchProgression = async (clock_id) => {
    let result = await execute("select * from tbl_game_clock where clock_id = $1", [clock_id]);
    const {
        clock_title,
        pre_countdown_delay,
        post_countdown_delay,
        countdown_duration,
        countdown_interval,
    } = result[0];
    return {
        clock_id,
        clock_title,
        pre_countdown_delay,
        post_countdown_delay,
        countdown_duration,
        countdown_interval,
    };
}

const fetchGameLayout = async (game_id) => {
    // [{ game_fk, question_fk, current_section, section_index }];
    return await execute("select * from tbl_game_layout where game_fk = $1::uuid order by current_section asc, section_index asc", [game_id]);
}

const fetchGameQuestion = async (que_id) => {
    let results = await execute("select * from tbl_question tq where que_id = $1::uuid", [que_id]);
    const { que_value, que_answer, category, asked_by, numeric_answer, has_choices, has_clues, max_points } = results[0];
    return { que_id, que_value, que_answer, category, asked_by, numeric_answer, has_choices, has_clues, max_points };
}

const fetchQuestionChoices = async (que_id) => {
    // const { is_correct, choice_value, clue } = results[0];
    return await execute("select * from tbl_choice tc where question_fk = $1::uuid", [que_id]);
}

const fetchGameMessages = async (parent_id) => {
    return await execute(`
    with recursive game_extras as (
        select parent.*, 1 as "order"
        from tbl_game_message parent
        where parent.message_id = $1::uuid

        union all

        select child.*, (p."order" + 1)
        from tbl_game_message child, game_extras p
        where child.message_id = p.followed_by
    ) select * from game_extras;`, [parent_id])
}

const fetchGameEngine = async (game_fk) => {
    let results = await execute(`select * from tbl_game_engine te 
    inner join tbl_game_clock tt on tt.clock_id = te.game_clock 
    where te.game_fk = $1::uuid`, [game_fk]);
    const {
        scheduled_start,
        current_section,
        section_index,
        progression,
        can_navigate_back,
        is_multi_player,
        server_push_mode,
        clock_title,
        pre_countdown_delay,
        countdown_duration,
        countdown_interval,
        post_countdown_delay,
    } = results[0];
    return {
        game_id: game_fk,
        scheduled_start,
        current_section,
        section_index,
        progression,
        can_navigate_back,
        is_multi_player,
        server_push_mode,
        clock_title,
        pre_countdown_delay,
        countdown_duration,
        countdown_interval,
        post_countdown_delay,
    };
}

const fetchPlayerByEmail = async (email_address) => {
    let results = await execute("select * from tbl_player where email_address = $1", [email_address]);
    const { player_id, screen_name, player_type, city, state, country } = results[0];
    return { player_id, email_address, screen_name, player_type, city, state, country };
}

const fetchPlayerById = async (player_id) => {
    let results = await execute("select * from tbl_player where player_id = $1::uuid", [player_id]);
    const { screen_name, email_address, player_type, city, state, country } = results[0];
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

const createGameEngine = async (game_id, { scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock }) => {
    let result = await execute(`
    insert into tbl_game_engine (game_fk, scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock) values 
    ($1::uuid, $2, $3, $4, $5, $6, $7) on conflict (game_fk) do update set scheduled_start = $2, progression = $3, is_multi_player = $4, can_navigate_back = $5, server_push_mode =$6, game_clock = $7 returning *`,
        [game_id, scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock]);
    const { game_fk, current_section, section_index } = result[0];
    return { game_fk, scheduled_start, current_section, section_index, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock };
}

const updateGameEngine = async (game_id, { current_section, section_index }) => {
    let result = await execute(`
    update tbl_game_engine set current_section = $2, section_index = $3 where game_fk = $1 returning *`,
        [game_id, current_section, section_index]);
    const { game_fk } = result[0];
    return { game_fk, current_section, section_index };
}

const fetchGameParticipants = async (game_id) => {
    // const { participant_id, player_id, screen_name, city, state, country } = result;
    return await execute(`
    select * from tbl_game_player gp inner join tbl_player p on gp.player_fk = p.player_id where gp.game_fk = $1`,
        [game_id]);
}

const fetchGameTallies = async (game_id) => {
    let result = await execute(`select gt.participant_fk, sum(gt.tally_points) from tbl_game_tally gt
    inner join tbl_game_player gp on gp.participant_id = gt.participant_fk 
    where gp.game_fk = $1
    group by gt.participant_fk`, [game_id]);
    return result[0];
}

const fetchParticipantById = async (participant_id) => {
    // const { participant_id, player_id, screen_name, city, state, country } = result;
    return await execute(`
    select * from tbl_game_player gp inner join tbl_player p on gp.player_fk = p.player_id where gp.participant_id = $1`,
        [participant_id]);
}

const fetchParticipantTally = async (participant_id) => {
    let result = await execute("select sum(tally_points) from tbl_game_tally where participant_fk = $1", [participant_id]);
    return result[0];
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

const saveResponseToQuestion = async (participant_fk, question_fk, { answer_submitted, clock_remaining, tally_points }) => {
    console.log("submitting response", answer_submitted, clock_remaining, tally_points);
    let insert_query = `insert into tbl_game_tally (participant_fk, question_fk, answer_submitted, clock_remaining, tally_points) 
values ($1, $2, $3, $4, $5) on conflict (participant_fk, question_fk) do update set tally_points = $5 returning tally_points`;
    let result = await execute(insert_query, [participant_fk, question_fk, answer_submitted, clock_remaining, tally_points]);
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
            return await execute(`insert into tbl_high_scores (account_fk, high_score) values ($1, $2) 
            on conflict (account_fk, high_score) do update set high_score = $2`,
                [account_id, score]);
        }
    }
    return 0;
}

const searchQuestions = async (criteria) => {
    const { start_from, fetch_size, author_username, author_screen_name, category, created_before, created_after, has_choices, min_points, } = criteria;
    let query = ['select tq.* from tbl_question tq',
        'join tbl_player tp on tq.asked_by = tp.player_id',
        'join tbl_account ta on ta.player_fk = tp.player_id where',
        category ? "tq.category in ($1) or" : "",
        author_screen_name ? "tp.screen_name in ($2) or" : "",
        author_username ? "ta.username in ($3) or" : "",
        created_before ? "tq.publish_time in ($3) or" : "",
        created_after ? "tq.publish_time in ($3) or" : "",
        has_choices ? "tq.has_choices = $6 or" : "",
        min_points ? "tq.max_points > $7 or" : ""
            `offset ${start_from} limit ${fetch_size}`];
    return await execute(query.join(" "), [category, author_screen_name, author_username, created_before, created_after, has_choices, min_points, start_from, fetch_size,]);
}

const upsertGameClock = async ({ clock_id, clock_title, pre_countdown_delay, countdown_duration, post_countdown_delay, }) => {
    let result = await execute(`insert into tbl_game_clock (clock_id, clock_title, pre_countdown_delay, countdown_duration, post_countdown_delay) 
    values ($1, $2, $3, $4, $5) on conflict (clock_id) do update set clock_title = $2, pre_countdown_delay = $3, countdown_duration = $4, post_countdown_delay = $5 
    returning *`,
        [clock_id, clock_title, pre_countdown_delay, countdown_duration, post_countdown_delay]);
    return result[0];
}

const deleteGameClock = async (clock_id) => {
    let result = await execute(`delete from tbl_game_clock where clock_id = $1 returning clock_id`, [clock_id,]);
    return result[0];
}

const fetchRootGameMessages = async () => {
    const leafRows = await execute(`select message_id from tbl_game_message where followed_by is NULL`, []);
    return await Promise.all(leafRows.map(async (row) => {
        const rootRow = await execute(`--recursively get all root rows 
        with recursive game_extras as ( 
            --get a leaf row (one not followed by anything else) 
            select leaf.*, 1 as "order" 
            from tbl_game_message leaf 
            where leaf.message_id = $1 
            
            union all 
            
            select ancestor.*, (child."order" + 1) 
            from tbl_game_message ancestor, game_extras child 
            where ancestor.followed_by = child.message_id 
        ) select * from game_extras order by "order" desc limit 1;`, [row.message_id])
        // console.log(rootRow);
        return rootRow[0];
    }));
}

const upsertGameMessage = async ({ message_content, display_duration, followed_by, content_type, }) => {
    let result = await execute(`insert into tbl_game_message (message_content, display_duration, followed_by, content_type) 
    values ($1, $2, $3::uuid, $4) on conflict (message_content) do update set display_duration = $2, followed_by = $3::uuid, content_type = $4 
    returning *`,
        [message_content, display_duration, followed_by, content_type,]);
    return result[0];
}

const deleteGameMessage = async (message_id) => {
    let result = await execute(`delete from tbl_game_message where message_id = $1::uuid returning message_id`, [message_id,]);
    return result[0];
}

const fetchQuestionsByAuthor = async (author_id) => {
    const result = await execute(`
        select tq.*, tp.screen_name, tch.*  from tbl_question tq 
        join tbl_player tp on tq.asked_by = tp.player_id 
        left outer join tbl_choice tch on tch.question_fk = tq.que_id 
        where tq.asked_by = $1 order by tq.que_id`, [author_id,]);
    let merged = [];
    let current = null;
    result.forEach(res => {
        const {que_id, que_value, que_answer, answer_reason, category, asked_by, has_choices, max_points, publish_time, choice_id, choice_value, clue, is_correct} = res;
        if(current !== que_id) {
            let question = { que_id, que_value, que_answer, answer_reason, category, asked_by, has_choices, max_points, publish_time, choices: [] };
            question.choices.push({choice_id, choice_value, clue, is_correct});
            merged.push(question);
            current = que_id;
        }
        else{
            merged[merged.length - 1].choices.push({choice_id, choice_value, clue, is_correct});
        }
    });
    return merged;
}

const upsertGameQuestion = async ({ que_value, que_answer, answer_reason, category, max_points, has_choices, asked_by, }) => {
    let result = await execute(`insert into tbl_question (que_value, que_answer, answer_reason, category, max_points, has_choices, asked_by) 
    values ($1, $2, $3, $4, $5, $6, $7::uuid) on conflict (que_value) do update set que_answer = $2, answer_reason = $3, category = $4, max_points = $5, has_choices = $6, asked_by = $7 
    returning *`,
        [que_value, que_answer, answer_reason, category, max_points, has_choices, asked_by,]);
    return result[0];
}

const deleteGameQuestion = async (question_id) => {
    let result = await execute(`delete from tbl_question where que_id = $1::uuid returning que_id`, [question_id,]);
    return result[0];
}

const upsertQuestionChoices = async({question_id, choice_value, clue, is_correct}) => {
    let result = await execute(`insert into tbl_choice (question_fk, choice_value, clue, is_correct) 
    values ($1, $2, $3, $4) on conflict (choice_value, question_fk) do update set clue = $3, is_correct = $4 
    returning *`,
        [question_id, choice_value, clue, is_correct,]);
    return result[0];
}

const deleteGameChoice = async(choice_id) => {
    let result = await execute(`delete from tbl_choice where choice_id = $1::uuid returning choice_id`, [choice_id,]);
    return result[0];
}

const ___revisit_at_a_later_time_upsertGameLayout = async ({ records }) => {
    /**
     * failing to work when message_fk is either null
     */
    const selectStmt = records.map(record => `
    select '${record.game_fk}'::uuid as game_fk, '${record.question_fk}'::uuid as question_fk, 
    ${record.current_section} as current_section, ${record.section_index} as section_index, 
    '${record.content_label}' as content_label, '${record.message_fk}'::uuid as message_fk, 
    '${record.score_strategy}'::ScoreStrategy as score_strategy
    `).join("\nunion\n");

    const result = await execute(`
    MERGE INTO tbl_game_layout gl
        USING (${selectStmt}) AS t
        ON t.game_fk = gl.game_fk and t.question_fk = gl.question_fk and t.current_section = gl.current_section
    WHEN MATCHED THEN
      UPDATE SET section_index = t.section_index, content_label = t.content_label, score_strategy = t.score_strategy, message_fk = t.message_fk
    WHEN NOT MATCHED THEN
      INSERT (game_fk, question_fk, current_section, section_index, content_label, message_fk, score_strategy)
      VALUES (t.game_fk, t.question_fk, t.current_section, t.section_index, t.content_label, t.message_fk, t.score_strategy)`, []);
    console.log(result);
    return result;
}

const upsertGameLayout = async ({ records }) => {
    const result = await Promise.all(records.map(async (record) => {
        const {game_fk, question_fk, current_section, section_index, content_label, message_fk, score_strategy} = record;
        return await execute(`
      INSERT INTO tbl_game_layout (game_fk, question_fk, current_section, section_index, content_label, message_fk, score_strategy) 
      VALUES ($1::uuid, $2::uuid, $3, $4, $5, $6::uuid, $7::ScoreStrategy) 
      ON CONFLICT (game_fk, question_fk, current_section) do update set 
      section_index = $4, content_label = $5, message_fk = $6, score_strategy = $7`, [
            game_fk, question_fk, current_section, section_index, content_label, message_fk, score_strategy
        ]);
    }));
    console.log(result);
    return result;
}

module.exports = {
    fetchGamesListing,
    fetchGamesByOrganizer,
    fetchGameClocks,
    fetchGameInfo,
    fetchGameInfoById,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchGameTallies,
    fetchQuestionChoices,
    fetchGameEngine,
    fetchPlayerById,
    fetchPlayerByEmail,
    fetchGameMessages,
    createGameHandle,
    updateGameStatus,
    deleteGameHandle,
    createGameEngine,
    updateGameEngine,
    fetchGameParticipants,
    fetchParticipantById,
    fetchParticipantTally,
    addGameParticipant,
    dropGameParticipant,
    saveResponseToQuestion,
    updateHighestScore,
    searchQuestions,
    upsertGameClock,
    deleteGameClock,
    fetchRootGameMessages,
    upsertGameMessage,
    deleteGameMessage,
    fetchQuestionsByAuthor,
    upsertGameQuestion,
    deleteGameQuestion,
    upsertQuestionChoices,
    deleteGameChoice,
    upsertGameLayout,
}