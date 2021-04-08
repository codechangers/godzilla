# 6. Adding Kicking

Step (4/4) To add Kicking to your game.

##### 4. In `room.js`, Add the values for the collision right after the code we just added.

```javascript
// File: code/server/rooms/room.js
// Copy
<<<<<<< HEAD
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
	});
=======
g.handleCollision('players', 'soccerBalls', (player, ball) => {
  ball.dx = g.getXTowards(player, ball.x, ball.y);
  ball.dy = g.getYTowards(player, ball.x, ball.y);
});
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
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
