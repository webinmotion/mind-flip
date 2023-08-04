const express = require('express');
const router = express.Router();
const { 
    fetchGamesListing,
    fetchGamesByOrganizer,
    fetchGameClocks,
    fetchGameInfo,
    fetchGameInfoById,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchQuestionChoices,
    fetchGameEngine,
    fetchGameParticipants,
    fetchParticipantById,
    fetchPlayerByEmail,
    createGameHandle,
    updateGameStatus, 
    deleteGameHandle,
    createGameEngine,
    updateGameEngine,
    addGameParticipant,
    dropGameParticipant,
    fetchParticipantTally,
    fetchGameTallies,
    updateHighestScore,
    updateParticipantAnswer,
    searchQuestions,
    upsertGameClock,
    deleteGameClock,
    fetchRootGameMessages,
    upsertGameMessage,
    deleteGameMessage,
    fetchQuestionsByAuthor,
    upsertGameQuestion,
    deleteGameQuestion,
    upsertQuestionChoices,
    deleteGameChoice,
    upsertGameLayout,
} = require('../handlers/trivia');
const { validateAccessToken } = require('../middleware/authorize');

router.get('/listing', fetchGamesListing);

router.get('/:organizer/listing', fetchGamesByOrganizer);

router.get('/clock', fetchGameClocks);

router.get('/title/:title/organizer/:organizer', validateAccessToken, fetchGameInfo);

router.get('/info/:game', fetchGameInfoById);

router.get('/clock/:clock', fetchProgression);

router.get('/layout/:game', fetchGameLayout);

router.get('/question/:question', fetchGameQuestion);

router.get('/question/:question/choices', fetchQuestionChoices);

router.get('/engine/:game', fetchGameEngine);

router.get('/player/:email', fetchPlayerByEmail);

router.post('/game', validateAccessToken, createGameHandle);

router.put('/game/:game_id', validateAccessToken, updateGameStatus);

router.delete('/game/:game_id', validateAccessToken, deleteGameHandle);

router.post('/engine/:game', validateAccessToken, createGameEngine);

router.put('/engine/:game', validateAccessToken, updateGameEngine);

router.get('/participant/:game', fetchGameParticipants);

router.get('/participant/:participant/details', fetchParticipantById);

router.put('/participant/:game/player/:player', addGameParticipant);

router.delete('/participant/:participant', dropGameParticipant);

router.get('/participant/:participant/score', fetchParticipantTally);

router.get('/game/:game/scores', fetchGameTallies);

router.put('/participant/:participant/highscore/:score', updateHighestScore);

router.post('/game/:game/participant/:participant/question/:question/answer', updateParticipantAnswer);

router.get('/question/search', searchQuestions);

router.post('/clock', upsertGameClock);

router.delete('/clock/:clock_id', deleteGameClock);

router.get('/message', fetchRootGameMessages);

router.post('/message', upsertGameMessage);

router.delete('/message/:message_id', deleteGameMessage);

router.get('/question/author/:author_id', fetchQuestionsByAuthor);

router.post('/question', upsertGameQuestion);

router.delete('/question/:question_id', deleteGameQuestion);

router.post('/question/:question_id/choices', upsertQuestionChoices);

router.delete('/question/choices/:choice_id', deleteGameChoice);

router.post('/layout', upsertGameLayout);

module.exports = router;
