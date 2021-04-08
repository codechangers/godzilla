# 7. Add Scoring A Goal

Step (3/5) To add scoring to your game.

##### 3. In `room.js`, Add this code to know who kicked the ball last.

```javascript
// File: code/server/rooms/room.js
// Copy
ball.kicker = player.id;
// End Copy
g.handleCollision('players', 'soccerBalls', (player, ball) => {
	ball.dx = g.getXTowards(player, ball.x, ball.y);
	ball.dy = g.getYTowards(player, ball.x, ball.y);/*[*/
	ball.kicker = player.id;/*]*/
});
```
