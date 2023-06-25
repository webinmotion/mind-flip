import { useEffect, useState } from "react";
import { serverUrl } from "../services/common";

export default function useSSEConnect(path) {

    const [evtSource, setEvtSource] = useState(null);

    useEffect(() => {
        setEvtSource(new EventSource(`${serverUrl()}/${path}`));

        return () => {
            evtSource.close();
            setEvtSource(null);
        }
    }, [path]);

    return { evtSource };
}