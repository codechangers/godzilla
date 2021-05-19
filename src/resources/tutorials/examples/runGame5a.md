# Run Game - 5.A

## Add name tags and starting position.

**(Step 1/3)** Add name tags to players.

### Add name tags.

In `room.js` we need to add an `attachTo` _function_ to our `onJoin` _method_.

```javascript
// File: room.js
// Copy
g.attachTo('players', client.sessionId, {
	name: 'nameTag',
	x: -50,
	y: -60,
	type: 'text',
	text: data.name
});
// End Copy
onJoin(client, data) {
	const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);
	g.createACharacter('players', client.sessionId,  { x, y, ...data });/*[*/
	g.attachTo('players', client.sessionId, {
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});/*]*/
}
```

> You can change where the name tag is created by changing the x and y values.
