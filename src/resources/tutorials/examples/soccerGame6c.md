# 6. Adding Kicking

Step (3/4) To add Kicking to your game. 

##### 3. In `room.js`, add come code so that the balls move inside the `onUpdate(dt)` function.

```
// File: code/server/rooms/room.js
// Copy 
const friction = (dv) => dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000;
	g.getAllCharacters('soccerBalls', (ball) => {
		g.move(ball, 'x', ball.dx);
		g.move(ball, 'y', ball.dy);
		const bounceX = (ball.x <= ball.width / 2 ||
			ball.x >= GAME_WIDTH - ball.width / 2) ? -1 : 1;
		const bounceY = (ball.y <= ball.height / 2 ||
			ball.y >= GAME_HEIGHT - ball.height / 2) ? -1 : 1;
		ball.dx = bounceX * friction(ball.dx);
		ball.dy = bounceY * friction(ball.dy);
	});
// End Copy
/*[*/const friction = (dv) => dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000;
	g.getAllCharacters('soccerBalls', (ball) => {
		g.move(ball, 'x', ball.dx);
		g.move(ball, 'y', ball.dy);
		const bounceX = (ball.x <= ball.width / 2 ||
			ball.x >= GAME_WIDTH - ball.width / 2) ? -1 : 1;
		const bounceY = (ball.y <= ball.height / 2 ||
			ball.y >= GAME_HEIGHT - ball.height / 2) ? -1 : 1;
		ball.dx = bounceX * friction(ball.dx);
		ball.dy = bounceY * friction(ball.dy);
	});/*]*/
```