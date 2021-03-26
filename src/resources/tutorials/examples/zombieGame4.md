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

###### 2. In `room.js`, Add `setupCharacters()` in the `onInit()` function to add zombies.

{% capture code %}
	g.setupCharacters('zombies', 0.5);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/room.js" %}

###### In `game.js`, Add `addCharacters()` in the `Init()` function to add zombies.

{% capture code %}
	g.addCharacters('zombies', 0.5);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

###### 3. In `game.js`, Add `getCharacters()` function in the `create()` function.

{% capture code %}
	g.getCharacters('zombies');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `room.js`, add a `setInterval()` function to randomly spawn zombies across the map inside the `onInit()` function.

{% capture code %}
	setInterval(() => g.createACharacter('zombies',
		g.nextCharacterId('zombies'), {
			x: Math.floor((Math.random() * 2000) + 1),
			y: Math.floor((Math.random() * 2000) + 1)
		}), 2500);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/server/room.js" %}

> **The number at the end will determine how long to wait until it spawns another zombie, and the two 2000 numbers are the bounds for where the zombies should spawn.**

<hr class="uk-margin-medium">

##### 5. In `room.js`, add the `follow()` function inside the `onUpdate()` function so that zombies will follow you.

{% capture code %}
	g.follow('players', 'zombies', 1, 0.1);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/serve/rooms/room.js" %}

> **You can change the numbers to change the distance the zombies will come to your character, and the speed of the zombies.**

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
