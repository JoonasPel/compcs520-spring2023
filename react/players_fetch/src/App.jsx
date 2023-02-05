/** 
 * Student instructions:
 *
 * Use the provided components to create a React app that fetches players from
 * the provided API and displays them in a list when the App is first rendered.
 * When a player is clicked in the list, fetch that player and display it in the
 * selected player section. Give ListPlayer a function as its selectPlayer prop:
 * it is used to fetch a specific player and should take a player id as its only
 * argument.
 *
 * You can use the Vue exercise players_fetch as a reference and inspiration.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue
 * exercise in the same places to pass the tests. Remember to pass in the
 * appropriate props to the child components.
 *
 * BEWARE: The component props may be different from the Vue exercise
 * and the tests will not pass if you use the wrong props.
 *
 * Hint: Use the provided REQ_STATUS object to update the request status when
 * necessary. "loading" for when the request is in progress, "success" for when
 * the request is successful, and "error" for when the request has failed.
 */

// --------- IMPORTS ---------
import React, { useState, useEffect } from 'react';

// --------- COMPONENT IMPORTS ---------
import { ListPlayers } from './components/ListPlayers.jsx';
import { SelectedPlayer } from './components/SelectedPlayer.jsx';
import { RequestStatus } from './components/RequestStatus.jsx';

// --------- CONST VALUES ---------
const REQ_STATUS = {
	loading: 'Loading...',
	success: 'Finished!',
	error: 'An error has occurred!!!',
};
const URL = "http://localhost:3001/api/players/";


//const context = React.createContext('testingc');

function App() {
	// --------- STATE ---------
	const [reqStatus, setReqStatus] = useState(REQ_STATUS.loading);
	const [players, setPlayers] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState("");

	// --------- FUNCTIONS ---------
	useEffect(() => { fetchPlayers() }, []);

	function fetchPlayers() {
		setReqStatus(REQ_STATUS.loading);
		fetch(URL)
		.then(response => response.json())
		.then(data => setPlayers(data))
		.then(setReqStatus(REQ_STATUS.success))

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function fetchPlayer(playerId) {
		setReqStatus(REQ_STATUS.loading);
		fetch(URL + playerId)
		.then(response => response.json())
		.then(data => setSelectedPlayer(data))
		.then(setReqStatus(REQ_STATUS.success))

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	return (
		<>
			<RequestStatus status={reqStatus} />
			<ListPlayers players={players} selectPlayer={fetchPlayer}/>
			<SelectedPlayer player={selectedPlayer}/>
		</>
	);
}

export default App;
