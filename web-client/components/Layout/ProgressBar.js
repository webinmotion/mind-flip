import React, { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useProgression from "../../hooks/useProgression";

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

export default function ProgressBar({ progress }) {

    const { pre_delay, post_delay, interval, duration, points, show, number, oncountdown, precountdown, postcountdown } = progress;
    const{ state, pause, countdown} = useProgression({duration, points,});

    useEffect(() => {
        if (number > 0) {
            async function runProgress() {
                //before countdown
                if(typeof precountdown === 'function') precountdown(number);
                //warm up
                await pause({ delay: pre_delay, duration, points });
                //countdown
                await countdown({ period: interval, duration, points, oncountdown, });
                //cool down
                await pause({ delay: post_delay, duration, points });
                //after countdown
                if(typeof postcountdown === 'function') postcountdown();
            }

            runProgress().then(() => console.log(`Completed running progress for item #${number}`));
        }
    }, [number]);

    return show ?
        (<Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={state.progress} />
            <Typography mt={2} variant="h2" component="h2">Points available: {state.countDown} </Typography >
            <Typography mt={2} variant="subtitle" component="h4">Time remaining: {state.timeRemaining} </Typography >
        </Box>)
        : null
}
