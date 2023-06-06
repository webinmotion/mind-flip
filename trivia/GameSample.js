const GameDriver = require("./GameDriver");
const ScoreKeeper = require("./ScoreKeeper");
const moment = require('moment');

module.exports = class GameSample {

    constructor() {
        this.studio = require("./GameStudio");
        this.scorer = new ScoreKeeper();
        let startTime = moment(new Date()).add(moment.duration(10, 'seconds'))
        this.driver = new GameDriver(this.studio, this, this.scorer, startTime, "auto", "2 seconds cushion", 5000, 10000);
        this.title = "friendly numbers";
        this.organizer = "jimmy@email.com";
        this.ticker = {};
        this.driver.initialize(this.title, this.organizer);
    }

    timeTicker(game_id, ticker) {
        this.ticker[game_id] = { ...ticker, remaining: ticker.duration + ticker.delay };
    }

    onChange(game_id, question, { progression, duration, index }) {
        if (progression === 'auto') {
            //TODO - figure out stuff with ticker and game_id
            const handle = setTimeout(async function () {
                await this.driver.onNext();
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