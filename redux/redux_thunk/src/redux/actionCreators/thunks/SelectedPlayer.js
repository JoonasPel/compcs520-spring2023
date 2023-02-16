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
import { useDispatch } from 'react-redux';
import { setStatus } from "../statusActions";
import { REQ_STATUS } from '../../constants';
import { removePlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';
import { useSelector } from "react-redux";

export const deleteSelectedPlayer = () => {
    return function(dispatch) {
        const player = useSelector((state) => state.selectedPlayer);
        dispatch(setStatus(REQ_STATUS.loading));
        const requestOptions = { method: 'DELETE' };
        fetch(URL + player.id, requestOptions)
        .then(response => response.json())
        .then(data => { dispatch(removePlayer(player.id)); })
        .then(() => { dispatch(setStatus(REQ_STATUS.success)); })
        .then(() => { dispatch(clearSelectedPlayer()); })
        .catch((error) => {
            dispatch(setStatus(REQ_STATUS.error));
        });
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
export const updateSelectedPlayer = (updatedActivity) => {};
