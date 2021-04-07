---
title: Adding Kicking
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 1. In `room.js`, Change the `setupCharacters` functions to be circles.

{% capture code %}
	g.setupCharacters('players', 'circle');
	g.setupCharacters('goals', 'circle');
	g.setupCharacters('soccerBalls', 'circle');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
