import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GamesListing from './GamesListing';
import GameDetails from './GameDetails';
import Registration from '../Registration';
import { ViewNames } from '../../hooks/usePageForms';

const steps = ['Games Listing', 'Game Details', 'Registration'];

function getStepContent({ games, gameStatus, step, selectedGame, setSelectedGame, playerTypeForm, setPlayerTypeForm, }) {
  switch (step) {
    case 0:
      return <GamesListing
        games={games}
        gameStatus={gameStatus}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame} />;
    case 1:
      const selectedGameInfo = games.find(game => game.game_info.game_id === selectedGame);
      return <GameDetails
        {...selectedGameInfo}
        playerType={playerTypeForm.value}
        setPlayerType={value => {
          setPlayerTypeForm(type => ({ ...type, value }));
        }} />;
    case 2:
      return <Registration playerType={playerTypeForm.value} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Trivia({ trivia, history, playerTypeForm, selectedGame, signInForm, signUpForm, recoveryForm, setSelectedGame, setPlayerTypeForm, currentView, guestEmailForm, showAlert, }) {

  const { listing: games, gameStatus } = trivia;
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (steps.length > activeStep + 1) {
      if (activeStep === 0 && !selectedGame) {
        showAlert({ message: 'You should select a game before proceeding', severity: 'error', autoClose: true });
        return;
      }
      setActiveStep(activeStep + 1);
    }
    else if(playerTypeForm.value === 'guest' && guestEmailForm?.email_address.value && !guestEmailForm?.verified){
      showAlert({ message: 'You should verify the guest email before proceeding', severity: 'error', autoClose: true });
      return;
    }
    else if(playerTypeForm.value === 'registered' && currentView[ViewNames.SIGNIN_VIEW] && (!signInForm?.username.value && !signInForm?.password.value)){
      showAlert({ message: 'You should sign in before proceeding', severity: 'error', autoClose: true });
      return;
    }
    else if(playerTypeForm.value === 'registered' && currentView[ViewNames.SIGNUP_VIEW] && (!signUpForm?.email_address.value && !signUpForm?.screen_name.value && !signUpForm?.username.value && !signUpForm?.password.value)){
      showAlert({ message: 'You should sign up before proceeding', severity: 'error', autoClose: true });
      return;
    }
    else if(playerTypeForm.value === 'registered' && currentView[ViewNames.RECOVERY_VIEW] && !recoveryForm?.email_address.value){
      showAlert({ message: 'You should submit a recovery email before proceeding', severity: 'error', autoClose: true });
      return;
    }
    else {
      const { game_info } = games.find(game => game.game_info.game_id === selectedGame);
      const { participant } = trivia;
      if (game_info.game_status === 'Playing') {
        history.push(`/playing/${game_info.game_id}/player/${participant.player_id}`)
      }
      else if (game_info.game_status === 'Accepting') {
        history.push(`/accepting/${game_info.game_id}/player/${participant.player_id}`)
      }
      else {
        showAlert({ message: 'Game is not accepting participants or currently playing', severity: 'warning', autoClose: true });
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        Secure your spot
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {
        <React.Fragment>
          {getStepContent({
            games, gameStatus, step: activeStep, selectedGame, setSelectedGame, playerTypeForm, setPlayerTypeForm,
          })}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'I am ready' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      }
    </Paper>
  )
}
