# 9. Place Blocks

Step (6/7) To be able to place blocks in your game. 

##### 6. In `room.js`, Add the blocks into the game.

```
// File: code/client/src/game.js
// Copy
	placeBlock: ({ x, y }) => {
		if (player.block5s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 5, spriteName: 'block5'});
		} else if (player.block3s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 3, spriteName: 'block3'});
		}
	},
// End Copy
	/*[*/placeBlock: ({ x, y }) => {
		if (player.block5s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 5, spriteName: 'block5'});
		} else if (player.block3s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 3, spriteName: 'block3'});
		}
	},/*]*/
```
