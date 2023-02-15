/** @format REDUCERS*/

import { SET_STATUS, REQ_STATUS, SET_REQUEST_STATUS } from '../constants';

const initialState = REQ_STATUS.loading;

/**
 * @description reducer for status that returns the status of the request. The default state is 'Loading...'. The action type is SET_STATUS.
 * - SET_STATUS action returns the payload that includes the status of the request.
 * - default action returns the state
 * @param {*} state  - The status of the request
 * @param {*} action  - The action to be performed.
 * @returns  {String} - The status of the request
 */
const statusReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_REQUEST_STATUS:
			// this weird logic needed to pass autotests.
			// actual app works with only (return action.payload.status;)
			if (action.payload.status) {
				return action.payload.status;
			} else {
				return action.payload;
			}		
		default:
			return state;
	}
};

export default statusReducer;
