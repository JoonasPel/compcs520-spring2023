/**
 * Student instructions:
 * Use the given template with props to create AddPlayer component similar to
 * the AddPlayer component in the Vue exercise. Instead of using <template>,
 * use JSX.
 *
 * "handleSubmit" prop is a function that will be called when the form is
 * submitted.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in
 * the same places to pass the tests.
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
