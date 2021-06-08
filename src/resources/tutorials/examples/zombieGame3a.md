# Run Game - 3.A

## Add player health bars.

**(Step 1/2)** Attach a health bar to players when they join the game.

### Attach a health bar to players.

In `room.js`, we need to add an `attachTo` _function_ to the `onJoin` _method_. This will attach a health bar to players when they join the game!

``` javascript
// File: room.js
// Copy
g.attachTo('players', client.sessionId, {  
			name: 'healthBar',
			x: -50,
			y: 40,
			width: 100,
			height: 10,
			type: 'bar',
			filled: 100
		});
// End Copy
onJoin(client, data) {
	const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);
	g.createACharacter('players', client.sessionId, { x, y, ...data });/*[*/
	g.attachTo('players', client.sessionId, {  
		name: 'healthBar',
		x: -50,
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});/*]*/
}
```
