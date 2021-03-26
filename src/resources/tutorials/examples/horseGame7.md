---
title: Respawn Food
subtitle: This tutorial will help you create an awesome Horse Game, where you go around collecting apples to get points!
tags: [customize]
author: jason
---
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
