# Soccer Game - 6.B

## Add kicking to the game.

**(Step 2/4)** Add directional values to soccer balls.

### Add direction to the ball.

In `room.js` we need to add a `dx` and `dy` value to our ball in the `addABall` _method_. This will allow us to keep track of what direction the ball is traveling in.

```javascript
// File: room.js
// Copy
dx: 0,
dy: 0,
// End Copy
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
				y: GAME_HEIGHT / 2,/*[*/
				dx: 0,
				dy: 0,/*]*/
			});
	}
}
```
