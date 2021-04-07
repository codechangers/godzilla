##### 9. In `room.js`, Add code to handle the collision and delete the zombies if they collide with the bullets in the `onUpdate()` function.

{% capture code %}
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

Now you should have working bullets that can kill the zombies when you shoot!
