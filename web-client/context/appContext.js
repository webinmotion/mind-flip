import { createContext, useContext, useReducer } from "react";
import {
    fetchGamesListingAction, fetchGameInfoAction, fetchProgressionAction, fetchGameLayoutAction,
    fetchGameQuestionAction, fetchGameEngineAction, fetchPlayerByEmailAction, createGameEngineAction,
    updateGameEngineAction, addGameParticipantAction, updatePointsTallyAction, fetchCummulativeTallyAction,
    updateHighestScoreAction, onGameListingEventsAction, onParticipantEventsAction, fetchGameParticipantsAction,
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

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {

    const { globals, playerTypeForm, guestEmailForm, signUpForm, signInForm, verificationForm, recoveryForm,
        setAuth, setRoute, setPlayerTypeForm, setGuestEmailForm, setSignUpForm, setSignInForm, setVerificationForm,
        setRecoveryForm } = useAppOptions();
    const [trivia, triviaDispatch] = useReducer(triviaReducer, initialGameState);
    const [account, accountDispatch] = useReducer(accountReducer, initialAccount);
    const [alert, alertDispatch] = useReducer(alertReducer, initialAlert);

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
            updatePointsTally: updatePointsTallyAction(triviaDispatch),
            fetchCummulativeTally: fetchCummulativeTallyAction(triviaDispatch),
            updateHighestScore: updateHighestScoreAction(triviaDispatch),

            //trivia events actions
            onGameListingEvents: onGameListingEventsAction(triviaDispatch),
            onParticipantEvents: onParticipantEventsAction(triviaDispatch),

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
        }}>
            {children}
        </AppContext.Provider>
    )
}