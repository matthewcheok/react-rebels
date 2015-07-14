import {Dispatcher} from 'flux';

class CentralDispatcher extends Dispatcher {
	constructor() {
		super();
	}

	dispatchAction(type, payload) {
		this.dispatch({
		  source: type,
		  payload: payload
		});
	}
}

export default new CentralDispatcher();
