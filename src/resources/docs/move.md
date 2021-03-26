---
title: move()
tags: [customize]
author: jason
---
This method will allow you to set up movement for your characters within the boundaries of the game.
## parameters
**object**:  `object` - The game object that you want to move.
​
**axis**: `string` - The axis of movement (x or y).

**distance**: `number` - The distance you want your object to move.
​
## Returns
**Nothing**
## Usage
This can be used once you have an object in your game that you are ready to set up movement for.
# Examples
### Example 1
```
//File code/client/src/game.js
onMessage(client, data) {
	const player = g.getACharacter('players', client.sessionId);
	g.move(player, 'x', 15);
}
```
