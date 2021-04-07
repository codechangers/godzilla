---
title: Add Scoring A Goal
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 1. In `room.js`, Add data to the players.
{% capture code %}
	g.createACharacter('players', client.sessionId,
		{ ...data, x, y, score: 0, lives: 3, block3s: 0, block5s: 0 });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **This data sets your players lives that they start with, and blocks that they start with.**
