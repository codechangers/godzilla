##### 4. In `game.js`, Add the players depth.

{% capture code %}
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
