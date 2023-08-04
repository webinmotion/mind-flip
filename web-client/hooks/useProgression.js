import {useState} from 'react';

export const ON_PROGRESSION_EVENT = "ON_PROGRESSION_EVENT";

export const initialProgression = {
    show: false,
    pre_delay: 0,
    duration: 0,
    interval: 0,
    post_delay: 0,
    points: 0,
    number: 0,
    count: 0,
    oncountdown: null,
    precountdown: null,
    postcountdown: null,
};

export function useProgression() {

    const [progression, setProgression] = useState(initialProgression);

    function showProgress({pre_delay, duration, interval, post_delay, number, points, oncountdown, precountdown, postcountdown,}) {
        setProgression(prevProgress => ({
            ...prevProgress,
            show: true,
            pre_delay,
            duration,
            interval,
            post_delay,
            number,
            points,
            oncountdown,
            precountdown,
            postcountdown,
        }));
    }

    function onProgressionEvent(evtSource) {

        evtSource.addEventListener(ON_PROGRESSION_EVENT, (event) => {
            const {data} = event;
            setProgression(prevProgress => ({...prevProgress, ...JSON.parse(data)}));
        });
    }

    return ({
        progress: progression,
        showProgress,
        onProgressBarEvents: onProgressionEvent,
    });
}