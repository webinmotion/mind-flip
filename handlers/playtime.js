const moment = require('moment');
const GameDriver = require('../trivia/GameDriver');
const ScoreKeeper = require("../trivia/ScoreKeeper");
const studio = require("../trivia/GameStudio");

const scorer = new ScoreKeeper();

function handleGameEvents(request, response, next) {
    const game = request.params.game;
    const participant = request.params.participant;
    console.log(`request made by ${participant} to join game ${game}`);

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    
   studio.subscribe(game, participant, response);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        studio.unsubscribe(game, participant)
    });
}

async function enrollDriver(request, respsonse, next) {
    const title = request.params.title;
    const organizer = request.params.organizer;
    const { pregame_delay, progression, ticker, ticker_delay, display_duration } = request.body;
    let start_time = moment(new Date()).add(moment.duration(pregame_delay, 'seconds'));
    const driver = new GameDriver(studio, studio, scorer, start_time, progression, ticker, ticker_delay, display_duration);
    await driver.initialize(title, organizer);
    respsonse.json({ "success": true });
}

async function enrollPlayer(request, respsonse, next) {
    const game_id = request.params.game;
    const player_id = request.params.player;
    const { participant_id, screen_name } = await studio.enroll(game_id, player_id);
    respsonse.json({ game_id, participant_id, screen_name });
    return sendEventsToAll("joined", { screen_name });
}

function sendEventsToAll(event, payload) {
    clients.forEach(client => client.response.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
}

module.exports = {
    enrollDriver,
    enrollPlayer,
    handleGameEvents
};