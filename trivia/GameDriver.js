const {
    fetchGameInfoById,
    fetchGameLayout,
    fetchGameQuestion,
    updateGameEngine,
    fetchGamePlacards,
    respondToQuestion,
    updateHighestScore,
    addGameParticipant,
    fetchPlayerById,
    fetchGameEngine,
    fetchQuestionChoices,
    updateGameStatus
} = require('../service/trivia');

module.exports = class GameDriver {

    constructor(studio, scorer, game_id, start_time = new Date()) {
        this.gameInfo = null;
        this.gameLayout = null;
        this.gameEngine = null;
        this.gameQuestion = null;
        this.questionChoices = [];
        this.currentCursor = 0;
        this.gamePlacards = null;
        this.placardCursor = 0;
        this.studio = studio;
        this.scorer = scorer;
        this.game_id = game_id;
        this.start_time = start_time;
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
                console.log('placard content', placard);

                //increment cursor
                this.placardCursor += 1;

                //if end of placards, reset the variable
                if (!placard.followed_by) {
                    this.gamePlacards = null;
                    this.placardCursor = 0;
                }
            } else {
                this.gameQuestion = await fetchGameQuestion(current.question_fk);

                //fetch choices is they are required
                if (this.gameQuestion.has_choices) {
                    this.questionChoices = await fetchQuestionChoices(current.question_fk);
                }

                //update engine table with new cursor
                if (this.currentCursor < this.gameLayout.length - 1) {
                    const {current_section, section_index} = this.gameLayout[this.currentCursor + 1];
                    await updateGameEngine(current.game_fk, {current_section, section_index})
                }

                //notify subscribers of new question
                this.studio.nextQuestion(this.game_id, {
                    ...this.gameQuestion,
                    round: this.gameLayout[this.currentCursor].current_section,
                    number: this.gameLayout[this.currentCursor].content_label,
                    choices: this.questionChoices,
                    progression: this.gameEngine.progression,
                    delay: this.gameEngine.pre_countdown_delay,
                    duration: this.gameEngine.countdown_duration,
                    interval: 100,
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

    async onAnswer({game_id, player_id, question_id, answer_submitted}) {
        // let tally_points = this.scorer.calcScore(this.currentQuestion.que_answer, answer_submitted, clock_remaining);
        // await respondToQuestion(participant_id, {
        //     question_fk: this.currentQuestion.que_id, answer_submitted, clock_remaining, tally_points
        // });
        // //update local score tally
        // this.scorer.updateScore(this.game_id, participant_id, tally_points);
        console.log('{game_id, player_id, question_id, answer_submitted }', game_id, player_id, question_id, answer_submitted);
    }

    async onCompleted() {
        //update high scores
        const highest = this.scorer.highestScore(this.game_id);
        for (let high of highest) {
            let {participant_id, score} = high;
            // await updateHighestScore(this.game_id, participant_id, score);
            console.log(participant_id, score);
        }
        console.log("sample game completed");
    }

    async onEnroll(game_id, player_id) {
        const {participant_id} = await addGameParticipant(game_id, player_id);
        const {screen_name} = await fetchPlayerById(player_id);
        return {participant_id, screen_name};
    }
}