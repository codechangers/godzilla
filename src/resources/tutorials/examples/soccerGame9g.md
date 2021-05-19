# Soccer Game - 9.G

## Allow players to place blocks in the game.

**(Step 7/7)** Block the soccer ball when it runs into a block.

### Blocks block soccer balls.

In `room.js` we need to add another `handleCollision` _function_ to our `onUpdate` _method_.

```javascript
// File: game.js
// Copy
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
// End Copy
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
		ball.kicker = player.id;
	});
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
}
```
