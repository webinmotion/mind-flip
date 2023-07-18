import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1, }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function ProgressBar({ progress: { delay, interval, duration, points, show, number, oncountdown, precountdown, postcountdown } }) {

    const [progress, setProgress] = useState(0);
    const [countDown, setCountdown] = useState(points);
    const [timeRemaining, setTimeRemaining] = useState(duration);

    async function pause({ delay, points, duration }) {
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

    async function countdown({ period, points, duration, oncountdown }) {
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
                }
                else {
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
                    if (typeof oncountdown === 'function') oncountdown({ countDown: nextCountdown, timeRemaining: nextTimeRemaining });
                    count--;
                }
            }, period);
        })
    }

    useEffect(() => {
        if (number > 0) {
            async function runTimers() {
                //before countdown
                if(typeof precountdown === 'function') precountdown(number);
                //warm up
                await pause({ delay, duration, points });
                //countdown
                await countdown({ period: interval, duration, points, oncountdown, });
                //cool down
                await pause({ delay, duration, points });
                //after countdown
                if(typeof postcountdown === 'function') postcountdown();
            }

            runTimers();
        }
    }, [number]);

    return show ?
        (<Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
            <Typography mt={2} variant="h2" component="h2">Points available: {countDown} </Typography >
            <Typography mt={2} variant="subtitle" component="h4">Time remaining: {timeRemaining} </Typography >
        </Box>)
        : null
}
