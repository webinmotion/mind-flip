import { createContext, useContext, useReducer } from "react";
import {
    fetchGamesListingAction, fetchGameInfoAction, fetchProgressionAction, fetchGameLayoutAction,
    fetchGameQuestionAction, fetchGameEngineAction, fetchPlayerByEmailAction, createGameEngineAction,
    updateGameEngineAction, addGameParticipantAction, respondToQuestionAction, fetchParticipantTallyAction,
    updateHighestScoreAction, onGameListingEventsAction, onParticipantEventsAction, onProgressionEventsAction,
    fetchGameParticipantsAction, createGameHandleAction, updateGameStatusAction, deleteGameHandleAction, 
    fetchGameTalliesAction, 
} from './triviaActions';
import { triviaReducer, initialTrivia } from './triviaReducer';
import {
    accountSignUpAction, accountSignInAction, accountSignOutAction, resetPasswordAction, resetVerificationAction,
    registerPlayerAction, registerGuestAction, verifyEmailAddressAction, dropGuestPlayerAction, recoverPasswordAction,
    verifyRecoveryCodeAction,
} from './visitorActions';
import { visitorReducer, initialRegistration, initialAuthentication } from './visitorReducer';
import { showAlertAction, clearAlertAction, } from "./alertActions";
import { alertReducer, initialAlert,  } from './alertReducer';
import { usePageForms } from "../hooks/usePageForms";
import { useLocalState } from "../hooks/useLocalState";
import { useProgression } from '../hooks/useProgression';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {

    // initialize applications forms (for holding and validating input data)
    const { currentRoute, currentView, playerTypeForm, guestEmailForm, signUpForm, signInForm, verificationForm, recoveryForm, selectedGame,
        setCurrentRoute, toggleCurrentView, setPlayerTypeForm, setGuestEmailForm, setSignUpForm, setSignInForm, setVerificationForm,
        setRecoveryForm, setSelectedGame, } = usePageForms();

    //fetch cached state (if it exists)
    const { player: cachedPlayer, registration: cachedRegistration, participant: cachedParticipant,
        authentication: cachedAuthentication, cleanup } = useLocalState({});

    //initialize player state
    const [trivia, triviaDispatch] = useReducer(triviaReducer, {
        ...initialTrivia,
        player: cachedPlayer,
        participant: cachedParticipant,
    });

    //initialize auth state
    const [visitor, visitorDispatch] = useReducer(visitorReducer, {
        registration: {
            ...initialRegistration,
            ...cachedRegistration
        },
        authentication: {
            ...initialAuthentication,
            ...cachedAuthentication
        }
    });

    //initialize alert state
    const [alert, alertDispatch] = useReducer(alertReducer, initialAlert);

    const { progress, showProgress, onProgressBarEvents, } = useProgression();

    return (
        <AppContext.Provider value={{
            //domain entities
            trivia,
            visitor,
            alert,
            progress,

            //app forms and variables
            currentView,
            currentRoute,
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
            fetchGameTallies: fetchGameTalliesAction(triviaDispatch),
            fetchGameParticipants: fetchGameParticipantsAction(triviaDispatch),
            fetchPlayerByEmail: fetchPlayerByEmailAction(triviaDispatch),
            createGameHandle: createGameHandleAction(triviaDispatch),
            updateGameStatus: updateGameStatusAction(triviaDispatch),
            deleteGameHandle: deleteGameHandleAction(triviaDispatch),
            createGameEngine: createGameEngineAction(triviaDispatch),
            updateGameEngine: updateGameEngineAction(triviaDispatch),
            addGameParticipant: addGameParticipantAction(triviaDispatch),
            respondToQuestion: respondToQuestionAction(triviaDispatch),
            fetchParticipantTally: fetchParticipantTallyAction(triviaDispatch),
            updateHighestScore: updateHighestScoreAction(triviaDispatch),

            //trivia events actions
            onGameListingEvents: onGameListingEventsAction(triviaDispatch),
            onParticipantEvents: onParticipantEventsAction(triviaDispatch),
            onProgressionEvents: onProgressionEventsAction(triviaDispatch),

            //account actions
            registerPlayer: registerPlayerAction(visitorDispatch),
            registerGuest: registerGuestAction(visitorDispatch),
            verifyEmailAddress: verifyEmailAddressAction(visitorDispatch),
            dropGuestPlayer: dropGuestPlayerAction(visitorDispatch),
            accountSignUp: accountSignUpAction(visitorDispatch),
            accountSignIn: accountSignInAction(visitorDispatch),
            accountSignOut: accountSignOutAction(visitorDispatch),
            resetPassword: resetPasswordAction(visitorDispatch),
            resetVerification: resetVerificationAction(visitorDispatch),
            recoverPassword: recoverPasswordAction(visitorDispatch),
            verifyRecoveryCode: verifyRecoveryCodeAction(visitorDispatch),

            //alert actions
            showAlert: showAlertAction(alertDispatch),
            clearAlert: clearAlertAction(alertDispatch),

            //toggle progress
            showProgress,

            //progress bar event
            onProgressBarEvents,

            //app form functions
            setCurrentRoute,
            toggleCurrentView,
            setPlayerTypeForm,
            setGuestEmailForm,
            setSignUpForm,
            setSignInForm,
            setVerificationForm,
            setRecoveryForm,
            setSelectedGame,
            cleanupOnSignOut: cleanup,

            //auth functions
            isAuthenticated: () => visitor?.authentication?.accessToken,
        }}>
            {children}
        </AppContext.Provider>
    )
}