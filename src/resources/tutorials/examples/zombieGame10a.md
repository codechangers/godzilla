# 1 Create a Scoreboard
 (Step 1/3)

##### 1. In `game.js` delete the old `getCharacters()` code and ad the new code in the `create()` function.

``` javascript
// File: code/client/src/game.js
	g.getCharacters('players',
	(player) => {
		g.handleLeaderboard('players', 'Scoreboard');
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}},
	(player) => g.handleLeaderboard('players', 'Scoreboard'),
	(id, attr, value) => {
		if (attr == 'filled' && id == 'filled' &&
			value <= 1 && player.id === g.myId()) {
				location.reload();
			}
		g.handleLeaderboard('players', 'Scoreboard');
	});
```
