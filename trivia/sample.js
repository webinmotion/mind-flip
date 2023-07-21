const path = require('path');
const env = require('dotenv');
env.config({ path: path.resolve(process.cwd(), '.env.local') })
console.log(process.env.HEALTHY_MESSAGE);

//run sample game
const GameClock = require("./GameClock");
let clock = new GameClock({
    delay: 3000,
    points: 1000,
    period: 500,
    duration: 5000,
    precountdown: (number) => console.log('pre-countdown', number),
    postcountdown: () => console.log('post-countdown'),
    oncountdown: (data) => console.log('on-countdown', data),
});

clock.tick(1);