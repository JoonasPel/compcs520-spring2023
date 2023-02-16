/** @format THUNK*/

/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Number | String} id - id of the player
 * @return {Function} - thunk
 */

import { setSelectedPlayer } from "../selectedPlayerActions";
import { REQ_STATUS } from '../../constants';
import { setStatus } from "../statusActions";

const URL = "http://localhost:3001/api/players/";

export const getSelectedPlayer = (id) => {
    return function(dispatch) {
        dispatch(setStatus(REQ_STATUS.loading));
        fetch(URL + id)
        .then(response => response.json())
        .then(data => dispatch(setSelectedPlayer(data)))
        .then(() => { dispatch(setStatus(REQ_STATUS.success)); })
        .catch((error) => {
            dispatch(setStatus(REQ_STATUS.error));
        });
    };
};
