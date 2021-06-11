# Zombie Game - 5.C

## Customize the login screen.

**(Step 3/3)** Add a score attribute to each player.

### Add player scores.

##### 3. In `room.js`, we need to add a starting score to our `createACharacter` _function_ inside the `onJoin` method.

In `room.js`, we need to add a new **score** _attribute_ to our `createACharacter` _function_ in the `onJoin` _method_.

``` javascript
// File: room.js
// Copy
g.createACharacter('players', client.sessionId, { x, y, score: 0, ...data });
// End Copy
onJoin(client, data) {
	const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);
	g.createACharacter('players', client.sessionId,  { x, y,/*[*/ score: 0,/*]*/ ...data });
	g.attachTo('players', client.sessionId, {
		name: 'healthBar',
		x: -50,
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});
	g.attachTo('players', client.sessionId, {
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});
}
```

