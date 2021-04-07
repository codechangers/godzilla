---
title: Add a Health Bar
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. In `room.js` Create an `attachTo()` function inside the `onJoin()` function to add a health bar

{% capture code %}
	g.attachTo('players', client.sessionId, {  
		name: 'healthBar',
		x: -50,
		y: 40,
		width: 100,
		height: 10,
		type: 'bar',
		filled: 100
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}
