/** @format */

import { INIT_AUTH, REMOVE_AUTH } from '../../tests/constants/redux.js';

/**
 * Implement authReducer that handles following cases:
 * 1) INIT_AUTH: returns the actions payload
 * 2) REMOVE_AUTH: replaces current auth details with guest-role.
 * @param {Object} state old state of auth.
 * @param {Object} action the action that calls the reducer.
 * @returns {Object} new state for auth
 */
const initialState = {role : 'guest'};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_AUTH:
            return action.payload;
        case REMOVE_AUTH:
            return { role: 'guest' };
        default:
            return state;
    };
};

export default authReducer;
