# Run Game - 7.A

## Add co-operative play.

**(Step 1/4)** Add dynamic player speed to the game.

### Add dynamic player speed.

In `room.js` we need to change our speed in the `onMessage` _method_.

```javascript
// File: game.js
// Copy
const speed = player.speed;
// End Copy
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	const speed = /*{*/10/*}[*/player.speed/*]*/;
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),
	};
	g.handleActions(actions, data);
}
```

> **Make sure that you don't add a new speed variable! just change the one that is already there.**
