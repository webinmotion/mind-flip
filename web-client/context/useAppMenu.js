import { useState } from "react";

export default () => {

    const [appMenu, setAppMenu] = useState({
        auth: true,
        route: '',
    });

    function setAuth(auth) {
        setAppMenu(menu => ({ ...menu, auth, route: '' }))
    }

    function setRoute(route) {
        setAppMenu(menu => ({...menu, route}))
    }

    return { appMenu, setAuth, setRoute };
}