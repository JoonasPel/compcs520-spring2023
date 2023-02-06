/**
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD2 exercise and add authentication to
 * the app.
 *
 * Backend is still using Basic Auth, so you must use the same logic as in the
 * Vue exercise and include the Authorization header to requests to backend.
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
import React, { useState } from 'react';

// --------- COMPONENT IMPORTS ---------
import { ListPlayers } from './components/ListPlayers.jsx';
import { AddPlayer } from './components/AddPlayer.jsx';
import { SelectedPlayer } from './components/SelectedPlayer.jsx';
import { RequestStatus } from './components/RequestStatus.jsx';
import { AuthUser } from './components/AuthUser.jsx';

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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState("");

	// --------- FUNCTIONS ---------
	//useEffect(() => { fetchPlayers() }, []);
	function fetchPlayers() {
		setReqStatus(REQ_STATUS.loading);
		let credentials = window.btoa('admin' + ':' + 'secret');
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Basic " + credentials
			}
		};
		fetch(URL, requestOptions)
		.then(response => response.json())
		.then(data => setPlayers(data))
		.then(() => { 
			setReqStatus(REQ_STATUS.success); 
		})

		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function fetchPlayer(playerId) {
		setReqStatus(REQ_STATUS.loading);
		let credentials = window.btoa('admin' + ':' + 'secret');
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Basic " + credentials
			}
		};
		fetch(URL + playerId, requestOptions)
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
		let credentials = window.btoa('admin' + ':' + 'secret');
		const requestOptions = {
			method: 'POST',
          	headers: { 
				'Content-Type': 'application/json',
				"Authorization": "Basic " + credentials
			},
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
		let credentials = window.btoa('admin' + ':' + 'secret');
		const requestOptions = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Basic " + credentials
			}
		};
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
		let credentials = window.btoa('admin' + ':' + 'secret');
		const requestOptions = {
			method: 'PUT',
          	headers: { 
				'Content-Type': 'application/json',
				"Authorization": "Basic " + credentials
			},
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

	function registerUser(name, password) {
		setReqStatus(REQ_STATUS.loading);
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				username: name,
				password: password
			})
		};
		fetch("http://localhost:3001/api/users", requestOptions)
		.then((response) => {
			if (response.status == 201) {
				setUsername(name);
				setPassword(password);
				setIsLoggedIn(true);
				fetchPlayers();
				setReqStatus(REQ_STATUS.success);
			} else { setReqStatus(REQ_STATUS.error); }
		})
		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function loginUser(name, password) {
		setReqStatus(REQ_STATUS.loading);
		let credentials = window.btoa('admin' + ':' + 'secret');
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Basic " + credentials
			}
		};
		fetch(URL, requestOptions)
		.then((response) => {
			setPlayers(response.json());
			setUsername(name);
			setPassword(password);
			setIsLoggedIn(true);
			setReqStatus(REQ_STATUS.success);
		})
		.catch((error) => {
			console.log(error);
			setReqStatus(REQ_STATUS.error);
		});
	};

	function logout() {
		console.log("logout");
		setReqStatus(REQ_STATUS.loading);
		setPlayers([]);
		setSelectedPlayer("");
		setUsername("");
		setPassword("");
		setIsLoggedIn("");
	};

	function regOrLogIn(register, name, password) {
		register ? loginUser(name, password) : registerUser(name, password)
	};
	
	return (
		<>
			<AuthUser handleSubmit={regOrLogIn} isLoggedIn={isLoggedIn} handleLogout={logout}/>
			<RequestStatus status={reqStatus} />
			<AddPlayer handleSubmit={addPlayer}/>
			<ListPlayers players={players} selectPlayer={fetchPlayer}/>
			<SelectedPlayer handleDelete={deletePlayer} handleUpdate={updatePlayer} player={selectedPlayer}/>
		</>
	);
}

export default App;
