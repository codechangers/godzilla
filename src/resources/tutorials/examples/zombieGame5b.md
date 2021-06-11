# Zombie Game - 5.B

## Customize the login screen.

**(Step 2/3)** Add a name tag to the players.

### Add a name tag.

In `room.js`, we need to add another `attachTo` _function_ to our `onJoin` _method_. This will add a name tag to each player that joins the game!

``` javascript
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
	g.createACharacter('players', client.sessionId,  { x, y, ...data });
	g.attachTo('players', client.sessionId, {
		name: 'healthBar',
		x: -50,
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});/*[*/
	g.attachTo('players', client.sessionId, {
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});/*]*/
}
```
> **Make sure to add the Name Tag after the Health Bar code at the bottom of the `onJoin` _method_.**
