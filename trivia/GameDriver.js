const { fetchGameInfo, fetchGameLayout, fetchGameQuestion, fetchProgression, createGameEngine, updateGameEngine,
    respondToQuestion, updateHighestScore, addGameParticipant, fetchPlayerById } = require('../service/trivia');

module.exports = class GameDriver {

    constructor(studio, subscriber, scorer, start_time = new Date(), progression = 'manual', time_ticker = '2 seconds delay', ticker_delay = 5000, display_duration = 5000) {
        this.gameInfo = null;
        this.gameLayout = null;
        this.gameEngine = null;
        this.gameQuestion = null;
        this.currentCursor = 0;
        this.studio = studio;
        this.scorer = scorer;
        this.subscriber = subscriber;
        this.start_time = start_time;
        this.progression = progression;
        this.time_ticker = time_ticker;
        this.ticker_delay = ticker_delay;
        this.display_duration = display_duration;
    }

    async initialize(title, organizer) {
        //find game info
        this.gameInfo = await fetchGameInfo(title, organizer);
        //find game layout
        this.gameLayout = await fetchGameLayout(this.gameInfo.game_id);
        //create game engine
        this.gameEngine = await createGameEngine(this.gameInfo.game_id,
            {
                scheduled_start: this.start_time,
                progression: this.progression,
                display_duration: this.display_duration,
                time_ticker: this.time_ticker
            });
        //register
        this.studio.register(this);
    }

    async onRegister() {
        if (this.progression === 'auto') {
            //handle auto-progression
            let handle = setTimeout(async function () {
                const { duration, delay, period } = await fetchProgression(this.gameEngine.time_ticker);
                this.subscriber.timeTicker(this.gameInfo.game_id, { duration, delay, period });
                await this.onNext();
                clearTimeout(handle);
            }.bind(this), this.ticker_delay);
        }
        else{
            //handle manual progression
            
        }
    }

    async onNext() {
        //fetch question
        const current = this.gameLayout[this.currentCursor] || null;
        if (current != null) {
            this.gameQuestion = await fetchGameQuestion(current.question_fk);

            //update engine table with new status
            if (this.currentCursor < this.gameLayout.length - 1) {
                const { current_section, section_index } = this.gameLayout[this.currentCursor + 1];
                await updateGameEngine(current.game_fk, { current_section, section_index })
            }

            //notify subscriber of new question
            this.subscriber.onChange(this.gameInfo.game_id, this.gameQuestion, {
                progression: this.gameEngine.progression,
                duration: this.gameEngine.display_duration,
                index: this.currentCursor
            });

            //increment cursor
            this.currentCursor += 1;
        }
        else {
            this.studio.complete(this, "There are no more questions left to continue playing the game");
            this.subscriber.onComplete();
        }
    }

    async onCompletion() {
        //update high scores
        const highest = this.scorer.highestScore(this.gameInfo.game_id);
        for (high of highest) {
            let { participant_id, score } = high;
            await updateHighestScore(this.gameInfo.game_id, participant_id, score);
        }
    }

    async onEnroll(game_id, player_id) {
        const { participant_id } = await addGameParticipant(game_id, player_id);
        const { screen_name } = await fetchPlayerById(player_id);
        return { participant_id, screen_name };
    }

    async onSubmission(participant_id, answer_submitted, clock_remaining) {
        let tally_points = this.scorer.calcScore(this.currentQuestion.que_answer, answer_submitted, clock_remaining);
        await respondToQuestion(participant_id, {
            question_fk: this.currentQuestion.que_id, answer_submitted, clock_remaining, tally_points
        });
        //update local score tally
        this.scorer.updateScore(this.gameInfo.game_id, participant_id, tally_points);
    }
}