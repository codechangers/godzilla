# 7. Add Scoring A Goal

Step (3/5) To add scoring to your game.

##### 3. In `room.js`, Add this code to know who kicked the ball last.

```javascript
// File: code/server/rooms/room.js
// Copy
<<<<<<< HEAD
	ball.kicker = player.id;
=======
ball.kicker = player.id;
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
g.handleCollision('players', 'soccerBalls', (player, ball) => {
	ball.dx = g.getXTowards(player, ball.x, ball.y);
	ball.dy = g.getYTowards(player, ball.x, ball.y);/*[*/
	ball.kicker = player.id;/*]*/
});
```
