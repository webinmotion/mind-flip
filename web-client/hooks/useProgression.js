import React, {useState} from 'react';

export default function useProgression({duration, points, }) {

    const [progress, setProgress] = useState(0);
    const [countDown, setCountdown] = useState(points);
    const [timeRemaining, setTimeRemaining] = useState(duration);

    async function pause({delay, points, duration}) {
        return new Promise((resolve,) => {
            let timeout = setTimeout(function () {
                //reset state
                setProgress(0);
                setCountdown(points);
                setTimeRemaining(duration);
                //all done
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

            let interval = setInterval(() => {
                if (count <= 0) {
                    //all done
                    clearInterval(interval);
                    resolve();
                } else {
                    let nextProgress, nextCountdown, nextTimeRemaining;
                    setProgress(prevProgress => {
                        nextProgress = prevProgress + clock;
                        return nextProgress
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

    return {state: {progress, countDown, timeRemaining}, pause, countdown}
}