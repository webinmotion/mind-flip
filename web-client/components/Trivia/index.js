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
import RegisterOptions from './RegisterOptions';
import { games, gameStatus } from '../../__mocks__/mock-games-listing';

const steps = ['Games Listing', 'Game Details', 'Registration'];

function getStepContent(step, selectedGame, setSelectedGame, playerType, setPlayerType, playerAttributes, setPlayerAttributes) {
  switch (step) {
    case 0:
      return <GamesListing games={games} gameStatus={gameStatus} selectedGame={selectedGame} setSelectedGame={setSelectedGame} />;
    case 1:
      const selectedGameInfo = games.find(game => game.game_info.game_id === selectedGame);
      return <GameDetails {...selectedGameInfo} playerType={playerType} setPlayerType={setPlayerType} />;
    case 2:
      return <RegisterOptions selectedGame={selectedGame} playerType={playerType} playerAttributes={playerAttributes} setPlayerAttributes={setPlayerAttributes} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Trivia({ history }) {

  const [activeStep, setActiveStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState('');
  const [playerType, setPlayerType] = useState('registered');
  const [playerAttributes, setPlayerAttributes] = useState({
    emailAddress: '',
    screenName: '',
    username: '',
    password: '',
    verificationCode: '',
    rememberMe: false,
    accountExists: false,
    recoverPassword: false,
  });

  const handleNext = () => {
    if (steps.length > activeStep + 1) {
      setActiveStep(activeStep + 1);
    }
    else {
      const { game_info } = games.find(game => game.game_info.game_id === selectedGame);
      if (game_info.game_status === 'Playing') {
        history.push(`/playing/${game_info.game_id}`)
      }
      else if (game_info.game_status === 'Accepting') {
        history.push(`/accepting/${game_info.game_id}`)
      }
      else{
        console.log('Game is not accepting or currently playing');
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
          {getStepContent(activeStep, selectedGame, setSelectedGame, playerType, setPlayerType, playerAttributes, setPlayerAttributes)}
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
