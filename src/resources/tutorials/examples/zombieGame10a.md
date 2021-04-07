---
title: Create a Scoreboard
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 2. In `game.js` delete the old `getCharacters()` code and ad the new code in the `create()` function.

{% capture code %}
		g.getCharacters('players',
		(player) => {
			g.handleLeaderboard('players', 'Scoreboard');
			if (player.id === g.myId()) {
				g.cameraFollow(player.sprite);
			}},
		(player) => g.handleLeaderboard('players', 'Scoreboard'),
		(id, attr, value) => {
			if (attr == 'filled' && id == 'filled' &&
				value <= 1 && player.id === g.myId()) {
					location.reload();
				}
			g.handleLeaderboard('players', 'Scoreboard');
		});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `room.js`, in the onupdate function, inside of your handleCollision method add a character with a score of 100 using the `getACharacter()` function.

{% capture code %}
	g.getACharacter('players', bullet.playerId).score += 100;
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}
Now the scoreboard should be set up and our game is almost finished!

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
