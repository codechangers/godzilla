##### 2. In `room.js`, Create a `handleCollision()` function inside the `onUpdate()` function so that our health bar will update when we collide with zombies.

{% capture code %}
	g.handleCollision('players', 'zombies', (player) => {
		if (player.healthBar.filled > 0) {
			player.healthBar.filled -= 0.1;
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}
