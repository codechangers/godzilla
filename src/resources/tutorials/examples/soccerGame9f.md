# 9. Place Blocks

Step (6/7) To be able to place blocks in your game.

##### 6. In `room.js`, Add the blocks into the game.

```javascript
// File: code/client/src/game.js
// Copy
<<<<<<< HEAD
	placeBlock: ({ x, y }) => {
		if (player.block5s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 5, spriteName: 'block5'});
		} else if (player.block3s > 0) {
			g.createACharacter('blocks', g.nextCharacterId('blocks'),
				{x, y, health: 3, spriteName: 'block3'});
		}
	},
=======
placeBlock: ({ x, y }) => {
	if (player.block5s > 0) {
		g.createACharacter('blocks', g.nextCharacterId('blocks'),
			{x, y, health: 5, spriteName: 'block5'});
	} else if (player.block3s > 0) {
		g.createACharacter('blocks', g.nextCharacterId('blocks'),
			{x, y, health: 3, spriteName: 'block3'});
	}
},
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
	const actions = {
		moveUp: () => g.move(player, 'y', -speed),
		moveDown: () => g.move(player, 'y', speed),
		moveLeft: () => g.move(player, 'x', -speed),
		moveRight: () => g.move(player, 'x', speed),
		buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
		buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),/*[*/
		placeBlock: ({ x, y }) => {
			if (player.block5s > 0) {
				g.createACharacter('blocks', g.nextCharacterId('blocks'),
					{x, y, health: 5, spriteName: 'block5'});
			} else if (player.block3s > 0) {
				g.createACharacter('blocks', g.nextCharacterId('blocks'),
					{x, y, health: 3, spriteName: 'block3'});
			}
		},/*]*/
	};
```
