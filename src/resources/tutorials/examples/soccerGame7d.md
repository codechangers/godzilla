# Soccer Game - 7.D

## Add scoring to your game.

**(Step 4/5)** Increase score and decrease lives when a goal is scored.

### Handling goal scoring.

In `room.js` we need to add a `handleCollision` _function_ to the `onUpdate` _method_.

```javascript
// File: room.js
// Copy
g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
	if (ball.kicker !== goal.id) {
		g.getACharacter('players', ball.kicker).score += 1;
		g.getACharacter('players', goal.id).lives -= 1;
		g.deleteACharacter('soccerBalls', ball.id);
		setTimeout(() => this.addABall(), 3000);
	}
});
// End Copy
onUpdate(dt) {
	const friction = dv => (dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000);
	g.getAllCharacters('soccerBalls', ball => {
		g.move(ball, 'x', ball.dx);
		g.move(ball, 'y', ball.dy);
		const bounceX = ball.x <= ball.width / 2 || ball.x >= GAME_WIDTH - ball.width / 2 ? -1 : 1;
		const bounceY = ball.y <= ball.height / 2 || ball.y >= GAME_HEIGHT - ball.height / 2 ? -1 : 1;
		ball.dx = bounceX * friction(ball.dx);
		ball.dy = bounceY * friction(ball.dy);
	});
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
		ball.kicker = player.id;
	});/*[*/
	g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
		if (ball.kicker !== goal.id) {
			g.getACharacter('players', ball.kicker).score += 1;
			g.getACharacter('players', goal.id).lives -= 1;
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	});/*]*/
}
```
