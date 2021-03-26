---
title: Add Soccer Balls
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 2. Upload the new image for the Soccer Ball to the Assets folder in Repl.
1. Find the downloaded images. [Need help?](/tutorials/downloads/)
2. Open the asset folder in repl, click: `code > client > asset`
<img src="/uploads/resources/repl-asset.png" max-width="200">
3. Click and drag your files into this folder. Make sure your files are named something very easy and obvious (it is best to not use spaces or symbols), for example "zombies.png" or "shark.png".

<hr class="uk-margin-medium">

##### 3. In `game.js`, Add `addCharacters` function to add the soccer balls.

{% capture code %}
	g.addCharacters('soccerBalls', 0.2);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `game.js` Add `loadImage` function to load the soccer balls.

{% capture code %}
	g.loadImage('soccerBalls', 'ball.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `game.js`, Add `getCharacters` function to get the soccer balls.

{% capture code %}
	g.getCharacters('soccerBalls');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 5. In, `room.js`, Add `setupCharacters` function so the server loads the soccer balls.

{% capture code %}
	g.setupCharacters('soccerBalls');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 6. In `room.js`, Add `addABall` function so it adds a ball for every two players.

{% capture code %}
	addABall() {
	const playersPerBall = 2;
	const numOf = (t) => Object.keys(this.state[t]).length;
	if (
		numOf('players') % playersPerBall === 0 &&
		numOf('soccerBalls') < numOf('players') / playersPerBall
	) {
		g.createACharacter('soccerBalls',
			g.nextCharacterId('soccerBalls'), {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
	}
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and a soccer ball should appear once 2 players join!**
