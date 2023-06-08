import { createContext, useContext, useReducer } from "react";
import {
    fetchGameInfoAction, fetchProgressionAction, fetchGameLayoutAction, fetchGameQuestionAction, fetchGameEngineAction, fetchPlayerByEmailAction, createGameEngineAction, updateGameEngineAction, addGameParticipantAction, updatePointsTallyAction, fetchCummulativeTallyAction, updateHighestScoreAction,
} from './triviaActions';
import { triviaReducer } from './triviaReducer';
import { fetchFolderMetadataAction, fetchPageContentAction, updatePageContentAction, setSelectedPageAction, } from './pagesActions';
import { pagesReducer } from './pagesReducer';
import GameClient from './GameClient';

// import useAppFlags from './useAppFlags';
// import useLocalStorage from './useLocalStorage';

const initialTrivia = new GameClient();

const initialPages = { 
    meta: {}, 
    markdown: '**Placeholder text**',
    selectedPage: '',
};

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {

    const [pages, pagesDispatch] = useReducer(pagesReducer, initialPages);
    const [trivia, triviaDispatch] = useReducer(triviaReducer, initialTrivia);
    // const { flags, setCurrentPage } = useAppFlags();
    // const { storage, setBuckets, setPriorities, setProgress, clearLabels } = useLocalStorage();

    return (
        <AppContext.Provider value={{
            trivia,
            pages,

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

            fetchFolderMetadata: fetchFolderMetadataAction(pagesDispatch),
            fetchPageContent: fetchPageContentAction(pagesDispatch),
            updatePageContent: updatePageContentAction(pagesDispatch),
            setSelectedPage: setSelectedPageAction(pagesDispatch),

        }}>
            {children}
        </AppContext.Provider>
    )
}