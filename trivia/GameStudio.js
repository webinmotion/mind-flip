class GameStudio {

    constructor() {
        this.running = {};
        this.participants = {};
        this.ticker = {};
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
        this.unsubscribe(game_id);
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
            Object.keys(this.participants[game]).forEach(client => {
                let socket = this.participants[game][client]
                delete this.participants[game][client];
                socket.end();
            });
        }
    }

    subscribe(game, participant, socket) {
        if (!this.participants[game]) {
            this.participants[game] = {};
        }
        if (!this.participants[game][participant]) {
            this.participants[game][participant] = socket;
        }
    }

    unsubscribe(game, participant) {
        if (this.participants[game] && this.participants[game][participant]) {
            let socket = this.participants[game][participant]
            delete this.participants[game][participant];
            socket.end();
        }
    }

    timeTicker(game_id, ticker) {
        this.ticker[game_id] = { ...ticker, remaining: ticker.duration + ticker.delay };
    }

    onChange(game_id, question, { progression, duration, index }) {
        //send data to all partipants
        this.participants[game_id] && this.participants[game_id].forEach(client => {
            client.response.write(`data: ${JSON.stringify({
                index, question, ticker: this.ticker
            })}\n\n`);
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

    onComplete() {
        console.log("sample game completed");
    }
}

module.exports = new GameStudio();