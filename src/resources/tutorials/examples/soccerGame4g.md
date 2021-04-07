##### 7. In `room.js` Add `CreateaChracter` function to add Goals for each player.

{% capture code %}
	g.createACharacter('goals', client.sessionId, { x, y });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
