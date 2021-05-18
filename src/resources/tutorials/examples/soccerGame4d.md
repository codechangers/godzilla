# Soccer Game - 4.D

## Add soccer goals.

**(Step 4/8)** Allow players to appear over top of goals.

### Show players over goals.

In `game.js` we need to change our `getCharacters` _function_ to set the player's depth in the `create` _method_.

```javascript
// File: game.js
// Copy
player.sprite.depth = 5;
// End Copy
	g.useStore('The Store', []);
	g.drawBackground('background', 0.8);
	g.getCharacters('players', (player) => {/*[*/
		player.sprite.depth = 5;/*]*/
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
}
```
