/**
 * Student instructions:
 *
 * Use the given props and react logic to create a SelectedPlayer component
 * similar to the SelectedPlayer component in the Vue exercise. Instead of
 * using <template>, use JSX to create the component.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise
 * in the same places to pass the tests. Text content should be the same as in
 * the Vue exercise.
 * 
 * Use react conditional rendering to display the selected player only if the
 * "player" prop is not null or undefined.
 */

export const SelectedPlayer = ({ player }) => {
	if (!player) return (null);

	return (
		<div>
			<h3>Selected Player</h3>
			<div id="selected-player">
				<div id="player-name">{player.name}</div>
				<div id="player-status">{player.isActive ? "active" : "inactive"}</div>
			</div>
		</div>
	);
};
