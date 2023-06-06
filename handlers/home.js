const fs = require('fs');
const path = require('path');

function homePage(req, res, next) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), 'build/index.html'), { encoding: 'utf8', flag: 'r' })
    res.send(content);
  }
  catch (e) {
    next(e);
  }
}

function healthCheck(req, res, next) {
  try {
    res.send(`${process.env.HEALTHY_MESSAGE}\n`);
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  homePage,
  healthCheck,
};
