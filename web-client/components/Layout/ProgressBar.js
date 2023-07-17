import * as React from 'react';
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

export default function ProgressBar({ delay, interval, duration, points, show }) {
    const [progress, setProgress] = React.useState(0);
    const [countDown, setCountdown] = React.useState(points);

    React.useEffect(() => {
        if (show) {
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

                clearTimeout(timeout);
            }, delay);

            return () => {
                if (timer) {
                    clearInterval(timer);
                }
            };
        }
    }, [show]);

    return show ?
        (<Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
            <Typography mt={2} variant="h2" component="h2">Countdown: {countDown}</Typography >
        </Box>)
        : null

}
