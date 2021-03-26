---
title: Setup Bullets
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. in `game.js`, Create bullets using the `addCharacters()` function inside the `init()` function.  
{% capture code %}
	g.addCharacters('bullets', 0.5);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 2. in `game.js`, Create `loadImage()` function to load the image for the bullets.

{% capture code %}
	g.loadImage('bullets', 'bullet.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `game.js`, Create a `getCharacters()` function to add the bullets to the game in the `create()` function.

{% capture code %}
	g.getCharacters('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `room.js`, Create a `setupCharacters()` function inside the `onInit()` function to set them up on the server.

{% capture code %}
	g.setupCharacters('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

##### 5. In `room.js`, Create `onMessage()`method to get our bullets to shoot.

{% capture code %}
			click: () => {

		},
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

##### 6. In `room.js`, in the `onMessage()` function in the click method that you just  created Add code to make the bullets animate and go in the right direction.

{% capture code %}
			const index = g.nextCharacterId('bullets');
			g.createACharacter('bullets', index, { x: player.x, y: player.y });
			let newCharacter = g.getACharacter('bullets', index);
			g.playAnimation(newCharacter, 'x',
				g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
			g.playAnimation(newCharacter, 'y',
				g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
			setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

##### 7. In `game.js`, Make sure your Click Function looks like this.
Now there is only two more things we need to do to make our bullets shoot, first check and make sure your **game.js** file has a `click` _method_ that looks like this:

{% capture code %}
click(x, y) {  
	g.sendAction('click', {x, y});
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 8. In `room.js`, add the `handleAnimations()` function in the `onUpdate()` function for our bullets.

{% capture code %}
	g.handleAnimations('bullets');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

##### 9. In `room.js`, Add code to handle the collision and delete the zombies if they collide with the bullets in the `onUpdate()` function.

{% capture code %}
	g.handleCollision('bullets', 'zombies', (bullet, zombie) => {
		g.deleteACharacter('zombies', zombie.id);
		g.deleteACharacter('bullets', bullet.id);
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

Now you should have working bullets that can kill the zombies when you shoot!

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
