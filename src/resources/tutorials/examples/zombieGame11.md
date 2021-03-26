---
title: Set Zombies Rotation
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. in `room.js`, Delete the old `follow()` function and add the following `follow()` function with updated data.

{% capture code %}
	g.follow('players', 'zombies', 1, 0.1,
		(player, zombie) => {
			zombie.rotation = g.getRotationTowards(zombie, player.x, player.y);
		});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

And we should now have a fully functioning game! Customize it and change or add whatever you like!

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
