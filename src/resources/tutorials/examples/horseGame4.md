---
title: Rotate Characters
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---

## 4. Rotating the character
In this section we are going to make it so the horse looks where it is going! We will do this by modifying our actions in the `onMessage` _method_.

The first action we are going to change is the `moveUp` action. We are going to change it from an inline _function_ (only one line) to a multiline _function_ (many lines). We can do this by adding curly braces `{ }` before and after our function code:
```javascript
moveUp: () => {
	g.move(player, 'y', -speed);
},
```
Now that we have a multiline function, we can add some more code to the function so that the horse is able to rotate!
```javascript
moveUp: () => {
	player.rotation = 0;
	g.move(player, 'y', -speed);
},
```
We are going to repeat those same steps for the `moveDown`, `moveLeft`, and `moveRight` actions. Using the following values for the rotation on each: `Math.PI`, `Math.PI * 3 / 2`, `Math.PI / 2`. After we complete these changes our actions should look like this:
```javascript
const actions = {
	moveUp: () => {
		player.rotation = 0;
		g.move(player, 'y', -speed);
	},
	moveDown: () => {
		player.rotation = Math.PI;
		g.move(player, 'y', speed);
	},
	moveLeft: () => {
		player.rotation = Math.PI * 3 / 2;
		g.move(player, 'x', -speed);
	},
	moveRight: () => {
		player.rotation = Math.PI / 2;
		g.move(player, 'x', speed);
	},
};
```
After making these changes, if you download your code as a zip and upload it to blobbert.io, your game should now rotate the horse in the direction that it is looking!
