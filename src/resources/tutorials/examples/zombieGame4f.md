##### 5. In `room.js`, add the `follow()` function inside the `onUpdate()` function so that zombies will follow you.

{% capture code %}
	g.follow('players', 'zombies', 1, 0.1);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/serve/rooms/room.js" %}

> **You can change the numbers to change the distance the zombies will come to your character, and the speed of the zombies.**
