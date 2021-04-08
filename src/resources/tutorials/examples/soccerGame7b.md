# 7. Add Scoring A Goal

Step (2/5) To add scoring to your game.

##### 2. In `room.js`, Add the kicker to our ball.

```javascript
// File: code/server/rooms/room.js
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
