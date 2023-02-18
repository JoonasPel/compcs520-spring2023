/** @format THUNK*/

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */
import { setStatus } from "../statusActions";
import { REQ_STATUS } from '../../constants';
import { removePlayer, updatePlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';
import store from '../../store';

const URL = "http://localhost:3001/api/players/";

export const deleteSelectedPlayer = () => {
    return async function(dispatch) {
        const state = store.getState();
        const playerId = state.selectedPlayer.id;

        dispatch(setStatus(REQ_STATUS.loading));
        const requestOptions = { method: 'DELETE' };
        try {
            const response = await fetch(URL + playerId, requestOptions);
            if (response.ok) {
                const data = await response.json();
                dispatch(removePlayer(data.id)); // id should be same as playerId but just in case.
                dispatch(setStatus(REQ_STATUS.success));
                dispatch(clearSelectedPlayer());
            } else {
                dispatch(setStatus(REQ_STATUS.error));
            }            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(REQ_STATUS.error));
        }       
    };
};

/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (updatedActivity) => {
    return async function(dispatch) {
        const state = store.getState();
        const playerId = state.selectedPlayer.id;

        dispatch(setStatus(REQ_STATUS.loading));
        const requestOptions = {
			method: 'PUT',
          	headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ isActive: updatedActivity })
		};
        try {
            const response = await fetch(URL + playerId, requestOptions);
            if (response.ok) {
                const data = await response.json();
                dispatch(updatePlayer(data));
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
