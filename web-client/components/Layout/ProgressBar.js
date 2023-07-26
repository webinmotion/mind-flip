import React, {useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useProgressBar from "../../hooks/useProgressBar";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1,}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function ProgressBar({progress}) {

    const {percent, countDown, timeRemaining, pause, countdown} = useProgressBar();

    useEffect(() => {
        if (progress.number > 0 && progress.points > 0) {
            const {
                points,
                number,
                pre_delay,
                duration,
                interval,
                post_delay,
                oncountdown,
                precountdown,
                postcountdown
            } = progress;

            async function runProgress() {
                console.log('before precountdown()...');
                //before countdown
                if (typeof precountdown === 'function') precountdown(number);
                //warm up
                console.log('pre-delay', pre_delay);
                await pause({delay: pre_delay, duration, points});
                //countdown
                console.log('counting down', interval);
                await countdown({period: interval, duration, points, oncountdown,});
                //cool down
                console.log('post-delay', post_delay);
                await pause({delay: post_delay, duration, points});
                //after countdown
                if (typeof postcountdown === 'function') postcountdown();
                console.log('after postcountdown()...');
            }

            runProgress().then(() => console.log(`Completed running progress for item #${number}`));
        }
    }, [progress.number, progress.points]);

    return progress.show && progress.points > 0 ?
        (<Box sx={{width: '100%'}}>
            <LinearProgressWithLabel value={percent}/>
            <Typography mt={2} variant="h2" component="h2">Points available: {countDown} </Typography>
            <Typography mt={2} variant="subtitle" component="h4">Time remaining: {timeRemaining} </Typography>
        </Box>)
        : null
}
