# 9. Place Blocks

Step (7/7) To be able to place blocks in your game.

##### 7. In `room.js`, Add code so that the balls collide with the blocks.

```javascript
// File: code/client/src/game.js
// Copy
<<<<<<< HEAD
	g.handleCollision('soccerBalls', 'blocks', (ball, block) => {
		ball.dx = g.getXTowards(block, ball.x, ball.y);
		ball.dy = g.getYTowards(block, ball.x, ball.y);
		const bh = block.health - 1;
		if (bh > 0) {
			block.health = bh;
			block.spriteName = `block${bh}`;
		} else {
			g.deleteACharacter('blocks', block.id);
		}
	});
=======
g.handleCollision('soccerBalls', 'blocks', (ball, block) => {
  ball.dx = g.getXTowards(block, ball.x, ball.y);
  ball.dy = g.getYTowards(block, ball.x, ball.y);
  const bh = block.health - 1;
  if (bh > 0) {
    block.health = bh;
    block.spriteName = `block${bh}`;
  } else {
    g.deleteACharacter('blocks', block.id);
  }
});
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
	g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
		if (ball.kicker !== goal.id) {
			g.getACharacter('players', ball.kicker).score += 1;
			g.getACharacter('players', goal.id).lives -= 1;
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	});/*[*/
	g.handleCollision('soccerBalls', 'blocks', (ball, block) => {
		ball.dx = g.getXTowards(block, ball.x, ball.y);
		ball.dy = g.getYTowards(block, ball.x, ball.y);
		const bh = block.health - 1;
		if (bh > 0) {
			block.health = bh;
			block.spriteName = `block${bh}`;
		} else {
			g.deleteACharacter('blocks', block.id);
		}
	});/*]*/
```
