class GameClock {

    constructor(delay = 0) {
        this.delay = delay;
    }

    async pause() {
        return new Promise((resolve,) => {
            let timeout = setTimeout(() => {
                clearTimeout(timeout);
                resolve();
            }, this.delay);
        });
    }
}

module.exports = GameClock;