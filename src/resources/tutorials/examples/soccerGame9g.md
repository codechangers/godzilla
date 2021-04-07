# 9. Place Blocks

Step (7/7) To be able to place blocks in your game. 

##### 7. In `room.js`, Add code so that the balls collide with the blocks.

```
// File: code/client/src/game.js
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
```
