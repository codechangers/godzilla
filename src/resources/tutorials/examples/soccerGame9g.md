##### 7. In `room.js`, Add code so that the balls collide with the blocks.

{% capture code %}
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
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
