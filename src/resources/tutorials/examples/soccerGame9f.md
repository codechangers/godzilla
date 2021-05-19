# Soccer Game - 9.F

## Allow players to place blocks in the game.

**(Step 6/7)** Add a place block action to the server.

### Add the place block action.

In `room.js` we need to add a new value to the `actions` _variable_ in the `onMessage` _method_.

```javascript
// File: game.js
// Copy
placeBlock: ({ x, y }) => {
	if (player.block5s > 0) {
		player.block5s -= 1
		g.createACharacter('blocks', g.nextCharacterId('blocks'),
			{x, y, health: 5, spriteName: 'block5'});
	} else if (player.block3s > 0) {
		player.block3s -= 1
		g.createACharacter('blocks', g.nextCharacterId('blocks'),
			{x, y, health: 3, spriteName: 'block3'});
	}
},
// End Copy
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	const speed = 10;
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),
		buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
		buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),/*[*/
		placeBlock: ({ x, y }) => {
			if (player.block5s > 0) {
				player.block5s -= 1
				g.createACharacter('blocks', g.nextCharacterId('blocks'),
					{x, y, health: 5, spriteName: 'block5'});
			} else if (player.block3s > 0) {
				player.block3s -= 1
				g.createACharacter('blocks', g.nextCharacterId('blocks'),
					{x, y, health: 3, spriteName: 'block3'});
			}
		},/*]*/
	};
	g.handleActions(actions, data);
}
```
