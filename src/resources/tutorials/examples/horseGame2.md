---
title: Add Background
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---
## 2. Setting up the environment

---
### Setting Game Boundaries and Background
{% include blocks/gameBoundsAndBackground.md %}
----

After getting your initial background setup, we are going to customize it by uploading our own background image. Make sure you find or make a background that works for your game! One important detail to remember is that backgrounds should be "repeatable" which means that if you lined a bunch of them up, it would look like one big background!

After you find an image that you like complete the following steps: ([Need Help?](/tutorials/images/))
1. Download the image onto your computer.
2. Upload the image onto your repl.
3. Drag the image into the **code/client/asset/** folder.
4. Rename the image to something simple like, **grass.png**.


Once your image is in your **code/client/asset/** folder, all we need to do is change a few lines of code.
> **Hint:** Click on a _function_ name, to get more information on how to customize it!

1. Change the [loadImage](/docs/loadImage/) _function_.
2. Change the [drawBackground](/docs/drawBackground/) _function_.
3. Change the [setBounds](/docs/setBounds/) _function_.

After customizing those _functions_ my code looks like this:
```javascript
// File: code/client/src/game.js

create() {
// Change this line:
	g.drawBackground('grass', 1, 2000, 2000);
// To say this:
	g.drawBackground('grass', 0.3);
}
```
After making these changes, if you download your code as a zip and upload it to blobbert.io, your game should now have your background in it!
