/** @format THUNK*/

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */

import { setPlayers } from '../playersActions';
import { REQ_STATUS } from '../../constants';
import { setStatus } from "../statusActions";

const URL = "http://localhost:3001/api/players/";

export const getPlayers = () => {
    return function(dispatch) {
        dispatch(setStatus(REQ_STATUS.loading));
        fetch(URL)
        .then(response => response.json())
        .then(data => dispatch(setPlayers(data)))
        .then(() => { dispatch(setStatus(REQ_STATUS.success)); })
        .catch((error) => {
            dispatch(setStatus(REQ_STATUS.error));
        });
    };
};
