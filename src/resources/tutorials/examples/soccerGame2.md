---
title: Add a Background
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---
#### Find an Image for the Background of your game

##### 1. Upload an Image to Repl

1. Find the downloaded images. [Need help?](/tutorials/downloads/)
2. Open the asset folder in repl, click: `code > client > asset`
<img src="/uploads/resources/repl-asset.png" max-width="200">
3. Click and drag your files into this folder. Make sure your files are named something very easy and obvious (it is best to not use spaces or symbols), for example "zombies.png" or "shark.png". You will resize the images within the code, so don't worry if it seems to big or small right now.

<hr class="uk-margin-medium">

##### 2. Go into the `preload` _function_ in `game.js` and add a new image named after the new character set.

{% capture code %}
g.loadImage('background', 'grass.jpg');
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

### 3. In `game.js`, Add `drawBackground` function in the `create ` function

{% capture code %}
g.drawBackground('background', 0.8);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
