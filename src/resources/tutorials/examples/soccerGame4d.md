# 4. Add Goals

Step (4/8) To create goals for your game

##### 4. In `game.js`, Add the players depth.

```javascript
// File: code/client/src/game.js
// Copy
<<<<<<< HEAD
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
=======
player.sprite.depth = 5;
>>>>>>> fa7d7d93150f6a5493d35bea168bbdb1a0bdc6e8
// End Copy
	g.getCharacters('players', (player) => {/*[*/
		player.sprite.depth = 5;/*]*/
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	g.drawBackground('background', 0.8);
```
