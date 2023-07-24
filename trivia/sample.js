const path = require('path');
const env = require('dotenv');
const {ClosestButNotOver, ClockCountdown, ExactMatchExpected} = require("./ScoreKeeper");
env.config({path: path.resolve(process.cwd(), '.env.local')})
console.log(process.env.HEALTHY_MESSAGE);

//run sample game
async function testing() {
    const GameClock = require("./GameClock");
    const delay = 3000;
    console.log('starting clock with %d millis delay', delay);
    let clock = new GameClock(delay);

    await clock.pause();

    console.log('exiting clock after for %d millis pause', delay);
}

testing().then(r => console.log("exiting testing"));

const parameters = {
    maxTime: 10000,
    timeRemaining: 5000,
    maxPoints: 1000,
    pointsRemaining: 500,
    expectedAnswer: 200,
    actualAnswer: 100
};

let closestNotOver = new ClosestButNotOver(parameters);
console.log("closestNotOver", closestNotOver.calcScore());

let clockCountdown = new ClockCountdown({...parameters, actualAnswer: 200});
console.log("clockCountdown", clockCountdown.calcScore());

let exactMatchExpected = new ExactMatchExpected({...parameters, actualAnswer: 200});
console.log("exactMatchExpected", exactMatchExpected.calcScore());
