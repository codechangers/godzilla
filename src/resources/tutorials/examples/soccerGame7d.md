##### 4. In `room.js`, Add this code so we can update the lives and scores when a goal is made.

{% capture code %}
		g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
		if (ball.kicker !== goal.id) {
			g.getACharacter('players', ball.kicker).score += 1;
			g.getACharacter('players', goal.id).lives -= 1;
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
