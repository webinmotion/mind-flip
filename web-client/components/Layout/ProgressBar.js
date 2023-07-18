import React, { useEffect } from 'react';
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

export default function ProgressBar({ progress: { delay, interval, duration, points, show, number } }) {
    // console.log('delay, interval, duration, points, show, number', delay, interval, duration, points, show, number);
    const [progress, setProgress] = React.useState(0);
    const [countDown, setCountdown] = React.useState(points);

    useEffect(() => {
        console.log('progress bar show?', show);
        if (number > 0) {
            let timer;
            const ticks = duration / interval;
            const delta = points / ticks;
            const clock = 100 / ticks;

            //initial delay before countdown
            const timeout = setTimeout(() => {
                let count = ticks;

                //countdown till 0
                timer = setInterval(() => {
                    if (count <= 0) {
                        clearInterval(timer);
                    }
                    else {
                        setProgress((prevProgress) => prevProgress + clock);
                        setCountdown((prevCountdown) => prevCountdown - delta);
                        count--;
                    }
                }, interval);

                setProgress(0);
                setCountdown(points);
                clearTimeout(timeout);
            }, delay);

            return () => {
                if (timer) {
                    clearInterval(timer);
                }
            };
        }
    }, [number]);

    return show ?
        (<Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
            <Typography mt={2} variant="h2" component="h2">Countdown: {countDown}</Typography >
        </Box>)
        : null
}
