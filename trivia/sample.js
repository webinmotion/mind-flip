const path = require('path');
const env = require('dotenv');
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