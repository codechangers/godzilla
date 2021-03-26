---
title: Place Blocks
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 1. in `game.js`, Add `addCharacters` function to add the blocks to your game.
{% capture code %}
	g.addCharacters('blocks', 0.5);
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 2. in `game.js`, Add `loadImage` functions to add the block images

{% capture code %}
	g.loadImage('block1', 'block1.png');
	g.loadImage('block2', 'block2.png');
	g.loadImage('block3', 'block3.png');
	g.loadImage('block4', 'block4.png');
	g.loadImage('block5', 'block5.png');
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `game.js`, Add `getCharacters` function to add the blocks to the game.

{% capture code %}
g.getCharacters('blocks');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `game.js`, Add an `if` statement so that when you click the moouse it will place a block.

{% capture code %}
if (g.canSend()) {
		g.sendAction('placeBlock', {x, y});
	}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 5. In `room.js`, Add `setupCharacters`, function to setup the block.

{% capture code %}
g.setupCharacters('blocks');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

##### 6. In `room.js`, Add the blocks into the game.

{% capture code %}
	placeBlock: ({ x, y }) => {
		if (player.block5s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 5, spriteName: 'block5'});
		} else if (player.block3s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 3, spriteName: 'block3'});
		}
	},
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 7. In `room.js`, Add code so that the balls collide with the blocks.

{% capture code %}
	g.handleCollision('soccerBalls', 'blocks', (ball, block) => {
		ball.dx = g.getXTowards(block, ball.x, ball.y);
		ball.dy = g.getYTowards(block, ball.x, ball.y);
		const bh = block.health - 1;
		if (bh > 0) {
			block.health = bh;
			block.spriteName = `block${bh}`;
		} else {
			g.deleteACharacter('blocks', block.id);
		}
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to place down blocks!**
