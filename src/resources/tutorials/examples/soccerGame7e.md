# 7. Add Scoring A Goal

Step (5/5) To add scoring to your game.

##### 5. In `game.js` Add a check so we know if the game is over.

```javascript
// File: code/client/src/game.js
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
	g.getCharacters('players', (player) => {
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	}/*[*/,
	() => {},
	(id, attr, value) => {
		if (id === g.myId() && attr === 'lives' && value <= 0) {
			location.reload();
		}
	}/*]*/);
	g.drawBackground('background', 0.8);
```
