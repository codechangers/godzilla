# Soccer Game - 6.D

## Add kicking to the game.

**(Step 4/4)** Kick the ball in the opposite direction when a player runs into it.

### Kick the ball when players run into it.

In `room.js` we need to add a `handleCollision` _function_ to our `onUpdate` _method_.

```javascript
// File: room.js
// Copy
g.handleCollision('players', 'soccerBalls', (player, ball) => {
  ball.dx = g.getXTowards(player, ball.x, ball.y);
  ball.dy = g.getYTowards(player, ball.x, ball.y);
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
	});/*[*/
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
	});/*]*/
}
```
