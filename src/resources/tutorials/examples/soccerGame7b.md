# Soccer Game - 7.B

## Add scoring to your game.

**(Step 2/5)** Add a kicker value to the soccer ball.

### Add kicker to ball.

In `room.js` we need to add a `kicker` value to our `addABall` _method_. This will allow us to keep track of who kicked the ball last. With that information we can then figure out when the kicker makes a goal!

```javascript
// File: room.js
// Copy
kicker: '',
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
				y: GAME_HEIGHT / 2,
				dx: 0,
				dy: 0,/*[*/
				kicker: '',/*]*/
			});
	}
}
```
