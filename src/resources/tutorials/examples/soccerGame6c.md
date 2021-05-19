# Soccer Game - 6.C

## Add kicking to the game.

**(Step 3/4)** Move the soccer balls around.

### Move the soccer balls.

In `room.js` we need to write some code that will move the ball inside our `onUpdate` _method_.

```javascript
// File: room.js
// Copy
const friction = dv => (dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000);
g.getAllCharacters('soccerBalls', ball => {
  g.move(ball, 'x', ball.dx);
  g.move(ball, 'y', ball.dy);
  const bounceX = ball.x <= ball.width / 2 || ball.x >= GAME_WIDTH - ball.width / 2 ? -1 : 1;
  const bounceY = ball.y <= ball.height / 2 || ball.y >= GAME_HEIGHT - ball.height / 2 ? -1 : 1;
  ball.dx = bounceX * friction(ball.dx);
  ball.dy = bounceY * friction(ball.dy);
});
// End Copy
onUpdate(dt) {
	/*[*/const friction = dv => (dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000);
	g.getAllCharacters('soccerBalls', ball => {
		g.move(ball, 'x', ball.dx);
		g.move(ball, 'y', ball.dy);
		const bounceX = ball.x <= ball.width / 2 || ball.x >= GAME_WIDTH - ball.width / 2 ? -1 : 1;
		const bounceY = ball.y <= ball.height / 2 || ball.y >= GAME_HEIGHT - ball.height / 2 ? -1 : 1;
		ball.dx = bounceX * friction(ball.dx);
		ball.dy = bounceY * friction(ball.dy);
	});/*]*/
}
```
