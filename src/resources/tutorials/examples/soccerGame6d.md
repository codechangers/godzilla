# 6. Adding Kicking

Step (4/4) To add Kicking to your game. 

##### 4. In `room.js`, Add the values for the collision right after the code we just added.

```
// File: code/server/rooms/room.js
// Copy
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
	});
// End Copy
	/*[*/g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
	});/*]*/
```