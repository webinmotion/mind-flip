const path = require('path');
const env = require('dotenv');
env.config({ path: path.resolve(process.cwd(), 'server/.env') })
console.log(process.env.HEALTHY_MESSAGE);

//run sample game
const GameSample = require("./GameSample");
new GameSample();