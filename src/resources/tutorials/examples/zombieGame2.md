---
title: Add a Background
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---
#### Find an Image for the Background of your game

##### 1. Upload an Image to Repl

1. Find the downloaded images. [Need help?](/tutorials/downloads/)
2. Open the asset folder in repl, click: `code > client > asset`
3. Click and drag your files into this folder. Make sure your files are named something very easy and obvious (it is best to not use spaces or symbols), for example "zombies.png" or "shark.png". You will resize the images within the code, so don't worry if it seems to big or small right now.

<hr class="uk-margin-medium">

##### 2. In `game.js`, Go into the `preload()` _function_ in `game.js` and add a new image named after the new character set.

{% capture code %}
g.loadImage('grass', 'grass.png');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `game.js`, Add `drawBackground()` function in the `create()` function

{% capture code %}
g.drawBackground('grass', 1, 2000, 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `room.js`, Add `setBounds()` inside the `onInit()` function to set the boundaries of the game.

{% capture code %}
	g.setBounds(2000, 2000);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

> **Make sure that you write it after your `setup` _function_ or else it will break your game. You can change the numbers to make the bounds whatever size you want.**

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
