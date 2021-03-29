# handleLeaderboard()

This method will show the lives, names, and scores of a specific type of character on a leaderboard.

## Parameters

**type**: `string` - The type of characters that the leaderboard is for.

**title**: `string` - What you want the leaderboard to say on it.

## Returns

**Nothing**

## Usage

You should use this method if you want to set up a leaderboard for your game.

# Examples

### Example 1

```
// File: code/client/src/game.js
create() {
	...
	g.getCharacters(
		'players',
		(player, data) => {
			g.handleLeaderboard('players', 'Scoreboard');
		}, // onAdd
		(id) => g.handleLeaderboard('players', 'Scoreboard'), // onRemove
		(id, attr, value) => {
			g.handleLeaderboard('players', 'Scoreboard');
		} // onUpdate
	);
}
```
