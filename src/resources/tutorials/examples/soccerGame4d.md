# 4. Add Goals

Step (4/8) To create goals for your game

##### 4. In `game.js`, Add the players depth.

```
// File: code/client/src/game.js
// Copy 
		player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
// End Copy
		/*[*/player.sprite.depth = 5;
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});/*]*/
```
