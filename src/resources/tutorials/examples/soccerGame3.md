---
title: Add More Characters
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---

##### 1. Upload all of our character images ([Need Help?](/tutorials/images/)).

1. Find the downloaded images. [Need help?](/tutorials/downloads/)
2. Open the asset folder in repl, click: `code > client > asset`
<img src="/uploads/resources/repl-asset.png" max-width="200">
3. Click and drag your files into this folder. Make sure your files are named something very easy and obvious (it is best to not use spaces or symbols), for example "zombies.png" or "shark.png". You will resize the images within the code, so don't worry if it seems to big or small right now.
4. Repeat steps 1-3 until all of your characters are uplaoded into the Assets folder.

<hr class="uk-margin-medium">

##### 2. Go into the `loadImage` _function_ in `game.js` and change the name of your character.

{% capture code %}
g.loadImage('players', 'circle1.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. Add the rest of your character images in the `loadImage` _function_ in `game.js`

{% capture code %}
	g.loadImage('blobbert', 'circle1.png');
	g.loadImage('grunch', 'circle2.png');
	g.loadImage('neon', 'circle3.png');
	g.loadImage('nimbo', 'circle4.png');
	g.loadImage('tangles', 'circle5.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

> **You can change the names of the characters to whatever you want, they don't have to be named blobbert, grunch, etc**

<hr class="uk-margin-medium">
##### 4. Add a player select Screen in `game.js` after the `useLoginScreen()` function.

{% capture code %}
	g.usePlayerSelectScreen({
		blobbert: 'circle1.png',
		grunch: 'circle2.png',
		neon: 'circle3.png',
		nimbo: 'circle4.png',
		tangles: 'circle5.png',
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 5. In `game.js` change the Login Screen code and replace it with the following code.

{% capture code %}
	g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to choose your character!**
