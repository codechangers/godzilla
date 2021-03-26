---
title: Adding Kicking
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 1. In `room.js`, Change the `setupCharacters` functions to be circles.

{% capture code %}
	g.setupCharacters('players', 'circle');
	g.setupCharacters('goals', 'circle');
	g.setupCharacters('soccerBalls', 'circle');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 2. In `room.js`, add a `dx` and `dy`.

{% capture code %}
	dx: 0,
	dy: 0,
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `room.js`, add come code so that the balls move inside the `onUpdate(dt)` function.

{% capture code %}
		const friction = (dv) => dv > -0.01 && dv < 0.01 ? 0 : dv - dv / 6000;
	g.getAllCharacters('soccerBalls', (ball) => {
		g.move(ball, 'x', ball.dx);
		g.move(ball, 'y', ball.dy);
		const bounceX = (ball.x <= ball.width / 2 ||
			ball.x >= GAME_WIDTH - ball.width / 2) ? -1 : 1;
		const bounceY = (ball.y <= ball.height / 2 ||
			ball.y >= GAME_HEIGHT - ball.height / 2) ? -1 : 1;
		ball.dx = bounceX * friction(ball.dx);
		ball.dy = bounceY * friction(ball.dy);
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `room.js`, Add the values for the collision right after the code we just added.

{% capture code %}
	g.handleCollision('players', 'soccerBalls', (player, ball) => {
		ball.dx = g.getXTowards(player, ball.x, ball.y);
		ball.dy = g.getYTowards(player, ball.x, ball.y);
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to kick the soccer ball!**
