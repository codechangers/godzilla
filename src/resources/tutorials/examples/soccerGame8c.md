# Soccer Game - 8.C

## Add blocks to your game.

**(Step 3/3)** Add purchase actions to the server.

### Add block purchases.

In `room.js` we need to add some new items to the `actions` _variable_ in the `onMessage` _method_.

```javascript
// File: room.js
// Copy
buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),
// End Copy
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	const speed = 10;
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),/*[*/
		buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
		buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),/*]*/
	};
	g.handleActions(actions, data);
}
```
