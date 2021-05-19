# Soccer Game - 5.D

## Add soccer balls.

**(Step 4/6)** Listen to the soccer balls state on the server.

### Get the soccer balls from the server.

In `game.js` we need to add a `getCharacters` _function_ to the `create` _method_.

```javascript
// File: game.js
// Copy
g.getCharacters('soccerBalls');
// End Copy
	g.useStore('The Store', []);
	g.drawBackground('background', 0.8);
	g.getCharacters('players', (player) => {
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	g.getCharacters('goals');/*[*/
	g.getCharacters('soccerBalls');/*]*/
}
```
