##### 3. In `room.js`, Delete the existing `createACharacter()` function and replace it with a new one!

{% capture code %}
	g.createACharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}
