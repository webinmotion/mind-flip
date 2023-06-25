export const initialGameState = {
    info: null,
    completed: false,
    title: null,
    organizer: null,
    participant: null,
    layout: null,
    engine: null,
    player: null,
    ticker: null,
    question: null,
    queIndex: 0,
    listing: [],
    participants: [],
    gameStatus: ['Created', 'Accepting', 'Playing']
}

export default class GameClient {

    constructor(state) {
        this._state = state;
    }

    set state(newState) {
        this._state = newState;
    }

    get state() {
        return this._state;
    }

    async info(info) {
        if (!this._state.info) {
            this._state = { ...this._state, info };
        }
    }

    onContent() {
        const duration = 0; //figure out what value this should be
        if (this._state.engine.progression === 'auto') {
            //TODO - figure out stuff with ticker and game_id
            const handle = setTimeout(async function () {
                await this._state.driver.onNext();
                clearTimeout(handle);
            }.bind(this), duration);
        }
        //log current question
        console.log(`Que ${this._state.engine?.section_index} : ${this._state.question?.que_value}`);
    }
}
