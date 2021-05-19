# Run Game - 5.B

## Add name tags and starting position.

**(Step 2/3)** Add name tags to players.

### Add name tags.

In `room.js` we need to change our `x` and `y` _variables_ in the `onJoin` _method_.

```javascript
// File: room.js
// Copy
const x = GAME_WIDTH / 2;
const y = GAME_HEIGHT - 50;
// End Copy
onJoin(client, data) {
	/*{*/const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);/*}[*/const x = GAME_WIDTH / 2;
	const y = GAME_HEIGHT - 50;/*]*/
	g.createACharacter('players', client.sessionId,  { x, y, ...data });
	g.attachTo('players', client.sessionId, {
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});
}
