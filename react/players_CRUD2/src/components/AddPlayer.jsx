/**
 * Copy paste your code from the AddPlayer.vue file here from the previous exercise
 */

import { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
	// --------- STATE ---------
	const [name, setName] = useState("");

	// --------- FUNCTIONS ---------
	function submit(event) {
		event.preventDefault();
		handleSubmit(name);
	};
	function change(v) {
		setName(v.target.value);
	};

	return (
		<div>
			<h3>Add Player</h3>
			<form id="submit-player" onSubmit={submit}>
				<input id="input-player" type="text" value={name}
				onChange={change} placeholder="Write Player Name Here!"/>
				<input className="btn-add" type="submit" value="Add Player :)" />
			</form>		
		</div>
	);
};
