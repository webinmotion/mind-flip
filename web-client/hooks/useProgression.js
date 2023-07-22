import React, {useState} from 'react';

export default function useProgression({duration, points, }) {

    const [percent, setPercent] = useState(0);
    const [countDown, setCountdown] = useState(points);
    const [timeRemaining, setTimeRemaining] = useState(duration);

    async function pause({delay, points, duration}) {
        return new Promise((resolve,) => {
            let timeout = setTimeout(function () {
                //reset progress bar state
                setPercent(0);
                setCountdown(points);
                setTimeRemaining(duration);
                //clean up - all done
                clearTimeout(timeout);
                resolve();
            }, delay);
        })
    }

    async function countdown({period, points, duration, oncountdown}) {
        const ticks = duration / period;
        const delta = points / ticks;
        const clock = 100 / ticks;

        return new Promise((resolve,) => {
            let count = ticks;

            //reset progress bar state
            setPercent(0);
            setCountdown(points);
            setTimeRemaining(duration);

            //count down progress bar
            let interval = setInterval(() => {
                if (count <= 0) {
                    //clean up - all done
                    clearInterval(interval);
                    resolve();
                } else {
                    let nextPercent, nextCountdown, nextTimeRemaining;
                    setPercent(prevPercent => {
                        nextPercent = prevPercent + clock;
                        return nextPercent
                    });
                    setCountdown(prevCountdown => {
                        nextCountdown = prevCountdown - delta;
                        return nextCountdown;
                    });
                    setTimeRemaining(prevTime => {
                        nextTimeRemaining = prevTime - period;
                        return nextTimeRemaining;
                    });
                    if (typeof oncountdown === 'function') oncountdown({
                        countDown: nextCountdown,
                        timeRemaining: nextTimeRemaining
                    });
                    count--;
                }
            }, period);
        })
    }

    return {state: {percent, countDown, timeRemaining}, pause, countdown}
}