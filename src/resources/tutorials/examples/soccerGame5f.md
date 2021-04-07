##### 6. In `room.js`, Add `addABall` function so it adds a ball for every two players.

{% capture code %}
	addABall() {
	const playersPerBall = 2;
	const numOf = (t) => Object.keys(this.state[t]).length;
	if (
		numOf('players') % playersPerBall === 0 &&
		numOf('soccerBalls') < numOf('players') / playersPerBall
	) {
		g.createACharacter('soccerBalls',
			g.nextCharacterId('soccerBalls'), {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
	}
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
