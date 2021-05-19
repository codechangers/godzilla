# Run Game - 5.C

## Add name tags and starting position.

**(Step 3/3)** Set default player speed.

### Set player speed.

```javascript
// File: room.js
// Copy
g.createACharacter('players', client.sessionId,  { x, y, ...data, speed: 5 });
// End Copy
onJoin(client, data) {
	const x = GAME_WIDTH / 2;
	const y = GAME_HEIGHT - 50;
	g.createACharacter('players', client.sessionId,  { x, y, ...data/*[*/, speed: 5/*]*/ });
	g.attachTo('players', client.sessionId, {
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});
}
