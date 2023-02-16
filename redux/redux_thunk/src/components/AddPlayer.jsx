/** @format
 *
 * Student instructions:
 * Copy contents for this file from the react_redux exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the 
 * redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postPlayer } from "../redux/actionCreators/thunks/AddPlayer";

export const AddPlayer = () => {
	const dispatch = useDispatch();

	// --------- "LOCAL" STATE ---------
	const [name, setName] = useState("");

	// --------- FUNCTIONS ---------
	function submit(event) {
		event.preventDefault();
		dispatch(postPlayer({name: name, isActive: false}));
		
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

