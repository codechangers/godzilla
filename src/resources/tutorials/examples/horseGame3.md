---
title: Customize Characters
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---

## 3. Customizing the characters
In this section we are going to replace the default character image with our own custom one! This will follow a similar process to when we customized the background. You can use either Google Images, or make your own!

After you find an image that you like complete the following steps: ([Need Help?](/tutorials/images/))
1. Download the image onto your computer.
2. Upload the image onto your repl.
3. Drag the image into the **code/client/asset/** folder.
4. Rename the image to something simple like, **horse.png**.

Then we just need to add another [loadImage](/docs/loadImage/) _function_.
```javascript
preload() {
// Add this new line of code:
	g.loadImage('players', 'horse.png');
}
```
After making these changes, if you download your code as a zip and upload it to blobbert.io, your game should now show your character image!
