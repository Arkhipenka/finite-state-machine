class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.fsm=config;
        this.state=this.fsm.initial;
        this._undo=[];
        this._redo=[];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.fsm.states[state]!=null){
            this._undo.push(this.state);
            this.state=state;
            this._redo=[];
        }
        else throw Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
            if(this.fsm.states[this.state].transitions[event]!=null){
                this._undo.push(this.state);
                this.state = this.fsm.states[this.state].transitions[event];
                this._redo=[];
            }
            else throw Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state=this.fsm.initial;
        this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let state = ['normal', 'busy', 'hungry', 'sleeping'];
        if (event != null) {
            let output = [];
            let i = 0;
            while (i < 4) {
                if (this.fsm.states[state[i]].transitions[event] != null) {
                    output.push(state[i]);
                }
                i++;
            }
            return output;
        }
        else return state;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._undo.length>0) {
            this._redo.push(this.state);
            this.state = this._undo[this._undo.length - 1];
            this._undo.pop();
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this._redo.length>0) {
        this._undo.push(this.state);
        this.state = this._redo[this._redo.length - 1];
        this._redo.pop();
        return true;
    }
    else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._redo=[];
        this._undo=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/