/**
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to create a new player in the
 * backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks
 * the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks
 * the delete button in the SelectedPlayer component.
 *
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in
 * the same places to pass the tests. Remember to pass in the appropriate props
 * to the child components.
 *
 * BEWARE: The component props may be different from the Vue exercise and the
 * tests will not pass if you use the wrong props.
 *
 * @format
 */

// --------- IMPORTS ---------
import React, { useState, useEffect } from 'react';

// --------- COMPONENT IMPORTS ---------
import { ListPlayers } from './components/ListPlayers.jsx';
import { AddPlayer } from './components/AddPlayer.jsx';
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
		.then(() => { setReqStatus(REQ_STATUS.success); })

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
		.then(() => { setReqStatus(REQ_STATUS.success); })

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function addPlayer(name) {
		setReqStatus(REQ_STATUS.loading);
		const requestOptions = {
			method: 'POST',
          	headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ name: name, isActive: true })
		};
		fetch(URL, requestOptions)
		.then(response => response.json())
		.then(data => setPlayers(oldPlayers => [...oldPlayers, data]))
		.then(() => { setReqStatus(REQ_STATUS.success); })

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function deletePlayer(playerId) {
		setReqStatus(REQ_STATUS.loading);
		const requestOptions = { method: 'DELETE' };
		fetch(URL + playerId, requestOptions)
		.then(() => setPlayers(oldPlayers =>
			oldPlayers.filter(player => player.id !== playerId)))
		.then(() => { 
			setSelectedPlayer("");
			setReqStatus(REQ_STATUS.success); 
		})

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function updatePlayer(playerData) {
		setReqStatus(REQ_STATUS.loading);
		const requestOptions = {
			method: 'PUT',
          	headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ isActive: !playerData.isActive })
		};
		fetch(URL + playerData.id, requestOptions)
		.then(response => response.json())
		.then(data => {
			setSelectedPlayer(data);
			// finds players index in list and updates the player using that index
			let index = players.findIndex(pl => pl.id === data.id);
			setPlayers(oldPlayers => {
				return [...oldPlayers.slice(0, index), data, ...oldPlayers.slice(index + 1)]
			});
		})
		.then(() => { setReqStatus(REQ_STATUS.success); })

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	return (
		<>
			<RequestStatus status={reqStatus} />
			<AddPlayer handleSubmit={addPlayer}/>
			<ListPlayers players={players} selectPlayer={fetchPlayer}/>
			<SelectedPlayer handleDelete={deletePlayer} handleUpdate={updatePlayer} player={selectedPlayer}/>
		</>
	);
}

export default App;
