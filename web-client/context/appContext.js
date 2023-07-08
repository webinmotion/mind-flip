import { createContext, useContext, useReducer } from "react";
import {
    fetchGamesListingAction, fetchGameInfoAction, fetchProgressionAction, fetchGameLayoutAction,
    fetchGameQuestionAction, fetchGameEngineAction, fetchPlayerByEmailAction, createGameEngineAction,
    updateGameEngineAction, addGameParticipantAction, respondToQuestionAction, fetchCumulativeTallyAction,
    updateHighestScoreAction, onGameListingEventsAction, onParticipantEventsAction, onGameStartingEventAction,
    fetchGameParticipantsAction, onNextQuestionEventAction
} from './triviaActions';
import { triviaReducer } from './triviaReducer';
import {
    accountSignUpAction, accountSignInAction, accountSignOutAction, resetPasswordAction, resetVerifictionAction,
    registerPlayerAction, registerGuestAction, verifyEmailAddressAction, dropGuestPlayerAction, recoverPasswordAction,
} from './accountActions';
import { accountReducer, initialAccount } from './accountReducer';
import { showAlertAction, clearAlertAction } from "./alertActions";
import { alertReducer, initialAlert } from './alertReducer';
import GameClient, { initialGameState } from './GameClient';
import useAppOptions from "./useAppOptions";
import useLocalState from "../hooks/useLocalState";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {

    const { globals, playerTypeForm, guestEmailForm, signUpForm, signInForm, verificationForm, recoveryForm, selectedGame,
        setAuth, setRoute, setPlayerTypeForm, setGuestEmailForm, setSignUpForm, setSignInForm, setVerificationForm,
        setRecoveryForm, setSelectedGame } = useAppOptions();
    const initialValues = useLocalState({trivia: initialGameState, account: initialAccount, alert: initialAlert});

    //initialize application state
    const [trivia, triviaDispatch] = useReducer(triviaReducer, initialValues.trivia);
    const [account, accountDispatch] = useReducer(accountReducer, initialValues.account);
    const [alert, alertDispatch] = useReducer(alertReducer, initialValues.alert);

    return (
        <AppContext.Provider value={{
            //domain entities
            trivia,
            account,
            alert,
            gameClient: new GameClient(trivia),

            //app forms and variables
            globals,
            playerTypeForm,
            guestEmailForm,
            signUpForm,
            signInForm,
            verificationForm,
            recoveryForm,
            selectedGame,

            //trivia actions
            fetchGamesListing: fetchGamesListingAction(triviaDispatch),
            fetchGameInfo: fetchGameInfoAction(triviaDispatch),
            fetchProgression: fetchProgressionAction(triviaDispatch),
            fetchGameLayout: fetchGameLayoutAction(triviaDispatch),
            fetchGameQuestion: fetchGameQuestionAction(triviaDispatch),
            fetchGameEngine: fetchGameEngineAction(triviaDispatch),
            fetchGameParticipants: fetchGameParticipantsAction(triviaDispatch),
            fetchPlayerByEmail: fetchPlayerByEmailAction(triviaDispatch),
            createGameEngine: createGameEngineAction(triviaDispatch),
            updateGameEngine: updateGameEngineAction(triviaDispatch),
            addGameParticipant: addGameParticipantAction(triviaDispatch),
            respondToQuestion: respondToQuestionAction(triviaDispatch),
            fetchCumulativeTally: fetchCumulativeTallyAction(triviaDispatch),
            updateHighestScore: updateHighestScoreAction(triviaDispatch),

            //trivia events actions
            onGameListingEvents: onGameListingEventsAction(triviaDispatch),
            onParticipantEvents: onParticipantEventsAction(triviaDispatch),
            onGameStartingEvent: onGameStartingEventAction(triviaDispatch),
            onNextQuestionEvent: onNextQuestionEventAction(triviaDispatch),

            //account actions
            registerPlayer: registerPlayerAction(accountDispatch),
            registerGuest: registerGuestAction(accountDispatch),
            verifyEmailAddress: verifyEmailAddressAction(accountDispatch),
            dropGuestPlayer: dropGuestPlayerAction(accountDispatch),
            accountSignUp: accountSignUpAction(accountDispatch),
            accountSignIn: accountSignInAction(accountDispatch),
            accountSignOut: accountSignOutAction(accountDispatch),
            resetPassword: resetPasswordAction(accountDispatch),
            resetVerification: resetVerifictionAction(accountDispatch),
            recoverPassword: recoverPasswordAction(accountDispatch),

            //alert actions
            showAlert: showAlertAction(alertDispatch),
            clearAlert: clearAlertAction(alertDispatch),

            //app options functions
            setAuth,
            setRoute,
            setPlayerTypeForm,
            setGuestEmailForm,
            setSignUpForm,
            setSignInForm,
            setVerificationForm,
            setRecoveryForm,
            setSelectedGame,
            cleanupOnSignOut: initialValues.cleanup,
        }}>
            {children}
        </AppContext.Provider>
    )
}