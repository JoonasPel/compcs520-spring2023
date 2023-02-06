/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise
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
