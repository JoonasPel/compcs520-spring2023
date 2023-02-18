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
    return async function(dispatch) {
        dispatch(setStatus(REQ_STATUS.loading));
        try {
            const response = await fetch(URL);
            if (response.ok) {
                const data = await response.json();
                dispatch(setPlayers(data));
                dispatch(setStatus(REQ_STATUS.success));
            } else {
                dispatch(setStatus(REQ_STATUS.error));
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(REQ_STATUS.error));
        }
    };
};
