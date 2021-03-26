---
title: Adding Food
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---

## 5. Adding some apples
In this section we are going to add some apples into the game for the horses to eat! We will do this by utilizing a character set.

---
{% include blocks/newCharacterSet.md %}
---

After getting the initial character set setup, we need to find or make a custom image for our apples.

After you find an image that you like complete the following steps: ([Need Help?](/tutorials/images/))
1. Download the image onto your computer.
2. Upload the image onto your repl.
3. Drag the image into the **code/client/asset/** folder.
4. Rename the image to something simple like, **apple.png**.

Once your image is in your **code/client/asset/** folder, all we need to do is make the following changes:
1. Change the [loadImage](/docs/loadImage/) _function_.
2. Change the [setupCharacters](/docs/setupCharacters/) _function_.
3. Change the [addCharacters](/docs/addCharacters/) _function_.
4. Change the [getCharacters](/docs/getCharacters/) _function_.
5. Change the [createACharacter](/docs/createACharacter/) _function_.

After making all of the above changes, my code looked like this:
```javascript
// File: code/client/src/game.js
init() {
	...
	g.addCharacters('apples', 0.25);
}

preload() {
	...
	g.loadImage('apples', 'apple.png');
}

create() {
	...
	g.getCharacters('apples');
}
```
```javascript
// File: code/server/rooms/room.js
onInit() {
	...
	g.setupCharacters('apples');
	const numberOfApples = 10;
	for (let i = 0; i < numberOfApples; i++) {
		const x = Math.floor(Math.random() * this.gameWidth);
		const y = Math.floor(Math.random() * this.gameHeight);
		g.createACharacter('apples', g.nextCharacterId('apples'), { x, y });
	}
}
```
After making these changes, if you download your code as a zip and upload it to blobbert.io, your game should now have some apples spread around!
