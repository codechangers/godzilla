# Soccer Game - 7.C

## Add scoring to your game.

**(Step 3/5)** Set the ball kicker when the ball is kicked.

### Set the kicker value.

In `room.js` we need to set the `kicker` value of the ball when it is kicked.

```javascript
// File: room.js
// Copy
ball.kicker = player.id;
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
		ball.dy = g.getYTowards(player, ball.x, ball.y);/*[*/
		ball.kicker = player.id;/*]*/
	});
}
```
