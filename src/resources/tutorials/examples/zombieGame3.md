---
title: Setup Camera Follow
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. In `game.js`, Setup the camera follow function in the `create()` function.
{% capture code %}
		g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}


> **Make sure that you **don't** write a new [getCharacters](/docs/getCharacters/) _function_, just change the one you already had for `'players'`.**

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
