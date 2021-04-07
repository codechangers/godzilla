##### 6. In `room.js`, Add the blocks into the game.

{% capture code %}
	placeBlock: ({ x, y }) => {
		if (player.block5s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 5, spriteName: 'block5'});
		} else if (player.block3s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 3, spriteName: 'block3'});
		}
	},
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
