const {
    ON_GAME_ACCEPTING_EVENT,
    ON_GAME_CREATED_EVENT,
    ON_GAME_PLAYING_EVENT,
    ON_GAME_DELETED_EVENT,
    ON_PARTICIPANT_JOINED,
    ON_PARTICIPANT_EXITED,
    GAME_STATUS_CREATED,
    GAME_STATUS_ACCEPTING,
    GAME_STATUS_PLAYING,
} = require('./Constants');

class GameStudio {

    constructor() {
        this.running = {};
        this.participants = {};
        this.ticker = {};
        this.broadcast = {}
    }

    formatOutput(data, event) {
        const output = JSON.stringify(data);
        if (event) {
            return (`event: ${event}\ndata: ${output}\n\n`)
        }
        return (`data: ${output}\n\n`);
    }

    register(driver) {
        console.log(`registering new game ${driver.gameInfo.game_id}`);
        this.running[driver.gameInfo.game_id] = driver;
        driver.onRegister();
    }

    complete(driver, message = "game completed successfully") {
        let game_id = driver.gameInfo.game_id;
        console.log(`unregistering game ${game_id}`);
        delete this.running[game_id];
        console.log(`unsubscribing participants for ${game_id}`);
        this.unsubscribe([game_id]);
        console.log(`removing ticker for game ${game_id}`);
        delete this.ticker[game_id];
        console.log(message);
        driver.onCompletion();
    }

    async enroll(game, player,) {
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

    subscribe(response, eventNames, channel, recipient) {
        eventNames.forEach(eventName => {
            if (channel && recipient) {
                if (!this.participants[eventName]) {
                    this.participants[eventName] = {};
                }
                if (!this.participants[eventName][channel]) {
                    this.participants[eventName][channel] = [];
                }
                response.recipient = recipient;
                this.participants[eventName][channel].push(response);
            }
            if (eventName && !(channel && recipient)) {
                if (!this.broadcast[eventName]) {
                    this.broadcast[eventName] = [];
                }
                this.broadcast[eventName].push(response)
            }
        });
    }

    unsubscribe(eventNames, channel, recipient) {
        eventNames.forEach(eventName => {
            if (this.participants[eventName] && this.participants[eventName][channel]) {
                let targets = this.participants[eventName][channel]
                const idx = targets.findIndex(client => client.recipient === recipient);
                const target = targets.splice(idx, 1);
                target.end();
            }
        });
    }

    unBroadcast(eventNames, resp) {
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

    timeTicker(game_id, ticker) {
        this.ticker[game_id] = { ...ticker, remaining: ticker.duration + ticker.delay };
    }

    broadcastMessage(event, payload) {
        this.broadcast[event]?.forEach(client => client.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
    }

    publishMessage(event, channel, payload) {
        if (this.participants[event]) {
            this.participants[event][channel]?.forEach(client => client.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
        }
    }

    onChange(game_id, question, { progression, duration, index }) {
        //send data to all participants
        this.participants[ON_QUESTION_CHANGED][game_id] && this.participants[ON_QUESTION_CHANGED][game_id].forEach(response => {
            response.write(this.formatOutput({
                index, question, ticker: this.ticker
            }));
        });

        //wait for predefined time before prompting for next question
        if (progression === 'auto') {
            const handle = setTimeout(async function () {
                await this.running[game_id].onNext();
                clearTimeout(handle);
            }.bind(this), duration);
        }

        //log current question
        console.log(`Que ${index} : ${question.que_value}`);
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

    onComplete() {
        console.log("sample game completed");
    }
}

module.exports = new GameStudio();