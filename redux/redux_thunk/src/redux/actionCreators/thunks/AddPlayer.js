/** @format THUNK*/

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk with dispatch as param
 */
import { setStatus } from "../statusActions";
import { clearSelectedPlayer } from '../selectedPlayerActions';
import { addPlayer } from '../playersActions';
import { REQ_STATUS } from '../../constants';

const URL = "http://localhost:3001/api/players/";

export const postPlayer = (newPlayer) => {
    return function(dispatch) {
        dispatch(setStatus(REQ_STATUS.loading));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name: newPlayer.name, isActive: newPlayer.isActive })
        };
        fetch(URL, requestOptions)
        .then(response => response.json())
        .then(data => { dispatch(addPlayer(data)); })
        .then(() => { dispatch(setStatus(REQ_STATUS.success)); })
        .then(() => { dispatch(clearSelectedPlayer()); })
        .catch((error) => {
            dispatch(setStatus(REQ_STATUS.error));
        });
    };
};
