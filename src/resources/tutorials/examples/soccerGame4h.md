##### 8. in `room.js`, Add `deleteACharacter` function so that players are removed when the leave the game.

{% capture code %}
	g.deleteACharacter('goals', client.sessionId);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
