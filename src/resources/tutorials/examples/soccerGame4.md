---
title: Add Goals
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 1. In `game.js`, Add `addCharacters` to add a new character for the Soccer Goal.

{% capture code %}
	g.addCharacters('goals', 0.6);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 2. Upload the new image to the Assets folder in Repl.
1. Find the downloaded images. [Need help?](/tutorials/downloads/)
2. Open the asset folder in repl, click: `code > client > asset`
<img src="/uploads/resources/repl-asset.png" max-width="200">
3. Click and drag your files into this folder. Make sure your files are named something very easy and obvious (it is best to not use spaces or symbols), for example "zombies.png" or "shark.png".

<hr class="uk-margin-medium">

##### 3. In `game.js`, Add the goals using the `loadImage` function.

{% capture code %}
	g.loadImage('goals', 'goal.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `game.js`, Add the players depth.

{% capture code %}
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 5. In `game.js`, Add the goals using `getCharacters` Function so the they render in your game.

{% capture code %}
	g.getCharacters('goals');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 6. In `room.js`, Add `setupCharacters` function to display the Goals.

{% capture code %}
	g.setupCharacters('goals');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 7. In `room.js` Add `CreateaChracter` function to add Goals for each player.

{% capture code %}
	g.createACharacter('goals', client.sessionId, { x, y });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 8. in `room.js`, Add `deleteACharacter` function so that players are removed when the leave the game.

{% capture code %}
	g.deleteACharacter('goals', client.sessionId);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and each player should now have a goal!**
