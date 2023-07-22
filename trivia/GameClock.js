const {createStore} = require('zustand/vanilla');

class GameClock {

    constructor({delay, points, period, duration, precountdown, postcountdown, oncountdown}) {
        this.delay = delay;
        this.period = period;
        this.points = points;
        this.duration = duration;
        this.precountdown = precountdown;
        this.postcountdown = postcountdown;

        //set up state store
        const store = createStore((() => ({
            progress: 0,
            countDown: points,
            timeRemaining: duration,
        })));
        const {getState, setState, subscribe} = store;
        this.getState = getState;
        this.setState = setState;

        //subscribe to state changes
        if (typeof oncountdown === 'function') subscribe(oncountdown);
    }

    async pause() {
        return new Promise((resolve,) => {
            let timeout = setTimeout(() => {
                //reset state
                this.setState(prev => ({
                    ...prev,
                    progress: 0,
                    countDown: this.points,
                    timeRemaining: this.duration
                }));
                //all done
                clearTimeout(timeout);
                resolve();
                console.log('paused game clock for', this.delay, 'milliseconds');
            }, this.delay);
        });
    }

    async countdown() {
        const ticks = this.duration / this.period;
        const delta = this.points / ticks;
        const clock = 100 / ticks;

        return new Promise((resolve,) => {
            let count = ticks;

            let interval = setInterval(() => {
                if (count <= 0) {
                    //all done
                    clearInterval(interval);
                    resolve();
                } else {
                    const prevState = this.getState();
                    let nextProgress = prevState.progress + clock;
                    let nextCountdown = prevState.countDown - delta;
                    let nextTimeRemaining = prevState.timeRemaining - this.period;
                    this.setState(prev => ({
                        ...prev,
                        progress: nextProgress,
                        countDown: nextCountdown,
                        timeRemaining: nextTimeRemaining
                    }));

                    count--;
                }
            }, this.period);
        })
    }

    async tick(number) {
        const { precountdown, postcountdown,} = this;
        //before countdown
        if (typeof precountdown === 'function') precountdown(number);
        //warm up
        await this.pause();
        //countdown
        await this.countdown();
        //cool down
        await this.pause();
        //after countdown
        if (typeof postcountdown === 'function') postcountdown();
    }
}

module.exports = GameClock;