# 6. Adding Kicking

Step (2/4) To add Kicking to your game.

##### 2. In `room.js`, add a `dx` and `dy` to our ball in the `addABall` _method_.

```javascript
// File: code/server/rooms/room.js
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
