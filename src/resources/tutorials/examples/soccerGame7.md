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

<hr class="uk-margin-medium">

##### 2. In `room.js`, Add the kicker.

{% capture code %}
		kicker: '',
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `room.js`, Add this code to know who kicked the ball last.

{% capture code %}
		ball.kicker = player.id;
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `room.js`, Add this code so we can update the lives and scores when a goal is made.

{% capture code %}
		g.handleCollision('goals', 'soccerBalls', (goal, ball) => {
		if (ball.kicker !== goal.id) {
			g.getACharacter('players', ball.kicker).score += 1;
			g.getACharacter('players', goal.id).lives -= 1;
			g.deleteACharacter('soccerBalls', ball.id);
			setTimeout(() => this.addABall(), 3000);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 5. In `game.js` Add a check so we know if the game is over.

{% capture code %}
},
	() => {},
	(id, attr, value) => {
		if (id === g.myId() && attr === 'lives' && value <= 0) {
			location.reload();
		}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to score goals!**
