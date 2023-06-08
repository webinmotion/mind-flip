export default class GameClient {

    constructor() {
        this.info = null;
        this.completed = false;
        this.title = null;
        this.organizer = null;
        this.participant = null;
        this.layout = null;
        this.engine = null;
        this.player = null;
        this.ticker = null;
        this.question = null;
        this.queIndex = 0;
    }

    async init(info) {
        if (!this.info) {
            this.info = info;
        }
    }

    onContent() {
        if (this.engine.progression === 'auto') {
            //TODO - figure out stuff with ticker and game_id
            const handle = setTimeout(async function () {
                await this.driver.onNext();
                clearTimeout(handle);
            }.bind(this), duration);
        }
        //log current question
        console.log(`Que ${this.engine?.section_index} : ${this.question?.que_value}`);
    }
}
