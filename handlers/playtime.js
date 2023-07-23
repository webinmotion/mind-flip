const GameDriver = require('../trivia/GameDriver');
const ScoreKeeper = require("../trivia/ScoreKeeper");
const studio = require("../trivia/GameStudio");
const { ON_GAME_ACCEPTING_EVENT, ON_GAME_CREATED_EVENT, ON_GAME_PLAYING_EVENT, ON_GAME_DELETED_EVENT, ON_SSE_TESTING_EVENT, ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED, ON_GAME_STARTING_EVENT,
    ON_GAME_ENDING_EVENT, ON_BEFORE_QUESTION_EVENT, ON_QUESTION_POSTED_EVENT, ON_ANSWER_POSTED_EVENT, ON_AFTER_QUESTION_EVENT, ON_BREAK_STARTING_EVENT, ON_SNACK_BREAK_EVENT, ON_BREAK_ENDING_EVENT,
    ON_PLACARD_POSTED_EVENT, ON_PROGRESSION_EVENT, } = require('../trivia/Constants');

const scorer = new ScoreKeeper();

function handleGamesListing(req, resp, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    resp.writeHead(200, headers);

    studio.subscribeBroadcastEvents(resp, [
        ON_GAME_CREATED_EVENT,
        ON_GAME_ACCEPTING_EVENT,
        ON_GAME_PLAYING_EVENT,
        ON_GAME_DELETED_EVENT,
        ON_SSE_TESTING_EVENT,
    ]);

    resp.write(`data: subscription to game listing accepted\n\n`);

    req.on('close', () => {
        console.log(`sse Connection closed`);
        studio.unsubscribeBroadcastEvents([
            ON_GAME_CREATED_EVENT,
            ON_GAME_ACCEPTING_EVENT,
            ON_GAME_PLAYING_EVENT,
            ON_GAME_DELETED_EVENT,
            ON_SSE_TESTING_EVENT,
        ], resp)
    });
}

function handleParticipantEvents(req, resp, next) {
    const game = req.params.game;
    const player = req.params.player;
    console.log(`request made by ${player} to join game ${game}`);

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    resp.writeHead(200, headers);

    studio.subscribeChannelEvents(resp, [ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED], game, player);

    resp.write(`data: player ${player} subscription to game ${game} participant events accepted\n\n`);

    req.on('close', () => {
        console.log(`${game} Connection closed`);
        studio.unsubscribeChannelEvents([ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED], player)
    });
}

async function enrollDriver(req, resp, next) {
    const game_id = req.params.game;
    const driver = new GameDriver(game_id, studio, scorer);
    await driver.initialize(game_id);
    resp.json({ "success": true });
}

async function enrollPlayer(req, resp, next) {
    const game_id = req.params.game;
    const player_id = req.params.player;
    const { participant_id, screen_name } = await studio.enroll(game_id, player_id);
    resp.json({ game_id, participant_id, screen_name });
    studio.broadcastMessage("joined", { screen_name });
}

async function sendTestMessage(req, resp, next) {
    //use - curl -X POST ${host}/play/test/ON_SSE_TESTING_EVENT -H "Content-Type: application/json" -d '{"sample": 1}'
    const { event } = req.params;
    const data = req.body;
    studio.broadcastMessage(event, data);
    resp.json({
        reason: 'testing',
        event,
        data,
    })
}

async function handleNextQuestionEvent(req, resp, next) {
    const game_id = req.params.game;
    const driver = studio.running[game_id];
    await driver.onNext();
    resp.json({ "success": true });
}

async function handleAnswerPostedEvent(req, resp, next) {
    const {game, player, question } = req.params;
    const {answer_submitted} = req.body;
    const driver = studio.running[game];
    await driver.onAnswer({
        game_id: game,
        player_id: player,
        question_id: question,
        answer_submitted
    });
    resp.json({ "success": true });
}

async function handleProgressionEvents(req, resp, next) {
    const game = req.params.game;
    const player = req.params.player;
    console.log(`player:${player} subscribed for game:${game} progression events`);

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    resp.writeHead(200, headers);

    studio.subscribeChannelEvents(resp, [
        ON_GAME_STARTING_EVENT,
        ON_GAME_ENDING_EVENT,
        ON_BEFORE_QUESTION_EVENT,
        ON_QUESTION_POSTED_EVENT,
        ON_ANSWER_POSTED_EVENT,
        ON_PLACARD_POSTED_EVENT,
        ON_AFTER_QUESTION_EVENT,
        ON_BREAK_STARTING_EVENT,
        ON_SNACK_BREAK_EVENT,
        ON_BREAK_ENDING_EVENT,
        ON_PROGRESSION_EVENT,
    ], game, player);

    resp.write(`data: player ${player} subscription for progression events in game ${game} accepted\n\n`);

    req.on('close', () => {
        console.log(`sse Connection closed`);
        studio.unsubscribeChannelEvents([
            ON_GAME_STARTING_EVENT,
            ON_GAME_ENDING_EVENT,
            ON_BEFORE_QUESTION_EVENT,
            ON_QUESTION_POSTED_EVENT,
            ON_ANSWER_POSTED_EVENT,
            ON_PLACARD_POSTED_EVENT,
            ON_AFTER_QUESTION_EVENT,
            ON_BREAK_STARTING_EVENT,
            ON_SNACK_BREAK_EVENT,
            ON_BREAK_ENDING_EVENT,
            ON_PROGRESSION_EVENT,
        ], player)
    });
}

module.exports = {
    enrollDriver,
    enrollPlayer,
    sendTestMessage,
    handleGamesListing,
    handleParticipantEvents,
    handleProgressionEvents,
    handleNextQuestionEvent,
    handleAnswerPostedEvent,
};