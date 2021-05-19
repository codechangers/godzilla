# Soccer Game - 5.F

## Add soccer balls.

**(Step 6/6)** Create a soccer ball for every 2 players that join.

### Create 1 ball per 2 players.

In `room.js` we need to write an `addABall` _method_ to use in our code when we want to create a soccer ball.

```javascript
// File: room.js
// Copy
addABall() {
	const playersPerBall = 2;
	const numOf = (t) => Object.keys(this.state[t]).length;
	if (
		numOf('players') % playersPerBall === 0 &&
		numOf('soccerBalls') < numOf('players') / playersPerBall
	) {
		g.createACharacter('soccerBalls',
			g.nextCharacterId('soccerBalls'), {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
	}
}
// End Copy
	onLeave(client) {
		g.deleteACharacter('players', client.sessionId);
		g.deleteACharacter('goals', client.sessionId);
	}/*[*/
	
	addABall() {
		const playersPerBall = 2;
		const numOf = (t) => Object.keys(this.state[t]).length;
		if (
			numOf('players') % playersPerBall === 0 &&
			numOf('soccerBalls') < numOf('players') / playersPerBall
		) {
			g.createACharacter('soccerBalls',
				g.nextCharacterId('soccerBalls'), {
					x: GAME_WIDTH / 2,
					y: GAME_HEIGHT / 2,
				});
		}
	}/*]*/
};
```

### Add a ball when players join.

In `room.js` we need to add an `addABall` _method_ call to the `onJoin` _method_.

```javascript
// File: room.js
// Copy
this.addABall();
// End Copy
onJoin(client, data) {
	const x = Math.floor(Math.random() * GAME_WIDTH);
	const y = Math.floor(Math.random() * GAME_HEIGHT);
	g.createACharacter('players', client.sessionId,  { x, y, ...data });
	g.createACharacter('goals', client.sessionId, { x, y });/*[*/
	this.addABall();/*]*/
}
```
