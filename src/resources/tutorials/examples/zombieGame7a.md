---
title: Setup Login Screen
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. In `game.js`, delete `g.connect();` and replace it with login screen code.

{% capture code %}
	g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
