##### 2. In `room.js`, add this code to the bottom of your `onJoin()` function to customize the login screen.

{% capture code %}
	g.attachTo('players', client.sessionId, {  
		name: 'nameTag',
		x: -50,
		y: -60,
		type: 'text',
		text: data.name
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}
