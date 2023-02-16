/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the 
	redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteSelectedPlayer, updateSelectedPlayer } from "../redux/actionCreators/thunks/SelectedPlayer";

export const SelectedPlayer = () => {
	const dispatch = useDispatch();
	const player = useSelector((state) => state.selectedPlayer);

	// Must be AFTER state hooks because of hook rules.
	if (!player.name) return (null);

	// --------- FUNCTIONS ---------
	function deleter() {
		dispatch(deleteSelectedPlayer());
	};
	function updater() {
		dispatch(updateSelectedPlayer(true));
	};

	return (
		<div>
			<h3>Selected Player</h3>
			<div id="selected-player">
				<div className="player-id">{player.id}</div>
				<div id="player-name">{player.name}</div>
				<div id="player-status">
					<label id="checkbox-label">
						<input type="checkbox" id="checkbox" />
						{player.isActive ? "active" : "inactive"}
					<span className="checkmark" />
					</label>
				</div>

				<button className="btn-delete" onClick={deleter}>Delete</button>
				<button className="btn-update" onClick={updater}>Update</button>
			</div>	
		</div>
	);
};
