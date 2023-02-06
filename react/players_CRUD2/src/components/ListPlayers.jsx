/**
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise.
 */

// --------- COMPONENT IMPORTS ---------
import { ListPlayer } from './ListPlayer';

export const ListPlayers = ({ players, selectPlayer }) => {
	if (players == []) return (null);

	return (
		<div>
			<h2>List of players</h2>
			<ul id="players-list">
				{players.map(player => {
					return <ListPlayer key={player.id} name={player.name}
					id={player.id} onClick={selectPlayer}/>
				})}
			</ul>
		</div>
	);
};
