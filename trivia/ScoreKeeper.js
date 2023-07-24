function nonScoringStrategy() {
    return 0;
}

function closestBuNotOver({maxPoints, expectedAnswer, actualAnswer}) {
    if (actualAnswer > expectedAnswer) {
        return 0;
    }
    if (actualAnswer === expectedAnswer) {
        return maxPoints;
    }
    const diff = expectedAnswer - actualAnswer;
    if (diff < (10 / 100 * expectedAnswer)) {
        return 0;
    }
    return ((expectedAnswer - diff) / expectedAnswer) * maxPoints;

}

function clockCountdown({timeRemaining, pointsRemaining, expectedAnswer, actualAnswer}) {
    if (timeRemaining > 0 && actualAnswer === expectedAnswer) {
        return pointsRemaining;
    }
    return 0;
}

function exactMatchExpected({maxPoints, expectedAnswer, actualAnswer}) {
    if (actualAnswer === expectedAnswer) {
        return maxPoints;
    }
    return 0;
}

class ScoreKeeper {

    constructor() {
        this.tally = {};
        this.strategy = {
            NON_SCORING_STRATEGY: nonScoringStrategy,
            CLOSEST_BUT_NOT_OVER: closestBuNotOver,
            CLOCK_COUNTDOWN: clockCountdown,
            EXACT_MATCH_EXPECTED: exactMatchExpected,
        }
    }

    updateScore(game_id, participant_id, question_id, score) {
        if (!this.tally[game_id]) {
            this.tally[game_id] = {};
        }
        if (!this.tally[game_id][participant_id]) {
            this.tally[game_id][participant_id] = {};
        }
        this.tally[game_id][participant_id][question_id] = score;
    }

    summaryScores(game_id) {
        let participants = this.tally[game_id];
        if (participants) {
            return Object.entries(participants).reduce((acc, [key, value]) => {
                acc[key] = Object.values(value).reduce((sum, curr) => {
                    sum += (curr ? Number(curr) : 0);
                    return sum;
                }, 0);
                return acc;
            }, {});
        }
        return {};
    }

    highestScore(summary) {
        if (summary) {
            let highest = Math.max(...Object.values(summary));

            return Object.keys(summary).map(key => {
                if (summary[key] === highest) {
                    return ({
                        participant_id: key,
                        score: highest
                    })
                }
            }).filter(o => o !== undefined || true)
        }
        return [];
    }
}

module.exports = ScoreKeeper;
