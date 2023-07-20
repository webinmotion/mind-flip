module.exports = class ScoreKeeper {

    constructor(tally = {}) {
        this.tally = tally;
    }

    updateScore(game_id, participant_id, score) {
        if (!this.tally[game_id]) {
            this.tally[game_id] = {};
        }
        if (!this.tally[game_id][participant_id]) {
            this.tally[game_id][participant_id] = score;
        }
        this.tally[game_id][participant_id] += score;
    }

    calcScore() {
        return 1000;
    }

    highestScore(game_id) {
        let participants = this.tally[game_id];
        if (participants) {
            let highest = Math.max(...Object.keys(participants).map(key => participants[key]));
            return Object.keys(participants).map(key => {
                if (participants[key] === highest) {
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

