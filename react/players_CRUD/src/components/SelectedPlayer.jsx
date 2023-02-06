/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in
 * the backend.
 *
 * @format
 */

import { useState } from "react";

export const SelectedPlayer = ({ handleDelete, handleUpdate, player }) => {
	// --------- STATE ---------
	const [checked, setChecked] = useState(player.isActive);

	// Must be AFTER state hooks because of hook rules.
	if (!player) return (null);

	// --------- FUNCTIONS ---------
	function deleter() {
		handleDelete(player.id);
	};
	function updater() {
		handleUpdate(player);
	};

	return (
		<div>
			<h3>Selected Player</h3>
			<div id="selected-player">
				<div className="player-id">{player.id}</div>
				<div id="player-name">{player.name}</div>
				<div id="player-status">
					<label id="checkbox-label">
						<input type="checkbox" id="checkbox" 
						checked={checked} onChange={() => setChecked(!checked)}/>
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
