const moment = require('moment');
const GameDriver = require('../trivia/GameDriver');
const ScoreKeeper = require("../trivia/ScoreKeeper");
const studio = require("../trivia/GameStudio");
const { ON_GAME_ACCEPTING_EVENT, ON_GAME_CREATED_EVENT, ON_GAME_PLAYING_EVENT, ON_GAME_DELETED_EVENT, ON_SSE_TESTING_EVENT, ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED } = require('../trivia/Constants');

const scorer = new ScoreKeeper();

function handleGamesListing(req, resp, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    resp.writeHead(200, headers);

    studio.subscribe(resp, [ON_GAME_CREATED_EVENT, ON_GAME_ACCEPTING_EVENT, ON_GAME_PLAYING_EVENT, ON_GAME_DELETED_EVENT, ON_SSE_TESTING_EVENT]);

    resp.write(`data: subscription to game listing accepted\n\n`);

    req.on('close', () => {
        console.log(`sse Connection closed`);
        studio.unBroadcast([ON_GAME_CREATED_EVENT, ON_GAME_ACCEPTING_EVENT, ON_GAME_PLAYING_EVENT, ON_GAME_DELETED_EVENT, ON_SSE_TESTING_EVENT], resp)
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

    studio.subscribe(resp, [ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED], game, player);

    resp.write(`data: player ${player} subscription to game ${game} participant events accepted\n\n`);

    req.on('close', () => {
        console.log(`${game} Connection closed`);
        studio.unsubscribe([ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED], player)
    });
}

async function enrollDriver(req, resp, next) {
    const title = req.params.title;
    const organizer = req.params.organizer;
    const { pregame_delay, progression, ticker, ticker_delay, display_duration } = req.body;
    let start_time = moment(new Date()).add(moment.duration(pregame_delay, 'seconds'));
    const driver = new GameDriver(studio, studio, scorer, start_time, progression, ticker, ticker_delay, display_duration);
    await driver.initialize(title, organizer);
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

async function handlePushGameQuestion(req, resp, next){
    const { game: game_id, question: question_id } = req.params;
}

module.exports = {
    enrollDriver,
    enrollPlayer,
    sendTestMessage,
    handleGamesListing,
    handleParticipantEvents,
    handlePushGameQuestion,
};