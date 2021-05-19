# Soccer Game - 7.E

## Add scoring to your game.

**(Step 5/5)** Cause a game over when a player runs out of lives.

### Add a game over.

In `game.js` we need to add another _parameter_ to the **players** `getCharacters` _function_ in the `create` _method_. This new _parameter_ will check to see if the **player** run's out of lives.

```javascript
// File: game.js
// Copy
g.getCharacters('players', (player) => {
	player.sprite.depth = 5;
	if (player.id === g.myId()) {
		g.cameraFollow(player.sprite);
	}
},
() => {},
(id, attr, value) => {
	if (id === g.myId() && attr === 'lives' && value <= 0) {
		location.reload();
	}
});
// End Copy
	g.useStore('The Store', []);
	g.drawBackground('background', 0.8);
	g.getCharacters('players', (player) => {
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	}/*{*/);/*}[*/,
	() => {},
	(id, attr, value) => {
		if (id === g.myId() && attr === 'lives' && value <= 0) {
			location.reload();
		}
	});/*]*/
	g.getCharacters('goals');
	g.getCharacters('soccerBalls');
}
```
