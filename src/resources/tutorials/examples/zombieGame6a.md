---
title: Setup Bullets
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. in `game.js`, Create bullets using the `addCharacters()` function inside the `init()` function.  
{% capture code %}
	g.addCharacters('bullets', 0.5);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
