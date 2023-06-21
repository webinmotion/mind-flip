import { createContext, useContext, useReducer } from "react";
import {
    fetchGameInfoAction, fetchProgressionAction, fetchGameLayoutAction, fetchGameQuestionAction, fetchGameEngineAction, fetchPlayerByEmailAction, createGameEngineAction, updateGameEngineAction, addGameParticipantAction, updatePointsTallyAction, fetchCummulativeTallyAction, updateHighestScoreAction,
} from './triviaActions';
import { triviaReducer } from './triviaReducer';
// import { fetchFolderMetadataAction, fetchPageContentAction, updatePageContentAction, setSelectedPageAction, } from './pagesActions';
// import { pagesReducer } from './pagesReducer';
import GameClient from './GameClient';
import useAppMenu from "./useAppMenu";

// import useAppFlags from './useAppFlags';
// import useLocalStorage from './useLocalStorage';

const initialTrivia = new GameClient();

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {

    const {appMenu, setAuth, setRoute} = useAppMenu();
    const [trivia, triviaDispatch] = useReducer(triviaReducer, initialTrivia);
    // const { flags, setCurrentPage } = useAppFlags();
    // const { storage, setBuckets, setPriorities, setProgress, clearLabels } = useLocalStorage();

    return (
        <AppContext.Provider value={{
            trivia,
            appMenu,

            fetchGameInfo: fetchGameInfoAction(triviaDispatch),
            fetchProgression: fetchProgressionAction(triviaDispatch),
            fetchGameLayout: fetchGameLayoutAction(triviaDispatch),
            fetchGameQuestion: fetchGameQuestionAction(triviaDispatch),
            fetchGameEngine: fetchGameEngineAction(triviaDispatch),
            fetchPlayerByEmail: fetchPlayerByEmailAction(triviaDispatch),
            createGameEngine: createGameEngineAction(triviaDispatch),
            updateGameEngine: updateGameEngineAction(triviaDispatch),
            addGameParticipant: addGameParticipantAction(triviaDispatch),
            updatePointsTally: updatePointsTallyAction(triviaDispatch),
            fetchCummulativeTally: fetchCummulativeTallyAction(triviaDispatch),
            updateHighestScore: updateHighestScoreAction(triviaDispatch),

            setAuth,
            setRoute,

        }}>
            {children}
        </AppContext.Provider>
    )
}