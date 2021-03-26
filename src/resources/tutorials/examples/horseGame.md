---
title: Horse Game
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---
## 1. Follow the build your game tutorial
{% include blocks/gettingStarted.md %}

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

## 7. We need more apples!
The last thing we are going to do in this tutorial is make it so that the apples re-spawn after they have all been eaten! This way the game can go on forever! The first thing we need to do is move the code we used to create the first apples into a _method_ so that we can use it again to create more!
```javascript
// File: code/server/rooms/room.js

// Scroll down until you see this code:
	g.setupCharacters('players');
	g.setupCharacters('apples');
// Then delete this code:
	for (let i = 0; i < 10; i++) {
		const x = Math.floor(Math.random() * this.gameWidth);
		const y = Math.floor(Math.random() * this.gameHeight);
		g.createACharacter('apples', g.nextCharacterId('apples'), { x, y });
	}
// Stop deleting here.
}
```
Then we will create a new _method_ called `createApples` underneath our `onInit` _method_:
```javascript
// File: code/server/rooms/room.js

// In that same spot:
		g.setupCharacters('players');
		g.setupCharacters('apples');
	}

	createApples() {
		for (let i = 0; i < 10; i++) {
			const x = Math.floor(Math.random() * this.gameWidth);
			const y = Math.floor(Math.random() * this.gameHeight);
			g.createACharacter('apples', g.nextCharacterId('apples'), { x, y });
		}
	}

	onJoin(client, data) {
		...
	}
	...
```
After we add our `createApples` _method_ we can call it anytime we want and it will add new apples into the game! The first place we want to use it, is in our `onInit` _method_ where we were originally creating the apples:
```javascript
// File: code/server/rooms/room.js

// In that same spot:
	g.setupCharacters('players');
	g.setupCharacters('apples');
// Add this new line of code:
	this.createApples();
}
```
The last thing we need to do is check for when we run out of apples. We will do this by adding a little bit of code to the end of our `handleCollision` _function_:
```javascript
// File: code/server/rooms/room.js
onUpdate(dt) {
	g.handleCollision('players', 'apples', (player, apple) => {
		player.score += 1;
		g.deleteACharacter('apples', apple.id);
// Add these lines of code:
		if (Object.keys(this.state['apples']).length === 0) {
			this.createApples();
		}
// End of the new code.
	});
}
```
After making these changes, if you download your code as a zip and upload it to blobbert.io, the apples should all re-spawn after all of them have been eaten!

## 8. Moving forward
{% include blocks/movingForward.md %}

