##### 4. In `room.js`, add a `setInterval()` function to randomly spawn zombies across the map inside the `onInit()` function.

{% capture code %}
	setInterval(() => g.createACharacter('zombies',
		g.nextCharacterId('zombies'), {
			x: Math.floor((Math.random() * 2000) + 1),
			y: Math.floor((Math.random() * 2000) + 1)
		}), 2500);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/server/room.js" %}

> **The number at the end will determine how long to wait until it spawns another zombie, and the two 2000 numbers are the bounds for where the zombies should spawn.**
