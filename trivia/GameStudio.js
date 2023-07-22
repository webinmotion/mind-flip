const {
    ON_GAME_ACCEPTING_EVENT,
    ON_GAME_CREATED_EVENT,
    ON_GAME_PLAYING_EVENT,
    ON_GAME_DELETED_EVENT,
    ON_PARTICIPANT_JOINED,
    ON_PARTICIPANT_EXITED,
    GAME_STATUS_ACCEPTING,
    GAME_STATUS_PLAYING,
    ON_QUESTION_POSTED_EVENT,
    ON_GAME_ENDING_EVENT,
    ON_ANSWER_POSTED_EVENT,
    ON_PLACARD_POSTED_EVENT,
    ON_PROGRESS_BAR_EVENT,
} = require('./Constants');

/**
 * Multiplexer for multiple running games and their respective participants
 */
class GameStudio {

    constructor() {
        this.running = {};
        this.participants = {};
        this.broadcast = {}
    }
    register(driver) {
        console.log(`registering new game ${driver.game_id}`);
        this.running[driver.game_id] = driver;
        driver.onRegistered();
    }

    complete(driver, message = "game completed successfully") {
        //publish completion message
        let game_id = driver.game_id;
        this.publishMessage(ON_GAME_ENDING_EVENT, game_id, message);
        this.publishMessage(ON_PROGRESS_BAR_EVENT, game_id, {show: false});
        //clean up driver and participants
        console.log(`unregistering game ${game_id}`);
        delete this.running[game_id];
        console.log(`unenrolling participants for ${game_id}`);
        this.unenroll(game_id);
        driver.onCompleted();
    }

    async enroll(game, player,) {
        const driver = this.running[game];
        const { participant_id, screen_name } = await driver.onEnroll(game, player);
        return ({ participant_id, screen_name })
    }

    unenroll(game) {
        if (this.participants[game]) {
            Object.keys(this.participants[game]).forEach(socket => {
                let client = this.participants[game][socket]
                delete this.participants[game][socket];
                client.end();
            });
        }
    }

    subscribeChannelEvents(response, eventNames, channel, recipient) {
        eventNames.forEach(eventName => {
            if (!this.participants[eventName]) {
                this.participants[eventName] = {};
            }
            if (!this.participants[eventName][channel]) {
                this.participants[eventName][channel] = [];
            }
            response.recipient = recipient;
            this.participants[eventName][channel].push(response);
        });
    }

    subscribeBroadcastEvents(response, eventNames) {
        eventNames.forEach(eventName => {
            if (!this.broadcast[eventName]) {
                this.broadcast[eventName] = [];
            }
            this.broadcast[eventName].push(response);
        });
    }

    unsubscribeChannelEvents(eventNames, channel, recipient) {
        eventNames.forEach(eventName => {
            if (this.participants[eventName] && this.participants[eventName][channel]) {
                let targets = this.participants[eventName][channel]
                const idx = targets.findIndex(client => client.recipient === recipient);
                const target = targets.splice(idx, 1);
                target.end();
            }
        });
    }

    unsubscribeBroadcastEvents(eventNames, resp) {
        eventNames.forEach(eventName => {
            if (this.broadcast[eventName]) {
                let responses = this.broadcast[eventName]
                let idx = responses.findIndex(s => s === resp);
                if (idx > -1) {
                    let resp = responses.splice(idx, 1)[0];
                    resp.end();
                }
            }
        });
    }

    broadcastMessage(event, payload) {
        this.broadcast[event]?.forEach(client => client.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
    }

    publishMessage(event, channel, payload) {
        if (this.participants[event]) {
            this.participants[event][channel]?.forEach(client => client.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
        }
    }

    nextQuestion(game_id, question, progression, progress) {
        //send data to all participants
        this.publishMessage(ON_QUESTION_POSTED_EVENT, game_id, question);
        
        if(progression === 'auto') {
            this.publishMessage(ON_PROGRESS_BAR_EVENT, game_id, progress);
        }

        //log current question
        console.log(`Que ${question.number} : ${question.que_value}`);
    }

    answerAccepted(game_id, score,) {
        //send data to all participants
        this.publishMessage(ON_ANSWER_POSTED_EVENT, game_id, score);

        //log current question
        console.log(`Score ${score.value}`);
    }

    nextPlacard(game_id, placard, progression, progress){
        //send placard to all participants
        this.publishMessage(ON_PLACARD_POSTED_EVENT, game_id, placard);

        if(progression === 'auto') {
            this.publishMessage(ON_PROGRESS_BAR_EVENT, game_id, progress);
        }

        //log current placard
        console.log(`Placard ${placard.placard_content}`);
    }

    sendGameCreatedEvent({ game, organizer }) {
        this.broadcastMessage(ON_GAME_CREATED_EVENT, { game_info: game, organizer });
    }

    sendGameStatusEvent({ game_id, game_status }) {
        switch (game_status) {
            case GAME_STATUS_ACCEPTING: {
                this.broadcastMessage(ON_GAME_ACCEPTING_EVENT, { game_id, game_status });
                break;
            }
            case GAME_STATUS_PLAYING: {
                this.broadcastMessage(ON_GAME_PLAYING_EVENT, { game_id, game_status });
                break;
            }
            default: {
                console.log(game_status, 'this is currently not handled');
            }
        }
    }

    sendGameDeletedEvent({ game_id }) {
        this.broadcastMessage(ON_GAME_DELETED_EVENT, { game_id });
    }

    sendAddParticipantEvent(game_id, participant) {
        this.publishMessage(ON_PARTICIPANT_JOINED, game_id, participant);
    }

    sendDropParticipantEvent(game_id, participant) {
        this.publishMessage(ON_PARTICIPANT_EXITED, game_id, participant);
    }
}

module.exports = new GameStudio();