/** @format */

import {
	NEW_NOTIFICATION,
	REMOVE_NOTIFICATION,
} from '../../tests/constants/redux.js';
/**
 * Implement notificationReducer that handles following cases:
 * 1) NEW_NOTIFICATION: adds the new notification to the state.
 * 2) REMOVE_NOTIFICATION: removes the notification.
 * @param {Object} state old state of notification.
 * @param {Object} action the action that calls the reducer.
 * @returns {Object} new state for notification
 */
initialState = { message: '', isSuccess: false };

const notificationReducer = (state = initialState, action) => {
	switch(action.type) {
		case NEW_NOTIFICATION:
			return action.payload;
		case REMOVE_NOTIFICATION:
			// TODO TIMER
			return initialState;
		default:
			return state;
	};
};

export default notificationReducer;
