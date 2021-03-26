---
title: Grabbing Food
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---

## 6. Picking some apples
In this section we are going to add the ability for a horse to pick up an apple by walking over it! The first thing we need to do is add an initial score for each horse when they connect. This score will represent the number of apples each horse has collect.
```javascript
// File: code/server/rooms/room.js
onJoin(client, data) {
	g.createAcharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
}
```
Next we will need to make it so the horse's dimensions shift when it changes rotation. This will make it so that our collision detection is accurate from any direction! We are going to do this by adding a bit more code to our actions.
```javascript
// File: code/server/rooms/room.js
onMessage(client, data) {
	...
	const actions = {
		moveUp: () => {
			player.rotation = 0;
			if (player.width > player.height) {
				const [ w, h ] = [player.height, player.width];
				player.width = w;
				player.height = h;
			}
			g.move(player, 'y', -speed);
		},
		...
	};
}
```
We will do the same thing for the `moveDown`, `moveLeft`, and `moveRight` actions. On the `moveLeft` and `moveRight` actions we will change the if statement to use a less than sign (`<`) instead of a greater than sign (`>`):
```javascript
if (player.width < player.height) {
```

The last thing we need to do is use the [handleCollision](/docs/handlecollision/) _function_:
```javascript
// File: code/server/rooms/room.js
onUpdate(dt) {
	...
	g.handleCollision('players', 'apples', (player, apple) => {
		player.score += 1;
		g.deleteACharacter('apples', apple.id);
	});
}
```

Once all these changes are made, my code looks like this:
```javascript
// File: code/server/rooms/room.js
onJoin(client, data) {
	g.createAcharacter('players', client.sessionId, { x: 200, y: 200, score: 0, ...data });
}

onMessage(client, data) {
	...
	const actions = {
		moveUp: () => {
			player.rotation = 0;
			if (player.width > player.height) {
				const [ w, h ] = [player.height, player.width];
				player.width = w;
				player.height = h;
			}
			g.move(player, 'y', -speed);
		},
		moveDown: () => {
			player.rotation = Math.PI;
			if (player.width > player.height) {
				const [ w, h ] = [player.height, player.width];
				player.width = w;
				player.height = h;
			}
			g.move(player, 'y', speed);
		},
		moveLeft: () => {
			player.rotation = Math.PI * 3 / 2;
			if (player.width < player.height) {
				const [ w, h ] = [player.height, player.width];
				player.width = w;
				player.height = h;
			}
			g.move(player, 'x', -speed);
		},
		moveRight: () => {
			player.rotation = Math.PI / 2;
			if (player.width < player.height) {
				const [ w, h ] = [player.height, player.width];
				player.width = w;
				player.height = h;
			}
			g.move(player, 'x', speed);
		},
	};
}

onUpdate(dt) {
	...
	g.handleCollision('players', 'apples', (player, apple) => {
		player.score += 1;
		g.deleteACharacter('apples', apple.id);
	});
}
```
After making these changes, if you download your code as a zip and upload it to blobbert.io, you should now be able to walk around collecting the apples!
