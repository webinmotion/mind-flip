const { ON_GAME_AWAITING_EVENT, ON_GAME_CREATED_EVENT, ON_GAME_PLAYING_EVENT, ON_PARTICIPANT_JOINED, ON_PARTICIPANT_EXITED } = require('./Constants');

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
        console.log(`deregistering game ${game_id}`);
        delete this.running[game_id];
        console.log(`unsubscribeing participants for ${game_id}`);
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

    subscribe(socket, eventNames, participant) {
        eventNames.forEach(eventName => {
            if (participant) {
                if (!this.participants[eventName]) {
                    this.participants[eventName] = {};
                }
                if (!this.participants[eventName][participant]) {
                    this.participants[eventName][participant] = socket;
                }
            }
            else {
                if (!this.broadcast[eventName]) {
                    this.broadcast[eventName] = [];
                }
                this.broadcast[eventName].push(socket)
            }
        });
    }

    unsubscribe(eventNames, participant) {
        eventNames.forEach(eventName => {
            if (this.participants[eventName] && this.participants[eventName][participant]) {
                let socket = this.participants[eventName][participant]
                delete this.participants[eventName][participant];
                socket.end();
            }
        });
    }

    unsubscribeAll(eventNames, resp) {
        eventNames.forEach(eventName => {
            if (this.broadcast[eventName]) {
                let sockets = this.broadcast[eventName]
                let idx = sockets.findIndex(s => s === resp);
                if (idx > -1) {
                    let socket = sockets.splice(idx, 1)[0];
                    socket.end();
                }
            }
        });
    }

    timeTicker(game_id, ticker) {
        this.ticker[game_id] = { ...ticker, remaining: ticker.duration + ticker.delay };
    }

    broadcastMessage(event, payload) {
        this.broadcast[event].forEach(client => client.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
    }

    publishMessage(event, channel, payload) {
        this.participants[channel].forEach(client => client.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
    }

    onChange(game_id, question, { progression, duration, index }) {
        //send data to all partipants
        this.participants[game_id] && this.participants[game_id].forEach(socket => {
            socket.response.write(this.formatOutput({
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

    sendGameStatusEvent({ game_id, game_status }) {
        switch (game_status) {
            case "Accepting": {
                this.broadcastMessage(ON_GAME_AWAITING_EVENT, { game_id, game_status });
                break;
            }
            case "Created": {
                this.broadcastMessage(ON_GAME_CREATED_EVENT, { game_id, game_status });
                break;
            }
            case "Playing": {
                this.broadcastMessage(ON_GAME_PLAYING_EVENT, { game_id, game_status });
            }
            default: {
                console.log(game_status, 'this is currently not handled');
            }
        }
    }

    sendAddParticipantEvent(game_id, result) {
        this.publishMessage(ON_PARTICIPANT_JOINED, game_id, result);
    }

    sendDropParticipantEvent(game_id, result) {
        this.publishMessage(ON_PARTICIPANT_EXITED, game_id, result);
    }

    onComplete() {
        console.log("sample game completed");
    }
}

module.exports = new GameStudio();