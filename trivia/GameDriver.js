const {
    fetchGameInfoById,
    fetchGameLayout,
    fetchGameQuestion,
    updateGameEngine,
    fetchGamePlacards,
    addGameParticipant,
    fetchPlayerById,
    fetchGameEngine,
    fetchQuestionChoices,
    updateGameStatus,
    saveResponseToQuestion,
} = require('../service/trivia');
const GameClock = require('./GameClock');

module.exports = class GameDriver {

    constructor(game_id, studio, scorer) {
        this.gameInfo = null;
        this.gameLayout = null;
        this.gameEngine = null;
        this.gamePlacards = null;
        this.currentCursor = 0;
        this.placardCursor = 0;
        this.studio = studio;
        this.scorer = scorer;
        this.game_id = game_id;
        this.clockRunning = false;
        this.gameClock = new GameClock();
    }

    async initialize() {
        //fetch game info
        this.gameInfo = await fetchGameInfoById(this.game_id);
        //fetch game layout
        this.gameLayout = await fetchGameLayout(this.game_id);
        //fetch game engine
        this.gameEngine = await fetchGameEngine(this.game_id);
        //register
        this.studio.register(this);
        //start the clock on this game if server_push_mode is true
        if (this.gameEngine?.server_push_mode) {
            this.clockRunning = true;
            await this.startTheClock();
        }
    }

    async startTheClock() {
        while (this.clockRunning) {
            await this.gameClock.pause();
            console.log('onto next() after %d millis pause', this.gameClock.delay);
            await this.onNext();
        }
        console.log('exiting game clock');
    }

    async onRegistered() {
        console.log(`game driver for "${this.gameInfo.game.title}" has been registered`);
        await updateGameStatus(this.game_id, "Accepting");
    }

    async onNext() {
        //fetch question
        const current = this.gameLayout[this.currentCursor] || null;
        if (current != null) {

            //check if placards are coming up
            if (this.gamePlacards) {
                const placard = this.gamePlacards[this.placardCursor];

                //set delay in game clock
                const pre_countdown_delay = 5000;
                const countdown_duration = placard.display_duration;
                const countdown_interval = 500;
                const post_countdown_delay = 5000;
                this.gameClock.delay = (pre_countdown_delay + countdown_duration + post_countdown_delay);

                //notify subscribers of new content
                this.studio.nextPlacard(this.game_id,
                    placard,
                    this.gameEngine.progression,
                    {
                        show: true,
                        type: "placard",
                        points: 0,
                        number: this.placardCursor,
                        pre_delay: pre_countdown_delay,
                        duration: countdown_duration,
                        interval: countdown_interval,
                        post_delay: post_countdown_delay,
                    });

                //increment cursor
                this.placardCursor += 1;

                //if end of placards, reset the variable
                if (!placard.followed_by) {
                    this.gamePlacards = null;
                    this.placardCursor = 0;
                }
            } else {
                const gameQuestion = await fetchGameQuestion(current.question_fk);

                //fetch choices is they are required
                const questionChoices = gameQuestion.has_choices ?
                    await fetchQuestionChoices(current.question_fk) : [];

                //update engine table with new cursor
                if (this.currentCursor < this.gameLayout.length - 1) {
                    const {current_section, section_index} = this.gameLayout[this.currentCursor + 1];
                    await updateGameEngine(current.game_fk, {current_section, section_index})
                }

                //set delay in game clock
                const {
                    pre_countdown_delay,
                    countdown_duration,
                    countdown_interval,
                    post_countdown_delay
                } = this.gameEngine;
                this.gameClock.delay = (pre_countdown_delay + countdown_duration + post_countdown_delay);

                //notify subscribers of new question
                this.studio.nextQuestion(this.game_id, {
                        ...gameQuestion,
                        round: this.gameLayout[this.currentCursor].current_section,
                        number: this.gameLayout[this.currentCursor].content_label,
                        score_strategy: this.gameLayout[this.currentCursor].score_strategy,
                        choices: questionChoices,
                        countdown_duration,
                    },
                    this.gameEngine.progression,
                    {
                        show: true,
                        type: "question",
                        points: gameQuestion.max_points,
                        number: this.currentCursor,
                        pre_delay: pre_countdown_delay,
                        duration: countdown_duration,
                        interval: countdown_interval,
                        post_delay: post_countdown_delay,
                    });

                //increment cursor
                this.currentCursor += 1;

                //if there are placards coming up, pull them in
                if (current.placard_fk) {
                    this.gamePlacards = await fetchGamePlacards(current.placard_fk);
                }
            }
        } else {
            this.studio.complete(this, "There are no questions available to continue playing the game");
        }
    }

    async onAnswer(game_id, participant_id, question_id, {
        score_strategy,
        expected_answer,
        answer_submitted,
        display_duration,
        max_points,
        time_remaining,
        points_remaining,
    }) {
        //calculate points for storage
        const scoreStrategy = this.scorer.strategy[score_strategy];
        let tally_points = scoreStrategy({
            expectedAnswer: expected_answer,
            actualAnswer: answer_submitted,
            maxTime: display_duration,
            maxPoints: max_points,
            timeRemaining: time_remaining,
            pointsRemaining: points_remaining,
        });

        let result = await saveResponseToQuestion(participant_id, question_id, {
            answer_submitted,
            clock_remaining: time_remaining,
            tally_points,
        });

        console.log('result from saving response to answer', result);

        this.scorer.updateScore(game_id, participant_id, question_id, tally_points);

        //prepare response
        const summaryScores = this.scorer.summaryScores(game_id);
        return ({
            summaryScores,
            highestScore: this.scorer.highestScore(summaryScores),
        });
    }

    async onCompleted() {
        this.clockRunning = false;
        //update high scores
        const highest = this.scorer.highestScore(this.game_id);
        for (let high of highest) {
            let {participant_id, score} = high;
            // await updateHighestScore(this.game_id, participant_id, score);
            console.log(participant_id, score);
        }
        console.log("Driver completed running game layout");
    }

    async onEnroll(game_id, player_id) {
        const {participant_id} = await addGameParticipant(game_id, player_id);
        const {screen_name} = await fetchPlayerById(player_id);
        return {participant_id, screen_name};
    }
}