import React, {useContext, createContext} from "react";
import useTodos from "./useTodos";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}
export default function ({children}) {

    const {todos, createTask, toggleDone, removeTask} = useTodos();

    return (
        <AppContext.Provider value={{
            todos, createTask, toggleDone, removeTask
        }}>
            {children}
        </AppContext.Provider>
    )
}