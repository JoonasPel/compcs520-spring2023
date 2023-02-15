/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */

import { useSelector } from "react-redux";
import { ListPlayer } from './ListPlayer';

export const ListPlayers = ({ selectPlayer }) => {
  const players = useSelector((state) => state.players)

  if (!players) return (
  <div>
    <h2>List of players</h2>
    <ul id="players-list">
    </ul>
  </div>
  );

	return (
		<div>
			<h2>List of players</h2>
			<ul id="players-list">
				{players.map(player => {
					return <ListPlayer key={player.id} name={player.name} id={player.id} onClick={selectPlayer}/>
				})}
			</ul>
		</div>
	);
};
