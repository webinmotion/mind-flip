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
    accountSignUpAction, accountSignInAction, accountSignOutAction, resetPasswordAction, resetVerifictionAction,
    registerPlayerAction, registerGuestAction, verifyEmailAddressAction, dropGuestPlayerAction, recoverPasswordAction,
    verifyRecoveryCodeAction,
} from './prospectActions';
import { prospectReducer, initialRegistration, initialAuthentication } from './prospectReducer';
import { showAlertAction, clearAlertAction, showProgressAction, clearProgressAction } from "./alertActions";
import { alertReducer, initialAlert, progressReducer, initialProgress, } from './alertReducer';
import { usePageForms } from "../hooks/usePageForms";
import { useLocalState } from "../hooks/useLocalState";

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
    const [prospect, prospectDispatch] = useReducer(prospectReducer, {
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

    //initialize progress indicator state
    const [progress, progressDispatch] = useReducer(progressReducer, initialProgress);

    return (
        <AppContext.Provider value={{
            //domain entities
            trivia,
            prospect,
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
            registerPlayer: registerPlayerAction(prospectDispatch),
            registerGuest: registerGuestAction(prospectDispatch),
            verifyEmailAddress: verifyEmailAddressAction(prospectDispatch),
            dropGuestPlayer: dropGuestPlayerAction(prospectDispatch),
            accountSignUp: accountSignUpAction(prospectDispatch),
            accountSignIn: accountSignInAction(prospectDispatch),
            accountSignOut: accountSignOutAction(prospectDispatch),
            resetPassword: resetPasswordAction(prospectDispatch),
            resetVerification: resetVerifictionAction(prospectDispatch),
            recoverPassword: recoverPasswordAction(prospectDispatch),
            verifyRecoveryCode: verifyRecoveryCodeAction(prospectDispatch),

            //alert actions
            showAlert: showAlertAction(alertDispatch),
            clearAlert: clearAlertAction(alertDispatch),

            //progress bar actions
            showProgress: showProgressAction(progressDispatch),
            clearProgress: clearProgressAction(progressDispatch),

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
            isAuthenticated: () => prospect?.authentication?.accessToken,
        }}>
            {children}
        </AppContext.Provider>
    )
}