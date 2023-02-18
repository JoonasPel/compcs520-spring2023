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
    return async function(dispatch) {
        dispatch(setStatus(REQ_STATUS.loading));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name: newPlayer.name, isActive: newPlayer.isActive })
        };
        try {
            const response = await fetch(URL, requestOptions);
            if (response.ok) {
                const data = await response.json();
                dispatch(addPlayer(data));
                dispatch(clearSelectedPlayer());
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
