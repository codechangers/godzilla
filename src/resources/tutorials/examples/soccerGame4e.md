# Soccer Game - 4.E

## Add soccer goals.

**(Step 5/8)** Listen to goals state from the server.

### Get goals from server.

In `game.js` we need to add another `getCharacter` _function_ to the `create` _method_.

```javascript
// File: game.js
// Copy
g.getCharacters('goals');
// End Copy
	g.useStore('The Store', []);
	g.drawBackground('background', 0.8);
	g.getCharacters('players', (player) => {
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});/*[*/
	g.getCharacters('goals');/*]*/
}
```
