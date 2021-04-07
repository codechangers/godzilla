---
title: Add Zombies
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

#### Find an Image for the Zombies in Your Game

##### 1. In `game.js` Use `loadImage()` function to add some Zombies inside the `preload()` function.
{% capture code %}
	g.loadImage('zombies', 'zombie.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
