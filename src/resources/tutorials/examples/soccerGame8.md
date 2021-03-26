---
title: Add Blocks
subtitle: Learn how to create an awesome online soccer game!
tags: [customize]
author: jason
---
##### 1. Upload an block images to the Assets folder in Repl

1. Find the downloaded images. [Need help?](/tutorials/downloads/)
2. Open the asset folder in repl, click: `code > client > asset`
<img src="/uploads/resources/repl-asset.png" max-width="200">
3. Click and drag your files into this folder. Make sure your files are named something very easy and obvious (it is best to not use spaces or symbols), for example "zombies.png" or "shark.png".

<hr class="uk-margin-medium">

##### 2. in `game.js`, Add `StoreItem`'s inside the `useStore` function.

{% capture code %}
		new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
		new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. in `room.js`, Create the Buy Actions in the `actions`.
{% capture code %}
	buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
	buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should be able to buy blocks!**
